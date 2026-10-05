'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FaArrowRight, FaFlask, FaCertificate, FaTruck, FaGlobeAmericas } from 'react-icons/fa';

const FALLBACK_ROWS = [
  { name: '5CL-ADBA', category: 'cannabinoids', purity: '99.8%', price: 120 },
  { name: 'ADB-BUTINACA', category: 'cannabinoids', purity: '99.6%', price: 110 },
  { name: 'Isotonitazene', category: 'nitazenes', purity: '99.9%', price: 180 },
  { name: 'Metonitazene', category: 'nitazenes', purity: '99.7%', price: 175 },
  { name: 'Protonitazene', category: 'nitazenes', purity: '99.5%', price: 170 },
  { name: 'Morphine Sulfate', category: 'opioids', purity: '99.8%', price: 160 },
  { name: 'Oxycodone HCl', category: 'opioids', purity: '99.6%', price: 155 },
  { name: 'JWH-018', category: 'cannabinoids', purity: '99.4%', price: 95 },
  { name: '5F-ADB', category: 'cannabinoids', purity: '99.6%', price: 105 },
  { name: 'MDMB-4en-PINACA', category: 'cannabinoids', purity: '99.7%', price: 115 },
];

function getPrice(p) {
  if (p.priceVariants?.length) return p.priceVariants.reduce((m, v) => (v.price < m ? v.price : m), p.priceVariants[0].price);
  if (p.price && p.price > 0) return p.price;
  return 0;
}

const container = { hidden: {}, show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } } };
const item = { hidden: { opacity: 0, y: 28 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } } };

export default function HeroSplit({ products = [] }) {
  const rows = products.length
    ? products.map(p => ({ name: p.name, slug: p.slug, category: p.category, purity: p.purity || '99%+', price: getPrice(p), inStock: p.countInStock > 0 }))
    : FALLBACK_ROWS.map(r => ({ ...r, inStock: true }));

  const looped = [...rows, ...rows];

  return (
    <section className="relative bg-[#12081f] text-white overflow-hidden lg:min-h-[62vh] flex items-stretch">
      {/* Background grid + glow */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.06]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,.6) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.6) 1px,transparent 1px)', backgroundSize: '72px 72px' }} />
      <div className="absolute -top-40 -left-40 w-[560px] h-[560px] rounded-full bg-violet-700/30 blur-[160px] pointer-events-none" />
      <div className="absolute -bottom-40 right-1/4 w-[520px] h-[520px] rounded-full bg-fuchsia-700/25 blur-[160px] pointer-events-none" />

      <div className="relative z-10 w-full grid lg:grid-cols-[1.25fr_1fr] pt-14 lg:pt-12">
        {/* ============ LEFT — STACKED HEADLINE ============ */}
        <motion.div variants={container} initial="hidden" animate="show" className="flex flex-col justify-between px-6 sm:px-10 lg:px-14 py-10 lg:py-12 border-b lg:border-b-0 lg:border-r border-white/[0.06]">
          <div>
            <motion.div variants={item} className="flex items-center gap-3 mb-8">
              <span className="font-mono text-[11px] tracking-[0.3em] uppercase text-fuchsia-300/80">Est. Supplier</span>
              <span className="h-px flex-1 max-w-[120px] bg-gradient-to-r from-fuchsia-500/60 to-transparent" />
              <span className="font-mono text-[11px] tracking-[0.3em] uppercase text-white/30">Lot 2026-A</span>
            </motion.div>

            <h1 className="font-display font-extrabold leading-[0.88] tracking-[-0.04em]">
              <motion.span variants={item} className="block text-[clamp(2.5rem,6vw,5.5rem)] text-white">Research</motion.span>
              <motion.span variants={item} className="block text-[clamp(2.5rem,6vw,5.5rem)] text-transparent bg-clip-text bg-gradient-to-r from-violet-300 via-fuchsia-300 to-violet-200">Compounds,</motion.span>
              <motion.span variants={item} className="block text-[clamp(2.5rem,6vw,5.5rem)] text-white/90 italic font-medium">verified.</motion.span>
            </h1>

            <motion.p variants={item} className="mt-6 max-w-md text-white/55 text-sm sm:text-base leading-relaxed">
              Cannabinoids, nitazenes, opioids and novel research chemicals — every batch independently tested, every order shipped with its Certificate of Analysis.
            </motion.p>

            <motion.div variants={item} className="mt-6 flex flex-wrap items-center gap-4">
              <Link href="/products" className="group inline-flex items-center gap-3 bg-white text-[#12081f] font-display font-bold text-sm px-6 py-3.5 rounded-full hover:bg-fuchsia-100 transition-colors">
                Open the catalog
                <span className="w-7 h-7 rounded-full bg-[#12081f] text-white flex items-center justify-center transition-transform group-hover:translate-x-1 group-hover:rotate-[-45deg]">
                  <FaArrowRight size={11} />
                </span>
              </Link>
              <Link href="/about" className="text-sm font-semibold text-white/60 hover:text-white underline underline-offset-[6px] decoration-fuchsia-500/60 transition-colors">
                How we verify purity
              </Link>
            </motion.div>
          </div>

          {/* Bottom proof row — pill chips */}
          <motion.div variants={item} className="mt-8 flex flex-wrap gap-3">
            {[
              { Icon: FaCertificate, v: '99.9%', l: 'Avg. purity' },
              { Icon: FaTruck, v: '48h', l: 'Dispatch' },
              { Icon: FaGlobeAmericas, v: '50+', l: 'Countries' },
            ].map(({ Icon, v, l }) => (
              <div key={l} className="flex items-center gap-3 pl-2 pr-5 py-2 rounded-full border border-white/10 bg-white/[0.04] backdrop-blur-sm">
                <span className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500/30 to-fuchsia-500/30 border border-fuchsia-400/30 flex items-center justify-center shrink-0">
                  <Icon className="text-fuchsia-300 text-[10px]" />
                </span>
                <span>
                  <span className="block font-display font-bold text-lg leading-none">{v}</span>
                  <span className="block text-[10px] uppercase tracking-[0.18em] text-white/40 mt-1">{l}</span>
                </span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* ============ RIGHT — LIVE CATALOG BOARD ============ */}
        <motion.div
          initial={{ opacity: 0, x: 32 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="relative flex flex-col min-h-[340px] lg:min-h-0"
        >
          {/* Faint image behind */}
          <div className="absolute inset-0 opacity-20">
            <Image src="/images/Laboratory-Science.jpg" alt="" fill sizes="50vw" className="object-cover" priority />
            <div className="absolute inset-0 bg-gradient-to-b from-[#12081f] via-[#12081f]/40 to-[#12081f]" />
          </div>

          {/* Board header */}
          <div className="relative z-10 flex items-center justify-between px-6 sm:px-8 pt-6 pb-4">
            <div className="flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.9)] animate-pulse" />
              <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-white/60">Live inventory</span>
            </div>
            <span className="font-mono text-[11px] text-white/30">{rows.length} listed</span>
          </div>

          {/* Column labels */}
          <div className="relative z-10 grid grid-cols-[1fr_auto_auto] gap-4 px-6 sm:px-8 pb-2 font-mono text-[10px] uppercase tracking-[0.25em] text-white/30">
            <span>Compound</span>
            <span className="w-16 text-right">Purity</span>
            <span className="w-20 text-right">From</span>
          </div>

          {/* Scrolling rows */}
          <div className="relative z-10 flex-1 overflow-hidden border-y border-white/[0.06]" style={{ maskImage: 'linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)' }}>
            <div className="animate-ticker-vertical" style={{ animationDuration: `${Math.max(rows.length * 3.2, 18)}s` }}>
              {looped.map((r, i) => (
                <Link
                  key={`${r.name}-${i}`}
                  href={r.slug ? `/products/${r.slug}` : '/products'}
                  className="group grid grid-cols-[1fr_auto_auto] gap-4 items-center px-6 sm:px-8 h-[60px] border-b border-white/[0.05] hover:bg-fuchsia-500/[0.07] transition-colors"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="w-7 h-7 shrink-0 flex items-center justify-center bg-violet-500/15 border border-violet-400/20 group-hover:bg-fuchsia-500/20 transition-colors" style={{ borderRadius: '62% 38% 55% 45% / 48% 62% 38% 52%' }}>
                      <FaFlask className="text-fuchsia-300 text-[10px]" />
                    </span>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-white/90 truncate group-hover:text-fuchsia-200 transition-colors">{r.name}</p>
                      <p className="text-[10px] uppercase tracking-[0.18em] text-white/30 truncate">{r.category}</p>
                    </div>
                  </div>
                  <span className="w-16 text-right font-mono text-xs text-emerald-300/90">{r.purity}</span>
                  <span className="w-20 text-right font-mono text-sm text-white/80">{r.price > 0 ? `€${r.price.toFixed(0)}` : '—'}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Board footer */}
          <div className="relative z-10 px-6 sm:px-8 py-4 flex items-center justify-between">
            <p className="text-[11px] text-white/35">Prices shown are starting prices per listing.</p>
            <Link href="/products" className="text-xs font-bold text-fuchsia-300 hover:text-white transition-colors inline-flex items-center gap-1.5">
              All compounds <FaArrowRight size={9} />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
