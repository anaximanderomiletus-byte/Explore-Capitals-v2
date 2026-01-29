import React, { useEffect, Suspense, lazy } from 'react';
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
// LAZY LOADED PAGES
// React Suspense handles the loading state
// ============================================
const DatabasePage = lazy(() => import('./pages/DatabasePage'));
const MapPage = lazy(() => import('./pages/MapPage'));
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

// Loading spinner component - shown while lazy components load
const LoadingSpinner = () => (
  <div className="flex-grow flex items-center justify-center bg-[#0F172A] min-h-[50vh]">
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

// Scroll to top on route change
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
  }, [pathname]);
  return null;
};

const AppContent: React.FC = () => {
  const location = useLocation();
  
  return (
    <div className="min-h-[100dvh] flex flex-col bg-[#0F172A] overflow-x-hidden">
      <ScrollToTop />
      
      {/* Navigation - always visible and instant */}
      <Navigation />
      
      {/* Page content with Suspense fallback */}
      <Suspense fallback={<LoadingSpinner />}>
        <Routes location={location}>
          {/* Instant load pages - bundled with main chunk */}
          <Route path="/" element={<Home />} />
          <Route path="/games" element={<Games />} />
          <Route path="/about" element={<About />} />
          
          {/* Lazy loaded pages - Suspense shows spinner while loading */}
          <Route path="/database" element={<DatabasePage />} />
          <Route path="/map" element={<MapPage />} />
          
          {/* Game pages */}
          <Route path="/games/capital-quiz" element={<CapitalQuiz />} />
          <Route path="/games/map-dash" element={<MapDash />} />
          <Route path="/games/flag-frenzy" element={<FlagFrenzy />} />
          <Route path="/games/know-your-neighbor" element={<KnowYourNeighbor />} />
          <Route path="/games/population-pursuit" element={<PopulationPursuit />} />
          <Route path="/games/global-detective" element={<GlobalDetective />} />
          <Route path="/games/capital-connection" element={<CapitalConnection />} />
          <Route path="/games/region-roundup" element={<RegionRoundup />} />
          <Route path="/games/landmark-legend" element={<LandmarkLegend />} />
          
          {/* Other pages */}
          <Route path="/country/:id" element={<CountryDetail />} />
          <Route path="/expedition/:id" element={<CountryExploration />} />
          <Route path="/explore/:id" element={<ExploreRedirect />} />
          <Route path="/directory" element={<DirectoryRedirect />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/auth-action" element={<AuthAction />} />
          <Route path="/reset-password" element={<AuthAction />} />
          <Route path="/loyalty" element={<Loyalty />} />
          <Route path="/terms" element={<Terms />} />
        </Routes>
      </Suspense>
      
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
