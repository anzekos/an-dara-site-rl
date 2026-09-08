import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import {
  EnvelopeSimple,
  InstagramLogo,
  TiktokLogo,
  Clock,
  CalendarBlank,
  UsersThree,
} from "@phosphor-icons/react/dist/ssr"
import { Reveal } from "@/components/reveal"
import { EnquiryForm } from "@/components/enquiry-form"
import { Bezel, Eyebrow } from "@/components/ui/bits"
import { site, tour } from "@/lib/site"

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Send Anja and Darja your dates and group size for the 7-day self-guided Triglav trek. Real hut availability and a full price within 24 hours. No deposit to ask.",
  alternates: { canonical: `${site.url}/contact` },
}

const wrap = "mx-auto w-full max-w-[1180px] px-5 sm:px-8"

const facts = [
  {
    icon: Clock,
    label: "Reply time",
    value: `Usually same day, always ${site.replyTime}`,
  },
  { icon: CalendarBlank, label: "Season", value: tour.season },
  { icon: UsersThree, label: "Group", value: tour.party },
]

export default function ContactPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-line pb-12 pt-32 md:pb-14 md:pt-36">
        <Image
          src="/kranjska-gora-jasna.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-[0.28]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-paper via-paper/85 to-paper" />

        <div className={`relative ${wrap}`}>
          <Reveal>
            <Eyebrow tone="accent">Self-guided trek {String.fromCharCode(183)} May to September</Eyebrow>
            <h1 className="mt-6 max-w-[20ch] text-[2.4rem] leading-[1] sm:text-[3rem] md:text-[3.5rem]">
              Tell us your week.
              <span className="block italic text-accent">We will build it around you.</span>
            </h1>
            <p className="mt-7 max-w-[56ch] text-[1.0625rem] leading-[1.7] text-ink-soft">
              There is no booking engine here and nothing to pay to ask a question. Send your rough
              dates and how many of you there are, and Anja or Darja come back with real hut
              availability and a full, itemised price.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="py-14 md:py-20">
        <div className={wrap}>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            {/* kontaktni kanali */}
            <Reveal className="lg:col-span-4">
              <h2 className="text-[1.75rem] leading-tight">Reach us directly</h2>

              <a
                href={`mailto:${site.email}`}
                className="group mt-7 flex items-center gap-4 rounded-full border border-line bg-raised p-2 pr-6 transition-[border-color,transform] duration-[var(--dur-ui)] ease-[cubic-bezier(0.32,0.72,0,1)] hover:border-accent/45 active:scale-[0.99]"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-accent-quiet text-accent transition-colors duration-[var(--dur-ui)] group-hover:bg-accent group-hover:text-white">
                  <EnvelopeSimple size={20} weight="light" />
                </span>
                <span className="flex flex-col leading-tight">
                  <span className="text-[10px] uppercase tracking-[0.18em] text-ink-faint">Email</span>
                  <span className="mt-1 text-[1.0625rem] text-ink">{site.email}</span>
                </span>
              </a>

              <div className="mt-4 flex gap-3">
                <a
                  href={site.socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-1 items-center gap-3 rounded-full border border-line bg-raised px-4 py-3 text-[0.875rem] text-ink-soft transition-[border-color,color,transform] duration-[var(--dur-ui)] hover:border-accent/45 hover:text-ink active:scale-[0.98]"
                >
                  <InstagramLogo size={18} weight="light" />
                  Instagram
                </a>
                <a
                  href={site.socials.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-1 items-center gap-3 rounded-full border border-line bg-raised px-4 py-3 text-[0.875rem] text-ink-soft transition-[border-color,color,transform] duration-[var(--dur-ui)] hover:border-accent/45 hover:text-ink active:scale-[0.98]"
                >
                  <TiktokLogo size={18} weight="light" />
                  TikTok
                </a>
              </div>

              {/*
                <dl> sme vsebovati <div>, a ta div sme vsebovati samo <dt> in
                <dd>. Ikona zato zivi v <dt> in je postavljena absolutno.
              */}
              <dl className="mt-10 flex flex-col gap-6 border-t border-line pt-8">
                {facts.map((f) => (
                  <div key={f.label} className="relative pl-9">
                    <dt className="text-[10px] uppercase tracking-[0.18em] text-ink-faint">
                      <f.icon
                        size={19}
                        weight="light"
                        aria-hidden
                        className="absolute left-0 top-0.5 text-accent"
                      />
                      {f.label}
                    </dt>
                    <dd className="mt-1.5 text-[0.9375rem] leading-relaxed text-ink">{f.value}</dd>
                  </div>
                ))}
              </dl>

              <div className="mt-10 rounded-[18px] border border-line bg-paper-2 p-6">
                <h3 className="text-[1.0625rem] font-medium">Not sure this is for you?</h3>
                <p className="mt-2.5 text-[0.9375rem] leading-[1.7] text-ink-soft">
                  Read{" "}
                  <Link
                    href="/#self-guided"
                    /* na bg-paper-2 je navadni akcent 4,37:1, kar ne zadosca */
                    className="text-accent-strong underline decoration-accent-strong/35 underline-offset-4 transition-colors duration-[var(--dur-ui)] hover:decoration-accent-strong"
                  >
                    what self-guided actually means
                  </Link>{" "}
                  before you write. It is the one thing people get wrong about this trek, and we
                  would rather you knew now than in Bohinj.
                </p>
              </div>
            </Reveal>

            {/* obrazec */}
            <Reveal delay={100} className="lg:col-span-8">
              <Bezel tone="raised">
                <div className="p-7 md:p-10">
                  <h2 className="text-[1.75rem] leading-tight">Send your dates</h2>
                  <p className="mt-3 max-w-[52ch] text-[0.9375rem] leading-[1.7] text-ink-soft">
                    Everything except your name and email is optional. The more you tell us, the more
                    precise the first answer is.
                  </p>
                  <div className="mt-8">
                    <EnquiryForm />
                  </div>
                </div>
              </Bezel>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  )
}
