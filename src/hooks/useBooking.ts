import { useState } from "react";
import api from "@/lib/axiosInstance";
import axios from "axios";

interface BookingData {
  name: string;
  phone: string;
  address: string;
  message?: string;
  bookingType: string; // Adjust if backend has more options
  scheduleTime: string; // ISO date string format
}

export function useBooking() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const createBooking = async (data: BookingData) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await api.post("/bookings/user", data);
      setSuccess(true);
      return response.data;
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        console.error("Booking creation failed:", err);
        setError(err.response?.data?.message || "Failed to create booking");
        return null;
      }
    } finally {
      setLoading(false);
    }
  };

  return { createBooking, loading, error, success };
}
