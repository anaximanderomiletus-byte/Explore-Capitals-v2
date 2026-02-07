import React from 'react';
import AdSense from './AdSense';

/**
 * Renders vertical AdSense ads on the left and right sides of game screens.
 * Only visible on xl+ screens (1280px+) to avoid cluttering mobile/tablet.
 * Uses fixed positioning so it doesn't affect the game card layout.
 */
const GameSideAds: React.FC = () => (
  <>
    <div className="hidden xl:block fixed left-4 2xl:left-8 top-1/2 -translate-y-1/2 z-10">
      <AdSense
        slot="2512934803"
        format="vertical"
        responsive={false}
        variant="subtle"
      />
    </div>
    <div className="hidden xl:block fixed right-4 2xl:right-8 top-1/2 -translate-y-1/2 z-10">
      <AdSense
        slot="2512934803"
        format="vertical"
        responsive={false}
        variant="subtle"
      />
    </div>
  </>
);

export default GameSideAds;
