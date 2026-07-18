import React from "react";

const TIME_OPTIONS = [
  { label: "1 min", seconds: 60 },
  { label: "5 min", seconds: 300 },
  { label: "10 min", seconds: 600 },
  { label: "20 min", seconds: 1200 },
];

interface TimeSelectorProps {
  value: number;
  onChange: (seconds: number) => void;
}

const TimeSelector: React.FC<TimeSelectorProps> = ({ value, onChange }) => {
  return (
    <div className="flex flex-col items-center">
      <div className="flex gap-1.5 bg-surface p-1 rounded-xl border border-border">
        {TIME_OPTIONS.map((option) => (
          <button
            key={option.seconds}
            onClick={() => onChange(option.seconds)}
            className={`px-3 py-1.5 rounded-lg text-[11px] font-semibold uppercase tracking-wider transition-all duration-200 ${
              value === option.seconds
                ? "bg-primary text-white shadow-sm"
                : "text-muted hover:text-text hover:bg-elevated-2"
            }`}
            style={{ WebkitTapHighlightColor: "transparent" }}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TimeSelector;
