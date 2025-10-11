import { useState } from "react";
import axios from "axios";

interface VerifyOtpData {
  email: string;
  otp: string;
}

interface VerifyOtpResponse {
  message?: string;
}

export const useVerifyOtp = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const verifyOtp = async (data: VerifyOtpData): Promise<VerifyOtpResponse | null> => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await axios.post<VerifyOtpResponse>(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/verify-otp`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setSuccess(true);
      return response.data;
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        if (err.response?.status === 400) {
          setError("Invalid or expired OTP");
        } else if (err.response?.status === 404) {
          setError("User not found");
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

  return { verifyOtp, loading, error, success };
};
