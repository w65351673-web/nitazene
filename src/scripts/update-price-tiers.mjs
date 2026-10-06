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
  price: Number, casNumber: String,
  priceVariants: [{ quantity: Number, price: Number }],
  countInStock: Number, rating: Number, numReviews: Number, featured: Boolean,
}, { timestamps: true });

const Product = mongoose.models.Product || mongoose.model('Product', productSchema);

// New flat tiers for cannabinoids, research chemicals, opioids
const newTiers = [
  { quantity: 100, price: 600 },
  { quantity: 250, price: 850 },
  { quantity: 500, price: 1200 },
  { quantity: 1000, price: 2300 },
];

const categories = ['cannabinoids', 'research chemicals', 'opioids'];

async function run() {
  await mongoose.connect(MONGODB_URI);
  console.log('Connected to MongoDB');

  const res = await Product.updateMany(
    { category: { $in: categories } },
    { $set: { priceVariants: newTiers, price: newTiers[0].price } }
  );

  console.log(`Updated ${res.modifiedCount} products (matched ${res.matchedCount}) across: ${categories.join(', ')}`);
  console.log('New tiers:', newTiers.map(t => `${t.quantity}g=€${t.price}`).join(' | '));

  // Sanity check — print a few products
  const sample = await Product.find({ category: { $in: categories } }).select('name category price priceVariants').limit(5).lean();
  for (const p of sample) {
    console.log(`  ${p.name} [${p.category}] — base €${p.price}, tiers: ${p.priceVariants.map(v => `${v.quantity}g €${v.price}`).join(', ')}`);
  }

  await mongoose.disconnect();
  process.exit(0);
}

run().catch(e => { console.error(e); process.exit(1); });
