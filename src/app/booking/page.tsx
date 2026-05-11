"use client";

import { useState, Suspense } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { Calendar, Users, ArrowRight, CheckCircle } from "lucide-react";
import {
  useCreateBookingMutation,
  useGetRoomsQuery,
} from "@/features/api/apiSlice";
import { SectionHeader } from "@/components/ui";
import { useI18n } from "@/i18n/context";

const schema = z
  .object({
    firstName: z.string().min(2),
    lastName: z.string().min(2),
    email: z.string().email(),
    phone: z.string().min(7),
    room: z.string().min(1),
    checkIn: z.string().min(1),
    checkOut: z.string().min(1),
    adults: z.coerce.number().min(1).max(10),
    children: z.coerce.number().min(0).max(10),
    specialRequests: z.string().optional(),
  })
  .refine((d) => new Date(d.checkOut) > new Date(d.checkIn), {
    message: "Check-out must be after check-in",
    path: ["checkOut"],
  });

type FormData = z.infer<typeof schema>;

function BookingContent() {
  const { t, isRTL } = useI18n();
  const searchParams = useSearchParams();
  const preselectedRoom = searchParams.get("room") || "";
  const [submitted, setSubmitted] = useState(false);
  const [confirmation, setConfirmation] = useState<{
    number: string;
    name: string;
  } | null>(null);

  const [createBooking, { isLoading }] = useCreateBookingMutation();
  const { data: roomsData } = useGetRoomsQuery({ available: true });
  const rooms = roomsData?.data?.rooms || [];

  const today = new Date().toISOString().split("T")[0];
  const tomorrow = new Date(Date.now() + 86400000).toISOString().split("T")[0];

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      room: preselectedRoom,
      adults: 1,
      children: 0,
      checkIn: today,
      checkOut: tomorrow,
    },
  });

  const watchRoom = watch("room");
  const watchCheckIn = watch("checkIn");
  const watchCheckOut = watch("checkOut");
  const selectedRoom = rooms.find((r) => r._id === watchRoom);

  const nights =
    watchCheckIn && watchCheckOut
      ? Math.max(
          0,
          Math.ceil(
            (new Date(watchCheckOut).getTime() -
              new Date(watchCheckIn).getTime()) /
              86400000,
          ),
        )
      : 0;
  const total = selectedRoom ? selectedRoom.price * nights : 0;

  const onSubmit = async (data: FormData) => {
    try {
      const result = await createBooking({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        room: data.room,
        checkIn: data.checkIn,
        checkOut: data.checkOut,
        guests: { adults: data.adults, children: data.children },
        specialRequests: data.specialRequests,
      } as any).unwrap();

      if (result.success && result.data) {
        setConfirmation({
          number:
            (result.data as any).booking?.confirmationNumber || "LUM-XXXX",
          name: `${data.firstName} ${data.lastName}`,
        });
        setSubmitted(true);
        toast.success(t.booking.successLabel);
      }
    } catch (err: any) {
      toast.error(err?.data?.message || "Erreur lors de la réservation");
    }
  };

  const inputClass = "input-luxury w-full";
  const labelClass =
    "font-mono text-[10px] text-gold-500 tracking-widest uppercase block mb-2";

  if (submitted && confirmation) {
    return (
      <div
        className="min-h-screen bg-obsidian-950 flex items-center justify-center px-6 pt-20"
        dir={isRTL ? "rtl" : "ltr"}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-lg"
        >
          <CheckCircle className="w-16 h-16 text-gold-400 mx-auto mb-6" />
          <p className="section-label mb-4">{t.booking.successLabel}</p>
          <h1 className="font-display text-4xl md:text-5xl font-light text-cream-50 mb-4">
            {t.booking.successTitle} {confirmation.name.split(" ")[0]}
          </h1>
          <div className="gold-divider mx-auto" />
          <p className="font-sans text-obsidian-300 text-sm my-6 leading-relaxed">
            {t.booking.successDesc}
          </p>
          <div className="bg-obsidian-900 border border-gold-500/20 p-6 mb-8">
            <p className="font-mono text-[10px] text-obsidian-500 tracking-widest uppercase mb-2">
              {t.booking.confirmNumber}
            </p>
            <p className="font-display text-3xl font-light text-gold-400">
              {confirmation.number}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="/" className="btn-primary">
              {t.booking.returnHome} <ArrowRight className="w-4 h-4 ml-2" />
            </a>
            <a href="/contact" className="btn-outline">
              {t.booking.contactConcierge}
            </a>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <>
      <div className="pt-32 pb-12 bg-obsidian-950 border-b border-obsidian-800">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-12">
          <SectionHeader
            label={t.booking.label}
            title={t.booking.title}
            subtitle={t.booking.sub}
          />
        </div>
      </div>

      <section className="py-16 bg-obsidian-950">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-12">
          <div
            className="grid grid-cols-1 lg:grid-cols-3 gap-12"
            dir={isRTL ? "rtl" : "ltr"}
          >
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
                {/* Guest Info */}
                <div>
                  <h3 className="font-display text-2xl font-light text-cream-50 mb-6 pb-4 border-b border-obsidian-800">
                    {t.booking.guestInfo}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    <div>
                      <label className={labelClass}>
                        {t.booking.firstName}
                      </label>
                      <input
                        {...register("firstName")}
                        className={inputClass}
                      />
                      {errors.firstName && (
                        <p className="font-mono text-[10px] text-red-400 mt-1">
                          {errors.firstName.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className={labelClass}>{t.booking.lastName}</label>
                      <input {...register("lastName")} className={inputClass} />
                      {errors.lastName && (
                        <p className="font-mono text-[10px] text-red-400 mt-1">
                          {errors.lastName.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className={labelClass}>{t.booking.email}</label>
                      <input
                        {...register("email")}
                        type="email"
                        className={inputClass}
                      />
                      {errors.email && (
                        <p className="font-mono text-[10px] text-red-400 mt-1">
                          {errors.email.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className={labelClass}>{t.booking.phone}</label>
                      <input {...register("phone")} className={inputClass} />
                      {errors.phone && (
                        <p className="font-mono text-[10px] text-red-400 mt-1">
                          {errors.phone.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Stay Details */}
                <div>
                  <h3 className="font-display text-2xl font-light text-cream-50 mb-6 pb-4 border-b border-obsidian-800">
                    {t.booking.stayDetails}
                  </h3>
                  <div className="mb-8">
                    <label className={labelClass}>{t.booking.selectRoom}</label>
                    <select
                      {...register("room")}
                      className="input-luxury w-full bg-obsidian-950 appearance-none cursor-pointer"
                    >
                      <option value="">
                        {t.booking.selectRoomPlaceholder}
                      </option>
                      {rooms.map((r) => (
                        <option key={r._id} value={r._id}>
                          {r.title} — ${r.price.toLocaleString()}/nuit
                        </option>
                      ))}
                    </select>
                    {errors.room && (
                      <p className="font-mono text-[10px] text-red-400 mt-1">
                        {errors.room.message}
                      </p>
                    )}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-8">
                    <div>
                      <label className={labelClass}>
                        <Calendar className="w-3 h-3 inline mr-1" />
                        {t.booking.checkIn}
                      </label>
                      <input
                        {...register("checkIn")}
                        type="date"
                        min={today}
                        className={inputClass}
                      />
                      {errors.checkIn && (
                        <p className="font-mono text-[10px] text-red-400 mt-1">
                          {errors.checkIn.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className={labelClass}>
                        <Calendar className="w-3 h-3 inline mr-1" />
                        {t.booking.checkOut}
                      </label>
                      <input
                        {...register("checkOut")}
                        type="date"
                        min={tomorrow}
                        className={inputClass}
                      />
                      {errors.checkOut && (
                        <p className="font-mono text-[10px] text-red-400 mt-1">
                          {errors.checkOut.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-8 mb-8">
                    <div>
                      <label className={labelClass}>
                        <Users className="w-3 h-3 inline mr-1" />
                        {t.booking.adults}
                      </label>
                      <select
                        {...register("adults")}
                        className="input-luxury w-full bg-obsidian-950 appearance-none cursor-pointer"
                      >
                        {[1, 2, 3, 4].map((n) => (
                          <option key={n} value={n}>
                            {n} {n > 1 ? t.booking.adults2 : t.booking.adult}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className={labelClass}>{t.booking.children}</label>
                      <select
                        {...register("children")}
                        className="input-luxury w-full bg-obsidian-950 appearance-none cursor-pointer"
                      >
                        {[0, 1, 2, 3].map((n) => (
                          <option key={n} value={n}>
                            {n} {n <= 1 ? t.booking.child : t.booking.children2}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className={labelClass}>
                      {t.booking.specialRequests}
                    </label>
                    <textarea
                      {...register("specialRequests")}
                      rows={4}
                      placeholder={t.booking.specialPlaceholder}
                      className="input-luxury w-full resize-none"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? t.booking.submitting : t.booking.submit}{" "}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </button>
                <p className="font-mono text-[10px] text-obsidian-500 tracking-wider">
                  {t.booking.terms}
                </p>
              </form>
            </div>

            {/* Summary Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-28 bg-obsidian-900 border border-obsidian-800 p-8">
                <h3 className="font-display text-2xl font-light text-cream-50 mb-6">
                  {t.booking.summaryTitle}
                </h3>
                {selectedRoom ? (
                  <>
                    <div className="mb-4 pb-4 border-b border-obsidian-800">
                      <p className="font-mono text-[10px] text-gold-500 tracking-widest uppercase mb-1">
                        {selectedRoom.category}
                      </p>
                      <p className="font-sans text-cream-100 text-sm font-medium">
                        {selectedRoom.title}
                      </p>
                    </div>
                    <div className="space-y-3 mb-6 font-mono text-xs text-obsidian-400">
                      {watchCheckIn && (
                        <div className="flex justify-between">
                          <span>{t.booking.checkIn.replace(" *", "")}</span>
                          <span className="text-cream-200">
                            {new Date(watchCheckIn).toLocaleDateString()}
                          </span>
                        </div>
                      )}
                      {watchCheckOut && (
                        <div className="flex justify-between">
                          <span>{t.booking.checkOut.replace(" *", "")}</span>
                          <span className="text-cream-200">
                            {new Date(watchCheckOut).toLocaleDateString()}
                          </span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span>{t.booking.duration}</span>
                        <span className="text-cream-200">
                          {nights}{" "}
                          {nights > 1
                            ? t.booking.nightsPlural
                            : t.booking.nights}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>{t.booking.ratePerNight}</span>
                        <span className="text-cream-200">
                          ${selectedRoom.price.toLocaleString()}
                        </span>
                      </div>
                    </div>
                    <div className="pt-4 border-t border-obsidian-700">
                      <div className="flex justify-between items-baseline">
                        <span className="font-mono text-[10px] text-obsidian-400 tracking-widest uppercase">
                          {t.booking.estimatedTotal}
                        </span>
                        <span className="font-display text-3xl font-light text-gold-400">
                          ${total.toLocaleString()}
                        </span>
                      </div>
                      <p className="font-mono text-[10px] text-obsidian-600 mt-1">
                        {t.booking.taxNote}
                      </p>
                    </div>
                  </>
                ) : (
                  <p className="font-sans text-sm text-obsidian-500">
                    {t.booking.summarySelectRoom}
                  </p>
                )}
                <div className="mt-8 pt-6 border-t border-obsidian-800 space-y-3 font-mono text-[10px] text-obsidian-400 tracking-wider">
                  <p>{t.booking.guarantee}</p>
                  <p>{t.booking.freeCancellation}</p>
                  <p>{t.booking.confirmation2h}</p>
                  <p>{t.booking.securePayment}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default function BookingPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-obsidian-950 flex items-center justify-center text-gold-500 font-mono">
          Chargement de la page de réservation...
        </div>
      }
    >
      <BookingContent />
    </Suspense>
  );
}
