'use client';
import { motion } from 'framer-motion';
import { BedDouble, CalendarCheck, MessageSquare, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import { useGetRoomsQuery, useGetBookingsQuery, useGetContactsQuery } from '@/features/api/apiSlice';
import { useAppSelector } from '@/hooks/redux';
import { Skeleton, Badge } from '@/components/ui';
import { useI18n } from '@/i18n/context';

export default function DashboardPage() {
  const { t } = useI18n();
  const { user } = useAppSelector((s) => s.auth);
  const { data: roomsData, isLoading: roomsLoading } = useGetRoomsQuery({});
  const { data: bookingsData, isLoading: bookingsLoading } = useGetBookingsQuery({});
  const { data: contactsData, isLoading: contactsLoading } = useGetContactsQuery({});

  const rooms = roomsData?.data?.rooms || [];
  const bookings = bookingsData?.data?.bookings || [];
  const contacts = contactsData?.data?.contacts || [];
  const unreadCount = contactsData?.data?.unreadCount || 0;
  const pendingBookings = bookings.filter((b) => b.status === 'pending').length;
  const confirmedBookings = bookings.filter((b) => b.status === 'confirmed').length;

  const stats = [
    { label: t.admin.totalRooms, value: roomsLoading ? null : rooms.length, icon: BedDouble, color: 'text-blue-400', bg: 'bg-blue-400/10', href: '/admin/rooms' },
    { label: t.admin.totalBookings, value: bookingsLoading ? null : bookings.length, icon: CalendarCheck, color: 'text-gold-400', bg: 'bg-gold-400/10', href: '/admin/bookings', sub: `${pendingBookings} ${t.admin.pending}` },
    { label: t.admin.unreadMessages, value: contactsLoading ? null : unreadCount, icon: MessageSquare, color: 'text-emerald-400', bg: 'bg-emerald-400/10', href: '/admin/messages', sub: `${contacts.length} ${t.admin.total}` },
    { label: t.admin.confirmedStays, value: bookingsLoading ? null : confirmedBookings, icon: TrendingUp, color: 'text-purple-400', bg: 'bg-purple-400/10', href: '/admin/bookings' },
  ];

  const badgeVariant = (s: string) => s === 'confirmed' ? 'success' as const : s === 'pending' ? 'warning' as const : s === 'cancelled' ? 'error' as const : 'neutral' as const;

  return (
    <div>
      <div className="mb-10">
        <p className="section-label mb-2">{t.admin.welcomeBack}</p>
        <h1 className="font-display text-4xl font-light text-cream-50">{user?.name}</h1>
        <div className="gold-divider" />
        <p className="font-sans text-sm text-obsidian-400">{t.admin.dashboardDesc}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-10">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div key={stat.label} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
              <Link href={stat.href} className="block bg-obsidian-900 border border-obsidian-800 p-6 hover:border-gold-500/30 transition-all duration-300 group">
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-10 h-10 ${stat.bg} flex items-center justify-center`}><Icon className={`w-5 h-5 ${stat.color}`} /></div>
                </div>
                {stat.value === null ? <Skeleton className="h-9 w-16 mb-1" /> : <p className="font-display text-4xl font-light text-cream-50 mb-1">{stat.value}</p>}
                <p className="font-mono text-[10px] text-obsidian-400 tracking-widest uppercase">{stat.label}</p>
                {stat.sub && <p className="font-mono text-[10px] text-gold-500 mt-1">{stat.sub}</p>}
              </Link>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <div className="bg-obsidian-900 border border-obsidian-800 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-display text-xl font-light text-cream-50">{t.admin.recentBookings}</h3>
            <Link href="/admin/bookings" className="btn-ghost text-[10px]">{t.admin.viewAll}</Link>
          </div>
          {bookingsLoading ? <div className="space-y-3">{Array.from({length:4}).map((_,i)=><Skeleton key={i} className="h-12"/>)}</div>
          : bookings.length === 0 ? <p className="font-sans text-sm text-obsidian-500 py-6 text-center">{t.admin.noBookings}</p>
          : <div className="space-y-3">{bookings.slice(0,5).map((b)=>(
            <div key={b._id} className="flex items-center justify-between py-3 border-b border-obsidian-800 last:border-0">
              <div><p className="font-sans text-sm text-cream-100">{b.firstName} {b.lastName}</p><p className="font-mono text-[10px] text-obsidian-400">{b.roomTitle}</p></div>
              <div className="text-right"><Badge variant={badgeVariant(b.status)}>{b.status}</Badge>{b.totalPrice && <p className="font-mono text-[10px] text-gold-500 mt-1">${b.totalPrice.toLocaleString()}</p>}</div>
            </div>
          ))}</div>}
        </div>

        <div className="bg-obsidian-900 border border-obsidian-800 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-display text-xl font-light text-cream-50">{t.admin.recentMessages}</h3>
            <Link href="/admin/messages" className="btn-ghost text-[10px]">{t.admin.viewAll}</Link>
          </div>
          {contactsLoading ? <div className="space-y-3">{Array.from({length:4}).map((_,i)=><Skeleton key={i} className="h-12"/>)}</div>
          : contacts.length === 0 ? <p className="font-sans text-sm text-obsidian-500 py-6 text-center">{t.admin.noMessages}</p>
          : <div className="space-y-3">{contacts.slice(0,5).map((c)=>(
            <div key={c._id} className="flex items-start justify-between py-3 border-b border-obsidian-800 last:border-0">
              <div className="flex-1 min-w-0 pr-3"><p className="font-sans text-sm text-cream-100">{c.name}</p><p className="font-mono text-[10px] text-obsidian-400 truncate">{c.subject}</p></div>
              <Badge variant={c.status==='unread'?'warning':c.status==='replied'?'success':'neutral'}>{c.status}</Badge>
            </div>
          ))}</div>}
        </div>
      </div>
    </div>
  );
}
