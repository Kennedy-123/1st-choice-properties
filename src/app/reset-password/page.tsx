"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import axios from "axios";

export default function ResetPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const emailFromParams = searchParams.get("email") || "";

  const [email, setEmail] = useState(emailFromParams);
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Update state if query param changes
  useEffect(() => {
    setEmail(emailFromParams);
  }, [emailFromParams]);

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    setError(null);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/reset-password`,
        { email, newPassword },
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.status === 200) {
        setMessage("Password reset successfully");
        setNewPassword("");

        // Redirect to login page after reset
        setTimeout(() => {
          router.replace("/login");
        }, 1500);
      }
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        if (err.response?.status === 400) {
          setError("Please verify your OTP first");
        } else {
          setError(err.response?.data?.message || "Failed to reset password");
        }
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Reset Password
        </h1>

        <form onSubmit={handleResetPassword} className="space-y-4">
          {/* Email Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              value={email}
              readOnly
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 bg-gray-100 text-gray-600 cursor-not-allowed focus:outline-none"
            />
          </div>

          {/* New Password Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              New Password
            </label>
            <div className="relative mt-1">
              <input
                type={showPassword ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
                required
                className="block w-full border border-gray-300 rounded-md p-2 pr-12 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-600 hover:text-gray-800"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {/* Reset Button */}
          <button
            type="submit"
            disabled={loading || !newPassword}
            className="w-full bg-green-700 text-white py-2 rounded-md hover:bg-green-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>

        {/* Success / Error Messages */}
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
