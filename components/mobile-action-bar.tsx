"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { EnvelopeSimple, CalendarBlank } from "@phosphor-icons/react/dist/ssr"
import { site } from "@/lib/site"
import { useConsent } from "@/components/consent/consent-provider"

/**
 * Sticky kontaktna vrstica na mobilnem. Resuje "kontakt je preskrit":
 * na telefonu je vsaj en kontaktni kanal viden na vsakem pikslu strani.
 *
 * Umakne se, dokler je odprta pasica o piskotkih, sicer se na telefonu
 * prekrivata in gumb "Only necessary" je tezje zadeti.
 */
export function MobileActionBar() {
  const pathname = usePathname()
  const { open: consentOpen } = useConsent()
  if (pathname === "/contact" || consentOpen) return null

  return (
    <div className="fixed inset-x-0 bottom-0 z-20 px-3 pb-3 lg:hidden">
      <div className="mx-auto flex max-w-md items-center gap-2 rounded-full border border-line-soft bg-paper/90 p-1.5 shadow-[0_1px_2px_rgba(22,32,31,0.05),0_18px_40px_-20px_rgba(22,32,31,0.35)] backdrop-blur-xl">
        <a
          href={`mailto:${site.email}`}
          className="flex flex-1 items-center justify-center gap-2 rounded-full px-4 py-3 text-[0.875rem] text-ink transition-transform duration-[var(--dur-press)] active:scale-[0.975]"
        >
          <EnvelopeSimple size={17} weight="light" />
          Email us
        </a>
        <Link
          href="/contact"
          className="flex flex-1 items-center justify-center gap-2 rounded-full bg-accent px-4 py-3 text-[0.875rem] font-medium text-white transition-transform duration-[var(--dur-press)] active:scale-[0.975]"
        >
          <CalendarBlank size={17} weight="light" />
          Plan your dates
        </Link>
      </div>
    </div>
  )
}
