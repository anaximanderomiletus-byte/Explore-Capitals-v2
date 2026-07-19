import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Timer,
  Trophy,
  ArrowLeft,
  Camera,
  Check,
  X,
  MapPin,
  Loader2,
  Play,
} from "lucide-react";
import { COUNTRIES } from "../constants";
import { loadTours } from "../data/staticTours";
import { getStaticImages } from "../data/images";
import Button from "../components/Button";
import { Country } from "../types";
import SEO from "../components/SEO";
import { useLayout } from "../context/LayoutContext";
import { useUser } from "../context/UserContext";
import TimeSelector from "../components/TimeSelector";
import GameSideAds from "../components/GameSideAds";
import { getGameStructuredData } from "../utils/gameStructuredData";
import { useTranslation } from "../context/LocaleContext";
import GameNavigationButtons from "../components/GameNavigationButtons";

const shuffle = <T,>(array: T[]): T[] => {
  return [...array].sort(() => Math.random() - 0.5);
};

interface Question {
  country: Country;
  landmarkName: string;
  imageUrl: string;
  options: Country[];
}

export default function LandmarkLegend() {
  const { t } = useTranslation();
  const [gameState, setGameState] = useState<
    "start" | "preparing" | "playing" | "finished"
  >("start");
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [gameDuration, setGameDuration] = useState(60);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [selectedAnswerId, setSelectedAnswerId] = useState<string | null>(null);
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
    } else if (timeLeft === 0 && gameState === "playing") {
      setGameState("finished");
    }
    return () => clearInterval(timer);
  }, [gameState, timeLeft]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${String(s).padStart(2, "0")}`;
  };

  useEffect(() => {
    if (gameState === "finished" && !hasReported) {
      recordGameResult({
        gameId: "landmark-legend",
        score,
        correctCountries,
        incorrectCountries,
        durationSeconds: gameDuration - timeLeft,
      });
      setHasReported(true);
    }
  }, [
    gameState,
    gameDuration,
    hasReported,
    recordGameResult,
    score,
    correctCountries,
    incorrectCountries,
    timeLeft,
  ]);

  // Generate a finite list of questions for this session (Limit to 15 for faster loading)
  const getQuestionsList = useCallback(async (): Promise<Question[]> => {
    const [IMAGES, tours] = await Promise.all([getStaticImages(), loadTours()]);
    const validCountries = COUNTRIES.filter((c) => tours[c.name]);
    const shuffledValid = shuffle(validCountries).slice(0, 15); // Limit to 15 questions per game

    return shuffledValid
      .map((country) => {
        const tour = tours[country.name];
        const stop = tour.stops[Math.floor(Math.random() * tour.stops.length)];
        const landmarkName = stop.stopName;
        const imageUrl =
          IMAGES[stop.imageKeyword || landmarkName] || IMAGES[country.name];

        const distractors: Country[] = [];
        while (distractors.length < 3) {
          const c = COUNTRIES[Math.floor(Math.random() * COUNTRIES.length)];
          if (c.id !== country.id && !distractors.find((d) => d.id === c.id)) {
            distractors.push(c);
          }
        }

        return {
          country,
          landmarkName,
          imageUrl,
          options: shuffle([country, ...distractors]),
        };
      })
      .filter((q) => q.imageUrl);
  }, []);

  const startGame = async () => {
    setGameState("preparing");
    const newQuestions = await getQuestionsList();

    // Pre-load all images for the current set
    const imagePromises = newQuestions.map((q) => {
      return new Promise((resolve) => {
        const img = new Image();
        img.src = q.imageUrl;
        img.onload = resolve;
        img.onerror = resolve; // Resolve anyway to not block the game flow
      });
    });

    // Wait for all assets to be cached in browser memory
    await Promise.all(imagePromises);

    setQuestions(newQuestions);
    setScore(0);
    setTimeLeft(gameDuration);
    setQuestionIndex(0);
    setCorrectCountries([]);
    setIncorrectCountries([]);
    setHasReported(false);
    setFeedback(null);
    setFeedbackKey(0);

    if (newQuestions.length > 0) {
      setCurrentQuestion(newQuestions[0]);
      setSelectedAnswerId(null);
      setGameState("playing");
    } else {
      console.error("No questions generated for Landmark Legend");
      setGameState("start"); // Revert to start if failed
    }
  };

  const handleAnswer = (countryId: string) => {
    if (selectedAnswerId || !currentQuestion) return;
    setSelectedAnswerId(countryId);
    const correct = countryId === currentQuestion.country.id;
    setFeedback(correct ? "correct" : "incorrect");
    setFeedbackKey((prev) => prev + 1);
    if (correct) {
      setScore((s) => s + 20);
      setCorrectCountries((prev) => [...prev, currentQuestion.country.id]);
    } else {
      setIncorrectCountries((prev) => [...prev, currentQuestion.country.id]);
    }

    setTimeout(() => {
      const nextIndex = questionIndex + 1;
      if (nextIndex < questions.length) {
        setQuestionIndex(nextIndex);
        setCurrentQuestion(questions[nextIndex]);
        setSelectedAnswerId(null);
      } else {
        setGameState("finished");
      }
    }, 700);
  };

  return (
    <div className="h-screen h-[100svh] bg-surface font-sans relative overflow-hidden">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img
          src={`${import.meta.env.BASE_URL}png/GAMES/landmark-legend.png`}
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
              title="Landmark Legend - Games"
              description="Identify countries by their famous landmarks. Test your knowledge of world monuments, natural wonders, and iconic locations."
              structuredData={getGameStructuredData({
                name: "Landmark Legend",
                slug: "landmark-legend",
                description:
                  "Identify countries by their famous landmarks. Test your knowledge of world monuments, natural wonders, and iconic locations.",
                image: "/png/GAMES/landmark-legend.png",
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
                    src={`${import.meta.env.BASE_URL}png/GAMES/landmark-legend.png`}
                    alt="Landmark Legend"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h1 className="text-4xl sm:text-5xl font-display font-black text-text mb-2 uppercase tracking-tighter">
                  Landmark Legend
                </h1>
                <p className="text-muted text-[10px] mb-6 font-bold uppercase tracking-[0.2em] leading-relaxed h-8 sm:h-auto flex items-center justify-center">
                  Identify nations through their landmarks.
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
              title="Landmark Legend - Games"
              description="Identify countries by their famous landmarks. Test your knowledge of world monuments, natural wonders, and iconic locations."
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
                    Landmark Legend
                  </h2>
                </div>
                <div className="w-[32px] sm:w-[40px] shrink-0" />
              </div>
              <div className="game-card-content flex-1 flex flex-col min-h-0 overflow-y-auto overflow-x-hidden p-2 sm:p-3 md:p-6 relative z-10">
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
                    initial={{ opacity: 0, scale: 0.95, y: 12 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.97, y: -8 }}
                    transition={{
                      duration: 0.45,
                      ease: [0.25, 0.46, 0.45, 0.94],
                    }}
                    style={{ willChange: "transform, opacity" }}
                    className="flex-1 flex flex-col min-h-0"
                  >
                    {/* Centered image area */}
                    <div className="game-content flex flex-col items-center justify-center flex-1 min-h-0 py-2 md:pt-2 md:pb-6 relative z-10">
                      <p className="text-primary font-black text-[9px] md:text-xs uppercase tracking-[0.4em] mb-2 md:mb-3 font-sans opacity-80 shrink-0">
                        IDENTIFY THE LANDMARK LOCATION
                      </p>
                      <div
                        className="game-landmark relative w-full max-w-sm md:max-w-2xl h-auto max-h-60 md:max-h-96 min-h-0 shrink rounded-xl md:rounded-2xl overflow-hidden bg-surface border border-border shadow-premium"
                        style={{
                          transform: "perspective(1000px) rotateX(2deg)",
                        }}
                      >
                        {/* Subtle shine overlay */}
                        <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent pointer-events-none z-10" />
                        <img
                          src={currentQuestion.imageUrl}
                          alt={`${currentQuestion.landmarkName} landmark`}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-text/70 via-text/20 to-transparent pointer-events-none" />
                        {/* Frame effect - top highlight */}
                        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                        <div className="absolute bottom-2 md:bottom-3 left-2 md:left-3 right-2 md:right-3 p-2 md:p-3 bg-elevated/95 rounded-lg md:rounded-xl border border-border text-text flex items-center gap-2 shadow-premium overflow-hidden z-20">
                          <div className="p-1.5 bg-accent-soft rounded-lg relative z-10 border border-border">
                            <MapPin
                              size={14}
                              className="md:w-4 md:h-4 text-primary"
                            />
                          </div>
                          <h2 className="font-display font-black text-xs md:text-base relative z-10 uppercase tracking-tighter leading-tight line-clamp-1">
                            {currentQuestion.landmarkName}
                          </h2>
                        </div>
                      </div>
                    </div>

                    {/* Grid of options at bottom */}
                    <div className="game-options-grid grid grid-cols-1 md:grid-cols-2 gap-1.5 sm:gap-2 md:gap-2.5 shrink-0 pb-2 md:pb-4 relative z-10">
                      {currentQuestion.options.map((option) => {
                        const isSelected = selectedAnswerId === option.id;
                        const isCorrect =
                          option.id === currentQuestion.country.id;
                        const isWrong = isSelected && !isCorrect;

                        // No hover styles - prevents "pre-highlighted" appearance on touch devices
                        let stateStyles =
                          "bg-elevated border border-border text-text active:bg-accent-soft active:border-primary/40";

                        if (selectedAnswerId) {
                          if (isCorrect)
                            stateStyles =
                              "feedback-correct border-2";
                          else if (isSelected)
                            stateStyles =
                              "feedback-incorrect border-2";
                          else if (option.id === currentQuestion.country.id)
                            stateStyles =
                              "feedback-correct border-2";
                          else
                            stateStyles =
                              "bg-surface border border-border text-muted opacity-40";
                        }

                        return (
                          <button
                            key={option.id}
                            onClick={() => handleAnswer(option.id)}
                            disabled={!!selectedAnswerId}
                            className={`game-option relative p-2 sm:p-2.5 md:p-3 rounded-xl sm:rounded-2xl font-display font-black text-xs sm:text-sm md:text-lg flex items-center justify-center min-h-[48px] sm:min-h-[56px] md:min-h-[64px] transition-colors duration-500 uppercase tracking-tighter overflow-hidden ${stateStyles} ${isWrong ? "animate-shake" : ""}`}
                            style={{ WebkitTapHighlightColor: "transparent" }}
                          >
                            <span className="text-center leading-tight relative z-10">
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
