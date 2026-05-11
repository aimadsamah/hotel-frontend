'use client';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useI18n } from '@/i18n/context';

export default function NotFound() {
  const { t, isRTL } = useI18n();
  return (
    <div className="min-h-screen bg-obsidian-950 flex items-center justify-center px-6" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="text-center max-w-lg">
        <p className="section-label mb-6">{t.notFound.label}</p>
        <h1 className="font-display text-8xl md:text-9xl font-light text-obsidian-800 mb-4 leading-none">404</h1>
        <h2 className="font-display text-3xl font-light text-cream-50 mb-4">{t.notFound.title}</h2>
        <div className="gold-divider mx-auto" />
        <p className="font-sans text-sm text-obsidian-400 mt-6 mb-10 leading-relaxed">{t.notFound.desc}</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/" className="btn-primary">{t.notFound.home} <ArrowRight className="w-4 h-4" /></Link>
          <Link href="/rooms" className="btn-outline">{t.notFound.explore}</Link>
        </div>
      </div>
    </div>
  );
}
