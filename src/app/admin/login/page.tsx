'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { LogIn, Eye, EyeOff } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { setCredentials, setError } from '@/features/auth/authSlice';
import { useLoginMutation } from '@/features/api/apiSlice';
import { useI18n } from '@/i18n/context';
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher';

const schema = z.object({ email: z.string().email(), password: z.string().min(6) });
type FormData = z.infer<typeof schema>;

export default function AdminLoginPage() {
  const { t, isRTL } = useI18n();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAppSelector((s) => s.auth);
  const [showPassword, setShowPassword] = useState(false);
  const [login, { isLoading }] = useLoginMutation();
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) });

  useEffect(() => { if (isAuthenticated) router.replace('/admin/dashboard'); }, [isAuthenticated, router]);

  const onSubmit = async (data: FormData) => {
    try {
      const result = await login(data).unwrap();
      if (result.success && result.data) {
        dispatch(setCredentials({ user: result.data.user, token: result.data.token }));
        toast.success(t.admin.welcomeBack);
        router.replace('/admin/dashboard');
      }
    } catch (err: unknown) {
      const error = err as { data?: { message?: string } };
      const msg = error?.data?.message || 'Identifiants invalides';
      dispatch(setError(msg));
      toast.error(msg);
    }
  };

  return (
    <div className="min-h-screen bg-obsidian-950 flex items-center justify-center px-6">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1920&q=30')`, backgroundSize: 'cover' }} />
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950 via-obsidian-950/80 to-obsidian-950" />
      </div>

      <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="relative w-full max-w-md">
        <div className="absolute top-0 right-0 -mt-12"><LanguageSwitcher /></div>
        <div className="text-center mb-10">
          <span className="font-mono text-[9px] text-gold-500 tracking-ultra uppercase block mb-2">{t.admin.loginSubtitle}</span>
          <h1 className="font-display text-4xl font-light text-cream-50 tracking-wider">Lumière</h1>
          <div className="w-12 h-px bg-gold-500 mx-auto mt-4" />
        </div>

        <div className="bg-obsidian-900 border border-obsidian-800 p-10">
          <h2 className="font-display text-2xl font-light text-cream-50 mb-8" dir={isRTL ? 'rtl' : 'ltr'}>{t.admin.loginTitle}</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8" dir={isRTL ? 'rtl' : 'ltr'}>
            <div>
              <label className="font-mono text-[10px] text-gold-500 tracking-widest uppercase block mb-2">{t.admin.email}</label>
              <input {...register('email')} type="email" className="input-luxury" autoComplete="email" />
              {errors.email && <p className="font-mono text-[10px] text-red-400 mt-1">{errors.email.message}</p>}
            </div>
            <div>
              <label className="font-mono text-[10px] text-gold-500 tracking-widest uppercase block mb-2">{t.admin.password}</label>
              <div className="relative">
                <input {...register('password')} type={showPassword ? 'text' : 'password'} className="input-luxury pr-10" autoComplete="current-password" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-0 top-3 text-obsidian-500 hover:text-obsidian-300 transition-colors">
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && <p className="font-mono text-[10px] text-red-400 mt-1">{errors.password.message}</p>}
            </div>
            <button type="submit" disabled={isLoading} className="btn-primary w-full justify-center disabled:opacity-50 disabled:cursor-not-allowed">
              {isLoading ? t.admin.signingIn : t.admin.signIn} <LogIn className="w-4 h-4" />
            </button>
          </form>
          <div className="mt-8 pt-6 border-t border-obsidian-800 text-center">
            <p className="font-mono text-[10px] text-obsidian-600 tracking-wider">{t.admin.authorizedOnly}</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
