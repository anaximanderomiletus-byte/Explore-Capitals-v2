/**
 * Generates WebApplication JSON-LD structured data for game pages.
 * Helps Google understand these are interactive educational tools.
 */
export function getGameStructuredData({
  name,
  slug,
  description,
  image,
}: {
  name: string;
  slug: string;
  description: string;
  image?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name,
    url: `https://explorecapitals.com/games/${slug}`,
    description,
    applicationCategory: 'EducationalApplication',
    operatingSystem: 'Any',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    author: {
      '@type': 'Organization',
      name: 'ExploreCapitals',
      url: 'https://explorecapitals.com',
    },
    ...(image
      ? { image: `https://explorecapitals.com${image}` }
      : {}),
  };
}
