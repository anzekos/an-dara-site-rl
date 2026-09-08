import type { Metadata } from "next"
import type React from "react"
import Script from "next/script"
import { Newsreader } from "next/font/google"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { MobileActionBar } from "@/components/mobile-action-bar"
import { ConsentProvider } from "@/components/consent/consent-provider"
import { CookieBanner } from "@/components/consent/cookie-banner"
import { AnalyticsGate } from "@/components/consent/analytics-gate"
import { site, faq, itinerary } from "@/lib/site"
import "./globals.css"

const newsreader = Newsreader({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-newsreader",
  style: ["normal", "italic"],
})

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Triglav Circuit | 7-Day Self-Guided Trek in Slovenia | Andara",
    template: "%s | Andara - Self-Guided Treks in Slovenia",
  },
  description:
    "A 7-day self-guided trek around Mount Triglav. No guide, no group, no fixed dates. We book the huts, move your luggage and map all 100 km. You just walk it.",
  keywords: [
    "self guided hiking slovenia",
    "triglav tour",
    "triglav hiking tour",
    "self guided trek julian alps",
    "slovenia hiking tours",
    "triglav national park tour",
    "best alternative to tour du mont blanc",
    "7 day triglav tour",
    "triglav lakes valley",
    "hiking triglav national park",
    "triglav circuit trek",
    "luggage transfer hiking slovenia",
  ],
  authors: [{ name: "Andara" }],
  creator: "Andara - Anja Bervar and Darja Munda",
  publisher: "Andara",
  applicationName: "Andara",
  generator: undefined,
  referrer: "origin-when-cross-origin",
  formatDetection: { email: false, address: false, telephone: false },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    shortcut: "/favicon.ico",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: site.url,
    siteName: "Andara - Self-Guided Treks in Slovenia",
    title: "Triglav Circuit | 7-Day Self-Guided Trek in Slovenia",
    description:
      "No guide, no group, no fixed dates. A 7-day self-guided trek around Slovenia's highest mountain, with huts, meals and luggage transfers arranged.",
    images: [
      {
        url: "/triglav-mountain-landscape.jpg",
        width: 1200,
        height: 630,
        alt: "The Triglav massif, the 7 day self-guided trek in Slovenia",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Triglav Circuit | 7-Day Self-Guided Trek in Slovenia",
    description:
      "No guide, no group, no fixed dates. 100 km around Mount Triglav, with everything but the walking arranged.",
    images: ["/triglav-mountain-landscape.jpg"],
    creator: "@andara.si",
  },
  alternates: { canonical: site.url },
  category: "travel",
  other: {
    "geo.region": "SI",
    "geo.placename": "Slovenia",
    "geo.position": "46.3777;13.8430",
  },
}

const schema = [
  {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    name: "Andara",
    alternateName: "Andara - Queen of the Alps",
    description:
      "Self-guided hiking tours in Slovenia. Multi-day treks in Triglav National Park and the Julian Alps, arranged end to end but walked without a guide.",
    url: site.url,
    logo: `${site.url}/andara-lockup.png`,
    image: `${site.url}/triglav-mountain-landscape.jpg`,
    email: site.email,
    founder: [
      { "@type": "Person", name: "Anja Bervar" },
      { "@type": "Person", name: "Darja Munda" },
    ],
    address: { "@type": "PostalAddress", addressCountry: "SI" },
    areaServed: { "@type": "Place", name: "Triglav National Park, Julian Alps, Slovenia" },
    sameAs: [site.socials.instagram, site.socials.tiktok],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      email: site.email,
      availableLanguage: ["English", "Slovenian"],
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: "The Triglav Circuit, 7-day self-guided trek",
    description:
      "A 100 km self-guided trek circling Mount Triglav over seven days. Walked without a guide and without a group. Alpine huts, half board and daily luggage transfers arranged.",
    url: site.url,
    touristType: ["Experienced hikers", "Independent travellers"],
    provider: { "@type": "TravelAgency", name: "Andara", url: site.url },
    itinerary: {
      "@type": "ItemList",
      numberOfItems: itinerary.length,
      itemListElement: itinerary.map((d) => ({
        "@type": "ListItem",
        position: d.day,
        item: { "@type": "TouristDestination", name: d.title, description: d.description },
      })),
    },
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      priceSpecification: {
        "@type": "PriceSpecification",
        description: "Priced per group and per dates. Full quote within 24 hours.",
      },
      url: `${site.url}/contact`,
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  },
]

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${newsreader.variable} ${GeistSans.variable} ${GeistMono.variable}`}
    >
      <head>
        {/*
          Blokirajoce, pred prvim izrisom. Scroll reveali se skrijejo samo, ce
          JS tece. Brez tega bi obiskovalec brez JS videl prazno stran.

          V isti skripti postavimo tudi Google Consent Mode v2 na "denied".
          To mora biti v <head> in pred katerimkoli Googlovim skriptom, sicer
          privzeto stanje ne velja. Sam gtag.js se nalozi sele po privolitvi,
          v komponenti AnalyticsGate.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.classList.add('js');
window.dataLayer=window.dataLayer||[];
function gtag(){dataLayer.push(arguments);}
gtag('consent','default',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:'denied',functionality_storage:'granted',security_storage:'granted',wait_for_update:500});`,
          }}
        />
      </head>
      <body className="grain">
        <ConsentProvider>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:text-[0.875rem] focus:text-paper"
          >
            Skip to content
          </a>
          <div id="top-sentinel" aria-hidden className="absolute top-0 h-1 w-full" />
          <SiteHeader />
          <main id="main">{children}</main>
          <SiteFooter />
          <MobileActionBar />

          <CookieBanner />

          <Script
            id="ld-json"
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
          <AnalyticsGate />
        </ConsentProvider>
      </body>
    </html>
  )
}
