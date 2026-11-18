"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { CONSENT_EVENT, getConsent, setConsent, track } from "@/lib/pixel";

// Kakbanner + sidvisningar till Meta-pixeln. Inget laddas från Meta innan besökaren sagt ja.
export default function MetaPixel() {
  const pathname = usePathname();
  const [consent, setState] = useState<"yes" | "no" | null | "unknown">("unknown");

  useEffect(() => {
    setState(getConsent());
    const onChange = (e: Event) => setState((e as CustomEvent).detail ?? getConsent());
    const onOpen = () => setState(null);
    window.addEventListener(CONSENT_EVENT, onChange);
    window.addEventListener("lpb-open-cookies", onOpen);
    return () => {
      window.removeEventListener(CONSENT_EVENT, onChange);
      window.removeEventListener("lpb-open-cookies", onOpen);
    };
  }, []);

  useEffect(() => {
    if (consent === "yes") track("PageView");
  }, [pathname, consent]);

  if (consent !== null || pathname.startsWith("/admin") || pathname.startsWith("/presenter")) return null;

  return (
    <div className="cookie-banner" role="dialog" aria-label="Kakor">
      <p>
        Vi vill använda kakor från Meta för att se vilka av våra annonser på Facebook och Instagram som leder till besök och
        beställningar. Godkänner du det? <Link href="/villkor#kakor">Läs mer</Link>
      </p>
      <div className="cookie-actions">
        <button type="button" className="btn btn-small btn-line" onClick={() => setConsent("no")}>Bara nödvändiga</button>
        <button type="button" className="btn btn-small btn-wine" onClick={() => setConsent("yes")}>Godkänn</button>
      </div>
    </div>
  );
}

export function CookieSettingsLink() {
  return (
    <button type="button" className="link-button" onClick={() => window.dispatchEvent(new Event("lpb-open-cookies"))}>
      Kakor
    </button>
  );
}
