import dbConnect from '@/lib/utils/db';
import Product from '@/models/Product';
import { getCategoryKeywords, getProductSchema } from '@/components/seo/SEOKeywords';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.nitazenechemicals.com';

export async function generateMetadata({ params }) {
  const { slug } = await params;

  try {
    await dbConnect();
    const product = await Product.findOne({ slug }).select('name description category priceVariants images casNumber').lean();

    if (!product) {
      return {
        title: 'Product Not Found | NitazeneChemicals',
        description: 'The product you are looking for could not be found.',
      };
    }

    const startingPrice = product.priceVariants?.length
      ? Math.min(...product.priceVariants.map((v) => v.price))
      : product.price;
    const priceText = startingPrice ? ` Starting from \u20AC${startingPrice}.` : '';
    const shortDesc = product.description
      ? product.description.slice(0, 155).replace(/\n/g, ' ').trim() + '…'
      : `Buy ${product.name} — high-purity ${product.category} research compound.${priceText}`;

    const image = product.images?.[0] || `${BASE_URL}/images/logo.svg`;
    const categoryKeywords = [product.category, product.category + ' for sale', 'buy ' + product.category].filter(Boolean);
    const casKeywords = product.casNumber ? [product.casNumber, `cas ${product.casNumber}`, `${product.name.toLowerCase()} cas ${product.casNumber}`] : [];

    return {
      metadataBase: new URL(BASE_URL),
      title: `Buy ${product.name} Online${product.casNumber ? ` | CAS ${product.casNumber}` : ''} | NitazeneChemicals`,
      description: shortDesc,
      keywords: [
        product.name,
        product.name.toLowerCase() + ' for sale',
        'buy ' + product.name.toLowerCase(),
        product.name.toLowerCase() + ' online',
        ...casKeywords,
        ...categoryKeywords,
        ...getCategoryKeywords(product.category).slice(0, 12),
        'research chemicals',
        'NitazeneChemicals',
        'high purity',
        'certificate of analysis',
        'lab verified',
      ],
      alternates: {
        canonical: `/products/${slug}`,
      },
      openGraph: {
        title: `${product.name} | NitazeneChemicals`,
        description: shortDesc,
        url: `/products/${slug}`,
        type: 'website',
        images: [
          {
            url: image,
            width: 1200,
            height: 630,
            alt: product.name,
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title: `${product.name} | NitazeneChemicals`,
        description: shortDesc,
        images: [image],
      },
    };
  } catch {
    return {
      title: 'NitazeneChemicals | Research Chemicals',
      description: 'Premium research chemicals — high purity, certificate of analysis, discreet shipping.',
    };
  }
}

export default async function ProductLayout({ children, params }) {
  const { slug } = await params;
  let schema = null;
  try {
    await dbConnect();
    const product = await Product.findOne({ slug })
      .select('name slug description category priceVariants price images casNumber countInStock rating numReviews')
      .lean();
    if (product) schema = getProductSchema(product);
  } catch {}

  return (
    <>
      {schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      )}
      {children}
    </>
  );
}
