import type { Metadata } from "next"
import { LegalHero, LegalBody, Section, P, UL, LI, A, Table, Note, Row, H3 } from "@/components/legal/prose"
import { CookieSettingsButton } from "@/components/consent/cookie-settings-button"
import { site } from "@/lib/site"
import { company, companyAddress, dpa, legalUpdated, processors } from "@/lib/legal"

export const metadata: Metadata = {
  title: "Privacy policy",
  description:
    "How Andara collects, uses and protects your personal data when you enquire about or book a self-guided trek in Slovenia. Written to the GDPR, in plain English.",
  alternates: { canonical: `${site.url}/privacy` },
  robots: { index: true, follow: true },
}

const dataRows: React.ReactNode[][] = [
  [
    "Enquiry form",
    "Name, email, country, preferred month, group size, anything you write in the message box.",
    "To answer your enquiry and prepare a quote. Article 6(1)(b) GDPR, steps taken at your request before entering into a contract. Your browser sends it to the form service listed below, which emails it to us.",
    "12 months from our last exchange, unless it turns into a booking. The mail service that delivers it keeps its own copy for up to 3 years, then deletes it automatically.",
  ],
  [
    "Booking",
    "The above, plus billing details, the names of everyone walking, arrival and departure details, and the hut nights we reserve for you.",
    "To arrange and deliver the trek you booked. Article 6(1)(b) GDPR, performance of a contract.",
    "5 years after the trek ends, which is the general limitation period for claims under Slovenian law.",
  ],
  [
    "Invoices and accounting",
    "Name, address, amounts, dates, payment reference.",
    "We are required to keep them. Article 6(1)(c) GDPR, legal obligation under Slovenian tax and accounting law.",
    "10 years from the end of the financial year the invoice belongs to.",
  ],
  [
    "Health and dietary information",
    "Only what you choose to tell us: allergies, dietary needs, a knee that does not like descents, an emergency contact.",
    "So the huts can feed you safely and so we know who to call. Article 9(2)(a) GDPR, your explicit consent. You never have to give it, and you can withdraw it at any time.",
    "Deleted within 3 months of the trek ending.",
  ],
  [
    "Emails you send us",
    "Whatever is in them, plus your email address.",
    "To keep a record of what was agreed. Article 6(1)(b) and 6(1)(f) GDPR, our legitimate interest in being able to show what we promised.",
    "5 years, then deleted.",
  ],
  [
    "Server logs",
    "IP address, browser, the page requested, the time of the request. Created automatically by our host.",
    "To keep the site up and to stop abuse. Article 6(1)(f) GDPR, our legitimate interest in a working, secure website.",
    "Up to 30 days at our host, then deleted.",
  ],
  [
    "Spam protection on the form",
    "A hidden field a person never fills in, plus a short-lived count of submissions per IP address.",
    "To stop bots flooding the inbox. Article 6(1)(f) GDPR, our legitimate interest in a usable inbox.",
    "The count is held in memory only and disappears within an hour.",
  ],
  [
    "Analytics",
    "A cookie identifier, approximate location from a truncated IP address, pages viewed, device and browser.",
    "To see which pages are read and which are not. Article 6(1)(a) GDPR, your consent. Nothing is loaded until you give it.",
    "14 months, then deleted by Google. Withdraw at any time from the cookie settings.",
  ],
]

export default function PrivacyPage() {
  return (
    <>
      <LegalHero
        eyebrow="Legal"
        title="Privacy policy"
        lead="We are two people running a small hiking business, not an advertising company. We ask for the least we can get away with, we use it to plan your week, and we do not sell it to anybody. This page says exactly what that means, in the language the GDPR asks for."
        updated={legalUpdated}
      />

      <LegalBody>
        <Section id="controller" n="01" title="Who is responsible for your data">
          <P>
            The data controller is the business behind this website. Under Article 4(7) of the
            General Data Protection Regulation that means we are the ones who decide why and how
            your personal data is used, and the ones you can hold to account for it.
          </P>
          <UL>
            <Row label="Registered name" value={company.legalName} blank="registered company name" />
            <Row label="Trading as">{company.tradingName}</Row>
            <Row label="Registered address" value={companyAddress} blank="registered address" />
            <Row
              label="Company registration number"
              value={company.registrationNumber}
              blank="maticna stevilka"
            />
            <Row label="VAT or tax number" value={company.vatNumber} blank="ID za DDV" />
            <Row label="Email for anything on this page">
              <A href={`mailto:${company.privacyEmail}`}>{company.privacyEmail}</A>
            </Row>
          </UL>
          <P>
            We are not required to appoint a Data Protection Officer under Article 37 GDPR and we
            have not appointed one. Anja and Darja handle these questions themselves, at the address
            above.
          </P>
        </Section>

        <Section id="scope" n="02" title="What this policy covers">
          <P>
            It covers {site.url.replace("https://", "")} and everything that happens when you use
            it: reading a page, watching one of the two videos, sending the enquiry form, and the
            email conversation that follows. It also covers the booking itself, if you decide to
            walk with us.
          </P>
          <P>
            It does not cover other people&apos;s websites. Our Instagram and TikTok profiles, the
            Google Maps links in the itinerary, the hotels we suggest for your arrival night and the
            Wikimedia pages behind our image credits all run under their own privacy policies, and we
            have no control over them.
          </P>
        </Section>

        <Section id="what" n="03" title="What we collect, why, and for how long">
          <P>
            There is no account to create here and no booking engine. Almost everything below starts
            with you deciding to write to us.
          </P>
          <Table
            head={["Where it comes from", "What it is", "Why we may use it", "How long we keep it"]}
            rows={dataRows}
          />
          <Note>
            <P>
              <strong className="font-medium text-ink">
                The form asks for very little on purpose.
              </strong>{" "}
              Only your name and email are required, because without them we cannot answer. Country,
              month, group size and the message are optional, and the answer is simply less precise
              without them. Nothing on this site asks for a payment card.
            </P>
          </Note>
        </Section>

        <Section id="cookies" n="04" title="Cookies and analytics">
          <P>
            This website sets no cookies at all until you choose. On your first visit you get one
            question, with &ldquo;Only necessary&rdquo; sitting next to &ldquo;Accept
            analytics&rdquo; and neither one hidden or dressed up to look more attractive than the
            other.
          </P>
          <P>
            If you decline, Google Analytics is never downloaded, no analytics cookie is written and
            no request goes to Google at all. If you accept, Google Analytics 4 counts your visit.
            Either way we store your answer in your browser&apos;s local storage under{" "}
            <code className="rounded bg-ink/[0.05] px-1.5 py-0.5 font-mono text-[0.8125em]">
              andara_consent
            </code>{" "}
            so that we do not ask again for six months.
          </P>
          <P>
            The full list of what is set, by whom and for how long is on the{" "}
            <A href="/cookies">cookie policy</A> page. You can change your mind at any moment:
          </P>
          <div>
            <CookieSettingsButton className="inline-flex min-h-11 items-center gap-2 rounded-full border border-line bg-raised px-6 py-3 text-[0.9375rem] font-medium text-ink transition-[border-color,transform,background-color] duration-[var(--dur-press)] ease-[cubic-bezier(0.32,0.72,0,1)] hover:border-accent/45 hover:bg-accent-quiet/40 active:scale-[0.975]" />
          </div>
        </Section>

        <Section id="recipients" n="05" title="Who else sees your data">
          <P>
            We do not sell personal data, we do not trade it and we do not hand it to advertisers. It
            reaches other people only in the two situations below.
          </P>

          <H3>The companies that run the machinery</H3>
          <P>
            These are processors under Article 28 GDPR. They act only on our written instructions and
            may not use your data for their own purposes.
          </P>
          <Table
            head={["Company", "What it does for us", "Where", "Safeguard for transfers"]}
            rows={processors.map((p) => [
              p.name,
              <>
                {p.role}. <A href={p.privacyUrl}>Their privacy policy</A>
              </>,
              p.country,
              p.transfer ?? "Within the EEA",
            ])}
          />

          <H3>The people who host and move you</H3>
          <P>
            If you book, we have to tell the mountain huts, the guesthouses and the transfer drivers
            who is coming, on which night, and anything that affects your safety or your dinner. They
            receive the minimum needed to do their part and they are independent controllers of what
            they then hold. We name every one of them in your itinerary before you pay anything, so
            you always know where your name has gone.
          </P>
          <P>
            Beyond that, we would only pass data to a public authority, a court, an insurer or
            mountain rescue where the law requires it or where somebody&apos;s safety depends on it.
          </P>
        </Section>

        <Section id="transfers" n="06" title="Data leaving the European Economic Area">
          <P>
            Our host, our email sender and Google are all reachable from the United States, and our
            video delivery runs partly from Israel. That makes some transfers outside the EEA
            unavoidable for a website of this kind.
          </P>
          <P>
            Where a transfer happens it rests on the EU-U.S. Data Privacy Framework where the company
            is certified under it, on the European Commission&apos;s adequacy decision for Israel,
            and otherwise on the European Commission&apos;s Standard Contractual Clauses under
            Article 46(2)(c) GDPR. You can ask us for a copy of the clauses that apply to a
            particular provider by writing to{" "}
            <A href={`mailto:${company.privacyEmail}`}>{company.privacyEmail}</A>.
          </P>
        </Section>

        <Section id="rights" n="07" title="Your rights, and how to actually use them">
          <P>
            All of these are yours under Chapter III of the GDPR. Write one email to{" "}
            <A href={`mailto:${company.privacyEmail}`}>{company.privacyEmail}</A> and we will deal
            with it within one month. It is free. We may ask one question back to check you are who
            you say you are, and nothing more than that.
          </P>
          <UL>
            <LI>
              <strong className="font-medium text-ink">Access, Article 15.</strong> Ask us for a copy
              of everything we hold about you, and what we are doing with it.
            </LI>
            <LI>
              <strong className="font-medium text-ink">Rectification, Article 16.</strong> Tell us to
              correct anything wrong or fill in anything missing.
            </LI>
            <LI>
              <strong className="font-medium text-ink">Erasure, Article 17.</strong> Tell us to delete
              it. We will, unless we are still legally required to keep a specific record such as an
              invoice, in which case we will tell you exactly which one and why.
            </LI>
            <LI>
              <strong className="font-medium text-ink">Restriction, Article 18.</strong> Tell us to
              freeze it while a dispute or a correction is sorted out.
            </LI>
            <LI>
              <strong className="font-medium text-ink">Portability, Article 20.</strong> Ask for what
              you gave us in a machine-readable file, or ask us to send it somewhere else.
            </LI>
            <LI>
              <strong className="font-medium text-ink">Objection, Article 21.</strong> Object to any
              use we base on legitimate interest, such as our server logs or our spam protection.
            </LI>
            <LI>
              <strong className="font-medium text-ink">Withdrawing consent, Article 7(3).</strong>{" "}
              Withdraw analytics consent from the cookie settings, and withdraw consent for health or
              dietary information by email. Withdrawing does not undo what was lawful beforehand.
            </LI>
          </UL>
          <P>
            There is no automated decision-making and no profiling on this site within the meaning of
            Article 22 GDPR. Every quote you receive was written by Anja or Darja.
          </P>
        </Section>

        <Section id="complaint" n="08" title="If you think we got it wrong">
          <P>
            Tell us first, because it is usually a misunderstanding we can fix the same day. But you
            never have to go through us. Under Article 77 GDPR you can complain directly to the
            supervisory authority, and in Slovenia that is:
          </P>
          <Note>
            <P>
              <strong className="font-medium text-ink">{dpa.name}</strong>
              <br />
              {dpa.nameEn}
              <br />
              {dpa.address}
              <br />
              <A href={`mailto:${dpa.email}`}>{dpa.email}</A> {String.fromCharCode(183)} {dpa.phone}{" "}
              {String.fromCharCode(183)} <A href={dpa.url}>{dpa.url.replace("https://", "")}</A>
            </P>
          </Note>
          <P>
            If you live in another EU or EEA country you may complain to your own national
            supervisory authority instead.
          </P>
        </Section>

        <Section id="security" n="09" title="How we keep it safe">
          <P>
            The site is served over HTTPS only. When you press send, the form goes from your
            browser to the form service named in the table above, which turns it into an email and
            delivers it to us. That service is the only third party that sees what you wrote, and
            because your browser talks to it directly, it also sees your IP address. The email
            lands in a single mailbox that Anja and Darja use, protected by two-factor
            authentication. We keep no customer database of our own and we hold no payment card
            details, ever.
          </P>
          <P>
            If a breach ever occurs that is likely to put your rights at risk we will report it to
            the Information Commissioner within 72 hours, as Article 33 GDPR requires, and we will
            write to you directly, as Article 34 requires.
          </P>
        </Section>

        <Section id="children" n="10" title="Children">
          <P>
            This trek crosses demanding alpine terrain and the website is written for adults. We do
            not knowingly collect data from anyone under 16. Where a child walks with a family group
            we take their name and any dietary need from the parent or guardian who books, and we use
            it for nothing else. If you believe a child has sent us something directly, write to us
            and we will delete it.
          </P>
        </Section>

        <Section id="changes" n="11" title="Changes to this policy">
          <P>
            If we add a tool, change a provider or start doing something new with your data, this
            page changes with it and the date at the top moves. Where the change matters to people
            who have already booked we write to them, rather than expecting them to re-read a web
            page. Older versions are available on request.
          </P>
        </Section>
      </LegalBody>
    </>
  )
}
