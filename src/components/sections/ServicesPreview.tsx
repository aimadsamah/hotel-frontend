'use client';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Utensils, Waves, Star, Car } from 'lucide-react';
import { SectionHeader } from '@/components/ui';
import { useI18n } from '@/i18n/context';

export function ServicesPreview() {
  const { t, isRTL } = useI18n();

  const services = [
    { icon: Utensils, title: t.services.s1title, description: t.services.s1desc.slice(0,120)+'...', image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80', href: '/services#dining' },
    { icon: Waves, title: t.services.s2title, description: t.services.s2desc.slice(0,120)+'...', image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&q=80', href: '/services#spa' },
    { icon: Star, title: t.services.s3title, description: t.services.s3desc.slice(0,120)+'...', image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&q=80', href: '/services#events' },
    { icon: Car, title: t.services.s4title, description: t.services.s4desc.slice(0,120)+'...', image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80', href: '/services#concierge' },
  ];

  return (
    <section className="py-24 lg:py-32 bg-obsidian-900">
      <div className="max-w-screen-xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-16">
          <SectionHeader label={t.home.servicesLabel} title={t.home.servicesTitle} subtitle={t.home.servicesSub} centered />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <motion.div key={service.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.1 }}>
                <Link href={service.href} className="group relative h-64 flex items-end overflow-hidden block">
                  <Image src={service.image} alt={service.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="(max-width: 768px) 100vw, 50vw"/>
                  <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950 via-obsidian-950/50 to-transparent"/>
                  <div className="relative z-10 p-7 w-full" dir={isRTL?'rtl':'ltr'}>
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="w-8 h-8 border border-gold-500/40 flex items-center justify-center mb-3"><Icon className="w-3.5 h-3.5 text-gold-400"/></div>
                        <h3 className="font-display text-2xl font-light text-cream-50 mb-1">{service.title}</h3>
                      </div>
                      <ArrowRight className={`w-4 h-4 text-gold-400 opacity-0 group-hover:opacity-100 transition-all duration-300 ${isRTL?'rotate-180':''} -translate-x-2 group-hover:translate-x-0 shrink-0 mt-1`}/>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
