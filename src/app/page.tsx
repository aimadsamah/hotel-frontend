import type { Metadata } from 'next';
import { HeroSection } from '@/components/sections/HeroSection';
import { FeaturedRooms } from '@/components/sections/FeaturedRooms';
import { ServicesPreview } from '@/components/sections/ServicesPreview';
import { TestimonialsSection } from '@/components/sections/TestimonialsSection';
import { StatsSection } from '@/components/sections/StatsSection';
import { CtaBanner } from '@/components/sections/CtaBanner';

export const metadata: Metadata = {
  title: 'Hotel Lumière — A Sanctuary of Refined Luxury',
  description: 'Experience the pinnacle of luxury hospitality. Exquisite suites, world-class dining, and legendary service in the heart of the city.',
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <FeaturedRooms />
      <ServicesPreview />
      <TestimonialsSection />
      <CtaBanner />
    </>
  );
}
