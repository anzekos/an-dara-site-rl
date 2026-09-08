/**
 * Pravni in tehnicni QA. Zene se proti `next start`.
 *   node qa-legal.mjs http://localhost:4321
 *
 * Preverja tocno tisto, kar je bilo narocenо: privolitev pred sledenjem,
 * pravne strani, meta podatke, kanonicne naslove, alt besedila, obrazec,
 * pokvarjene povezave, dostopnost in mobilno razlicico.
 */
import { chromium } from "playwright"

const base = process.argv[2] ?? "http://localhost:4321"
const b = await chromium.launch({ channel: "chrome" })

let fails = 0
let checks = 0
const ok = (name, pass, extra = "") => {
  checks++
  console.log(`${pass ? "  ok  " : "  FAIL" } ${name}${extra ? "   " + extra : ""}`)
  if (!pass) fails++
}
const head = (t) => console.log(`\n—— ${t} ——`)

const ROUTES = ["/", "/about", "/contact", "/privacy", "/cookies", "/terms"]
const TRACKERS = /googletagmanager|google-analytics|analytics\.google|doubleclick|vercel-insights|\/_vercel\/insights/i

/* ------------------------------------------------- 1. privolitev pred sledenjem */
head("1. Privolitev pred sledenjem (GDPR / ePrivacy)")
{
  const ctx = await b.newContext()
  const p = await ctx.newPage()
  const tracker = []
  p.on("request", (r) => TRACKERS.test(r.url()) && tracker.push(r.url()))

  await p.goto(base, { waitUntil: "networkidle" })
  await p.waitForTimeout(1200)

  ok("pasica se pokaze ob prvem obisku", await p.getByRole("dialog", { name: /cookies/i }).isVisible())
  ok("pred izbiro ni nobenega zahtevka na sledilnike", tracker.length === 0, tracker.join(", "))

  const cookiesBefore = await ctx.cookies()
  ok("pred izbiro ni nobenega piskotka", cookiesBefore.length === 0,
     cookiesBefore.map((c) => c.name).join(", "))

  // navigacija brez izbire ne sme nicesar sprozit
  await p.goto(`${base}/about`, { waitUntil: "networkidle" })
  await p.waitForTimeout(800)
  ok("tudi na drugi strani brez izbire nic ne sledi", tracker.length === 0, tracker.join(", "))

  // gumba morata biti enako velika (temno vzorcenje)
  await p.goto(base, { waitUntil: "domcontentloaded" })
  await p.waitForTimeout(700)
  const accept = p.getByRole("button", { name: "Accept analytics" })
  const reject = p.getByRole("button", { name: "Only necessary" })
  const [ba, br] = [await accept.boundingBox(), await reject.boundingBox()]
  ok("gumb 'Only necessary' je viden", !!br)
  ok("oba gumba sta priblizno enako velika",
     !!ba && !!br && Math.abs(ba.width - br.width) < 12 && Math.abs(ba.height - br.height) < 4,
     ba && br ? `${Math.round(ba.width)}x${Math.round(ba.height)} vs ${Math.round(br.width)}x${Math.round(br.height)}` : "")

  // zavrni
  await reject.click()
  await p.waitForTimeout(1500)
  ok("po zavrnitvi pasica izgine", (await p.getByRole("dialog", { name: /cookies/i }).count()) === 0)
  ok("po zavrnitvi se vedno nic ne sledi", tracker.length === 0, tracker.join(", "))
  const cookiesAfterReject = await ctx.cookies()
  ok("po zavrnitvi ni piskotkov", cookiesAfterReject.length === 0,
     cookiesAfterReject.map((c) => c.name).join(", "))

  // ponovno odpri iz noge in sprejmi
  await p.goto(`${base}/cookies`, { waitUntil: "domcontentloaded" })
  await p.getByRole("button", { name: /cookie settings/i }).first().click()
  await p.waitForTimeout(500)
  ok("gumb v nogi znova odpre plosco", await p.getByRole("dialog", { name: /cookies/i }).isVisible())
  await p.getByRole("button", { name: "Accept analytics" }).click()
  await p.waitForTimeout(2500)
  ok("po privolitvi se GA vendarle nalozi", tracker.some((u) => /googletagmanager/i.test(u)),
     tracker.length ? tracker[0] : "nic")

  // izbira prezivi ponovno nalaganje
  await p.reload({ waitUntil: "domcontentloaded" })
  await p.waitForTimeout(800)
  ok("izbira se pomni po osvezitvi", (await p.getByRole("dialog", { name: /cookies/i }).count()) === 0)

  await ctx.close()
}

/* --------------------------------------------------------- 2. meta podatki */
head("2. Meta podatki, kanonicni naslovi, delitev na druzabnih")
const collected = { links: new Set(), titles: [] }
{
  const ctx = await b.newContext()
  const p = await ctx.newPage()
  for (const route of ROUTES) {
    const res = await p.goto(base + route, { waitUntil: "domcontentloaded" })
    const info = await p.evaluate(() => ({
      title: document.title,
      desc: document.querySelector('meta[name="description"]')?.content ?? "",
      canonical: document.querySelector('link[rel="canonical"]')?.href ?? "",
      ogTitle: document.querySelector('meta[property="og:title"]')?.content ?? "",
      ogImage: document.querySelector('meta[property="og:image"]')?.content ?? "",
      twCard: document.querySelector('meta[name="twitter:card"]')?.content ?? "",
      h1: [...document.querySelectorAll("h1")].map((h) => h.textContent.trim()),
      imgNoAlt: [...document.querySelectorAll("img")].filter((i) => i.getAttribute("alt") === null)
        .map((i) => i.currentSrc || i.src),
      links: [...document.querySelectorAll("a[href]")].map((a) => a.href),
      lang: document.documentElement.lang,
      icon: !!document.querySelector('link[rel~="icon"]'),
    }))
    info.links.forEach((l) => collected.links.add(l))
    collected.titles.push(info.title)

    const label = route.padEnd(9)
    ok(`${label} status 200`, res.status() === 200, String(res.status()))
    ok(`${label} title 10-65 znakov`, info.title.length >= 10 && info.title.length <= 65,
       `${info.title.length}: ${info.title}`)
    ok(`${label} description 70-165 znakov`, info.desc.length >= 70 && info.desc.length <= 165,
       String(info.desc.length))
    ok(`${label} kanonicni je lasten`, info.canonical.endsWith(route === "/" ? "/" : route),
       info.canonical)
    ok(`${label} natanko en h1`, info.h1.length === 1, `${info.h1.length}`)
    ok(`${label} vsaka slika ima alt`, info.imgNoAlt.length === 0, info.imgNoAlt.join(", "))
    ok(`${label} og:title + og:image`, !!info.ogTitle && !!info.ogImage)
    ok(`${label} twitter card`, info.twCard === "summary_large_image")
    ok(`${label} lang in favicon`, info.lang === "en" && info.icon)
  }
  ok("vsi naslovi so razlicni", new Set(collected.titles).size === collected.titles.length)
  await ctx.close()
}

/* ---------------------------------------------------------- 3. robots, 404 */
head("3. robots.txt, sitemap.xml, 404, varnostne glave")
{
  const ctx = await b.newContext()
  const p = await ctx.newPage()

  const robots = await (await p.goto(`${base}/robots.txt`)).text()
  ok("robots.txt obstaja in kaze na sitemap", /Sitemap:/i.test(robots), robots.split("\n")[0])
  ok("robots.txt prepove /api/", /Disallow: \/api\//.test(robots))

  const sm = await (await p.goto(`${base}/sitemap.xml`)).text()
  for (const r of ROUTES) {
    const u = r === "/" ? "" : r
    ok(`sitemap vsebuje ${r}`, sm.includes(`andara.si${u}<`) || sm.includes(`andara.si${u}/<`) || sm.includes(`andara.si${u}"`) || sm.includes(`>${"https://www.andara.si" + u}<`))
  }

  const nf = await p.goto(`${base}/this-page-does-not-exist`)
  ok("404 vraca status 404", nf.status() === 404, String(nf.status()))
  const nfBody = await p.evaluate(() => ({
    h1: document.querySelector("h1")?.textContent ?? "",
    robots: document.querySelector('meta[name="robots"]')?.content ?? "",
    backLink: !!document.querySelector('a[href="/"]'),
  }))
  ok("404 je lastna stran z naslovom", /not on our map/i.test(nfBody.h1), nfBody.h1)
  ok("404 je noindex", /noindex/.test(nfBody.robots), nfBody.robots)
  ok("404 ponuja pot nazaj", nfBody.backLink)

  const res = await p.goto(base)
  const h = res.headers()
  ok("CSP glava", !!h["content-security-policy"])
  ok("X-Content-Type-Options", h["x-content-type-options"] === "nosniff")
  ok("Referrer-Policy", !!h["referrer-policy"], h["referrer-policy"])
  ok("X-Frame-Options", !!h["x-frame-options"], h["x-frame-options"])
  ok("Permissions-Policy", !!h["permissions-policy"])
  ok("brez X-Powered-By", !h["x-powered-by"])
  await ctx.close()
}

/* ------------------------------------------------------ 4. CSP in konzola */
head("4. Napake v konzoli in krsitve CSP")
{
  const ctx = await b.newContext()
  const p = await ctx.newPage()
  const errs = []
  const bad = []
  p.on("console", (m) => {
    // Golo "Failed to load resource" nima URL-ja, zato se 4xx lovi posebej spodaj.
    if (m.type() === "error" && !/Failed to load resource/i.test(m.text())) errs.push(m.text())
  })
  p.on("pageerror", (e) => errs.push(String(e)))
  p.on("response", (r) => {
    if (r.status() >= 400) bad.push(`${r.status()} ${r.url()}`)
  })
  for (const route of ROUTES) {
    await p.goto(base + route, { waitUntil: "networkidle" })
    await p.waitForTimeout(400)
  }
  // s privolitvijo, da preverimo se CSP za GA
  await p.getByRole("button", { name: "Accept analytics" }).click().catch(() => {})
  await p.waitForTimeout(2500)
  /*
    /_vercel/insights/* streze Vercelov rob, ne `next start`. Lokalno vrne
    404 in s tem sum, ki na produkciji ne obstaja. Vse ostalo steje.
  */
  const skip = /_vercel\/insights/
  const real = errs.filter((e) => !skip.test(e))
  const realBad = bad.filter((e) => !skip.test(e))
  const cspErrs = real.filter((e) => /Content Security Policy|Refused to/i.test(e))
  ok("nobene krsitve CSP", cspErrs.length === 0, cspErrs.slice(0, 3).join(" | "))
  ok("nobene napake v konzoli", real.length === 0, real.slice(0, 3).join(" | "))
  ok("noben vir ne vraca 4xx/5xx", realBad.length === 0, realBad.slice(0, 3).join(" | "))
  await ctx.close()
}

/* ----------------------------------------------------------- 5. povezave */
head("5. Pokvarjene povezave")
{
  const internal = [...collected.links].filter((u) => u.startsWith(base))
  const seen = new Set()
  for (const u of internal) {
    const clean = u.split("#")[0]
    if (seen.has(clean)) continue
    seen.add(clean)
    const r = await fetch(clean, { redirect: "follow" })
    ok(`notranja ${clean.replace(base, "") || "/"}`, r.status === 200, String(r.status))
  }
  const external = [...collected.links].filter((u) => u.startsWith("http") && !u.startsWith(base))
  console.log(`  ..  ${external.length} zunanjih povezav, preverjam`)
  for (const u of external) {
    try {
      const r = await fetch(u, { redirect: "follow", headers: { "user-agent": "Mozilla/5.0" } })
      // nekateri (Instagram, TikTok) vracajo 4xx botom, zato je 403/429 dopusten
      ok(`zunanja ${new URL(u).hostname}`, r.status < 400 || [403, 429, 405].includes(r.status),
         `${r.status} ${u.slice(0, 70)}`)
    } catch (e) {
      ok(`zunanja ${u.slice(0, 60)}`, false, String(e.message).slice(0, 60))
    }
  }
}

/* ------------------------------------------------------------- 6. obrazec */
head("6. Obrazec za povprasevanje")
{
  const ctx = await b.newContext()
  const p = await ctx.newPage()
  const posted = []
  await p.route("**/api/enquiry", async (route) => {
    posted.push(JSON.parse(route.request().postData() ?? "{}"))
    await route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ ok: true }) })
  })
  await p.goto(`${base}/contact`, { waitUntil: "domcontentloaded" })
  await p.getByRole("button", { name: "Only necessary" }).click()
  await p.waitForTimeout(400)

  // prazno oddajanje mora ustaviti brskalnik
  await p.getByRole("button", { name: /send the enquiry/i }).click()
  await p.waitForTimeout(400)
  ok("prazen obrazec se ne poslje", posted.length === 0)

  await p.getByLabel("Your name").fill("QA Tester")
  await p.getByLabel("Email", { exact: true }).fill("qa@example.com")
  await p.getByRole("button", { name: /send the enquiry/i }).click()
  await p.waitForTimeout(400)
  ok("brez potrditve zasebnosti se ne poslje", posted.length === 0)

  await p.getByRole("checkbox").first().check()
  await p.getByRole("button", { name: /send the enquiry/i }).click()
  await p.waitForTimeout(900)
  ok("s potrditvijo se poslje", posted.length === 1)
  ok("poslje privacyAck: true", posted[0]?.privacyAck === true)
  ok("marketing je privzeto false", posted[0]?.marketingConsent === false)
  ok("poslje cas seznanitve", !!posted[0]?.ackAt)
  ok("prikaze zahvalo", await p.getByText(/that is with us/i).isVisible())

  // streznik mora zavrniti brez privacyAck
  const r = await fetch(`${base}/api/enquiry`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ name: "X", email: "x@example.com" }),
  })
  ok("streznik zavrne brez privacyAck", r.status === 422, String(r.status))
  await ctx.close()
}

/* -------------------------------------------------------- 7. dostopnost */
head("7. Dostopnost in mobilna razlicica")
{
  const ctx = await b.newContext({ viewport: { width: 375, height: 780 } })
  const p = await ctx.newPage()
  await p.goto(base, { waitUntil: "domcontentloaded" })
  await p.waitForTimeout(900)

  // pasica ne sme prekrivati mobilne akcijske vrstice
  const bar = await p.getByRole("link", { name: "Email us" }).count()
  ok("mobilna akcijska vrstica se umakne pasici", bar === 0)
  await p.getByRole("button", { name: "Only necessary" }).click()
  await p.waitForTimeout(700)
  ok("po izbiri se akcijska vrstica vrne", await p.getByRole("link", { name: "Email us" }).isVisible())

  for (const route of ROUTES) {
    await p.goto(base + route, { waitUntil: "domcontentloaded" })
    await p.waitForTimeout(300)
    const overflow = await p.evaluate(() =>
      Math.max(document.documentElement.scrollWidth, document.body.scrollWidth) - window.innerWidth)
    ok(`${route.padEnd(9)} brez vodoravnega drsenja na 375px`, overflow <= 1, `${overflow}px`)

    /*
      WCAG 2.2, SC 2.5.8 izrecno izvzame tarce, ki so v stavku ali jim
      velikost doloca visina vrstice okoliskega besedila. Preverjamo torej
      samo samostojne gumbe in povezave, ne podcrtanih besed v odstavku.
    */
    const small = await p.evaluate(() =>
      [...document.querySelectorAll("a, button")]
        .filter((el) => el.offsetParent !== null)
        .filter((el) => !/^inline$/.test(getComputedStyle(el).display))
        .filter((el) => !el.className.toString().includes("sr-only"))
        .map((el) => ({ t: (el.textContent || "").trim().slice(0, 30), h: el.getBoundingClientRect().height }))
        .filter((r) => r.h > 0 && r.h < 24))
    ok(`${route.padEnd(9)} samostojne tarce >= 24px`, small.length === 0,
       small.map((r) => `${r.t}:${Math.round(r.h)}`).join(", "))
  }

  // tipkovnica: preskoci na vsebino
  await p.goto(base, { waitUntil: "domcontentloaded" })
  await p.keyboard.press("Tab")
  const focused = await p.evaluate(() => document.activeElement?.textContent?.trim())
  ok("prvi Tab da 'Skip to content'", /skip to content/i.test(focused ?? ""), focused ?? "")

  await ctx.close()
}

console.log(`\n${fails === 0 ? "VSE OK" : fails + " NAPAK"} od ${checks} preverjanj`)
await b.close()
process.exit(fails === 0 ? 0 : 1)
