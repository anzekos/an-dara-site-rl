import type { Metadata } from "next"
import { LegalHero, LegalBody, Section, P, UL, LI, A, Table, Note, H3 } from "@/components/legal/prose"
import { CookieSettingsButton } from "@/components/consent/cookie-settings-button"
import { site } from "@/lib/site"
import { company, cookieRows, legalUpdated } from "@/lib/legal"

export const metadata: Metadata = {
  title: "Cookie policy",
  description:
    "Every cookie this website can set, who sets it, what it does and how long it lasts. Nothing is stored on your device until you choose, and you can undo that.",
  alternates: { canonical: `${site.url}/cookies` },
  robots: { index: true, follow: true },
}

const categoryLabel: Record<string, string> = {
  necessary: "Strictly necessary",
  analytics: "Analytics, consent required",
}

export default function CookiesPage() {
  return (
    <>
      <LegalHero
        eyebrow="Legal"
        title="Cookie policy"
        lead="Three cookies exist on this whole website, and two of them only appear if you say yes. Here is each one by name, what it does, and how to get rid of it."
        updated={legalUpdated}
      />

      <LegalBody>
        <Section id="rule" n="01" title="The rule we follow">
          <P>
            Article 5(3) of the ePrivacy Directive, which Slovenia implements in the Electronic
            Communications Act, says that nothing may be stored on or read from your device without
            your prior consent, unless it is strictly necessary to deliver what you asked for. That
            is not a formality here, it is how the site is actually built.
          </P>
          <UL>
            <LI>
              On your first page view, no analytics script is downloaded and no analytics cookie is
              written. Not one request reaches Google.
            </LI>
            <LI>
              You are asked once. &ldquo;Only necessary&rdquo; and &ldquo;Accept analytics&rdquo; are
              the same size, next to each other, one click each. Neither is hidden behind a second
              screen.
            </LI>
            <LI>
              Closing the banner without choosing is not treated as a yes. Nothing loads until you
              actually pick one.
            </LI>
            <LI>Withdrawing is exactly as easy as agreeing, from the button at the end of this page.</LI>
          </UL>
        </Section>

        <Section id="list" n="02" title="Every cookie, by name">
          <Table
            head={["Name", "Set by", "What it does", "How long", "Category"]}
            rows={cookieRows.map((c) => [
              c.name,
              c.provider,
              c.purpose,
              c.duration,
              categoryLabel[c.category],
            ])}
          />
          <Note>
            <P>
              <strong className="font-medium text-ink">A note on the first one.</strong> Your answer
              to the cookie question is not stored in a cookie at all. It sits in your browser&apos;s
              local storage under the name{" "}
              <code className="rounded bg-ink/[0.05] px-1.5 py-0.5 font-mono text-[0.8125em]">
                andara_consent
              </code>
              , it never travels to our server, and it holds one word: whether you allowed analytics,
              and the date you decided. We list it here because it is still something stored on your
              device and you deserve to know about it.
            </P>
          </Note>
        </Section>

        <Section id="not" n="03" title="What this site deliberately does not do">
          <P>
            It is worth writing down what is absent, because it is most of what a travel website
            normally carries.
          </P>
          <UL>
            <LI>No advertising cookies, no remarketing pixels, no Meta or TikTok pixel.</LI>
            <LI>No cross-site tracking and no sharing of your visit with any advertising network.</LI>
            <LI>
              No embedded Google Maps or YouTube frames. The itinerary links out to Google Maps, so
              nothing loads from Google until you click, and the two videos are served from our own
              media provider rather than YouTube.
            </LI>
            <LI>
              No web fonts fetched from Google. The fonts are compiled into the site and served from
              our own domain, so your browser never asks Google for them.
            </LI>
            <LI>No chat widget, no heatmaps, no session recording.</LI>
          </UL>
        </Section>

        <Section id="third" n="04" title="The third parties that are here">
          <H3>Google Analytics 4</H3>
          <P>
            Runs only after you accept. It tells us how many people read a page and which pages get
            abandoned, and it is the reason this itinerary is written the way it is. It runs with IP
            anonymisation on and with Google Consent Mode set to deny advertising storage
            permanently, so your visit is never used to build an advertising profile. Data retention
            is set to 14 months. See{" "}
            <A href="https://policies.google.com/privacy">Google&apos;s privacy policy</A> and{" "}
            <A href="https://tools.google.com/dlpage/gaoptout">Google&apos;s own opt-out add-on</A>.
          </P>

          <H3>Vercel</H3>
          <P>
            Hosts the site and measures traffic without cookies and without a persistent identifier.
            We still hold it back until you accept analytics, so that &ldquo;Only necessary&rdquo;
            means exactly that. Vercel also keeps ordinary server logs, which are covered in the{" "}
            <A href="/privacy">privacy policy</A>.
          </P>

          <H3>Cloudinary</H3>
          <P>
            Delivers the two videos. It sets no cookie, but like any server it sees your IP address
            when a video file is requested. Both videos are set not to preload, so nothing is fetched
            from Cloudinary until you press play.
          </P>
        </Section>

        <Section id="control" n="05" title="Changing your mind">
          <P>
            One button, here, at any time. It reopens the same panel you saw on your first visit and
            whatever you choose takes effect immediately.
          </P>
          <div>
            <CookieSettingsButton className="inline-flex min-h-11 items-center gap-2 rounded-full bg-accent px-6 py-3 text-[0.9375rem] font-medium text-white transition-[transform,background-color] duration-[var(--dur-press)] ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-[#9c4429] active:scale-[0.975]" />
          </div>
          <P>
            You can also clear everything from the browser itself. In Chrome, Safari, Firefox and
            Edge it lives under Settings, then Privacy, then site data. Clearing it removes your
            stored answer too, so the question comes back on your next visit.
          </P>
          <P>
            We ask again after six months in any case, because a consent given in 2026 should not
            still be running the site in 2030.
          </P>
        </Section>

        <Section id="ask" n="06" title="Questions">
          <P>
            Anything on this page, or anything you find in your browser that is not listed here,
            goes to <A href={`mailto:${company.privacyEmail}`}>{company.privacyEmail}</A>. If we
            missed a cookie, tell us and we will list it or remove it.
          </P>
        </Section>
      </LegalBody>
    </>
  )
}
