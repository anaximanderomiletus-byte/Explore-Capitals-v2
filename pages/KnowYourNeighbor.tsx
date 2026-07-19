import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Timer,
  Trophy,
  ArrowLeft,
  RefreshCw,
  Network,
  AlertCircle,
  Play,
} from "lucide-react";
import { COUNTRIES, DE_FACTO_COUNTRIES, TERRITORIES } from "../constants";
import Button from "../components/Button";
import { Country } from "../types";
import { getFlagUrl } from "../utils/flags";
import SEO from "../components/SEO";
import { useLayout } from "../context/LayoutContext";
import { useUser } from "../context/UserContext";
import TimeSelector from "../components/TimeSelector";
import GameSideAds from "../components/GameSideAds";
import { getGameStructuredData } from "../utils/gameStructuredData";
import { useTranslation } from "../context/LocaleContext";
import GameNavigationButtons from "../components/GameNavigationButtons";
import { preloadImages } from "../utils/preloadImages";

const shuffle = <T,>(array: T[]): T[] => {
  return [...array].sort(() => Math.random() - 0.5);
};

export default function KnowYourNeighbor() {
  const { t } = useTranslation();
  const [gameState, setGameState] = useState<
    "start" | "preparing" | "playing" | "finished"
  >("start");
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [gameDuration, setGameDuration] = useState(60);
  const [validCountries, setValidCountries] = useState<Country[]>([]);
  const [targetCountry, setTargetCountry] = useState<Country | null>(null);
  const [options, setOptions] = useState<string[]>([]);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [roundResult, setRoundResult] = useState<
    "correct" | "incorrect" | null
  >(null);
  const [feedbackKey, setFeedbackKey] = useState(0);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [hasReported, setHasReported] = useState(false);
  const { recordGameResult } = useUser();
  const navigate = useNavigate();
  const { setPageLoading } = useLayout();

  useEffect(() => {
    setPageLoading(false);
  }, [setPageLoading]);

  useEffect(() => {
    const valid = COUNTRIES.filter((c) => c.borders && c.borders.length > 0);
    setValidCountries(valid);
  }, []);

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

  useEffect(() => {
    if (gameState === "finished" && !hasReported) {
      recordGameResult({
        gameId: "know-your-neighbor",
        score,
        durationSeconds: gameDuration - timeLeft,
      });
      setHasReported(true);
    }
  }, [gameState, gameDuration, hasReported, recordGameResult, score, timeLeft]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${String(s).padStart(2, "0")}`;
  };

  const generateRound = async () => {
    if (validCountries.length === 0) return false;
    const target =
      validCountries[Math.floor(Math.random() * validCountries.length)];

    const neighbors = target.borders || [];
    const potentialDistractors = COUNTRIES.filter(
      (c) => c.name !== target.name && !neighbors.includes(c.name),
    ).map((c) => c.name);
    const shuffledDistractors = shuffle(potentialDistractors);
    const numDistractors = Math.max(4, 15 - neighbors.length);
    const roundDistractors = shuffledDistractors.slice(0, numDistractors);
    const roundOptions = shuffle([...neighbors, ...roundDistractors]);
    const optionFlagSources = roundOptions
      .map(
        (countryName) =>
          COUNTRIES.find((c) => c.name === countryName) ||
          DE_FACTO_COUNTRIES.find((c) => c.name === countryName) ||
          TERRITORIES.find((c) => c.name === countryName),
      )
      .map((country) => (country ? getFlagUrl(country.flag) : undefined));

    await preloadImages([getFlagUrl(target.flag), ...optionFlagSources]);

    setTargetCountry(target);
    setSelectedOptions([]);
    setRoundResult(null);
    setFeedback(null);
    setOptions(roundOptions);
    return true;
  };

  const startGame = async () => {
    setGameState("preparing");
    setScore(0);
    setTimeLeft(gameDuration);
    setHasReported(false);
    setRoundResult(null);
    setFeedbackKey(0);
    const isReady = await generateRound();
    setGameState(isReady ? "playing" : "start");
  };

  const toggleOption = (countryName: string) => {
    if (roundResult) return;
    setSelectedOptions((prev) =>
      prev.includes(countryName)
        ? prev.filter((c) => c !== countryName)
        : [...prev, countryName],
    );
  };

  const submitAnswer = () => {
    if (!targetCountry || !targetCountry.borders) return;
    const actualNeighbors = targetCountry.borders;
    const selected = selectedOptions;
    const missedNeighbors = actualNeighbors.filter(
      (n) => !selected.includes(n),
    );
    const wrongSelections = selected.filter(
      (s) => !actualNeighbors.includes(s),
    );

    if (missedNeighbors.length === 0 && wrongSelections.length === 0) {
      setScore((s) => s + 20);
      setRoundResult("correct");
      setFeedbackKey((prev) => prev + 1);
      setFeedback("Perfect!");
      setTimeout(() => {
        void generateRound();
      }, 700);
    } else {
      setRoundResult("incorrect");
      setFeedbackKey((prev) => prev + 1);
      setFeedback(
        `${missedNeighbors.length} missed, ${wrongSelections.length} wrong.`,
      );
      setTimeout(() => {
        void generateRound();
      }, 2500);
    }
  };

  return (
    <div className="h-screen h-[100svh] bg-surface font-sans relative overflow-hidden">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img
          src={`${import.meta.env.BASE_URL}png/GAMES/know-your-neighbor.png`}
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
              title="Border Blitz - Games"
              description="Can you name all the bordering countries? Test your knowledge of world geography and country borders in this quiz."
              structuredData={getGameStructuredData({
                name: "Border Blitz",
                slug: "know-your-neighbor",
                description:
                  "Can you name all the bordering countries? Test your knowledge of world geography and country borders in this quiz.",
                image: "/png/GAMES/know-your-neighbor.png",
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
                    src={`${import.meta.env.BASE_URL}png/GAMES/know-your-neighbor.png`}
                    alt="Border Blitz"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h1 className="text-4xl sm:text-5xl font-display font-black text-text mb-2 uppercase tracking-tighter">
                  Border Blitz
                </h1>
                <p className="text-muted text-[10px] mb-6 font-bold uppercase tracking-[0.2em] leading-relaxed h-8 sm:h-auto flex items-center justify-center">
                  Identify every bordering country.
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

        {gameState === "playing" && targetCountry && (
          <motion.div
            key="playing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            className="game-playing h-full flex flex-col px-3 md:px-4 pt-4 md:pt-16 pb-2 md:pb-3 overflow-y-auto overflow-x-hidden"
          >
            <SEO
              title="Border Blitz - Games"
              description="Can you name all the bordering countries? Test your knowledge of world geography and country borders in this quiz."
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
                  <h2 className="text-[12px] sm:text-[14px] md:text-[16px] font-black text-text uppercase tracking-[0.1em] sm:tracking-[0.15em] md:tracking-[0.3em] truncate max-w-full text-center">
                    Border Blitz
                  </h2>
                </div>
                <div className="w-[32px] sm:w-[40px] shrink-0" />
              </div>
              <div className="game-card-content flex-1 flex flex-col min-h-0 overflow-y-auto overflow-x-hidden p-1.5 sm:p-2 md:p-4 relative z-10">
                {/* Points and Timer - Responsive layout for all screen sizes */}
                <div className="flex items-center justify-between gap-2 mb-1 sm:mb-2 md:mb-2 relative z-20 shrink-0">
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
                    key={targetCountry.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    style={{ willChange: "opacity" }}
                    className="game-neighbor-inner h-full flex flex-col justify-between relative z-10"
                  >
                    {/* Country Prompt - More spacious */}
                    <div className="shrink-0 flex flex-col items-center justify-center py-4 sm:py-6 md:py-8">
                      <div className="text-center">
                        <p className="text-primary font-black text-[10px] md:text-xs uppercase tracking-[0.4em] mb-2 md:mb-3 font-sans opacity-80 shrink-0">
                          SELECT ALL NEIGHBORS
                        </p>
                        <h3 className="text-xl md:text-3xl font-display font-black text-text leading-tight px-4 uppercase tracking-tighter mb-2 md:mb-3">
                          {targetCountry.name}
                        </h3>
                        <img
                          src={getFlagUrl(targetCountry.flag)}
                          alt={`${targetCountry.name} Flag`}
                          className="max-h-[8vh] md:max-h-[10vh] w-auto mx-auto min-h-0 shrink object-contain"
                          onError={(e) => {
                            e.currentTarget.style.display = "none";
                          }}
                        />
                      </div>
                    </div>
                    <div className="h-4 md:h-8 shrink-0" />

                    {/* Selections Grid - Fills remaining space with thinner buttons */}
                    <div className="game-neighbor-grid flex-1 min-h-0 px-1 pb-4">
                      <div
                        className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-1.5 md:gap-2 w-full h-full content-center"
                        style={{ gridAutoRows: "minmax(44px, 1fr)" }}
                      >
                        {options.map((countryName) => {
                          const isSelected =
                            selectedOptions.includes(countryName);
                          const isActualNeighbor =
                            targetCountry.borders?.includes(countryName);
                          const isIncorrectSelection =
                            isSelected && !isActualNeighbor;
                          const country =
                            COUNTRIES.find((c) => c.name === countryName) ||
                            DE_FACTO_COUNTRIES.find(
                              (c) => c.name === countryName,
                            ) ||
                            TERRITORIES.find((c) => c.name === countryName);
                          const flagUrl = country
                            ? getFlagUrl(country.flag)
                            : "";

                          // Determine which state classes to apply for the border/shadow
                          let stateClasses =
                            "bg-elevated border border-border text-white shadow-sm";

                          if (roundResult) {
                            if (isActualNeighbor && isSelected) {
                              stateClasses =
                                "border-2 border-success text-white";
                            } else if (isActualNeighbor && !isSelected) {
                              stateClasses =
                                "border-2 border-warning text-white";
                            } else if (isSelected && !isActualNeighbor) {
                              stateClasses = "border-2 border-error text-white";
                            } else {
                              stateClasses =
                                "border border-border text-muted opacity-40";
                            }
                          } else if (isSelected) {
                            stateClasses = "border-2 border-primary text-white";
                          }

                          return (
                            <button
                              key={countryName}
                              onClick={() => toggleOption(countryName)}
                              disabled={!!roundResult}
                              className={`relative p-1 rounded-lg md:rounded-xl font-black text-[8px] md:text-[9px] flex items-center justify-center text-center transition-all duration-200 uppercase tracking-tight overflow-hidden group h-full focus:outline-none focus:ring-0 select-none ${stateClasses} ${roundResult && isIncorrectSelection ? "animate-shake" : ""}`}
                              style={{ WebkitTapHighlightColor: "transparent" }}
                            >
                              {flagUrl && (
                                <div className="absolute inset-0 z-0">
                                  <img
                                    src={flagUrl}
                                    className="w-full h-full object-cover"
                                    alt=""
                                  />

                                  {/* Layered Overlays for smooth transitions */}
                                  {/* 1. Default Dark Overlay */}
                                  <div
                                    className={`absolute inset-0 bg-text/50 transition-opacity duration-200 ${!isSelected && !roundResult ? "opacity-100" : "opacity-0"}`}
                                  />

                                  {/* 2. Selection Overlay */}
                                  <div
                                    className={`absolute inset-0 bg-primary/70 transition-opacity duration-200 ${isSelected && !roundResult ? "opacity-100" : "opacity-0"}`}
                                  />

                                  {/* 3. Correct Result Overlay */}
                                  <div
                                    className={`absolute inset-0 feedback-correct transition-opacity duration-200 ${roundResult && isActualNeighbor && isSelected ? "opacity-100" : "opacity-0"}`}
                                  />

                                  {/* 4. Missed neighbor — yellow */}
                                  <div
                                    className={`absolute inset-0 bg-warning transition-opacity duration-200 ${roundResult && isActualNeighbor && !isSelected ? "opacity-100" : "opacity-0"}`}
                                  />

                                  {/* 5. Incorrect Result Overlay (Red) */}
                                  <div
                                    className={`absolute inset-0 feedback-incorrect transition-opacity duration-200 ${roundResult && isSelected && !isActualNeighbor ? "opacity-100" : "opacity-0"}`}
                                  />

                                  {/* 6. Ghost/Dimmed Result Overlay */}
                                  <div
                                    className={`absolute inset-0 bg-text/70 transition-opacity duration-200 ${roundResult && !isSelected && !isActualNeighbor ? "opacity-100" : "opacity-0"}`}
                                  />
                                </div>
                              )}
                              <span className="leading-tight relative z-10 px-0.5">
                                {countryName}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Submit Button - below selections */}
                    <div className="shrink-0 relative z-10 pt-2">
                      <div className="h-px w-full bg-accent-soft mb-2" />
                      {roundResult ? (
                        <div
                          className={`p-5 md:p-8 rounded-full border flex items-center justify-center gap-3 font-black uppercase tracking-widest relative overflow-hidden animate-in zoom-in-95 duration-300 ${roundResult === "correct" ? "feedback-correct" : "feedback-incorrect"}`}
                        >
                          <span className="text-base md:text-xl relative z-10">
                            {feedback}
                          </span>
                        </div>
                      ) : (
                        <button
                          onClick={submitAnswer}
                          disabled={selectedOptions.length === 0}
                          className={`w-full aspect-[6] sm:aspect-[7] md:aspect-[8] min-h-[56px] md:min-h-[80px] text-[clamp(18px,7.5vw,30px)] uppercase tracking-widest font-display font-black rounded-full transition-all duration-200 select-none ${selectedOptions.length > 0 ? "bg-primary text-text hover:bg-primary-hover active:bg-primary-press active:scale-[0.98] cursor-pointer" : "bg-surface border border-border text-muted cursor-not-allowed"}`}
                          style={{ WebkitTapHighlightColor: "transparent" }}
                        >
                          Submit
                        </button>
                      )}
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
