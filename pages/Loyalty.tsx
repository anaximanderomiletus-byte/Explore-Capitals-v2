
import React, { useEffect } from 'react';
import { 
  ArrowLeft, CheckCircle2, Compass, Sparkles, Trophy, Zap, Lock 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { useLayout } from '../context/LayoutContext';

const Loyalty: React.FC = () => {
  const { user, loyaltyProgress, isLoading } = useUser();
  const { setPageLoading } = useLayout();
  const navigate = useNavigate();

  useEffect(() => {
    setPageLoading(false);
  }, [setPageLoading]);

  const tierThresholds = [
    { tier: 'Explorer', minPoints: 0, color: 'bg-blue-500', benefits: ['Standard Profile Icon', 'Basic Progress Tracking'] },
    { tier: 'Voyager', minPoints: 500, color: 'bg-emerald-500', benefits: ['Voyager Badge', 'Unlocked Analytics', 'New Profile Icons'] },
    { tier: 'Pathfinder', minPoints: 1200, color: 'bg-sky-500', benefits: ['Pathfinder Badge', 'Custom Map Markers', 'Enhanced Stats'] },
    { tier: 'Navigator', minPoints: 2500, color: 'bg-indigo-500', benefits: ['Navigator Badge', 'Global Leaderboard Access', 'New Avatars'] },
    { tier: 'Cartographer', minPoints: 5000, color: 'bg-amber-500', benefits: ['Gold Cartographer Badge', 'Exclusive Map Themes', 'Priority Support'] },
    { tier: 'Ambassador', minPoints: 10000, color: 'bg-orange-500', benefits: ['Ambassador Status', 'Diplomatic Profile Glow', 'Early Game Access'] },
    { tier: 'Strategist', minPoints: 20000, color: 'bg-purple-500', benefits: ['Strategist Badge', 'Advanced Game Modes', 'Expert Analytics'] },
    { tier: 'Master', minPoints: 40000, color: 'bg-fuchsia-500', benefits: ['Master Icon', 'Hall of Fame Eligibility', 'Custom Themes'] },
    { tier: 'Legend', minPoints: 75000, color: 'bg-rose-500', benefits: ['Legendary Status', 'Special Profile Aura', 'All-Time Recognition'] },
    { tier: 'Grandmaster', minPoints: 150000, color: 'bg-yellow-500', benefits: ['Ultimate Grandmaster Title', 'Gold Profile Frame', 'Eternal Fame'] },
  ];

  if (isLoading) {
    return (
      <div className="pt-28 pb-16 px-6 bg-surface-dark min-h-screen flex flex-col items-center justify-center text-center">
        <div className="w-12 h-12 border-4 border-sky border-t-transparent rounded-full animate-spin shadow-glow-sky" />
      </div>
    );
  }

  return (
    <div className="pt-24 pb-20 px-6 bg-surface-dark min-h-screen relative overflow-hidden text-white">
      {/* Background Decor */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-surface-dark">
        <div className="absolute top-[-20%] left-[-10%] w-[120%] h-[120%] bg-[radial-gradient(circle_at_center,rgba(0,194,255,0.12)_0%,transparent_70%)] blur-[120px] animate-pulse-slow" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[100%] h-[100%] bg-[radial-gradient(circle_at_center,rgba(52,199,89,0.06)_0%,transparent_60%)] blur-[100px] animate-pulse-slow delay-700" />
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        <button 
          onClick={() => navigate('/profile')} 
          className="group flex items-center gap-2.5 text-[9px] font-black uppercase tracking-normal text-white/40 hover:text-white transition-all mb-8 md:mb-10"
        >
          <ArrowLeft size={14} className="transition-transform" />
          BACK TO PROFILE
        </button>

        <header className="max-w-3xl mb-10 md:mb-14">
          <div className="inline-flex items-center gap-2.5 px-5 py-2.5 bg-sky/20 border border-white/30 rounded-full text-[9px] font-black uppercase tracking-[0.4em] text-white/90 mb-8 shadow-glass-bubble relative overflow-hidden">
            <div className="absolute inset-0 bg-glossy-gradient opacity-20" />
            <Sparkles size={12} className="text-sky-light relative z-10" /> 
            <span className="relative z-10 drop-shadow-md">Loyalty Path</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-display font-black mb-6 tracking-tighter leading-tight uppercase drop-shadow-lg">
            Ascend the <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-sky-light to-white drop-shadow-glow-sky">Explorer Ranks</span>
          </h1>
          <p className="text-white/60 text-base md:text-lg leading-relaxed font-bold max-w-2xl uppercase tracking-wide">
            Every correct answer in the Atlas earns you experience points. Master the globe to unlock exclusive badges, themes, and legendary status.
          </p>
        </header>

        <div className="flex flex-col gap-10 md:gap-16 mb-16 md:mb-24 relative">
          {/* Vertical Connector Path - Masked by cards */}
          <div className="absolute left-[72px] md:left-[112px] top-0 bottom-0 w-1 bg-white/10 hidden sm:block z-0">
            <div 
              className="absolute top-0 left-0 w-full bg-frutiger-gradient rounded-full transition-all duration-1000 shadow-glow-sky"
              style={{ 
                height: `${Math.min(100, Math.max(0, (loyaltyProgress.points / 150000) * 100))}%`,
                opacity: loyaltyProgress.points > 0 ? 1 : 0 
              }}
            />
          </div>

          {tierThresholds.map((t, i) => {
            const isCurrent = loyaltyProgress.tier === t.tier;
            const isUnlocked = loyaltyProgress.points >= t.minPoints;
            const isCompleted = isUnlocked && !isCurrent;
            
            return (
              <div 
                key={t.tier} 
                className={`group relative p-8 md:p-12 rounded-[3rem] transition-all duration-700 border-2 flex flex-col md:flex-row md:items-center gap-10 md:gap-16 overflow-hidden z-10 ${
                  isCurrent 
                    ? 'bg-[#1E293B] border-white/40 shadow-glow-sky' 
                    : isCompleted
                      ? 'bg-sky/10 backdrop-blur-3xl border-sky/40 shadow-glow-sky hover:scale-[1.01]'
                      : 'bg-[#1E293B]/40 backdrop-blur-3xl border-white/10 hover:border-white/30 hover:bg-[#1E293B]/60'
                }`}
              >
                {/* Glossy overlay */}
                <div className="absolute inset-0 bg-glossy-gradient opacity-10 pointer-events-none rounded-[inherit]" />
                
                {/* Current rank background */}
                {isCurrent && (
                  <div className="absolute inset-0 bg-surface-dark pointer-events-none" />
                )}
                
                {/* Completed rank: diagonal ribbon effect */}
                {isCompleted && (
                  <>
                    <div className="absolute -top-1 -right-1 w-32 h-32 overflow-hidden pointer-events-none z-30">
                      <div className="absolute top-6 -right-8 w-40 py-1.5 bg-sky text-white text-[8px] font-black uppercase tracking-[0.3em] text-center transform rotate-45 shadow-lg">
                        <span className="drop-shadow-md">MASTERED</span>
                      </div>
                    </div>
                    {/* Subtle shimmer animation on the border */}
                    <div className="absolute inset-0 rounded-[inherit] overflow-hidden pointer-events-none">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-shimmer" style={{ animationDuration: '3s' }} />
                    </div>
                  </>
                )}
                
                {/* Rank Number & Badge */}
                <div className="relative z-20 flex-shrink-0 flex flex-col items-center w-20 md:w-32">
                  <div className={`w-20 h-20 rounded-3xl flex items-center justify-center font-display font-black text-4xl mb-4 relative overflow-hidden border-2 z-10 ${
                    isCurrent 
                      ? 'bg-sky text-white shadow-glow-sky border-white/40' 
                      : isCompleted
                        ? 'bg-sky text-white shadow-glow-sky border-white/30'
                        : 'bg-surface-dark text-white/20 group-hover:text-sky transition-all border-white/10 shadow-inner'
                  }`}>
                    {isCompleted ? (
                      <Trophy size={32} className="relative z-10 drop-shadow-md" />
                    ) : (
                      <span className="relative z-10">{i + 1}</span>
                    )}
                    <div className="absolute inset-0 bg-glossy-gradient opacity-40 rounded-[inherit]" />
                  </div>
                  <div className={`text-[10px] font-black uppercase tracking-[0.4em] text-center ${
                    isCurrent || isCompleted ? 'text-sky-light' : 'text-white/30'
                  }`}>
                    {t.minPoints.toLocaleString()} XP
                  </div>
                </div>

                {/* Main Content */}
                <div className="relative z-10 flex-grow">
                  <div className={`text-4xl md:text-5xl font-display font-black uppercase tracking-tighter leading-none mb-6 drop-shadow-lg ${
                    isCompleted ? 'text-sky-light' : 'text-white'
                  }`}>{t.tier}</div>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {t.benefits.map(b => (
                      <li key={b} className={`flex items-start gap-4 text-xs md:text-sm font-bold leading-snug uppercase tracking-tight ${
                        isCurrent ? 'text-white' : isCompleted ? 'text-white/70' : 'text-white/40'
                      }`}>
                        <Zap size={16} className={`shrink-0 mt-0.5 ${
                          isCurrent || isCompleted ? 'text-sky-light drop-shadow-glow-sky' : 'text-white/10'
                        }`} />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Status Indicator */}
                <div className="relative z-10 md:w-48 flex-shrink-0">
                  {isCurrent ? (
                    <div className="inline-block px-6 py-4 bg-sky text-white rounded-3xl text-[10px] font-black uppercase tracking-[0.4em] w-full text-center shadow-glow-sky border-2 border-white/40 relative overflow-hidden">
                      <div className="absolute inset-0 bg-glossy-gradient opacity-40 rounded-[inherit]" />
                      <span className="relative z-10 drop-shadow-md">CURRENT RANK</span>
                    </div>
                  ) : isCompleted ? (
                    <div className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-sky/20 rounded-2xl text-[9px] font-black uppercase tracking-[0.3em] w-full text-center border border-sky/40 relative overflow-hidden">
                      <CheckCircle2 size={14} className="text-sky-light" />
                      <span className="text-sky-light drop-shadow-sm">COMPLETE</span>
                    </div>
                  ) : (
                    <div className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20 flex items-center justify-center gap-2">
                      <Lock size={14} /> LOCKED
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="p-8 md:p-12 bg-white/10 backdrop-blur-3xl rounded-[3rem] border border-white/30 flex flex-col md:flex-row items-center justify-between gap-10 shadow-glass-bubble relative overflow-hidden group">
          <div className="absolute inset-0 bg-glossy-gradient opacity-10 pointer-events-none rounded-[inherit]" />
          
          <div className="flex items-center gap-8 text-center md:text-left relative z-10">
            <div className="w-20 h-20 rounded-3xl bg-sky text-white flex items-center justify-center shadow-glow-sky border border-white/30 relative overflow-hidden shrink-0">
              <Trophy size={36} className="relative z-10 drop-shadow-lg" />
              <div className="absolute inset-0 bg-glossy-gradient opacity-40 rounded-[inherit]" />
            </div>
            <div>
              <h4 className="text-2xl md:text-3xl font-display font-black mb-2 tracking-tighter text-white uppercase leading-none drop-shadow-md">Current Standing</h4>
              <p className="text-white/50 text-base md:text-lg font-bold uppercase tracking-widest">
                Progressed to <span className="text-sky-light font-black drop-shadow-glow-sky">{loyaltyProgress.points.toLocaleString()} Points</span>
              </p>
            </div>
          </div>
          <div className="w-full md:w-[400px] relative z-10">
            <div className="flex justify-between items-end mb-4">
              <span className="text-[9px] font-black uppercase tracking-[0.4em] text-white/40">NEXT RANK COMPLETION</span>
              <span className="text-2xl font-black text-sky-light drop-shadow-glow-sky tabular-nums">{loyaltyProgress.progressToNext}%</span>
            </div>
            <div className="h-4 w-full bg-black/40 rounded-full overflow-hidden p-1 border border-white/20 shadow-inner">
              <div 
                className="h-full bg-frutiger-gradient rounded-full transition-all duration-1000 shadow-glow-sky animate-shimmer bg-[length:200%_auto] relative" 
                style={{ width: `${loyaltyProgress.progressToNext}%` }} 
              >
                <div className="absolute inset-0 bg-glossy-gradient opacity-40 rounded-[inherit]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loyalty;
