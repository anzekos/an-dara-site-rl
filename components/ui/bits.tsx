import { cn } from "@/lib/utils"

/** Mikro oznaka nad naslovom. Preset high-end-visual-design, sekcija 4C. */
export function Eyebrow({
  children,
  tone = "ink",
  className,
}: {
  children: React.ReactNode
  tone?: "ink" | "light" | "accent"
  className?: string
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-3.5 py-1.5",
        "text-[10px] font-medium uppercase tracking-[0.2em]",
        tone === "ink" && "bg-ink/[0.055] text-ink-soft",
        tone === "accent" && "bg-accent-quiet text-accent-strong",
        tone === "light" && "bg-white/12 text-white backdrop-blur-sm ring-1 ring-white/25",
        className,
      )}
    >
      {children}
    </span>
  )
}

/**
 * Double-bezel: zunanja lupina (24px) + notranje jedro (18px).
 * Nikoli ne polagaj kartice ali medija naravnost na ozadje.
 */
export function Bezel({
  children,
  className,
  innerClassName,
  tone = "paper",
}: {
  children: React.ReactNode
  className?: string
  innerClassName?: string
  tone?: "paper" | "raised" | "light"
}) {
  return (
    <div
      className={cn(
        "rounded-[24px] p-1.5",
        tone === "light"
          ? "bg-white/[0.07] ring-1 ring-white/12"
          : "bg-ink/[0.035] ring-1 ring-ink/[0.055]",
        className,
      )}
    >
      <div
        className={cn(
          "h-full w-full overflow-hidden rounded-[18px]",
          tone === "raised" && "bg-raised shadow-[0_1px_2px_rgba(22,32,31,0.04),0_12px_32px_-16px_rgba(22,32,31,0.14)]",
          tone === "paper" && "bg-paper",
          tone === "light" && "bg-white/[0.04]",
          innerClassName,
        )}
      >
        {children}
      </div>
    </div>
  )
}

/** Naslov sekcije z uredniško številko in črto. */
export function SectionHead({
  index,
  eyebrow,
  title,
  lead,
  align = "left",
  tone = "ink",
  className,
}: {
  index?: string
  eyebrow?: string
  title: React.ReactNode
  lead?: React.ReactNode
  align?: "left" | "center"
  tone?: "ink" | "light"
  className?: string
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-5",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      {(index || eyebrow) && (
        <div className="flex items-baseline gap-4">
          {index && (
            <span
              className={cn(
                "font-mono text-[11px] tracking-[0.18em]",
                tone === "light" ? "text-white/50" : "text-ink-faint",
              )}
            >
              {index}
            </span>
          )}
          {eyebrow && <Eyebrow tone={tone === "light" ? "light" : "ink"}>{eyebrow}</Eyebrow>}
        </div>
      )}
      <h2
        className={cn(
          "text-[2.25rem] leading-[1.05] sm:text-[2.9rem] md:text-[3.4rem]",
          tone === "light" ? "text-white" : "text-ink",
        )}
      >
        {title}
      </h2>
      {lead && (
        <p
          className={cn(
            "max-w-[54ch] text-[1.0625rem] leading-[1.65]",
            tone === "light" ? "text-white/80" : "text-ink-soft",
            align === "center" && "mx-auto",
          )}
        >
          {lead}
        </p>
      )}
    </div>
  )
}

/**
 * Podatkovna vrednost v mono pisavi. Vedno stoji znotraj <dl>, zato sta
 * oznaka in vrednost <dt> in <dd>, ovita v en sam <div>. Vec ravni <div>
 * med <dl> in <dt> HTML ne dovoli in axe to upraviceno prijavi.
 */
export function Stat({
  label,
  value,
  tone = "ink",
}: {
  label: string
  value: string
  tone?: "ink" | "light"
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <dt
        className={cn(
          "text-[10px] uppercase tracking-[0.18em]",
          tone === "light" ? "text-white/55" : "text-ink-faint",
        )}
      >
        {label}
      </dt>
      <dd
        className={cn(
          "font-mono text-[0.9375rem] tracking-[-0.01em]",
          tone === "light" ? "text-white" : "text-ink",
        )}
      >
        {value}
      </dd>
    </div>
  )
}
