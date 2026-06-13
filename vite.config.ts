import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'

// Injiziert <link rel="preload"> für die zwei render-kritischen Fonts
// (Inter 400 für Fließtext, Playfair 700 für die H1), damit der Browser sie
// nicht erst nach dem CSS-Parsing entdeckt (weniger Font-Swap-Flash/FOUT).
function preloadCriticalFonts(): Plugin {
  const critical = [
    /^inter-latin-400-normal-.*\.woff2$/,
    /^playfair-display-latin-700-normal-.*\.woff2$/,
  ]
  return {
    name: 'preload-critical-fonts',
    transformIndexHtml: {
      order: 'post',
      handler(_html, ctx) {
        if (!ctx.bundle) return []
        return Object.keys(ctx.bundle)
          .filter(file => critical.some(re => re.test(file.replace(/^assets\//, ''))))
          .map(file => ({
            tag: 'link',
            attrs: {
              rel: 'preload',
              href: `/ben-vincent/${file}`,
              as: 'font',
              type: 'font/woff2',
              crossorigin: true,
            },
            injectTo: 'head-prepend' as const,
          }))
      },
    },
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), preloadCriticalFonts()],
  base: '/ben-vincent/',
})
