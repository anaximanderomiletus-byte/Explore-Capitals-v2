import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import enStrings from '../locales/en.json';

export type Locale = 'en' | 'es' | 'fr' | 'de';

interface LocaleContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string, vars?: Record<string, string | number>) => string;
  isLoading: boolean;
}

const STORAGE_KEY = 'ec_locale';
const SUPPORTED: Locale[] = ['en', 'es', 'fr', 'de'];

type Strings = Record<string, string>;

function detectLocale(): Locale {
  // Check localStorage first
  try {
    const stored = localStorage.getItem(STORAGE_KEY) as Locale | null;
    if (stored && SUPPORTED.includes(stored)) return stored;
  } catch {}

  // Auto-detect from browser
  const browserLang = navigator.language?.split('-')[0]?.toLowerCase();
  if (browserLang && SUPPORTED.includes(browserLang as Locale)) {
    return browserLang as Locale;
  }

  return 'en';
}

const LocaleContext = createContext<LocaleContextValue>({
  locale: 'en',
  setLocale: () => {},
  t: (key: string) => key,
  isLoading: false,
});

// Cache loaded translations so we don't re-import on locale switch
const translationCache: Partial<Record<Locale, Strings>> = {
  en: enStrings as Strings,
};

export const LocaleProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [locale, setLocaleState] = useState<Locale>(detectLocale);
  const [strings, setStrings] = useState<Strings>(enStrings as Strings);
  const [isLoading, setIsLoading] = useState(false);
  const mountedRef = useRef(true);

  useEffect(() => {
    return () => { mountedRef.current = false; };
  }, []);

  const loadStrings = useCallback(async (loc: Locale) => {
    if (loc === 'en') {
      setStrings(enStrings as Strings);
      return;
    }

    // Check cache
    if (translationCache[loc]) {
      setStrings(translationCache[loc]!);
      return;
    }

    setIsLoading(true);
    try {
      const mod = await import(`../locales/${loc}.json`);
      const loaded = (mod.default ?? mod) as Strings;
      translationCache[loc] = loaded;
      if (mountedRef.current) {
        setStrings(loaded);
      }
    } catch (err) {
      console.warn(`Failed to load locale "${loc}", falling back to English`, err);
      if (mountedRef.current) {
        setStrings(enStrings as Strings);
      }
    } finally {
      if (mountedRef.current) {
        setIsLoading(false);
      }
    }
  }, []);

  // Load strings when locale changes
  useEffect(() => {
    loadStrings(locale);
    document.documentElement.lang = locale;
    try {
      localStorage.setItem(STORAGE_KEY, locale);
    } catch {}
  }, [locale, loadStrings]);

  const setLocale = useCallback((loc: Locale) => {
    if (SUPPORTED.includes(loc)) {
      setLocaleState(loc);
    }
  }, []);

  const t = useCallback((key: string, vars?: Record<string, string | number>): string => {
    let value = strings[key] || (enStrings as Strings)[key] || key;
    if (vars) {
      Object.entries(vars).forEach(([k, v]) => {
        value = value.replace(`{${k}}`, String(v));
      });
    }
    return value;
  }, [strings]);

  return (
    <LocaleContext.Provider value={{ locale, setLocale, t, isLoading }}>
      {children}
    </LocaleContext.Provider>
  );
};

export const useTranslation = () => useContext(LocaleContext);

export default LocaleContext;
