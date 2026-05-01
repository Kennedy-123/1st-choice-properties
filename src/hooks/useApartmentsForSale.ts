"use client";
import { useState, useEffect, useCallback } from "react";
import axios from "axios";

interface ApartmentCategory {
  id: string;
  name: string;
}

interface Feature {
  id: string;
  featureName: string;
}

interface Gallery {
  id: string;
  apartmentId: string;
  imageUrl: string;
}

interface Apartment {
  id: string;
  title: string;
  description: string;
  location: string;
  price: string;
  paymentPlan: string;
  apartmentCategory: ApartmentCategory;
  features: Feature[];
  gallery: Gallery[];
}

export function useApartmentsForSale(page: number = 1, limit: number = 10) {
  const [apartments, setApartments] = useState<Apartment[]>([]);
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
      
      // Filter apartments for sale (not "For Rent")
      const forSale = fetched.filter(
        (apt: Apartment) => apt.apartmentCategory?.name !== "For Rent"
      );
      
      setApartments(forSale);
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

  useEffect(() => {
    fetchApartments();
  }, [fetchApartments]);

  return { apartments, loading, error, pagination, refetch: fetchApartments };
}
