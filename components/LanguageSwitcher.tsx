import React, { useState, useRef, useEffect } from "react";
import { useTranslation, Locale } from "../context/LocaleContext";
import { Languages } from "lucide-react";

const LANGUAGES: { code: Locale; label: string; name: string }[] = [
  { code: "en", label: "EN", name: "English" },
  { code: "es", label: "ES", name: "Español" },
  { code: "fr", label: "FR", name: "Français" },
  { code: "de", label: "DE", name: "Deutsch" },
];

interface LanguageSwitcherProps {
  variant?: "navbar" | "footer" | "mobile" | "floating";
  isOverMap?: boolean;
}

/**
 * Floating corner control (default for site chrome) opens a small overlay.
 * Footer / mobile drawer keep a simpler inline list.
 */
const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  variant = "floating",
}) => {
  const { locale, setLocale } = useTranslation();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const current = LANGUAGES.find((l) => l.code === locale) || LANGUAGES[0];

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  if (variant === "footer" || variant === "mobile") {
    return (
      <div className="flex items-center" role="group" aria-label="Language">
        {LANGUAGES.map((lang, i) => (
          <React.Fragment key={lang.code}>
            {i > 0 && (
              <span className="text-border text-xs px-1 select-none" aria-hidden>
                |
              </span>
            )}
            <button
              type="button"
              onClick={() => setLocale(lang.code)}
              aria-pressed={locale === lang.code}
              className={`font-semibold uppercase tracking-[0.1em] transition-colors ${
                variant === "mobile"
                  ? `text-sm px-2 min-h-[40px] ${
                      locale === lang.code
                        ? "text-primary"
                        : "text-muted hover:text-text"
                    }`
                  : `text-xs py-1 ${
                      locale === lang.code
                        ? "text-primary"
                        : "text-muted hover:text-text"
                    }`
              }`}
            >
              {lang.label}
            </button>
          </React.Fragment>
        ))}
      </div>
    );
  }

  // Floating corner overlay (also used if variant is "navbar")
  return (
    <div
      ref={rootRef}
      className="fixed z-[2100] bottom-[max(1.25rem,env(safe-area-inset-bottom,0px))] right-[max(1rem,env(safe-area-inset-right,0px))]"
    >
      {open && (
        <div
          role="dialog"
          aria-label="Choose language"
          className="absolute bottom-full right-0 mb-2 w-[11.5rem] rounded-2xl border border-border bg-elevated shadow-premium overflow-hidden"
        >
          <p className="px-3.5 pt-3 pb-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-muted">
            Language
          </p>
          <ul className="pb-1.5">
            {LANGUAGES.map((lang) => (
              <li key={lang.code}>
                <button
                  type="button"
                  onClick={() => {
                    setLocale(lang.code);
                    setOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 text-left text-sm transition-colors ${
                    locale === lang.code
                      ? "bg-accent-soft text-primary"
                      : "text-text hover:bg-surface"
                  }`}
                >
                  <span className="w-7 text-xs font-semibold tracking-[0.08em]">
                    {lang.label}
                  </span>
                  <span className="font-medium">{lang.name}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={`Language: ${current.name}`}
        className="inline-flex items-center gap-2 h-11 pl-3.5 pr-3.5 rounded-full bg-elevated text-text border border-border shadow-premium hover:border-primary/30 transition-colors"
      >
        <Languages size={16} strokeWidth={2} className="text-primary shrink-0" />
        <span className="text-xs font-semibold tracking-[0.1em]">{current.label}</span>
      </button>
    </div>
  );
};

export default LanguageSwitcher;
