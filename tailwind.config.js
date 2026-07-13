/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        void: '#07070c',
        surface: '#0e0e18',
        'surface-2': '#14141f',
        violet: {
          DEFAULT: '#8b5cf6',
          soft: '#a78bfa',
        },
        cyan: {
          DEFAULT: '#22d3ee',
        },
        pink: {
          DEFAULT: '#f472b6',
        },
        gold: {
          DEFAULT: '#fbbf24',
        },
        ink: {
          DEFAULT: '#e7e7f0',
          muted: '#8d8da8',
          faint: '#54546b',
        },
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      backgroundImage: {
        'aurora-1': 'radial-gradient(circle at 20% 20%, rgba(139,92,246,0.35), transparent 55%)',
        'aurora-2': 'radial-gradient(circle at 80% 30%, rgba(34,211,238,0.30), transparent 55%)',
        'aurora-3': 'radial-gradient(circle at 50% 80%, rgba(244,114,182,0.25), transparent 55%)',
        'grid-pattern': 'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)',
      },
      backgroundSize: {
        grid: '48px 48px',
      },
      animation: {
        blob: 'blob 18s infinite ease-in-out',
        'blob-slow': 'blob 26s infinite ease-in-out',
        marquee: 'marquee 32s linear infinite',
        'marquee-reverse': 'marquee-reverse 32s linear infinite',
        float: 'float 6s ease-in-out infinite',
        'float-delay': 'float 7s ease-in-out infinite 1s',
        'spin-slow': 'spin 14s linear infinite',
        shimmer: 'shimmer 2.5s linear infinite',
        'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
      },
      keyframes: {
        blob: {
          '0%, 100%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(40px, -60px) scale(1.15)' },
          '66%': { transform: 'translate(-30px, 30px) scale(0.9)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'marquee-reverse': {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-18px) rotate(4deg)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: 0.5, filter: 'blur(40px)' },
          '50%': { opacity: 0.9, filter: 'blur(60px)' },
        },
      },
      boxShadow: {
        glow: '0 0 40px -10px rgba(139,92,246,0.5)',
        'glow-cyan': '0 0 40px -10px rgba(34,211,238,0.5)',
        'glow-pink': '0 0 40px -10px rgba(244,114,182,0.5)',
      },
    },
  },
  plugins: [],
}
