
import React, { useState, useEffect, useRef, useLayoutEffect, useCallback } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { User as UserIcon, LogOut, ChevronRight, Play } from 'lucide-react';
import Button from './Button';
import { useLayout } from '../context/LayoutContext';
import { useAuth } from '../context/AuthContext';
import { useUser } from '../context/UserContext';
import { getAvatarById } from '../constants/avatars';
import AccountMenu from './AccountMenu';
import ConfirmationModal from './ConfirmationModal';

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
  
  // Update on mount and when pathname changes
  useLayoutEffect(() => {
    // Small delay to ensure DOM is ready
    requestAnimationFrame(updateIndicator);
  }, [updateIndicator]);
  
  // Update on resize
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


// Mobile Profile Link for Signed In Users
const MobileProfileLinkSignedIn: React.FC<{
  authUser: any;
  user: any;
  avatar: any;
  onClose: () => void;
  onSignOut: () => void;
}> = ({ authUser, user, avatar, onClose, onSignOut }) => {
  const { loyaltyProgress } = useUser();
  const initials = (authUser?.displayName || user?.name)?.[0]?.toUpperCase() || 'E';

  return (
    <div className="space-y-1">
      {/* Profile Link */}
      <button
        onClick={onClose}
        className="flex items-center gap-4 py-4 border-b border-white/5 group w-full text-left"
        style={{ WebkitTapHighlightColor: 'transparent' }}
      >
        {/* Avatar */}
        <div className={`relative shrink-0 w-11 h-11 rounded-xl ${avatar ? avatar.color : 'bg-gel-blue'} flex items-center justify-center shadow-lg border border-white/30 overflow-hidden`}>
          {avatar ? (
            <div className="text-white">{React.cloneElement(avatar.icon as React.ReactElement, { size: 22 })}</div>
          ) : (authUser?.photoURL || user?.photoURL)?.startsWith('http') ? (
            <img src={authUser?.photoURL || user?.photoURL} alt="avatar" className="w-full h-full object-cover" />
          ) : (
            <span className="text-base font-black text-white">{initials}</span>
          )}
          <div className="absolute inset-0 bg-glossy-gradient opacity-40 pointer-events-none" />
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <h3 className="text-xl font-display font-black text-white/90 truncate tracking-tight group-active:text-sky-light transition-colors">
            {authUser?.displayName || user?.name}
          </h3>
          <p className="text-[10px] font-bold uppercase tracking-wider text-white/40">
            {loyaltyProgress.tier} • {loyaltyProgress.points.toLocaleString()} pts
          </p>
        </div>

        <ChevronRight size={20} className="text-white/30 group-active:text-sky-light group-active:translate-x-1 transition-all shrink-0" />
      </button>

      {/* Sign Out */}
      <button
        onClick={onSignOut}
        className="flex items-center gap-3 py-3 text-red-400/80 hover:text-red-400 transition-colors w-full"
      >
        <LogOut size={18} />
        <span className="text-sm font-bold uppercase tracking-wider">Sign Out</span>
      </button>
    </div>
  );
};

// Mobile Profile Link for Signed Out Users
const MobileProfileLinkSignedOut: React.FC<{
  onClose: () => void;
}> = ({ onClose }) => {
  return (
    <button
      onClick={onClose}
      className="flex items-center gap-4 py-4 border-b border-white/5 group w-full text-left"
      style={{ WebkitTapHighlightColor: 'transparent' }}
    >
      {/* Icon */}
      <div className="relative shrink-0 w-11 h-11 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center overflow-hidden group-active:border-sky/40 group-active:bg-sky/10 transition-all">
        <UserIcon size={22} className="text-white/60 group-active:text-sky-light transition-colors" />
        <div className="absolute inset-0 bg-glossy-gradient opacity-20 pointer-events-none" />
      </div>

      {/* Text */}
      <div className="flex-1">
        <h3 className="text-xl font-display font-black text-white/60 tracking-tight group-active:text-sky-light transition-colors uppercase">
          Sign In
        </h3>
        <p className="text-[10px] font-bold uppercase tracking-wider text-white/30">
          Track progress & earn rewards
        </p>
      </div>

      <ChevronRight size={20} className="text-white/30 group-active:text-sky-light group-active:translate-x-1 transition-all shrink-0" />
    </button>
  );
};

const Navigation: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showSignOutModal, setShowSignOutModal] = useState(false);
  const lastScrollY = useRef(0);
  const location = useLocation();
  const navigate = useNavigate();
  
  // Auth context for mobile account panel
  const { user: authUser, signOut, loading: authLoading } = useAuth();
  const { user, isAuthenticated, isLoading: userLoading } = useUser();
  const avatar = getAvatarById(authUser?.photoURL || user?.photoURL);
  
  // Use Context for determining navbar mode and threshold
  const { navbarMode, scrollThreshold } = useLayout();
  
  const handleMobileSignOut = async () => {
    setShowSignOutModal(false);
    setIsMobileMenuOpen(false);
    await signOut();
    navigate('/');
  };
  const isHeroMode = navbarMode === 'hero';
  const isMapPage = location.pathname === '/map';
  const isMapDash = location.pathname.includes('/map-dash');
  const isOverMap = isMapPage || isMapDash;

  // Navigation is now instant: Link navigates immediately, and the
  // useEffect watching `location` closes the menu automatically.
  // No delayed navigation — no risk of "cancel" behavior on iOS.

  useEffect(() => {
    let rafId = 0;
    const handleScroll = () => {
      if (rafId) return; // Already scheduled
      rafId = requestAnimationFrame(() => {
        rafId = 0;
        const currentScrollY = window.scrollY;

        // Determine visibility based on scroll direction
        if (currentScrollY > lastScrollY.current && currentScrollY > 50) {
          setIsVisible(false);
        } else {
          setIsVisible(true);
        }

        setIsScrolled(currentScrollY > scrollThreshold);
        lastScrollY.current = currentScrollY;
      });
    };

    // Check initially
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [scrollThreshold]);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  // Lock body scroll when mobile menu is open to prevent background scrolling.
  // Captures scrollY in a closure so cleanup always restores the exact position.
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
    { path: '/', label: 'Home' },
    { path: '/games', label: 'Games' },
    { path: '/database', label: 'Database' },
    { path: '/map', label: 'Map' },
    { path: '/about', label: 'About' },
  ];

  const isActive = (path: string) => location.pathname === path;

  // Navigation Logic:
  // 1. Hero Mode:
  //    - Top: Transparent BG, White Text.
  //    - Scrolled: Transparent BG (content handles bg), Dark Text.
  // 2. Default Mode:
  //    - Top: Transparent BG, Dark Text.
  //    - Scrolled: White/Blur BG, Dark Text.
  
  // Navigation Logic:
  // 1. Transparent by default
  // 2. Adaptive text color based on background (Map = Light background = Dark text)
  // 3. Subtle backdrop blur on scroll for legibility
  
  // Transition is on the <nav> element — navClasses only need visual state.
  // Top padding uses pb-X (bottom only); paddingTop is set via inline style
  // so the nav extends its background into the iOS safe-area at the top.
  let navClasses = "bg-transparent pb-4";
  let textColorClass = "text-white";

  if (isOverMap) {
    textColorClass = "text-[#1A1C1E]"; // Deep dark color for light background

    if (isScrolled) {
      navClasses = "bg-white/70 md:bg-white/20 backdrop-blur-xl pb-2.5 shadow-sm";
    } else {
      navClasses = "bg-transparent pb-4";
    }
  } else {
    // Default Mode (Dark Background Pages)
    textColorClass = "text-white";

    if (isScrolled) {
      navClasses = "bg-surface-dark/30 backdrop-blur-xl pb-2.5 shadow-lg";
    } else {
      navClasses = "bg-transparent pb-4";
    }
  }

  // Mobile menu open overrides - keep nav transparent, only override text color
  if (isMobileMenuOpen) {
    navClasses = "bg-transparent pb-4";
    textColorClass = "text-white";
  }

  // Compute nav top padding: safe-area-inset-top + visual padding
  const navVisualPaddingTop = isScrolled && !isMobileMenuOpen ? '0.625rem' : '1rem';

  // Logic to hide header on Map Page in Landscape mode
  const hideOnMapLandscape = isMapPage && !isMobileMenuOpen;

  return (
    <>
      <nav
        className={`fixed w-full z-[2000] transition-[transform,background-color,padding,box-shadow] duration-300 ease-out ${
          (isVisible || isMobileMenuOpen) ? 'translate-y-0' : '-translate-y-full'
        } ${navClasses} ${hideOnMapLandscape ? '[@media(max-height:620px)]:-translate-y-full' : ''}`}
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
          <div className="hidden lg:flex items-center gap-4">
            <div className="flex items-center gap-8 relative">
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
                  {/* Hover underline - expands from center */}
                  <div 
                    className={`absolute -bottom-1.5 left-0 right-0 h-0.5 origin-center transition-transform duration-150 ease-out ${
                      active 
                        ? 'scale-x-0' // Hide hover underline when active (sliding indicator shows instead)
                        : `scale-x-0 group-hover/link:scale-x-100 ${isOverMap ? 'bg-primary/40' : 'bg-sky-light/50'}`
                    }`} 
                  />
                </Link>
              );
            })}
            {/* Sliding active indicator */}
            <ActiveNavIndicator navLinks={navLinks} isOverMap={isOverMap} />
            </div>
            <Link to="/games">
              <Button variant="primary" size="sm" className="group uppercase text-xs tracking-widest">
                Play Now <Play className="ml-1.5 w-3.5 h-3.5" fill="currentColor" />
              </Button>
            </Link>
            <div className={`flex items-center shrink-0 border-l pl-4 ${isOverMap ? 'border-[#1A1C1E]/20' : 'border-white/10'}`}>
              <AccountMenu isOverMap={isOverMap} />
            </div>
          </div>

          {/* Mobile Toggle - hamburger menu - optimized for instant touch response */}
          <div className="lg:hidden flex items-center relative z-50 shrink-0">
            <button 
              onPointerDown={(e) => {
                // Use pointerdown for instant response on both touch and mouse
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

      {/* Mobile Menu Overlay - Smooth fade in/out */}
      <div
        className={`fixed inset-0 bg-surface-dark z-[1999] lg:hidden flex flex-col pb-8 px-6 sm:px-8 overflow-y-auto overflow-x-hidden ${
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
          transform: 'translateZ(0)', // Force GPU compositing layer
          WebkitBackfaceVisibility: 'hidden',
        }}
        aria-hidden={!isMobileMenuOpen}
      >
        {/* Subtle ambient glow — uses radial-gradient instead of blur filter for performance */}
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
          
          {/* Account Panel - right after nav links */}
          <div
            style={{
              transform: isMobileMenuOpen ? 'translateY(0)' : 'translateY(14px)',
              opacity: isMobileMenuOpen ? 1 : 0,
              transition: isMobileMenuOpen
                ? `transform 0.35s cubic-bezier(0.25, 1, 0.5, 1) ${navLinks.length * 0.04}s, opacity 0.25s ease-out ${navLinks.length * 0.04}s`
                : 'transform 0.12s ease-in, opacity 0.1s ease-in',
            }}
          >
            {isAuthenticated ? (
              <MobileProfileLinkSignedIn
                authUser={authUser}
                user={user}
                avatar={avatar}
                onClose={() => navigate('/profile')}
                onSignOut={() => setShowSignOutModal(true)}
              />
            ) : (
              <MobileProfileLinkSignedOut
                onClose={() => navigate('/auth', { state: { from: location } })}
              />
            )}
          </div>

          {/* Play Now button - right after account */}
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
                Play Now <Play className="ml-2 w-5 h-5" fill="currentColor" />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Sign Out Confirmation Modal */}
      <ConfirmationModal
        isOpen={showSignOutModal}
        onClose={() => setShowSignOutModal(false)}
        onConfirm={handleMobileSignOut}
        title="Sign Out?"
        message="Are you sure you want to end your session? Your progress is safely stored in your account."
        confirmText="SIGN OUT"
        variant="danger"
      />
    </>
  );
};

export default Navigation;
