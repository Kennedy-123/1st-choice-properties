import { useState } from "react";
import axios from "axios";

interface ContactPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface SubmitResult {
  success: boolean;
  error?: string;
}

export const useContactForm = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const submitContactForm = async (data: ContactPayload): Promise<SubmitResult> => {
    setLoading(true);
    setSuccess(false);
    setErrorMessage("");

    try {
      await axios.post(
        "https://1stchoice-api-production.up.railway.app/contact",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setSuccess(true);
      return { success: true };
    } catch (error) {
      let errorMessage = 'Something went wrong. Please try again.';
      
      if (axios.isAxiosError(error) && error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }
      
      setErrorMessage(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  return {
    submitContactForm,
    loading,
    success,
    errorMessage,
  };
};
