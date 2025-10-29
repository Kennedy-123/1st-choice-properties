import { useState, useEffect } from "react";
import api from "@/lib/axiosInstance";

interface Booking {
  id: string;
  name: string;
  phone: string;
  address: string;
  message: string;
  bookingType: string;
  scheduleTime: string;
  status: string;
  createdAt: string | null;
  updatedAt: string;
  userId: string | null;
}

export const useAdminBookings = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAllBookings = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get("/bookings");
      // Extract data from the response structure: { success, message, data }
      setBookings(response.data.data || response.data);
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } } };
      setError(error.response?.data?.message || "Failed to fetch bookings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllBookings();
  }, []);

  return {
    bookings,
    loading,
    error,
    refetch: fetchAllBookings,
  };
};
