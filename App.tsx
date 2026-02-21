
import React, { Suspense, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate, useParams } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
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
 * Uses a short delay before showing the spinner to avoid flicker on fast loads.
 */
const PageLoadFallback: React.FC = () => {
  return (
    <div className="flex-grow flex flex-col w-full min-h-[60vh] items-center justify-center bg-[#0F172A]">
      <div className="w-8 h-8 border-[2.5px] border-white/10 border-t-sky rounded-full animate-spin" />
    </div>
  );
};

/**
 * PageWrapper
 * Provides a fade-in transition for page content.
 * Uses `mode="wait"` in AnimatePresence (see below) so only one page
 * is in the DOM at a time — avoids the double-render issue on Safari
 * that caused partial/half-appearing pages.
 */
const PageWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.15, ease: "easeOut" } }}
      exit={{ opacity: 0, transition: { duration: 0.07 } }}
      className="flex-grow flex flex-col w-full"
    >
      <Suspense fallback={<PageLoadFallback />}>
        {children}
      </Suspense>
    </motion.div>
  );
};

const AppContent: React.FC = () => {
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col bg-[#0F172A] relative">
      <ScrollToTop />
      <Navigation />
      <CookieConsent />
      <div className="flex-grow flex flex-col relative w-full">
          {/*
            mode="wait" ensures the exiting page fully unmounts before the
            entering page mounts. This prevents the "half-appearing" issue
            on Safari where both old and new pages were visible simultaneously.
            Shorter duration (0.15s) keeps it feeling snappy.
          */}
          <AnimatePresence mode="wait" initial={false}>
            <PageWrapper key={location.pathname}>
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
          </AnimatePresence>
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
