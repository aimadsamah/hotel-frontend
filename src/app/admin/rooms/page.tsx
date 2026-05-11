"use client";
import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import { Plus, Pencil, Trash2, X, Check, DollarSign, Eye } from "lucide-react";
import {
  useGetRoomsQuery,
  useCreateRoomMutation,
  useUpdateRoomMutation,
  useDeleteRoomMutation,
} from "@/features/api/apiSlice";
import { Skeleton, Badge } from "@/components/ui";
import type { Room } from "@/types";
import { useI18n } from "@/i18n/context";

const EMPTY_FORM = {
  title: "",
  description: "",
  shortDescription: "",
  price: "",
  category: "Standard",
  amenities: "",
  size: "",
  beds: "",
  occupancy: "2",
  view: "",
  floor: "",
  imageUrl: "",
  imageUrl2: "",
  imageUrl3: "",
  isAvailable: true,
  isFeatured: false,
};

export default function AdminRoomsPage() {
  const { t } = useI18n();
  const { data, isLoading } = useGetRoomsQuery({});
  const [createRoom, { isLoading: creating }] = useCreateRoomMutation();
  const [updateRoom, { isLoading: updating }] = useUpdateRoomMutation();
  const [deleteRoom] = useDeleteRoomMutation();

  const rooms = data?.data?.rooms || [];
  const [showModal, setShowModal] = useState(false);
  const [editingRoom, setEditingRoom] = useState<Room | null>(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const openCreate = () => {
    setEditingRoom(null);
    setForm(EMPTY_FORM);
    setShowModal(true);
  };
  const openEdit = (room: Room) => {
    setEditingRoom(room);
    setForm({
      title: room.title,
      description: room.description,
      shortDescription: room.shortDescription || "",
      price: String(room.price),
      category: room.category,
      amenities: room.amenities.join(", "),
      size: room.features?.size || "",
      beds: room.features?.beds || "",
      occupancy: String(room.features?.occupancy || 2),
      view: room.features?.view || "",
      floor: room.features?.floor || "",
      imageUrl: room.images[0]?.url || "",
      imageUrl2: room.images[1]?.url || "",
      imageUrl3: room.images[2]?.url || "",
      isAvailable: room.isAvailable,
      isFeatured: room.isFeatured,
    });
    setShowModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      title: form.title,
      description: form.description,
      shortDescription: form.shortDescription,
      price: Number(form.price),
      category: form.category as Room["category"],
      amenities: form.amenities
        .split(",")
        .map((a) => a.trim())
        .filter(Boolean),
      features: {
        size: form.size,
        beds: form.beds,
        occupancy: Number(form.occupancy),
        view: form.view,
        floor: form.floor,
      },
      images: [form.imageUrl, form.imageUrl2, form.imageUrl3]
        .filter(Boolean)
        .map((url, i) => ({ url, alt: `Image ${i + 1}` })),
      isAvailable: form.isAvailable,
      isFeatured: form.isFeatured,
    };
    try {
      if (editingRoom) {
        await updateRoom({ id: editingRoom._id, data: payload }).unwrap();
        toast.success(t.admin.updateRoom);
      } else {
        await createRoom(payload).unwrap();
        toast.success(t.admin.createRoom);
      }
      setShowModal(false);
    } catch (err: unknown) {
      const error = err as { data?: { message?: string } };
      toast.error(error?.data?.message || "Erreur");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteRoom(id).unwrap();
      toast.success(t.admin.delete);
      setDeleteConfirm(null);
    } catch {
      toast.error("Échec");
    }
  };

  const inputClass =
    "w-full bg-obsidian-800 border border-obsidian-700 text-cream-50 font-sans text-sm py-2.5 px-3 focus:outline-none focus:border-gold-500 transition-colors";
  const labelClass =
    "font-mono text-[10px] text-gold-500 tracking-widest uppercase block mb-1.5";

  return (
    <div>
      <div className="flex items-start justify-between mb-8">
        <div>
          <p className="section-label mb-2">{t.admin.managementLabel}</p>
          <h1 className="font-display text-4xl font-light text-cream-50">
            {t.admin.roomsTitle}
          </h1>
          <div className="gold-divider" />
        </div>
        <button onClick={openCreate} className="btn-primary">
          <Plus className="w-4 h-4" /> {t.admin.addRoom}
        </button>
      </div>

      <div className="bg-obsidian-900 border border-obsidian-800 overflow-hidden">
        {isLoading ? (
          <div className="p-6 space-y-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-16" />
            ))}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-obsidian-700">
                  {[
                    t.admin.room,
                    t.admin.category,
                    `${t.booking.ratePerNight}`,
                    t.admin.status,
                    t.admin.featured,
                    t.admin.actions,
                  ].map((h) => (
                    <th
                      key={h}
                      className="font-mono text-[10px] tracking-widest text-obsidian-400 uppercase text-left px-5 py-4"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rooms.map((room) => (
                  <tr
                    key={room._id}
                    className="border-b border-obsidian-800 hover:bg-obsidian-800/50 transition-colors"
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="relative w-12 h-9 overflow-hidden shrink-0">
                          <Image
                            src={
                              room.images[0]?.url ||
                              "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=200"
                            }
                            alt={room.title}
                            fill
                            className="object-cover"
                            sizes="48px"
                          />
                        </div>
                        <div>
                          <p className="font-sans text-sm text-cream-100 font-medium">
                            {room.title}
                          </p>
                          <p className="font-mono text-[10px] text-obsidian-500">
                            {room.features?.size}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <Badge variant="gold">
                        {t.roomData.categories[
                          room.category as keyof typeof t.roomData.categories
                        ] || room.category}
                      </Badge>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-1 text-gold-400">
                        <DollarSign className="w-3.5 h-3.5" />
                        <span className="font-display text-xl font-light">
                          {room.price.toLocaleString()}
                        </span>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <Badge variant={room.isAvailable ? "success" : "error"}>
                        {room.isAvailable
                          ? t.admin.available
                          : t.admin.unavailable}
                      </Badge>
                    </td>
                    <td className="px-5 py-4">
                      {room.isFeatured ? (
                        <Check className="w-4 h-4 text-gold-400" />
                      ) : (
                        <span className="font-mono text-[10px] text-obsidian-600">
                          —
                        </span>
                      )}
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <a
                          href={`/rooms/${room.slug}`}
                          target="_blank"
                          className="p-1.5 text-obsidian-400 hover:text-cream-100 transition-colors"
                        >
                          <Eye className="w-4 h-4" />
                        </a>
                        <button
                          onClick={() => openEdit(room)}
                          className="p-1.5 text-obsidian-400 hover:text-gold-400 transition-colors"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        {deleteConfirm === room._id ? (
                          <div className="flex gap-1">
                            <button
                              onClick={() => handleDelete(room._id)}
                              className="px-2 py-1 bg-red-500/20 text-red-400 font-mono text-[10px] hover:bg-red-500/30"
                            >
                              {t.admin.confirm}
                            </button>
                            <button
                              onClick={() => setDeleteConfirm(null)}
                              className="px-2 py-1 bg-obsidian-700 text-obsidian-300 font-mono text-[10px]"
                            >
                              {t.admin.cancel}
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => setDeleteConfirm(room._id)}
                            className="p-1.5 text-obsidian-400 hover:text-red-400 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {rooms.length === 0 && (
              <p className="font-sans text-sm text-obsidian-500 text-center py-12">
                {t.admin.noBookings}
              </p>
            )}
          </div>
        )}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-obsidian-950/80 flex items-start justify-center overflow-y-auto py-8 px-4"
          >
            <motion.div
              initial={{ scale: 0.97, y: 10 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.97 }}
              className="bg-obsidian-900 border border-obsidian-800 w-full max-w-2xl"
            >
              <div className="flex items-center justify-between p-6 border-b border-obsidian-800">
                <h2 className="font-display text-2xl font-light text-cream-50">
                  {editingRoom ? t.admin.editRoom : t.admin.addRoom}
                </h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-obsidian-400 hover:text-cream-50"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <form onSubmit={handleSubmit} className="p-6 space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className={labelClass}>{t.admin.roomTitle}</label>
                    <input
                      value={form.title}
                      onChange={(e) =>
                        setForm({ ...form, title: e.target.value })
                      }
                      required
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>{t.admin.category}</label>
                    <select
                      value={form.category}
                      onChange={(e) =>
                        setForm({ ...form, category: e.target.value })
                      }
                      className={inputClass}
                    >
                      {[
                        "Standard",
                        "Deluxe",
                        "Suite",
                        "Presidential",
                        "Villa",
                      ].map((c) => (
                        <option key={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className={labelClass}>{t.admin.priceNight}</label>
                    <input
                      value={form.price}
                      onChange={(e) =>
                        setForm({ ...form, price: e.target.value })
                      }
                      required
                      type="number"
                      className={inputClass}
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className={labelClass}>{t.admin.shortDesc}</label>
                    <input
                      value={form.shortDescription}
                      onChange={(e) =>
                        setForm({ ...form, shortDescription: e.target.value })
                      }
                      className={inputClass}
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className={labelClass}>{t.admin.fullDesc}</label>
                    <textarea
                      value={form.description}
                      onChange={(e) =>
                        setForm({ ...form, description: e.target.value })
                      }
                      required
                      rows={4}
                      className={`${inputClass} resize-none`}
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className={labelClass}>{t.admin.amenities}</label>
                    <input
                      value={form.amenities}
                      onChange={(e) =>
                        setForm({ ...form, amenities: e.target.value })
                      }
                      className={inputClass}
                    />
                  </div>
                  {[
                    ["size", t.admin.size],
                    ["beds", t.admin.beds],
                    ["view", t.admin.view],
                    ["floor", t.admin.floor],
                  ].map(([field, label]) => (
                    <div key={field}>
                      <label className={labelClass}>{label}</label>
                      <input
                        value={(form as any)[field]}
                        onChange={(e) =>
                          setForm({ ...form, [field]: e.target.value })
                        }
                        className={inputClass}
                      />
                    </div>
                  ))}
                  <div>
                    <label className={labelClass}>{t.admin.maxOccupancy}</label>
                    <input
                      value={form.occupancy}
                      onChange={(e) =>
                        setForm({ ...form, occupancy: e.target.value })
                      }
                      type="number"
                      className={inputClass}
                    />
                  </div>
                  {[
                    ["imageUrl", t.admin.imageUrl1],
                    ["imageUrl2", t.admin.imageUrl2],
                    ["imageUrl3", t.admin.imageUrl3],
                  ].map(([field, label]) => (
                    <div key={field} className="sm:col-span-2">
                      <label className={labelClass}>{label}</label>
                      <input
                        value={(form as Record<string, any>)[field]}
                        onChange={(e) =>
                          setForm({ ...form, [field]: e.target.value })
                        }
                        className={inputClass}
                        placeholder="https://..."
                      />
                    </div>
                  ))}
                  <div className="flex items-center gap-6">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={form.isAvailable}
                        onChange={(e) =>
                          setForm({ ...form, isAvailable: e.target.checked })
                        }
                        className="accent-gold-500"
                      />
                      <span className="font-sans text-sm text-cream-100">
                        {t.admin.available}
                      </span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={form.isFeatured}
                        onChange={(e) =>
                          setForm({ ...form, isFeatured: e.target.checked })
                        }
                        className="accent-gold-500"
                      />
                      <span className="font-sans text-sm text-cream-100">
                        {t.admin.featured}
                      </span>
                    </label>
                  </div>
                </div>
                <div className="flex gap-3 pt-2">
                  <button
                    type="submit"
                    disabled={creating || updating}
                    className="btn-primary disabled:opacity-50"
                  >
                    {creating || updating
                      ? t.admin.saving
                      : editingRoom
                        ? t.admin.updateRoom
                        : t.admin.createRoom}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="btn-outline"
                  >
                    {t.admin.cancel}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
