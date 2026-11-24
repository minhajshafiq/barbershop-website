"use client";

import { GA_MEASUREMENT_ID } from "@/lib/site";
import { reopenConsent } from "./Analytics";

// Permet de modifier son choix de consentement à tout moment (CNIL)
const CookieSettings = () => {
  if (!GA_MEASUREMENT_ID) return null;
  return (
    <button type="button" onClick={reopenConsent} className="cursor-pointer transition-colors hover:text-ivory">
      Gérer les cookies
    </button>
  );
};

export default CookieSettings;
