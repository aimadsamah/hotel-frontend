'use client';
import Link from 'next/link';
import { Instagram, Twitter, Facebook } from 'lucide-react';
import { useI18n } from '@/i18n/context';

export function Footer() {
  const { t, isRTL } = useI18n();

  const footerLinks = {
    [t.footer.explore]: [
      { href: '/rooms', label: t.nav.rooms },
      { href: '/services', label: t.nav.services },
      { href: '/gallery', label: t.nav.gallery },
      { href: '/about', label: t.footer.ourStory },
    ],
    [t.footer.experience]: [
      { href: '/services#dining', label: t.footer.dining },
      { href: '/services#spa', label: t.footer.spa },
      { href: '/services#events', label: t.footer.events },
      { href: '/services#concierge', label: t.footer.concierge },
    ],
    [t.footer.contact]: [
      { href: '/booking', label: t.footer.makeReservation },
      { href: '/contact', label: t.footer.contactUs },
      { href: '/admin/login', label: t.footer.staffLogin },
    ],
  };

  return (
    <footer className="bg-obsidian-950 border-t border-obsidian-800" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="max-w-screen-xl mx-auto px-6 lg:px-12 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
          <div className="lg:col-span-2">
            <div className="mb-6">
              <span className="font-mono text-gold-500 text-[9px] tracking-ultra uppercase block mb-1">{t.nav.estab}</span>
              <span className="font-display text-4xl font-light text-cream-50 tracking-wider">Lumière</span>
            </div>
            <p className="font-sans text-obsidian-400 text-sm leading-relaxed max-w-xs mb-8">{t.footer.tagline}</p>
            <div className="flex gap-4">
              {[Instagram, Twitter, Facebook].map((Icon, i) => (
                <a key={i} href="#" className="w-9 h-9 border border-obsidian-700 flex items-center justify-center text-obsidian-400 hover:border-gold-500 hover:text-gold-400 transition-all duration-300">
                  <Icon className="w-3.5 h-3.5" />
                </a>
              ))}
            </div>
          </div>

          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <h4 className="font-mono text-gold-500 text-[10px] tracking-widest uppercase mb-6">{section}</h4>
              <ul className="space-y-3">
                {links.map(({ href, label }) => (
                  <li key={href}>
                    <Link href={href} className="font-sans text-sm text-obsidian-400 hover:text-cream-200 transition-colors duration-300">{label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 pt-8 border-t border-obsidian-800 grid grid-cols-1 md:grid-cols-3 gap-6 text-obsidian-500 font-mono text-xs tracking-wider">
          <div><span className="text-gold-600 block mb-1">{t.footer.address}</span>{t.footer.addressVal}</div>
          <div><span className="text-gold-600 block mb-1">{t.footer.reservations}</span>{t.nav.phone}</div>
          <div><span className="text-gold-600 block mb-1">{t.footer.email}</span>{t.footer.emailVal}</div>
        </div>
      </div>

      <div className="border-t border-obsidian-900">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-12 py-5 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="font-mono text-[10px] text-obsidian-600 tracking-wider">© {new Date().getFullYear()} Hotel Lumière. {t.footer.rights}</p>
          <div className="flex gap-6">
            {[t.footer.privacy, t.footer.terms, t.footer.cookies].map((item) => (
              <a key={item} href="#" className="font-mono text-[10px] text-obsidian-600 hover:text-obsidian-400 tracking-wider transition-colors">{item}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
