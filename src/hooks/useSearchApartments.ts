"use client";
import { useState, useEffect, useCallback } from "react";
import { useFilteredApartments } from "./useFilteredApartments";

export function useSearchApartments() {
  const [query, setQuery] = useState("");
  const [selectedPrice, setSelectedPrice] = useState<string | null>(null);
  const [filters, setFilters] = useState<{
    q?: string;
    minPrice?: number;
    maxPrice?: number;
  }>({});

  const { apartments, loading, error } = useFilteredApartments(filters);

  const getPriceRange = () => {
    switch (selectedPrice) {
      case "Under ₦500K":
        return { minPrice: 0, maxPrice: 500000 };
      case "₦500K - ₦1M":
        return { minPrice: 500000, maxPrice: 1000000 };
      case "₦1M - ₦5M":
        return { minPrice: 1000000, maxPrice: 5000000 };
      case "Above ₦5M":
        return { minPrice: 5000000, maxPrice: undefined };
      default:
        return {};
    }
  };

  // ✅ Handle automatic search (live typing)
  useEffect(() => {
    if (!query.trim() && !selectedPrice) {
      // Clear results when search is empty
      setFilters({});
      return;
    }

    const delay = setTimeout(() => {
      const priceRange = getPriceRange();
      setFilters({
        q: query.trim() || undefined,
        minPrice: priceRange.minPrice,
        maxPrice: priceRange.maxPrice,
      });
    }, 400);

    return () => clearTimeout(delay);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, selectedPrice]);

  // ✅ Manual refresh (search button)
  const refreshSearch = useCallback(() => {
    if (!query.trim() && !selectedPrice) {
      setFilters({});
      return;
    }

    const priceRange = getPriceRange();
    setFilters({
      q: query.trim() || undefined,
      minPrice: priceRange.minPrice,
      maxPrice: priceRange.maxPrice,
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, selectedPrice]);

  // ✅ Only show results if there's a search term or filter
  const shouldShowResults = !!(query.trim() || selectedPrice);

  return {
    query,
    setQuery,
    selectedPrice,
    setSelectedPrice,
    apartments: shouldShowResults ? apartments : [],
    loading: shouldShowResults ? loading : false,
    error,
    refreshSearch,
  };
}
