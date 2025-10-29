import { useEffect, useState, useCallback } from "react";
import api from "@/lib/axiosInstance";
import axios from "axios";

interface User {
  id: string;
  email: string;
  username: string;
  fullName: string;
  profileUrl: string | null;
  publicId: string;
  role: string;
  isActive: boolean;
  isEmailVerified: boolean;
  isOnline: boolean;
  createdAt: string | null;
  updatedAt: string;
}

export function useProfile() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProfile = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get("/auth/profile");
      setUser(res.data?.data?.user || null);
    } catch (err: unknown) {
      console.error("Failed to fetch profile:", err);
      if (axios.isAxiosError(err)) {
        const message =
          err.response?.status === 401
            ? "Unauthorized — please log in again"
            : err.response?.data?.message || "Failed to load profile";
        setError(message);
      } else {
        setError("Failed to load profile");
      }
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  return {
    user,
    loading,
    error,
    refetch: fetchProfile,
  };
}
