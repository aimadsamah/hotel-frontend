'use client';
import { useEffect } from 'react';
import Link from 'next/link';
import { RefreshCw, ArrowRight } from 'lucide-react';
import { useI18n } from '@/i18n/context';

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  const { t, isRTL } = useI18n();
  useEffect(() => { console.error('Global error:', error); }, [error]);

  return (
    <html lang="fr">
      <body className="bg-obsidian-950 text-cream-50">
        <div className="min-h-screen flex items-center justify-center px-6" dir={isRTL ? 'rtl' : 'ltr'}>
          <div className="text-center max-w-lg">
            <p className="font-mono text-[10px] text-gold-500 tracking-ultra uppercase mb-6">{t.error.label}</p>
            <h1 className="font-display text-5xl font-light text-cream-50 mb-4">{t.error.title}</h1>
            <div className="w-12 h-px bg-gold-500 mx-auto my-6" />
            <p className="font-sans text-sm text-obsidian-400 mb-10 leading-relaxed">{t.error.desc}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button onClick={reset} className="btn-primary"><RefreshCw className="w-4 h-4" /> {t.error.retry}</button>
              <Link href="/" className="btn-outline">{t.error.home} <ArrowRight className="w-4 h-4" /></Link>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
