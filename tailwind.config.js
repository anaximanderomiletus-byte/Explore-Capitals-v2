/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
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
        cursive: ['Caveat', 'cursive'],
      },
      colors: {
        primary: '#007AFF', // iOS Blue
        secondary: '#5856D6', // iOS Purple
        accent: '#34C759', // iOS Green
        warning: '#FF9500', // iOS Orange
        error: '#FF3B30', // iOS Red
        sky: '#00C2FF', // Vibrant Frutiger Sky Blue
        'sky-light': '#BFE6FF',
        surface: '#F2F2F7', // iOS Light Gray Background
        'surface-dark': '#0F172A', // Deep Midnight
        text: '#000000',
        'text-dark': '#FFFFFF',
        glass: 'rgba(255, 255, 255, 0.7)',
        'glass-dark': 'rgba(15, 23, 42, 0.7)',
      },
      boxShadow: {
        'premium': '0 8px 32px 0 rgba(0, 122, 255, 0.08)',
        'premium-hover': '0 12px 48px 0 rgba(0, 122, 255, 0.12)',
        'glass': '0 8px 24px 0 rgba(31, 38, 135, 0.15)',
        'glass-bubble': '0 12px 28px rgba(0, 0, 0, 0.12), 0 0 0 1px rgba(255, 255, 255, 0.1), inset 0 1px 2px rgba(255, 255, 255, 0.5), inset 0 -3px 8px rgba(0, 0, 0, 0.05), inset 0 3px 10px rgba(255, 255, 255, 0.25)',
        'inner-gloss': 'inset 0 1px 1px rgba(255, 255, 255, 0.3), inset 0 -1px 1px rgba(0, 0, 0, 0.05)',
        'glow-primary': '0 0 12px rgba(0, 122, 255, 0.25)',
        'glow-sky': '0 0 15px rgba(119, 182, 234, 0.2)',
        'glow-accent': '0 0 15px rgba(34, 197, 94, 0.2)',
        'glow-white': '0 0 12px rgba(255, 255, 255, 0.15)',
        'glow-warning': '0 0 15px rgba(255, 149, 0, 0.2)',
        'logo-glow': '0 0 20px rgba(0, 191, 255, 0.2)',
      },
      backgroundImage: {
        'glossy-gradient': 'linear-gradient(180deg, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.3) 40%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0) 60%, rgba(0,0,0,0.03) 100%)',
        'frutiger-gradient': 'linear-gradient(135deg, #00C2FF 0%, #007AFF 50%, #34C759 100%)',
        'frutiger-glass': 'linear-gradient(135deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.1) 100%)',
        'aurora': 'radial-gradient(circle at 50% -20%, rgba(0,194,255,0.4), transparent 70%), radial-gradient(circle at -20% 50%, rgba(52,199,89,0.3), transparent 70%)',
        'glass-gradient': 'linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.1) 100%)',
        'gel-blue': 'linear-gradient(180deg, rgba(125, 211, 252, 0.5) 0%, rgba(14, 165, 233, 0.35) 48%, rgba(14, 165, 233, 0.35) 52%, rgba(2, 132, 199, 0.4) 100%)',
        'sky-gradient': 'linear-gradient(180deg, #00C2FF 0%, #BFE6FF 100%)',
      },
      animation: {
        'color-pulse': 'color-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'wipe-screen': 'wipe-screen 1s cubic-bezier(0.65, 0, 0.35, 1) forwards',
        'float': 'float 6s ease-in-out infinite',
        'float-delayed': 'float 6s ease-in-out 3s infinite',
        'float-slow': 'float 8s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'pulse-scale': 'pulse-scale 3s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
        'reverse-spin': 'reverse-spin 20s linear infinite',
        'globe-pulse': 'globe-pulse 8s ease-in-out infinite',
        'bounce-slow': 'bounce 3s infinite',
        'scan-line': 'scan-line 4s linear infinite',
        'scan-line-fast': 'scan-line 2s linear infinite',
        'aero-enter': 'aero-enter 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) forwards',
        'aero-exit': 'aero-exit 0.6s cubic-bezier(0.5, 0, 0.7, 0.4) forwards',
        'aero-wipe-in': 'aero-wipe-in 1s cubic-bezier(0.77, 0, 0.175, 1) forwards',
        'aero-wipe-out': 'aero-wipe-out 1s cubic-bezier(0.77, 0, 0.175, 1) forwards',
        'aero-wipe-in-left': 'aero-wipe-in-left 1s cubic-bezier(0.77, 0, 0.175, 1) forwards',
        'aero-curtain-in': 'aero-curtain-in 0.8s cubic-bezier(0.645, 0.045, 0.355, 1) forwards',
        'aero-curtain-out': 'aero-curtain-out 0.8s cubic-bezier(0.645, 0.045, 0.355, 1) forwards',
        'shake': 'shake 0.3s cubic-bezier(.36,.07,.19,.97) both',
        'correct-pop': 'correct-pop 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
        'timer-panic': 'timer-panic 0.5s ease-in-out infinite',
        'shing': 'shing 0.5s ease-out forwards',
        'aero-wipe-full-forward': 'aero-wipe-full-forward 1.4s cubic-bezier(0.77, 0, 0.175, 1) forwards',
        'aero-wipe-full-backward': 'aero-wipe-full-backward 1.4s cubic-bezier(0.77, 0, 0.175, 1) forwards',
        'float-delayed': 'float 6s ease-in-out 3s infinite',
        'bounce-slow': 'bounce 3s infinite',
      },
      keyframes: {
        'globe-pulse': {
          '0%, 100%': { transform: 'scale(1.3)' },
          '50%': { transform: 'scale(1.35)' },
        },
        'shing': {
          '0%': { transform: 'translateX(-100%) skewX(-20deg)', opacity: '0' },
          '20%': { opacity: '1' },
          '80%': { opacity: '1' },
          '100%': { transform: 'translateX(300%) skewX(-20deg)', opacity: '0' },
        },
        'timer-panic': {
          '0%, 100%': { backgroundColor: 'rgba(239, 68, 68, 0.2)', transform: 'scale(1)', boxShadow: '0 0 20px rgba(239, 68, 68, 0.4)' },
          '50%': { backgroundColor: 'rgba(239, 68, 68, 0.6)', transform: 'scale(1.05)', boxShadow: '0 0 40px rgba(239, 68, 68, 0.8)' },
        },
        'shake': {
          '10%, 90%': { transform: 'translate3d(-2px, 0, 0)' },
          '20%, 80%': { transform: 'translate3d(4px, 0, 0)' },
          '30%, 50%, 70%': { transform: 'translate3d(-8px, 0, 0)' },
          '40%, 60%': { transform: 'translate3d(8px, 0, 0)' },
        },
        'correct-pop': {
          '0%': { transform: 'scale(1)', boxShadow: '0 0 0 rgba(52, 199, 89, 0)' },
          '50%': { transform: 'scale(1.15)', boxShadow: '0 0 30px rgba(52, 199, 89, 0.8), 0 0 60px rgba(52, 199, 89, 0.4)' },
          '100%': { transform: 'scale(1)', boxShadow: '0 0 15px rgba(52, 199, 89, 0.3)' },
        },
        'aero-wipe-in': {
          '0%': { transform: 'translateX(100%)', opacity: '0', filter: 'blur(20px)' },
          '100%': { transform: 'translateX(0)', opacity: '1', filter: 'blur(0)' },
        },
        'aero-wipe-in-left': {
          '0%': { transform: 'translateX(-100%)', opacity: '0', filter: 'blur(20px)' },
          '100%': { transform: 'translateX(0)', opacity: '1', filter: 'blur(0)' },
        },
        'aero-wipe-out': {
          '0%': { transform: 'translateX(0)', opacity: '1', filter: 'blur(0)' },
          '100%': { transform: 'translateX(-100%)', opacity: '0', filter: 'blur(20px)' },
        },
        'aero-curtain-in': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(0)' },
        },
        'aero-curtain-out': {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(100%)' },
        },
        'aero-enter': {
          '0%': { transform: 'scale(0.96) translateY(20px)', opacity: '0', filter: 'blur(10px)' },
          '100%': { transform: 'scale(1) translateY(0)', opacity: '1', filter: 'blur(0)' },
        },
        'aero-exit': {
          '0%': { transform: 'scale(1) translateY(0)', opacity: '1', filter: 'blur(0)' },
          '100%': { transform: 'scale(1.04) translateY(-20px)', opacity: '0', filter: 'blur(10px)' },
        },
        'pulse-scale': {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.1)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'float-slow': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'reverse-spin': {
          from: { transform: 'rotate(360deg)' },
          to: { transform: 'rotate(0deg)' },
        },
        'scan-line': {
          '0%': { transform: 'translateY(-100%)', opacity: '0' },
          '10%, 90%': { opacity: '1' },
          '100%': { transform: 'translateY(1000%)', opacity: '0' },
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
          '0%': { transform: 'translateX(100%)' },
          '35%': { transform: 'translateX(0)' },
          '65%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-100%)' },
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
      }
    },
  },
  plugins: [],
}