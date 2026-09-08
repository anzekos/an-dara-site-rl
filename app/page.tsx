import Image from "next/image"
import {
  ArrowRight,
  MapTrifold,
  Check,
  X,
  Mountains,
  Path,
  Sun,
  UsersThree,
} from "@phosphor-icons/react/dist/ssr"
import { Reveal } from "@/components/reveal"
import { FaqList } from "@/components/faq-list"
import { EnquiryForm } from "@/components/enquiry-form"
import { Cta } from "@/components/ui/cta"
import { Eyebrow, Bezel, SectionHead, Stat } from "@/components/ui/bits"
import {
  site,
  heroStats,
  selfGuidedPoints,
  comparison,
  steps,
  included,
  notIncluded,
  highlights,
  routeProse,
  itinerary,
  videos,
  faq,
} from "@/lib/site"

const wrap = "mx-auto w-full max-w-[1180px] px-5 sm:px-8"

const levelDots: Record<string, number> = {
  Demanding: 3,
  Moderate: 2,
  "Easy to moderate": 2,
  Easy: 1,
  Flexible: 0,
}

const heroIcons = [Sun, Path, Mountains, UsersThree]

export default function HomePage() {
  return (
    <>
      {/* ------------------------------------------------------------- HERO */}
      <section className="relative flex min-h-[94dvh] flex-col justify-end overflow-hidden pb-14 pt-32 sm:pb-16">
        <Image
          src="/triglav-mountain-landscape.jpg"
          alt="The Triglav massif seen from the Vrata valley"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/80 via-ink/45 to-ink/15" />
        <div className="absolute inset-x-0 bottom-0 h-3/4 bg-gradient-to-t from-ink/85 via-ink/35 to-transparent" />
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-ink/45 to-transparent" />

        <div className={`relative ${wrap}`}>
          <div className="grid items-end gap-10 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <Reveal>
                <Eyebrow tone="light">Self-guided trek {String.fromCharCode(183)} No guide, no group</Eyebrow>
              </Reveal>

              <Reveal delay={80}>
                <h1 className="mt-6 text-[2.6rem] leading-[0.98] text-white sm:text-[3.6rem] md:text-[4.4rem] lg:text-[4.75rem]">
                  Seven days around Triglav.
                  <span className="block italic text-white/85">Nobody walking ahead of you.</span>
                </h1>
              </Reveal>

              <Reveal delay={160}>
                <p className="mt-7 max-w-[52ch] text-[1.0625rem] leading-[1.7] text-white/85 sm:text-[1.1875rem]">
                  A 100 km self-guided trek around Slovenia&apos;s highest mountain. You pick the
                  dates and set the pace. We book the huts, move your luggage from door to door and
                  map every turn, then get out of your way.
                </p>
              </Reveal>

              <Reveal delay={240}>
                <div className="mt-9 flex flex-wrap items-center gap-3">
                  <Cta href="/contact">Get your dates and price</Cta>
                  <Cta href="/#itinerary" variant="ghost-light">
                    See the seven days
                  </Cta>
                </div>
              </Reveal>

              <Reveal delay={300}>
                <p className="mt-6 text-[0.875rem] text-white/65">
                  Or write to{" "}
                  <a
                    href={`mailto:${site.email}`}
                    className="text-white underline decoration-white/40 underline-offset-4 transition-colors duration-[var(--dur-ui)] hover:decoration-white"
                  >
                    {site.email}
                  </a>
                  . We answer {site.replyTime}.
                </p>
              </Reveal>
            </div>

            <Reveal delay={360} className="lg:col-span-5">
              <div className="rounded-[24px] bg-white/[0.09] p-1.5 ring-1 ring-white/20 backdrop-blur-xl">
                <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-[18px] bg-white/15">
                  {heroStats.map((s, i) => {
                    const Icon = heroIcons[i]
                    return (
                      <div key={s.label} className="bg-ink/25 px-5 py-6">
                        <Icon size={19} weight="light" className="mb-3 text-white/70" aria-hidden />
                        <dt className="text-[10px] uppercase tracking-[0.18em] text-white/60">
                          {s.label}
                        </dt>
                        <dd className="mt-2 text-[1.0625rem] font-medium tracking-[-0.01em] text-white">
                          {s.value}
                        </dd>
                      </div>
                    )
                  })}
                </dl>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------- SELF-GUIDED */}
      <section id="self-guided" className="scroll-mt-24 py-24 md:py-32">
        <div className={wrap}>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <Reveal className="lg:col-span-5">
              <SectionHead
                index="01"
                eyebrow="Read this first"
                title={
                  <>
                    This is not a{" "}
                    <span className="italic text-accent">guided group tour.</span>
                  </>
                }
                lead="Most people booking a week in the Alps picture a guide at the front and fourteen strangers behind. That is not what this is, and the difference is the whole reason people book it."
              />

              <div className="mt-10 border-t border-line pt-8">
                <h3 className="text-[10px] uppercase tracking-[0.2em] text-ink-faint">
                  So what do we actually do
                </h3>
                <ul className="mt-5 flex flex-col gap-3.5">
                  {[
                    "Book and pay for every hut and guesthouse",
                    "Move your luggage while you walk",
                    "Hand you the maps, the notes and our number",
                  ].map((t) => (
                    <li key={t} className="flex gap-3">
                      <span
                        aria-hidden
                        className="mt-[0.55rem] h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                      />
                      <span className="text-[0.9375rem] leading-[1.6] text-ink">{t}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-8">
                  <Cta href="/#how" variant="outline">
                    See how it works
                  </Cta>
                </div>
              </div>
            </Reveal>

            <div className="lg:col-span-7">
              <ul className="flex flex-col gap-px overflow-hidden rounded-[24px] bg-line-soft">
                {selfGuidedPoints.map((p, i) => (
                  <Reveal as="li" key={p.title} delay={i * 90}>
                    <div className="flex gap-5 bg-paper px-6 py-8 sm:px-8">
                      <span className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent-quiet text-accent">
                        <X size={14} weight="bold" />
                      </span>
                      <div>
                        <h3 className="text-[1.3125rem] leading-snug">{p.title}</h3>
                        <p className="mt-2.5 max-w-[52ch] text-[0.9375rem] leading-[1.7] text-ink-soft">
                          {p.body}
                        </p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </ul>
            </div>
          </div>

          {/* primerjalna tabela */}
          <Reveal className="mt-16 md:mt-20">
            <Bezel tone="raised">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[640px] border-collapse text-left">
                  <caption className="sr-only">
                    Self-guided with Andara compared with a guided group tour
                  </caption>
                  <thead>
                    <tr className="border-b border-line">
                      {comparison.headers.map((h, i) => (
                        <th
                          key={h || i}
                          scope="col"
                          className={`px-5 py-5 align-bottom text-[0.9375rem] font-medium sm:px-7 ${
                            i === 1 ? "text-accent" : i === 0 ? "text-ink-faint" : "text-ink-faint"
                          }`}
                        >
                          {i === 0 ? (
                            <span className="text-[10px] uppercase tracking-[0.18em]">
                              What changes
                            </span>
                          ) : (
                            h
                          )}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {comparison.rows.map((row) => (
                      <tr key={row[0]} className="border-b border-line-soft last:border-0">
                        <th
                          scope="row"
                          className="px-5 py-4 text-[0.875rem] font-normal text-ink-faint sm:px-7"
                        >
                          {row[0]}
                        </th>
                        <td className="bg-accent-quiet/40 px-5 py-4 text-[0.9375rem] text-ink sm:px-7">
                          {row[1]}
                        </td>
                        <td className="px-5 py-4 text-[0.9375rem] text-ink-soft sm:px-7">{row[2]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Bezel>
          </Reveal>
        </div>
      </section>

      {/* ------------------------------------------------------ HOW IT WORKS */}
      <section id="how" className="scroll-mt-24 border-y border-line bg-paper-2 py-24 md:py-32">
        <div className={wrap}>
          <Reveal>
            <SectionHead
              index="02"
              eyebrow="How it works"
              title="You do the walking. We do everything else."
              lead="Four steps from a rough idea of a week in Slovenia to a booked trek that is entirely yours."
            />
          </Reveal>

          <ol className="mt-14 grid gap-px overflow-hidden rounded-[24px] bg-line-soft sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => (
              <Reveal as="li" key={s.n} delay={i * 80}>
                <div className="flex h-full flex-col gap-4 bg-paper-2 p-7 md:p-8">
                  <span className="font-mono text-[0.75rem] tracking-[0.2em] text-accent">{s.n}</span>
                  <h3 className="text-[1.375rem] leading-snug">{s.title}</h3>
                  <p className="text-[0.9375rem] leading-[1.7] text-ink-soft">{s.body}</p>
                </div>
              </Reveal>
            ))}
          </ol>

          <Reveal delay={120} className="mt-12">
            <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
              <Cta href="/contact">Start with your dates</Cta>
              <p className="text-[0.875rem] text-ink-soft">
                Nothing is asked of you until you have the full price in writing.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ------------------------------------------------------------- ROUTE */}
      <section id="route" className="scroll-mt-24 py-24 md:py-32">
        <div className={wrap}>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <Reveal className="lg:col-span-5">
              <SectionHead
                index="03"
                eyebrow="The route"
                title={
                  <>
                    More than mountains.
                    <span className="block italic">It is about the moments.</span>
                  </>
                }
              />
              <ul className="mt-10 flex flex-col gap-6 border-t border-line pt-8">
                {highlights.map((h) => (
                  <li key={h.title} className="flex gap-4">
                    <ArrowRight
                      size={17}
                      weight="light"
                      className="mt-1 shrink-0 text-accent"
                      aria-hidden
                    />
                    <div>
                      <h3 className="text-[1.0625rem] font-medium leading-snug">{h.title}</h3>
                      <p className="mt-1 text-[0.9375rem] leading-relaxed text-ink-soft">{h.body}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={120} className="lg:col-span-7">
              <div className="flex flex-col gap-5 text-[1.0625rem] leading-[1.75] text-ink-soft">
                {routeProse.map((p, i) => (
                  <p key={i} className={i === 0 ? "text-[1.1875rem] leading-[1.65] text-ink" : ""}>
                    {p}
                  </p>
                ))}
              </div>

              <div className="mt-10">
                <Bezel tone="raised">
                  {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
                  <video
                    src={videos.intro.src}
                    poster={videos.intro.poster}
                    controls
                    preload="none"
                    playsInline
                    aria-label="A short film from the trail, shot by Anja and Darja"
                    className="aspect-video w-full bg-ink object-cover"
                  />
                </Bezel>
                <p className="mt-3 text-[0.8125rem] text-ink-faint">
                  A short film from the trail, by Anja and Darja.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------- ITINERARY */}
      <section id="itinerary" className="scroll-mt-24 border-t border-line py-24 md:py-32">
        <div className={wrap}>
          <Reveal>
            <SectionHead
              index="04"
              eyebrow="Day by day"
              title="Seven days, and what each one asks of you"
              lead="Every day below is walked at your own pace. The times are what an averagely fit hiker takes, not a schedule you have to keep."
            />
          </Reveal>

          <ol className="mt-16 flex flex-col">
            {itinerary.map((day, i) => (
              <Reveal as="li" key={day.day} delay={40}>
                <article className="grid gap-8 border-t border-line py-10 md:grid-cols-12 md:gap-10 md:py-12 lg:gap-12">
                  <div className="relative md:col-span-5">
                    <Bezel tone="raised">
                      <div className="relative aspect-[4/3] w-full">
                        <Image
                          src={day.image}
                          alt={day.alt}
                          fill
                          sizes="(min-width: 1024px) 42vw, 100vw"
                          loading={i < 2 ? "eager" : "lazy"}
                          className="object-cover"
                        />
                      </div>
                    </Bezel>
                    <span
                      aria-hidden
                      className="pointer-events-none absolute -left-1 -top-6 font-display text-[4.5rem] leading-none text-ink/12 md:-left-3 md:-top-9 md:text-[6rem]"
                    >
                      {String(day.day).padStart(2, "0")}
                    </span>
                  </div>

                  <div className="md:col-span-7 lg:pt-2">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-[0.75rem] uppercase tracking-[0.18em] text-accent">
                        Day {day.day}
                      </span>
                      <span className="h-px flex-1 bg-line" aria-hidden />
                      <span className="flex items-center gap-2 text-[0.75rem] uppercase tracking-[0.14em] text-ink-faint">
                        {day.difficulty}
                        {(levelDots[day.difficulty] ?? 0) > 0 && (
                          <span className="flex gap-1" aria-hidden>
                            {[0, 1, 2].map((d) => (
                              <span
                                key={d}
                                className={`h-1.5 w-1.5 rounded-full ${
                                  d < (levelDots[day.difficulty] ?? 0) ? "bg-accent" : "bg-line"
                                }`}
                              />
                            ))}
                          </span>
                        )}
                      </span>
                    </div>

                    <h3 className="mt-4 text-[1.875rem] leading-[1.1] md:text-[2.25rem]">
                      {day.title}
                    </h3>
                    <p className="mt-4 max-w-[58ch] text-[1rem] leading-[1.75] text-ink-soft">
                      {day.description}
                    </p>

                    <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-6 border-t border-line pt-6 sm:grid-cols-4">
                      <Stat label="On foot" value={day.hours} />
                      <Stat label="Distance" value={day.distance} />
                      <Stat label="Ascent" value={day.up} />
                      <Stat label="Descent" value={day.down} />
                    </dl>

                    <a
                      href={day.mapLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group mt-5 -ml-2 inline-flex min-h-11 items-center gap-2.5 rounded-full px-2 py-2 text-[0.875rem] text-ink-soft transition-colors duration-[var(--dur-ui)] hover:text-accent"
                    >
                      <MapTrifold size={17} weight="light" />
                      <span className="underline decoration-line underline-offset-4 transition-colors duration-[var(--dur-ui)] group-hover:decoration-accent">
                        Open this day on the map
                      </span>
                    </a>
                  </div>
                </article>
              </Reveal>
            ))}
          </ol>

          <Reveal className="mt-14">
            <Bezel tone="raised">
              {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
              <video
                src={videos.map.src}
                poster={videos.map.poster}
                controls
                preload="none"
                playsInline
                aria-label="An animated flight over the full Triglav circuit route"
                className="aspect-video w-full bg-ink object-cover"
              />
            </Bezel>
            <p className="mt-3 text-[0.8125rem] text-ink-faint">
              The full circuit, animated over the terrain of Triglav National Park.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ---------------------------------------------------------- INCLUDED */}
      <section id="included" className="scroll-mt-24 border-y border-line bg-paper-2 py-24 md:py-32">
        <div className={wrap}>
          <Reveal>
            <SectionHead
              index="05"
              eyebrow="What you get"
              title="Everything except the walking"
              lead="One price covers the whole week on the ground. Here is exactly where the line sits, so nothing surprises you later."
            />
          </Reveal>

          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:gap-8">
            <Reveal>
              <Bezel tone="raised" className="h-full">
                <div className="h-full p-7 md:p-9">
                  <h3 className="text-[1.5rem] leading-snug">Included</h3>
                  <ul className="mt-7 flex flex-col gap-4">
                    {included.map((item) => (
                      <li key={item} className="flex gap-3.5">
                        <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent text-white">
                          <Check size={12} weight="bold" />
                        </span>
                        <span className="text-[0.9375rem] leading-[1.65] text-ink">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Bezel>
            </Reveal>

            <Reveal delay={100}>
              <Bezel className="h-full">
                <div className="h-full p-7 md:p-9">
                  <h3 className="text-[1.5rem] leading-snug text-ink-soft">Not included</h3>
                  <ul className="mt-7 flex flex-col gap-4">
                    {notIncluded.map((item, i) => (
                      <li key={item} className="flex gap-3.5">
                        <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-line text-ink-faint">
                          <X size={11} weight="bold" />
                        </span>
                        <span
                          className={`text-[0.9375rem] leading-[1.65] ${
                            i === 0 ? "font-medium text-ink" : "text-ink-soft"
                          }`}
                        >
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Bezel>
            </Reveal>
          </div>

          <Reveal delay={140} className="mt-10">
            <p className="max-w-[62ch] text-[0.9375rem] leading-[1.7] text-ink-soft">
              The price depends on your dates and how many of you there are, because hut rates and
              transfers move with both. Tell us those two things and you get a full, itemised price{" "}
              {site.replyTime}.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ---------------------------------------------------------- CTA BAND */}
      <section className="relative overflow-hidden py-28 md:py-36">
        <Image
          src="/slovenian-alps.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-ink/70" />
        <div className={`relative ${wrap}`}>
          <Reveal>
            <div className="max-w-[46ch]">
              <Eyebrow tone="light">May to September</Eyebrow>
              <h2 className="mt-6 text-[2.25rem] leading-[1.05] text-white sm:text-[2.9rem] md:text-[3.4rem]">
                Tell us your week.
                <span className="block italic text-white/80">We will tell you if it is free.</span>
              </h2>
              <p className="mt-6 max-w-[48ch] text-[1.0625rem] leading-[1.7] text-white/80">
                Huts in Triglav National Park fill up months ahead. Send us a rough window and how
                many of you there are, and you get availability and a full price {site.replyTime}.
              </p>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <Cta href="/#enquiry">Send your dates</Cta>
                <Cta href={`mailto:${site.email}`} variant="ghost-light">
                  {site.email}
                </Cta>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* --------------------------------------------------------------- FAQ */}
      <section id="faq" className="scroll-mt-24 py-24 md:py-32">
        <div className={wrap}>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <Reveal className="lg:col-span-4">
              <SectionHead
                index="06"
                eyebrow="Questions"
                title="Asked before every booking"
                lead="If yours is not here, write to us. We answer properly, not with a brochure."
              />
              <div className="mt-8">
                <Cta href={`mailto:${site.email}`} variant="outline">
                  Ask us directly
                </Cta>
              </div>
            </Reveal>
            <Reveal delay={100} className="lg:col-span-8">
              <FaqList items={faq} />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------- ENQUIRY */}
      <section id="enquiry" className="scroll-mt-24 border-t border-line bg-paper-2 py-24 md:py-32">
        <div className={wrap}>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <Reveal className="lg:col-span-5">
              <SectionHead
                index="07"
                eyebrow="Plan your dates"
                title="Start the conversation"
                lead="No booking engine, no deposit, no automated reply. Anja or Darja read every message and write back with real availability."
              />

              <dl className="mt-10 flex flex-col gap-6 border-t border-line pt-8">
                <div>
                  <dt className="text-[10px] uppercase tracking-[0.18em] text-ink-faint">Email</dt>
                  <dd className="mt-2">
                    <a
                      href={`mailto:${site.email}`}
                      className="text-[1.125rem] text-ink underline decoration-line underline-offset-4 transition-colors duration-[var(--dur-ui)] hover:text-accent hover:decoration-accent"
                    >
                      {site.email}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="text-[10px] uppercase tracking-[0.18em] text-ink-faint">
                    Reply time
                  </dt>
                  <dd className="mt-2 text-[0.9375rem] text-ink-soft">
                    Usually the same day, always {site.replyTime}.
                  </dd>
                </div>
                <div>
                  <dt className="text-[10px] uppercase tracking-[0.18em] text-ink-faint">Season</dt>
                  <dd className="mt-2 text-[0.9375rem] text-ink-soft">
                    May to September. Book about six months ahead for the best huts.
                  </dd>
                </div>
              </dl>
            </Reveal>

            <Reveal delay={100} className="lg:col-span-7">
              <Bezel tone="raised">
                <div className="p-7 md:p-9">
                  <EnquiryForm />
                </div>
              </Bezel>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  )
}
