import React, {
  useState,
  useMemo,
  useEffect,
  useCallback,
  memo,
  startTransition,
} from "react";
import {
  Search,
  ArrowUp,
  ArrowDown,
  ArrowUpDown,
  ChevronRight,
  Maximize2,
  Languages,
  Globe,
  AlertTriangle,
  Shuffle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { COUNTRIES, TERRITORIES, DE_FACTO_COUNTRIES } from "../constants";
import { Country, Territory } from "../types";
import { getCountryCode } from "../utils/flags";
import { toSlug } from "../utils/slug";
import SEO from "../components/SEO";
import Breadcrumbs from "../components/Breadcrumbs";
import RevealSection from "../components/RevealSection";
import { useLayout } from "../context/LayoutContext";
import { useTranslation } from "../context/LocaleContext";
import Button from "../components/Button";
import { BannerAd } from "../components/AdSense";
import { useDebounce } from "../hooks";

type SortKey = "name" | "capital" | "region" | "population" | "area";
type SortDirection = "asc" | "desc";

// Pre-sorted data for instant initial render (sorted by name ascending)
// We use a simple sort here, but in a real app these would be pre-calculated
const PRESORTED_COUNTRIES = COUNTRIES;
const PRESORTED_TERRITORIES = TERRITORIES;
const PRESORTED_DEFACTO = DE_FACTO_COUNTRIES;

interface SortHeaderProps {
  label: string;
  field: SortKey;
  align?: "left" | "right";
  sortConfig: { key: SortKey; direction: SortDirection } | null;
  onSort: (key: SortKey) => void;
}

const SortHeader: React.FC<SortHeaderProps> = memo(
  ({ label, field, align = "left", sortConfig, onSort }) => {
    const isActive = sortConfig?.key === field;
    const isAsc = sortConfig?.direction === "asc";

    return (
      <div
        className={`px-6 py-4 cursor-pointer hover:bg-surface transition-colors group select-none ${align === "right" ? "text-right" : "text-left"} whitespace-nowrap h-full w-full`}
        onClick={() => onSort(field)}
      >
        <div
          className={`flex items-center gap-3 ${align === "right" ? "justify-end" : "justify-start"}`}
        >
          <span
            className={`font-black text-[9px] uppercase tracking-[0.2em] transition-colors ${isActive ? "text-text" : "text-muted group-hover:text-text"}`}
          >
            {label}
          </span>
          <span
            className={`transition-opacity ${isActive ? "opacity-100 text-text" : "opacity-0 group-hover:opacity-50 text-muted"}`}
          >
            {isActive ? (
              isAsc ? (
                <ArrowUp size={12} />
              ) : (
                <ArrowDown size={12} />
              )
            ) : (
              <ArrowUpDown size={12} />
            )}
          </span>
        </div>
      </div>
    );
  },
);

SortHeader.displayName = "SortHeader";

// Simple flag component - no lazy loading overhead for visible items
const FlagIcon: React.FC<{ country: Country; size: "small" | "card" }> = memo(
  ({ country, size }) => {
    const code = getCountryCode(country.flag);
    const width = size === "small" ? "w-10" : "w-16";
    const height = size === "small" ? "h-7" : "h-11";

    return (
      <div className={`${width} ${height} flex items-center justify-center`}>
        <img
          src={`/flags/${code}.png`}
          alt={`${country.name} Flag`}
          className="w-full h-full object-contain"
          decoding="sync"
        />
      </div>
    );
  },
);

FlagIcon.displayName = "FlagIcon";

// Memoized table row component
interface TableRowProps {
  country: Country;
  onClick: () => void;
  hoverColor?: string;
  showSovereignty?: boolean;
  sovereignty?: string;
  titleColor?: string;
}

const TableRow: React.FC<TableRowProps> = memo(
  ({
    country,
    onClick,
    hoverColor = "hover:bg-accent-soft/50",
    showSovereignty = false,
    sovereignty,
    titleColor = "group-hover/row:text-primary",
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
            <span
              className={`font-bold text-sm text-text uppercase tracking-tighter ${titleColor} transition-colors`}
            >
              {country.name}
            </span>
          </div>
        </td>
        {showSovereignty && (
          <td className="px-6 py-4 text-[9px] font-bold text-accent uppercase tracking-[0.2em]">
            {sovereignty}
          </td>
        )}
        <td className="px-6 py-4 text-[10px] font-bold uppercase tracking-[0.2em] text-muted group-hover/row:text-text transition-colors">
          {country.capital}
        </td>
        <td className="px-6 py-4">
          <span className="inline-flex items-center px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-[0.2em] bg-accent-soft text-primary border border-border whitespace-nowrap">
            {country.region}
          </span>
        </td>
        <td className="px-6 py-4 text-xs font-bold text-text tabular-nums text-right group-hover/row:text-text transition-colors">
          {country.population}
        </td>
        {!showSovereignty && (
          <td className="px-6 py-4 text-xs font-bold text-text tabular-nums text-right group-hover/row:text-text transition-colors">
            {country.area}
          </td>
        )}
      </tr>
    );
  },
);

TableRow.displayName = "TableRow";

// Memoized mobile card component
interface MobileCountryCardProps {
  country: Country;
  onClick: () => void;
  isTerritory?: boolean;
  isDeFacto?: boolean;
  sovereignty?: string;
}

const MobileCountryCard: React.FC<MobileCountryCardProps> = memo(
  ({ country, onClick, isTerritory, isDeFacto, sovereignty }) => {
    const { t } = useTranslation();
    let titleColor = "text-text";
    if (isTerritory) titleColor = "text-accent";
    if (isDeFacto) titleColor = "text-warning";

    return (
      <div
        onClick={onClick}
        className="bg-elevated p-6 rounded-2xl border border-border shadow-premium transition-colors hover:shadow-premium-hover hover:border-primary/25 cursor-pointer flex flex-col overflow-hidden relative"
      >
        <div className="flex items-start justify-between mb-6 relative z-10">
          <div className="flex items-center gap-4">
            <div className="flex-shrink-0">
              <FlagIcon country={country} size="card" />
            </div>
            <div>
              <h3
                className={`font-black text-lg uppercase tracking-tighter leading-none mb-1.5 ${titleColor}`}
              >
                {country.name}
              </h3>
              <div className="text-[9px] font-black uppercase tracking-[0.2em] text-muted">
                {country.capital}
              </div>
              {(isTerritory || isDeFacto) && (
                <div className="text-[8px] font-black uppercase tracking-[0.2em] text-primary mt-2 flex items-center gap-1.5">
                  <div className="w-1 h-1 rounded-full bg-primary" />
                  {sovereignty || t("database.limitedRecognition")}
                </div>
              )}
            </div>
          </div>
          <div className="w-8 h-8 rounded-full bg-surface flex items-center justify-center text-muted border border-border">
            <ChevronRight size={18} />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-6 relative z-10">
          <div className="bg-surface p-3 rounded-xl border border-border">
            <div className="text-[8px] text-muted uppercase font-black tracking-[0.2em] mb-1">
              {t("database.population")}
            </div>
            <div className="text-sm font-black text-text tracking-tight">
              {country.population}
            </div>
          </div>
          <div className="bg-surface p-3 rounded-xl border border-border">
            <div className="text-[8px] text-muted uppercase font-black tracking-[0.2em] mb-1 flex items-center gap-1.5">
              <Maximize2 size={10} /> {t("database.area")}
            </div>
            <div className="text-sm font-black text-text tracking-tight">
              {country.area}
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5 pt-4 border-t border-border relative z-10">
          {country.languages.slice(0, 3).map((lang, idx) => (
            <span
              key={idx}
              className="text-[8px] font-black uppercase tracking-[0.15em] px-3 py-1.5 bg-surface text-muted rounded-full flex items-center gap-1.5 border border-border"
            >
              <Languages size={10} className="opacity-50" /> {lang}
            </span>
          ))}
        </div>
      </div>
    );
  },
);

MobileCountryCard.displayName = "MobileCountryCard";

// Simple table for desktop - renders all rows
interface SimpleTableProps {
  items: Country[];
  onItemClick: (name: string) => void;
  sortConfig: { key: SortKey; direction: SortDirection } | null;
  onSort: (key: SortKey) => void;
  hoverColor?: string;
  showSovereignty?: boolean;
  titleColor?: string;
  headerBgClass?: string;
}

const SimpleTable: React.FC<SimpleTableProps> = memo(
  ({
    items,
    onItemClick,
    sortConfig,
    onSort,
    hoverColor,
    showSovereignty,
    titleColor,
    headerBgClass = "bg-surface-dark",
  }) => {
    const { t } = useTranslation();
    return (
      <div className="overflow-hidden rounded-2xl border border-border bg-elevated shadow-premium">
        <table className="w-full text-left border-collapse table-fixed">
          <thead className="z-20">
            <tr className={`${headerBgClass} border-b border-border`}>
              <th className="w-[30%]">
                <SortHeader
                  label={
                    showSovereignty
                      ? t("database.territory")
                      : t("database.country")
                  }
                  field="name"
                  sortConfig={sortConfig}
                  onSort={onSort}
                />
              </th>
              {showSovereignty && (
                <th className="w-[15%] px-6 py-4 text-left text-[9px] font-black text-muted uppercase tracking-[0.3em] whitespace-nowrap">
                  {showSovereignty
                    ? t("database.sovereignty")
                    : t("database.status")}
                </th>
              )}
              <th className={showSovereignty ? "w-[20%]" : "w-[20%]"}>
                <SortHeader
                  label={t("database.capital")}
                  field="capital"
                  sortConfig={sortConfig}
                  onSort={onSort}
                />
              </th>
              <th className={showSovereignty ? "w-[15%]" : "w-[15%]"}>
                <SortHeader
                  label={
                    showSovereignty
                      ? t("database.sector")
                      : t("database.region")
                  }
                  field="region"
                  sortConfig={sortConfig}
                  onSort={onSort}
                />
              </th>
              <th className={showSovereignty ? "w-[20%]" : "w-[15%]"}>
                <SortHeader
                  label={t("database.population")}
                  field="population"
                  sortConfig={sortConfig}
                  onSort={onSort}
                  align="right"
                />
              </th>
              {!showSovereignty && (
                <th className="w-[20%]">
                  <SortHeader
                    label={t("database.areaKm")}
                    field="area"
                    sortConfig={sortConfig}
                    onSort={onSort}
                    align="right"
                  />
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {items.map((country) => (
              <TableRow
                key={country.id}
                country={country}
                onClick={() => onItemClick(country.name)}
                hoverColor={hoverColor}
                showSovereignty={showSovereignty}
                sovereignty={(country as Territory).sovereignty}
                titleColor={titleColor}
              />
            ))}
          </tbody>
        </table>
      </div>
    );
  },
);

SimpleTable.displayName = "SimpleTable";

// Simple mobile list - renders all items
interface MobileListProps {
  items: Country[];
  onItemClick: (name: string) => void;
  isTerritory?: boolean;
  isDeFacto?: boolean;
  getSovereignty?: (item: Country) => string | undefined;
}

const MobileList: React.FC<MobileListProps> = memo(
  ({ items, onItemClick, isTerritory, isDeFacto, getSovereignty }) => {
    return (
      <div className="lg:hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {items.map((item) => (
            <MobileCountryCard
              key={item.id}
              country={item}
              onClick={() => onItemClick(item.name)}
              isTerritory={isTerritory}
              isDeFacto={isDeFacto}
              sovereignty={getSovereignty?.(item)}
            />
          ))}
        </div>
      </div>
    );
  },
);

MobileList.displayName = "MobileList";

const sortAndFilter = <T extends Country>(
  list: T[],
  search: string,
  sortConfig: { key: SortKey; direction: SortDirection } | null,
): T[] => {
  if (!list) return [];

  const searchLower = (search || "").toLowerCase().trim();
  const searchWithoutThe = searchLower.startsWith("the ")
    ? searchLower.replace(/^the\s+/, "")
    : searchLower;

  if (!searchLower) {
    if (sortConfig) {
      return [...list].sort((a, b) => {
        if (!a || !b) return 0;
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];

        if (typeof aValue === "string" && typeof bValue === "string") {
          return sortConfig.direction === "asc"
            ? aValue.localeCompare(bValue)
            : bValue.localeCompare(aValue);
        }
        return 0;
      });
    }
    return [...list];
  }

  // Scoring-based filtering
  const scored = list
    .map((item) => {
      if (!item) return null;
      const name = (item.name || "").toLowerCase();
      const capital = (item.capital || "").toLowerCase();
      const region = (item.region || "").toLowerCase();
      const aliases = (item.alsoKnownAs || []).map((a) => a.toLowerCase());

      let score = 0;

      // Exact name match (highest priority)
      if (name === searchLower || name === searchWithoutThe) score += 100;
      // Name starts with search
      else if (
        name.startsWith(searchLower) ||
        name.startsWith(searchWithoutThe)
      )
        score += 80;
      // Alias exact match
      else if (aliases.some((a) => a === searchLower || a === searchWithoutThe))
        score += 75;
      // Name contains search as a word boundary
      else if (
        name.includes(" " + searchLower) ||
        name.includes(" " + searchWithoutThe)
      )
        score += 60;
      // Alias starts with search
      else if (
        aliases.some(
          (a) => a.startsWith(searchLower) || a.startsWith(searchWithoutThe),
        )
      )
        score += 55;
      // Name contains search
      else if (name.includes(searchLower) || name.includes(searchWithoutThe))
        score += 40;
      // Alias contains search
      else if (
        aliases.some(
          (a) => a.includes(searchLower) || a.includes(searchWithoutThe),
        )
      )
        score += 35;

      // Capital matches
      if (capital === searchLower || capital === searchWithoutThe) score += 30;
      else if (
        capital.startsWith(searchLower) ||
        capital.startsWith(searchWithoutThe)
      )
        score += 20;
      else if (
        capital.includes(searchLower) ||
        capital.includes(searchWithoutThe)
      )
        score += 10;

      // Region matches (lowest priority)
      if (region.includes(searchLower) || region.includes(searchWithoutThe))
        score += 5;

      return score > 0 ? { item, score } : null;
    })
    .filter((x): x is { item: T; score: number } => x !== null);

  // Sort by score first, then by the user's chosen sort config
  scored.sort((a, b) => {
    if (b.score !== a.score) {
      return b.score - a.score;
    }

    if (sortConfig) {
      const aValue = a.item[sortConfig.key];
      const bValue = b.item[sortConfig.key];
      if (typeof aValue === "string" && typeof bValue === "string") {
        return sortConfig.direction === "asc"
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }
    }
    return 0;
  });

  return scored.map((x) => x.item);
};

const DatabasePage: React.FC = () => {
  const { t } = useTranslation();
  const [searchInput, setSearchInput] = useState("");
  const debouncedSearch = useDebounce(searchInput, 200);
  const [sortConfig, setSortConfig] = useState<{
    key: SortKey;
    direction: SortDirection;
  } | null>({ key: "name", direction: "asc" });
  const { setPageLoading } = useLayout();
  const navigate = useNavigate();

  // Mark page as loaded immediately
  useEffect(() => {
    setPageLoading(false);
  }, [setPageLoading]);

  const handleSort = useCallback((key: SortKey) => {
    startTransition(() => {
      setSortConfig((prev) => ({
        key,
        direction:
          prev?.key === key && prev.direction === "asc" ? "desc" : "asc",
      }));
    });
  }, []);

  const handleCountryClick = useCallback(
    (name: string) => {
      navigate(`/country/${toSlug(name)}`);
    },
    [navigate],
  );

  const handleRandomSearch = useCallback(() => {
    const allItems = [...COUNTRIES, ...TERRITORIES, ...DE_FACTO_COUNTRIES];
    if (allItems.length === 0) return;
    const randomItem = allItems[Math.floor(Math.random() * allItems.length)];
    navigate(`/country/${toSlug(randomItem.name)}`);
  }, [navigate]);

  // Use pre-sorted data for initial render (no search, default sort)
  const processedCountries = useMemo(() => {
    if (
      !debouncedSearch &&
      sortConfig?.key === "name" &&
      sortConfig?.direction === "asc"
    ) {
      return PRESORTED_COUNTRIES;
    }
    return sortAndFilter(COUNTRIES, debouncedSearch, sortConfig);
  }, [debouncedSearch, sortConfig]);

  const processedTerritories = useMemo(() => {
    if (
      !debouncedSearch &&
      sortConfig?.key === "name" &&
      sortConfig?.direction === "asc"
    ) {
      return PRESORTED_TERRITORIES;
    }
    return sortAndFilter(TERRITORIES, debouncedSearch, sortConfig);
  }, [debouncedSearch, sortConfig]);

  const processedDeFacto = useMemo(() => {
    if (
      !debouncedSearch &&
      sortConfig?.key === "name" &&
      sortConfig?.direction === "asc"
    ) {
      return PRESORTED_DEFACTO;
    }
    return sortAndFilter(DE_FACTO_COUNTRIES, debouncedSearch, sortConfig);
  }, [debouncedSearch, sortConfig]);

  const getTerritorysovereignty = useCallback(
    (item: Country) => (item as Territory).sovereignty,
    [],
  );

  const hasResults =
    processedCountries.length > 0 ||
    processedTerritories.length > 0 ||
    processedDeFacto.length > 0;

  return (
    <div className="pt-32 pb-20 px-4 md:px-6 min-h-screen relative overflow-hidden bg-surface">
      <SEO
        title="Country Database"
        description="Explore detailed profiles of 195+ countries. Search by name, region, population, or area. Free geography reference with capitals, flags, and key facts."
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <Breadcrumbs
          items={[{ label: "Home", href: "/" }, { label: "Database" }]}
        />
        <RevealSection className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-8 md:mb-12">
          <div>
            <div className="inline-flex items-center gap-2.5 px-4 py-2 bg-accent-soft border border-border rounded-full text-[9px] font-black uppercase tracking-[0.3em] text-text mb-6 relative overflow-hidden group">
              <Globe size={12} className="relative z-10 text-primary" />
              <span className="relative z-10">{t("database.badge")}</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-display font-black text-text mb-4 tracking-tighter uppercase leading-none">
              {t("database.heading")}
            </h1>
            <p className="text-muted text-lg font-bold uppercase tracking-wide max-w-2xl">
              {t("database.subtitle")}
            </p>
          </div>

          <div className="flex flex-col md:flex-row items-stretch md:items-center gap-4 w-full md:w-auto min-w-0">
            <button
              onClick={handleRandomSearch}
              className="flex items-center justify-center gap-3 px-6 py-4 bg-accent-soft border border-border hover:border-primary/30 hover:shadow-premium rounded-2xl shadow-premium text-text transition-all duration-300 group h-[58px] shrink-0"
              title="Random Profile"
            >
              <Shuffle
                size={18}
                className="text-primary group-hover:rotate-12 transition-transform"
              />
              <span className="font-bold uppercase text-[11px] tracking-[0.2em]">
                {t("database.random")}
              </span>
            </button>

            <div className="relative w-full md:w-[400px] md:max-w-full min-w-0 group">
              <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-muted group-focus-within:text-primary transition-colors duration-300" />
              </div>
              <input
                type="text"
                placeholder={t("database.search")}
                className="block w-full pl-16 pr-6 py-4 bg-elevated border border-border rounded-2xl text-text placeholder:text-muted shadow-premium font-bold uppercase text-[11px] tracking-[0.2em] focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary/40 transition-all duration-300 h-[58px]"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
            </div>
          </div>
        </RevealSection>

        {/* Sovereign Countries Section */}
        <RevealSection className="mb-16" delay={0.1}>
          <div className="hidden lg:block">
            <SimpleTable
              items={processedCountries}
              onItemClick={handleCountryClick}
              sortConfig={sortConfig}
              onSort={handleSort}
            />
          </div>

          <MobileList
            items={processedCountries}
            onItemClick={handleCountryClick}
          />
        </RevealSection>

        {/* --- Autonomous Regions Section --- */}
        {processedTerritories.length > 0 && (
          <RevealSection className="mb-16">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-accent/30 rounded-xl text-text border border-border flex items-center justify-center">
                <Globe size={24} />
              </div>
              <div>
                <h2 className="text-3xl font-display font-black text-text uppercase tracking-tighter">
                  {t("database.autonomousRegions")}
                </h2>
                <p className="text-muted text-sm font-bold uppercase tracking-[0.2em] mt-0.5">
                  {t("database.autonomousRegionsDesc")}
                </p>
              </div>
            </div>

            <div className="hidden lg:block">
              <SimpleTable
                items={processedTerritories}
                onItemClick={handleCountryClick}
                sortConfig={sortConfig}
                onSort={handleSort}
                hoverColor="hover:bg-accent/20"
                showSovereignty={true}
                titleColor="group-hover/row:text-accent"
                headerBgClass="bg-accent-soft"
              />
            </div>

            <MobileList
              items={processedTerritories}
              onItemClick={handleCountryClick}
              isTerritory
              getSovereignty={getTerritorysovereignty}
            />
          </RevealSection>
        )}

        {/* --- De Facto States Section --- */}
        {processedDeFacto.length > 0 && (
          <RevealSection className="mb-16">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-warning/15 rounded-xl text-warning border border-border flex items-center justify-center">
                <AlertTriangle size={24} />
              </div>
              <div>
                <h2 className="text-3xl font-display font-black text-text uppercase tracking-tighter">
                  {t("database.deFactoStates")}
                </h2>
                <p className="text-muted text-sm font-bold uppercase tracking-[0.2em] mt-0.5">
                  {t("database.deFactoStatesDesc")}
                </p>
              </div>
            </div>

            <div className="hidden lg:block">
              <SimpleTable
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

            <MobileList
              items={processedDeFacto}
              onItemClick={handleCountryClick}
              isDeFacto
              getSovereignty={getTerritorysovereignty}
            />
          </RevealSection>
        )}

        {!hasResults && (
          <RevealSection>
            <div className="bg-surface rounded-2xl p-16 text-center border border-border">
              <div className="w-16 h-16 bg-surface rounded-full flex items-center justify-center mx-auto mb-8">
                <Search className="w-8 h-8 text-muted/40" />
              </div>
              <h3 className="text-2xl font-display font-black text-text uppercase tracking-tight mb-2">
                {t("database.noResults")}
              </h3>
              <p className="text-muted uppercase tracking-widest text-[9px] font-black">
                {t("database.noResultsDesc", { query: debouncedSearch })}
              </p>
            </div>
          </RevealSection>
        )}

        {/* Strategic Ad Placement - After content */}
        {hasResults && (
          <RevealSection className="mt-12 md:mt-16">
            <BannerAd slot="1514422173" />
          </RevealSection>
        )}

        {/* Scroll to Top Button */}
        {hasResults && (
          <div className="mt-12 flex justify-center">
            <Button
              variant="secondary"
              size="md"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="group h-14 px-10 border border-border hover:border-border text-[10px] uppercase tracking-[0.3em]"
            >
              <ArrowUp
                size={16}
                className="mr-2 transition-transform text-primary"
              />
              <span className="relative z-10">{t("database.backToTop")}</span>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DatabasePage;
