import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import Script from "next/script"
import "./globals.css"

export const metadata: Metadata = {
  title: "Andara - Queen of the Alps | 7-Day Triglav Tour Slovenia",
  description:
    "Experience the ultimate 7-day self-guided hiking adventure through Slovenia's Triglav National Park with Andara. Discover pristine alpine lakes, dramatic peaks, and authentic mountain huts.",
  generator: "v0.app",
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
  // Dodajte tudi Open Graph slike za boljši izgled v Google rezultatih
  openGraph: {
    title: "Andara - Queen of the Alps | 7-Day Triglav Tour Slovenia",
    description: "Experience the ultimate 7-day self-guided hiking adventure through Slovenia's Triglav National Park",
    url: 'https://andara.si',
    siteName: 'Andara',
    images: [
      {
        url: '/andara-logo-final.png', // Ustvarite 1200x630px sliko
        width: 1200,
        height: 630,
        alt: 'Andara - Triglav National Park Tours',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Andara - Queen of the Alps",
    description: "7-Day self-guided hiking adventure through Slovenia's Triglav National Park",
    images: ['/og-image.png'],
  },
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
      </head>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <Suspense fallback={null}>{children}</Suspense>
        <Analytics />
      </body>
    </html>
  )
}
