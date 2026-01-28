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
  
  // Track when a marker was just clicked to prevent map click from clearing it
  const markerClickedRef = useRef(false);
  
  const desktopResultsRef = useRef<HTMLDivElement>(null);
  const mobileResultsRef = useRef<HTMLDivElement>(null);

  // Track previous region to determine if we should re-center the map
  const prevRegionRef = useRef(selectedRegion);
  
  // Track processed URL country to prevent loops/locking
  const processedCountryRef = useRef<string | null>(null);

  // Memoize Popup Content Creator - simplified for iOS performance
  const createPopupContent = useCallback((country: Country, type: 'sovereign' | 'territory' | 'defacto') => {
    const flagCode = getCountryCode(country.flag);
    const flagUrl = `https://flagcdn.com/w80/${flagCode}.png`;
    
    let subheader = '';
    let linkClass = 'text-sky';
    
    if (type === 'territory') {
      subheader = `<div class="text-[10px] font-black text-accent uppercase tracking-[0.2em] mb-3">Territory of ${(country as any).sovereignty}</div>`;
      linkClass = 'text-accent';
    } else if (type === 'defacto') {
      subheader = `<div class="text-[10px] font-black text-warning uppercase tracking-[0.2em] mb-3">${(country as any).sovereignty}</div>`;
      linkClass = 'text-warning';
    } else {
      subheader = `<div class="text-[10px] font-black text-sky uppercase tracking-[0.2em] mb-3">Sovereign State</div>`;
    }
    
    // Simplified popup - no shadows, no gradients, minimal nesting
    return `
      <div class="flex flex-col font-sans">
        <div class="flex items-center gap-4 mb-4">
           <div class="w-12 h-8 shrink-0">
             <img src="${flagUrl}" alt="${country.name} Flag" class="w-full h-full object-contain" />
           </div>
           <h3 class="font-display font-black text-2xl text-white tracking-tighter uppercase leading-none m-0">${country.name}</h3>
        </div>
        ${subheader}
        <div class="mb-5 bg-black/30 p-4 rounded-xl border border-white/10 text-center">
           <span class="text-[10px] font-black text-sky-light uppercase tracking-[0.2em] block mb-1">Capital City</span>
           <span class="font-display font-black text-white text-lg uppercase tracking-tight">${country.capital}</span>
        </div>
        <button data-country-id="${country.id}" class="learn-more-btn ${linkClass} w-full h-12 bg-white/10 border border-white/30 rounded-xl text-[11px] font-black uppercase tracking-[0.3em] active:bg-white/20">
          Launch Profile
        </button>
      </div>
    `;
  }, []);

  // Smart centering function - optimized for iOS
  const centerMapOnMarker = useCallback((marker: any) => {
      const map = mapInstanceRef.current;
      const L = (window as any).L;
      if (!map || !L) return;

      const isMobile = window.innerWidth < 768;
      const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
      
      const topNavHeight = isMobile ? 80 : 100;
      const sidebarWidth = 0; 
      const bottomSheetHeight = isMobile ? 240 : 0;
      
      const mapSize = map.getSize();
      const targetX = sidebarWidth + ((mapSize.x - sidebarWidth) / 2);
      const targetY = topNavHeight + ((mapSize.y - topNavHeight - bottomSheetHeight) / 2);
      const popupOffset = 75; 
      const desiredMarkerScreenY = targetY + popupOffset;

      const targetZoom = Math.max(map.getZoom(), isMobile ? 4.5 : 5.5);
      const markerGlobal = map.project(marker.getLatLng(), targetZoom);
      const screenOffsetX = targetX - (mapSize.x / 2);
      const screenOffsetY = desiredMarkerScreenY - (mapSize.y / 2);
      const newCenterGlobal = markerGlobal.subtract(L.point(screenOffsetX, screenOffsetY));
      const newCenterLatLng = map.unproject(newCenterGlobal, targetZoom);
      
      // iOS: use setView for instant response, desktop: use flyTo for smooth animation
      if (isIOS) {
        map.setView(newCenterLatLng, targetZoom, { animate: false });
      } else {
        map.flyTo(newCenterLatLng, targetZoom, {
          duration: 0.6,
          easeLinearity: 0.3
        });
      }
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
        // Detect Safari/iOS for performance optimizations
        const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
        const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
        const needsPerformanceMode = isSafari || isIOS;
        
        const map = L.map(mapRef.current, {
          center: [20, 0],
          zoom: 3,
          zoomControl: false,
          attributionControl: false,
          minZoom: 2,
          worldCopyJump: !needsPerformanceMode, // Disable on Safari - causes lag
          maxBounds: [[-85, -5000], [85, 5000]],
          maxBoundsViscosity: 1.0,
          preferCanvas: true,
          // Safari/iOS specific: disable all animations
          fadeAnimation: !needsPerformanceMode,
          zoomAnimation: !needsPerformanceMode,
          markerZoomAnimation: !needsPerformanceMode,
          // Reduce update frequency on Safari
          wheelDebounceTime: needsPerformanceMode ? 100 : 40,
          wheelPxPerZoomLevel: needsPerformanceMode ? 120 : 60,
          updateWhenIdle: needsPerformanceMode,
          updateWhenZooming: !needsPerformanceMode,
        });

        // Base map tiles - optimized for Safari
        L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}{r}.png', {
          subdomains: 'abcd',
          maxZoom: 20,
          // Safari optimizations
          updateWhenIdle: needsPerformanceMode,
          updateWhenZooming: !needsPerformanceMode,
          keepBuffer: needsPerformanceMode ? 1 : 2,
        }).addTo(map);
        
        // Labels layer - only add on non-Safari or when zoomed in enough
        if (!needsPerformanceMode) {
          L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager_only_labels/{z}/{x}/{y}{r}.png', {
            subdomains: 'abcd',
            maxZoom: 20,
            zIndex: 10
          }).addTo(map);
        }

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
            // Detect iOS once for all markers
            const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
            
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

                        // iOS: only create 1 marker copy to reduce DOM load
                        // Desktop: create 3 copies for infinite scroll
                        const offsets = isIOS ? [0] : [-360, 0, 360];
                        
                        offsets.forEach(offset => {
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
                                maxWidth: 300,
                                minWidth: 280,
                                offset: L.point(0, -10)
                            });

                            marker.addTo(markersLayerRef.current);

                            let lastTap = 0;
                            
                            // Simple unified handler
                            const handleTap = (e: any) => {
                                const now = Date.now();
                                if (now - lastTap < 300) return; // Debounce
                                lastTap = now;
                                
                                if (e?.originalEvent) {
                                  e.originalEvent.stopPropagation();
                                }
                                L.DomEvent?.stop?.(e);
                                
                                markerClickedRef.current = true;
                                setTimeout(() => { markerClickedRef.current = false; }, 500);
                                
                                setActiveCountryId(country.id);
                                
                                // Close existing popup first
                                if (mapInstanceRef.current) {
                                  mapInstanceRef.current.closePopup();
                                }
                                
                                marker.openPopup();
                                centerMapOnMarker(marker);
                            };
                            
                            marker.on('click', handleTap);
                            
                            // iOS touch optimization
                            if (isIOS) {
                              marker.on('add', () => {
                                const el = marker.getElement?.();
                                if (el && !(el as any)._opt) {
                                  (el as any)._opt = true;
                                  el.style.touchAction = 'manipulation';
                                  el.style.cursor = 'pointer';
                                  
                                  let touchStart = 0;
                                  el.addEventListener('touchstart', () => { touchStart = Date.now(); }, { passive: true });
                                  el.addEventListener('touchend', (e: TouchEvent) => {
                                    if (Date.now() - touchStart < 300) {
                                      e.preventDefault();
                                      e.stopPropagation();
                                      handleTap({ originalEvent: e });
                                    }
                                  }, { passive: false });
                                }
                              });
                            }

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

        // Only clear active country if a marker wasn't just clicked
        // This prevents the map click from firing immediately after marker click on mobile
        // Use a delayed check for iOS which has unreliable event timing
        map.on('click', (e: any) => {
          // Double-check the flag with a microtask delay for iOS Safari
          setTimeout(() => {
            if (!markerClickedRef.current) {
              setActiveCountryId(null);
            }
          }, 10);
        });
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
            const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
            
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
            
            // iOS: instant view change, Desktop: smooth animation
            if (isIOS) {
              map.setView(view.center, view.zoom, { animate: false });
            } else {
              map.flyTo(view.center, view.zoom, { duration: 0.8, easeLinearity: 0.3 });
            }
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
      <div className={`fixed bottom-10 left-6 z-[2000] pointer-events-auto hidden md:block transition-opacity duration-300 ${showUI ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
        <button 
          onClick={() => setShowUI(true)}
          className="w-12 h-12 bg-white/80 border border-black/20 rounded-full flex items-center justify-center text-[#1A1C1E] active:bg-white"
          title="Show UI"
        >
          <Eye size={20} />
        </button>
      </div>

      <div className={`fixed z-[2000] pointer-events-auto md:hidden transition-opacity duration-300 ${showUI ? 'opacity-0 pointer-events-none' : 'bottom-10 left-6 opacity-100'}`}>
        <button 
          onClick={() => setShowUI(!showUI)}
          className="w-12 h-12 bg-white/80 border border-black/20 rounded-full flex items-center justify-center text-[#1A1C1E] active:bg-white"
          title="Show UI"
        >
          <Eye size={20} />
        </button>
      </div>


      {/* --- DESKTOP UI --- */}
      <div className={`hidden md:flex absolute top-24 left-6 w-60 flex-col gap-3 z-[1000] pointer-events-none transition-opacity duration-300 ${showUI ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
          {/* Search Bar */}
          <div className="pointer-events-auto relative z-50">
              <div className="bg-white/90 rounded-xl border border-black/20 flex items-center px-3.5 py-2.5">
                  <button 
                    onClick={() => filteredSearchResults.length > 0 && handleResultClick(filteredSearchResults[0])} 
                    className="mr-3 text-black/40"
                  >
                    <Search size={16} />
                  </button>
                  <input 
                      type="text" 
                      placeholder="SEARCH..." 
                      className="bg-transparent border-none outline-none text-[9px] text-[#1A1C1E] w-full placeholder:text-black/30 font-black uppercase tracking-[0.2em]"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyDown={handleKeyDown}
                  />
                  {searchQuery && (
                      <button onClick={() => setSearchQuery('')} className="text-black/40 p-1">
                          <X size={16} />
                      </button>
                  )}
              </div>
              
              {searchQuery && (
                  <div 
                    ref={desktopResultsRef}
                    className="absolute left-0 w-full bg-[#1a1c2e] rounded-xl border border-white/20 overflow-y-auto max-h-[50vh] top-full mt-2"
                  >
                      {filteredSearchResults.length > 0 ? (
                          <ul className="py-1">
                              {filteredSearchResults.map((country, index) => {
                                  const flagCode = getCountryCode(country.flag);
                                  const isTerritory = TERRITORIES.some(t => t.id === country.id);
                                  const isDeFacto = DE_FACTO_COUNTRIES.some(d => d.id === country.id);
                                  let nameClass = 'text-white';
                                  if (isTerritory) nameClass = 'text-accent';
                                  if (isDeFacto) nameClass = 'text-warning';

                                  return (
                                    <li key={country.id}>
                                        <button 
                                            onClick={() => handleResultClick(country)}
                                            onMouseEnter={() => setSelectedIndex(index)}
                                            className={`w-full text-left px-3.5 py-2.5 flex items-center gap-3 border-b border-white/5 last:border-none uppercase tracking-tighter ${index === selectedIndex ? 'bg-white/10' : ''}`}
                                        >
                                            <div className="w-8 h-5 shrink-0">
                                              <img src={`https://flagcdn.com/w80/${flagCode}.png`} alt="" className="w-full h-full object-contain" />
                                            </div>
                                            <div>
                                                <p className={`text-[10px] font-black ${nameClass}`}>{country.name}</p>
                                                <p className="text-[8px] font-bold text-white/30 tracking-widest">{country.region}</p>
                                            </div>
                                        </button>
                                    </li>
                                  );
                              })}
                          </ul>
                      ) : (
                          <div className="p-8 text-center text-[9px] text-white/30 font-black uppercase tracking-[0.3em]">
                              No matches found
                          </div>
                      )}
                  </div>
              )}
          </div>

          {/* Region Card */}
          <div className="bg-white/90 p-4 rounded-3xl border border-black/20 pointer-events-auto">
            <div className="flex items-center gap-2.5 mb-5">
              <div className="p-2 bg-primary/10 rounded-xl text-primary border border-primary/20">
                <MapIcon size={18} />
              </div>
              <div>
                <h2 className="font-display font-black text-[#1A1C1E] leading-none text-base uppercase tracking-tighter">Atlas</h2>
                <p className="text-[8px] text-black/40 font-black uppercase tracking-[0.2em] mt-1">{MOCK_COUNTRIES.length + TERRITORIES.length + DE_FACTO_COUNTRIES.length} Nodes</p>
              </div>
            </div>

            <div className="space-y-4">
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
                      className={`px-3 py-1.5 text-[8px] font-black uppercase tracking-widest rounded-lg border-2 whitespace-nowrap ${
                        selectedRegion === region
                          ? 'bg-primary text-white border-primary' 
                          : 'bg-black/5 text-black/40 border-black/20 active:bg-black/10'
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
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-[8px] font-black uppercase tracking-[0.2em] border ${showTerritories ? 'bg-accent/20 text-[#166534] border-accent/40' : 'bg-black/5 text-black/30 border-black/10'}`}
                >
                  <span className="flex items-center gap-2">
                    <Globe size={12} /> Territories
                  </span>
                  <div className={`w-7 h-3.5 rounded-full p-0.5 ${showTerritories ? 'bg-accent' : 'bg-black/10'}`}>
                      <div className={`w-2.5 h-2.5 bg-white rounded-full ${showTerritories ? 'translate-x-3.5' : 'translate-x-0'}`} style={{ transition: 'transform 0.15s' }}></div>
                  </div>
                </button>

                <button 
                  onClick={() => setShowDeFacto(!showDeFacto)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-[8px] font-black uppercase tracking-[0.2em] border ${showDeFacto ? 'bg-warning/20 text-[#92400e] border-warning/40' : 'bg-black/5 text-black/30 border-black/10'}`}
                >
                  <span className="flex items-center gap-2">
                    <AlertTriangle size={12} /> De Facto
                  </span>
                  <div className={`w-7 h-3.5 rounded-full p-0.5 ${showDeFacto ? 'bg-warning' : 'bg-black/10'}`}>
                      <div className={`w-2.5 h-2.5 bg-white rounded-full ${showDeFacto ? 'translate-x-3.5' : 'translate-x-0'}`} style={{ transition: 'transform 0.15s' }}></div>
                  </div>
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white/90 p-3.5 rounded-2xl border border-black/20 pointer-events-auto">
            <div className="flex flex-col gap-2 text-[8px] font-black uppercase tracking-[0.3em] text-black/40">
              <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                  <span>Sovereign</span>
              </div>
              <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-accent"></div>
                  <span>Territory</span>
              </div>
              <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-warning"></div>
                  <span>De Facto</span>
              </div>
            </div>
          </div>
      </div>

      {/* Desktop Bottom Bar */}
      <div className={`hidden md:flex items-center justify-center gap-4 fixed bottom-10 left-1/2 -translate-x-1/2 z-[1001] pointer-events-auto transition-opacity duration-300 ${showUI ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <button 
          onClick={() => setShowUI(false)}
          className="w-12 h-12 bg-white/90 border border-black/20 rounded-full flex items-center justify-center text-[#1A1C1E] active:bg-white"
          title="Hide UI"
        >
          <EyeOff size={20} />
        </button>

        <button 
          onClick={flyToRandom}
          disabled={isLoadingRandom}
          className="flex items-center gap-4 px-10 h-14 text-lg rounded-full bg-white/90 border border-black/20 uppercase tracking-[0.15em] text-[#1A1C1E] font-display font-black disabled:opacity-40 active:bg-white"
        >
          <Compass size={24} className={`text-primary ${isLoadingRandom || !mapReady ? 'animate-spin' : ''}`} />
          <span className="tracking-tighter">{!mapReady ? 'Initializing...' : isLoadingRandom ? 'Scanning...' : 'Random Search'}</span>
        </button>

        <div className="hidden lg:flex items-center gap-2">
          <button onClick={handleZoomOut} className="w-12 h-12 bg-white/90 border border-black/20 rounded-full flex items-center justify-center text-[#1A1C1E] active:bg-white">
            <Minus size={22} />
          </button>
          <button onClick={handleZoomIn} className="w-12 h-12 bg-white/90 border border-black/20 rounded-full flex items-center justify-center text-[#1A1C1E] active:bg-white">
            <Plus size={22} />
          </button>
        </div>
      </div>

      {/* --- MOBILE UI --- */}
      <div className={`md:hidden fixed bottom-0 left-0 w-full z-[1000] flex flex-col items-center pointer-events-none transition-opacity duration-300 ${showUI ? 'opacity-100' : 'opacity-0 pointer-events-none'} [@media(max-height:620px)]:hidden`}>
          {/* Action Row */}
          <div className="w-full px-4 pb-4 flex items-end justify-between pointer-events-none">
            <button 
                onClick={() => setShowUI(false)}
                className="pointer-events-auto w-12 h-12 bg-white/90 border border-black/20 rounded-full flex items-center justify-center text-[#1A1C1E] flex-shrink-0"
            >
                <EyeOff size={20} />
            </button>

            {/* Random FAB */}
            <div className="flex-1 flex justify-center px-2">
              <button 
                  onClick={flyToRandom}
                  disabled={isLoadingRandom || !mapReady}
                  className="pointer-events-auto bg-white/90 text-[#1A1C1E] border border-black/20 px-8 py-3.5 rounded-full flex items-center gap-3 disabled:opacity-40"
              >
                  <Compass size={20} className={`text-primary ${isLoadingRandom || !mapReady ? 'animate-spin' : ''}`} />
                  <span className="font-display font-black text-xs uppercase tracking-[0.1em] whitespace-nowrap">{!mapReady ? 'INITIALIZING...' : isLoadingRandom ? 'SEARCHING...' : 'Random Search'}</span>
              </button>
            </div>

            {/* Zoom Controls */}
            <div className="flex flex-col gap-2 flex-shrink-0">
              <button 
                onClick={handleZoomIn}
                className="pointer-events-auto w-12 h-12 bg-white/90 border border-black/20 rounded-full flex items-center justify-center text-[#1A1C1E]"
              >
                <Plus size={20} />
              </button>
              <button 
                onClick={handleZoomOut}
                className="pointer-events-auto w-12 h-12 bg-white/90 border border-black/20 rounded-full flex items-center justify-center text-[#1A1C1E]"
              >
                <Minus size={20} />
              </button>
            </div>
          </div>


          {/* Combined Bottom Panel */}
          <div className="w-full pointer-events-auto bg-white/95 border-t border-x border-black/20 rounded-t-3xl p-4 pb-4 flex flex-col gap-3">
              
              {/* Search Section */}
              <div className="relative z-20">
                  <div className="relative bg-black/5 rounded-xl border border-black/20">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <Search size={18} className="text-black/30" />
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
                        className="absolute bottom-full left-0 w-full mb-4 bg-white rounded-2xl border border-black/20 overflow-hidden max-h-[45vh] overflow-y-auto"
                      >
                          {filteredSearchResults.length > 0 ? (
                              <ul className="py-2">
                                  {filteredSearchResults.map((country) => {
                                      const flagCode = getCountryCode(country.flag);
                                      const isTerritory = TERRITORIES.some(t => t.id === country.id);
                                      const isDeFacto = DE_FACTO_COUNTRIES.some(d => d.id === country.id);
                                      let nameClass = 'text-[#1A1C1E]';
                                      if (isTerritory) nameClass = 'text-[#166534]';
                                      if (isDeFacto) nameClass = 'text-[#92400e]';

                                      return (
                                        <li key={country.id}>
                                            <button 
                                                onClick={() => handleResultClick(country)}
                                                className="w-full text-left px-6 py-4 flex items-center gap-4 border-b border-black/5 last:border-none active:bg-black/5 uppercase tracking-tighter"
                                            >
                                                <div className="w-10 h-7 shrink-0">
                                                  <img src={`https://flagcdn.com/w80/${flagCode}.png`} alt="" className="w-full h-full object-contain" />
                                                </div>
                                                <div>
                                                    <p className={`text-xs font-black ${nameClass}`}>{country.name}</p>
                                                    <p className="text-[9px] font-bold text-black/40 tracking-widest">{country.region}</p>
                                                </div>
                                            </button>
                                        </li>
                                      );
                                  })}
                              </ul>
                          ) : (
                              <div className="p-10 text-center text-[10px] text-black/40 font-black uppercase tracking-[0.3em]">
                                  No matches detected
                              </div>
                          )}
                      </div>
                  )}
              </div>

              {/* Filters Section */}
              <div ref={regionScrollRef} className="w-full overflow-x-auto no-scrollbar" style={{ scrollbarWidth: 'none' }}>
                <div className="flex gap-3 px-0.5 items-center min-w-max">
                  <button 
                      onClick={() => setShowTerritories(!showTerritories)}
                      className={`whitespace-nowrap flex-shrink-0 px-4 py-2.5 rounded-lg text-[10px] font-black uppercase tracking-widest border select-none flex items-center gap-2 ${showTerritories ? 'bg-accent/20 text-[#166534] border-accent/40' : 'bg-black/5 text-black/40 border-black/20'}`}
                  >
                      <Globe size={14} /> Territories
                  </button>
                  <button 
                      onClick={() => setShowDeFacto(!showDeFacto)}
                      className={`whitespace-nowrap flex-shrink-0 px-4 py-2.5 rounded-lg text-[10px] font-black uppercase tracking-widest border select-none flex items-center gap-2 ${showDeFacto ? 'bg-warning/20 text-[#92400e] border-warning/40' : 'bg-black/5 text-black/40 border-black/20'}`}
                  >
                      <AlertTriangle size={14} /> De Facto
                  </button>
                  <div className="w-[1px] h-6 bg-black/10 flex-shrink-0 mx-1"></div>
                  {REGIONS.map(region => (
                    <button
                      key={region}
                      data-region={region}
                      onClick={() => handleRegionSelect(region)}
                      className={`whitespace-nowrap flex-shrink-0 px-5 py-2.5 rounded-lg text-[10px] font-black uppercase tracking-widest border-2 select-none ${selectedRegion === region ? 'bg-primary text-white border-primary' : 'bg-black/5 text-black/40 border-black/20'}`}
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
