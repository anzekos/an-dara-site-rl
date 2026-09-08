/**
 * Dostopnost (axe-core, WCAG 2.1 AA + 2.2) in zmogljivost.
 *   node qa-a11y-perf.mjs http://localhost:4321
 *
 * Meritve so lokalne in brez Vercelove optimizacije slik, zato so stevilke
 * pesimisticne. Sluzijo primerjavi med stranmi in lovljenju regresij.
 */
import { chromium } from "playwright"
import { createRequire } from "node:module"

const require = createRequire(import.meta.url)
const axePath = require.resolve("axe-core/axe.min.js")
const axeSource = await (await import("node:fs/promises")).readFile(axePath, "utf8")

const base = process.argv[2] ?? "http://localhost:4321"
const ROUTES = ["/", "/about", "/contact", "/privacy", "/cookies", "/terms"]

const b = await chromium.launch({ channel: "chrome" })
let fails = 0

/* -------------------------------------------------------------- axe-core */
console.log("—— Dostopnost, axe-core (wcag2a, wcag2aa, wcag21aa, wcag22aa) ——")
for (const route of ROUTES) {
  const ctx = await b.newContext()
  const p = await ctx.newPage()
  await p.goto(base + route, { waitUntil: "networkidle" })
  // s pasico in brez nje: obe stanji morata biti dostopni
  for (const phase of ["s pasico", "brez pasice"]) {
    if (phase === "brez pasice") {
      await p.getByRole("button", { name: "Only necessary" }).click().catch(() => {})
      await p.waitForTimeout(600)
    }
    await p.addScriptTag({ content: axeSource })
    const res = await p.evaluate(async () =>
      await window.axe.run(document, {
        runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"] },
      }),
    )
    const v = res.violations
    const label = `${route.padEnd(9)} ${phase.padEnd(12)}`
    if (v.length === 0) {
      console.log(`  ok   ${label} brez krsitev`)
    } else {
      fails += v.length
      console.log(`  FAIL ${label} ${v.length} krsitev`)
      for (const x of v) {
        console.log(`         ${x.impact} :: ${x.id} :: ${x.help}`)
        for (const n of x.nodes.slice(0, 3)) console.log(`            ${n.target.join(" ")}`)
      }
    }
  }
  await ctx.close()
}

/* ----------------------------------------------------------- zmogljivost */
console.log("\n—— Zmogljivost (lokalno, brez optimizacije slik na Vercelu) ——")
console.log("  pot        prenos     LCP      CLS     zahtevki  JS      slike")
for (const route of ROUTES) {
  const ctx = await b.newContext()
  const p = await ctx.newPage()
  let bytes = 0
  let js = 0
  let img = 0
  let reqs = 0
  p.on("response", async (r) => {
    reqs++
    try {
      const len = Number((await r.allHeaders())["content-length"] ?? 0)
      bytes += len
      const t = r.request().resourceType()
      if (t === "script") js += len
      if (t === "image") img += len
    } catch {
      /* prekinjeni zahtevki */
    }
  })

  await p.goto(base + route, { waitUntil: "load" })
  await p.waitForTimeout(2500)

  const vitals = await p.evaluate(
    () =>
      new Promise((resolve) => {
        let lcp = 0
        let cls = 0
        new PerformanceObserver((l) => {
          for (const e of l.getEntries()) lcp = Math.max(lcp, e.startTime)
        }).observe({ type: "largest-contentful-paint", buffered: true })
        new PerformanceObserver((l) => {
          for (const e of l.getEntries()) if (!e.hadRecentInput) cls += e.value
        }).observe({ type: "layout-shift", buffered: true })
        setTimeout(() => resolve({ lcp, cls }), 700)
      }),
  )

  const kb = (n) => `${(n / 1024).toFixed(0)}kB`.padEnd(8)
  const lcpOk = vitals.lcp < 2500
  const clsOk = vitals.cls < 0.1
  if (!lcpOk || !clsOk) fails++
  console.log(
    `  ${route.padEnd(10)} ${kb(bytes)} ${(vitals.lcp.toFixed(0) + "ms").padEnd(8)} ` +
      `${vitals.cls.toFixed(3).padEnd(7)} ${String(reqs).padEnd(9)} ${kb(js)} ${kb(img)}` +
      `${lcpOk && clsOk ? "" : "   <- pod pragom"}`,
  )
  await ctx.close()
}

console.log(`\n${fails === 0 ? "VSE OK" : fails + " TEZAV"}`)
await b.close()
process.exit(fails === 0 ? 0 : 1)
