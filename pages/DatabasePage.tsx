
import React, { useState, useMemo, useEffect, useCallback, useRef, memo, startTransition } from 'react';
import { Search, ArrowUp, ArrowDown, ArrowUpDown, ChevronRight, Maximize2, Languages, Globe, AlertTriangle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { MOCK_COUNTRIES, TERRITORIES, DE_FACTO_COUNTRIES } from '../constants';
import { Country, Territory } from '../types';
import SEO from '../components/SEO';
import { useLayout } from '../context/LayoutContext';
import Button from '../components/Button';

type SortKey = 'name' | 'capital' | 'region' | 'population' | 'area';
type SortDirection = 'asc' | 'desc';

// Pre-sorted data for instant initial render (sorted by name ascending)
// We use a simple sort here, but in a real app these would be pre-calculated
const PRESORTED_COUNTRIES = MOCK_COUNTRIES;
const PRESORTED_TERRITORIES = TERRITORIES;
const PRESORTED_DEFACTO = DE_FACTO_COUNTRIES;

// Debounce hook for search input
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}

interface SortHeaderProps {
  label: string;
  field: SortKey;
  align?: 'left' | 'right';
  sortConfig: { key: SortKey; direction: SortDirection } | null;
  onSort: (key: SortKey) => void;
}

const SortHeader: React.FC<SortHeaderProps> = memo(({ label, field, align = 'left', sortConfig, onSort }) => {
  const isActive = sortConfig?.key === field;
  const isAsc = sortConfig?.direction === 'asc';

  return (
    <th 
      className={`px-6 py-4 cursor-pointer hover:bg-white/5 transition-colors group select-none ${align === 'right' ? 'text-right' : 'text-left'} whitespace-nowrap`}
      onClick={() => onSort(field)}
    >
      <div className={`flex items-center gap-3 ${align === 'right' ? 'justify-end' : 'justify-start'}`}>
        <span className={`font-black text-[9px] uppercase tracking-[0.2em] transition-colors ${isActive ? 'text-white/80' : 'text-white/60 group-hover:text-white/80'}`}>
          {label}
        </span>
        <span className={`transition-opacity ${isActive ? 'opacity-100 text-white/80' : 'opacity-0 group-hover:opacity-50 text-white/20'}`}>
          {isActive ? (isAsc ? <ArrowUp size={12} /> : <ArrowDown size={12} />) : <ArrowUpDown size={12} />}
        </span>
      </div>
    </th>
  );
});

SortHeader.displayName = 'SortHeader';

// Helper to get ISO code for flags - memoized
const countryCodeCache = new Map<string, string>();
const getCountryCode = (emoji: string): string => {
  if (countryCodeCache.has(emoji)) {
    return countryCodeCache.get(emoji)!;
  }
  const code = Array.from(emoji)
    .map(char => String.fromCharCode(char.codePointAt(0)! - 127397).toLowerCase())
    .join('');
  countryCodeCache.set(emoji, code);
  return code;
};

// Simple flag component - no lazy loading overhead for visible items
const FlagIcon: React.FC<{ country: Country; size: 'small' | 'card' }> = memo(({ country, size }) => {
  const code = getCountryCode(country.flag);
  const width = size === 'small' ? 'w-10' : 'w-16';
  const height = size === 'small' ? 'h-7' : 'h-11';
  
  return (
    <div className={`${width} ${height} flex items-center justify-center bg-white/5 rounded overflow-hidden`}>
      <img 
        src={`https://flagcdn.com/w80/${code}.png`} 
        alt={`${country.name} Flag`}
        className="w-full h-full object-contain"
        loading="lazy"
        decoding="async"
      />
    </div>
  );
});

FlagIcon.displayName = 'FlagIcon';

// Memoized table row component
interface TableRowProps {
  country: Country;
  onClick: () => void;
  hoverColor?: string;
  showSovereignty?: boolean;
  sovereignty?: string;
  titleColor?: string;
}

const TableRow: React.FC<TableRowProps> = memo(({ 
  country, 
  onClick, 
  hoverColor = 'hover:bg-white/25',
  showSovereignty = false,
  sovereignty,
  titleColor = 'group-hover/row:text-sky-light'
}) => {
  const navigate = useNavigate();
  
  // Prefetch specific country data on hover
  const handleMouseEnter = () => {
    // We could prefetch the country detail data here if it were an API call
    // For now, the chunk is already being prefetched by the page
  };

  return (
    <tr 
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      className={`group/row ${hoverColor} transition-colors duration-200 cursor-pointer`}
    >
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center gap-4">
          <div className="shrink-0">
            <FlagIcon country={country} size="small" />
          </div>
          <span className={`font-bold text-sm text-white/90 uppercase tracking-tighter ${titleColor} transition-colors`}>{country.name}</span>
        </div>
      </td>
      {showSovereignty && (
        <td className="px-6 py-4 text-[9px] font-bold text-accent uppercase tracking-[0.2em]">
          {sovereignty}
        </td>
      )}
      <td className="px-6 py-4 text-[10px] font-bold uppercase tracking-[0.2em] text-white/60 group-hover/row:text-white transition-colors">{country.capital}</td>
      <td className="px-6 py-4">
        <span className="inline-flex items-center px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-[0.2em] bg-sky/30 text-white border border-white/40 whitespace-nowrap">
          {country.region}
        </span>
      </td>
      <td className="px-6 py-4 text-xs font-bold text-white/80 tabular-nums text-right group-hover/row:text-white transition-colors">{country.population}</td>
      {!showSovereignty && (
        <td className="px-6 py-4 text-xs font-bold text-white/80 tabular-nums text-right group-hover/row:text-white transition-colors">{country.area}</td>
      )}
    </tr>
  );
});

TableRow.displayName = 'TableRow';

// Memoized mobile card component
interface MobileCountryCardProps {
  country: Country;
  onClick: () => void;
  isTerritory?: boolean;
  isDeFacto?: boolean;
  sovereignty?: string;
}

const MobileCountryCard: React.FC<MobileCountryCardProps> = memo(({ country, onClick, isTerritory, isDeFacto, sovereignty }) => {
  let titleColor = 'text-white';
  if (isTerritory) titleColor = 'text-accent';
  if (isDeFacto) titleColor = 'text-warning';

  return (
    <div 
      onClick={onClick}
      className="bg-white/10 p-6 rounded-2xl border border-white/40 transition-colors hover:bg-white/15 cursor-pointer flex flex-col overflow-hidden relative"
    >
      <div className="flex items-start justify-between mb-6 relative z-10">
        <div className="flex items-center gap-4">
          <div className="flex-shrink-0">
            <FlagIcon country={country} size="card" />
          </div>
          <div>
            <h3 className={`font-black text-lg uppercase tracking-tighter leading-none mb-1.5 ${titleColor}`}>{country.name}</h3>
            <div className="text-[9px] font-black uppercase tracking-[0.2em] text-white/40">{country.capital}</div>
            {(isTerritory || isDeFacto) && (
              <div className="text-[8px] font-black uppercase tracking-[0.2em] text-primary mt-2 flex items-center gap-1.5">
                <div className="w-1 h-1 rounded-full bg-primary" />
                {sovereignty || 'Limited Recognition'}
              </div>
            )}
          </div>
        </div>
        <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white/20 border border-white/10">
          <ChevronRight size={18} />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-6 relative z-10">
        <div className="bg-white/5 p-3 rounded-xl border border-white/10">
           <div className="text-[8px] text-white/30 uppercase font-black tracking-[0.2em] mb-1">Population</div>
           <div className="text-sm font-black text-white/80 tracking-tight">{country.population}</div>
        </div>
        <div className="bg-white/5 p-3 rounded-xl border border-white/10">
           <div className="text-[8px] text-white/30 uppercase font-black tracking-[0.2em] mb-1 flex items-center gap-1.5">
              <Maximize2 size={10} /> Area
           </div>
           <div className="text-sm font-black text-white/80 tracking-tight">{country.area}</div>
        </div>
      </div>

      <div className="flex flex-wrap gap-1.5 pt-4 border-t border-white/10 relative z-10">
         {country.languages.slice(0, 3).map((lang, idx) => (
           <span key={idx} className="text-[8px] font-black uppercase tracking-[0.15em] px-3 py-1.5 bg-white/5 text-white/40 rounded-full flex items-center gap-1.5 border border-white/10">
             <Languages size={10} className="opacity-50" /> {lang}
           </span>
         ))}
      </div>
    </div>
  );
});

MobileCountryCard.displayName = 'MobileCountryCard';

// Virtualized table for desktop - only render visible rows
interface VirtualizedTableProps {
  items: Country[];
  onItemClick: (id: string) => void;
  sortConfig: { key: SortKey; direction: SortDirection } | null;
  onSort: (key: SortKey) => void;
  hoverColor?: string;
  showSovereignty?: boolean;
  titleColor?: string;
  headerBgClass?: string;
}

const VirtualizedTable: React.FC<VirtualizedTableProps> = memo(({ 
  items, 
  onItemClick,
  sortConfig,
  onSort,
  hoverColor,
  showSovereignty,
  titleColor,
  headerBgClass = 'bg-white/5'
}) => {
  const ROW_HEIGHT = 65; // Approximate row height in pixels
  const BUFFER = 5; // Extra rows to render above/below viewport
  
  const [scrollTop, setScrollTop] = useState(0);
  const [containerHeight, setContainerHeight] = useState(600);
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    
    const updateHeight = () => {
      setContainerHeight(Math.min(600, window.innerHeight - 300));
    };
    
    const handleScroll = () => {
      setScrollTop(container.scrollTop);
    };
    
    updateHeight();
    container.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', updateHeight, { passive: true });
    
    return () => {
      container.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', updateHeight);
    };
  }, []);
  
  const totalHeight = items.length * ROW_HEIGHT;
  const startIndex = Math.max(0, Math.floor(scrollTop / ROW_HEIGHT) - BUFFER);
  const visibleCount = Math.ceil(containerHeight / ROW_HEIGHT) + BUFFER * 2;
  const endIndex = Math.min(items.length, startIndex + visibleCount);
  const visibleItems = items.slice(startIndex, endIndex);
  const offsetY = startIndex * ROW_HEIGHT;

  return (
    <div 
      ref={containerRef}
      className="overflow-auto rounded-3xl border border-white/20 bg-white/10"
      style={{ maxHeight: containerHeight }}
    >
      <table className="w-full text-left border-collapse">
        <thead className="sticky top-0 z-10">
          <tr className={`${headerBgClass} border-b border-white/15`}>
            <SortHeader label={showSovereignty ? "Territory" : "Country"} field="name" sortConfig={sortConfig} onSort={onSort} />
            {showSovereignty && (
              <th className="px-6 py-4 text-left text-[9px] font-black text-white/50 uppercase tracking-[0.3em] whitespace-nowrap">
                {showSovereignty ? 'Sovereignty' : 'Status'}
              </th>
            )}
            <SortHeader label="Capital" field="capital" sortConfig={sortConfig} onSort={onSort} />
            <SortHeader label={showSovereignty ? "Sector" : "Region"} field="region" sortConfig={sortConfig} onSort={onSort} />
            <SortHeader label="Population" field="population" sortConfig={sortConfig} onSort={onSort} align="right" />
            {!showSovereignty && (
              <SortHeader label="Area (km²)" field="area" sortConfig={sortConfig} onSort={onSort} align="right" />
            )}
          </tr>
        </thead>
        <tbody>
          {/* Spacer for items above viewport */}
          {startIndex > 0 && (
            <tr style={{ height: offsetY }}>
              <td colSpan={showSovereignty ? 5 : 6} />
            </tr>
          )}
          {visibleItems.map((country) => (
            <TableRow 
              key={country.id}
              country={country}
              onClick={() => onItemClick(country.id)}
              hoverColor={hoverColor}
              showSovereignty={showSovereignty}
              sovereignty={(country as Territory).sovereignty}
              titleColor={titleColor}
            />
          ))}
          {/* Spacer for items below viewport */}
          {endIndex < items.length && (
            <tr style={{ height: (items.length - endIndex) * ROW_HEIGHT }}>
              <td colSpan={showSovereignty ? 5 : 6} />
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
});

VirtualizedTable.displayName = 'VirtualizedTable';

// Virtualized list for mobile cards
interface VirtualizedMobileListProps {
  items: Country[];
  onItemClick: (id: string) => void;
  isTerritory?: boolean;
  isDeFacto?: boolean;
  getSovereignty?: (item: Country) => string | undefined;
}

const VirtualizedMobileList: React.FC<VirtualizedMobileListProps> = memo(({ 
  items, 
  onItemClick,
  isTerritory,
  isDeFacto,
  getSovereignty
}) => {
  const [visibleCount, setVisibleCount] = useState(12); // Start with 12 items
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const containerTop = containerRef.current.offsetTop;
      const containerBottom = containerTop + containerRef.current.offsetHeight;
      
      // Load more when user scrolls near the bottom of visible items
      if (scrollY + windowHeight > containerBottom - 500 && visibleCount < items.length) {
        setVisibleCount(prev => Math.min(prev + 12, items.length));
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [items.length, visibleCount]);

  // Reset visible count when items change (e.g., search)
  useEffect(() => {
    setVisibleCount(12);
  }, [items]);

  const visibleItems = items.slice(0, visibleCount);

  return (
    <div ref={containerRef} className="lg:hidden">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {visibleItems.map((item) => (
          <MobileCountryCard 
            key={item.id} 
            country={item} 
            onClick={() => onItemClick(item.id)}
            isTerritory={isTerritory}
            isDeFacto={isDeFacto}
            sovereignty={getSovereignty?.(item)}
          />
        ))}
      </div>
      {visibleCount < items.length && (
        <div className="flex justify-center mt-8">
          <button 
            onClick={() => setVisibleCount(prev => Math.min(prev + 24, items.length))}
            className="px-8 py-3 bg-white/10 border border-white/20 rounded-xl text-white/60 text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-white/15 transition-colors"
          >
            Load More ({items.length - visibleCount} remaining)
          </button>
        </div>
      )}
    </div>
  );
});

VirtualizedMobileList.displayName = 'VirtualizedMobileList';

const sortAndFilter = <T extends Country>(
  list: T[], 
  search: string, 
  sortConfig: { key: SortKey; direction: SortDirection } | null
): T[] => {
  if (!list) return [];
  
  const searchLower = (search || '').toLowerCase().trim();
  
  let filtered = searchLower 
    ? list.filter(c => {
        if (!c) return false;
        return (c.name || '').toLowerCase().includes(searchLower) ||
               (c.capital || '').toLowerCase().includes(searchLower) ||
               (c.region || '').toLowerCase().includes(searchLower);
      })
    : [...list];

  if (sortConfig) {
    filtered.sort((a, b) => {
      if (!a || !b) return 0;
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortConfig.direction === 'asc' 
          ? aValue.localeCompare(bValue) 
          : bValue.localeCompare(aValue);
      }
      return 0;
    });
  }
  return filtered;
};

const DatabasePage: React.FC = () => {
  const [searchInput, setSearchInput] = useState('');
  const debouncedSearch = useDebounce(searchInput, 200);
  const [sortConfig, setSortConfig] = useState<{ key: SortKey; direction: SortDirection } | null>({ key: 'name', direction: 'asc' });
  const { setPageLoading } = useLayout();
  const navigate = useNavigate();

  // Prefetch CountryDetail chunk when user hovers over the database
  useEffect(() => {
    const prefetch = () => import('./CountryDetail');
    if ('requestIdleCallback' in window) {
      (window as any).requestIdleCallback(prefetch);
    } else {
      setTimeout(prefetch, 1000);
    }
  }, []);

  // Mark page as loaded immediately
  useEffect(() => {
    setPageLoading(false);
  }, [setPageLoading]);

  const handleSort = useCallback((key: SortKey) => {
    startTransition(() => {
      setSortConfig(prev => ({
        key,
        direction: prev?.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
      }));
    });
  }, []);

  const handleCountryClick = useCallback((id: string) => {
    navigate(`/country/${id}`);
  }, [navigate]);

  // Use pre-sorted data for initial render (no search, default sort)
  const processedCountries = useMemo(() => {
    if (!debouncedSearch && sortConfig?.key === 'name' && sortConfig?.direction === 'asc') {
      return PRESORTED_COUNTRIES;
    }
    return sortAndFilter(MOCK_COUNTRIES, debouncedSearch, sortConfig);
  }, [debouncedSearch, sortConfig]);
  
  const processedTerritories = useMemo(() => {
    if (!debouncedSearch && sortConfig?.key === 'name' && sortConfig?.direction === 'asc') {
      return PRESORTED_TERRITORIES;
    }
    return sortAndFilter(TERRITORIES, debouncedSearch, sortConfig);
  }, [debouncedSearch, sortConfig]);
  
  const processedDeFacto = useMemo(() => {
    if (!debouncedSearch && sortConfig?.key === 'name' && sortConfig?.direction === 'asc') {
      return PRESORTED_DEFACTO;
    }
    return sortAndFilter(DE_FACTO_COUNTRIES, debouncedSearch, sortConfig);
  }, [debouncedSearch, sortConfig]);

  const getTerritorysovereignty = useCallback((item: Country) => 
    (item as Territory).sovereignty, []);

  const hasResults = processedCountries.length > 0 || processedTerritories.length > 0 || processedDeFacto.length > 0;

  return (
    <div className="pt-32 pb-20 px-4 md:px-6 bg-surface-dark min-h-screen relative overflow-hidden">
      {/* Simplified Background - reduced blur for performance */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-20%] right-[-10%] w-[100%] h-[100%] bg-sky/20 rounded-full blur-[100px] opacity-60" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[80%] h-[80%] bg-sky/10 rounded-full blur-[80px] opacity-40" />
      </div>

      <SEO 
        title="Global Country Database"
        description="Search and sort data for over 190 nations. High-fidelity database of world geography."
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
          <div>
            <div className="inline-flex items-center gap-2.5 px-4 py-2 bg-sky/20 border border-white/30 rounded-full text-[9px] font-black uppercase tracking-[0.3em] text-white mb-6 relative overflow-hidden group">
               <Globe size={12} className="relative z-10 text-sky-light" />
               <span className="relative z-10">GLOBAL DATABASE</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-display font-black text-white mb-4 tracking-tighter uppercase leading-none">Database</h1>
            <p className="text-white/70 text-lg font-bold uppercase tracking-wide max-w-2xl">Detailed data for 195 sovereign states.</p>
          </div>
          
          <div className="relative w-full md:w-[400px] group">
            <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-white/40 group-focus-within:text-sky-light transition-colors duration-300" />
            </div>
            <input
              type="text"
              placeholder="SEARCH COUNTRIES..."
              className="block w-full pl-16 pr-6 py-4 bg-white/15 border border-white/40 rounded-2xl text-white placeholder:text-white/20 font-bold uppercase text-[11px] tracking-[0.2em] focus:outline-none focus:ring-4 focus:ring-sky/20 focus:border-white/60 focus:bg-white/20 transition-all duration-300"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
          </div>
        </div>

        {/* Sovereign Countries Section - Desktop Virtualized Table */}
        <div className="hidden lg:block mb-16">
          <VirtualizedTable
            items={processedCountries}
            onItemClick={handleCountryClick}
            sortConfig={sortConfig}
            onSort={handleSort}
          />
        </div>

        {/* Sovereign Countries - Mobile Virtualized List */}
        <div className="mb-20">
          <VirtualizedMobileList 
            items={processedCountries}
            onItemClick={handleCountryClick}
          />
        </div>

        {/* --- Autonomous Regions Section --- */}
        {processedTerritories.length > 0 && (
          <div className="mb-16">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-accent/30 rounded-xl text-white border border-white/40 flex items-center justify-center">
                <Globe size={24} />
              </div>
              <div>
                <h2 className="text-3xl font-display font-black text-white uppercase tracking-tighter">Autonomous Regions</h2>
                <p className="text-white/60 text-sm font-bold uppercase tracking-[0.2em] mt-0.5">Major non-sovereign dependencies and territories.</p>
              </div>
            </div>
            
            <div className="hidden lg:block">
              <VirtualizedTable
                items={processedTerritories}
                onItemClick={handleCountryClick}
                sortConfig={sortConfig}
                onSort={handleSort}
                hoverColor="hover:bg-accent/20"
                showSovereignty={true}
                titleColor="group-hover/row:text-accent"
                headerBgClass="bg-accent/10"
              />
            </div>

            <VirtualizedMobileList 
              items={processedTerritories}
              onItemClick={handleCountryClick}
              isTerritory
              getSovereignty={getTerritorysovereignty}
            />
          </div>
        )}

        {/* --- De Facto States Section --- */}
        {processedDeFacto.length > 0 && (
          <div className="mb-16">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-warning/30 rounded-xl text-white border border-white/40 flex items-center justify-center">
                <AlertTriangle size={24} />
              </div>
              <div>
                <h2 className="text-3xl font-display font-black text-white uppercase tracking-tighter">De Facto States</h2>
                <p className="text-white/60 text-sm font-bold uppercase tracking-[0.2em] mt-0.5">Entities with limited international recognition.</p>
              </div>
            </div>
            
            <div className="hidden lg:block">
              <VirtualizedTable
                items={processedDeFacto}
                onItemClick={handleCountryClick}
                sortConfig={sortConfig}
                onSort={handleSort}
                hoverColor="hover:bg-warning/20"
                showSovereignty={true}
                titleColor="group-hover/row:text-warning"
                headerBgClass="bg-warning/10"
              />
            </div>

            <VirtualizedMobileList 
              items={processedDeFacto}
              onItemClick={handleCountryClick}
              isDeFacto
              getSovereignty={getTerritorysovereignty}
            />
          </div>
        )}

        {!hasResults && (
          <div className="bg-white/5 rounded-2xl p-16 text-center border border-white/10">
            <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-8">
               <Search className="w-8 h-8 text-white/10" />
            </div>
            <h3 className="text-2xl font-display font-black text-white uppercase tracking-tight mb-2">No results found</h3>
            <p className="text-white/20 uppercase tracking-widest text-[9px] font-black">Protocol failed to match "{debouncedSearch}" within current dataset.</p>
          </div>
        )}

        {/* Scroll to Top Button */}
        {hasResults && (
          <div className="mt-20 flex justify-center">
            <Button 
              variant="secondary" 
              size="md" 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="group h-14 px-10 border border-white/20 hover:border-white/40 text-[10px] uppercase tracking-[0.3em]"
            >
              <ArrowUp size={16} className="mr-2 transition-transform text-sky-light" />
              <span className="relative z-10">Back to Top</span>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DatabasePage;
