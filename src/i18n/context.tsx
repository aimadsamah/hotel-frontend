'use client';
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { fr } from './fr';
import { ar } from './ar';

export type Locale = 'fr' | 'ar';
export type Translations = typeof fr;

const translations: Record<Locale, Translations> = { fr, ar };

interface I18nContextType {
  locale: Locale;
  t: Translations;
  setLocale: (locale: Locale) => void;
  isRTL: boolean;
}

const I18nContext = createContext<I18nContextType>({
  locale: 'fr',
  t: fr,
  setLocale: () => {},
  isRTL: false,
});

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('fr');

  useEffect(() => {
    const saved = localStorage.getItem('lumiere_locale') as Locale | null;
    if (saved && (saved === 'fr' || saved === 'ar')) {
      setLocaleState(saved);
    }
  }, []);

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem('lumiere_locale', newLocale);
    document.documentElement.lang = newLocale;
    document.documentElement.dir = newLocale === 'ar' ? 'rtl' : 'ltr';
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = locale === 'ar' ? 'rtl' : 'ltr';
  }, [locale]);

  const isRTL = locale === 'ar';

  return (
    <I18nContext.Provider value={{ locale, t: translations[locale], setLocale, isRTL }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  return useContext(I18nContext);
}
