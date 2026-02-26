import React, { useRef, useState, useEffect } from 'react';

/**
 * Scroll-reveal wrapper — slides up and fades in when entering the viewport.
 * Pure CSS transitions driven by a one-shot IntersectionObserver.
 * GPU-friendly (translate + opacity only), no framer-motion overhead.
 */
const RevealSection: React.FC<{
  children: React.ReactNode;
  className?: string;
  /** Delay in seconds before the animation starts once visible */
  delay?: number;
}> = ({ children, className = '', delay = 0 }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0, rootMargin: '0px 0px 60px 0px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(36px)',
        transition: `opacity 0.5s cubic-bezier(0.22,1,0.36,1) ${delay}s, transform 0.5s cubic-bezier(0.22,1,0.36,1) ${delay}s`,
        willChange: 'opacity, transform',
      }}
    >
      {children}
    </div>
  );
};

export default RevealSection;
