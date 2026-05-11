'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { setMobileMenuOpen } from '@/features/ui/uiSlice';
import { useI18n } from '@/i18n/context';
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const dispatch = useAppDispatch();
  const { mobileMenuOpen } = useAppSelector((s) => s.ui);
  const pathname = usePathname();
  const { t, isRTL } = useI18n();

  const navLinks = [
    { href: '/', label: t.nav.home },
    { href: '/rooms', label: t.nav.rooms },
    { href: '/services', label: t.nav.services },
    { href: '/gallery', label: t.nav.gallery },
    { href: '/about', label: t.nav.about },
    { href: '/contact', label: t.nav.contact },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => { dispatch(setMobileMenuOpen(false)); }, [pathname, dispatch]);

  const isHomePage = pathname === '/';

  return (
    <>
      <motion.header
        initial={{ y: -100 }} animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled || !isHomePage ? 'bg-obsidian-950/95 backdrop-blur-md border-b border-obsidian-800' : 'bg-transparent'
        }`}
      >
        <div className="max-w-screen-xl mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between h-20 lg:h-24">
            <Link href="/" className="flex flex-col items-start group">
              <span className="font-mono text-gold-500 text-[9px] tracking-ultra uppercase mb-0.5">{t.nav.estab}</span>
              <span className="font-display text-2xl lg:text-3xl font-light text-cream-50 tracking-wider group-hover:text-gold-400 transition-colors duration-300">Lumière</span>
            </Link>

            <nav className={`hidden lg:flex items-center gap-8 ${isRTL ? 'flex-row-reverse' : ''}`}>
              {navLinks.map(({ href, label }) => (
                <Link key={href} href={href}
                  className={`relative font-sans text-[11px] ${isRTL ? 'tracking-normal' : 'tracking-widest'} uppercase transition-colors duration-300 gold-line-in pb-1 ${pathname === href ? 'text-gold-400' : 'text-obsidian-300 hover:text-cream-50'}`}>
                  {label}
                  {pathname === href && <motion.span layoutId="nav-active" className="absolute -bottom-0.5 left-0 right-0 h-px bg-gold-500" />}
                </Link>
              ))}
            </nav>

            <div className={`hidden lg:flex items-center gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <LanguageSwitcher />
              <a href={`tel:${t.nav.phone.replace(/\s/g,'')}`} className="flex items-center gap-2 text-obsidian-400 hover:text-gold-400 transition-colors duration-300">
                <Phone className="w-3.5 h-3.5" />
                <span className="font-mono text-xs tracking-wider">{t.nav.phone}</span>
              </a>
              <Link href="/booking" className="btn-primary text-[10px] py-3 px-6">{t.nav.reserve}</Link>
            </div>

            <div className="lg:hidden flex items-center gap-3">
              <LanguageSwitcher />
              <button onClick={() => dispatch(setMobileMenuOpen(!mobileMenuOpen))} className="p-2 text-cream-50 hover:text-gold-400 transition-colors" aria-label="Toggle menu">
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: isRTL ? '-100%' : '100%' }} animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: isRTL ? '-100%' : '100%' }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-obsidian-950 lg:hidden flex flex-col pt-24 px-8"
            dir={isRTL ? 'rtl' : 'ltr'}
          >
            <nav className="flex flex-col gap-1">
              {navLinks.map(({ href, label }, i) => (
                <motion.div key={href} initial={{ opacity: 0, x: isRTL ? -20 : 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 * i }}>
                  <Link href={href} className={`block font-display text-4xl font-light py-3 border-b border-obsidian-800 transition-colors ${isRTL ? 'text-right' : ''} ${pathname === href ? 'text-gold-400' : 'text-cream-200 hover:text-gold-400'}`}>{label}</Link>
                </motion.div>
              ))}
            </nav>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }} className="mt-10">
              <Link href="/booking" className="btn-primary w-full justify-center">{t.nav.reserve}</Link>
            </motion.div>
            <div className={`mt-auto pb-12 text-obsidian-500 font-mono text-xs tracking-wider ${isRTL ? 'text-right' : ''}`}>
              <p>{t.nav.phone}</p>
              <p className="mt-1">{t.footer.emailVal}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
