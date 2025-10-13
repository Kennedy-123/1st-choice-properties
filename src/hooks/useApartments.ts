"use client";
import { useState, useEffect } from "react";
import axios from "axios";

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

export function useApartments() {
  const [apartments, setApartments] = useState<Apartment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchApartments = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/apartments`
        );

        // Access the nested structure: res.data.data.data
        const fetched = res.data?.data?.data || [];
        console.log("Fetched apartments:", fetched[0].gallery[0]?.imageUrl);
        setApartments(fetched);
      } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
          setError(err.response?.data?.message || "Failed to load apartments");
        } else {
          setError("Failed to load apartments");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchApartments();
  }, []);

  return { apartments, loading, error };
}
