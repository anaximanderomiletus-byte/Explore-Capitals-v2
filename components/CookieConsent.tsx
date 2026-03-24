import React, { useState, useEffect } from 'react';
import { Cookie, X, Settings, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

interface CookiePreferences {
  essential: boolean; // Always true, required for site function
  analytics: boolean;
  advertising: boolean;
}

const COOKIE_CONSENT_KEY = 'ec_cookie_consent';
const COOKIE_PREFERENCES_KEY = 'ec_cookie_preferences';

/**
 * Cookie Consent Banner
 * 
 * Required for EU/GDPR compliance and AdSense policy compliance.
 * Provides users with clear information about cookies and allows them to
 * manage their preferences for analytics and advertising cookies.
 */
const CookieConsent: React.FC = () => {
  const [showBanner, setShowBanner] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    essential: true,
    analytics: false,
    advertising: false,
  });

  useEffect(() => {
    // Check if user has already consented
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!consent) {
      // Show quickly - just enough delay for initial paint to settle
      const timer = setTimeout(() => setShowBanner(true), 500);
      return () => clearTimeout(timer);
    } else {
      // Load saved preferences
      const savedPrefs = localStorage.getItem(COOKIE_PREFERENCES_KEY);
      if (savedPrefs) {
        try {
          const parsed = JSON.parse(savedPrefs);
          if (parsed && typeof parsed === 'object' && typeof parsed.essential === 'boolean') {
            setPreferences(parsed);
          }
        } catch {
          // Corrupted data - remove and use defaults
          localStorage.removeItem(COOKIE_PREFERENCES_KEY);
        }
      }
    }
  }, []);

  const saveConsent = (prefs: CookiePreferences) => {
    localStorage.setItem(COOKIE_CONSENT_KEY, 'true');
    localStorage.setItem(COOKIE_PREFERENCES_KEY, JSON.stringify(prefs));
    setPreferences(prefs);
    setShowBanner(false);
    setShowPreferences(false);

    // Defer script loading so the banner can exit and scroll is restored first.
    // Running it synchronously blocks the main thread on the tap frame, causing
    // a multi-second scroll delay on mobile.
    setTimeout(() => applyPreferences(prefs), 0);
  };

  const applyPreferences = (prefs: CookiePreferences) => {
    // If user opts out of analytics, disable GA tracking
    if (!prefs.analytics) {
      (window as any)['ga-disable-G-8NEFW5WL3V'] = true;
    }

    // If user opts out of advertising, signal non-personalized ads
    if (!prefs.advertising) {
      (window as any).adsbygoogle = (window as any).adsbygoogle || [];
      (window as any).adsbygoogle.requestNonPersonalizedAds = 1;
    }

    // Notify the inline script in index.html to load consented services
    window.dispatchEvent(new Event('cookie-consent-updated'));
  };

  const acceptAll = () => {
    const allAccepted = { essential: true, analytics: true, advertising: true };
    saveConsent(allAccepted);
  };

  const acceptEssentialOnly = () => {
    const essentialOnly = { essential: true, analytics: false, advertising: false };
    saveConsent(essentialOnly);
  };

  const saveCustomPreferences = () => {
    saveConsent(preferences);
  };

  return (
    // AnimatePresence must stay mounted as a persistent wrapper so it can
    // detect when {showBanner && …} exits and play the exit animation.
    // The previous pattern (if (!showBanner) return null) unmounted
    // AnimatePresence itself, so the exit animation never ran and the
    // fixed element was yanked from the DOM mid-touch — causing iOS to
    // freeze scroll for several seconds.
    <AnimatePresence>
      {showBanner && (
      <motion.div
        key="cookie-banner"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0, transition: { duration: 0.15, ease: 'easeIn' } }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="fixed bottom-0 left-0 right-0 z-[9999] p-4 md:p-6"
      >
        <div className="max-w-4xl mx-auto">
          <div className="bg-surface-dark/95 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl overflow-hidden">
            {!showPreferences ? (
              // Main Banner
              <div className="p-6 md:p-8">
                <div className="flex items-start gap-4 mb-6">
                  <div className="p-3 bg-sky/20 rounded-2xl shrink-0">
                    <Cookie className="text-sky" size={24} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-display font-black text-white uppercase tracking-tight mb-2">
                      Cookie Notice
                    </h3>
                    <p className="text-white/50 text-xs font-bold uppercase tracking-wide leading-relaxed">
                      We use cookies to enhance your experience, analyze site traffic, and serve relevant advertisements.
                      You can accept all cookies or choose essential cookies only.{' '}
                      <Link to="/privacy" className="text-sky hover:text-sky-light transition-colors">
                        Learn more
                      </Link>
                    </p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-2.5">
                  <button
                    onClick={acceptAll}
                    className="flex-1 bg-sky hover:bg-sky-light text-surface-dark font-black text-[10px] uppercase tracking-widest py-2.5 px-5 rounded-xl transition-all hover:shadow-glow-sky"
                  >
                    Accept All
                  </button>
                  <button
                    onClick={acceptEssentialOnly}
                    className="flex-1 bg-white/10 hover:bg-white/20 text-white font-black text-[10px] uppercase tracking-widest py-2.5 px-5 rounded-xl transition-all border border-white/20"
                  >
                    Essential Only
                  </button>
                  <button
                    onClick={() => setShowPreferences(true)}
                    className="flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 text-white/60 hover:text-white font-black text-[10px] uppercase tracking-widest py-2.5 px-5 rounded-xl transition-all border border-white/10"
                  >
                    <Settings size={13} />
                    Customize
                  </button>
                </div>
              </div>
            ) : (
              // Preferences Panel
              <div className="p-6 md:p-8">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-display font-black text-white uppercase tracking-tight">
                    Cookie Preferences
                  </h3>
                  <button
                    onClick={() => setShowPreferences(false)}
                    className="p-2 hover:bg-white/10 rounded-xl transition-colors"
                  >
                    <X size={20} className="text-white/40" />
                  </button>
                </div>

                <div className="space-y-4 mb-6">
                  {/* Essential Cookies - Always On */}
                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/10">
                    <div className="flex-1">
                      <p className="text-white font-bold text-xs uppercase tracking-wide mb-1">Essential Cookies</p>
                      <p className="text-white/40 text-[10px] font-bold uppercase tracking-wide">
                        Required for the website to function. Cannot be disabled.
                      </p>
                    </div>
                    <div className="p-2 bg-accent/20 rounded-xl">
                      <Check size={16} className="text-accent" />
                    </div>
                  </div>

                  {/* Analytics Cookies */}
                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/10">
                    <div className="flex-1">
                      <p className="text-white font-bold text-xs uppercase tracking-wide mb-1">Analytics Cookies</p>
                      <p className="text-white/40 text-[10px] font-bold uppercase tracking-wide">
                        Help us understand how visitors interact with our website.
                      </p>
                    </div>
                    <button
                      onClick={() => setPreferences(p => ({ ...p, analytics: !p.analytics }))}
                      className={`appearance-none rounded-full transition-all relative shrink-0 overflow-hidden ${
                        preferences.analytics ? 'bg-sky' : 'bg-white/20'
                      }`}
                      style={{ width: '44px', height: '24px', minHeight: '24px', padding: 0 }}
                    >
                      <div
                        className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-md transition-all ${
                          preferences.analytics ? 'left-[22px]' : 'left-0.5'
                        }`}
                      />
                    </button>
                  </div>

                  {/* Advertising Cookies */}
                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/10">
                    <div className="flex-1">
                      <p className="text-white font-bold text-xs uppercase tracking-wide mb-1">Advertising Cookies</p>
                      <p className="text-white/40 text-[10px] font-bold uppercase tracking-wide">
                        Used to show you relevant advertisements on our site.
                      </p>
                    </div>
                    <button
                      onClick={() => setPreferences(p => ({ ...p, advertising: !p.advertising }))}
                      className={`appearance-none rounded-full transition-all relative shrink-0 overflow-hidden ${
                        preferences.advertising ? 'bg-sky' : 'bg-white/20'
                      }`}
                      style={{ width: '44px', height: '24px', minHeight: '24px', padding: 0 }}
                    >
                      <div
                        className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-md transition-all ${
                          preferences.advertising ? 'left-[22px]' : 'left-0.5'
                        }`}
                      />
                    </button>
                  </div>
                </div>

                <button
                  onClick={saveCustomPreferences}
                  className="w-full bg-sky hover:bg-sky-light text-surface-dark font-black text-[10px] uppercase tracking-widest py-2.5 px-5 rounded-xl transition-all hover:shadow-glow-sky"
                >
                  Save Preferences
                </button>
              </div>
            )}
          </div>
        </div>
      </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieConsent;
