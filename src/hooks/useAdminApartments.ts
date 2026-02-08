import { useState } from "react";
import api from "@/lib/axiosInstance";

interface ApartmentData {
  title: string;
  description: string;
  location: string;
  price: number;
  paymentPlan: string;
  apartmentCategoryId: string;
  features?: string[];
  gallery?: string[];
}

export const useAdminApartments = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

    const createApartment = async (formData: FormData) => {
    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      // Extract files from FormData
      const galleryFiles = formData.getAll('gallery') as File[];
      console.log(galleryFiles)
      
      // Convert FormData to ApartmentData
      const apartmentData: ApartmentData = {
        title: formData.get('title') as string,
        description: formData.get('description') as string,
        location: formData.get('location') as string,
        price: Number(formData.get('price')),
        paymentPlan: formData.get('paymentPlan') as string,
        apartmentCategoryId: formData.get('apartmentCategoryId') as string,
        features: formData.getAll('features') as string[],
        gallery: galleryFiles.map(file => file.name), // Send file names instead of empty array

      };

      // Create new FormData with both text data and files
      const combinedFormData = new FormData();
      Object.entries(apartmentData).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          value.forEach(item => combinedFormData.append(key, item));
        } else if (value !== undefined && value !== null) {
          combinedFormData.append(key, value.toString());
        }
      });

      // Add files back to FormData
      galleryFiles.forEach(file => combinedFormData.append('gallery', file));

      

      const response = await api.post(
        "/apartments", 
        combinedFormData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      setMessage("Apartment created successfully!");
      return response.data;
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } } };
      setError(error.response?.data?.message || "Failed to create apartment");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateApartment = async (id: string, formData: FormData) => {
    setLoading(true);
    setError(null);
    setMessage(null);
    try {
      // Extract files from FormData
      const galleryFiles = formData.getAll('gallery') as File[];
      
      // Convert FormData to ApartmentData
      const apartmentData: Partial<ApartmentData> = {
        title: formData.get('title') as string,
        description: formData.get('description') as string,
        location: formData.get('location') as string,
        price: Number(formData.get('price')),
        paymentPlan: formData.get('paymentPlan') as string,
        apartmentCategoryId: formData.get('apartmentCategoryId') as string,
        features: formData.getAll('features') as string[],
        gallery: galleryFiles.map(file => file.name), // Send file names instead of empty array
      };

      // Create new FormData with both text data and files
      const combinedFormData = new FormData();
      Object.entries(apartmentData).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          value.forEach(item => combinedFormData.append(key, item));
        } else if (value !== undefined && value !== null) {
          combinedFormData.append(key, value.toString());
        }
      });

      // Add files back to FormData
      galleryFiles.forEach(file => combinedFormData.append('gallery', file));

      const response = await api.patch(
        `/apartments/${id}`, 
        combinedFormData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      setMessage("Apartment updated successfully!");
      return response.data;
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } } };
      setError(error.response?.data?.message || "Failed to update apartment");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteApartment = async (id: string) => {
    setLoading(true);
    setError(null);
    setMessage(null);
    try {
      await api.delete(`/apartments/${id}`);
      setMessage("Apartment deleted successfully!");
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } } };
      setError(error.response?.data?.message || "Failed to delete apartment");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    createApartment,
    updateApartment,
    deleteApartment,
    loading,
    error,
    message,
  };
};
