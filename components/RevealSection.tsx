import React, { useRef, useState, useEffect, useCallback } from 'react';

/**
 * Scroll-reveal wrapper — slides up and fades in when approaching the viewport.
 * Pure CSS transitions driven by a one-shot IntersectionObserver with a
 * scroll-event fallback for Safari momentum scrolling (where the observer
 * can skip elements that fly past too quickly).
 *
 * Uses a very generous rootMargin (800px) so elements are revealed well
 * before they enter the viewport.  The scroll fallback fires on every
 * rAF during active scrolling and checks getBoundingClientRect directly.
 */
const RevealSection: React.FC<{
  children: React.ReactNode;
  className?: string;
  /** Delay in seconds before the animation starts once visible */
  delay?: number;
}> = ({ children, className = '', delay = 0 }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  // Scroll-based fallback: check if element is near the viewport
  const checkVisibility = useCallback(() => {
    const el = ref.current;
    if (!el) return false;
    const rect = el.getBoundingClientRect();
    // Reveal when the element is within 800px of the viewport bottom
    return rect.top < window.innerHeight + 800;
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // If element is already in or near the viewport on mount, reveal immediately
    if (checkVisibility()) {
      setVisible(true);
      return;
    }

    // Primary: IntersectionObserver with large rootMargin
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0, rootMargin: '0px 0px 800px 0px' }
    );
    observer.observe(el);

    // Fallback: passive scroll listener for Safari momentum scrolling
    // Uses rAF to throttle and avoid layout thrashing
    let rafId = 0;
    let revealed = false;
    const onScroll = () => {
      if (revealed) return;
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        if (checkVisibility()) {
          revealed = true;
          setVisible(true);
          observer.disconnect();
          window.removeEventListener('scroll', onScroll);
        }
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      observer.disconnect();
      cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', onScroll);
    };
  }, [checkVisibility]);

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
