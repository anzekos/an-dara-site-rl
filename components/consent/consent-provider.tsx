"use client"

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react"

/**
 * Edini vir resnice o privolitvi. Stanje zivi v localStorage, ne v piskotku,
 * zato pred privolitvijo na napravo ne zapisemo nicesar, kar bi bilo treba
 * prijaviti. GA se ne naloZi, dokler analytics ni true.
 */

export type ConsentState = { analytics: boolean }

type Stored = ConsentState & { at: string; v: number }

const KEY = "andara_consent"
const VERSION = 1
const MAX_AGE_MS = 180 * 24 * 60 * 60 * 1000 // 6 mesecev, potem vprasamo znova

type Ctx = {
  /** null = se nismo prebrali iz localStorage (prvi render, SSR). */
  consent: ConsentState | null
  /** true, ko je pasica ali plosca odprta. */
  open: boolean
  /** Odpre ploscico za spremembo izbire. Klicano iz noge. */
  openSettings: () => void
  closeSettings: () => void
  save: (next: ConsentState) => void
  /** true, ko smo ze prebrali localStorage in vemo, kaj izrisati. */
  ready: boolean
}

const ConsentContext = createContext<Ctx | null>(null)

function read(): Stored | null {
  try {
    const raw = window.localStorage.getItem(KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as Stored
    if (parsed.v !== VERSION) return null
    if (Date.now() - new Date(parsed.at).getTime() > MAX_AGE_MS) return null
    return { ...parsed, analytics: parsed.analytics === true }
  } catch {
    return null
  }
}

/** Consent Mode v2. Varno tudi, ce gtag se ni naloZen: stub je v <head>. */
function pushToGoogle(next: ConsentState) {
  const w = window as unknown as { gtag?: (...args: unknown[]) => void }
  if (typeof w.gtag !== "function") return
  const value = next.analytics ? "granted" : "denied"
  w.gtag("consent", "update", {
    analytics_storage: value,
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  })
}

export function ConsentProvider({ children }: { children: React.ReactNode }) {
  const [consent, setConsent] = useState<ConsentState | null>(null)
  const [open, setOpen] = useState(false)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const stored = read()
    if (stored) {
      setConsent({ analytics: stored.analytics })
      pushToGoogle({ analytics: stored.analytics })
    } else {
      setOpen(true)
    }
    setReady(true)
  }, [])

  const save = useCallback((next: ConsentState) => {
    const record: Stored = { ...next, at: new Date().toISOString(), v: VERSION }
    try {
      window.localStorage.setItem(KEY, JSON.stringify(record))
    } catch {
      /* private mode, izbira velja samo za to sejo */
    }
    setConsent(next)
    setOpen(false)
    pushToGoogle(next)
  }, [])

  const value = useMemo<Ctx>(
    () => ({
      consent,
      open,
      ready,
      save,
      openSettings: () => setOpen(true),
      closeSettings: () => setOpen(false),
    }),
    [consent, open, ready, save],
  )

  return <ConsentContext.Provider value={value}>{children}</ConsentContext.Provider>
}

export function useConsent(): Ctx {
  const ctx = useContext(ConsentContext)
  if (!ctx) throw new Error("useConsent mora biti znotraj ConsentProvider")
  return ctx
}
