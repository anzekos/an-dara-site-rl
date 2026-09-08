import { chromium } from "playwright"

const base = process.argv[2] ?? "http://localhost:4321"
const b = await chromium.launch({ channel: "chrome" })
let fails = 0
const ok = (name, pass, extra = "") => {
  console.log(`${pass ? "  ok  " : "  X   "} ${name}${extra ? "  " + extra : ""}`)
  if (!pass) fails++
}

/* ---------------------------------------------------- 1. mobilni meni */
{
  const p = await b.newPage({ viewport: { width: 380, height: 780 } })
  await p.goto(base, { waitUntil: "domcontentloaded" })
  await p.waitForTimeout(500)

  const burger = p.getByRole("button", { name: /open menu/i })
  ok("hamburger viden na 380", await burger.isVisible())
  await burger.click()
  await p.waitForTimeout(450)
  const overlayLink = p.getByRole("navigation", { name: "Mobile" }).getByRole("link", { name: "Contact" })
  ok("meni se odpre in link je viden", await overlayLink.isVisible())

  // ESC zapre
  await p.keyboard.press("Escape")
  await p.waitForTimeout(400)
  ok("ESC zapre meni", (await p.getByRole("button", { name: /open menu/i }).count()) === 1)

  // navigacija skozi meni
  await p.getByRole("button", { name: /open menu/i }).click()
  await p.waitForTimeout(400)
  await overlayLink.click()
  await p.waitForURL("**/contact", { timeout: 5000 })
  ok("meni navigira na /contact", p.url().endsWith("/contact"))

  // sticky vrstica skrita na /contact
  ok("sticky vrstica skrita na /contact", (await p.getByRole("link", { name: "Email us" }).count()) === 0)
  await p.close()
}

/* -------------------------------------------------- 2. tap targets 380 */
{
  const p = await b.newPage({ viewport: { width: 380, height: 780 } })
  await p.goto(base, { waitUntil: "domcontentloaded" })
  await p.waitForTimeout(600)
  const small = await p.evaluate(() => {
    const bad = []
    for (const el of document.querySelectorAll("a, button, summary, input, select, textarea")) {
      const r = el.getBoundingClientRect()
      if (r.width === 0 || r.height === 0) continue
      const cs = getComputedStyle(el)
      if (cs.visibility === "hidden" || cs.display === "none") continue
      if (el.closest('[aria-hidden="true"]')) continue
      if (el.className.toString().includes("sr-only")) continue
      // WCAG 2.5.8 izjema: link v teku stavka
      if (el.tagName === "A" && el.closest("p, li, dd, blockquote") && cs.display === "inline") continue
      if (r.height < 40) bad.push(`${el.tagName}.${el.className.toString().slice(0, 28)} h=${Math.round(r.height)}`)
    }
    return bad.slice(0, 8)
  })
  ok("tap targeti >= 40px na 380", small.length === 0, small.join(" | "))
  await p.close()
}

/* --------------------------------------------------------- 3. FAQ */
{
  const p = await b.newPage({ viewport: { width: 1440, height: 900 } })
  await p.goto(base + "/#faq", { waitUntil: "domcontentloaded" })
  await p.waitForTimeout(700)
  const first = p.locator("#faq details").first()
  const body = first.locator(".faq-body")
  ok("FAQ odgovor je v HTML pred odprtjem", (await body.textContent())?.length > 40)
  await first.locator("summary").click()
  await p.waitForTimeout(350)
  ok("FAQ se odpre", await body.isVisible())
  await p.close()
}

/* --------------------------------------------------- 4. obrazec */
{
  const p = await b.newPage({ viewport: { width: 1440, height: 900 } })
  let posted = null
  await p.route("**/api/enquiry", async (route) => {
    posted = route.request().postDataJSON()
    await route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ ok: true }) })
  })
  await p.goto(base + "/contact", { waitUntil: "domcontentloaded" })
  await p.waitForTimeout(600)

  // HTML5 validacija: prazen submit ne poslje
  await p.getByRole("button", { name: /send the enquiry/i }).click()
  await p.waitForTimeout(300)
  ok("prazen obrazec se ne poslje", posted === null)

  await p.fill("#name", "Jane Doe")
  await p.fill("#email", "jane@example.com")
  await p.fill("#country", "Netherlands")
  await p.selectOption("#month", "July")
  await p.fill("#people", "4")
  await p.fill("#message", "Testno sporocilo")
  await p.getByRole("button", { name: /send the enquiry/i }).click()
  await p.waitForTimeout(700)

  ok("obrazec poslje vsa polja", posted?.name === "Jane Doe" && posted?.month === "July" && posted?.people === "4")
  ok("prikaze se potrditev", await p.getByText(/thank you, that is with us/i).isVisible())
  await p.close()
}

/* ------------------------------------------- 5. reduced motion */
{
  const p = await b.newPage({ viewport: { width: 1440, height: 900 }, reducedMotion: "reduce" })
  await p.goto(base, { waitUntil: "domcontentloaded" })
  await p.waitForTimeout(500)
  const hidden = await p.evaluate(() =>
    [...document.querySelectorAll(".reveal")].filter((e) => getComputedStyle(e).opacity !== "1").length,
  )
  ok("pri reduced-motion je vse vidno", hidden === 0, `skritih: ${hidden}`)
  await p.close()
}

/* ---------------------------------------- 6. brez JS (progressive) */
{
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, javaScriptEnabled: false })
  const p = await ctx.newPage()
  await p.goto(base, { waitUntil: "domcontentloaded" })
  const visible = await p.evaluate(() =>
    [...document.querySelectorAll(".reveal")].filter((e) => getComputedStyle(e).opacity === "1").length,
  )
  const total = await p.locator(".reveal").count()
  ok("brez JS je vsebina v HTML", (await p.locator("h1").textContent())?.includes("Seven days"))
  console.log(`        (reveal blokov ${total}, vidnih brez JS ${visible})`)
  await ctx.close()
}

/* --------------------------------------------- 7. naslovna hierarhija */
{
  const p = await b.newPage({ viewport: { width: 1440, height: 900 } })
  for (const path of ["/", "/about", "/contact"]) {
    await p.goto(base + path, { waitUntil: "domcontentloaded" })
    const h1 = await p.locator("h1").count()
    const noAlt = await p.locator("img:not([alt])").count()
    ok(`${path}: natanko en h1`, h1 === 1, `h1=${h1}`)
    ok(`${path}: vse slike imajo alt`, noAlt === 0)
  }
  await p.close()
}

await b.close()
console.log(fails ? `\n${fails} tezav.` : "\nVse ok.")
process.exit(fails ? 1 : 0)
