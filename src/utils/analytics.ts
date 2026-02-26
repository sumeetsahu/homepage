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

/**
 * Track a CTA/link click with a distinct event name for GA4 (e.g. get_in_touch, linkedin_click).
 * Each action gets its own event in Reports → Engagement → Events; use link_location to segment by placement.
 */
export function trackClick(
  eventName: string,
  options?: { url?: string; location?: string }
): void {
  trackEvent(eventName, {
    event_category: 'engagement',
    event_label: eventName,
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

const DEFAULT_SCROLL_THRESHOLDS = [25, 50, 75, 100];
let scrollDepthSent: Set<number> | null = null;

/** Send a scroll_depth event for GA4 (how far down the page the user scrolled). */
export function trackScrollDepth(percent: number): void {
  trackEvent('scroll_depth', {
    event_category: 'engagement',
    event_label: `${percent}`,
    depth_percent: percent,
  });
}

/**
 * Start listening for scroll and fire one scroll_depth event per threshold (e.g. 25, 50, 75, 100)
 * when the user first reaches that depth.
 *
 * Call once after the page is mounted (e.g. in a useEffect).
 * Returns a cleanup function — call it in the useEffect return to remove the listener.
 */
export function initScrollDepthTracking(thresholds: number[] = DEFAULT_SCROLL_THRESHOLDS): () => void {
  if (typeof document === 'undefined' || typeof window === 'undefined' || !isAnalyticsEnabled()) {
    return () => {};
  }
  scrollDepthSent = new Set();

  let ticking = false;
  let maxDepth = 0;

  function checkScroll(): void {
    const doc = document.documentElement;
    const scrollTop = doc.scrollTop || window.scrollY;
    const clientHeight = doc.clientHeight;
    const scrollHeight = doc.scrollHeight;
    if (scrollHeight <= 0) return;
    const depthPercent = Math.round(((scrollTop + clientHeight) / scrollHeight) * 100);
    maxDepth = Math.max(maxDepth, Math.min(depthPercent, 100));

    for (const threshold of thresholds) {
      if (maxDepth >= threshold && !scrollDepthSent!.has(threshold)) {
        scrollDepthSent!.add(threshold);
        trackScrollDepth(threshold);
      }
    }
    ticking = false;
  }

  function onScroll(): void {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(checkScroll);
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  // Check once on load in case the page is short or already scrolled
  requestAnimationFrame(checkScroll);

  return () => {
    window.removeEventListener('scroll', onScroll);
    scrollDepthSent = null;
  };
}

let sectionViewSent: Set<string> | null = null;

/** Send a section_view event when a section enters the viewport (for "which sections were seen"). */
export function trackSectionView(sectionId: string): void {
  trackEvent('section_view', {
    event_category: 'engagement',
    event_label: sectionId,
    section_id: sectionId,
  });
}

/**
 * Observe sections with data-analytics-section and fire section_view once when they become visible.
 *
 * Call once after mount (e.g. in a useEffect).
 * Returns a cleanup function — call it in the useEffect return to disconnect the observer.
 * Sections: philosophy, experience, achievements, patents, early_initiatives, education, skills, contact, footer.
 */
export function initSectionViewTracking(): () => void {
  if (typeof document === 'undefined' || typeof window === 'undefined' || !isAnalyticsEnabled()) {
    return () => {};
  }
  sectionViewSent = new Set();

  const elements = document.querySelectorAll<HTMLElement>('[data-analytics-section]');
  if (elements.length === 0) return () => {};

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const id = (entry.target as HTMLElement).getAttribute('data-analytics-section');
        if (id && !sectionViewSent!.has(id)) {
          sectionViewSent!.add(id);
          trackSectionView(id);
        }
      }
    },
    { rootMargin: '0px', threshold: 0.2 }
  );

  elements.forEach((el) => observer.observe(el));

  return () => {
    observer.disconnect();
    sectionViewSent = null;
  };
}
