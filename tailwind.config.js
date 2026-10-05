/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Rebrand: previous `sky` usages now resolve to violet
        sky: {
          50:  '#faf5ff',
          100: '#f3e8ff',
          200: '#e9d5ff',
          300: '#d8b4fe',
          400: '#c084fc',
          500: '#a855f7',
          600: '#9333ea',
          700: '#7e22ce',
          800: '#6b21a8',
          900: '#581c87',
          950: '#3b0764',
        },
        // Rebrand: previous `cyan` usages now resolve to fuchsia
        cyan: {
          50:  '#fdf4ff',
          100: '#fae8ff',
          200: '#f5d0fe',
          300: '#f0abfc',
          400: '#e879f9',
          500: '#d946ef',
          600: '#c026d3',
          700: '#a21caf',
          800: '#86198f',
          900: '#701a75',
          950: '#4a044e',
        },
        primary: {
          DEFAULT: '#a855f7', // Purple-500
          dark: '#9333ea',    // Purple-600
          light: '#c084fc',   // Purple-400
        },
        accent: {
          DEFAULT: '#d946ef', // Fuchsia-500
          dark: '#c026d3',    // Fuchsia-600
          light: '#e879f9',   // Fuchsia-400
        },
        void: {
          DEFAULT: '#12081f', // near-black violet — hero / footer bg
          light: '#1a0b2e',
          lighter: '#241040',
        },
        dark: {
          DEFAULT: '#f3f4f6', // Gray-100
          lighter: '#f9fafb', // Gray-50
          darker: '#e5e7eb',  // Gray-200
        },
      },
      fontFamily: {
        sans: ['var(--font-body)', 'Manrope', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'Syne', 'system-ui', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
        'glow-pulse': 'glowPulse 3s ease-in-out infinite',
        'orbit': 'orbit 12s linear infinite',
        'text-shimmer': 'textShimmer 3s linear infinite',
        'gradient-x': 'gradientX 6s ease infinite',
        'letter-bounce': 'letterBounce 1.4s ease-in-out infinite',
        'caret-blink': 'caretBlink 0.8s step-end infinite',
        'marquee': 'marquee 30s linear infinite',
        'ticker-vertical': 'tickerVertical 24s linear infinite',
        'spin-slow': 'orbit 40s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 10px rgba(168,85,247,0.3)' },
          '50%': { boxShadow: '0 0 25px rgba(168,85,247,0.7), 0 0 50px rgba(217,70,239,0.35)' },
        },
        orbit: {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
        textShimmer: {
          '0%': { backgroundPosition: '0% center' },
          '100%': { backgroundPosition: '-200% center' },
        },
        gradientX: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        letterBounce: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10%)' },
        },
        caretBlink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        tickerVertical: {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(-50%)' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
