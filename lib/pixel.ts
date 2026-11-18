// Meta-pixeln. Laddas först när besökaren har godkänt marknadsföringskakor i kakbannern.
import { site } from "@/content/site";

type Fbq = ((...args: unknown[]) => void) & { callMethod?: (...a: unknown[]) => void; queue: unknown[]; loaded: boolean; version: string; push: unknown };

declare global {
  interface Window { fbq?: Fbq; _fbq?: Fbq }
}

export const CONSENT_KEY = "lpb-cookies";
export const CONSENT_EVENT = "lpb-consent";

export function getConsent(): "yes" | "no" | null {
  try {
    const v = localStorage.getItem(CONSENT_KEY);
    return v === "yes" || v === "no" ? v : null;
  } catch {
    return null;
  }
}

export function setConsent(v: "yes" | "no") {
  try { localStorage.setItem(CONSENT_KEY, v); } catch {}
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: v }));
}

// Lägger in Metas standardkod en gång. Returnerar false utan samtycke.
export function loadPixel(): boolean {
  if (typeof window === "undefined" || !site.metaPixelId || getConsent() !== "yes") return false;
  if (window.fbq) return true;
  const n = function (...args: unknown[]) {
    if (n.callMethod) n.callMethod(...args);
    else n.queue.push(args);
  } as Fbq;
  n.push = n;
  n.loaded = true;
  n.version = "2.0";
  n.queue = [];
  window.fbq = n;
  window._fbq = n;
  const s = document.createElement("script");
  s.async = true;
  s.src = "https://connect.facebook.net/en_US/fbevents.js";
  document.head.appendChild(s);
  n("init", site.metaPixelId);
  return true;
}

export function track(event: string, params?: Record<string, unknown>, eventId?: string): boolean {
  if (!loadPixel()) return false;
  window.fbq!("track", event, params ?? {}, eventId ? { eventID: eventId } : undefined);
  return true;
}
