import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Timer, Trophy, ArrowLeft, Search, EyeOff, Play } from "lucide-react";
import { COUNTRIES, GAMES } from "../constants";
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

interface Clue {
  label: string;
  value: string;
}

export default function GlobalDetective() {
  const { t } = useTranslation();
  const [gameState, setGameState] = useState<"start" | "playing" | "finished">(
    "start",
  );
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [gameDuration, setGameDuration] = useState(60);
  const [targetCountry, setTargetCountry] = useState<Country | null>(null);
  const [options, setOptions] = useState<Country[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [activeClues, setActiveClues] = useState<Clue[]>([]);
  const [isCapitalRevealed, setIsCapitalRevealed] = useState(false);
  const [roundResult, setRoundResult] = useState<
    "correct" | "incorrect" | null
  >(null);
  const [feedbackKey, setFeedbackKey] = useState(0);
  const [hasReported, setHasReported] = useState(false);
  const { recordGameResult } = useUser();
  const navigate = useNavigate();
  const { setPageLoading } = useLayout();

  useEffect(() => {
    setPageLoading(false);
  }, [setPageLoading]);

  const gameImage = GAMES.find((g) => g.id === "6")?.image;

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

  useEffect(() => {
    if (gameState === "finished" && !hasReported) {
      recordGameResult({
        gameId: "global-detective",
        score,
        durationSeconds: gameDuration - timeLeft,
      });
      setHasReported(true);
    }
  }, [gameState, gameDuration, hasReported, recordGameResult, score, timeLeft]);

  const getClueValue = (country: Country, type: string): Clue => {
    switch (type) {
      case "Region":
        return { label: "Region", value: country.region };
      case "Currency":
        return { label: "Currency", value: country.currency };
      case "Language":
        return { label: "Language", value: country.languages[0] };
      case "Population":
        return { label: "Population", value: country.population };
      case "Area":
        return { label: "Land Area", value: country.area };
      case "GDP":
        return { label: "GDP (EST)", value: country.gdp || "N/A" };
      case "Time Zone":
        return { label: "Time Zone", value: country.timeZone || "N/A" };
      case "Calling Code":
        return { label: "Dialing Code", value: country.callingCode || "N/A" };
      case "Drive Side":
        return {
          label: "Drive Side",
          value: `${country.driveSide || "Right"}-hand`,
        };
      default:
        return { label: "Region", value: country.region };
    }
  };

  const generateRound = () => {
    setSelectedAnswer(null);
    setRoundResult(null);
    setIsCapitalRevealed(false);

    const target = COUNTRIES[Math.floor(Math.random() * COUNTRIES.length)];
    setTargetCountry(target);

    // Generate 3 random clues from available pool
    const clueTypes = [
      "Region",
      "Currency",
      "Language",
      "Population",
      "Area",
      "GDP",
      "Time Zone",
      "Calling Code",
      "Drive Side",
    ];
    const shuffledTypes = shuffle(clueTypes);
    const selectedClues = shuffledTypes
      .slice(0, 3)
      .map((type) => getClueValue(target, type));
    setActiveClues(selectedClues);

    const distractors: Country[] = [];
    while (distractors.length < 3) {
      const c = COUNTRIES[Math.floor(Math.random() * COUNTRIES.length)];
      if (c.id !== target.id && !distractors.find((d) => d.id === c.id))
        distractors.push(c);
    }
    setOptions(shuffle([target, ...distractors]));
  };

  const startGame = () => {
    setScore(0);
    setTimeLeft(gameDuration);
    setHasReported(false);
    setRoundResult(null);
    setFeedbackKey(0);
    generateRound();
    setGameState("playing");
  };

  const revealCapital = () => {
    if (isCapitalRevealed || roundResult) return;
    setIsCapitalRevealed(true);
  };

  const handleAnswer = (countryName: string) => {
    if (roundResult || !targetCountry) return;
    setSelectedAnswer(countryName);
    const correct = countryName === targetCountry.name;
    setRoundResult(correct ? "correct" : "incorrect");
    setFeedbackKey((prev) => prev + 1);
    if (correct) setScore((s) => s + (isCapitalRevealed ? 15 : 20));
    setTimeout(generateRound, 700);
  };

  const clueBarBase =
    "px-4 rounded-xl border-2 flex justify-between items-center h-[54px] transition-all duration-300";

  return (
    <div className="h-screen h-[100svh] w-full relative overflow-hidden font-sans bg-surface">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img
          src={`${import.meta.env.BASE_URL}png/GAMES/global-detective.png`}
          alt=""
          className="w-full h-full object-cover opacity-10 blur-sm"
        />
      </div>
      <SEO
        title="Global Detective - Games"
        description="Can you guess the mystery country from clues? Use deduction skills to identify nations based on hints about their geography and culture."
        structuredData={getGameStructuredData({
          name: "Global Detective",
          slug: "global-detective",
          description:
            "Can you guess the mystery country from clues? Use deduction skills to identify nations based on hints about their geography and culture.",
          image: "/png/GAMES/global-detective.png",
        })}
      />

      <div className="absolute inset-0 -z-10">
        <img
          src={gameImage}
          alt=""
          className="w-full h-full object-cover scale-105"
        />
        <div className="absolute inset-0 bg-surface/90" />
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
            <GameSideAds />
            <div className="mx-auto mt-6 md:mt-16 mb-auto md:my-auto flex flex-col items-center gap-4 relative z-10 w-full max-w-2xl">
              <div className="game-lobby-card w-full bg-elevated rounded-2xl p-8 sm:p-12 text-center border border-border shadow-premium overflow-hidden group relative">
                <div className="w-24 h-24 rounded-2xl mx-auto mb-8 border border-border relative overflow-hidden">
                  <img
                    src={`${import.meta.env.BASE_URL}png/GAMES/global-detective.png`}
                    alt="Global Detective"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h1 className="text-4xl sm:text-5xl font-display font-black text-text mb-2 uppercase tracking-tighter">
                  Global Detective
                </h1>
                <p className="text-muted text-[10px] mb-6 font-bold uppercase tracking-[0.2em] leading-relaxed h-8 sm:h-auto flex items-center justify-center">
                  Identify the hidden country from clues.
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

        {gameState === "playing" && targetCountry && (
          <motion.div
            key="playing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            className="game-playing w-full h-full flex flex-col items-center justify-start relative z-10 px-3 md:px-4 pt-4 md:pt-16 pb-2 md:pb-6"
          >
            <div className="w-full max-w-2xl flex flex-col flex-1 min-h-0 relative z-10">
              {/* Top Bar - Uses flexbox for reliable layout on all screens including in-app browsers */}
              <div className="game-bubble flex-1 mx-auto w-full flex flex-col min-h-0 bg-elevated shadow-premium overflow-hidden relative z-10 rounded-2xl border border-border">
                <div className="game-top-bar w-full flex shrink-0 items-center justify-between px-4 py-3 md:px-6 md:py-4 border-b border-border z-20">
                  <Link
                    to="/games/all"
                    className="p-1 sm:p-2 text-muted hover:text-primary transition-colors shrink-0"
                  >
                    <ArrowLeft size={24} />
                  </Link>
                  <div className="flex-1 flex flex-col items-center justify-center min-w-0">
                    <h2 className="text-[12px] sm:text-[14px] md:text-[16px] font-black text-text uppercase tracking-[0.15em] sm:tracking-[0.3em] truncate max-w-full text-center">
                      Global Detective
                    </h2>
                  </div>
                  <div className="w-[32px] sm:w-[40px] shrink-0" />
                </div>
                <div className="game-card-content flex-1 flex flex-col min-h-0 overflow-y-auto overflow-x-hidden p-2 sm:p-3 md:p-8 relative z-10">
                  {/* Points and Timer - Responsive layout for all screen sizes */}
                  <div className="game-score-bar flex items-center justify-between gap-2 mb-1.5 sm:mb-2 md:mb-4 relative z-20 shrink-0">
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
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                      style={{ willChange: "transform, opacity" }}
                      className="h-full flex flex-col justify-between relative z-10"
                    >
                      <div className="game-content flex flex-col flex-1 justify-center">
                        <h2 className="text-primary font-black uppercase tracking-[0.4em] text-[9px] mb-1.5 sm:mb-2 md:mb-3 flex items-center gap-2 font-sans">
                          <Search size={12} /> Country Clues
                        </h2>

                        <div className="grid grid-cols-1 gap-1.5 md:gap-2.5 mb-1.5 md:mb-4">
                          {activeClues.map((clue, idx) => (
                            <div
                              key={idx}
                              className="px-3 sm:px-4 rounded-xl border border-border flex justify-between items-center h-[48px] sm:h-[54px] md:h-[64px] transition-all duration-500 bg-surface group hover:bg-accent-soft shadow-inner relative overflow-hidden"
                            >
                              <span className="text-[9px] font-black text-muted uppercase tracking-widest relative z-10">
                                {clue.label}
                              </span>
                              <span className="font-display font-black text-text text-sm md:text-lg uppercase tracking-tight relative z-10 truncate ml-4">
                                {clue.value}
                              </span>
                            </div>
                          ))}

                          <div
                            className={`px-3 sm:px-4 rounded-xl border flex justify-between items-center h-[48px] sm:h-[54px] md:h-[64px] transition-all duration-500 relative overflow-hidden shadow-inner ${isCapitalRevealed ? "bg-warning/20 border-warning/50" : "bg-elevated border-border cursor-pointer group"}`}
                            onClick={revealCapital}
                          >
                            <span
                              className={`text-[9px] font-black uppercase tracking-widest relative z-10 ${isCapitalRevealed ? "text-text" : "text-muted"}`}
                            >
                              Capital City
                            </span>

                            {isCapitalRevealed ? (
                              <span className="font-display font-black text-text text-sm md:text-lg uppercase tracking-tight relative z-10">
                                {targetCountry.capital}
                              </span>
                            ) : (
                              <div className="flex items-center gap-3 relative z-10">
                                <span className="text-[9px] font-black text-muted/40 tracking-[0.4em] hidden sm:block">
                                  HIDDEN
                                </span>
                                <EyeOff size={14} className="text-muted" />
                              </div>
                            )}

                            {!isCapitalRevealed && (
                              <div className="absolute inset-0 flex items-center justify-center bg-accent-soft/95 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <span className="text-text text-[9px] font-black uppercase tracking-[0.3em]">
                                  Reveal (-5 pts)
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="game-options-grid grid grid-cols-1 md:grid-cols-2 gap-1 sm:gap-1.5 md:gap-2.5 shrink-0 pb-1 md:pb-4">
                        {options.map((option) => {
                          const isSelected = selectedAnswer === option.name;
                          const isCorrect = option.name === targetCountry.name;
                          const isWrong = isSelected && !isCorrect;

                          // No hover styles - prevents "pre-highlighted" appearance on touch devices
                          let stateStyles =
                            "bg-elevated border border-border text-text active:bg-accent-soft active:border-primary/40";
                          if (selectedAnswer) {
                            if (isCorrect)
                              stateStyles =
                                "bg-primary border-2 border-primary text-white";
                            else if (isSelected)
                              stateStyles =
                                "bg-error border-2 border-error text-white";
                            else if (option.name === targetCountry.name)
                              stateStyles =
                                "bg-primary/15 border-2 border-primary text-primary";
                            else
                              stateStyles =
                                "bg-surface border border-border text-muted opacity-40";
                          }
                          return (
                            <button
                              key={option.id}
                              onClick={() => handleAnswer(option.name)}
                              disabled={!!selectedAnswer}
                              className={`game-option relative p-1.5 sm:p-2 md:p-3 rounded-xl sm:rounded-2xl font-display font-black text-xs sm:text-sm md:text-lg flex items-center justify-center min-h-[48px] sm:min-h-[56px] md:min-h-[64px] transition-colors duration-500 uppercase tracking-tighter overflow-hidden ${stateStyles} ${isWrong ? "animate-shake" : ""}`}
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
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
