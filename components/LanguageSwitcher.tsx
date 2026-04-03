import React, { useState, useRef, useEffect } from 'react';
import { useTranslation, Locale } from '../context/LocaleContext';
import { Globe2 } from 'lucide-react';

const LANGUAGES: { code: Locale; label: string; flag: string }[] = [
  { code: 'en', label: 'EN', flag: '🇬🇧' },
  { code: 'es', label: 'ES', flag: '🇪🇸' },
  { code: 'fr', label: 'FR', flag: '🇫🇷' },
  { code: 'de', label: 'DE', flag: '🇩🇪' },
];

interface LanguageSwitcherProps {
  variant?: 'navbar' | 'footer' | 'mobile';
  isOverMap?: boolean;
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ variant = 'navbar', isOverMap = false }) => {
  const { locale, setLocale } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const current = LANGUAGES.find(l => l.code === locale) || LANGUAGES[0];

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (variant === 'mobile') {
    return (
      <div className="flex items-center gap-2">
        {LANGUAGES.map(lang => (
          <button
            key={lang.code}
            onClick={() => setLocale(lang.code)}
            className={`px-3 py-2 rounded-lg text-[10px] font-black uppercase tracking-[0.15em] transition-all ${
              locale === lang.code
                ? 'bg-sky/20 border border-sky/30 text-sky-light'
                : 'bg-white/5 border border-white/10 text-white/40 hover:text-white/60 hover:bg-white/10'
            }`}
          >
            <span className="mr-1.5">{lang.flag}</span>
            {lang.label}
          </button>
        ))}
      </div>
    );
  }

  if (variant === 'footer') {
    return (
      <div className="flex items-center gap-2">
        {LANGUAGES.map(lang => (
          <button
            key={lang.code}
            onClick={() => setLocale(lang.code)}
            className={`text-[10px] font-black uppercase tracking-[0.15em] transition-all ${
              locale === lang.code
                ? 'text-sky-light'
                : 'text-white/30 hover:text-white/60'
            }`}
          >
            {lang.label}
          </button>
        ))}
      </div>
    );
  }

  // Navbar dropdown
  return (
    <div ref={dropdownRef} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-[0.15em] transition-all border ${
          isOverMap
            ? 'text-[#1A1C1E]/60 hover:text-[#1A1C1E] border-[#1A1C1E]/10 hover:border-[#1A1C1E]/20 hover:bg-[#1A1C1E]/5'
            : 'text-white/50 hover:text-white/80 border-white/10 hover:border-white/20 hover:bg-white/5'
        }`}
      >
        <Globe2 size={12} />
        <span>{current.label}</span>
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 py-1 bg-surface-dark/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-xl overflow-hidden z-50 min-w-[120px]">
          {LANGUAGES.map(lang => (
            <button
              key={lang.code}
              onClick={() => {
                setLocale(lang.code);
                setIsOpen(false);
              }}
              className={`w-full flex items-center gap-2.5 px-4 py-2.5 text-[10px] font-black uppercase tracking-[0.15em] transition-all ${
                locale === lang.code
                  ? 'text-sky-light bg-sky/10'
                  : 'text-white/50 hover:text-white hover:bg-white/5'
              }`}
            >
              <span className="text-sm">{lang.flag}</span>
              <span>{lang.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;
