
import React, { useState, useEffect, useRef } from 'react';
import { HashRouter as Router, Routes, Route, useLocation, Navigate, useParams } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Globe, Compass } from 'lucide-react';
import Navigation from './components/Navigation';
import Home from './pages/Home';
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
import CountryExploration from './pages/CountryExploration';
import CountryDetail from './pages/CountryDetail';
import Footer from './components/Footer';
import { LayoutProvider, useLayout } from './context/LayoutContext';
import { UserProvider } from './context/UserContext';
import { AuthProvider } from './context/AuthContext';
import Settings from './pages/Settings';
import Profile from './pages/Profile';
import Auth from './pages/Auth';
import AuthAction from './pages/AuthAction';
import Loyalty from './pages/Loyalty';
import Terms from './pages/Terms';

const SKIP_TRANSITION_ROUTES = ['/auth', '/profile', '/settings', '/loyalty', '/database', '/directory'];

/**
 * ScrollToTop
 * Ensures every page navigation starts at the top instantly.
 */
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
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
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="flex-grow flex flex-col"
    >
      {children}
    </motion.div>
  );
};

const AppContent: React.FC = () => {
  const location = useLocation();
  
  return (
    <div className="min-h-[100dvh] flex flex-col bg-[#0F172A] overflow-x-hidden relative">
      <ScrollToTop />
      <Navigation />
      <div className="flex-grow flex flex-col relative">
        <AnimatePresence mode="wait" initial={false}>
          <Routes location={location} key={location.pathname}>
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
