# Kaj mora Andara še dati, preden gre stran v produkcijo

Vsa pravna besedila so napisana in vgrajena. Manjkajo samo podatki, ki jih ni
mogoče uganiti. Nikjer ni izmišljenega imena podjetja, matične številke ali
naslova.

Vse na enem mestu: **`lib/legal.ts`**, objekt `company`. Zamenjaj `TODO` z
vrednostjo in podatek se pojavi na vseh treh pravnih straneh in v nogi hkrati.

**Kako se manjkajoč podatek obnaša.** Ker je stran že v produkciji, se
neizpolnjeno polje tiho izpusti: vrstica izpade skupaj z ločili, da obiskovalec
ne vidi oglatih oklepajev. Med urejanjem besedil nastavi `showBlanks = true` v
`lib/legal.ts` in vsa manjkajoča polja se spet izrišejo kot vidne oznake
`[ ... ]`. Ne pozabi nazaj na `false` pred objavo.

> Skrita oznaka **ne** pomeni, da je stvar urejena. Dokler polja niso
> izpolnjena, stran ne izpolnjuje 6. člena ZEPT in 45. člena ZGD-1.

---

## 1. Obvezno, sicer stran krši zakon

Te podatke zahtevata 6. člen ZEPT in 45. člen ZGD-1. Brez njih spletna stran
podjetja v Sloveniji ne sme delovati, ne glede na to, kaj prodaja.

| Polje v `lib/legal.ts` | Kaj je to |
|---|---|
| `legalName` | Polno registrirano ime, npr. `Andara d.o.o.` ali `Ime Priimek s.p.` |
| `street` | Ulica in hišna številka sedeža |
| `city` | Poštna številka in kraj |
| `registrationNumber` | Matična številka iz PRS |
| `vatNumber` | ID za DDV. Če nista zavezanki, napiši davčno številko in to pripiši |
| `register` | Register in organ vpisa, npr. `Poslovni register Slovenije, AJPES` |
| `representative` | Zakoniti zastopnik oz. nosilka dejavnosti |
| `phone` | Telefon. Če ga nočeta objaviti, pusti `TODO` in ostane samo e-pošta |

---

## 2. Obvezno, ker gre za turistični paket

Teden vsebuje nastanitev, polpenzion in prevoze. To je po Direktivi (EU)
2015/2302 **turistični paket**, ne zgolj svetovanje. Iz tega sledita dve
zahtevi, ki nista stvar oblikovanja strani in ju ne morem rešiti s kodo:

| Polje | Kaj je to |
|---|---|
| `travelLicence` | Dovoljenje za organiziranje turističnih paketov po ZSRT-1 |
| `insolvencyProtection` | Ime in kontakt izdajatelja jamstva za primer insolventnosti |

Jamstvo za insolventnost je **zakonska obveznost organizatorja paketa**, ne
priporočilo. Če ga Andara še nima, je to treba urediti pred prvim plačilom
stranke, sicer trženje paketa ni zakonito. Če se izkaže, da paketov po ZSRT-1
ne organizirata (npr. ker samo posredujeta ločene storitve), mi to sporoči in
4. razdelek pogojev prepišem v pravo obliko.

---

## 3. Manjkajo številke v pogojih poslovanja

Razdelka 05 in 06 v `app/terms/page.tsx` zdaj pišeta, da so ara, rok doplačila,
načini plačila in odpovedna lestvica navedeni v pisni ponudbi in potrditvi. To
je pravno vzdržno in na produkciji ne pušča praznih mest, **je pa treba
poskrbeti, da v ponudbi res so**.

Ko se Anja in Darja odločita za fiksne pogoje, jih je bolje napisati kar na
strani. Napisati je treba:

- **Ara**: koliko odstotkov ali koliko evrov, in kdaj zapade
- **Doplačilo**: koliko dni pred odhodom zapade preostanek
- **Načini plačila**: nakazilo, kartica, kaj od tega
- **Odpovedna lestvica**: koliko se zaračuna pri odpovedi več kot 60 dni prej,
  30–60 dni, 15–29 dni, manj kot 15 dni

---

## 3b. Obrazec — kako je speljan in kaj ga podre

Preverjeno na produkciji 8. 9. 2026, v pravem brskalniku: oddaja vrne HTTP 200
in `success: true`, obiskovalec dobi zahvalo. **Dela.**

Pot je Web3Forms, klican **neposredno iz brskalnika**. Ključ je v
`lib/site.ts` in je pri tej storitvi javen po zasnovi, ker konča v brskalniku
tako ali tako. Zamenjaš ga na web3forms.com pod Access Keys.

Tri stvari, ki so bile izmerjene in ki obrazec takoj podrejo, če jih kdo
"popravi" nazaj:

1. **Ne kliči Web3Forms s strežnika.** Brezplačni plan vrne 403 z
   `Use our API in client side ... Pro plan is required`. Zato oddaja teče iz
   brskalnika in ne prek `/api/enquiry`.
2. **Ne nastavljaj `Content-Type: application/json`.** Njihov API ne odgovarja
   na CORS preflight: na `OPTIONS` vrne 403 brez `Access-Control-Allow-Origin`,
   zato oddaja umre z `Failed to fetch`. Telo mora biti `URLSearchParams`, brez
   ročno nastavljenih glav, da brskalnik izbere safelistan
   `application/x-www-form-urlencoded` in preflighta sploh ni.
3. **Headless brskalnik ne more testirati te oddaje.** Web3Forms je za
   Cloudflarom, ki headless Chromu vrne izziv "Just a moment". Test mora teči
   `headless: false`, sicer dobiš lažni alarm.

`/api/enquiry` ostaja kot rezervna pot prek Resenda. Če jo hočeš uporabiti,
nastavi `RESEND_API_KEY` in `ENQUIRY_FROM` na potrjeni domeni ter izprazni
`web3formsKey` v `lib/site.ts`.

Ročna kontrola kadarkoli:

```bash
curl -s -X POST https://api.web3forms.com/submit   -H "Origin: https://www.andara.si"   -H "User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/140.0"   -H "Content-Type: application/x-www-form-urlencoded"   --data-urlencode "access_key=<kljuc>"   --data-urlencode "subject=test" --data-urlencode "Message=test"
```

---

## 4. Kar je treba nastaviti izven kode

- **Google Analytics, hramba podatkov.** V GA4 pod *Admin → Data Settings →
  Data Retention* nastavi na **14 mesecev**. Politika zasebnosti to trdi, zato
  mora tako tudi biti.
- **Pogodba o obdelavi (DPA) z Web3Forms.** Sprejmi jo v računu Web3Forms
  (web3forms.com/dpa). Politika zasebnosti se sklicuje nanjo kot na podlago za
  prenos v ZDA in Indijo, in navaja, da hranijo oddaje do 3 leta. Preveri, da
  to drži za tvoj plan. Enako za Resend, če ga uporabiš kot rezervo.
- **Hramba oddaj v Web3Forms.** Če jih ne rabiš, jih redno brisi. Politika
  zasebnosti obljublja brisanje povpraševanj po 12 mesecih, Web3Forms pa jih
  sam hrani do 3 leta.
- **Dvofaktorska prijava v info@andara.si.** Politika zasebnosti trdi, da je
  vklopljena. Preveri, da res je.
- **Objavljena verzija besedil.** Ko so polja izpolnjena, popravi `legalUpdated`
  v `lib/legal.ts` na datum objave.

---

## 5. Kar sem naredil, da lahko preveriš

```bash
npm run build && npx next start -p 4321   # v enem oknu
node qa-legal.mjs http://localhost:4321   # 142 preverjanj
node qa-a11y-perf.mjs http://localhost:4321  # axe-core + Core Web Vitals
```

Obe skripti se morata končati z `VSE OK`. Če dodaš novo zunanjo storitev
(vtičnik, pisavo, piksel, vgrajen zemljevid), jo je treba dopisati v:

1. `lib/legal.ts` → `processors` in po potrebi `cookieRows`
2. `next.config.mjs` → ustrezna direktiva v `csp`

Sicer jo bo CSP tiho blokiral, `qa-legal.mjs` pa bo javil kršitev.

---

## 6. Kaj ni pravno preverjeno

Besedila so napisana po GDPR, ePrivacy, ZEPT, ZGD-1 in Direktivi 2015/2302 in
pokrivajo, kar ta stran dejansko počne. **Nisem odvetnik.** Pogoji poslovanja
za organizatorja turističnih paketov so področje, kjer se splača plačati eno uro
pravnika, predvsem razdelka 06 (odpovedi) in 08 (odgovornost). Politika
zasebnosti in politika piškotkov sta bistveno bolj mehanski in tveganje tam je
majhno.
