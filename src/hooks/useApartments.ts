"use client";
import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Apartment } from "@/lib/types";
import api from "@/lib/axiosInstance";

export function useApartments(page: number = 1, limit: number = 10) {
  const [apartments, setApartments] = useState<Apartment[]>([]);
  const [allApartments, setAllApartments] = useState<Apartment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    pages: 0
  });

  const fetchApartments = useCallback(async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/apartments?page=${page}&limit=${100}`
      );

      // Access the nested structure: res.data.data.data
      const fetched = res.data?.data?.data || [];
      const paginationData = res.data?.data;
      
      // Update pagination state
      if (paginationData) {
        setPagination({
          page: paginationData.page || page,
          limit: paginationData.limit || limit,
          total: paginationData.total || 0,
          pages: paginationData.pages || 0
        });
      }

      // Filter apartments for rent only
      const forRent = fetched.filter(
        (apt: Apartment) => apt.apartmentCategory?.name === "For Rent"
      );

      setApartments(forRent);
      setAllApartments(fetched);
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
  }, [page, limit]);

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
    allApartments,
    pagination
  };
}
