import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'
import fs from 'node:fs'
// Reuse the shared year-calculation utility (no browser APIs — safe in Node context)
import { getYearsOfExperience } from './src/utils/profile'

// ---------------------------------------------------------------------------
// HTML escape helper — used for attribute values and inline script content
// ---------------------------------------------------------------------------
function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

// ---------------------------------------------------------------------------
// Safely serialize an object for <script type="application/ld+json">.
// Escapes characters that could confuse HTML parsers (<, >, &, /).
// ---------------------------------------------------------------------------
function safeJsonLd(obj: unknown): string {
  return JSON.stringify(obj, null, 2)
    .replace(/</g, '\\u003c')
    .replace(/>/g, '\\u003e')
    .replace(/&/g, '\\u0026')
    .replace(/\//g, '\\u002f')
}

// ---------------------------------------------------------------------------
// Injects profile.json into index.html placeholders at build time.
// Also adds Open Graph, Twitter Card meta tags, and JSON-LD Person schema.
// ---------------------------------------------------------------------------
function injectProfileHtml(): import('vite').Plugin {
  return {
    name: 'inject-profile-html',
    transformIndexHtml: {
      order: 'pre' as const,
      handler(html: string) {
        const root = process.cwd()
        const profilePath = path.join(root, 'src', 'data', 'profile.json')
        if (!fs.existsSync(profilePath)) return html
        const profile = JSON.parse(fs.readFileSync(profilePath, 'utf8'))

        const title = `${profile.name} - ${profile.title}`
        const author = profile.name
        const years = profile.careerStartDate
          ? getYearsOfExperience(profile.careerStartDate)
          : null
        const rawMeta = profile.metaDescription ?? profile.summary ?? ''
        const metaDescription =
          years !== null && rawMeta.includes('{{years}}')
            ? rawMeta.replace(/\{\{years\}\}/g, String(years))
            : rawMeta
        const website = profile.website ?? ''

        // Replace existing placeholders
        let result = html
          .replace(/\{\{SITE_TITLE\}\}/g, escapeHtml(title))
          .replace(/\{\{SITE_AUTHOR\}\}/g, escapeHtml(author))
          .replace(/\{\{SITE_META_DESCRIPTION\}\}/g, escapeHtml(metaDescription))

        // Inject Open Graph + Twitter Card meta tags before </head>
        const ogTags = [
          `<meta property="og:type" content="website" />`,
          `<meta property="og:title" content="${escapeHtml(title)}" />`,
          `<meta property="og:description" content="${escapeHtml(metaDescription)}" />`,
          `<meta property="og:url" content="${escapeHtml(website)}" />`,
          `<meta property="og:site_name" content="${escapeHtml(profile.name)}" />`,
          `<meta name="twitter:card" content="summary" />`,
          `<meta name="twitter:title" content="${escapeHtml(title)}" />`,
          `<meta name="twitter:description" content="${escapeHtml(metaDescription)}" />`,
        ].join('\n    ')

        // Inject JSON-LD Person schema
        const sameAs: string[] = Object.values(profile.socials ?? {}).filter(Boolean) as string[]
        const jsonLdObject = {
          '@context': 'https://schema.org',
          '@type': 'Person',
          name: profile.name,
          jobTitle: profile.title,
          description: metaDescription,
          url: website,
          ...(profile.email ? { email: profile.email } : {}),
          ...(sameAs.length > 0 ? { sameAs } : {}),
          ...(profile.location
            ? {
                address: {
                  '@type': 'PostalAddress',
                  addressLocality: profile.location,
                },
              }
            : {}),
        }
        const jsonLdScript = `<script type="application/ld+json">\n    ${safeJsonLd(jsonLdObject)}\n    </script>`

        return result.replace(
          '</head>',
          `    ${ogTags}\n    ${jsonLdScript}\n  </head>`
        )
      },
    },
  }
}

// ---------------------------------------------------------------------------
// Injects Google Analytics (GA4) when VITE_GA_MEASUREMENT_ID is set
// ---------------------------------------------------------------------------
function injectGoogleAnalytics(): import('vite').Plugin {
  return {
    name: 'inject-google-analytics',
    transformIndexHtml: {
      order: 'post' as const,
      handler(html: string) {
        const id = process.env.VITE_GA_MEASUREMENT_ID
        if (!id || id.trim() === '') return html
        const snippet = `
    <!-- Google Analytics (GA4) -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=${escapeHtml(id)}"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${escapeHtml(id)}', { send_page_view: true });
    </script>`
        return html.replace('</head>', `${snippet}\n  </head>`)
      },
    },
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [injectProfileHtml(), injectGoogleAnalytics(), react()],
  base: '/',
})
