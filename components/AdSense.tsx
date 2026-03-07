import React, { useEffect, useRef, useState, Component } from 'react';

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

/**
 * AdErrorBoundary
 * Catches any errors thrown by ad components (e.g. adblocker interference)
 * so they never crash the rest of the page. Renders nothing on failure.
 */
class AdErrorBoundary extends Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch() {
    // Silently swallow — ad failures should never be visible to users
  }

  render() {
    if (this.state.hasError) return null;
    return this.props.children;
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
 * Gracefully degrades when an adblocker is active — never crashes the page.
 * Following AdSense policies:
 * - Ads are clearly distinguishable from content
 * - Not placed near navigation elements
 * - Not interfering with content consumption
 * - Appropriate spacing from interactive elements
 */
const AdSenseInner: React.FC<AdSenseProps> = ({
  slot,
  format = 'auto',
  responsive = true,
  className = '',
  layout = '',
  variant = 'default',
}) => {
  const adRef = useRef<HTMLModElement>(null);
  const isAdLoaded = useRef(false);
  const [adBlocked, setAdBlocked] = useState(false);

  useEffect(() => {
    // Only load ad once to prevent multiple ad requests
    if (isAdLoaded.current) return;

    try {
      // Check if adsbygoogle is available (not blocked)
      const adsbyGoogle = (window as any).adsbygoogle;
      if (adsbyGoogle && typeof adsbyGoogle.push === 'function') {
        adsbyGoogle.push({});
        isAdLoaded.current = true;
      } else {
        // Script was blocked — hide the ad container silently
        setAdBlocked(true);
      }
    } catch {
      // Any error (blocked, modified, etc.) — hide silently
      setAdBlocked(true);
    }
  }, []);

  // If adblocker prevented the script from loading, render nothing
  if (adBlocked) return null;

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
      {/* Small label for transparency - hidden on subtle variant since no visible container */}
      {variant !== 'subtle' && (
        <div className="text-[8px] font-black uppercase tracking-[0.3em] text-white/20 mb-2 text-center">
          Advertisement
        </div>
      )}

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

/** Wrapped AdSense — error boundary ensures ad failures never crash the page */
const AdSense: React.FC<AdSenseProps> = (props) => (
  <AdErrorBoundary>
    <AdSenseInner {...props} />
  </AdErrorBoundary>
);

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
