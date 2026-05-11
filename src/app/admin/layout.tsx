'use client';
import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { LayoutDashboard, BedDouble, CalendarCheck, MessageSquare, LogOut, Menu, X, ChevronRight } from 'lucide-react';
import { useAppSelector, useAppDispatch } from '@/hooks/redux';
import { logout } from '@/features/auth/authSlice';
import { useI18n } from '@/i18n/context';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { t, isRTL } = useI18n();
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const { isAuthenticated, user } = useAppSelector((s) => s.auth);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navItems = [
    { href: '/admin/dashboard', label: t.admin.dashboard, icon: LayoutDashboard },
    { href: '/admin/rooms', label: t.admin.rooms, icon: BedDouble },
    { href: '/admin/bookings', label: t.admin.bookings, icon: CalendarCheck },
    { href: '/admin/messages', label: t.admin.messages, icon: MessageSquare },
  ];

  useEffect(() => { if (!isAuthenticated && pathname !== '/admin/login') router.replace('/admin/login'); }, [isAuthenticated, pathname, router]);

  if (pathname === '/admin/login') return <>{children}</>;
  if (!isAuthenticated) return null;

  const handleLogout = () => { dispatch(logout()); router.replace('/admin/login'); };

  return (
    <div className="min-h-screen bg-obsidian-950 flex" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 ${isRTL ? 'right-0' : 'left-0'} z-50 w-64 bg-obsidian-900 border-${isRTL ? 'l' : 'r'} border-obsidian-800 transform transition-transform duration-300 lg:translate-x-0 lg:static lg:block ${sidebarOpen ? 'translate-x-0' : isRTL ? 'translate-x-full' : '-translate-x-full'}`}>
        <div className="p-6 border-b border-obsidian-800">
          <Link href="/">
            <span className="font-mono text-[9px] text-gold-500 tracking-ultra uppercase block mb-0.5">{t.admin.managementLabel}</span>
            <span className="font-display text-2xl font-light text-cream-50 tracking-wider">Lumière</span>
          </Link>
        </div>
        <div className="px-6 py-4 border-b border-obsidian-800">
          <p className="font-sans text-sm text-cream-100">{user?.name}</p>
          <p className="font-mono text-[10px] text-gold-500 tracking-wider uppercase">{user?.role}</p>
        </div>
        <nav className="p-4">
          {navItems.map(({ href, label, icon: Icon }) => {
            const active = pathname === href;
            return (
              <Link key={href} href={href} onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 mb-1 transition-all duration-200 ${active ? 'bg-gold-500/10 text-gold-400 border-s-2 border-gold-500' : 'text-obsidian-400 hover:text-cream-100 hover:bg-obsidian-800 border-s-2 border-transparent'}`}>
                <Icon className="w-4 h-4" />
                <span className="font-sans text-sm">{label}</span>
                {active && <ChevronRight className={`w-3.5 h-3.5 ms-auto ${isRTL ? 'rotate-180' : ''}`} />}
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-obsidian-800">
          <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-3 w-full text-obsidian-400 hover:text-red-400 transition-colors duration-200">
            <LogOut className="w-4 h-4" /><span className="font-sans text-sm">{t.admin.signOut}</span>
          </button>
        </div>
      </aside>

      {sidebarOpen && <div className="fixed inset-0 z-40 bg-obsidian-950/60 lg:hidden" onClick={() => setSidebarOpen(false)} />}

      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-obsidian-900 border-b border-obsidian-800 px-6 py-4 flex items-center justify-between lg:justify-end">
          <button className="lg:hidden text-obsidian-400 hover:text-cream-50" onClick={() => setSidebarOpen(!sidebarOpen)}>
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          <Link href="/" target="_blank" className="font-mono text-[10px] text-obsidian-400 hover:text-gold-400 tracking-wider uppercase transition-colors">
            {t.admin.viewSite} ↗
          </Link>
        </header>
        <main className="flex-1 p-6 lg:p-8 overflow-auto">
          <motion.div key={pathname} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  );
}
