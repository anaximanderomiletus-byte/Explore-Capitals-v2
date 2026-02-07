/**
 * Converts a flag emoji to its ISO 3166-1 alpha-2 country code.
 * E.g. 🇦🇫 → "af", 🇺🇸 → "us"
 */
export const getCountryCode = (emoji: string): string => {
  if (!emoji) return '';
  return Array.from(emoji)
    .map(char => String.fromCharCode(char.codePointAt(0)! - 127397).toLowerCase())
    .join('');
};

/**
 * Returns the local flag image URL for a given flag emoji.
 * Images are served from /flags/{code}.png (80px wide PNGs from flagcdn.com).
 */
export const getFlagUrl = (emoji: string): string => {
  const code = getCountryCode(emoji);
  return `/flags/${code}.png`;
};
