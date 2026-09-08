import type { Metadata } from "next"
import { LegalHero, LegalBody, Section, P, UL, LI, A, Note, Fill, Blank, H3 } from "@/components/legal/prose"
import { site, tour } from "@/lib/site"
import { company, legalUpdated } from "@/lib/legal"

export const metadata: Metadata = {
  title: "Terms and conditions",
  description:
    "The terms for this website and for booking a self-guided trek with Andara: how a booking is formed, prices, cancellations, and what walking unguided asks of you.",
  alternates: { canonical: `${site.url}/terms` },
  robots: { index: true, follow: true },
}

export default function TermsPage() {
  return (
    <>
      <LegalHero
        eyebrow="Legal"
        title="Terms and conditions"
        lead="Two parts. The first covers using this website, which asks almost nothing of you. The second covers booking a trek, which asks rather more, because you will be walking in high mountains without a guide and both sides should know exactly where they stand."
        updated={legalUpdated}
      />

      <LegalBody>
        <Section id="who" n="01" title="Who you are dealing with">
          <P>
            This website and the treks sold through it are operated by the business below. The
            details are published here because the Slovenian Electronic Commerce Market Act and
            Article 5 of the E-Commerce Directive require a service provider to be identifiable
            before you deal with it.
          </P>
          <UL>
            <LI>
              <strong className="font-medium text-ink">Registered name:</strong>{" "}
              <Fill value={company.legalName} label="registered company name" />
            </LI>
            <LI>
              <strong className="font-medium text-ink">Trading as:</strong> {company.tradingName},{" "}
              {company.tradingName === "Andara" ? "Queen of the Alps" : ""}
            </LI>
            <LI>
              <strong className="font-medium text-ink">Registered address:</strong>{" "}
              <Fill value={company.street} label="street and number" />,{" "}
              <Fill value={company.city} label="postcode and town" />, {company.country}
            </LI>
            <LI>
              <strong className="font-medium text-ink">Company registration number:</strong>{" "}
              <Fill value={company.registrationNumber} label="maticna stevilka" />
            </LI>
            <LI>
              <strong className="font-medium text-ink">VAT or tax number:</strong>{" "}
              <Fill value={company.vatNumber} label="ID za DDV or davcna stevilka" />
            </LI>
            <LI>
              <strong className="font-medium text-ink">Entered in:</strong>{" "}
              <Fill value={company.register} label="register and registering authority" />
            </LI>
            <LI>
              <strong className="font-medium text-ink">Represented by:</strong>{" "}
              <Fill value={company.representative} label="name of the legal representative" />
            </LI>
            <LI>
              <strong className="font-medium text-ink">Email:</strong>{" "}
              <A href={`mailto:${company.email}`}>{company.email}</A>
            </LI>
            <LI>
              <strong className="font-medium text-ink">Telephone:</strong>{" "}
              <Fill value={company.phone} label="telephone number" />
            </LI>
            <LI>
              <strong className="font-medium text-ink">
                Licence for organising travel packages:
              </strong>{" "}
              <Fill value={company.travelLicence} label="licence number under ZSRT-1" />
            </LI>
          </UL>
        </Section>

        <Section id="site" n="02" title="Using this website">
          <H3>What you may do with it</H3>
          <P>
            Read it, print it, send it to the people you are thinking of walking with. That is what
            it is for and you need no permission from us.
          </P>

          <H3>What belongs to whom</H3>
          <P>
            The text, the route descriptions, the itinerary, the layout and the Andara name and mark
            are ours, and copying them onto another travel website is not on. The photographs of the
            Slovenian landscape are used under Wikimedia Commons licences and every one of them is
            credited at the foot of every page, with a link to its source and its licence. If you
            reuse one of those images you must follow its own licence, not ours.
          </P>

          <H3>Where the site is wrong</H3>
          <P>
            We write the itinerary from routes we have walked ourselves, and we keep it current. Even
            so: walking times, ascent figures and distances are estimates for a reasonably fit
            walker in good conditions, hut opening dates change, trails close after rockfall, and a
            page written in winter can be out of date by August. Nothing on this website is a
            guarantee of conditions on the ground. The binding description of your trek is the
            written itinerary we send you, not this site.
          </P>

          <H3>Links out</H3>
          <P>
            We link to Google Maps, to accommodation we like, to Wikimedia and to our own social
            profiles. We do not control any of them and we are not responsible for what they contain
            or what they do with your data once you are there.
          </P>

          <H3>Availability</H3>
          <P>
            We would like the site to be up all the time and it very nearly always is, but we do not
            promise it. If it is down when you want to write to us,{" "}
            <A href={`mailto:${company.email}`}>{company.email}</A> still works.
          </P>
        </Section>

        <Section id="enquiry" n="03" title="Enquiring, and what an enquiry is not">
          <P>
            Sending the form costs nothing and commits you to nothing. There is no deposit to ask a
            question and no card is requested anywhere on this site.
          </P>
          <P>
            What you receive back is an offer: your dates, the huts we can actually hold, the
            transfers, and a full itemised price. An offer is not a booking. It is valid for the
            period stated on it, and hut availability in the Julian Alps in July can disappear inside
            a week, so an offer that has expired may not be repeatable at the same price.
          </P>
          <Note>
            <P>
              <strong className="font-medium text-ink">A contract exists only when</strong> you
              accept the written offer, and we confirm that acceptance to you in writing. Until both
              of those have happened, neither side owes the other anything.
            </P>
          </Note>
        </Section>

        <Section id="package" n="04" title="What you are buying">
          <P>
            The {tour.name} combines accommodation, half board, luggage transfers and road transfers
            over {tour.days} days. A combination of travel services of that kind is a{" "}
            <strong className="font-medium text-ink">package</strong> within the meaning of Directive
            (EU) 2015/2302 and the Slovenian consumer protection legislation that implements it. That
            gives you the full set of package traveller rights, and it puts a matching set of duties
            on us.
          </P>
          <UL>
            <LI>
              You receive the standard information form for package travel contracts, and the
              essential terms in writing, before you are bound by anything.
            </LI>
            <LI>
              We are responsible for the proper performance of every service in the package, whether
              we deliver it ourselves or a hut, a driver or a guesthouse delivers it for us.
            </LI>
            <LI>
              You may transfer the booking to somebody else who meets the same conditions, on
              reasonable notice and against the actual transfer costs.
            </LI>
            <LI>
              Payments you make are protected against our insolvency by{" "}
              <Fill
                value={company.insolvencyProtection}
                label="name and contact of the insolvency protection provider, required by law"
              />
              .
            </LI>
          </UL>
          <P>
            What is and is not in the price is set out on the{" "}
            <A href="/#included">trek page</A> and, definitively, in your written itinerary. Travel
            to Slovenia, lunches, personal equipment, and travel and mountain rescue insurance are
            not included.
          </P>
        </Section>

        <Section id="money" n="05" title="Prices, payment and changes to the price">
          <P>
            Every trek is priced on your dates and your group size, because hut rates and transfer
            costs move with both. The price you are quoted is the price for your group, in euros,
            and it includes all taxes and unavoidable charges.
          </P>
          <UL>
            <LI>
              <strong className="font-medium text-ink">Deposit:</strong>{" "}
              <Fill value={""} label="deposit amount or percentage, and when it is due" />
            </LI>
            <LI>
              <strong className="font-medium text-ink">Balance:</strong>{" "}
              <Fill value={""} label="when the balance is due, e.g. 30 days before departure" />
            </LI>
            <LI>
              <strong className="font-medium text-ink">How to pay:</strong>{" "}
              <Fill value={""} label="accepted payment methods" />
            </LI>
          </UL>
          <P>
            After the contract is concluded we may increase the price only for the reasons the
            package travel rules allow, which in practice means a change in the cost of fuel or
            transport, in taxes or fees charged by third parties, or in exchange rates. Any increase
            must be notified to you clearly and with justification at least 20 days before departure,
            and it may not exceed 8 per cent of the total price. If it does, you may accept it or
            withdraw without a penalty. The same right works in your favour: if those costs fall, you
            get the reduction back, less our actual administrative expense.
          </P>
        </Section>

        <Section id="cancel" n="06" title="Cancelling and changing">
          <H3>If you cancel</H3>
          <P>
            You may cancel at any time before departure. Because we pay the huts and the drivers in
            advance, a cancellation close to your start date costs real money, and the following
            scale applies to the total price:
          </P>
          <UL>
            <LI>
              <Blank>cancellation scale by days before departure, e.g. more than 60 days, 30 to 60 days, 15 to 29 days, fewer than 15 days</Blank>
            </LI>
          </UL>
          <P>
            If unavoidable and extraordinary circumstances at the destination make the trek
            impossible or seriously affect it, you may cancel without paying any fee and you get a
            full refund of everything paid.
          </P>

          <H3>If we cancel or change something</H3>
          <P>
            We may have to change a hut for one of similar standard, or reroute a day, and small
            changes of that kind we simply tell you about. If we have to change something essential,
            you may accept the change, take a substitute of equivalent or higher quality, or withdraw
            and get everything back. If we cancel the trek ourselves you are refunded in full within
            14 days, and you may have a further claim unless the cancellation was caused by
            unavoidable and extraordinary circumstances or by too few bookings where that was made
            clear in advance.
          </P>

          <H3>The 14-day right of withdrawal does not apply here</H3>
          <Note>
            <P>
              Distance contracts usually carry a 14-day right to change your mind. Package travel,
              and accommodation and leisure services tied to a specific date, are excluded from it by
              law. Your right to cancel is the one described above and in your written itinerary,
              not a 14-day cooling-off period. We say this plainly because you are entitled to know
              it before you pay, not after.
            </P>
          </Note>
        </Section>

        <Section id="you" n="07" title="What a self-guided trek asks of you">
          <P>
            This is the part that matters most, and it is the reason the FAQ leads with it. Nobody
            walks with you. There is no guide setting the pace, reading the sky or deciding when to
            turn back. That decision is yours, every day, and by booking you accept it.
          </P>
          <UL>
            <LI>
              <strong className="font-medium text-ink">Fitness and experience.</strong> The route is
              graded demanding. Days of 6 to 8 hours, long ascents and descents, narrow rocky trails
              inside the national park, and occasional stream crossings. You confirm that everyone in
              your group has previous multi-day hiking experience and is in a condition to walk it.
            </LI>
            <LI>
              <strong className="font-medium text-ink">Equipment.</strong> Proper boots, waterproof
              and warm layers, sun protection and a charged phone are not optional in the Julian
              Alps. We send a full list and we expect it to be taken seriously.
            </LI>
            <LI>
              <strong className="font-medium text-ink">Insurance.</strong> You must hold valid travel
              insurance that covers mountain rescue and helicopter evacuation in Slovenia, and
              medical treatment abroad. Rescue in the Julian Alps can be expensive and it is not
              covered by us. We may ask you to confirm this before departure.
            </LI>
            <LI>
              <strong className="font-medium text-ink">Judgement on the day.</strong> You follow
              marked trails, hut advice and the weather. If conditions turn, you turn with them. Our
              route notes describe the normal route in normal conditions; they do not override what
              you can see in front of you.
            </LI>
            <LI>
              <strong className="font-medium text-ink">Keeping us informed.</strong> Tell us before
              departure about anything medical that could matter on a mountain, and call us from the
              trail if your plan changes. We can only rearrange a hut we know about.
            </LI>
            <LI>
              <strong className="font-medium text-ink">The huts and the park.</strong> Hut rules,
              quiet hours and the rules of Triglav National Park apply to you as they do to everyone.
            </LI>
          </UL>
        </Section>

        <Section id="liability" n="08" title="Where our responsibility begins and ends">
          <P>
            We are responsible for the services in your package being delivered as described: the
            beds being booked, the luggage being where it should be, the transfers arriving, the
            route notes being accurate. If something in the package is not delivered properly, tell
            us without undue delay and we will put it right. If we cannot, you are entitled to an
            appropriate price reduction and, where you suffered damage, to compensation, on the terms
            the package travel rules set out.
          </P>
          <P>
            We are not responsible for the mountain. Weather, rockfall, trail closure, your own route
            choice, an injury from a slip, or a decision to press on when you should have stopped are
            the ordinary risks of alpine hiking, and choosing a self-guided trek means accepting
            them. Nor are we responsible for services you arrange yourself, such as your flights or
            your arrival and departure accommodation.
          </P>
          <P>
            Nothing in these terms limits our liability for death or personal injury caused by our
            own negligence, for intent or gross negligence, or for anything else that cannot lawfully
            be limited. Where a limitation is permitted and no international convention sets a lower
            one, our liability for damage other than personal injury is limited to three times the
            total price of the package.
          </P>
        </Section>

        <Section id="complaints" n="09" title="Complaints and disputes">
          <P>
            Tell us on the trail, while it can still be fixed. A hut that got your booking wrong on
            Tuesday can often be sorted out by Tuesday evening, and almost never in October. Call the
            number you have for the whole week.
          </P>
          <P>
            If something is still unresolved afterwards, write to{" "}
            <A href={`mailto:${company.email}`}>{company.email}</A>. We answer every written
            complaint within 8 days, and we tell you within 30 days what we are doing about it.
          </P>
          <P>
            <strong className="font-medium text-ink">
              Out-of-court settlement of consumer disputes.
            </strong>{" "}
            We are not currently bound by, and do not recognise, any provider of out-of-court
            consumer dispute resolution as competent for disputes arising from these terms. This is
            published here because Slovenian consumer law requires a trader to say so plainly. It
            does not affect your right to take a dispute to the competent court, or to contact the
            Market Inspectorate of the Republic of Slovenia.
          </P>
        </Section>

        <Section id="law" n="10" title="Law, language and the small print">
          <UL>
            <LI>
              <strong className="font-medium text-ink">Governing law.</strong> Slovenian law applies.
              If you are a consumer resident in another EU country, you keep the protection of the
              mandatory consumer rules of your own country, and this clause takes nothing away from
              them.
            </LI>
            <LI>
              <strong className="font-medium text-ink">Courts.</strong> Disputes go to the competent
              court in Slovenia. A consumer may also sue, and may only be sued, in the courts of
              their own country of residence, as EU law provides.
            </LI>
            <LI>
              <strong className="font-medium text-ink">Language.</strong> These terms are written in
              English and the contract is concluded in English. A Slovenian version is available on
              request.
            </LI>
            <LI>
              <strong className="font-medium text-ink">Severability.</strong> If a court finds one
              clause invalid, the rest stays in force.
            </LI>
            <LI>
              <strong className="font-medium text-ink">Changes.</strong> We may update these terms.
              The version that applies to your trek is the one published when you booked, and we keep
              a copy of it with your itinerary.
            </LI>
            <LI>
              <strong className="font-medium text-ink">Your data.</strong> Handled as described in
              the <A href="/privacy">privacy policy</A>, which forms part of these terms.
            </LI>
          </UL>
        </Section>
      </LegalBody>
    </>
  )
}
