import React, { useState, useRef, useEffect } from "react";
import { useTranslation, Locale } from "../context/LocaleContext";
import { Globe2 } from "lucide-react";

const LANGUAGES: { code: Locale; label: string; flag: string }[] = [
  { code: "en", label: "EN", flag: "🇬🇧" },
  { code: "es", label: "ES", flag: "🇪🇸" },
  { code: "fr", label: "FR", flag: "🇫🇷" },
  { code: "de", label: "DE", flag: "🇩🇪" },
];

interface LanguageSwitcherProps {
  variant?: "navbar" | "footer" | "mobile";
  isOverMap?: boolean;
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  variant = "navbar",
}) => {
  const { locale, setLocale } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const current = LANGUAGES.find((l) => l.code === locale) || LANGUAGES[0];

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (variant === "mobile") {
    return (
      <div className="flex items-center gap-2">
        {LANGUAGES.map((lang) => (
          <button
            key={lang.code}
            onClick={() => setLocale(lang.code)}
            className={`px-3 py-2 rounded-lg text-[10px] font-semibold uppercase tracking-[0.12em] transition-all ${
              locale === lang.code
                ? "bg-accent-soft border border-primary/20 text-primary"
                : "bg-surface border border-border text-muted hover:text-text hover:bg-elevated-2"
            }`}
          >
            <span className="mr-1.5">{lang.flag}</span>
            {lang.label}
          </button>
        ))}
      </div>
    );
  }

  if (variant === "footer") {
    return (
      <div className="flex items-center gap-3">
        {LANGUAGES.map((lang) => (
          <button
            key={lang.code}
            onClick={() => setLocale(lang.code)}
            className={`text-xs font-semibold uppercase tracking-[0.12em] transition-all ${
              locale === lang.code
                ? "text-primary"
                : "text-muted hover:text-text"
            }`}
          >
            {lang.label}
          </button>
        ))}
      </div>
    );
  }

  return (
    <div ref={dropdownRef} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[10px] font-semibold uppercase tracking-[0.12em] transition-all border text-muted hover:text-text border-border hover:border-primary/30 hover:bg-accent-soft"
      >
        <Globe2 size={12} />
        <span>{current.label}</span>
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 py-1 bg-elevated border border-border rounded-xl shadow-premium overflow-hidden z-50 min-w-[120px]">
          {LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              onClick={() => {
                setLocale(lang.code);
                setIsOpen(false);
              }}
              className={`w-full flex items-center gap-2.5 px-4 py-2.5 text-[10px] font-semibold uppercase tracking-[0.12em] transition-all ${
                locale === lang.code
                  ? "text-primary bg-accent-soft"
                  : "text-muted hover:text-text hover:bg-surface"
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
