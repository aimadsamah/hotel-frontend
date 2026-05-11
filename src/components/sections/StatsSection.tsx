'use client';
import { motion } from 'framer-motion';
import { useI18n } from '@/i18n/context';

export function StatsSection() {
  const { t } = useI18n();
  const stats = [
    { value: '1924', label: t.home.stats.estab, suffix: '' },
    { value: '98', label: t.home.stats.rooms, suffix: '+' },
    { value: '5', label: t.home.stats.stars, suffix: '★' },
    { value: '24', label: t.home.stats.concierge, suffix: '/7' },
  ];
  return (
    <section className="bg-obsidian-900 border-t border-b border-obsidian-800">
      <div className="max-w-screen-xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-obsidian-800">
          {stats.map((stat, i) => (
            <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.1 }} className="py-10 px-8 text-center">
              <div className="font-display text-4xl lg:text-5xl font-light text-gold-400 mb-2">{stat.value}<span className="text-2xl text-gold-500/60">{stat.suffix}</span></div>
              <div className="font-mono text-[10px] tracking-widest text-obsidian-400 uppercase">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
