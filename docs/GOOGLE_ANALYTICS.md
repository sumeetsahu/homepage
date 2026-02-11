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

---

## What Is Tracked Automatically

### Page views

- **When:** On first load of the site.
- **Sent as:** GA4 default page view (path and title). Also triggered explicitly from `main.tsx` for the initial route.

### Clicks (engagement events)

All of these send a `click` event with `event_category: 'engagement'` and an `event_label` (and optional `link_url` / `link_location`) so you can see which CTAs are used.

| Location   | Event label (examples)     | Notes                          |
|-----------|----------------------------|---------------------------------|
| Header    | `header_get_in_touch`      | “Get in Touch” → #contact       |
| Header    | `header_resume_download`   | Resume download link           |
| Header    | `header_linkedin`          | LinkedIn link                  |
| Header    | `header_github`            | GitHub link                    |
| Contact   | `contact_email`            | Email (mailto)                 |
| Contact   | `contact_linkedin`        | LinkedIn card                  |
| Contact   | `contact_github`           | GitHub card                    |
| Footer    | `footer_linkedin`          | Footer LinkedIn                |
| Footer    | `footer_github`            | Footer GitHub                  |
| Footer    | `footer_facebook`          | Footer Facebook                |
| Experience| `experience_tab`          | Tab switches (label: featured / all / enterprise) |
| Patents   | `patents_google_patents`  | “Google Patents” link          |

If a button or link has very few or no events, visitors may be skipping it or ad-blockers may be blocking the GA script (see “Limitations” below).

---

## Code Reference

- **Utility:** `src/utils/analytics.ts`  
  - `isAnalyticsEnabled()` – whether GA is configured.  
  - `trackPageView(path, title?)` – send a page view.  
  - `trackEvent(name, params?)` – send a custom event.  
  - `trackClick(label, { url?, location? })` – send a click event with category “engagement”.
- **GA script injection:** `vite.config.ts` – plugin `inject-google-analytics` injects the GA4 script into the built HTML only when `VITE_GA_MEASUREMENT_ID` is set at build time.
- **Initial page view:** `src/main.tsx` calls `trackPageView(...)` after the app mounts.
- **Components:** Header, Contact, Footer, Experience, and Patents call `trackClick` or `trackEvent` on relevant user actions.

---

## Adding New Tracked Actions

1. **Link or button click:**  
   In the component, add an `onClick` that calls:
   ```ts
   import { trackClick } from '../utils/analytics';
   // ...
   onClick={() => trackClick('unique_label', { location: 'section_name', url: optionalUrl })}
   ```
   Use a short, consistent `event_label` (e.g. `pricing_cta`, `nav_contact`).

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

## Quick Checklist

- [ ] GA4 property created; Measurement ID copied (`G-XXXXXXXXXX`).
- [ ] Local: `.env` with `VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX` (optional).
- [ ] Production: GitHub secret `VITE_GA_MEASUREMENT_ID` set.
- [ ] Workflow build step has `env.VITE_GA_MEASUREMENT_ID` (already in `gh-pages.yml`).
- [ ] Deploy and verify in GA4 Realtime and Engagement → Events.

For a short summary in the main README, see the **Google Analytics (optional)** section in [README.md](../README.md).
