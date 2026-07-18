import React from "react";
import { Link } from "react-router-dom";
import LanguageSwitcher from "./LanguageSwitcher";
import { useTranslation } from "../context/LocaleContext";
import BrandMark from "./BrandMark";

const Footer: React.FC = () => {
  const { t } = useTranslation();
  return (
    <footer
      className="bg-surface border-t border-border pt-12 sm:pt-16 md:pt-20 relative z-10"
      style={{
        paddingBottom: "max(2rem, calc(env(safe-area-inset-bottom, 0px) + 1.5rem))",
      }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-12 lg:gap-14 mb-12 sm:mb-14">
          <div className="sm:col-span-2">
            <BrandMark size="md" className="mb-4 sm:mb-5" />
            <p className="text-muted text-sm leading-relaxed max-w-sm">
              {t("footer.tagline")}
            </p>
          </div>

          <div>
            <h4 className="font-display font-semibold text-xs uppercase tracking-[0.15em] text-text mb-4 sm:mb-5">
              {t("footer.navigation")}
            </h4>
            <ul className="space-y-1">
              {[
                { to: "/", label: t("nav.home") },
                { to: "/games", label: t("nav.games") },
                { to: "/map", label: t("nav.map") },
                { to: "/database", label: t("nav.database") },
                { to: "/blog", label: t("nav.blog") },
              ].map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-muted hover:text-primary transition-colors text-sm font-medium inline-flex min-h-[40px] items-center"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold text-xs uppercase tracking-[0.15em] text-text mb-4 sm:mb-5">
              {t("footer.about")}
            </h4>
            <ul className="space-y-1">
              {[
                { to: "/about", label: t("footer.about") },
                { to: "/contact", label: t("footer.contact") },
                { to: "/donate", label: "Donate" },
                { to: "/terms", label: t("footer.terms") },
                { to: "/privacy", label: t("footer.privacy") },
              ].map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-muted hover:text-primary transition-colors text-sm font-medium inline-flex min-h-[40px] items-center"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-6 sm:pt-8 border-t border-border flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-6">
          <div className="text-muted text-xs font-medium order-2 sm:order-1">
            {t("footer.copyright", { year: String(new Date().getFullYear()) })}
          </div>
          <div className="order-1 sm:order-2">
            <LanguageSwitcher variant="footer" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
