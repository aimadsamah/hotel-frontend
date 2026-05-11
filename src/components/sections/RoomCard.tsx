'use client';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Star, Users, Maximize2 } from 'lucide-react';
import type { Room } from '@/types';
import { Badge } from '@/components/ui';
import { useI18n } from '@/i18n/context';

interface RoomCardProps { room: Room; index?: number; }

export function RoomCard({ room, index = 0 }: RoomCardProps) {
  const { t, isRTL } = useI18n();
  const catKey = room.category as keyof typeof t.roomData.categories;
  const localCategory = t.roomData.categories[catKey] || room.category;

  return (
    <motion.article initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: index * 0.1 }} className="card-luxury group overflow-hidden" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="relative h-64 overflow-hidden">
        <Image src={room.images[0]?.url || 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800'} alt={room.images[0]?.alt || room.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="absolute top-4 left-4"><Badge variant="gold">{localCategory}</Badge></div>
        {room.isFeatured && <div className="absolute top-4 right-4"><span className="font-mono text-[9px] tracking-widest uppercase bg-gold-500 text-obsidian-950 px-2 py-1">{t.rooms.featured}</span></div>}
      </div>

      <div className="p-7">
        <div className="flex items-center gap-1.5 mb-3">
          <Star className="w-3 h-3 fill-gold-500 text-gold-500" />
          <span className="font-mono text-xs text-gold-500">{room.rating.toFixed(1)}</span>
          <span className="font-mono text-xs text-obsidian-500">({room.reviewCount})</span>
        </div>
        <h3 className="font-display text-2xl font-light text-cream-50 mb-2 group-hover:text-gold-300 transition-colors duration-300">{room.title}</h3>
        <p className="font-sans text-sm text-obsidian-400 leading-relaxed mb-5 line-clamp-2">{room.shortDescription || room.description}</p>
        <div className="flex items-center gap-4 mb-5 pb-5 border-b border-obsidian-800">
          {room.features.size && <div className="flex items-center gap-1.5 text-obsidian-400"><Maximize2 className="w-3 h-3" /><span className="font-mono text-xs">{room.features.size}</span></div>}
          {room.features.occupancy && <div className="flex items-center gap-1.5 text-obsidian-400"><Users className="w-3 h-3" /><span className="font-mono text-xs">{room.features.occupancy} {t.rooms.guests}</span></div>}
        </div>
        <div className="flex items-end justify-between">
          <div>
            <span className="font-mono text-[10px] text-obsidian-500 tracking-wider uppercase block mb-0.5">{t.rooms.from}</span>
            <div className="flex items-baseline gap-1">
              <span className="font-display text-3xl font-light text-gold-400">${room.price.toLocaleString()}</span>
              <span className="font-mono text-xs text-obsidian-500">{t.rooms.perNight}</span>
            </div>
          </div>
          <Link href={`/rooms/${room.slug}`} className="btn-ghost">{t.rooms.viewSuite} <ArrowRight className="w-3.5 h-3.5" /></Link>
        </div>
      </div>
    </motion.article>
  );
}
