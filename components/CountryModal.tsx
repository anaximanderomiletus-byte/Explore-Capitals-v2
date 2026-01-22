import React, { useEffect, useState, useMemo } from 'react';
import { MapPin, Map } from 'lucide-react';
import { Country } from '../types';
import Button from './Button';
import { Link } from 'react-router-dom';

interface CountryModalProps {
  country: Country;
  onClose: () => void;
}

const CountryModal: React.FC<CountryModalProps> = ({ country, onClose }) => {
  const [imgError, setImgError] = useState(false);

  // Lock body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  // Calculate ISO code from emoji flag
  const countryCode = useMemo(() => {
    return Array.from(country.flag)
        .map((char: any) => String.fromCharCode(char.codePointAt(0)! - 127397).toLowerCase())
        .join('');
  }, [country.flag]);

  return (
    <div className="fixed inset-0 z-[5000] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      {/* 
         Card Container 
         - Default (Mobile Portrait): Fixed w-[360px] h-[640px]
         - Short Screen (Mobile Landscape): Resizes to fit viewport w-[85vw] h-[90vh]
         - Tablet/Desktop: Fixed w-[460px] h-[660px] (overrides landscape sizing if screen is tall enough)
      */}
      <div className="relative bg-white rounded-xl shadow-2xl flex flex-col border-[6px] border-white ring-1 ring-gray-300 mx-auto overflow-hidden 
        w-[360px] h-[640px] max-h-[95vh]
        [@media(max-height:620px)]:w-[85vw] [@media(max-height:620px)]:h-[90vh] [@media(max-height:620px)]:max-w-[700px]
        md:w-[460px] md:h-[660px]
      ">
        
        {/* Header */}
        <div className="bg-[#77B6EA] px-5 py-3 flex justify-between items-center text-white shadow-md relative z-20 border-b-4 border-[#5a9bc9] rounded-t-lg shrink-0">
          <div className="font-display font-bold text-lg md:text-xl uppercase tracking-wider text-shadow-sm truncate pr-4">{country.name}</div>
        </div>

        {/* Inner Wrapper 
            - Portrait: Flex Column
            - Landscape (Short): Grid (Left Col: Image+Footer, Right Col: Body)
        */}
        <div className="w-full h-full border border-gray-300 border-t-0 bg-white relative z-10 overflow-hidden rounded-b-xl 
          flex flex-col flex-1 min-h-0
          [@media(max-height:620px)]:grid [@media(max-height:620px)]:grid-cols-[40%_60%] [@media(max-height:620px)]:grid-rows-[1fr_auto]
        ">

            {/* --- Card Visual: The "Photo" --- 
                - Portrait: Height 35%, Width 100%
                - Landscape: Top Left Cell (Row 1, Col 1), fills remaining vertical space above footer
            */}
            <div className="relative overflow-hidden shrink-0 p-4 flex items-center justify-center
              h-[35%] w-full
              [@media(max-height:620px)]:h-full [@media(max-height:620px)]:w-full 
              [@media(max-height:620px)]:col-start-1 [@media(max-height:620px)]:row-start-1
            ">
              {!imgError ? (
                <img 
                    src={`https://flagcdn.com/w640/${countryCode}.png`}
                    alt={`${country.name} Flag`}
                    className="w-full h-full object-contain cursor-pointer select-none"
                    onError={() => setImgError(true)}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center cursor-pointer select-none">
                    <img 
                        src={`https://flagcdn.com/w320/${countryCode}.png`}
                        alt={`${country.name} Flag Fallback`}
                        className="max-w-[80%] max-h-[80%] object-contain drop-shadow-lg"
                    />
                </div>
              )}
              
              {/* Region Badge */}
              <div className="absolute bottom-2 right-2 bg-white px-2 py-0.5 rounded shadow-sm border border-gray-200 flex items-center gap-1 z-10">
                <MapPin size={10} className="text-primary" />
                <span className="text-[10px] font-extrabold uppercase text-gray-600 tracking-wide whitespace-nowrap">{country.region}</span>
              </div>
            </div>

            {/* --- Card Body: The Stats & Info --- 
                - Portrait: Flex-1 (fills remaining space)
                - Landscape: Right Column (Col 2), Spans both rows (full height of card)
            */}
            <div className="bg-[#F8F9FA] p-4 flex-1 flex flex-col min-h-0 overflow-hidden gap-3 
              [@media(max-height:620px)]:p-3 [@media(max-height:620px)]:gap-2
              [@media(max-height:620px)]:col-start-2 [@media(max-height:620px)]:row-start-1 [@media(max-height:620px)]:row-span-2
            ">
              
              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-px bg-gray-300 border border-gray-300 rounded-lg overflow-hidden shrink-0 shadow-sm">
                  <div className="bg-white py-2 px-2 text-center flex flex-col justify-center h-full">
                    <div className="text-[9px] text-gray-400 uppercase font-black tracking-widest mb-0.5">Capital</div>
                    <div className="text-xs md:text-sm font-bold text-gray-800 leading-tight truncate px-1">{country.capital}</div>
                  </div>
                  <div className="bg-white py-2 px-2 text-center flex flex-col justify-center h-full">
                    <div className="text-[9px] text-gray-400 uppercase font-black tracking-widest mb-0.5">Currency</div>
                    <div className="text-xs md:text-sm font-bold text-gray-800 leading-tight truncate px-1">{country.currency}</div>
                  </div>
                  <div className="bg-white py-2 px-2 text-center flex flex-col justify-center h-full">
                    <div className="text-[9px] text-gray-400 uppercase font-black tracking-widest mb-0.5">Population</div>
                    <div className="text-xs md:text-sm font-bold text-gray-800 leading-tight truncate px-1">{country.population}</div>
                  </div>
                  <div className="bg-white py-2 px-2 text-center flex flex-col justify-center h-full">
                    <div className="text-[9px] text-gray-400 uppercase font-black tracking-widest mb-0.5">Area (km²)</div>
                    <div className="text-xs md:text-sm font-bold text-gray-800 leading-tight truncate px-1">{country.area}</div>
                  </div>
              </div>
              
              {/* Languages */}
              <div className="shrink-0 pt-1">
                  <div className="text-[9px] text-gray-400 uppercase font-bold mb-1 ml-1">Languages</div>
                  <div className="flex flex-wrap gap-1.5">
                    {country.languages.slice(0, 3).map(lang => (
                        <span key={lang} className="px-2 py-0.5 bg-white border-b border-gray-200 rounded text-xs text-gray-600 font-bold tracking-tight">
                          {lang}
                        </span>
                    ))}
                     {country.languages.length > 3 && (
                       <span className="px-2 py-0.5 bg-white border-b border-gray-200 rounded text-xs text-gray-400 font-bold tracking-tight">
                         +{country.languages.length - 3}
                       </span>
                    )}
                  </div>
              </div>

              {/* Description / Bio */}
              <div className="flex flex-col min-h-0 flex-1 relative">
                <div className="text-[9px] text-gray-400 uppercase font-bold mb-1 ml-1 shrink-0">Field Report</div>
                <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden flex-1 flex flex-col">
                    <div className="overflow-y-auto custom-scrollbar p-3 flex-1">
                        <p className="text-[10px] md:text-[11px] text-gray-600 leading-relaxed italic font-serif">
                          "{country.description}"
                        </p>
                    </div>
                </div>
              </div>
              
              <div className="text-center shrink-0 pt-0.5">
                  <Link 
                    to={`/map?country=${country.id}`}
                    className="inline-flex items-center gap-1 text-[10px] md:text-xs font-bold text-primary uppercase tracking-wider hover:underline"
                  >
                    <Map size={10} /> View on Map
                  </Link>
              </div>

            </div>

            {/* --- Card Footer: Actions --- 
                - Portrait: Flex column at bottom
                - Landscape: Bottom Left Cell (Row 2, Col 1)
            */}
            <div className="p-4 bg-white border-t border-gray-200 flex flex-col gap-2 shrink-0 
                [@media(max-height:620px)]:p-3
                [@media(max-height:620px)]:col-start-1 [@media(max-height:620px)]:row-start-2
                [@media(max-height:620px)]:border-t-0 [@media(max-height:620px)]:border-r
            ">
                <Link to={`/expedition/${country.id}`} onClick={onClose} className="w-full">
                  <Button variant="primary" className="w-full rounded-full" size="md">
                      Start Expedition
                  </Button>
                </Link>
                <button 
                  onClick={onClose}
                  className="w-full py-1 text-[10px] font-bold text-gray-400 uppercase tracking-widest hover:text-gray-600 transition-colors"
                >
                  Close Card
                </button>
            </div>
            
        </div>
      </div>
    </div>
  );
};

export default CountryModal;