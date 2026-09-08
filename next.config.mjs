/**
 * Testna kopija na *.vercel.app ne sme v Google, sicer konkurira andara.si
 * z isto vsebino. X-Robots-Tag se doda povsod, razen ko je produkcijska
 * domena projekta andara.si - takrat stran normalno indeksira.
 */
const productionHost = process.env.VERCEL_PROJECT_PRODUCTION_URL ?? ""
const isLiveSite = productionHost.endsWith("andara.si")

/**
 * Politika vsebine. Nasteti so samo izvori, ki jih stran res uporablja:
 * Cloudinary za dva videa, api.web3forms.com za oddajo obrazca, Google Tag
 * Manager in Analytics (naloZita se sele po privolitvi), Vercelova analitika
 * pa tece z lastne domene.
 *
 * 'unsafe-inline' pri skriptah je nujno: Next.js ima inline bootstrap in
 * inline JSON-LD. Nonce bi zahteval middleware na vsakem zahtevku in bi
 * ubil staticno predpripravo strani. Ostale direktive so kljub temu
 * smiselne, ker omejujejo, od kod se sploh sme kaj naloziti.
 */
const csp = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "frame-ancestors 'none'",
  "form-action 'self'",
  "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com",
  "style-src 'self' 'unsafe-inline'",
  "font-src 'self' data:",
  "img-src 'self' data: blob: https://res.cloudinary.com https://www.googletagmanager.com https://*.google-analytics.com",
  "media-src 'self' https://res.cloudinary.com",
  "connect-src 'self' https://api.web3forms.com https://www.googletagmanager.com https://*.google-analytics.com https://*.analytics.google.com",
  "upgrade-insecure-requests",
].join("; ")

/** Velja na vsakem odgovoru, tudi na testni kopiji. */
const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "DENY" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
]

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: false },
  images: {
    // Vercel optimizira slike sam (AVIF/WebP + responsive sizes).
    // Ce bi stranka hotela iz kvote ven, nastavi unoptimized: true.
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 365,
  },
  poweredByHeader: false,
  compress: true,
  async headers() {
    const base = [{ source: "/:path*", headers: securityHeaders }]
    if (isLiveSite) return base
    return [
      ...base,
      {
        source: "/:path*",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
    ]
  },
}

export default nextConfig
