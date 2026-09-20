/**
 * FAQ list built on native <details>/<summary>.
 *
 * Deliberately not the Radix accordion: Radix unmounts closed panels, so the
 * answers would be missing from the SSR HTML — invisible to the plain-HTML
 * fetchers AI answer engines use, and out of sync with the FAQPage JSON-LD,
 * which is itself a structured-data violation. <details> keeps every answer in
 * the DOM, needs no client JS, and is accessible by default.
 */

export type QA = { q: string; a: string }

export default function Faq({ items }: { items: readonly QA[] }) {
  return (
    <div className="divide-y divide-[var(--card-border)] border-y border-[var(--card-border)]">
      {items.map(({ q, a }) => (
        <details key={q} className="group py-5" open>
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left">
            <h3 className="font-display text-lg italic leading-snug text-[var(--silver)] md:text-xl">{q}</h3>
            <span
              aria-hidden
              className="shrink-0 font-code text-xs text-[rgba(125,211,252,0.7)] transition-transform duration-300 group-open:rotate-45"
            >
              +
            </span>
          </summary>
          <p className="mt-3 max-w-2xl font-sans text-sm leading-relaxed text-[rgba(224,224,224,0.62)]">{a}</p>
        </details>
      ))}
    </div>
  )
}
