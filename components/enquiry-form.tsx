"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowUpRight, CheckCircle, Warning, CaretDown, EnvelopeSimple } from "@phosphor-icons/react/dist/ssr"
import { site, web3formsKey } from "@/lib/site"
import { cn } from "@/lib/utils"

type State = "idle" | "sending" | "sent" | "handoff" | "error"

const months = [
  "May", "June", "July", "August", "September",
  "Not sure yet",
]

const field =
  "w-full rounded-[14px] border border-line bg-raised px-4 py-3.5 text-[0.9375rem] text-ink " +
  "placeholder:text-ink-faint transition-[border-color,background-color] duration-[var(--dur-ui)] " +
  "hover:border-ink/25 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/25"

const label = "mb-2 block text-[11px] uppercase tracking-[0.16em] text-ink-faint"

export function EnquiryForm({ compact = false }: { compact?: boolean }) {
  const [state, setState] = useState<State>("idle")
  const [error, setError] = useState<string | null>(null)

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const raw = new FormData(form)
    const data = Object.fromEntries(raw.entries()) as Record<string, string>

    // honeypot
    if (data.website) return

    // checkboxi pridejo kot "on" ali pa jih sploh ni; normaliziraj v boolean
    // in pripni cas, da imamo dokaz o seznanitvi (GDPR clen 5(2), odgovornost)
    const payload = {
      ...data,
      privacyAck: raw.get("privacyAck") === "on",
      marketingConsent: raw.get("marketingConsent") === "on",
      ackAt: new Date().toISOString(),
    }

    setState("sending")
    setError(null)

    try {
      /*
        Web3Forms na brezplacnem planu sprejme samo klic iz brskalnika; s
        streznika vrne 403 in zahteva Pro. Zato gremo naravnost tja.
        Kljuc je pri tej storitvi javen po zasnovi.

        POZOR, dvakrat izmerjeno na zivi strani:
        1. Njihov API NE odgovarja na CORS preflight. Na OPTIONS vrne 403
           brez glave Access-Control-Allow-Origin, zato "Content-Type:
           application/json" ubije oddajo z "Failed to fetch".
        2. Na navadnem POST-u pa glavo lepo poslje.
        Resitev je URLSearchParams: brskalnik nastavi safelistan
        application/x-www-form-urlencoded, preflighta ni in odgovor je
        berljiv. Ne dodajaj glav rocno, ker s tem preflight prizges nazaj.
      */
      if (web3formsKey) {
        const res = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          body: new URLSearchParams({
            access_key: web3formsKey,
            subject: `Triglav Circuit enquiry - ${data.name || "no name"}`,
            from_name: "Andara website",
            replyto: data.email || "",
            botcheck: "",
            Name: data.name || "-",
            Email: data.email || "-",
            Country: data.country || "-",
            "Preferred month": data.month || "-",
            "Group size": data.people || "-",
            Message: data.message || "-",
            "Privacy policy read at": payload.ackAt,
            "Wants occasional updates": payload.marketingConsent ? "YES, consent given" : "no",
          }),
        })
        const json = await res.json()
        if (res.ok && json.success) {
          setState("sent")
          form.reset()
          return
        }
        throw new Error(json.message || "Something went wrong")
      }

      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
      const json = await res.json()

      if (res.ok && json.ok) {
        setState("sent")
        form.reset()
        return
      }

      // strežnik nima nastavljenega mailerja: padec na predizpolnjen mailto,
      // da povprasevanje ne izgine
      if (json.fallback === "mailto") {
        const subject = encodeURIComponent(`Triglav Circuit enquiry - ${data.name || "no name"}`)
        const body = encodeURIComponent(
          [
            `Name: ${data.name || "-"}`,
            `Email: ${data.email || "-"}`,
            `Country: ${data.country || "-"}`,
            `Preferred month: ${data.month || "-"}`,
            `Group size: ${data.people || "-"}`,
            `Privacy policy read: ${payload.privacyAck ? "yes" : "no"}`,
            `Wants occasional updates: ${payload.marketingConsent ? "yes" : "no"}`,
            "",
            data.message || "",
          ].join("\n"),
        )
        window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`
        // NE "sent": posiljanja se ni bilo. Odprl se je samo predizpolnjen
        // osnutek, ki ga mora obiskovalec se sam poslati. Trditi drugace
        // bi pomenilo, da povprasevanja tiho izginjajo.
        setState("handoff")
        return
      }

      throw new Error(json.error || "Something went wrong")
    } catch (err) {
      setState("error")
      setError(err instanceof Error ? err.message : "Something went wrong")
    }
  }

  if (state === "handoff") {
    return (
      <div className="flex flex-col items-start gap-4 rounded-[18px] border border-line bg-raised p-8">
        <EnvelopeSimple size={34} weight="light" className="text-accent" />
        <h3 className="text-[1.5rem] leading-tight">One more tap and it is on its way.</h3>
        <p className="max-w-[46ch] text-[0.9375rem] leading-relaxed text-ink-soft">
          Your email app should have opened with everything already filled in. Press send there and
          it reaches Anja and Darja. If nothing opened, copy your dates straight to{" "}
          <a href={`mailto:${site.email}`} className="text-accent underline underline-offset-4">
            {site.email}
          </a>{" "}
          and you will have an answer {site.replyTime}.
        </p>
      </div>
    )
  }

  if (state === "sent") {
    return (
      <div className="flex flex-col items-start gap-4 rounded-[18px] border border-line bg-raised p-8">
        <CheckCircle size={34} weight="light" className="text-accent" />
        <h3 className="text-[1.5rem] leading-tight">Thank you, that is with us.</h3>
        <p className="max-w-[42ch] text-[0.9375rem] leading-relaxed text-ink-soft">
          Anja or Darja will come back to you {site.replyTime} with dates, availability in the huts
          and the full price. If it is urgent, write to us directly at{" "}
          <a href={`mailto:${site.email}`} className="text-accent underline underline-offset-4">
            {site.email}
          </a>
          .
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-5">
      <div className={cn("grid gap-5", compact ? "sm:grid-cols-2" : "sm:grid-cols-2")}>
        <div>
          <label className={label} htmlFor="name">
            Your name
          </label>
          <input id="name" name="name" required autoComplete="name" className={field} placeholder="Jane Doe" />
        </div>
        <div>
          <label className={label} htmlFor="email">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className={field}
            placeholder="jane@example.com"
          />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-3">
        <div>
          <label className={label} htmlFor="country">
            Country
          </label>
          <input id="country" name="country" autoComplete="country-name" className={field} placeholder="Netherlands" />
        </div>
        <div>
          <label className={label} htmlFor="month">
            Preferred month
          </label>
          <div className="relative">
            <select
              id="month"
              name="month"
              className={cn(field, "cursor-pointer appearance-none pr-11")}
              defaultValue=""
            >
              <option value="" disabled>
                Choose
              </option>
              {months.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
            <CaretDown
              size={15}
              weight="light"
              aria-hidden
              className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-ink-faint"
            />
          </div>
        </div>
        <div>
          <label className={label} htmlFor="people">
            How many of you
          </label>
          <input
            id="people"
            name="people"
            type="number"
            min={1}
            max={20}
            className={field}
            placeholder="2"
          />
        </div>
      </div>

      <div>
        <label className={label} htmlFor="message">
          Anything we should know
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          className={cn(field, "resize-y")}
          placeholder="We have done the Tour du Mont Blanc and are looking for something quieter in early July."
        />
      </div>

      {/*
        GDPR: za odgovor na povprasevanje je podlaga clen 6(1)(b), predpogodbeni
        koraki, zato tu NE prosimo za privolitev v obdelavo. Prvo polje je
        seznanitev z obvestilom (dokaz, da je bilo dano), drugo je locena,
        neobvezna in privzeto neoznacena privolitev za marketing.
      */}
      <div className="flex flex-col gap-3 rounded-[14px] border border-line-soft bg-ink/[0.02] p-4">
        <label className="flex cursor-pointer items-start gap-3">
          <input
            type="checkbox"
            name="privacyAck"
            required
            className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer accent-[var(--color-accent)]"
          />
          <span className="text-[0.8125rem] leading-[1.6] text-ink-soft">
            I have read the{" "}
            <Link
              href="/privacy"
              className="text-accent underline decoration-accent/35 underline-offset-4 transition-colors duration-[var(--dur-ui)] hover:decoration-accent"
            >
              privacy policy
            </Link>{" "}
            and understand that Anja and Darja will use these details to answer this enquiry.
            <span className="text-ink-faint"> Required.</span>
          </span>
        </label>

        <label className="flex cursor-pointer items-start gap-3">
          <input
            type="checkbox"
            name="marketingConsent"
            className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer accent-[var(--color-accent)]"
          />
          <span className="text-[0.8125rem] leading-[1.6] text-ink-soft">
            Write to me a few times a year when a new route opens. No more than that, and one line
            in any email unsubscribes me.
            <span className="text-ink-faint"> Optional, and it changes nothing about your quote.</span>
          </span>
        </label>
      </div>

      {/* honeypot, skrit pred ljudmi */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute left-[-9999px] h-0 w-0 opacity-0"
      />

      {state === "error" && (
        <p className="flex items-start gap-2 text-[0.875rem] text-accent" role="alert">
          <Warning size={18} weight="light" className="mt-0.5 shrink-0" />
          <span>
            {error}. You can also write to us directly at{" "}
            <a href={`mailto:${site.email}`} className="underline underline-offset-4">
              {site.email}
            </a>
            .
          </span>
        </p>
      )}

      <div className="flex flex-wrap items-center gap-x-5 gap-y-3 pt-1">
        <button
          type="submit"
          disabled={state === "sending"}
          className={cn(
            "group inline-flex items-center gap-3 rounded-full bg-accent pl-6 pr-2 py-2 font-medium text-white",
            "transition-[transform,background-color] duration-[var(--dur-press)] ease-[cubic-bezier(0.32,0.72,0,1)]",
            "hover:bg-[#9c4429] active:scale-[0.975] disabled:opacity-60",
          )}
        >
          <span className="py-1 text-[0.9375rem] leading-none">
            {state === "sending" ? "Sending" : "Send the enquiry"}
          </span>
          <span
            aria-hidden
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white/18 transition-transform duration-[var(--dur-ui)] ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5 group-hover:-translate-y-px group-hover:scale-105"
          >
            <ArrowUpRight size={16} weight="light" />
          </span>
        </button>
        <p className="text-[0.8125rem] text-ink-faint">
          No payment, no deposit. A full price {site.replyTime}.
        </p>
      </div>
    </form>
  )
}
