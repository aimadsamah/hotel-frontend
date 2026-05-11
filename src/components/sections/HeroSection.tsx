'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { useI18n } from '@/i18n/context';

export function HeroSection() {
  const { t, isRTL } = useI18n();
  return (
    <section className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1920&q=90')` }} />
      <div className="absolute inset-0 bg-gradient-to-b from-obsidian-950/50 via-obsidian-950/40 to-obsidian-950" />
      <div className="absolute inset-0 bg-gradient-to-r from-obsidian-950/60 to-transparent" />

      <div className="absolute left-8 top-1/2 -translate-y-1/2 hidden xl:flex flex-col items-center gap-4">
        <div className="w-px h-16 bg-gold-500/40" />
        <span className="writing-vertical font-mono text-[9px] tracking-ultra text-gold-500/60 uppercase">{t.nav.estab}</span>
        <div className="w-px h-16 bg-gold-500/40" />
      </div>

      <div className="relative z-10 text-center max-w-5xl mx-auto px-6" dir={isRTL ? 'rtl' : 'ltr'}>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }} className="section-label mb-8">{t.home.heroLabel}</motion.p>
        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.5 }} className="font-display text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-light text-cream-50 leading-none tracking-tight mb-6">
          {t.home.heroTitle1}<br /><span className="italic text-gold-300">{t.home.heroTitle2}</span>
        </motion.h1>
        <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.8, delay: 1 }} className="w-24 h-px bg-gold-500 mx-auto mb-8" />
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 1.1 }} className="font-sans text-obsidian-300 text-sm md:text-base leading-relaxed max-w-xl mx-auto mb-12">{t.home.heroSub}</motion.p>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 1.3 }} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link href="/booking" className="btn-primary">{t.home.heroReserve} <ArrowRight className="w-4 h-4" /></Link>
          <Link href="/rooms" className="btn-outline">{t.home.heroExplore}</Link>
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }} className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gold-500/60">
        <span className="font-mono text-[9px] tracking-ultra uppercase">{t.home.heroDiscover}</span>
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}>
          <ChevronDown className="w-4 h-4" />
        </motion.div>
      </motion.div>
    </section>
  );
}
