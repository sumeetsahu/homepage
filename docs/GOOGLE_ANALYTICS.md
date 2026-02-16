# Google Analytics (GA4) Setup & Reference

This document describes how Google Analytics is integrated into the profile site and how to set it up for local development and production. Use it as a reference when enabling analytics or adding new tracked events.

---

## Overview

- **What’s used:** Google Analytics 4 (GA4) with the global site tag (`gtag.js`).
- **Purpose:** Track traffic (page views) and how visitors interact with buttons and links.
- **Behavior:** Analytics runs only when the environment variable `VITE_GA_MEASUREMENT_ID` is set. If it’s unset (e.g. local dev without `.env`), no GA script is loaded and all tracking calls are no-ops.

---

## Step 1: Get Your GA4 Measurement ID

1. Go to [Google Analytics](https://analytics.google.com/).
2. Create or select a **GA4 property** (not Universal Analytics).
3. Add a **Web** data stream for your site (e.g. your homepage URL).
4. Copy the **Measurement ID** (format: `G-XXXXXXXXXX`).

You’ll use this ID in the steps below.

---

## Step 2: Local / Development

1. In the **project root**, create a file named `.env` (it is gitignored).
2. Add one line:
   ```bash
   VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
   ```
   Replace `G-XXXXXXXXXX` with your actual Measurement ID.
3. Restart the dev server (`npm run dev`) so Vite picks up the variable.
4. Optional: Use `.env.example` as a template (it only documents the variable; copy to `.env` and fill in the value).

Analytics will load in development when this variable is set. Leave `.env` missing or leave the variable empty to keep analytics off locally.

---

## Step 3: Production (e.g. GitHub Pages)

To enable GA on the deployed site (built by GitHub Actions):

1. In your GitHub repo go to **Settings** → **Secrets and variables** → **Actions**.
2. Click **New repository secret**.
3. Name: `VITE_GA_MEASUREMENT_ID`
4. Value: your Measurement ID (e.g. `G-XXXXXXXXXX`).
5. Save.

The workflow in `.github/workflows/gh-pages.yml` already passes this secret into the build step:

```yaml
- name: Build
  run: npm run build
  env:
    VITE_GA_MEASUREMENT_ID: ${{ secrets.VITE_GA_MEASUREMENT_ID }}
```

After the next successful deploy, the live site will send data to GA4. If the secret is not set, the build still succeeds; GA simply won’t be included.

---

## Step 4: Verify in GA4

1. In GA4, open **Reports** → **Realtime** and visit your site (with GA enabled). You should see an active user.
2. Use **Reports** → **Engagement** → **Events** to see `page_view` and `click` (and any custom event names like `experience_tab`).
3. Use **Explore** to build reports filtered by `event_label` or `link_location` to see which buttons/links are used most.

Data can take a few minutes to appear in standard reports; Realtime is immediate.

### How to see resume downloads

Each time someone clicks the Resume button we send a dedicated event **`resume_download`**. To see how many people have (clicked to) download your resume:

1. In GA4 go to **Reports** → **Engagement** → **Events**.
2. Find the event **`resume_download`** in the table. The **Event count** is the number of times the resume link was clicked (which in most setups leads to a download).
3. Optional: In **Explore**, create a report with **Event name** = `resume_download` to see trends over time or by date.

Note: We track the *click* on the Resume link. Browsers may open the PDF in a new tab instead of downloading; in both cases the event is sent. Users with ad blockers may not be counted.

### How to see scroll depth

We send a **`scroll_depth`** event when the user first reaches 25%, 50%, 75%, and 100% of the page (by scroll position). In GA4:

1. **Reports** → **Engagement** → **Events** → find **`scroll_depth`**. The **Event count** is the total number of threshold crossings (e.g. 4 per user if they scroll to the bottom).
2. To see *how far* people scroll: in **Explore**, add **Event name** = `scroll_depth` and use the parameter **`depth_percent`** (or **Event label**) as a dimension. You’ll see how many users reached 25%, 50%, 75%, or 100%.
3. To approximate “read-through rate”: compare the number of users who triggered `scroll_depth` with label `100` to the number of `page_view` users.

### How to see which sections were viewed

We send a **`section_view`** event the first time each section (Philosophy, Experience, Achievements, Patents, etc.) enters the viewport (20% visible). In GA4:

1. **Reports** → **Engagement** → **Events** → find **`section_view`**.
2. In **Explore**, use **Event name** = `section_view` and **Event label** (or **section_id**) as dimension to see how many users saw each section (e.g. philosophy vs contact). Helps answer “did people scroll to Patents?” or “how many reached Contact?”.

---

## What Is Tracked Automatically

### Page views

- **When:** On first load of the site.
- **Sent as:** GA4 default page view (path and title). Also triggered explicitly from `main.tsx` for the initial route.

### Engagement events (distinct names per action)

Each action sends its **own event name** in GA4 so you see e.g. `get_in_touch`, `linkedin_click`, `email_click` as separate rows in Reports → Engagement → Events. Use the `link_location` parameter to segment by placement (header, contact, footer).

| Event name        | Location(s)   | Notes                                      |
|-------------------|---------------|--------------------------------------------|
| `get_in_touch`    | header        | “Get in Touch” → #contact                   |
| `resume_download` | header        | Resume link                                 |
| `linkedin_click`  | header, contact, footer | LinkedIn links                      |
| `github_click`    | header, contact, footer | GitHub links                        |
| `email_click`     | contact       | Email (mailto)                              |
| `facebook_click`   | footer        | Footer Facebook                             |
| `experience_tab`  | experience    | Tab switch (event_label: featured / all / enterprise) |
| `patents_link`   | patents       | “Google Patents” link                       |
| `scroll_depth`   | (automatic)   | Fired at 25%, 50%, 75%, 100% scroll (event_label / depth_percent = threshold) |
| `section_view`   | (automatic)   | Fired when a section is first visible (event_label / section_id: philosophy, experience, achievements, patents, early_initiatives, education, skills, contact, footer) |

If a button or link has very few or no events, visitors may be skipping it or ad-blockers may be blocking the GA script (see “Limitations” below).

---

## Code Reference

- **Utility:** `src/utils/analytics.ts`  
  - `isAnalyticsEnabled()` – whether GA is configured.  
  - `trackPageView(path, title?)` – send a page view.  
  - `trackEvent(name, params?)` – send a custom event.  
  - `trackClick(eventName, { url?, location? })` – send an event with the given name (e.g. `get_in_touch`, `linkedin_click`) and category “engagement”.  
  - `trackResumeDownload(url?)` – send a `resume_download` event (used for the Resume button).
  - `trackScrollDepth(percent)` – send a `scroll_depth` event (used by init).
  - `initScrollDepthTracking(thresholds?)` – start scroll listener; fires one `scroll_depth` per threshold (default 25, 50, 75, 100). Called once from `App.tsx` on mount.
  - `trackSectionView(sectionId)` – send a `section_view` event (used by init).
  - `initSectionViewTracking()` – observe `[data-analytics-section]` sections; fire one `section_view` per section when 20% visible. Called once from `App.tsx` on mount.
- **GA script injection:** `vite.config.ts` – plugin `inject-google-analytics` injects the GA4 script into the built HTML only when `VITE_GA_MEASUREMENT_ID` is set at build time.
- **Initial page view:** `src/main.tsx` calls `trackPageView(...)` after the app mounts.
- **Scroll depth:** `App.tsx` runs `initScrollDepthTracking()` once on mount.
- **Section visibility:** `App.tsx` runs `initSectionViewTracking()` once on mount; sections use `data-analytics-section="..."` (see components).
- **Components:** Header, Contact, Footer, Experience, and Patents call `trackClick` or `trackEvent` on relevant user actions.

---

## Adding New Tracked Actions

1. **Link or button click:**  
   In the component, add an `onClick` that calls:
   ```ts
   import { trackClick } from '../utils/analytics';
   // ...
   onClick={() => trackClick('event_name', { location: 'section_name', url: optionalUrl })}
   ```
   Use a distinct event name (e.g. `get_in_touch`, `linkedin_click`, `patents_link`) so it appears as its own event in GA4.

2. **Custom event (e.g. tab, filter):**  
   Use `trackEvent` from `src/utils/analytics.ts`:
   ```ts
   trackEvent('event_name', { event_category: 'engagement', event_label: 'specific_action' });
   ```

3. **New section or page:**  
   If you add client-side routing later, call `trackPageView(path, title)` when the route changes.

After deploying, new events will show up in GA4 under **Engagement** → **Events** and in **Explore**.

---

## Limitations

- **Ad blockers:** Many users block `googletagmanager.com`. For them, no page views or events are sent. You cannot measure “blocked” users with client-side GA alone.
- **Privacy:** GA is subject to your privacy policy and any consent requirements (e.g. GDPR). Consider a cookie/consent banner if you need to comply with strict consent rules.
- **Single-page app:** The site is a single page; we send one page view on load. If you add routing, call `trackPageView` on route changes so GA reflects each “page.”

---

## Analytics coverage (what you have vs what’s optional)

### Implemented on the site

| What | How |
|------|-----|
| **Page views** | On load (path + title). |
| **CTA / link clicks** | Distinct events: get_in_touch, resume_download, linkedin_click, github_click, email_click, facebook_click, experience_tab, patents_link. |
| **Scroll depth** | One event per threshold (25%, 50%, 75%, 100%) when first reached. |
| **Section visibility** | One `section_view` per section when it first becomes visible (philosophy, experience, achievements, patents, early_initiatives, education, skills, contact, footer). |

### Provided by GA4 (no extra code)

- **Traffic source** (UTM, referrer, campaign) – from URL and referrer.
- **Device, browser, OS, country** – from user agent and IP.
- **Engagement time** – GA4 measures active time on the page.
- **New vs returning users** – from cookies.

You can turn on **Enhanced measurement** in GA4 (Admin → Data streams → your stream → Enhanced measurement) for extra automatic events (e.g. scrolls, outbound clicks); some overlap with the custom events above.

### Not implemented (and usually not needed)

- **Form submissions** – You use mailto and links; no forms to submit.
- **Video / audio plays** – Add if you embed media later.
- **File download completion** – We track the resume *click*; actual save isn’t detectable client-side.
- **Exit intent / before-unload** – Unreliable and often noisy; GA4 engagement time is usually enough.
- **Search** – No search on a single-page profile.

---

## Quick Checklist

- [ ] GA4 property created; Measurement ID copied (`G-XXXXXXXXXX`).
- [ ] Local: `.env` with `VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX` (optional).
- [ ] Production: GitHub secret `VITE_GA_MEASUREMENT_ID` set.
- [ ] Workflow build step has `env.VITE_GA_MEASUREMENT_ID` (already in `gh-pages.yml`).
- [ ] Deploy and verify in GA4 Realtime and Engagement → Events.

For a short summary in the main README, see the **Google Analytics (optional)** section in [README.md](../README.md).
