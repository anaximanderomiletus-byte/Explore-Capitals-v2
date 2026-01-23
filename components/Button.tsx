
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'accent' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isFlat?: boolean;
}

// Inject global shing animation styles once
const shingStyleId = 'button-shing-styles';
if (typeof document !== 'undefined' && !document.getElementById(shingStyleId)) {
  const styleEl = document.createElement('style');
  styleEl.id = shingStyleId;
  styleEl.textContent = `
    @keyframes shingGlare {
      0% {
        transform: translateX(-150%) skewX(-20deg);
        opacity: 0;
      }
      20% {
        opacity: 1;
      }
      80% {
        opacity: 1;
      }
      100% {
        transform: translateX(400%) skewX(-20deg);
        opacity: 0;
      }
    }
    .shing-container .shing-glare {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      width: 40%;
      background: linear-gradient(
        90deg, 
        transparent 0%, 
        rgba(255,255,255,0.1) 20%, 
        rgba(255,255,255,0.95) 50%, 
        rgba(255,255,255,0.1) 80%, 
        transparent 100%
      );
      transform: translateX(-150%) skewX(-20deg);
      opacity: 0;
      pointer-events: none;
    }
    .shing-btn:hover .shing-glare {
      animation: shingGlare 0.5s ease-out forwards;
    }
  `;
  document.head.appendChild(styleEl);
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  isFlat = false,
  className = '', 
  ...props 
}) => {
  // Check if a text color is already provided in className to avoid conflicts
  const hasTextColor = className.includes('text-');

  // Cross-browser compatible base styles with smooth hover transition (300ms)
  // Added active states for better mobile touch feedback
  const baseStyles = "inline-flex items-center justify-center font-display font-bold transition-all duration-300 ease-out rounded-full outline-none ring-0 focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0 disabled:opacity-50 disabled:cursor-not-allowed relative select-none [-webkit-appearance:none] [appearance:none] [-webkit-tap-highlight-color:transparent] overflow-hidden active:scale-[0.98] active:brightness-95";
  
  const variants = {
    primary: isFlat 
      ? `bg-sky hover:brightness-110 active:brightness-95 text-white` 
      : `bg-gel-blue backdrop-blur-2xl hover:brightness-110 hover:shadow-[0_12px_28px_rgba(0,0,0,0.15)] before:absolute before:inset-0 before:bg-white/10 before:pointer-events-none before:z-0 text-white after:absolute after:inset-0 after:bg-[linear-gradient(180deg,rgba(255,255,255,0.6)_0%,rgba(255,255,255,0)_50%)] after:pointer-events-none after:z-0 border-2 border-white/60`,
    accent: isFlat
      ? `bg-[#22c55e] hover:brightness-110 active:brightness-95 text-white`
      : `bg-[#22c55e]/60 backdrop-blur-2xl hover:bg-[#22c55e]/80 hover:brightness-110 before:absolute before:inset-0 before:bg-white/10 before:pointer-events-none before:z-0 text-white after:absolute after:inset-0 after:bg-[linear-gradient(180deg,rgba(255,255,255,0.7)_0%,rgba(255,255,255,0)_50%)] after:pointer-events-none after:z-0 border-2 border-white/70`,
    danger: isFlat
      ? `bg-error hover:brightness-110 active:brightness-95 text-white`
      : `bg-error/80 backdrop-blur-2xl hover:brightness-110 before:absolute before:inset-0 before:bg-white/10 before:pointer-events-none before:z-0 text-white after:absolute after:inset-0 after:bg-[linear-gradient(180deg,rgba(255,255,255,0.6)_0%,rgba(255,255,255,0)_50%)] after:pointer-events-none after:z-0 border-2 border-white/60`,
    secondary: isFlat
      ? `bg-white/10 backdrop-blur-xl border-2 border-white/20 hover:bg-white/20 hover:brightness-110 ${hasTextColor ? '' : 'text-white'}`
      : `bg-white/20 backdrop-blur-2xl border-2 border-white/80 hover:bg-white/30 hover:brightness-105 before:absolute before:inset-0 before:bg-white/10 before:pointer-events-none before:z-0 text-white after:absolute after:inset-0 after:bg-[linear-gradient(180deg,rgba(255,255,255,0.7)_0%,rgba(255,255,255,0)_50%)] after:pointer-events-none after:z-0`,
    outline: `bg-white/20 backdrop-blur-3xl border-4 border-white hover:bg-white/30 hover:brightness-105 before:absolute before:inset-0 before:bg-glossy-gradient before:opacity-40 before:z-0 ${hasTextColor ? '' : 'text-white'} after:absolute after:inset-0 after:bg-[linear-gradient(180deg,rgba(255,255,255,0.6)_0%,rgba(255,255,255,0)_50%)] after:pointer-events-none after:z-0`,
  };

  const sizes = {
    sm: "px-5 py-2 text-sm",
    md: "px-8 py-3 text-base",
    lg: "px-10 py-4 text-lg",
  };

  const showShing = variant === 'primary' && !isFlat;
  const shingClass = showShing ? 'shing-btn' : '';

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${shingClass} ${className}`}
      style={{ WebkitTapHighlightColor: 'transparent' }}
      {...props}
    >
      {/* Shing/glare animation layer - Only for primary Frutiger Aero buttons */}
      {showShing && (
        <span 
          className="shing-container absolute inset-0 z-20 pointer-events-none overflow-hidden rounded-full"
          aria-hidden="true"
        >
          <span className="shing-glare" />
        </span>
      )}
      <span className="relative z-10 flex items-center justify-center gap-2">{children}</span>
    </button>
  );
};

export default Button;
