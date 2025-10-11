import { useState } from "react";
import axios from "axios";

interface RegisterData {
  email: string;
  username: string;
  fullName: string;
  password: string;
}

interface RegisterResponse {
  message?: string;
  token?: string;
}

export const useRegister = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const registerUser = async (data: RegisterData): Promise<RegisterResponse | null> => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await axios.post<RegisterResponse>(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/register`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setSuccess(true);
      console.log("Registration successful:", response.data);
      return response.data;
    } catch (err: unknown) {
      console.error("Registration error:", err);
      if (axios.isAxiosError(err)) {
        const resp = err.response;
        const serverMessage = resp?.data && resp.data.message
        if (resp?.status === 409) {
          setError(serverMessage || "User already exists");
        } else if (resp?.status === 400) {
          setError(serverMessage || "Bad request. Please check your input.");
        } else {
          setError(serverMessage || "Something went wrong");
        }
      } else {
        setError("Unexpected error occurred");
      }
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { registerUser, loading, error, success };
};
