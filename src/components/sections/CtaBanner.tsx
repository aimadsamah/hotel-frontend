'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useI18n } from '@/i18n/context';

export function CtaBanner() {
  const { t, isRTL } = useI18n();
  return (
    <section className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=1920&q=85')` }} />
      <div className="absolute inset-0 bg-obsidian-950/75" />
      <div className="relative z-10 max-w-screen-xl mx-auto px-6 lg:px-12 text-center" dir={isRTL ? 'rtl' : 'ltr'}>
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
          <p className="section-label mb-6">{t.home.ctaLabel}</p>
          <h2 className="font-display text-5xl md:text-6xl lg:text-7xl font-light text-cream-50 mb-6 leading-tight">
            {t.home.ctaTitle1}<br /><span className="italic text-gold-300">{t.home.ctaTitle2}</span>
          </h2>
          <div className="w-16 h-px bg-gold-500 mx-auto mb-8" />
          <p className="font-sans text-obsidian-300 text-sm max-w-md mx-auto mb-12">{t.home.ctaSub}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/booking" className="btn-primary">{t.home.ctaReserve} <ArrowRight className="w-4 h-4" /></Link>
            <Link href="/contact" className="btn-outline">{t.home.ctaContact}</Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
