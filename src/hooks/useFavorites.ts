import { useEffect, useState } from "react";
import axios from "axios";
import api from "@/lib/axiosInstance";
import { Apartment } from "@/lib/types";

// Types
// interface ApartmentFeature {
//   id: string;
//   apartmentId: string;
//   featureName: string;
// }

// interface ApartmentGallery {
//   id: string;
//   apartmentId: string;
//   imageUrl: string;
// }

// interface ApartmentCategory {
//   id: string;
//   name: string;
// }

interface FavoritesResponse {
  success: boolean;
  message: string;
  data: {
    data: Apartment[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      pages: number;
    };
  };
}

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<Apartment[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchFavorites = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await api.get<FavoritesResponse>(
        `${process.env.NEXT_PUBLIC_API_URL}/apartments/favorites`
      );
      setFavorites(response.data.data.data);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(
          err.response?.data?.message || "Failed to load favorite apartments."
        );
      } else {
        setError("Unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  const removeFavorite = async (id: string) => {
    setError(null);
    // Optimistic update
    const previous = favorites;
    setFavorites((cur) => cur.filter((a) => a.id !== id));
    try {
      await api.delete(`${process.env.NEXT_PUBLIC_API_URL}/apartments/${id}`);
    } catch (err: unknown) {
      // Revert on failure
      setFavorites(previous);
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || "Failed to remove favorite.");
      } else {
        setError("Failed to remove favorite.");
      }
      throw err;
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  return { favorites, loading, error, refetch: fetchFavorites, removeFavorite };
};
