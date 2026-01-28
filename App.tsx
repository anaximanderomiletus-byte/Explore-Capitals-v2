import React, { useState, useEffect, useRef, Suspense, lazy } from 'react';
import { HashRouter as Router, Routes, Route, useLocation, Navigate, useParams } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import Footer from './components/Footer';
import { LayoutProvider, useLayout } from './context/LayoutContext';
import { UserProvider } from './context/UserContext';
import { AuthProvider } from './context/AuthContext';

// Lazy load all pages except Home
const Games = lazy(() => import('./pages/Games'));
const DatabasePage = lazy(() => import('./pages/DatabasePage'));
const MapPage = lazy(() => import('./pages/MapPage'));
const About = lazy(() => import('./pages/About'));
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

// Full-screen loading overlay with spinner
const LoadingOverlay = ({ visible }: { visible: boolean }) => {
  if (!visible) return null;
  
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15 }}
      className="fixed inset-0 z-[1500] flex items-center justify-center bg-[#0F172A]"
    >
      <div className="flex flex-col items-center gap-4">
        <div 
          className="w-12 h-12 rounded-full"
          style={{ 
            border: '3px solid rgba(0, 194, 255, 0.2)',
            borderTopColor: '#00C2FF',
            animation: 'spin 0.8s linear infinite'
          }} 
        />
        <p className="text-white/40 text-[10px] font-black uppercase tracking-[0.3em]">
          Loading
        </p>
      </div>
    </motion.div>
  );
};

// Inline loading spinner for Suspense fallback
const PageLoader = () => (
  <div className="flex-grow flex items-center justify-center bg-[#0F172A] min-h-[60vh]">
    <div className="flex flex-col items-center gap-4">
      <div 
        className="w-10 h-10 rounded-full"
        style={{ 
          border: '3px solid rgba(0, 194, 255, 0.2)',
          borderTopColor: '#00C2FF',
          animation: 'spin 0.8s linear infinite'
        }} 
      />
      <p className="text-white/30 text-[9px] font-black uppercase tracking-[0.25em]">
        Loading
      </p>
    </div>
  </div>
);

// Scroll to top on route change
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
  }, [pathname]);
  return null;
};

// Page wrapper with fade animation
const PageWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.2, ease: "easeOut" }}
    className="flex-grow flex flex-col w-full"
  >
    {children}
  </motion.div>
);

const AppContent: React.FC = () => {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const prevPathRef = useRef(location.pathname);
  const timeoutRef = useRef<number | null>(null);
  
  // Show loading overlay when route changes (except for initial load)
  useEffect(() => {
    const newPath = location.pathname;
    const isInitialLoad = prevPathRef.current === newPath;
    
    if (!isInitialLoad && prevPathRef.current !== newPath) {
      // Show loading immediately on navigation
      setIsLoading(true);
      
      // Clear any pending timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      
      // Hide loading after a minimum display time (ensures smooth transition)
      timeoutRef.current = window.setTimeout(() => {
        setIsLoading(false);
      }, 400); // Minimum loading display time
    }
    
    prevPathRef.current = newPath;
    
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [location.pathname]);
  
  return (
    <div className="min-h-[100dvh] flex flex-col bg-[#0F172A] overflow-x-hidden">
      <ScrollToTop />
      
      {/* Navigation - always visible and interactive */}
      <Navigation />
      
      {/* Loading overlay - shows on navigation */}
      <AnimatePresence>
        {isLoading && <LoadingOverlay visible={true} />}
      </AnimatePresence>
      
      {/* Page content */}
      <div className="flex-grow flex flex-col w-full">
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
  
  if (location.pathname === '/map' || isFooterHidden) return null;
  
  return <Footer />;
};

export default App;
