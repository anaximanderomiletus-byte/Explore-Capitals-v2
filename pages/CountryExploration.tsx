import {
  AlertCircle,
  ArrowLeft,
  BrainCircuit,
  ChevronLeft,
  ChevronRight,
  Compass,
  Globe,
  HelpCircle,
  ImageOff,
  MapPin,
  Plane,
  RotateCcw,
  Trophy,
  Navigation,
  Scroll,
  X,
  Play,
} from "lucide-react";
import React, { useEffect, useRef, useState, useMemo } from "react";
import { createPortal } from "react-dom";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Button from "../components/Button";
import SEO from "../components/SEO";
import Breadcrumbs from "../components/Breadcrumbs";
import { useLayout } from "../context/LayoutContext";
import { COUNTRIES, TERRITORIES, DE_FACTO_COUNTRIES } from "../constants";
import { getCountryTour, getGeneratedImage } from "../services/geminiService";
import { getStaticImages } from "../data/images";
import { TourData } from "../types";
import { getFlagUrl } from "../utils/flags";
import { toSlug } from "../utils/slug";

// High-Fidelity Aero Display for Tour/Expedition
const PhotoPrint: React.FC<{
  src: string | null;
  alt: string;
  imageKeyword?: string;
  caption?: string;
  region?: string;
  rotation?: string;
  className?: string;
}> = ({
  src,
  alt,
  imageKeyword,
  caption,
  region,
  rotation = "rotate-0",
  className = "",
}) => {
  const [currentSrc, setCurrentSrc] = React.useState(src);
  const [hasError, setHasError] = React.useState(!src);

  React.useEffect(() => {
    setCurrentSrc(src);
    setHasError(!src);
  }, [src]);

  const handleImgError = () => {
    setHasError(true);
    setCurrentSrc(null);
  };

  return (
    <div className={`relative group max-w-full ${className}`}>
      <div
        className={`p-1.5 sm:p-2 rounded-2xl transform ${rotation} transition-all duration-700 relative overflow-hidden flex flex-col items-center bg-elevated border border-border shadow-premium`}
      >
        <div className="w-full aspect-video rounded-xl overflow-hidden relative group/img border border-border bg-surface">
          {currentSrc ? (
            <img
              src={currentSrc}
              alt={alt}
              onError={handleImgError}
              loading="eager"
              decoding="async"
              fetchPriority="high"
              className="w-full h-full object-cover transition-all duration-1000"
            />
          ) : (
            <div className="flex flex-col items-center justify-center text-muted w-full h-full bg-surface p-6 text-center">
              <div className="flex flex-col items-center gap-4 animate-in fade-in duration-500">
                <ImageOff size={40} strokeWidth={1} className="opacity-40" />
                <span className="text-[10px] font-black tracking-[0.2em] uppercase opacity-40">
                  Image Unavailable
                </span>
              </div>
            </div>
          )}
        </div>

        {(caption || region) && (
          <div className="mt-2 sm:mt-3 pb-1 sm:pb-2 w-full px-3 sm:px-6 flex justify-between items-center relative z-10 gap-2">
            {caption && (
              <p className="text-[8px] sm:text-[10px] font-black text-text tracking-wider sm:tracking-widest uppercase font-display flex-1 truncate min-w-0">
                {caption}
              </p>
            )}
            {region && (
              <div className="bg-accent-soft border border-border px-1.5 sm:px-2.5 py-0.5 rounded-md text-[5px] sm:text-[6px] font-black text-muted uppercase tracking-[0.15em] sm:tracking-[0.2em] shrink-0 whitespace-nowrap">
                {region}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

// Container Wrapper
interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  transparent?: boolean;
}

const Container: React.FC<ContainerProps> = ({
  children,
  className = "",
  transparent = false,
}) => (
  <div
    id="exploration-container"
    className={`min-h-screen z-40 relative ${transparent ? "bg-transparent" : "bg-surface"} ${className}`}
  >
    {children}
  </div>
);

// Image Helper (Internal use for small icons/previews)
const ExpeditionVisual: React.FC<{
  src: string | null;
  alt: string;
  className?: string;
  draggable?: boolean;
}> = ({ src, alt, className = "", draggable }) => {
  if (src) {
    return (
      <img
        src={src}
        alt={alt}
        className={`w-full h-full object-cover ${className}`}
        draggable={draggable}
        loading="lazy"
        decoding="async"
      />
    );
  }

  return (
    <div
      className={`w-full h-full bg-surface flex items-center justify-center flex-col p-4 text-center ${className}`}
    >
      <ImageOff className="text-muted w-6 h-6 mb-2" />
      <span className="text-muted font-bold uppercase tracking-widest text-[8px]">
        No Visual
      </span>
    </div>
  );
};

type ViewState = "loading" | "error" | "intro" | "tour" | "quiz" | "summary";

const CountryExploration: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const country = useMemo(
    () =>
      COUNTRIES.find((c) => c.id === id || toSlug(c.name) === id) ||
      TERRITORIES.find((t) => t.id === id || toSlug(t.name) === id) ||
      DE_FACTO_COUNTRIES.find((d) => d.id === id || toSlug(d.name) === id),
    [id],
  );

  const { setNavbarMode, setScrollThreshold, setHideFooter } = useLayout();

  const [loading, setLoading] = useState(true);
  const [tourData, setTourData] = useState<TourData | null>(null);
  const [loadingStep, setLoadingStep] = useState(0);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [dataLoaded, setDataLoaded] = useState(false);

  const [introImage, setIntroImage] = useState<string | null>(null);
  const [capitalImage, setCapitalImage] = useState<string | null>(null);
  const [stopImages, setStopImages] = useState<Record<number, string | null>>(
    {},
  );

  const [view, setView] = useState<ViewState>("loading");
  const [stepIndex, setStepIndex] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [contentVisible, setContentVisible] = useState(true);
  const [transitionDirection, setTransitionDirection] = useState<
    "forward" | "backward"
  >("forward");
  const [backDestinationText, setBackDestinationText] = useState("");
  const [forwardTransitionText, setForwardTransitionText] =
    useState("Traveling");

  // Carousel Ref for Summary Screen
  const carouselRef = useRef<HTMLDivElement>(null);

  // Quiz State
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [feedbackKey, setFeedbackKey] = useState(0);
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);
  const [quizResults, setQuizResults] = useState<Record<number, boolean>>({});

  const loadingMessages = [
    "Locating Destination...",
    "Planning Your Route...",
    "Preparing Itinerary...",
    "Loading Maps...",
    "Gathering Facts...",
    "Finding Points of Interest...",
    "Almost Ready...",
  ];

  // Configure Layout based on View
  useEffect(() => {
    if (view === "tour") {
      setNavbarMode("hero");
      setScrollThreshold(window.innerHeight * 0.5);
      setHideFooter(true);
    } else if (view === "quiz") {
      setNavbarMode("default");
      setScrollThreshold(20);
      setHideFooter(false);
    } else {
      setNavbarMode("default");
      setScrollThreshold(20);
      setHideFooter(false);
    }
  }, [view, setNavbarMode, setScrollThreshold, setHideFooter]);

  // Reset layout on unmount
  useEffect(() => {
    return () => {
      setNavbarMode("default");
      setScrollThreshold(20);
      setHideFooter(false);
    };
  }, [setNavbarMode, setScrollThreshold, setHideFooter]);

  useEffect(() => {
    if (!country) {
      const timer = setTimeout(() => {
        if (!country) setView("error");
      }, 3000);
      return () => clearTimeout(timer);
    }

    const interval = setInterval(() => {
      setLoadingStep((prev) => (prev + 1) % loadingMessages.length);
    }, 1500);

    const progressInterval = setInterval(() => {
      setLoadingProgress((prev) => {
        if (dataLoaded) {
          if (prev >= 100) {
            clearInterval(progressInterval);
            return 100;
          }
          // Fast finish once data is ready
          return Math.min(prev + 5, 100);
        }

        // Slower artificial progress while waiting for initial data
        if (prev >= 40) return prev; // Wait for manual updates from fetchContent
        return prev + 0.5;
      });
    }, 100);

    return () => {
      clearInterval(interval);
      clearInterval(progressInterval);
    };
  }, [country, dataLoaded]);

  useEffect(() => {
    if (!country) return;

    const fetchContent = async () => {
      // Global Safety Timeout: If data isn't ready in 8 seconds, force a fail-safe state
      const globalTimeout = setTimeout(() => {
        if (!dataLoaded) {
          console.warn(
            "[Expedition] Tour data fetch timed out. Forcing available state.",
          );
          setDataLoaded(true);
          setLoadingProgress(100);
        }
      }, 8000);

      try {
        // Load capital image from static map
        getStaticImages().then((images) => {
          if (images[country.name]) setCapitalImage(images[country.name]);
        });

        const data = await getCountryTour(country.name);

        if (data) {
          const shuffledStops = data.stops.map((stop) => ({
            ...stop,
            options: [...stop.options].sort(() => Math.random() - 0.5),
          }));
          const shuffledData = { ...data, stops: shuffledStops };

          setTourData(shuffledData);

          // Step 1: Get intro image
          const introImg = await getGeneratedImage(country.name, "landscape");
          setIntroImage(introImg);
          setLoadingProgress(60);

          // Step 2: Preload ALL stop images during the loading screen
          const stopImgs = await Promise.all(
            shuffledData.stops.map((stop) =>
              getGeneratedImage(stop.imageKeyword || stop.stopName, "landmark"),
            ),
          );
          const newStopImages: Record<number, string | null> = {};
          stopImgs.forEach((img, i) => {
            newStopImages[i] = img;
          });
          setStopImages(newStopImages);
          setLoadingProgress(95);

          // Mark data as loaded — everything is ready
          clearTimeout(globalTimeout);
          setDataLoaded(true);
          setLoadingProgress(100);
        } else {
          clearTimeout(globalTimeout);
          console.error("[Expedition] No tour data returned");
          setView("error");
        }
      } catch (e) {
        clearTimeout(globalTimeout);
        console.error("[Expedition] Error loading tour content", e);
        setView("error");
      }
    };

    fetchContent();
  }, [country]);

  // Handle transition once progress is 100%
  useEffect(() => {
    if (loadingProgress >= 100 && dataLoaded) {
      const timer = setTimeout(() => {
        setLoading(false);
        setView("intro");
      }, 800); // Give user a moment to see the 100%
      return () => clearTimeout(timer);
    }
  }, [loadingProgress, dataLoaded]);

  useEffect(() => {
    const handleWindowScroll = () => {
      if (view === "tour") {
        setScrollY(window.scrollY);
      }
    };
    window.addEventListener("scroll", handleWindowScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleWindowScroll);
  }, [view]);

  const startTour = () => {
    setTransitionDirection("forward");
    setForwardTransitionText("Starting Tour");
    setIsTransitioning(true);
    setContentVisible(false);

    // Delay view switch to middle of transition wipe (750ms into 1.4s)
    setTimeout(() => {
      setView("tour");
      setStepIndex(0);
      setScrollY(0);
      window.scrollTo({ top: 0, behavior: "instant" });

      // Smoothly fade in content AFTER DOM update
      setTimeout(() => {
        setContentVisible(true);
      }, 100);
    }, 750);

    setTimeout(() => {
      setIsTransitioning(false);
    }, 1600);
  };

  const nextStop = () => {
    if (!tourData || isTransitioning) return;
    setTransitionDirection("forward");
    // Set appropriate transition text based on whether this is the last stop
    if (stepIndex >= tourData.stops.length - 1) {
      setForwardTransitionText("Preparing Files");
    } else {
      setForwardTransitionText(
        `Next Stop: ${tourData.stops[stepIndex + 1].stopName}`,
      );
    }
    setIsTransitioning(true);
    setContentVisible(false);

    if (stepIndex < tourData.stops.length - 1) {
      setTimeout(() => {
        setStepIndex((prev) => prev + 1);
        setScrollY(0);
        window.scrollTo({ top: 0, behavior: "instant" });

        // Smoothly fade in content AFTER DOM update
        setTimeout(() => {
          setContentVisible(true);
        }, 100);
      }, 750);
    } else {
      setTimeout(() => {
        setView("quiz");
        setStepIndex(0);
        setScore(0);
        setQuizResults({});
        setSelectedOption(null);
        setIsCorrect(null);
        setFeedbackMessage(null);
        window.scrollTo({ top: 0, behavior: "instant" });

        // Smoothly fade in content AFTER DOM update
        setTimeout(() => {
          setContentVisible(true);
        }, 100);
      }, 750);
    }

    setTimeout(() => {
      setIsTransitioning(false);
    }, 1600);
  };

  const prevStop = () => {
    if (isTransitioning) return;
    setTransitionDirection("backward");
    // Set the back destination text
    if (stepIndex > 0) {
      setBackDestinationText(
        `Back to ${tourData.stops[stepIndex - 1].stopName}`,
      );
    } else {
      setBackDestinationText("Back to Menu");
    }
    setIsTransitioning(true);
    setContentVisible(false);
    setTimeout(() => {
      if (stepIndex > 0) {
        setStepIndex((prev) => prev - 1);
      } else {
        setView("intro");
      }
      setScrollY(0);
      window.scrollTo({ top: 0, behavior: "instant" });

      // Smoothly fade in content AFTER DOM update
      setTimeout(() => {
        setContentVisible(true);
      }, 100);
    }, 750);
    setTimeout(() => {
      setIsTransitioning(false);
    }, 1600);
  };

  const handleQuizAnswer = (option: string) => {
    if (selectedOption || !tourData) return;

    setSelectedOption(option);
    const currentQuestion = tourData.stops[stepIndex];
    const correct = option === currentQuestion.answer;

    setIsCorrect(correct);
    setFeedbackKey((prev) => prev + 1);
    setQuizResults((prev) => ({ ...prev, [stepIndex]: correct }));

    if (correct) {
      setScore((s) => s + 1);
      setFeedbackMessage(
        currentQuestion.explanation
          ? currentQuestion.explanation
          : "Great job.",
      );
    } else {
      setFeedbackMessage(
        currentQuestion.explanation
          ? currentQuestion.explanation
          : `The correct answer is ${currentQuestion.answer}.`,
      );
    }
  };

  const [isExitingFeedback, setIsExitingFeedback] = useState(false);

  // Lock body scroll when feedback panel is visible
  useEffect(() => {
    if (selectedOption) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedOption]);

  const nextQuestion = () => {
    if (!tourData || isExitingFeedback) return;

    // Start the exit animation for the feedback panel
    setIsExitingFeedback(true);

    // After the panel slides out, transition the content
    setTimeout(() => {
      setSelectedOption(null);
      setIsCorrect(null);
      setIsExitingFeedback(false);

      if (stepIndex < tourData.stops.length - 1) {
        setContentVisible(false);

        // Small delay to let the old content fade, then swap
        setTimeout(() => {
          setStepIndex((prev) => prev + 1);
          window.scrollTo({ top: 0, behavior: "instant" });
          // Fade in the new content
          setTimeout(() => setContentVisible(true), 50);
        }, 300);
      } else {
        setTransitionDirection("forward");
        setIsTransitioning(true);
        setContentVisible(false);

        // Delay view switch to ensure wipe is covering the screen (750ms into 1.4s)
        setTimeout(() => {
          setView("summary");
          window.scrollTo({ top: 0, behavior: "instant" });

          // Smoothly fade in content AFTER DOM update
          setTimeout(() => {
            setContentVisible(true);
          }, 100);
        }, 750);

        setTimeout(() => {
          setIsTransitioning(false);
        }, 1600);
      }
    }, 400); // Wait for feedback panel slide-out animation
  };

  const restartTour = () => {
    setTransitionDirection("forward");
    setIsTransitioning(true);
    setContentVisible(false);

    // Delay view switch to middle of transition wipe (750ms into 1.4s)
    setTimeout(() => {
      setView("intro");
      setScore(0);
      setQuizResults({});
      setIsCorrect(null);
      setFeedbackKey(0);
      setScrollY(0);
      window.scrollTo({ top: 0, behavior: "instant" });

      // Smoothly fade in content AFTER DOM update
      setTimeout(() => {
        setContentVisible(true);
      }, 100);
    }, 750);

    setTimeout(() => {
      setIsTransitioning(false);
    }, 1600);
  };

  const scrollCarousel = (direction: "left" | "right") => {
    if (!carouselRef.current) return;
    const container = carouselRef.current;
    const firstCard = container.querySelector(
      ".carousel-card",
    ) as HTMLElement | null;
    if (!firstCard) return;
    // Measure actual card width + gap from the DOM
    const style = window.getComputedStyle(container);
    const gap = parseFloat(style.gap) || 12;
    const cardWidth = firstCard.offsetWidth + gap;

    // Scroll exactly one card in the given direction
    const targetScroll =
      container.scrollLeft + (direction === "left" ? -cardWidth : cardWidth);
    container.scrollTo({ left: targetScroll, behavior: "smooth" });
  };

  // Carousel 3D Effect Logic with Infinite Loop
  useEffect(() => {
    if (view !== "summary" || !carouselRef.current || !tourData) return;

    const container = carouselRef.current;
    let rafId: number;
    const numCards = tourData.stops.length;
    const cardWidth = window.innerWidth >= 768 ? 156 : 124; // card width + gap
    const singleSetWidth = numCards * cardWidth;

    // Set initial scroll to the middle set of cards
    container.scrollLeft = singleSetWidth;

    const updateCardStyles = () => {
      const cards = container.querySelectorAll(".carousel-card");
      const containerRect = container.getBoundingClientRect();
      const containerCenterAbs = containerRect.left + containerRect.width / 2;

      cards.forEach((card: any) => {
        const cardRect = card.getBoundingClientRect();
        const cardCenter = cardRect.left + cardRect.width / 2;

        const distanceFromCenter = cardCenter - containerCenterAbs;
        const normalizedDistance =
          distanceFromCenter / (containerRect.width / 2);

        const rotation = normalizedDistance * -25;
        const scale = 1 - Math.min(0.25, Math.abs(normalizedDistance) * 0.35);
        const zIndex = Math.floor(100 - Math.abs(normalizedDistance) * 50);
        const opacity = 1 - Math.min(0.6, Math.abs(normalizedDistance) * 0.9);
        const translateX = normalizedDistance * -30;

        card.style.transform = `perspective(1000px) rotateY(${rotation}deg) scale(${scale}) translateX(${translateX}px)`;
        card.style.zIndex = zIndex;
        card.style.opacity = Math.max(0.4, opacity);
      });
    };

    const handleScroll = () => {
      // Infinite loop logic: jump to equivalent position when reaching edges
      const scrollLeft = container.scrollLeft;

      if (scrollLeft < singleSetWidth * 0.5) {
        // Scrolled too far left, jump to middle set
        container.scrollLeft = scrollLeft + singleSetWidth;
      } else if (scrollLeft > singleSetWidth * 1.5) {
        // Scrolled too far right, jump to middle set
        container.scrollLeft = scrollLeft - singleSetWidth;
      }

      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(updateCardStyles);
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    // Initial sync with a slight delay to ensure layout is ready
    const timer = setTimeout(updateCardStyles, 50);

    return () => {
      container.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(rafId);
      clearTimeout(timer);
    };
  }, [view, tourData]);

  if (!country)
    return (
      <div className="p-10 text-center text-text font-black uppercase tracking-widest">
        Country not found.
      </div>
    );

  const renderContent = () => {
    try {
      if (view === "loading" || loading) {
        return (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Container className="flex items-center justify-center px-4 md:px-6 pt-28 pb-12 overflow-hidden bg-surface relative">
              <SEO
                title="Loading Expedition"
                description="Preparing your geography expedition. Explore countries through guided tours and interactive quizzes."
              />

              {/* Dynamic Tech Grid Background */}
              <div
                className="absolute inset-0 z-0 opacity-20"
                style={{
                  backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.05) 1px, transparent 0)`,
                  backgroundSize: "40px 40px",
                }}
              />

              {/* Scanning Line Effect */}
              <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden opacity-30">
                <div className="w-full h-[2px] bg-sky-light/50 blur-sm absolute top-0 left-0 animate-scan-line" />
              </div>

              {/* Immersive Aurora Background */}
              <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-20%] left-[-10%] w-[120%] h-[120%] bg-accent-soft rounded-full blur-3xl opacity-80" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[100%] h-[100%] bg-accent/10 rounded-full blur-3xl opacity-60" />
                <div className="absolute top-[30%] left-[20%] w-[40%] h-[40%] bg-surface rounded-full blur-3xl" />
              </div>

              <div className="relative z-10 w-full max-w-lg flex flex-col items-center">
                {/* Main Loading Console */}
                <div className="w-full bg-elevated rounded-2xl p-8 md:p-12 text-center border border-border shadow-premium relative overflow-hidden">
                  {/* Internal Glass Sheen */}
                                    
                  {/* Corner Brackets */}
                  <div className="absolute top-6 left-6 w-10 h-10 border-t-2 border-l-2 border-primary/30 rounded-tl-2xl" />
                  <div className="absolute top-6 right-6 w-10 h-10 border-t-2 border-r-2 border-primary/30 rounded-tr-2xl" />
                  <div className="absolute bottom-6 left-6 w-10 h-10 border-b-2 border-l-2 border-primary/30 rounded-bl-2xl" />
                  <div className="absolute bottom-6 right-6 w-10 h-10 border-b-2 border-r-2 border-primary/30 rounded-tr-2xl" />

                  <div className="mb-8 relative pt-4">
                    {/* Holographic Projection Base */}
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-48 h-4 bg-accent-soft blur-2xl rounded-full animate-pulse" />

                    {/* Flag Display with Orbitals */}
                    <div className="relative z-10 w-44 h-auto mx-auto mb-6 transform-gpu perspective-1000">
                      <div className="relative animate-float-slow">
                        <img
                          src={getFlagUrl(country.flag)}
                          alt={`${country.name} Flag`}
                          className="w-full h-auto object-contain relative z-10"
                        />
                      </div>

                      {/* Rotating Orbital Rings */}
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 border border-primary/10 rounded-full animate-spin-slow opacity-20" />
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 border border-dashed border-border rounded-full animate-reverse-spin opacity-20" />
                    </div>
                  </div>

                  <div className="space-y-4 mb-10">
                    <div className="inline-flex items-center gap-3 px-5 py-2 bg-accent-soft rounded-full border border-border mb-2 shadow-inner group">
                      <div className="w-2 h-2 rounded-full bg-primary animate-ping" />
                      <span className="text-[10px] font-black text-primary uppercase tracking-[0.5em]">
                        {loadingProgress < 100
                          ? "Establishing Link"
                          : "Connection Secured"}
                      </span>
                    </div>

                    <div className="flex flex-col items-center">
                      <span className="text-[10px] text-muted tracking-[0.4em] uppercase mb-1 font-black">
                        Destination
                      </span>
                      <h1 className="text-3xl md:text-5xl font-display font-black text-text tracking-tighter uppercase leading-tight">
                        {country.name}
                      </h1>
                    </div>
                  </div>

                  {/* Progress Section */}
                  <div className="relative w-full mb-10 px-4">
                    {/* Label & Percentage */}
                    <div className="flex justify-between items-end mb-3 px-1">
                      <div className="flex flex-col items-start">
                        <span className="text-[9px] font-black text-muted uppercase tracking-widest">
                          Loading
                        </span>
                        <div className="h-0.5 w-8 bg-primary/40 rounded-full mt-1" />
                      </div>
                      <div className="flex items-baseline gap-1">
                        <span className="text-2xl font-display font-black text-text tabular-nums">
                          {Math.round(loadingProgress)}
                        </span>
                        <span className="text-[10px] font-black text-primary tracking-widest">
                          %
                        </span>
                      </div>
                    </div>

                    {/* Loading Bar Container */}
                    <div className="w-full h-3 bg-surface rounded-full overflow-hidden border border-border shadow-inner p-0.5 relative group">
                      <div
                        className="h-full bg-gradient-to-r from-primary via-primary to-primary transition-all duration-300 ease-out rounded-full relative"
                        style={{ width: `${loadingProgress}%` }}
                      >
                        {/* Animated Shimmer Overlap */}
                        <div className="absolute inset-0 w-full h-full animate-shimmer bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.6),transparent)] bg-[length:200%_100%]" />

                        {/* Leading Glow Point */}
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-elevated rounded-full opacity-90" />
                      </div>
                    </div>

                    {/* Status Dots */}
                    <div className="flex gap-1.5 mt-4 justify-center">
                      {[...Array(8)].map((_, i) => (
                        <div
                          key={i}
                          className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${
                            loadingProgress > i * 12.5
                              ? "bg-primary"
                              : "bg-surface border border-border"
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Animated Loading Messages */}
                  <div className="flex flex-col items-center justify-center h-8 relative">
                    <div className="flex items-center gap-4 text-muted">
                      <div className="w-8 h-[1px] bg-gradient-to-r from-transparent to-primary/40" />
                      <p
                        key={loadingStep}
                        className="text-[10px] font-black uppercase tracking-[0.4em] animate-in slide-in-from-bottom-2 fade-in duration-500 text-primary/80"
                      >
                        {loadingMessages[loadingStep]}
                      </p>
                      <div className="w-8 h-[1px] bg-gradient-to-l from-transparent to-primary/40" />
                    </div>
                  </div>
                </div>

                {/* Terminal Style Data Readouts */}
                <div className="mt-10 grid grid-cols-3 gap-12 w-full px-6 opacity-30">
                  <div className="flex flex-col items-start gap-1">
                    <span className="text-[8px] font-black text-muted uppercase tracking-widest">
                      Coordinates
                    </span>
                    <span className="text-[9px] font-black text-text tabular-nums">
                      {country.lat.toFixed(4)}N {country.lng.toFixed(4)}E
                    </span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <span className="text-[8px] font-black text-muted uppercase tracking-widest">
                      Protocol
                    </span>
                    <span className="text-[9px] font-black text-primary tracking-tighter">
                      SECURE-UPLINK-v4
                    </span>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span className="text-[8px] font-black text-muted uppercase tracking-widest">
                      Archive Status
                    </span>
                    <span className="text-[9px] font-black text-text tracking-widest">
                      {loadingProgress < 100 ? "BUFFERING" : "READY"}
                    </span>
                  </div>
                </div>
              </div>
            </Container>
          </motion.div>
        );
      }

      if (view === "error" || !tourData) {
        return (
          <Container className="flex items-center justify-center pt-24 pb-12 px-4 md:px-6 bg-surface">
            <div className="flex-1 flex flex-col items-center justify-center text-center max-w-sm">
              <div className="w-20 h-20 bg-red-500/20 rounded-[2rem] flex items-center justify-center mb-8 text-red-500 border border-error/30">
                <AlertCircle size={40} />
              </div>
              <h2 className="text-2xl font-display font-black mb-4 text-text uppercase tracking-tighter">
                Connection Issue
              </h2>
              <p className="text-muted mb-10 leading-relaxed font-bold uppercase tracking-widest text-[10px]">
                We couldn't retrieve the expedition data from the archive.
              </p>
              <Button
                onClick={() => navigate(`/country/${toSlug(country.name)}`)}
                variant="primary"
                className="w-full max-w-[360px] py-5 text-xl uppercase tracking-[0.15em] font-black flex items-center justify-center shadow-premium"
              >
                RETURN TO COUNTRY
              </Button>
            </div>
          </Container>
        );
      }

      if (view === "intro") {
        return (
          <Container
            className="w-full min-h-[100dvh] bg-surface flex flex-col items-center justify-center pt-14 pb-8 px-3 sm:px-4 md:px-6 relative overflow-hidden"
            transparent
          >
            <SEO
              title={`${country.name} Virtual Tour`}
              description={`Take a virtual tour of ${country.name}. Discover landmarks, culture, and geography through an interactive expedition with quizzes.`}
              image={introImage || undefined}
              imageAlt={`Scenery of ${country.name}`}
            />

            {/* Immersive Aurora Background */}
            <div className="fixed inset-0 z-0 pointer-events-none">
              <div className="absolute top-[-20%] left-[-10%] w-[120%] h-[120%] bg-accent-soft rounded-full blur-3xl opacity-80" />
              <div className="absolute bottom-[-10%] right-[-10%] w-[100%] h-[100%] bg-accent/10 rounded-full blur-3xl opacity-60" />
            </div>

            <div
              className={`relative z-10 w-full max-w-6xl flex flex-col items-center transition-all duration-500 px-4 sm:px-6 ${!contentVisible ? "opacity-0 scale-95 blur-sm" : "opacity-100 scale-100 blur-0"}`}
            >
              <Breadcrumbs
                items={[
                  { label: "Home", href: "/" },
                  { label: "Database", href: "/database" },
                  {
                    label: country.name,
                    href: `/country/${toSlug(country.name)}`,
                  },
                  { label: "Expedition" },
                ]}
              />
              <div className="flex flex-col items-center gap-5">
                {/* 1. Hero Text — Centered */}
                <div className="flex flex-col items-center text-center space-y-4 max-w-xl">
                  <div className="inline-flex items-center gap-2.5 px-5 py-2 bg-accent-soft rounded-full border border-border text-[10px] font-black tracking-[0.5em] text-text relative overflow-hidden">
                                        <Compass size={14} className="text-primary relative z-10" />
                    <span className="relative z-10 uppercase">
                      Virtual Tour
                    </span>
                  </div>
                  <h2 className="text-4xl sm:text-5xl font-display font-black text-text leading-[0.9] uppercase tracking-tighter">
                    {tourData.tourTitle}
                  </h2>
                  <p className="text-sm text-muted font-bold italic leading-relaxed max-w-sm">
                    {tourData.introText}
                  </p>
                </div>

                {/* 2. Hero Image — Centered PhotoPrint TV */}
                <div className="w-full max-w-[400px]">
                  <PhotoPrint
                    src={introImage}
                    alt={country.name}
                    imageKeyword={country.name}
                    caption={`${country.capital}, ${country.name}`}
                    region={country.region}
                    rotation="rotate-0"
                    className="w-full"
                  />
                </div>

                {/* Actions */}
                <div className="w-full max-w-2xl pt-2 sm:pt-3 pb-5 flex flex-col items-center gap-3">
                  <div className="flex flex-col items-center gap-3 w-full">
                    <Button
                      onClick={startTour}
                      variant="primary"
                      className="w-full max-w-[360px] py-5 text-xl uppercase tracking-[0.15em] font-black flex items-center justify-center mx-auto shadow-premium active:scale-95 transition-all duration-300 group/btn"
                    >
                      START{" "}
                      <Play className="ml-3 fill-current group-hover/btn:translate-x-1 transition-transform" />
                    </Button>

                    <button
                      onClick={() =>
                        navigate(`/country/${toSlug(country.name)}`)
                      }
                      className="text-[11px] font-black uppercase tracking-[0.3em] text-muted hover:text-primary transition-colors py-1.5 px-3"
                    >
                      GO BACK
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        );
      }

      if (view === "tour") {
        const currentStop = tourData.stops[stepIndex];
        const isLastStop = stepIndex === tourData.stops.length - 1;
        const currentImage = stopImages[stepIndex];

        return (
          <Container className="w-full min-h-screen bg-surface flex flex-col items-center overflow-x-hidden">
            {/* Immersive Parallax Background Layer */}
            <div className="fixed inset-0 w-full h-full -z-10 overflow-hidden bg-surface">
              <div
                className="absolute inset-0 transition-transform duration-1000 ease-out scale-110"
                style={{
                  transform: `translateY(${scrollY * 0.2}px) scale(${1.1 + scrollY * 0.0001})`,
                }}
              >
                <ExpeditionVisual
                  src={currentImage}
                  alt={currentStop.stopName}
                  className="object-cover w-full h-full opacity-60 contrast-[1.1] brightness-[0.8]"
                />
              </div>

              {/* Cinematic Vignette & Gradients */}
              <div className="absolute inset-0 bg-gradient-to-b from-surface-dark/40 via-transparent to-surface-dark" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)]" />

              {/* Dynamic Atmospheric Glows */}
              <div className="absolute top-[-10%] left-[-10%] w-[70%] h-[70%] bg-accent-soft rounded-full blur-3xl" />
              <div className="absolute bottom-[-5%] right-[-5%] w-[60%] h-[60%] bg-accent/5 rounded-full blur-3xl" />
            </div>

            {/* Navigation Controls */}
            <div className="sticky top-24 z-50 w-full px-4 sm:px-6 flex justify-center items-center pointer-events-none">
              <div className="flex items-center gap-2 sm:gap-3 pointer-events-auto animate-in slide-in-from-top-4 duration-700 max-w-full">
                {/* Prev Arrow */}
                <button
                  onClick={prevStop}
                  disabled={stepIndex === 0}
                  aria-label="Previous stop"
                  className="shrink-0 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-elevated hover:bg-surface border border-border shadow-premium flex items-center justify-center text-text transition-colors disabled:opacity-30 disabled:cursor-not-allowed shadow-lg"
                >
                  <ChevronLeft size={18} strokeWidth={2.5} />
                </button>

                {/* Progress Header */}
                <div className="bg-elevated border border-border shadow-premium rounded-full px-3 sm:px-6 py-2 flex items-center gap-2 sm:gap-4 max-w-full overflow-hidden">
                  <div className="w-2 h-2 rounded-full bg-primary animate-pulse shrink-0" />
                  <span className="text-[9px] sm:text-[10px] font-black text-text uppercase tracking-[0.2em] sm:tracking-[0.4em] shrink-0">
                    STOP {stepIndex + 1} OF {tourData.stops.length}
                  </span>
                  <div className="h-4 w-[1px] bg-accent-soft shrink-0" />
                  <span className="text-[9px] sm:text-[10px] font-black text-primary uppercase tracking-[0.1em] sm:tracking-[0.2em] truncate">
                    {currentStop.stopName}
                  </span>
                </div>

                {/* Next Arrow */}
                <button
                  onClick={nextStop}
                  disabled={stepIndex >= tourData.stops.length - 1}
                  aria-label="Next stop"
                  className="shrink-0 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-elevated hover:bg-surface border border-border shadow-premium flex items-center justify-center text-text transition-colors disabled:opacity-30 disabled:cursor-not-allowed shadow-lg"
                >
                  <ChevronRight size={18} strokeWidth={2.5} />
                </button>
              </div>
            </div>

            {/* Narrative Content Scroll */}
            <div
              key={stepIndex}
              className={`relative z-10 w-full max-w-6xl px-4 sm:px-6 md:px-8 pt-[110px] pb-12 flex flex-col items-center justify-center min-h-screen transition-all duration-500 ${!contentVisible ? "opacity-0 scale-95 blur-sm" : "opacity-100 scale-100 blur-0"}`}
            >
              <div className="flex flex-col gap-6 sm:gap-8 lg:gap-10 items-center w-full max-w-3xl mx-auto">
                {/* Section 1: The Visual Encounter (always on top) */}
                <section className="w-full flex flex-col items-center animate-in fade-in slide-in-from-top-8 duration-1000 overflow-hidden">
                  <div className="relative group w-full max-w-full">
                    <PhotoPrint
                      src={currentImage}
                      alt={currentStop.stopName}
                      imageKeyword={
                        currentStop.imageKeyword || currentStop.stopName
                      }
                      caption={`${currentStop.stopName}, ${country.name}`}
                      region="Active Stop"
                      rotation="rotate-0"
                      className="w-full"
                    />
                  </div>
                </section>

                {/* Section 2: Text Content (always below) */}
                <section className="w-full animate-in fade-in slide-in-from-bottom-8 duration-1000 overflow-hidden">
                  <div className="space-y-4 sm:space-y-5">
                    <div className="text-left">
                      <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-display font-black text-text leading-none uppercase tracking-tighter mb-4 sm:mb-5">
                        {currentStop.stopName}
                      </h2>
                    </div>

                    <div className="space-y-3 sm:space-y-4 text-left">
                      <p className="text-base sm:text-lg md:text-xl font-display font-black text-text leading-snug tracking-tight opacity-95">
                        {currentStop.description[0]}
                      </p>
                      <div className="w-12 h-1 bg-primary/40 rounded-full" />
                      <p className="text-sm md:text-base text-muted leading-relaxed font-bold">
                        {currentStop.description[1]}
                      </p>
                    </div>

                    {/* Navigation Controls */}
                    <div className="flex items-center gap-3 pt-1 justify-center">
                      <button
                        onClick={prevStop}
                        className="group/prev h-11 px-5 rounded-full bg-elevated border border-border shadow-premium flex items-center gap-2 hover:bg-surface hover:border-primary/30 transition-all duration-300"
                      >
                        <ChevronLeft
                          size={15}
                          className="text-text transition-all group-hover/prev:-translate-x-0.5"
                        />
                        <span className="text-[10.5px] font-black uppercase tracking-[0.15em] text-text">
                          Back
                        </span>
                      </button>

                      <button
                        onClick={nextStop}
                        className={`group/next h-11 px-5 rounded-full border flex items-center gap-2 transition-all duration-300 ${
                          isLastStop
                            ? "bg-accent/70 border-primary/80 hover:bg-accent/80 hover:border-accent"
                            : "bg-primary/70 border-primary/80 hover:bg-primary/80 hover:border-primary"
                        }`}
                      >
                        <span className="text-[10.5px] font-black uppercase tracking-[0.15em] text-text">
                          {isLastStop ? "Start Quiz" : "Next"}
                        </span>
                        <ChevronRight
                          size={15}
                          className="text-text transition-all group-hover/next:translate-x-0.5"
                        />
                      </button>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </Container>
        );
      }

      if (view === "quiz") {
        const currentQuestion = tourData.stops[stepIndex];
        const isLastQuestion = stepIndex === tourData.stops.length - 1;
        const currentImage = stopImages[stepIndex];

        return (
          <>
            <Container className="w-full min-h-screen bg-surface flex flex-col items-center pt-20 md:pt-24 px-3 sm:px-4 md:px-6 pb-12 md:pb-16 relative overflow-x-hidden">
              <SEO
                title={`${country.name} Quiz - Expedition`}
                description={`Test your knowledge about ${country.name}. Answer questions about landmarks, culture, and geography.`}
              />

              {/* Immersive Aurora Background */}
              <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-[10%] right-[10%] w-[70%] h-[70%] bg-accent-soft rounded-full blur-3xl opacity-80" />
                <div className="absolute bottom-[10%] left-[10%] w-[60%] h-[60%] bg-accent/5 rounded-full blur-3xl opacity-60" />
                <div className="absolute top-[30%] left-[20%] w-[40%] h-[40%] bg-surface rounded-full blur-3xl" />
              </div>

              <div
                key={stepIndex}
                className={`flex-1 flex flex-col max-w-5xl mx-auto w-full min-h-0 py-2 relative z-10 transition-all duration-500 ${!contentVisible ? "opacity-0 scale-95 blur-sm" : "opacity-100 scale-100 blur-0"} justify-center`}
              >
                {/* Progress Header */}
                <div className="text-center mb-3 md:mb-4 shrink-0">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-accent-soft rounded-full border border-border mb-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                    <h2 className="text-[10px] sm:text-[11px] md:text-[13px] font-black text-text uppercase tracking-[0.4em]">
                      Knowledge Check
                    </h2>
                  </div>
                  <div className="w-36 md:w-48 h-1 bg-accent-soft mx-auto relative rounded-full overflow-hidden shadow-inner border border-border">
                    <div
                      className="absolute h-full bg-gradient-to-r from-primary to-primary-light transition-all duration-1000 ease-out"
                      style={{
                        width: `${((stepIndex + 1) / tourData.stops.length) * 100}%`,
                      }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-10 items-center flex-1 min-h-0">
                  {/* Left: Physical Photo */}
                  <div className="lg:col-span-5 flex flex-col justify-center">
                    <PhotoPrint
                      src={currentImage}
                      alt={currentQuestion.stopName}
                      imageKeyword={
                        currentQuestion.imageKeyword || currentQuestion.stopName
                      }
                      caption={currentQuestion.stopName}
                      region="Stop Detail"
                      rotation="rotate-0"
                      className="max-w-[180px] sm:max-w-[220px] md:max-w-[300px] lg:max-w-none mx-auto"
                    />
                  </div>

                  {/* Right: Glassy Quiz Panel */}
                  <div className="lg:col-span-7 flex flex-col h-full justify-center overflow-hidden">
                    <div className="bg-elevated p-4 sm:p-5 md:p-8 rounded-2xl border border-border shadow-premium flex flex-col relative overflow-hidden group">
                                            
                      <div className="flex flex-col justify-center gap-4 sm:gap-5 md:gap-8 relative z-10">
                        <h3 className="text-base sm:text-lg md:text-2xl font-display font-black text-text leading-tight tracking-tighter  uppercase text-center border-b border-border pb-4 sm:pb-5 md:pb-6">
                          {currentQuestion.question}
                        </h3>

                        <div className="grid grid-cols-1 gap-2.5 w-full">
                          {currentQuestion.options.map((option, idx) => {
                            const isSelected = selectedOption === option;

                            let stateStyles =
                              "bg-surface border border-border text-muted active:bg-elevated active:border-primary/40 active:text-text";

                            if (isSelected) {
                              if (isCorrect) {
                                stateStyles =
                                  "feedback-correct border ";
                              } else {
                                stateStyles =
                                  "feedback-incorrect border ";
                              }
                            } else if (
                              selectedOption &&
                              option === currentQuestion.answer
                            ) {
                              stateStyles =
                                "feedback-correct border-2 ";
                            } else if (selectedOption) {
                              stateStyles =
                                "opacity-20 grayscale border-2 border-border bg-transparent scale-95 blur-[2px]";
                            }

                            return (
                              <button
                                key={idx}
                                onClick={() => handleQuizAnswer(option)}
                                disabled={!!selectedOption}
                                className={`w-full text-left px-4 sm:px-5 md:px-6 py-3.5 sm:py-4 md:py-5 rounded-xl md:rounded-2xl border transition-all duration-500 font-black text-xs sm:text-sm md:text-base flex justify-between items-center relative overflow-hidden group/opt ${stateStyles} ${isSelected && !isCorrect ? "animate-shake" : ""}`}
                                style={{
                                  WebkitTapHighlightColor: "transparent",
                                }}
                              >
                                                                <span className="leading-snug pr-2 sm:pr-4 relative z-10 uppercase tracking-tight">
                                  {option}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Container>

            {/* Feedback Overlay — portaled to body, covers everything */}
            {createPortal(
              <AnimatePresence>
                {selectedOption && (
                  <motion.div
                    key="feedback-overlay"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="fixed inset-0 z-[9999] flex flex-col"
                    style={{ pointerEvents: "auto" }}
                  >
                    {/* Dark backdrop — fills everything, blocks all interaction */}
                    <div className="absolute inset-0 bg-text/30" />

                    {/* Spacer pushes panel to bottom */}
                    <div className="flex-1" />

                    {/* Bottom Panel */}
                    <motion.div
                      key="feedback-panel"
                      initial={{ y: "100%" }}
                      animate={{ y: isExitingFeedback ? "100%" : 0 }}
                      exit={{ y: "100%" }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      className="relative bg-elevated overflow-hidden border-t border-border shadow-premium"
                    >
                      {/* Internal Aero Gloss */}
                                            
                      <div className="max-w-7xl mx-auto w-full p-10 md:p-16 flex flex-col items-center gap-10 relative z-10">
                        <div className="w-full text-center">
                          <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                              delay: 0.12,
                              duration: 0.45,
                              ease: [0.22, 1, 0.36, 1],
                            }}
                            className="space-y-6"
                          >
                            <div className="flex items-center justify-center gap-6">
                              <div
                                className={`w-16 h-16 rounded-2xl flex items-center justify-center border border-border relative overflow-hidden ${isCorrect ? "bg-accent/60 text-text" : "bg-red-500/60 text-text"}`}
                              >
                                                                {isCorrect ? (
                                  <Trophy size={32} className="relative z-10" />
                                ) : (
                                  <ImageOff
                                    size={32}
                                    className="relative z-10"
                                  />
                                )}
                              </div>
                              <div className="text-left">
                                <h3 className="font-display font-black text-4xl md:text-5xl uppercase tracking-tighter text-text leading-none mb-1">
                                  {isCorrect ? "Correct" : "Incorrect"}
                                </h3>
                                <p
                                  className={`text-[10px] font-black uppercase tracking-[0.4em] ${isCorrect ? "text-accent" : "text-red-400"}`}
                                >
                                  Mission Explanation
                                </p>
                              </div>
                            </div>
                            <p className="text-base md:text-lg text-muted font-bold leading-relaxed max-w-3xl mx-auto border-l-4 border-border pl-8 text-left select-text">
                              {!isCorrect && currentQuestion && (
                                <>
                                  <span className="text-text font-black">
                                    {currentQuestion.answer}
                                  </span>
                                  {" — "}
                                </>
                              )}
                              {feedbackMessage || ""}
                            </p>
                          </motion.div>
                        </div>
                        <motion.div
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{
                            delay: 0.2,
                            duration: 0.35,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                          className="w-full flex justify-center"
                        >
                          <Button
                            onClick={nextQuestion}
                            disabled={!selectedOption || isExitingFeedback}
                            variant="primary"
                            className="w-full max-w-[360px] py-5 text-xl font-black uppercase tracking-[0.15em] shadow-premium active:scale-95 transition-all duration-300 group/btn"
                          >
                            {isLastQuestion ? "FINISH" : "NEXT"}{" "}
                            <ChevronRight
                              size={22}
                              className="ml-2 group-hover/btn:translate-x-1 transition-transform"
                            />
                          </Button>
                        </motion.div>
                      </div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>,
              document.body,
            )}
          </>
        );
      }

      if (view === "summary") {
        const isPerfect = score === tourData.stops.length;
        return (
          <Container
            className="w-full h-[100dvh] bg-surface flex flex-col items-center justify-center pt-16 pb-6 px-3 sm:px-4 md:px-6 relative overflow-hidden"
            transparent
          >
            {/* Capital city background image */}
            <div className="fixed inset-0 z-0 pointer-events-none">
              {capitalImage && (
                <img
                  src={`${import.meta.env.BASE_URL}${capitalImage.replace(/^\//, "")}`}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover"
                />
              )}
              <div className="absolute inset-0 bg-surface/85" />
              <div className="absolute inset-0 bg-gradient-to-t from-surface-dark via-surface-dark/60 to-surface-dark/40" />
            </div>

            <div
              className={`flex items-center justify-center relative z-10 w-full max-w-3xl transition-all duration-700 ${!contentVisible ? "opacity-0 scale-95 blur-sm" : "opacity-100 scale-100 blur-0"}`}
            >
              <div className="bg-elevated rounded-2xl p-4 md:p-6 w-full text-center border border-border shadow-premium relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
                
                <div className="relative z-10">
                  {/* Header Area: Ultra-Compact & Elegant */}
                  <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-4 pb-4 border-b border-border">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center border border-border relative shrink-0 group ${isPerfect ? "bg-accent/30" : "bg-primary/30"}`}
                    >
                                            <Trophy className="w-6 h-6 text-text" />
                    </div>

                    <div className="text-center md:text-left">
                      <h2 className="text-xl md:text-2xl font-display font-black text-text uppercase tracking-tighter leading-tight mb-0.5">
                        Expedition Complete
                      </h2>
                      <div className="flex items-center justify-center md:justify-start gap-3">
                        <span className="text-[8px] font-black text-muted uppercase tracking-[0.4em]">
                          Knowledge Check
                        </span>
                        <div className="h-px w-6 bg-accent-soft" />
                        <p className="text-text font-black uppercase tracking-widest text-xs tabular-nums">
                          <strong className="text-primary">{score}</strong>{" "}
                          <span className="text-muted mx-0.5">/</span>{" "}
                          {tourData.stops.length}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Enhanced Carousel Section */}
                  <div className="mb-4 w-full relative bg-surface rounded-2xl p-2 border border-border group/log overflow-hidden">
                    <div className="flex items-center justify-between mb-2 px-4 pt-2">
                      <div className="flex flex-col items-start">
                        <span className="text-[8px] font-black text-muted uppercase tracking-[0.5em] mb-1">
                          Visual Log Archive
                        </span>
                        <div className="h-0.5 w-8 bg-primary/40 rounded-full" />
                      </div>
                    </div>

                    <div className="relative flex items-center">
                      {/* Left Navigation Button */}
                      <button
                        onClick={() => scrollCarousel("left")}
                        className="absolute left-2 z-50 w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-full hover:scale-110 active:scale-95 transition-all group/btn"
                        style={{
                          background: "rgba(0,0,0,0.3)",
                          boxShadow:
                            "inset 0 1px 0 rgba(255,255,255,0.15), 0 2px 8px rgba(0,0,0,0.2)",
                          border: "1px solid rgba(255,255,255,0.12)",
                          backdropFilter: "blur(40px) saturate(1.8)",
                          WebkitBackdropFilter: "blur(40px) saturate(1.8)",
                        }}
                        aria-label="Scroll Left"
                      >
                        <ChevronLeft
                          size={20}
                          className="text-muted group-hover/btn:text-text transition-colors"
                        />
                      </button>

                      {/* 3D Scroller - Infinite Loop */}
                      <div
                        ref={carouselRef}
                        className="flex gap-3 overflow-x-auto py-4 no-scrollbar cursor-grab active:cursor-grabbing select-none mx-auto px-4"
                        style={{
                          perspective: "1200px",
                          transformStyle: "preserve-3d",
                          scrollbarWidth: "none",
                          msOverflowStyle: "none",
                          scrollSnapType: "x mandatory",
                          maxWidth: "520px",
                        }}
                        onMouseDown={(e) => {
                          const el = carouselRef.current;
                          if (!el) return;
                          el.dataset.isDragging = "true";
                          el.dataset.startX = String(e.clientX);
                          el.dataset.scrollLeft = String(el.scrollLeft);
                          el.dataset.lastX = String(e.clientX);
                          el.dataset.velocity = "0";
                          // Disable snap during drag for smooth dragging
                          el.style.scrollSnapType = "none";
                        }}
                        onMouseMove={(e) => {
                          const el = carouselRef.current;
                          if (!el || el.dataset.isDragging !== "true") return;
                          e.preventDefault();
                          const x = e.clientX;
                          const dx = x - Number(el.dataset.startX);
                          const velocity = x - Number(el.dataset.lastX);
                          el.dataset.lastX = String(x);
                          el.dataset.velocity = String(velocity);
                          el.scrollLeft = Number(el.dataset.scrollLeft) - dx;
                        }}
                        onMouseUp={() => {
                          const el = carouselRef.current;
                          if (!el) return;
                          el.dataset.isDragging = "false";
                          // Re-enable snap and snap to nearest card
                          el.style.scrollSnapType = "x mandatory";
                          const cardWidth =
                            window.innerWidth >= 768 ? 156 : 124;
                          const nearestCard = Math.round(
                            el.scrollLeft / cardWidth,
                          );
                          el.scrollTo({
                            left: nearestCard * cardWidth,
                            behavior: "smooth",
                          });
                        }}
                        onMouseLeave={() => {
                          const el = carouselRef.current;
                          if (!el) return;
                          if (el.dataset.isDragging === "true") {
                            // Re-enable snap and snap to nearest card
                            el.style.scrollSnapType = "x mandatory";
                            const cardWidth =
                              window.innerWidth >= 768 ? 156 : 124;
                            const nearestCard = Math.round(
                              el.scrollLeft / cardWidth,
                            );
                            el.scrollTo({
                              left: nearestCard * cardWidth,
                              behavior: "smooth",
                            });
                          }
                          el.dataset.isDragging = "false";
                        }}
                        onTouchStart={(e) => {
                          const el = carouselRef.current;
                          if (!el) return;
                          el.dataset.isDragging = "true";
                          el.dataset.startX = String(e.touches[0].clientX);
                          el.dataset.scrollLeft = String(el.scrollLeft);
                          el.dataset.lastX = String(e.touches[0].clientX);
                          el.dataset.velocity = "0";
                          // Disable snap during drag for smooth dragging
                          el.style.scrollSnapType = "none";
                        }}
                        onTouchMove={(e) => {
                          const el = carouselRef.current;
                          if (!el || el.dataset.isDragging !== "true") return;
                          const x = e.touches[0].clientX;
                          const dx = x - Number(el.dataset.startX);
                          const velocity = x - Number(el.dataset.lastX);
                          el.dataset.lastX = String(x);
                          el.dataset.velocity = String(velocity);
                          el.scrollLeft = Number(el.dataset.scrollLeft) - dx;
                        }}
                        onTouchEnd={() => {
                          const el = carouselRef.current;
                          if (!el) return;
                          el.dataset.isDragging = "false";
                          // Re-enable snap and snap to nearest card
                          el.style.scrollSnapType = "x mandatory";
                          const cardWidth =
                            window.innerWidth >= 768 ? 156 : 124;
                          const nearestCard = Math.round(
                            el.scrollLeft / cardWidth,
                          );
                          el.scrollTo({
                            left: nearestCard * cardWidth,
                            behavior: "smooth",
                          });
                        }}
                      >
                        {/* Create infinite loop by tripling the cards */}
                        {[
                          ...tourData.stops,
                          ...tourData.stops,
                          ...tourData.stops,
                        ].map((stop, index) => {
                          const realIndex = index % tourData.stops.length;
                          const isCorrectResult = quizResults[realIndex];
                          const image = stopImages[realIndex];

                          return (
                            <div
                              key={index}
                              className="carousel-card flex-shrink-0 w-28 h-44 md:w-36 md:h-52 relative transition-all duration-300 ease-out"
                              style={{
                                transformStyle: "preserve-3d",
                                scrollSnapAlign: "center",
                              }}
                            >
                              <div
                                className={`h-full bg-surface rounded-lg border transition-all duration-300 relative overflow-hidden flex flex-col p-1 group/card 
 ${isCorrectResult ? "border-primary/30" : "border-error/30"}
 `}
                              >
                                
                                <div className="w-full aspect-[4/5] rounded-md overflow-hidden relative bg-surface border border-border mb-1.5">
                                  <ExpeditionVisual
                                    src={image}
                                    alt={stop.stopName}
                                    className={`w-full h-full object-cover transition-all duration-500 pointer-events-none ${isCorrectResult ? "" : "grayscale brightness-50 opacity-40"}`}
                                    draggable={false}
                                  />

                                  {/* Status Badge */}
                                  <div className="absolute top-1.5 right-1.5 z-10">
                                    {isCorrectResult ? (
                                      <div className="w-5 h-5 rounded-md bg-primary flex items-center justify-center text-text border border-border">
                                        <Trophy size={10} />
                                      </div>
                                    ) : (
                                      <div className="w-5 h-5 rounded-md bg-error flex items-center justify-center text-text border border-border">
                                        <X size={10} />
                                      </div>
                                    )}
                                  </div>

                                  <div className="absolute inset-0 bg-gradient-to-tr from-text/20 via-transparent to-transparent pointer-events-none" />
                                </div>

                                <div className="flex-1 flex flex-col justify-center px-1.5">
                                  <p className="text-[7px] md:text-[8px] font-black text-text uppercase tracking-wider leading-tight line-clamp-2 text-center group-hover/card:text-text transition-colors">
                                    {stop.stopName}
                                  </p>
                                  <div
                                    className={`mt-1 h-0.5 w-4 mx-auto rounded-full transition-all duration-300 group-hover/card:w-8 ${isCorrectResult ? "bg-accent-soft" : "bg-red-500/40"}`}
                                  />
                                </div>

                                {/* Advanced Glass Texture */}
                                                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {/* Right Navigation Button */}
                      <button
                        onClick={() => scrollCarousel("right")}
                        className="absolute right-2 z-50 w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-full hover:scale-110 active:scale-95 transition-all group/btn"
                        style={{
                          background: "rgba(0,0,0,0.3)",
                          boxShadow:
                            "inset 0 1px 0 rgba(255,255,255,0.15), 0 2px 8px rgba(0,0,0,0.2)",
                          border: "1px solid rgba(255,255,255,0.12)",
                          backdropFilter: "blur(40px) saturate(1.8)",
                          WebkitBackdropFilter: "blur(40px) saturate(1.8)",
                        }}
                        aria-label="Scroll Right"
                      >
                        <ChevronRight
                          size={20}
                          className="text-muted group-hover/btn:text-text transition-colors"
                        />
                      </button>

                      {/* Edge Mask Gaps - Rounded */}
                      <div className="absolute inset-y-2 left-2 w-16 bg-gradient-to-r from-elevated to-transparent pointer-events-none z-10 hidden md:block rounded-l-2xl" />
                      <div className="absolute inset-y-2 right-2 w-16 bg-gradient-to-l from-elevated to-transparent pointer-events-none z-10 hidden md:block rounded-r-2xl" />
                    </div>
                  </div>

                  {/* Action Controls: Compact */}
                  <div className="flex flex-col items-center gap-3 relative z-10 pt-4">
                    <Button
                      onClick={restartTour}
                      variant="primary"
                      className="w-full max-w-[360px] py-5 text-xl font-black uppercase tracking-[0.15em] shadow-premium active:scale-95 transition-all duration-300 group/btn"
                    >
                      RESTART{" "}
                      <RotateCcw
                        size={20}
                        className="ml-2 group-hover/btn:rotate-[-90deg] transition-transform"
                      />
                    </Button>

                    <button
                      onClick={() =>
                        navigate(`/country/${toSlug(country.name)}`)
                      }
                      className="py-1.5 text-[9px] font-black text-muted hover:text-primary uppercase tracking-[0.3em] transition-all flex items-center justify-center gap-2 group/back"
                    >
                      RETURN TO PROFILE
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        );
      }
    } catch (err: any) {
      console.error("[Expedition] Render Error:", err);
      return (
        <div className="pt-32 text-center text-text p-10 bg-surface min-h-screen flex flex-col items-center justify-center">
          <h2 className="text-2xl font-black uppercase mb-4 text-text">Display Error</h2>
          <p className="text-red-400 font-mono text-xs bg-text/30 p-4 rounded-xl border border-border mb-8 max-w-md">
            {err.message}
          </p>
          <Button onClick={() => window.location.reload()} variant="primary">
            RELOAD EXPEDITION
          </Button>
        </div>
      );
    }
    return null;
  };

  return (
    <>
      {isTransitioning &&
        createPortal(
          <div
            className={`fixed inset-0 z-[5000] flex items-center justify-center pointer-events-none [transform:translateZ(0)] [-webkit-transform:translateZ(0)] [backface-visibility:hidden] [-webkit-backface-visibility:hidden] ${transitionDirection === "forward" ? "animate-aero-wipe-full-forward" : "animate-aero-wipe-full-backward"}`}
            aria-hidden="true"
          >
            {/* Luminous Background Layer */}
            <div className="absolute inset-0 bg-surface">
              {/* Immersive Aurora Blobs */}
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-[-10%] left-[-10%] w-[70%] h-[70%] bg-accent-soft rounded-full blur-3xl" />
                <div className="absolute bottom-[-5%] right-[-5%] w-[60%] h-[60%] bg-accent/10 rounded-full blur-3xl" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-white/[0.02]" />
              </div>

              {/* Glass Texture */}
                          </div>

            {/* Animated Travel Visual */}
            <div className="relative z-10 flex flex-col items-center gap-8 w-full max-w-md px-6 text-center">
              <div className="relative">
                {/* Outer glow */}
                <div className="absolute inset-0 bg-accent-soft rounded-full animate-pulse" />

                {/* Compass outer ring */}
                <div className="w-44 h-44 rounded-full bg-accent-soft border border-border flex items-center justify-center overflow-hidden relative">
                  
                  {/* Rotating compass ring with cardinal directions */}
                  <div className="absolute inset-2 rounded-full border border-border animate-[spin_12s_linear_infinite]">
                    <span className="absolute top-1 left-1/2 -translate-x-1/2 text-[8px] font-bold text-primary/80">
                      N
                    </span>
                    <span className="absolute bottom-1 left-1/2 -translate-x-1/2 text-[8px] font-bold text-muted">
                      S
                    </span>
                    <span className="absolute left-1 top-1/2 -translate-y-1/2 text-[8px] font-bold text-muted">
                      W
                    </span>
                    <span className="absolute right-1 top-1/2 -translate-y-1/2 text-[8px] font-bold text-muted">
                      E
                    </span>
                  </div>

                  {/* Inner circle with plane */}
                  <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-accent-soft to-accent-soft border border-border flex items-center justify-center">
                    {/* Orbiting plane */}
                    <div className="absolute inset-0 animate-[spin_3s_linear_infinite]">
                      <Plane className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 text-primary rotate-90" />
                    </div>

                    {/* Center destination marker */}
                    <div className="relative">
                      <MapPin
                        className="w-10 h-10 text-text animate-bounce"
                        style={{ animationDuration: "2s" }}
                      />
                      <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-1 bg-accent-soft rounded-full blur-sm" />
                    </div>
                  </div>

                  {/* Decorative dots on compass edge */}
                  {[...Array(12)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-1.5 h-1.5 rounded-full bg-accent-soft"
                      style={{
                        top: "50%",
                        left: "50%",
                        transform: `rotate(${i * 30}deg) translateY(-80px) translateX(-50%)`,
                      }}
                    />
                  ))}
                </div>

                {/* Pulsing rings */}
                <div
                  className="absolute inset-0 rounded-full border border-primary/20 animate-ping"
                  style={{ animationDuration: "2s" }}
                />
                <div
                  className="absolute -inset-4 rounded-full border border-border animate-ping"
                  style={{ animationDuration: "3s", animationDelay: "0.5s" }}
                />
              </div>

              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-muted text-center leading-relaxed w-full">
                {transitionDirection === "forward"
                  ? forwardTransitionText
                  : backDestinationText}
              </span>
            </div>
          </div>,
          document.body,
        )}

      <AnimatePresence mode="wait">{renderContent()}</AnimatePresence>
    </>
  );
};

export default CountryExploration;
