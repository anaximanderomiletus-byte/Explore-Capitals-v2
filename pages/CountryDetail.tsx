
import React, { useEffect, useMemo, useState } from 'react';
import { getCountryCode, getFlagUrl } from '../utils/flags';
import { toSlug } from '../utils/slug';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft, Map, Compass, Navigation,
  Clock, Phone, Car, Users, Maximize2, Banknote,
  TrendingUp, Languages, Building2, AlertTriangle,
  MapPin, Globe, Play
} from 'lucide-react';
import { COUNTRIES, TERRITORIES, DE_FACTO_COUNTRIES } from '../constants';

import { getStaticImages } from '../data/images';
import { loadTours } from '../data/staticTours';
import { TourData } from '../types';
import { OFFICIAL_NAMES } from '../data/officialNames';

import Button from '../components/Button';
import SEO from '../components/SEO';
import Breadcrumbs from '../components/Breadcrumbs';
import { useLayout } from '../context/LayoutContext';
import { motion, AnimatePresence } from 'framer-motion';

const FALLBACK_SCENES = [
  "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1000&q=80",
  "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=1000&q=80",
  "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1000&q=80",
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1000&q=80"
];

const Polaroid: React.FC<{ 
  photo: { image: string, caption: string }, 
  rotation: number, 
  zIndex: number, 
  xOffset?: number,
  yOffset?: number,
  className?: string 
}> = ({ photo, rotation, zIndex, xOffset = 0, yOffset = 0, className = "" }) => (
  <div 
    className={`bg-[#FCFCFC] p-2 pb-8 sm:p-3 sm:pb-10 shadow-[0_10px_30px_rgba(0,0,0,0.3),0_0_0_1px_rgba(0,0,0,0.05)] rounded-sm flex flex-col items-center relative overflow-hidden flex-shrink-0 w-[220px] sm:w-[260px] lg:w-[280px] min-w-[220px] sm:min-w-[260px] lg:min-w-[280px] transition-all duration-500 hover:z-[100] hover:scale-105 hover:rotate-0 ${className}`}
    style={{ 
      transform: `rotate(${rotation}deg) translate(${xOffset}px, ${yOffset}px)`, 
      zIndex 
    }}
  >
    <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]" />
    <div className="w-full aspect-square overflow-hidden relative shadow-inner bg-[#F0F0EC]">
      <img src={photo.image} alt={photo.caption} className="w-full h-full object-cover brightness-[0.85] contrast-[1.05]" loading="lazy" decoding="async" />
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]" />
      <div className="absolute inset-0 shadow-[inset_0_0_50px_rgba(0,0,0,0.1)] pointer-events-none" />
    </div>
    <p className="mt-4 sm:mt-6 text-sm sm:text-lg font-cursive text-gray-600 text-center px-2 flex items-center justify-center gap-1.5 leading-tight">
      <MapPin size={12} className="text-sky/60 shrink-0" strokeWidth={2} />
      {photo.caption}
    </p>
  </div>
);

const InteractivePolaroidStack: React.FC<{ photos: { image: string, caption: string }[] }> = ({ photos }) => {
  const [currentIndex, setCurrentIndex] = React.useState(0);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % photos.length);
  };

  if (!photos.length) return null;

  return (
    <div className="relative w-[220px] sm:w-[260px] h-[320px] sm:h-[360px] mx-auto select-none touch-none">
      <AnimatePresence initial={false}>
        {photos.map((photo, i) => {
          // Calculate relative position in stack
          const position = (i - currentIndex + photos.length) % photos.length;
          const isTop = position === 0;
          
          // Only show top 4 cards for performance and visual clarity
          if (position > 3) return null;

          return (
            <motion.div
              key={photo.image}
              className="absolute inset-0 flex justify-center"
              style={{ zIndex: photos.length - position }}
              initial={false}
              animate={{
                x: isTop ? 0 : (position * 4),
                y: isTop ? 0 : (position * 4),
                rotate: isTop ? 0 : (position * 4 * (i % 2 === 0 ? 1 : -1)),
                scale: isTop ? 1 : 1 - (position * 0.04),
                opacity: 1 - (position * 0.2),
                filter: isTop ? "blur(0px)" : `blur(${position * 0.5}px)`,
              }}
              transition={{ 
                type: "spring", 
                stiffness: 300, 
                damping: 25 
              }}
              drag={isTop ? "x" : false}
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={(_, info) => {
                if (Math.abs(info.offset.x) > 80 || Math.abs(info.velocity.x) > 500) {
                  handleNext();
                }
              }}
              onClick={isTop ? handleNext : undefined}
              whileTap={isTop ? { scale: 0.98 } : {}}
            >
              <Polaroid photo={photo} rotation={0} zIndex={1} />
            </motion.div>
          );
        })}
      </AnimatePresence>
      
      {/* Interaction Hint */}
      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 opacity-40">
        <div className="flex gap-1">
          {photos.map((_, i) => (
            <div 
              key={i} 
              className={`w-1 h-1 rounded-full transition-all duration-300 ${i === currentIndex ? 'bg-sky-light w-3' : 'bg-white/20'}`} 
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const CountryDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { setPageLoading, setTransitionStyle } = useLayout();

  const [images, setImages] = useState<Record<string, string>>({});
  const [tours, setTours] = useState<Record<string, TourData>>({});
  const [showPage, setShowPage] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loadingStep, setLoadingStep] = useState(0);
  const [minTimeElapsed, setMinTimeElapsed] = useState(false);

  const loadingMessages = [
    'Scanning coordinates...',
    'Loading terrain data...',
    'Retrieving imagery...',
    'Fetching country intel...',
    'Compiling dossier...',
    'Preparing briefing...',
  ];

  useEffect(() => {
    setPageLoading(false);
    getStaticImages().then(setImages);
    loadTours().then(setTours);
  }, [setPageLoading]);

  const dataLoaded = Object.keys(images).length > 0 && Object.keys(tours).length > 0;

  // Minimum display time
  useEffect(() => {
    const timer = setTimeout(() => setMinTimeElapsed(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  // Loading progress + messages
  useEffect(() => {
    if (showPage) return;
    const canFinish = dataLoaded && minTimeElapsed;

    const stepInterval = setInterval(() => {
      setLoadingStep(prev => (prev + 1) % loadingMessages.length);
    }, 1100);

    const progressInterval = setInterval(() => {
      setLoadingProgress(prev => {
        if (canFinish) {
          if (prev >= 100) { clearInterval(progressInterval); return 100; }
          return Math.min(prev + 5, 100);
        }
        if (prev >= 65) return prev;
        return prev + 0.7;
      });
    }, 80);

    return () => { clearInterval(stepInterval); clearInterval(progressInterval); };
  }, [dataLoaded, minTimeElapsed, showPage]);

  // Transition once ready
  useEffect(() => {
    if (loadingProgress >= 100 && dataLoaded && minTimeElapsed && !showPage) {
      const timer = setTimeout(() => setShowPage(true), 500);
      return () => clearTimeout(timer);
    }
  }, [loadingProgress, dataLoaded, minTimeElapsed, showPage]);

  const country = useMemo(() => {
    // Match by numeric id first, then by name slug
    return COUNTRIES.find(c => c.id === id || toSlug(c.name) === id)
      || TERRITORIES.find(t => t.id === id || toSlug(t.name) === id)
      || DE_FACTO_COUNTRIES.find(d => d.id === id || toSlug(d.name) === id);
  }, [id]);
  const isTerritory = useMemo(() => TERRITORIES.some(t => t.id === id || toSlug(t.name) === id), [id]);
  const isDeFacto = useMemo(() => DE_FACTO_COUNTRIES.some(d => d.id === id || toSlug(d.name) === id), [id]);

  const controlledTerritories = useMemo(() => {
    if (!country || isTerritory || isDeFacto) return [];
    return (TERRITORIES as any[]).filter(t => t.sovereignty === country.name).sort((a, b) => a.name.localeCompare(b.name));
  }, [country, isTerritory, isDeFacto]);

  // Determine scenic image and caption for the secondary card
  const scenicData = useMemo(() => {
      if (!country || !dataLoaded) return { image: '', caption: '' };
      
      // 1. Try Country Main Image (Usually Capital or Iconic)
      if (images[country.name]) {
          return { image: images[country.name], caption: `${country.capital}, ${country.name}` };
      }

      // 2. Try Tour Stop Image
      const tourData = tours[country.name];
      if (tourData && tourData.stops.length > 0) {
          const stop = tourData.stops[0];
          const img = images[stop.imageKeyword || stop.stopName];
          if (img) return { image: img, caption: `${stop.stopName}, ${country.name}` };
      }

      // 3. Fallback
      const idx = (country.id.charCodeAt(0) + country.name.length) % FALLBACK_SCENES.length;
      return { image: FALLBACK_SCENES[idx], caption: `${country.capital}, ${country.name}` };
  }, [country, dataLoaded]);

  // All available photos for the expedition section
  const expeditionPhotos = useMemo(() => {
    if (!country || !dataLoaded) return [];
    const photos: { image: string; caption: string }[] = [];
    
    // 1. Try country main image first
    if (images[country.name]) {
      photos.push({ image: images[country.name], caption: country.capital });
    }
    
    // 2. Pull all images from tour stops
    const tourData = tours[country.name];
    if (tourData?.stops) {
      for (const stop of tourData.stops) {
        const img = images[stop.imageKeyword || stop.stopName];
        if (img && !photos.some(p => p.image === img)) {
          photos.push({ image: img, caption: stop.stopName });
        }
      }
    }
    
    // 3. Fallbacks if we have very few images (ensure at least 3 for a "stack" look if available)
    let fallbackCount = 0;
    while (photos.length < 3 && fallbackCount < FALLBACK_SCENES.length) {
      const idx = (country.id.charCodeAt(0) + photos.length) % FALLBACK_SCENES.length;
      const fallback = FALLBACK_SCENES[idx];
      if (!photos.some(p => p.image === fallback)) {
        photos.push({ image: fallback, caption: country.capital });
      }
      fallbackCount++;
    }
    
    return photos;
  }, [country, dataLoaded]);

  const officialName = useMemo(() => {
    if (!country) return '';
    return OFFICIAL_NAMES[country.name] || country.name;
  }, [country]);

  if (!country) {
    return (
      <div className="pt-32 pb-20 px-6 bg-surface-dark min-h-screen flex flex-col items-center justify-center text-center relative overflow-hidden">
        {/* Background Decor */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-[-20%] left-[-10%] w-[100%] h-[100%] bg-sky/20 rounded-full blur-3xl opacity-60" />
        </div>

        <div className="bg-white/5 backdrop-blur-3xl p-12 rounded-[3rem] border border-white/10 relative z-10 max-w-md">
          <AlertTriangle size={64} className="mx-auto text-warning mb-8" />
          <h2 className="text-3xl font-display font-black text-white uppercase tracking-tighter drop-shadow-lg">Location Unknown</h2>
          <p className="text-white/40 mt-4 mb-10 text-sm font-medium uppercase tracking-[0.2em] leading-relaxed">The coordinates for this territory are not present in our global database.</p>
          
          <button 
            onClick={() => navigate('/database')} 
            className="group flex items-center justify-center gap-3 text-[10px] font-black uppercase tracking-[0.4em] text-white/40 hover:text-sky transition-all mx-auto"
          >
            <ArrowLeft size={14} className="transition-transform" />
            BACK TO DATABASE
          </button>
        </div>
      </div>
    );
  }

  const handleNeighborClick = (neighborName: string) => {
    const exists = COUNTRIES.some(c => c.name.toLowerCase() === neighborName.toLowerCase())
      || DE_FACTO_COUNTRIES.some(d => d.name.toLowerCase() === neighborName.toLowerCase());
    if (exists) {
      setTransitionStyle('cartographic');
      navigate(`/country/${toSlug(neighborName)}`);
    } else {
      setTransitionStyle('default');
      navigate(`/database?search=${neighborName}`);
    }
  };

  const handleTerritoryClick = (territoryName: string) => {
    setTransitionStyle('cartographic');
    navigate(`/country/${toSlug(territoryName)}`);
  };

  const handleSovereigntyClick = (sovereigntyName: string) => {
    if (sovereigntyName === 'Disputed' || sovereigntyName === 'Limited Recognition') return;

    const exists = COUNTRIES.some(c => c.name.toLowerCase() === sovereigntyName.toLowerCase())
      || DE_FACTO_COUNTRIES.some(d => d.name.toLowerCase() === sovereigntyName.toLowerCase());
    if (exists) {
      setTransitionStyle('cartographic');
      navigate(`/country/${toSlug(sovereigntyName)}`);
    } else {
      setTransitionStyle('default');
      navigate(`/database?search=${sovereigntyName}`);
    }
  };

  // Calculate ISO code for the flag image
  const countryCode = getCountryCode(country.flag);

  // Stats data array for cleaner rendering
  const statsData = [
    { label: 'Capital', value: country.capital, icon: Building2 },
    { label: 'Population', value: country.population, icon: Users },
    { label: 'Area', value: `${country.area} km²`, icon: Maximize2 },
    { label: 'Currency', value: country.currency, icon: Banknote },
    { label: 'GDP', value: country.gdp || '—', icon: TrendingUp },
    { label: 'Time Zone', value: country.timeZone || '—', icon: Clock },
    { label: 'Calling Code', value: country.callingCode || '—', icon: Phone },
    { label: 'Driving Side', value: `${country.driveSide || 'Right'}-hand`, icon: Car },
  ];

  // Build structured data for Google / rich results
  const countryType = isTerritory ? 'Territory' : isDeFacto ? 'State' : 'Country';
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Country',
    name: country.name,
    alternateName: OFFICIAL_NAMES[country.name] || undefined,
    description: country.description,
    url: `https://explorecapitals.com/country/${toSlug(country.name)}`,
    capital: country.capital ? { '@type': 'City', name: country.capital } : undefined,
    containedInPlace: { '@type': 'Place', name: country.region },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: country.lat,
      longitude: country.lng,
    },
    additionalProperty: [
      { '@type': 'PropertyValue', name: 'Population', value: country.population },
      { '@type': 'PropertyValue', name: 'Area', value: `${country.area} km²` },
      { '@type': 'PropertyValue', name: 'Currency', value: country.currency },
      ...(country.gdp ? [{ '@type': 'PropertyValue', name: 'GDP', value: country.gdp }] : []),
      ...(country.timeZone ? [{ '@type': 'PropertyValue', name: 'Time Zone', value: country.timeZone }] : []),
      ...(country.callingCode ? [{ '@type': 'PropertyValue', name: 'Calling Code', value: country.callingCode }] : []),
      ...(country.languages?.length ? [{ '@type': 'PropertyValue', name: 'Languages', value: country.languages.join(', ') }] : []),
    ],
    isPartOf: {
      '@type': 'WebSite',
      name: 'ExploreCapitals',
      url: 'https://explorecapitals.com',
    },
  };

  if (!showPage) {
    return (
      <motion.div
        key="country-loading"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="min-h-screen bg-surface-dark relative flex items-center justify-center px-4 pt-28 pb-12 overflow-hidden">
          <SEO title={`Loading ${country.name}`} description={`Preparing ${country.name} country profile.`} />

          {/* Background effects */}
          <div className="absolute inset-0 z-0 opacity-20"
            style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.05) 1px, transparent 0)`,
              backgroundSize: '40px 40px'
            }}
          />
          <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden opacity-30">
            <div className="w-full h-[2px] bg-sky-light/50 blur-sm absolute top-0 left-0 animate-scan-line" />
          </div>
          <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
            <div className="absolute top-[-20%] left-[-10%] w-[120%] h-[120%] bg-sky/15 rounded-full blur-3xl opacity-80" />
            <div className="absolute bottom-[-20%] right-[-10%] w-[100%] h-[100%] bg-accent/8 rounded-full blur-3xl opacity-60" />
          </div>

          <div className="relative z-10 w-full max-w-lg flex flex-col items-center">
            <div className="w-full bg-black/40 backdrop-blur-3xl rounded-[2.5rem] p-8 md:p-12 text-center border border-white/10 relative overflow-hidden">
              {/* Glass Sheen */}
              <div className="absolute inset-0 bg-gradient-to-tr from-white/5 via-transparent to-white/10 pointer-events-none" />

              {/* Corner Brackets */}
              <div className="absolute top-6 left-6 w-10 h-10 border-t-2 border-l-2 border-sky/30 rounded-tl-2xl" />
              <div className="absolute top-6 right-6 w-10 h-10 border-t-2 border-r-2 border-sky/30 rounded-tr-2xl" />
              <div className="absolute bottom-6 left-6 w-10 h-10 border-b-2 border-l-2 border-sky/30 rounded-bl-2xl" />
              <div className="absolute bottom-6 right-6 w-10 h-10 border-b-2 border-r-2 border-sky/30 rounded-br-2xl" />

              {/* Flag with orbitals */}
              <div className="mb-8 relative pt-4">
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-48 h-4 bg-sky/20 blur-2xl rounded-full animate-pulse" />
                <div className="relative z-10 w-36 h-auto mx-auto mb-4 animate-float-slow">
                  <img
                    src={getFlagUrl(country.flag)}
                    alt={`${country.name} Flag`}
                    className="w-full h-auto object-contain relative z-10"
                  />
                </div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-56 border border-sky/10 rounded-full animate-spin-slow opacity-20" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 border border-dashed border-white/5 rounded-full animate-reverse-spin opacity-20" />
              </div>

              {/* Status Badge */}
              <div className="space-y-4 mb-10">
                <div className="inline-flex items-center gap-3 px-5 py-2 bg-sky/10 rounded-full border border-white/10 mb-2 shadow-inner">
                  <div className="w-2 h-2 rounded-full bg-sky animate-ping" />
                  <span className="text-[10px] font-black text-sky-light uppercase tracking-[0.5em]">
                    {loadingProgress < 100 ? 'Scanning Region' : 'Region Locked'}
                  </span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-[10px] text-white/40 tracking-[0.4em] uppercase mb-1 font-black">Destination</span>
                  <h1 className="text-3xl md:text-5xl font-display font-black text-white tracking-tighter uppercase leading-tight">
                    {country.name}
                  </h1>
                </div>
              </div>

              {/* Progress */}
              <div className="relative w-full mb-10 px-4">
                <div className="flex justify-between items-end mb-3 px-1">
                  <div className="flex flex-col items-start">
                    <span className="text-[9px] font-black text-white/40 uppercase tracking-widest">Loading</span>
                    <div className="h-0.5 w-8 bg-sky/40 rounded-full mt-1" />
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-display font-black text-white tabular-nums">{Math.round(loadingProgress)}</span>
                    <span className="text-[10px] font-black text-sky-light tracking-widest">%</span>
                  </div>
                </div>
                <div className="w-full h-3 bg-white/5 rounded-full overflow-hidden border border-white/10 shadow-inner p-0.5 relative">
                  <div
                    className="h-full bg-gradient-to-r from-sky via-sky-light to-sky transition-all duration-300 ease-out rounded-full relative"
                    style={{ width: `${loadingProgress}%` }}
                  >
                    <div className="absolute inset-0 w-full h-full animate-shimmer bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.6),transparent)] bg-[length:200%_100%]" />
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full blur-md opacity-80" />
                  </div>
                </div>
                <div className="flex gap-1.5 mt-4 justify-center">
                  {[...Array(8)].map((_, i) => (
                    <div key={i} className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${loadingProgress > (i * 12.5) ? 'bg-sky' : 'bg-white/5 border border-white/5'}`} />
                  ))}
                </div>
              </div>

              {/* Loading Message */}
              <div className="h-5 mb-2">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={loadingStep}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.25 }}
                    className="text-[10px] font-bold text-white/30 uppercase tracking-[0.3em]"
                  >
                    {loadingMessages[loadingStep]}
                  </motion.p>
                </AnimatePresence>
              </div>
            </div>

            {/* Terminal readouts */}
            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-1 justify-center opacity-30">
              <span className="text-[8px] font-mono text-white/60 tracking-wider">
                LAT: {Math.abs(country.lat).toFixed(4)}{country.lat >= 0 ? 'N' : 'S'}
              </span>
              <span className="text-[8px] font-mono text-white/60 tracking-wider">
                LNG: {Math.abs(country.lng).toFixed(4)}{country.lng >= 0 ? 'E' : 'W'}
              </span>
              <span className="text-[8px] font-mono text-white/60 tracking-wider">
                REGION: {country.region}
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.main
      key="country-content"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-surface-dark pt-24 pb-12 relative overflow-hidden text-white"
    >
      <SEO
        title={country.name}
        description={`${country.name} country profile: capital ${country.capital}, population ${country.population}, area ${country.area} km², currency ${country.currency}. ${country.description?.slice(0, 120)}...`}
        keywords={`${country.name}, ${country.capital}, ${country.region}, ${country.name} facts, ${country.name} capital, ${country.name} population, geography`}
        structuredData={structuredData}
      />

      {/* ══════════ HERO BANNER ══════════ */}
      <section className="relative w-full h-[240px] sm:h-[300px] lg:h-[320px] overflow-hidden -mt-24 pt-24">
        {/* Scenic Background */}
        {scenicData?.image ? (
          <img
            src={scenicData.image}
            alt=""
            className="absolute inset-0 w-full h-full object-cover scale-[1.02]"
            aria-hidden="true"
            loading="eager"
            decoding="async"
            fetchPriority="high"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-sky/20 via-surface-dark to-surface-dark" />
        )}
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-surface-dark via-surface-dark/50 to-surface-dark/15 pointer-events-none" />
        <div className="absolute inset-0 bg-surface-dark/15 pointer-events-none" />
        
        {/* Back button */}
        <div className="relative z-20 px-4 sm:px-6 md:px-8 pt-4">
          <div className="max-w-4xl mx-auto">
            <button 
              onClick={() => navigate('/database')}
              className="group flex items-center gap-2 sm:gap-3 text-[8px] sm:text-[10px] font-black uppercase tracking-[0.4em] text-white/50 hover:text-white transition-all w-fit backdrop-blur-sm bg-black/10 rounded-full px-3 py-1.5 sm:px-4 sm:py-2"
            >
              <ArrowLeft size={11} strokeWidth={2.5} className="sm:w-[13px] sm:h-[13px] transition-transform group-hover:-translate-x-0.5" />
              DIRECTORY
            </button>
          </div>
        </div>
      </section>

      {/* ══════════ CONTENT ══════════ */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 relative z-10 -mt-20 sm:-mt-20 lg:-mt-24">
        <Breadcrumbs items={[
          { label: 'Home', href: '/' },
          { label: 'Database', href: '/database' },
          { label: country.name },
        ]} />

        {/* Country Identity — stacked on mobile, side-by-side on desktop */}
        {/* Desktop: Flag left + text right */}
        <section className="hidden md:flex items-center gap-5 mb-6">
          <div className="w-[88px] h-[88px] lg:w-[104px] lg:h-[104px] shrink-0 flex items-center justify-center">
            <img src={`/flags/${countryCode}.png`} alt={`${country.name} Flag`} className="w-full h-full object-contain" />
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="text-4xl xl:text-5xl font-display font-black text-white uppercase tracking-tighter leading-[0.9] drop-shadow-[0_4px_16px_rgba(0,0,0,0.4)]">
              {country.name}
            </h1>
            {officialName !== country.name && (
              <p className="text-sm text-white/40 font-display font-bold italic mt-1.5 truncate">{officialName}</p>
            )}
            <div className="flex items-center gap-2 mt-2.5 flex-wrap">
              <span className="text-[9px] font-black text-white/50 uppercase tracking-[0.2em] bg-white/10 px-2.5 py-1 rounded-full border border-white/10">{country.region}</span>
              {isTerritory && <span className="text-[9px] font-black text-accent uppercase tracking-[0.2em] bg-accent/15 px-2.5 py-1 rounded-full border border-accent/20">TERRITORY</span>}
              {isDeFacto && <span className="text-[9px] font-black text-warning uppercase tracking-[0.2em] bg-warning/15 px-2.5 py-1 rounded-full border border-warning/20">DE FACTO</span>}
            </div>
            {isTerritory && (country as any).sovereignty && (
              <p className="text-[9px] font-bold text-white/30 uppercase tracking-[0.15em] mt-2">
                Territory of{' '}
                <button onClick={() => handleSovereigntyClick((country as any).sovereignty)} className="text-sky hover:text-sky-light transition-colors underline underline-offset-2 decoration-sky/30 uppercase">{(country as any).sovereignty}</button>
              </p>
            )}
            {isDeFacto && (
              <p className="text-[9px] font-bold text-warning/70 uppercase tracking-[0.15em] mt-2 flex items-center gap-1.5">
                <AlertTriangle size={10} />
                {(country as any).sovereignty || 'LIMITED RECOGNITION'}
              </p>
            )}
          </div>
        </section>

        {/* Mobile/Tablet: Flag → Name → Badges stacked */}
        <section className="md:hidden mb-8">
          <div className="mb-2.5">
            <div className="w-[64px] h-[64px] sm:w-[72px] sm:h-[72px] flex items-center justify-center">
              <img src={`/flags/${countryCode}.png`} alt={`${country.name} Flag`} className="w-full h-full object-contain" />
            </div>
          </div>
          <h2 className="text-2xl sm:text-3xl font-display font-black text-white uppercase tracking-tighter leading-[0.9] drop-shadow-[0_4px_16px_rgba(0,0,0,0.4)]">
            {country.name}
          </h2>
          {officialName !== country.name && (
            <p className="text-xs sm:text-sm text-white/40 font-display font-bold italic mt-1 truncate">{officialName}</p>
          )}
          <div className="flex items-center gap-2 mt-2 flex-wrap">
            <span className="text-[8px] sm:text-[9px] font-black text-white/50 uppercase tracking-[0.2em] bg-white/10 px-2.5 py-1 rounded-full border border-white/10">{country.region}</span>
            {isTerritory && <span className="text-[8px] sm:text-[9px] font-black text-accent uppercase tracking-[0.2em] bg-accent/15 px-2.5 py-1 rounded-full border border-accent/20">TERRITORY</span>}
            {isDeFacto && <span className="text-[8px] sm:text-[9px] font-black text-warning uppercase tracking-[0.2em] bg-warning/15 px-2.5 py-1 rounded-full border border-warning/20">DE FACTO</span>}
          </div>
          {isTerritory && (country as any).sovereignty && (
            <p className="text-[9px] font-bold text-white/30 uppercase tracking-[0.15em] mt-2">
              Territory of{' '}
              <button onClick={() => handleSovereigntyClick((country as any).sovereignty)} className="text-sky hover:text-sky-light transition-colors underline underline-offset-2 decoration-sky/30 uppercase">{(country as any).sovereignty}</button>
            </p>
          )}
          {isDeFacto && (
            <p className="text-[9px] font-bold text-warning/70 uppercase tracking-[0.15em] mt-2 flex items-center gap-1.5">
              <AlertTriangle size={10} />
              {(country as any).sovereignty || 'LIMITED RECOGNITION'}
            </p>
          )}
        </section>

        {/* Description */}
        <section>
          <p className="text-lg sm:text-xl lg:text-2xl font-display font-medium italic leading-relaxed text-white/75 tracking-tight">
            &ldquo;{country.description}&rdquo;
          </p>
        </section>

        {/* Gradient divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent my-6 sm:my-8" />

        {/* All Stats */}
        <section className="grid grid-cols-2 sm:grid-cols-4 gap-x-6 sm:gap-x-8 gap-y-6 sm:gap-y-8">
          {statsData.map(({ label, value, icon: Icon }) => (
            <div key={label}>
              <div className="flex items-center gap-1.5 mb-1.5">
                <Icon size={13} className="text-sky-light/40" />
                <span className="text-[9px] font-bold text-white/30 uppercase tracking-[0.12em]">{label}</span>
              </div>
              <p className="text-sm sm:text-base font-display font-black text-white/80">{value}</p>
            </div>
          ))}
        </section>

        {/* Territories */}
        {controlledTerritories.length > 0 && (
          <>
            <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent my-8 sm:my-10" />
            <section>
              <p className="text-[9px] sm:text-[10px] font-black text-accent/60 uppercase tracking-[0.25em] mb-4">Territories</p>
              <div className="flex flex-wrap gap-2">
                {controlledTerritories.map(t => (
                  <button 
                    key={t.id} 
                    onClick={() => handleTerritoryClick(t.name)}
                    className="text-xs font-bold uppercase tracking-[0.08em] px-4 py-2 bg-accent/5 text-accent/65 rounded-xl border border-accent/10 hover:border-accent/30 hover:bg-accent/10 hover:text-accent transition-all duration-300"
                  >
                    {t.name}
                  </button>
                ))}
              </div>
            </section>
          </>
        )}

        {/* Gradient divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent my-8 sm:my-10" />

        {/* Languages */}
        <section>
          <p className="text-[9px] sm:text-[10px] font-black text-sky-light/60 uppercase tracking-[0.25em] mb-4 flex items-center gap-2">
            <Languages size={14} /> Languages
          </p>
          <div className="flex flex-wrap gap-2">
            {country.languages.map(lang => (
              <span key={lang} className="px-4 py-2 bg-white/[0.06] border border-white/10 rounded-xl text-xs font-bold uppercase tracking-[0.08em] text-white/60 hover:bg-white/10 hover:text-white/80 transition-all cursor-default">
                {lang}
              </span>
            ))}
          </div>
        </section>

        {/* Borders */}
        {country.borders && country.borders.length > 0 && (
          <>
            <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent my-8 sm:my-10" />
            <section>
              <p className="text-[9px] sm:text-[10px] font-black text-white/25 uppercase tracking-[0.25em] mb-4 flex items-center gap-2">
                <Navigation size={14} className="text-white/15" /> Bordering Countries
              </p>
              <div className="flex flex-wrap gap-2">
                {country.borders.map(border => (
                  <button 
                    key={border} 
                    onClick={() => handleNeighborClick(border)}
                    className="text-xs font-bold uppercase tracking-[0.08em] px-4 py-2 bg-white/[0.06] text-white/50 rounded-xl border border-white/10 hover:border-sky/30 hover:bg-sky/10 hover:text-sky transition-all duration-300"
                  >
                    {border}
                  </button>
                ))}
              </div>
            </section>
          </>
        )}

        {/* Gradient divider */}
        <div className={`h-px bg-gradient-to-r from-transparent via-white/10 to-transparent ${isTerritory || isDeFacto ? 'my-6 sm:my-8' : 'my-8 sm:my-10'}`} />

        {/* Coordinates + Actions — flanked by polaroids on desktop */}
        <section>
          {/* Mobile/Tablet: Interactive Tour location photographs stack */}
          {expeditionPhotos.length > 0 && (
            <div className="md:hidden flex justify-center mb-16 mt-4 overflow-visible">
              <InteractivePolaroidStack photos={expeditionPhotos} />
            </div>
          )}
        </section>
      </div>

      {/* Full-width polaroid + CTA section — breaks out of max-w-4xl for wider photos */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 relative z-10 overflow-visible">
        <section className="overflow-visible">
          <div className="md:grid md:grid-cols-[1fr_auto_1fr] md:gap-8 lg:gap-12 md:items-center overflow-visible">
            {/* Left polaroid stack (desktop only) */}
            <div className="hidden md:flex justify-end relative w-full h-[320px] lg:h-[360px] overflow-visible">
              {expeditionPhotos.filter((_, i) => i % 2 === 0).map((photo, i) => {
                const rotations = [-5, 4, -2, 6];
                const xOffsets = [-15, 10, -5, 12];
                const yOffsets = [10, -8, 15, -5];
                return (
                  <div key={i} className="absolute inset-0 flex justify-end">
                    <Polaroid 
                      photo={photo} 
                      rotation={rotations[i % rotations.length]} 
                      zIndex={10 - i}
                      xOffset={xOffsets[i % xOffsets.length]}
                      yOffset={yOffsets[i % yOffsets.length]}
                    />
                  </div>
                );
              })}
            </div>

            {/* Center: coordinates + CTA */}
            <div className="flex flex-col items-center text-center gap-6 sm:gap-7 py-2 md:px-2 lg:px-4">
              {/* Coordinates */}
              <div className="flex flex-col items-center gap-2.5">
                <span className="text-[8px] font-black text-white/20 uppercase tracking-[0.3em]">Coordinates</span>
                <div className="inline-flex items-center gap-3 sm:gap-5">
                  <span className="font-display font-black text-sm sm:text-base tracking-[0.08em] text-white/70 tabular-nums">
                    {Math.abs(country.lat).toFixed(4)}° {country.lat >= 0 ? 'N' : 'S'}
                  </span>
                  <div className="w-1.5 h-1.5 rounded-full bg-sky-light animate-pulse" />
                  <span className="font-display font-black text-sm sm:text-base tracking-[0.08em] text-white/70 tabular-nums">
                    {Math.abs(country.lng).toFixed(4)}° {country.lng >= 0 ? 'E' : 'W'}
                  </span>
                </div>
              </div>

              {/* Expedition CTA — show for all entries that have tour data */}
              {tours[country.name]?.stops?.length > 0 && (
                <Link to={`/expedition/${toSlug(country.name)}`} className="block w-[80vw] max-w-[384px] mx-auto">
                  <Button variant="primary" className="w-full aspect-[4.8] text-[clamp(18px,7.5vw,30px)] uppercase tracking-widest font-black flex items-center justify-center p-0">
                    TRAVEL <Play className="ml-2 w-[min(7.5vw,36px)] h-[min(7.5vw,36px)]" fill="currentColor" />
                  </Button>
                </Link>
              )}

              {/* Map link */}
              <Link
                to={`/map?country=${country.id}`}
                className="group flex items-center gap-2 text-[10px] font-black text-white/30 hover:text-sky transition-all uppercase tracking-[0.2em]"
              >
                <Map size={14} className="text-sky/50 group-hover:text-sky transition-colors" />
                VIEW ON MAP
              </Link>

              {/* Back to Directory */}
              <button
                onClick={() => navigate('/database')}
                className="flex items-center gap-2.5 text-[10px] font-black uppercase tracking-[0.2em] text-white/15 hover:text-white/40 transition-colors"
              >
                <ArrowLeft size={12} strokeWidth={2.5} />
                Back to Directory
              </button>
            </div>

            {/* Right polaroid stack (desktop only) */}
            <div className="hidden md:flex justify-start relative w-full h-[320px] lg:h-[360px] overflow-visible">
              {expeditionPhotos.filter((_, i) => i % 2 !== 0).map((photo, i) => {
                const rotations = [5, -4, 3, -6];
                const xOffsets = [15, -12, 8, -10];
                const yOffsets = [12, 10, -5, 15];
                return (
                  <div key={i} className="absolute inset-0 flex justify-start">
                    <Polaroid 
                      photo={photo} 
                      rotation={rotations[i % rotations.length]} 
                      zIndex={10 - i}
                      xOffset={xOffsets[i % xOffsets.length]}
                      yOffset={yOffsets[i % yOffsets.length]}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </section>


      </div>
    </motion.main>
  );
};

export default CountryDetail;
