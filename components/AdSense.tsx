import React, { useEffect, useRef } from 'react';

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

interface AdSenseProps {
  /** Ad slot ID from your AdSense account */
  slot: string;
  /** Ad format - auto for responsive, or specific sizes */
  format?: 'auto' | 'fluid' | 'rectangle' | 'horizontal' | 'vertical';
  /** Whether the ad should be responsive */
  responsive?: boolean;
  /** Custom class name for the container */
  className?: string;
  /** Ad layout for in-feed/in-article ads */
  layout?: 'in-article' | 'in-feed' | '';
  /** Style variant for the container */
  variant?: 'default' | 'subtle' | 'card';
}

/**
 * AdSense Component
 * 
 * Displays Google AdSense ads with proper compliance and UX considerations.
 * Following AdSense policies:
 * - Ads are clearly distinguishable from content
 * - Not placed near navigation elements
 * - Not interfering with content consumption
 * - Appropriate spacing from interactive elements
 */
const AdSense: React.FC<AdSenseProps> = ({
  slot,
  format = 'auto',
  responsive = true,
  className = '',
  layout = '',
  variant = 'default',
}) => {
  const adRef = useRef<HTMLModElement>(null);
  const isAdLoaded = useRef(false);

  useEffect(() => {
    // Only load ad once to prevent multiple ad requests
    if (isAdLoaded.current) return;
    
    try {
      // Check if adsbygoogle is available
      if (typeof window !== 'undefined' && window.adsbygoogle) {
        window.adsbygoogle.push({});
        isAdLoaded.current = true;
      }
    } catch (error) {
      console.error('AdSense error:', error);
    }
  }, []);

  // Container styles based on variant
  const containerStyles = {
    default: 'bg-white/5 rounded-2xl p-4 border border-white/10',
    subtle: 'bg-transparent',
    card: 'bg-white/5 backdrop-blur-xl rounded-3xl p-6 border border-white/20 shadow-lg',
  };

  // Get ad style based on format
  const getAdStyle = (): React.CSSProperties => {
    switch (format) {
      case 'rectangle':
        return { display: 'block', width: '300px', height: '250px' };
      case 'horizontal':
        return { display: 'block', width: '100%', height: '90px' };
      case 'vertical':
        return { display: 'block', width: '160px', height: '600px' };
      case 'fluid':
        return { display: 'block' };
      default:
        return { display: 'block' };
    }
  };

  return (
    <div 
      className={`ad-container ${containerStyles[variant]} ${className}`}
      role="complementary"
      aria-label="Advertisement"
    >
      {/* Small label for transparency */}
      <div className="text-[8px] font-black uppercase tracking-[0.3em] text-white/20 mb-2 text-center">
        Advertisement
      </div>
      
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={getAdStyle()}
        data-ad-client="ca-pub-8144074549309997"
        data-ad-slot={slot}
        data-ad-format={responsive ? 'auto' : format}
        data-full-width-responsive={responsive ? 'true' : 'false'}
        {...(layout && { 'data-ad-layout': layout })}
      />
    </div>
  );
};

/**
 * In-Article Ad Component
 * Best for placing within article/content flow
 */
export const InArticleAd: React.FC<{ slot: string; className?: string }> = ({ 
  slot, 
  className = '' 
}) => (
  <div className={`my-8 ${className}`}>
    <AdSense 
      slot={slot} 
      layout="in-article" 
      format="fluid"
      variant="subtle"
    />
  </div>
);

/**
 * Sidebar Ad Component
 * Best for sidebar placements on desktop
 */
export const SidebarAd: React.FC<{ slot: string; className?: string }> = ({ 
  slot, 
  className = '' 
}) => (
  <div className={`hidden lg:block sticky top-32 ${className}`}>
    <AdSense 
      slot={slot} 
      format="rectangle"
      variant="card"
    />
  </div>
);

/**
 * Banner Ad Component
 * Best for between sections or at page bottom
 */
export const BannerAd: React.FC<{ slot: string; className?: string }> = ({ 
  slot, 
  className = '' 
}) => (
  <div className={`w-full max-w-4xl mx-auto my-8 ${className}`}>
    <AdSense 
      slot={slot} 
      format="horizontal"
      responsive={true}
      variant="default"
    />
  </div>
);

/**
 * Responsive Ad Component
 * Auto-adjusts to container size - best for flexible layouts
 */
export const ResponsiveAd: React.FC<{ slot: string; className?: string }> = ({ 
  slot, 
  className = '' 
}) => (
  <div className={`w-full ${className}`}>
    <AdSense 
      slot={slot} 
      format="auto"
      responsive={true}
      variant="default"
    />
  </div>
);

/**
 * Vertical Sidebar Ad Component
 * Fixed position vertical ads for page sidebars on large screens (1536px+)
 * Hidden on smaller screens to avoid layout issues
 */
export const VerticalSidebarAd: React.FC<{ slot: string; position: 'left' | 'right' }> = ({ 
  slot, 
  position 
}) => (
  <div className={`fixed top-32 ${position === 'left' ? 'left-4' : 'right-4'} hidden 2xl:block z-40`}>
    <AdSense 
      slot={slot} 
      format="vertical"
      responsive={false}
      variant="subtle"
    />
  </div>
);

export default AdSense;
