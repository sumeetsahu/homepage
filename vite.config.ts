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
        const metaDescription =
          profile.metaDescription ?? profile.summary ?? ''
        return html
          .replace(/\{\{SITE_TITLE\}\}/g, escapeHtml(title))
          .replace(/\{\{SITE_AUTHOR\}\}/g, escapeHtml(author))
          .replace(/\{\{SITE_META_DESCRIPTION\}\}/g, escapeHtml(metaDescription))
      },
    },
  }
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [injectProfileHtml(), react()],
  base: '/',
})
