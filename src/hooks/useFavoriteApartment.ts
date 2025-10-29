import { useState } from "react";
import axios from "axios";
import api from "@/lib/axiosInstance";

export const useFavoriteApartment = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const addToFavorites = async (id: string) => {
    setLoading(true);
    setMessage("");
    setError("");

    try {
      const response = await api.post(
        `${process.env.NEXT_PUBLIC_API_URL}/apartments/${id}/favorite`
      );
      if (response.status === 200) {
        setMessage("Apartment added to favorites ✅");
      }
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        if (err.response?.status === 404) setError("Apartment not found");
        else if (err.response?.status === 409) setError("Already in favorites");
        else setError("Something went wrong. Please try again.");
      } else {
        setError("Network error. Check your connection.");
      }
    } finally {
      setLoading(false);
    }
  };

  const removeFromFavorites = async (id: string) => {
    setLoading(true);
    setMessage("");
    setError("");

    try {
      const response = await api.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/apartments/${id}/favorite`
      );
      if (response.status === 200) {
        setMessage("Apartment removed from favorites ✅");
      }
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        if (err.response?.status === 404) setError("Apartment not found");
        else if (err.response?.status === 409) setError("Not in favorites");
        else setError("Something went wrong. Please try again.");
      } else {
        setError("Network error. Check your connection.");
      }
    } finally {
      setLoading(false);
    }
  };

  return { addToFavorites, removeFromFavorites, loading, message, error };
};
