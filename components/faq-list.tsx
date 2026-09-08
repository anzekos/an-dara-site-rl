import { Plus } from "@phosphor-icons/react/dist/ssr"

/**
 * Native <details>. Vsi odgovori so v HTML od prve sekunde, kar je pomembno
 * za FAQ rich snippete in za tipkovnico. Animira se samo rotacija znaka
 * in vstop vsebine, nikoli visina.
 */
export function FaqList({ items }: { items: readonly { q: string; a: string }[] }) {
  return (
    <div className="rule-top">
      {items.map((item) => (
        <details key={item.q} className="group border-b border-line">
          <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-6 [&::-webkit-details-marker]:hidden">
            <h3 className="max-w-[46ch] text-[1.125rem] leading-snug text-ink transition-colors duration-[var(--dur-ui)] group-hover:text-accent md:text-[1.25rem]">
              {item.q}
            </h3>
            <span
              aria-hidden
              className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-ink/[0.05] text-ink-soft transition-transform duration-[var(--dur-overlay)] ease-[cubic-bezier(0.32,0.72,0,1)] group-open:rotate-45 group-open:bg-accent group-open:text-white"
            >
              <Plus size={15} weight="light" />
            </span>
          </summary>
          <div className="faq-body max-w-[62ch] pb-7 pr-12 text-[0.9375rem] leading-[1.7] text-ink-soft">
            {item.a}
          </div>
        </details>
      ))}
    </div>
  )
}
