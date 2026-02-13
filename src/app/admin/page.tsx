"use client";
import React, { useState, useEffect } from "react";
import { useAdminApartments } from "@/hooks/useAdminApartments";
import { useAdminCategories } from "@/hooks/useAdminCategories";
import { Apartment } from "@/lib/types";
import { useAdminFAQs } from "@/hooks/useAdminFAQs";
import { useAdminBookings } from "@/hooks/useAdminBookings";
import { useApartments } from "@/hooks/useApartments";
import { Home, FolderOpen, HelpCircle, Calendar } from "lucide-react";
import ApartmentsTab from "@/components/admin/ApartmentsTab";
import CategoriesTab from "@/components/admin/CategoriesTab";
import FAQsTab from "@/components/admin/FAQsTab";
import BookingsTab from "@/components/admin/BookingsTab";
import CategoryModal from "@/components/admin/CategoryModal";
import FAQModal from "@/components/admin/FAQModal";
import ApartmentModal, { ApartmentFormData } from "@/components/admin/ApartmentModal";
import api from "@/lib/axiosInstance";

type TabType = "apartments" | "categories" | "faqs" | "bookings";

interface CategoryFormData {
  name: string;
}

interface FAQFormData {
  question: string;
  answer: string;
}

export default function AdminDashboard() {
  const [categories, setCategories] = useState<{ id: string; name: string }[]>(
    []
  );
  const [categoriesLoading, setCategoriesLoading] = useState(false);
  const [categoriesError, setCategoriesError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      setCategoriesLoading(true);
      setCategoriesError(null);
      try {
        const res = await api.get("/apartment-categories");
        const fetched = res.data?.data?.categories || [];
        setCategories(fetched);
      } catch {
        setCategoriesError("Failed to fetch apartment categories.");
      } finally {
        setCategoriesLoading(false);
      }
    };

    fetchCategories();
  }, []);
  const [activeTab, setActiveTab] = useState<TabType>("apartments");
  const [showApartmentModal, setShowApartmentModal] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);

  // Use the useApartments hook to fetch all apartments
  const { loading, error, allApartments } = useApartments();
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
    price: 0,
    paymentPlan: "MONTHLY",
    apartmentCategoryId: "",
    features: [],
    gallery: [],
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

  const handleDeleteApartment = async (id: string) => {
    try {
      await apartmentHook.deleteApartment(id);
      window.location.reload()
    } catch (error) {
      console.error("Failed to delete apartment:", error);
    }
  };

const handleCreateApartment = async (formData: FormData) => {
  setApartmentError(null);

  try {
    if (editingApartment) {
      await apartmentHook.updateApartment(editingApartment.id, formData);
    } else {
      await apartmentHook.createApartment(formData);
    }

    setShowApartmentModal(false);
    setApartmentForm({
      title: "",
      description: "",
      location: "",
      price: 0,
      paymentPlan: "MONTHLY",
      apartmentCategoryId: "",
      features: [],
      gallery: [],
    });
    setEditingApartment(null);

  } catch (error: unknown) {
    let errorMessage = "Failed to save apartment. Please try again.";

    if (error && typeof error === "object" && "response" in error) {
      const apiError = error as {
        response?: { data?: { message?: string } };
      };
      if (apiError.response?.data?.message) {
        errorMessage = apiError.response.data.message;
      }
    }

    setApartmentError(errorMessage);
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
      let errorMessage = "Failed to save category. Please try again.";
      if (error && typeof error === "object" && "response" in error) {
        const apiError = error as {
          response?: { data?: { message?: string } };
        };
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
      let errorMessage = "Failed to save FAQ. Please try again.";
      if (error && typeof error === "object" && "response" in error) {
        const apiError = error as {
          response?: { data?: { message?: string } };
        };
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
              onDelete={handleDeleteApartment}
              apartments={allApartments}
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

      <ApartmentModal
        isOpen={showApartmentModal}
        onClose={() => {
          setShowApartmentModal(false);
          setApartmentForm({
            title: "",
            description: "",
            location: "",
            price: 0,
            paymentPlan: "MONTHLY",
            apartmentCategoryId: "",
            features: [],
            gallery: [],
          });
          setEditingApartment(null);
        }}
        onSubmit={handleCreateApartment}
        form={apartmentForm}
        setForm={setApartmentForm}
        error={apartmentError}
        loading={apartmentHook.loading}
        categories={categories}
        categoriesLoading={categoriesLoading}
        categoriesError={categoriesError}
        editingApartment={editingApartment}
      />

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
