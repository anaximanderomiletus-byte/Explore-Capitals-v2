
import { AlertCircle, ArrowLeft, BrainCircuit, ChevronLeft, ChevronRight, Compass, Globe, HelpCircle, ImageOff, MapPin, Plane, RotateCcw, Trophy, Navigation, Scroll, X, Sparkles } from 'lucide-react';
import React, { useEffect, useRef, useState, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Button from '../components/Button';
import SEO from '../components/SEO';
import { useLayout } from '../context/LayoutContext';
import { FeedbackOverlay } from '../components/FeedbackOverlay';
import { MOCK_COUNTRIES, TERRITORIES, DE_FACTO_COUNTRIES } from '../constants';
import { getCountryTour, getGeneratedImage, triggerAIImageGeneration } from '../services/geminiService';
import { TourData } from '../types';

const getCountryCode = (emoji: string) => {
  return Array.from(emoji)
    .map(char => String.fromCharCode(char.codePointAt(0)! - 127397).toLowerCase())
    .join('');
};

// High-Fidelity Aero Display for Tour/Expedition
const PhotoPrint: React.FC<{ 
  src: string | null; 
  alt: string; 
  imageKeyword?: string;
  caption?: string;
  region?: string;
  rotation?: string;
  className?: string;
}> = ({ src, alt, imageKeyword, caption, region, rotation = "rotate-0", className = "" }) => {
  const [currentSrc, setCurrentSrc] = React.useState(src);
  const [isGenerating, setIsGenerating] = React.useState(false);
  const [generationProgress, setGenerationProgress] = React.useState(0);
  const [generationStep, setGenerationStep] = React.useState("");
  const [hasError, setHasError] = React.useState(!src);

  React.useEffect(() => {
    setCurrentSrc(src);
    setHasError(!src);
  }, [src]);

  const handleImgError = () => {
    setHasError(true);
    setCurrentSrc(null);
  };

  const generationSteps = [
    { threshold: 10, label: "Initializing Neural Engine..." },
    { threshold: 25, label: "Analyzing Geographical Context..." },
    { threshold: 45, label: "Synthesizing Vector Geometry..." },
    { threshold: 65, label: "Applying Flat Color Palette..." },
    { threshold: 85, label: "Finalizing Render..." },
    { threshold: 95, label: "Securing Data Packet..." }
  ];

  const handleManualGenerate = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!imageKeyword || isGenerating) return;
    
    setIsGenerating(true);
    setGenerationProgress(0);
    setGenerationStep("Establishing Link...");
    
    // Progress Animation Simulation
    const progressInterval = setInterval(() => {
      setGenerationProgress(prev => {
        if (prev >= 98) return prev;
        const next = prev + (prev < 40 ? 1.5 : prev < 80 ? 0.8 : 0.3);
        
        // Update Label
        const step = [...generationSteps].reverse().find(s => next >= s.threshold);
        if (step) setGenerationStep(step.label);
        
        return next;
      });
    }, 150);
    
    try {
      const aiImage = await triggerAIImageGeneration(imageKeyword);
      if (aiImage) {
        clearInterval(progressInterval);
        setGenerationProgress(100);
        setGenerationStep("Visual Materialized");
        setTimeout(() => {
          setCurrentSrc(aiImage);
          setHasError(false);
          setIsGenerating(false);
        }, 500);
      }
    } catch (e: any) {
      clearInterval(progressInterval);
      console.error("Manual AI Generation failed:", e);
      // Extract the actual error message from the service
      const errorMsg = e.message || "Unknown Failure";
      setGenerationStep(errorMsg.includes('429') ? "Quota Exceeded" : errorMsg);
      
      // Keep the error visible for a bit longer so the user can read it
      setTimeout(() => {
        setIsGenerating(false);
      }, 4000);
    }
  };

  return (
    <div className={`relative group rounded-3xl ${className}`}>
      {/* Liquid Glass Container - TV Style */}
      <div className={`p-2 bg-black/80 backdrop-blur-3xl rounded-3xl border-4 border-white/10 shadow-glass-bubble transform ${rotation} transition-all duration-700 relative overflow-hidden flex flex-col items-center group/glass`}>
        {/* Bezel Gloss */}
        <div className="absolute inset-0 bg-gradient-to-tr from-white/5 via-transparent to-white/10 pointer-events-none" />
        
        <div className="w-full aspect-video rounded-[1.8rem] overflow-hidden relative group/img border-2 border-black/40 shadow-inner bg-[#0A0A0A]">
          {currentSrc ? (
            <img 
              src={currentSrc} 
              alt={alt} 
              onError={handleImgError}
              className={`w-full h-full object-cover brightness-[1.05] contrast-[1.05] transition-all duration-1000 ${isGenerating ? 'opacity-30 blur-sm' : 'opacity-100'}`} 
            />
          ) : (
            <div className="flex flex-col items-center justify-center text-white/20 w-full h-full bg-[#0A0A0A] p-6 text-center">
              {isGenerating ? (
                <div className="w-full max-w-xs flex flex-col items-center gap-6 animate-in fade-in duration-500">
                   {/* Progress Visual */}
                   <div className="relative w-20 h-20">
                      <svg className="w-full h-full -rotate-90 transform">
                        <circle
                          cx="40"
                          cy="40"
                          r="36"
                          stroke="currentColor"
                          strokeWidth="4"
                          fill="transparent"
                          className="text-white/5"
                        />
                        <circle
                          cx="40"
                          cy="40"
                          r="36"
                          stroke="currentColor"
                          strokeWidth="4"
                          fill="transparent"
                          strokeDasharray={226}
                          strokeDashoffset={226 - (226 * generationProgress) / 100}
                          className="text-sky transition-all duration-500 ease-out drop-shadow-glow-sky"
                          strokeLinecap="round"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                         <Sparkles className="text-sky-light animate-pulse" size={24} />
                      </div>
                   </div>

                   <div className="space-y-3 w-full">
                      <div className="flex justify-between items-end mb-1">
                        <span className="text-[10px] font-black text-sky-light uppercase tracking-[0.3em] animate-pulse">
                          {generationStep}
                        </span>
                        <span className="text-[12px] font-display font-black text-white">
                          {Math.round(generationProgress)}%
                        </span>
                      </div>
                      <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden border border-white/10">
                        <div 
                          className="h-full bg-gradient-to-r from-sky to-sky-light transition-all duration-300 shadow-glow-sky"
                          style={{ width: `${generationProgress}%` }}
                        />
                      </div>
                   </div>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-4 animate-in fade-in duration-500">
                  <ImageOff size={40} strokeWidth={1} className="opacity-40" />
                  <div className="flex flex-col items-center gap-3">
                    <span className="text-[10px] font-black tracking-[0.2em] uppercase opacity-40">Visual Data Unreachable</span>
                    <button 
                      onClick={handleManualGenerate}
                      className="group/gen inline-flex items-center gap-2 px-6 py-2 bg-sky/10 hover:bg-sky/20 border border-sky/30 hover:border-sky-light rounded-full transition-all duration-300 transform"
                    >
                      <Sparkles size={12} className="text-sky-light group-hover/gen:animate-pulse" />
                      <span className="text-[10px] font-black text-sky-light uppercase tracking-[0.2em]">Generate Image</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
          
          {/* TV Screen Reflection */}
          <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(135deg,rgba(255,255,255,0.15)_0%,transparent_50%,rgba(255,255,255,0.05)_100%)] pointer-events-none" />
          <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-[inherit] pointer-events-none" />
        </div>
        
        {/* Label Overlay (Internal) */}
        {(caption || region) && (
          <div className="mt-3 pb-2 w-full px-6 flex justify-between items-center relative z-10">
            {caption && (
              <p className="text-[10px] font-black text-white/60 tracking-widest uppercase font-display drop-shadow-md flex-1 truncate">
                {caption}
              </p>
            )}
            {region && (
              <div className="bg-white/5 border border-white/10 px-2.5 py-0.5 rounded-md text-[6px] font-black text-white/40 uppercase tracking-[0.2em]">
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

const Container: React.FC<ContainerProps> = ({ children, className = "", transparent = false }) => (
  <div 
    id="exploration-container"
    className={`min-h-screen z-40 relative ${transparent ? 'bg-transparent' : 'bg-surface-dark'} ${className}`}
  >
    {children}
  </div>
);

// Image Helper (Internal use for small icons/previews)
const ExpeditionVisual: React.FC<{ src: string | null; alt: string; className?: string; draggable?: boolean }> = ({ src, alt, className = "", draggable }) => {
  if (src) {
    return <img src={src} alt={alt} className={`w-full h-full object-cover ${className}`} draggable={draggable} />;
  }

  return (
    <div className={`w-full h-full bg-white/5 flex items-center justify-center flex-col p-4 text-center ${className}`}>
      <ImageOff className="text-white/10 w-6 h-6 mb-2" />
      <span className="text-white/10 font-bold uppercase tracking-widest text-[8px]">No Visual</span>
    </div>
  );
};

type ViewState = 'loading' | 'error' | 'intro' | 'tour' | 'quiz' | 'summary';

const CountryExploration: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const country = useMemo(() => 
    MOCK_COUNTRIES.find(c => c.id === id) || 
    TERRITORIES.find(t => t.id === id) || 
    DE_FACTO_COUNTRIES.find(d => d.id === id)
  , [id]);

  const { setNavbarMode, setScrollThreshold, setHideFooter } = useLayout();

  const [loading, setLoading] = useState(true);
  const [tourData, setTourData] = useState<TourData | null>(null);
  const [loadingStep, setLoadingStep] = useState(0);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [dataLoaded, setDataLoaded] = useState(false);
  
  const [introImage, setIntroImage] = useState<string | null>(null);
  const [stopImages, setStopImages] = useState<Record<number, string | null>>({});

  const [view, setView] = useState<ViewState>('loading');
  const [stepIndex, setStepIndex] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [contentVisible, setContentVisible] = useState(true);
  const [transitionDirection, setTransitionDirection] = useState<'forward' | 'backward'>('forward');
  const [backDestinationText, setBackDestinationText] = useState('');
  const [forwardTransitionText, setForwardTransitionText] = useState('Traveling');

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
    "Securing Flight Path...",
    "Preparing Itinerary...",
    "Synchronizing Maps...",
    "Finalizing Briefing...",
    "Optimizing Stop Scan...",
    "Initiating Uplink...",
  ];

  // Configure Layout based on View
  useEffect(() => {
    if (view === 'tour') {
      setNavbarMode('hero');
      setScrollThreshold(window.innerHeight * 0.5); 
      setHideFooter(true);
    } else if (view === 'quiz') {
      setNavbarMode('default');
      setScrollThreshold(20);
      setHideFooter(false);
    } else {
      setNavbarMode('default');
      setScrollThreshold(20);
      setHideFooter(false);
    }
  }, [view, setNavbarMode, setScrollThreshold, setHideFooter]);

  // Reset layout on unmount
  useEffect(() => {
    return () => {
      setNavbarMode('default');
      setScrollThreshold(20);
      setHideFooter(false);
    };
  }, [setNavbarMode, setScrollThreshold, setHideFooter]);

  useEffect(() => {
    if (!country) {
      const timer = setTimeout(() => {
        if (!country) setView('error');
      }, 3000);
      return () => clearTimeout(timer);
    }

    const interval = setInterval(() => {
      setLoadingStep(prev => (prev + 1) % loadingMessages.length);
    }, 1500);

    const progressInterval = setInterval(() => {
      setLoadingProgress(prev => {
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
      console.log("[Expedition] Fetching content for:", country.name);
      // Global Safety Timeout: If data isn't ready in 8 seconds, force a fail-safe state
      const globalTimeout = setTimeout(() => {
        if (!dataLoaded) {
          console.warn("[Expedition] Tour data fetch timed out. Forcing available state.");
          setDataLoaded(true);
          setLoadingProgress(100);
        }
      }, 8000);

      try {
        const data = await getCountryTour(country.name);

        if (data) {
          console.log("[Expedition] Tour data received");
          const shuffledStops = data.stops.map(stop => ({
            ...stop,
            options: [...stop.options].sort(() => Math.random() - 0.5)
          }));
          const shuffledData = { ...data, stops: shuffledStops };

          setTourData(shuffledData);
          
          // Step 1: Generate/Check Intro Image
          const introImgPromise = getGeneratedImage(country.name, 'landscape');

          // Step 2: Generate/Check Stop Images in parallel for speed
          const stopImagePromises = shuffledData.stops.map(stop => 
            getGeneratedImage(stop.imageKeyword || stop.stopName, 'landmark')
          );

          // Wait for all image metadata checks to complete
          const [introImg, ...stopImgs] = await Promise.all([introImgPromise, ...stopImagePromises]);
          
          setIntroImage(introImg);
          
          const newStopImages: Record<number, string | null> = {};
          stopImgs.forEach((img, i) => {
            newStopImages[i] = img;
          });
          setStopImages(newStopImages);
          setLoadingProgress(95);

          // Mark data as loaded immediately - don't wait for full preloading which can hang
          clearTimeout(globalTimeout);
          setDataLoaded(true);
          setLoadingProgress(100);
          console.log("[Expedition] Loading complete");
        } else {
          clearTimeout(globalTimeout);
          console.error("[Expedition] No tour data returned");
          setView('error');
        }
      } catch (e) {
        clearTimeout(globalTimeout);
        console.error("[Expedition] Error loading tour content", e);
        setView('error');
      }
    };

    fetchContent();
  }, [country]);

  // Handle transition once progress is 100%
  useEffect(() => {
    if (loadingProgress >= 100 && dataLoaded) {
      const timer = setTimeout(() => {
        setLoading(false);
        setView('intro');
      }, 800); // Give user a moment to see the 100%
      return () => clearTimeout(timer);
    }
  }, [loadingProgress, dataLoaded]);

  useEffect(() => {
    const handleWindowScroll = () => {
      if (view === 'tour') {
        setScrollY(window.scrollY);
      }
    };
    window.addEventListener('scroll', handleWindowScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleWindowScroll);
  }, [view]);

  const startTour = () => {
    setTransitionDirection('forward');
    setForwardTransitionText('Starting Tour');
    setIsTransitioning(true);
    setContentVisible(false);
    
    // Delay view switch to middle of transition wipe (750ms into 1.4s)
    setTimeout(() => {
      setView('tour');
      setStepIndex(0);
      setScrollY(0);
      window.scrollTo({ top: 0, behavior: 'instant' });
      
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
    if (!tourData) return;
    setTransitionDirection('forward');
    // Set appropriate transition text based on whether this is the last stop
    if (stepIndex >= tourData.stops.length - 1) {
      setForwardTransitionText('Preparing Files');
    } else {
      setForwardTransitionText(`Traveling to ${tourData.stops[stepIndex + 1].stopName}`);
    }
    setIsTransitioning(true);
    setContentVisible(false);

    if (stepIndex < tourData.stops.length - 1) {
      setTimeout(() => {
        setStepIndex(prev => prev + 1);
        setScrollY(0);
        window.scrollTo({ top: 0, behavior: 'instant' });
        
        // Smoothly fade in content AFTER DOM update
        setTimeout(() => {
          setContentVisible(true);
        }, 100);
      }, 750); 
    } else {
      setTimeout(() => {
        setView('quiz');
        setStepIndex(0);
        setScore(0);
        setQuizResults({});
        setSelectedOption(null);
        setIsCorrect(null);
        setFeedbackMessage(null);
        window.scrollTo({ top: 0, behavior: 'instant' });
        
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
    setTransitionDirection('backward');
    // Set the back destination text
    if (stepIndex > 0) {
      setBackDestinationText(`Back to ${tourData.stops[stepIndex - 1].stopName}`);
    } else {
      setBackDestinationText('Back to Menu');
    }
    setIsTransitioning(true);
    setContentVisible(false);
    setTimeout(() => {
      if (stepIndex > 0) {
        setStepIndex(prev => prev - 1);
      } else {
        setView('intro');
      }
      setScrollY(0);
      window.scrollTo({ top: 0, behavior: 'instant' });
      
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
    setFeedbackKey(prev => prev + 1);
    setQuizResults(prev => ({ ...prev, [stepIndex]: correct }));

    if (correct) {
      setScore(s => s + 1);
      setFeedbackMessage(currentQuestion.explanation ? `Correct! ${currentQuestion.explanation}` : "Correct! Great job.");
    } else {
      setFeedbackMessage(currentQuestion.explanation ? `Incorrect. ${currentQuestion.explanation}` : `Incorrect. The correct answer is ${currentQuestion.answer}.`);
    }
  };

  const nextQuestion = () => {
    if (!tourData) return;
    setSelectedOption(null);
    setIsCorrect(null);
    if (stepIndex < tourData.stops.length - 1) {
      setStepIndex(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: 'instant' });
    } else {
      setTransitionDirection('forward');
      setIsTransitioning(true);
      setContentVisible(false);
      
      // Delay view switch to ensure wipe is covering the screen (750ms into 1.4s)
      setTimeout(() => {
         setView('summary');
         window.scrollTo({ top: 0, behavior: 'instant' });
         
         // Smoothly fade in content AFTER DOM update
         setTimeout(() => {
           setContentVisible(true);
         }, 100);
      }, 750);

      setTimeout(() => {
        setIsTransitioning(false);
      }, 1600); // More generous buffer for the wipe to clear
    }
  };

  const restartTour = () => {
    setTransitionDirection('forward');
    setIsTransitioning(true);
    setContentVisible(false);
    
    // Delay view switch to middle of transition wipe (750ms into 1.4s)
    setTimeout(() => {
      setView('intro'); 
      setScore(0);
      setQuizResults({});
      setIsCorrect(null);
      setFeedbackKey(0);
      setScrollY(0);
      window.scrollTo({ top: 0, behavior: 'instant' });
      
      // Smoothly fade in content AFTER DOM update
      setTimeout(() => {
        setContentVisible(true);
      }, 100);
    }, 750);

    setTimeout(() => {
      setIsTransitioning(false);
    }, 1600);
  };

  const scrollCarousel = (direction: 'left' | 'right') => {
    if (!carouselRef.current) return;
    const container = carouselRef.current;
    // Scroll by card width + gap (approx 152px on md, 124px on mobile)
    const cardWidth = window.innerWidth >= 768 ? 152 : 124;
    const scrollAmount = direction === 'left' ? -cardWidth : cardWidth;
    container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };

  // Carousel 3D Effect Logic
  useEffect(() => {
    if (view !== 'summary' || !carouselRef.current) return;

    const container = carouselRef.current;
    let rafId: number;
    
    const updateCardStyles = () => {
      const cards = container.querySelectorAll('.carousel-card');
      const containerRect = container.getBoundingClientRect();
      const containerCenterAbs = containerRect.left + containerRect.width / 2;

      cards.forEach((card: any) => {
        const cardRect = card.getBoundingClientRect();
        const cardCenter = cardRect.left + cardRect.width / 2;
        
        const distanceFromCenter = cardCenter - containerCenterAbs;
        const normalizedDistance = distanceFromCenter / (containerRect.width / 2);
        
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
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(updateCardStyles);
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    // Initial sync with a slight delay to ensure layout is ready
    const timer = setTimeout(updateCardStyles, 50);
    
    return () => {
      container.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(rafId);
      clearTimeout(timer);
    };
  }, [view, tourData]);

  if (!country) return <div className="p-10 text-center text-white font-black uppercase tracking-widest">Target not found.</div>;

  const renderContent = () => {
    try {
      if (view === 'loading' || loading) {
        return (
          <motion.div 
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Container className="flex items-center justify-center px-4 md:px-6 pt-20 pb-12 overflow-hidden bg-surface-dark relative">
              <SEO title={`Loading...`} description={`Preparing your expedition.`} />
              
              {/* Dynamic Tech Grid Background */}
              <div className="absolute inset-0 z-0 opacity-20" 
                style={{ 
                  backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.05) 1px, transparent 0)`,
                  backgroundSize: '40px 40px'
                }} 
              />
              
              {/* Scanning Line Effect */}
              <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden opacity-30">
                <div className="w-full h-[2px] bg-sky-light/50 blur-sm absolute top-0 left-0 animate-scan-line" />
              </div>

              {/* Immersive Aurora Background */}
              <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-20%] left-[-10%] w-[120%] h-[120%] bg-sky/20 rounded-full blur-[160px] opacity-80 animate-pulse-slow" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[100%] h-[100%] bg-accent/10 rounded-full blur-[140px] opacity-60 animate-pulse-slow" />
                <div className="absolute top-[30%] left-[20%] w-[40%] h-[40%] bg-white/5 rounded-full blur-[100px] animate-float" />
              </div>
              
              <div className="relative z-10 w-full max-w-lg flex flex-col items-center">
                {/* Main Loading Console */}
                <div className="w-full bg-black/40 backdrop-blur-3xl rounded-[2.5rem] shadow-[0_0_100px_rgba(0,194,255,0.15)] p-8 md:p-12 text-center border border-white/10 relative overflow-hidden">
                  {/* Internal Glass Sheen */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/5 via-transparent to-white/10 pointer-events-none" />
                  <div className="absolute inset-0 bg-glossy-gradient opacity-5 pointer-events-none" />
                  
                  {/* Corner Brackets */}
                  <div className="absolute top-6 left-6 w-10 h-10 border-t-2 border-l-2 border-sky/30 rounded-tl-2xl" />
                  <div className="absolute top-6 right-6 w-10 h-10 border-t-2 border-r-2 border-sky/30 rounded-tr-2xl" />
                  <div className="absolute bottom-6 left-6 w-10 h-10 border-b-2 border-l-2 border-sky/30 rounded-bl-2xl" />
                  <div className="absolute bottom-6 right-6 w-10 h-10 border-b-2 border-r-2 border-sky/30 rounded-tr-2xl" />
                  
                  <div className="mb-8 relative pt-4">
                    {/* Holographic Projection Base */}
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-48 h-4 bg-sky/20 blur-2xl rounded-full animate-pulse" />
                    
                    {/* Flag Display with Orbitals */}
                    <div className="relative z-10 w-44 h-auto mx-auto mb-6 transform-gpu perspective-1000">
                      <div className="relative animate-float-slow">
                        <img 
                          src={`https://flagcdn.com/w320/${getCountryCode(country.flag)}.png`}
                          alt={`${country.name} Flag`}
                          className="w-full h-auto object-contain relative z-10"
                        />
                      </div>
                      
                      {/* Rotating Orbital Rings */}
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 border border-sky/10 rounded-full animate-spin-slow opacity-20" />
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 border border-dashed border-white/5 rounded-full animate-reverse-spin opacity-20" />
                    </div>
                  </div>

                  <div className="space-y-4 mb-10">
                    <div className="inline-flex items-center gap-3 px-5 py-2 bg-sky/10 rounded-full border border-white/10 mb-2 shadow-inner group">
                       <div className="w-2 h-2 rounded-full bg-sky animate-ping shadow-glow-sky" />
                       <span className="text-[10px] font-black text-sky-light uppercase tracking-[0.5em] drop-shadow-glow-sky">
                         {loadingProgress < 100 ? 'Establishing Link' : 'Connection Secured'}
                       </span>
                    </div>
                    
                    <div className="flex flex-col items-center">
                      <span className="text-[10px] text-white/40 tracking-[0.4em] uppercase mb-1 font-black">Destination</span>
                      <h1 className="text-3xl md:text-5xl font-display font-black text-white tracking-tighter uppercase leading-tight drop-shadow-[0_0_20px_rgba(0,194,255,0.3)]">
                        {country.name}
                      </h1>
                    </div>
                  </div>

                  {/* Progress Section */}
                  <div className="relative w-full mb-10 px-4">
                    {/* Label & Percentage */}
                    <div className="flex justify-between items-end mb-3 px-1">
                      <div className="flex flex-col items-start">
                        <span className="text-[9px] font-black text-white/40 uppercase tracking-widest">System Load</span>
                        <div className="h-0.5 w-8 bg-sky/40 rounded-full mt-1" />
                      </div>
                      <div className="flex items-baseline gap-1">
                        <span className="text-2xl font-display font-black text-white tabular-nums">
                          {Math.round(loadingProgress)}
                        </span>
                        <span className="text-[10px] font-black text-sky-light tracking-widest">%</span>
                      </div>
                    </div>

                    {/* Loading Bar Container */}
                    <div className="w-full h-3 bg-white/5 rounded-full overflow-hidden border border-white/10 shadow-inner p-0.5 relative group">
                      <div 
                        className="h-full bg-gradient-to-r from-sky via-sky-light to-sky transition-all duration-300 ease-out rounded-full relative shadow-[0_0_20px_rgba(0,194,255,0.6)]" 
                        style={{ width: `${loadingProgress}%` }}
                      >
                        {/* Animated Shimmer Overlap */}
                        <div className="absolute inset-0 w-full h-full animate-shimmer bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.6),transparent)] bg-[length:200%_100%]" />
                        
                        {/* Leading Glow Point */}
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full blur-md opacity-80" />
                      </div>
                    </div>

                    {/* Status Dots */}
                    <div className="flex gap-1.5 mt-4 justify-center">
                       {[...Array(8)].map((_, i) => (
                         <div 
                            key={i} 
                            className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${
                              loadingProgress > (i * 12.5) 
                                ? 'bg-sky shadow-glow-sky' 
                                : 'bg-white/5 border border-white/5'
                            }`} 
                         />
                       ))}
                    </div>
                  </div>

                  {/* Animated Loading Messages */}
                  <div className="flex flex-col items-center justify-center h-8 relative">
                    <div className="flex items-center gap-4 text-white/40">
                      <div className="w-8 h-[1px] bg-gradient-to-r from-transparent to-sky/40" />
                      <p key={loadingStep} className="text-[10px] font-black uppercase tracking-[0.4em] animate-in slide-in-from-bottom-2 fade-in duration-500 text-sky-light/80 drop-shadow-glow-sky">
                        {loadingMessages[loadingStep]}
                      </p>
                      <div className="w-8 h-[1px] bg-gradient-to-l from-transparent to-sky/40" />
                    </div>
                  </div>
                </div>
                
                {/* Terminal Style Data Readouts */}
                <div className="mt-10 grid grid-cols-3 gap-12 w-full px-6 opacity-30">
                  <div className="flex flex-col items-start gap-1">
                    <span className="text-[8px] font-black text-white/40 uppercase tracking-widest">Coordinates</span>
                    <span className="text-[9px] font-black text-white tabular-nums">{country.lat.toFixed(4)}N {country.lng.toFixed(4)}E</span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <span className="text-[8px] font-black text-white/40 uppercase tracking-widest">Protocol</span>
                    <span className="text-[9px] font-black text-sky-light tracking-tighter">SECURE-UPLINK-v4</span>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span className="text-[8px] font-black text-white/40 uppercase tracking-widest">Archive Status</span>
                    <span className="text-[9px] font-black text-white tracking-widest">{loadingProgress < 100 ? 'BUFFERING' : 'READY'}</span>
                  </div>
                </div>
              </div>
            </Container>
          </motion.div>
        );
      }

    if (view === 'error' || !tourData) {
      return (
        <Container className="flex items-center justify-center pt-24 pb-12 px-4 md:px-6 bg-surface-dark">
          <div className="flex-1 flex flex-col items-center justify-center text-center max-w-sm">
            <div className="w-20 h-20 bg-red-500/20 rounded-[2rem] flex items-center justify-center mb-8 text-red-500 border border-red-500/30 shadow-glow-warning">
                <AlertCircle size={40} />
            </div>
            <h2 className="text-2xl font-display font-black mb-4 text-white uppercase tracking-tighter">Connection Issue</h2>
            <p className="text-white/40 mb-10 leading-relaxed font-bold uppercase tracking-widest text-[10px]">We couldn't retrieve the expedition data from the archive.</p>
            <Button onClick={() => navigate(`/country/${country.id}`)} variant="primary" className="w-full h-16 text-white uppercase tracking-widest rounded-full">RETURN TO COUNTRY</Button>
          </div>
        </Container>
      );
    }

    if (view === 'intro') {
      return (
        <Container className="w-full min-h-[100dvh] bg-surface-dark flex flex-col items-center justify-center pt-16 pb-12 px-4 md:px-6 relative overflow-hidden" transparent>
          <SEO 
            title={`Expedition - ${country.name}`} 
            description={`Explore ${country.name} with a virtual expedition.`}
            image={introImage || undefined}
            imageAlt={`Scenery of ${country.name}`}
          />

          {/* Immersive Aurora Background */}
          <div className="fixed inset-0 z-0 pointer-events-none">
            <div className="absolute top-[-20%] left-[-10%] w-[120%] h-[120%] bg-sky/15 rounded-full blur-[160px] opacity-80 animate-pulse-slow" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[100%] h-[100%] bg-accent/10 rounded-full blur-[140px] opacity-60 animate-pulse-slow" />
          </div>
          
          <div className={`relative z-10 w-full max-w-4xl flex flex-col items-center transition-all duration-500 ${!contentVisible ? 'opacity-0 scale-95 blur-sm' : 'opacity-100 scale-100 blur-0'}`}>
            <div className="p-4 md:p-6 text-center relative w-full">
              
              <div className="space-y-1 mb-2 text-center">
                <div className="inline-flex items-center gap-2 px-3 py-0.5 bg-sky/30 rounded-full border border-white/40 text-[7px] font-black tracking-[0.4em] text-white shadow-[0_4px_12px_rgba(0,0,0,0.3)] relative overflow-hidden mx-auto">
                  <Compass size={10} className="text-sky-light" /> 
                  <span className="relative z-10 uppercase drop-shadow-glow-sky">Virtual Tour</span>
                </div>
                <h1 className="text-xl md:text-2xl font-display font-black text-white leading-tight uppercase tracking-tighter drop-shadow-md">
                  {tourData.tourTitle}
                </h1>
                <p className="text-[10px] md:text-[11px] text-white/70 font-bold italic leading-snug drop-shadow-sm max-w-2xl mx-auto">
                  {tourData.introText}
                </p>
              </div>

              <div className="flex flex-col items-center gap-2.5 mb-1.5 w-full">
                {/* Main Featured Image - Centered TV */}
                <div className="max-w-lg w-full relative group">
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

                {/* Itinerary Preview - Horizontal Under TV */}
                <div className="flex flex-col items-center gap-1 w-full">
                  <div className="flex flex-col items-center gap-0.5">
                    <span className="text-[7px] font-black text-white/30 uppercase tracking-[0.4em]">Planned Itinerary</span>
                    <div className="h-0.5 w-10 bg-sky/40 rounded-full" />
                  </div>
                  
                  <div className="relative flex justify-center w-full">
                    {/* Connecting Line */}
                    <div className="absolute top-5 left-[15%] right-[15%] h-px bg-gradient-to-r from-transparent via-white/30 to-transparent z-0 hidden md:block" />
                    
                    <div className="flex flex-wrap justify-center gap-3 md:gap-6 relative z-10">
                      {tourData.stops.map((stop, idx) => {
                        const displayLabel = stop.stopName.replace(/\s*\(.*\)/, '').trim();
                        
                        return (
                          <div key={idx} className="flex flex-col items-center gap-2 group/stop w-20 md:w-24">
                            <div className="w-10 h-10 shrink-0 rounded-lg bg-black/40 border border-white/10 overflow-hidden relative shadow-inner">
                              <ExpeditionVisual src={stopImages[idx]} alt={stop.stopName} className="opacity-60 group-hover/stop:opacity-100 transition-opacity duration-500" />
                              <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent pointer-events-none" />
                              <div className="absolute bottom-0 right-0 bg-sky/80 text-white text-[6px] font-black px-0.5 rounded-tl-md">
                                0{idx + 1}
                              </div>
                            </div>
                            <div className="flex flex-col items-center text-center w-full">
                              <span className="text-[8px] font-black text-white uppercase tracking-wider group-hover/stop:text-sky-light transition-colors leading-tight w-full line-clamp-2">{displayLabel}</span>
                              <span className="text-[6px] font-bold text-white/20 uppercase tracking-widest">Waypoint</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-3 w-full items-center pt-0.5">
                <div className="inline-flex items-center justify-center gap-2 px-3 py-1 bg-yellow-400/10 hover:bg-yellow-400/20 rounded-full border border-yellow-400/30 hover:border-yellow-400/60 shadow-inner group/warning transition-all duration-300 cursor-default mb-1">
                   <AlertCircle size={10} className="text-yellow-400 group-hover/warning:text-yellow-300 transition-colors" />
                   <span className="text-[7px] font-black text-yellow-400/90 group-hover/warning:text-white uppercase tracking-wider transition-colors">This tour ends with a brief assessment to test your knowledge.</span>
                </div>

                <button 
                  onClick={startTour} 
                  className="group relative w-full max-w-[320px] h-12 rounded-2xl overflow-hidden transition-all duration-500"
                >
                  {/* Gradient background */}
                  <div className="absolute inset-0 bg-gradient-to-r from-sky/70 via-sky/80 to-sky/70 group-hover:from-sky/80 group-hover:via-sky/90 group-hover:to-sky/80 transition-all" />
                  
                  {/* Subtle inner border */}
                  <div className="absolute inset-[1px] rounded-2xl border border-white/10" />
                  
                  {/* Content */}
                  <div className="relative z-10 flex items-center justify-center gap-3 h-full">
                    <span className="text-xs font-black uppercase tracking-[0.2em] text-white/90">
                      Start Tour
                    </span>
                    <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                      <ChevronRight size={14} className="text-white/80 transition-all" />
                    </div>
                  </div>
                </button>

                <button 
                  onClick={() => navigate(`/country/${country.id}`)}
                  className="text-[9px] font-black uppercase tracking-[0.2em] text-white/30 hover:text-sky transition-colors py-1"
                >
                  GO BACK
                </button>
              </div>
            </div>
          </div>
        </Container>
      );
    }

    if (view === 'tour') {
      const currentStop = tourData.stops[stepIndex];
      const isLastStop = stepIndex === tourData.stops.length - 1;
      const currentImage = stopImages[stepIndex];

      return (
        <Container className="w-full min-h-screen bg-surface-dark flex flex-col items-center overflow-x-hidden">
           {/* Immersive Parallax Background Layer */}
           <div className="fixed inset-0 w-full h-full -z-10 overflow-hidden bg-black">
              <div 
                className="absolute inset-0 transition-transform duration-1000 ease-out scale-110"
                style={{ 
                  transform: `translateY(${scrollY * 0.2}px) scale(${1.1 + (scrollY * 0.0001)})`,
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
              <div className="absolute top-[-10%] left-[-10%] w-[70%] h-[70%] bg-sky/10 rounded-full blur-[120px] animate-pulse-slow" />
              <div className="absolute bottom-[-5%] right-[-5%] w-[60%] h-[60%] bg-accent/5 rounded-full blur-[100px] animate-pulse-slow delay-1000" />
                  </div>

           {/* Navigation Controls */}
           <div className="sticky top-20 z-50 w-full px-6 flex justify-center items-center pointer-events-none">
              {/* Progress Header */}
              <div className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-full px-6 py-2 shadow-[0_8px_16px_rgba(0,0,0,0.4)] flex items-center gap-4 animate-in slide-in-from-top-4 duration-700 pointer-events-auto">
                 <div className="w-2 h-2 rounded-full bg-sky animate-pulse shadow-[0_0_8px_rgba(0,194,255,0.5)]" />
                 <span className="text-[10px] font-black text-white uppercase tracking-[0.4em]">
                   STOP {stepIndex + 1} OF {tourData.stops.length}
                 </span>
                 <div className="h-4 w-[1px] bg-white/20" />
                 <span className="text-[10px] font-black text-sky-light uppercase tracking-[0.2em]">
                      {currentStop.stopName}
                 </span>
                </div>
           </div>

           {/* Narrative Content Scroll */}
           <div 
             key={stepIndex}
             className={`relative z-10 w-full max-w-6xl px-8 pt-24 pb-20 flex flex-col items-center justify-center min-h-[calc(100vh-120px)] transition-all duration-500 ${!contentVisible ? 'opacity-0 scale-95 blur-sm' : 'opacity-100 scale-100 blur-0'}`}
           >
              <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start w-full">
                {/* Section 1: Text Content */}
                <section className="w-full animate-in fade-in slide-in-from-left-8 duration-1000 order-2 lg:order-1 lg:pt-6">
                   <div className="space-y-5">
                      <div className="text-center lg:text-left">
                         <h2 className="text-2xl md:text-3xl lg:text-4xl font-display font-black text-white leading-none uppercase tracking-tighter drop-shadow-lg mb-5">
                            {currentStop.stopName}
                         </h2>
                      </div>

                      <div className="space-y-4 lg:text-left">
                         <p className="text-lg md:text-xl font-display font-black text-white leading-snug tracking-tight opacity-95">
                            {currentStop.description[0]}
                         </p>
                         <div className="w-12 h-1 bg-sky/40 rounded-full hidden lg:block" />
                         <p className="text-sm md:text-base text-white/60 leading-relaxed font-bold">
                            {currentStop.description[1]}
                         </p>
           </div>

                      {/* Navigation Controls */}
                      <div className="flex items-center gap-3 pt-1 lg:justify-start justify-center">
                         <button 
                      onClick={prevStop} 
                            className="group/prev w-11 h-11 rounded-full bg-white/40 backdrop-blur-xl border border-white/50 flex items-center justify-center hover:bg-white/50 hover:border-white/60 transition-all duration-300"
                         >
                            <ArrowLeft size={17} className="text-white group-hover/prev:text-white group-hover/prev:-translate-x-0.5 transition-all" />
                         </button>

                         <button 
                    onClick={nextStop} 
                            className={`group/next h-11 px-5 rounded-full backdrop-blur-xl border flex items-center gap-2 transition-all duration-300 ${
                              isLastStop 
                                ? 'bg-accent/70 border-accent/80 hover:bg-accent/80 hover:border-accent' 
                                : 'bg-sky/70 border-sky/80 hover:bg-sky/80 hover:border-sky'
                            }`}
                         >
                            <span className="text-[10.5px] font-black uppercase tracking-[0.15em] text-white">
                               {isLastStop ? 'Start Quiz' : 'Next'}
                    </span>
                            <ChevronRight size={15} className="text-white transition-all group-hover/next:translate-x-0.5" />
                         </button>
                      </div>
                   </div>
                </section>

                {/* Section 2: The Visual Encounter */}
                <section className="w-full flex flex-col items-center animate-in fade-in slide-in-from-right-8 duration-1000 order-1 lg:order-2 lg:pt-14">
                   <div className="relative group w-full">
                    <PhotoPrint 
                      src={currentImage} 
                      alt={currentStop.stopName} 
                        imageKeyword={currentStop.imageKeyword || currentStop.stopName}
                        caption={`${currentStop.stopName}, ${country.name}`}
                        region="Active Stop"
                        rotation="rotate-0"
                        className="w-full shadow-[0_30px_80px_rgba(0,0,0,0.6)]"
                    />
                  </div>
                </section>
              </div>
           </div>
        </Container>
      );
    }

    if (view === 'quiz') {
      const currentQuestion = tourData.stops[stepIndex];
      const isLastQuestion = stepIndex === tourData.stops.length - 1;
      const currentImage = stopImages[stepIndex];

      return (
        <Container className={`w-full min-h-screen bg-surface-dark flex flex-col items-center pt-20 md:pt-24 px-4 md:px-6 relative overflow-x-hidden transition-all duration-700 ${selectedOption ? 'pb-[35vh] md:pb-[30vh]' : 'pb-12 md:pb-16'}`}>
           <SEO title={`Knowledge Check - ${country.name}`} description={`Select the correct answer about ${currentQuestion.stopName}.`} />
           
           {/* Immersive Aurora Background */}
           <div className="fixed inset-0 z-0 pointer-events-none">
             <div className="absolute top-[10%] right-[10%] w-[70%] h-[70%] bg-sky/10 rounded-full blur-[120px] opacity-80 animate-pulse-slow" />
             <div className="absolute bottom-[10%] left-[10%] w-[60%] h-[60%] bg-accent/5 rounded-full blur-[100px] opacity-60 animate-pulse-slow delay-700" />
             <div className="absolute top-[30%] left-[20%] w-[40%] h-[40%] bg-white/5 rounded-full blur-[80px]" />
           </div>

           <div 
             key={stepIndex}
             className={`flex-1 flex flex-col max-w-5xl mx-auto w-full min-h-0 py-2 relative z-10 transition-all duration-500 ${!contentVisible ? 'opacity-0 scale-95 blur-sm' : 'opacity-100 scale-100 blur-0'} justify-center`}
           >
              {/* Progress Header */}
              <div className="text-center mb-6 md:mb-8 shrink-0 animate-in fade-in slide-in-from-top-4 duration-1000">
                 <div className="inline-flex items-center gap-3 px-3 py-1 bg-sky/20 rounded-full border border-white/30 mb-3 shadow-glass-bubble">
                    <div className="w-1.5 h-1.5 rounded-full bg-sky shadow-glow-sky animate-pulse" />
                    <h2 className="text-[9px] font-black text-white uppercase tracking-[0.5em] drop-shadow-glow-sky">Knowledge Check</h2>
                 </div>
                 <div className="w-48 md:w-64 h-1.5 bg-white/10 mx-auto relative rounded-full overflow-hidden shadow-inner border border-white/10">
                    <div 
                      className="absolute h-full bg-gradient-to-r from-sky to-sky-light transition-all duration-1000 ease-out shadow-glow-sky"
                      style={{ 
                        width: `${((stepIndex + 1) / tourData.stops.length) * 100}%`, 
                      }}
                    />
                 </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-10 items-center flex-1 min-h-0">
                 {/* Left: Physical Photo */}
                 <div className="lg:col-span-5 flex flex-col justify-center animate-in fade-in slide-in-from-left-8 duration-1000">
                    <PhotoPrint 
                      src={currentImage} 
                      alt={currentQuestion.stopName} 
                      imageKeyword={currentQuestion.imageKeyword || currentQuestion.stopName}
                      caption={currentQuestion.stopName}
                      region="Stop Detail"
                      rotation="-rotate-2"
                      className="max-w-[240px] md:max-w-[320px] lg:max-w-none mx-auto"
                    />
                 </div>

                 {/* Right: Glassy Quiz Panel */}
                 <div className="lg:col-span-7 flex flex-col animate-in fade-in slide-in-from-right-8 duration-1000 h-full justify-center">
                    <div className="bg-white/10 backdrop-blur-3xl p-5 md:p-8 rounded-3xl border border-white/40 shadow-glass-bubble flex flex-col relative overflow-hidden group">
                       <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/15 to-transparent pointer-events-none" />
                       <div className="absolute inset-0 bg-glossy-gradient opacity-10 pointer-events-none" />
                       
                       <div className="flex flex-col justify-center gap-5 md:gap-8 relative z-10">
                          <h3 className="text-lg md:text-2xl font-display font-black text-white leading-tight tracking-tighter drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)] uppercase text-center border-b border-white/10 pb-5 md:pb-6">
                            {currentQuestion.question}
                          </h3>

                          <div className="grid grid-cols-1 gap-2.5 w-full">
                             {currentQuestion.options.map((option, idx) => {
                               const isSelected = selectedOption === option;
                               
                              let stateStyles = "bg-white/5 border border-white/20 text-white/70 hover:bg-white/15 hover:border-sky/50 hover:text-white";

                              if (isSelected) {
                                 if (isCorrect) {
                                   stateStyles = "bg-accent/70 border-accent text-white shadow-glow-accent ring-2 ring-accent/50";
                                 } else {
                                   stateStyles = "bg-red-500/60 border-red-500 text-white shadow-glow-warning ring-2 ring-red-500/40";
                                 }
                              } else if (selectedOption && option === currentQuestion.answer) {
                                 stateStyles = "bg-accent/40 border-accent/80 text-white shadow-glow-accent/30"; 
                              } else if (selectedOption) {
                                 stateStyles = "opacity-20 grayscale border-white/5 bg-transparent scale-95 blur-[1px]";
                              }

                              return (
                                <button
                                  key={idx}
                                  onClick={() => handleQuizAnswer(option)}
                                  disabled={!!selectedOption}
                                  className={`w-full text-left px-5 md:px-6 py-3 md:py-4 rounded-xl md:rounded-2xl border transition-all duration-500 font-black text-xs md:text-sm flex justify-between items-center shadow-glass-bubble relative overflow-hidden group/opt ${stateStyles} ${isSelected && !isCorrect ? 'animate-shake' : ''}`}
                                  style={{ WebkitTapHighlightColor: 'transparent' }}
                                >
                                  <div className="absolute inset-0 bg-glossy-gradient opacity-10 group/opt:opacity-20 pointer-events-none rounded-[inherit]" />
                                  <span className="leading-snug pr-4 relative z-10 drop-shadow-md uppercase tracking-tight">{option}</span>
                                </button>
                              );
                             })}
                          </div>
                       </div>
                    </div>
                 </div>
              </div>
           </div>

           {/* Feedback Overlay Backdrop - Subtle tint, no interaction blocking */}
           <div 
             className={`fixed inset-0 z-[90] bg-black/40 transition-opacity duration-500 pointer-events-none ${selectedOption ? 'opacity-100' : 'opacity-0'}`}
           />

           {/* Feedback Bottom Panel - Static Mission Report (Non-scrollable overlay) */}
           <div 
             className={`fixed bottom-0 left-0 right-0 z-[100] bg-surface-dark flex flex-col justify-center transition-transform duration-500 cubic-bezier(0.16, 1, 0.3, 1) shadow-[0_-40px_150px_rgba(0,0,0,1)] select-none pointer-events-auto touch-none overflow-hidden ${selectedOption ? 'translate-y-0' : 'translate-y-full'}`}
             style={{ height: 'max-content', minHeight: '32vh' }}
           >
              {/* Internal Aero Gloss - Edge to Edge */}
              <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
              <div className="absolute inset-0 bg-glossy-gradient opacity-10 pointer-events-none" />
              
              <div className="max-w-7xl mx-auto w-full p-10 md:p-16 flex flex-col md:flex-row items-center justify-between gap-12 relative z-10">
                  <div className="flex-1 text-center md:text-left min-h-0">
                      {selectedOption && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
                          <div className="flex items-center justify-center md:justify-start gap-6">
                              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center border-2 border-white/40 shadow-glass-bubble relative overflow-hidden ${isCorrect ? 'bg-accent/60 text-white shadow-glow-accent' : 'bg-red-500/60 text-white shadow-glow-warning'}`}>
                                   <div className="absolute inset-0 bg-glossy-gradient opacity-30" />
                                   {isCorrect ? <Trophy size={32} className="relative z-10" /> : <ImageOff size={32} className="relative z-10" />}
                                  </div>
                              <div>
                                 <h3 className="font-display font-black text-4xl md:text-5xl uppercase tracking-tighter drop-shadow-lg text-white leading-none mb-1">
                                     {isCorrect ? 'Correct' : 'Incorrect'}
                              </h3>
                                 <p className={`text-[10px] font-black uppercase tracking-[0.4em] drop-shadow-sm ${isCorrect ? 'text-accent' : 'text-red-400'}`}>Mission Explanation</p>
                          </div>
                          </div>
                          <p className="text-base md:text-lg text-white/70 font-bold leading-relaxed max-w-3xl border-l-4 border-white/10 pl-8">
                              {feedbackMessage ? feedbackMessage.replace(/^(Correct!|Incorrect\.)\s*/, '') : ''}
                          </p>
                        </div>
                      )}
                  </div>
                  <div className="w-full md:w-auto shrink-0 animate-in fade-in zoom-in duration-700 delay-200">
                       <Button 
                         onClick={nextQuestion} 
                         className="w-full md:min-w-[300px] h-20 rounded-full flex items-center justify-center gap-4 text-2xl uppercase tracking-widest shadow-glow-sky border-2 border-white/40 group/next"
                         variant="primary"
                         size="lg"
                         disabled={!selectedOption}
                       >
                         <span className="relative z-10 flex items-center gap-3">
                           {isLastQuestion ? 'FINISH TOUR' : 'NEXT STOP'} <ChevronRight size={36} className="transition-transform duration-500" />
                         </span>
                       </Button>
                  </div>
              </div>
           </div>
        </Container>
      );
    }

    if (view === 'summary') {
      const isPerfect = score === tourData.stops.length;
      return (
        <Container className="w-full h-[100dvh] bg-surface-dark flex flex-col items-center justify-center pt-16 pb-6 px-4 md:px-6 relative overflow-hidden" transparent>
          {/* Immersive Aurora Background */}
          <div className="fixed inset-0 z-0 pointer-events-none">
            <div className="absolute top-[-20%] left-[-10%] w-[120%] h-[120%] bg-sky/15 rounded-full blur-[160px] opacity-80 animate-pulse-slow" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[100%] h-[100%] bg-accent/7.5 rounded-full blur-[140px] opacity-60 animate-pulse-slow" />
          </div>

          <div className={`flex items-center justify-center relative z-10 w-full max-w-3xl transition-all duration-700 ${!contentVisible ? 'opacity-0 scale-95 blur-sm' : 'opacity-100 scale-100 blur-0'}`}>
            <div className="bg-black/40 backdrop-blur-3xl rounded-2xl shadow-glass-bubble p-4 md:p-6 w-full text-center border border-white/10 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
              <div className="absolute inset-0 bg-glossy-gradient opacity-5 pointer-events-none" />
              
              <div className="relative z-10">
                {/* Header Area: Ultra-Compact & Elegant */}
                <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-4 pb-4 border-b border-white/5">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center border-2 border-white/20 shadow-glass-bubble relative shrink-0 group ${isPerfect ? 'bg-accent/30 shadow-glow-accent' : 'bg-sky/30 shadow-glow-sky'}`}>
                     <div className="absolute inset-0 bg-glossy-gradient opacity-40 group-hover:opacity-60 transition-opacity rounded-[inherit]" />
                    <Trophy className="w-6 h-6 text-white drop-shadow-glow-sky" />
                  </div>
                
                  <div className="text-center md:text-left">
                     <h1 className="text-xl md:text-2xl font-display font-black text-white uppercase tracking-tighter drop-shadow-md leading-tight mb-0.5">Expedition Complete</h1>
                     <div className="flex items-center justify-center md:justify-start gap-3">
                        <span className="text-[8px] font-black text-white/30 uppercase tracking-[0.4em]">Knowledge Check</span>
                        <div className="h-px w-6 bg-white/10" />
                        <p className="text-white font-black uppercase tracking-widest text-xs tabular-nums">
                          <strong className="text-sky drop-shadow-glow-sky">{score}</strong> <span className="text-white/20 mx-0.5">/</span> {tourData.stops.length}
                        </p>
                     </div>
                  </div>
                </div>

                {/* Enhanced Carousel Section */}
                <div className="mb-4 w-full relative bg-white/5 rounded-2xl p-2 border border-white/5 shadow-inner group/log overflow-hidden">
                   <div className="flex items-center justify-between mb-2 px-4 pt-2">
                      <div className="flex flex-col items-start">
                        <span className="text-[8px] font-black text-white/30 uppercase tracking-[0.5em] mb-1">Visual Log Archive</span>
                        <div className="h-0.5 w-8 bg-sky/40 rounded-full" />
                      </div>
                   </div>
                   
                   <div className="relative flex items-center">
                      {/* Left Navigation Button */}
                      <button 
                        onClick={() => scrollCarousel('left')} 
                        className="absolute left-2 z-50 w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-xl bg-black/60 backdrop-blur-xl border border-white/10 hover:bg-white/10 hover:border-sky/50 transition-all shadow-lg group/btn"
                        aria-label="Scroll Left"
                      >
                         <ChevronLeft size={20} className="text-white/40 group-hover/btn:text-white transition-colors" />
                      </button>

                      {/* 3D Scroller - Draggable */}
                      <div 
                        ref={carouselRef}
                        className="flex gap-3 overflow-x-auto py-4 no-scrollbar w-full cursor-grab active:cursor-grabbing select-none"
                        style={{ 
                          perspective: '1200px', 
                          transformStyle: 'preserve-3d',
                          scrollbarWidth: 'none',
                          msOverflowStyle: 'none'
                        }}
                        onMouseDown={(e) => {
                          const el = carouselRef.current;
                          if (!el) return;
                          el.dataset.isDragging = 'true';
                          el.dataset.startX = String(e.clientX);
                          el.dataset.scrollLeft = String(el.scrollLeft);
                          el.dataset.lastX = String(e.clientX);
                          el.dataset.velocity = '0';
                        }}
                        onMouseMove={(e) => {
                          const el = carouselRef.current;
                          if (!el || el.dataset.isDragging !== 'true') return;
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
                          el.dataset.isDragging = 'false';
                          // Apply momentum
                          const velocity = Number(el.dataset.velocity || 0);
                          if (Math.abs(velocity) > 2) {
                            el.scrollBy({ left: -velocity * 8, behavior: 'smooth' });
                          }
                        }}
                        onMouseLeave={() => {
                          const el = carouselRef.current;
                          if (!el) return;
                          if (el.dataset.isDragging === 'true') {
                            const velocity = Number(el.dataset.velocity || 0);
                            if (Math.abs(velocity) > 2) {
                              el.scrollBy({ left: -velocity * 8, behavior: 'smooth' });
                            }
                          }
                          el.dataset.isDragging = 'false';
                        }}
                        onTouchStart={(e) => {
                          const el = carouselRef.current;
                          if (!el) return;
                          el.dataset.isDragging = 'true';
                          el.dataset.startX = String(e.touches[0].clientX);
                          el.dataset.scrollLeft = String(el.scrollLeft);
                          el.dataset.lastX = String(e.touches[0].clientX);
                          el.dataset.velocity = '0';
                        }}
                        onTouchMove={(e) => {
                          const el = carouselRef.current;
                          if (!el || el.dataset.isDragging !== 'true') return;
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
                          el.dataset.isDragging = 'false';
                          const velocity = Number(el.dataset.velocity || 0);
                          if (Math.abs(velocity) > 2) {
                            el.scrollBy({ left: -velocity * 8, behavior: 'smooth' });
                          }
                        }}
                      >
                          {/* Left spacer for centering first card */}
                          <div className="flex-shrink-0 w-[calc(50%-70px)] md:w-[calc(50%-80px)]" />
                          
                          {tourData.stops.map((stop, index) => {
                            const isCorrectResult = quizResults[index];
                            const image = stopImages[index];
                            
                            return (
                              <div 
                                key={index} 
                                className="carousel-card flex-shrink-0 w-28 h-44 md:w-36 md:h-52 relative transition-all duration-300 ease-out"
                                style={{ transformStyle: 'preserve-3d' }}
                              >
                                <div className={`h-full bg-white/5 backdrop-blur-2xl rounded-lg border transition-all duration-300 relative overflow-hidden flex flex-col p-1 shadow-glass-bubble group/card 
                                  ${isCorrectResult ? 'border-accent/30' : 'border-red-500/30'}
                                `}>
                                    <div className="absolute inset-0 bg-glossy-gradient opacity-10 pointer-events-none" />
                                    
                                    <div className="w-full aspect-[4/5] rounded-md overflow-hidden relative shadow-inner bg-black border border-white/5 mb-1.5">
                                       <ExpeditionVisual 
                                         src={image} 
                                         alt={stop.stopName} 
                                         className={`w-full h-full object-cover transition-all duration-500 pointer-events-none ${isCorrectResult ? 'brightness-110' : 'grayscale brightness-50 opacity-40'}`}
                                         draggable={false}
                                       />
                                       
                                       {/* Status Badge */}
                                       <div className="absolute top-1.5 right-1.5 z-10">
                                          {isCorrectResult ? (
                                            <div className="w-5 h-5 rounded-md bg-accent/90 flex items-center justify-center text-white border border-white/30 backdrop-blur-md">
                                               <Trophy size={10} />
                                            </div>
                                          ) : (
                                            <div className="w-5 h-5 rounded-md bg-red-500/90 flex items-center justify-center text-white border border-white/30 backdrop-blur-md">
                                               <X size={10} />
                                            </div>
                                          )}
                                       </div>
                                       
                                       <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-transparent to-white/10 pointer-events-none" />
                                    </div>

                                    <div className="flex-1 flex flex-col justify-center px-1.5">
                                      <p className="text-[7px] md:text-[8px] font-black text-white/80 uppercase tracking-wider leading-tight line-clamp-2 text-center drop-shadow-sm group-hover/card:text-white transition-colors">
                                        {stop.stopName}
                                      </p>
                                      <div className={`mt-1 h-0.5 w-4 mx-auto rounded-full transition-all duration-300 group-hover/card:w-8 ${isCorrectResult ? 'bg-accent/40' : 'bg-red-500/40'}`} />
                                    </div>
                                    
                                    {/* Advanced Glass Texture */}
                                    <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-white/5 pointer-events-none" />
                                </div>
                              </div>
                            );
                          })}
                          
                          {/* Right spacer for centering last card */}
                          <div className="flex-shrink-0 w-[calc(50%-70px)] md:w-[calc(50%-80px)]" />
                      </div>

                      {/* Right Navigation Button */}
                      <button 
                        onClick={() => scrollCarousel('right')} 
                        className="absolute right-2 z-50 w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-xl bg-black/60 backdrop-blur-xl border border-white/10 hover:bg-white/10 hover:border-sky/50 transition-all shadow-lg group/btn"
                        aria-label="Scroll Right"
                      >
                         <ChevronRight size={20} className="text-white/40 group-hover/btn:text-white transition-colors" />
                      </button>
                      
                      {/* Edge Mask Gaps - Rounded */}
                      <div className="absolute inset-y-2 left-2 w-16 bg-gradient-to-r from-black/40 to-transparent pointer-events-none z-10 hidden md:block rounded-l-2xl" />
                      <div className="absolute inset-y-2 right-2 w-16 bg-gradient-to-l from-black/40 to-transparent pointer-events-none z-10 hidden md:block rounded-r-2xl" />
                   </div>
                </div>

                {/* Action Controls: Compact */}
                <div className="flex flex-col gap-2 max-w-xs mx-auto relative z-10 border-t border-white/5 pt-4">
                  <Button 
                    onClick={restartTour} 
                    variant="primary" 
                    size="md" 
                    className="w-full h-10 text-xs uppercase tracking-widest shadow-glow-sky border border-white/20 flex items-center justify-center gap-2 group/restart rounded-full"
                  >
                    <RotateCcw size={14} className="group-hover/restart:rotate-[-180deg] transition-transform duration-700" /> RESTART TOUR
                  </Button>
                  
                  <button 
                    onClick={() => navigate(`/country/${country.id}`)}
                    className="w-full py-1.5 text-[9px] font-black text-white/30 hover:text-white uppercase tracking-[0.3em] transition-all flex items-center justify-center gap-2 group/back"
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
        <div className="pt-32 text-center text-white p-10 bg-surface-dark min-h-screen flex flex-col items-center justify-center">
          <h2 className="text-2xl font-black uppercase mb-4">Display Error</h2>
          <p className="text-red-400 font-mono text-xs bg-black/50 p-4 rounded-xl border border-white/10 mb-8 max-w-md">
            {err.message}
          </p>
          <Button onClick={() => window.location.reload()} variant="primary">RELOAD EXPEDITION</Button>
        </div>
      );
    }
    return null;
  };

  return (
    <>
      {isTransitioning && createPortal(
        <div className={`fixed inset-0 z-[5000] flex items-center justify-center pointer-events-none [transform:translateZ(0)] [-webkit-transform:translateZ(0)] [backface-visibility:hidden] [-webkit-backface-visibility:hidden] ${transitionDirection === 'forward' ? 'animate-aero-wipe-full-forward' : 'animate-aero-wipe-full-backward'}`} aria-hidden="true">
          {/* Luminous Background Layer */}
          <div className="absolute inset-0 bg-surface-dark shadow-[0_0_100px_rgba(0,0,0,0.5)]">
             {/* Immersive Aurora Blobs */}
             <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-[-10%] left-[-10%] w-[70%] h-[70%] bg-sky/15 rounded-full blur-[120px] animate-pulse-slow" />
                <div className="absolute bottom-[-5%] right-[-5%] w-[60%] h-[60%] bg-accent/10 rounded-full blur-[100px] animate-pulse-slow delay-1000" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-white/[0.02] backdrop-blur-3xl" />
             </div>
             
             {/* Glass Texture */}
             <div className="absolute inset-0 bg-glossy-gradient opacity-20" />
          </div>

          {/* Icon visual */}
          <div className="relative z-10 flex flex-col items-center gap-8">
            <div className="relative">
                 <div className="absolute inset-0 bg-sky/20 rounded-full blur-3xl animate-pulse" />
               <div className="w-44 h-44 rounded-full bg-white/15 backdrop-blur-3xl border-2 border-white/40 flex items-center justify-center shadow-glass-bubble overflow-hidden relative">
                  <div className="absolute inset-0 bg-glossy-gradient opacity-40" />
                  <img 
                    src={`${import.meta.env.BASE_URL}logo.png`} 
                    alt="Loading" 
                    className="w-44 h-44 drop-shadow-[0_0_20px_rgba(0,194,255,0.5)] relative z-10 animate-pulse-scale"
                  />
                </div>
             </div>
             <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/70">
               {transitionDirection === 'forward' ? forwardTransitionText : backDestinationText}
             </span>
          </div>
        </div>,
        document.body
      )}

      <AnimatePresence mode="wait">
        {renderContent()}
      </AnimatePresence>
      <FeedbackOverlay type={isCorrect === null ? null : (isCorrect ? 'correct' : 'incorrect')} triggerKey={feedbackKey} />
    </>
  );
};

export default CountryExploration;
