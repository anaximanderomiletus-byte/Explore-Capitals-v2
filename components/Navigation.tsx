
import React, { useState, useEffect, useRef, useLayoutEffect, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Play, Smartphone } from 'lucide-react';
import Button from './Button';
import LanguageSwitcher from './LanguageSwitcher';
import { useLayout } from '../context/LayoutContext';
import { useTranslation } from '../context/LocaleContext';

// Sliding active indicator for nav links
const ActiveNavIndicator: React.FC<{ navLinks: { path: string; label: string }[]; isOverMap: boolean }> = ({ navLinks, isOverMap }) => {
  const location = useLocation();
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0, opacity: 0 });

  const updateIndicator = useCallback(() => {
    const activeLink = document.querySelector(`[data-nav-link="${location.pathname}"]`) as HTMLElement;
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

  const { navbarMode, scrollThreshold } = useLayout();
  const { t } = useTranslation();

  const isHeroMode = navbarMode === 'hero';
  const isMapPage = location.pathname === '/map';
  const isOverMap = isMapPage || location.pathname === '/games/map-dash';

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

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  useEffect(() => {
    if (!isMobileMenuOpen) return;

    const scrollY = window.scrollY;
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.left = '0';
    document.body.style.right = '0';
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.right = '';
      document.body.style.overflow = '';
      window.scrollTo(0, scrollY);
    };
  }, [isMobileMenuOpen]);

  const navLinks = [
    { path: '/', label: t('nav.home') },
    { path: '/games', label: t('nav.games') },
    { path: '/database', label: t('nav.database') },
    { path: '/blog', label: t('nav.blog') },
    { path: '/map', label: t('nav.map') },
    { path: '/about', label: t('nav.about') },
  ];

  const isActive = (path: string) =>
    path === '/' ? location.pathname === '/' : location.pathname.startsWith(path);

  let navClasses = "bg-transparent pb-4";
  let textColorClass = "text-white";

  if (isOverMap) {
    textColorClass = "text-[#1A1C1E]";

    if (isScrolled) {
      navClasses = "bg-white/70 md:bg-white/20 backdrop-blur-xl pb-2.5 shadow-sm";
    } else {
      navClasses = "bg-transparent pb-4";
    }
  } else {
    textColorClass = "text-white";

    if (isScrolled) {
      navClasses = "bg-surface-dark/30 backdrop-blur-xl pb-2.5 shadow-lg";
    } else {
      navClasses = "bg-transparent pb-4";
    }
  }

  if (isMobileMenuOpen) {
    navClasses = "bg-transparent pb-4";
    textColorClass = "text-white";
  }

  const navVisualPaddingTop = isScrolled && !isMobileMenuOpen ? '0.625rem' : '1rem';

  return (
    <>
      <nav
        className={`fixed w-full z-[2000] transition-[transform,background-color,padding,box-shadow] duration-300 ease-out ${
          (isVisible || isMobileMenuOpen) ? 'translate-y-0' : '-translate-y-full'
        } ${navClasses}`}
        style={{ paddingTop: `calc(env(safe-area-inset-top, 0px) + ${navVisualPaddingTop})` }}
      >
        <div className="w-full px-4 sm:px-6 md:px-10 lg:px-12 flex justify-between items-center whitespace-nowrap" style={{ paddingLeft: 'max(env(safe-area-inset-left, 16px), 16px)', paddingRight: 'max(env(safe-area-inset-right, 16px), 16px)' }}>
          {/* Logo */}
          <div className="flex items-center gap-2 shrink-0">
            <Link to="/" className="flex items-center gap-2 group relative z-50 shrink-0">
              <img src={`${import.meta.env.BASE_URL}png/STYLE/explorecapitals-globe-favicon.png`} alt="ExploreCapitals Logo" className="w-7 h-7 object-contain shrink-0" />
              <span className={`font-display font-black text-xl tracking-tighter transition-colors duration-500 ${textColorClass} uppercase drop-shadow-[0_5px_15px_rgba(0,0,0,0.3)] shrink-0`}>
                Explore<span className="bg-clip-text bg-gel-blue [-webkit-text-fill-color:transparent]">Capitals</span>
              </span>
            </Link>
          </div>


          {/* Desktop Nav */}
          <div className="hidden xl:flex items-center gap-6">
            <div className="flex items-center gap-8 relative mr-2">
            {navLinks.map((link) => {
              const active = isActive(link.path);
              const activeColor = isOverMap ? 'text-primary' : 'text-sky-light';

                  return (
                <Link
                  key={link.path}
                  to={link.path}
                  data-nav-link={link.path}
                  className={`font-black text-[10px] uppercase tracking-[0.2em] transition-[color,opacity] duration-75 relative group/link whitespace-nowrap will-change-[opacity] ${
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

          {/* Mobile Toggle */}
          <div className="xl:hidden flex items-center relative z-50 shrink-0">
            <button
              onPointerDown={(e) => {
                e.preventDefault();
                setIsMobileMenuOpen(!isMobileMenuOpen);
              }}
              className="relative w-11 h-11 min-w-[44px] min-h-[44px] flex items-center justify-center touch-manipulation active:opacity-80 transition-opacity duration-75"
              aria-label="Toggle menu"
              style={{ touchAction: 'manipulation', WebkitTapHighlightColor: 'transparent' }}
            >
              <div className="relative w-5 h-4 flex flex-col justify-between pointer-events-none">
                <span className={`block h-[2px] rounded-full transition-all duration-200 origin-center ${
                  isMobileMenuOpen
                    ? 'bg-sky-light rotate-45 translate-y-[7px]'
                    : isOverMap ? 'bg-[#1A1C1E]' : 'bg-white'
                }`} />
                <span className={`block h-[2px] rounded-full transition-all duration-150 ${
                  isOverMap && !isMobileMenuOpen ? 'bg-[#1A1C1E]' : 'bg-white'
                } ${isMobileMenuOpen ? 'opacity-0 scale-0' : 'opacity-100 scale-100'}`} />
                <span className={`block h-[2px] rounded-full transition-all duration-200 origin-center ${
                  isMobileMenuOpen
                    ? 'bg-sky-light -rotate-45 -translate-y-[7px]'
                    : isOverMap ? 'bg-[#1A1C1E]' : 'bg-white'
                }`} />
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-surface-dark z-[1999] xl:hidden flex flex-col pb-8 px-6 sm:px-8 overflow-y-auto overflow-x-hidden ${
          isMobileMenuOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
        style={{
          transition: isMobileMenuOpen
            ? 'opacity 0.2s ease-out'
            : 'opacity 0.15s ease-in',
          WebkitOverflowScrolling: 'touch',
          touchAction: isMobileMenuOpen ? 'pan-y' : 'none',
          height: 'var(--viewport-height, 100dvh)',
          minHeight: 'var(--viewport-height, 100dvh)',
          paddingTop: 'calc(env(safe-area-inset-top, 0px) + 5rem)',
          paddingBottom: 'max(env(safe-area-inset-bottom, 32px), 32px)',
          willChange: 'opacity',
          transform: 'translateZ(0)',
          WebkitBackfaceVisibility: 'hidden',
        }}
        aria-hidden={!isMobileMenuOpen}
      >
        <div className="absolute top-0 right-0 w-full h-[40%] bg-[radial-gradient(ellipse_at_top_right,rgba(0,122,255,0.08)_0%,transparent_70%)] pointer-events-none" />

        <div className="flex flex-col relative z-10">
          {navLinks.map((link, index) => {
            return (
              <Link
                key={link.path}
                to={link.path}
                style={{
                  transform: isMobileMenuOpen ? 'translateY(0)' : 'translateY(14px)',
                  opacity: isMobileMenuOpen ? 1 : 0,
                  transition: isMobileMenuOpen
                    ? `transform 0.35s cubic-bezier(0.25, 1, 0.5, 1) ${index * 0.04}s, opacity 0.25s ease-out ${index * 0.04}s`
                    : 'transform 0.12s ease-in, opacity 0.1s ease-in',
                  WebkitTapHighlightColor: 'transparent',
                }}
                className={`block py-4 text-2xl font-display font-black uppercase tracking-tighter border-b border-white/5 ${
                  isActive(link.path) ? 'text-primary' : 'text-white/60 active:text-white'
                }`}
              >
                {link.label}
              </Link>
            );
          })}

          {/* Play button */}
          <div
            style={{
              transform: isMobileMenuOpen ? 'translateY(0)' : 'translateY(14px)',
              opacity: isMobileMenuOpen ? 1 : 0,
              transition: isMobileMenuOpen
                ? `transform 0.35s cubic-bezier(0.25, 1, 0.5, 1) ${(navLinks.length + 1) * 0.04}s, opacity 0.25s ease-out ${(navLinks.length + 1) * 0.04}s`
                : 'transform 0.12s ease-in, opacity 0.1s ease-in',
            }}
            className="mt-6"
          >
            <Link to="/games">
              <Button variant="primary" size="lg" className="w-full justify-center h-14 text-lg group uppercase">
                {t('nav.play')} <Play className="ml-2 w-5 h-5" fill="currentColor" />
              </Button>
            </Link>
          </div>

          {/* Language */}
          <div
            style={{
              transform: isMobileMenuOpen ? 'translateY(0)' : 'translateY(14px)',
              opacity: isMobileMenuOpen ? 1 : 0,
              transition: isMobileMenuOpen
                ? `transform 0.35s cubic-bezier(0.25, 1, 0.5, 1) ${(navLinks.length + 2) * 0.04}s, opacity 0.25s ease-out ${(navLinks.length + 2) * 0.04}s`
                : 'transform 0.12s ease-in, opacity 0.1s ease-in',
            }}
            className="mt-6 flex justify-center"
          >
            <LanguageSwitcher variant="footer" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Navigation;
