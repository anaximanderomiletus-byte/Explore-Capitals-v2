import React from "react";
import { Link } from "react-router-dom";

type BrandMarkProps = {
  to?: string | false;
  size?: "sm" | "md" | "lg";
  /** Kept for API compatibility; wordmark is always shown. */
  showWordmark?: boolean;
  className?: string;
  onClick?: () => void;
};

const sizeMap = {
  sm: "text-lg sm:text-xl",
  md: "text-xl sm:text-2xl",
  lg: "text-2xl sm:text-3xl",
};

/**
 * Text-only wordmark — no globe mark beside the name.
 */
const BrandMark: React.FC<BrandMarkProps> = ({
  to = "/",
  size = "md",
  className = "",
  onClick,
}) => {
  const inner = (
    <span
      className={`font-display italic tracking-tight text-text leading-none ${sizeMap[size]}`}
    >
      Explore
      <span className="text-primary not-italic">Capitals</span>
    </span>
  );

  const classes = `group inline-flex items-center shrink-0 ${className}`;

  if (to !== false) {
    return (
      <Link
        to={to}
        onClick={onClick}
        className={classes}
        aria-label="ExploreCapitals home"
      >
        {inner}
      </Link>
    );
  }

  return (
    <div className={classes} aria-label="ExploreCapitals">
      {inner}
    </div>
  );
};

export default BrandMark;
