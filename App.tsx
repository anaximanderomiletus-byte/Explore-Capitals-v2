
import React, { useState, useEffect, useRef, Suspense, lazy, startTransition } from 'react';
import { HashRouter as Router, Routes, Route, useLocation, Navigate, useParams } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import Footer from './components/Footer';
import { LayoutProvider, useLayout } from './context/LayoutContext';
import { UserProvider } from './context/UserContext';
import { AuthProvider } from './context/AuthContext';

// Lazy load all pages except Home for instant initial load
// Store import functions for prefetching on hover
const pageImports = {
  games: () => import('./pages/Games'),
  database: () => import('./pages/DatabasePage'),
  map: () => import('./pages/MapPage'),
  about: () => import('./pages/About'),
};

const Games = lazy(pageImports.games);
const DatabasePage = lazy(pageImports.database);
const MapPage = lazy(pageImports.map);
const About = lazy(pageImports.about);
const CapitalQuiz = lazy(() => import('./pages/CapitalQuiz'));
const MapDash = lazy(() => import('./pages/MapDash'));
const FlagFrenzy = lazy(() => import('./pages/FlagFrenzy'));
const KnowYourNeighbor = lazy(() => import('./pages/KnowYourNeighbor'));
const PopulationPursuit = lazy(() => import('./pages/PopulationPursuit'));
const GlobalDetective = lazy(() => import('./pages/GlobalDetective'));
const CapitalConnection = lazy(() => import('./pages/CapitalConnection'));
const RegionRoundup = lazy(() => import('./pages/RegionRoundup'));
const LandmarkLegend = lazy(() => import('./pages/LandmarkLegend'));
const CountryExploration = lazy(() => import('./pages/CountryExploration'));
const CountryDetail = lazy(() => import('./pages/CountryDetail'));
const Settings = lazy(() => import('./pages/Settings'));
const Profile = lazy(() => import('./pages/Profile'));
const Auth = lazy(() => import('./pages/Auth'));
const AuthAction = lazy(() => import('./pages/AuthAction'));
const Loyalty = lazy(() => import('./pages/Loyalty'));
const Terms = lazy(() => import('./pages/Terms'));

// Prefetch helper - call on hover to preload page chunks
export const prefetchPage = (page: keyof typeof pageImports) => {
  const importFn = pageImports[page];
  if (importFn) {
    importFn(); // Triggers the import, browser will cache it
  }
};

// Heavy routes that show a full-screen loader
const HEAVY_ROUTES = ['/map', '/games/map-dash', '/database', '/expedition'];

// Loading fallback - clean, minimal spinner for page content
const PageLoader = () => (
  <div className="flex-grow flex flex-col items-center justify-center bg-[#0F172A] min-h-[60vh]">
    <div className="relative flex flex-col items-center gap-4">
      <div 
        className="w-10 h-10 rounded-full border-sky/20 border-t-sky"
        style={{ 
          borderWidth: '3px',
          borderStyle: 'solid',
          animation: 'spin 0.7s linear infinite'
        }} 
      />
      <p className="text-white/30 text-[9px] font-black uppercase tracking-[0.25em]">
        Loading
      </p>
    </div>
  </div>
);

// Full-screen loading overlay for heavy routes - appears INSTANTLY
const FullScreenLoader = ({ isVisible, isHeavyRoute }: { isVisible: boolean; isHeavyRoute: boolean }) => {
  // Don't show for light routes
  if (!isVisible) return null;
  
  return (
    <div 
      className={`fixed inset-0 z-[1500] flex items-center justify-center transition-opacity duration-150 ${
        isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
      style={{ 
        backgroundColor: 'rgba(15, 23, 42, 0.92)',
        backdropFilter: 'blur(4px)',
        WebkitBackdropFilter: 'blur(4px)'
      }}
    >
      <div className="flex flex-col items-center gap-4">
        <div 
          className="w-12 h-12 rounded-full border-sky/20 border-t-sky"
          style={{ 
            borderWidth: '3px',
            borderStyle: 'solid',
            animation: 'spin 0.7s linear infinite'
          }} 
        />
        {isHeavyRoute && (
          <p className="text-white/40 text-[10px] font-black uppercase tracking-[0.3em] animate-pulse">
            Loading...
          </p>
        )}
      </div>
    </div>
  );
};

/**
 * ScrollToTop - Instant scroll on route change
 */
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as any });
  }, [pathname]);
  return null;
};

/**
 * PageWrapper - Fast fade-in animation for page content
 */
const PageWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.2, ease: "easeOut" }}
    className="flex-grow flex flex-col w-full overflow-x-hidden"
  >
    {children}
  </motion.div>
);

const AppContent: React.FC = () => {
  const location = useLocation();
  const [isNavigating, setIsNavigating] = useState(false);
  const [targetRoute, setTargetRoute] = useState('');
  const prevPathRef = useRef(location.pathname);
  const loadingTimeoutRef = useRef<number | null>(null);
  const hideTimeoutRef = useRef<number | null>(null);
  
  // Check if current target is a heavy route
  const isHeavyRoute = HEAVY_ROUTES.some(route => targetRoute.startsWith(route));
  
  // Track navigation - show loader IMMEDIATELY for heavy routes
  useEffect(() => {
    if (prevPathRef.current !== location.pathname) {
      const newPath = location.pathname;
      const isHeavy = HEAVY_ROUTES.some(route => newPath.startsWith(route));
      
      // Clear any existing timers
      if (loadingTimeoutRef.current) clearTimeout(loadingTimeoutRef.current);
      if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
      
      // For heavy routes, show loader immediately
      if (isHeavy) {
        setTargetRoute(newPath);
        setIsNavigating(true);
        
        // Hide after content should be loaded
        hideTimeoutRef.current = window.setTimeout(() => {
          setIsNavigating(false);
        }, 600); // Give heavy pages time to mount
      } else {
        // For light routes, brief flash if needed
        setTargetRoute(newPath);
        setIsNavigating(true);
        
        hideTimeoutRef.current = window.setTimeout(() => {
          setIsNavigating(false);
        }, 100);
      }
      
      prevPathRef.current = newPath;
    }
    
    return () => {
      if (loadingTimeoutRef.current) clearTimeout(loadingTimeoutRef.current);
      if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
    };
  }, [location.pathname]);
  
  // Aggressive preloading - start early for snappy navigation
  useEffect(() => {
    // Preload immediately after first paint
    const timer = setTimeout(() => {
      const preloadAll = () => {
        // Preload in priority order
        pageImports.games();
        setTimeout(() => pageImports.map(), 100);
        setTimeout(() => pageImports.database(), 200);
        setTimeout(() => pageImports.about(), 300);
      };

      if ('requestIdleCallback' in window) {
        (window as any).requestIdleCallback(preloadAll, { timeout: 2000 });
      } else {
        preloadAll();
      }
    }, 800); // Start preloading sooner
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <div className="min-h-[100dvh] flex flex-col bg-[#0F172A] overflow-x-hidden relative">
      <ScrollToTop />
      
      {/* Navigation is ALWAYS rendered and interactive - never blocked by loading */}
      <Navigation />
      
      {/* Loading overlay - below navbar (z-1500) so navbar stays interactive */}
      <FullScreenLoader isVisible={isNavigating} isHeavyRoute={isHeavyRoute} />
      
      {/* Page content area */}
      <div className="flex-grow flex flex-col relative w-full">
        <Suspense fallback={<PageLoader />}>
          <AnimatePresence mode="wait" initial={false}>
            <div key={location.pathname}>
            <Routes location={location}>
              <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
              <Route path="/games" element={<PageWrapper><Games /></PageWrapper>} />
              <Route path="/games/capital-quiz" element={<PageWrapper><CapitalQuiz /></PageWrapper>} />
              <Route path="/games/map-dash" element={<PageWrapper><MapDash /></PageWrapper>} />
              <Route path="/games/flag-frenzy" element={<PageWrapper><FlagFrenzy /></PageWrapper>} />
              <Route path="/games/know-your-neighbor" element={<PageWrapper><KnowYourNeighbor /></PageWrapper>} />
              <Route path="/games/population-pursuit" element={<PageWrapper><PopulationPursuit /></PageWrapper>} />
              <Route path="/games/global-detective" element={<PageWrapper><GlobalDetective /></PageWrapper>} />
              <Route path="/games/capital-connection" element={<PageWrapper><CapitalConnection /></PageWrapper>} />
              <Route path="/games/region-roundup" element={<PageWrapper><RegionRoundup /></PageWrapper>} />
              <Route path="/games/landmark-legend" element={<PageWrapper><LandmarkLegend /></PageWrapper>} />
              <Route path="/database" element={<PageWrapper><DatabasePage /></PageWrapper>} />
              <Route path="/directory" element={<DirectoryRedirect />} />
              <Route path="/country/:id" element={<PageWrapper><CountryDetail /></PageWrapper>} />
              <Route path="/map" element={<PageWrapper><MapPage /></PageWrapper>} />
              <Route path="/about" element={<PageWrapper><About /></PageWrapper>} />
              <Route path="/expedition/:id" element={<PageWrapper><CountryExploration /></PageWrapper>} />
              <Route path="/explore/:id" element={<ExploreRedirect />} />
              <Route path="/profile" element={<PageWrapper><Profile /></PageWrapper>} />
              <Route path="/settings" element={<PageWrapper><Settings /></PageWrapper>} />
              <Route path="/auth" element={<PageWrapper><Auth /></PageWrapper>} />
              <Route path="/auth-action" element={<PageWrapper><AuthAction /></PageWrapper>} />
              <Route path="/reset-password" element={<PageWrapper><AuthAction /></PageWrapper>} />
              <Route path="/loyalty" element={<PageWrapper><Loyalty /></PageWrapper>} />
              <Route path="/terms" element={<PageWrapper><Terms /></PageWrapper>} />
            </Routes>
            </div>
          </AnimatePresence>
        </Suspense>
      </div>
      <ConditionalFooter />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <UserProvider>
        <LayoutProvider>
          <Router>
            <AppContent />
          </Router>
        </LayoutProvider>
      </UserProvider>
    </AuthProvider>
  );
};

const ExploreRedirect: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  return <Navigate to={{ pathname: `/expedition/${id}`, search: location.search }} replace />;
};

const DirectoryRedirect: React.FC = () => {
  return <Navigate to="/database" replace />;
};

const ConditionalFooter: React.FC = () => {
  const location = useLocation();
  const { isFooterHidden } = useLayout();
  
  // Always hide on the map page, but otherwise respect component-level overrides
  const isMap = location.pathname === '/map';
  
  if (isMap || isFooterHidden) return null;
  
  return <Footer />;
};

export default App;
