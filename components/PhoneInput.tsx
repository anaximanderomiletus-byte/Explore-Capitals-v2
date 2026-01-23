import React, { useState, useEffect, useMemo } from 'react';
import { ChevronDown, Search, Phone } from 'lucide-react';
import { COUNTRY_CODES, CountryCode } from '../constants/countries';

interface PhoneInputProps {
  value: string; // The full E.164 number (e.g. +18603242349)
  onChange: (fullNumber: string) => void;
  label?: string;
  placeholder?: string;
  required?: boolean;
  error?: boolean;
}

// Country-specific phone format patterns
const PHONE_FORMATS: Record<string, { pattern: RegExp; format: (digits: string) => string; maxLength: number }> = {
  US: {
    pattern: /^(\d{0,3})(\d{0,3})(\d{0,4})$/,
    format: (d) => {
      if (d.length <= 3) return d;
      if (d.length <= 6) return `(${d.slice(0, 3)}) ${d.slice(3)}`;
      return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6, 10)}`;
    },
    maxLength: 10,
  },
  CA: {
    pattern: /^(\d{0,3})(\d{0,3})(\d{0,4})$/,
    format: (d) => {
      if (d.length <= 3) return d;
      if (d.length <= 6) return `(${d.slice(0, 3)}) ${d.slice(3)}`;
      return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6, 10)}`;
    },
    maxLength: 10,
  },
  GB: {
    pattern: /^(\d{0,5})(\d{0,6})$/,
    format: (d) => {
      if (d.length <= 5) return d;
      return `${d.slice(0, 5)} ${d.slice(5, 11)}`;
    },
    maxLength: 11,
  },
  AU: {
    pattern: /^(\d{0,4})(\d{0,3})(\d{0,3})$/,
    format: (d) => {
      if (d.length <= 4) return d;
      if (d.length <= 7) return `${d.slice(0, 4)} ${d.slice(4)}`;
      return `${d.slice(0, 4)} ${d.slice(4, 7)} ${d.slice(7, 10)}`;
    },
    maxLength: 10,
  },
  DE: {
    pattern: /^(\d{0,4})(\d{0,8})$/,
    format: (d) => {
      if (d.length <= 4) return d;
      return `${d.slice(0, 4)} ${d.slice(4, 12)}`;
    },
    maxLength: 12,
  },
  FR: {
    pattern: /^(\d{0,2})(\d{0,2})(\d{0,2})(\d{0,2})(\d{0,2})$/,
    format: (d) => {
      const parts = [d.slice(0, 2), d.slice(2, 4), d.slice(4, 6), d.slice(6, 8), d.slice(8, 10)].filter(Boolean);
      return parts.join(' ');
    },
    maxLength: 10,
  },
  // Default format for other countries
  DEFAULT: {
    pattern: /^(\d{0,15})$/,
    format: (d) => {
      // Generic format: group in chunks of 3-4
      if (d.length <= 4) return d;
      if (d.length <= 7) return `${d.slice(0, 3)} ${d.slice(3)}`;
      if (d.length <= 10) return `${d.slice(0, 3)} ${d.slice(3, 6)} ${d.slice(6)}`;
      return `${d.slice(0, 3)} ${d.slice(3, 6)} ${d.slice(6, 10)} ${d.slice(10)}`;
    },
    maxLength: 15,
  },
};

const PhoneInput: React.FC<PhoneInputProps> = ({ value, onChange, label, placeholder, required, error }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Find the country code in the value
  const selectedCountry = useMemo(() => {
    // Sort by dial_code length descending to match longest first
    const sorted = [...COUNTRY_CODES].sort((a, b) => b.dial_code.length - a.dial_code.length);
    return sorted.find(c => value.startsWith(c.dial_code)) || COUNTRY_CODES[0];
  }, [value]);
  
  // The local number part (everything after the dial code)
  const localNumber = useMemo(() => {
    return value.startsWith(selectedCountry.dial_code) 
      ? value.slice(selectedCountry.dial_code.length) 
      : value.replace(/[^\d]/g, '');
  }, [value, selectedCountry]);

  const filteredCountries = useMemo(() => {
    return COUNTRY_CODES.filter(c => 
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      c.dial_code.includes(searchTerm) ||
      c.code.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  // Get the format config for the selected country
  const formatConfig = useMemo(() => {
    return PHONE_FORMATS[selectedCountry.code] || PHONE_FORMATS.DEFAULT;
  }, [selectedCountry.code]);

  const handleCountrySelect = (country: CountryCode) => {
    // When changing country, we keep the existing digits but update the dial code
    onChange(country.dial_code + localNumber);
    setIsOpen(false);
    setSearchTerm('');
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Strip non-digits and limit to max length for country
    const rawValue = e.target.value.replace(/[^\d]/g, '').slice(0, formatConfig.maxLength);
    onChange(selectedCountry.dial_code + rawValue);
  };

  // Format the display value using country-specific formatting
  const displayValue = useMemo(() => {
    const digits = localNumber.replace(/[^\d]/g, '');
    return formatConfig.format(digits);
  }, [localNumber, formatConfig]);

  // Generate a smart placeholder based on country
  const smartPlaceholder = useMemo(() => {
    if (placeholder) return placeholder;
    
    const placeholders: Record<string, string> = {
      US: '(555) 123-4567',
      CA: '(555) 123-4567',
      GB: '07123 456789',
      AU: '0412 345 678',
      DE: '0151 12345678',
      FR: '06 12 34 56 78',
    };
    
    return placeholders[selectedCountry.code] || selectedCountry.example || 'Enter phone number';
  }, [placeholder, selectedCountry]);

  return (
    <div className="space-y-2">
      {label && <label className="text-[10px] font-black uppercase tracking-[0.15em] text-white/30 ml-1 block">{label}</label>}
      <div className="relative group">
        <div className={`flex bg-white/[0.03] border ${error ? 'border-red-500' : 'border-white/10'} rounded-xl shadow-inner focus-within:border-sky/50 transition-all overflow-hidden group-hover:border-white/20`}>
          {/* Country Selector Trigger */}
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-2 px-4 py-3 border-r border-white/5 hover:bg-white/5 transition-colors shrink-0"
          >
            <span className="text-lg">{selectedCountry.flag}</span>
            <span className="text-xs font-bold text-white/60">{selectedCountry.dial_code}</span>
            <ChevronDown size={12} className={`text-white/30 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
          </button>

          {/* Local Number Input */}
          <input
            type="tel"
            value={displayValue}
            onChange={handleNumberChange}
            placeholder={smartPlaceholder}
            required={required}
            className="flex-1 bg-transparent px-4 py-3 text-sm font-medium text-white placeholder:text-white/20 outline-none"
          />
        </div>

        {/* Improved Dropdown Menu */}
        {isOpen && (
          <>
            <div className="fixed inset-0 z-[2100]" onClick={() => setIsOpen(false)} />
            <div className="absolute top-full left-0 mt-2 w-full max-w-[320px] bg-surface-dark border border-white/20 rounded-xl z-[2101] overflow-hidden backdrop-blur-2xl shadow-2xl">
              <div className="p-3 bg-white/5 border-b border-white/10">
                <div className="relative">
                  <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
                  <input
                    className="w-full bg-white/5 border border-white/10 rounded-lg pl-9 pr-3 py-2.5 text-sm text-white placeholder:text-white/30 outline-none focus:border-sky/30"
                    placeholder="Search country or code..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    autoFocus
                    onClick={(e) => e.stopPropagation()}
                  />
                </div>
              </div>
              <div className="max-h-64 overflow-y-auto custom-scrollbar">
                {filteredCountries.map((c) => (
                  <button
                    key={c.code}
                    type="button"
                    onClick={() => handleCountrySelect(c)}
                    className={`w-full flex items-center justify-between px-4 py-3 text-sm transition-all ${selectedCountry.code === c.code ? 'bg-sky/20 text-white' : 'text-white/70 hover:bg-white/5'}`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-lg">{c.flag}</span>
                      <span className="truncate max-w-[160px]">{c.name}</span>
                    </div>
                    <span className={`text-xs font-medium ${selectedCountry.code === c.code ? 'text-sky' : 'text-white/40'}`}>
                      {c.dial_code}
                    </span>
                  </button>
                ))}
                {filteredCountries.length === 0 && (
                  <div className="py-8 text-center text-white/30 text-sm">
                    No countries found
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PhoneInput;
