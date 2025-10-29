import { useState } from "react";
import api from "@/lib/axiosInstance";

interface ApartmentData {
  title: string;
  description: string;
  location: string;
  price: number;
  paymentPlan: string;
  apartmentCategoryId: string;
  listingType?: string;
  publicIds?: string;
  features?: string[];
  gallery?: string[];
}

export const useAdminApartments = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const createApartment = async (data: ApartmentData) => {
    setLoading(true);
    setError(null);
    setMessage(null);
    try {
      const response = await api.post("/apartments", data);
      setMessage("Apartment created successfully!");
      return response.data;
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } } };
      setError(error.response?.data?.message || "Failed to create apartment");
      console.log(err)
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateApartment = async (id: string, data: Partial<ApartmentData>) => {
    setLoading(true);
    setError(null);
    setMessage(null);
    try {
      const response = await api.patch(`/apartments/${id}`, data);
      setMessage("Apartment updated successfully!");
      return response.data;
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } } };
      setError(error.response?.data?.message || "Failed to update apartment");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteApartment = async (id: string) => {
    setLoading(true);
    setError(null);
    setMessage(null);
    try {
      await api.delete(`/apartments/${id}`);
      setMessage("Apartment deleted successfully!");
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } } };
      setError(error.response?.data?.message || "Failed to delete apartment");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    createApartment,
    updateApartment,
    deleteApartment,
    loading,
    error,
    message,
  };
};
