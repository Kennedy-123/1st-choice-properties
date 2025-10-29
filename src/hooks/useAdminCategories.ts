import { useState, useEffect } from "react";
import api from "@/lib/axiosInstance";

interface Category {
  id: string;
  name: string;
  description?: string;
  createdAt: string | null;
  updatedAt: string;
}

interface CategoryData {
  name: string;
}

interface CategoriesResponse {
  success: boolean;
  message: string;
  data: {
    categories: Category[];
  };
}

export const useAdminCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const fetchAllCategories = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get<CategoriesResponse>("/apartment-categories");
      setCategories(response.data.data.categories);
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } } };
      setError(error.response?.data?.message || "Failed to fetch categories");
    } finally {
      setLoading(false);
    }
  };

  const createCategory = async (data: CategoryData) => {
    setLoading(true);
    setError(null);
    setMessage(null);
    try {
      const response = await api.post("/apartment-categories", data);
      setMessage("Category created successfully!");
      await fetchAllCategories(); // Refresh the list
      return response.data;
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } } };
      setError(error.response?.data?.message || "Failed to create category");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateCategory = async (id: string, data: Partial<CategoryData>) => {
    setLoading(true);
    setError(null);
    setMessage(null);
    try {
      const response = await api.patch(`/apartment-categories/${id}`, data);
      setMessage("Category updated successfully!");
      await fetchAllCategories(); // Refresh the list
      return response.data;
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } } };
      setError(error.response?.data?.message || "Failed to update category");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteCategory = async (id: string) => {
    setLoading(true);
    setError(null);
    setMessage(null);
    try {
      await api.delete(`/apartment-categories/${id}`);
      setMessage("Category deleted successfully!");
      await fetchAllCategories(); // Refresh the list
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } } };
      setError(error.response?.data?.message || "Failed to delete category");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllCategories();
  }, []);

  return {
    categories,
    fetchAllCategories,
    createCategory,
    updateCategory,
    deleteCategory,
    loading,
    error,
    message,
  };
};
