import Link from "next/link"
import Image from "next/image"
import { EnvelopeSimple, InstagramLogo, TiktokLogo, Plus } from "@phosphor-icons/react/dist/ssr"
import { site, imageCredits } from "@/lib/site"
import { company, legalNav } from "@/lib/legal"
import { Fill } from "@/components/legal/prose"
import { CookieSettingsButton } from "@/components/consent/cookie-settings-button"

const nav = [
  { href: "/#self-guided", label: "What self-guided means" },
  { href: "/#how", label: "How it works" },
  { href: "/#itinerary", label: "The seven days" },
  { href: "/#included", label: "What is included" },
  { href: "/#faq", label: "Questions" },
]

const secondary = [
  { href: "/about", label: "About Anja and Darja" },
  { href: "/contact", label: "Contact" },
]

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-paper-2 pb-28 pt-20 lg:pb-16">
      <div className="mx-auto max-w-[1180px] px-5 sm:px-8">
        <div className="grid gap-14 lg:grid-cols-[1.15fr_1fr_1fr]">
          {/* kontakt blok, namenoma prvi */}
          <div className="flex flex-col gap-6">
            <Link href="/" className="flex items-center gap-3" aria-label={`${site.name}, home`}>
              <Image src="/andara-mark.png" alt="" width={320} height={320} className="h-10 w-10" />
              <span className="flex flex-col leading-none">
                <span className="font-display text-[1.25rem] tracking-[0.16em] text-ink">ANDARA</span>
                <span className="mt-1.5 text-[9px] uppercase tracking-[0.16em] text-ink-faint">
                  {site.tagline}
                </span>
              </span>
            </Link>

            <p className="max-w-[34ch] text-[0.9375rem] leading-relaxed text-ink-soft">
              {site.descriptor}. Run by Anja and Darja, from Slovenia, all year round.
            </p>

            <div className="flex flex-col gap-3">
              <a
                href={`mailto:${site.email}`}
                className="group inline-flex min-h-11 w-fit items-center gap-3 text-[1.0625rem] text-ink transition-colors duration-[var(--dur-ui)] hover:text-accent"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-ink/[0.05] transition-colors duration-[var(--dur-ui)] group-hover:bg-accent group-hover:text-white">
                  <EnvelopeSimple size={16} weight="light" />
                </span>
                {site.email}
              </a>
              <p className="text-[0.8125rem] text-ink-faint">
                We answer every enquiry {site.replyTime}.
              </p>
            </div>

            <div className="flex gap-2 pt-1">
              <a
                href={site.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Andara on Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink-soft transition-[background-color,color,transform] duration-[var(--dur-ui)] hover:bg-ink hover:text-paper active:scale-[0.95]"
              >
                <InstagramLogo size={18} weight="light" />
              </a>
              <a
                href={site.socials.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Andara on TikTok"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink-soft transition-[background-color,color,transform] duration-[var(--dur-ui)] hover:bg-ink hover:text-paper active:scale-[0.95]"
              >
                <TiktokLogo size={18} weight="light" />
              </a>
            </div>
          </div>

          <nav aria-label="The trek">
            <h2 className="mb-5 text-[10px] uppercase tracking-[0.2em] text-ink-faint">
              The Triglav Circuit
            </h2>
            <ul className="flex flex-col gap-3">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="inline-flex min-h-10 items-center text-[0.9375rem] text-ink-soft transition-colors duration-[var(--dur-ui)] hover:text-accent"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Andara">
            <h2 className="mb-5 text-[10px] uppercase tracking-[0.2em] text-ink-faint">Andara</h2>
            <ul className="flex flex-col gap-3">
              {secondary.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="inline-flex min-h-10 items-center text-[0.9375rem] text-ink-soft transition-colors duration-[var(--dur-ui)] hover:text-accent"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-16 border-t border-line pt-8">
          <details className="group">
            <summary className="flex min-h-11 cursor-pointer list-none items-center gap-2 py-3 text-[0.8125rem] text-ink-faint transition-colors duration-[var(--dur-ui)] hover:text-ink-soft [&::-webkit-details-marker]:hidden">
              <Plus
                size={13}
                weight="light"
                className="transition-transform duration-[var(--dur-overlay)] ease-[cubic-bezier(0.32,0.72,0,1)] group-open:rotate-45"
              />
              Image credits
            </summary>
            <ul className="faq-body mt-4 flex flex-col gap-1.5">
              {imageCredits.map((c, i) => (
                <li key={c.href} className="text-[0.8125rem] text-ink-faint">
                  <span className="font-mono text-[11px]">{String(i + 1).padStart(2, "0")}</span>{" "}
                  <a
                    href={c.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline underline-offset-4 transition-colors duration-[var(--dur-ui)] hover:text-accent"
                  >
                    {c.label}
                  </a>{" "}
                  via Wikimedia Commons
                </li>
              ))}
            </ul>
          </details>

          {/* Pravne povezave. Piskotki so gumb, ne povezava, ker odprejo isto plosco kot ob prvem obisku. */}
          <nav aria-label="Legal" className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-1">
            {legalNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="inline-flex min-h-10 items-center text-[0.8125rem] text-ink-faint underline underline-offset-4 transition-colors duration-[var(--dur-ui)] hover:text-accent"
              >
                {item.label}
              </Link>
            ))}
            <CookieSettingsButton className="inline-flex min-h-10 items-center text-[0.8125rem] text-ink-faint underline underline-offset-4 transition-colors duration-[var(--dur-ui)] hover:text-accent" />
          </nav>

          {/*
            Obvezna identifikacija ponudnika: 6. clen ZEPT in 45. clen ZGD-1.
            Mora biti dosegljiva brez klika, zato ni skrita v <details>.
          */}
          <address className="mt-6 max-w-[70ch] not-italic text-[0.75rem] leading-[1.8] text-ink-faint">
            <Fill value={company.legalName} label="registered company name" />
            {", "}
            <Fill value={company.street} label="street and number" />
            {", "}
            <Fill value={company.city} label="postcode and town" />
            {", "}
            {company.country}
            {` ${String.fromCharCode(183)} Reg. no. `}
            <Fill value={company.registrationNumber} label="maticna stevilka" />
            {` ${String.fromCharCode(183)} VAT `}
            <Fill value={company.vatNumber} label="ID za DDV" />
            {` ${String.fromCharCode(183)} `}
            <a
              href={`mailto:${company.email}`}
              className="underline underline-offset-4 transition-colors duration-[var(--dur-ui)] hover:text-accent"
            >
              {company.email}
            </a>
          </address>

          <div className="mt-6 flex flex-col gap-2 text-[0.8125rem] text-ink-faint sm:flex-row sm:items-center sm:justify-between">
            <p>
              {String.fromCharCode(169)} {new Date().getFullYear()} Andara, Slovenia. Self-guided
              hiking tours in the Julian Alps.
            </p>
            <p>
              Made by{" "}
              <a
                href="https://wesolvefast.com"
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-4 transition-colors duration-[var(--dur-ui)] hover:text-accent"
              >
                WeSolveFast
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
