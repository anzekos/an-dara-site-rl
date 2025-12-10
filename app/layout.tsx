import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Suspense } from "react"
import Script from "next/script"
import "./globals.css"

export const metadata: Metadata = {
  metadataBase: new URL('https://www.andara.si'),
  title: {
    default: "Triglav Hiking Tour Slovenia | 7-Day Self-Guided Trek | Andara",
    template: "%s | Andara - Self-Guided Hiking Tours Slovenia"
  },
  description:
    "Experience the ultimate 7-day self-guided Triglav hiking tour through Slovenia's Triglav National Park. Circle Mount Triglav (2,864m) on a 100km trek with luggage transfers, alpine huts & local cuisine. Best alternative to Tour du Mont Blanc.",
  keywords: [
    "triglav tour",
    "triglav hiking tour",
    "triglav national park tour",
    "self guided hiking slovenia",
    "slovenia hiking tours",
    "julian alps hiking",
    "triglav trek",
    "mount triglav tour",
    "best alternative to tour du mont blanc",
    "7 day triglav tour",
    "triglav lakes valley",
    "slovenia self guided tours",
    "hiking triglav national park",
    "slovenian alps hiking",
    "triglav circuit trek"
  ],
  authors: [{ name: "Andara" }],
  creator: "Andara - Anja Bervar & Darja Munda",
  publisher: "Andara",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  generator: "v0.app",
  applicationName: "Andara Hiking Tours",
  referrer: 'origin-when-cross-origin',
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.andara.si',
    siteName: 'Andara - Self-Guided Hiking Tours Slovenia',
    title: "Triglav Hiking Tour | 7-Day Self-Guided Trek Slovenia | Andara",
    description: "Experience a 7-day self-guided hiking adventure through Slovenia's Triglav National Park. Circle Mount Triglav on a 100km trek - the best alternative to Tour du Mont Blanc.",
    images: [
      {
        url: '/triglav-mountain-landscape.jpeg',
        width: 1200,
        height: 630,
        alt: 'Triglav National Park hiking tour - 7 day self-guided trek in Slovenia',
        type: 'image/jpeg',
      },
      {
        url: '/andara-logo-final.png',
        width: 800,
        height: 600,
        alt: 'Andara - Queen of the Alps | Self-Guided Hiking Tours Slovenia',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Triglav Hiking Tour | 7-Day Self-Guided Trek Slovenia",
    description: "Experience a 7-day self-guided hiking adventure through Slovenia's Triglav National Park. Best alternative to Tour du Mont Blanc.",
    images: ['/triglav-mountain-landscape.jpeg'],
    creator: '@andara.si',
  },
  alternates: {
    canonical: 'https://www.andara.si',
    languages: {
      'en-US': 'https://www.andara.si',
      'sl-SI': 'https://www.andara.si/sl',
    },
  },
  category: 'travel',
  classification: 'Hiking Tours, Adventure Travel, Outdoor Activities',
  other: {
    'geo.region': 'SI',
    'geo.placename': 'Slovenia',
    'geo.position': '46.3777;13.8430',
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-E46C40SZKN"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-E46C40SZKN');
          `}
        </Script>

        {/* Structured Data - Organization */}
        <Script
          id="structured-data-organization"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "TourOperator",
              "name": "Andara",
              "description": "Self-guided hiking tours in Slovenia specializing in Triglav National Park adventures",
              "url": "https://www.andara.si",
              "logo": "https://www.andara.si/andara-logo-final.png",
              "image": "https://www.andara.si/triglav-mountain-landscape.jpeg",
              "email": "info@andara.si",
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "SI",
                "addressRegion": "Slovenia"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": "46.3777",
                "longitude": "13.8430"
              },
              "sameAs": [
                "https://www.instagram.com/andara.si/",
                "https://www.tiktok.com/@andara.si"
              ],
              "contactPoint": {
                "@type": "ContactPoint",
                "contactType": "customer service",
                "email": "info@andara.si",
                "availableLanguage": ["English", "Slovenian"]
              }
            })
          }}
        />

        {/* Structured Data - LocalBusiness */}
        <Script
          id="structured-data-local-business"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "Andara - Self-Guided Hiking Tours Slovenia",
              "description": "Experience authentic self-guided hiking adventures in Slovenia's Triglav National Park with Andara",
              "url": "https://www.andara.si",
              "telephone": "+386-XX-XXX-XXX",
              "email": "info@andara.si",
              "priceRange": "€€",
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "SI"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": "46.3777",
                "longitude": "13.8430"
              },
              "openingHoursSpecification": {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": [
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday"
                ],
                "opens": "09:00",
                "closes": "17:00"
              }
            })
          }}
        />

        {/* Breadcrumb Schema */}
        <Script
          id="structured-data-breadcrumb"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "name": "Home",
                  "item": "https://www.andara.si"
                },
                {
                  "@type": "ListItem",
                  "position": 2,
                  "name": "Triglav Hiking Tour",
                  "item": "https://www.andara.si/#triglav-tour"
                }
              ]
            })
          }}
        />

        {/* FAQ Schema - will be dynamically added on page */}
      </head>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <Suspense fallback={null}>{children}</Suspense>
        <Analytics />
      </body>
    </html>
  )
}
