'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { Send, MapPin, Phone, Mail, Clock } from 'lucide-react';
import { useCreateContactMutation } from '@/features/api/apiSlice';
import { PageHero, SectionHeader } from '@/components/ui';
import { useI18n } from '@/i18n/context';

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  subject: z.string().min(5),
  message: z.string().min(20),
});
type FormData = z.infer<typeof schema>;

export default function ContactPage() {
  const { t, isRTL } = useI18n();
  const [createContact, { isLoading }] = useCreateContactMutation();
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) });

  const contactInfo = [
    { icon: MapPin, label: t.contact.addressLabel, value: t.footer.addressVal },
    { icon: Phone, label: t.contact.phoneLabel, value: t.nav.phone },
    { icon: Mail, label: t.contact.emailLabel, value: t.footer.emailVal },
    { icon: Clock, label: t.contact.hoursLabel, value: t.contact.hoursVal },
  ];

  const onSubmit = async (data: FormData) => {
    try {
      const result = await createContact(data).unwrap();
      if (result.success) { toast.success(result.message || 'Message envoyé'); reset(); }
    } catch (err: unknown) {
      const error = err as { data?: { message?: string } };
      toast.error(error?.data?.message || 'Échec de l\'envoi');
    }
  };

  return (
    <>
      <PageHero title={t.contact.pageTitle} subtitle={t.contact.pageSub} imageUrl="https://images.unsplash.com/photo-1590490360182-c33d57733427?w=1920&q=85" />
      <section className="py-24 bg-obsidian-950">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-12">
          <div className={`grid grid-cols-1 lg:grid-cols-5 gap-16 ${isRTL ? 'lg:grid-flow-dense' : ''}`} dir={isRTL ? 'rtl' : 'ltr'}>
            <div className="lg:col-span-2">
              <SectionHeader label={t.contact.label} title={t.contact.title} />
              <div className="mt-10 space-y-8">
                {contactInfo.map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex gap-4">
                    <div className="w-10 h-10 border border-gold-500/30 flex items-center justify-center shrink-0">
                      <Icon className="w-4 h-4 text-gold-400" />
                    </div>
                    <div>
                      <p className="font-mono text-[10px] text-gold-500 tracking-widest uppercase mb-1">{label}</p>
                      <p className="font-sans text-sm text-obsidian-300">{value}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-12 p-6 bg-obsidian-900 border border-obsidian-800">
                <p className="font-display text-xl font-light text-cream-100 mb-2">{t.contact.preferCall}</p>
                <p className="font-sans text-xs text-obsidian-400 mb-4">{t.contact.preferCallDesc}</p>
                <a href={`tel:${t.nav.phone.replace(/\s/g,'')}`} className="btn-outline w-full justify-center text-[10px]">
                  <Phone className="w-3.5 h-3.5" /> {t.contact.callNow}
                </a>
              </div>
            </div>

            <motion.div initial={{ opacity: 0, x: isRTL ? -30 : 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }} className="lg:col-span-3">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div>
                    <label className="font-mono text-[10px] text-gold-500 tracking-widest uppercase block mb-2">{t.contact.fieldName}</label>
                    <input {...register('name')} placeholder={t.contact.namePlaceholder} className="input-luxury" />
                    {errors.name && <p className="font-mono text-[10px] text-red-400 mt-1">{errors.name.message}</p>}
                  </div>
                  <div>
                    <label className="font-mono text-[10px] text-gold-500 tracking-widest uppercase block mb-2">{t.contact.fieldEmail}</label>
                    <input {...register('email')} type="email" placeholder="email@example.com" className="input-luxury" />
                    {errors.email && <p className="font-mono text-[10px] text-red-400 mt-1">{errors.email.message}</p>}
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div>
                    <label className="font-mono text-[10px] text-gold-500 tracking-widest uppercase block mb-2">{t.contact.fieldPhone}</label>
                    <input {...register('phone')} placeholder="+213 555 000 000" className="input-luxury" />
                  </div>
                  <div>
                    <label className="font-mono text-[10px] text-gold-500 tracking-widest uppercase block mb-2">{t.contact.fieldSubject}</label>
                    <input {...register('subject')} placeholder={t.contact.subjectPlaceholder} className="input-luxury" />
                    {errors.subject && <p className="font-mono text-[10px] text-red-400 mt-1">{errors.subject.message}</p>}
                  </div>
                </div>
                <div>
                  <label className="font-mono text-[10px] text-gold-500 tracking-widest uppercase block mb-2">{t.contact.fieldMessage}</label>
                  <textarea {...register('message')} rows={6} placeholder={t.contact.messagePlaceholder} className="input-luxury resize-none" />
                  {errors.message && <p className="font-mono text-[10px] text-red-400 mt-1">{errors.message.message}</p>}
                </div>
                <button type="submit" disabled={isLoading} className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed">
                  {isLoading ? t.contact.sending : t.contact.send}
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
