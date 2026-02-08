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
  gallery: string[];
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

// Helper function to detect if URL is a video
const isVideo = (url: string): boolean => {
  const videoExtensions = ['.mp4', '.webm', '.ogg', '.mov', '.avi', '.wmv', '.flv', '.mkv'];
  return videoExtensions.some(ext => url.toLowerCase().includes(ext));
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

  try {
    const formData = new FormData();

    // Append text fields
    formData.append("title", form.title);
    formData.append("description", form.description);
    formData.append("location", form.location);
    formData.append("price", form.price.toString());
    formData.append("paymentPlan", form.paymentPlan);
    formData.append("apartmentCategoryId", form.apartmentCategoryId);

    // Append features
    form.features.forEach((feature) => {
      formData.append("features", feature);
    });

    // Append gallery files
    selectedFiles.forEach((file) => {
      formData.append("gallery", file);
    });

    
    // Debug log
    console.log("Files:", selectedFiles);

    await onSubmit(formData);

    onClose();
    setSelectedFiles([]);
  } catch (error) {
    console.error("Error creating apartment:", error);
  }
};


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
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
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
                value={form.price.toString()}
                onChange={(e) =>
                  setForm({
                    ...form,
                    price: parseFloat(e.target.value) || 0,
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
              value={form.features.join(',')}
              onChange={(e) =>
                setForm({
                  ...form,
                  features: e.target.value.split(',').map(f => f.trim()).filter(f => f),
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
            <div className="space-y-2">
              <input
                type="file"
                multiple
                accept="image/*,video/*"
                onChange={(e) => {
                  const files = Array.from(e.target.files || []);
                  if (files.length === 0) return;

                  // Store actual files for upload
                  setSelectedFiles(prev => [...prev, ...files]);
                  
                  // Create preview URLs for display
                  const previewUrls = files.map(file => URL.createObjectURL(file));
                  
                  setForm(prev => ({
                    ...prev,
                    gallery: [...prev.gallery, ...previewUrls]
                  }));

                  // Reset the input
                  e.target.value = '';
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              <p className="text-xs text-gray-500">
                Select multiple images and videos from your device
              </p>
            </div>

            {/* Image previews */}
            {form.gallery.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {form.gallery.map((url, i) => (
                  <div key={i} className="relative group">
                    <div className="h-20 w-20 relative">
                      {isVideo(url.trim()) ? (
                        <video
                          src={url.trim()}
                          className="w-full h-full object-cover rounded border border-gray-200"
                          muted
                          preload="metadata"
                          aria-label={`Video preview ${i}`}
                        />
                      ) : (
                        <Image
                          src={url.trim()}
                          alt={`Preview ${i}`}
                          fill
                          className="object-cover rounded border border-gray-200"
                          onError={() => {
                            const newGallery = form.gallery.filter((_, index) => index !== i);
                            setForm({
                              ...form,
                              gallery: newGallery,
                            });
                          }}
                        />
                      )}
                      {isVideo(url.trim()) && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/30 rounded">
                          <div className="w-6 h-6 bg-white/80 rounded-full flex items-center justify-center">
                            <div className="w-0 h-0 border-l-[6px] border-l-gray-800 border-y-[3px] border-y-transparent ml-0.5"></div>
                          </div>
                        </div>
                      )}
                      {/* Remove button */}
                      <button
                        type="button"
                        onClick={() => {
                          const newGallery = form.gallery.filter((_, index) => index !== i);
                          setForm({
                            ...form,
                            gallery: newGallery,
                          });
                          
                          // Also remove from selectedFiles if it's a newly added file
                          if (i >= form.gallery.length - selectedFiles.length) {
                            const fileIndex = i - (form.gallery.length - selectedFiles.length);
                            setSelectedFiles(prev => prev.filter((_, index) => index !== fileIndex));
                          }
                        }}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-600"
                      >
                        ×
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
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
