'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowRight, Star, Users, Maximize2, Check, ChevronLeft, ChevronRight } from 'lucide-react';
import { useGetRoomQuery } from '@/features/api/apiSlice';
import { Skeleton, Badge } from '@/components/ui';
import { useI18n } from '@/i18n/context';

interface Props { params: { slug: string } }

export default function RoomDetailPage({ params }: Props) {
  const { t, isRTL } = useI18n();
  const { data, isLoading, isError } = useGetRoomQuery(params.slug);
  const [activeImage, setActiveImage] = useState(0);

  if (isLoading) return (
    <div className="pt-28">
      <div className="max-w-screen-xl mx-auto px-6 lg:px-12 py-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-4"><Skeleton className="h-[50vh]" /><div className="flex gap-2">{[1,2,3].map(i=><Skeleton key={i} className="w-20 h-14"/>)}</div><Skeleton className="h-8 w-64"/><Skeleton className="h-4 w-full"/></div>
        <div><Skeleton className="h-64"/></div>
      </div>
    </div>
  );
  if (isError || !data?.data?.room) return notFound();

  const room = data.data.room;
  const localCategory = t.roomData.categories[room.category as keyof typeof t.roomData.categories] || room.category;

  return (
    <>
      {/* Breadcrumb */}
      <div className="pt-28 pb-6 bg-obsidian-950 border-b border-obsidian-800">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-12" dir={isRTL ? 'rtl' : 'ltr'}>
          <nav className="flex items-center gap-2 font-mono text-xs text-obsidian-500">
            <Link href="/" className="hover:text-gold-400 transition-colors">{t.rooms.breadcrumbHome}</Link>
            <span>/</span>
            <Link href="/rooms" className="hover:text-gold-400 transition-colors">{t.rooms.breadcrumbRooms}</Link>
            <span>/</span>
            <span className="text-obsidian-300">{room.title}</span>
          </nav>
        </div>
      </div>

      <section className="py-12 bg-obsidian-950">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12" dir={isRTL ? 'rtl' : 'ltr'}>
            {/* Left – Images + Details */}
            <div className="lg:col-span-2">
              {/* Main Image */}
              <div className="relative h-[50vh] min-h-[400px] overflow-hidden mb-3">
                <Image src={room.images[activeImage]?.url || room.images[0]?.url} alt={room.title} fill className="object-cover" priority sizes="(max-width: 768px) 100vw, 66vw" />
                {room.images.length > 1 && (
                  <>
                    <button onClick={() => setActiveImage(i => i === 0 ? room.images.length - 1 : i - 1)} className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-obsidian-950/70 border border-obsidian-700 flex items-center justify-center text-cream-50 hover:border-gold-500 transition-all"><ChevronLeft className="w-4 h-4" /></button>
                    <button onClick={() => setActiveImage(i => i === room.images.length - 1 ? 0 : i + 1)} className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-obsidian-950/70 border border-obsidian-700 flex items-center justify-center text-cream-50 hover:border-gold-500 transition-all"><ChevronRight className="w-4 h-4" /></button>
                  </>
                )}
              </div>

              {/* Thumbnails */}
              {room.images.length > 1 && (
                <div className="flex gap-2 mb-10">
                  {room.images.map((img, i) => (
                    <button key={i} onClick={() => setActiveImage(i)} className={`relative w-20 h-14 overflow-hidden border-2 transition-all ${activeImage === i ? 'border-gold-500' : 'border-transparent hover:border-obsidian-600'}`}>
                      <Image src={img.url} alt={img.alt} fill className="object-cover" sizes="80px" />
                    </button>
                  ))}
                </div>
              )}

              {/* Header */}
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-3">
                  <Badge variant="gold">{localCategory}</Badge>
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 fill-gold-500 text-gold-500" />
                    <span className="font-mono text-xs text-gold-500">{room.rating.toFixed(1)}</span>
                    <span className="font-mono text-xs text-obsidian-500">({room.reviewCount} {t.rooms.rating})</span>
                  </div>
                </div>
                <h1 className="font-display text-4xl md:text-5xl font-light text-cream-50 mb-4">{room.title}</h1>
                <p className="font-sans text-obsidian-300 leading-relaxed">{room.description}</p>
              </div>

              {/* Features */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10 p-6 bg-obsidian-900 border border-obsidian-800">
                {[
                  { label: t.rooms.size, value: room.features.size },
                  { label: t.rooms.beds, value: room.features.beds },
                  { label: t.rooms.occupancy, value: room.features.occupancy ? `${room.features.occupancy} max` : null },
                  { label: t.rooms.view, value: room.features.view },
                ].filter(f => f.value).map(({ label, value }) => (
                  <div key={label} className="text-center">
                    <p className="font-mono text-[10px] text-gold-500 tracking-widest uppercase mb-1">{label}</p>
                    <p className="font-sans text-sm text-cream-100">{value}</p>
                  </div>
                ))}
              </div>

              {/* Amenities */}
              <div>
                <h3 className="font-display text-2xl font-light text-cream-50 mb-6">{t.rooms.amenitiesTitle}</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {room.amenities.map((amenity) => (
                    <div key={amenity} className="flex items-center gap-3">
                      <Check className="w-3.5 h-3.5 text-gold-500 shrink-0" />
                      <span className="font-sans text-sm text-obsidian-300">{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right – Booking widget */}
            <div className="lg:col-span-1">
              <div className="sticky top-28">
                <div className="bg-obsidian-900 border border-obsidian-800 p-8">
                  <div className="mb-6">
                    <span className="font-mono text-[10px] text-obsidian-500 tracking-wider uppercase">{t.rooms.from2}</span>
                    <div className="flex items-baseline gap-1 mt-1">
                      <span className="font-display text-5xl font-light text-gold-400">${room.price.toLocaleString()}</span>
                      <span className="font-mono text-xs text-obsidian-500">{t.rooms.perNight}</span>
                    </div>
                  </div>
                  <div className="w-full h-px bg-obsidian-700 mb-6" />
                  <div className="space-y-3 mb-6 font-sans text-sm text-obsidian-400">
                    {room.features.floor && <p>📍 {room.features.floor}</p>}
                    {room.features.occupancy && <div className="flex items-center gap-2"><Users className="w-3.5 h-3.5 text-gold-500" />{t.rooms.occupancy}: {room.features.occupancy}</div>}
                    {room.features.size && <div className="flex items-center gap-2"><Maximize2 className="w-3.5 h-3.5 text-gold-500" />{room.features.size}</div>}
                  </div>
                  <Link href={`/booking?room=${room._id}`} className="btn-primary w-full justify-center mb-4">
                    {t.rooms.reserveRoom} <ArrowRight className="w-4 h-4" />
                  </Link>
                  <p className="font-mono text-[10px] text-obsidian-600 text-center tracking-wider">{t.rooms.guarantee}</p>
                </div>

                <div className="mt-4 p-6 border border-obsidian-800 text-center">
                  <p className="font-display text-lg font-light text-cream-100 mb-1">{t.rooms.needHelp}</p>
                  <p className="font-sans text-xs text-obsidian-400 mb-4">{t.rooms.concierge24}</p>
                  <Link href="/contact" className="btn-ghost text-[10px]">{t.rooms.contactUs} <ArrowRight className="w-3 h-3" /></Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
