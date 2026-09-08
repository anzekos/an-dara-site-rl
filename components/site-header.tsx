"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { EnvelopeSimple } from "@phosphor-icons/react/dist/ssr"
import { site } from "@/lib/site"
import { cn } from "@/lib/utils"

const nav = [
  { href: "/#self-guided", label: "What self-guided means" },
  { href: "/#itinerary", label: "The seven days" },
  { href: "/about", label: "About us" },
  { href: "/contact", label: "Contact" },
]

export function SiteHeader() {
  const [open, setOpen] = useState(false)
  const [lifted, setLifted] = useState(false)
  const pathname = usePathname()

  // scroll stanje prek sentinela, nikoli prek scroll listenerja
  useEffect(() => {
    const el = document.getElementById("top-sentinel")
    if (!el) return
    const io = new IntersectionObserver(([e]) => setLifted(!e.isIntersecting), {
      threshold: 0,
    })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  useEffect(() => setOpen(false), [pathname])

  // Samo strani s temnim foto herojem prenesejo prosojen header.
  // Povsod drugje je header takoj papirnat, sicer je belo besedilo na svetlem ozadju.
  const overDarkHero = pathname === "/" || pathname === "/about"
  const solid = lifted || open || !overDarkHero

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false)
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open])

  return (
    <>
      <header className="pointer-events-none fixed inset-x-0 top-0 z-40 px-3 pt-3 sm:px-5 sm:pt-4">
        <div
          className={cn(
            "pointer-events-auto mx-auto flex max-w-[1180px] items-center gap-3 rounded-full",
            "px-3 py-2.5 sm:pl-5 sm:pr-3",
            "transition-[background-color,box-shadow,border-color] duration-[var(--dur-overlay)] ease-[cubic-bezier(0.32,0.72,0,1)]",
            solid
              ? "border border-line-soft bg-paper/85 shadow-[0_1px_2px_rgba(22,32,31,0.04),0_18px_40px_-24px_rgba(22,32,31,0.28)] backdrop-blur-xl"
              : "border border-white/20 bg-white/8 backdrop-blur-md",
          )}
        >
          <Link
            href="/"
            className="group/logo -my-1 flex min-h-11 shrink-0 items-center gap-2.5 py-1"
            aria-label={`${site.name}, home`}
          >
            <Image
              src="/andara-mark.png"
              alt=""
              width={320}
              height={320}
              priority
              className="h-8 w-8 transition-transform duration-[var(--dur-ui)] ease-[cubic-bezier(0.32,0.72,0,1)] group-hover/logo:scale-105 sm:h-9 sm:w-9"
            />
            <span className="flex flex-col leading-none">
              <span
                className={cn(
                  "font-display text-[1.0625rem] tracking-[0.16em] transition-colors duration-[var(--dur-ui)]",
                  solid ? "text-ink" : "text-white",
                )}
              >
                ANDARA
              </span>
              <span
                className={cn(
                  "mt-1 hidden text-[9px] uppercase tracking-[0.15em] transition-colors duration-[var(--dur-ui)] sm:block",
                  solid ? "text-ink-faint" : "text-white/70",
                )}
              >
                Self-guided treks
              </span>
            </span>
          </Link>

          <nav className="ml-auto hidden items-center gap-1 lg:flex" aria-label="Main">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={pathname === item.href ? "page" : undefined}
                className={cn(
                  "rounded-full px-3.5 py-2 text-[0.8125rem] tracking-[-0.01em]",
                  pathname === item.href && "bg-ink/[0.06]",
                  "transition-[background-color,color] duration-[var(--dur-ui)]",
                  solid
                    ? "text-ink-soft hover:bg-ink/[0.05] hover:text-ink"
                    : "text-white/85 hover:bg-white/12 hover:text-white",
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <a
            href={`mailto:${site.email}`}
            aria-label={`Email us at ${site.email}`}
            className={cn(
              "ml-auto hidden min-h-11 items-center gap-2 rounded-full px-3.5 py-2 text-[0.8125rem] lg:ml-1 lg:mr-1 lg:flex",
              "transition-[background-color,color] duration-[var(--dur-ui)]",
              solid
                ? "text-ink-soft hover:bg-ink/[0.05] hover:text-ink"
                : "text-white/85 hover:bg-white/12 hover:text-white",
            )}
          >
            <EnvelopeSimple size={15} weight="light" />
            <span className="hidden xl:inline">{site.email}</span>
          </a>

          <Link
            href="/contact"
            className={cn(
              "hidden shrink-0 rounded-full bg-accent px-5 py-2.5 text-[0.8125rem] font-medium text-white sm:ml-auto sm:block lg:ml-0",
              "transition-[transform,background-color] duration-[var(--dur-press)] ease-[cubic-bezier(0.32,0.72,0,1)]",
              "hover:bg-[#9c4429] active:scale-[0.975]",
            )}
          >
            Plan your dates
          </Link>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            className={cn(
              "ml-auto flex h-11 w-11 shrink-0 items-center justify-center rounded-full sm:ml-1 lg:hidden",
              "transition-[background-color] duration-[var(--dur-ui)]",
              solid ? "hover:bg-ink/[0.05]" : "hover:bg-white/12",
            )}
          >
            <span className="relative block h-3 w-5" aria-hidden>
              <span
                className={cn(
                  "absolute left-0 block h-px w-5 origin-center",
                  "transition-transform duration-[var(--dur-overlay)] ease-[cubic-bezier(0.32,0.72,0,1)]",
                  solid ? "bg-ink" : "bg-white",
                  open ? "top-1.5 rotate-45" : "top-0 rotate-0",
                )}
              />
              <span
                className={cn(
                  "absolute left-0 block h-px w-5 origin-center",
                  "transition-transform duration-[var(--dur-overlay)] ease-[cubic-bezier(0.32,0.72,0,1)]",
                  solid ? "bg-ink" : "bg-white",
                  open ? "top-1.5 -rotate-45" : "top-3 rotate-0",
                )}
              />
            </span>
          </button>
        </div>
      </header>

      {/* mobilni overlay */}
      <div
        className={cn(
          "fixed inset-0 z-30 lg:hidden",
          "transition-opacity duration-[var(--dur-overlay)] ease-[cubic-bezier(0.32,0.72,0,1)]",
          open ? "opacity-100" : "pointer-events-none opacity-0",
        )}
        aria-hidden={!open}
      >
        <div className="absolute inset-0 bg-paper/97 backdrop-blur-2xl" onClick={() => setOpen(false)} />
        <nav
          className="relative flex h-full flex-col justify-center px-7 pb-24 pt-24"
          aria-label="Mobile"
        >
          <ul className="flex flex-col gap-1">
            {nav.map((item, i) => (
              <li
                key={item.href}
                className={cn(
                  "overflow-hidden transition-[opacity,transform] duration-[var(--dur-reveal)] ease-[cubic-bezier(0.32,0.72,0,1)]",
                  open ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0",
                )}
                style={{ transitionDelay: open ? `${80 + i * 55}ms` : "0ms" }}
              >
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block border-b border-line-soft py-4 font-display text-[1.75rem] leading-tight text-ink"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <div
            className={cn(
              "mt-10 flex flex-col gap-3 transition-[opacity,transform] duration-[var(--dur-reveal)] ease-[cubic-bezier(0.32,0.72,0,1)]",
              open ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0",
            )}
            style={{ transitionDelay: open ? "320ms" : "0ms" }}
          >
            <a
              href={`mailto:${site.email}`}
              className="flex min-h-11 items-center gap-2.5 text-[0.9375rem] text-ink-soft"
            >
              <EnvelopeSimple size={17} weight="light" />
              {site.email}
            </a>
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-full bg-accent px-6 py-3.5 text-center text-[0.9375rem] font-medium text-white active:scale-[0.975]"
            >
              Plan your dates
            </Link>
          </div>
        </nav>
      </div>
    </>
  )
}
