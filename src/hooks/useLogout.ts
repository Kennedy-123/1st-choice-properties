"use client";

import { useState } from "react";
import axios from "axios";

export const useLogout = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const logoutUser = async () => {
    setLoading(true);
    setError(null);

    try {
      const refreshToken = localStorage.getItem("refreshToken");
      if (!refreshToken) throw new Error("No refresh token found");

      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/logout`,
        { refreshToken },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      // Clear tokens and user info
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");

      // Redirect user
      window.location.href = "/login";
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || "Logout failed");
      } else {
        setError("Unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return { logoutUser, loading, error };
};
