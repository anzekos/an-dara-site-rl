/**
 * Posnetki posameznih sekcij v pravem viewportu (ne fullPage).
 * node sections.mjs <url> <width> <sel1,sel2,...>
 */
import { chromium } from "playwright"
import { mkdir } from "node:fs/promises"

const url = process.argv[2] ?? "http://localhost:4321"
const width = Number(process.argv[3] ?? 1440)
const sels = (process.argv[4] ?? "").split(",").filter(Boolean)
const tag = process.argv[5] ?? "sec"

await mkdir("shots", { recursive: true })
const browser = await chromium.launch({ channel: "chrome" })
const page = await browser.newPage({ viewport: { width, height: width < 500 ? 780 : 900 } })
await page.goto(url, { waitUntil: "networkidle" })
await page.addStyleTag({ content: "html{scroll-behavior:auto!important}" })

for (const [i, sel] of sels.entries()) {
  const el = page.locator(sel).first()
  if ((await el.count()) === 0) {
    console.log(`  ni elementa: ${sel}`)
    continue
  }
  await el.scrollIntoViewIfNeeded()
  await page.waitForTimeout(900)
  const path = `shots/${tag}-${width}-${i}-${sel.replace(/\W+/g, "")}.png`
  await page.screenshot({ path })
  console.log(path)
}

await browser.close()
