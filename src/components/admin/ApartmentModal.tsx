"use client";

import React, { useState } from "react";
import { X } from "lucide-react";
import Image from "next/image";
import { Apartment } from "@/lib/types";

export interface ApartmentFormData {
  title: string;
  description: string;
  location: string;
  price: number;
  paymentPlan: string;
  apartmentCategoryId: string;
  features: string[];
  gallery: string[]; // preview URLs only
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

const isVideo = (url: string) => {
  return /\.(mp4|webm|ogg|mov)$/i.test(url);
};

export default function ApartmentModal({
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
}: ApartmentModalProps) {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedFiles.length) {
      alert("Please upload at least one image");
      return;
    }

    const formData = new FormData();

    // ===============================
    // TEXT FIELDS
    // ===============================
    formData.append("title", form.title);
    formData.append("description", form.description);
    formData.append("location", form.location);
    formData.append("price", String(form.price));
    formData.append("paymentPlan", form.paymentPlan);
    formData.append("apartmentCategoryId", form.apartmentCategoryId);

    // publicIds = categoryId (as specified)
    formData.append("publicIds", form.apartmentCategoryId);

    // ===============================
    // FEATURES ARRAY
    // ===============================
    form.features.forEach((feature) => {
      formData.append("features[]", feature);
    });

    // ===============================
    // FILES
    // ===============================

    // First file = featuredImage
    formData.append("featuredImage", selectedFiles[0]);

    // Gallery (array)
    selectedFiles.forEach((file) => {
      formData.append("gallery[]", file);
    });

    await onSubmit(formData);

    onClose();
    setSelectedFiles([]);
    setForm({
      title: "",
      description: "",
      location: "",
      price: 0,
      paymentPlan: "ANNUAL",
      apartmentCategoryId: "",
      features: [],
      gallery: [],
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b">
          <h3 className="text-xl font-semibold">
            {editingApartment ? "Edit Apartment" : "Add New Apartment"}
          </h3>
          <button onClick={onClose}>
            <X className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="bg-red-100 text-red-700 p-3 rounded">
              {error}
            </div>
          )}

          {/* Title */}
          <input
            className="input"
            placeholder="Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
          />

          {/* Description */}
          <textarea
            className="input"
            rows={4}
            placeholder="Description"
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
            required
          />

          {/* Location & Price */}
          <div className="grid grid-cols-2 gap-4">
            <input
              className="input"
              placeholder="Location"
              value={form.location}
              onChange={(e) =>
                setForm({ ...form, location: e.target.value })
              }
              required
            />
            <input
              type="number"
              className="input"
              placeholder="Price"
              value={form.price}
              onChange={(e) =>
                setForm({ ...form, price: Number(e.target.value) })
              }
              required
            />
          </div>

          {/* Payment Plan */}
          <select
            className="input"
            value={form.paymentPlan}
            onChange={(e) =>
              setForm({ ...form, paymentPlan: e.target.value })
            }
          >
            <option value="ANNUAL">ANNUAL</option>
            <option value="MONTHLY">MONTHLY</option>
          </select>

          {/* Category */}
          <select
            className="input"
            value={form.apartmentCategoryId}
            onChange={(e) =>
              setForm({ ...form, apartmentCategoryId: e.target.value })
            }
            required
          >
            <option value="">Select category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>

          {/* Features */}
          <input
            className="input"
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
          />

          {/* File Upload */}
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={(e) => {
              const files = Array.from(e.target.files || []);
              if (!files.length) return;

              setSelectedFiles((prev) => [...prev, ...files]);

              const previews = files.map((file) =>
                URL.createObjectURL(file)
              );

              setForm((prev) => ({
                ...prev,
                gallery: [...prev.gallery, ...previews],
              }));

              e.target.value = "";
            }}
          />

          {/* Gallery Preview */}
          {form.gallery.length > 0 && (
            <div className="flex flex-wrap gap-3">
              {form.gallery.map((url, i) => (
                <div key={i} className="relative w-20 h-20">
                  <Image
                    src={url}
                    alt="preview"
                    fill
                    className="object-cover rounded"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setForm((prev) => ({
                        ...prev,
                        gallery: prev.gallery.filter((_, x) => x !== i),
                      }));
                      setSelectedFiles((prev) =>
                        prev.filter((_, x) => x !== i)
                      );
                    }}
                    className="absolute -top-2 -right-2 bg-red-500 text-white w-5 h-5 rounded-full text-xs"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="btn-secondary"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="btn-primary"
            >
              {loading ? "Saving..." : "Create Apartment"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}