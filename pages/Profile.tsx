import React, { useEffect, useMemo, useState } from 'react';
import { 
  Award, Compass, Sparkles, Target, Trophy, LogOut, Settings, 
  Timer, Zap, HelpCircle, XCircle, CheckCircle2,
  TrendingUp, Activity, BarChart, ChevronDown, ChevronUp,
  Globe, MapPin, Gamepad2, Brain, Flame, Medal
} from 'lucide-react';
import { MOCK_COUNTRIES } from '../constants';
import { useUser } from '../context/UserContext';
import { useLayout } from '../context/LayoutContext';
import Button from '../components/Button';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import ConfirmationModal from '../components/ConfirmationModal';
import { useAuth } from '../context/AuthContext';
import { getAvatarById } from '../constants/avatars';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock } from 'lucide-react';
import SEO from '../components/SEO';

// All possible achievements in the game
const ALL_ACHIEVEMENTS = [
  { id: 'first-game', title: 'First Expedition', description: 'Complete your first game.', icon: '🧭' },
  { id: 'capital-quiz-500', title: 'Rapid Recall', description: 'Score 500+ points in Capital Quiz.', icon: '⚡' },
  { id: 'map-dash-800', title: 'Cartographic Ace', description: 'Score 800+ points in Map Dash.', icon: '🗺️' },
  { id: 'flag-frenzy-400', title: 'Flag Savant', description: 'Score 400+ points in Flag Frenzy.', icon: '🚩' },
  // Continent achievements
  { id: 'region-master-africa', title: 'Africa Master', description: 'Answer 15+ questions about Africa with 70%+ accuracy.', icon: '🌍' },
  { id: 'region-master-europe', title: 'Europe Master', description: 'Answer 15+ questions about Europe with 70%+ accuracy.', icon: '🌍' },
  { id: 'region-master-asia', title: 'Asia Master', description: 'Answer 15+ questions about Asia with 70%+ accuracy.', icon: '🌏' },
  { id: 'region-master-north-america', title: 'North America Master', description: 'Answer 15+ questions about North America with 70%+ accuracy.', icon: '🌎' },
  { id: 'region-master-south-america', title: 'South America Master', description: 'Answer 15+ questions about South America with 70%+ accuracy.', icon: '🌎' },
  { id: 'region-master-oceania', title: 'Oceania Master', description: 'Answer 15+ questions about Oceania with 70%+ accuracy.', icon: '🌏' },
  // Region achievements
  { id: 'region-master-middle-east', title: 'Oasis Oracle', description: 'Answer 15+ questions about the Middle East with 70%+ accuracy.', icon: '🕌' },
  { id: 'region-master-caribbean', title: 'Island Virtuoso', description: 'Answer 15+ questions about the Caribbean with 70%+ accuracy.', icon: '🌺' },
  { id: 'region-master-central-america', title: 'Mayan Maven', description: 'Answer 15+ questions about Central America with 70%+ accuracy.', icon: '🌋' },
  { id: 'region-master-southeast-asia', title: 'Spice Route Savant', description: 'Answer 15+ questions about Southeast Asia with 70%+ accuracy.', icon: '🐘' },
  { id: 'region-master-east-asia', title: 'Dragon Dynasty Scholar', description: 'Answer 15+ questions about East Asia with 70%+ accuracy.', icon: '🐉' },
  { id: 'region-master-south-asia', title: 'Monsoon Maestro', description: 'Answer 15+ questions about South Asia with 70%+ accuracy.', icon: '🕉️' },
  { id: 'region-master-western-europe', title: 'Renaissance Virtuoso', description: 'Answer 15+ questions about Western Europe with 70%+ accuracy.', icon: '🗼' },
  { id: 'region-master-eastern-europe', title: 'Slavic Scholar', description: 'Answer 15+ questions about Eastern Europe with 70%+ accuracy.', icon: '⛪' },
  { id: 'region-master-northern-europe', title: 'Nordic Navigator', description: 'Answer 15+ questions about Northern Europe with 70%+ accuracy.', icon: '🏔️' },
  { id: 'region-master-southern-europe', title: 'Mediterranean Maestro', description: 'Answer 15+ questions about Southern Europe with 70%+ accuracy.', icon: '🏛️' },
  { id: 'region-master-central-asia', title: 'Silk Road Scholar', description: 'Answer 15+ questions about Central Asia with 70%+ accuracy.', icon: '🐫' },
  { id: 'region-master-pacific', title: 'Polynesian Pioneer', description: 'Answer 15+ questions about the Pacific with 70%+ accuracy.', icon: '🌊' },
];

const Profile: React.FC = () => {
  const userContext = useUser();
  const authContext = useAuth();
  const { setPageLoading } = useLayout();
  const location = useLocation();
  const navigate = useNavigate();

  const [view, setView] = useState<'overview' | 'detailed'>('overview');
  const [showSignOutModal, setShowSignOutModal] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [expandedGame, setExpandedGame] = useState<string | null>(null);

  useEffect(() => {
    setPageLoading(false);
  }, [setPageLoading]);

  if (!userContext || !authContext) {
    return <div className="pt-32 text-center text-white font-black uppercase">Critical System Error: Context Missing</div>;
  }

  const { 
    user, isAuthenticated, isLoading: userLoading, isSyncing, 
    strengths, weaknesses, regionStrengths, regionWeaknesses, loyaltyProgress 
  } = userContext;
  
  const { user: authUser, signOut, loading: authLoading } = authContext;

  const handleSignOut = async () => {
    setIsRedirecting(true);
    await signOut();
    navigate('/');
  };

  const renderAvatar = () => {
    try {
      const photoURL = authUser?.photoURL || user?.photoURL;
      const avatar = getAvatarById(photoURL);
      const initials = (authUser?.displayName || user?.name || 'Explorer')?.[0] || 'E';
    
    if (avatar) {
      return (
        <div className={`w-full h-full ${avatar.color} flex items-center justify-center text-white`}>
          {React.cloneElement(avatar.icon as React.ReactElement, { size: 40 })}
        </div>
      );
    }
    
      if (photoURL && typeof photoURL === 'string' && photoURL.startsWith('http')) {
        return <img src={photoURL} alt="avatar" className="w-full h-full object-cover" />;
    }

      return (
        <div className="w-full h-full bg-primary flex items-center justify-center text-white font-display font-black text-3xl">
          {initials}
        </div>
      );
    } catch (e) {
      return <div className="w-full h-full bg-slate-800 flex items-center justify-center text-white">?</div>;
    }
  };

  const totalPlays = useMemo(() => {
    try {
      const games = user?.stats?.games;
      if (!games) return 0;
      return Object.values(games).reduce((sum, g) => sum + (g?.plays || 0), 0);
    } catch (e) {
      return 0;
    }
  }, [user?.stats?.games]);

  const gameProficiency = useMemo(() => {
    try {
      const gamesMap = user?.stats?.games;
      if (!gamesMap) return { excel: [], suck: [] };
      const gamesList = Object.values(gamesMap).map(g => {
        if (!g) return null;
        const total = (g.totalCorrect || 0) + (g.totalWrong || 0);
        const accuracy = total > 0 ? (g.totalCorrect / total) * 100 : 0;
        return { 
          id: g.gameId || 'unknown', 
          name: (g.gameId || 'unknown').replace(/-/g, ' ').toUpperCase(),
          accuracy, 
          plays: g.plays || 0,
          correct: g.totalCorrect || 0,
          wrong: g.totalWrong || 0,
          time: g.totalTimeSeconds || 0,
          bestScore: g.bestScore || 0,
          lastPlayed: g.lastPlayedAt
        };
      }).filter((g): g is NonNullable<typeof g> => !!g);

      const activeGames = gamesList.filter(g => g.plays > 0);
      const sorted = [...activeGames].sort((a, b) => b.accuracy - a.accuracy);
      
      const excel = sorted.slice(0, 2);
      const suck = sorted.length > 2 ? sorted.slice(-2).reverse() : [];
      
      return { excel, suck, all: sorted };
    } catch (e) {
      return { excel: [], suck: [], all: [] };
    }
  }, [user?.stats?.games]);

  const countryLookup = useMemo(() => {
    const map = new Map<string, string>();
    MOCK_COUNTRIES.forEach((c) => map.set(c.id, c.name));
    return map;
  }, []);

  const formatTime = (seconds: number) => {
    const s = seconds || 0;
    const mins = Math.floor(s / 60);
    const hours = Math.floor(mins / 60);
    if (hours > 0) return `${hours}h ${mins % 60}m`;
    return `${mins}m ${s % 60}s`;
  };

  const tierThresholds = [
    { tier: 'Explorer', color: 'bg-blue-500' },
    { tier: 'Voyager', color: 'bg-emerald-500' },
    { tier: 'Pathfinder', color: 'bg-sky-500' },
    { tier: 'Navigator', color: 'bg-indigo-500' },
    { tier: 'Cartographer', color: 'bg-amber-500' },
    { tier: 'Ambassador', color: 'bg-orange-500' },
    { tier: 'Strategist', color: 'bg-purple-500' },
    { tier: 'Master', color: 'bg-fuchsia-500' },
    { tier: 'Legend', color: 'bg-rose-500' },
    { tier: 'Grandmaster', color: 'bg-yellow-500' },
  ];

  const isAuthInitializing = authLoading && (!user || user.id === 'guest');
  
  if (isRedirecting || isAuthInitializing) {
    return (
      <div className="pt-32 pb-16 px-6 bg-surface-dark min-h-screen flex flex-col items-center justify-center text-center">
        <div className="w-12 h-12 border-4 border-sky border-t-transparent rounded-full animate-spin" />
        <p className="mt-4 text-white/40 text-[10px] font-black uppercase tracking-widest">
          {isRedirecting ? 'Ending Session...' : 'Identifying Explorer...'}
        </p>
      </div>
    );
  }

  const renderContent = () => {
    try {
      if (!isAuthenticated) {
    // Filled icon components for solid appearance
    const FilledTrophy = () => (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor" className="text-sky">
        <path d="M12 2C13.1 2 14 2.9 14 4V5H17C18.1 5 19 5.9 19 7V9C19 11.21 17.21 13 15 13H14.73C14.37 14.17 13.29 15 12 15C10.71 15 9.63 14.17 9.27 13H9C6.79 13 5 11.21 5 9V7C5 5.9 5.9 5 7 5H10V4C10 2.9 10.9 2 12 2ZM7 7V9C7 10.1 7.9 11 9 11V7H7ZM15 11C16.1 11 17 10.1 17 9V7H15V11ZM8 17H16V19C16 20.1 15.1 21 14 21H10C8.9 21 8 20.1 8 19V17Z"/>
      </svg>
    );
    
    const FilledGlobe = () => (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" className="text-accent">
        <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM11 19.93C7.05 19.44 4 16.08 4 12C4 11.38 4.08 10.79 4.21 10.21L9 15V16C9 17.1 9.9 18 11 18V19.93ZM17.9 17.39C17.64 16.58 16.9 16 16 16H15V13C15 12.45 14.55 12 14 12H8V10H10C10.55 10 11 9.55 11 9V7H13C14.1 7 15 6.1 15 5V4.59C17.93 5.78 20 8.65 20 12C20 14.08 19.2 15.97 17.9 17.39Z"/>
      </svg>
    );
    
    const FilledMedal = () => (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-purple-400">
        <path d="M12 2L14.4 5.2L18 4L17.2 7.8L21 9.6L18.4 12L21 14.4L17.2 16.2L18 20L14.4 18.8L12 22L9.6 18.8L6 20L6.8 16.2L3 14.4L5.6 12L3 9.6L6.8 7.8L6 4L9.6 5.2L12 2Z"/>
        <circle cx="12" cy="12" r="4" fill="rgba(0,0,0,0.3)"/>
      </svg>
    );
    
    const FilledTrophySmall = () => (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C13.1 2 14 2.9 14 4V5H17C18.1 5 19 5.9 19 7V9C19 11.21 17.21 13 15 13H14.73C14.37 14.17 13.29 15 12 15C10.71 15 9.63 14.17 9.27 13H9C6.79 13 5 11.21 5 9V7C5 5.9 5.9 5 7 5H10V4C10 2.9 10.9 2 12 2ZM7 7V9C7 10.1 7.9 11 9 11V7H7ZM15 11C16.1 11 17 10.1 17 9V7H15V11ZM8 17H16V19C16 20.1 15.1 21 14 21H10C8.9 21 8 20.1 8 19V17Z"/>
      </svg>
    );
    
    const FilledFlame = () => (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 23C16.1421 23 19.5 19.6421 19.5 15.5C19.5 14.1 19.1 12.8 18.4 11.6C18.3 11.4 18.2 11.3 18.1 11.1C17.4 10.1 16.5 9.3 15.7 8.4C14.1 6.6 13 4.5 13 2V1L12 2C11.7 2.3 11.4 2.6 11.1 3C9.5 5 8.5 7.2 8.5 9.5C8.5 10.4 8.7 11.2 9 12C8.4 11.4 8 10.5 8 9.5C8 9 8.1 8.5 8.2 8C5.9 9.7 4.5 12.4 4.5 15.5C4.5 19.6421 7.85786 23 12 23ZM12 21C10.3431 21 9 19.6569 9 18C9 16.8 9.6 15.7 10.5 15C10.4 15.3 10.3 15.6 10.3 16C10.3 17.4 11.4 18.5 12.8 18.5C14.2 18.5 15.3 17.4 15.3 16C15.3 14.8 14.5 13.8 13.4 13.5C14.9 13.8 16 15.2 16 16.8C16 19.1 14.3 21 12 21Z"/>
      </svg>
    );
    
    const FilledChart = () => (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <rect x="3" y="12" width="4" height="9" rx="1"/>
        <rect x="10" y="6" width="4" height="15" rx="1"/>
        <rect x="17" y="3" width="4" height="18" rx="1"/>
      </svg>
    );

    return (
      <div className="pt-28 pb-16 px-6 bg-[#0F172A] min-h-screen flex flex-col items-center justify-center text-center relative overflow-hidden">
        {/* Rich animated background */}
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
          <div className="absolute inset-0 bg-[#0F172A]" />
          <motion.div 
            animate={{ 
              scale: [1, 1.1, 1],
              opacity: [0.15, 0.25, 0.15]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[-30%] left-[-20%] w-[140%] h-[140%] bg-[radial-gradient(circle_at_center,rgba(0,194,255,0.15)_0%,transparent_50%)] blur-[100px]" 
          />
          <motion.div 
            animate={{ 
              scale: [1, 1.15, 1],
              opacity: [0.1, 0.2, 0.1]
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute bottom-[-20%] right-[-20%] w-[120%] h-[120%] bg-[radial-gradient(circle_at_center,rgba(52,199,89,0.1)_0%,transparent_50%)] blur-[80px]" 
          />
          <motion.div 
            animate={{ 
              scale: [1, 1.08, 1],
              x: [0, 30, 0],
              y: [0, -20, 0]
            }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute top-[20%] right-[10%] w-[60%] h-[60%] bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.08)_0%,transparent_50%)] blur-[60px]" 
          />
        </div>

        {/* Decorative floating elements */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="absolute top-[15%] left-[10%] z-0 hidden lg:block"
        >
          <motion.div
            animate={{ 
              y: [0, -15, 5, -10, 0],
              rotate: [0, 5, -3, 2, 0]
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="w-20 h-20 bg-sky/10 backdrop-blur-xl border border-sky/20 rounded-2xl flex items-center justify-center shadow-lg">
              <FilledTrophy />
          </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="absolute bottom-[20%] right-[8%] z-0 hidden lg:block"
        >
          <motion.div
            animate={{ 
              y: [0, 12, -8, 15, 0],
              rotate: [0, -4, 6, -2, 0]
            }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          >
            <div className="w-16 h-16 bg-accent/10 backdrop-blur-xl border border-accent/20 rounded-xl flex items-center justify-center shadow-lg">
              <FilledGlobe />
          </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="absolute top-[35%] right-[15%] z-0 hidden lg:block"
        >
          <motion.div
            animate={{ 
              y: [0, -20, 10, -5, 0],
              x: [0, 10, -5, 8, 0]
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          >
            <div className="w-12 h-12 bg-purple-500/10 backdrop-blur-xl border border-purple-500/20 rounded-lg flex items-center justify-center shadow-lg">
              <FilledMedal />
        </div>
          </motion.div>
        </motion.div>

        {/* Main content */}
        <motion.div 
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 w-full max-w-xl mx-auto"
        >
          <div className="relative bg-white/[0.08] backdrop-blur-2xl border border-white/20 rounded-[2.5rem] shadow-[0_32px_64px_rgba(0,0,0,0.4)] p-8 md:p-10 space-y-6 overflow-hidden">
            {/* Glossy overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-60 pointer-events-none rounded-[2.5rem]" />
            
            {/* Top accent line */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-transparent via-sky to-transparent rounded-full" />

            {/* Icon with animated ring */}
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3, type: "spring", stiffness: 200 }}
              className="relative mx-auto w-fit"
            >
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-sky via-cyan-400 to-sky-light text-white flex items-center justify-center border border-white/30 relative overflow-hidden">
                <Compass size={40} className="relative z-10 drop-shadow-lg" strokeWidth={2.5} />
                <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/20 to-white/40 opacity-60" />
              </div>
              {/* Animated ring */}
              <motion.div
                animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                className="absolute inset-0 rounded-2xl border-2 border-sky/50"
              />
            </motion.div>

            {/* Text content */}
            <div className="space-y-3 relative z-10">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-3xl md:text-4xl font-display font-black text-white uppercase tracking-tight leading-none drop-shadow-[0_4px_20px_rgba(0,0,0,0.5)]"
              >
                Join the<br />
                <span className="bg-clip-text bg-gradient-to-r from-sky via-cyan-400 to-sky-light [-webkit-text-fill-color:transparent]">
                  Expedition
                </span>
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="text-white/50 text-sm font-bold uppercase tracking-[0.15em] leading-relaxed"
              >
                Sign in to track progress, earn achievements, and unlock your full potential.
              </motion.p>
            </div>

            {/* Feature highlights */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="grid grid-cols-3 gap-3 relative z-10"
            >
              {[
                { icon: <FilledTrophySmall />, label: "Rewards" },
                { icon: <FilledFlame />, label: "Streaks" },
                { icon: <FilledChart />, label: "Stats" }
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-center gap-2 p-3 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-colors">
                  <div className="text-sky">{item.icon}</div>
                  <span className="text-[9px] font-black uppercase tracking-widest text-white/40">{item.label}</span>
          </div>
              ))}
            </motion.div>

            {/* CTA buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="flex flex-col gap-4 relative z-10 pt-2"
            >
              <Link to="/auth" state={{ from: location }} className="group">
                <Button size="lg" className="w-full uppercase tracking-[0.15em] font-black">
                  Sign In / Create Account
                </Button>
              </Link>
              <Link 
                to="/" 
                className="group flex items-center justify-center gap-2 text-[10px] font-black text-white/40 hover:text-white uppercase tracking-[0.3em] transition-all duration-300 py-3"
              >
                <motion.span
                  animate={{ x: [0, -4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="group-hover:text-sky"
                >
                  ←
                </motion.span>
                <span>Return to Home</span>
            </Link>
            </motion.div>
          </div>

          {/* Bottom glow effect */}
          <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-3/4 h-20 bg-sky/20 blur-3xl rounded-full pointer-events-none" />
        </motion.div>
      </div>
    );
  }

      const stats = user?.stats || { totalCorrect: 0, totalWrong: 0, totalTimeSeconds: 0, games: {}, byRegion: {}, byCountry: {} };
      const lp = loyaltyProgress || { tier: 'Explorer', progressToNext: 0, points: 0 };
      const accuracy = Math.round(((stats.totalCorrect || 0) / Math.max(1, (stats.totalCorrect || 0) + (stats.totalWrong || 0))) * 100);

  return (
    <div className="pt-28 pb-16 px-6 bg-surface-dark min-h-screen relative overflow-hidden">
      <SEO 
        title="My Profile" 
        description="View your ExploreCapitals profile, achievements, game statistics, and progress. Track your geography learning journey."
      />
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-surface-dark">
        <div className="absolute top-[-20%] left-[-10%] w-[120%] h-[120%] bg-[radial-gradient(circle_at_center,rgba(0,194,255,0.12)_0%,transparent_70%)] blur-[120px] animate-pulse-slow" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[100%] h-[100%] bg-[radial-gradient(circle_at_center,rgba(52,199,89,0.06)_0%,transparent_60%)] blur-[100px] animate-pulse-slow delay-700" />
      </div>

      <div className="max-w-5xl mx-auto space-y-8 relative z-10">
            <AnimatePresence>
              {isSyncing && (
                <motion.div 
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="absolute -top-12 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-1.5 bg-sky/10 border border-sky/20 rounded-full"
                >
                  <div className="w-2 h-2 bg-sky rounded-full animate-pulse" />
                  <span className="text-[9px] font-black text-sky uppercase tracking-widest">Syncing Data...</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            <div className="relative group">
              <div className="w-20 h-20 rounded-full bg-gel-blue text-white flex items-center justify-center font-display font-black text-3xl shadow-lg border-2 border-white/60 overflow-hidden shrink-0 relative">
                {renderAvatar()}
                <div className="absolute inset-0 bg-glossy-gradient opacity-60 pointer-events-none" />
              </div>
              <Link to="/settings" className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-white/40 backdrop-blur-3xl flex items-center justify-center text-white hover:text-sky transition-all border border-white/50">
                <Settings size={14} />
              </Link>
            </div>
              <div>
                <p className="text-[9px] text-sky-light uppercase font-black tracking-[0.3em] mb-1.5 drop-shadow-sm">
                  <Sparkles size={10} className="inline mr-1 mb-0.5" />
                    {lp.tier}
                </p>
                  <h1 className="text-3xl font-display font-black text-white leading-tight uppercase tracking-tighter drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]">
                    Welcome, {authUser?.displayName || user?.name || 'Explorer'}
                  </h1>
                <div className="flex items-center gap-4 mt-3">
                  <Link to="/settings" className="text-[9px] font-black uppercase tracking-widest text-white/60 hover:text-sky transition-colors flex items-center gap-1.5">
                    <Settings size={12} /> Settings
                  </Link>
                  <div className="w-1 h-1 rounded-full bg-white/20" />
                  <button onClick={() => setShowSignOutModal(true)} className="flex items-center gap-1.5 text-[9px] font-black uppercase tracking-widest text-red-400 hover:text-red-300 transition-colors">
                    <LogOut size={12} /> SIGN OUT
                  </button>
                </div>
              </div>
          </div>

              <Link to="/loyalty" className="group cursor-pointer flex items-center gap-4 bg-white/15 backdrop-blur-xl rounded-2xl shadow-lg border border-white/20 px-5 py-4 hover:bg-white/25 transition-all relative overflow-hidden">
            <div className="absolute inset-0 bg-glossy-gradient opacity-20 pointer-events-none" />
            <div className="flex flex-col relative z-10">
              <span className="text-lg font-display font-black text-white uppercase tracking-tight">
                {(lp.tier || 'Explorer').toUpperCase()}
              </span>
              <span className="text-[9px] font-black text-white/50 uppercase tracking-[0.2em]">
                {(lp.points || 0).toLocaleString()} Points
              </span>
            </div>
            <div className="flex-1 min-w-[100px]">
              <div className="flex justify-end items-center mb-2">
                    <span className="text-[9px] font-black text-sky-light uppercase tracking-[0.2em]">
                      LVL {(tierThresholds.findIndex(t => t.tier === lp.tier) || 0) + 1}
                    </span>
              </div>
              <div className="h-2 w-full bg-black/20 rounded-full overflow-hidden p-0.5 border border-white/30 shadow-inner">
                    <div className="h-full bg-frutiger-gradient rounded-full transition-all duration-1000 relative" style={{ width: `${lp.progressToNext || 0}%` }}>
                   <div className="absolute inset-0 bg-glossy-gradient opacity-50" />
                </div>
              </div>
            </div>
            <HelpCircle size={20} className="text-white/40 group-hover:text-sky transition-colors" />
          </Link>
        </div>

            {/* TABS */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex gap-8">
                <button onClick={() => setView('overview')} className={`text-[10px] font-black uppercase tracking-[0.2em] transition-colors relative group cursor-pointer ${view === 'overview' ? 'text-sky' : 'text-white/50 hover:text-white'}`}>
              Overview
              <div className={`absolute -bottom-4 left-0 h-0.5 bg-sky transition-all duration-300 ${view === 'overview' ? 'w-full' : 'w-0 group-hover:w-full opacity-50'}`} />
            </button>
                <button onClick={() => setView('detailed')} className={`text-[10px] font-black uppercase tracking-[0.2em] transition-colors relative group cursor-pointer ${view === 'detailed' ? 'text-sky' : 'text-white/50 hover:text-white'}`}>
              Detailed Analytics
              <div className={`absolute -bottom-4 left-0 h-0.5 bg-sky transition-all duration-300 ${view === 'detailed' ? 'w-full' : 'w-0 group-hover:w-full opacity-50'}`} />
            </button>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.15em] text-white/40">
                <Timer size={12} /> Total Time: {formatTime(stats.totalTimeSeconds)}
          </div>
        </div>

        {view === 'overview' ? (
          /* ==================== OVERVIEW TAB ==================== */
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-6"
          >
            {/* Quick Stats Bar */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <QuickStat icon={<Gamepad2 size={16} />} label="Games" value={totalPlays} />
              <QuickStat icon={<Flame size={16} />} label="Streak" value={`${user?.streakDays || 1}d`} />
              <QuickStat icon={<Target size={16} />} label="Accuracy" value={`${accuracy}%`} accent />
              <QuickStat icon={<Timer size={16} />} label="Time" value={formatTime(stats.totalTimeSeconds)} />
            </div>

            {/* Main Performance Panel */}
            <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl border border-white/20 overflow-hidden">
              <div className="px-6 py-4 border-b border-white/10 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-sky/20 flex items-center justify-center">
                  <TrendingUp size={16} className="text-sky" />
                </div>
                <h2 className="text-sm font-black uppercase tracking-[0.15em] text-white">Performance Summary</h2>
              </div>
              
              <div className="p-6 grid md:grid-cols-3 gap-6">
                {/* Accuracy Ring */}
                <div className="flex flex-col items-center justify-center py-4">
                  <CircularProgress value={accuracy} size={120} strokeWidth={8} />
                  <p className="mt-4 text-[10px] font-black uppercase tracking-widest text-white/50">Overall Accuracy</p>
                </div>

                {/* Correct/Wrong Breakdown */}
                <div className="flex flex-col justify-center space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                      <CheckCircle2 size={18} className="text-emerald-400" />
                    </div>
                    <div className="flex-1">
                      <p className="text-2xl font-black text-white">{(stats.totalCorrect || 0).toLocaleString()}</p>
                      <p className="text-[9px] font-bold uppercase tracking-widest text-white/40">Correct Answers</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-red-500/20 flex items-center justify-center">
                      <XCircle size={18} className="text-red-400" />
                    </div>
                    <div className="flex-1">
                      <p className="text-2xl font-black text-white">{(stats.totalWrong || 0).toLocaleString()}</p>
                      <p className="text-[9px] font-bold uppercase tracking-widest text-white/40">Wrong Answers</p>
                    </div>
                  </div>
                </div>

                {/* Game Performance Mini */}
                <div className="space-y-3">
                  <p className="text-[9px] font-black uppercase tracking-widest text-white/50 mb-3">Top Performing</p>
                  {gameProficiency.excel.length === 0 ? (
                    <p className="text-[10px] text-white/30 italic">Play games to see stats</p>
                  ) : (
                    gameProficiency.excel.slice(0, 3).map((g) => (
                      <div key={g.id} className="flex items-center gap-3">
                        <div className="flex-1">
                          <p className="text-[11px] font-bold text-white capitalize">{g.id.replace(/-/g, ' ')}</p>
                          <div className="mt-1 h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-gradient-to-r from-sky to-emerald-400 rounded-full" 
                              style={{ width: `${g.accuracy}%` }} 
                            />
                          </div>
                        </div>
                        <span className="text-[10px] font-black text-emerald-400">{Math.round(g.accuracy)}%</span>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>

            {/* Knowledge Map - Countries */}
            <div className="grid md:grid-cols-2 gap-4">
              <KnowledgePanel 
                title="Mastered Countries" 
                icon={<CheckCircle2 size={16} className="text-emerald-400" />}
                items={strengths?.slice(0, 5).map(s => ({ 
                  name: countryLookup.get(s.countryId) || 'Unknown', 
                  value: Math.round((s.score || 0) * 100) 
                })) || []}
                emptyText="Play more games to identify strengths"
                variant="success"
              />
              <KnowledgePanel 
                title="Needs Practice" 
                icon={<Brain size={16} className="text-red-400" />}
                items={weaknesses?.slice(0, 5).map(w => ({ 
                  name: countryLookup.get(w.countryId) || 'Unknown', 
                  value: Math.round((w.score || 0) * 100) 
                })) || []}
                emptyText="Your weak areas will appear here"
                variant="danger"
              />
            </div>

            {/* Regional Performance */}
            <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl border border-white/20 overflow-hidden">
              <div className="px-6 py-4 border-b border-white/10 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center">
                  <Globe size={16} className="text-purple-400" />
                </div>
                <h2 className="text-sm font-black uppercase tracking-[0.15em] text-white">Regional Mastery</h2>
            </div>

              <div className="p-6">
                {(!regionStrengths || regionStrengths.length === 0) && (!regionWeaknesses || regionWeaknesses.length === 0) ? (
                  <p className="text-center text-[10px] text-white/30 italic py-8">Play more games to see regional breakdown</p>
                ) : (
            <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <p className="text-[9px] font-black uppercase tracking-widest text-emerald-400/80 flex items-center gap-2">
                        <Medal size={12} /> Strongest Regions
                      </p>
                      {regionStrengths?.slice(0, 4).map(r => (
                        <RegionBar key={r.region} region={r.region} value={Math.round((r.accuracy || 0) * 100)} attempts={r.attempts} variant="success" />
                      ))}
                      {(!regionStrengths || regionStrengths.length === 0) && (
                        <p className="text-[10px] text-white/30 italic">No data yet</p>
                      )}
            </div>
                    <div className="space-y-3">
                      <p className="text-[9px] font-black uppercase tracking-widest text-amber-400/80 flex items-center gap-2">
                        <MapPin size={12} /> Focus Areas
                      </p>
                      {regionWeaknesses?.slice(0, 4).map(r => (
                        <RegionBar key={r.region} region={r.region} value={Math.round((r.accuracy || 0) * 100)} attempts={r.attempts} variant="warning" />
                      ))}
                      {(!regionWeaknesses || regionWeaknesses.length === 0) && (
                        <p className="text-[10px] text-white/30 italic">No data yet</p>
                      )}
          </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ) : (
          /* ==================== DETAILED ANALYTICS TAB ==================== */
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-6"
          >
            {/* Stats Summary Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <AnalyticCard 
                icon={<CheckCircle2 size={20} />} 
                label="Correct" 
                value={(stats.totalCorrect || 0).toLocaleString()} 
                color="emerald"
              />
              <AnalyticCard 
                icon={<XCircle size={20} />} 
                label="Incorrect" 
                value={(stats.totalWrong || 0).toLocaleString()} 
                color="red"
              />
              <AnalyticCard 
                icon={<Target size={20} />} 
                label="Accuracy" 
                value={`${accuracy}%`} 
                color="sky"
              />
              <AnalyticCard 
                icon={<Timer size={20} />} 
                label="Total Time" 
                value={formatTime(stats.totalTimeSeconds)} 
                color="purple"
              />
            </div>

            {/* Game Breakdown */}
            <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl border border-white/20 overflow-hidden">
              <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-sky/20 flex items-center justify-center">
                    <Gamepad2 size={16} className="text-sky" />
              </div>
                  <h2 className="text-sm font-black uppercase tracking-[0.15em] text-white">Game Performance</h2>
                </div>
                <span className="text-[9px] font-bold text-white/40 uppercase tracking-widest">
                  {Object.keys(stats.games || {}).length} Games
                </span>
              </div>
              
              <div className="divide-y divide-white/5">
                        {Object.values(stats.games || {}).length === 0 ? (
                  <div className="px-6 py-16 text-center">
                    <Gamepad2 size={32} className="mx-auto text-white/20 mb-4" />
                    <p className="text-[11px] text-white/30 font-bold uppercase tracking-widest">No games played yet</p>
                    <Link to="/games" className="inline-block mt-4 text-[10px] font-black text-sky uppercase tracking-widest hover:text-sky-light transition-colors">
                      Start Playing →
                    </Link>
                  </div>
                    ) : (
                          Object.values(stats.games || {}).map((g) => {
                            if (!g) return null;
                    const gameAcc = Math.round(((g.totalCorrect || 0) / Math.max(1, (g.totalCorrect || 0) + (g.totalWrong || 0))) * 100);
                    const isExpanded = expandedGame === g.gameId;
                    
                        return (
                      <div key={g.gameId} className="group">
                        <button 
                          onClick={() => setExpandedGame(isExpanded ? null : (g.gameId || null))}
                          className="w-full px-6 py-4 flex items-center gap-4 hover:bg-white/5 transition-colors text-left"
                        >
                          <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                            <Gamepad2 size={18} className="text-sky-light" />
                                </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-black text-white capitalize truncate">{(g.gameId || '').replace(/-/g, ' ')}</p>
                            <p className="text-[9px] text-white/40 font-bold uppercase tracking-widest mt-0.5">
                              {g.plays || 0} plays • Last: {g.lastPlayedAt ? new Date(g.lastPlayedAt).toLocaleDateString() : 'Never'}
                            </p>
                              </div>
                          <div className="flex items-center gap-4">
                            <div className="text-right hidden sm:block">
                              <p className="text-lg font-black text-white">{gameAcc}%</p>
                              <p className="text-[8px] text-white/40 uppercase tracking-widest">Accuracy</p>
                            </div>
                            <div className={`w-6 h-6 rounded-full bg-white/10 flex items-center justify-center transition-transform ${isExpanded ? 'rotate-180' : ''}`}>
                              <ChevronDown size={14} className="text-white/60" />
                            </div>
                                </div>
                        </button>
                        
                        <AnimatePresence>
                          {isExpanded && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              className="overflow-hidden"
                            >
                              <div className="px-6 pb-4 pt-2 grid grid-cols-2 md:grid-cols-4 gap-3 bg-white/5">
                                <MiniStat label="Correct" value={g.totalCorrect || 0} color="emerald" />
                                <MiniStat label="Wrong" value={g.totalWrong || 0} color="red" />
                                <MiniStat label="Best Score" value={(g.bestScore || 0).toLocaleString()} color="amber" />
                                <MiniStat label="Time Spent" value={formatTime(g.totalTimeSeconds)} color="purple" />
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                        );
                      })
                    )}
              </div>
            </div>

            {/* Detailed Region Breakdown */}
            <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl border border-white/20 overflow-hidden">
              <div className="px-6 py-4 border-b border-white/10 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center">
                  <BarChart size={16} className="text-purple-400" />
                </div>
                <h2 className="text-sm font-black uppercase tracking-[0.15em] text-white">Region Breakdown</h2>
              </div>
              
              <div className="p-6">
                {(!regionStrengths || regionStrengths.length === 0) && (!regionWeaknesses || regionWeaknesses.length === 0) ? (
                  <div className="text-center py-12">
                    <Globe size={32} className="mx-auto text-white/20 mb-4" />
                    <p className="text-[11px] text-white/30 font-bold uppercase tracking-widest">No regional data available</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {[...(regionStrengths || []), ...(regionWeaknesses || [])]
                      .filter((r, i, arr) => arr.findIndex(x => x.region === r.region) === i)
                      .sort((a, b) => (b.accuracy || 0) - (a.accuracy || 0))
                      .map(r => (
                        <DetailedRegionRow 
                          key={r.region} 
                          region={r.region} 
                          accuracy={Math.round((r.accuracy || 0) * 100)} 
                          attempts={r.attempts || 0}
                        />
                      ))
                    }
          </div>
                )}
            </div>
          </div>
          </motion.div>
        )}

            {/* BADGES */}
        <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl border border-white/20 overflow-hidden">
          <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-amber-500/20 flex items-center justify-center">
                <Award size={16} className="text-amber-400" />
            </div>
              <h2 className="text-sm font-black uppercase tracking-[0.15em] text-white">Achievements</h2>
            </div>
            <div className="text-[9px] font-black uppercase tracking-[0.15em] text-sky-light bg-sky/10 px-3 py-1.5 rounded-xl border border-sky/20">
                  {(user?.achievements || []).length} / {ALL_ACHIEVEMENTS.length} UNLOCKED
            </div>
          </div>
          
          <div className="p-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {/* Unlocked achievements first */}
              {[...(user?.achievements || [])].reverse().map((ach) => (
                <div key={ach.id} className="group border border-white/10 rounded-2xl p-4 bg-white/5 hover:bg-white/10 hover:border-white/20 transition-all">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 text-amber-300 flex items-center justify-center text-2xl mb-3 border border-amber-500/20">
                    {getAchievementIcon(ach)}
                  </div>
                  <p className="text-[11px] font-black text-white leading-tight mb-1">{ach.title}</p>
                  <p className="text-[9px] text-white/40 leading-tight line-clamp-2">{ach.description}</p>
                </div>
              ))}
              {/* Locked achievements */}
              {ALL_ACHIEVEMENTS.filter(a => !(user?.achievements || []).some(ua => ua.id === a.id)).map((ach) => (
                <div key={ach.id} className="group border border-white/5 rounded-2xl p-4 bg-black/20 opacity-50 hover:opacity-70 transition-all">
                  <div className="w-12 h-12 rounded-xl bg-white/5 text-white/20 flex items-center justify-center text-2xl mb-3 border border-white/5 relative">
                    <span className="grayscale">{ach.icon}</span>
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-black/80 border border-white/10 flex items-center justify-center">
                      <Lock size={10} className="text-white/40" />
                    </div>
                  </div>
                  <p className="text-[11px] font-black text-white/30 leading-tight mb-1">{ach.title}</p>
                  <p className="text-[9px] text-white/20 leading-tight line-clamp-2">{ach.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <ConfirmationModal
        isOpen={showSignOutModal}
        onClose={() => setShowSignOutModal(false)}
        onConfirm={handleSignOut}
        title="SIGN OUT?"
        message="Are you sure you want to end your session? Your progress is safely stored in your account."
        confirmText="SIGN OUT"
        variant="danger"
      />
    </div>
  );
    } catch (err: any) {
      return (
        <div className="pt-32 text-center text-white p-10">
          <h2 className="text-2xl font-black uppercase mb-4">View Error</h2>
          <p className="text-red-400 font-mono text-xs bg-black/50 p-4 rounded-xl border border-white/10">
            {err.message}
          </p>
          <Button onClick={() => window.location.reload()} className="mt-8">Reload App</Button>
        </div>
      );
    }
  };

  return renderContent();
};

/* ==================== HELPER FUNCTIONS ==================== */

// Maps achievement IDs/titles to appropriate icons (fixes old achievements with generic icons)
const getAchievementIcon = (ach: { id: string; title: string; icon?: string }): string => {
  // If icon exists and isn't the generic Africa globe, use it
  if (ach.icon && ach.icon !== '🌍') return ach.icon;
  
  // Region-specific icon mapping based on achievement ID or title
  const regionIconMap: Record<string, string> = {
    'africa': '🦁',
    'europe': '🏰',
    'asia': '🏯',
    'north-america': '🗽',
    'north america': '🗽',
    'south-america': '🌴',
    'south america': '🌴',
    'oceania': '🏝️',
    'middle-east': '🕌',
    'middle east': '🕌',
    'caribbean': '🌺',
    'central-america': '🌋',
    'central america': '🌋',
    'southeast-asia': '🐘',
    'southeast asia': '🐘',
    'east-asia': '🐉',
    'east asia': '🐉',
    'south-asia': '🕉️',
    'south asia': '🕉️',
    'western-europe': '🗼',
    'western europe': '🗼',
    'eastern-europe': '⛪',
    'eastern europe': '⛪',
    'northern-europe': '🏔️',
    'northern europe': '🏔️',
    'southern-europe': '🏛️',
    'southern europe': '🏛️',
    'central-asia': '🐫',
    'central asia': '🐫',
    'pacific': '🌊',
  };
  
  // Achievement type icons
  const typeIconMap: Record<string, string> = {
    'first-game': '🧭',
    'first-expedition': '🧭',
    'capital-quiz': '⚡',
    'rapid-recall': '⚡',
    'map-dash': '🗺️',
    'cartographic': '🗺️',
    'flag-frenzy': '🚩',
    'flag-savant': '🚩',
  };
  
  const idLower = ach.id.toLowerCase();
  const titleLower = ach.title.toLowerCase();
  
  // Check for region-based achievements
  for (const [key, icon] of Object.entries(regionIconMap)) {
    if (idLower.includes(key) || titleLower.includes(key)) {
      return icon;
    }
  }
  
  // Check for achievement type
  for (const [key, icon] of Object.entries(typeIconMap)) {
    if (idLower.includes(key) || titleLower.includes(key)) {
      return icon;
    }
  }
  
  // Fallback to stored icon or default medal
  return ach.icon || '🏅';
};

/* ==================== COMPONENT HELPERS ==================== */

const CircularProgress: React.FC<{ value: number; size?: number; strokeWidth?: number }> = ({ 
  value, size = 120, strokeWidth = 8 
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (value / 100) * circumference;
  
  return (
    <div className="relative" style={{ width: size, height: size }}>
      {/* Main SVG */}
      <svg className="transform -rotate-90 relative z-10" width={size} height={size}>
        <defs>
          <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#00C2FF" />
            <stop offset="50%" stopColor="#22D3EE" />
            <stop offset="100%" stopColor="#67E8F9" />
          </linearGradient>
        </defs>
        
        {/* Background track */}
        <circle
          stroke="rgba(255, 255, 255, 0.1)"
          strokeWidth={strokeWidth}
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        
        {/* Progress arc */}
        <circle
          stroke="url(#progressGradient)"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      
      {/* Center text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
        <span className="text-3xl font-black text-white">{value}%</span>
      </div>
    </div>
  );
};

const QuickStat: React.FC<{ icon: React.ReactNode; label: string; value: string | number; accent?: boolean }> = ({ 
  icon, label, value, accent 
}) => (
  <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/10 px-4 py-3 flex items-center gap-3">
    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${accent ? 'bg-sky/20 text-sky' : 'bg-white/10 text-white/60'}`}>
      {icon}
    </div>
    <div>
      <p className={`text-lg font-black ${accent ? 'text-sky' : 'text-white'}`}>{value}</p>
      <p className="text-[8px] font-bold uppercase tracking-widest text-white/40">{label}</p>
    </div>
  </div>
);

const KnowledgePanel: React.FC<{
  title: string;
  icon: React.ReactNode;
  items: { name: string; value: number }[];
  emptyText: string;
  variant: 'success' | 'warning' | 'danger';
}> = ({ title, icon, items, emptyText, variant }) => (
  <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl border border-white/20 p-5">
    <div className="flex items-center gap-2 mb-4">
      {icon}
      <h3 className="text-[11px] font-black uppercase tracking-widest text-white">{title}</h3>
      </div>
    {items.length === 0 ? (
      <p className="text-[10px] text-white/30 italic">{emptyText}</p>
    ) : (
      <div className="space-y-2">
        {items.map((item, i) => (
          <div key={i} className="flex items-center justify-between gap-3">
            <span className="text-[11px] font-bold text-white/80 truncate flex-1">{item.name}</span>
            <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${
              variant === 'success' 
                ? 'bg-emerald-500/20 text-emerald-400' 
                : variant === 'danger'
                ? 'bg-red-500/20 text-red-400'
                : 'bg-amber-500/20 text-amber-400'
            }`}>
              {item.value}%
            </span>
          </div>
        ))}
      </div>
    )}
  </div>
);

const RegionBar: React.FC<{ region: string; value: number; attempts: number; variant: 'success' | 'warning' }> = ({ 
  region, value, attempts, variant 
}) => (
  <div className="bg-white/5 rounded-xl px-4 py-3 border border-white/10">
    <div className="flex items-center justify-between mb-2">
      <span className="text-[11px] font-bold text-white">{region}</span>
      <span className={`text-[10px] font-black ${variant === 'success' ? 'text-emerald-400' : 'text-amber-400'}`}>
        {value}%
      </span>
      </div>
    <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
      <div 
        className={`h-full rounded-full transition-all duration-500 ${
          variant === 'success' 
            ? 'bg-gradient-to-r from-emerald-500 to-emerald-400' 
            : 'bg-gradient-to-r from-amber-500 to-amber-400'
        }`}
        style={{ width: `${value}%` }}
      />
            </div>
    <p className="text-[8px] text-white/40 mt-1.5 uppercase tracking-widest">{attempts} attempts</p>
          </div>
);

const AnalyticCard: React.FC<{ icon: React.ReactNode; label: string; value: string; color: string }> = ({ 
  icon, label, value, color 
}) => {
  const colorClasses: Record<string, string> = {
    emerald: 'bg-emerald-500/20 text-emerald-400',
    red: 'bg-red-500/20 text-red-400',
    sky: 'bg-sky/20 text-sky',
    purple: 'bg-purple-500/20 text-purple-400',
    amber: 'bg-amber-500/20 text-amber-400',
  };
  
  return (
    <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl border border-white/20 p-4 text-center">
      <div className={`w-10 h-10 rounded-xl ${colorClasses[color]} flex items-center justify-center mx-auto mb-3`}>
        {icon}
      </div>
      <p className="text-2xl font-black text-white">{value}</p>
      <p className="text-[9px] font-bold uppercase tracking-widest text-white/40 mt-1">{label}</p>
  </div>
);
};

const MiniStat: React.FC<{ label: string; value: string | number; color: string }> = ({ label, value, color }) => {
  const colorClasses: Record<string, string> = {
    emerald: 'text-emerald-400',
    red: 'text-red-400',
    amber: 'text-amber-400',
    purple: 'text-purple-400',
  };
  
  return (
    <div className="bg-white/5 rounded-xl px-3 py-2 text-center border border-white/5">
      <p className={`text-lg font-black ${colorClasses[color] || 'text-white'}`}>{value}</p>
      <p className="text-[8px] font-bold uppercase tracking-widest text-white/40">{label}</p>
      </div>
  );
};

const DetailedRegionRow: React.FC<{ region: string; accuracy: number; attempts: number }> = ({ 
  region, accuracy, attempts 
}) => {
  const getAccuracyColor = (acc: number) => {
    if (acc >= 80) return 'text-emerald-400';
    if (acc >= 60) return 'text-sky';
    if (acc >= 40) return 'text-amber-400';
    return 'text-red-400';
  };
  
  const getBarColor = (acc: number) => {
    if (acc >= 80) return 'from-emerald-500 to-emerald-400';
    if (acc >= 60) return 'from-sky to-cyan-400';
    if (acc >= 40) return 'from-amber-500 to-amber-400';
    return 'from-red-500 to-red-400';
  };

  return (
    <div className="flex items-center gap-4">
      <div className="w-28 flex-shrink-0">
        <p className="text-[11px] font-bold text-white truncate">{region}</p>
        <p className="text-[8px] text-white/40 uppercase tracking-widest">{attempts} attempts</p>
    </div>
      <div className="flex-1">
        <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
          <div 
            className={`h-full rounded-full bg-gradient-to-r ${getBarColor(accuracy)} transition-all duration-500`}
            style={{ width: `${accuracy}%` }}
          />
            </div>
            </div>
      <span className={`text-sm font-black ${getAccuracyColor(accuracy)} w-12 text-right`}>{accuracy}%</span>
  </div>
);
};

export default Profile;
