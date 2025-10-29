"use client";

import React, { useState } from "react";
import { useAdminApartments } from "@/hooks/useAdminApartments";
import { useAdminCategories } from "@/hooks/useAdminCategories";
import { Apartment } from "@/lib/types";
import { useAdminFAQs } from "@/hooks/useAdminFAQs";
import { useAdminBookings } from "@/hooks/useAdminBookings";
import { useApartments } from "@/hooks/useApartments";
import { Home, FolderOpen, HelpCircle, Calendar, X } from "lucide-react";
import ApartmentsTab from "@/components/admin/ApartmentsTab";
import CategoriesTab from "@/components/admin/CategoriesTab";
import FAQsTab from "@/components/admin/FAQsTab";
import BookingsTab from "@/components/admin/BookingsTab";
import CategoryModal from "@/components/admin/CategoryModal";
import FAQModal from "@/components/admin/FAQModal";
import Image from 'next/image';

type TabType = "apartments" | "categories" | "faqs" | "bookings";

interface ApartmentFormData {
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

interface CategoryFormData {
  name: string;
}

interface FAQFormData {
  question: string;
  answer: string;
}

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<TabType>("apartments");
  const [showApartmentModal, setShowApartmentModal] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  
  // Use the useApartments hook to fetch all apartments
  const { apartments, loading, error } = useApartments();
  const [showFAQModal, setShowFAQModal] = useState(false);
  const [editingFAQ, setEditingFAQ] = useState<{
    id: string;
    question: string;
    answer: string;
  } | null>(null);
  const [editingCategory, setEditingCategory] = useState<{
    id: string;
    name: string;
    description?: string;
  } | null>(null);
  const [editingApartment, setEditingApartment] = useState<Apartment | null>(
    null
  );

  const apartmentHook = useAdminApartments();
  const categoryHook = useAdminCategories();
  const faqHook = useAdminFAQs();
  const {
    bookings,
    loading: bookingsLoading,
    error: bookingsError,
  } = useAdminBookings();

  const [apartmentForm, setApartmentForm] = useState<ApartmentFormData>({
    title: "",
    description: "",
    location: "",
    price: "",
    paymentPlan: "MONTHLY",
    apartmentCategoryId: "",
    listingType: "rent",
    features: "",
    gallery: "",
    publicIds: "",
  });
  const [apartmentError, setApartmentError] = useState<string | null>(null);

  const [categoryForm, setCategoryForm] = useState<CategoryFormData>({
    name: "",
  });
  const [categoryError, setCategoryError] = useState<string | null>(null);

  const [faqForm, setFAQForm] = useState<FAQFormData>({
    question: "",
    answer: "",
  });
  const [faqError, setFaqError] = useState<string | null>(null);

  const handleEditFAQ = (faq: {
    id: string;
    question: string;
    answer: string;
  }) => {
    setEditingFAQ(faq);
    setFAQForm({
      question: faq.question,
      answer: faq.answer,
    });
    setShowFAQModal(true);
  };

  const handleCloseFAQModal = () => {
    setShowFAQModal(false);
    setEditingFAQ(null);
    setFAQForm({ question: "", answer: "" });
  };

  const handleEditCategory = (category: {
    id: string;
    name: string;
    description?: string;
  }) => {
    setEditingCategory(category);
    setCategoryForm({
      name: category.name,
    });
    setShowCategoryModal(true);
  };

  const handleCloseCategoryModal = () => {
    setShowCategoryModal(false);
    setEditingCategory(null);
    setCategoryForm({ name: "" });
  };

  const handleDeleteCategory = async (id: string) => {
    try {
      await categoryHook.deleteCategory(id);
    } catch (error) {
      console.error("Failed to delete category:", error);
    }
  };

  const handleDeleteFAQ = async (id: string) => {
    try {
      await faqHook.deleteFAQ(id);
    } catch (error) {
      console.error("Failed to delete FAQ:", error);
    }
  };

  const handleCreateApartment = async (e: React.FormEvent) => {
    e.preventDefault();
    setApartmentError(null);
    // Validate according to API rules
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(apartmentForm.apartmentCategoryId)) {
      setApartmentError("Category ID must be a valid UUID (e.g., 123e4567-e89b-12d3-a456-426614174000)");
      return;
    }
    if (apartmentForm.publicIds && apartmentForm.publicIds.trim().length > 255) {
      setApartmentError("Public IDs must be 255 characters or fewer");
      return;
    }
    try {
      if (editingApartment) {
        await apartmentHook.updateApartment(editingApartment.id, {
          title: apartmentForm.title,
          description: apartmentForm.description,
          location: apartmentForm.location,
          price: Number(apartmentForm.price),
          paymentPlan: apartmentForm.paymentPlan,
          apartmentCategoryId: apartmentForm.apartmentCategoryId,
          features: apartmentForm.features
            ? apartmentForm.features
                .split(",")
                .map((f) => f.trim())
                .filter((f) => f)
            : undefined,
          gallery: apartmentForm.gallery
            ? apartmentForm.gallery
                .split(",")
                .map((g) => g.trim())
                .filter((g) => g)
            : undefined,
          publicIds: apartmentForm.publicIds?.trim() || undefined,
        });
      } else {
        await apartmentHook.createApartment({
          title: apartmentForm.title,
          description: apartmentForm.description,
          location: apartmentForm.location,
          price: Number(apartmentForm.price),
          paymentPlan: apartmentForm.paymentPlan,
          apartmentCategoryId: apartmentForm.apartmentCategoryId,
          features: apartmentForm.features
            ? apartmentForm.features
                .split(",")
                .map((f) => f.trim())
                .filter((f) => f)
            : undefined,
          gallery: apartmentForm.gallery
            ? apartmentForm.gallery
                .split(",")
                .map((g) => g.trim())
                .filter((g) => g)
            : undefined,
          publicIds: apartmentForm.publicIds?.trim() || undefined,
        });
      }
      setShowApartmentModal(false);
      setApartmentForm({
        title: "",
        description: "",
        location: "",
        price: "",
        paymentPlan: "MONTHLY",
        apartmentCategoryId: "",
        listingType: "rent",
        features: "",
        gallery: "",
        publicIds: "",
      });
      setEditingApartment(null);
    } catch (error: unknown) {
      let errorMessage = 'Failed to save apartment. Please try again.';
      if (error && typeof error === 'object' && 'response' in error) {
        const apiError = error as { response?: { data?: { message?: string } } };
        if (apiError.response?.data?.message) {
          errorMessage = apiError.response.data.message;
        }
      }
      setApartmentError(errorMessage);
      console.error("Failed to create apartment:", error);
    }
  };

  const handleCreateCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    setCategoryError(null);
    try {
      if (editingCategory) {
        await categoryHook.updateCategory(editingCategory.id, categoryForm);
      } else {
        await categoryHook.createCategory(categoryForm);
      }
      handleCloseCategoryModal();
    } catch (error: unknown) {
      let errorMessage = 'Failed to save category. Please try again.';
      if (error && typeof error === 'object' && 'response' in error) {
        const apiError = error as { response?: { data?: { message?: string } } };
        if (apiError.response?.data?.message) {
          errorMessage = apiError.response.data.message;
        }
      }
      setCategoryError(errorMessage);
      console.error(
        editingCategory
          ? "Failed to update category:"
          : "Failed to create category:",
        error
      );
    }
  };

  const handleCreateFAQ = async (e: React.FormEvent) => {
    e.preventDefault();
    setFaqError(null);
    try {
      if (editingFAQ) {
        await faqHook.updateFAQ(editingFAQ.id, faqForm);
      } else {
        await faqHook.createFAQ(faqForm);
      }
      handleCloseFAQModal();
    } catch (error: unknown) {
      let errorMessage = 'Failed to save FAQ. Please try again.';
      if (error && typeof error === 'object' && 'response' in error) {
        const apiError = error as { response?: { data?: { message?: string } } };
        if (apiError.response?.data?.message) {
          errorMessage = apiError.response.data.message;
        }
      }
      setFaqError(errorMessage);
      console.error(
        editingFAQ ? "Failed to update FAQ:" : "Failed to create FAQ:",
        error
      );
    }
  };

  const tabs = [
    { id: "apartments" as TabType, label: "Apartments", icon: Home },
    { id: "categories" as TabType, label: "Categories", icon: FolderOpen },
    { id: "faqs" as TabType, label: "FAQs", icon: HelpCircle },
    { id: "bookings" as TabType, label: "Bookings", icon: Calendar },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8 mt-16">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Admin Dashboard
          </h1>
          <p className="mt-2 text-gray-600">
            Manage your properties, categories, FAQs, and bookings
          </p>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm mb-6 overflow-x-auto">
          <div className="flex border-b border-gray-200 min-w-max">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-4 font-medium transition-colors ${
                    activeTab === tab.id
                      ? "border-b-2 border-green-600 text-green-600"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="whitespace-nowrap">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          {/* Apartments Tab */}
          {activeTab === "apartments" && (
            <ApartmentsTab 
              onAddClick={() => setShowApartmentModal(true)}
              apartments={apartments}
              loading={loading}
              error={error}
            />
          )}

          {/* Categories Tab */}
          {activeTab === "categories" && (
            <CategoriesTab
              categories={categoryHook.categories}
              loading={categoryHook.loading}
              error={categoryHook.error}
              message={categoryHook.message}
              onAddClick={() => setShowCategoryModal(true)}
              onEditClick={handleEditCategory}
              onDeleteClick={handleDeleteCategory}
            />
          )}

          {/* FAQs Tab */}
          {activeTab === "faqs" && (
            <FAQsTab
              faqs={faqHook.faqs}
              loading={faqHook.loading}
              error={faqHook.error}
              message={faqHook.message}
              onAddClick={() => setShowFAQModal(true)}
              onEditClick={handleEditFAQ}
              onDeleteClick={handleDeleteFAQ}
            />
          )}

          {/* Bookings Tab */}
          {activeTab === "bookings" && (
            <BookingsTab
              bookings={bookings}
              loading={bookingsLoading}
              error={bookingsError}
            />
          )}
        </div>
      </div>

      {/* Apartment Modal */}
      {showApartmentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b">
              <h3 className="text-xl font-semibold">Add New Apartment</h3>
              <button
                onClick={() => setShowApartmentModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <form onSubmit={handleCreateApartment} className="p-6 space-y-4">
              {apartmentError && (
                <div className="p-3 mb-4 text-sm text-red-700 bg-red-100 rounded-lg">
                  {apartmentError}
                </div>
              )}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  required
                  value={apartmentForm.title}
                  onChange={(e) =>
                    setApartmentForm({
                      ...apartmentForm,
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
                  value={apartmentForm.description}
                  onChange={(e) =>
                    setApartmentForm({
                      ...apartmentForm,
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
                    value={apartmentForm.location}
                    onChange={(e) =>
                      setApartmentForm({
                        ...apartmentForm,
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
                    value={apartmentForm.price}
                    onChange={(e) =>
                      setApartmentForm({
                        ...apartmentForm,
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
                    value={apartmentForm.paymentPlan}
                    onChange={(e) =>
                      setApartmentForm({
                        ...apartmentForm,
                        paymentPlan: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="ANNUAL">ANNUAL</option>
                    <option value="MONTHLY">MONTHLY</option>
                  </select>
                </div>
                <div className="flex gap-2">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Category ID
                    </label>
                    <input
                      type="text"
                      required
                      value={apartmentForm.apartmentCategoryId}
                      onChange={(e) =>
                        setApartmentForm({
                          ...apartmentForm,
                          apartmentCategoryId: e.target.value,
                        })
                      }
                      placeholder="e.g., 123e4567-e89b-12d3-a456-426614174000"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      const newUUID = crypto.randomUUID();
                      setApartmentForm({
                        ...apartmentForm,
                        apartmentCategoryId: newUUID,
                      });
                    }}
                    className="mt-6 px-3 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 text-sm"
                  >
                    Generate UUID
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Listing Type
                </label>
                <select
                  value={apartmentForm.listingType}
                  onChange={(e) =>
                    setApartmentForm({
                      ...apartmentForm,
                      listingType: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="rent">Rent</option>
                  <option value="sale">Sale</option>
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
                  value={apartmentForm.features}
                  onChange={(e) =>
                    setApartmentForm({
                      ...apartmentForm,
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
                  value={apartmentForm.gallery}
                  onChange={(e) =>
                    setApartmentForm({
                      ...apartmentForm,
                      gallery: e.target.value,
                    })
                  }
                  placeholder="Enter image URLs separated by commas"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent mb-2"
                />
                
                {/* Image previews */}
                <div className="flex flex-wrap gap-2 mt-2">
                  {apartmentForm.gallery.split(',').filter(url => url.trim()).map((url, i) => (
                    <div key={i} className="relative group">
                      <div className="h-20 w-20 relative">
                        <Image
                          src={url.trim()}
                          alt={`Preview ${i}`}
                          fill
                          className="object-cover rounded border border-gray-200"
                          onError={() => {
                            const urls = apartmentForm.gallery.split(',').filter((_, idx) => idx !== i);
                            setApartmentForm({...apartmentForm, gallery: urls.join(',')});
                          }}
                          unoptimized={true} // For external URLs
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          const urls = apartmentForm.gallery.split(',').filter((_, idx) => idx !== i);
                          setApartmentForm({...apartmentForm, gallery: urls.join(',')});
                        }}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Public IDs{" "}
                  <span className="text-gray-500 text-xs">
                    (comma-separated)
                  </span>
                </label>
                <input
                  type="text"
                  value={apartmentForm.publicIds}
                  onChange={(e) =>
                    setApartmentForm({
                      ...apartmentForm,
                      publicIds: e.target.value,
                    })
                  }
                  placeholder="e.g., public-id-1, public-id-2"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowApartmentModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={apartmentHook.loading}
                  className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
                >
                  {apartmentHook.loading ? "Creating..." : "Create Apartment"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Category Modal */}
      <CategoryModal
        isOpen={showCategoryModal}
        isEditing={!!editingCategory}
        formData={categoryForm}
        loading={categoryHook.loading}
        error={categoryError}
        onClose={handleCloseCategoryModal}
        onSubmit={handleCreateCategory}
        onChange={setCategoryForm}
      />

      {/* FAQ Modal */}
      <FAQModal
        isOpen={showFAQModal}
        isEditing={!!editingFAQ}
        formData={faqForm}
        loading={faqHook.loading}
        error={faqError}
        onClose={handleCloseFAQModal}
        onSubmit={handleCreateFAQ}
        onChange={setFAQForm}
      />
    </div>
  );
}
