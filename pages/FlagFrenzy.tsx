import React, { useState, useEffect, useMemo } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Timer, Trophy, ArrowLeft, RefreshCw, Flag, Play } from "lucide-react";
import { COUNTRIES } from "../constants";
import Button from "../components/Button";
import { Country } from "../types";
import SEO from "../components/SEO";
import { useUser } from "../context/UserContext";
import { useLayout } from "../context/LayoutContext";
import { getCountryCode, getFlagUrl } from "../utils/flags";
import TimeSelector from "../components/TimeSelector";
import GameSideAds from "../components/GameSideAds";
import { getGameStructuredData } from "../utils/gameStructuredData";
import { useTranslation } from "../context/LocaleContext";
import GameNavigationButtons from "../components/GameNavigationButtons";

const shuffle = <T,>(array: T[]): T[] => {
  return [...array].sort(() => Math.random() - 0.5);
};

export default function FlagFrenzy() {
  const { t } = useTranslation();
  const [gameState, setGameState] = useState<
    "start" | "preparing" | "playing" | "finished"
  >("start");
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [gameDuration, setGameDuration] = useState(60);
  const [shuffledCountries, setShuffledCountries] = useState<Country[]>([]);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState<{
    country: Country;
    options: Country[];
  } | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [imgError, setImgError] = useState(false);
  const [correctCountries, setCorrectCountries] = useState<string[]>([]);
  const [incorrectCountries, setIncorrectCountries] = useState<string[]>([]);
  const [hasReported, setHasReported] = useState(false);
  const [feedback, setFeedback] = useState<"correct" | "incorrect" | null>(
    null,
  );
  const [feedbackKey, setFeedbackKey] = useState(0);
  const { recordGameResult } = useUser();
  const navigate = useNavigate();
  const { setPageLoading } = useLayout();

  useEffect(() => {
    setPageLoading(false);
  }, [setPageLoading]);

  useEffect(() => {
    let timer: any;
    if (gameState === "playing" && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setGameState("finished");
    }
    return () => clearInterval(timer);
  }, [gameState, timeLeft]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${String(s).padStart(2, "0")}`;
  };

  const setupQuestion = (target: Country) => {
    const distractors: Country[] = [];
    while (distractors.length < 3) {
      const c = COUNTRIES[Math.floor(Math.random() * COUNTRIES.length)];
      if (c.id !== target.id && !distractors.find((d) => d.id === c.id)) {
        distractors.push(c);
      }
    }
    const options = shuffle([target, ...distractors]);
    setCurrentQuestion({ country: target, options });
    setSelectedAnswer(null);
    setImgError(false);

    // Preload flag for this question
    const img = new Image();
    img.src = `/flags/${getCountryCode(target.flag)}.png`;
  };

  const startGame = async () => {
    setGameState("preparing");
    const queue = shuffle([...COUNTRIES]);
    // Preload the first 5 flags so there's no flicker on the first few questions
    const preloadSrc = queue
      .slice(0, 5)
      .map((c) => `/flags/${getCountryCode(c.flag)}.png`);
    await Promise.all(
      preloadSrc.map(
        (src) =>
          new Promise<void>((resolve) => {
            const img = new Image();
            img.src = src;
            img.onload = () => resolve();
            img.onerror = () => resolve();
          }),
      ),
    );
    setScore(0);
    setTimeLeft(gameDuration);
    setFeedback(null);
    setFeedbackKey(0);
    setShuffledCountries(queue);
    setQuestionIndex(0);
    setCorrectCountries([]);
    setIncorrectCountries([]);
    setHasReported(false);
    if (queue.length > 0) {
      setupQuestion(queue[0]);
    }
    setGameState("playing");
  };

  const handleAnswer = (countryName: string) => {
    if (selectedAnswer || !currentQuestion) return;
    setSelectedAnswer(countryName);
    const correct = countryName === currentQuestion.country.name;
    setFeedback(correct ? "correct" : "incorrect");
    setFeedbackKey((prev) => prev + 1);
    if (correct) {
      setScore((s) => s + 10);
      setCorrectCountries((prev) => [...prev, currentQuestion.country.id]);
    } else {
      setIncorrectCountries((prev) => [...prev, currentQuestion.country.id]);
    }
    setTimeout(() => {
      const nextIndex = questionIndex + 1;
      if (nextIndex < shuffledCountries.length) {
        setQuestionIndex(nextIndex);
        setupQuestion(shuffledCountries[nextIndex]);
      } else {
        setGameState("finished");
      }
    }, 700);
  };

  const currentCountryCode = useMemo(() => {
    if (!currentQuestion) return "";
    return getCountryCode(currentQuestion.country.flag);
  }, [currentQuestion]);

  useEffect(() => {
    if (gameState === "finished" && !hasReported) {
      recordGameResult({
        gameId: "flag-frenzy",
        score,
        correctCountries,
        incorrectCountries,
        durationSeconds: gameDuration - timeLeft,
      });
      setHasReported(true);
    }
  }, [
    gameState,
    hasReported,
    recordGameResult,
    score,
    correctCountries,
    incorrectCountries,
    timeLeft,
    gameDuration,
  ]);

  return (
    <div className="h-screen h-[100svh] bg-surface font-sans relative overflow-hidden">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img
          src={`${import.meta.env.BASE_URL}png/GAMES/flag-frenzy.png`}
          alt=""
          className="w-full h-full object-cover opacity-10 blur-sm"
        />
      </div>
      <AnimatePresence mode="wait">
        {gameState === "start" && (
          <motion.div
            key="start"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className="h-full flex px-3 sm:px-4 pt-4 pb-16 sm:py-16 overflow-y-auto"
          >
            <SEO
              title="Flag Frenzy - Games"
              description="Identify country flags in 60 seconds. Test how many world flags you can recognize in this fast-paced quiz game."
              structuredData={getGameStructuredData({
                name: "Flag Frenzy",
                slug: "flag-frenzy",
                description:
                  "Identify country flags in 60 seconds. Test how many world flags you can recognize in this fast-paced quiz game.",
                image: "/png/GAMES/flag-frenzy.png",
              })}
            />

            {/* Background Decor */}
            <div className="fixed inset-0 z-0 pointer-events-none">
              <div className="absolute top-[-20%] left-[-10%] w-[100%] h-[100%] bg-accent-soft rounded-full blur-3xl opacity-60" />
              <div className="absolute bottom-[-10%] right-[-10%] w-[80%] h-[80%] bg-accent/10 rounded-full blur-3xl opacity-40" />
            </div>

            <GameSideAds />
            <div className="mx-auto mt-6 md:mt-16 mb-auto md:my-auto flex flex-col items-center gap-4 relative z-10 w-full max-w-2xl">
              <div className="game-lobby-card w-full bg-elevated rounded-2xl p-8 sm:p-12 text-center border border-border shadow-premium overflow-hidden group relative">
                <div className="w-24 h-24 rounded-2xl mx-auto mb-8 border border-border relative overflow-hidden">
                  <img
                    src={`${import.meta.env.BASE_URL}png/GAMES/flag-frenzy.png`}
                    alt="Flag Frenzy"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h1 className="text-4xl sm:text-5xl font-display font-black text-text mb-2 uppercase tracking-tighter">
                  Flag Frenzy
                </h1>
                <p className="text-muted text-[10px] mb-6 font-bold uppercase tracking-[0.2em] leading-relaxed h-8 sm:h-auto flex items-center justify-center">
                  Match flags to nations.
                </p>
                <div className="mb-6">
                  <TimeSelector
                    value={gameDuration}
                    onChange={setGameDuration}
                  />
                </div>
                <div className="block w-full">
                  <Button
                    onClick={startGame}
                    size="lg"
                    className="w-[80vw] max-w-[384px] aspect-[4.8] text-[clamp(18px,7.5vw,30px)] uppercase tracking-widest font-black p-0 flex items-center justify-center mx-auto"
                  >
                    START{" "}
                    <Play
                      className="ml-2 w-[min(7.5vw,36px)] h-[min(7.5vw,36px)]"
                      fill="currentColor"
                    />
                  </Button>
                </div>
                <GameNavigationButtons />
              </div>
            </div>
          </motion.div>
        )}

        {gameState === "preparing" && (
          <motion.div
            key="preparing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="h-full flex items-center justify-center px-3 sm:px-4 py-16"
          >
            <div className="flex flex-col items-center gap-6">
              <div className="w-10 h-10 border-[3px] border-border border-t-sky rounded-full animate-spin" />
              <div className="text-muted font-display font-black text-sm uppercase tracking-[0.2em]">
                Loading
              </div>
            </div>
          </motion.div>
        )}

        {gameState === "playing" && currentQuestion && (
          <motion.div
            key="playing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            className="game-playing h-full flex flex-col px-3 md:px-4 pt-4 md:pt-16 pb-2 md:pb-6 overflow-y-auto overflow-x-hidden"
          >
            <SEO
              title="Flag Frenzy - Games"
              description="Identify country flags in 60 seconds. Test how many world flags you can recognize in this fast-paced quiz game."
            />

            {/* Background Decor */}
            <div className="fixed inset-0 z-0 pointer-events-none">
              <div className="absolute top-[10%] right-[10%] w-[60%] h-[60%] bg-accent-soft rounded-full blur-3xl" />
              <div className="absolute bottom-[10%] left-[10%] w-[50%] h-[50%] bg-accent/5 rounded-full blur-3xl" />
            </div>

            {/* Top Bar - Uses flexbox for reliable layout on all screens including in-app browsers */}
            <div className="game-bubble flex-1 max-w-2xl mx-auto w-full flex flex-col min-h-0 bg-elevated shadow-premium overflow-hidden relative z-10 rounded-2xl border border-border">
              <div className="game-top-bar w-full flex shrink-0 items-center justify-between px-4 py-3 md:px-6 md:py-4 border-b border-border z-20">
                <Link
                  to="/games/all"
                  className="p-1 sm:p-2 text-muted hover:text-primary transition-colors shrink-0"
                >
                  <ArrowLeft size={24} />
                </Link>
                <div className="flex-1 flex flex-col items-center justify-center min-w-0">
                  <h2 className="text-[12px] sm:text-[14px] md:text-[16px] font-black text-text uppercase tracking-[0.15em] sm:tracking-[0.3em] truncate max-w-full text-center">
                    Flag Frenzy
                  </h2>
                </div>
                <div className="w-[32px] sm:w-[40px] shrink-0" />
              </div>
              <div className="game-card-content flex-1 flex flex-col min-h-0 overflow-y-auto overflow-x-hidden p-2 sm:p-3 md:p-8 relative z-10">
                {/* Points and Timer - Responsive layout for all screen sizes */}
                <div className="game-score-bar flex items-center justify-between gap-2 mb-2 sm:mb-3 md:mb-4 relative z-20 shrink-0">
                  <div className="flex items-center gap-2 sm:gap-2.5 px-3 sm:px-3.5 py-1.5 md:px-4 md:py-2 rounded-xl shadow-inner bg-warning/20 border border-warning/40 relative shrink-0">
                    <Trophy
                      size={18}
                      className="sm:w-5 sm:h-5 md:w-6 md:h-6 text-warning relative z-10"
                    />
                    <span className="font-display font-black text-lg sm:text-xl md:text-2xl text-text tabular-nums relative z-10">
                      {score}
                    </span>
                  </div>
                  <div
                    className={`flex items-center gap-2 sm:gap-2.5 px-3 sm:px-3.5 py-1.5 md:px-4 md:py-2 rounded-xl shadow-inner transition-all duration-300 relative shrink-0 ${timeLeft < 10 ? "bg-red-500/10 border-2 border-error animate-timer-panic" : "bg-accent-soft text-text border border-border"}`}
                  >
                    <div
                      className={`relative z-10 ${timeLeft < 10 ? "text-error" : "text-primary"}`}
                    >
                      <Timer
                        size={18}
                        className="sm:w-5 sm:h-5 md:w-6 md:h-6"
                      />
                    </div>
                    <span
                      className={`font-display font-black text-lg sm:text-xl md:text-2xl tabular-nums min-w-[36px] sm:min-w-[42px] md:min-w-[48px] relative z-10 ${timeLeft < 10 ? "text-error" : "text-text"}`}
                    >
                      {formatTime(timeLeft)}
                    </span>
                  </div>
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={questionIndex}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    style={{ willChange: "transform, opacity" }}
                    className="flex-1 flex flex-col min-h-0"
                  >
                    <div className="game-content flex flex-col items-center justify-center flex-1 min-h-0 pt-4 sm:pt-6 pb-2 md:pt-2 md:pb-4 relative z-10 overflow-hidden">
                      <p className="text-primary font-black text-[9px] uppercase tracking-[0.4em] mb-3 md:mb-4 font-sans shrink-0">
                        IDENTIFY FLAG
                      </p>
                      <div className="flex-1 flex items-center justify-center w-full min-h-0 relative px-4 sm:px-6">
                        {!imgError ? (
                          <img
                            src={`/flags/${currentCountryCode}.png`}
                            alt={`Flag of ${currentQuestion.country.name}`}
                            className="game-flag max-w-[75%] max-h-[85%] object-contain"
                            onError={() => setImgError(true)}
                          />
                        ) : (
                          <img
                            src={getFlagUrl(currentQuestion.country.flag)}
                            alt={`Flag of ${currentQuestion.country.name}`}
                            className="game-flag max-w-[75%] max-h-[85%] object-contain"
                          />
                        )}
                      </div>
                    </div>
                    <div className="game-options-grid grid grid-cols-1 md:grid-cols-2 gap-1.5 sm:gap-2 md:gap-2.5 shrink-0 pb-2 md:pb-4 relative z-10">
                      {currentQuestion.options.map((option) => {
                        const isSelected = selectedAnswer === option.name;
                        const isCorrect =
                          option.name === currentQuestion.country.name;
                        const isWrong = isSelected && !isCorrect;

                        // No hover styles - prevents "pre-highlighted" appearance on touch devices
                        let stateStyles =
                          "bg-elevated border border-border text-text active:bg-accent-soft active:border-primary/40";
                        if (selectedAnswer) {
                          if (isCorrect)
                            stateStyles =
                              "feedback-correct border-2";
                          else if (isSelected)
                            stateStyles =
                              "feedback-incorrect border-2";
                          else if (option.name === currentQuestion.country.name)
                            stateStyles =
                              "feedback-correct border-2";
                          else
                            stateStyles =
                              "bg-surface border border-border text-muted opacity-40";
                        }
                        return (
                          <button
                            key={option.id}
                            onClick={() => handleAnswer(option.name)}
                            disabled={!!selectedAnswer}
                            className={`game-option relative p-2 sm:p-2.5 md:p-3 rounded-xl sm:rounded-2xl font-display font-black text-xs sm:text-sm md:text-lg flex items-center justify-center min-h-[48px] sm:min-h-[56px] md:min-h-[64px] transition-colors duration-500 uppercase tracking-tighter overflow-hidden ${stateStyles} ${isWrong ? "animate-shake" : ""}`}
                            style={{ WebkitTapHighlightColor: "transparent" }}
                          >
                            <span className="px-1 sm:px-2 text-center leading-tight relative z-10">
                              {option.name}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        )}

        {gameState === "finished" && (
          <motion.div
            key="finished"
            initial={{ opacity: 0, scale: 0.3, y: -300, rotate: -8 }}
            animate={{
              opacity: [0, 1, 1, 1, 1],
              scale: [0.3, 1.15, 0.95, 1.05, 1],
              y: [-300, 20, -15, 5, 0],
              rotate: [-8, 4, -3, 1, 0],
            }}
            transition={{
              duration: 0.7,
              times: [0, 0.45, 0.65, 0.85, 1],
              ease: "easeOut",
            }}
            exit={{ opacity: 0, transition: { duration: 0 } }}
            className="h-full flex px-3 sm:px-4 pt-4 pb-16 sm:py-16 overflow-y-auto"
          >
            <GameSideAds />
            <div className="mx-auto mt-6 md:mt-16 mb-auto md:my-auto flex flex-col items-center gap-4 relative z-10 w-full max-w-2xl">
              <div className="game-lobby-card w-full bg-elevated rounded-2xl p-8 sm:p-12 text-center border border-border shadow-premium overflow-hidden group">
                <div className="w-20 h-20 bg-warning/30 rounded-full flex items-center justify-center mx-auto mb-6 text-warning border border-border relative overflow-hidden">
                  <Trophy size={36} className="relative z-10" />
                </div>
                <h2 className="text-4xl sm:text-6xl font-display font-black text-text mb-4 uppercase tracking-tighter">
                  FINISHED!
                </h2>
                <p className="text-muted mb-6 text-[10px] font-black uppercase tracking-[0.2em]">
                  {t("game.finalScore")}
                </p>
                <div className="text-7xl font-display font-black text-text mb-8 tabular-nums tracking-tighter">
                  {score}
                </div>
                <div className="block w-full">
                  <Button
                    onClick={startGame}
                    size="lg"
                    className="w-[80vw] max-w-[384px] aspect-[4.8] text-[clamp(18px,7.5vw,30px)] uppercase tracking-widest font-black p-0 flex items-center justify-center mx-auto"
                  >
                    {t("game.playAgain")}{" "}
                    <Play
                      className="ml-2 w-[min(7.5vw,36px)] h-[min(7.5vw,36px)]"
                      fill="currentColor"
                    />
                  </Button>
                </div>
                <GameNavigationButtons />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
