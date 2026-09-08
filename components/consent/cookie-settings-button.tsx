"use client"

import { useConsent } from "./consent-provider"

/** Trajna pot nazaj do izbire. Zahteva GDPR: preklic mora biti tako lahek kot privolitev. */
export function CookieSettingsButton({ className }: { className?: string }) {
  const { openSettings } = useConsent()
  return (
    <button type="button" onClick={openSettings} className={className}>
      Cookie settings
    </button>
  )
}
