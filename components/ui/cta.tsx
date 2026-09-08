import Link from "next/link"
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr"
import { cn } from "@/lib/utils"

type Variant = "solid" | "outline" | "ghost-light"

const base =
  "group inline-flex items-center gap-3 rounded-full font-medium tracking-[-0.01em] " +
  "transition-[transform,background-color,color,border-color] duration-[var(--dur-press)] " +
  "ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.975] select-none"

const variants: Record<Variant, string> = {
  solid: "bg-accent text-white pl-6 pr-2 py-2 hover:bg-[#9c4429]",
  outline:
    "border border-line text-ink pl-6 pr-2 py-2 hover:border-ink/40 hover:bg-ink/[0.035]",
  "ghost-light":
    "border border-white/35 text-white pl-6 pr-2 py-2 hover:bg-white/12 hover:border-white/60",
}

const dots: Record<Variant, string> = {
  solid: "bg-white/18 text-white",
  outline: "bg-ink/[0.07] text-ink",
  "ghost-light": "bg-white/18 text-white",
}

export function Cta({
  href,
  children,
  variant = "solid",
  className,
  external,
}: {
  href: string
  children: React.ReactNode
  variant?: Variant
  className?: string
  external?: boolean
}) {
  const inner = (
    <>
      <span className="text-[0.9375rem] leading-none py-1">{children}</span>
      <span
        aria-hidden
        className={cn(
          "flex h-9 w-9 shrink-0 items-center justify-center rounded-full",
          "transition-transform duration-[var(--dur-ui)] ease-[cubic-bezier(0.32,0.72,0,1)]",
          "group-hover:translate-x-0.5 group-hover:-translate-y-px group-hover:scale-105",
          dots[variant],
        )}
      >
        <ArrowUpRight size={16} weight="light" />
      </span>
    </>
  )

  if (external || href.startsWith("mailto:") || href.startsWith("http")) {
    return (
      <a
        href={href}
        className={cn(base, variants[variant], className)}
        {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {inner}
      </a>
    )
  }

  return (
    <Link href={href} className={cn(base, variants[variant], className)}>
      {inner}
    </Link>
  )
}
