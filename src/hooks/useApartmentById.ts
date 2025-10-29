import { useState, useEffect } from "react";
import axios from "axios";
import api from "@/lib/axiosInstance";

interface ApartmentCategory {
  id: string;
  name: string;
}

interface Feature {
  id: string;
  featureName: string;
}

interface Gallery {
  id: string;
  apartmentId: string;
  imageUrl: string;
}

interface Apartment {
  id: string;
  title: string;
  description: string;
  location: string;
  price: string;
  paymentPlan: string;
  apartmentCategory: ApartmentCategory;
  features: Feature[];
  gallery: Gallery[];
}

interface ApartmentResponse {
  success: boolean;
  message: string;
  data: {
    apartment: Apartment;
  };
}

export function useApartmentById(id: string) {
  const [apartment, setApartment] = useState<Apartment | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }

    const fetchApartment = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await api.get<ApartmentResponse>(
          `${process.env.NEXT_PUBLIC_API_URL}/apartments/${id}`
        );

        setApartment(response.data.data.apartment);
      } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
          if (err.response?.status === 404) {
            setError("Apartment not found");
          } else {
            setError(
              err.response?.data?.message || "Failed to load apartment details"
            );
          }
        } else {
          setError("Failed to load apartment details");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchApartment();
  }, [id]);

  return { apartment, loading, error };
}
