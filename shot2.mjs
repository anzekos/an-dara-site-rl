import { chromium } from "playwright"

const b = await chromium.launch({ channel: "chrome" })

let p = await b.newPage({ viewport: { width: 1440, height: 900 } })
await p.goto("http://localhost:4321", { waitUntil: "domcontentloaded" })
await p.addStyleTag({ content: "html{scroll-behavior:auto!important}" })
await p.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
await p.waitForTimeout(1200)
await p.screenshot({ path: "shots/footer.png" })
await p.close()

p = await b.newPage({ viewport: { width: 380, height: 780 } })
await p.goto("http://localhost:4321", { waitUntil: "domcontentloaded" })
await p.waitForTimeout(600)
await p.getByRole("button", { name: /open menu/i }).click()
await p.waitForTimeout(700)
await p.screenshot({ path: "shots/menu.png" })
await p.close()

await b.close()
console.log("ok")
