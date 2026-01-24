/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./context/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'Helvetica', 'Arial', 'sans-serif'],
        display: ['Inter', 'Helvetica', 'Arial', 'sans-serif'],
      },
      colors: {
        primary: '#007AFF',
        secondary: '#5856D6',
        accent: '#34C759',
        warning: '#FF9500',
        error: '#FF3B30',
        sky: '#00C2FF',
        'sky-light': '#BFE6FF',
        surface: '#0F172A',
        'surface-dark': '#0F172A',
        text: '#000000',
        'text-dark': '#FFFFFF',
        glass: 'rgba(255, 255, 255, 0.7)',
        'glass-dark': 'rgba(15, 23, 42, 0.7)',
      },
      boxShadow: {
        'premium': '0 8px 32px 0 rgba(0, 122, 255, 0.1)',
        'premium-hover': '0 12px 48px 0 rgba(0, 122, 255, 0.15)',
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.25)',
        'glass-bubble': '0 20px 50px rgba(0, 0, 0, 0.15), inset 0 0 20px rgba(255, 255, 255, 0.2), inset 0 2px 15px rgba(255, 255, 255, 0.3)',
        'inner-gloss': 'inset 0 1px 1px rgba(255, 255, 255, 0.2), inset 0 -1px 1px rgba(0, 0, 0, 0.05)',
        'glow-primary': '0 0 15px rgba(0, 122, 255, 0.4)',
        'glow-sky': '0 0 20px rgba(0, 194, 255, 0.4)',
        'glow-accent': '0 0 15px rgba(52, 199, 89, 0.4)',
        'glow-white': '0 0 15px rgba(255, 255, 255, 0.3)',
        'logo-glow': '0 0 30px rgba(0, 191, 255, 0.35)',
      },
      backgroundImage: {
        'glossy-gradient': 'linear-gradient(180deg, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.3) 45%, rgba(255,255,255,0) 50%, rgba(0,0,0,0.05) 100%)',
        'frutiger-gradient': 'linear-gradient(135deg, #00C2FF 0%, #007AFF 50%, #34C759 100%)',
        'frutiger-glass': 'linear-gradient(135deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.1) 100%)',
        'aurora': 'radial-gradient(circle at 50% -20%, #00C2FF, transparent), radial-gradient(circle at -20% 50%, #34C759, transparent)',
        'glass-gradient': 'linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.1) 100%)',
        'gel-blue': 'linear-gradient(180deg, #BFE6FF 0%, #00C2FF 48%, #007AFF 52%, #00C2FF 100%)',
        'sky-gradient': 'linear-gradient(180deg, #00C2FF 0%, #BFE6FF 100%)',
      },
      animation: {
        'color-pulse': 'color-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'wipe-screen': 'wipe-screen 1s cubic-bezier(0.77, 0, 0.175, 1) forwards',
        'float': 'float 6s ease-in-out infinite',
        'float-delayed': 'float 6s ease-in-out 3s infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 20s linear infinite',
        'bounce-slow': 'bounce 3s infinite',
        'aero-wipe-in': 'aero-wipe-in 1s cubic-bezier(0.77, 0, 0.175, 1) forwards',
        'aero-wipe-out': 'aero-wipe-out 1s cubic-bezier(0.77, 0, 0.175, 1) forwards',
        'aero-wipe-full-forward': 'aero-wipe-full-forward 1.4s cubic-bezier(0.77, 0, 0.175, 1) forwards',
        'aero-wipe-full-backward': 'aero-wipe-full-backward 1.4s cubic-bezier(0.77, 0, 0.175, 1) forwards',
        'shake': 'shake 0.4s cubic-bezier(.36,.07,.19,.97) both',
        'timer-panic': 'timer-panic 0.5s ease-in-out infinite',
      },
      keyframes: {
        'timer-panic': {
          '0%, 100%': { transform: 'scale(1)', boxShadow: '0 0 15px rgba(255, 59, 48, 0.4)' },
          '50%': { transform: 'scale(1.08)', boxShadow: '0 0 30px rgba(255, 59, 48, 0.8)' },
        },
        'aero-wipe-full-forward': {
          '0%': { transform: 'translateX(100%)', opacity: '1' },
          '35%, 65%': { transform: 'translateX(0)', opacity: '1' },
          '100%': { transform: 'translateX(-100%)', opacity: '1' },
        },
        'aero-wipe-full-backward': {
          '0%': { transform: 'translateX(-100%)', opacity: '1' },
          '35%, 65%': { transform: 'translateX(0)', opacity: '1' },
          '100%': { transform: 'translateX(100%)', opacity: '1' },
        },
        'shake': {
          '0%, 100%': { transform: 'translate3d(0, 0, 0)' },
          '10%, 30%, 50%, 70%, 90%': { transform: 'translate3d(-20px, 0, 0)' },
          '20%, 40%, 60%, 80%': { transform: 'translate3d(20px, 0, 0)' },
        },
        'aero-wipe-in': {
          '0%': { transform: 'translateX(100%)', opacity: '0', filter: 'blur(20px)' },
          '100%': { transform: 'translateX(0)', opacity: '1', filter: 'blur(0)' },
        },
        'aero-wipe-out': {
          '0%': { transform: 'translateX(0)', opacity: '1', filter: 'blur(0)' },
          '100%': { transform: 'translateX(-100%)', opacity: '0', filter: 'blur(20px)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'shimmer': {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'color-pulse': {
          '0%, 100%': { color: '#007AFF' },
          '50%': { color: '#00BFFF' },
        },
        'wipe-screen': {
          '0%': { transform: 'translateX(100%)', opacity: '0', filter: 'blur(20px)' },
          '35%': { transform: 'translateX(0)', opacity: '1', filter: 'blur(0)' },
          '65%': { transform: 'translateX(0)', opacity: '1', filter: 'blur(0)' },
          '100%': { transform: 'translateX(-100%)', opacity: '0', filter: 'blur(20px)' },
        }
      }
    },
  },
  plugins: [],
}
