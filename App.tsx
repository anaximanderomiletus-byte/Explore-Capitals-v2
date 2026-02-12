
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate, useParams } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import Footer from './components/Footer';
import CookieConsent from './components/CookieConsent';
import { LayoutProvider, useLayout } from './context/LayoutContext';
import { UserProvider } from './context/UserContext';
import { AuthProvider } from './context/AuthContext';
import Games from './pages/Games';
import DatabasePage from './pages/DatabasePage';
import MapPage from './pages/MapPage';
import About from './pages/About';
import CapitalQuiz from './pages/CapitalQuiz';
import MapDash from './pages/MapDash';
import FlagFrenzy from './pages/FlagFrenzy';
import KnowYourNeighbor from './pages/KnowYourNeighbor';
import PopulationPursuit from './pages/PopulationPursuit';
import GlobalDetective from './pages/GlobalDetective';
import CapitalConnection from './pages/CapitalConnection';
import RegionRoundup from './pages/RegionRoundup';
import LandmarkLegend from './pages/LandmarkLegend';
// Premium Games
import TerritoryTitans from './pages/TerritoryTitans';
import AreaAce from './pages/AreaAce';
import CurrencyCraze from './pages/CurrencyCraze';
import LanguageLegend from './pages/LanguageLegend';
import TimeZoneTrekker from './pages/TimeZoneTrekker';
import DrivingDirection from './pages/DrivingDirection';
import CountryExploration from './pages/CountryExploration';
import CountryDetail from './pages/CountryDetail';
import Settings from './pages/Settings';
import Profile from './pages/Profile';
import Auth from './pages/Auth';
import AuthAction from './pages/AuthAction';
import Loyalty from './pages/Loyalty';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import Premium from './pages/Premium';


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
  
  return (
    <div className="min-h-screen flex flex-col bg-[#0F172A] relative">
      <ScrollToTop />
      <Navigation />
      <CookieConsent />
      <div className="flex-grow flex flex-col relative w-full">
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
