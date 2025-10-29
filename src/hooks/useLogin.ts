import { useState } from "react";
import axios from "axios";

interface LoginData {
  email: string;
  password: string;
}

interface User {
  id: string;
  email: string;
  username: string;
  fullName: string;
  role: string;
  isActive: boolean;
  isEmailVerified: boolean;
}

interface Tokens {
  accessToken: string;
  refreshToken: string;
}

interface LoginResponse {
  success: boolean;
  message: string;
  data: {
    user: User;
    tokens: Tokens;
  };
}

export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const loginUser = async (data: LoginData): Promise<LoginResponse | null> => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await axios.post<LoginResponse>(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Extract tokens and user
      const { accessToken, refreshToken } = response.data.data.tokens;

      // Store tokens in localStorage
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);

      setSuccess(true);
      return response.data;
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        if (err.response?.status === 401) {
          setError("Invalid credentials");
        } else {
          setError(err.response?.data?.message || "Something went wrong");
        }
      } else {
        setError("Unexpected error occurred");
      }
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { loginUser, loading, error, success };
};
