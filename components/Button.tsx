import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    "primary" | "secondary" | "outline" | "accent" | "danger" | "premium";
  size?: "sm" | "md" | "lg";
  isFlat?: boolean;
  as?: any;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  isFlat = false,
  className = "",
  as: Component = "button",
  ...props
}) => {
  const hasTextColor = className.includes("text-");
  const hasTextSize =
    /(?:^|\s)(?:sm:|md:|lg:|xl:|2xl:)?!?text-(?:xs|sm|base|lg|xl|[2-9]xl|\[)/.test(
      className,
    );

  const baseStyles =
    "inline-flex items-center justify-center font-sans font-semibold tracking-tight transition-all duration-200 ease-out rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-primary/35 focus-visible:ring-offset-2 focus-visible:ring-offset-surface disabled:opacity-50 disabled:cursor-not-allowed relative select-none [-webkit-appearance:none] [appearance:none] [-webkit-tap-highlight-color:transparent] overflow-hidden active:scale-[0.98] touch-manipulation cursor-pointer";

  const variants = {
    primary: isFlat
      ? `bg-primary hover:bg-primary-hover active:bg-primary-press text-text`
      : `bg-primary hover:bg-primary-hover active:bg-primary-press text-text shadow-[0_12px_32px_rgba(21,32,43,0.08)]`,
    accent: isFlat
      ? `bg-accent-soft hover:bg-primary/20 active:bg-primary/25 text-primary`
      : `bg-accent-soft hover:bg-primary/20 text-primary border border-primary/25`,
    danger: isFlat
      ? `bg-error hover:brightness-110 active:brightness-95 text-white`
      : `bg-error hover:brightness-110 text-white`,
    secondary: isFlat
      ? `bg-transparent border border-border hover:bg-elevated-2 text-text`
      : `bg-elevated border border-border hover:border-primary/40 hover:bg-elevated-2 text-text`,
    outline: `bg-transparent border border-primary hover:bg-primary hover:text-text transition-colors ${hasTextColor ? "" : "text-primary"}`,
    premium: isFlat
      ? `bg-text hover:bg-text/90 active:bg-text/85 text-elevated-2`
      : `bg-text hover:bg-text/90 text-elevated-2 shadow-premium`,
  };

  const sizes = {
    sm: `px-4 py-2.5 ${hasTextSize ? "" : "text-sm"} min-h-[44px]`,
    md: `px-5 sm:px-6 py-2.5 ${hasTextSize ? "" : "text-sm sm:text-base"} min-h-[44px] sm:min-h-[48px]`,
    lg: `px-6 sm:px-8 py-3 ${hasTextSize ? "" : "text-base sm:text-lg"} min-h-[48px] sm:min-h-[52px]`,
  };

  return (
    <Component
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      style={{ WebkitTapHighlightColor: "transparent" }}
      {...props}
    >
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
    </Component>
  );
};

export default Button;
