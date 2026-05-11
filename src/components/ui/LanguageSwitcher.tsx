'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe } from 'lucide-react';
import { useI18n, type Locale } from '@/i18n/context';
import { useState } from 'react';

export function LanguageSwitcher() {
  const { locale, setLocale, t } = useI18n();
  const [open, setOpen] = useState(false);

  const languages: { code: Locale; label: string; flag: string }[] = [
    { code: 'fr', label: 'Français', flag: '🇫🇷' },
    { code: 'ar', label: 'العربية', flag: '🇩🇿' },
  ];

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 text-obsidian-400 hover:text-gold-400 transition-colors duration-300 px-2 py-1"
        aria-label={t.lang.switchTo}
      >
        <Globe className="w-3.5 h-3.5" />
        <span className="font-mono text-[10px] tracking-wider uppercase">
          {locale === 'fr' ? 'FR' : 'AR'}
        </span>
      </button>

      <AnimatePresence>
        {open && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full mt-2 right-0 bg-obsidian-900 border border-obsidian-700 z-50 min-w-[140px]"
            >
              {languages.map(({ code, label, flag }) => (
                <button
                  key={code}
                  onClick={() => { setLocale(code); setOpen(false); }}
                  className={`flex items-center gap-3 w-full px-4 py-3 font-sans text-sm text-left transition-colors duration-200 ${
                    locale === code
                      ? 'text-gold-400 bg-gold-500/10'
                      : 'text-obsidian-300 hover:text-cream-100 hover:bg-obsidian-800'
                  }`}
                  dir={code === 'ar' ? 'rtl' : 'ltr'}
                >
                  <span>{flag}</span>
                  <span className={code === 'ar' ? 'font-arabic' : ''}>{label}</span>
                  {locale === code && (
                    <span className="ms-auto w-1.5 h-1.5 bg-gold-500 rounded-full" />
                  )}
                </button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
