import React, { useEffect, useState, useMemo } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, XCircle, Star, Sparkles } from "lucide-react";

interface FeedbackOverlayProps {
  type: "correct" | "incorrect" | null;
  triggerKey?: number;
  subText?: string;
  incorrectFlagCode?: string;
}

export const FeedbackOverlay: React.FC<FeedbackOverlayProps> = ({
  type,
  triggerKey,
  subText,
  incorrectFlagCode,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (type) {
      setIsVisible(true);
      const timer = setTimeout(() => setIsVisible(false), 1000);
      return () => clearTimeout(timer);
    } else {
      setIsVisible(false);
    }
  }, [type, triggerKey]);

  const isMobile = typeof window !== "undefined" && window.innerWidth < 640;
  const particleCount = isMobile ? 6 : 12;
  const spread = isMobile ? 160 : 350;

  const particleData = useMemo(() => {
    return Array.from({ length: particleCount }, () => ({
      x: (Math.random() - 0.5) * spread,
      y: (Math.random() - 0.5) * spread,
      scale: Math.random() * 1.2 + 0.5,
      rotate: Math.random() * 360,
      isStar: Math.random() > 0.5,
    }));
  }, [triggerKey, particleCount, spread]);

  const content = (
    <AnimatePresence>
      {isVisible && type && (
        <motion.div
          key={triggerKey}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="fixed inset-0 z-[99999] flex items-center justify-center pointer-events-none overflow-hidden px-4 select-none"
          style={{
            transform: "translateZ(0)",
            willChange: "opacity",
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
          }}
        >
          {/* Full screen background flash */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.2, 0] }}
            transition={{ duration: 0.4 }}
            className={`absolute inset-0 ${type === "correct" ? "bg-primary" : "bg-error"}`}
            style={{ transform: "translateZ(0)" }}
          />

          {type === "correct" ? (
            <div className="relative flex flex-col items-center">
              {particleData.map((p, i) => (
                <motion.div
                  key={i}
                  initial={{ x: 0, y: 0, opacity: 1, scale: 0 }}
                  animate={{
                    x: p.x,
                    y: p.y,
                    opacity: 0,
                    scale: p.scale,
                    rotate: p.rotate,
                  }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="absolute"
                  style={{ transform: "translateZ(0)" }}
                >
                  {p.isStar ? (
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
                  rotate: 0,
                }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="relative flex flex-col items-center"
                style={{ transform: "translateZ(0)" }}
              >
                <div className="bg-primary p-5 sm:p-6 md:p-8 rounded-2xl border-2 border-white shadow-premium-hover">
                  <CheckCircle2 className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 text-white" />
                </div>

                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  className="text-center mt-4 sm:mt-6 bg-primary px-5 sm:px-6 md:px-8 py-2 sm:py-3 rounded-xl border border-border shadow-premium"
                >
                  <h2 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold tracking-tight pr-1">
                    Excellent!
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
                  x: [0, -12, 12, -8, 8, 0],
                }}
                transition={{ duration: 0.4 }}
                className="relative flex flex-col items-center w-full"
                style={{ transform: "translateZ(0)" }}
              >
                <div className="bg-error p-5 sm:p-6 md:p-8 rounded-2xl border-2 border-white shadow-premium-hover">
                  <XCircle className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 text-white" />
                </div>

                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  className="text-center mt-4 sm:mt-6 bg-error px-5 sm:px-6 md:px-8 py-2 sm:py-3 rounded-xl border border-border shadow-premium"
                >
                  <h2 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold tracking-tight pr-1">
                    Not Quite
                  </h2>
                </motion.div>

                {subText && (
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    transition={{
                      delay: 0.15,
                      type: "spring",
                      stiffness: 260,
                      damping: 20,
                    }}
                    className="mt-2 sm:mt-3 flex flex-col items-center w-full max-w-[90vw] sm:max-w-none"
                  >
                    <div className="bg-elevated rounded-2xl border border-border shadow-premium-hover overflow-hidden flex flex-col items-center w-full">
                      <div className="w-full bg-surface py-1.5 sm:py-2 border-b border-border text-center">
                        <span className="text-muted font-semibold uppercase tracking-[0.2em] text-[9px] sm:text-[10px]">
                          You Selected
                        </span>
                      </div>

                      <div className="px-5 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 flex items-center justify-center gap-3 sm:gap-4 md:gap-6">
                        {incorrectFlagCode && (
                          <div className="relative flex-shrink-0">
                            <img
                              src={`/flags/${incorrectFlagCode}.png`}
                              className="w-8 h-5 sm:w-10 sm:h-7 md:w-12 md:h-8 object-contain relative z-10"
                              alt={`${subText} flag`}
                            />
                          </div>
                        )}
                        <span className="text-text text-xl sm:text-2xl md:text-3xl lg:text-4xl font-display font-bold tracking-tight pr-1">
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

  return typeof document !== "undefined"
    ? createPortal(content, document.body)
    : null;
};
