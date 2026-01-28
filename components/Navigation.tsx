
import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { User as UserIcon, LogOut, ChevronRight } from 'lucide-react';
import Button from './Button';
import { useLayout } from '../context/LayoutContext';
import { useAuth } from '../context/AuthContext';
import { useUser } from '../context/UserContext';
import { getAvatarById } from '../constants/avatars';
import AccountMenu from './AccountMenu';
import ConfirmationModal from './ConfirmationModal';
import { prefetchPage } from '../App';

// Map nav paths to prefetch keys
const prefetchMap: Record<string, 'games' | 'database' | 'map' | 'about'> = {
  '/games': 'games',
  '/database': 'database',
  '/map': 'map',
  '/about': 'about',
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
      <Link
        to="/profile"
        onClick={onClose}
        className="flex items-center gap-4 py-4 border-b border-white/5 group"
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
          <h3 className="text-xl font-display font-black text-white/90 truncate tracking-tight group-hover:text-sky-light transition-colors">
            {authUser?.displayName || user?.name}
          </h3>
          <p className="text-[10px] font-bold uppercase tracking-wider text-white/40">
            {loyaltyProgress.tier} • {loyaltyProgress.points.toLocaleString()} pts
          </p>
        </div>
        
        <ChevronRight size={20} className="text-white/30 group-hover:text-sky-light group-hover:translate-x-1 transition-all shrink-0" />
      </Link>
      
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
  location: any;
}> = ({ onClose, location }) => {
  return (
    <Link
      to="/auth"
      state={{ from: location }}
      onClick={onClose}
      className="flex items-center gap-4 py-4 border-b border-white/5 group"
    >
      {/* Icon */}
      <div className="relative shrink-0 w-11 h-11 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center overflow-hidden group-hover:border-sky/40 group-hover:bg-sky/10 transition-all">
        <UserIcon size={22} className="text-white/60 group-hover:text-sky-light transition-colors" />
        <div className="absolute inset-0 bg-glossy-gradient opacity-20 pointer-events-none" />
      </div>
      
      {/* Text */}
      <div className="flex-1">
        <h3 className="text-xl font-display font-black text-white/60 tracking-tight group-hover:text-sky-light transition-colors uppercase">
          Sign In
        </h3>
        <p className="text-[10px] font-bold uppercase tracking-wider text-white/30">
          Track progress & earn rewards
        </p>
      </div>
      
      <ChevronRight size={20} className="text-white/30 group-hover:text-sky-light group-hover:translate-x-1 transition-all shrink-0" />
    </Link>
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

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Determine visibility based on scroll direction
      // Hide when scrolling down, show when scrolling up
      if (currentScrollY > lastScrollY.current && currentScrollY > 50) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      // Check threshold from context
      setIsScrolled(currentScrollY > scrollThreshold);
      
      lastScrollY.current = currentScrollY;
    };
    
    // Check initially
    handleScroll();
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrollThreshold]);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  // Lock body scroll when mobile menu is open to prevent background scrolling
  useEffect(() => {
    if (isMobileMenuOpen) {
      // Improved iOS scroll lock
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';
    } else {
      // Improved iOS scroll unlock
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
      }
    }
    return () => {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
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
  
  // PERFORMANCE: Use faster transitions for navbar
  let navClasses = "bg-transparent py-4 transition-[padding,background-color] duration-150 ease-out";
  let textColorClass = "text-white"; 
  let logoBgClass = "bg-gel-blue text-white border border-white/40";

  if (isOverMap) {
    textColorClass = "text-[#1A1C1E]";
    logoBgClass = "bg-primary text-white border border-black/5";
    
    if (isScrolled) {
      navClasses = "bg-white/20 backdrop-blur-xl py-2.5 shadow-sm transition-[padding,background-color] duration-150 ease-out";
    } else {
      navClasses = "bg-transparent py-4 transition-[padding,background-color] duration-150 ease-out";
    }
  } else {
    textColorClass = "text-white";
    logoBgClass = "bg-gel-blue text-white border border-white/40";
    
    if (isScrolled) {
      navClasses = "bg-surface-dark/30 backdrop-blur-xl py-2.5 shadow-lg transition-[padding,background-color] duration-150 ease-out";
    } else {
      navClasses = "bg-transparent py-4 transition-[padding,background-color] duration-150 ease-out";
    }
  }

  if (isMobileMenuOpen) {
    navClasses = "bg-transparent py-4";
    textColorClass = "text-white";
    logoBgClass = "bg-primary text-white";
  }

  // Logic to hide header on Map Page in Landscape mode
  const hideOnMapLandscape = isMapPage && !isMobileMenuOpen;

  return (
    <>
      <nav 
        className={`fixed w-full z-[2000] transition-all duration-500 ease-out ${
          (isVisible || isMobileMenuOpen) ? 'translate-y-0' : '-translate-y-full'
        } ${navClasses} ${hideOnMapLandscape ? '[@media(max-height:620px)]:-translate-y-full' : ''}`}
      >
        <div className="w-full px-6 md:px-10 lg:px-12 flex justify-between items-center whitespace-nowrap">
          {/* Logo */}
          <div className="flex items-center gap-2 shrink-0">
            <Link to="/" className="flex items-center gap-2 group relative z-50 shrink-0">
              <div className={`w-7 h-7 rounded-full transition-all duration-500 relative overflow-hidden flex items-center justify-center shrink-0 ${logoBgClass}`}>
                <img src={`${import.meta.env.BASE_URL}logo.png`} alt="ExploreCapitals Logo" className="w-full h-full object-contain scale-[1.5] relative z-10 drop-shadow-md" />
                <div className="absolute inset-0 bg-glossy-gradient opacity-50" />
              </div>
              <span className={`font-display font-black text-xl tracking-tighter transition-colors duration-150 ${textColorClass} uppercase drop-shadow-[0_5px_15px_rgba(0,0,0,0.3)] shrink-0`}>
                Explore<span className="bg-clip-text bg-gel-blue [-webkit-text-fill-color:transparent]">Capitals</span>
              </span>
            </Link>
          </div>


          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            <div className="flex items-center gap-8">
            {navLinks.map((link) => {
              const active = isActive(link.path);
              const activeColor = isOverMap ? 'text-primary' : 'text-sky-light';
              const glowClass = isOverMap ? '' : '';
              const prefetchKey = prefetchMap[link.path];
              
              return (
                <Link 
                  key={link.path} 
                  to={link.path}
                  onMouseEnter={() => prefetchKey && prefetchPage(prefetchKey)}
                  onTouchStart={() => prefetchKey && prefetchPage(prefetchKey)}
                  className={`font-black text-[10px] uppercase tracking-[0.2em] transition-opacity duration-150 ease-out relative group/link whitespace-nowrap ${
                    active 
                      ? `${activeColor} ${glowClass}` 
                      : `${textColorClass} opacity-60 hover:opacity-100 ${isOverMap ? 'hover:text-primary' : ''}`
                  }`}
                  style={{ willChange: 'opacity' }}
                >
                  {link.label}
                  <div 
                    className={`absolute -bottom-1.5 left-0 h-0.5 transition-transform duration-150 ease-out origin-left ${
                      isOverMap ? 'bg-primary' : 'bg-sky-light'
                    } ${active ? 'scale-x-100' : 'scale-x-0 group-hover/link:scale-x-100'}`} 
                    style={{ willChange: 'transform', width: '100%' }}
                  />
                </Link>
              );
            })}
            </div>
            <div className="flex items-center gap-3 border-l border-white/10 pl-8 shrink-0">
              <Link to="/games" className="shrink-0">
                <Button variant="primary" size="sm" className="h-9 px-5 border border-white/20 text-[11px] uppercase tracking-wider whitespace-nowrap">
                  Play Now
                </Button>
              </Link>
              <AccountMenu />
            </div>
          </div>

          {/* Mobile Toggle - hamburger menu */}
          <div className="lg:hidden flex items-center relative z-50 shrink-0">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              onTouchEnd={(e) => {
                e.preventDefault();
                setIsMobileMenuOpen(!isMobileMenuOpen);
              }}
              className="relative w-10 h-10 flex items-center justify-center active:scale-95"
              style={{ touchAction: 'manipulation', WebkitTapHighlightColor: 'transparent', willChange: 'transform' }}
              aria-label="Toggle menu"
            >
              <div className="relative w-5 h-3 flex flex-col justify-between">
                <span 
                  className={`block h-[2px] rounded-full transition-transform duration-150 ease-out origin-center ${
                    isMobileMenuOpen 
                      ? 'bg-sky-light rotate-45 translate-y-[5px]' 
                      : isOverMap ? 'bg-[#1A1C1E]' : 'bg-white'
                  }`} 
                  style={{ willChange: 'transform' }}
                />
                <span 
                  className={`block h-[2px] rounded-full transition-opacity duration-100 ease-out ${
                    isMobileMenuOpen ? 'opacity-0' : isOverMap ? 'bg-[#1A1C1E]' : 'bg-white'
                  }`}
                  style={{ willChange: 'opacity' }}
                />
                <span 
                  className={`block h-[2px] rounded-full transition-transform duration-150 ease-out origin-center ${
                    isMobileMenuOpen 
                      ? 'bg-sky-light -rotate-45 -translate-y-[5px]' 
                      : isOverMap ? 'bg-[#1A1C1E]' : 'bg-white'
                  }`}
                  style={{ willChange: 'transform' }}
                />
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay - Hidden completely when closed to prevent click blocking */}
      <div 
        className={`fixed inset-0 bg-surface-dark z-[1999] lg:hidden flex flex-col pt-20 pb-8 px-8 overflow-y-auto overflow-x-hidden ${
          isMobileMenuOpen 
            ? 'translate-x-0 opacity-100 visible' 
            : 'translate-x-full opacity-0 invisible pointer-events-none'
        }`}
        style={{ 
          WebkitOverflowScrolling: 'touch',
          touchAction: isMobileMenuOpen ? 'pan-y' : 'none',
          willChange: 'transform, opacity',
          transition: 'transform 200ms ease-out, opacity 150ms ease-out, visibility 0ms linear ' + (isMobileMenuOpen ? '0ms' : '200ms')
        }}
        aria-hidden={!isMobileMenuOpen}
      >
        {/* Background blobs for mobile menu */}
        <div className="absolute top-[-10%] right-[-10%] w-[80%] h-[50%] bg-primary/20 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="flex flex-col relative z-10">
          {navLinks.map((link, index) => {
            const prefetchKey = prefetchMap[link.path];
            return (
              <Link 
                key={link.path} 
                to={link.path}
                onTouchStart={() => prefetchKey && prefetchPage(prefetchKey)}
                style={{
                  transform: isMobileMenuOpen ? 'translateX(0)' : 'translateX(100px)',
                  opacity: isMobileMenuOpen ? 1 : 0,
                  transition: `transform 0.5s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.06}s, opacity 0.4s ease ${index * 0.06}s`,
                }}
                className={`block py-4 text-2xl font-display font-black uppercase tracking-tighter border-b border-white/5 ${
                  isActive(link.path) ? 'text-primary' : 'text-white/60 hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          
          {/* Account Panel - right after nav links */}
          <div 
            style={{
              transform: isMobileMenuOpen ? 'translateX(0)' : 'translateX(100px)',
              opacity: isMobileMenuOpen ? 1 : 0,
              transition: `transform 0.5s cubic-bezier(0.16, 1, 0.3, 1) ${navLinks.length * 0.06}s, opacity 0.4s ease ${navLinks.length * 0.06}s`,
            }}
          >
            {isAuthenticated ? (
              <MobileProfileLinkSignedIn 
                authUser={authUser}
                user={user}
                avatar={avatar}
                onClose={() => setIsMobileMenuOpen(false)}
                onSignOut={() => setShowSignOutModal(true)}
              />
            ) : (
              <MobileProfileLinkSignedOut 
                onClose={() => setIsMobileMenuOpen(false)}
                location={location}
              />
            )}
          </div>
          
          {/* Play Now button - right after account */}
          <div 
            style={{
              transform: isMobileMenuOpen ? 'translateX(0)' : 'translateX(100px)',
              opacity: isMobileMenuOpen ? 1 : 0,
              transition: `transform 0.5s cubic-bezier(0.16, 1, 0.3, 1) ${(navLinks.length + 1) * 0.06}s, opacity 0.4s ease ${(navLinks.length + 1) * 0.06}s`,
            }}
            className="mt-6"
          >
            <Link to="/games">
              <Button variant="primary" size="lg" className="w-full justify-center h-14 text-lg font-black uppercase tracking-widest">
                Play Now
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
