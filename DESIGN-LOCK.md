# DESIGN LOCK - Andara

Zaklenjeno: 2026-08-19. Vsaka sprememba tukaj, preden se spremeni koda.

## Design read
Berem kot: prodajno stran za en drag outdoor izdelek, za tuje izkusene pohodnike 35-60,
uredniski revijski jezik (Conde Nast Traveller, ne SaaS), nagnjeno k Editorial Luxury.

## Estetika
AKTIVEN PRESET: **high-end-visual-design**
Osnova: design-taste-frontend (velja vedno)

Arhetipa iz Variance Engine (Sekcija 3 preseta):
- **Vibe: Editorial Luxury** - topla papirnata baza, film grain, visokokontrastni variable
  serif za velike naslove
- **Layout: Editorial Split** - masivna tipografija levo, medij in podatki desno; dan-za-dnem
  kot navpicna uredniska os s sticky medijem

IZKLJUCENO za ta projekt:
- minimalist-ui
- industrial-brutalist-ui
- gpt-taste

## Dials
Redesign - prenova (VARIANCE +2, MOTION +2, DENSITY ujemi obstojece)
DESIGN_VARIANCE: 7
MOTION_INTENSITY: 5
VISUAL_DENSITY: 4

## Tokeni
Display:  Newsreader (variable serif, optical sizing), weight 300-500, tracking -0.02em
Body:     Geist Sans (ze v projektu, lokalni paket, brez omreznega fetcha)
Mono:     Geist Mono - samo za stevilke podatkov (km, visinska metra, ure)
Tema:     light, ena skozi celo stran
Ozadje:   #F6F2EC (toplo kostno, nikoli #ffffff)
Povrsina: #EFE9E0 (sekundarna ploskev) / #FCFAF7 (dvignjena kartica)
Besedilo: #16201F (ink, 14.94:1) / #5A625E (sekundarno, 5.63:1)
Akcent:   #B04E33 (terakota iz loga; belo na njem 5.27:1, na papirju 4.73:1)
          EDINI akcent na strani. Teal in zlata obstajata samo znotraj loga.
Linija:   rgba(22,32,31,0.14)
Radiji:   pill (rounded-full) za vse interaktivno; 24px zunanja lupina, 18px notranje jedro
          za double-bezel kartice in medij. Nobene druge vrednosti.
Sekcije:  py-24 md:py-32 (DENSITY 4)

## Zakaj Newsreader in ne kaj drugega
Fraunces in Instrument Serif sta prepovedana kot privzeta izbira (design-taste-frontend).
Playfair je najbolj prepoznaven AI podpis v travel nisi, Cormorant bere kot poroka.
Newsreader je variable serif z opticno velikostjo, narejen za uredniško branje: pri 72px+
je visokokontrasten in oster, pri 18px topel in berljiv. Register je potovalna revija,
kar je tocno pravi ton za alpsko turo, ne butik hotel.

## Motion
Press 140ms / UI 200ms / Overlay 260ms / Reveal 700ms
Easing: --ease-out cubic-bezier(0.23, 1, 0.32, 1)
        --ease-spring cubic-bezier(0.32, 0.72, 0, 1)
Reveal: translateY(28px) + opacity 0 -> 0, staggered 60ms, IntersectionObserver, enkratno
Reduced motion: vsi reveali takoj vidni, transform in transition izklopljeni, samo
                opacity 1 ostane

## Odstopanja od skupnih pravil (in razlogi)
1. **Preset zahteva blur v scroll revealih** (`blur-md` -> `blur-0`). Ne uporabim.
   Razlog: skupno pravilo "animiraj samo transform in opacity" zmaga nad presetom, in
   animiran `filter: blur()` na velikih blokih povzroca zvezne GPU repainte na mobilnem.
   Reveal je translateY + opacity.
2. **Preset zahteva rounded-[2rem] (32px)**. Uporabim 24px / 18px.
   Razlog: 32px na uredniski revijski postavitvi bere kot SaaS bento. 24px ohrani
   double-bezel koncentricnost, a ostane uredniski. Skala je ena in zaklenjena.
3. **Foto sekcije s temnim scrimom** (hero, CTA band) niso obrat teme.
   Tema strani je light povsod; te sekcije so fotografija z berljivim scrimom,
   ne invertirana povrsina. Nobena ploskev z barvo ozadja se ne obraca.
4. **Ikone**: Phosphor Light (`@phosphor-icons/react`, weight="light"). Lucide se v celoti
   odstrani - preset ga prepoveduje in mesanje dveh druzin je prepovedano.

## Kaj konkretno resuje kateri poslovni problem
| Problem stranke | Oblikovalska poteza |
|---|---|
| "ne razumejo da je self-guided" | eyebrow pill v heroju, `SelfGuidedExplainer` sekcija takoj pod herojem, primerjalna tabela self-guided vs vodena skupina, "Not included: a guide walking with you", FAQ vprasanje st. 1, ponovitev v vsakem dnevu itinerarija |
| "kontakt je preskrit" | sticky header s CTA, hero CTA, CTA band sredi strani, polna enquiry sekcija z obrazcem, sticky mobilna vrstica pod 768px, debel footer, lastna /contact stran |
| "design je AI slop" | Editorial Luxury + Editorial Split, en akcent, ena radij skala, double-bezel namesto plavajocih shadcn kartic, serif display namesto system bold, carousel -> uredniska os |
