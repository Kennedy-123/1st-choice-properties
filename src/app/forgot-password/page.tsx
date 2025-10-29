"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    setError(null);

    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/forgot-password`,
        { email },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setMessage("OTP sent to your email.");
      setEmail("");

      // Navigate to OTP page with email as a query parameter
      router.replace(`/verify-password-otp?email=${encodeURIComponent(email)}`);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || "Failed to send OTP.");
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2 text-center">
          Forgot Password
        </h2>
        <p className="text-gray-500 text-center mb-6">
          Enter your email to receive a verification code.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter your Email"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading || !email}
            className="w-full bg-green-700 hover:bg-green-800 hover:cursor-pointer font-bold text-white py-3 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            {loading ? "Sending..." : "Send OTP"}
          </button>
        </form>

        {message && (
          <p className="mt-4 text-green-600 text-center font-medium">
            {message}
          </p>
        )}

        {error && (
          <p className="mt-4 text-red-500 text-center font-medium">{error}</p>
        )}
      </div>
    </div>
  );
}
