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

const MIN_GRAMS = Number(process.argv[2] || 50);

async function run() {
  await mongoose.connect(MONGODB_URI);
  const col = mongoose.connection.db.collection('products');

  const res = await col.updateMany(
    { priceVariants: { $exists: true } },
    { $pull: { priceVariants: { quantity: { $lt: MIN_GRAMS } } } }
  );
  console.log(`Removed variants < ${MIN_GRAMS}g — matched: ${res.matchedCount}, modified: ${res.modifiedCount}`);

  const variants = await col.find(
    { priceVariants: { $exists: true, $not: { $size: 0 } } },
    { projection: { name: 1, 'priceVariants.quantity': 1 } }
  ).toArray();
  for (const p of variants) {
    console.log(` ${p.name}: ${p.priceVariants.map(v => v.quantity + 'g').join(', ')}`);
  }

  await mongoose.disconnect();
  process.exit(0);
}

run().catch(e => { console.error(e); process.exit(1); });
