'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useI18n } from '@/i18n/context';

// ─── Skeleton ─────────────────────────────────────────────────────────────────
export function Skeleton({ className = '' }: { className?: string }) {
  return <div className={`shimmer rounded-none ${className}`} />;
}

export function RoomCardSkeleton() {
  return (
    <div className="card-luxury overflow-hidden">
      <Skeleton className="h-64 w-full" />
      <div className="p-6 space-y-3">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-7 w-48" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
        <div className="flex justify-between items-center pt-2">
          <Skeleton className="h-8 w-28" />
          <Skeleton className="h-10 w-32" />
        </div>
      </div>
    </div>
  );
}

// ─── Badge ────────────────────────────────────────────────────────────────────
interface BadgeProps {
  children: React.ReactNode;
  variant?: 'gold' | 'success' | 'warning' | 'error' | 'neutral';
}

const badgeStyles = {
  gold:    'bg-gold-500/10 text-gold-400 border-gold-500/30',
  success: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
  warning: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
  error:   'bg-red-500/10 text-red-400 border-red-500/30',
  neutral: 'bg-obsidian-800 text-obsidian-300 border-obsidian-700',
};

export function Badge({ children, variant = 'neutral' }: BadgeProps) {
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 border font-mono text-[10px] tracking-wider uppercase ${badgeStyles[variant]}`}>
      {children}
    </span>
  );
}

// ─── Section Header ───────────────────────────────────────────────────────────
interface SectionHeaderProps {
  label?: string;
  title: string;
  subtitle?: string;
  centered?: boolean;
  light?: boolean;
}

export function SectionHeader({ label, title, subtitle, centered = false, light = false }: SectionHeaderProps) {
  const { isRTL } = useI18n();
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className={`${centered ? 'text-center' : ''}`}
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      {label && <p className="section-label mb-4">{label}</p>}
      <h2 className={`section-title whitespace-pre-line ${light ? 'text-obsidian-900' : ''}`}>{title}</h2>
      <div className={`gold-divider ${centered ? 'mx-auto' : ''}`} />
      {subtitle && (
        <p className={`font-sans text-sm leading-relaxed max-w-xl mt-4 ${light ? 'text-obsidian-600' : 'text-obsidian-400'} ${centered ? 'mx-auto' : ''}`}>
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}

// ─── Page Hero ────────────────────────────────────────────────────────────────
interface PageHeroProps {
  title: string;
  subtitle?: string;
  imageUrl: string;
}

export function PageHero({ title, subtitle, imageUrl }: PageHeroProps) {
  const { t, isRTL } = useI18n();
  return (
    <div className="relative h-[50vh] min-h-[420px] flex items-end overflow-hidden">
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${imageUrl})` }} />
      <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950 via-obsidian-950/60 to-obsidian-950/20" />
      <div className="relative z-10 max-w-screen-xl mx-auto px-6 lg:px-12 pb-16 w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          dir={isRTL ? 'rtl' : 'ltr'}
        >
          <p className="section-label mb-4">Hotel Lumière</p>
          <h1 className="font-display text-5xl md:text-7xl font-light text-cream-50">{title}</h1>
          {subtitle && <p className="font-sans text-obsidian-300 text-sm mt-3 max-w-md">{subtitle}</p>}
        </motion.div>
      </div>
    </div>
  );
}

// ─── Gold Divider ─────────────────────────────────────────────────────────────
export function GoldDivider({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <div className="flex-1 h-px bg-obsidian-800" />
      <div className="w-1 h-1 bg-gold-500 rotate-45" />
      <div className="flex-1 h-px bg-obsidian-800" />
    </div>
  );
}
