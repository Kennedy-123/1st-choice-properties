import { useState, useEffect } from "react";
import api from "@/lib/axiosInstance";
import axios from "axios";

interface FAQ {
  id: string;
  question: string;
  answer: string;
  createdAt: string | null;
  updatedAt: string;
}

interface FAQData {
  question: string;
  answer: string;
}

interface FAQsResponse {
  success: boolean;
  message: string;
  data: {
    data: FAQ[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      pages: number;
    };
  };
}

export const useAdminFAQs = () => {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const fetchAllFAQs = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get<FAQsResponse>("/faqs");
      setFaqs(response.data.data.data);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        console.log(err);
      }
      const error = err as { response?: { data?: { message?: string } } };
      setError(error.response?.data?.message || "Failed to fetch FAQs");
    } finally {
      setLoading(false);
    }
  };

  const createFAQ = async (data: FAQData) => {
    setLoading(true);
    setError(null);
    setMessage(null);
    try {
      const response = await api.post("/faqs", data);
      setMessage("FAQ created successfully!");
      await fetchAllFAQs(); // Refresh the list
      return response.data;
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        console.log(err);
      }
      const error = err as { response?: { data?: { message?: string } } };
      setError(error.response?.data?.message || "Failed to create FAQ");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateFAQ = async (id: string, data: Partial<FAQData>) => {
    setLoading(true);
    setError(null);
    setMessage(null);
    try {
      const response = await api.patch(`/faqs/${id}`, data);
      setMessage("FAQ updated successfully!");
      await fetchAllFAQs(); // Refresh the list
      return response.data;
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } } };
      setError(error.response?.data?.message || "Failed to update FAQ");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteFAQ = async (id: string) => {
    setLoading(true);
    setError(null);
    setMessage(null);
    try {
      await api.delete(`/faqs/${id}`);
      setMessage("FAQ deleted successfully!");
      await fetchAllFAQs(); // Refresh the list
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } } };
      setError(error.response?.data?.message || "Failed to delete FAQ");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllFAQs();
  }, []);

  return {
    faqs,
    fetchAllFAQs,
    createFAQ,
    updateFAQ,
    deleteFAQ,
    loading,
    error,
    message,
  };
};
