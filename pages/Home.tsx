import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Trophy, BookOpen, ArrowRight, Compass, Globe2, GraduationCap, Zap, MapPin, UserPlus, Play, User } from 'lucide-react';
import Button from '../components/Button';
import SEO from '../components/SEO';
import RevealSection from '../components/RevealSection';
import { useLayout } from '../context/LayoutContext';
import { useAuth } from '../context/AuthContext';
import { useUser } from '../context/UserContext';
import { ResponsiveAd } from '../components/AdSense';
import { MOCK_COUNTRIES } from '../constants';
import { staticTours } from '../data/staticTours';
import { getStaticImages } from '../data/images';
import { toSlug } from '../utils/slug';

const Section: React.FC<{
  children: React.ReactNode;
  background?: React.ReactNode;
  className?: string;
}> = ({ children, background, className = '' }) => (
  <section className={`relative overflow-hidden isolate w-full ${className}`}>
    {background && (
      <div className="absolute inset-0 z-0 pointer-events-none">
        {background}
      </div>
    )}
    <div
      className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-5 md:px-6 lg:px-8"
      style={{ paddingLeft: 'max(env(safe-area-inset-left, 16px), 16px)', paddingRight: 'max(env(safe-area-inset-right, 16px), 16px)' }}
    >
      {children}
    </div>
  </section>
);

const Home: React.FC = () => {
  const { setPageLoading } = useLayout();
  const { isAuthenticated, isLoading: loading } = useUser();
  const [factImage, setFactImage] = useState('');
  useEffect(() => {
    setPageLoading(false);
    // Dismiss the HTML splash-screen loader (prevents double-spinner)
    (window as any).__dismissLoader?.();
  }, [setPageLoading]);

  // Stop of the Day — seeded by today's date so it changes daily
  const factOfTheDay = useMemo(() => {
    const today = new Date();
    const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();

    // Simple seeded pseudo-random
    const seededRandom = (s: number) => {
      const x = Math.sin(s) * 10000;
      return x - Math.floor(x);
    };

    // Pick a country that has tour data
    const countriesWithTours = MOCK_COUNTRIES.filter(c => staticTours[c.name]?.stops?.length > 0);
    const countryIndex = Math.floor(seededRandom(seed) * countriesWithTours.length);
    const country = countriesWithTours[countryIndex];
    const tour = staticTours[country.name];

    // Pick a random stop from that country's tour
    const stopIndex = Math.floor(seededRandom(seed + 1) * tour.stops.length);
    const stop = tour.stops[stopIndex];

    // Pick a fun fact paragraph from the stop's description
    const factIndex = Math.floor(seededRandom(seed + 2) * stop.description.length);
    const fact = stop.description[factIndex];

    return { country, stop, fact };
  }, []);

  // Load STATIC_IMAGES asynchronously — does not block initial paint
  useEffect(() => {
    getStaticImages().then(images => {
      const img = images[factOfTheDay.stop.imageKeyword] || images[factOfTheDay.country.name] || '';
      setFactImage(img);
    });
  }, [factOfTheDay]);

  return (
    <main className="relative flex-grow bg-[#0F172A] w-full home-glow">
      <style>{`
        .home-glow h1, .home-glow h2 {
          text-shadow: 0 0 40px rgba(0,194,255,0.15), 0 0 80px rgba(0,194,255,0.08);
        }
        .home-glow h3 {
          text-shadow: 0 0 25px rgba(0,194,255,0.12), 0 0 50px rgba(0,194,255,0.06);
        }
        .home-glow .glow-badge {
          box-shadow: 0 0 15px rgba(0,194,255,0.15), 0 0 40px rgba(0,194,255,0.06);
        }
        .home-glow .glow-card {
          box-shadow: 0 0 30px rgba(0,194,255,0.08), 0 0 60px rgba(0,194,255,0.04);
        }
        .home-glow .glow-bubble {
          box-shadow: 0 0 20px rgba(0,194,255,0.2), 0 0 50px rgba(0,194,255,0.08), inset -4px -4px 12px rgba(255,255,255,0.25), inset 4px 4px 8px rgba(255,255,255,0.1);
        }
      `}</style>
      <SEO
        title="EXPLORECAPITALS.COM"
        description="Master world capitals, flags, and maps through fun geography games. Free educational platform with quizzes, an interactive atlas, and country database."
        isHomePage={true}
      />

      {/* ═══════════════ HERO ═══════════════ */}
      <Section
        className="min-h-screen flex items-center justify-center"
        background={
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_120%_80%_at_50%_-20%,rgba(0,194,255,0.08)_0%,transparent_50%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_80%_-10%,rgba(52,199,89,0.05)_0%,transparent_40%)]" />
            <div className="absolute top-0 left-0 right-0 h-[20%] bg-gradient-to-b from-[#0F172A] to-transparent" />
          </div>
        }
      >
        <div className="max-w-7xl mx-auto flex flex-col lg:grid lg:grid-cols-2 gap-2 sm:gap-3 lg:gap-x-10 lg:gap-y-3 xl:gap-x-16 xl:gap-y-4 items-center pt-20 sm:pt-24 md:pt-28 lg:pt-28 pb-12 sm:pb-16 md:pb-20">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left lg:col-start-1"
          >
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-white/5 backdrop-blur-xl border-2 border-white/30 rounded-full text-[8px] sm:text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] sm:tracking-[0.3em] text-white shadow-premium transition-all hover:bg-white/10 cursor-default glow-badge">
              <Zap size={10} fill="currentColor" className="animate-pulse text-sky sm:w-3 sm:h-3" />
              <span>Free Global Education</span>
            </div>
          </motion.div>

          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-center lg:text-left lg:col-start-1"
          >
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[4.5rem] xl:text-[7rem] font-display font-black text-white tracking-tighter leading-[1.05] uppercase drop-shadow-2xl overflow-visible">
              Play Your <br />
              <span className="bg-clip-text bg-gel-blue [-webkit-text-fill-color:transparent] overflow-visible" style={{ paddingBottom: '0.15em', paddingRight: '0.1em', display: 'inline-block' }}>
                Atlas.
              </span>
            </h1>
          </motion.div>

          {/* Globe */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative lg:col-start-2 lg:row-start-1 lg:row-span-5 flex justify-center items-center my-1 sm:my-2 lg:my-0"
          >
            <motion.div
              className="absolute w-[340px] h-[340px] sm:w-[440px] sm:h-[440px] md:w-[520px] md:h-[520px] lg:w-[580px] lg:h-[580px] xl:w-[880px] xl:h-[880px] rounded-full pointer-events-none"
              animate={{ opacity: [0.3, 0.5, 0.3], scale: [0.97, 1.03, 0.97] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              style={{ background: 'radial-gradient(circle, rgba(0,194,255,0.18) 0%, rgba(0,194,255,0.08) 35%, rgba(0,150,255,0.03) 60%, transparent 80%)' }}
            />
            <motion.div
              className="absolute w-[280px] h-[280px] sm:w-[360px] sm:h-[360px] md:w-[420px] md:h-[420px] lg:w-[480px] lg:h-[480px] xl:w-[720px] xl:h-[720px] rounded-full pointer-events-none"
              animate={{ opacity: [0.6, 1, 0.6], scale: [0.95, 1.05, 0.95] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              style={{ background: 'radial-gradient(circle, rgba(0,194,255,0.55) 0%, rgba(0,194,255,0.3) 30%, rgba(0,150,255,0.12) 55%, transparent 75%)' }}
            />

            <div className="relative w-56 h-56 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-[380px] lg:h-[380px] xl:w-[600px] xl:h-[600px] flex-shrink-0 pointer-events-none">
              <motion.div
                className="w-full h-full"
                animate={{ scale: [1, 1.03, 1] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                style={{ willChange: 'transform', transform: 'translateZ(0)' }}
              >
                <Link to="/map" className="w-full h-full bg-sky/10 rounded-full border-2 border-sky/30 flex items-center justify-center overflow-hidden group cursor-pointer pointer-events-auto shadow-[inset_-6px_-6px_20px_rgba(255,255,255,0.25),inset_6px_6px_14px_rgba(255,255,255,0.1),inset_0_0_60px_rgba(0,194,255,0.15)]" style={{ willChange: 'transform', backfaceVisibility: 'hidden', transform: 'translateZ(0)' }}>
                  <img
                    src={`${import.meta.env.BASE_URL}png/STYLE/explorecapitals-globe-favicon.png`}
                    alt="Globe - Click to explore the map"
                    className="w-[82%] h-[82%] object-contain"
                    loading="eager"
                    fetchPriority="high"
                  />
                  <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/5 to-white/20 opacity-40 pointer-events-none" />
                  <div className="absolute inset-0 rounded-full pointer-events-none" style={{ boxShadow: 'inset 0 0 80px rgba(0,194,255,0.12), inset 0 0 30px rgba(255,255,255,0.08)' }} />
                </Link>
              </motion.div>

              {/* Decorative floating bubbles */}
              <motion.div
                animate={{ y: [0, -6, 2, -4, 1, -7, 0], x: [0, 3, -2, 5, -1, 2, 0], rotate: [0, 2, -1, 3, -2, 1, 0] }}
                transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 md:top-2 md:right-2 z-10 pointer-events-none"
              >
                <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-20 md:h-20 lg:w-22 lg:h-22 xl:w-28 xl:h-28 aspect-square bg-sky/15 border border-sky/30 rounded-full flex items-center justify-center pointer-events-none glow-bubble">
                  <Trophy className="text-sky w-6 h-6 sm:w-7 sm:h-7 md:w-10 md:h-10 lg:w-11 lg:h-11 xl:w-14 xl:h-14" />
                </div>
              </motion.div>
              <motion.div
                animate={{ y: [0, 4, -3, 6, -2, 5, -4, 0], x: [0, -4, 2, -3, 4, -1, 3, 0], rotate: [0, -2, 3, -1, 2, -3, 1, 0] }}
                transition={{ duration: 22, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
                className="absolute -bottom-1 -left-2 sm:-bottom-2 sm:-left-4 md:bottom-2 md:-left-8 lg:-left-12 z-10 pointer-events-none"
              >
                <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-24 md:h-24 lg:w-28 lg:h-28 xl:w-36 xl:h-36 aspect-square bg-sky/15 border border-sky/30 rounded-full flex items-center justify-center pointer-events-none glow-bubble">
                  <Compass className="text-sky w-7 h-7 sm:w-8 sm:h-8 md:w-12 md:h-12 lg:w-14 lg:h-14 xl:w-[80px] xl:h-[80px]" />
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center lg:text-left lg:col-start-1 mt-2 sm:mt-3 lg:-mt-1 lg:mb-4"
          >
            <p className="text-base sm:text-lg md:text-xl lg:text-lg xl:text-xl text-white/50 max-w-lg mx-auto lg:mx-0 leading-relaxed font-bold px-2 sm:px-0">
              Master world capitals, identify flags, and conquer the map. High-fidelity geography games designed to build global intuition.
            </p>
          </motion.div>

          {/* Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-center lg:text-left lg:col-start-1 mt-3 sm:mt-5 lg:mt-0"
          >
            <Link to="/games">
              <Button variant="primary" size="lg" className="w-72 sm:w-80 md:w-96 lg:w-80 xl:w-96 h-16 sm:h-[4.5rem] md:h-20 lg:h-[4.5rem] xl:h-20 text-2xl sm:text-3xl md:text-3xl lg:text-2xl xl:text-3xl group uppercase">
                Play Now <Play className="ml-2 transition-transform sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-6 lg:h-6 xl:w-8 xl:h-8" size={24} fill="currentColor" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </Section>

      {/* ═══════════════ STOP OF THE DAY ═══════════════ */}
      <Section className="py-12 sm:py-16 md:py-24">
        <RevealSection className="max-w-5xl mx-auto">
          <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6 md:mb-8 justify-center lg:justify-start">
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 bg-white/5 border border-white/10 rounded-full text-[8px] sm:text-[9px] md:text-[10px] font-black text-sky-light uppercase tracking-[0.2em] sm:tracking-[0.3em] glow-badge">
              <Zap size={10} fill="currentColor" className="text-sky" />
              <span>Stop of the Day</span>
            </div>
          </div>

          <div className="bg-white/[0.03] border border-white/10 rounded-2xl sm:rounded-3xl md:rounded-[2.5rem] overflow-hidden relative group glow-card">
            {/* Background image */}
            <div className="absolute inset-0 pointer-events-none">
              {factImage && (
                <img
                  src={`${import.meta.env.BASE_URL}${factImage.startsWith('/') ? factImage.slice(1) : factImage}`}
                  alt=""
                  className="w-full h-full object-cover opacity-[0.07] blur-sm scale-110"
                  loading="lazy"
                  decoding="async"
                />
              )}
            </div>

            <div className="grid md:grid-cols-[1fr_1.2fr] gap-0 relative z-10">
              {/* Landmark Image */}
              <div className="relative aspect-[16/9] sm:aspect-[2/1] md:aspect-auto overflow-hidden">
                {factImage && (
                  <img
                    src={`${import.meta.env.BASE_URL}${factImage.startsWith('/') ? factImage.slice(1) : factImage}`}
                    alt={factOfTheDay.stop.stopName}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:to-[#0F172A]/80" />
                {/* Country badge */}
                <div className="absolute bottom-2 left-2 sm:bottom-3 sm:left-3 md:bottom-4 md:left-4 flex items-center gap-1.5 sm:gap-2 bg-black/60 backdrop-blur-md rounded-lg px-2 py-1.5 sm:px-2.5 sm:py-1.5 border border-white/10">
                  <span className="text-base sm:text-lg md:text-xl">{factOfTheDay.country.flag}</span>
                  <div>
                    <div className="text-[7px] sm:text-[8px] font-black text-sky uppercase tracking-[0.15em] leading-none">{factOfTheDay.country.region}</div>
                    <div className="text-xs sm:text-sm md:text-base font-display font-black text-white uppercase tracking-tight leading-none">{factOfTheDay.country.name}</div>
                  </div>
                </div>
              </div>

              {/* Fact Content */}
              <div className="p-5 sm:p-6 md:p-8 lg:p-10 flex flex-col justify-center items-center md:items-start text-center md:text-left">
                <h3 className="flex items-center gap-1.5 sm:gap-2 text-sm sm:text-base md:text-lg font-black text-sky uppercase tracking-wider leading-tight mb-2 sm:mb-3 max-w-full whitespace-nowrap overflow-hidden">
                  <MapPin className="text-sky shrink-0 w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-[18px] md:h-[18px]" />
                  <span className="truncate">{factOfTheDay.stop.stopName}</span>
                </h3>
                <p className="text-white/60 text-[11px] sm:text-xs md:text-sm leading-relaxed mb-6 sm:mb-8 font-medium">
                  {factOfTheDay.fact}
                </p>
                <Link to={`/country/${toSlug(factOfTheDay.country.name)}`}>
                  <Button variant="secondary" size="md" className="h-10 sm:h-11 px-5 sm:px-6 text-xs sm:text-sm uppercase bg-white/5 border-white/10 hover:bg-white/10">
                    Explore {factOfTheDay.country.name} <ArrowRight size={14} className="ml-1" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </RevealSection>
      </Section>

      {/* ═══════════════ GAMES ═══════════════ */}
      <Section className="py-12 sm:py-16 md:py-24">
        <RevealSection className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center sm:items-end justify-between mb-6 sm:mb-8 md:mb-12 gap-4 sm:gap-6 text-center sm:text-left">
            <div className="max-w-xl">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-black text-white tracking-tighter mb-2 sm:mb-4 uppercase leading-none drop-shadow-xl">Games</h2>
              <p className="text-white/40 text-sm sm:text-base md:text-lg font-bold uppercase tracking-widest">Rank up from Explorer to Legend.</p>
            </div>
            <Link to="/games">
              <Button variant="secondary" size="md" className="px-6 sm:px-8 h-10 sm:h-12 text-xs sm:text-sm uppercase bg-white/5 border-white/10 backdrop-blur-lg hover:bg-white/10">
                All Games
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 md:gap-6 lg:gap-8">
            <GameCard
              title="Capital Quiz"
              desc="Recall test of world capitals."
              icon={<GraduationCap size={28} />}
              color="bg-gel-blue"
              link="/games/capital-quiz"
              stats="12.4k Played"
              image="./png/GAMES/capital-quiz.png"
            />
            <GameCard
              title="Map Dash"
              desc="Find nations on the map."
              icon={<Globe2 size={28} />}
              color="bg-sky"
              link="/games/map-dash"
              stats="8.1k Played"
              image="./png/GAMES/map-dash.png"
            />
            <GameCard
              title="Flag Frenzy"
              desc="Identify global flags."
              icon={<Trophy size={28} />}
              color="bg-accent"
              link="/games/flag-frenzy"
              stats="15.2k Played"
              image="./png/GAMES/flag-frenzy.png"
            />
          </div>
        </RevealSection>
      </Section>

      {/* ═══════════════ LOYALTY PATH ═══════════════ */}
      <Section className="py-12 sm:py-16 md:py-24">
        <RevealSection className="max-w-7xl mx-auto">
          <div className="bg-white/[0.02] border border-white/10 rounded-2xl sm:rounded-[2.5rem] md:rounded-[4rem] p-5 sm:p-8 md:p-12 lg:p-20 overflow-hidden relative group glow-card">
            <div className="absolute inset-0 bg-aurora opacity-5 group-hover:opacity-10 transition-opacity duration-1000 pointer-events-none" />

            <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-16 items-center relative z-10">
              <div className="text-center lg:text-left">
                <div className="inline-flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-1 sm:py-1.5 bg-sky/10 border border-white/10 rounded-full text-[8px] sm:text-[9px] md:text-[10px] font-black text-sky-light uppercase tracking-[0.2em] sm:tracking-[0.3em] mb-4 sm:mb-6 md:mb-8 glow-badge">
                  <span>Loyalty Path</span>
                </div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-display font-black text-white mb-3 sm:mb-4 md:mb-8 leading-[0.95] tracking-tighter uppercase">
                  Learn. <br />
                  <span className="bg-clip-text bg-gel-blue [-webkit-text-fill-color:transparent]">Earn Rewards.</span>
                </h2>
                <p className="text-sm sm:text-base md:text-lg text-white/50 mb-4 sm:mb-6 md:mb-10 leading-relaxed font-bold max-w-md mx-auto lg:mx-0 uppercase tracking-wide">
                  Unlock themed avatars and game modes as you rise through the ranks.
                </p>
                <Link to="/loyalty">
                  <Button variant="primary" size="lg" className="h-11 sm:h-14 md:h-16 px-8 sm:px-10 md:px-12 text-base sm:text-lg uppercase">
                    View Ranks
                  </Button>
                </Link>
              </div>

              <div className="relative">
                <div className="bg-white/5 border border-white/10 p-4 sm:p-6 md:p-10 rounded-xl sm:rounded-2xl md:rounded-[3rem] transform transition-all duration-700 glow-card">
                  <div className="flex items-center gap-3 sm:gap-4 md:gap-6 mb-4 sm:mb-6 md:mb-10">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-20 md:h-20 bg-gel-blue rounded-lg sm:rounded-xl md:rounded-2xl flex items-center justify-center text-white border border-white/20 relative overflow-hidden flex-shrink-0">
                      <Trophy size={24} className="relative z-10 drop-shadow-lg sm:w-7 sm:h-7 md:w-8 md:h-8" />
                      <div className="absolute inset-0 bg-glossy-gradient opacity-40" />
                    </div>
                    <div>
                      <div className="text-[8px] sm:text-[9px] md:text-[10px] font-black text-sky uppercase tracking-[0.15em] sm:tracking-[0.2em] mb-0.5 sm:mb-1">Current Rank</div>
                      <h3 className="text-xl sm:text-2xl md:text-4xl font-display font-black text-white uppercase tracking-tighter leading-none">Explorer</h3>
                    </div>
                  </div>

                  <div className="space-y-4 sm:space-y-6 md:space-y-10">
                    <div>
                      <div className="flex justify-between items-end mb-2 sm:mb-3 md:mb-4">
                        <span className="text-[8px] sm:text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] sm:tracking-[0.3em] text-white/30">Next Level</span>
                        <span className="text-base sm:text-lg md:text-xl font-black text-sky">75%</span>
                      </div>
                      <div className="h-2.5 sm:h-3 md:h-4 w-full bg-black/20 rounded-full overflow-hidden p-0.5 border border-white/5">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: "75%" }}
                          transition={{ duration: 1.5, ease: "easeOut" }}
                          className="h-full bg-frutiger-gradient rounded-full relative"
                        >
                          <div className="absolute inset-0 bg-glossy-gradient opacity-30" />
                        </motion.div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-6">
                      <div className="p-3 sm:p-4 md:p-8 bg-white/5 rounded-xl sm:rounded-2xl md:rounded-3xl border border-white/10 flex flex-col items-center hover:bg-white/10 transition-colors text-center glow-card">
                        <div className="text-xl sm:text-2xl md:text-4xl font-display font-black text-white leading-none mb-1 sm:mb-2">1,240</div>
                        <div className="text-[8px] sm:text-[9px] md:text-[10px] text-sky font-black uppercase tracking-[0.2em] sm:tracking-[0.3em]">Total Pts</div>
                      </div>
                      <div className="p-3 sm:p-4 md:p-8 bg-white/5 rounded-xl sm:rounded-2xl md:rounded-3xl border border-white/10 flex flex-col items-center hover:bg-white/10 transition-colors text-center glow-card">
                        <div className="text-xl sm:text-2xl md:text-4xl font-display font-black text-white leading-none mb-1 sm:mb-2">12</div>
                        <div className="text-[8px] sm:text-[9px] md:text-[10px] text-sky font-black uppercase tracking-[0.2em] sm:tracking-[0.3em]">Day Streak</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </RevealSection>
      </Section>

      {/* Strategic Ad Placement */}
      <Section className="py-4 md:py-8">
        <div className="max-w-4xl mx-auto">
          <ResponsiveAd slot="2512934803" className="rounded-2xl overflow-hidden" />
        </div>
      </Section>

      {/* ═══════════════ EXPLORE ═══════════════ */}
      <Section className="py-12 sm:py-16 md:py-24">
        <RevealSection className="max-w-7xl mx-auto">
          <div className="text-center mb-6 sm:mb-8 md:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-8xl font-display font-black text-white mb-2 sm:mb-4 md:mb-6 tracking-tighter uppercase leading-none">Explore</h2>
            <p className="text-white/40 text-sm sm:text-base md:text-xl font-bold max-w-2xl mx-auto uppercase tracking-widest px-2">Master the atlas in our interactive database.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 md:gap-8 lg:gap-10">
            <Link to="/database" className="group">
              <div className="h-full p-5 sm:p-6 md:p-12 bg-white/[0.03] border border-white/10 rounded-2xl sm:rounded-[2rem] md:rounded-[3rem] flex flex-col items-center text-center transition-all duration-500 hover:bg-white/[0.08] relative overflow-hidden shadow-[inset_0_0_30px_rgba(255,255,255,0.15)] glow-card">
                {/* Database preview background */}
                <div className="absolute inset-0 pointer-events-none opacity-[0.05] group-hover:opacity-[0.08] transition-opacity duration-700">
                  <div className="absolute inset-0 flex flex-col gap-[6px] p-3 sm:p-4 md:p-6 pt-8 sm:pt-10 md:pt-14">
                    {/* Mock header row */}
                    <div className="flex items-center gap-2 pb-2 border-b border-white/15 mb-1">
                      <div className="w-6 h-3 rounded bg-white/25" />
                      <div className="w-16 h-3 rounded bg-white/25" />
                      <div className="flex-1" />
                      <div className="w-12 h-3 rounded bg-white/20" />
                      <div className="w-14 h-3 rounded bg-white/20" />
                    </div>
                    {/* Mock data rows */}
                    {[...Array(12)].map((_, i) => (
                      <div key={i} className="flex items-center gap-2 py-[5px] px-2 rounded-lg bg-white/[0.04]">
                        <div className="w-5 h-4 rounded-sm bg-white/20 shrink-0" />
                        <div className="h-3 rounded bg-white/25" style={{ width: `${50 + (i * 7) % 40}%` }} />
                        <div className="flex-1" />
                        <div className="w-10 h-3 rounded bg-sky/20 shrink-0" />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-20 md:h-20 bg-gel-blue rounded-full flex items-center justify-center text-white mb-4 sm:mb-6 md:mb-10 border border-white/20 relative z-10 glow-bubble">
                  <BookOpen size={24} className="sm:w-7 sm:h-7 md:w-10 md:h-10" />
                </div>
                <h3 className="text-xl sm:text-2xl md:text-4xl font-display font-black text-white uppercase tracking-tighter mb-2 sm:mb-3 md:mb-4 relative z-10" style={{ textShadow: '0 2px 12px rgba(0,0,0,0.8), 0 4px 24px rgba(0,0,0,0.5)' }}>Database</h3>
                <p className="text-white/40 text-sm sm:text-base md:text-xl leading-relaxed mb-4 sm:mb-6 md:mb-10 font-bold max-w-xs relative z-10" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.7), 0 4px 20px rgba(0,0,0,0.4)' }}>Nation database with population and cultural data.</p>
                <div className="mt-auto inline-flex items-center gap-2 sm:gap-3 text-[8px] sm:text-[9px] md:text-[10px] font-black text-sky-light uppercase tracking-[0.3em] sm:tracking-[0.4em] transition-transform relative z-10" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.6)' }}>
                  Browse Now <ArrowRight size={14} className="sm:w-4 sm:h-4 md:w-[18px] md:h-[18px]" />
                </div>
              </div>
            </Link>

            <Link to="/map" className="group">
              <div className="h-full p-5 sm:p-6 md:p-12 bg-white/[0.03] border border-white/10 rounded-2xl sm:rounded-[2rem] md:rounded-[3rem] flex flex-col items-center text-center transition-all duration-500 hover:bg-white/[0.08] relative overflow-hidden shadow-[inset_0_0_30px_rgba(255,255,255,0.15)] glow-card">
                {/* Map wireframe preview background */}
                <div className="absolute inset-0 pointer-events-none opacity-[0.05] group-hover:opacity-[0.08] transition-opacity duration-700">
                  <svg className="absolute inset-0 w-full h-full" viewBox="0 0 960 500" preserveAspectRatio="xMidYMid slice">
                    <g stroke="white" strokeWidth="0.8" fill="none">
                      <path d="M 100 150 L 120 120 L 140 130 L 130 160 Z" />
                      <path d="M 130 200 L 145 180 L 155 220 Z" />
                      <path d="M 350 140 L 380 130 L 400 150 L 370 160 Z" />
                      <path d="M 400 180 L 430 160 L 450 240 L 420 260 Z" />
                      <path d="M 480 120 L 550 100 L 600 150 L 520 180 Z" />
                      <path d="M 650 320 L 680 310 L 690 340 L 660 350 Z" />
                    </g>
                    <g stroke="white" strokeWidth="0.3" opacity="0.3">
                      <line x1="0" y1="100" x2="960" y2="100" />
                      <line x1="0" y1="200" x2="960" y2="200" />
                      <line x1="0" y1="300" x2="960" y2="300" />
                      <line x1="0" y1="400" x2="960" y2="400" />
                      <line x1="200" y1="0" x2="200" y2="500" />
                      <line x1="400" y1="0" x2="400" y2="500" />
                      <line x1="600" y1="0" x2="600" y2="500" />
                      <line x1="800" y1="0" x2="800" y2="500" />
                    </g>
                  </svg>
                  <div className="absolute w-2 h-2 rounded-full bg-sky/20" style={{ top: '30%', left: '15%' }} />
                  <div className="absolute w-2 h-2 rounded-full bg-sky/20" style={{ top: '35%', left: '42%' }} />
                  <div className="absolute w-1.5 h-1.5 rounded-full bg-accent/20" style={{ top: '50%', left: '45%' }} />
                  <div className="absolute w-2 h-2 rounded-full bg-sky/20" style={{ top: '25%', left: '65%' }} />
                  <div className="absolute w-1.5 h-1.5 rounded-full bg-warning/20" style={{ top: '65%', left: '70%' }} />
                </div>

                <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-20 md:h-20 bg-accent rounded-lg sm:rounded-xl md:rounded-2xl flex items-center justify-center text-white mb-4 sm:mb-6 md:mb-10 border border-white/20 relative z-10 glow-bubble">
                  <Compass size={24} className="sm:w-7 sm:h-7 md:w-10 md:h-10" />
                </div>
                <h3 className="text-xl sm:text-2xl md:text-4xl font-display font-black text-white uppercase tracking-tighter mb-2 sm:mb-3 md:mb-4 relative z-10" style={{ textShadow: '0 2px 12px rgba(0,0,0,0.8), 0 4px 24px rgba(0,0,0,0.5)' }}>Atlas</h3>
                <p className="text-white/40 text-sm sm:text-base md:text-xl leading-relaxed mb-4 sm:mb-6 md:mb-10 font-bold max-w-xs relative z-10" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.7), 0 4px 20px rgba(0,0,0,0.4)' }}>Explore the world with immersive guided tours.</p>
                <div className="mt-auto inline-flex items-center gap-2 sm:gap-3 text-[8px] sm:text-[9px] md:text-[10px] font-black text-accent uppercase tracking-[0.3em] sm:tracking-[0.4em] transition-transform relative z-10" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.6)' }}>
                  Open Atlas <ArrowRight size={14} className="sm:w-4 sm:h-4 md:w-[18px] md:h-[18px]" />
                </div>
              </div>
            </Link>
          </div>
        </RevealSection>
      </Section>

      {/* ═══════════════ START YOUR EXPEDITION ═══════════════ */}
      <Section
        className="py-12 sm:py-16 md:py-24"
        background={
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-[80%] h-[60%] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(0,194,255,0.06)_0%,transparent_60%)] blur-[30px]" />
          </div>
        }
      >
        <RevealSection className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-display font-black text-white mb-3 sm:mb-6 md:mb-10 tracking-tighter uppercase leading-[0.9] drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
            Start Your <br />
            <span className="bg-clip-text bg-gel-blue [-webkit-text-fill-color:transparent]">
              Expedition.
            </span>
          </h2>

          <p className="text-sm sm:text-base md:text-xl lg:text-2xl mb-4 sm:mb-6 md:mb-10 max-w-2xl mx-auto font-bold uppercase tracking-widest leading-relaxed text-white/30 px-2">
            Master the atlas and join the global elite.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5 md:gap-6 px-2">
            <Link to="/games" className="group/btn w-full sm:w-auto">
              <Button variant="primary" size="lg" className="w-full sm:w-72 md:w-80 lg:w-72 xl:w-96 h-16 sm:h-24 md:h-28 lg:h-20 xl:h-28 text-xl sm:text-2xl md:text-3xl lg:text-xl xl:text-3xl uppercase border-2 border-white/30 transition-all group">
                Play Now <Play className="ml-2 transition-transform group-hover:translate-x-1 w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 lg:w-5 lg:h-5 xl:w-8 xl:h-8" fill="currentColor" />
              </Button>
            </Link>
            {!isAuthenticated && !loading && (
            <Link to="/auth" className="group/btn w-full sm:w-auto">
              <Button variant="secondary" size="lg" className="w-full sm:w-72 md:w-80 lg:w-72 xl:w-96 h-16 sm:h-24 md:h-28 lg:h-20 xl:h-28 text-xl sm:text-2xl md:text-3xl lg:text-xl xl:text-3xl uppercase bg-white/5 border-2 border-white/10 backdrop-blur-md hover:bg-white/20 transition-all group">
                Sign Up <UserPlus className="ml-2 transition-transform group-hover:scale-110 w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 lg:w-5 lg:h-5 xl:w-8 xl:h-8" />
              </Button>
            </Link>
            )}
            {isAuthenticated && (
              <Link to="/profile" className="group/btn w-full sm:w-auto">
                <Button variant="secondary" size="lg" className="w-full sm:w-72 md:w-80 lg:w-72 xl:w-96 h-16 sm:h-24 md:h-28 lg:h-20 xl:h-28 text-xl sm:text-2xl md:text-3xl lg:text-xl xl:text-3xl uppercase bg-white/5 border-2 border-white/10 backdrop-blur-md hover:bg-white/20 transition-all whitespace-nowrap group">
                  View Profile <User className="ml-2 transition-transform group-hover:scale-110 w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 lg:w-5 lg:h-5 xl:w-8 xl:h-8" />
                </Button>
              </Link>
            )}
          </div>
        </RevealSection>
      </Section>
    </main>
  );
};

const GameCard: React.FC<{ title: string; desc: string; icon: React.ReactNode; color: string; link: string; stats: string; image?: string }> = ({
  title,
  desc,
  icon,
  color,
  link,
  stats,
  image,
}) => (
  <Link to={link} className="group block h-full relative">
    {/* Solid Gel-style background — no backdrop-blur to avoid rendering rectangles on hover/scroll */}
    <div className={`absolute inset-0 bg-white/10 rounded-2xl sm:rounded-[2rem] lg:rounded-[3rem] border-2 border-white/40 transition-all duration-700 ease-out group-hover:bg-white/15 group-hover:border-white/60 overflow-hidden shadow-[0_12px_30px_rgba(0,0,0,0.15),0_0_25px_rgba(0,194,255,0.08),0_0_50px_rgba(0,194,255,0.04)]`}>
      {/* Thumbnail background image */}
      {image && (
        <div className="absolute inset-0">
          <img src={image} alt="" className="w-full h-full object-cover opacity-[0.07] group-hover:opacity-[0.12] scale-110 group-hover:scale-105 transition-all duration-700" loading="lazy" decoding="async" />
        </div>
      )}
      {/* Glossy overlay layer */}
      <div className="absolute inset-0 bg-glossy-gradient opacity-20 pointer-events-none" />
      {/* Accent glow on hover */}
      <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-700 ease-out ${color}`} />
    </div>

    <div className="relative p-5 sm:p-6 md:p-8 lg:p-12 flex flex-col h-full z-10">
      <div className={`w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 ${color} rounded-xl sm:rounded-2xl flex items-center justify-center text-white mb-4 sm:mb-6 md:mb-8 lg:mb-10 transition-all duration-700 ease-out relative overflow-hidden border-2 border-white/40`}>
        <div className="relative z-10 [&>svg]:w-5 [&>svg]:h-5 sm:[&>svg]:w-6 sm:[&>svg]:h-6 md:[&>svg]:w-7 md:[&>svg]:h-7 lg:[&>svg]:w-8 lg:[&>svg]:h-8">{icon}</div>
        <div className="absolute inset-0 bg-glossy-gradient opacity-40" />
      </div>
      <h3 className="text-xl sm:text-2xl md:text-2xl lg:text-4xl font-display font-black text-white uppercase tracking-tighter mb-2 sm:mb-3 md:mb-4 leading-none group-hover:text-sky-light transition-colors duration-500 ease-out drop-shadow-md">
        {title}
      </h3>
      <p className="text-white/60 text-sm sm:text-base md:text-base lg:text-lg leading-relaxed mb-4 sm:mb-6 md:mb-8 lg:mb-10 font-bold uppercase tracking-wide group-hover:text-white/80 transition-colors duration-500 ease-out">{desc}</p>
      <div className="mt-auto pt-4 sm:pt-5 md:pt-6 lg:pt-8 border-t border-white/10 flex items-center justify-between">
        <div className="text-[8px] sm:text-[9px] md:text-[10px] font-black text-sky-light uppercase tracking-[0.2em] sm:tracking-[0.3em] drop-shadow-sm">{stats}</div>
        <div className="w-9 h-9 sm:w-10 sm:h-10 md:w-11 md:h-11 lg:w-12 lg:h-12 rounded-lg sm:rounded-xl bg-white/10 flex items-center justify-center text-white transition-all duration-300 ease-out border border-white/10 shadow-inner hover:bg-white/20 hover:border-white/40 hover:scale-110">
          <ArrowRight size={18} className="sm:w-5 sm:h-5 md:w-5 md:h-5 lg:w-6 lg:h-6" />
        </div>
      </div>
    </div>
  </Link>
);

export default Home;
