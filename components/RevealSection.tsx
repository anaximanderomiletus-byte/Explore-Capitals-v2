import React, { useRef, useState, useEffect } from 'react';

/**
 * Scroll-reveal wrapper — slides up and fades in when approaching the viewport.
 * Pure CSS transitions driven by a one-shot IntersectionObserver.
 * GPU-friendly (translate + opacity only), no framer-motion overhead.
 *
 * Uses a generous rootMargin (300px) so elements are revealed well before
 * they enter the viewport — prevents "blank" flashes during fast scrolling.
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

    // If element is already in or near the viewport on mount, reveal immediately
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight + 300) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0, rootMargin: '0px 0px 300px 0px' }
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
        transform: visible ? 'translateY(0)' : 'translateY(20px)',
        transition: `opacity 0.4s cubic-bezier(0.22,1,0.36,1) ${delay}s, transform 0.4s cubic-bezier(0.22,1,0.36,1) ${delay}s`,
        willChange: visible ? 'auto' : 'opacity, transform',
      }}
    >
      {children}
    </div>
  );
};

export default RevealSection;
