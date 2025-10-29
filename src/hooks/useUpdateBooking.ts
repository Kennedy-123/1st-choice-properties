import { useState } from "react";
import api from "@/lib/axiosInstance";

interface UpdateBookingParams {
  status?: "PENDING" | "CONFIRMED" | "CANCELLED" | "COMPLETED";
  message?: string;
}

interface UpdateBookingResult {
  success: boolean;
  error?: string;
}

export function useUpdateBooking() {
  const [updating, setUpdating] = useState<string | null>(null);

  const updateBooking = async (
    id: string,
    data: UpdateBookingParams
  ): Promise<UpdateBookingResult> => {
    setUpdating(id);
    try {
      await api.put(`/bookings/${id}`, data);
      return { success: true };
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to update booking";
      return { success: false, error: errorMessage };
    } finally {
      setUpdating(null);
    }
  };

  return { updateBooking, updating };
}
