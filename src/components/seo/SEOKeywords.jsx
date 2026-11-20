// Primary keywords — matches actual products listed on the site
export const categoryKeywords = {
  cannabinoids: [
    'synthetic cannabinoids', 'buy synthetic cannabinoids', 'cannabinoids for sale',
    '5cl-adba', '5-cl-adba', '5cladba', '5cl-adba precursor', '5cl-adba kit',
    '5fadb', '5-fadb', '5f-adb', '6cl-adba', '6-cl-adba', '4f-adb', '4fadb',
    'jwh-018', 'adb-butinaca', 'ab-pinaca', 'ab-fubinaca', 'adb-fubinaca', 'amb-fubinaca',
    'mdmb-4en-pinaca', 'mdmb-chminaca', 'mdmb-fubinaca', '5f-edmb-pinaca', '5f-mdmb-2201',
  ],
  nitazenes: [
    'nitazenes', 'buy nitazenes', 'nitazenes for sale', 'benzimidazole opioids',
    'isotonitazene', 'metonitazene', 'protonitazene', 'butonitazene', 'etonitazene',
    'clonitazene', 'flunitazene', 'etodesnitazene', 'metodesnitazene',
    'n-pyrrolidino etonitazene', 'etonitazepyne', 'ethyleneoxynitazene', 'bromazolam',
  ],
  opioids: [
    'opioids', 'buy opioids', 'opioids for research', 'opioid reference standards',
    'buprenorphine powder', 'codeine powder', 'fentanyl powder', 'hydrocodone powder',
    'hydromorphone powder', 'methadone powder', 'morphine powder', 'oxycodone powder',
    'oxymorphone powder', 'tramadol powder',
  ],
  'research chemicals': [
    'research chemicals', 'buy research chemicals online', 'research chemicals for sale',
    '2fdck', '2-fdck', '3mmc', '3-mmc', '3cmc', '3-cmc', '4cmc', '4-cmc', '4mmc', '4-mmc', 'mephedrone',
    'alpha-pvp', 'a-pvp', 'apvp', 'alpha-pihp', 'a-pihp', 'amphetamine powder',
    'crystal meth', 'crystal methamphetamine', 'ketamine crystal', 'kratom powder',
    'mdma', 'mdma crystal', 'mdphp', 'u-47700', 'u47700',
  ],
  etomidate: [
    'etomidate', 'buy etomidate', 'etomidate for sale', 'etomidate powder', 'etomidate powder pure',
    'etomidate crystal', 'cychlorphine', 'cychlorphine hcl', 'n-propionitrile chlorphine',
    'medetomidine', 'medetomidine powder', 'tiletamine', 'tiletamine powder',
    'spirochlorphine', 'r6890', 'r-6890',
  ],
};

export const getCategoryKeywords = (category) =>
  categoryKeywords[String(category || '').toLowerCase()] || [];

export const primaryKeywords = Object.values(categoryKeywords).flat();

export const secondaryKeywords = [
  'research chemicals',
  'synthetic cannabinoids',
  'laboratory chemicals',
  'premium research chemicals',
  'buy research chemicals online',
  'nitazenes',
  'opioids for research',
  'cannabinoids for research',
  'chemical compounds',
  'laboratory grade chemicals',
  'high purity',
  'certificate of analysis',
  'lab verified',
  'discreet worldwide shipping',
  'pay with bitcoin',
  'NitazeneChemicals',
];

export const allKeywords = [...primaryKeywords, ...secondaryKeywords];

// Schema.org structured data for better SEO
export const getProductSchema = (product) => {
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.nitazenechemicals.com';
  const prices = (product.priceVariants || []).map((v) => v.price).filter((p) => typeof p === 'number');
  if (!prices.length && typeof product.price === 'number') prices.push(product.price);
  const rawImage = product.images?.[0] || '/images/logo.svg';
  const image = rawImage.startsWith('http') ? rawImage : `${BASE_URL}${rawImage}`;
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image,
    sku: product.slug,
    ...(product.casNumber ? { mpn: product.casNumber } : {}),
    category: product.category,
    brand: { '@type': 'Brand', name: 'NitazeneChemicals' },
    offers: {
      '@type': 'AggregateOffer',
      lowPrice: prices.length ? Math.min(...prices) : 0,
      highPrice: prices.length ? Math.max(...prices) : 0,
      offerCount: prices.length || 1,
      priceCurrency: 'EUR',
      availability: product.countInStock > 0 ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      url: `${BASE_URL}/products/${product.slug}`,
    },
    aggregateRating: product.rating ? {
      '@type': 'AggregateRating',
      ratingValue: product.rating,
      reviewCount: product.numReviews || 1,
    } : undefined,
  };
};

// Get base URL for schemas
const getBaseUrl = () => {
  return process.env.NEXT_PUBLIC_BASE_URL || 'https://www.nitazenechemicals.com';
};

// Organization schema
export const getOrganizationSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'NitazeneChemicals',
  description: 'Premium research chemicals supplier — synthetic cannabinoids, nitazenes, opioids, etomidate and laboratory-grade compounds for scientific research.',
  url: getBaseUrl(),
  logo: {
    '@type': 'ImageObject',
    url: `${getBaseUrl()}/images/logo.svg`,
  },
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer support',
    availableLanguage: 'English',
  },
  sameAs: [],
});

// Website schema with SearchAction for sitelinks search box
export const getWebsiteSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'NitazeneChemicals',
  description: 'Premium research chemicals — synthetic cannabinoids, nitazenes, opioids, etomidate and laboratory compounds.',
  url: getBaseUrl(),
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${getBaseUrl()}/products?search={search_term_string}`,
    },
    'query-input': 'required name=search_term_string',
  },
});

export default function SEOKeywords() {
  const organizationSchema = getOrganizationSchema();
  const websiteSchema = getWebsiteSchema();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
    </>
  );
}
