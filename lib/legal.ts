/**
 * Pravni podatki na enem mestu.
 *
 * POMEMBNO: polja z vrednostjo TODO se na strani izrisejo kot vidna
 * oznaka "[ ... ]" in nikoli kot izmisljen podatek. Stranka jih izpolni,
 * preden gre stran v produkcijo. Seznam manjkajocega je v LEGAL-TODO.md.
 */

/** Sentinel za podatek, ki ga se nimamo. Nikoli ne ugibaj. */
export const TODO = "__TODO__" as const

export function isTodo(v: string): boolean {
  return v === TODO || v.trim() === ""
}

/** Datum zadnje spremembe pravnih besedil. Rocno posodobi ob vsaki vsebinski spremembi. */
export const legalUpdated = "2026-09-08"

/**
 * Identifikacija ponudnika. Obvezno po 6. clenu ZEPT
 * (5. clen Direktive 2000/31/ES) in po 45. clenu ZGD-1.
 */
export const company = {
  /** Polno registrirano ime pravne osebe, npr. "Andara d.o.o." ali "Ime Priimek s.p." */
  legalName: TODO,
  /** Kratko ime, ki ga uporablja stran. */
  tradingName: "Andara",
  /** Ulica in hisna stevilka. */
  street: TODO,
  /** Postna stevilka in kraj. */
  city: TODO,
  country: "Slovenia",
  /** Maticna stevilka iz PRS. */
  registrationNumber: TODO,
  /** Davcna / ID za DDV. Ce zavezanec ni identificiran za DDV, napisi davcno stevilko in to pripisi. */
  vatNumber: TODO,
  /** Register in organ vpisa, npr. "Poslovni register Slovenije, AJPES". */
  register: TODO,
  /** Zakoniti zastopnik oz. nosilec dejavnosti. */
  representative: TODO,
  /** Telefon. Ce ga stranka ne zeli objaviti, pusti TODO in ostane samo e-posta. */
  phone: TODO,
  email: "info@andara.si",
  /** Kontakt za varstvo osebnih podatkov. Lahko isti kot splosni. */
  privacyEmail: "info@andara.si",
  /**
   * Licenca za organiziranje turisticnih paketov po ZSRT-1 in dokazilo
   * o jamstvu za primer insolventnosti po Direktivi (EU) 2015/2302.
   */
  travelLicence: TODO,
  insolvencyProtection: TODO,
} as const

/** Nadzorni organ za varstvo osebnih podatkov. Javni podatek. */
export const dpa = {
  name: "Informacijski pooblascenec Republike Slovenije",
  nameEn: "Information Commissioner of the Republic of Slovenia",
  address: "Dunajska cesta 22, 1000 Ljubljana, Slovenia",
  email: "gp.ip@ip-rs.si",
  phone: "+386 1 230 97 30",
  url: "https://www.ip-rs.si/",
} as const

/* ------------------------------------------------------------ obdelovalci */

export type Processor = {
  name: string
  role: string
  country: string
  /** Kako je urejen prenos v tretjo drzavo, ce ga je. */
  transfer?: string
  privacyUrl: string
}

/**
 * Vsak zunanji prejemnik podatkov, ki ga stran dejansko uporablja.
 * Ko dodas ali odstranis storitev, popravi tudi ta seznam.
 */
export const processors: Processor[] = [
  {
    name: "Vercel Inc.",
    role: "Hosting and delivery of this website, server logs, privacy-friendly traffic measurement",
    country: "United States, with edge servers in the EU",
    transfer: "EU-U.S. Data Privacy Framework and EU Standard Contractual Clauses",
    privacyUrl: "https://vercel.com/legal/privacy-policy",
  },
  {
    name: "Resend (Plus Five Five, Inc.)",
    role: "Delivery of the enquiry email from the website to our inbox",
    country: "United States",
    transfer: "EU Standard Contractual Clauses",
    privacyUrl: "https://resend.com/legal/privacy-policy",
  },
  {
    name: "Google Ireland Limited",
    role: "Google Analytics 4, website statistics. Runs only if you allow analytics cookies",
    country: "Ireland, with onward transfer to Google LLC in the United States",
    transfer: "EU-U.S. Data Privacy Framework and EU Standard Contractual Clauses",
    privacyUrl: "https://policies.google.com/privacy",
  },
  {
    name: "Cloudinary Ltd.",
    role: "Delivery of the two videos on this site. Receives your IP address when a video loads",
    country: "Israel and the United States",
    transfer:
      "EU adequacy decision for Israel, and EU Standard Contractual Clauses for the United States",
    privacyUrl: "https://cloudinary.com/privacy",
  },
]

/* ---------------------------------------------------------------- piskotki */

export type CookieRow = {
  name: string
  provider: string
  purpose: string
  duration: string
  category: "necessary" | "analytics"
}

export const cookieRows: CookieRow[] = [
  {
    name: "andara_consent",
    provider: "Andara (this website)",
    purpose:
      "Remembers whether you allowed analytics cookies, so we do not ask again on every page.",
    duration: "6 months",
    category: "necessary",
  },
  {
    name: "_ga",
    provider: "Google Analytics",
    purpose:
      "Tells apart one visitor from another so we can count how many people read a page. Set only after you allow analytics.",
    duration: "2 years",
    category: "analytics",
  },
  {
    name: "_ga_E46C40SZKN",
    provider: "Google Analytics",
    purpose:
      "Keeps the state of your visit for the same counting. Set only after you allow analytics.",
    duration: "2 years",
    category: "analytics",
  },
]

/* ------------------------------------------------------------- povezave */

export const legalNav = [
  { href: "/privacy", label: "Privacy policy" },
  { href: "/cookies", label: "Cookie policy" },
  { href: "/terms", label: "Terms and conditions" },
] as const
