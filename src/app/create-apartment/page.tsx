"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { 
  ArrowLeft, 
  Upload, 
  Plus, 
  Trash2, 
  Loader2, 
  CheckCircle2,
  AlertCircle,
  Building2,
  MapPin,
  DollarSign,
  FileText,
  Tag,
  CreditCard
} from "lucide-react";
import Image from "next/image";
import api from "@/lib/axiosInstance";
import { useAdminApartments } from "@/hooks/useAdminApartments";
import { isAuthenticated } from "@/utils/isAuthenticated";

interface Category {
  id: string;
  name: string;
}

export default function CreateApartmentPage() {
  const router = useRouter();
  const { createApartment, loading: creating, error: createError } = useAdminApartments();
  
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    price: "",
    paymentPlan: "MONTHLY",
    apartmentCategoryId: "",
    features: [""]
  });

  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await api.get("/apartment-categories");
        setCategories(res.data?.data?.categories || []);
      } catch (err) {
        console.error("Failed to fetch categories", err);
      } finally {
        setCategoriesLoading(false);
      }
    };
    fetchCategories();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFeatureChange = (index: number, value: string) => {
    const newFeatures = [...formData.features];
    newFeatures[index] = value;
    setFormData(prev => ({ ...prev, features: newFeatures }));
  };

  const addFeature = () => {
    setFormData(prev => ({ ...prev, features: [...prev.features, ""] }));
  };

  const removeFeature = (index: number) => {
    const newFeatures = formData.features.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, features: newFeatures.length ? newFeatures : [""] }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setSelectedFiles(prev => [...prev, ...files]);
      
      const newPreviews = files.map(file => URL.createObjectURL(file));
      setPreviews(prev => [...prev, ...newPreviews]);
    }
  };

  const removeFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
    setPreviews(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Use shared util to verify authentication before submitting
    if (!isAuthenticated()) {
      try {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
      } catch {}
      router.push("/login");
      return;
    }
    
    // Simple validation
    if (!formData.title || !formData.description || !formData.location || !formData.price || !formData.apartmentCategoryId) {
      return;
    }

    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("location", formData.location);
    data.append("price", formData.price);
    data.append("paymentPlan", formData.paymentPlan);
    data.append("apartmentCategoryId", formData.apartmentCategoryId);
    
    formData.features.filter(f => f.trim() !== "").forEach(feature => {
      data.append("features", feature);
    });

    selectedFiles.forEach(file => {
      data.append("gallery", file);
    });

    try {
      await createApartment(data);
      setSuccess(true);
      setTimeout(() => {
        router.push("/admin");
      }, 2000);
    } catch (err) {
      console.error("Submission failed", err);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 mt-16">
        <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full text-center space-y-4 border border-slate-100">
          <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-10 h-10 text-emerald-600" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900">Apartment Created!</h2>
          <p className="text-slate-600">The new apartment has been successfully listed. Redirecting to dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 mt-16">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <button 
              onClick={() => router.back()}
              className="group flex items-center text-slate-500 hover:text-slate-800 transition-colors mb-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              Back to Dashboard
            </button>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Create New Apartment</h1>
            <p className="mt-2 text-slate-600">Fill in the details below to list a new property.</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Main Info Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50">
              <h2 className="text-lg font-semibold text-slate-800 flex items-center">
                <Building2 className="w-5 h-5 mr-2 text-green-400" />
                Property Details
              </h2>
            </div>
            <div className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1 items-center">
                  <FileText className="w-4 h-4 mr-2 text-slate-400" />
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  required
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="e.g. Luxury 3 Bedroom Penthouse"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none bg-slate-50/30 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1 items-center">
                  <FileText className="w-4 h-4 mr-2 text-slate-400" />
                  Description
                </label>
                <textarea
                  name="description"
                  required
                  rows={4}
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Describe the property, amenities, and surroundings..."
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none bg-slate-50/30 focus:bg-white resize-none"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1 items-center">
                    <MapPin className="w-4 h-4 mr-2 text-slate-400" />
                    Location
                  </label>
                  <input
                    type="text"
                    name="location"
                    required
                    value={formData.location}
                    onChange={handleInputChange}
                    placeholder="e.g. Victoria Island, Lagos"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none bg-slate-50/30 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1 items-center">
                    <Tag className="w-4 h-4 mr-2 text-slate-400" />
                    Category
                  </label>
                  <select
                    name="apartmentCategoryId"
                    required
                    value={formData.apartmentCategoryId}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none bg-slate-50/30 focus:bg-white appearance-none"
                  >
                    <option value="">Select Category</option>
                    {categories.map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1 items-center">
                    <DollarSign className="w-4 h-4 mr-2 text-slate-400" />
                    Price
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      name="price"
                      required
                      value={formData.price}
                      onChange={handleInputChange}
                      placeholder="0.00"
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none bg-slate-50/30 focus:bg-white"
                    />
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">₦</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1 items-center">
                    <CreditCard className="w-4 h-4 mr-2 text-slate-400" />
                    Payment Plan
                  </label>
                  <div className="flex bg-slate-100 p-1 rounded-xl">
                    <button
                      type="button"
                      onClick={() => setFormData(p => ({ ...p, paymentPlan: "ANNUAL" }))}
                      className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${formData.paymentPlan === "ANNUAL" ? "bg-white text-green-400 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
                    >
                      ANNUAL
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormData(p => ({ ...p, paymentPlan: "MONTHLY" }))}
                      className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${formData.paymentPlan === "MONTHLY" ? "bg-white text-green-400 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
                    >
                      MONTHLY
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Features Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-slate-800 flex items-center">
                <Plus className="w-5 h-5 mr-2 text-green-400" />
                Features & Amenities
              </h2>
              <button
                type="button"
                onClick={addFeature}
                className="text-xs font-bold text-green-400 uppercase tracking-wider hover:text-green-500 transition-colors"
              >
                + Add Feature
              </button>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {formData.features.map((feature, index) => (
                  <div key={index} className="relative group">
                    <input
                      type="text"
                      value={feature}
                      onChange={(e) => handleFeatureChange(index, e.target.value)}
                      placeholder="e.g. Swimming Pool"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none bg-slate-50/30 focus:bg-white pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => removeFeature(index)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-300 hover:text-rose-500 transition-colors opacity-0 group-hover:opacity-100"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Media Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50">
              <h2 className="text-lg font-semibold text-slate-800 flex items-center">
                <Upload className="w-5 h-5 mr-2 text-green-400" />
                Gallery & Media
              </h2>
            </div>
            <div className="p-6">
              <div className="border-2 border-dashed border-slate-200 rounded-2xl p-8 transition-colors hover:border-green-300 bg-slate-50 group">
                <input
                  type="file"
                  multiple
                  accept="image/*,video/*"
                  onChange={handleFileChange}
                  id="file-upload"
                  className="hidden"
                />
                <label
                  htmlFor="file-upload"
                  className="flex flex-col items-center justify-center cursor-pointer"
                >
                  <div className="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform border border-slate-100">
                    <Upload className="w-6 h-6 text-green-400" />
                  </div>
                  <p className="text-sm font-semibold text-slate-900">Click to upload or drag and drop</p>
                  <p className="text-xs text-slate-500 mt-1">Images or videos up to 10MB each</p>
                </label>
              </div>

              {previews.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-8">
                  {previews.map((url, i) => (
                    <div key={i} className="relative aspect-square group rounded-xl overflow-hidden border border-slate-200 shadow-sm">
                      <Image
                        src={url}
                        alt="Preview"
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <button
                          type="button"
                          onClick={() => removeFile(i)}
                          className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-rose-500 transition-colors"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {createError && (
            <div className="p-4 bg-rose-50 border border-rose-100 rounded-xl flex items-start text-rose-800">
              <AlertCircle className="w-5 h-5 mr-3 flex-shrink-0 mt-0.5" />
              <p className="text-sm font-medium">{createError}</p>
            </div>
          )}

          <div className="flex items-center gap-4 pt-4">
            <button
              type="submit"
              disabled={creating}
              className="flex-1 bg-green-400 hover:bg-green-500 text-white font-bold py-4 px-6 rounded-2xl shadow-lg shadow-green-200 transition-all active:scale-[0.98] disabled:opacity-50 disabled:shadow-none flex items-center justify-center"
            >
              {creating ? (
                <>
                  <Loader2 className="animate-spin w-5 h-5 mr-2" />
                  Listing Property...
                </>
              ) : (
                "Publish Apartment Listing"
              )}
            </button>
            <button
              type="button"
              onClick={() => router.back()}
              className="px-8 py-4 bg-white border border-slate-200 text-slate-700 font-bold rounded-2xl hover:bg-slate-50 transition-all"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}