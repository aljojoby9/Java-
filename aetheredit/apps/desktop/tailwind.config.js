/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // FCP-inspired dark theme
        background: '#121212',
        surface: '#1e1e1e',
        'surface-light': '#2a2a2a',
        border: '#3a3a3a',
        primary: '#00ff9f',
        'primary-hover': '#00cc7f',
        secondary: '#1473e6',
        text: '#ffffff',
        'text-muted': '#a0a0a0',
        'text-disabled': '#606060',
        // Clip badges
        'ai-generated': '#00ff9f',
        'ai-enhanced': '#1473e6',
        'needs-review': '#ffd700',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}
