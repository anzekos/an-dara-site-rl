# BRIEF - Andara (andara.si)

Zapisano: 2026-08-19. Faza 0 web-studio.

## Stranka
- **Ime**: Andara - Queen of the Alps
- **Kdo**: Anja Bervar in Darja Munda, dve Slovenki, bivsi farmacevtki (20+ let), zdaj
  lokalna agencija za self-guided pohodnistvo
- **Panoga**: adventure travel / multi-day trekking, butik
- **Kraj**: Slovenija, Triglavski narodni park, Julijske Alpe
- **Produkt**: en izdelek - 7-dnevni self-guided trek okoli Triglava, 100 km,
  sezona maj-september, luggage transfer, koce in gostisca, polpenzion

## Namen strani
**Redesign obstojece strani + dvig konverzije.** Ni predstavitev, je prodajna stran za en
drag izdelek (odlocitev za let dopusta, tuji kupec).

## Nacin
**PRODUKCIJA** z eno luknjo: cena ni javna (odlocitev stranke - "cena na povprasevanje").
Najprej gre na testno Vercel poddomeno v potrditev stranki, sele nato na andara.si.

## Obcinstvo
Tuji izkuseni pohodniki, 35-60, DE / NL / UK / US / SCAND. Vecinoma pari in majhne skupine
prijateljev. Pogosto so ze hodili Tour du Mont Blanc in iscejo manj natrpano alternativo.
Odlocevalec je oseba, ki organizira dopust za skupino. Jezik strani: **anglescina** (ostane).

## Dve tezavi, ki ju je javila stranka
1. **Uporabniki ne razumejo, da gre za self-guided.** Mislijo, da kupujejo vodeno skupinsko
   turo. Beseda "self-guided" je na stari strani prisotna, a je zakopana v prozi in v eni
   kartici pise celo "Group Size: Self-guided", kar je logicno nesmiselno in dela zmedo.
2. **Kontakt je preskrit.** Edini kanal je `info@andara.si` v predzadnji sekciji. Ni headerja,
   ni navigacije, ni obrazca, ni CTA nikjer nad footerjem.

## Kaj se ohrani
- Vse besedilo o turi, itinerarij dan-za-dnem (7 dni, statistike, difficulty, Google Maps linki)
- FAQ vsebina, About zgodba, vrednote, misija
- Vse slike iz `public/` (optimizirane po velikosti, vsebinsko nespremenjene)
- Oba Cloudinary videa (predstavitveni + animirana karta)
- Logo, favicon, barve blagovne znamke
- URL-ji: `/` in `/about` ostaneta. Novo: `/contact`
- SEO metadata, sitemap, robots, GA (G-E46C40SZKN), Vercel Analytics
- Image credits (Wikimedia atribucije) - pravno besedilo, ostane dobesedno

## Kaj gre stran
- v0.app scaffold: shadcn Card povsod, `hover:-translate-y-3 hover:scale-[1.02]` na vsakem
  elementu, `bg-gradient-to-br from-primary to-accent` + `bg-black/40` overlay
- Carousel za itinerarij (skrije 6 od 7 dni, ubija SEO in scanability)
- Mrtev Facebook link (`href="#"`)
- Neuporabljene norveske AI slike iz Jotunheimen predloge (aerial-view-of-norwegian...,
  day---day-day--norwegian..., dramatic-mountain-landscape..., topographic-map-of-norwegian...)
  Ostanejo v repotu, a se nikjer ne uporabijo - napacen kontekst za Slovenijo.
- `+386-XX-XXX-XXX` placeholder v LocalBusiness schemi
- Neuporabljene odvisnosti: vue, vue-router, svelte, @sveltejs/kit, @remix-run/react

## Odlocitve stranke (potrjeno 2026-08-19)
| Vprasanje | Odlocitev |
|---|---|
| Cena | **Na povprasevanje.** Brez stevilke. Namesto tega mocan "what you get" blok + "quote in 24h" |
| Kontaktni kanali | **e-mail + obrazec + Instagram + TikTok.** Telefona ni. Facebook link se odstrani |
| Fotki Anje in Darje | **Nimamo jih.** Sekcija se zgradi brez fotk, s pripravljenim slotom |
| Obrazec | **Resend API** prek Vercel route handlerja, z mailto fallbackom dokler kljuca ni |

## Funkcionalnosti prek statike
- Kontaktni obrazec -> `POST /api/enquiry` -> Resend -> `info@andara.si`
- Vse ostalo je staticno

## [PREDPOSTAVKA] - zapolnjeno brez potrditve
- `[PREDPOSTAVKA]` Odzivni cas "within 24 hours" na strani. Ce stranka tega ne drzi, se
  zamenja z "within 2 working days".
- `[PREDPOSTAVKA]` "2-8 people" kot velikost skupine. Stara stran velikosti ni navajala,
  self-guided pa pomeni, da je skupina kupceva lastna. Preveriti pri stranki.
- `[PREDPOSTAVKA]` Sezona maj-september - vzeto iz obstojecega FAQ ("best time ... May to
  September"), tam je bilo mišljeno kot nasvet, tu je uporabljeno kot razpolozljivost ture.
- `[PREDPOSTAVKA]` "Book at least 6 months ahead" - iz obstojecega FAQ, uporabljeno kot
  urgency signal na strani.

## Kaj se manjka in blokira polno produkcijo
1. Cena (vsaj razpon) - najvecji manjkajoci konverzijski element
2. Fotki Anje in Darje
3. `RESEND_API_KEY` v Vercel env
4. Telefonska stevilka, ce jo hocejo objaviti
5. Pravi Facebook URL ali potrditev, da ga ni
