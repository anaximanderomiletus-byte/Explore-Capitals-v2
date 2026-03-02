/**
 * Convert a country/territory name to a URL-friendly slug.
 *
 * Handles accented characters (Côte d'Ivoire → cote-divoire,
 * São Tomé and Príncipe → sao-tome-and-principe) and strips
 * apostrophes, special characters, and excess hyphens.
 */
export const toSlug = (name: string): string =>
  name
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // strip diacritics
    .toLowerCase()
    .replace(/['']/g, '')            // remove apostrophes
    .replace(/[^a-z0-9]+/g, '-')    // non-alphanumeric → hyphens
    .replace(/^-|-$/g, '');          // trim leading/trailing hyphens
