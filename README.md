# Andara - andara.si

Prodajna stran za 7-dnevni self-guided trek okoli Triglava.
Next.js 15 (App Router) + Tailwind v4, deploy na Vercel.

Delovna artefakta procesa: [`BRIEF.md`](./BRIEF.md) in [`DESIGN-LOCK.md`](./DESIGN-LOCK.md).
Preberi ju, preden karkoli spremenis v vizualnem sloju.

---

## Zagon

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # produkcijski build, mora iti brez napak
npx next start -p 4321
```

## Kje je vsebina

**Vsa besedila, itinerarij, FAQ, kontakt in image credits so v [`lib/site.ts`](./lib/site.ts).**
Za spremembo besedila se ne dotikas komponent. Nova slika dneva gre v `public/`, pot pa v
`itinerary[].image`.

## Kaj se je pri prenovi spremenilo in zakaj

Stranka je javila dve tezavi. Obe sta bili resevani z arhitekturo strani, ne s kozmetiko.

### 1. "Uporabniki ne razumejo, da je self-guided"

Beseda je bila prej zakopana v prozi, ena kartica je celo trdila `Group Size: Self-guided`.
Zdaj self-guided pove **osem** mest, po padajoci vidnosti:

| Kje | Kaj pove |
|---|---|
| Header, pod logotipom | `SELF-GUIDED TREKS` |
| Hero eyebrow | `SELF-GUIDED TREK - NO GUIDE, NO GROUP` |
| Hero H1 | "Nobody walking ahead of you" |
| Hero podatkovna kartica | `You walk with: Your own group` |
| Sekcija 01, takoj pod herojem | "This is not a guided group tour" + trije bloki: no guide / no group / no schedule |
| Primerjalna tabela | osem vrstic self-guided proti vodeni skupini, vkljucno s ceno |
| Sekcija 05 "Not included" | prva postavka: "A guide walking with you. This is a self-guided trek, by design." |
| FAQ vprasanje st. 1 | "Wait, is there a guide with us or not?" |

Plus `title`, `description`, OG in `TouristTrip` schema.

### 2. "Kontakt je preskrit"

Prej: en `mailto` v predzadnji sekciji, brez navigacije. Zdaj je kontakt dosegljiv z
**enim klikom z vsakega piksla strani**:

- sticky header z gumbom `Plan your dates` in e-mailom (desktop)
- sticky spodnja vrstica `Email us` / `Plan your dates` na mobilnem, pod 1024 px
- CTA v heroju, po "how it works", v CTA bandu sredi strani in ob FAQ
- polna enquiry sekcija z obrazcem na dnu domace strani
- lastna stran `/contact`
- debel footer s kontaktnim blokom na prvem mestu

### 3. Design

v0.app scaffold (shadcn kartice, `hover:-translate-y-3` na vsem, `from-primary to-accent`
gradient z `bg-black/40` cez) je zamenjan z zaklenjenim sistemom iz `DESIGN-LOCK.md`:
Editorial Luxury na toplem papirju, en akcent (terakota iz logotipa), ena radij skala,
Newsreader za naslove, double-bezel namesto plavajocih kartic.

Itinerarij ni vec carousel. Vseh sedem dni je v HTML in vidnih hkrati, kar je bolje za
branje in za SEO.

---

## Obrazec - kaj je treba nastaviti

`POST /api/enquiry` posilja prek [Resend](https://resend.com). Brez kljuca obrazec **ne
pade v prazno**: odjemalec se sam prevesi na predizpolnjen `mailto:`, tako da povprasevanje
vseeno pride do stranke.

Za pravo dostavo nastavi v Vercelu (Settings -> Environment Variables):

| Spremenljivka | Privzeto | Opomba |
|---|---|---|
| `RESEND_API_KEY` | - | brezplacen kljuc, 100 mailov/dan |
| `ENQUIRY_TO` | `info@andara.si` | kam pridejo povprasevanja |
| `ENQUIRY_FROM` | `onboarding@resend.dev` | za produkcijo verificiraj `andara.si` v Resendu in nastavi npr. `Andara <web@andara.si>` |

Obrazec ima honeypot polje `website` in preverja e-mail na strezniku.

---

## Kaj se manjka in kaj je predpostavka

| Kaj | Stanje |
|---|---|
| **Cena** | Namerno je ni. Odlocitev stranke: "cena na povprasevanje". Ce se pozneje odlocijo za `od EUR X`, gre v `lib/site.ts` in v pricing blok pod sekcijo 05. |
| **Fotki Anje in Darje** | Nimamo jih. `/about` ima namesto njiju monogram v krogu. Ko fotki prideta, se v `app/about/page.tsx` zamenja `<span>` z monogramom za `<Image>` v istem kvadratu, komentar je na mestu. Prejsnja stran je tu vracala 404. |
| **Telefon** | Ni objavljen, ker ga stranka ni dala. Ce ga da, gre v header, v `/contact` in v `TravelAgency` schemo. |
| **Facebook** | Prejsnja stran je imela `href="#"`, mrtev link. Odstranjen. Ce imajo profil, se doda v `site.socials`. |
| `[PREDPOSTAVKA]` velikost skupine 2-8 | v `lib/site.ts`, `tour.party`. Preveriti. |
| `[PREDPOSTAVKA]` odzivni cas 24 h | v `lib/site.ts`, `site.replyTime`. Pise na sedmih mestih na strani, meni se na enem. |

---

## Slike

`public/` je bil 62 MB (ena slika 11 MB). Zdaj 5,7 MB. Vse slike so iste, samo pomanjsane
na razumne spletne velikosti in prekodirane v progresivni JPEG. Imena datotek so
normalizirana (brez presledkov, vejic in oklepajev v URL-jih).

Odstranjene so bile neuporabljene norveske AI slike iz Jotunheimen predloge
(`aerial-view-of-norwegian...`, `dramatic-mountain-landscape...`,
`topographic-map-of-norwegian...`) - napacen kontekst za Slovenijo.

Logotip je razbit na `andara-mark.png` (znak za header in footer) in `andara-lockup.png`
(poln lockup). Wikimedia atribucije so nespremenjene, v footerju pod "Image credits".

Videa sta ista, samo dostavljena prek Cloudinary transformacij:
- intro je bil `.mov` (QuickTime), ki ga Chrome pogosto ne predvaja. Zdaj `.mp4` prek `f_auto,q_auto`.
- animirana karta je bila 10,6 MB. Zdaj `f_auto,q_auto,w_1600`, 0,9 MB, vizualno enako.
- oba sta `preload="none"`. S prejsnjim `preload="metadata"` je Chrome potegnil 4,3 MB videa,
  se preden je kdo pritisnil play.
- poster je pravi kader iz videa (`so_3` in `so_5`), ne fotografija. 63 KB in 23 KB webp.

**Skupna teza domace strani na mobilnem: 583 KB, 30 zahtevkov, LCP okoli 0,7 s.**
Pred prenovo je samo `public/` tehtal 62 MB. Najtezji posamezni vir je zdaj Google
Analytics (165 KB).

---

## Preverjanje

```bash
node shots.mjs http://localhost:4321 380,768,1440   # posnetki + vodoravni preliv + konzola
node sections.mjs http://localhost:4321 1440 "#itinerary,#faq" tag
node qa.mjs                                          # interakcije, dostopnost, obrazec
```

`qa.mjs` preverja mobilni meni, ESC, tapljive cilje >= 40 px, FAQ, oddajo obrazca,
`prefers-reduced-motion`, delovanje brez JS, en `h1` na stran in `alt` na vseh slikah.

> Opomba: Chromov `fullPage` posnetek nad ~16384 px podvoji vsebino. To je artefakt
> posnetka, ne napaka strani. Za dolge strani uporabi `sections.mjs`.

---

## Analitika

Google Analytics `G-E46C40SZKN` in Vercel Analytics sta prenesena iz stare strani.
`robots.txt` in `sitemap.xml` se zdaj generirata (`app/robots.ts`, `app/sitemap.ts`),
sitemap vkljucuje novo `/contact`.
