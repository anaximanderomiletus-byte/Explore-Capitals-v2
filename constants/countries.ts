export interface CountryCode {
  code: string;
  name: string;
  dial_code: string;
  flag: string;
  example: string;
}

export const COUNTRY_CODES: CountryCode[] = [
  { code: 'US', name: 'United States', dial_code: '+1', flag: '🇺🇸', example: '201 555 0123' },
  { code: 'GB', name: 'United Kingdom', dial_code: '+44', flag: '🇬🇧', example: '7911 123456' },
  { code: 'CA', name: 'Canada', dial_code: '+1', flag: '🇨🇦', example: '416 555 0123' },
  { code: 'AU', name: 'Australia', dial_code: '+61', flag: '🇦🇺', example: '412 345 678' },
  { code: 'DE', name: 'Germany', dial_code: '+49', flag: '🇩🇪', example: '1512 3456789' },
  { code: 'FR', name: 'France', dial_code: '+33', flag: '🇫🇷', example: '6 12 34 56 78' },
  { code: 'IN', name: 'India', dial_code: '+91', flag: '🇮🇳', example: '98765 43210' },
  { code: 'BR', name: 'Brazil', dial_code: '+55', flag: '🇧🇷', example: '11 91234-5678' },
  { code: 'CN', name: 'China', dial_code: '+86', flag: '🇨🇳', example: '138 1234 5678' },
  { code: 'JP', name: 'Japan', dial_code: '+81', flag: '🇯🇵', example: '90 1234 5678' },
  { code: 'MX', name: 'Mexico', dial_code: '+52', flag: '🇲🇽', example: '55 1234 5678' },
  { code: 'IT', name: 'Italy', dial_code: '+39', flag: '🇮🇹', example: '312 345 6789' },
  { code: 'ES', name: 'Spain', dial_code: '+34', flag: '🇪🇸', example: '612 345 678' },
  { code: 'RU', name: 'Russia', dial_code: '+7', flag: '🇷🇺', example: '912 345-67-89' },
  { code: 'KR', name: 'South Korea', dial_code: '+82', flag: '🇰🇷', example: '10-1234-5678' },
  { code: 'NG', name: 'Nigeria', dial_code: '+234', flag: '🇳🇬', example: '802 123 4567' },
  { code: 'ZA', name: 'South Africa', dial_code: '+27', flag: '🇿🇦', example: '82 123 4567' },
  { code: 'AR', name: 'Argentina', dial_code: '+54', flag: '🇦🇷', example: '9 11 1234-5678' },
  { code: 'CO', name: 'Colombia', dial_code: '+57', flag: '🇨🇴', example: '312 345 6789' },
  { code: 'NL', name: 'Netherlands', dial_code: '+31', flag: '🇳🇱', example: '6 12345678' },
  { code: 'SE', name: 'Sweden', dial_code: '+46', flag: '🇸🇪', example: '70 123 45 67' },
  { code: 'CH', name: 'Switzerland', dial_code: '+41', flag: '🇨🇭', example: '78 123 45 67' },
  { code: 'BE', name: 'Belgium', dial_code: '+32', flag: '🇧🇪', example: '470 12 34 56' },
  { code: 'TR', name: 'Turkey', dial_code: '+90', flag: '🇹🇷', example: '532 123 45 67' },
  { code: 'PL', name: 'Poland', dial_code: '+48', flag: '🇵🇱', example: '501 123 456' },
  { code: 'IE', name: 'Ireland', dial_code: '+353', flag: '🇮🇪', example: '83 123 4567' },
  { code: 'NZ', name: 'New Zealand', dial_code: '+64', flag: '🇳🇿', example: '21 123 4567' },
];
