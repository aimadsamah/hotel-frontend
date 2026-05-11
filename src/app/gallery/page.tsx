'use client';
import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import { PageHero } from '@/components/ui';
import { useI18n } from '@/i18n/context';

const galleryImages = [
  { src: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1200&q=85', alt: 'Hotel Exterior', category: 'Hotel' },
  { src: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1200&q=85', alt: 'Grand Deluxe Room', category: 'Rooms' },
  { src: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1200&q=85', alt: 'Lumière Suite', category: 'Suites' },
  { src: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=85', alt: 'Fine Dining', category: 'Dining' },
  { src: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1200&q=85', alt: 'Spa', category: 'Spa' },
  { src: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=1200&q=85', alt: 'Penthouse', category: 'Suites' },
  { src: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1200&q=85', alt: 'Garden Villa', category: 'Villas' },
  { src: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1200&q=85', alt: 'Villa Pool', category: 'Villas' },
  { src: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=1200&q=85', alt: 'Bedroom', category: 'Rooms' },
  { src: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=1200&q=85', alt: 'Grand Ballroom', category: 'Events' },
  { src: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=1200&q=85', alt: 'Suite Terrace', category: 'Suites' },
  { src: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=1200&q=85', alt: 'Hotel Lobby', category: 'Hotel' },
];

const RAW_CATEGORIES = ['All', 'Hotel', 'Rooms', 'Suites', 'Villas', 'Dining', 'Spa', 'Events'];

export default function GalleryPage() {
  const { t, isRTL } = useI18n();
  const [activeCategory, setActiveCategory] = useState('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const catLabels: Record<string, string> = {
    All: t.gallery.allCategories,
    ...t.gallery.categories,
  };

  const filtered = activeCategory === 'All' ? galleryImages : galleryImages.filter((img) => img.category === activeCategory);
  const prev = () => setLightboxIndex(i => i === null || i === 0 ? filtered.length - 1 : i - 1);
  const next = () => setLightboxIndex(i => i === null ? 0 : (i + 1) % filtered.length);

  return (
    <>
      <PageHero title={t.gallery.pageTitle} subtitle={t.gallery.pageSub} imageUrl="https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=1920&q=85" />
      <section className="py-16 bg-obsidian-950">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-12" dir={isRTL ? 'rtl' : 'ltr'}>
          <div className="flex flex-wrap gap-2 mb-12">
            {RAW_CATEGORIES.map((cat) => (
              <button key={cat} onClick={() => setActiveCategory(cat)}
                className={`font-mono text-[10px] tracking-widest uppercase px-5 py-2.5 border transition-all duration-300 ${activeCategory === cat ? 'border-gold-500 bg-gold-500/10 text-gold-400' : 'border-obsidian-700 text-obsidian-400 hover:border-obsidian-500 hover:text-obsidian-200'}`}>
                {catLabels[cat]}
              </button>
            ))}
          </div>
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-3 space-y-3">
            {filtered.map((img, i) => (
              <motion.div key={`${img.src}-${i}`} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="relative overflow-hidden cursor-pointer group break-inside-avoid" onClick={() => setLightboxIndex(i)}>
                <Image src={img.src} alt={img.alt} width={600} height={400} className="w-full object-cover transition-transform duration-700 group-hover:scale-105" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
                <div className="absolute inset-0 bg-obsidian-950/0 group-hover:bg-obsidian-950/40 transition-colors duration-300 flex items-center justify-center">
                  <ZoomIn className="w-6 h-6 text-cream-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-obsidian-950/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="font-mono text-[9px] tracking-widest text-gold-400 uppercase">{catLabels[img.category] || img.category}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] bg-obsidian-950/95 flex items-center justify-center" onClick={() => setLightboxIndex(null)}>
            <button className="absolute top-6 right-6 text-cream-50 hover:text-gold-400 z-10" onClick={() => setLightboxIndex(null)}><X className="w-6 h-6" /></button>
            <button className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 border border-obsidian-600 flex items-center justify-center text-cream-50 hover:border-gold-500 z-10" onClick={(e) => { e.stopPropagation(); isRTL ? next() : prev(); }}><ChevronLeft className="w-5 h-5" /></button>
            <div className="relative max-w-5xl max-h-[85vh] w-full mx-16" onClick={(e) => e.stopPropagation()}>
              <AnimatePresence mode="wait">
                <motion.div key={lightboxIndex} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.25 }}>
                  <Image src={filtered[lightboxIndex].src} alt={filtered[lightboxIndex].alt} width={1200} height={800} className="w-full h-auto max-h-[80vh] object-contain" priority />
                </motion.div>
              </AnimatePresence>
              <div className="absolute bottom-4 left-0 right-0 text-center">
                <p className="font-mono text-[10px] text-gold-500 tracking-widest">{lightboxIndex + 1} / {filtered.length}</p>
              </div>
            </div>
            <button className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 border border-obsidian-600 flex items-center justify-center text-cream-50 hover:border-gold-500 z-10" onClick={(e) => { e.stopPropagation(); isRTL ? prev() : next(); }}><ChevronRight className="w-5 h-5" /></button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
