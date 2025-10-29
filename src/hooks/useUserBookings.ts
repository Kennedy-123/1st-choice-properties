import { useEffect, useState } from "react";
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

export function useUserBookings() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);

  const fetchBookings = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get("/bookings/my-bookings");
      setBookings(res.data?.data || []);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        const message =
          err.response?.status === 401
            ? "Unauthorized — please log in again"
            : err.response?.data?.message || "Failed to load bookings";
        setError(message);
      }
    } finally {
      setLoading(false);
    }
  };

  const deleteBooking = async (id: string) => {
    setDeleting(id);
    try {
      await api.delete(`/bookings/${id}`);
      // Remove the booking from the local state
      setBookings((prev) => prev.filter((booking) => booking.id !== id));
      return { success: true };
    } catch (err: unknown) {
      console.error("Failed to delete booking:", err);
      if (axios.isAxiosError(err)) {
        const message =
          err.response?.status === 401
            ? "Unauthorized — please log in again"
            : err.response?.status === 404
            ? "Booking not found"
            : err.response?.data?.message || "Failed to delete booking";
        return { success: false, error: message };
      }
      return { success: false, error: "Failed to delete booking" };
    } finally {
      setDeleting(null);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return {
    bookings,
    loading,
    error,
    deleting,
    refetch: fetchBookings,
    deleteBooking,
  };
}
