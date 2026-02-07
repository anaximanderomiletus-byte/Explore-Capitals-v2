
import React, { useEffect, useState, Suspense, lazy } from 'react';
import { HashRouter as Router, Routes, Route, useLocation, Navigate, useParams } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import Footer from './components/Footer';
import CookieConsent from './components/CookieConsent';
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
// Premium Games
const TerritoryTitans = lazy(() => import('./pages/TerritoryTitans'));
const AreaAce = lazy(() => import('./pages/AreaAce'));
const CurrencyCraze = lazy(() => import('./pages/CurrencyCraze'));
const LanguageLegend = lazy(() => import('./pages/LanguageLegend'));
const TimeZoneTrekker = lazy(() => import('./pages/TimeZoneTrekker'));
const DrivingDirection = lazy(() => import('./pages/DrivingDirection'));
const CountryExploration = lazy(() => import('./pages/CountryExploration'));
const CountryDetail = lazy(() => import('./pages/CountryDetail'));
const Settings = lazy(() => import('./pages/Settings'));
const Profile = lazy(() => import('./pages/Profile'));
const Auth = lazy(() => import('./pages/Auth'));
const AuthAction = lazy(() => import('./pages/AuthAction'));
const Loyalty = lazy(() => import('./pages/Loyalty'));
const Terms = lazy(() => import('./pages/Terms'));
const Privacy = lazy(() => import('./pages/Privacy'));
const Premium = lazy(() => import('./pages/Premium'));

// Prefetch helper - call on hover to preload page chunks
export const prefetchPage = (page: keyof typeof pageImports) => {
  const importFn = pageImports[page];
  if (importFn) {
    importFn(); // Triggers the import, browser will cache it
  }
};

// Loading fallback - visible indicator that page is loading
const PageLoader = () => (
  <div className="flex-grow flex flex-col items-center justify-center bg-[#0F172A] min-h-[40vh] gap-4">
    <div className="relative">
      <div className="w-10 h-10 rounded-full border-3 border-sky/10 border-t-sky animate-spin" 
           style={{ borderWidth: '3px' }} />
    </div>
  </div>
);


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
      className="flex-grow flex flex-col w-full"
    >
      {children}
    </motion.div>
  );
};

const AppContent: React.FC = () => {
  const location = useLocation();
  const [appReady, setAppReady] = useState(false);
  
  // Mark app as ready after first paint, then preload other pages
  useEffect(() => {
    // Use double-rAF to ensure we're past first meaningful paint
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setAppReady(true);
      });
    });
  }, []);

  // Preload key pages after app is interactive
  useEffect(() => {
    if (!appReady) return;
    
    const preload = () => {
      pageImports.games();
      pageImports.about();
      // Delay heavy pages slightly
      setTimeout(() => {
        pageImports.database();
        pageImports.map();
      }, 2000);
    };

    // Use requestIdleCallback for non-blocking preload
    if ('requestIdleCallback' in window) {
      (window as any).requestIdleCallback(preload, { timeout: 5000 });
    } else {
      setTimeout(preload, 3000);
    }
  }, [appReady]);
  
  return (
    <div className="min-h-screen flex flex-col bg-[#0F172A] relative">
      <ScrollToTop />
      <Navigation />
      <CookieConsent />
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
              {/* Premium Games */}
              <Route path="/games/territory-titans" element={<PageWrapper><TerritoryTitans /></PageWrapper>} />
              <Route path="/games/area-ace" element={<PageWrapper><AreaAce /></PageWrapper>} />
              <Route path="/games/currency-craze" element={<PageWrapper><CurrencyCraze /></PageWrapper>} />
              <Route path="/games/language-legend" element={<PageWrapper><LanguageLegend /></PageWrapper>} />
              <Route path="/games/time-zone-trekker" element={<PageWrapper><TimeZoneTrekker /></PageWrapper>} />
              <Route path="/games/driving-direction" element={<PageWrapper><DrivingDirection /></PageWrapper>} />
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
              <Route path="/premium" element={<PageWrapper><Premium /></PageWrapper>} />
              <Route path="/terms" element={<PageWrapper><Terms /></PageWrapper>} />
              <Route path="/privacy" element={<PageWrapper><Privacy /></PageWrapper>} />
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
