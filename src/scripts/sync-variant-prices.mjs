import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '../../');
dotenv.config({ path: path.join(root, '.env.local') });
dotenv.config({ path: path.join(root, '.env') });

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) { console.error('MONGODB_URI not set'); process.exit(1); }

// Nitazene starting tier price (50g)
const NITAZENE_50G = Number(process.argv[2] || 500);

async function run() {
  await mongoose.connect(MONGODB_URI);
  const col = mongoose.connection.db.collection('products');
  const products = await col.find({ 'priceVariants.0': { $exists: true } }).toArray();

  for (const p of products) {
    const variants = [...p.priceVariants].sort((a, b) => a.quantity - b.quantity);
    const base = variants[0]; // lowest quantity = 50g
    if (p.category === 'nitazenes') {
      const factor = NITAZENE_50G / base.price;
      const scaled = variants.map(v => ({ ...v, price: Math.round(v.price * factor) }));
      await col.updateOne({ _id: p._id }, { $set: { priceVariants: scaled, price: NITAZENE_50G } });
      console.log(`NITAZENE ${p.name}: 50g=€${NITAZENE_50G}, tiers ${scaled.map(v => `${v.quantity}g:€${v.price}`).join(' ')}`);
    } else {
      await col.updateOne({ _id: p._id }, { $set: { price: base.price, priceVariants: variants } });
      console.log(`${p.name}: price synced to 50g = €${base.price}`);
    }
  }

  await mongoose.disconnect();
  process.exit(0);
}

run().catch(e => { console.error(e); process.exit(1); });
