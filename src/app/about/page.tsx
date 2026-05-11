'use client';
import Image from 'next/image';
import { PageHero, SectionHeader, GoldDivider } from '@/components/ui';
import { useI18n } from '@/i18n/context';

export default function AboutPage() {
  const { t, isRTL } = useI18n();
  const teamImages = [
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
    'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&q=80',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80',
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80',
  ];

  return (
    <>
      <PageHero title={t.about.pageTitle} subtitle={t.about.pageSub} imageUrl="https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=1920&q=85" />

      {/* Origin Story */}
      <section className="py-24 bg-obsidian-950">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-12">
          <div className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-center ${isRTL ? 'lg:grid-flow-dense' : ''}`} dir={isRTL ? 'rtl' : 'ltr'}>
            <div className={isRTL ? 'lg:col-start-2' : ''}>
              <SectionHeader label={t.about.originLabel} title={t.about.originTitle} />
              <div className="space-y-5 mt-8 font-sans text-obsidian-300 text-sm leading-relaxed">
                <p>{t.about.originP1}</p>
                <p>{t.about.originP2}</p>
                <p>{t.about.originP3}</p>
              </div>
            </div>
            <div className={`relative ${isRTL ? 'lg:col-start-1 lg:row-start-1' : ''}`}>
              <div className="relative h-[500px] overflow-hidden">
                <Image src="https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800&q=85" alt="Hotel Lumière history" fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
              </div>
              <div className={`absolute -bottom-4 ${isRTL ? '-right-4' : '-left-4'} bg-obsidian-900 border border-obsidian-700 p-6`}>
                <p className="font-display text-5xl font-light text-gold-400">100</p>
                <p className="font-mono text-[10px] tracking-widest text-obsidian-400 uppercase">{t.about.yearsLabel}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <GoldDivider className="max-w-screen-xl mx-auto px-6 lg:px-12" />

      {/* Values */}
      <section className="py-24 bg-obsidian-950">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <SectionHeader label={t.about.valuesLabel} title={t.about.valuesTitle} centered subtitle={t.about.valuesSub} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8" dir={isRTL ? 'rtl' : 'ltr'}>
            {t.about.values.map((value, i) => (
              <div key={value.title} className="text-center p-8 border border-obsidian-800 hover:border-gold-500/30 transition-colors duration-500">
                <div className="font-mono text-gold-500 text-4xl font-light mb-4">{String(i + 1).padStart(2, '0')}</div>
                <h3 className="font-display text-2xl font-light text-cream-50 mb-3">{value.title}</h3>
                <div className="w-8 h-px bg-gold-500 mx-auto mb-4" />
                <p className="font-sans text-sm text-obsidian-400 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24 bg-obsidian-900">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <SectionHeader label={t.about.teamLabel} title={t.about.teamTitle} centered />
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6" dir={isRTL ? 'rtl' : 'ltr'}>
            {t.about.team.map((member, i) => (
              <div key={member.name} className="group text-center">
                <div className="relative h-64 overflow-hidden mb-4">
                  <Image src={teamImages[i]} alt={member.name} fill className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700" sizes="(max-width: 768px) 50vw, 25vw" />
                </div>
                <h4 className="font-display text-xl font-light text-cream-50">{member.name}</h4>
                <p className="font-mono text-[10px] text-gold-500 tracking-widest uppercase mt-1">{member.title}</p>
                <p className="font-mono text-[10px] text-obsidian-500 tracking-wider mt-0.5">{member.tenure} {t.about.tenureAt}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
