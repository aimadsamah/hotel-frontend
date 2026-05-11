'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { SectionHeader } from '@/components/ui';
import { useI18n } from '@/i18n/context';

export function TestimonialsSection() {
  const { t, isRTL } = useI18n();
  const testimonials = t.testimonials;
  const [current, setCurrent] = useState(0);
  const prev = () => setCurrent((c) => (c === 0 ? testimonials.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === testimonials.length - 1 ? 0 : c + 1));
  const item = testimonials[current];

  return (
    <section className="py-24 lg:py-32 bg-obsidian-950 overflow-hidden" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="max-w-screen-xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-16">
          <SectionHeader label={t.home.testimonialsLabel} title={t.home.testimonialsTitle} centered />
        </div>
        <div className="relative max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div key={current} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.5 }} className="text-center px-4 lg:px-12">
              <Quote className="w-10 h-10 text-gold-500/30 mx-auto mb-8" />
              <blockquote className="font-display text-xl md:text-2xl lg:text-3xl font-light text-cream-100 leading-relaxed mb-10 italic">&ldquo;{item.quote}&rdquo;</blockquote>
              <div className="w-12 h-px bg-gold-500 mx-auto mb-6" />
              <p className="font-sans text-cream-50 font-medium text-sm tracking-wider">{item.author}</p>
              <p className="font-mono text-[10px] text-gold-500 tracking-widest uppercase mt-1">{item.title}</p>
              <p className="font-mono text-[10px] text-obsidian-500 tracking-wider mt-0.5">{item.location} · {item.room}</p>
            </motion.div>
          </AnimatePresence>
          <div className="flex items-center justify-center gap-8 mt-12">
            <button onClick={isRTL ? next : prev} className="w-10 h-10 border border-obsidian-700 flex items-center justify-center text-obsidian-400 hover:border-gold-500 hover:text-gold-400 transition-all duration-300"><ChevronLeft className="w-4 h-4" /></button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button key={i} onClick={() => setCurrent(i)} className={`transition-all duration-300 ${i === current ? 'w-8 h-0.5 bg-gold-500' : 'w-2 h-0.5 bg-obsidian-600 hover:bg-obsidian-400'}`} />
              ))}
            </div>
            <button onClick={isRTL ? prev : next} className="w-10 h-10 border border-obsidian-700 flex items-center justify-center text-obsidian-400 hover:border-gold-500 hover:text-gold-400 transition-all duration-300"><ChevronRight className="w-4 h-4" /></button>
          </div>
        </div>
      </div>
    </section>
  );
}
