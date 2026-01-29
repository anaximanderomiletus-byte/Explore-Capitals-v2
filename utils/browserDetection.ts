/**
 * Browser Detection Utilities for Safari/iOS Optimization
 * Used to apply performance optimizations only where needed
 */

// Detect Safari browser (including iOS Safari)
export const isSafari = (): boolean => {
  if (typeof window === 'undefined') return false;
  const ua = navigator.userAgent;
  return /^((?!chrome|android).)*safari/i.test(ua);
};

// Detect iOS devices
export const isIOS = (): boolean => {
  if (typeof window === 'undefined') return false;
  return /iPad|iPhone|iPod/.test(navigator.userAgent) || 
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
};

// Detect WebKit-based browsers
export const isWebKit = (): boolean => {
  if (typeof window === 'undefined') return false;
  return /WebKit/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent);
};

// Detect if device is mobile
export const isMobile = (): boolean => {
  if (typeof window === 'undefined') return false;
  return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) || window.innerWidth < 768;
};

// Detect touch-capable devices
export const isTouchDevice = (): boolean => {
  if (typeof window === 'undefined') return false;
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
};

// Check if device prefers reduced motion
export const prefersReducedMotion = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

// Check if device is low-power (based on memory and processor)
export const isLowPowerDevice = (): boolean => {
  if (typeof window === 'undefined') return false;
  const nav = navigator as any;
  // Check for low device memory (< 4GB)
  if (nav.deviceMemory && nav.deviceMemory < 4) return true;
  // Check for low hardware concurrency (< 4 cores)
  if (nav.hardwareConcurrency && nav.hardwareConcurrency < 4) return true;
  // Default to true for Safari on mobile for safety
  return isSafari() && isMobile();
};

// Should disable heavy effects (Safari/iOS or reduced motion preference)
export const shouldDisableHeavyEffects = (): boolean => {
  return (isSafari() && isMobile()) || prefersReducedMotion() || isLowPowerDevice();
};

// Apply global class to body for CSS-based detection
export const applyBrowserClasses = (): void => {
  if (typeof document === 'undefined') return;
  
  const html = document.documentElement;
  
  if (isSafari()) html.classList.add('is-safari');
  if (isIOS()) html.classList.add('is-ios');
  if (isWebKit()) html.classList.add('is-webkit');
  if (isMobile()) html.classList.add('is-mobile');
  if (isTouchDevice()) html.classList.add('is-touch');
  if (shouldDisableHeavyEffects()) html.classList.add('reduce-effects');
};

// Initialize browser detection (call once at app startup)
export const initBrowserDetection = (): void => {
  applyBrowserClasses();
  
  // Add passive event listener support check
  let supportsPassive = false;
  try {
    const opts = Object.defineProperty({}, 'passive', {
      get: function() {
        supportsPassive = true;
        return true;
      }
    });
    window.addEventListener('testPassive', null as any, opts);
    window.removeEventListener('testPassive', null as any, opts);
  } catch (e) {}
  
  (window as any).__supportsPassive = supportsPassive;
};

// Get passive event options
export const getPassiveOptions = (passive = true): AddEventListenerOptions | boolean => {
  return (window as any).__supportsPassive ? { passive } : false;
};
