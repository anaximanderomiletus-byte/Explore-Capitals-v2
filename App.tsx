
import React, { Suspense, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate, useParams } from 'react-router-dom';
// framer-motion animations handled per-page via whileInView
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import CookieConsent from './components/CookieConsent';
import { LayoutProvider, useLayout } from './context/LayoutContext';
import { UserProvider } from './context/UserContext';
import { AuthProvider } from './context/AuthContext';

// ── Lazy-loaded pages ──────────────────────────────────────────────
// Each page is code-split into its own chunk, loaded on demand.
// This dramatically reduces the initial bundle size.
const Home = React.lazy(() => import('./pages/Home'));
const Games = React.lazy(() => import('./pages/Games'));
const DatabasePage = React.lazy(() => import('./pages/DatabasePage'));
const MapPage = React.lazy(() => import('./pages/MapPage'));
const About = React.lazy(() => import('./pages/About'));
const CapitalQuiz = React.lazy(() => import('./pages/CapitalQuiz'));
const MapDash = React.lazy(() => import('./pages/MapDash'));
const FlagFrenzy = React.lazy(() => import('./pages/FlagFrenzy'));
const KnowYourNeighbor = React.lazy(() => import('./pages/KnowYourNeighbor'));
const PopulationPursuit = React.lazy(() => import('./pages/PopulationPursuit'));
const GlobalDetective = React.lazy(() => import('./pages/GlobalDetective'));
const CapitalConnection = React.lazy(() => import('./pages/CapitalConnection'));
const RegionRoundup = React.lazy(() => import('./pages/RegionRoundup'));
const LandmarkLegend = React.lazy(() => import('./pages/LandmarkLegend'));
// Premium Games
const TerritoryTitans = React.lazy(() => import('./pages/TerritoryTitans'));
const AreaAce = React.lazy(() => import('./pages/AreaAce'));
const CurrencyCraze = React.lazy(() => import('./pages/CurrencyCraze'));
const LanguageLegend = React.lazy(() => import('./pages/LanguageLegend'));
const TimeZoneTrekker = React.lazy(() => import('./pages/TimeZoneTrekker'));
const DrivingDirection = React.lazy(() => import('./pages/DrivingDirection'));
const CountryExploration = React.lazy(() => import('./pages/CountryExploration'));
const CountryDetail = React.lazy(() => import('./pages/CountryDetail'));
const Settings = React.lazy(() => import('./pages/Settings'));
const Profile = React.lazy(() => import('./pages/Profile'));
const Auth = React.lazy(() => import('./pages/Auth'));
const AuthAction = React.lazy(() => import('./pages/AuthAction'));
const Loyalty = React.lazy(() => import('./pages/Loyalty'));
const Terms = React.lazy(() => import('./pages/Terms'));
const Privacy = React.lazy(() => import('./pages/Privacy'));
const Premium = React.lazy(() => import('./pages/Premium'));


/**
 * ScrollToTop
 * Ensures every page navigation starts at the top instantly.
 */
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as any });
  }, [pathname]);
  return null;
};

/**
 * PageLoadFallback
 * Full-screen minimal spinner shown while a lazy chunk is loading.
 * Matches the app background so there's no flash of white/empty content.
 * Skips showing its own spinner while the HTML initial-loader is still visible
 * to avoid two spinners on screen at once.
 */
const PageLoadFallback: React.FC = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // If the HTML splash-screen loader is still present, don't show a second spinner
    const htmlLoader = document.getElementById('initial-loader');
    if (htmlLoader) return;

    const timer = setTimeout(() => setShow(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex-grow flex flex-col w-full min-h-[60vh] items-center justify-center bg-[#0F172A]">
      {show && (
        <div className="w-8 h-8 border-[2.5px] border-white/10 border-t-sky rounded-full animate-spin" />
      )}
    </div>
  );
};

/**
 * PageWrapper
 * Simple wrapper that provides Suspense boundary for lazy-loaded pages.
 * No motion animation — pages handle their own entry animations via whileInView.
 * This avoids stacking animations and keeps navigation instant.
 */
const PageWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex-grow flex flex-col w-full">
      <Suspense fallback={<PageLoadFallback />}>
        {children}
      </Suspense>
    </div>
  );
};

/**
 * PersistentBackground
 * A single fixed background layer that crossfades between different
 * glow configurations based on the current route. This prevents hard
 * cuts when navigating between pages.
 */
const PersistentBackground: React.FC = () => {
  const { pathname } = useLocation();

  // Determine which background "mode" based on route
  const isHome = pathname === '/';
  const isGames = pathname === '/games' || pathname.startsWith('/games/');
  const isDatabase = pathname === '/database' || pathname.startsWith('/country/');
  const isMap = pathname === '/map';
  const isAbout = pathname === '/about';

  // "Glow" pages: Games, Database, About — brighter orbs
  const showGlow = isGames || isDatabase || isAbout;
  // Home has its own subtle radial gradients
  const showHome = isHome;
  // Map handles its own background (full-screen dark)

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Base dark layer — always present */}
      <div className="absolute inset-0 bg-[#0F172A]" />

      {/* Home-style subtle gradients */}
      <div
        className="absolute inset-0 transition-opacity duration-700 ease-in-out"
        style={{ opacity: showHome ? 1 : 0 }}
      >
        <div className="absolute top-[-10%] left-[-10%] w-[120%] h-[120%] bg-[radial-gradient(circle_at_center,rgba(0,194,255,0.03)_0%,transparent_70%)] blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[110%] h-[110%] bg-[radial-gradient(circle_at_center,rgba(52,199,89,0.02)_0%,transparent_70%)] blur-[100px]" />
      </div>

      {/* Glow-style orbs for Games / Database / About */}
      <div
        className="absolute inset-0 transition-opacity duration-700 ease-in-out"
        style={{ opacity: showGlow ? 1 : 0 }}
      >
        <div className="absolute top-[-20%] right-[-10%] w-[100%] h-[100%] bg-sky/15 rounded-full blur-[120px] opacity-50" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[80%] h-[80%] bg-sky/8 rounded-full blur-[100px] opacity-40" />
      </div>
    </div>
  );
};

const AppContent: React.FC = () => {
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col bg-[#0F172A] relative">
      <PersistentBackground />
      <ScrollToTop />
      <Navigation />
      <CookieConsent />
      <div className="flex-grow flex flex-col relative z-[1] w-full">
            <PageWrapper>
              <Routes location={location}>
                <Route path="/" element={<Home />} />
                <Route path="/games" element={<Games />} />
                <Route path="/games/capital-quiz" element={<CapitalQuiz />} />
                <Route path="/games/map-dash" element={<MapDash />} />
                <Route path="/games/flag-frenzy" element={<FlagFrenzy />} />
                <Route path="/games/know-your-neighbor" element={<KnowYourNeighbor />} />
                <Route path="/games/population-pursuit" element={<PopulationPursuit />} />
                <Route path="/games/global-detective" element={<GlobalDetective />} />
                <Route path="/games/capital-connection" element={<CapitalConnection />} />
                <Route path="/games/region-roundup" element={<RegionRoundup />} />
                <Route path="/games/landmark-legend" element={<LandmarkLegend />} />
                {/* Premium Games */}
                <Route path="/games/territory-titans" element={<TerritoryTitans />} />
                <Route path="/games/area-ace" element={<AreaAce />} />
                <Route path="/games/currency-craze" element={<CurrencyCraze />} />
                <Route path="/games/language-legend" element={<LanguageLegend />} />
                <Route path="/games/time-zone-trekker" element={<TimeZoneTrekker />} />
                <Route path="/games/driving-direction" element={<DrivingDirection />} />
                <Route path="/database" element={<DatabasePage />} />
                <Route path="/directory" element={<DirectoryRedirect />} />
                <Route path="/country/:id" element={<CountryDetail />} />
                <Route path="/map" element={<MapPage />} />
                <Route path="/about" element={<About />} />
                <Route path="/expedition/:id" element={<CountryExploration />} />
                <Route path="/explore/:id" element={<ExploreRedirect />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/auth-action" element={<AuthAction />} />
                <Route path="/reset-password" element={<AuthAction />} />
                <Route path="/loyalty" element={<Loyalty />} />
                <Route path="/premium" element={<Premium />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="/privacy" element={<Privacy />} />
              </Routes>
            </PageWrapper>
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
