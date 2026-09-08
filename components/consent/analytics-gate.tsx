"use client"

import Script from "next/script"
import { Analytics as VercelAnalytics } from "@vercel/analytics/next"
import { useConsent } from "./consent-provider"

const GA_ID = "G-E46C40SZKN"

/**
 * Nic od tega se ne prenese z Googlovih ali Vercelovih streznikov,
 * dokler obiskovalec ne dovoli analitike. Consent Mode v2 privzeto
 * stanje ("denied") je postavljeno ze v <head>, ta komponenta ga samo
 * nadgradi in sele nato naloZi gtag.js.
 */
export function AnalyticsGate() {
  const { consent } = useConsent()
  const allowed = consent?.analytics === true

  return (
    <>
      {allowed && (
        <>
          <Script
            id="ga-src"
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            strategy="afterInteractive"
          />
          <Script id="ga-init" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];
function gtag(){dataLayer.push(arguments);}
gtag('js',new Date());
gtag('config','${GA_ID}',{anonymize_ip:true});`}
          </Script>
        </>
      )}

      {/*
        Vercel Analytics je brez piskotkov, a vseeno obdela IP. Da je izbira
        obiskovalca nedvoumna, tudi te skripte ne nalozimo brez privolitve.
        beforeSend sam ne zadostuje: filtrira dogodke, skripta pa se vseeno
        prenese, kar je ze zahtevek na tretjo osebo.
      */}
      {allowed && <VercelAnalytics />}
    </>
  )
}
