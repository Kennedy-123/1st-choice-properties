"use client";

import React, { useState } from "react";
import { X } from "lucide-react";
import { Apartment } from "@/lib/types";

export interface ApartmentFormData {
  title: string;
  description: string;
  location: string;
  price: number;
  paymentPlan: string;
  apartmentCategoryId: string;
  features: string[];
  gallery: string[]; // existing URLs only
}

interface PreviewItem {
  url: string;
  type: "existing" | "new";
}

interface ApartmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (formData: FormData) => Promise<void>;
  form: ApartmentFormData;
  setForm: React.Dispatch<React.SetStateAction<ApartmentFormData>>;
  error: string | null;
  loading: boolean;
  categories: { id: string; name: string }[];
  categoriesLoading: boolean;
  categoriesError: string | null;
  editingApartment: Apartment | null;
}

const isVideo = (url: string) =>
  /\.(mp4|webm|ogg|mov|avi|mkv)$/i.test(url);

export default function ApartmentModal(props: ApartmentModalProps) {
  const {
    isOpen,
    onClose,
    onSubmit,
    form,
    setForm,
    error,
    loading,
    categories,
    categoriesLoading,
    categoriesError,
    editingApartment,
  } = props;

  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<PreviewItem[]>(
    form.gallery.map((url) => ({ url, type: "existing" }))
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const fd = new FormData();

    fd.append("title", form.title);
    fd.append("description", form.description);
    fd.append("location", form.location);
    fd.append("price", String(form.price));
    fd.append("paymentPlan", form.paymentPlan);
    fd.append("apartmentCategoryId", form.apartmentCategoryId);

    form.features.forEach((f) => fd.append("features", f));
    files.forEach((file) => fd.append("gallery", file));

    await onSubmit(fd);

    onClose();
    setFiles([]);
    setPreviews([]);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur bg-black/40 p-4">
      <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <header className="flex justify-between items-center p-6 border-b">
          <h3 className="text-xl font-semibold">
            {editingApartment ? "Edit Apartment" : "Add Apartment"}
          </h3>
          <button onClick={onClose}>
            <X />
          </button>
        </header>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="text-sm bg-red-100 text-red-700 p-3 rounded">
              {error}
            </div>
          )}

          {/* title */}
          <input
            required
            placeholder="Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="input"
          />

          {/* description */}
          <textarea
            required
            rows={4}
            placeholder="Description"
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
            className="input"
          />

          {/* price + location */}
          <div className="grid grid-cols-2 gap-4">
            <input
              required
              placeholder="Location"
              value={form.location}
              onChange={(e) =>
                setForm({ ...form, location: e.target.value })
              }
              className="input"
            />
            <input
              required
              type="number"
              placeholder="Price"
              value={form.price}
              onChange={(e) =>
                setForm({ ...form, price: Number(e.target.value) })
              }
              className="input"
            />
          </div>

          {/* category */}
          <select
            required
            value={form.apartmentCategoryId}
            onChange={(e) =>
              setForm({ ...form, apartmentCategoryId: e.target.value })
            }
            className="input"
          >
            <option value="">Select category</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>

          {/* features */}
          <input
            placeholder="Features (comma separated)"
            value={form.features.join(",")}
            onChange={(e) =>
              setForm({
                ...form,
                features: e.target.value
                  .split(",")
                  .map((f) => f.trim())
                  .filter(Boolean),
              })
            }
            className="input"
          />

          {/* upload */}
          <input
            type="file"
            multiple
            accept="image/*,video/*"
            onChange={(e) => {
              const selected = Array.from(e.target.files || []);
              if (!selected.length) return;

              const newPreviews = selected.map((file) => ({
                url: URL.createObjectURL(file),
                type: "new" as const,
              }));

              setFiles((prev) => [...prev, ...selected]);
              setPreviews((prev) => [...prev, ...newPreviews]);
              e.target.value = "";
            }}
          />

          {/* previews */}
          {previews.length > 0 && (
            <div className="flex flex-wrap gap-3">
              {previews.map((item, i) => (
                <div key={i} className="relative w-20 h-20">
                  {isVideo(item.url) ? (
                    <video
                      src={item.url}
                      className="w-full h-full object-cover rounded"
                      muted
                    />
                  ) : (
                    <img
                      src={item.url}
                      className="w-full h-full object-cover rounded"
                      alt=""
                    />
                  )}

                  <button
                    type="button"
                    onClick={() => {
                      if (item.type === "existing") {
                        setForm({
                          ...form,
                          gallery: form.gallery.filter(
                            (url) => url !== item.url
                          ),
                        });
                      } else {
                        const index = previews
                          .filter((p) => p.type === "new")
                          .indexOf(item);
                        setFiles((f) =>
                          f.filter((_, idx) => idx !== index)
                        );
                        URL.revokeObjectURL(item.url);
                      }
                      setPreviews((p) => p.filter((_, idx) => idx !== i));
                    }}
                    className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-5 h-5"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* actions */}
          <div className="flex gap-3 pt-4">
            <button type="button" onClick={onClose} className="btn-outline">
              Cancel
            </button>
            <button type="submit" disabled={loading} className="btn-primary">
              {loading ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}