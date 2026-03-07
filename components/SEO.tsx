import React, { useEffect } from 'react';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  image?: string;
  imageAlt?: string;
  type?: string;
  structuredData?: object;
  /** If true, uses title exactly as provided without appending site name */
  isHomePage?: boolean;
  /** If true, adds noindex/nofollow to prevent search engine indexing */
  noIndex?: boolean;
}

const SEO: React.FC<SEOProps> = ({
  title,
  description,
  keywords = "geography games, world capitals quiz, interactive world map, country flags, learn geography, educational games, atlas, country database",
  image = "",
  imageAlt = "",
  type = "website",
  structuredData,
  isHomePage = false,
  noIndex = false
}) => {
  const siteName = "ExploreCapitals";
  const siteDomain = "ExploreCapitals.com";
  // For home page, use title as-is. For other pages, append site domain
  const fullTitle = isHomePage
    ? title
    : title.includes(siteName)
      ? title
      : `${title} | ${siteName}`;

  // Browser tab title: strip category suffixes (e.g. " - Games", " - Premium Game") and use .com domain
  const browserTitle = isHomePage
    ? title
    : (() => {
        // Remove category suffixes like " - Games", " - Premium Game", " - Playing", " - Expedition"
        const cleanName = title.replace(/\s*-\s*(Games|Premium Game|Playing|Expedition|Premium)$/i, '');
        return `${cleanName} | ${siteDomain}`;
      })();

  useEffect(() => {
    // 1. Update Title
    document.title = browserTitle;

    // 2. Helper to update or create meta tags
    const setMeta = (name: string, content: string) => {
      let element = document.querySelector(`meta[name="${name}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute('name', name);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    const setProperty = (property: string, content: string) => {
      let element = document.querySelector(`meta[property="${property}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute('property', property);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // 3. Standard Meta Tags
    setMeta('description', description);
    setMeta('keywords', keywords);
    setMeta('robots', noIndex ? 'noindex, nofollow' : 'index, follow, max-image-preview:none, max-snippet:-1, max-video-preview:-1');
    setMeta('author', 'ExploreCapitals');

    // Build canonical URL: always use production domain with clean path
    const canonicalUrl = `https://explorecapitals.com${window.location.pathname}`;

    // 4. Open Graph / Social Media
    setProperty('og:title', fullTitle);
    setProperty('og:description', description);
    setProperty('og:type', type);
    setProperty('og:url', canonicalUrl);
    if (image) {
      setProperty('og:image', image);
      setProperty('og:image:alt', imageAlt);
    } else {
      // Remove og:image if none provided — prevents favicon/globe from being used
      document.querySelector('meta[property="og:image"]')?.remove();
      document.querySelector('meta[property="og:image:alt"]')?.remove();
    }
    setProperty('og:site_name', siteName);
    setProperty('og:locale', 'en_US');

    // 5. Twitter Card
    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', fullTitle);
    setMeta('twitter:description', description);
    if (image) {
      setMeta('twitter:image', image);
      setMeta('twitter:image:alt', imageAlt);
    } else {
      document.querySelector('meta[name="twitter:image"]')?.remove();
      document.querySelector('meta[name="twitter:image:alt"]')?.remove();
    }
    setMeta('twitter:site', '@explorecapitals');

    // 6. Canonical Link
    let linkCanonical = document.querySelector('link[rel="canonical"]');
    if (!linkCanonical) {
      linkCanonical = document.createElement('link');
      linkCanonical.setAttribute('rel', 'canonical');
      document.head.appendChild(linkCanonical);
    }
    linkCanonical.setAttribute('href', canonicalUrl);

    // 7. Structured Data (JSON-LD)
    const existingScript = document.getElementById('json-ld-seo');
    if (existingScript) existingScript.remove();

    if (structuredData) {
      const scriptJSONLD = document.createElement('script');
      scriptJSONLD.id = 'json-ld-seo';
      scriptJSONLD.setAttribute('type', 'application/ld+json');
      scriptJSONLD.textContent = JSON.stringify(structuredData);
      document.head.appendChild(scriptJSONLD);
    }
  }, [fullTitle, description, keywords, image, imageAlt, type, structuredData, noIndex]);

  return null;
};

export default SEO;
