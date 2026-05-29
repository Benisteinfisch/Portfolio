/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'nordic-bg': 'var(--nordic-bg)',
        'nordic-surface': 'var(--nordic-surface)',
        'nordic-text': 'var(--nordic-text)',
        'nordic-muted': 'var(--nordic-muted)',
        'nordic-accent': 'var(--nordic-accent)',
        'nordic-accent-hover': 'var(--nordic-accent-hover)',
        'border-color': 'var(--border-color)',
        'accent-light': 'var(--accent-light)',
        'glass-bg': 'var(--glass-bg)',
        'glass-bg-hover': 'var(--glass-bg-hover)',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      }
    },
  },
  plugins: [],
}
