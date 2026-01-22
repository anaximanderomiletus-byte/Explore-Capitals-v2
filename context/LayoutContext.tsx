import React, { createContext, useContext, useState } from 'react';

type NavbarMode = 'default' | 'hero';
type TransitionStyle = 'default' | 'cartographic';

interface LayoutContextType {
  navbarMode: NavbarMode;
  setNavbarMode: (mode: NavbarMode) => void;
  scrollThreshold: number;
  setScrollThreshold: (threshold: number) => void;
  isTransitioning: boolean;
  setIsTransitioning: (val: boolean) => void;
  transitionStyle: TransitionStyle;
  setTransitionStyle: (style: TransitionStyle) => void;
  isPageLoading: boolean;
  setPageLoading: (val: boolean) => void;
  isFooterHidden: boolean;
  setHideFooter: (val: boolean) => void;
}

const LayoutContext = createContext<LayoutContextType>({
  navbarMode: 'default',
  setNavbarMode: () => {},
  scrollThreshold: 20,
  setScrollThreshold: () => {},
  isTransitioning: false,
  setIsTransitioning: () => {},
  transitionStyle: 'default',
  setTransitionStyle: () => {},
  isPageLoading: false,
  setPageLoading: () => {},
  isFooterHidden: false,
  setHideFooter: () => {},
});

export const useLayout = () => useContext(LayoutContext);

export const LayoutProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [navbarMode, setNavbarMode] = useState<NavbarMode>('default');
  const [scrollThreshold, setScrollThreshold] = useState<number>(20);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionStyle, setTransitionStyle] = useState<TransitionStyle>('default');
  const [isPageLoading, setPageLoading] = useState(false);
  const [isFooterHidden, setHideFooter] = useState(false);

  return (
    <LayoutContext.Provider value={{ 
      navbarMode, 
      setNavbarMode, 
      scrollThreshold, 
      setScrollThreshold,
      isTransitioning,
      setIsTransitioning,
      transitionStyle,
      setTransitionStyle,
      isPageLoading,
      setPageLoading,
      isFooterHidden,
      setHideFooter
    }}>
      {children}
    </LayoutContext.Provider>
  );
};