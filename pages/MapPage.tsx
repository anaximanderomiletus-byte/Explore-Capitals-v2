import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import { Filter, Compass, Map as MapIcon, Search, X, Plus, Minus, Globe, AlertTriangle, Eye, EyeOff } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { MOCK_COUNTRIES, TERRITORIES, DE_FACTO_COUNTRIES } from '../constants';
import Button from '../components/Button';
import { Country } from '../types';
import SEO from '../components/SEO';
import { useLayout } from '../context/LayoutContext';

// Define regions for filtering
const REGIONS = ['All', 'Africa', 'Asia', 'Europe', 'North America', 'South America', 'Oceania'];

// Helper to get ISO code for flags
const getCountryCode = (emoji: string) => {
    return Array.from(emoji)
        .map(char => String.fromCharCode(char.codePointAt(0)! - 127397).toLowerCase())
        .join('');
};

interface StoredMarker {
  id: string;
  region: string;
  type: 'sovereign' | 'territory' | 'defacto';
  marker: any; // Leaflet Marker
}

const MapPage: React.FC = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markersLayerRef = useRef<any>(null);
  
  // Store marker instances to manipulate them without re-creating (Object Pooling)
  const allMarkersRef = useRef<StoredMarker[]>([]);
  
  const [selectedRegion, setSelectedRegion] = useState('All');
  const [showTerritories, setShowTerritories] = useState(true);
  const [showDeFacto, setShowDeFacto] = useState(true);
  const [mapReady, setMapReady] = useState(false);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { setPageLoading, setHideFooter } = useLayout();
  
  // Search State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [activeCountryId, setActiveCountryId] = useState<string | null>(null);
  const [showUI, setShowUI] = useState(true);
  const regionScrollRef = useRef<HTMLDivElement>(null);
  const [isLoadingRandom, setIsLoadingRandom] = useState(false);
  const isLoadingRandomRef = useRef(false);
  useEffect(() => { isLoadingRandomRef.current = isLoadingRandom; }, [isLoadingRandom]);
  
  const desktopResultsRef = useRef<HTMLDivElement>(null);
  const mobileResultsRef = useRef<HTMLDivElement>(null);

  // Track previous region to determine if we should re-center the map
  const prevRegionRef = useRef(selectedRegion);
  
  // Track processed URL country to prevent loops/locking
  const processedCountryRef = useRef<string | null>(null);

  // Memoize Popup Content Creator
  const createPopupContent = useCallback((country: Country, type: 'sovereign' | 'territory' | 'defacto') => {
    const flagCode = getCountryCode(country.flag);
    const flagUrl = `https://flagcdn.com/w80/${flagCode}.png`;
    
    let subheader = '';
    let linkClass = 'text-sky';
    let linkGlow = '';
    
    if (type === 'territory') {
      subheader = `<div class="text-[10px] font-black text-accent uppercase tracking-[0.2em] mb-3">Territory of ${(country as any).sovereignty}</div>`;
      linkClass = 'text-accent';
    } else if (type === 'defacto') {
      subheader = `<div class="text-[10px] font-black text-warning uppercase tracking-[0.2em] mb-3"> ${(country as any).sovereignty}</div>`;
      linkClass = 'text-warning';
    } else {
      subheader = `<div class="text-[10px] font-black text-sky uppercase tracking-[0.2em] mb-3">Sovereign State</div>`;
    }
    
    return `
      <div class="flex flex-col font-sans relative">
        <div class="flex items-center gap-4 mb-5 relative">
           <div class="w-12 h-8 shrink-0 flex items-center justify-center">
             <img src="${flagUrl}" alt="${country.name} Flag" class="w-full h-full object-contain filter drop-shadow-lg" />
           </div>
           <h3 class="font-display font-black text-2xl text-white tracking-tighter uppercase leading-none m-0 drop-shadow-xl">${country.name}</h3>
        </div>
        
        ${subheader}

        <div class="mb-6 bg-black/40 p-4 rounded-2xl border border-white/10 shadow-inner relative text-center">
           <span class="text-[10px] font-black text-sky-light uppercase tracking-[0.2em] block mb-1">Capital City</span>
           <span class="font-display font-black text-white text-lg uppercase tracking-tight drop-shadow-sm">${country.capital}</span>
        </div>

        <div class="text-center relative">
          <button 
            data-country-id="${country.id}" 
            class="learn-more-btn ${linkClass} ${linkGlow} w-full h-12 bg-white/10 border-2 border-white/40 rounded-2xl text-[11px] font-black uppercase tracking-[0.3em] hover:bg-white/20 transition-all outline-none"
          >
            Launch Profile
          </button>
        </div>
      </div>
    `;
  }, []);

  // Smart centering function to handle UI obstructions
  const centerMapOnMarker = useCallback((marker: any) => {
      const map = mapInstanceRef.current;
      const L = (window as any).L;
      if (!map || !L) return;

      const isMobile = window.innerWidth < 768;
      
      // Define UI Obstruction Dimensions
      const topNavHeight = isMobile ? 80 : 100; // Navigation bar height
      
      // For desktop, we want the marker (and popup) to be visually centered in the viewport.
      // Even though there is a sidebar, centering on the screen looks more balanced for a focused view.
      const sidebarWidth = 0; 
      
      const bottomSheetHeight = isMobile ? 240 : 0; // Mobile bottom panel height
      
      const mapSize = map.getSize();
      
      // Calculate "Safe Zone" center relative to the map container
      // For desktop: Center is horizontal center
      // For mobile: Center is shifted up to avoid bottom sheet
      const targetX = sidebarWidth + ((mapSize.x - sidebarWidth) / 2);
      const targetY = topNavHeight + ((mapSize.y - topNavHeight - bottomSheetHeight) / 2);

      // We want the marker to be at (targetX, targetY + offset)
      // The offset pushes the marker down so the POPUP (which opens above the marker) is centered in the safe zone
      // Reduced offset (from 150 to 75) to move the popup higher up, closer to the visual center
      const popupOffset = 75; 
      const desiredMarkerScreenY = targetY + popupOffset;

      // Determine target zoom level for "fair view"
      // If current zoom is already quite deep, keep it, otherwise zoom in to ~5.5
      const targetZoom = Math.max(map.getZoom(), isMobile ? 4.5 : 5.5);

      // CRITICAL: We MUST project and unproject using the TARGET zoom level.
      // If we calculate offsets at zoom 3 but fly to zoom 5.5, the pixel centering will be wrong.
      const markerGlobal = map.project(marker.getLatLng(), targetZoom);
      
      // Calculate the screen offset from the true center of the map container
      const screenOffsetX = targetX - (mapSize.x / 2);
      const screenOffsetY = desiredMarkerScreenY - (mapSize.y / 2);
      
      // Calculate new center in global pixels
      const newCenterGlobal = markerGlobal.subtract(L.point(screenOffsetX, screenOffsetY));
      
      const newCenterLatLng = map.unproject(newCenterGlobal, targetZoom);
      
      map.flyTo(newCenterLatLng, targetZoom, {
          duration: 0.8, // Slightly longer for the zoom feel
          easeLinearity: 0.25
      });
  }, []);

  // Effect: Ensure page loading state is cleared when component mounts
  useEffect(() => {
    // Immediate clear if map already ready
    if (mapReady) {
      setPageLoading(false);
    }
    
    // Safety fallback
    const timer = setTimeout(() => {
      setPageLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [setPageLoading, mapReady]);

  // Initialize Map
  useEffect(() => {
    const L = (window as any).L;
    
    setHideFooter(true);

    if (!L) {
      // If Leaflet isn't ready yet, wait a bit and retry
      const retryTimer = setTimeout(() => {
        setMapReady(false); // Trigger re-run
      }, 500);
      return () => clearTimeout(retryTimer);
    }

    if (mapRef.current && !mapInstanceRef.current) {
      try {
        const map = L.map(mapRef.current, {
          center: [20, 0],
          zoom: 3,
          zoomControl: false,
          attributionControl: false,
          minZoom: 2,
          worldCopyJump: true,
          // Allow infinite horizontal scrolling but lock vertical bounds to prevent seeing gray void
          maxBounds: [[-85, -5000], [85, 5000]],
          maxBoundsViscosity: 1.0,
          preferCanvas: true,
          wheelDebounceTime: 40,
          wheelPxPerZoomLevel: 60,
          updateWhenIdle: true,
        });

        L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}{r}.png', {
          subdomains: 'abcd',
          maxZoom: 20
        }).addTo(map);
        
        L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager_only_labels/{z}/{x}/{y}{r}.png', {
          subdomains: 'abcd',
          maxZoom: 20,
          zIndex: 10
        }).addTo(map);

        markersLayerRef.current = L.layerGroup().addTo(map);
        mapInstanceRef.current = map;
        
        // CRITICAL: Ensure map is correctly sized before we allow any interactions
        // We use a slightly faster timeout and wait for it to finish before setting mapReady
        setTimeout(() => {
          if (mapInstanceRef.current) {
            mapInstanceRef.current.invalidateSize();
            window.dispatchEvent(new Event('resize'));
            setMapReady(true);
            setPageLoading(false);
          }
        }, 100);

        if (allMarkersRef.current.length === 0) {
            const createMarkers = (list: Country[], type: 'sovereign' | 'territory' | 'defacto') => {
                list.forEach(country => {
                    try {
                        let markerClass = '';
                        let pinClass = '';
                        let zIndex = 0;

                        if (type === 'territory') {
                          markerClass = 'territory-marker';
                          pinClass = 'territory';
                          zIndex = -100;
                        } else if (type === 'defacto') {
                          markerClass = 'defacto-marker';
                          pinClass = 'defacto';
                          zIndex = -50;
                        }

                        // Create 3 markers for each country to support infinite horizontal scrolling
                        // This allows markers to appear on adjacent copies of the world (e.g. over the Pacific)
                        [-360, 0, 360].forEach(offset => {
                            const icon = L.divIcon({
                                className: `custom-map-marker ${markerClass}`,
                                html: `<div class="marker-pin ${pinClass}"></div>`,
                                iconSize: [20, 20],
                                iconAnchor: [10, 10]
                            });

                            const marker = L.marker([country.lat, country.lng + offset], { 
                                icon: icon,
                                zIndexOffset: zIndex
                            }).bindPopup(createPopupContent(country, type), {
                                closeButton: false,
                                className: 'custom-popup',
                                autoPan: false,
                                maxWidth: 320,
                                minWidth: 320,
                                offset: L.point(0, -10)
                            });

                            // Add to map immediately for first load performance
                            marker.addTo(markersLayerRef.current);

                            marker.on('click', () => {
                                setActiveCountryId(country.id);
                                centerMapOnMarker(marker);
                                // Wait for the flyTo animation (0.8s) plus a small buffer for stabilization
                                setTimeout(() => {
                                  marker.openPopup();
                                  // Force immediate position update
                                  if (marker.getPopup()) marker.getPopup().update();
                                }, 900);
                            });

                            allMarkersRef.current.push({
                                id: country.id,
                                region: country.region,
                                type: type,
                                marker: marker
                            });
                        });
                    } catch (e) {
                        console.error("Error creating marker for", country.name, e);
                    }
                });
            };

            createMarkers(MOCK_COUNTRIES, 'sovereign');
            createMarkers(TERRITORIES, 'territory');
            createMarkers(DE_FACTO_COUNTRIES, 'defacto');
        }

        map.on('click', () => setActiveCountryId(null));
      } catch (err) {
        console.error("Critical error initializing map:", err);
        setMapReady(false);
      }
    } else if (mapInstanceRef.current) {
      setPageLoading(false);
      setTimeout(() => {
        if (mapInstanceRef.current) {
            mapInstanceRef.current.invalidateSize();
            window.dispatchEvent(new Event('resize'));
        }
      }, 300);
    }

    const handlePopupClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target && target.classList.contains('learn-more-btn')) {
        const countryId = target.getAttribute('data-country-id');
        if (countryId) {
          navigate(`/country/${countryId}`);
        }
      }
    };

    document.addEventListener('click', handlePopupClick);

    return () => {
      document.removeEventListener('click', handlePopupClick);
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
      setHideFooter(false);
    };
  }, [navigate, setPageLoading, setHideFooter, createPopupContent, centerMapOnMarker]);

  // Handle Region Selection
  // This explicitly clears the active selection and the URL param to prevent locking
  const handleRegionSelect = (region: string) => {
    setSelectedRegion(region);
    setActiveCountryId(null);
    if (mapInstanceRef.current) {
      mapInstanceRef.current.closePopup();
    }
    // Remove the country URL param if it exists, so we don't snap back to it
    if (searchParams.get('country')) {
       setSearchParams({}, { replace: true });
    }
  };

  useEffect(() => {
    if (regionScrollRef.current && selectedRegion) {
        const activeButton = regionScrollRef.current.querySelector(`[data-region="${selectedRegion}"]`);
        if (activeButton) {
            activeButton.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
        }
    }
  }, [selectedRegion]);

  // Effect: Efficiently filter and update map without recreating markers
  useEffect(() => {
    if (!mapInstanceRef.current || !markersLayerRef.current) return;

    // Detect if the region filter has changed since the last render
    const regionChanged = prevRegionRef.current !== selectedRegion;
    prevRegionRef.current = selectedRegion;

    requestAnimationFrame(() => {
        const markersForBounds: any[] = [];
        let activeMarkerVisible = false;
        
        allMarkersRef.current.forEach(item => {
            const regionMatch = selectedRegion === 'All' || item.region === selectedRegion;
            let typeMatch = true;
            if (item.type === 'territory' && !showTerritories) typeMatch = false;
            if (item.type === 'defacto' && !showDeFacto) typeMatch = false;

            // STRICT filtering: The marker is visible only if it matches the filters.
            const isVisible = regionMatch && typeMatch;

            if (item.id === activeCountryId && isVisible) {
                activeMarkerVisible = true;
            }

            if (isVisible) {
                if (!markersLayerRef.current.hasLayer(item.marker)) {
                    markersLayerRef.current.addLayer(item.marker);
                }
                // Only include in bounds calculation if it matches filters
                if (regionMatch && typeMatch) {
                    markersForBounds.push(item.marker);
                }
            } else {
                if (markersLayerRef.current.hasLayer(item.marker)) {
                    markersLayerRef.current.removeLayer(item.marker);
                }
            }
        });

        // If the active country is no longer visible due to filtering, clear the selection.
        if (activeCountryId && !activeMarkerVisible) {
            setActiveCountryId(null);
            if (mapInstanceRef.current) mapInstanceRef.current.closePopup();
        }

        // Adjust bounds/view only if the region filter changed.
        if (regionChanged) {
            const map = mapInstanceRef.current;
            const isMobile = window.innerWidth < 768;
            
            // Fixed Region Views for better continent visibility
            // Offset logic: [lat, lng], zoom
            // lng offset to the right to avoid side menu, lat offset up to avoid bottom UI
            const views: Record<string, { center: [number, number], zoom: number }> = {
              'Africa': { center: isMobile ? [5, 20] : [0, 50], zoom: isMobile ? 2.3 : 3.2 },
              'Asia': { center: isMobile ? [35, 95] : [30, 115], zoom: isMobile ? 1.8 : 3.0 },
              'Europe': { center: isMobile ? [52, 15] : [52, 45], zoom: isMobile ? 3.0 : 3.8 },
              'North America': { center: isMobile ? [40, -100] : [40, -75], zoom: isMobile ? 2.0 : 3.0 },
              'South America': { center: isMobile ? [-20, -60] : [-20, -35], zoom: isMobile ? 2.2 : 3.2 },
              'Oceania': { center: isMobile ? [-25, 145] : [-15, 180], zoom: isMobile ? 2.3 : 3.2 },
              'All': { center: isMobile ? [20, 0] : [20, 25], zoom: isMobile ? 1.5 : 2.5 }
            };

            const view = views[selectedRegion] || views['All'];
            map.flyTo(view.center, view.zoom, {
                duration: 1.2,
                easeLinearity: 0.25
            });
        }
    });

  }, [selectedRegion, showTerritories, showDeFacto, mapReady, activeCountryId]);

  // Effect: Update marker active styles
  useEffect(() => {
    if (mapReady) {
        allMarkersRef.current.forEach((item) => {
          const el = item.marker.getElement();
          if (el) {
            if (item.id === activeCountryId) {
              el.classList.add('marker-active');
            } else {
              el.classList.remove('marker-active');
            }
          }
        });
    }
  }, [activeCountryId, mapReady]);

  // Handle URL Parameter Navigation
  useEffect(() => {
    const countryId = searchParams.get('country');
    
    // Only proceed if we have a country ID, map is ready, and it's a NEW country ID we haven't processed yet
    // OR if it's the same ID but we haven't processed it in this mount lifecycle (initial load)
    if (countryId && mapReady && mapInstanceRef.current) {
      if (countryId === processedCountryRef.current) return;

      const stored = allMarkersRef.current.find(m => m.id === countryId);
      
      if (stored) {
        processedCountryRef.current = countryId; // Mark as processed

        if (stored.type === 'territory' && !showTerritories) setShowTerritories(true);
        if (stored.type === 'defacto' && !showDeFacto) setShowDeFacto(true);
        
        // Only force region to ALL if the marker is not in the currently viewed region
        if (selectedRegion !== 'All' && stored.region !== selectedRegion) {
            setSelectedRegion('All'); 
        }

        setActiveCountryId(countryId);
        
        // Fast transition
        setTimeout(() => {
             // Find all marker copies for this country and pick the one closest to current view
             const markers = allMarkersRef.current.filter(m => m.id === countryId);
             let targetMarker = stored;
             
             if (mapInstanceRef.current && markers.length > 0) {
               const center = mapInstanceRef.current.getCenter();
               let minDistance = Infinity;
               markers.forEach(m => {
                 const distance = Math.abs(m.marker.getLatLng().lng - center.lng);
                 if (distance < minDistance) {
                   minDistance = distance;
                   targetMarker = m;
                 }
               });
             }

             centerMapOnMarker(targetMarker.marker);
             setTimeout(() => {
                targetMarker.marker.openPopup();
                if (targetMarker.marker.getPopup()) targetMarker.marker.getPopup().update();
             }, 550);
        }, 100);
      }
    } else {
        // Reset processed ref if no country in URL, so we can re-select it later if needed
        processedCountryRef.current = null;
    }
  }, [searchParams, mapReady, centerMapOnMarker, showTerritories, showDeFacto, selectedRegion]);

  const handleZoomIn = () => {
    const map = mapInstanceRef.current;
    if (!map) return;

    if (activeCountryId) {
      // Find the active marker copies
      const markers = allMarkersRef.current.filter(m => m.id === activeCountryId);
      // Find the one that actually has its popup open
      const activeMarker = markers.find(m => m.marker.isPopupOpen());
      
      if (activeMarker) {
        map.setZoomAround(activeMarker.marker.getLatLng(), map.getZoom() + 1);
        return;
      }
    }
    
    map.zoomIn();
  };

  const handleZoomOut = () => {
    const map = mapInstanceRef.current;
    if (!map) return;

    if (activeCountryId) {
      const markers = allMarkersRef.current.filter(m => m.id === activeCountryId);
      const activeMarker = markers.find(m => m.marker.isPopupOpen());
      
      if (activeMarker) {
        map.setZoomAround(activeMarker.marker.getLatLng(), map.getZoom() - 1);
        return;
      }
    }
    
    map.zoomOut();
  };

  const flyToRandom = () => {
    if (isLoadingRandom || !mapReady) return;

    // Ensure markers are actually populated
    if (allMarkersRef.current.length === 0) return;

    const visibleMarkers = allMarkersRef.current.filter(item => {
        const regionMatch = selectedRegion === 'All' || item.region === selectedRegion;
        let typeMatch = true;
        if (item.type === 'territory' && !showTerritories) typeMatch = false;
        if (item.type === 'defacto' && !showDeFacto) typeMatch = false;
        return regionMatch && typeMatch;
    });
      
    if (visibleMarkers.length === 0) return;
    
    // Pick a random country ID from the visible markers
    const uniqueIds = Array.from(new Set(visibleMarkers.map(m => m.id)));
    const randomId = uniqueIds[Math.floor(Math.random() * uniqueIds.length)];
    
    // Find all copies of that country
    const markers = allMarkersRef.current.filter(m => m.id === randomId);
    
    if (mapInstanceRef.current && markers.length > 0) {
      setIsLoadingRandom(true);
      setActiveCountryId(randomId);
      
      const center = mapInstanceRef.current.getCenter();
      let targetMarker = markers[0];
      let minDistance = Infinity;
      
      // Find the copy of the marker closest to current view to prevent massive jumps
      markers.forEach(m => {
        const distance = Math.abs(m.marker.getLatLng().lng - center.lng);
        if (distance < minDistance) {
          minDistance = distance;
          targetMarker = m;
        }
      });

      centerMapOnMarker(targetMarker.marker);
      
      const openTargetPopup = () => {
        // Double check we still have a marker and map
        if (!targetMarker?.marker || !mapInstanceRef.current) return;
        
        // Final sanity check on visibility
        if (!markersLayerRef.current.hasLayer(targetMarker.marker)) {
            markersLayerRef.current.addLayer(targetMarker.marker);
        }

        // Increased delay to ensure the map has finished its internal position updates and stabilized
        setTimeout(() => {
            targetMarker.marker.openPopup();
            if (targetMarker.marker.getPopup()) targetMarker.marker.getPopup().update();
            setIsLoadingRandom(false);
        }, 150);
        
        mapInstanceRef.current.off('moveend', openTargetPopup);
      };

      // Reliability: Check if map is already at target
      const currentCenter = mapInstanceRef.current.getCenter();
      const targetLatLng = targetMarker.marker.getLatLng();
      
      // We calculate distance in pixels at the current zoom to be zoom-independent
      const p1 = mapInstanceRef.current.project(currentCenter);
      const p2 = mapInstanceRef.current.project(targetLatLng);
      const pixelDist = p1.distanceTo(p2);
      
      const targetZoom = window.innerWidth < 768 ? 4.5 : 5.5;
      const isZoomCorrect = Math.abs(mapInstanceRef.current.getZoom() - targetZoom) < 0.1;
      
      // If we are already visually very close, just open it
      if (pixelDist < 50 && isZoomCorrect) {
        openTargetPopup();
      } else {
        mapInstanceRef.current.once('moveend', openTargetPopup);
        // Safety timeout
        setTimeout(openTargetPopup, 1500);
      }
    }
  };

  const normalizeText = (text: string) => 
    text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

  const filteredSearchResults = useMemo(() => {
      if (searchQuery.length === 0) return [];
      const query = normalizeText(searchQuery);
      return [...MOCK_COUNTRIES, ...TERRITORIES, ...DE_FACTO_COUNTRIES].filter(c => 
        normalizeText(c.name).includes(query) || 
        normalizeText(c.capital).includes(query)
      ).slice(0, 20);
  }, [searchQuery]);

  useEffect(() => {
    setSelectedIndex(-1);
  }, [searchQuery]);

  const handleResultClick = (country: Country) => {
      setSearchQuery('');
      setSelectedIndex(-1);
      setActiveCountryId(country.id);
      
      const markers = allMarkersRef.current.filter(m => m.id === country.id);
      const firstMarker = markers[0];
      
      if (firstMarker) {
        if (firstMarker.type === 'territory' && !showTerritories) setShowTerritories(true);
        if (firstMarker.type === 'defacto' && !showDeFacto) setShowDeFacto(true);
      }

      if (selectedRegion !== 'All') setSelectedRegion('All');
      
      // Wait for React state to flush and filters to apply
      setTimeout(() => {
          if (mapInstanceRef.current && markers.length > 0) {
              const center = mapInstanceRef.current.getCenter();
              let targetMarker = markers[0];
              let minDistance = Infinity;
              
              // Find the copy of the marker closest to current view
              markers.forEach(m => {
                const distance = Math.abs(m.marker.getLatLng().lng - center.lng);
                if (distance < minDistance) {
                  minDistance = distance;
                  targetMarker = m;
                }
              });

              // Ensure the marker is actually on the map before trying to center/open
              if (!mapInstanceRef.current.hasLayer(targetMarker.marker)) {
                markersLayerRef.current.addLayer(targetMarker.marker);
              }

              centerMapOnMarker(targetMarker.marker);
              
              const openTargetPopup = () => {
                if (!targetMarker?.marker || !mapInstanceRef.current) return;
                
                // Final sanity check on visibility
                if (!markersLayerRef.current.hasLayer(targetMarker.marker)) {
                    markersLayerRef.current.addLayer(targetMarker.marker);
                }

                // Increased delay for stability
                setTimeout(() => {
                    targetMarker.marker.openPopup();
                    if (targetMarker.marker.getPopup()) targetMarker.marker.getPopup().update();
                }, 150);
                
                mapInstanceRef.current.off('moveend', openTargetPopup);
              };

              // Reliability: Check if map is already at target
              const currentCenter = mapInstanceRef.current.getCenter();
              const targetLatLng = targetMarker.marker.getLatLng();
              const p1 = mapInstanceRef.current.project(currentCenter);
              const p2 = mapInstanceRef.current.project(targetLatLng);
              const pixelDist = p1.distanceTo(p2);
              
              const targetZoom = window.innerWidth < 768 ? 4.5 : 5.5;
              const isZoomCorrect = Math.abs(mapInstanceRef.current.getZoom() - targetZoom) < 0.1;
              
              if (pixelDist < 50 && isZoomCorrect) {
                openTargetPopup();
              } else {
                mapInstanceRef.current.once('moveend', openTargetPopup);
                // Safety timeout
                setTimeout(openTargetPopup, 1500);
              }
          }
      }, 150);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (filteredSearchResults.length === 0) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev < filteredSearchResults.length - 1 ? prev + 1 : prev));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev > 0 ? prev - 1 : -1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const indexToUse = selectedIndex >= 0 ? selectedIndex : 0;
      if (filteredSearchResults[indexToUse]) {
        handleResultClick(filteredSearchResults[indexToUse]);
      }
    } else if (e.key === 'Escape') {
      setSearchQuery('');
      setSelectedIndex(-1);
    }
  };

  return (
    <div className="fixed inset-0 z-40 bg-surface-dark">
      <SEO 
        title="Interactive World Map"
        description="Explore the world with our high-fidelity interactive map. Click on countries to discover capitals, flags, and key demographics."
      />
      
      <div 
        id="map" 
        ref={mapRef} 
        className="w-full h-full outline-none focus:outline-none relative"
        style={{ background: '#0F172A', height: '100dvh', width: '100%' }} 
      >
        {!mapReady && (
          <div className="absolute inset-0 flex items-center justify-center text-white/20 font-display font-black uppercase tracking-widest pointer-events-none">
            Initializing Map Engine...
          </div>
        )}
      </div>

      {/* --- DESKTOP SHOW UI BUTTON (when hidden) --- */}
      <div className={`fixed bottom-10 left-6 z-[2000] pointer-events-auto hidden md:block transition-all duration-700 ease-out ${showUI ? 'opacity-0 pointer-events-none translate-y-10' : 'opacity-100 translate-y-0'}`}>
        <button 
          onClick={() => setShowUI(true)}
          className="w-12 h-12 bg-white/40 backdrop-blur-3xl border border-black/20 rounded-full flex items-center justify-center text-[#1A1C1E] hover:bg-white/60 transition-all shadow-glass relative overflow-hidden group"
          title="Show UI"
        >
          <div className="absolute inset-0 bg-glossy-gradient opacity-20 group-hover:opacity-30 pointer-events-none" />
          <Eye size={20} className="relative z-10 drop-shadow-sm" />
        </button>
      </div>

      <div className={`fixed z-[2000] pointer-events-auto md:hidden transition-all duration-700 ease-out ${showUI ? 'opacity-0 pointer-events-none' : 'bottom-10 left-6 opacity-100'}`}>
        <button 
          onClick={() => setShowUI(!showUI)}
          className="w-12 h-12 bg-white/40 backdrop-blur-3xl border border-black/20 rounded-full flex items-center justify-center text-[#1A1C1E] hover:bg-white/60 transition-all shadow-glass relative overflow-hidden group"
          title="Show UI"
        >
          <div className="absolute inset-0 bg-glossy-gradient opacity-20 group-hover:opacity-30 pointer-events-none" />
          <Eye size={20} className="relative z-10 drop-shadow-sm" />
        </button>
      </div>


      {/* --- DESKTOP UI --- */}
      <div className={`hidden md:flex absolute top-24 left-6 w-60 flex-col gap-3 z-[1000] pointer-events-none transition-all duration-700 ease-out transform ${showUI ? 'translate-x-0 opacity-100' : '-translate-x-full -translate-y-10 opacity-0'}`}>
          {/* Search Bar */}
          <div className="pointer-events-auto relative z-50">
              <div className="bg-white/40 backdrop-blur-2xl rounded-xl shadow-glass border border-black/20 flex items-center px-3.5 py-2.5 focus-within:ring-4 focus-within:ring-primary/10 focus-within:border-black/30 group relative overflow-hidden">
                  <div className="absolute inset-0 bg-glossy-gradient opacity-10 pointer-events-none" />
                  <button 
                    onClick={() => filteredSearchResults.length > 0 && handleResultClick(filteredSearchResults[0])} 
                    className="mr-3 text-black/40 hover:text-primary transition-all focus:outline-none relative z-10"
                  >
                    <Search size={16} />
                  </button>
                  <input 
                      type="text" 
                      placeholder="SEARCH..." 
                      className="bg-transparent border-none outline-none text-[9px] text-[#1A1C1E] w-full placeholder:text-black/30 font-black uppercase tracking-[0.2em] relative z-10"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyDown={handleKeyDown}
                  />
                  {searchQuery && (
                      <button onClick={() => setSearchQuery('')} className="text-black/40 hover:text-black relative z-10 p-1">
                          <X size={16} />
                      </button>
                  )}
              </div>
              
              {searchQuery && (
                  <div 
                    ref={desktopResultsRef}
                    className="absolute left-0 w-full bg-surface-dark/95 backdrop-blur-3xl rounded-xl shadow-glass border border-white/40 overflow-y-auto custom-scrollbar animate-in fade-in z-[60] overflow-hidden max-h-[50vh] top-full mt-2 slide-in-from-top-2"
                  >
                      <div className="absolute inset-0 bg-glossy-gradient opacity-5 pointer-events-none" />
                      {filteredSearchResults.length > 0 ? (
                          <ul className="py-1 relative z-10">
                              {filteredSearchResults.map((country, index) => {
                                  const flagCode = getCountryCode(country.flag);
                                  const isTerritory = TERRITORIES.some(t => t.id === country.id);
                                  const isDeFacto = DE_FACTO_COUNTRIES.some(d => d.id === country.id);
                                  let nameClass = 'text-white';
                                  let glowClass = 'drop-shadow-md';
                                  if (isTerritory) {
                                    nameClass = 'text-accent';
                                    glowClass = 'drop-shadow-glow';
                                  }
                                  if (isDeFacto) {
                                    nameClass = 'text-warning';
                                    glowClass = 'drop-shadow-glow';
                                  }

                                  return (
                                    <li key={country.id}>
                                        <button 
                                            onClick={() => handleResultClick(country)}
                                            onMouseEnter={() => setSelectedIndex(index)}
                                            className={`w-full text-left px-3.5 py-2.5 flex items-center gap-3 transition-all border-b border-white/5 last:border-none uppercase tracking-tighter ${index === selectedIndex ? 'bg-white/10 scale-[1.02] translate-x-1' : 'hover:bg-white/5'}`}
                                        >
                                            <div className="w-8 h-5 shrink-0 flex items-center justify-center">
                                              <img src={`https://flagcdn.com/w80/${flagCode}.png`} alt="" className="w-full h-full object-contain filter drop-shadow-md" />
                                            </div>
                                            <div>
                                                <p className={`text-[10px] font-black ${nameClass} ${glowClass}`}>{country.name}</p>
                                                <p className="text-[8px] font-bold text-white/30 tracking-widest whitespace-nowrap">{country.region}</p>
                                            </div>
                                        </button>
                                    </li>
                                  );
                              })}
                          </ul>
                      ) : (
                          <div className="p-8 text-center text-[9px] text-white/30 font-black uppercase tracking-[0.3em] relative z-10">
                              No matches found
                          </div>
                      )}
                  </div>
              )}
          </div>

          {/* Region Card */}
          <div className="bg-white/40 backdrop-blur-3xl p-4 rounded-3xl shadow-glass border border-black/20 pointer-events-auto relative overflow-hidden">
            <div className="absolute inset-0 bg-glossy-gradient opacity-10 pointer-events-none" />
            <div className="flex items-center gap-2.5 mb-5 relative z-10">
              <div className="p-2 bg-primary/10 rounded-xl text-primary border border-primary/20">
                <MapIcon size={18} />
              </div>
              <div>
                <h2 className="font-display font-black text-[#1A1C1E] leading-none text-base uppercase tracking-tighter drop-shadow-sm">Atlas</h2>
                <p className="text-[8px] text-black/40 font-black uppercase tracking-[0.2em] mt-1">{MOCK_COUNTRIES.length + TERRITORIES.length + DE_FACTO_COUNTRIES.length} Nodes</p>
              </div>
            </div>

            <div className="space-y-4 relative z-10">
            <div className="space-y-2.5">
                <div className="flex items-center gap-2 text-[8px] font-black text-black/30 uppercase tracking-[0.4em] mb-1 ml-1">
                  <Filter size={10} />
                  <span>Sectors</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {REGIONS.map(region => (
                    <button
                      key={region}
                      onClick={() => handleRegionSelect(region)}
                      className={`px-3 py-1.5 text-[8px] font-black uppercase tracking-widest rounded-lg transition-all duration-500 shadow-glass border-2 whitespace-nowrap ${
                        selectedRegion === region 
                          ? 'bg-primary text-white border-white/60 shadow-glow-primary' 
                          : 'bg-black/5 text-black/40 border-black/30 hover:bg-black/10 hover:text-black'
                      }`}
                    >
                      {region}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-black/20 flex flex-col gap-2">
                <button 
                  onClick={() => setShowTerritories(!showTerritories)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl transition-all duration-500 text-[8px] font-black uppercase tracking-[0.2em] shadow-inner border ${showTerritories ? 'bg-accent/20 text-[#166534] border-accent/40' : 'bg-black/5 text-black/20 border-black/20 opacity-40 hover:opacity-100 hover:bg-black/10'}`}
                >
                  <span className="flex items-center gap-2">
                    <Globe size={12} /> Territories
                  </span>
                  <div className={`w-7 h-3.5 rounded-full p-0.5 transition-all duration-500 ${showTerritories ? 'bg-accent' : 'bg-white/10'}`}>
                      <div className={`w-2.5 h-2.5 bg-white rounded-full shadow-md transform transition-transform duration-500 ${showTerritories ? 'translate-x-3.5' : 'translate-x-0'}`}></div>
                  </div>
                </button>

                <button 
                  onClick={() => setShowDeFacto(!showDeFacto)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl transition-all duration-500 text-[8px] font-black uppercase tracking-[0.2em] shadow-inner border ${showDeFacto ? 'bg-warning/20 text-[#92400e] border-warning/40' : 'bg-black/5 text-black/20 border-black/20 opacity-40 hover:opacity-100 hover:bg-black/10'}`}
                >
                  <span className="flex items-center gap-2">
                    <AlertTriangle size={12} /> De Facto
                  </span>
                  <div className={`w-7 h-3.5 rounded-full p-0.5 transition-all duration-500 ${showDeFacto ? 'bg-warning' : 'bg-white/10'}`}>
                      <div className={`w-2.5 h-2.5 bg-white rounded-full shadow-md transform transition-transform duration-500 ${showDeFacto ? 'translate-x-3.5' : 'translate-x-0'}`}></div>
                  </div>
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white/40 backdrop-blur-3xl p-3.5 rounded-2xl shadow-glass border border-black/20 pointer-events-auto relative overflow-hidden">
            <div className="absolute inset-0 bg-glossy-gradient opacity-10 pointer-events-none" />
            <div className="flex flex-col gap-2 text-[8px] font-black uppercase tracking-[0.3em] text-black/40 relative z-10">
              <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary border border-black/10"></div>
                  <span className="drop-shadow-sm">Sovereign</span>
              </div>
              <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-accent border border-black/10"></div>
                  <span className="drop-shadow-sm">Territory</span>
              </div>
              <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-warning border border-black/10"></div>
                  <span className="drop-shadow-sm">De Facto</span>
              </div>
            </div>
          </div>
      </div>

      {/* Desktop Bottom Bar - Hide UI, Random Search, Zoom Controls aligned horizontally */}
      <div className={`hidden md:flex items-center justify-center gap-4 fixed bottom-10 left-1/2 -translate-x-1/2 z-[1001] pointer-events-auto transition-all duration-700 ease-out transform ${showUI ? 'translate-y-0 opacity-100' : 'translate-y-40 opacity-0'}`}>
        {/* Hide UI Button */}
        <button 
          onClick={() => setShowUI(false)}
          className="w-12 h-12 bg-white/40 backdrop-blur-3xl border border-black/20 rounded-full flex items-center justify-center text-[#1A1C1E] hover:bg-white/60 transition-all shadow-glass relative overflow-hidden group"
          title="Hide UI"
        >
          <div className="absolute inset-0 bg-glossy-gradient opacity-20 group-hover:opacity-30 pointer-events-none" />
          <EyeOff size={20} className="relative z-10 drop-shadow-sm" />
        </button>

        {/* Random Search Button */}
        <button 
          onClick={flyToRandom}
          disabled={isLoadingRandom}
          className="flex items-center gap-4 px-10 h-14 text-lg rounded-full bg-white/40 backdrop-blur-3xl shadow-glass border border-black/20 uppercase tracking-[0.15em] group relative overflow-hidden transition-all duration-500 text-[#1A1C1E] font-display font-black disabled:opacity-40 disabled:cursor-not-allowed disabled:saturate-50 hover:bg-white/60"
        >
          <div className="absolute inset-0 bg-glossy-gradient opacity-20 group-hover:opacity-30 pointer-events-none" />
          <div className="relative z-10 flex items-center gap-3 drop-shadow-sm">
            <Compass size={24} className={`transition-transform duration-1000 ${isLoadingRandom || !mapReady ? 'animate-spin text-primary' : 'text-primary'}`} />
            <span className="tracking-tighter">{!mapReady ? 'Initializing...' : isLoadingRandom ? 'Scanning...' : 'Random Search'}</span>
          </div>
        </button>

        {/* Zoom Controls */}
        <div className="hidden lg:flex items-center gap-2">
          <button onClick={handleZoomOut} className="w-12 h-12 bg-white/40 backdrop-blur-3xl border border-black/20 rounded-full flex items-center justify-center text-[#1A1C1E] hover:bg-white/60 transition-all shadow-glass group relative overflow-hidden">
            <div className="absolute inset-0 bg-glossy-gradient opacity-20 pointer-events-none" />
            <Minus size={22} className="relative z-10 drop-shadow-sm" />
          </button>
          <button onClick={handleZoomIn} className="w-12 h-12 bg-white/40 backdrop-blur-3xl border border-black/20 rounded-full flex items-center justify-center text-[#1A1C1E] hover:bg-white/60 transition-all shadow-glass group relative overflow-hidden">
            <div className="absolute inset-0 bg-glossy-gradient opacity-20 pointer-events-none" />
            <Plus size={22} className="relative z-10 drop-shadow-sm" />
          </button>
        </div>
      </div>

      {/* --- MOBILE UI --- */}
      <div className={`md:hidden fixed bottom-0 left-0 w-full z-[1000] flex flex-col items-center pointer-events-none transition-all duration-700 ease-out transform ${showUI ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'} [@media(max-height:620px)]:hidden`}>
          {/* Action Row */}
          <div className="w-full px-4 pb-4 flex items-end justify-between pointer-events-none">
            <button 
                onClick={() => setShowUI(false)}
                className="pointer-events-auto w-12 h-12 bg-white/40 backdrop-blur-3xl border border-black/20 rounded-full flex items-center justify-center text-[#1A1C1E] hover:bg-white/60 transition-all shadow-glass relative overflow-hidden flex-shrink-0 group"
            >
                <div className="absolute inset-0 bg-glossy-gradient opacity-20 group-hover:opacity-30 pointer-events-none" />
                <EyeOff size={20} className="relative z-10 drop-shadow-sm" />
            </button>

            {/* Random FAB */}
            <div className="flex-1 flex justify-center px-2">
              <button 
                  onClick={flyToRandom}
                  disabled={isLoadingRandom || !mapReady}
                  className="pointer-events-auto shadow-glass bg-white/40 backdrop-blur-3xl text-[#1A1C1E] border border-black/20 px-8 py-3.5 rounded-full flex items-center gap-3 transition-all group relative overflow-hidden disabled:opacity-40 disabled:saturate-50 hover:bg-white/60"
              >
                  <div className="absolute inset-0 bg-glossy-gradient opacity-20 group-hover:opacity-30 pointer-events-none" />
                  <div className="relative z-10 flex items-center gap-3 drop-shadow-sm">
                    <Compass size={20} className={`transition-transform duration-1000 ${isLoadingRandom || !mapReady ? 'animate-spin text-primary' : 'text-primary'}`} />
                    <span className="font-display font-black text-xs uppercase tracking-[0.1em] whitespace-nowrap">{!mapReady ? 'INITIALIZING...' : isLoadingRandom ? 'SEARCHING...' : 'Random Search'}</span>
                  </div>
              </button>
            </div>

            {/* Zoom Controls */}
            <div className="flex flex-col gap-2 flex-shrink-0">
              <button 
                onClick={handleZoomIn}
                className="pointer-events-auto w-12 h-12 bg-white/40 backdrop-blur-3xl border border-black/20 rounded-full flex items-center justify-center text-[#1A1C1E] hover:bg-white/60 transition-all shadow-glass relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-glossy-gradient opacity-20 pointer-events-none" />
                <Plus size={20} className="relative z-10 drop-shadow-sm" />
              </button>
              <button 
                onClick={handleZoomOut}
                className="pointer-events-auto w-12 h-12 bg-white/40 backdrop-blur-3xl border border-black/20 rounded-full flex items-center justify-center text-[#1A1C1E] hover:bg-white/60 transition-all shadow-glass relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-glossy-gradient opacity-20 pointer-events-none" />
                <Minus size={20} className="relative z-10 drop-shadow-sm" />
              </button>
            </div>
          </div>


          {/* Combined Bottom Panel */}
          <div className="w-full pointer-events-auto bg-white/40 backdrop-blur-3xl border-t border-x border-black/20 shadow-xl rounded-t-3xl p-4 pb-4 flex flex-col gap-3 relative overflow-hidden">

              <div className="absolute inset-0 bg-glossy-gradient opacity-10 pointer-events-none" />
              
              {/* Search Section */}
              <div className="relative z-20">
                  <div className="relative group bg-black/5 rounded-xl border border-black/20 focus-within:bg-black/10 focus-within:ring-2 focus-within:ring-primary/20 transition-all duration-500 overflow-hidden">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <Search size={18} className="text-black/30 group-focus-within:text-primary transition-colors" />
                      </div>
                      <input 
                          type="text" 
                          placeholder="Search country or capital..." 
                          className="block w-full pl-12 pr-12 py-3 bg-transparent text-[#1A1C1E] text-xs font-black uppercase tracking-widest placeholder:text-black/30 outline-none rounded-xl"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          onKeyDown={handleKeyDown}
                      />
                      {searchQuery && (
                          <button onClick={() => setSearchQuery('')} className="absolute inset-y-0 right-0 pr-4 flex items-center">
                              <div className="bg-black/10 rounded-full p-1 text-black/40 border border-black/10">
                                <X size={16} strokeWidth={3} />
                              </div>
                          </button>
                      )}
                  </div>



                  {searchQuery && (
                      <div 
                        ref={mobileResultsRef}
                        className="absolute bottom-full left-0 w-full mb-4 bg-white/95 backdrop-blur-3xl rounded-2xl shadow-2xl border border-black/20 overflow-hidden max-h-[45vh] overflow-y-auto custom-scrollbar animate-in slide-in-from-bottom-4 fade-in"
                      >
                          <div className="absolute inset-0 bg-glossy-gradient opacity-10 pointer-events-none" />
                          {filteredSearchResults.length > 0 ? (
                              <ul className="py-2 relative z-10">
                                  {filteredSearchResults.map((country) => {
                                      const flagCode = getCountryCode(country.flag);
                                      const isTerritory = TERRITORIES.some(t => t.id === country.id);
                                      const isDeFacto = DE_FACTO_COUNTRIES.some(d => d.id === country.id);
                                      let nameClass = 'text-[#1A1C1E]';
                                      let glowClass = '';
                                      if (isTerritory) {
                                        nameClass = 'text-[#166534]';
                                        glowClass = '';
                                      }
                                      if (isDeFacto) {
                                        nameClass = 'text-[#92400e]';
                                        glowClass = '';
                                      }

                                      return (
                                        <li key={country.id}>
                                            <button 
                                                onClick={() => handleResultClick(country)}
                                                className="w-full text-left px-6 py-4 flex items-center gap-4 transition-all border-b border-black/5 last:border-none active:bg-black/5 uppercase tracking-tighter"
                                            >
                                                <div className="w-10 h-7 shrink-0 flex items-center justify-center">
                                                  <img src={`https://flagcdn.com/w80/${flagCode}.png`} alt="" className="w-full h-full object-contain filter drop-shadow-md" />
                                                </div>
                                                <div>
                                                    <p className={`text-xs font-black ${nameClass} ${glowClass}`}>{country.name}</p>
                                                    <p className="text-[9px] font-bold text-black/40 tracking-widest">{country.region}</p>
                                                </div>
                                            </button>
                                        </li>
                                      );
                                  })}
                              </ul>
                          ) : (
                              <div className="p-10 text-center text-[10px] text-black/40 font-black uppercase tracking-[0.3em] relative z-10">
                                  No matches detected in archives
                              </div>
                          )}
                      </div>
                  )}
              </div>

              {/* Filters Section */}
              <div ref={regionScrollRef} className="w-full overflow-x-auto no-scrollbar relative z-10" style={{ scrollbarWidth: 'none' }}>
                <div className="flex gap-3 px-0.5 items-center min-w-max">
                  <button 
                      onClick={() => setShowTerritories(!showTerritories)}
                      className={`
                        whitespace-nowrap flex-shrink-0 px-4 py-2.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all duration-500 border select-none flex items-center gap-2 shadow-sm
                        ${showTerritories 
                          ? 'bg-accent/20 text-[#166534] border-accent/40' 
                          : 'bg-black/5 text-black/40 border-black/20 active:bg-black/10'
                        }
                      `}
                  >
                      <Globe size={14} /> Territories
                  </button>
                  <button 
                      onClick={() => setShowDeFacto(!showDeFacto)}
                      className={`
                        whitespace-nowrap flex-shrink-0 px-4 py-2.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all duration-500 border select-none flex items-center gap-2 shadow-sm
                        ${showDeFacto 
                          ? 'bg-warning/20 text-[#92400e] border-warning/40' 
                          : 'bg-black/5 text-black/40 border-black/20 active:bg-black/10'
                        }
                      `}
                  >
                      <AlertTriangle size={14} /> De Facto
                  </button>
                  <div className="w-[1px] h-6 bg-black/10 flex-shrink-0 mx-1"></div>
                  {REGIONS.map(region => (
                    <button
                      key={region}
                      data-region={region}
                      onClick={() => handleRegionSelect(region)}
                      className={`
                        whitespace-nowrap flex-shrink-0 px-5 py-2.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all duration-500 border-2 select-none shadow-sm
                        ${selectedRegion === region 
                          ? 'bg-primary text-white border-white/60 shadow-glow-primary' 
                          : 'bg-black/5 text-black/40 border-black/30 active:bg-black/10'
                        }
                      `}
                    >
                      {region}
                    </button>
                  ))}
                </div>
              </div>


          </div>
      </div>
    </div>
  );
};

export default MapPage;
