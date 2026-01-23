
import React, { useState, useMemo, useEffect } from 'react';
import { Search, ArrowUp, ArrowDown, ArrowUpDown, ChevronRight, Maximize2, Banknote, Languages, Globe, AlertTriangle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { MOCK_COUNTRIES, TERRITORIES, DE_FACTO_COUNTRIES } from '../constants';
import { Country, Territory } from '../types';
import SEO from '../components/SEO';
import { useLayout } from '../context/LayoutContext';
import Button from '../components/Button';

type SortKey = 'name' | 'capital' | 'region' | 'population' | 'area';
type SortDirection = 'asc' | 'desc';

interface SortHeaderProps {
  label: string;
  field: SortKey;
  align?: 'left' | 'right';
  sortConfig: { key: SortKey; direction: SortDirection } | null;
  onSort: (key: SortKey) => void;
}

const SortHeader: React.FC<SortHeaderProps> = ({ label, field, align = 'left', sortConfig, onSort }) => {
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
};

// Helper to get ISO code for flags
const getCountryCode = (emoji: string) => {
    return Array.from(emoji)
        .map(char => String.fromCharCode(char.codePointAt(0)! - 127397).toLowerCase())
        .join('');
};

const FlagIcon: React.FC<{ country: Country; size: 'small' | 'card' }> = ({ country, size }) => {
  const code = getCountryCode(country.flag);
  const width = size === 'small' ? 'w-10' : 'w-16';
  const height = size === 'small' ? 'h-7' : 'h-11';
  
  return (
    <div className={`${width} ${height} flex items-center justify-center`}>
      <img 
        src={`https://flagcdn.com/w80/${code}.png`} 
        alt={`${country.name} Flag`}
        className="w-full h-full object-contain drop-shadow-lg"
      />
    </div>
  );
};

interface MobileCountryCardProps {
  country: Country;
  onClick: () => void;
  isTerritory?: boolean;
  isDeFacto?: boolean;
  sovereignty?: string;
}

const MobileCountryCard: React.FC<MobileCountryCardProps> = ({ country, onClick, isTerritory, isDeFacto, sovereignty }) => {
  let titleColor = 'text-white';
  if (isTerritory) titleColor = 'text-accent';
  if (isDeFacto) titleColor = 'text-warning';

  return (
    <div 
      onClick={onClick}
      className="bg-white/10 backdrop-blur-3xl p-6 rounded-2xl border-2 border-white/40 transition-all hover:bg-white/15 cursor-pointer flex flex-col transform-gpu overflow-hidden relative group"
    >
      <div className="absolute inset-0 bg-glossy-gradient opacity-20 pointer-events-none" />
      <div className="flex items-start justify-between mb-6 relative z-10">
        <div className="flex items-center gap-4">
          <div className="flex-shrink-0">
            <FlagIcon country={country} size="card" />
          </div>
          <div>
            <h3 className={`font-black text-lg uppercase tracking-tighter leading-none mb-1.5 drop-shadow-md ${titleColor}`}>{country.name}</h3>
            <div className="text-[9px] font-black uppercase tracking-[0.2em] text-white/40">{country.capital}</div>
            {(isTerritory || isDeFacto) && (
              <div className="text-[8px] font-black uppercase tracking-[0.2em] text-primary mt-2 flex items-center gap-1.5">
                <div className="w-1 h-1 rounded-full bg-primary animate-pulse" />
                {sovereignty || 'Limited Recognition'}
              </div>
            )}
          </div>
        </div>
        <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white/20 transition-colors duration-300 border border-white/10 shadow-inner">
          <ChevronRight size={18} />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-6 relative z-10">
        <div className="bg-white/5 p-3 rounded-xl border border-white/10 shadow-inner">
           <div className="text-[8px] text-white/30 uppercase font-black tracking-[0.2em] mb-1">Population</div>
           <div className="text-sm font-black text-white/80 tracking-tight">{country.population}</div>
        </div>
        <div className="bg-white/5 p-3 rounded-xl border border-white/10 shadow-inner">
           <div className="text-[8px] text-white/30 uppercase font-black tracking-[0.2em] mb-1 flex items-center gap-1.5">
              <Maximize2 size={10} /> Area
           </div>
           <div className="text-sm font-black text-white/80 tracking-tight">{country.area}</div>
        </div>
      </div>

      <div className="flex flex-wrap gap-1.5 pt-4 border-t border-white/10 relative z-10">
         {country.languages.slice(0, 3).map((lang, idx) => (
           <span key={idx} className="text-[8px] font-black uppercase tracking-[0.15em] px-3 py-1.5 bg-white/5 text-white/40 rounded-full flex items-center gap-1.5 border border-white/10 shadow-inner">
             <Languages size={10} className="opacity-50" /> {lang}
           </span>
         ))}
      </div>
    </div>
  );
};

const sortAndFilter = <T extends Country>(list: T[], search: string, sortConfig: { key: SortKey; direction: SortDirection } | null) => {
  if (!list) return [];
  
  const searchLower = (search || '').toLowerCase();
  
  let filtered = list.filter(c => {
    if (!c) return false;
    const nameMatch = (c.name || '').toLowerCase().includes(searchLower);
    const capitalMatch = (c.capital || '').toLowerCase().includes(searchLower);
    const regionMatch = (c.region || '').toLowerCase().includes(searchLower);
    return nameMatch || capitalMatch || regionMatch;
  });

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

const Database: React.FC = () => {
  const [search, setSearch] = useState('');
  const [sortConfig, setSortConfig] = useState<{ key: SortKey; direction: SortDirection } | null>({ key: 'name', direction: 'asc' });
  const { setPageLoading } = useLayout();
  const navigate = useNavigate();

  useEffect(() => {
    setPageLoading(false);
  }, [setPageLoading]);

  const handleSort = (key: SortKey) => {
    let direction: SortDirection = 'asc';
    if (sortConfig?.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const handleCountryClick = (id: string) => {
    navigate(`/country/${id}`);
  };

  const processedCountries = useMemo(() => sortAndFilter(MOCK_COUNTRIES, search, sortConfig), [search, sortConfig]);
  const processedTerritories = useMemo(() => sortAndFilter(TERRITORIES, search, sortConfig), [search, sortConfig]);
  const processedDeFacto = useMemo(() => sortAndFilter(DE_FACTO_COUNTRIES, search, sortConfig), [search, sortConfig]);

  return (
    <div className="pt-32 pb-20 px-4 md:px-6 bg-surface-dark min-h-screen relative overflow-hidden">
      {/* Background Decor */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-20%] right-[-10%] w-[100%] h-[100%] bg-sky/3 rounded-full blur-[180px] opacity-30" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[80%] h-[80%] bg-sky/2 rounded-full blur-[150px] opacity-20" />
      </div>

      <SEO 
        title="Global Country Database"
        description="Search and sort data for over 190 nations. High-fidelity database of world geography."
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
          <div>
            <div className="inline-flex items-center gap-2.5 px-4 py-2 bg-sky/30 border-2 border-white/40 rounded-full text-[9px] font-black uppercase tracking-[0.3em] text-white mb-6 relative overflow-hidden group">
               <div className="absolute inset-0 bg-glossy-gradient opacity-50" />
               <Globe size={12} className="animate-spin-slow relative z-10 text-sky-light" />
               <span className="relative z-10 drop-shadow-md">GLOBAL DATABASE</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-display font-black text-white mb-4 tracking-tighter uppercase leading-none drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)]">Database</h1>
            <p className="text-white/70 text-lg font-bold uppercase tracking-wide max-w-2xl drop-shadow-lg">Detailed data for 195 sovereign states.</p>
          </div>
          
          <div className="relative w-full md:w-[400px] group">
            <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-white/40 group-focus-within:text-sky-light transition-colors duration-500" />
            </div>
            <input
              type="text"
              placeholder="SEARCH COUNTRIES..."
              className="block w-full pl-16 pr-6 py-4 bg-white/15 border-2 border-white/40 rounded-2xl shadow-inner text-white placeholder:text-white/20 font-bold uppercase text-[11px] tracking-[0.2em] focus:outline-none focus:ring-8 focus:ring-sky/10 focus:border-white/60 focus:bg-white/25 transition-all duration-500"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <div className="absolute inset-0 bg-glossy-gradient opacity-20 rounded-2xl pointer-events-none" />
          </div>
        </div>

        {/* Sovereign Countries Section */}
        <div className="hidden lg:block bg-white/10 backdrop-blur-xl rounded-3xl overflow-hidden border border-white/20 mb-16 relative group">
          <div className="absolute inset-0 bg-glossy-gradient opacity-10 pointer-events-none" />
          <div className="overflow-x-auto relative z-10">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white/5 border-b border-white/15">
                  <SortHeader label="Country" field="name" sortConfig={sortConfig} onSort={handleSort} />
                  <SortHeader label="Capital" field="capital" sortConfig={sortConfig} onSort={handleSort} />
                  <SortHeader label="Region" field="region" sortConfig={sortConfig} onSort={handleSort} />
                  <SortHeader label="Population" field="population" sortConfig={sortConfig} onSort={handleSort} align="right" />
                  <SortHeader label="Area (km²)" field="area" sortConfig={sortConfig} onSort={handleSort} align="right" />
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {processedCountries.map((country) => (
                  <tr 
                    key={country.id} 
                    onClick={() => handleCountryClick(country.id)}
                    className="group/row hover:bg-white/25 transition-all duration-500 cursor-pointer"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-4">
                        <div className="shrink-0 transition-transform duration-500">
                            <FlagIcon country={country} size="small" />
                        </div>
                        <span className="font-bold text-sm text-white/90 uppercase tracking-tighter group-hover/row:text-sky-light transition-colors drop-shadow-sm">{country.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-[10px] font-bold uppercase tracking-[0.2em] text-white/60 group-hover/row:text-white transition-colors">{country.capital}</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-[0.2em] bg-sky/30 text-white border border-white/40 group-hover/row:bg-sky/50 transition-all whitespace-nowrap">
                        {country.region}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-xs font-bold text-white/80 tabular-nums text-right group-hover/row:text-white transition-colors">{country.population}</td>
                    <td className="px-6 py-4 text-xs font-bold text-white/80 tabular-nums text-right group-hover/row:text-white transition-colors">{country.area}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="lg:hidden grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
          {processedCountries.map((country) => (
             <MobileCountryCard key={country.id} country={country} onClick={() => handleCountryClick(country.id)} />
          ))}
        </div>

        {/* --- Officially Recognized Territories Section --- */}
        <div className="mb-16">
            <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-accent/30 rounded-xl text-white border border-white/40 flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-glossy-gradient opacity-50" />
                    <Globe size={24} className="relative z-10 drop-shadow-md" />
                </div>
                <div>
                    <h2 className="text-3xl font-display font-black text-white uppercase tracking-tighter drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]">Autonomous Regions</h2>
                    <p className="text-white/60 text-sm font-bold uppercase tracking-[0.2em] mt-0.5 drop-shadow-lg">Major non-sovereign dependencies and territories.</p>
                </div>
            </div>
            
            <div className="hidden lg:block bg-white/10 backdrop-blur-xl rounded-3xl overflow-hidden border border-white/20 relative group">
              <div className="absolute inset-0 bg-glossy-gradient opacity-10 pointer-events-none" />
              <div className="overflow-x-auto relative z-10">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-accent/10 border-b border-white/20">
                      <SortHeader label="Territory" field="name" sortConfig={sortConfig} onSort={handleSort} />
                      <th className="px-6 py-4 text-left text-[9px] font-black text-white/50 uppercase tracking-[0.3em] whitespace-nowrap">Sovereignty</th>
                      <SortHeader label="Capital" field="capital" sortConfig={sortConfig} onSort={handleSort} />
                      <SortHeader label="Sector" field="region" sortConfig={sortConfig} onSort={handleSort} />
                      <SortHeader label="Population" field="population" sortConfig={sortConfig} onSort={handleSort} align="right" />
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/10">
                    {processedTerritories.map((territory) => (
                      <tr 
                        key={territory.id} 
                        onClick={() => handleCountryClick(territory.id)}
                        className="group/row hover:bg-accent/20 transition-all duration-500 cursor-pointer"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-4">
                            <div className="shrink-0 transition-transform duration-500">
                                <FlagIcon country={territory} size="small" />
                            </div>
                            <span className="font-bold text-sm text-white/90 uppercase tracking-tighter group-hover/row:text-accent transition-colors drop-shadow-sm">{territory.name}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-[9px] font-bold text-accent uppercase tracking-[0.2em]">
                            {territory.sovereignty}
                        </td>
                        <td className="px-6 py-4 text-[10px] font-bold uppercase tracking-[0.2em] text-white/60 group-hover/row:text-white transition-colors">{territory.capital}</td>
                        <td className="px-6 py-4">
                          <span className="inline-flex items-center px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-[0.2em] bg-white/10 text-white border border-white/30 shadow-inner group-hover/row:bg-white/25 transition-all">
                            {territory.region}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-xs font-bold text-white/80 tabular-nums text-right group-hover/row:text-white transition-colors">{territory.population}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="lg:hidden grid grid-cols-1 md:grid-cols-2 gap-6">
              {processedTerritories.map((territory) => (
                 <MobileCountryCard key={territory.id} country={territory} onClick={() => handleCountryClick(territory.id)} isTerritory sovereignty={territory.sovereignty} />
              ))}
           </div>
        </div>

        {/* --- De Facto States Section --- */}
        <div className="mb-16">
            <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-warning/30 rounded-xl text-white border border-white/40 flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-glossy-gradient opacity-50" />
                    <AlertTriangle size={24} className="relative z-10 drop-shadow-md" />
                </div>
                <div>
                    <h2 className="text-3xl font-display font-black text-white uppercase tracking-tighter drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]">De Facto States</h2>
                    <p className="text-white/60 text-sm font-bold uppercase tracking-[0.2em] mt-0.5 drop-shadow-lg">Entities with limited international recognition.</p>
                </div>
            </div>
            
            <div className="hidden lg:block bg-white/10 backdrop-blur-xl rounded-3xl overflow-hidden border border-white/20 relative group">
              <div className="absolute inset-0 bg-glossy-gradient opacity-10 pointer-events-none" />
              <div className="overflow-x-auto relative z-10">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-warning/10 border-b border-white/20">
                      <SortHeader label="Entity" field="name" sortConfig={sortConfig} onSort={handleSort} />
                      <th className="px-6 py-4 text-left text-[9px] font-black text-white/50 uppercase tracking-[0.3em] whitespace-nowrap">Status</th>
                      <SortHeader label="Capital" field="capital" sortConfig={sortConfig} onSort={handleSort} />
                      <SortHeader label="Sector" field="region" sortConfig={sortConfig} onSort={handleSort} />
                      <SortHeader label="Population" field="population" sortConfig={sortConfig} onSort={handleSort} align="right" />
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/10">
                    {processedDeFacto.map((state) => (
                      <tr 
                        key={state.id} 
                        onClick={() => handleCountryClick(state.id)}
                        className="group/row hover:bg-warning/20 transition-all duration-500 cursor-pointer"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-4">
                            <div className="shrink-0 transition-transform duration-500">
                                <FlagIcon country={state} size="small" />
                            </div>
                            <span className="font-bold text-sm text-white/90 uppercase tracking-tighter group-hover/row:text-warning transition-colors drop-shadow-sm">{state.name}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-[9px] font-bold text-warning uppercase tracking-[0.2em]">
                            {state.sovereignty}
                        </td>
                        <td className="px-6 py-4 text-[10px] font-bold uppercase tracking-[0.2em] text-white/60 group-hover/row:text-white transition-colors">{state.capital}</td>
                        <td className="px-6 py-4">
                          <span className="inline-flex items-center px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-[0.2em] bg-white/10 text-white border border-white/30 shadow-inner group-hover/row:bg-white/25 transition-all">
                            {state.region}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-xs font-bold text-white/80 tabular-nums text-right group-hover/row:text-white transition-colors">{state.population}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="lg:hidden grid grid-cols-1 md:grid-cols-2 gap-6">
              {processedDeFacto.map((state) => (
                 <MobileCountryCard key={state.id} country={state} onClick={() => handleCountryClick(state.id)} isDeFacto sovereignty={state.sovereignty} />
              ))}
           </div>
        </div>

        {processedCountries.length === 0 && processedTerritories.length === 0 && processedDeFacto.length === 0 && (
          <div className="bg-white/5 backdrop-blur-3xl rounded-2xl p-16 text-center border border-white/10 animate-in zoom-in-95">
            <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-8">
               <Search className="w-8 h-8 text-white/10" />
            </div>
            <h3 className="text-2xl font-display font-black text-white uppercase tracking-tight mb-2">No results found</h3>
            <p className="text-white/20 uppercase tracking-widest text-[9px] font-black">Protocol failed to match "{search}" within current dataset.</p>
          </div>
        )}

        {/* Scroll to Top Button */}
        {(processedCountries.length > 0 || processedTerritories.length > 0 || processedDeFacto.length > 0) && (
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

export default Database;
