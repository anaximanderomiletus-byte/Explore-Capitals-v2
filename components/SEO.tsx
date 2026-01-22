import React, { useEffect } from 'react';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  image?: string;
  imageAlt?: string;
  type?: string;
  structuredData?: object;
}

const SEO: React.FC<SEOProps> = ({
  title,
  description,
  keywords = "geography, world capitals, world map, quiz, education, learning, countries, flags, population, interactive atlas",
  image = "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?q=80&w=1200&auto=format&fit=crop",
  imageAlt = "ExploreCapitals.com Interactive World Map",
  type = "website",
  structuredData
}) => {
  const siteName = "ExploreCapitals.com";
  const fullTitle = `${title} | ${siteName}`;

  useEffect(() => {
    // 1. Update Title
    document.title = fullTitle;

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
    setMeta('robots', 'index, follow');

    // 4. Open Graph / Social Media
    setProperty('og:title', fullTitle);
    setProperty('og:description', description);
    setProperty('og:type', type);
    setProperty('og:url', window.location.href);
    setProperty('og:image', image);
    setProperty('og:image:alt', imageAlt);
    setProperty('og:site_name', siteName);
    setProperty('og:locale', 'en_US');

    // 5. Twitter Card
    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', fullTitle);
    setMeta('twitter:description', description);
    setMeta('twitter:image', image);
    setMeta('twitter:image:alt', imageAlt);
    setMeta('twitter:site', '@explorecapitals');

    // 6. Canonical Link
    let linkCanonical = document.querySelector('link[rel="canonical"]');
    if (!linkCanonical) {
      linkCanonical = document.createElement('link');
      linkCanonical.setAttribute('rel', 'canonical');
      document.head.appendChild(linkCanonical);
    }
    linkCanonical.setAttribute('href', window.location.href);

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
  }, [fullTitle, description, keywords, image, imageAlt, type, structuredData]);

  return null;
};

export default SEO;