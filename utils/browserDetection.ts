/**
 * Browser Detection Utilities
 * Used for applying Safari/iOS-specific optimizations without changing Chrome visuals
 */

// Detect if running on iOS
export const isIOS = (): boolean => {
  if (typeof window === 'undefined') return false;
  return /iPad|iPhone|iPod/.test(navigator.userAgent) || 
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
};

// Detect if running Safari
export const isSafari = (): boolean => {
  if (typeof window === 'undefined') return false;
  const ua = navigator.userAgent.toLowerCase();
  return ua.includes('safari') && !ua.includes('chrome') && !ua.includes('android');
};

// Detect if running on a touch device
export const isTouchDevice = (): boolean => {
  if (typeof window === 'undefined') return false;
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
};

// Detect if running on mobile
export const isMobile = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.innerWidth < 768 || isTouchDevice();
};

// Should reduce effects for performance (Safari + iOS + Mobile)
export const shouldReduceEffects = (): boolean => {
  return (isSafari() && isIOS()) || (isSafari() && isTouchDevice());
};

// Apply browser-specific classes to document
export const applyBrowserClasses = (): void => {
  if (typeof document === 'undefined') return;
  
  const html = document.documentElement;
  
  if (isSafari()) {
    html.classList.add('is-safari');
  }
  
  if (isIOS()) {
    html.classList.add('is-ios');
  }
  
  if (isTouchDevice()) {
    html.classList.add('is-touch');
  }
  
  if (shouldReduceEffects()) {
    html.classList.add('reduce-effects');
  }
};

// Remove browser classes (for cleanup)
export const removeBrowserClasses = (): void => {
  if (typeof document === 'undefined') return;
  
  const html = document.documentElement;
  html.classList.remove('is-safari', 'is-ios', 'is-touch', 'reduce-effects');
};
