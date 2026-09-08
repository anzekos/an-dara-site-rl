import Link from "next/link"
import { Eyebrow } from "@/components/ui/bits"
import { isTodo, showBlanks } from "@/lib/legal"
import { cn } from "@/lib/utils"

const wrap = "mx-auto w-full max-w-[1180px] px-5 sm:px-8"

/**
 * Podatek, ki ga se nimamo. Nikoli ne izmisljamo imena podjetja,
 * maticne stevilke ali naslova. Dokler ni izpolnjeno, je to vidno.
 */
export function Blank({ children }: { children: React.ReactNode }) {
  return (
    <mark
      className="rounded-[4px] bg-accent-quiet px-1.5 py-0.5 font-mono text-[0.8125em] text-accent-strong"
      title="To be completed before launch"
    >
      [ {children} ]
    </mark>
  )
}

/**
 * Izpise vrednost, ce jo imamo. Ce je nimamo, se izrise vidna oznaka
 * samo med urejanjem (showBlanks), na produkciji pa nic.
 */
export function Fill({ value, label }: { value: string; label: string }) {
  if (isTodo(value)) return showBlanks ? <Blank>{label}</Blank> : null
  return <>{value}</>
}

/**
 * Vrstica "Oznaka: vrednost" v seznamu podatkov o ponudniku.
 *
 * Ce vrednosti nimamo, vrstice sploh ni. Tako na produkciji ne ostane
 * niti prazna oznaka niti viseca dvopicja, ko podatek se manjka.
 */
export function Row({
  label,
  value,
  blank,
  children,
}: {
  label: string
  value?: string
  blank?: string
  children?: React.ReactNode
}) {
  const missing = value !== undefined && isTodo(value)
  if (missing && !showBlanks) return null
  return (
    <LI>
      <strong className="font-medium text-ink">{label}:</strong>{" "}
      {children ?? (missing ? <Blank>{blank ?? label}</Blank> : value)}
    </LI>
  )
}



export function LegalHero({
  eyebrow,
  title,
  lead,
  updated,
}: {
  eyebrow: string
  title: string
  lead: string
  updated: string
}) {
  return (
    <section className="border-b border-line bg-paper-2 pb-14 pt-32 md:pb-16 md:pt-36">
      <div className={wrap}>
        <Eyebrow tone="accent">{eyebrow}</Eyebrow>
        <h1 className="mt-6 max-w-[20ch] text-[2.4rem] leading-[1] sm:text-[3rem] md:text-[3.4rem]">
          {title}
        </h1>
        <p className="mt-6 max-w-[62ch] text-[1.0625rem] leading-[1.7] text-ink-soft">{lead}</p>
        <p className="mt-7 font-mono text-[0.75rem] uppercase tracking-[0.16em] text-ink-faint">
          Last updated {updated}
        </p>
      </div>
    </section>
  )
}

/** Telo pravne strani. Ozek stolpec, ker gre za dolgo branje. */
export function LegalBody({ children }: { children: React.ReactNode }) {
  return (
    <section className="py-16 md:py-24">
      <div className={wrap}>
        <div className="max-w-[70ch]">{children}</div>
      </div>
    </section>
  )
}

export function Section({
  id,
  n,
  title,
  children,
}: {
  id: string
  n: string
  title: string
  children: React.ReactNode
}) {
  return (
    <section id={id} className="mt-14 scroll-mt-28 border-t border-line pt-9 first:mt-0 first:border-0 first:pt-0">
      <div className="flex items-baseline gap-4">
        <span className="font-mono text-[11px] tracking-[0.18em] text-ink-faint">{n}</span>
        <h2 className="text-[1.5rem] leading-tight sm:text-[1.75rem]">{title}</h2>
      </div>
      <div className="mt-5 flex flex-col gap-4">{children}</div>
    </section>
  )
}

export function H3({ children }: { children: React.ReactNode }) {
  return <h3 className="mt-3 text-[1.125rem] leading-snug text-ink">{children}</h3>
}

export function P({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={cn("text-[0.9375rem] leading-[1.75] text-ink-soft", className)}>{children}</p>
  )
}

export function UL({ children }: { children: React.ReactNode }) {
  return <ul className="flex list-none flex-col gap-2.5 pl-0">{children}</ul>
}

export function LI({ children }: { children: React.ReactNode }) {
  return (
    <li className="relative pl-5 text-[0.9375rem] leading-[1.7] text-ink-soft">
      <span
        aria-hidden
        className="absolute left-0 top-[0.72em] h-1 w-1 rounded-full bg-accent"
      />
      {children}
    </li>
  )
}

/** Notranja povezava v akcentni barvi. */
export function A({ href, children }: { href: string; children: React.ReactNode }) {
  const external = href.startsWith("http") || href.startsWith("mailto:")
  const cls =
    "text-accent underline decoration-accent/35 underline-offset-4 transition-colors duration-[var(--dur-ui)] hover:decoration-accent"
  if (external) {
    return (
      <a
        href={href}
        className={cls}
        {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {children}
      </a>
    )
  }
  return (
    <Link href={href} className={cls}>
      {children}
    </Link>
  )
}

/** Poudarjeno opozorilo znotraj pravnega besedila. */
export function Note({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-[18px] border border-line bg-raised p-5 sm:p-6">
      <div className="flex flex-col gap-3 text-[0.9375rem] leading-[1.7] text-ink-soft">
        {children}
      </div>
    </div>
  )
}

/** Vodoravno drsljiva tabela. Na telefonu nikoli ne razbije postavitve. */
export function Table({ head, rows }: { head: string[]; rows: React.ReactNode[][] }) {
  return (
    <div className="-mx-5 overflow-x-auto px-5 sm:mx-0 sm:px-0">
      <table className="w-full min-w-[560px] border-collapse text-left">
        <thead>
          <tr className="border-b border-line">
            {head.map((h) => (
              <th
                key={h}
                scope="col"
                className="py-3 pr-6 text-[10px] font-medium uppercase tracking-[0.18em] text-ink-faint"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className="border-b border-line-soft align-top">
              {r.map((cell, j) => (
                <td
                  key={j}
                  className={cn(
                    "py-4 pr-6 text-[0.875rem] leading-[1.65]",
                    j === 0 ? "font-mono text-[0.8125rem] text-ink" : "text-ink-soft",
                  )}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
