"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import { getClickEvent, GA_MEASUREMENT_ID } from "@/lib/site";

type Consent = "granted" | "denied";

const STORAGE_KEY = "analytics-consent";
const REOPEN_EVENT = "analytics-consent-reopen";

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

export const reopenConsent = () => window.dispatchEvent(new Event(REOPEN_EVENT));

// GA4 ne se charge qu'après consentement explicite (CNIL). Désactivé tant que GA_MEASUREMENT_ID est vide.
const Analytics = () => {
  const [consent, setConsent] = useState<Consent | null>(null);
  const [isAsking, setIsAsking] = useState(false);

  // Lecture du localStorage après hydratation : impossible côté serveur
  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved === "granted" || saved === "denied") setConsent(saved);
    else setIsAsking(true);

    const reopen = () => setIsAsking(true);
    window.addEventListener(REOPEN_EVENT, reopen);
    return () => window.removeEventListener(REOPEN_EVENT, reopen);
  }, []);
  /* eslint-enable react-hooks/set-state-in-effect */

  useEffect(() => {
    if (consent !== "granted") return;
    const onClick = (event: MouseEvent) => {
      const link = (event.target as Element).closest("a");
      const name = link ? getClickEvent(link.getAttribute("href") ?? "") : null;
      if (name && window.gtag) window.gtag("event", name);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [consent]);

  if (!GA_MEASUREMENT_ID) return null;

  const choose = (value: Consent) => {
    window.localStorage.setItem(STORAGE_KEY, value);
    setConsent(value);
    setIsAsking(false);
  };

  return (
    <>
      {consent === "granted" && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`} strategy="afterInteractive" />
          <Script id="ga4-init" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('js',new Date());gtag('config','${GA_MEASUREMENT_ID}',{anonymize_ip:true});`}
          </Script>
        </>
      )}
      {isAsking && (
        <div
          role="dialog"
          aria-label="Mesure d’audience"
          className="fixed inset-x-0 bottom-0 z-50 border-t border-line-dark bg-coal p-4 text-ivory sm:left-auto sm:max-w-md sm:rounded-tl-lg"
        >
          <p className="text-sm text-smoke">
            Nous mesurons l’audience du site avec Google Analytics, uniquement si vous l’acceptez.
            Aucune mesure n’est faite sans votre accord.
          </p>
          <div className="mt-3 flex gap-3">
            <button type="button" onClick={() => choose("denied")} className="cursor-pointer rounded border border-line-dark px-4 py-2 text-sm hover:bg-black">
              Refuser
            </button>
            <button type="button" onClick={() => choose("granted")} className="btn-primary cursor-pointer px-4 py-2 text-sm">
              Accepter
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Analytics;
