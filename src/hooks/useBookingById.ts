import { useEffect, useState, useCallback } from "react";
import api from "@/lib/axiosInstance";
import axios from "axios";

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
  userId: string;
}

export function useBookingById(id: string | null) {
  const [booking, setBooking] = useState<Booking | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchBooking = useCallback(async () => {
    if (!id) {
      setBooking(null);
      setError(null);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const res = await api.get(`/bookings/${id}`);
      setBooking(res.data?.data || null);
    } catch (err: unknown) {
      console.error("Failed to fetch booking:", err);
      if (axios.isAxiosError(err)) {
        const message =
          err.response?.status === 401
            ? "Unauthorized — please log in again"
            : err.response?.status === 404
            ? "Booking not found"
            : err.response?.data?.message || "Failed to load booking";
        setError(message);
      } else {
        setError("Failed to load booking");
      }
      setBooking(null);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchBooking();
  }, [fetchBooking]);

  return {
    booking,
    loading,
    error,
    refetch: fetchBooking,
  };
}
