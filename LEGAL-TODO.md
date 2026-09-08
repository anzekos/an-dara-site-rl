# Kaj mora Andara še dati, preden gre stran v produkcijo

Vsa pravna besedila so napisana in vgrajena. Manjkajo samo podatki, ki jih ni
mogoče uganiti. Nikjer ni izmišljenega imena podjetja, matične številke ali
naslova: dokler polje ni izpolnjeno, se na strani izriše rdečkasta oznaka
`[ ... ]`, tako da nihče ne more spregledati, da manjka.

Vse na enem mestu: **`lib/legal.ts`**, objekt `company`. Zamenjaj `TODO` z
vrednostjo in oznaka izgine sama, na vseh treh pravnih straneh in v nogi hkrati.

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

V `app/terms/page.tsx`, razdelka 05 in 06, so tri prazna mesta. Napišeta jih
Anja in Darja, ker so poslovna odločitev:

- **Ara**: koliko odstotkov ali koliko evrov, in kdaj zapade
- **Doplačilo**: koliko dni pred odhodom zapade preostanek
- **Načini plačila**: nakazilo, kartica, kaj od tega
- **Odpovedna lestvica**: koliko se zaračuna pri odpovedi več kot 60 dni prej,
  30–60 dni, 15–29 dni, manj kot 15 dni

Vpiši jih neposredno v `app/terms/page.tsx` na mesto, kjer stoji `<Fill value={""} ... />`
oziroma `<Blank>`.

---

## 4. Kar je treba nastaviti izven kode

- **Google Analytics, hramba podatkov.** V GA4 pod *Admin → Data Settings →
  Data Retention* nastavi na **14 mesecev**. Politika zasebnosti to trdi, zato
  mora tako tudi biti.
- **Pogodba o obdelavi (DPA) z Resendom.** Podpiši jo v Resendovem računu,
  sicer prenos v ZDA nima podlage, ki jo navaja politika.
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
