
import React, { useEffect, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Map, Compass, Navigation, Scroll, MapPin, 
  Clock, Phone, Car, Users, Maximize2, Banknote, 
  TrendingUp, Languages, Building2, Globe, AlertTriangle,
  ImageOff
} from 'lucide-react';
import { MOCK_COUNTRIES, TERRITORIES, DE_FACTO_COUNTRIES } from '../constants';
import { STATIC_IMAGES } from '../data/images';
import { staticTours } from '../data/staticTours';
import { OFFICIAL_NAMES } from '../data/officialNames';
import Button from '../components/Button';
import SEO from '../components/SEO';
import { useLayout } from '../context/LayoutContext';

const FALLBACK_SCENES = [
  "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1000&q=80",
  "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=1000&q=80",
  "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1000&q=80",
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1000&q=80"
];

const CountryDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { setPageLoading, setTransitionStyle } = useLayout();
  
  const country = useMemo(() => MOCK_COUNTRIES.find(c => c.id === id) || TERRITORIES.find(t => t.id === id) || DE_FACTO_COUNTRIES.find(d => d.id === id), [id]);
  const isTerritory = useMemo(() => TERRITORIES.some(t => t.id === id), [id]);
  const isDeFacto = useMemo(() => DE_FACTO_COUNTRIES.some(d => d.id === id), [id]);

  const controlledTerritories = useMemo(() => {
    if (!country || isTerritory || isDeFacto) return [];
    return TERRITORIES.filter(t => t.sovereignty === country.name).sort((a, b) => a.name.localeCompare(b.name));
  }, [country, isTerritory, isDeFacto]);

  // Determine scenic image and caption for the secondary card
  const scenicData = useMemo(() => {
      if (!country) return { image: '', caption: '' };
      
      // 1. Try Country Main Image (Usually Capital or Iconic)
      if (STATIC_IMAGES[country.name]) {
          return { image: STATIC_IMAGES[country.name], caption: `${country.capital}, ${country.name}` };
      }

      // 2. Try Tour Stop Image
      const tourData = staticTours[country.name];
      if (tourData && tourData.stops.length > 0) {
          const stop = tourData.stops[0];
          const img = STATIC_IMAGES[stop.imageKeyword || stop.stopName];
          if (img) return { image: img, caption: `${stop.stopName}, ${country.name}` };
      }

      // 3. Fallback
      const idx = (country.id.charCodeAt(0) + country.name.length) % FALLBACK_SCENES.length;
      return { image: FALLBACK_SCENES[idx], caption: `${country.capital}, ${country.name}` };
  }, [country]);

  useEffect(() => {
    setPageLoading(false);
  }, [setPageLoading, id]);

  if (!country) {
    return (
      <div className="pt-32 pb-20 px-6 bg-surface-dark min-h-screen flex flex-col items-center justify-center text-center relative overflow-hidden">
        {/* Background Decor */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-[-20%] left-[-10%] w-[100%] h-[100%] bg-sky/20 rounded-full blur-[150px] opacity-60 animate-pulse-slow" />
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

  // Helper to find country ID by name for bordering nations
  const getCountryIdByName = (name: string) => {
    return MOCK_COUNTRIES.find(c => c.name.toLowerCase() === name.toLowerCase())?.id 
        || DE_FACTO_COUNTRIES.find(d => d.name.toLowerCase() === name.toLowerCase())?.id;
  };

  const handleNeighborClick = (neighborName: string) => {
    const neighborId = getCountryIdByName(neighborName);
    if (neighborId) {
      setTransitionStyle('cartographic');
      navigate(`/country/${neighborId}`);
    } else {
      setTransitionStyle('default');
      navigate(`/database?search=${neighborName}`);
    }
  };

  const handleTerritoryClick = (territoryId: string) => {
    setTransitionStyle('cartographic');
    navigate(`/country/${territoryId}`);
  };

  const handleSovereigntyClick = (sovereigntyName: string) => {
    if (sovereigntyName === 'Disputed' || sovereigntyName === 'Limited Recognition') return;
    
    const sovereignId = getCountryIdByName(sovereigntyName);
    if (sovereignId) {
      setTransitionStyle('cartographic');
      navigate(`/country/${sovereignId}`);
    } else {
      setTransitionStyle('default');
      navigate(`/database?search=${sovereigntyName}`);
    }
  };

  // Calculate ISO code for the flag image
  const countryCode = Array.from(country.flag)
    .map((char: any) => String.fromCharCode(char.codePointAt(0)! - 127397).toLowerCase())
    .join('');

  const officialName = OFFICIAL_NAMES[country.name] || country.name;

  // Filter aliases to exclude the official name and the standard country name to avoid redundancy
  const filteredAliases = country.alsoKnownAs?.filter(alias => 
    alias !== officialName && alias !== country.name
  );

  // Reusable Stat Component for the card
  const StatItem = ({ label, value, icon: Icon }: { label: string, value: string | React.ReactNode, icon: any }) => (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <div className="p-1.5 bg-sky-light/15 rounded-lg text-sky-light border border-sky-light/30">
          <Icon size={14} />
        </div>
        <span className="text-[9px] font-black text-white/60 uppercase tracking-[0.2em]">{label}</span>
      </div>
      <p className="text-xl font-display font-black text-white tracking-tight leading-none pl-0.5">{value}</p>
    </div>
  );

  // Compact photo component for mobile/tablet inside the card (matches desktop polaroid style)
  const CompactPhoto = ({ 
    type, 
    src, 
    alt, 
    caption,
    region,
    badges
  }: { 
    type: 'flag' | 'location'; 
    src: string; 
    alt: string; 
    caption?: string;
    region?: string;
    badges?: { isTerritory?: boolean; isDeFacto?: boolean; sovereignty?: string };
  }) => (
    <div className="flex justify-center w-full py-2">
      <div className={`bg-[#FCFCFC] p-3 sm:p-4 pb-10 sm:pb-14 shadow-[0_25px_60px_rgba(0,0,0,0.4),0_0_0_1px_rgba(0,0,0,0.05)] rounded-sm transition-all duration-700 flex flex-col items-center relative overflow-hidden w-full max-w-[260px] sm:max-w-sm ${type === 'flag' ? '-rotate-1' : 'rotate-2'}`}>
        {/* Subtle Paper Texture */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]" />
        
        <div className={`w-full ${type === 'flag' ? 'aspect-[4/3]' : 'aspect-square'} bg-[#F5F5F0] overflow-hidden relative shadow-inner`}>
          {type === 'flag' ? (
            <>
              {/* Static Ink Stamp for flag */}
              <div className="absolute top-4 right-4 z-20 transform rotate-12 opacity-[0.15] pointer-events-none flex items-center justify-center scale-50 sm:scale-75">
                <div className="border-[2.5px] border-black rounded-full p-1 flex items-center justify-center">
                  <div className="border border-black rounded-full p-2.5 flex flex-col items-center justify-center">
                    <span className="text-[5px] font-black text-black uppercase tracking-[0.3em] mb-0.5 whitespace-nowrap">National Archive</span>
                    <Globe size={12} className="text-black" />
                    <span className="text-[4px] font-black text-black uppercase tracking-[0.2em] mt-0.5">Verified Data</span>
                  </div>
                </div>
              </div>
              <img 
                src={src}
                alt={alt}
                className="w-full h-full object-contain p-6 sm:p-8 brightness-[1.02] contrast-[1.02] drop-shadow-xl relative z-10 opacity-90"
              />
            </>
          ) : src ? (
            <img 
              src={src}
              alt={alt}
              className="w-full h-full object-cover brightness-[0.8] contrast-[1.1] relative z-10"
            />
          ) : (
            <div className="flex flex-col items-center justify-center text-gray-400 w-full h-full bg-[#1A1A1A] p-4">
              <ImageOff size={40} strokeWidth={1} className="opacity-40" />
            </div>
          )}
          {/* Paper Grain / Matte Finish */}
          <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]" />
          <div className="absolute inset-0 shadow-[inset_0_0_60px_rgba(0,0,0,0.1)] pointer-events-none" />
        </div>
        
        {caption && (
          <div className="mt-6 sm:mt-8 w-full px-2 text-center">
            {type === 'flag' ? (
              <>
                <p className="text-lg sm:text-xl font-display font-black text-gray-800 tracking-tighter uppercase leading-tight drop-shadow-sm mb-3">
                  {caption}
                </p>
                {/* Badges and Region - matching desktop polaroid style */}
                <div className="flex flex-col items-center gap-2">
                  <div className="flex items-center gap-2 flex-wrap justify-center">
                    {badges?.isTerritory && (
                      <span className="text-[7px] font-black text-accent uppercase tracking-[0.2em] border border-accent/20 bg-accent/5 px-2 py-0.5 rounded-full">
                        TERRITORY
                      </span>
                    )}
                    {badges?.isDeFacto && (
                      <span className="text-[7px] font-black text-warning uppercase tracking-[0.2em] border border-warning/20 bg-warning/5 px-2 py-0.5 rounded-full">
                        DE FACTO
                      </span>
                    )}
                    {region && (
                      <div className="text-[7px] font-black text-gray-400 uppercase tracking-[0.2em] border border-gray-200 bg-gray-50 px-2 py-0.5 rounded-full whitespace-nowrap">
                        {region}
                      </div>
                    )}
                  </div>
                  {badges?.isTerritory && badges?.sovereignty && (
                    <div className="text-[8px] font-black text-gray-400 uppercase tracking-[0.2em]">
                      TERRITORY OF {badges.sovereignty}
                    </div>
                  )}
                </div>
              </>
            ) : (
              <p className="text-base sm:text-lg font-display font-black text-gray-800 tracking-tighter leading-tight italic drop-shadow-sm flex items-center justify-center gap-2">
                <MapPin size={18} className="text-sky shrink-0 fill-sky/10" strokeWidth={2.5} />
                {caption}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <main className="min-h-screen bg-surface-dark pt-24 pb-20 px-4 md:px-8 relative overflow-hidden text-white">
      <SEO 
        title={`${country.name} - ${isTerritory ? 'Territory' : isDeFacto ? 'State' : 'Country'} Profile`} 
        description={`Explore detailed data for ${country.name}.`} 
      />

      {/* Background Decor */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-surface-dark">
        <div className="absolute top-[-20%] left-[-10%] w-[120%] h-[120%] bg-[radial-gradient(circle_at_center,rgba(0,194,255,0.02)_0%,transparent_70%)] blur-[120px] animate-pulse-slow" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[100%] h-[100%] bg-[radial-gradient(circle_at_center,rgba(52,199,89,0.01)_0%,transparent_60%)] blur-[100px] animate-pulse-slow delay-700" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* --- FUTURISTIC ATLAS LAYOUT --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* 1. Flag Section - Physical Photo Print (Desktop Only) - RIGHT SIDE */}
            <div className="hidden lg:flex lg:col-span-5 lg:col-start-8 lg:row-start-1 flex-col gap-5 mt-20">
                <div className="relative group">
                    <div className="bg-[#FCFCFC] p-4 pb-14 shadow-[0_25px_60px_rgba(0,0,0,0.4),0_0_0_1px_rgba(0,0,0,0.05)] rounded-sm transform -rotate-1 transition-all duration-700 flex flex-col items-center group/flag relative overflow-hidden">
                        {/* Subtle Paper Texture */}
                        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]" />
                        
                        <div className="w-full h-52 md:h-64 bg-[#F5F5F0] overflow-hidden relative group/image shadow-inner">
                            {/* Static Ink Stamp */}
                            <div className="absolute top-6 right-6 z-20 transform rotate-12 opacity-[0.15] pointer-events-none flex items-center justify-center scale-75 md:scale-90">
                                <div className="border-[2.5px] border-black rounded-full p-1 flex items-center justify-center">
                                    <div className="border border-black rounded-full p-2.5 flex flex-col items-center justify-center">
                                        <span className="text-[5px] font-black text-black uppercase tracking-[0.3em] mb-0.5 whitespace-nowrap">National Archive</span>
                                        <Globe size={12} className="text-black" />
                                        <span className="text-[4px] font-black text-black uppercase tracking-[0.2em] mt-0.5">Verified Data</span>
                                    </div>
                                </div>
                            </div>
                            
                            <img 
                                src={`https://flagcdn.com/w640/${countryCode}.png`}
                                alt={`${country.name} Flag`}
                                className="w-full h-full object-contain p-8 brightness-[1.02] contrast-[1.02] drop-shadow-xl relative z-10 opacity-90"
                            />
                            {/* Paper Grain / Matte Finish */}
                            <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]" />
                            <div className="absolute inset-0 shadow-[inset_0_0_60px_rgba(0,0,0,0.1)] pointer-events-none" />
                        </div>

                        {/* Caption Area */}
                        <div className="mt-8 w-full px-2 text-center relative z-10">
                            <h2 className="text-3xl md:text-4xl font-display font-black text-gray-800 tracking-tighter uppercase leading-tight mb-4 drop-shadow-sm">{country.name}</h2>
                            <div className="flex flex-col items-center gap-3">
                                <div className="flex items-center gap-2">
                                    {isTerritory && (
                                        <span className="text-[8px] font-black text-accent uppercase tracking-[0.3em] border border-accent/20 bg-accent/5 px-2.5 py-1 rounded-full">
                                            TERRITORY
                                        </span>
                                    )}
                                    {isDeFacto && (
                                        <span className="text-[8px] font-black text-warning uppercase tracking-[0.3em] border border-warning/20 bg-warning/5 px-2.5 py-1 rounded-full">
                                            DE FACTO
                                        </span>
                                    )}
                                    <div className="text-[8px] font-black text-gray-400 uppercase tracking-[0.3em] border border-gray-200 bg-gray-50 px-2.5 py-1 rounded-full whitespace-nowrap">
                                        {country.region}
                                    </div>
                                </div>
                                
                                {isTerritory && (
                                    <div className="text-[9px] font-black text-gray-400 uppercase tracking-[0.3em] mt-1">
                                        TERRITORY OF <button 
                                            onClick={() => handleSovereigntyClick((country as any).sovereignty)}
                                            className="text-sky hover:text-sky-dark transition-all underline underline-offset-4 decoration-sky/20 uppercase font-black"
                                        >
                                            {(country as any).sovereignty}
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-5 flex flex-col gap-3 relative z-10">
                    <div className="flex flex-col gap-2">
                        {isDeFacto && (
                            <div className="text-warning font-black tracking-[0.2em] text-[8px] uppercase flex items-center gap-2.5">
                                <AlertTriangle size={12} className="text-warning" /> 
                                <span className="text-white">{(country as any).sovereignty || 'LIMITED RECOGNITION'}</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* 2. Information Section - LEFT SIDE */}
            <div className="lg:col-span-7 lg:col-start-1 lg:row-start-1 lg:row-span-2 flex flex-col gap-4 lg:gap-8">
                {/* Mobile/Tablet Back Button */}
                <button 
                    onClick={() => navigate('/database')}
                    className="lg:hidden group flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.4em] text-white/40 hover:text-sky transition-all w-fit"
                >
                    <ArrowLeft size={14} strokeWidth={2.5} className="transition-transform" />
                    BACK TO DIRECTORY
                </button>
                
                {/* Desktop: Back to Directory button */}
                <button 
                    onClick={() => navigate('/database')}
                    className="hidden lg:flex group items-center gap-3 text-[10px] font-black uppercase tracking-[0.4em] text-white/40 hover:text-sky transition-all w-fit"
                >
                    <ArrowLeft size={14} strokeWidth={2.5} className="transition-transform" />
                    BACK TO DIRECTORY
                </button>
                
                <div className="bg-white/20 backdrop-blur-3xl p-6 sm:p-8 md:p-10 lg:p-12 rounded-3xl border border-white/50 relative h-full flex flex-col overflow-hidden group">
                     <div className="absolute inset-0 bg-glossy-gradient opacity-20 pointer-events-none" />
                     <div className="absolute top-12 right-12 transition-transform duration-1000 hidden sm:block">
                        <Scroll className="text-sky-light opacity-[0.1] w-24 h-24" />
                     </div>
                     
                     <header className="mb-8 lg:mb-10 pb-6 lg:pb-8 border-b border-white/20 shrink-0 relative z-10">
                        <div className="flex items-center gap-4 mb-6 lg:mb-8">
                            <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-sky/30 flex items-center justify-center border border-white/40 relative overflow-hidden shrink-0">
                                <div className="absolute inset-0 bg-glossy-gradient opacity-50" />
                                <Compass className="text-sky-light relative z-10" size={20} />
                            </div>
                            <div>
                              <h3 className="font-display font-black text-xl lg:text-2xl text-white uppercase tracking-tighter drop-shadow-[0_5px_15px_rgba(0,0,0,0.3)]">Official Profile</h3>
                              {/* Mobile country name */}
                              <p className="lg:hidden text-sm font-display font-bold text-white/60 uppercase tracking-wide mt-1">{country.name}</p>
                            </div>
                        </div>
                        
                        <div className="space-y-4 pl-0.5">
                            <div className="mb-2">
                                <span className="font-display font-bold text-base lg:text-lg text-white/80 leading-tight uppercase tracking-wide italic drop-shadow-sm">{officialName}</span>
                            </div>
                            
                            {/* Mobile/Tablet: Status Tags (Territory/De Facto only) */}
                            {(isTerritory || isDeFacto) && (
                                <div className="flex flex-wrap items-center gap-2 lg:hidden">
                                    {isTerritory && (
                                        <span className="text-[8px] font-black text-accent uppercase tracking-[0.3em] border border-accent/30 bg-accent/10 px-2.5 py-1 rounded-full">
                                            TERRITORY
                                        </span>
                                    )}
                                    {isDeFacto && (
                                        <span className="text-[8px] font-black text-warning uppercase tracking-[0.3em] border border-warning/30 bg-warning/10 px-2.5 py-1 rounded-full">
                                            DE FACTO
                                        </span>
                                    )}
                                </div>
                            )}
                            
                            {filteredAliases && filteredAliases.length > 0 && (
                                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                                    <span className="text-[9px] font-black text-white/40 uppercase tracking-[0.3em] shrink-0">Also Known As</span>
                                    <span className="font-bold text-white/60 text-xs tracking-[0.1em] uppercase">{filteredAliases.join(' • ')}</span>
                                </div>
                            )}
                        </div>
                     </header>

                     {/* Mobile/Tablet: Flag Photo (below header) */}
                     <div className="lg:hidden mb-8 relative z-10">
                        <CompactPhoto 
                          type="flag"
                          src={`https://flagcdn.com/w320/${countryCode}.png`}
                          alt={`${country.name} Flag`}
                          caption={country.name}
                          region={country.region}
                          badges={{ 
                            isTerritory, 
                            isDeFacto, 
                            sovereignty: isTerritory ? (country as any).sovereignty : undefined 
                          }}
                        />
                     </div>

                     <div className="mb-8 lg:mb-12 shrink-0 relative z-10">
                        <p className="text-[9px] font-black text-sky-light uppercase tracking-[0.3em] mb-4 lg:mb-5">Description</p>
                        <p className="text-lg lg:text-2xl font-medium leading-[1.4] text-white/90 italic font-display tracking-tight drop-shadow-lg">
                            "{country.description}"
                        </p>
                     </div>
                     
                     {/* Stats Grid */}
                     <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 lg:gap-x-8 gap-y-6 lg:gap-y-10 mb-8 lg:mb-12 shrink-0 relative z-10">
                        <StatItem label="Capital" value={country.capital} icon={Building2} />
                        <StatItem label="Population" value={country.population} icon={Users} />
                        <StatItem label="Area" value={`${country.area} km²`} icon={Maximize2} />
                        <StatItem label="Currency" value={country.currency} icon={Banknote} />
                        <StatItem label="GDP" value={country.gdp || '—'} icon={TrendingUp} />
                        <StatItem label="Time Zone" value={country.timeZone || '—'} icon={Clock} />
                        <StatItem label="Calling Code" value={country.callingCode || '—'} icon={Phone} />
                        <StatItem label="Driving Side" value={`${country.driveSide || 'Right'}-hand`} icon={Car} />
                     </div>

                     <div className="mb-8 lg:mb-12 p-5 lg:p-8 bg-black/20 rounded-2xl border border-white/20 shadow-inner relative overflow-hidden group/linguistic">
                        <div className="absolute inset-0 bg-glossy-gradient opacity-10" />
                        <p className="text-[9px] font-black text-sky-light uppercase tracking-[0.3em] mb-4 lg:mb-5 flex items-center gap-2.5 relative z-10">
                          <Languages size={14} className="text-sky-light" /> Languages
                        </p>
                        <div className="flex flex-wrap gap-2 lg:gap-2.5 relative z-10">
                            {country.languages.map(lang => (
                                <span key={lang} className="px-3 lg:px-5 py-1.5 lg:py-2 bg-white/15 border-2 border-white/40 rounded-xl text-[9px] font-bold uppercase tracking-[0.2em] text-white/80 hover:bg-white/25 hover:text-white hover:border-white/50 transition-all cursor-default relative overflow-hidden">
                                    <div className="absolute inset-0 bg-glossy-gradient opacity-20" />
                                    <span className="relative z-10">{lang}</span>
                                </span>
                            ))}
                        </div>
                     </div>

                     {/* Borders */}
                     {country.borders && country.borders.length > 0 && (
                        <div className="mb-8 lg:mb-10 shrink-0 relative z-10">
                             <p className="text-[9px] font-black text-white/30 uppercase tracking-[0.3em] mb-4 lg:mb-5">Bordering Countries</p>
                             <div className="flex flex-wrap gap-2 lg:gap-3">
                                {country.borders.map(border => (
                                    <button 
                                        key={border} 
                                        onClick={() => handleNeighborClick(border)}
                                        className="text-[9px] font-bold uppercase tracking-[0.2em] px-3 lg:px-5 py-2 lg:py-2.5 bg-white/10 text-white/70 rounded-xl border-2 border-white/30 hover:border-sky/50 hover:bg-white/20 hover:text-sky transition-all duration-500 group/border"
                                    >
                                        <span className="relative z-10">{border}</span>
                                    </button>
                                ))}
                             </div>
                        </div>
                     )}

                     {/* Territories */}
                     {controlledTerritories.length > 0 && (
                        <div className="mb-10 lg:mb-16 shrink-0 relative z-10">
                             <p className="text-[9px] font-black text-accent uppercase tracking-[0.3em] mb-4 lg:mb-5">Territories</p>
                             <div className="flex flex-wrap gap-2 lg:gap-3">
                                {controlledTerritories.map(t => (
                                    <button 
                                        key={t.id} 
                                        onClick={() => handleTerritoryClick(t.id)}
                                        className="text-[9px] font-bold uppercase tracking-[0.2em] px-3 lg:px-5 py-2 lg:py-2.5 bg-white/10 text-accent rounded-xl border-2 border-white/30 hover:border-accent hover:bg-white/20 transition-all duration-500 group/dep"
                                    >
                                        <span className="relative z-10">{t.name}</span>
                                    </button>
                                ))}
                             </div>
                        </div>
                     )}

                     {!isTerritory && !isDeFacto ? (
                        <div className="pt-8 lg:pt-12 border-t border-white/10 flex flex-col items-center gap-6 lg:gap-10 shrink-0 text-center relative z-10">
                            {/* Mobile/Tablet: Location Photo (above expedition text) */}
                            <div className="lg:hidden">
                              <CompactPhoto 
                                type="location"
                                src={scenicData?.image || ''}
                                alt="Location Scenery"
                                caption={scenicData?.caption}
                              />
                            </div>
                            
                            <div className="space-y-4 lg:space-y-6 max-w-lg flex flex-col items-center">
                                <p className="text-base lg:text-lg text-white/50 font-bold uppercase tracking-[0.1em] leading-relaxed drop-shadow-md">
                                    Start an expedition to explore landmarks and culture.
                                </p>
                                <div className="flex flex-col items-center gap-6 w-full">
                                <Link to={`/expedition/${country.id}`} className="inline-block w-full sm:w-auto group/exp">
                                    <Button variant="primary" size="md" className="w-full sm:w-auto h-14 lg:h-16 px-10 lg:px-16 text-base lg:text-lg text-white border border-white/20 rounded-full">
                                        <span className="flex items-center gap-3">
                                            START EXPEDITION <Compass size={20} className="transition-transform duration-1000" />
                                        </span>
                                    </Button>
                                </Link>
                                </div>
                            </div>
                        </div>
                     ) : null}

                     {/* Coordinates Terminal Overlay */}
                     <div className="mt-8 lg:mt-12 flex flex-col items-center gap-6 lg:gap-8 relative z-10">
                        <div className="inline-flex flex-col items-center gap-3 lg:gap-4">
                             <div className="text-[9px] font-black text-white/40 uppercase tracking-[0.4em] drop-shadow-sm">Global Coordinates</div>
                             <div className="inline-flex items-center gap-3 sm:gap-8 px-4 sm:px-8 py-3 lg:py-4 bg-white/20 backdrop-blur-3xl text-white rounded-2xl shadow-[0_8px_20px_rgba(0,0,0,0.12)] border-2 border-white/60 group transition-all duration-700 relative overflow-hidden whitespace-nowrap">
                                  <div className="absolute inset-0 bg-glossy-gradient opacity-10 group-hover:opacity-20 pointer-events-none" />
                                  <span className="font-display font-black text-[11px] sm:text-base tracking-[0.1em] sm:tracking-[0.2em] text-white tabular-nums uppercase drop-shadow-md relative z-10">
                                     {Math.abs(country.lat).toFixed(4)}° {country.lat >= 0 ? 'N' : 'S'}
                                  </span>
                                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-sky-light animate-pulse relative z-10"></div>
                                  <span className="font-display font-black text-[11px] sm:text-base tracking-[0.1em] sm:tracking-[0.2em] text-white tabular-nums uppercase drop-shadow-md relative z-10">
                                     {Math.abs(country.lng).toFixed(4)}° {country.lng >= 0 ? 'E' : 'W'}
                                  </span>
                             </div>
                        </div>

                        <Link 
                            to={`/map?country=${country.id}`}
                            className="group flex items-center gap-3 text-[9px] font-black text-white/50 hover:text-sky transition-all uppercase tracking-[0.3em] py-3"
                        >
                             <Map size={16} className="transition-all text-sky opacity-80 group-hover:opacity-100" />
                             VIEW ON MAP
                        </Link>

                        <button 
                            onClick={() => navigate('/database')}
                            className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] text-white/30 hover:text-sky transition-colors py-2"
                        >
                            <ArrowLeft size={14} strokeWidth={2.5} />
                            Back to Directory
                        </button>
                     </div>

                </div>
            </div>

            {/* 3. Scenery Section (Desktop Only) - RIGHT SIDE */}
            <div className="hidden lg:block lg:col-span-5 lg:col-start-8 lg:row-start-2 w-full -mt-3">
                 <div className="bg-[#FCFCFC] p-4 pb-14 shadow-[0_25px_60px_rgba(0,0,0,0.4),0_0_0_1px_rgba(0,0,0,0.05)] rounded-sm transform rotate-2 transition-all duration-700 flex flex-col items-center group/scenery relative overflow-hidden">
                    {/* Subtle Paper Texture */}
                    <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]" />
                    
                    <div className="w-full aspect-square bg-[#121212] overflow-hidden relative group/scenic shadow-inner">
                        {(!isTerritory && !isDeFacto) ? (
                          <img 
                              src={scenicData?.image || ''} 
                              alt="Location Scenery" 
                              className="w-full h-full object-cover transition-transform duration-1000 brightness-[0.8] contrast-[1.1]"
                           />
                        ) : (
                          <div className="flex flex-col items-center justify-center text-gray-400 w-full h-full bg-[#1A1A1A] p-6 text-center">
                               <ImageOff size={64} strokeWidth={1} className="mb-6 opacity-40" />
                               <div className="text-[10px] font-black tracking-[0.3em] uppercase opacity-40 mb-8">No Visual Record</div>
                               <a 
                                 href={`https://www.google.com/search?q=${encodeURIComponent(country.name + ' ' + country.capital)}&tbm=isch`}
                                 target="_blank"
                                 rel="noopener noreferrer"
                                 className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/5 border border-white/10 rounded-full text-[9px] font-black uppercase tracking-[0.2em] text-sky hover:bg-white/10 hover:text-sky-light transition-all pointer-events-auto"
                               >
                                 Search Google <Compass size={14} />
                               </a>
                          </div>
                        )}
                        {/* Film Surface / Matte Finish */}
                        <div className="absolute inset-0 bg-white/[0.03] pointer-events-none" />
                        <div className="absolute inset-0 shadow-[inset_0_0_80px_rgba(0,0,0,0.8)] pointer-events-none" />
                    </div>
                    
                    <div className="mt-6 w-full px-2 text-center">
                        <p className="text-xl md:text-2xl font-display font-black text-gray-800 tracking-tighter leading-tight italic drop-shadow-sm flex items-center justify-center gap-2">
                            <MapPin size={24} className="text-sky shrink-0 fill-sky/10" strokeWidth={2.5} />
                            {scenicData?.caption}
                        </p>
                    </div>
                 </div>
            </div>
            
        </div>
      </div>
    </main>
  );
};

export default CountryDetail;
