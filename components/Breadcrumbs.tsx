import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

/**
 * Breadcrumbs component with JSON-LD BreadcrumbList schema.
 * Renders both visible breadcrumb links and structured data for Google.
 */
const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      ...(item.href ? { item: `https://explorecapitals.com${item.href}` } : {}),
    })),
  };

  return (
    <>
      {/* JSON-LD for breadcrumbs (separate from main SEO JSON-LD) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* Visible breadcrumb navigation */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-1 text-xs text-white/40 mb-4 flex-wrap">
        {items.map((item, index) => (
          <React.Fragment key={index}>
            {index > 0 && <ChevronRight size={12} className="text-white/20 flex-shrink-0" />}
            {item.href && index < items.length - 1 ? (
              <Link
                to={item.href}
                className="hover:text-white/70 transition-colors"
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-white/60">{item.label}</span>
            )}
          </React.Fragment>
        ))}
      </nav>
    </>
  );
};

export default Breadcrumbs;
