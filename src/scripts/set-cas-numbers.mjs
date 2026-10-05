import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '../../.env.local') });
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) { console.error('MONGODB_URI not set'); process.exit(1); }

// slug -> CAS registry number (verified against PubChem / Cayman / WHO-ECDD / UNODC)
const CAS = {
  // Cannabinoids
  '4f-adb-precursorkit': '2365471-11-8',
  '5f-mdmb-2201': '1971007-88-1',
  'mdmb-fubinaca': '1971007-93-8',
  'mdmb-chminaca': '1185888-32-7',
  'ab-fubinaca': '1185282-01-2',
  'mdmb-4en-pinaca': '2504100-70-1',
  'amb-fubinaca': '1715016-77-5',
  'adb-fubinaca': '1445583-51-6',
  '5f-edmb-pinaca': '2504100-69-8',
  'ab-pinaca': '1445752-09-9',
  'adb-butinaca': '2682867-55-4',
  'jwh-018': '209414-07-3',
  '5-fadb': '1715016-75-3',
  '5-cl-adba': '137350-66-4',
  // '6-cl-adba' — no CAS assigned to this analogue
  // Research chemicals
  'amphetamine-powder': '300-62-9',
  '2fdck': '111982-50-4',
  'alpha-pvp': '14530-33-7',
  'ketamine-crystal': '6740-88-1',
  'alpha-pihp': '2181620-71-1',
  '4-mmc-mephedrone': '1189805-46-6',
  '3-mmc-3-methylmethcathinone': '1246816-62-5',
  '4-cmc-4-chloromethcathinone': '1225843-86-6',
  '3-cmc-3-chloromethcathinone': '1049677-59-9',
  'crystal-methamphetamine': '537-46-2',
  // Nitazenes
  'bromazolam': '71368-80-4',
  'n-pyrrolidino-etonitazene': '2785346-75-8',
  'etodesnitazene': '14030-76-3',
  'etonitazene': '911-65-9',
  'butonitazene': '95810-54-1',
  'protonitazene': '95958-84-2',
  'metonitazene': '14680-51-4',
  'isotonitazene': '14188-81-9',
  'clonitazene': '3861-76-5',
  'flunitazene': '2249-36-7',
  'metodesnitazene': '14030-77-4',
  // 'ethyleneoxynitazene' — no CAS assigned yet
};

async function run() {
  await mongoose.connect(MONGODB_URI);
  const col = mongoose.connection.db.collection('products');

  let updated = 0, missing = 0;
  for (const [slug, cas] of Object.entries(CAS)) {
    const res = await col.updateOne({ slug }, { $set: { casNumber: cas } });
    if (res.matchedCount === 0) { console.log(`NOT FOUND: ${slug}`); missing++; }
    else { console.log(`${slug}: ${cas}`); updated += res.modifiedCount; }
  }

  console.log(`\nDone — ${updated} updated, ${missing} slugs not found.`);
  await mongoose.disconnect();
  process.exit(0);
}

run().catch(e => { console.error(e); process.exit(1); });
