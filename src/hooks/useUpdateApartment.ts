import { useState } from "react";
import axios from "axios";
import api from "@/lib/axiosInstance";
import { Apartment } from "@/lib/types";

interface UpdateApartmentData {
  title?: string;
  description?: string;
  location?: string;
  price?: string;
  paymentPlan?: string;
  apartmentCategoryId?: string;
  publicIds?: string[];
  features?: string[];
  gallery?: File[];
}

interface UpdateApartmentResponse {
  success: boolean;
  message: string;
  data: {
    apartment: Apartment;
  };
}

export function useUpdateApartment() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const updateApartment = async (id: string, data: UpdateApartmentData) => {
    if (!id) {
      setError("Apartment ID is required");
      return null;
    }

    try {
      setLoading(true);
      setError(null);
      setSuccess(false);

      // Create FormData for multipart/form-data
      const formData = new FormData();

      // Append all fields to FormData if they exist
      if (data.title !== undefined) formData.append("title", data.title);
      if (data.description !== undefined)
        formData.append("description", data.description);
      if (data.location !== undefined)
        formData.append("location", data.location);
      if (data.price !== undefined) {
        // Convert price to number if it's a string
        const priceValue = typeof data.price === 'string' ? parseFloat(data.price) : data.price;
        formData.append("price", priceValue.toString());
      }
      if (data.paymentPlan !== undefined)
        formData.append("paymentPlan", data.paymentPlan);
      if (data.apartmentCategoryId !== undefined)
        formData.append("apartmentCategoryId", data.apartmentCategoryId);

      // Handle arrays
      if (data.publicIds && data.publicIds.length > 0) {
        data.publicIds.forEach((publicId, index) => {
          formData.append(`publicIds[${index}]`, publicId);
        });
      }

      if (data.features && data.features.length > 0) {
        data.features.forEach((feature, index) => {
          formData.append(`features[${index}]`, feature);
        });
      }

      // Handle gallery files
      if (data.gallery && data.gallery.length > 0) {
        data.gallery.forEach((file, index) => {
          formData.append(`gallery[${index}]`, file);
        });
      }

      const response = await api.patch<UpdateApartmentResponse>(
        `${process.env.NEXT_PUBLIC_API_URL}/apartments/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setSuccess(true);
      return response.data.data.apartment;
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        if (err.response?.status === 404) {
          setError("Apartment not found");
        } else if (err.response?.status === 400) {
          setError(err.response?.data?.message || "Invalid data provided");
        } else if (err.response?.status === 403) {
          setError("You don't have permission to update this apartment");
        } else {
          setError(err.response?.data?.message || "Failed to update apartment");
        }
      } else {
        setError("Failed to update apartment");
      }
      return null;
    } finally {
      setLoading(false);
    }
  };

  const resetState = () => {
    setLoading(false);
    setError(null);
    setSuccess(false);
  };

  return {
    updateApartment,
    loading,
    error,
    success,
    resetState,
  };
}
