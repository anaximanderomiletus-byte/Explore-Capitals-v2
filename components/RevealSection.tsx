import React from 'react';

/**
 * RevealSection — lightweight wrapper.
 * Previously hid content until scrolled into view, causing choppy
 * "pop-in" on every section. Now renders children immediately for
 * smooth, instant page loads.
 */
const RevealSection: React.FC<{
  children: React.ReactNode;
  className?: string;
  delay?: number;
}> = ({ children, className = '' }) => {
  return (
    <div className={className}>
      {children}
    </div>
  );
};

export default RevealSection;
