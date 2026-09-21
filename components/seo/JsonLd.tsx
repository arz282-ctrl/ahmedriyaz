/**
 * Server component. Emits structured data as a raw script tag so it is
 * serialized into the static HTML at build time.
 *
 * Deliberately not next/script: its default afterInteractive strategy injects
 * client-side, which Googlebot renders but the plain-HTML fetchers used by AI
 * answer engines do not — and those are half the audience for this markup.
 */
export default function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      // Escape `<` so no content string can break out of the script element.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, '\\u003c'),
      }}
    />
  )
}
