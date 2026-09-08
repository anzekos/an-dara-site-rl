import type { Metadata } from "next"
import Image from "next/image"
import { MapPin, Compass, Heart, Leaf, Boot } from "@phosphor-icons/react/dist/ssr"
import { Reveal } from "@/components/reveal"
import { FaqList } from "@/components/faq-list"
import { Cta } from "@/components/ui/cta"
import { Eyebrow, Bezel, SectionHead } from "@/components/ui/bits"
import { site, about } from "@/lib/site"

export const metadata: Metadata = {
  title: "About Anja and Darja",
  description:
    "Andara is Anja Bervar and Darja Munda, two Slovenian hikers who plan self-guided treks in the Julian Alps. Every hut and every turn is tested by them first.",
  alternates: { canonical: `${site.url}/about` },
}

const wrap = "mx-auto w-full max-w-[1180px] px-5 sm:px-8"
const valueIcons = [Compass, Heart, Leaf, Boot]

export default function AboutPage() {
  return (
    <>
      {/* ------------------------------------------------------------- HERO */}
      <section className="relative flex min-h-[62dvh] flex-col justify-end overflow-hidden pb-14 pt-36">
        <Image
          src="/slovenian-alps.jpg"
          alt="A wide view over the Slovenian Alps"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/50 via-ink/25 to-ink/80" />
        <div className={`relative ${wrap}`}>
          <Reveal>
            <Eyebrow tone="light">Two people, no office</Eyebrow>
            <h1 className="mt-6 max-w-[18ch] text-[2.6rem] leading-[0.98] text-white sm:text-[3.4rem] md:text-[4.25rem]">
              The women who walk it first.
            </h1>
            <p className="mt-6 max-w-[52ch] text-[1.0625rem] leading-[1.7] text-white/85">
              Andara is Anja and Darja. Every hut, every transfer and every turn on the Triglav
              circuit was tested by the two of them before it reached your itinerary.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ------------------------------------------------------------ STORY */}
      <section className="py-24 md:py-32">
        <div className={wrap}>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <Reveal className="lg:col-span-4">
              <SectionHead index="01" eyebrow="How it started" title="Two friends, a lot of trails" />
            </Reveal>
            <Reveal delay={100} className="lg:col-span-8">
              <div className="flex flex-col gap-5">
                <p className="text-[1.1875rem] leading-[1.7] text-ink">{about.intro}</p>
                <p className="text-[1.0625rem] leading-[1.75] text-ink-soft">{about.intro2}</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------ PEOPLE */}
      <section className="border-y border-line bg-paper-2 py-24 md:py-32">
        <div className={wrap}>
          <Reveal>
            <SectionHead
              index="02"
              eyebrow="Who you are writing to"
              title="Anja and Darja"
              lead="Your enquiry does not land in a shared inbox somewhere. One of these two reads it and answers it."
            />
          </Reveal>

          <div className="mt-14 grid gap-6 lg:grid-cols-2 lg:gap-8">
            {about.people.map((p, i) => (
              <Reveal key={p.name} delay={i * 100}>
                <Bezel tone="raised" className="h-full">
                  <div className="flex h-full flex-col p-8 md:p-10">
                    {/*
                      Fotografiji Anje in Darje se se nista prispeli. Ko prideta,
                      se ta monogram zamenja z <Image> v istem kvadratu.
                    */}
                    <span
                      aria-hidden
                      className="flex h-20 w-20 items-center justify-center rounded-full bg-accent-quiet font-display text-[1.75rem] tracking-[0.06em] text-accent"
                    >
                      {p.initials}
                    </span>

                    <h3 className="mt-7 text-[1.75rem] leading-tight">{p.name}</h3>
                    <p className="mt-2 text-[0.8125rem] uppercase tracking-[0.14em] text-accent">
                      {p.role}
                    </p>
                    <p className="mt-5 text-[0.9375rem] leading-[1.75] text-ink-soft">{p.bio}</p>
                    <p className="mt-6 flex items-center gap-2 border-t border-line pt-5 text-[0.8125rem] text-ink-faint">
                      <MapPin size={15} weight="light" />
                      {p.place}
                    </p>
                  </div>
                </Bezel>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------ VALUES */}
      <section className="py-24 md:py-32">
        <div className={wrap}>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <Reveal className="lg:col-span-4">
              <SectionHead index="03" eyebrow="What we hold to" title="Four things we do not bend on" />
            </Reveal>
            <div className="lg:col-span-8">
              <ul className="grid gap-px overflow-hidden rounded-[24px] bg-line-soft sm:grid-cols-2">
                {about.values.map((v, i) => {
                  const Icon = valueIcons[i]
                  return (
                    <Reveal as="li" key={v.title} delay={i * 80}>
                      <div className="flex h-full flex-col gap-4 bg-paper p-7 md:p-8">
                        <Icon size={22} weight="light" className="text-accent" />
                        <h3 className="text-[1.25rem] leading-snug">{v.title}</h3>
                        <p className="text-[0.9375rem] leading-[1.7] text-ink-soft">{v.body}</p>
                      </div>
                    </Reveal>
                  )
                })}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------- MISSION */}
      <section className="relative overflow-hidden py-28 md:py-36">
        <Image src="/velika-planina.jpg" alt="" fill sizes="100vw" className="object-cover object-center" />
        <div className="absolute inset-0 bg-ink/72" />
        <div className={`relative ${wrap}`}>
          <Reveal>
            <div className="max-w-[62ch]">
              <Eyebrow tone="light">Our mission</Eyebrow>
              <blockquote className="mt-7 text-[1.625rem] leading-[1.35] text-white sm:text-[2rem] md:text-[2.375rem]">
                {about.mission}
              </blockquote>
              <p className="mt-7 max-w-[54ch] text-[1.0625rem] leading-[1.7] text-white/80">
                {about.mission2}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* --------------------------------------------------------------- FAQ */}
      <section className="py-24 md:py-32">
        <div className={wrap}>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <Reveal className="lg:col-span-4">
              <SectionHead index="04" eyebrow="Common questions" title="About the way we work" />
            </Reveal>
            <Reveal delay={100} className="lg:col-span-8">
              <FaqList items={about.faq} />
            </Reveal>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------------- CTA */}
      <section className="border-t border-line bg-paper-2 py-20 md:py-24">
        <div className={wrap}>
          <Reveal>
            <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
              <div>
                <h2 className="max-w-[20ch] text-[2rem] leading-[1.1] sm:text-[2.5rem]">
                  Ready to walk the Julian Alps your own way?
                </h2>
                <p className="mt-4 max-w-[48ch] text-[1rem] leading-relaxed text-ink-soft">
                  Send us your dates and group size. You get real hut availability and a full price{" "}
                  {site.replyTime}.
                </p>
              </div>
              <div className="flex shrink-0 flex-wrap gap-3">
                <Cta href="/contact">Plan your dates</Cta>
                <Cta href="/#itinerary" variant="outline">
                  See the trek
                </Cta>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
