"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { Apartment } from "@/lib/types";

interface FilterParams {
  q?: string;
  paymentPlan?: "ANNUAL" | "MONTHLY";
  categoryId?: string;
  minPrice?: number;
  maxPrice?: number;
  location?: string;
}

export function useFilteredApartments(filters: FilterParams) {
  const [apartments, setApartments] = useState<Apartment[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // 🕓 Debounce logic – only fetch after 500ms of no typing/filter change
    const timeout = setTimeout(async () => {
      try {
        setLoading(true);
        setError(null);

        const params = new URLSearchParams();

        if (filters.q) params.append("q", filters.q);
        if (filters.paymentPlan) params.append("paymentPlan", filters.paymentPlan);
        if (filters.categoryId) params.append("categoryId", filters.categoryId);
        if (filters.minPrice !== undefined) params.append("minPrice", filters.minPrice.toString());
        if (filters.maxPrice !== undefined) params.append("maxPrice", filters.maxPrice.toString());
        if (filters.location) params.append("location", filters.location);

        const url = `${process.env.NEXT_PUBLIC_API_URL}/apartments?${params.toString()}`;

        const res = await axios.get(url);
        const fetched = res.data?.data?.data || [];
        setApartments(fetched);
      } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
          setError(err.response?.data?.message || "Failed to load apartments");
        } else {
          setError("Failed to load apartments");
        }
      } finally {
        setLoading(false);
      }
    }, 500); // 500ms debounce delay

    return () => clearTimeout(timeout);
  }, [filters]); // refetch when filters or query change

  return { apartments, loading, error };
}
