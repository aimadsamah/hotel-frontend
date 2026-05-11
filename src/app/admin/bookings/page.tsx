// "use client";
// import { useState } from "react";
// import toast from "react-hot-toast";
// import {
//   useGetBookingsQuery,
//   useUpdateBookingMutation,
// } from "@/features/api/apiSlice";
// import { Skeleton, Badge } from "@/components/ui";
// import type { Booking } from "@/types";
// import { useI18n } from "@/i18n/context";

// const statusOptions = ["pending", "confirmed", "cancelled", "completed"];
// const badgeVariant = (s: string) =>
//   s === "confirmed"
//     ? ("success" as const)
//     : s === "pending"
//       ? ("warning" as const)
//       : s === "cancelled"
//         ? ("error" as const)
//         : ("neutral" as const);

// export default function AdminBookingsPage() {
//   const { t } = useI18n();
//   const [statusFilter, setStatusFilter] = useState("");
//   const { data, isLoading } = useGetBookingsQuery(
//     statusFilter ? { status: statusFilter } : {},
//   );
//   const [updateBooking] = useUpdateBookingMutation();
//   const [expandedId, setExpandedId] = useState<string | null>(null);

//   const bookings: Booking[] = data?.data?.bookings || [];
//   const stats =
//     (data?.data?.stats as {
//       _id: string;
//       count: number;
//       totalRevenue: number;
//     }[]) || [];
//   const totalRevenue = stats
//     .filter((s) => s._id !== "cancelled")
//     .reduce((acc, s) => acc + (s.totalRevenue || 0), 0);

//   const handleStatusChange = async (id: string, status: string) => {
//     try {
//       await updateBooking({
//         id,
//         data: { status: status as Booking["status"] },
//       }).unwrap();
//       toast.success("Statut mis à jour");
//     } catch {
//       toast.error("Échec de la mise à jour");
//     }
//   };

//   return (
//     <div>
//       <div className="mb-8">
//         <p className="section-label mb-2">{t.admin.managementLabel}</p>
//         <h1 className="font-display text-4xl font-light text-cream-50">
//           {t.admin.bookingsTitle}
//         </h1>
//         <div className="gold-divider" />
//       </div>

//       <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
//         {statusOptions.map((status) => {
//           const stat = stats.find((s) => s._id === status);
//           return (
//             <div
//               key={status}
//               className="bg-obsidian-900 border border-obsidian-800 p-5"
//             >
//               <p className="font-display text-3xl font-light text-cream-50 mb-1">
//                 {stat?.count || 0}
//               </p>
//               <Badge variant={badgeVariant(status)}>{status}</Badge>
//             </div>
//           );
//         })}
//       </div>

//       <div className="bg-obsidian-900 border border-gold-500/20 p-5 mb-8">
//         <p className="font-mono text-[10px] text-gold-500 tracking-widest uppercase mb-1">
//           {t.admin.totalRevenue}
//         </p>
//         <p className="font-display text-4xl font-light text-gold-400">
//           ${totalRevenue.toLocaleString()}
//         </p>
//       </div>

//       <div className="flex gap-2 mb-6">
//         {["", ...statusOptions].map((s) => (
//           <button
//             key={s}
//             onClick={() => setStatusFilter(s)}
//             className={`font-mono text-[10px] tracking-widest uppercase px-4 py-2 border transition-all ${statusFilter === s ? "border-gold-500 bg-gold-500/10 text-gold-400" : "border-obsidian-700 text-obsidian-400 hover:border-obsidian-500"}`}
//           >
//             {s || t.admin.all}
//           </button>
//         ))}
//       </div>

//       <div className="bg-obsidian-900 border border-obsidian-800 overflow-hidden">
//         {isLoading ? (
//           <div className="p-6 space-y-3">
//             {Array.from({ length: 5 }).map((_, i) => (
//               <Skeleton key={i} className="h-14" />
//             ))}
//           </div>
//         ) : (
//           <div className="overflow-x-auto">
//             <table className="w-full">
//               <thead>
//                 <tr className="border-b border-obsidian-700">
//                   {[
//                     t.admin.guest,
//                     t.admin.room,
//                     t.admin.dates,
//                     t.admin.guests,
//                     t.admin.totalRev,
//                     t.admin.status,
//                     t.admin.actions,
//                   ].map((h) => (
//                     <th
//                       key={h}
//                       className="font-mono text-[10px] tracking-widest text-obsidian-400 uppercase text-left px-5 py-4"
//                     >
//                       {h}
//                     </th>
//                   ))}
//                 </tr>
//               </thead>
//               <tbody>
//                 {bookings.map((booking) => (
//                   <>
//                     <tr
//                       key={booking._id}
//                       className="border-b border-obsidian-800 hover:bg-obsidian-800/50 transition-colors cursor-pointer"
//                       onClick={() =>
//                         setExpandedId(
//                           expandedId === booking._id ? null : booking._id,
//                         )
//                       }
//                     >
//                       <td className="px-5 py-4">
//                         <p className="font-sans text-sm text-cream-100">
//                           {booking.firstName} {booking.lastName}
//                         </p>
//                         <p className="font-mono text-[10px] text-obsidian-400">
//                           {booking.email}
//                         </p>
//                       </td>
//                       <td className="px-5 py-4">
//                         <p className="font-sans text-sm text-cream-200">
//                           {booking.roomTitle}
//                         </p>
//                       </td>
//                       <td className="px-5 py-4">
//                         <p className="font-mono text-[10px] text-obsidian-300">
//                           {new Date(booking.checkIn).toLocaleDateString()} –
//                         </p>
//                         <p className="font-mono text-[10px] text-obsidian-300">
//                           {new Date(booking.checkOut).toLocaleDateString()}
//                         </p>
//                       </td>
//                       <td className="px-5 py-4">
//                         <p className="font-mono text-[10px] text-obsidian-300">
//                           {booking.guests?.adults}A{" "}
//                           {booking.guests?.children > 0
//                             ? `${booking.guests.children}C`
//                             : ""}
//                         </p>
//                       </td>
//                       <td className="px-5 py-4">
//                         <p className="font-display text-lg font-light text-gold-400">
//                           {booking.totalPrice
//                             ? `$${booking.totalPrice.toLocaleString()}`
//                             : "—"}
//                         </p>
//                       </td>
//                       <td className="px-5 py-4">
//                         <Badge variant={badgeVariant(booking.status)}>
//                           {booking.status}
//                         </Badge>
//                       </td>
//                       <td className="px-5 py-4">
//                         <select
//                           value={booking.status}
//                           onChange={(e) => {
//                             e.stopPropagation();
//                             handleStatusChange(booking._id, e.target.value);
//                           }}
//                           onClick={(e) => e.stopPropagation()}
//                           className="bg-obsidian-800 border border-obsidian-700 text-cream-100 font-mono text-[10px] px-2 py-1.5 focus:outline-none focus:border-gold-500"
//                         >
//                           {statusOptions.map((s) => (
//                             <option key={s} value={s}>
//                               {s}
//                             </option>
//                           ))}
//                         </select>
//                       </td>
//                     </tr>
//                     {expandedId === booking._id && (
//                       <tr className="bg-obsidian-800/40">
//                         <td colSpan={7} className="px-5 py-4">
//                           <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
//                             <div>
//                               <p className="font-mono text-[10px] text-gold-500 uppercase tracking-widest mb-1">
//                                 Confirmation
//                               </p>
//                               <p className="font-sans text-cream-200">
//                                 {booking.confirmationNumber || "—"}
//                               </p>
//                             </div>
//                             <div>
//                               <p className="font-mono text-[10px] text-gold-500 uppercase tracking-widest mb-1">
//                                 Téléphone
//                               </p>
//                               <p className="font-sans text-cream-200">
//                                 {booking.phone || "—"}
//                               </p>
//                             </div>
//                             <div>
//                               <p className="font-mono text-[10px] text-gold-500 uppercase tracking-widest mb-1">
//                                 Demandes spéciales
//                               </p>
//                               <p className="font-sans text-cream-200">
//                                 {booking.specialRequests || "Aucune"}
//                               </p>
//                             </div>
//                           </div>
//                         </td>
//                       </tr>
//                     )}
//                   </>
//                 ))}
//               </tbody>
//             </table>
//             {bookings.length === 0 && (
//               <p className="font-sans text-sm text-obsidian-500 text-center py-12">
//                 {t.admin.noBookings}
//               </p>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

"use client";

import { useState, Suspense } from "react";
import toast from "react-hot-toast";
import {
  useGetBookingsQuery,
  useUpdateBookingMutation,
} from "@/features/api/apiSlice";
import { Skeleton, Badge } from "@/components/ui";
import type { Booking } from "@/types";
import { useI18n } from "@/i18n/context";

const statusOptions = ["pending", "confirmed", "cancelled", "completed"];

const badgeVariant = (s: string) => {
  switch (s) {
    case "confirmed":
      return "success";
    case "pending":
      return "warning";
    case "cancelled":
      return "error";
    default:
      return "neutral";
  }
};

// Composant interne pour isoler la logique et permettre le Suspense si besoin
function BookingsTable() {
  const { t } = useI18n();
  const [statusFilter, setStatusFilter] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const { data, isLoading } = useGetBookingsQuery(
    statusFilter ? { status: statusFilter } : {},
  );
  const [updateBooking] = useUpdateBookingMutation();

  const bookings: Booking[] = data?.data?.bookings || [];
  const stats = (data?.data?.stats as any[]) || [];

  const totalRevenue = stats
    .filter((s) => s._id !== "cancelled")
    .reduce((acc, s) => acc + (s.totalRevenue || 0), 0);

  const handleStatusChange = async (id: string, status: string) => {
    try {
      await updateBooking({
        id,
        data: { status: status as Booking["status"] },
      }).unwrap();
      toast.success((t.admin as any)?.updateSuccess || "Statut mis à jour");
    } catch {
      toast.error((t.admin as any)?.updateError || "Échec de la mise à jour");
    }
  };

  return (
    <div>
      <div className="mb-8">
        <p className="section-label mb-2">{t.admin.managementLabel}</p>
        <h1 className="font-display text-4xl font-light text-cream-50">
          {t.admin.bookingsTitle}
        </h1>
        <div className="gold-divider" />
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {statusOptions.map((status) => {
          const stat = stats.find((s) => s._id === status);
          return (
            <div
              key={status}
              className="bg-obsidian-900 border border-obsidian-800 p-5"
            >
              <p className="font-display text-3xl font-light text-cream-50 mb-1">
                {stat?.count || 0}
              </p>
              <Badge variant={badgeVariant(status)}>{status}</Badge>
            </div>
          );
        })}
      </div>

      {/* Revenu Total */}
      <div className="bg-obsidian-900 border border-gold-500/20 p-5 mb-8">
        <p className="font-mono text-[10px] text-gold-500 tracking-widest uppercase mb-1">
          {t.admin.totalRevenue}
        </p>
        <p className="font-display text-4xl font-light text-gold-400">
          ${totalRevenue.toLocaleString()}
        </p>
      </div>

      {/* Filtres */}
      <div className="flex flex-wrap gap-2 mb-6">
        {["", ...statusOptions].map((s) => (
          <button
            key={s}
            onClick={() => setStatusFilter(s)}
            className={`font-mono text-[10px] tracking-widest uppercase px-4 py-2 border transition-all ${
              statusFilter === s
                ? "border-gold-500 bg-gold-500/10 text-gold-400"
                : "border-obsidian-700 text-obsidian-400 hover:border-obsidian-500"
            }`}
          >
            {s || t.admin.all}
          </button>
        ))}
      </div>

      {/* Table des réservations */}
      <div className="bg-obsidian-900 border border-obsidian-800 overflow-hidden">
        {isLoading ? (
          <div className="p-6 space-y-3">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="h-14 w-full bg-obsidian-800" />
            ))}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-obsidian-700 text-left">
                  {[
                    t.admin.guest,
                    t.admin.room,
                    t.admin.dates,
                    t.admin.guests,
                    t.admin.totalRev,
                    t.admin.status,
                    t.admin.actions,
                  ].map((h) => (
                    <th
                      key={h}
                      className="font-mono text-[10px] tracking-widest text-obsidian-400 uppercase px-5 py-4"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking) => (
                  <React.Fragment key={booking._id}>
                    <tr
                      className="border-b border-obsidian-800 hover:bg-obsidian-800/50 transition-colors cursor-pointer"
                      onClick={() =>
                        setExpandedId(
                          expandedId === booking._id ? null : booking._id,
                        )
                      }
                    >
                      <td className="px-5 py-4">
                        <p className="font-sans text-sm text-cream-100">
                          {booking.firstName} {booking.lastName}
                        </p>
                        <p className="font-mono text-[10px] text-obsidian-400">
                          {booking.email}
                        </p>
                      </td>
                      <td className="px-5 py-4">
                        <p className="font-sans text-sm text-cream-200">
                          {booking.roomTitle}
                        </p>
                      </td>
                      <td className="px-5 py-4">
                        <p className="font-mono text-[10px] text-obsidian-300">
                          {new Date(booking.checkIn).toLocaleDateString()} –{" "}
                          {new Date(booking.checkOut).toLocaleDateString()}
                        </p>
                      </td>
                      <td className="px-5 py-4">
                        <p className="font-mono text-[10px] text-obsidian-300">
                          {booking.guests?.adults}A{" "}
                          {booking.guests?.children > 0
                            ? `${booking.guests.children}C`
                            : ""}
                        </p>
                      </td>
                      <td className="px-5 py-4">
                        <p className="font-display text-lg font-light text-gold-400">
                          {booking.totalPrice
                            ? `$${booking.totalPrice.toLocaleString()}`
                            : "—"}
                        </p>
                      </td>
                      <td className="px-5 py-4">
                        <Badge variant={badgeVariant(booking.status)}>
                          {booking.status}
                        </Badge>
                      </td>
                      <td className="px-5 py-4">
                        <select
                          value={booking.status}
                          onChange={(e) => {
                            e.stopPropagation();
                            handleStatusChange(booking._id, e.target.value);
                          }}
                          onClick={(e) => e.stopPropagation()}
                          className="bg-obsidian-800 border border-obsidian-700 text-cream-100 font-mono text-[10px] px-2 py-1.5 focus:outline-none focus:border-gold-500"
                        >
                          {statusOptions.map((s) => (
                            <option key={s} value={s}>
                              {s}
                            </option>
                          ))}
                        </select>
                      </td>
                    </tr>
                    {expandedId === booking._id && (
                      <tr className="bg-obsidian-800/40 border-b border-obsidian-800">
                        <td colSpan={7} className="px-5 py-6">
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                            <div>
                              <p className="font-mono text-[10px] text-gold-500 uppercase tracking-widest mb-2">
                                Confirmation
                              </p>
                              <p className="font-sans text-cream-200">
                                {booking.confirmationNumber || "—"}
                              </p>
                            </div>
                            <div>
                              <p className="font-mono text-[10px] text-gold-500 uppercase tracking-widest mb-2">
                                Téléphone
                              </p>
                              <p className="font-sans text-cream-200">
                                {booking.phone || "—"}
                              </p>
                            </div>
                            <div>
                              <p className="font-mono text-[10px] text-gold-500 uppercase tracking-widest mb-2">
                                Demandes spéciales
                              </p>
                              <p className="font-sans text-cream-200 italic">
                                {booking.specialRequests ||
                                  "Aucune demande particulière"}
                              </p>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
            {bookings.length === 0 && (
              <div className="text-center py-20">
                <p className="font-sans text-sm text-obsidian-500">
                  {t.admin.noBookings}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// Export avec Suspense pour éviter les erreurs de build Next.js
export default function AdminBookingsPage() {
  return (
    <Suspense
      fallback={
        <div className="p-10 text-gold-500 font-mono">
          Loading Admin Panel...
        </div>
      }
    >
      <BookingsTable />
    </Suspense>
  );
}

import React from "react"; // Nécessaire pour React.Fragment
