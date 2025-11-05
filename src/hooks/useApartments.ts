"use client";
import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Apartment } from "@/lib/types";
import api from "@/lib/axiosInstance";

export function useApartments() {
  const [apartments, setApartments] = useState<Apartment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchApartments = useCallback(async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/apartments`
      );

      // Access the nested structure: res.data.data.data
      const fetched = res.data?.data?.data || [];

      // Filter apartments for rent only
      const forRent = fetched.filter(
        (apt: Apartment) => apt.apartmentCategory?.name === "For Rent"
      );

      setApartments(forRent);
      setError(null);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || "Failed to load apartments");
      } else {
        setError("Failed to load apartments");
      }
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteApartment = async (id: string) => {
    try {
      setLoading(true);
      await api.delete(`${process.env.NEXT_PUBLIC_API_URL}/apartments/${id}`);
      // Refresh the apartments list after successful deletion
      await fetchApartments();
      return true;
    } catch (err: unknown) {
      console.error("Error deleting apartment:", err);
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || "Failed to delete apartment");
      } else {
        setError("Failed to delete apartment. Please try again.");
      }
      return false;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApartments();
  }, [fetchApartments]);

  return {
    apartments,
    loading,
    error,
    refetch: fetchApartments,
    deleteApartment,
  };
}
