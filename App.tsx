
import React, { useState, useEffect, useRef, Suspense, lazy, useTransition, useCallback } from 'react';
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

// Loading fallback - visible indicator that page is loading
const PageLoader = () => (
  <div className="flex-grow flex flex-col items-center justify-center bg-[#0F172A] min-h-[50vh] gap-4">
    <div className="relative">
      <div 
        className="w-12 h-12 rounded-full border-sky/10 border-t-sky animate-spin" 
        style={{ 
          borderWidth: '3px',
          borderStyle: 'solid',
          animationDuration: '0.8s'
        }} 
      />
    </div>
    <p className="text-white/20 text-[10px] font-black uppercase tracking-[0.3em] animate-pulse">
      Loading...
    </p>
  </div>
);

// Navigation loading overlay - shows during route transitions
const NavigationLoader = ({ isVisible }: { isVisible: boolean }) => (
  <AnimatePresence>
    {isVisible && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.15 }}
        className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#0F172A]/80 backdrop-blur-sm pointer-events-none"
      >
        <div className="relative">
          <div className="w-12 h-12 rounded-full border-sky/10 border-t-sky animate-spin" 
               style={{ borderWidth: '3px', borderStyle: 'solid' }} />
        </div>
      </motion.div>
    )}
  </AnimatePresence>
);

const SKIP_TRANSITION_ROUTES = ['/auth', '/profile', '/settings', '/loyalty', '/database', '/directory'];

/**
 * ScrollToTop
 * Ensures every page navigation starts at the top instantly.
 */
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    // Immediate scroll for faster feeling on Safari
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as any });
    
    // Fallback for some mobile browsers
    const timer = setTimeout(() => {
      window.scrollTo(0, 0);
    }, 0);
    return () => clearTimeout(timer);
  }, [pathname]);
  return null;
};

/**
 * PageWrapper
 * Provides a standard animation for page transitions.
 */
const PageWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="flex-grow flex flex-col w-full overflow-x-hidden"
    >
      {children}
    </motion.div>
  );
};

const AppContent: React.FC = () => {
  const location = useLocation();
  const [isNavigating, setIsNavigating] = useState(false);
  const prevPathRef = useRef(location.pathname);
  const navigationTimerRef = useRef<number | null>(null);
  
  // Heavy routes that need longer loading indication
  const heavyRoutes = ['/map', '/games/map-dash', '/database'];
  
  // Track navigation loading state
  useEffect(() => {
    // Only show loader for actual navigation, not initial load
    if (prevPathRef.current !== location.pathname) {
      // Clear any existing timer
      if (navigationTimerRef.current) {
        clearTimeout(navigationTimerRef.current);
      }
      
      // Check if navigating to a heavy route
      const isHeavyRoute = heavyRoutes.some(route => location.pathname.startsWith(route));
      
      setIsNavigating(true);
      
      // Show loader longer for heavy routes to cover Suspense loading
      const hideDelay = isHeavyRoute ? 300 : 150;
      
      navigationTimerRef.current = window.setTimeout(() => {
        setIsNavigating(false);
        navigationTimerRef.current = null;
      }, hideDelay);
      
      prevPathRef.current = location.pathname;
    }
    
    return () => {
      if (navigationTimerRef.current) {
        clearTimeout(navigationTimerRef.current);
      }
    };
  }, [location.pathname]);
  
  // Preload key pages after initial render for faster subsequent navigation
  useEffect(() => {
    // Wait for initial paint, then start preloading
    const timer = setTimeout(() => {
      // Preload in order of likely navigation
      // Using requestIdleCallback if available for even better performance
      const preload = () => {
        pageImports.games();
        pageImports.database();
        pageImports.map();
        pageImports.about();
      };

      if ('requestIdleCallback' in window) {
        (window as any).requestIdleCallback(preload);
      } else {
        preload();
      }
    }, 1500); // Slightly reduced for faster preloading
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <div className="min-h-[100dvh] flex flex-col bg-[#0F172A] overflow-x-hidden relative">
      <ScrollToTop />
      <Navigation />
      <NavigationLoader isVisible={isNavigating} />
      <div className="flex-grow flex flex-col relative w-full">
        <Suspense fallback={<PageLoader />}>
          <AnimatePresence mode="popLayout" initial={false}>
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
