"use client";
import React from "react";
import { X } from "lucide-react";
import Image from "next/image";
import { Apartment } from "@/lib/types";

export interface ApartmentFormData {
  title: string;
  description: string;
  location: string;
  price: string;
  paymentPlan: string;
  apartmentCategoryId: string;
  listingType: string;
  features: string;
  gallery: string;
  publicIds?: string;
}

interface ApartmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
  form: ApartmentFormData;
  setForm: React.Dispatch<React.SetStateAction<ApartmentFormData>>;
  error: string | null;
  loading: boolean;
  categories: { id: string; name: string }[];
  categoriesLoading: boolean;
  categoriesError: string | null;
  editingApartment: Apartment | null;
}

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
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b">
          <h3 className="text-xl font-semibold">
            {editingApartment ? "Edit Apartment" : "Add New Apartment"}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        <form onSubmit={onSubmit} className="p-6 space-y-4">
          {error && (
            <div className="p-3 mb-4 text-sm text-red-700 bg-red-100 rounded-lg">
              {error}
            </div>
          )}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              type="text"
              required
              value={form.title}
              onChange={(e) =>
                setForm({
                  ...form,
                  title: e.target.value,
                })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              required
              rows={4}
              value={form.description}
              onChange={(e) =>
                setForm({
                  ...form,
                  description: e.target.value,
                })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Location
              </label>
              <input
                type="text"
                required
                value={form.location}
                onChange={(e) =>
                  setForm({
                    ...form,
                    location: e.target.value,
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Price
              </label>
              <input
                type="number"
                required
                value={form.price}
                onChange={(e) =>
                  setForm({
                    ...form,
                    price: e.target.value,
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Payment Plan
              </label>
              <select
                required
                value={form.paymentPlan}
                onChange={(e) =>
                  setForm({
                    ...form,
                    paymentPlan: e.target.value,
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="ANNUAL">ANNUAL</option>
                <option value="MONTHLY">MONTHLY</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Apartment Category
            </label>
            <select
              required
              value={form.apartmentCategoryId}
              onChange={(e) =>
                setForm({
                  ...form,
                  apartmentCategoryId: e.target.value,
                })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="">Select a category</option>
              {categoriesLoading && (
                <option disabled>Loading categories...</option>
              )}
              {categoriesError && (
                <option disabled>{categoriesError}</option>
              )}
              {!categoriesLoading &&
                !categoriesError &&
                categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Features{" "}
              <span className="text-gray-500 text-xs">
                (comma-separated)
              </span>
            </label>
            <input
              type="text"
              value={form.features}
              onChange={(e) =>
                setForm({
                  ...form,
                  features: e.target.value,
                })
              }
              placeholder="e.g., Bedrooms:3, Pool, WiFi"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Gallery Images
            </label>
            <textarea
              rows={3}
              value={form.gallery}
              onChange={(e) =>
                setForm({
                  ...form,
                  gallery: e.target.value,
                })
              }
              placeholder="Enter image URLs separated by commas"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent mb-2"
            />

            {/* Image previews */}
            <div className="flex flex-wrap gap-2 mt-2">
              {form.gallery
                .split(",")
                .filter((url) => url.trim())
                .map((url, i) => (
                  <div key={i} className="relative group">
                    <div className="h-20 w-20 relative">
                      <Image
                        src={url.trim()}
                        alt={`Preview ${i}`}
                        fill
                        className="object-cover rounded border border-gray-200"
                        onError={() => {
                          const urls = form.gallery
                            .split(",")
                            .filter((u) => u.trim() !== url.trim());
                          setForm({
                            ...form,
                            gallery: urls.join(","),
                          });
                        }}
                      />
                    </div>
                  </div>
                ))}
            </div>
          </div>
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
            >
              {loading ? "Creating..." : "Create Apartment"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
