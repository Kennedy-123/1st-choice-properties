import { useState } from "react";
import api from "@/lib/axiosInstance";
import { AxiosError } from "axios";

export const useAdminApartments = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const createApartment = async (formData: FormData) => {
    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      const res = await api.post("/apartments", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      setMessage("Apartment created successfully!");
      return res.data;
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        setError(err?.response?.data?.message || "Failed to create apartment");
      } else {
        setError("Failed to create apartment");
      }
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
      const res = await api.patch(`/apartments/${id}`, formData);
      setMessage("Apartment updated successfully!");
      return res.data;
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        setError(err?.response?.data?.message || "Failed to update apartment");
      } else {
        setError("Failed to update apartment");
      }
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
      if (err instanceof AxiosError) {
        setError(err?.response?.data?.message || "Failed to delete apartment");
      } else {
        setError("Failed to delete apartment");
      }
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