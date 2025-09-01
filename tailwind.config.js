/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Cybersecurity dark theme colors
        cyber: {
          black: '#0a0a0a',
          dark: '#111111',
          gray: {
            100: '#1a1a1a',
            200: '#2a2a2a',
            300: '#3a3a3a',
            400: '#4a4a4a',
            500: '#6a6a6a',
          },
          green: {
            400: '#00ff88',
            500: '#00dd77',
            600: '#00bb66',
          },
          red: {
            400: '#ff4444',
            500: '#dd3333',
            600: '#bb2222',
          },
          blue: {
            400: '#00aaff',
            500: '#0088dd',
            600: '#0066bb',
          },
          purple: {
            400: '#aa44ff',
            500: '#8833dd',
            600: '#6622bb',
          }
        }
      },
      animation: {
        'pulse-fast': 'pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'scan': 'scan 3s linear infinite',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 5px #00ff88' },
          '100%': { boxShadow: '0 0 20px #00ff88, 0 0 30px #00ff88' },
        },
        scan: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        }
      },
      fontFamily: {
        mono: ['Monaco', 'Menlo', 'Ubuntu Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}
