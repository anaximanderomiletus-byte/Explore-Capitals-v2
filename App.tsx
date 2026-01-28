import React, { useState, useEffect, useRef, Suspense, lazy } from 'react';
import { HashRouter as Router, Routes, Route, useLocation, Navigate, useParams } from 'react-router-dom';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import { LayoutProvider, useLayout } from './context/LayoutContext';
import { UserProvider } from './context/UserContext';
import { AuthProvider } from './context/AuthContext';

// ============================================
// INSTANT LOAD PAGES (no lazy loading)
// These pages load immediately with the main bundle
// ============================================
import Home from './pages/Home';
import Games from './pages/Games';
import About from './pages/About';

// ============================================
// HEAVY PAGES (lazy loaded with loading screen)
// These pages show a loading screen while loading
// ============================================
const DatabasePage = lazy(() => import('./pages/DatabasePage'));
const MapPage = lazy(() => import('./pages/MapPage'));

// ============================================
// OTHER PAGES (lazy loaded, lighter weight)
// ============================================
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

// Routes that require the full-screen loading overlay (heavy pages only)
const HEAVY_ROUTES = ['/database', '/map', '/games/map-dash'];

// Full-screen loading overlay - CSS only, no framer-motion
const LoadingOverlay = ({ visible }: { visible: boolean }) => (
  <div 
    className={`fixed inset-0 z-[1500] flex items-center justify-center bg-[#0F172A] pointer-events-none ${
      visible ? 'opacity-100' : 'opacity-0'
    }`}
    style={{ 
      transition: 'opacity 0.15s ease-out',
      visibility: visible ? 'visible' : 'hidden'
    }}
  >
    <div className="flex flex-col items-center gap-5">
      <div 
        className="w-12 h-12 rounded-full"
        style={{ 
          border: '3px solid rgba(0, 194, 255, 0.15)',
          borderTopColor: '#00C2FF',
          animation: 'spin 0.8s linear infinite'
        }} 
      />
      <p className="text-white/30 text-[10px] font-black uppercase tracking-[0.3em]">
        Loading
      </p>
    </div>
  </div>
);

// Empty fallback - no visible loader for instant pages
const EmptyFallback = () => <div className="flex-grow bg-[#0F172A]" />;

// Scroll to top on route change
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
  }, [pathname]);
  return null;
};

// Page wrapper - CSS fade in, no framer-motion
const PageWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div 
    className="flex-grow flex flex-col w-full animate-fadeInUp"
    style={{ animationDuration: '0.15s' }}
  >
    {children}
  </div>
);

const AppContent: React.FC = () => {
  const location = useLocation();
  const [showLoader, setShowLoader] = useState(false);
  const prevPathRef = useRef(location.pathname);
  const loaderTimeoutRef = useRef<number | null>(null);
  
  // Only show loader for HEAVY routes (Database, Map, MapDash)
  // Home, Games, About = NO loader, instant transition
  useEffect(() => {
    const newPath = location.pathname;
    const isHeavyRoute = HEAVY_ROUTES.some(r => newPath.startsWith(r));
    const pathChanged = prevPathRef.current !== newPath;
    
    // Clear any pending timeout
    if (loaderTimeoutRef.current) {
      clearTimeout(loaderTimeoutRef.current);
      loaderTimeoutRef.current = null;
    }
    
    // Only show loader for heavy routes
    if (isHeavyRoute && pathChanged) {
      setShowLoader(true);
      
      // Hide after content loads
      loaderTimeoutRef.current = window.setTimeout(() => {
        setShowLoader(false);
      }, 400);
    } else {
      // Instant - no loader
      setShowLoader(false);
    }
    
    prevPathRef.current = newPath;
    
    return () => {
      if (loaderTimeoutRef.current) {
        clearTimeout(loaderTimeoutRef.current);
      }
    };
  }, [location.pathname]);
  
  return (
    <div className="min-h-[100dvh] flex flex-col bg-[#0F172A] overflow-x-hidden">
      <ScrollToTop />
      
      {/* Navigation - always visible */}
      <Navigation />
      
      {/* Loading overlay for heavy routes */}
      <LoadingOverlay visible={showLoader} />
      
      {/* Page content */}
      <div className="flex-grow flex flex-col w-full">
        <Suspense fallback={<EmptyFallback />}>
            <Routes location={location} key={location.pathname}>
                {/* Instant load pages */}
                <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
                <Route path="/games" element={<PageWrapper><Games /></PageWrapper>} />
                <Route path="/about" element={<PageWrapper><About /></PageWrapper>} />
                
                {/* Heavy pages (lazy loaded) */}
                <Route path="/database" element={<PageWrapper><DatabasePage /></PageWrapper>} />
                <Route path="/map" element={<PageWrapper><MapPage /></PageWrapper>} />
                
                {/* Game pages */}
                <Route path="/games/capital-quiz" element={<PageWrapper><CapitalQuiz /></PageWrapper>} />
                <Route path="/games/map-dash" element={<PageWrapper><MapDash /></PageWrapper>} />
                <Route path="/games/flag-frenzy" element={<PageWrapper><FlagFrenzy /></PageWrapper>} />
                <Route path="/games/know-your-neighbor" element={<PageWrapper><KnowYourNeighbor /></PageWrapper>} />
                <Route path="/games/population-pursuit" element={<PageWrapper><PopulationPursuit /></PageWrapper>} />
                <Route path="/games/global-detective" element={<PageWrapper><GlobalDetective /></PageWrapper>} />
                <Route path="/games/capital-connection" element={<PageWrapper><CapitalConnection /></PageWrapper>} />
                <Route path="/games/region-roundup" element={<PageWrapper><RegionRoundup /></PageWrapper>} />
                <Route path="/games/landmark-legend" element={<PageWrapper><LandmarkLegend /></PageWrapper>} />
                
                {/* Other pages */}
                <Route path="/country/:id" element={<PageWrapper><CountryDetail /></PageWrapper>} />
                <Route path="/expedition/:id" element={<PageWrapper><CountryExploration /></PageWrapper>} />
                <Route path="/explore/:id" element={<ExploreRedirect />} />
                <Route path="/directory" element={<DirectoryRedirect />} />
                <Route path="/profile" element={<PageWrapper><Profile /></PageWrapper>} />
                <Route path="/settings" element={<PageWrapper><Settings /></PageWrapper>} />
                <Route path="/auth" element={<PageWrapper><Auth /></PageWrapper>} />
                <Route path="/auth-action" element={<PageWrapper><AuthAction /></PageWrapper>} />
                <Route path="/reset-password" element={<PageWrapper><AuthAction /></PageWrapper>} />
                <Route path="/loyalty" element={<PageWrapper><Loyalty /></PageWrapper>} />
                <Route path="/terms" element={<PageWrapper><Terms /></PageWrapper>} />
            </Routes>
        </Suspense>
      </div>
      
      <ConditionalFooter />
    </div>
  );
};

const App: React.FC = () => (
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

const ExploreRedirect: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  return <Navigate to={{ pathname: `/expedition/${id}`, search: location.search }} replace />;
};

const DirectoryRedirect: React.FC = () => <Navigate to="/database" replace />;

const ConditionalFooter: React.FC = () => {
  const location = useLocation();
  const { isFooterHidden } = useLayout();
  
  if (location.pathname === '/map' || isFooterHidden) return null;
  return <Footer />;
};

export default App;
