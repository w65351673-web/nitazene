import mongoose from 'mongoose';
import dotenv from 'dotenv';
import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '../../');
dotenv.config({ path: path.join(root, '.env.local') });
dotenv.config({ path: path.join(root, '.env') });

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) { console.error('MONGODB_URI not set'); process.exit(1); }

// Usage: node src/scripts/import-novachem.mjs <datafile.json> <category>
const fileName = process.argv[2] || 'novachem-cannabinoids.json';
const targetCategory = process.argv[3] || 'cannabinoids';

const dataFile = path.join(root, fileName);
if (!fs.existsSync(dataFile)) { console.error(`${fileName} not found in project root`); process.exit(1); }

const productSchema = new mongoose.Schema({
  name: String, slug: String, category: String,
  images: [String], description: String,
  price: Number,
  priceVariants: [{ quantity: Number, price: Number }],
  countInStock: Number, rating: Number, numReviews: Number, featured: Boolean,
}, { timestamps: true });

const Product = mongoose.models.Product || mongoose.model('Product', productSchema);

const raw = JSON.parse(fs.readFileSync(dataFile, 'utf8'));

// Map NovaChem payload -> local Product shape
const products = raw
  .filter(p => p.category?.toLowerCase() === targetCategory.toLowerCase())
  .map(p => ({
    name: p.name,
    slug: p.slug,
    category: targetCategory,
    images: p.images || [],
    description: p.description || '',
    price: p.price ?? 0,
    priceVariants: (p.priceVariants || []).map(v => ({ quantity: v.quantity, price: v.price })),
    countInStock: p.countInStock ?? 0,
    rating: p.rating ?? 0,
    numReviews: p.numReviews ?? 0,
    featured: !!p.featured,
  }));

async function run() {
  await mongoose.connect(MONGODB_URI);
  console.log('Connected to MongoDB\n');

  let updated = 0, inserted = 0;
  for (const p of products) {
    const res = await Product.findOneAndUpdate(
      { slug: p.slug },
      { $set: p },
      { new: true, upsert: true }
    );
    const wasNew = res.createdAt && Math.abs(res.createdAt - Date.now()) < 5000;
    console.log(`${wasNew ? 'INSERTED' : 'UPDATED'}: ${p.name} (${p.images.length} img, ${p.priceVariants.length} variants)`);
    wasNew ? inserted++ : updated++;
  }

  console.log(`\nDone — ${inserted} inserted, ${updated} updated.`);
  await mongoose.disconnect();
  process.exit(0);
}

run().catch(e => { console.error(e); process.exit(1); });
