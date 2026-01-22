import React, { useState, useEffect } from 'react';
import { ChevronDown, Search } from 'lucide-react';
import { COUNTRY_CODES, CountryCode } from '../constants/countries';

interface PhoneInputProps {
  value: string; // The full E.164 number (e.g. +18603242349)
  onChange: (fullNumber: string) => void;
  label?: string;
  placeholder?: string;
  required?: boolean;
  error?: boolean;
}

const PhoneInput: React.FC<PhoneInputProps> = ({ value, onChange, label, placeholder, required, error }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Find the country code in the value
  const selectedCountry = COUNTRY_CODES.find(c => value.startsWith(c.dial_code)) || COUNTRY_CODES[0];
  
  // The local number part (everything after the dial code)
  const localNumber = value.startsWith(selectedCountry.dial_code) 
    ? value.slice(selectedCountry.dial_code.length) 
    : value;

  const filteredCountries = COUNTRY_CODES.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.dial_code.includes(searchTerm)
  );

  const handleCountrySelect = (country: CountryCode) => {
    // When changing country, we keep the existing digits but update the dial code
    onChange(country.dial_code + localNumber);
    setIsOpen(false);
    setSearchTerm('');
  };

  const formatPhoneNumber = (digits: string) => {
    if (digits.length <= 3) return digits;
    if (digits.length <= 6) return `${digits.slice(0, 3)}-${digits.slice(3)}`;
    return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6, 10)}`;
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/[^\d]/g, '').slice(0, 10);
    onChange(selectedCountry.dial_code + rawValue);
  };

  const displayValue = localNumber.replace(/[^\d]/g, '');

  return (
    <div className="space-y-2">
      {label && <label className="text-[10px] font-bold uppercase tracking-widest text-white/20 ml-1 block">{label}</label>}
      <div className="relative group">
        <div className={`flex bg-white/[0.03] border ${error ? 'border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.15)]' : 'border-white/10'} rounded-2xl shadow-inner focus-within:border-primary/50 transition-all overflow-hidden group-hover:border-white/20`}>
          {/* Country Selector Trigger */}
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-2 px-5 border-r border-white/5 hover:bg-white/5 transition-colors shrink-0"
          >
            <span className="text-xl">{selectedCountry.flag}</span>
            <span className="text-xs font-bold text-white/60">{selectedCountry.dial_code}</span>
            <ChevronDown size={14} className={`text-white/20 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
          </button>

          {/* Local Number Input */}
          <input
            type="tel"
            value={formatPhoneNumber(displayValue)}
            onChange={handleNumberChange}
            placeholder={placeholder || selectedCountry.example}
            required={required}
            className="flex-1 bg-transparent px-5 py-4 text-sm font-medium text-white placeholder:text-white/10 outline-none"
          />
        </div>

        {/* Improved Dropdown Menu */}
        {isOpen && (
          <>
            <div className="fixed inset-0 z-[2100]" onClick={() => setIsOpen(false)} />
            <div className="absolute top-full left-0 mt-2 w-full max-w-[320px] bg-surface-dark border border-white/20 rounded-2xl shadow-glass-bubble z-[2101] overflow-hidden backdrop-blur-2xl">
              <div className="p-3 bg-white/5 border-b border-white/10">
                <div className="relative">
                  <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
                  <input
                    className="w-full bg-white/5 border border-white/10 rounded-lg pl-9 pr-3 py-2 text-[10px] font-black text-white uppercase placeholder:text-white/10 outline-none focus:border-sky/30 shadow-sm"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    autoFocus
                    onClick={(e) => e.stopPropagation()}
                  />
                </div>
              </div>
              <div className="max-h-64 overflow-y-auto custom-scrollbar p-1">
                {filteredCountries.map((c) => (
                  <button
                    key={c.code}
                    type="button"
                    onClick={() => handleCountrySelect(c)}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-full text-[10px] font-black transition-all uppercase tracking-tight ${selectedCountry.code === c.code ? 'bg-sky text-white shadow-glow-sky scale-[0.98]' : 'text-white/60 hover:bg-white/10'}`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-lg">{c.flag}</span>
                      <span className="truncate max-w-[150px]">{c.name}</span>
                    </div>
                    <span className={selectedCountry.code === c.code ? 'text-white' : 'text-white/30'}>
                      {c.dial_code}
                    </span>
                  </button>
                ))}
                {filteredCountries.length === 0 && (
                  <div className="py-8 text-center text-white/30 text-[10px] font-black uppercase tracking-widest">
                    No results
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
      <p className="text-[8px] text-white/30 ml-1 font-black uppercase tracking-widest">
        Select country, then enter digits.
      </p>
    </div>
  );
};

export default PhoneInput;
