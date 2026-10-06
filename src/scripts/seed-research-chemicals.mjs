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

// Cannabinoid-style tiers: 50g / 100g / 500g / 1000g
const tiers = (p50, p100, p500, p1000) => ([
  { quantity: 50, price: p50 },
  { quantity: 100, price: p100 },
  { quantity: 500, price: p500 },
  { quantity: 1000, price: p1000 },
]);

const mk = (name, slug, cas, t, desc, stock, rating, reviews, featured) => ({
  name, slug, category: 'research chemicals', images: [],
  description: desc, price: t[0].price, casNumber: cas,
  priceVariants: t, countInStock: stock,
  rating, numReviews: reviews, featured,
});

const products = [
  mk('MDMA', 'mdma', '42542-10-9',
    tiers(480, 640, 1100, 1900),
    `MDMA, formally (±)-3,4-methylenedioxy-N-methylamphetamine, is a substituted amphetamine of the phenethylamine class and one of the most extensively studied entactogenic compounds in modern pharmacology. First synthesised by Merck in 1912, it has become a cornerstone reference compound in serotonin transporter research, neurotoxicity studies, and clinical psychopharmacology.\n\nMDMA acts primarily as a serotonin-norepinephrine-dopamine releasing agent, functioning as a substrate at the serotonin transporter (SERT), norepinephrine transporter (NET), and to a lesser extent the dopamine transporter (DAT). Its preferential SERT affinity — roughly tenfold higher than for DAT — distinguishes it from classical amphetamines and produces its characteristic entactogenic pharmacological profile, making it the standard comparator in monoamine transporter selectivity studies.\n\nThe compound's metabolism is well characterised: hepatic CYP2D6-mediated O-demethylenation produces MDA (3,4-methylenedioxyamphetamine), itself an active metabolite, while alternative pathways via N-demethylation and catechol-O-methyltransferase produce a complex metabolite profile extensively documented in forensic and clinical toxicology literature.\n\nMDMA serves as the primary reference standard in entactogen pharmacology, illicit drug profiling, forensic seizure analysis, and the rapidly expanding field of MDMA-assisted psychotherapy research. Its enantiomeric composition — racemic in street material but stereochemically distinct in activity — makes chiral analysis of MDMA a standard forensic exercise.\n\nOur MDMA is supplied as the racemic hydrochloride salt, produced to 99%+ purity, confirmed by HPLC-MS, ¹H and ¹³C NMR spectroscopy, and chiral analysis. A full Certificate of Analysis with complete spectral data is provided with every order.`,
    30, 4.8, 22, true),

  mk('MDPHP', 'mdphp', '776994-64-0',
    tiers(460, 620, 1060, 1820),
    `MDPHP, formally 3',4'-methylenedioxy-α-pyrrolidinohexanophenone, is a synthetic cathinone of the pyrrolidinophenone subclass — commonly known as a "monkey dust" analogue — and one of the most pharmacologically potent cathinone derivatives identified in the novel psychoactive substances landscape. It emerged in European drug markets around 2016 and has since become a key compound in cathinone structure-activity relationship research.\n\nMDPHP functions as a potent norepinephrine-dopamine reuptake inhibitor (NDRI), with the 3,4-methylenedioxy ring conferring additional serotonergic activity absent in the parent α-PHP structure. Its six-carbon alkyl chain — longer than the butyl of MDPV or the pentyl of α-PVP — produces distinctive transporter binding kinetics, making it a critical data point in cathinone SAR mapping studies examining the relationship between side-chain length and monoamine transporter selectivity.\n\nThe compound's analytical characterisation has been driven by forensic demand: its EI-MS fragmentation pattern, GC retention indices, and LC-MS/MS transitions are documented in EUDA and UNODC reference libraries, and MDPHP frequently appears in seized material identification workflows alongside structurally related pyrrolidinophenones.\n\nMDPHP is employed in cathinone receptor pharmacology, forensic drug identification method development, NPS surveillance studies, and comparative potency assessments within the synthetic stimulant class. Its structural relationship to both MDPV and α-PHP makes it valuable in three-way SAR comparisons.\n\nOur MDPHP is produced to 99%+ purity as the hydrochloride salt, confirmed by HPLC-MS and multinuclear NMR spectroscopy. A complete Certificate of Analysis with spectral documentation accompanies every order.`,
    22, 4.6, 11, false),

  mk('U-47700', 'u-47700', '121348-98-9',
    tiers(490, 660, 1140, 1980),
    `U-47700, formally 3,4-dichloro-N-[(1R,2R)-2-(dimethylamino)cyclohexyl]-N-methylbenzamide, is a synthetic opioid of the benzamide class originally developed by Upjohn in the 1970s as part of the AH-series analgesic programme. Never commercialised as a medicine, it emerged as a novel psychoactive substance around 2015 and became one of the most studied non-fentanyl synthetic opioids in forensic and pharmacological research.\n\nU-47700 is a selective mu-opioid receptor agonist with approximately 7.5 times the analgesic potency of morphine in preclinical models. Its trans-1,2-diaminocyclohexane scaffold — structurally unrelated to both the morphinan and anilidopiperidine opioid classes — makes it a fundamentally distinct pharmacophore, and it serves as the reference compound for the entire benzamide opioid family including U-48800, U-49900, and the isomeric U-51754.\n\nThe compound's metabolism via N-demethylation produces N-desmethyl-U-47700, the principal urinary metabolite used in forensic confirmation. Its appearance in drug seizure and post-mortem casework drove the rapid development of validated LC-MS/MS quantification methods, and U-47700 remains a mandatory inclusion in comprehensive opioid screening panels in accredited forensic laboratories.\n\nU-47700 is used in opioid receptor binding studies, benzamide-class SAR research, forensic reference standard development, and post-mortem toxicology method validation. Its scheduling history across jurisdictions has made it a case study in novel psychoactive substance legislative response.\n\nOur U-47700 is produced to 99%+ purity as the hydrochloride salt, confirmed by HPLC-MS, ¹H and ¹³C NMR spectroscopy, and elemental analysis. A full Certificate of Analysis with complete spectral data is provided with every order.`,
    25, 4.7, 16, true),

  mk('Kratom Powder', 'kratom-powder', '4098-40-2',
    tiers(180, 320, 900, 1500),
    `Kratom powder is the finely milled leaf material of Mitragyna speciosa, a tropical evergreen tree of the coffee family (Rubiaceae) native to Southeast Asia. The powder contains a complex alkaloid profile dominated by mitragynine (CAS 4098-40-2) and 7-hydroxymitragynine — the two indole alkaloids responsible for the plant's unique dual stimulant-opioid pharmacology and the focus of an expanding body of pharmacological research.\n\nMitragynine, the most abundant alkaloid (~60–66% of total alkaloid content), acts as a partial agonist at mu-opioid receptors while also engaging adrenergic, serotonergic, and dopaminergic systems — a polypharmacological profile that distinguishes kratom from classical opioids. Crucially, preclinical evidence suggests mitragynine produces markedly less β-arrestin-2 recruitment than conventional opioids, a finding central to current research into its reduced respiratory depression profile.\n\n7-Hydroxymitragynine, present at roughly 2% of total alkaloid content but significantly more potent at mu-opioid receptors, is formed both in planta and via hepatic CYP3A4-mediated oxidation of mitragynine. The metabolic interconversion of these alkaloids makes kratom a uniquely valuable subject for pharmacokinetic, drug-metabolism, and opioid receptor functional selectivity research.\n\nKratom powder is employed in natural product chemistry, alkaloid isolation and quantification method development, ethnopharmacological studies, opioid receptor signalling research, and analytical standard preparation for mitragynine/7-OH-mitragynine assays. It is among the most frequently encountered botanical materials in forensic and clinical toxicology.\n\nOur kratom powder is produced from mature Mitragyna speciosa leaf, micronised to consistent particle size, and independently verified for mitragynine content by HPLC. A Certificate of Analysis with alkaloid quantification and microbial screening data accompanies every order.`,
    60, 4.9, 38, true),

  mk('Crystal Meth', 'crystal-meth', '51-57-0',
    tiers(500, 670, 1150, 2000),
    `Crystal meth, formally (S)-N-methyl-1-phenylpropan-2-amine hydrochloride, is the crystalline hydrochloride salt of methamphetamine — a potent substituted amphetamine and one of the most extensively characterised central nervous system stimulants in pharmaceutical and forensic science. Originally synthesised in 1893 from ephedrine, methamphetamine remains a benchmark compound in monoamine pharmacology and drug policy research.\n\nMethamphetamine acts as a potent dopamine-norepinephrine releasing agent, functioning as a substrate at DAT, NET, and the vesicular monoamine transporter VMAT2. Its reversal of transporter function — rather than mere reuptake blockade — produces monoamine efflux that distinguishes its mechanism from cocaine and places it at the centre of transporter-substrate pharmacology research. The compound's high lipophilicity produces rapid and extensive blood-brain barrier penetration.\n\nThe compound exists as two enantiomers with dramatically different pharmacology: d-methamphetamine is the potent CNS stimulant, while l-methamphetamine retains only peripheral sympathomimetic activity. This stereochemical dichotomy makes chiral analysis of methamphetamine a routine forensic requirement, and isotope-ratio mass spectrometry is used to determine synthetic route provenance in seizure analysis.\n\nCrystal meth serves as a primary reference standard in forensic drug identification, stimulant pharmacology research, neurotoxicity studies examining dopaminergic terminal damage, drug policy and epidemiology research, and the development of presumptive testing technologies including Raman and ion-mobility spectrometry.\n\nOur crystal meth is produced as the d-methamphetamine hydrochloride salt to 99%+ purity, confirmed by HPLC-MS, chiral chromatography, and multinuclear NMR spectroscopy. A comprehensive Certificate of Analysis with enantiomeric purity data is provided with every order.`,
    20, 4.8, 19, true),
];

async function run() {
  await mongoose.connect(MONGODB_URI);
  console.log('Connected to MongoDB');

  for (const p of products) {
    const res = await Product.findOneAndUpdate(
      { slug: p.slug },
      { $set: p },
      { upsert: true, new: true }
    );
    console.log(`${res.createdAt?.getTime() === res.updatedAt?.getTime() ? 'ADDED' : 'UPDATED'}: ${p.name} (${p.casNumber})`);
  }

  console.log(`\nDone — ${products.length} research chemical products upserted.`);
  await mongoose.disconnect();
  process.exit(0);
}

run().catch(e => { console.error(e); process.exit(1); });
