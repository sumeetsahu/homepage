/**
 * Google Analytics (GA4) utility.
 * - Tracks page views and custom events (clicks, outbound links, etc.).
 * - No-op when VITE_GA_MEASUREMENT_ID is unset (dev/local builds).
 */

declare global {
  interface Window {
    gtag?: (
      command: 'config' | 'event' | 'js',
      targetId: string,
      params?: Record<string, unknown>
    ) => void;
    dataLayer?: unknown[];
  }
}

const MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID as string | undefined;

export function isAnalyticsEnabled(): boolean {
  return Boolean(typeof window !== 'undefined' && MEASUREMENT_ID);
}

/** Send a page view (call after route/section change if you add routing later). */
export function trackPageView(path: string, title?: string): void {
  if (!isAnalyticsEnabled() || !window.gtag) return;
  window.gtag('config', MEASUREMENT_ID!, {
    page_path: path,
    page_title: title ?? document.title,
  });
}

/** Track a custom event (e.g. button_click, link_click). */
export function trackEvent(
  eventName: string,
  params?: {
    event_category?: string;
    event_label?: string;
    link_url?: string;
    link_text?: string;
    link_location?: string;
    [key: string]: string | number | boolean | undefined;
  }
): void {
  if (!isAnalyticsEnabled() || !window.gtag) return;
  window.gtag('event', eventName, params as Record<string, unknown>);
}

/** Convenience: track CTA/link click (so you can see which buttons/links get used or "blocked" via absence of events). */
export function trackClick(
  label: string,
  options?: { url?: string; location?: string }
): void {
  trackEvent('click', {
    event_category: 'engagement',
    event_label: label,
    link_url: options?.url,
    link_location: options?.location,
  });
}

/** Track resume download. Use this when the user clicks the resume link so you can see "resume_download" in GA4. */
export function trackResumeDownload(url?: string): void {
  trackEvent('resume_download', {
    event_category: 'engagement',
    event_label: 'resume',
    link_url: url,
  });
}
