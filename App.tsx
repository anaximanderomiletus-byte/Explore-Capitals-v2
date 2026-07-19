import React, { Suspense, useEffect, useRef, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  useNavigate,
  Navigate,
  useParams,
} from "react-router-dom";
// framer-motion animations handled per-page via whileInView
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import CookieConsent from "./components/CookieConsent";
import LanguageSwitcher from "./components/LanguageSwitcher";
import { LayoutProvider, useLayout } from "./context/LayoutContext";
import { UserProvider } from "./context/UserContext";
import { LocaleProvider } from "./context/LocaleContext";

// ── Home is eagerly loaded for instant first paint ─────────────────
import Home from "./pages/Home";

// ── Navbar pages: lazy but prefetched on idle after Home mounts ────
const Games = React.lazy(() => import("./pages/Games"));
const GamesDashboard = React.lazy(() => import("./pages/GamesDashboard"));
const DatabasePage = React.lazy(() => import("./pages/DatabasePage"));
const MapPage = React.lazy(() => import("./pages/MapPage"));
const About = React.lazy(() => import("./pages/About"));
const Contact = React.lazy(() => import("./pages/Contact"));
const Donate = React.lazy(() => import("./pages/Donate"));
const CapitalQuiz = React.lazy(() => import("./pages/CapitalQuiz"));
const MapDash = React.lazy(() => import("./pages/MapDash"));
const FlagFrenzy = React.lazy(() => import("./pages/FlagFrenzy"));
const KnowYourNeighbor = React.lazy(() => import("./pages/KnowYourNeighbor"));
const PopulationPursuit = React.lazy(() => import("./pages/PopulationPursuit"));
const GlobalDetective = React.lazy(() => import("./pages/GlobalDetective"));
const CapitalConnection = React.lazy(() => import("./pages/CapitalConnection"));
const RegionRoundup = React.lazy(() => import("./pages/RegionRoundup"));
const LandmarkLegend = React.lazy(() => import("./pages/LandmarkLegend"));
const TerritoryTitans = React.lazy(() => import("./pages/TerritoryTitans"));
const AreaAce = React.lazy(() => import("./pages/AreaAce"));
const CurrencyCraze = React.lazy(() => import("./pages/CurrencyCraze"));
const LanguageLegend = React.lazy(() => import("./pages/LanguageLegend"));
const TimeZoneTrekker = React.lazy(() => import("./pages/TimeZoneTrekker"));
const DrivingDirection = React.lazy(() => import("./pages/DrivingDirection"));
const CountryExploration = React.lazy(
  () => import("./pages/CountryExploration"),
);
const CountryDetail = React.lazy(() => import("./pages/CountryDetail"));
const Blog = React.lazy(() => import("./pages/Blog"));
const BlogPost = React.lazy(() => import("./pages/BlogPost"));
const Terms = React.lazy(() => import("./pages/Terms"));
const Privacy = React.lazy(() => import("./pages/Privacy"));
const NotFound = React.lazy(() => import("./pages/NotFound"));

/**
 * PrefetchNavbarPages
 * After the initial page has rendered and the browser is idle, prefetch the
 * chunks for every page reachable from the navbar. This means navigating
 * to Games, Database, Map, or About will feel instant because the JS is
 * already cached.  Uses requestIdleCallback (with setTimeout fallback)
 * so it never competes with the critical render path.
 */
const prefetchNavbarPages = () => {
  const load = () => {
    import("./pages/Games");
    import("./pages/DatabasePage");
    import("./pages/About");
    import("./pages/Blog");
    // MapPage is heavy (Leaflet) — still prefetch but slightly delayed
    setTimeout(() => import("./pages/MapPage"), 200);
  };
  if ("requestIdleCallback" in window) {
    (window as any).requestIdleCallback(load, { timeout: 3000 });
  } else {
    setTimeout(load, 1500);
  }
};

// Fire once on module load — runs after the initial React render is committed
let prefetchScheduled = false;

/**
 * ScrollToTop
 * Ensures every page navigation starts at the top instantly.
 */
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  // Disable the browser's automatic scroll restoration so it doesn't
  // fight with our manual scrollTo on mobile (especially iOS Safari).
  useEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
  }, []);

  useEffect(() => {
    // requestAnimationFrame defers until after paint, which is required on
    // iOS Safari with -webkit-overflow-scrolling:touch — calling scrollTo
    // synchronously in the effect can be ignored if the native scroll layer
    // hasn't updated yet. Also set the legacy properties as fallbacks.
    const raf = requestAnimationFrame(() => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    });
    return () => cancelAnimationFrame(raf);
  }, [pathname]);
  return null;
};

/**
 * NavigationCursor
 * Shows cursor:progress while a lazy-loaded page chunk is being fetched.
 * Uses cursor:progress (arrow + spinning circle on Mac) — NOT cursor:wait
 * (spinning beach ball of death).
 *
 * Flow:
 *  1. Route changes → set cursor to progress immediately
 *  2. If page chunk is cached → auto-clear after 100ms (imperceptible)
 *  3. If Suspense kicks in → PageLoadFallback sets isPageLoading=true,
 *     which cancels the auto-clear and keeps the cursor until the chunk loads
 */
const NavigationCursor: React.FC = () => {
  const { pathname } = useLocation();
  const { isPageLoading } = useLayout();
  const isFirstRender = useRef(true);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();

  // On route change, show progress cursor immediately
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    document.documentElement.style.cursor = "progress";

    // Auto-clear for instant navigations (cached chunks)
    // PageLoadFallback will cancel this if Suspense is active
    timeoutRef.current = setTimeout(() => {
      document.documentElement.style.cursor = "";
    }, 100);

    return () => clearTimeout(timeoutRef.current);
  }, [pathname]);

  // When Suspense is active (isPageLoading=true), keep cursor as progress
  // When Suspense resolves (isPageLoading=false), clear it
  useEffect(() => {
    if (isPageLoading) {
      clearTimeout(timeoutRef.current);
      document.documentElement.style.cursor = "progress";
    } else {
      document.documentElement.style.cursor = "";
    }
  }, [isPageLoading]);

  // Cleanup on unmount
  useEffect(() => {
    return () => clearTimeout(timeoutRef.current);
  }, []);

  return null;
};

/**
 * PageLoadFallback
 * Invisible placeholder while a lazy chunk is loading.
 * Matches the dark background so there's no flash — the PersistentBackground
 * shows through seamlessly.  Only shows a spinner after 600ms for slow loads.
 * Signals loading state to NavigationCursor via LayoutContext.
 */
const PageLoadFallback: React.FC = () => {
  const { setPageLoading } = useLayout();
  const [show, setShow] = useState(false);

  useEffect(() => {
    setPageLoading(true);

    // If the HTML splash-screen loader is still present, don't show a second spinner
    const htmlLoader = document.getElementById("initial-loader");
    if (htmlLoader) {
      return () => setPageLoading(false);
    }

    // Only show spinner for genuinely slow loads (600ms+)
    const timer = setTimeout(() => setShow(true), 600);
    return () => {
      clearTimeout(timer);
      setPageLoading(false);
    };
  }, [setPageLoading]);

  return (
    <div className="flex-grow flex flex-col w-full min-h-[40vh]">
      {show && (
        <div className="flex items-center justify-center flex-grow">
          <div className="w-7 h-7 border-2 border-white/10 border-t-sky rounded-full animate-spin" />
        </div>
      )}
    </div>
  );
};

/**
 * PageTransition
 * Plays the page-enter animation WHEN content is ready (inside Suspense).
 * This is the key fix: the animation triggers after the lazy chunk loads,
 * not before. Also dismisses the HTML splash-screen for ALL pages — no
 * individual page needs to call window.__dismissLoader.
 */
const PageTransition: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  useEffect(() => {
    // Dismiss the HTML splash-screen loader the moment any page is ready.
    // This runs after Suspense resolves, so all lazy-loaded pages are covered.
    (window as any).__dismissLoader?.();
  }, []);

  return (
    <div className="flex-grow flex flex-col w-full page-enter">{children}</div>
  );
};

/**
 * PageWrapper
 * Provides a stable Suspense boundary around each route.
 *
 * The `key` is on PageTransition (INSIDE Suspense), not on Suspense itself.
 * This is intentional:
 *  - Suspense boundary stays mounted across navigations (no teardown)
 *  - PageTransition remounts on pathname change → page-enter animation replays
 *  - For cached (already-loaded) routes, React.lazy resolves synchronously so
 *    Suspense never shows the fallback — no spinner flash
 *  - For uncached routes, Suspense correctly shows the fallback until the
 *    chunk loads, then renders the new page with its enter animation
 */
const PageWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { pathname } = useLocation();
  return (
    <div className="flex-grow flex flex-col w-full">
      <Suspense fallback={<PageLoadFallback />}>
        <PageTransition key={pathname}>{children}</PageTransition>
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
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-surface">
      <div className="absolute inset-0 bg-hero-atlas opacity-60" />
      <div className="absolute top-0 right-0 w-[45%] h-[35%] rounded-full bg-primary/[0.06] blur-3xl" />
      <div className="absolute bottom-0 left-0 w-[40%] h-[30%] rounded-full bg-land/[0.05] blur-3xl" />
    </div>
  );
};

const AppContent: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Handle SPA redirect from 404.html fallback
  useEffect(() => {
    const redirectPath = sessionStorage.getItem("spa_redirect");
    if (redirectPath) {
      sessionStorage.removeItem("spa_redirect");
      navigate(redirectPath, { replace: true });
    }
  }, [navigate]);

  // Prefetch navbar page chunks once after initial mount
  useEffect(() => {
    if (!prefetchScheduled) {
      prefetchScheduled = true;
      prefetchNavbarPages();
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col relative">
      <PersistentBackground />
      <ScrollToTop />
      <NavigationCursor />
      <Navigation />
      <LanguageSwitcher variant="floating" />
      <CookieConsent />
      <div className="flex-grow flex flex-col relative z-[1] w-full">
        <PageWrapper>
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/games" element={<Games />} />
            <Route path="/games/all" element={<GamesDashboard />} />
            <Route path="/games/capital-quiz" element={<CapitalQuiz />} />
            <Route path="/games/map-dash" element={<MapDash />} />
            <Route path="/games/flag-frenzy" element={<FlagFrenzy />} />
            <Route
              path="/games/know-your-neighbor"
              element={<KnowYourNeighbor />}
            />
            <Route
              path="/games/population-pursuit"
              element={<PopulationPursuit />}
            />
            <Route
              path="/games/global-detective"
              element={<GlobalDetective />}
            />
            <Route
              path="/games/capital-connection"
              element={<CapitalConnection />}
            />
            <Route path="/games/region-roundup" element={<RegionRoundup />} />
            <Route path="/games/landmark-legend" element={<LandmarkLegend />} />
            <Route
              path="/games/territory-titan"
              element={<LegacyTerritoryTitanRedirect />}
            />
            <Route
              path="/games/territory-titans"
              element={<TerritoryTitans />}
            />
            <Route path="/games/area-ace" element={<AreaAce />} />
            <Route path="/games/currency-craze" element={<CurrencyCraze />} />
            <Route path="/games/language-legend" element={<LanguageLegend />} />
            <Route
              path="/games/time-zone-trekker"
              element={<TimeZoneTrekker />}
            />
            <Route
              path="/games/driving-direction"
              element={<DrivingDirection />}
            />
            <Route path="/database" element={<DatabasePage />} />
            <Route path="/directory" element={<DirectoryRedirect />} />
            <Route path="/country/:id" element={<CountryDetail />} />
            <Route path="/map" element={<MapPage />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/donate" element={<Donate />} />
            <Route path="/expedition/:id" element={<CountryExploration />} />
            <Route path="/explore/:id" element={<ExploreRedirect />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </PageWrapper>
      </div>
      <ConditionalFooter />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <LocaleProvider>
      <UserProvider>
        <LayoutProvider>
          <Router>
            <AppContent />
          </Router>
        </LayoutProvider>
      </UserProvider>
    </LocaleProvider>
  );
};

const ExploreRedirect: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  return (
    <Navigate
      to={{ pathname: `/expedition/${id}`, search: location.search }}
      replace
    />
  );
};

const DirectoryRedirect: React.FC = () => {
  return <Navigate to="/database" replace />;
};

const LegacyTerritoryTitanRedirect: React.FC = () => {
  const location = useLocation();
  return (
    <Navigate
      to={{ pathname: "/games/territory-titans", search: location.search }}
      replace
    />
  );
};

const ConditionalFooter: React.FC = () => {
  const location = useLocation();
  const { isFooterHidden } = useLayout();

  // Always hide on the map page, but otherwise respect component-level overrides
  const isMap = location.pathname === "/map";

  if (isMap || isFooterHidden) return null;

  return <Footer />;
};

export default App;
