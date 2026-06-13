import React from 'react'
import ReactDOM from 'react-dom/client'
import { MotionConfig } from 'framer-motion'
// Selbst gehostete Schriften (kein Google-Fonts-CDN, DSGVO-konform).
// Nur Latin-Subset: deckt Deutsch (Umlaute, ß) und Englisch ab.
import '@fontsource/inter/latin-300.css'
import '@fontsource/inter/latin-400.css'
import '@fontsource/inter/latin-500.css'
import '@fontsource/inter/latin-600.css'
import '@fontsource/inter/latin-700.css'
import '@fontsource/playfair-display/latin-500.css'
import '@fontsource/playfair-display/latin-600.css'
import '@fontsource/playfair-display/latin-700.css'
import '@fontsource/playfair-display/latin-500-italic.css'
import App from './App.tsx'
import { LanguageProvider } from './lib/i18n'
import { ErrorBoundary } from './components/ErrorBoundary'
import { printConsoleGreeting } from './lib/consoleGreeting'
import './index.css'

printConsoleGreeting()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <MotionConfig reducedMotion="user">
      <LanguageProvider>
        <ErrorBoundary>
          <App />
        </ErrorBoundary>
      </LanguageProvider>
    </MotionConfig>
  </React.StrictMode>,
)
