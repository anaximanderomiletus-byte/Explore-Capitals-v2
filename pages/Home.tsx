import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Trophy, BookOpen, ArrowRight, Compass, Globe2, GraduationCap, Zap } from 'lucide-react';
import Button from '../components/Button';
import SEO from '../components/SEO';
import { useLayout } from '../context/LayoutContext';
import { useAuth } from '../context/AuthContext';
import { useUser } from '../context/UserContext';
import { ResponsiveAd } from '../components/AdSense';

const ParallaxSection: React.FC<{
  children: React.ReactNode;
  background?: React.ReactNode;
  className?: string;
  noPadding?: boolean;
}> = ({ children, background, className = '', noPadding = false }) => {
  // Simplified section - removed heavy parallax transforms for mobile performance
  // Uses CSS-only effects instead of JS-driven animations
  return (
    <section className={`relative overflow-hidden isolate w-full ${className}`}>
      {background && (
        <div className="absolute inset-0 z-0 pointer-events-none">
          {background}
        </div>
      )}
      <div 
        className={`relative z-10 w-full max-w-7xl mx-auto ${noPadding ? 'px-3 sm:px-4 md:px-6 lg:px-8 py-6 sm:py-8 md:py-12' : 'px-3 sm:px-4 md:px-6 lg:px-8 py-6 sm:py-8 md:py-12'}`}
      >
        {children}
      </div>
    </section>
  );
};

const Home: React.FC = () => {
  const { setPageLoading } = useLayout();
  const { isAuthenticated, isLoading: loading } = useUser();
  useEffect(() => {
    setPageLoading(false);
  }, [setPageLoading]);

  return (
    <main className="relative flex-grow bg-[#0F172A] w-full">
      <SEO
        title="ExploreCapitals - Learn World Geography Through Interactive Games"
        description="Master world capitals, flags, and maps through fun geography games. Free educational platform with quizzes, an interactive atlas, and country database."
        isHomePage={true}
      />

      {/* Persistent Background */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-[#0F172A]" />
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-[-10%] left-[-10%] w-[120%] h-[120%] bg-[radial-gradient(circle_at_center,rgba(0,194,255,0.03)_0%,transparent_70%)] blur-[120px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[110%] h-[110%] bg-[radial-gradient(circle_at_center,rgba(52,199,89,0.02)_0%,transparent_70%)] blur-[100px]" />
        </div>
      </div>

      <ParallaxSection
        className="min-h-[100svh] flex items-center justify-center"
        background={
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {/* CSS-only gradient background - no external image loading */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_120%_80%_at_50%_-20%,rgba(0,194,255,0.08)_0%,transparent_50%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_80%_-10%,rgba(52,199,89,0.05)_0%,transparent_40%)]" />
            {/* Subtle top fade */}
            <div className="absolute top-0 left-0 right-0 h-[20%] bg-gradient-to-b from-[#0F172A] to-transparent" />
          </div>
        }
      >
        <div className="max-w-7xl mx-auto flex flex-col lg:grid lg:grid-cols-2 gap-2 sm:gap-3 lg:gap-x-16 lg:gap-y-5 items-center pt-8 sm:pt-12 lg:pt-20">
          {/* Badge */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left lg:col-start-1"
          >
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-white/5 backdrop-blur-xl border-2 border-white/30 rounded-full text-[8px] sm:text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] sm:tracking-[0.3em] text-white shadow-premium transition-all hover:bg-white/10 cursor-default">
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
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] xl:text-[7rem] font-display font-black text-white tracking-tighter leading-[1.05] uppercase drop-shadow-2xl overflow-visible">
              Play Your <br />
              <span className="bg-clip-text bg-gel-blue [-webkit-text-fill-color:transparent] overflow-visible" style={{ paddingBottom: '0.15em', paddingRight: '0.1em', display: 'inline-block' }}>
                Atlas.
              </span>
            </h1>
          </motion.div>

          {/* Globe - in the flow on mobile, spans right column on desktop */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative lg:col-start-2 lg:row-start-1 lg:row-span-5 flex justify-center items-center my-1 sm:my-2 lg:my-0"
          >
            {/* Static glow using radial gradient instead of blur filter to prevent flickering */}
            <div 
              className="absolute w-[240px] h-[240px] sm:w-[320px] sm:h-[320px] md:w-[400px] md:h-[400px] lg:w-[680px] lg:h-[680px] rounded-full pointer-events-none"
              style={{ 
                background: 'radial-gradient(circle, rgba(0,194,255,0.05) 0%, rgba(0,194,255,0.02) 40%, transparent 70%)',
              }} 
            />
            
            <div className="relative w-48 h-48 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-[540px] lg:h-[540px] flex-shrink-0 pointer-events-none">
              <motion.div
                className="w-full h-full"
                style={{ willChange: 'transform', transform: 'translateZ(0)' }}
              >
                <Link to="/map" className="w-full h-full bg-white/5 rounded-full border-2 border-white/40 flex items-center justify-center overflow-hidden group cursor-pointer pointer-events-auto shadow-[inset_-4px_-4px_12px_rgba(255,255,255,0.25),inset_4px_4px_8px_rgba(255,255,255,0.1)]" style={{ willChange: 'transform', backfaceVisibility: 'hidden', transform: 'translateZ(0)' }}>
                  <img 
                    src={`${import.meta.env.BASE_URL}logo.png`} 
                    alt="Globe - Click to explore the map" 
                    className="w-full h-full object-contain scale-[1.35]"
                    loading="eager"
                    fetchPriority="high"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/20 opacity-40 pointer-events-none" />
                </Link>
              </motion.div>
              
              {/* Decorative floating bubbles - purely decorative, no click blocking */}
              <motion.div
                animate={{ 
                  y: [0, -6, 2, -4, 1, -7, 0], 
                  x: [0, 3, -2, 5, -1, 2, 0],
                  rotate: [0, 2, -1, 3, -2, 1, 0]
                }}
                transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 md:top-2 md:right-2 z-10 pointer-events-none"
              >
                <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-20 md:h-20 lg:w-28 lg:h-28 aspect-square bg-sky/15 backdrop-blur-2xl border border-sky/30 rounded-full flex items-center justify-center pointer-events-none shadow-[inset_-4px_-4px_12px_rgba(255,255,255,0.25),inset_4px_4px_8px_rgba(255,255,255,0.1)]">
                  <Trophy className="text-sky w-6 h-6 sm:w-7 sm:h-7 md:w-10 md:h-10 lg:w-[60px] lg:h-[60px]" />
                </div>
              </motion.div>
              <motion.div
                animate={{ 
                  y: [0, 4, -3, 6, -2, 5, -4, 0], 
                  x: [0, -4, 2, -3, 4, -1, 3, 0],
                  rotate: [0, -2, 3, -1, 2, -3, 1, 0]
                }}
                transition={{ duration: 22, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
                className="absolute -bottom-1 -left-2 sm:-bottom-2 sm:-left-4 md:bottom-2 md:-left-8 lg:-left-12 z-10 pointer-events-none"
              >
                <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-24 md:h-24 lg:w-36 lg:h-36 aspect-square bg-sky/15 backdrop-blur-2xl border border-sky/30 rounded-full flex items-center justify-center pointer-events-none shadow-[inset_-4px_-4px_12px_rgba(255,255,255,0.25),inset_4px_4px_8px_rgba(255,255,255,0.1)]">
                  <Compass className="text-sky w-7 h-7 sm:w-8 sm:h-8 md:w-12 md:h-12 lg:w-[80px] lg:h-[80px]" />
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Description */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center lg:text-left lg:col-start-1 lg:-mt-1 lg:mb-4"
          >
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/50 max-w-lg mx-auto lg:mx-0 leading-relaxed font-bold px-2 sm:px-0">
              Master world capitals, identify flags, and conquer the map. High-fidelity geography games designed to build global intuition.
            </p>
          </motion.div>

          {/* Button */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-center lg:text-left lg:col-start-1 mt-4 sm:mt-6 lg:mt-0"
          >
            <Link to="/games">
              <Button variant="primary" size="lg" className="w-64 sm:w-72 md:w-80 h-14 sm:h-16 md:h-18 text-xl sm:text-2xl group uppercase">
                Play Now <ArrowRight className="ml-2 transition-transform" size={22} />
              </Button>
            </Link>
          </motion.div>
        </div>
      </ParallaxSection>


      <ParallaxSection>
        <div className="max-w-7xl mx-auto">
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
            />
            <GameCard
              title="Map Dash"
              desc="Find nations on the map."
              icon={<Globe2 size={28} />}
              color="bg-sky"
              link="/games/map-dash"
              stats="8.1k Played"
            />
            <GameCard
              title="Flag Frenzy"
              desc="Identify global flags."
              icon={<Trophy size={28} />}
              color="bg-accent"
              link="/games/flag-frenzy"
              stats="15.2k Played"
            />
          </div>
        </div>
      </ParallaxSection>

      <ParallaxSection>
        <div className="max-w-7xl mx-auto">
          <div className="bg-white/[0.02] backdrop-blur-3xl border border-white/10 rounded-2xl sm:rounded-[2.5rem] md:rounded-[4rem] p-5 sm:p-8 md:p-12 lg:p-20 overflow-hidden relative group">
            <div className="absolute inset-0 bg-aurora opacity-5 group-hover:opacity-10 transition-opacity duration-1000 pointer-events-none" />
            
            <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-16 items-center relative z-10">
              <div className="text-center lg:text-left">
                <div className="inline-flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-1 sm:py-1.5 bg-sky/10 border border-white/10 rounded-full text-[8px] sm:text-[9px] md:text-[10px] font-black text-sky-light uppercase tracking-[0.2em] sm:tracking-[0.3em] mb-4 sm:mb-6 md:mb-8">
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
                <div className="bg-white/5 backdrop-blur-3xl border border-white/10 p-4 sm:p-6 md:p-10 rounded-xl sm:rounded-2xl md:rounded-[3rem] transform transition-all duration-700">
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
                      <div className="p-3 sm:p-4 md:p-8 bg-white/5 rounded-xl sm:rounded-2xl md:rounded-3xl border border-white/10 flex flex-col items-center hover:bg-white/10 transition-colors text-center">
                        <div className="text-xl sm:text-2xl md:text-4xl font-display font-black text-white leading-none mb-1 sm:mb-2">1,240</div>
                        <div className="text-[8px] sm:text-[9px] md:text-[10px] text-sky font-black uppercase tracking-[0.2em] sm:tracking-[0.3em]">Total Pts</div>
                      </div>
                      <div className="p-3 sm:p-4 md:p-8 bg-white/5 rounded-xl sm:rounded-2xl md:rounded-3xl border border-white/10 flex flex-col items-center hover:bg-white/10 transition-colors text-center">
                        <div className="text-xl sm:text-2xl md:text-4xl font-display font-black text-white leading-none mb-1 sm:mb-2">12</div>
                        <div className="text-[8px] sm:text-[9px] md:text-[10px] text-sky font-black uppercase tracking-[0.2em] sm:tracking-[0.3em]">Day Streak</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ParallaxSection>

      {/* Strategic Ad Placement - Between Loyalty and Explore sections */}
      <ParallaxSection className="py-4 md:py-8">
        <div className="max-w-4xl mx-auto">
          <ResponsiveAd slot="2512934803" className="rounded-2xl overflow-hidden" />
        </div>
      </ParallaxSection>

      <ParallaxSection>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-6 sm:mb-8 md:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-8xl font-display font-black text-white mb-2 sm:mb-4 md:mb-6 tracking-tighter uppercase leading-none">Explore</h2>
            <p className="text-white/40 text-sm sm:text-base md:text-xl font-bold max-w-2xl mx-auto uppercase tracking-widest px-2">Master the atlas in our interactive database.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 md:gap-8 lg:gap-10">
            <Link to="/database" className="group">
              <div className="h-full p-5 sm:p-6 md:p-12 bg-white/[0.03] backdrop-blur-3xl border border-white/10 rounded-2xl sm:rounded-[2rem] md:rounded-[3rem] flex flex-col items-center text-center transition-all duration-500 hover:bg-white/[0.08] relative overflow-hidden shadow-[inset_0_0_30px_rgba(255,255,255,0.15)]">
                <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-20 md:h-20 bg-gel-blue rounded-full flex items-center justify-center text-white mb-4 sm:mb-6 md:mb-10 border border-white/20 relative z-10">
                  <BookOpen size={24} className="sm:w-7 sm:h-7 md:w-10 md:h-10" />
                </div>
                <h3 className="text-xl sm:text-2xl md:text-4xl font-display font-black text-white uppercase tracking-tighter mb-2 sm:mb-3 md:mb-4 relative z-10">Database</h3>
                <p className="text-white/40 text-sm sm:text-base md:text-xl leading-relaxed mb-4 sm:mb-6 md:mb-10 font-bold max-w-xs relative z-10">Nation database with population and cultural data.</p>
                <div className="mt-auto inline-flex items-center gap-2 sm:gap-3 text-[8px] sm:text-[9px] md:text-[10px] font-black text-sky-light uppercase tracking-[0.3em] sm:tracking-[0.4em] transition-transform relative z-10">
                  Browse Now <ArrowRight size={14} className="sm:w-4 sm:h-4 md:w-[18px] md:h-[18px]" />
                </div>
              </div>
            </Link>

            <Link to="/map" className="group">
              <div className="h-full p-5 sm:p-6 md:p-12 bg-white/[0.03] backdrop-blur-3xl border border-white/10 rounded-2xl sm:rounded-[2rem] md:rounded-[3rem] flex flex-col items-center text-center transition-all duration-500 hover:bg-white/[0.08] relative overflow-hidden shadow-[inset_0_0_30px_rgba(255,255,255,0.15)]">
                <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-20 md:h-20 bg-accent rounded-lg sm:rounded-xl md:rounded-2xl flex items-center justify-center text-white mb-4 sm:mb-6 md:mb-10 border border-white/20 relative z-10">
                  <Compass size={24} className="sm:w-7 sm:h-7 md:w-10 md:h-10" />
                </div>
                <h3 className="text-xl sm:text-2xl md:text-4xl font-display font-black text-white uppercase tracking-tighter mb-2 sm:mb-3 md:mb-4 relative z-10">Atlas</h3>
                <p className="text-white/40 text-sm sm:text-base md:text-xl leading-relaxed mb-4 sm:mb-6 md:mb-10 font-bold max-w-xs relative z-10">Explore the world with immersive guided tours.</p>
                <div className="mt-auto inline-flex items-center gap-2 sm:gap-3 text-[8px] sm:text-[9px] md:text-[10px] font-black text-accent uppercase tracking-[0.3em] sm:tracking-[0.4em] transition-transform relative z-10">
                  Open Atlas <ArrowRight size={14} className="sm:w-4 sm:h-4 md:w-[18px] md:h-[18px]" />
                </div>
              </div>
            </Link>
          </div>
        </div>
      </ParallaxSection>

      <ParallaxSection 
        className="pt-8 sm:pt-12 md:pt-20 pb-16 sm:pb-24 md:pb-32"
        background={
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            {/* CSS-only decorative background - no external image */}
            <div className="w-[80%] h-[60%] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(0,194,255,0.06)_0%,transparent_60%)] blur-[30px]" />
          </div>
        }
      >
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-8xl font-display font-black text-white mb-3 sm:mb-6 md:mb-10 tracking-tighter uppercase leading-[0.9] drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
            Start Your <br />
            <span className="bg-clip-text bg-gel-blue [-webkit-text-fill-color:transparent]">
              Expedition.
            </span>
          </h2>
          
          <p className="text-sm sm:text-base md:text-xl lg:text-2xl mb-6 sm:mb-10 md:mb-16 max-w-2xl mx-auto font-bold uppercase tracking-widest leading-relaxed text-white/30 px-2">
            Master the atlas and join the global elite.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 md:gap-8 px-2">
            <Link to="/games" className="w-full sm:w-auto group/btn">
              <Button variant="primary" size="lg" className="w-full sm:w-56 md:w-72 h-12 sm:h-14 md:h-20 text-lg sm:text-xl md:text-2xl uppercase border-2 border-white/30 transition-all">
                Play Now
              </Button>
            </Link>
            {!isAuthenticated && !loading && (
            <Link to="/auth" className="w-full sm:w-auto group/btn">
              <Button variant="secondary" size="lg" className="w-full sm:w-44 md:w-56 h-12 sm:h-14 md:h-20 text-base sm:text-lg md:text-xl uppercase bg-white/5 border-2 border-white/10 backdrop-blur-md hover:bg-white/20 transition-all">
                Sign Up
              </Button>
            </Link>
            )}
            {isAuthenticated && (
              <Link to="/profile" className="w-full sm:w-auto group/btn">
                <Button variant="secondary" size="lg" className="w-full sm:w-44 md:w-56 h-12 sm:h-14 md:h-20 text-base sm:text-lg md:text-xl uppercase bg-white/5 border-2 border-white/10 backdrop-blur-md hover:bg-white/20 transition-all">
                  View Profile
                </Button>
              </Link>
            )}
          </div>
        </div>
      </ParallaxSection>
    </main>
  );
};

const GameCard: React.FC<{ title: string; desc: string; icon: React.ReactNode; color: string; link: string; stats: string }> = ({
  title,
  desc,
  icon,
  color,
  link,
  stats,
}) => (
  <Link to={link} className="group block h-full relative">
    {/* Solid Gel-style background for higher visibility */}
    <div className={`absolute inset-0 bg-white/10 backdrop-blur-2xl rounded-2xl sm:rounded-[2rem] lg:rounded-[3rem] border-2 border-white/40 transition-all duration-700 ease-out group-hover:bg-white/15 group-hover:border-white/60 overflow-hidden shadow-[0_12px_30px_rgba(0,0,0,0.15)]`}>
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
