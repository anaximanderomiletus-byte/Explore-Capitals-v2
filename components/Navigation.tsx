
import React, { useState, useEffect, useRef, useLayoutEffect, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, Smartphone, X } from 'lucide-react';
import { useLayout } from '../context/LayoutContext';
import { useTranslation } from '../context/LocaleContext';

// Sliding active indicator for nav links
const ActiveNavIndicator: React.FC<{ navLinks: { path: string; label: string }[]; isOverMap: boolean }> = ({ navLinks, isOverMap }) => {
  const location = useLocation();
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0, opacity: 0 });

  const updateIndicator = useCallback(() => {
    // Match the same way isActive does: exact for "/", startsWith for others
    const activeLink = navLinks.reduce((found: HTMLElement | null, link) => {
      if (found) return found;
      const matches = link.path === '/'
        ? location.pathname === '/'
        : location.pathname.startsWith(link.path);
      return matches ? (document.querySelector(`[data-nav-link="${link.path}"]`) as HTMLElement | null) : null;
    }, null as HTMLElement | null);
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
      setIndicatorStyle(prev => ({ ...prev, opacity: 0 }));
    }
  }, [location.pathname]);

  useLayoutEffect(() => {
    requestAnimationFrame(updateIndicator);
  }, [updateIndicator]);

  useEffect(() => {
    window.addEventListener('resize', updateIndicator);
    return () => window.removeEventListener('resize', updateIndicator);
  }, [updateIndicator]);

  return (
    <div
      className={`absolute -bottom-1.5 h-0.5 rounded-full transition-all duration-250 ease-[cubic-bezier(0.4,0,0.2,1)] ${isOverMap ? 'bg-primary' : 'bg-sky-light'}`}
      style={{
        left: indicatorStyle.left,
        width: indicatorStyle.width,
        opacity: indicatorStyle.opacity,
        transform: 'translateZ(0)',
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

  const isMapPage = location.pathname === '/map';
  const isOverMap = isMapPage || location.pathname === '/games/map-dash';

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => { document.body.style.overflow = prevOverflow; };
    }
  }, [isMobileMenuOpen]);

  useEffect(() => {
    let rafId = 0;
    const handleScroll = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        rafId = 0;
        const currentScrollY = window.scrollY;

        if (currentScrollY > lastScrollY.current && currentScrollY > 50) {
          setIsVisible(false);
        } else {
          setIsVisible(true);
        }

        setIsScrolled(currentScrollY > scrollThreshold);
        lastScrollY.current = currentScrollY;
      });
    };

    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [scrollThreshold]);

  const navLinks = [
    { path: '/', label: t('nav.home') },
    { path: '/database', label: t('nav.database') },
    { path: '/games', label: t('nav.games') },
    { path: '/map', label: t('nav.map') },
    { path: '/blog', label: t('nav.blog') },
  ];

  const isActive = (path: string) =>
    path === '/' ? location.pathname === '/' : location.pathname.startsWith(path);

  let navClasses = "bg-transparent pb-4";
  let textColorClass = "text-white";

  if (isOverMap) {
    textColorClass = "text-[#1A1C1E]";
    navClasses = isScrolled
      ? "bg-white/70 md:bg-white/20 backdrop-blur-xl pb-2.5 shadow-sm"
      : "bg-transparent pb-4";
  } else {
    textColorClass = "text-white";
    navClasses = isScrolled
      ? "bg-surface-dark/30 backdrop-blur-xl pb-2.5 shadow-lg"
      : "bg-transparent pb-4";
  }

  const navVisualPaddingTop = isScrolled ? '0.625rem' : '1rem';

  return (
    <>
    <nav
      className={`fixed w-full z-[2000] transition-[transform,background-color,padding,box-shadow] duration-300 ease-out ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      } ${navClasses}`}
      style={{ paddingTop: `calc(env(safe-area-inset-top, 0px) + ${navVisualPaddingTop})` }}
    >
      <div className="w-full px-4 sm:px-6 md:px-10 lg:px-12 flex justify-between items-center whitespace-nowrap" style={{ paddingLeft: 'max(env(safe-area-inset-left, 16px), 16px)', paddingRight: 'max(env(safe-area-inset-right, 16px), 16px)' }}>
        {/* Logo */}
        <div className="flex items-center gap-2 shrink-0">
          <Link to="/" className="flex items-center gap-2 group shrink-0">
            <img src={`${import.meta.env.BASE_URL}png/STYLE/explorecapitals-globe-favicon.png`} alt="ExploreCapitals Logo" className="w-7 h-7 object-contain shrink-0" />
            <span className={`font-display font-black text-xl tracking-tighter transition-colors duration-500 ${textColorClass} uppercase drop-shadow-[0_5px_15px_rgba(0,0,0,0.3)] shrink-0 hidden sm:inline`}>
              Explore<span className="bg-clip-text bg-gel-blue [-webkit-text-fill-color:transparent]">Capitals</span>
            </span>
          </Link>
        </div>

        {/* Desktop Nav Links — lg+ only */}
        <div className="hidden lg:flex items-center gap-3 sm:gap-6">
          <div className="flex items-center gap-4 sm:gap-8 relative">
            {navLinks.map((link) => {
              const active = isActive(link.path);
              const activeColor = isOverMap ? 'text-primary' : 'text-sky-light';

              return (
                <Link
                  key={link.path}
                  to={link.path}
                  data-nav-link={link.path}
                  className={`font-black text-[9px] sm:text-[10px] uppercase tracking-[0.15em] sm:tracking-[0.2em] transition-[color,opacity] duration-75 relative group/link whitespace-nowrap will-change-[opacity] ${
                    active
                      ? activeColor
                      : `${textColorClass} opacity-60 hover:opacity-100 ${isOverMap ? 'hover:text-primary' : ''}`
                  }`}
                  style={{ transform: 'translateZ(0)' }}
                >
                  {link.label}
                  <div
                    className={`absolute -bottom-1.5 left-0 right-0 h-0.5 origin-center transition-transform duration-150 ease-out ${
                      active
                        ? 'scale-x-0'
                        : `scale-x-0 group-hover/link:scale-x-100 ${isOverMap ? 'bg-primary/40' : 'bg-sky-light/50'}`
                    }`}
                  />
                </Link>
              );
            })}
            <ActiveNavIndicator navLinks={navLinks} isOverMap={isOverMap} />
          </div>
          <div className={`flex items-center gap-2 shrink-0 border-l pl-5 text-[10px] font-black uppercase tracking-[0.15em] ${isOverMap ? 'text-[#1A1C1E]/50 border-[#1A1C1E]/20' : 'text-white/40 border-white/10'}`}>
            <Smartphone size={14} />
            <span>{t('nav.appSoon')}</span>
          </div>
        </div>

        {/* Hamburger — mobile/tablet only */}
        <button
          type="button"
          onClick={() => setIsMobileMenuOpen(true)}
          aria-label="Open menu"
          className={`lg:hidden ${textColorClass} p-2 -mr-2 transition-opacity hover:opacity-70`}
        >
          <Menu size={26} strokeWidth={2.5} />
        </button>
      </div>
    </nav>

    {/* Mobile/Tablet Drawer */}
    {isMobileMenuOpen && (
      <div className="fixed inset-0 z-[2500] lg:hidden">
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/70 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setIsMobileMenuOpen(false)}
        />
        {/* Panel */}
        <div
          className="absolute top-0 right-0 bottom-0 w-full max-w-sm bg-[#0F172A] border-l border-white/10 flex flex-col animate-in slide-in-from-right duration-300 shadow-[-20px_0_60px_rgba(0,0,0,0.5)]"
          style={{
            paddingTop: `calc(env(safe-area-inset-top, 0px) + 1rem)`,
            paddingBottom: `calc(env(safe-area-inset-bottom, 0px) + 1rem)`,
          }}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 pb-6 border-b border-white/10">
            <Link
              to="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-2"
            >
              <img
                src={`${import.meta.env.BASE_URL}png/STYLE/explorecapitals-globe-favicon.png`}
                alt="ExploreCapitals"
                className="w-7 h-7 object-contain"
              />
              <span className="font-display font-black text-lg tracking-tighter text-white uppercase">
                Explore<span className="bg-clip-text bg-gel-blue [-webkit-text-fill-color:transparent]">Capitals</span>
              </span>
            </Link>
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(false)}
              aria-label="Close menu"
              className="text-white p-2 -mr-2 transition-opacity hover:opacity-70"
            >
              <X size={26} strokeWidth={2.5} />
            </button>
          </div>

          {/* Links */}
          <div className="flex flex-col p-4 gap-1 flex-1">
            {navLinks.map((link) => {
              const active = isActive(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block px-4 py-4 rounded-xl font-black text-sm uppercase tracking-[0.25em] transition-colors ${
                    active
                      ? 'bg-sky/15 text-sky-light border border-sky/30'
                      : 'text-white/70 hover:bg-white/5 hover:text-white border border-transparent'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Footer */}
          <div className="mt-auto px-6 pt-6 border-t border-white/10">
            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.25em] text-white/40">
              <Smartphone size={14} />
              <span>{t('nav.appSoon')}</span>
            </div>
          </div>
        </div>
      </div>
    )}
  </>
  );
};

export default Navigation;
