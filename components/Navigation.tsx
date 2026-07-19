import React, {
  useState,
  useEffect,
  useRef,
  useLayoutEffect,
  useCallback,
} from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useLayout } from "../context/LayoutContext";
import { useTranslation } from "../context/LocaleContext";
import BrandMark from "./BrandMark";
import LanguageSwitcher from "./LanguageSwitcher";

const ActiveNavIndicator: React.FC<{
  navLinks: { path: string; label: string }[];
}> = ({ navLinks }) => {
  const location = useLocation();
  const [indicatorStyle, setIndicatorStyle] = useState({
    left: 0,
    width: 0,
    opacity: 0,
  });

  const updateIndicator = useCallback(() => {
    const activeLink = navLinks.reduce(
      (found: HTMLElement | null, link) => {
        if (found) return found;
        const matches =
          link.path === "/"
            ? location.pathname === "/"
            : location.pathname.startsWith(link.path);
        return matches
          ? (document.querySelector(
              `[data-nav-link="${link.path}"]`,
            ) as HTMLElement | null)
          : null;
      },
      null as HTMLElement | null,
    );
    if (activeLink) {
      const parent = activeLink.parentElement;
      if (parent) {
        const parentRect = parent.getBoundingClientRect();
        const linkRect = activeLink.getBoundingClientRect();
        setIndicatorStyle({
          left: linkRect.left - parentRect.left,
          width: linkRect.width,
          opacity: 1,
        });
      }
    } else {
      setIndicatorStyle((prev) => ({ ...prev, opacity: 0 }));
    }
  }, [location.pathname, navLinks]);

  useLayoutEffect(() => {
    requestAnimationFrame(updateIndicator);
  }, [updateIndicator]);

  useEffect(() => {
    window.addEventListener("resize", updateIndicator);
    return () => window.removeEventListener("resize", updateIndicator);
  }, [updateIndicator]);

  return (
    <div
      className="absolute -bottom-1.5 h-0.5 rounded-full bg-primary transition-all duration-250 ease-[cubic-bezier(0.4,0,0.2,1)]"
      style={{
        left: indicatorStyle.left,
        width: indicatorStyle.width,
        opacity: indicatorStyle.opacity,
        transform: "translateZ(0)",
      }}
    />
  );
};

const Navigation: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const lastScrollY = useRef(0);
  const location = useLocation();

  const { scrollThreshold } = useLayout();
  const { t } = useTranslation();

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prevOverflow;
      };
    }
  }, [isMobileMenuOpen]);

  useEffect(() => {
    let rafId = 0;
    const handleScroll = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        rafId = 0;
        const currentScrollY = window.scrollY;
        const goingDown = currentScrollY > lastScrollY.current;

        // Only auto-hide after a clear scroll, and never on tiny pages
        if (goingDown && currentScrollY > 120) {
          setIsVisible(false);
        } else {
          setIsVisible(true);
        }

        setIsScrolled(currentScrollY > scrollThreshold);
        lastScrollY.current = currentScrollY;
      });
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [scrollThreshold]);

  // Close drawer on resize to desktop nav
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const onChange = () => {
      if (mq.matches) setIsMobileMenuOpen(false);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const navLinks = [
    { path: "/", label: t("nav.home") },
    { path: "/games", label: t("nav.games") },
    { path: "/map", label: t("nav.map") },
    { path: "/database", label: t("nav.database") },
    { path: "/blog", label: t("nav.blog") },
  ];

  const isActive = (path: string) =>
    path === "/"
      ? location.pathname === "/"
      : location.pathname.startsWith(path);

  // Transparent over hero; solid only after scroll
  const navClasses = isScrolled
    ? "bg-elevated/95 backdrop-blur-md pb-2.5 border-b border-border shadow-sm"
    : "bg-transparent pb-3 sm:pb-4";

  const navVisualPaddingTop = isScrolled ? "0.5rem" : "0.75rem";

  // Soft thin highlight so ink stays readable on the globe without a nav background
  const overHeroReadable = !isScrolled
    ? "[text-shadow:0_0.5px_1px_rgba(233,238,243,0.55)]"
    : "";

  return (
    <>
      <nav
        className={`fixed w-full z-[2000] transition-[transform,background-color,padding,box-shadow] duration-300 ease-out ${
          isVisible || isMobileMenuOpen ? "translate-y-0" : "-translate-y-full"
        } ${navClasses}`}
        style={{
          paddingTop: `calc(env(safe-area-inset-top, 0px) + ${navVisualPaddingTop})`,
        }}
      >
        <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10 flex justify-between items-center gap-3">
          <BrandMark
            size="sm"
            showWordmark
            className={`min-h-[44px] ${overHeroReadable}`}
          />

          <div className="hidden lg:flex items-center gap-6 xl:gap-8">
            <div className={`flex items-center gap-5 xl:gap-7 relative ${overHeroReadable}`}>
              {navLinks.map((link) => {
                const active = isActive(link.path);

                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    data-nav-link={link.path}
                    className={`font-semibold text-xs uppercase tracking-[0.12em] transition-colors duration-75 relative group/link whitespace-nowrap py-2 ${
                      active ? "text-primary" : "text-text hover:text-text/80"
                    }`}
                    style={{ transform: "translateZ(0)" }}
                  >
                    {link.label}
                    <div
                      className={`absolute -bottom-0.5 left-0 right-0 h-0.5 origin-center transition-transform duration-150 ease-out bg-primary/50 ${
                        active
                          ? "scale-x-0"
                          : "scale-x-0 group-hover/link:scale-x-100"
                      }`}
                    />
                  </Link>
                );
              })}
              <ActiveNavIndicator navLinks={navLinks} />
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Open menu"
            aria-expanded={isMobileMenuOpen}
            className={`lg:hidden text-text p-2.5 -mr-1.5 min-h-[44px] min-w-[44px] inline-flex items-center justify-center transition-opacity hover:opacity-70 ${overHeroReadable}`}
          >
            <Menu size={24} strokeWidth={2} />
          </button>
        </div>
      </nav>

      <div
        className={`fixed inset-0 z-[2500] lg:hidden ${isMobileMenuOpen ? "pointer-events-auto" : "pointer-events-none"}`}
        aria-hidden={!isMobileMenuOpen}
      >
        <div
          className={`absolute inset-0 bg-text/35 backdrop-blur-sm transition-opacity duration-300 ease-out ${
            isMobileMenuOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setIsMobileMenuOpen(false)}
        />
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className={`absolute top-0 right-0 bottom-0 w-full max-w-[min(100%,22rem)] sm:max-w-sm bg-elevated border-l border-border flex flex-col transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] ${
            isMobileMenuOpen
              ? "translate-x-0 shadow-premium-hover"
              : "translate-x-full shadow-none"
          }`}
          style={{
            paddingTop: `calc(env(safe-area-inset-top, 0px) + 0.75rem)`,
          }}
        >
          <div className="flex items-center justify-between px-5 sm:px-6 pb-5 border-b border-border gap-3">
            <BrandMark size="md" onClick={() => setIsMobileMenuOpen(false)} />
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(false)}
              aria-label="Close menu"
              className="text-text p-2.5 -mr-1.5 min-h-[44px] min-w-[44px] inline-flex items-center justify-center transition-opacity hover:opacity-70"
            >
              <X size={24} strokeWidth={2} />
            </button>
          </div>

          <nav className="flex flex-col p-3 sm:p-4 gap-0.5 flex-1 overflow-y-auto">
            {navLinks.map((link) => {
              const active = isActive(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block px-4 py-3.5 min-h-[48px] rounded-xl font-semibold text-sm uppercase tracking-[0.12em] transition-colors ${
                    active
                      ? "bg-accent-soft text-primary"
                      : "text-muted hover:bg-surface hover:text-text"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div
            className="mt-auto px-5 sm:px-6 pt-5 border-t border-border"
            style={{
              paddingBottom: `calc(env(safe-area-inset-bottom, 0px) + 1.25rem)`,
            }}
          >
            <LanguageSwitcher variant="mobile" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Navigation;
