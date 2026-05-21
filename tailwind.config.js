/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: '#05050f',
        'bg-card': '#0d0d1a',
        'bg-card2': '#0a0a18',
        accent: '#7c3aed',
        'accent-light': '#a78bfa',
        'accent-dim': '#4c1d95',
        border: '#1e1b4b',
        muted: '#6b7280',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-glow': 'radial-gradient(ellipse 60% 70% at 70% 50%, rgba(124,58,237,0.35) 0%, transparent 70%)',
      },
      animation: {
        'spin-slow': 'spin 8s linear infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 30px rgba(124,58,237,0.4)' },
          '50%': { boxShadow: '0 0 60px rgba(124,58,237,0.8)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
    },
  },
  plugins: [],
}
