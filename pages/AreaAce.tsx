import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Timer, Trophy, ArrowLeft, Play, Maximize2 } from "lucide-react";
import { COUNTRIES } from "../constants";
import Button from "../components/Button";
import { Country } from "../types";
import SEO from "../components/SEO";
import { useLayout } from "../context/LayoutContext";
import { useUser } from "../context/UserContext";
import { getFlagUrl } from "../utils/flags";
import TimeSelector from "../components/TimeSelector";
import GameSideAds from "../components/GameSideAds";
import { getGameStructuredData } from "../utils/gameStructuredData";
import { useTranslation } from "../context/LocaleContext";
import GameNavigationButtons from "../components/GameNavigationButtons";

const getNumericValue = (str: string) => {
  if (!str) return 0;
  const value = parseFloat(str.replace(/[^0-9.]/g, ""));
  if (str.includes("M")) return value * 1_000_000;
  if (str.includes("K")) return value * 1_000;
  return value;
};

export default function AreaAce() {
  const { t } = useTranslation();
  const [gameState, setGameState] = useState<"start" | "playing" | "finished">(
    "start",
  );
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [gameDuration, setGameDuration] = useState(60);
  const [countryA, setCountryA] = useState<Country | null>(null);
  const [countryB, setCountryB] = useState<Country | null>(null);
  const [previousPairIds, setPreviousPairIds] = useState<
    [string, string] | null
  >(null);
  const [result, setResult] = useState<"correct" | "incorrect" | null>(null);
  const [feedbackKey, setFeedbackKey] = useState(0);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [imgErrorA, setImgErrorA] = useState(false);
  const [imgErrorB, setImgErrorB] = useState(false);
  const [incorrectCountries, setIncorrectCountries] = useState<string[]>([]);
  const [hasReported, setHasReported] = useState(false);
  const { recordGameResult } = useUser();
  const navigate = useNavigate();
  const { setPageLoading } = useLayout();

  // Pre-calculate numeric values for all countries to avoid lag
  const countriesWithNumericArea = useMemo(() => {
    return COUNTRIES.map((c) => ({
      ...c,
      numericArea: getNumericValue(c.area),
    }));
  }, []);

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

  useEffect(() => {
    if (gameState === "finished" && !hasReported) {
      recordGameResult({
        gameId: "area-ace",
        score,
        durationSeconds: gameDuration - timeLeft,
      });
      setHasReported(true);
    }
  }, [gameState, gameDuration, hasReported, recordGameResult, score, timeLeft]);

  const generateRound = useCallback(() => {
    setResult(null);
    setSelectedId(null);
    setImgErrorA(false);
    setImgErrorB(false);

    // Filter out countries from the previous pair to avoid back-to-back duplicates
    const availableCountries = previousPairIds
      ? countriesWithNumericArea.filter((c) => !previousPairIds.includes(c.id))
      : countriesWithNumericArea;

    const idxA = Math.floor(Math.random() * availableCountries.length);
    let idxB = Math.floor(Math.random() * availableCountries.length);
    while (idxB === idxA)
      idxB = Math.floor(Math.random() * availableCountries.length);

    const newCountryA = availableCountries[idxA];
    const newCountryB = availableCountries[idxB];
    setPreviousPairIds([newCountryA.id, newCountryB.id]);
    setCountryA(newCountryA);
    setCountryB(newCountryB);

    // Preload next potential flags to reduce lag
    const preloadFlags = () => {
      const nextIdx1 = Math.floor(
        Math.random() * countriesWithNumericArea.length,
      );
      const nextIdx2 = Math.floor(
        Math.random() * countriesWithNumericArea.length,
      );
      const flags = [
        getFlagUrl(countriesWithNumericArea[nextIdx1].flag),
        getFlagUrl(countriesWithNumericArea[nextIdx2].flag),
      ];
      flags.forEach((src) => {
        const img = new Image();
        img.src = src;
      });
    };
    preloadFlags();
  }, [countriesWithNumericArea, previousPairIds]);

  const startGame = () => {
    setScore(0);
    setTimeLeft(gameDuration);
    setHasReported(false);
    setResult(null);
    setFeedbackKey(0);
    setPreviousPairIds(null);
    generateRound();
    setGameState("playing");
  };

  const handleChoice = (selected: Country) => {
    if (result || !countryA || !countryB) return;

    setSelectedId(selected.id);
    const areaA = (countryA as any).numericArea;
    const areaB = (countryB as any).numericArea;
    const selectedArea = (selected as any).numericArea;
    const isCorrect = selectedArea === Math.max(areaA, areaB);

    setResult(isCorrect ? "correct" : "incorrect");
    setFeedbackKey((prev) => prev + 1);
    if (isCorrect) setScore((s) => s + 10);

    // Snappier transition to next round
    setTimeout(generateRound, 700);
  };

  return (
    <div className="h-screen h-[100svh] bg-surface font-sans relative overflow-hidden">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img
          src={`${import.meta.env.BASE_URL}png/GAMES/area-ace.png`}
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
              title="Area Ace - Games"
              description="Which country is larger? Compare land areas and test your knowledge of world geography in this game."
              structuredData={getGameStructuredData({
                name: "Area Ace",
                slug: "area-ace",
                description:
                  "Which country is larger? Compare land areas and test your knowledge of world geography in this game.",
                image: "/png/GAMES/area-ace.png",
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
                    src={`${import.meta.env.BASE_URL}png/GAMES/area-ace.png`}
                    alt="Area Ace"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h1 className="text-4xl sm:text-5xl font-display font-black text-text mb-2 uppercase tracking-tighter">
                  Area Ace
                </h1>
                <p className="text-muted text-[10px] mb-6 font-bold uppercase tracking-[0.2em] leading-relaxed h-8 sm:h-auto flex items-center justify-center">
                  Choose the larger country.
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

        {gameState === "playing" && countryA && countryB && (
          <motion.div
            key="playing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            className="game-playing h-full flex flex-col px-3 md:px-4 pt-4 md:pt-16 pb-2 md:pb-6 overflow-y-auto overflow-x-hidden"
          >
            <SEO
              title="Area Ace - Games"
              description="Which country is larger? Compare land areas and test your knowledge of world geography in this game."
            />

            {/* Background Decor */}
            <div className="fixed inset-0 z-0 pointer-events-none">
              <div className="absolute top-[10%] right-[10%] w-[60%] h-[60%] bg-accent-soft rounded-full blur-3xl" />
              <div className="absolute bottom-[10%] left-[10%] w-[50%] h-[50%] bg-accent/5 rounded-full blur-3xl" />
            </div>

            {/* Top Bar - Uses flexbox for reliable layout on all screens including in-app browsers */}
            <div className="game-bubble flex-1 max-w-5xl mx-auto w-full flex flex-col min-h-0 bg-elevated shadow-premium overflow-hidden relative z-10 rounded-2xl border border-border">
              <div className="game-top-bar w-full flex shrink-0 items-center justify-between px-4 py-3 md:px-6 md:py-4 border-b border-border z-20">
                <Link
                  to="/games/all"
                  className="p-1 sm:p-2 text-muted hover:text-primary transition-colors shrink-0"
                >
                  <ArrowLeft size={24} />
                </Link>
                <div className="flex-1 flex flex-col items-center justify-center min-w-0">
                  <h2 className="text-[12px] sm:text-[14px] md:text-[16px] font-black text-text uppercase tracking-[0.15em] sm:tracking-[0.3em] truncate max-w-full text-center">
                    Area Ace
                  </h2>
                </div>
                <div className="w-[32px] sm:w-[40px] shrink-0" />
              </div>
              <div className="game-card-content flex-1 flex flex-col min-h-0 overflow-y-auto overflow-x-hidden p-2 sm:p-3 md:p-6 relative z-10">
                {/* Points and Timer - Responsive layout for all screen sizes */}
                <div className="flex items-center justify-between gap-2 mb-2 sm:mb-3 md:mb-4 relative z-20 shrink-0">
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

                <div className="flex-1 flex flex-col px-0 md:px-2 relative z-10">
                  {/* Question Text */}
                  <div className="flex flex-col items-center justify-center mb-3 md:mb-4 shrink-0">
                    <p className="text-primary font-black text-[9px] md:text-xs uppercase tracking-[0.3em]">
                      Which country has the
                    </p>
                    <h2 className="text-text font-display font-black text-xl md:text-3xl uppercase tracking-tighter">
                      Larger Area?
                    </h2>
                  </div>

                  <AnimatePresence mode="wait">
                    <motion.div
                      key={countryA?.id + (countryB?.id || "")}
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.02 }}
                      transition={{ duration: 0.3 }}
                      style={{ willChange: "transform, opacity" }}
                      className="w-full h-full grid grid-cols-2 gap-3 md:gap-5 max-w-xl md:max-w-4xl mx-auto"
                    >
                      {[countryA, countryB].map((country, idx) => {
                        if (!country) return null;
                        const other = idx === 0 ? countryB : countryA;
                        const areaCurrent = (country as any).numericArea;
                        const areaOther = (other as any).numericArea;
                        const isWinner = areaCurrent >= areaOther;
                        const isA = idx === 0;
                        const hasError = isA ? imgErrorA : imgErrorB;
                        const setHasError = isA ? setImgErrorA : setImgErrorB;
                        const isSelected = selectedId === country.id;
                        const isWrong = isSelected && !isWinner;

                        // No hover styles on mobile - prevents "pre-highlighted" sticky hover on touch devices
                        let cardStyle =
                          "border border-border active:border-primary/40";
                        let overlayStyle =
                          "bg-text/45 hover:bg-text/35 active:bg-text/30";
                        let titleStyle = "text-text";

                        if (result) {
                          if (isWinner) {
                            cardStyle = "border-2 border-primary z-20";
                            overlayStyle = "bg-primary";
                            titleStyle = "text-white";
                          } else if (isSelected) {
                            cardStyle = "border-2 border-error z-10";
                            overlayStyle = "bg-error";
                            titleStyle = "text-white";
                          } else {
                            cardStyle = "border border-border opacity-30 z-0 ";
                            overlayStyle = "bg-text/60";
                            titleStyle = "text-white/70";
                          }
                        }

                        return (
                          <div
                            key={country.id}
                            onClick={() => handleChoice(country)}
                            className={`min-h-[160px] md:min-h-[320px] relative rounded-2xl flex flex-col transition-[border-color,opacity,transform] duration-300 cursor-pointer group overflow-hidden ${cardStyle} ${isWrong ? "animate-shake" : ""}`}
                            style={{ WebkitTapHighlightColor: "transparent" }}
                          >
                            {/* Background Flag */}
                            <div className="absolute inset-0 z-0">
                              <img
                                src={getFlagUrl(country.flag)}
                                alt={`${country.name} flag`}
                                className="w-full h-full object-cover"
                              />
                            </div>

                            {/* Overlay */}
                            <div
                              className={`absolute inset-0 z-0 transition-all duration-300 ${overlayStyle}`}
                            />

                            {/* Content Container */}
                            <div className="relative z-10 flex-1 flex flex-col items-center justify-center p-2 md:p-6">
                              {/* Small Flag (OG View) */}
                              <div className="mb-2 md:mb-4 flex items-center justify-center relative w-full min-h-[50px] md:min-h-[140px]">
                                {!hasError ? (
                                  <div className="w-full max-w-[80px] md:max-w-[200px] aspect-[3/2] flex items-center justify-center">
                                    <img
                                      src={getFlagUrl(country.flag)}
                                      alt={`${country.name} flag`}
                                      className={`w-full h-full object-contain filter transition-opacity duration-500 ${result && !isWinner ? "opacity-40" : "opacity-100"}`}
                                      onError={() => setHasError(true)}
                                    />
                                  </div>
                                ) : (
                                  <div
                                    className={`w-full max-w-[80px] md:max-w-[160px] aspect-[3/2] ${result && !isWinner ? "opacity-40" : "opacity-100"}`}
                                  >
                                    <img
                                      src={getFlagUrl(country.flag)}
                                      alt={`${country.name} flag fallback`}
                                      className="w-full h-full object-contain filter"
                                    />
                                  </div>
                                )}
                              </div>

                              {/* Country name */}
                              <h3
                                className={`text-xs sm:text-sm md:text-3xl font-display font-black leading-tight uppercase tracking-tighter transition-all duration-500 text-center w-full px-1 ${titleStyle}`}
                              >
                                {country.name}
                              </h3>

                              {/* Area info - always reserves space, revealed with opacity */}
                              <div
                                className={`text-center w-full mt-2 md:mt-4 transition-opacity duration-500 ease-out ${result ? "opacity-100" : "opacity-0 pointer-events-none"}`}
                              >
                                <div className="h-px w-6 md:w-16 bg-text/20 mx-auto mb-1 md:mb-3" />
                                <div className="flex flex-col items-center gap-0.5">
                                  <span className="text-text uppercase font-black text-[7px] md:text-xs tracking-[0.2em] md:tracking-[0.3em] mb-0.5 font-sans">
                                    AREA (km²)
                                  </span>
                                  <div
                                    className={`text-sm sm:text-base md:text-4xl font-display font-black tracking-tighter tabular-nums ${isWinner ? "text-text" : "text-text"}`}
                                  >
                                    {country.area}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </motion.div>
                  </AnimatePresence>
                </div>
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
