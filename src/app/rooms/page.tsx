'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useGetRoomsQuery } from '@/features/api/apiSlice';
import { PageHero, RoomCardSkeleton } from '@/components/ui';
import { RoomCard } from '@/components/sections/RoomCard';
import { useI18n } from '@/i18n/context';

export default function RoomsPage() {
  const { t, isRTL } = useI18n();
  const categories = [t.rooms.allCategories, 'Standard', 'Deluxe', 'Suite', 'Presidential', 'Villa'];
  const categoryLabels: Record<string, string> = {
    [t.rooms.allCategories]: t.rooms.allCategories,
    Standard: t.roomData.categories.Standard,
    Deluxe: t.roomData.categories.Deluxe,
    Suite: t.roomData.categories.Suite,
    Presidential: t.roomData.categories.Presidential,
    Villa: t.roomData.categories.Villa,
  };

  const [activeCategory, setActiveCategory] = useState(t.rooms.allCategories);
  const params = activeCategory === t.rooms.allCategories ? {} : { category: activeCategory };
  const { data, isLoading } = useGetRoomsQuery(params);
  const rooms = data?.data?.rooms || [];

  return (
    <>
      <PageHero title={t.rooms.pageTitle} subtitle={t.rooms.pageSub} imageUrl="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1920&q=85" />
      <section className="py-20 bg-obsidian-950">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-12" dir={isRTL ? 'rtl' : 'ltr'}>
          <div className="flex flex-wrap gap-2 mb-14">
            {categories.map((cat) => (
              <button key={cat} onClick={() => setActiveCategory(cat)}
                className={`font-mono text-[10px] tracking-widest uppercase px-5 py-2.5 border transition-all duration-300 ${activeCategory === cat ? 'border-gold-500 bg-gold-500/10 text-gold-400' : 'border-obsidian-700 text-obsidian-400 hover:border-obsidian-500 hover:text-obsidian-200'}`}>
                {categoryLabels[cat]}
              </button>
            ))}
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">{Array.from({ length: 6 }).map((_, i) => <RoomCardSkeleton key={i} />)}</div>
          ) : rooms.length === 0 ? (
            <div className="text-center py-24">
              <p className="font-display text-3xl font-light text-obsidian-500 mb-3">{t.rooms.noRooms}</p>
              <p className="font-sans text-sm text-obsidian-600">{t.rooms.tryAnother}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {rooms.map((room, i) => <RoomCard key={room._id} room={room} index={i} />)}
            </div>
          )}

          {!isLoading && rooms.length > 0 && (
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="font-mono text-xs text-obsidian-500 text-center mt-12">
              {t.rooms.showing} {rooms.length} {rooms.length !== 1 ? t.rooms.accommodations : t.rooms.accommodation}
            </motion.p>
          )}
        </div>
      </section>
    </>
  );
}
