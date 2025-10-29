"use client";

import { useState } from "react";
import axios from "axios";

export const useRefreshToken = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refreshAccessToken = async () => {
    setLoading(true);
    setError(null);

    try {
      const refreshToken = localStorage.getItem("refreshToken");

      if (!refreshToken) {
        setError("No refresh token found");
        return null;
      }

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh-token`,
        { refreshToken },
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.status === 200 && response.data.accessToken) {
        localStorage.setItem("accessToken", response.data.accessToken);
        return response.data.accessToken;
      }

      return null;
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        if (err.response?.status === 401) {
          setError("Invalid refresh token");
        } else {
          setError(err.response?.data?.message || "Failed to refresh token");
        }
      } else {
        setError("Unexpected error occurred");
      }
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { refreshAccessToken, loading, error };
};
