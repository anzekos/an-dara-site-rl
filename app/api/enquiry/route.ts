import { NextResponse } from "next/server"
import { Resend } from "resend"

export const runtime = "nodejs"

const TO = process.env.ENQUIRY_TO ?? "info@andara.si"
const FROM = process.env.ENQUIRY_FROM ?? "Andara website <onboarding@resend.dev>"

/** Nad tem telo zavrnemo, ne da bi ga sploh razclenili. */
const MAX_BODY_BYTES = 16 * 1024

/**
 * Preprosta omejitev pogostosti. Zivi v pomnilniku ene instance, kar je
 * dovolj proti navadnim botom in ne ustvari nobene nove zbirke osebnih
 * podatkov: hranimo zgoscen IP in stevec, oboje najvec eno uro.
 */
const WINDOW_MS = 60 * 60 * 1000
const MAX_PER_WINDOW = 5
const hits = new Map<string, { n: number; first: number }>()

function clientKey(req: Request): string {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown"
  // Ne hranimo surovega IP-ja. Kratek nekriptografski odtis zadostuje za stetje.
  let h = 0
  for (let i = 0; i < ip.length; i++) h = (Math.imul(31, h) + ip.charCodeAt(i)) | 0
  return String(h)
}

function rateLimited(key: string): boolean {
  const now = Date.now()
  // pociscimo iztecene, da mapa ne raste
  for (const [k, v] of hits) if (now - v.first > WINDOW_MS) hits.delete(k)

  const cur = hits.get(key)
  if (!cur) {
    hits.set(key, { n: 1, first: now })
    return false
  }
  cur.n += 1
  return cur.n > MAX_PER_WINDOW
}

function esc(v: unknown) {
  return String(v ?? "")
    .slice(0, 4000)
    .replace(/[<>&]/g, (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;" })[c] as string)
}

export async function POST(req: Request) {
  const declared = Number(req.headers.get("content-length") ?? 0)
  if (declared > MAX_BODY_BYTES) {
    return NextResponse.json({ ok: false, error: "That message is too long" }, { status: 413 })
  }

  if (rateLimited(clientKey(req))) {
    return NextResponse.json(
      { ok: false, error: "Too many enquiries from here. Try again a little later" },
      { status: 429 },
    )
  }

  let body: Record<string, unknown>
  try {
    const text = await req.text()
    if (text.length > MAX_BODY_BYTES) {
      return NextResponse.json({ ok: false, error: "That message is too long" }, { status: 413 })
    }
    body = JSON.parse(text)
  } catch {
    return NextResponse.json({ ok: false, error: "Bad request" }, { status: 400 })
  }

  // honeypot
  if (body.website) return NextResponse.json({ ok: true })

  const name = String(body.name ?? "").trim()
  const email = String(body.email ?? "").trim()

  if (!name || !email || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
    return NextResponse.json(
      { ok: false, error: "Please add your name and a valid email" },
      { status: 422 },
    )
  }

  /*
    Seznanitev s politiko zasebnosti je pogoj tudi na strezniku, ne le v
    brskalniku. Brez tega ne bi mogli dokazati, da je bilo obvestilo dano.
  */
  if (body.privacyAck !== true) {
    return NextResponse.json(
      { ok: false, error: "Please confirm you have read the privacy policy" },
      { status: 422 },
    )
  }

  const marketing = body.marketingConsent === true
  const ackAt = typeof body.ackAt === "string" ? body.ackAt : new Date().toISOString()

  const web3key = process.env.WEB3FORMS_ACCESS_KEY
  const resendKey = process.env.RESEND_API_KEY

  if (!web3key && !resendKey) {
    // Nobena pot ni nastavljena. Odjemalec pade na predizpolnjen mailto,
    // tako da povprasevanje ne izgine. V dnevnik ne gre noben osebni podatek.
    console.warn("[enquiry] ni WEB3FORMS_ACCESS_KEY ne RESEND_API_KEY, odjemalec pada na mailto")
    return NextResponse.json({ ok: false, fallback: "mailto" }, { status: 200 })
  }

  const rows: [string, unknown][] = [
    ["Name", name],
    ["Email", email],
    ["Country", body.country],
    ["Preferred month", body.month],
    ["Group size", body.people],
  ]

  const html = `
    <div style="font-family:ui-sans-serif,system-ui,sans-serif;color:#16201f;line-height:1.6">
      <h2 style="font-weight:500;margin:0 0 16px">New Triglav Circuit enquiry</h2>
      <table style="border-collapse:collapse;font-size:14px">
        ${rows
          .map(
            ([k, v]) =>
              `<tr><td style="padding:4px 16px 4px 0;color:#8a908c">${k}</td><td style="padding:4px 0">${esc(v) || "-"}</td></tr>`,
          )
          .join("")}
      </table>
      <p style="margin:20px 0 6px;color:#8a908c;font-size:13px">Message</p>
      <p style="margin:0;white-space:pre-wrap;font-size:14px">${esc(body.message) || "-"}</p>
      <p style="margin:24px 0 0;padding-top:14px;border-top:1px solid #e3ded6;color:#8a908c;font-size:12px;line-height:1.7">
        Privacy policy confirmed as read at ${esc(ackAt)}.<br>
        Occasional updates by email: <strong>${marketing ? "YES, consent given" : "no"}</strong>.
        ${marketing ? "Keep this email as the record of that consent (GDPR Art. 7(1))." : "Do not add this address to any list."}
      </p>
    </div>`

  /*
    Web3Forms ima prednost, ker ne zahteva potrjene posiljateljske domene.
    Klic gre s streznika, ne iz brskalnika: obrazec tako ostane na lastnem
    izvoru (form-action 'self' v CSP), kljuc ne pride v HTML, Web3Forms pa
    nikoli ne vidi obiskovalcevega IP-ja.
  */
  if (web3key) {
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: web3key,
          subject: `Triglav Circuit enquiry - ${name}`,
          from_name: "Andara website",
          replyto: email,
          Name: name,
          Email: email,
          Country: String(body.country ?? "") || "-",
          "Preferred month": String(body.month ?? "") || "-",
          "Group size": String(body.people ?? "") || "-",
          Message: String(body.message ?? "").slice(0, 4000) || "-",
          "Privacy policy read at": ackAt,
          "Wants occasional updates": marketing ? "YES, consent given" : "no",
        }),
      })
      const json = (await res.json()) as { success?: boolean; message?: string }
      if (!res.ok || !json.success) throw new Error(json.message ?? `HTTP ${res.status}`)
      return NextResponse.json({ ok: true })
    } catch (err) {
      console.error(
        "[enquiry] Web3Forms ni sprejel",
        err instanceof Error ? err.message : "unknown",
      )
      // ce je nastavljen se Resend, poskusi z njim, sicer mailto
      if (!resendKey) {
        return NextResponse.json({ ok: false, fallback: "mailto" }, { status: 200 })
      }
    }
  }

  try {
    const resend = new Resend(resendKey as string)
    const { error } = await resend.emails.send({
      from: FROM,
      to: [TO],
      replyTo: email,
      subject: `Triglav Circuit enquiry - ${name}`,
      html,
    })
    if (error) throw new Error(error.message)
    return NextResponse.json({ ok: true })
  } catch (err) {
    // Samo vrsta napake, nikoli vsebina povprasevanja.
    console.error("[enquiry] posiljanje ni uspelo", err instanceof Error ? err.message : "unknown")
    return NextResponse.json({ ok: false, fallback: "mailto" }, { status: 200 })
  }
}
