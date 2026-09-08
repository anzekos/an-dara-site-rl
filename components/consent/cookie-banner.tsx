"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Cookie, Check } from "@phosphor-icons/react/dist/ssr"
import { useConsent } from "./consent-provider"
import { cn } from "@/lib/utils"

/**
 * Pasica za privolitev. Dve pravili, ki ju ne smemo krsiti:
 * 1. "Only necessary" je enako viden in enako lahko dosegljiv kot "Accept".
 * 2. Nic se ne nalozi, dokler obiskovalec ne izbere. Zapiranje z Escape
 *    NE pomeni privolitve, zato pasice ni mogoce zapreti brez izbire,
 *    dokler izbire se ni.
 */
export function CookieBanner() {
  const { consent, open, ready, save, closeSettings } = useConsent()
  const [analytics, setAnalytics] = useState(false)
  const [shown, setShown] = useState(false)

  // ze izbrano stanje prenesemo v stikalo, ko se plosca odpre iz noge
  useEffect(() => {
    if (open) setAnalytics(consent?.analytics ?? false)
  }, [open, consent])

  // vstopna animacija sele po montazi, sicer preskoci
  useEffect(() => {
    if (!open) {
      setShown(false)
      return
    }
    const t = window.setTimeout(() => setShown(true), 20)
    return () => window.clearTimeout(t)
  }, [open])

  // Escape zapre samo, ce izbira ze obstaja. Sicer bi bilo tiho zavracanje.
  useEffect(() => {
    if (!open || !consent) return
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && closeSettings()
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open, consent, closeSettings])

  if (!ready || !open) return null

  const btn =
    "inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-full px-5 py-3 " +
    "text-[0.9375rem] font-medium transition-[transform,background-color,border-color,color] " +
    "duration-[var(--dur-press)] ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.975] sm:flex-none"

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-labelledby="consent-title"
      className="fixed inset-x-0 bottom-0 z-50 px-3 pb-3 sm:px-5 sm:pb-5"
    >
      <div
        className={cn(
          "mx-auto max-w-[640px] rounded-[24px] bg-ink/[0.035] p-1.5 ring-1 ring-ink/[0.055]",
          "shadow-[0_2px_6px_rgba(22,32,31,0.06),0_28px_60px_-28px_rgba(22,32,31,0.45)]",
          "transition-[opacity,transform] duration-[var(--dur-overlay)] ease-[cubic-bezier(0.32,0.72,0,1)]",
          shown ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
        )}
      >
        <div className="rounded-[18px] bg-raised p-6 sm:p-7">
          <div className="flex items-start gap-3.5">
            <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent-quiet text-accent">
              <Cookie size={18} weight="light" />
            </span>
            <div>
              <h2 id="consent-title" className="text-[1.25rem] leading-tight">
                A quick word about cookies
              </h2>
              <p className="mt-2.5 max-w-[52ch] text-[0.9375rem] leading-[1.65] text-ink-soft">
                This site needs nothing from you to work. We would like to count visits with Google
                Analytics so we know which pages are worth writing better. That sets cookies, so it
                only happens if you say yes. Nothing is loaded before you choose.
              </p>
            </div>
          </div>

          {/* granularno stikalo */}
          <fieldset className="mt-6 flex flex-col gap-2.5 border-t border-line-soft pt-5">
            <legend className="sr-only">Cookie categories</legend>

            <div className="flex items-center justify-between gap-4 rounded-[12px] bg-ink/[0.025] px-4 py-3">
              <div>
                <p className="text-[0.9375rem] text-ink">Strictly necessary</p>
                <p className="mt-0.5 text-[0.8125rem] text-ink-faint">
                  Only your answer to this question. Cannot be switched off.
                </p>
              </div>
              <span className="shrink-0 text-[0.8125rem] text-ink-faint">Always on</span>
            </div>

            <label className="flex cursor-pointer items-center justify-between gap-4 rounded-[12px] px-4 py-3 transition-colors duration-[var(--dur-ui)] hover:bg-ink/[0.025]">
              <span>
                <span className="block text-[0.9375rem] text-ink">Analytics</span>
                <span className="mt-0.5 block text-[0.8125rem] text-ink-faint">
                  Google Analytics, two cookies, kept two years.
                </span>
              </span>
              <span className="relative shrink-0">
                <input
                  type="checkbox"
                  checked={analytics}
                  onChange={(e) => setAnalytics(e.target.checked)}
                  className="peer sr-only"
                />
                <span
                  aria-hidden
                  className={cn(
                    "flex h-6 w-11 items-center rounded-full p-0.5 transition-colors duration-[var(--dur-ui)]",
                    "peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-3 peer-focus-visible:outline-accent",
                    analytics ? "bg-accent" : "bg-ink/20",
                  )}
                >
                  <span
                    className={cn(
                      "flex h-5 w-5 items-center justify-center rounded-full bg-white shadow-sm",
                      "transition-transform duration-[var(--dur-ui)] ease-[cubic-bezier(0.32,0.72,0,1)]",
                      analytics ? "translate-x-5" : "translate-x-0",
                    )}
                  >
                    {analytics && <Check size={11} weight="bold" className="text-accent" />}
                  </span>
                </span>
              </span>
            </label>
          </fieldset>

          {/* Obe glavni izbiri sta enako veliki in enako blizu. */}
          <div className="mt-6 flex flex-col gap-2.5 sm:flex-row">
            <button
              type="button"
              onClick={() => save({ analytics: false })}
              className={cn(btn, "border border-line text-ink hover:border-ink/40 hover:bg-ink/[0.035]")}
            >
              Only necessary
            </button>
            <button
              type="button"
              onClick={() => save({ analytics: true })}
              className={cn(btn, "bg-accent text-white hover:bg-[#9c4429]")}
            >
              Accept analytics
            </button>
            {analytics !== (consent?.analytics ?? false) && (
              <button
                type="button"
                onClick={() => save({ analytics })}
                className={cn(btn, "border border-accent/40 text-accent hover:bg-accent-quiet")}
              >
                Save my choice
              </button>
            )}
          </div>

          <p className="mt-4 text-[0.8125rem] leading-relaxed text-ink-faint">
            You can change this at any time from the footer.{" "}
            <Link
              href="/cookies"
              className="underline underline-offset-4 transition-colors duration-[var(--dur-ui)] hover:text-ink-soft"
            >
              Cookie policy
            </Link>{" "}
            {String.fromCharCode(183)}{" "}
            <Link
              href="/privacy"
              className="underline underline-offset-4 transition-colors duration-[var(--dur-ui)] hover:text-ink-soft"
            >
              Privacy policy
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
