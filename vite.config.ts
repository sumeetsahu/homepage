import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'
import fs from 'node:fs'

// Injects profile.json into index.html placeholders at build time
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
        const rawMeta =
          profile.metaDescription ?? profile.summary ?? ''
        const metaDescription =
          years !== null && rawMeta.includes('{{years}}')
            ? rawMeta.replace(/\{\{years\}\}/g, String(years))
            : rawMeta
        return html
          .replace(/\{\{SITE_TITLE\}\}/g, escapeHtml(title))
          .replace(/\{\{SITE_AUTHOR\}\}/g, escapeHtml(author))
          .replace(/\{\{SITE_META_DESCRIPTION\}\}/g, escapeHtml(metaDescription))
      },
    },
  }
}

function getYearsOfExperience(careerStartDate: string): number {
  const [y, m] = careerStartDate.split('-').map(Number)
  if (!y || Number.isNaN(y)) return 0
  const start = new Date(y, (m ?? 1) - 1, 1)
  const now = new Date()
  const years = (now.getTime() - start.getTime()) / (365.25 * 24 * 60 * 60 * 1000)
  return Math.floor(years)
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

// Injects Google Analytics (GA4) when VITE_GA_MEASUREMENT_ID is set
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
