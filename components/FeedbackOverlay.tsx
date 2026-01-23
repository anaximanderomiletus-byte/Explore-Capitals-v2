import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, Star, Sparkles, AlertTriangle } from 'lucide-react';

interface FeedbackOverlayProps {
  type: 'correct' | 'incorrect' | null;
  triggerKey?: number;
  subText?: string;
  incorrectFlagCode?: string;
}

export const FeedbackOverlay: React.FC<FeedbackOverlayProps> = ({ type, triggerKey, subText, incorrectFlagCode }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (type) {
      setIsVisible(false); // Reset first if it was visible
      const nextFrame = requestAnimationFrame(() => {
        setIsVisible(true);
      });
      
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 1000);
      return () => {
        cancelAnimationFrame(nextFrame);
        clearTimeout(timer);
      };
    }
  }, [type, triggerKey]);

  // Generate some random particles for correct answers
  const particles = Array.from({ length: 12 });

  return (
    <AnimatePresence>
      {isVisible && type && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center pb-[10vh] sm:pb-[15vh] pointer-events-none overflow-hidden px-4"
          style={{ touchAction: 'none' }}
        >
          {/* Full screen background flash */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.2, 0] }}
            className={`absolute inset-0 ${type === 'correct' ? 'bg-accent' : 'bg-error'}`}
          />

          {type === 'correct' ? (
            <div className="relative flex flex-col items-center">
              {/* Particles - reduced spread on mobile */}
              {particles.map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ x: 0, y: 0, opacity: 1, scale: 0 }}
                  animate={{ 
                    x: (Math.random() - 0.5) * (window.innerWidth < 640 ? 200 : 400), 
                    y: (Math.random() - 0.5) * (window.innerWidth < 640 ? 200 : 400),
                    opacity: 0,
                    scale: Math.random() * 1.5 + 0.5,
                    rotate: Math.random() * 360
                  }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="absolute"
                >
                  {i % 2 === 0 ? (
                    <Star className="text-warning fill-warning w-4 h-4 sm:w-6 sm:h-6" />
                  ) : (
                    <Sparkles className="text-white w-4 h-4 sm:w-5 sm:h-5" />
                  )}
                </motion.div>
              ))}

              <motion.div
                initial={{ scale: 0.5, opacity: 0, rotate: -10 }}
                animate={{ 
                  scale: [0.5, 1.2, 1],
                  opacity: 1,
                  rotate: 0
                }}
                className="relative flex flex-col items-center"
              >
                <div className="bg-accent p-5 sm:p-6 md:p-8 rounded-full backdrop-blur-xl border-[3px] sm:border-4 border-white shadow-xl">
                  <CheckCircle2 className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 text-white" />
                </div>
                
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  className="text-center mt-4 sm:mt-6 bg-accent px-5 sm:px-6 md:px-8 py-2 sm:py-3 rounded-xl sm:rounded-2xl border-2 border-white shadow-xl"
                >
                  <h2 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black italic uppercase tracking-tighter">
                    Correct!
                  </h2>
                </motion.div>
              </motion.div>
            </div>
          ) : (
            <div className="relative flex flex-col items-center max-w-full">
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ 
                  scale: [0.5, 1.1, 1],
                  opacity: 1,
                  x: [0, -15, 15, -10, 10, 0]
                }}
                transition={{ duration: 0.4 }}
                className="relative flex flex-col items-center w-full"
              >
                <div className="bg-error p-5 sm:p-6 md:p-8 rounded-full backdrop-blur-xl border-[3px] sm:border-4 border-white shadow-xl">
                  <XCircle className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 text-white" />
                </div>

                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  className="text-center mt-4 sm:mt-6 bg-error px-5 sm:px-6 md:px-8 py-2 sm:py-3 rounded-xl sm:rounded-2xl border-2 border-white shadow-xl"
                >
                  <h2 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black italic uppercase tracking-tighter">
                    Not Quite
                  </h2>
                </motion.div>

                {subText && (
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    transition={{ delay: 0.15, type: "spring", stiffness: 260, damping: 20 }}
                    className="mt-5 sm:mt-8 flex flex-col items-center w-full max-w-[90vw] sm:max-w-none"
                  >
                    <div className="bg-[#1A1A1A] rounded-2xl sm:rounded-[2.5rem] border-2 border-white/20 shadow-[0_20px_40px_rgba(0,0,0,0.5)] sm:shadow-[0_30px_60px_rgba(0,0,0,0.6)] overflow-hidden flex flex-col items-center w-full">
                      <div className="w-full bg-white/10 py-1.5 sm:py-2 border-b border-white/10 text-center">
                        <span className="text-white font-black uppercase tracking-[0.25em] sm:tracking-[0.4em] text-[9px] sm:text-[10px] drop-shadow-sm">
                          You Selected
                        </span>
                      </div>
                      
                      <div className="px-5 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 flex items-center justify-center gap-3 sm:gap-4 md:gap-6">
                        {incorrectFlagCode && (
                          <div className="relative flex-shrink-0">
                            <div className="absolute inset-0 bg-white/20 blur-md rounded-full scale-150 opacity-50" />
                            <img 
                              src={`https://flagcdn.com/w160/${incorrectFlagCode}.png`} 
                              className="w-8 h-5 sm:w-10 sm:h-7 md:w-12 md:h-8 object-contain filter drop-shadow-[0_4px_8px_rgba(0,0,0,0.3)] relative z-10 rounded-sm" 
                              alt=""
                            />
                          </div>
                        )}
                        <span className="text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black uppercase tracking-tighter italic drop-shadow-lg truncate">
                          {subText}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
