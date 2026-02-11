import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { trackPageView } from './utils/analytics'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

// Track initial page view (single-page site)
trackPageView(window.location.pathname || '/', document.title)
