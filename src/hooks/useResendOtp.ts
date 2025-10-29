import { useState } from "react";
import axios from "axios";

export function useResendOtp() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const resendOtp = async (email: string) => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    setMessage(null);

    try {
      const response = await axios.post("/auth/resend-otp", { email });
      setSuccess(true);
      setMessage(response.data?.message || "OTP resent successfully");
      return response.data;
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        console.error("Resend OTP failed:", err);
        const msg =
          err.response?.data?.message ||
          (err.response?.status === 400
            ? "Email already verified or too many requests"
            : err.response?.status === 404
            ? "User not found"
            : "Failed to resend OTP");

        setError(msg);
      }
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { resendOtp, loading, error, success, message };
}
