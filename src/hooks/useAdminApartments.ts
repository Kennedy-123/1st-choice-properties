import { useState } from "react";
import api from "@/lib/axiosInstance";

interface ApartmentData {
  title: string;
  description: string;
  location: string;
  price: number;
  paymentPlan: string;
  apartmentCategoryId: string;
  features?: string[];
  gallery?: string[];
}

export const useAdminApartments = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const createApartment = async (formData: FormData) => {
    setLoading(true);
    setError(null);
    setMessage(null);
    
    try {
      // Convert FormData to ApartmentData
      const apartmentData: ApartmentData = {
        title: formData.get('title') as string,
        description: formData.get('description') as string,
        location: formData.get('location') as string,
        price: Number(formData.get('price')),
        paymentPlan: formData.get('paymentPlan') as string,
        apartmentCategoryId: formData.get('apartmentCategoryId') as string,
        features: formData.getAll('features') as string[],
        gallery: [], // Gallery will be handled separately for file uploads
      };

      const response = await api.post("/apartments", apartmentData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setMessage("Apartment created successfully!");
      return response.data;
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } } };
      setError(error.response?.data?.message || "Failed to create apartment");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateApartment = async (id: string, formData: FormData) => {
    setLoading(true);
    setError(null);
    setMessage(null);
    try {
      // Convert FormData to ApartmentData
      const apartmentData: Partial<ApartmentData> = {
        title: formData.get('title') as string,
        description: formData.get('description') as string,
        location: formData.get('location') as string,
        price: Number(formData.get('price')),
        paymentPlan: formData.get('paymentPlan') as string,
        apartmentCategoryId: formData.get('apartmentCategoryId') as string,
        features: formData.getAll('features') as string[],
        gallery: [], // Gallery will be handled separately for file uploads
      };

      const response = await api.patch(`/apartments/${id}`, apartmentData);
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
