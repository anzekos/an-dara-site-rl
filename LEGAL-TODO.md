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

## 3b. Obrazec trenutno NE dostavlja

Preverjeno na produkciji 8. 9. 2026: `POST /api/enquiry` vrne
`{"ok":false,"fallback":"mailto"}`. To pomeni, da na Vercelovem projektu
**andara-site** (tistem z domeno www.andara.si) ni nastavljena nobena pot za
posiljanje. Obiskovalcu se odpre predizpolnjen e-postni osnutek, ki ga mora
poslati sam. Marsikdo tega ne stori in povprasevanje izgine.

Popravek je ena spremenljivka okolja:

1. Vercel → projekt **andara-site** → Settings → Environment Variables
2. Dodaj `WEB3FORMS_ACCESS_KEY` = dostopni kljuc iz Web3Forms
3. Environment: Production (in Preview, ce zelis)
4. Redeploy

Koda podpira obe poti: ce je nastavljen `WEB3FORMS_ACCESS_KEY`, gre prek
Web3Forms; ce ne, poskusi `RESEND_API_KEY`; ce ni nobenega, pade na mailto.
Klic gre s streznika, zato kljuc ni v HTML in Web3Forms ne vidi
obiskovalcevega IP-ja.

Ko je nastavljeno, preveri z:

```bash
curl -s -X POST https://www.andara.si/api/enquiry   -H "content-type: application/json"   -d '{"name":"TEST","email":"tvoj@email.si","privacyAck":true}'
```

`{"ok":true}` pomeni, da dela.

---

## 4. Kar je treba nastaviti izven kode

- **Google Analytics, hramba podatkov.** V GA4 pod *Admin → Data Settings →
  Data Retention* nastavi na **14 mesecev**. Politika zasebnosti to trdi, zato
  mora tako tudi biti.
- **Pogodba o obdelavi (DPA) z Web3Forms.** Sprejmi jo v računu Web3Forms
  (web3forms.com/dpa). Politika zasebnosti se sklicuje nanjo kot na podlago za
  prenos v ZDA in Indijo. Enako za Resend, če ga uporabiš kot rezervo.
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
