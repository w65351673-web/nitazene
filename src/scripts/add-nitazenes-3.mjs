import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '../../.env.local') });
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) { console.error('MONGODB_URI not set'); process.exit(1); }

const productSchema = new mongoose.Schema({
  name: String, slug: String, category: String,
  images: [String], description: String,
  price: Number,
  priceVariants: [{ quantity: Number, price: Number }],
  countInStock: Number, rating: Number, numReviews: Number, featured: Boolean,
}, { timestamps: true });

const Product = mongoose.models.Product || mongoose.model('Product', productSchema);

// Same tier shape as the other nitazenes (50g = €500)
const tiers = (a, b, c) => ([
  { quantity: 50, price: 500 },
  { quantity: 100, price: a },
  { quantity: 500, price: b },
  { quantity: 1000, price: c },
]);

const products = [
  {
    name: 'Clonitazene',
    slug: 'clonitazene',
    category: 'nitazenes',
    images: [],
    description: 'High-purity clonitazene research compound for pharmacological and analytical studies.\n\nA potent member of the benzimidazole opioid class, supplied at 99%+ purity verified by HPLC and NMR analysis. Suitable for receptor binding assays, chromatographic reference work and forensic research.\n\nCertificate of Analysis included with every order. For laboratory research only — not for human or veterinary use.',
    price: 500,
    priceVariants: tiers(675, 1210, 2065),
    countInStock: 15,
    rating: 4.7,
    numReviews: 8,
    featured: true,
  },
  {
    name: 'Flunitazene',
    slug: 'flunitazene',
    category: 'nitazenes',
    images: [],
    description: 'Research-grade flunitazene for analytical chemistry and pharmacological research applications.\n\nFluorinated benzimidazole derivative supplied at 99%+ purity, batch-tested via HPLC and mass spectrometry. Commonly used as a reference standard and in comparative opioid receptor studies.\n\nCertificate of Analysis included with every order. For laboratory research only — not for human or veterinary use.',
    price: 500,
    priceVariants: tiers(680, 1220, 2085),
    countInStock: 12,
    rating: 4.8,
    numReviews: 6,
    featured: true,
  },
  {
    name: 'Metodesnitazene',
    slug: 'metodesnitazene',
    category: 'nitazenes',
    images: [],
    description: 'High-purity metodesnitazene research compound for laboratory and forensic analysis.\n\nDesnitazene analogue of the benzimidazole series, supplied at 99%+ purity verified by independent HPLC and NMR testing. Used in structural characterization studies and as an analytical reference material.\n\nCertificate of Analysis included with every order. For laboratory research only — not for human or veterinary use.',
    price: 500,
    priceVariants: tiers(672, 1205, 2055),
    countInStock: 18,
    rating: 4.6,
    numReviews: 9,
    featured: true,
  },
  {
    name: 'Ethyleneoxynitazene',
    slug: 'ethyleneoxynitazene',
    category: 'nitazenes',
    images: [],
    description: 'Research-grade ethyleneoxynitazene for analytical and pharmacological research.\n\nCyclic ether analogue within the benzimidazole opioid family, supplied at 99%+ purity, each batch independently verified by HPLC and mass spectrometry. Suitable for receptor profiling, method development and forensic reference work.\n\nCertificate of Analysis included with every order. For laboratory research only — not for human or veterinary use.',
    price: 500,
    priceVariants: tiers(678, 1216, 2075),
    countInStock: 10,
    rating: 4.7,
    numReviews: 5,
    featured: true,
  },
];

async function run() {
  await mongoose.connect(MONGODB_URI);
  console.log('Connected to MongoDB');

  let added = 0, updated = 0;
  for (const p of products) {
    const res = await Product.findOneAndUpdate(
      { slug: p.slug },
      { $set: p },
      { upsert: true, new: true }
    );
    console.log(`${res.createdAt?.getTime() === res.updatedAt?.getTime() ? 'ADDED' : 'UPDATED'}: ${p.name}`);
    added++;
  }

  console.log(`\nDone — ${added} products upserted.`);
  await mongoose.disconnect();
  process.exit(0);
}

run().catch(e => { console.error(e); process.exit(1); });
