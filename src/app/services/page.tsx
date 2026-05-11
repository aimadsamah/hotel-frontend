'use client';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Clock, Phone } from 'lucide-react';
import { PageHero, SectionHeader, GoldDivider } from '@/components/ui';
import { useI18n } from '@/i18n/context';

export default function ServicesPage() {
  const { t, isRTL } = useI18n();

  const services = [
    { id: 'dining', label: t.services.s1label, title: t.services.s1title, description: t.services.s1desc, highlights: t.services.s1h, hours: t.services.s1hours, image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=85' },
    { id: 'spa', label: t.services.s2label, title: t.services.s2title, description: t.services.s2desc, highlights: t.services.s2h, hours: t.services.s2hours, image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1200&q=85' },
    { id: 'events', label: t.services.s3label, title: t.services.s3title, description: t.services.s3desc, highlights: t.services.s3h, hours: t.services.s3hours, image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=1200&q=85' },
    { id: 'concierge', label: t.services.s4label, title: t.services.s4title, description: t.services.s4desc, highlights: t.services.s4h, hours: t.services.s4hours, image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&q=85' },
  ];

  return (
    <>
      <PageHero title={t.services.pageTitle} subtitle={t.services.pageSub} imageUrl="https://images.unsplash.com/photo-1540518614846-7eded433c457?w=1920&q=85" />

      <section className="bg-obsidian-950">
        {services.map((service, i) => (
          <div key={service.id} id={service.id}>
            <div className={`max-w-screen-xl mx-auto px-6 lg:px-12 py-24 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center ${i % 2 === 1 ? 'lg:grid-flow-dense' : ''}`} dir={isRTL ? 'rtl' : 'ltr'}>
              {/* Text */}
              <div className={i % 2 === 1 ? 'lg:col-start-2' : ''}>
                <p className="section-label mb-3">{service.label}</p>
                <h2 className="font-display text-4xl md:text-5xl font-light text-cream-50 mb-2">{service.title}</h2>
                <div className="gold-divider" />
                <p className="font-sans text-obsidian-300 text-sm leading-relaxed mb-8">{service.description}</p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-8">
                  {service.highlights.map((h) => (
                    <li key={h} className="flex items-center gap-2 font-sans text-sm text-obsidian-400">
                      <span className="w-1 h-1 bg-gold-500 rounded-full shrink-0" />{h}
                    </li>
                  ))}
                </ul>
                <div className="flex items-center gap-2 text-obsidian-500 font-mono text-xs mb-8">
                  <Clock className="w-3.5 h-3.5" /><span>{service.hours}</span>
                </div>
                <Link href="/contact" className="btn-outline">{t.services.enquireNow} <ArrowRight className="w-3.5 h-3.5" /></Link>
              </div>

              {/* Image */}
              <div className={`relative h-[500px] overflow-hidden ${i % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}`}>
                <Image src={service.image} alt={service.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
              </div>
            </div>
            {i < services.length - 1 && <GoldDivider className="max-w-screen-xl mx-auto px-6 lg:px-12" />}
          </div>
        ))}
      </section>

      {/* Contact strip */}
      <div className="bg-obsidian-900 border-t border-obsidian-800 py-12">
        <div className={`max-w-screen-xl mx-auto px-6 lg:px-12 flex flex-col md:flex-row items-center justify-between gap-6 ${isRTL ? 'md:flex-row-reverse' : ''}`} dir={isRTL ? 'rtl' : 'ltr'}>
          <div>
            <p className="font-display text-2xl font-light text-cream-50">{t.services.bespokeTitle}</p>
            <p className="font-sans text-sm text-obsidian-400 mt-1">{t.services.bespokeDesc}</p>
          </div>
          <div className="flex items-center gap-3">
            <Phone className="w-4 h-4 text-gold-500" />
            <span className="font-mono text-sm text-cream-100 tracking-wider">{t.nav.phone}</span>
          </div>
        </div>
      </div>
    </>
  );
}
