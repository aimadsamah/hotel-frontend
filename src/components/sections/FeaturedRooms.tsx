'use client';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useGetRoomsQuery } from '@/features/api/apiSlice';
import { SectionHeader, RoomCardSkeleton } from '@/components/ui';
import { RoomCard } from './RoomCard';
import { useI18n } from '@/i18n/context';

export function FeaturedRooms() {
  const { t } = useI18n();
  const { data, isLoading } = useGetRoomsQuery({ featured: true, limit: 3 });
  const rooms = data?.data?.rooms || [];
  return (
    <section className="py-24 lg:py-32 bg-obsidian-950">
      <div className="max-w-screen-xl mx-auto px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-8">
          <SectionHeader label={t.home.featuredLabel} title={t.home.featuredTitle} subtitle={t.home.featuredSub} />
          <Link href="/rooms" className="btn-ghost shrink-0">{t.home.featuredViewAll} <ArrowRight className="w-3.5 h-3.5" /></Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading ? Array.from({ length: 3 }).map((_, i) => <RoomCardSkeleton key={i} />) : rooms.map((room, i) => <RoomCard key={room._id} room={room} index={i} />)}
        </div>
      </div>
    </section>
  );
}
