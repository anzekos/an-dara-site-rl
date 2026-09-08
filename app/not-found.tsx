import type { Metadata } from "next"
import { Cta } from "@/components/ui/cta"
import { Eyebrow } from "@/components/ui/bits"
import { site } from "@/lib/site"

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
}

export default function NotFound() {
  return (
    <section className="mx-auto flex min-h-[70dvh] w-full max-w-[1180px] flex-col justify-center px-5 py-32 sm:px-8">
      <Eyebrow>Error 404</Eyebrow>
      <h1 className="mt-6 max-w-[16ch] text-[2.6rem] leading-[1] sm:text-[3.4rem]">
        This path is not on our map.
      </h1>
      <p className="mt-6 max-w-[48ch] text-[1.0625rem] leading-[1.7] text-ink-soft">
        The page you were looking for has moved or never existed. The trek, however, is exactly where
        you left it.
      </p>
      <div className="mt-9 flex flex-wrap gap-3">
        <Cta href="/">Back to the trek</Cta>
        <Cta href={`mailto:${site.email}`} variant="outline">
          {site.email}
        </Cta>
      </div>
    </section>
  )
}
