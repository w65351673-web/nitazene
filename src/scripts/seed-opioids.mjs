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
  name, slug, category: 'opioids', images: [],
  description: desc, price: t[0].price, casNumber: cas,
  priceVariants: t, countInStock: stock,
  rating, numReviews: reviews, featured,
});

const products = [
  mk('Oxycodone', 'oxycodone', '76-42-6',
    tiers(470, 630, 1080, 1850),
    `Oxycodone, formally (5R,9R,13S,14S)-4,5α-epoxy-14-hydroxy-3-methoxy-17-methylmorphinan-6-one, is a semi-synthetic opioid derived from the naturally occurring opiate alkaloid thebaine. First synthesised in Germany in 1916, it remains one of the most extensively characterised opioid analgesics and a benchmark compound in mu-opioid receptor pharmacology.\n\nOxycodone acts as a potent agonist at the mu-opioid receptor (MOR), with additional activity at kappa and delta receptor subtypes. Its 14-hydroxyl group distinguishes it from hydrocodone and contributes to increased analgesic potency and altered binding kinetics. Competitive binding studies report Ki values in the low nanomolar range, making it a standard comparator in opioid receptor affinity assays.\n\nThe compound's metabolism has been thoroughly mapped, with hepatic CYP3A4-mediated N-demethylation to noroxycodone and CYP2D6-mediated O-demethylation to the active metabolite oxymorphone — a pathway that makes oxycodone central to pharmacogenetic and drug-interaction research. Its mass spectrometric fragmentation pattern is fully documented in forensic databases.\n\nOxycodone is widely employed as a certified reference standard in forensic toxicology, clinical method validation, impurity profiling, and the development of LC-MS/MS and GC-MS screening protocols.\n\nOur oxycodone is produced to 99%+ purity, confirmed by HPLC-MS, ¹H and ¹³C NMR spectroscopy, and elemental analysis. A full Certificate of Analysis with complete spectral data is provided with every order.`,
    30, 4.8, 21, true),

  mk('Oxymorphone', 'oxymorphone', '76-41-5',
    tiers(470, 630, 1080, 1850),
    `Oxymorphone, formally 4,5α-epoxy-3,14-dihydroxy-17-methylmorphinan-6-one, is a potent semi-synthetic opioid derived from thebaine and the principal active metabolite of oxycodone. It occupies a unique position in opioid pharmacology research as both a parent compound and a metabolic endpoint.\n\nOxymorphone exhibits mu-opioid receptor binding affinity roughly tenfold greater than that of morphine, a property attributed to the 14-hydroxyl and 3-hydroxyl substitution pattern on the morphinan scaffold. This hydroxyl arrangement eliminates the methoxy group found in oxycodone and codeine, producing a receptor interaction profile that has made oxymorphone an important probe in orthosteric binding site mapping.\n\nBecause it is both synthesised directly and formed in vivo via CYP2D6 O-demethylation of oxycodone, oxymorphone is routinely included in metabolic pathway studies, drug-drug interaction models, and post-mortem toxicology interpretation panels. Its role as a metabolite demands the availability of pure reference material for quantitative confirmation analysis.\n\nThe compound is extensively documented in forensic and clinical analytical literature, with validated LC-MS/MS transition ions and characteristic fragmentation pathways serving as a gold standard in opioid screening methodologies.\n\nOur oxymorphone is produced to 99%+ purity, confirmed by HPLC-MS and multinuclear NMR spectroscopy. A complete Certificate of Analysis is supplied with every order.`,
    22, 4.7, 14, true),

  mk('Hydrocodone', 'hydrocodone', '125-29-1',
    tiers(460, 610, 1050, 1800),
    `Hydrocodone, formally 4,5α-epoxy-3-methoxy-17-methylmorphinan-6-one, is a semi-synthetic opioid synthesised from codeine via catalytic rearrangement. It is one of the most prescribed opioid analgesics in history and a foundational reference compound in opioid pharmacology and forensic chemistry.\n\nAs a mu-opioid receptor agonist, hydrocodone exhibits moderate binding affinity comparable to morphine, but with distinct pharmacokinetic characteristics owing to its 6-keto group and 3-methoxy substitution. The compound's pharmacological activity is substantially influenced by hepatic metabolism — CYP2D6 O-demethylation produces the highly potent metabolite hydromorphone, a conversion that makes hydrocodone a key compound in pharmacogenetic research and metabolic profiling studies.\n\nHydrocodone's mass spectrometric behaviour has been exhaustively characterised across EI-GC-MS, ESI-LC-MS/MS, and high-resolution Orbitrap platforms. Its validated transition ions and retention parameters are incorporated into forensic screening libraries worldwide, including those maintained by the UNODC, EUDA, and leading toxicology reference institutions.\n\nThe compound serves as a calibration standard for quantitative opioid assays, a reference material in impurity profiling of pharmaceutical formulations, and a comparator in receptor selectivity studies examining the morphinan scaffold.\n\nOur hydrocodone is produced to 99%+ purity, verified by HPLC-MS, ¹H and ¹³C NMR, and elemental analysis. A full Certificate of Analysis with complete spectral documentation accompanies every order.`,
    26, 4.6, 17, true),

  mk('Hydromorphone', 'hydromorphone', '466-99-9',
    tiers(460, 610, 1050, 1800),
    `Hydromorphone, formally 4,5α-epoxy-3-hydroxy-17-methylmorphinan-6-one, is a potent semi-synthetic opioid and the primary active metabolite of hydrocodone. It is among the most potent clinically used opioid analgesics, approximately five to seven times more potent than morphine, and serves as a critical reference compound in opioid potency research.\n\nThe structural features of hydromorphone — a free 3-hydroxyl group, 6-keto group, and 4,5α-epoxy bridge — confer high mu-opioid receptor binding affinity and rapid blood-brain barrier penetration. Its pharmacological profile has been extensively characterised in competitive radioligand binding assays, G-protein activation studies, and β-arrestin recruitment assays, making it a standard comparator in biased agonism research.\n\nAs the active metabolite of hydrocodone, hydromorphone plays a central role in studies of CYP2D6 polymorphism, where genetic variation in the O-demethylation pathway produces clinically significant differences in opioid exposure. This dual identity — as both a parent analgesic and a metabolic product — makes pure hydromorphone essential for forensic confirmation and quantitative toxicology.\n\nHydromorphone's analytical fingerprint, including characteristic m/z transitions and chromatographic behaviour across reversed-phase and normal-phase systems, is comprehensively documented in forensic databases.\n\nOur hydromorphone is produced to 99%+ purity, confirmed by HPLC-MS and NMR spectroscopy. A full Certificate of Analysis with spectral data is included with every order.`,
    24, 4.7, 13, true),

  mk('Fentanyl', 'fentanyl', '437-38-7',
    tiers(490, 650, 1120, 1950),
    `Fentanyl, formally N-phenyl-N-[1-(2-phenylethyl)piperidin-4-yl]propanamide, is a fully synthetic phenylpiperidine opioid and the parent compound of the largest and most pharmacologically significant class of synthetic opioids ever developed. First synthesised by Paul Janssen in 1960, fentanyl remains the most widely studied high-potency opioid in pharmaceutical and forensic science.\n\nFentanyl exhibits approximately 50–100 times the analgesic potency of morphine, a property derived from its high lipophilicity, rapid mu-opioid receptor binding kinetics, and efficient blood-brain barrier penetration. Its N-phenethyl substitution on the piperidine ring — the defining pharmacophore of the fentanyl series — is the single most important structural determinant of potency across hundreds of characterised analogues, making it the essential reference point for all fentanyl SAR studies.\n\nThe compound's metabolism via CYP3A4 N-dealkylation to norfentanyl is one of the most thoroughly documented pathways in forensic toxicology. Detection and quantification of fentanyl and norfentanyl in biological matrices remain among the highest-priority analytical challenges in post-mortem toxicology, drug seizure analysis, and clinical monitoring programmes.\n\nFentanyl is the primary calibration standard in virtually every opioid LC-MS/MS method deployed in forensic and clinical laboratories worldwide. Its status as the reference compound against which all novel synthetic opioids are compared ensures continued demand for high-purity reference material.\n\nOur fentanyl is produced to 99%+ purity, confirmed by HPLC-MS, multinuclear NMR, and elemental analysis. A comprehensive Certificate of Analysis with complete spectral data is provided with every order.`,
    20, 4.9, 27, true),

  mk('Morphine', 'morphine', '57-27-2',
    tiers(440, 580, 1000, 1750),
    `Morphine, formally (5α,6α)-7,8-didehydro-4,5-epoxy-17-methylmorphinan-3,6-diol, is the prototypical opiate alkaloid and the single most important compound in the history of opioid pharmacology. First isolated from opium in 1804 by Friedrich Sertürner, morphine established the structural and pharmacological foundation upon which the entire field of opioid research is built.\n\nMorphine acts as a potent agonist at mu, kappa, and delta opioid receptors, with its analgesic activity mediated primarily through the mu subtype. Its morphinan scaffold — featuring the characteristic 4,5-epoxy bridge, phenolic hydroxyl at C3, and tertiary amine — defines the essential pharmacophore recognised across all opioid receptor subtypes. Virtually every semi-synthetic and synthetic opioid has been designed, evaluated, and classified in relation to morphine's binding affinity and functional activity.\n\nThe compound's metabolic profile is among the most extensively documented in pharmacology. Glucuronidation at the 3- and 6-positions produces morphine-3-glucuronide and the pharmacologically active morphine-6-glucuronide, pathways that have been central to understanding opioid metabolite activity, renal clearance, and clinical pharmacokinetics.\n\nMorphine is the universal reference standard in opioid analysis — the benchmark against which all other compounds are quantified, calibrated, and pharmacologically compared. Every opioid potency ratio, receptor selectivity index, and forensic threshold is defined relative to morphine.\n\nOur morphine is produced to 99%+ purity, confirmed by HPLC-MS, ¹H and ¹³C NMR, and elemental analysis. A full Certificate of Analysis with complete spectral data is provided with every order.`,
    35, 4.8, 19, true),

  mk('Codeine', 'codeine', '76-57-3',
    tiers(420, 560, 960, 1650),
    `Codeine, formally (5α,6α)-7,8-didehydro-4,5-epoxy-3-methoxy-17-methylmorphinan-6-ol, is a naturally occurring opiate alkaloid found in opium poppy latex and one of the oldest medicinal compounds still in widespread use. It is the 3-methyl ether of morphine and serves as the structural link between the natural opiates and the semi-synthetic opioid class.\n\nCodeine is pharmacologically distinctive as a prodrug — its analgesic activity is almost entirely dependent on hepatic O-demethylation by CYP2D6 to produce morphine. This metabolic activation pathway has made codeine the most studied compound in pharmacogenetics, as CYP2D6 polymorphisms produce clinically dramatic variation in analgesic response, from therapeutic failure in poor metabolisers to life-threatening toxicity in ultra-rapid metabolisers.\n\nBeyond its prodrug relationship to morphine, codeine is a valuable compound in receptor pharmacology research, serving as a low-affinity mu-opioid agonist comparator and a reference standard in studies of opioid metabolism, drug-drug interactions, and pharmacokinetic modelling. Its 3-methoxy group reduces receptor affinity by approximately 200-fold compared to morphine, illustrating the critical contribution of the free phenolic hydroxyl to opioid binding.\n\nThe compound's analytical profile — including its characteristic EI-MS fragmentation at m/z 299, its LC retention behaviour, and its distinguishing spectral features — is comprehensively documented in forensic and pharmaceutical reference databases.\n\nOur codeine is produced to 99%+ purity, verified by HPLC-MS and NMR spectroscopy. A full Certificate of Analysis accompanies every order.`,
    40, 4.7, 16, false),

  mk('Methadone', 'methadone', '76-99-3',
    tiers(430, 570, 980, 1700),
    `Methadone, formally 6-(dimethylamino)-4,4-diphenylheptan-3-one, is a fully synthetic opioid of the diphenylpropylamine class. Developed in Germany in the late 1930s, it represents a fundamentally different structural approach to opioid receptor engagement compared to the morphinan scaffold — its linear, flexible structure achieves high receptor affinity through conformational adaptation rather than rigid ring geometry.\n\nMethadone is a potent mu-opioid receptor agonist distinguished by its exceptionally long and variable half-life, a property that underpins both its clinical utility in opioid maintenance therapy and its significant overdose risk. The compound also exhibits NMDA receptor antagonist activity — a pharmacological property not shared by morphinan opioids — making it valuable in research examining the interplay between opioid receptor signalling and glutamatergic neurotransmission.\n\nThe compound exists as a racemic mixture of R- and S-enantiomers, with the R-enantiomer (levomethadone) carrying essentially all opioid activity. This stereochemical distinction has made methadone an important compound in chiral separation research, stereoselective pharmacology, and studies of enantiomer-specific metabolism. Its primary metabolite, EDDP (2-ethylidene-1,5-dimethyl-3,3-diphenylpyrrolidine), is widely used as a urinary biomarker for methadone compliance monitoring.\n\nMethadone is among the most frequently quantified opioids in forensic toxicology, clinical drug monitoring, and workplace drug testing. Validated LC-MS/MS methods for methadone and EDDP are standard in accredited laboratories worldwide.\n\nOur methadone is produced to 99%+ purity, confirmed by HPLC-MS and NMR spectroscopy. A complete Certificate of Analysis is supplied with every order.`,
    32, 4.6, 12, false),

  mk('Tramadol', 'tramadol', '27203-92-5',
    tiers(400, 540, 930, 1600),
    `Tramadol, formally (1RS,2RS)-2-[(dimethylamino)methyl]-1-(3-methoxyphenyl)cyclohexanol, is a fully synthetic opioid of the cyclohexanol class that occupies a unique position in opioid pharmacology. Unlike all other clinically used opioids, tramadol's analgesic activity derives from a dual mechanism — weak mu-opioid receptor agonism combined with inhibition of serotonin and norepinephrine reuptake — making it a structurally and pharmacologically distinct compound.\n\nTramadol is a racemic mixture in which the (+)-enantiomer exhibits the stronger mu-opioid binding affinity and serotonin reuptake inhibition, while the (−)-enantiomer primarily inhibits noradrenaline reuptake. Both enantiomers contribute to analgesic activity through complementary monoaminergic and opioid pathways, a synergy that has been extensively studied in pain pharmacology and combination drug research.\n\nThe compound's metabolism via CYP2D6 O-demethylation produces O-desmethyltramadol (M1), a metabolite with approximately 200 times the mu-opioid receptor affinity of the parent compound. This profound metabolite activation makes tramadol, alongside codeine, a cornerstone compound in pharmacogenetic research — CYP2D6 polymorphisms produce some of the most clinically significant genotype-dependent drug response variations known in pharmacology.\n\nTramadol's analytical characterisation is well established, with documented LC-MS/MS transition ions, chiral separation methods for enantiomer quantification, and forensic screening protocols covering both parent drug and its principal metabolites.\n\nOur tramadol is produced to 99%+ purity, verified by HPLC-MS and NMR spectroscopy. A full Certificate of Analysis is included with every order.`,
    45, 4.5, 23, false),

  mk('Buprenorphine', 'buprenorphine', '52485-79-7',
    tiers(480, 640, 1100, 1900),
    `Buprenorphine, formally (2S)-2-[17-cyclopropylmethyl-4,5α-epoxy-3-hydroxy-6-methoxy-6α,14-ethanomorphinan-7α-yl]-3,3-dimethylbutan-2-ol, is a semi-synthetic opioid derived from thebaine and one of the most pharmacologically sophisticated opioids in clinical and research use. Its complex, multi-ring structure — incorporating a cyclopropylmethyl group, a tert-butyl carbinol, and a bridging ethano linkage — produces a receptor binding and activation profile that is genuinely unique among opioid ligands.\n\nBuprenorphine acts as a partial agonist at the mu-opioid receptor with exceptionally high binding affinity — approximately 50 times that of morphine — but with a ceiling effect on respiratory depression that distinguishes it from full agonists. It is simultaneously an antagonist at the kappa-opioid receptor and an agonist at the opioid receptor-like 1 (ORL1/NOP) receptor, a multi-target profile unmatched by any other clinically available opioid and a subject of intense research interest in receptor selectivity studies.\n\nThe compound's exceptionally tight and slow receptor dissociation kinetics — with a dissociation half-life far exceeding that of conventional opioids — produce prolonged receptor occupancy and have made buprenorphine essential in studies of binding kinetics, receptor reserve, and functional selectivity. Its lipophilicity enables transdermal and sublingual administration, expanding its research applications.\n\nBuprenorphine is extensively studied in opioid maintenance research, overdose rescue pharmacology, and pain management studies. Its primary metabolite, norbuprenorphine, is itself pharmacologically active and is included in forensic quantification panels.\n\nOur buprenorphine is produced to 99%+ purity, confirmed by HPLC-MS and multinuclear NMR spectroscopy. A comprehensive Certificate of Analysis with spectral documentation is provided with every order.`,
    25, 4.8, 15, true),
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

  console.log(`\nDone — ${products.length} opioid products upserted.`);
  await mongoose.disconnect();
  process.exit(0);
}

run().catch(e => { console.error(e); process.exit(1); });
