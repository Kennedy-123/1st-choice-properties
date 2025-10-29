"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useVerifyOtp } from "../hooks/useVerifyOtp";
import { useResendOtp } from "../hooks/useResendOtp";

export default function VerifyOtpClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const email = searchParams?.get("email") || "";
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const { verifyOtp, loading, error, success } = useVerifyOtp();
  const {
    resendOtp,
    loading: resendLoading,
    error: resendError,
    message: resendMessage,
  } = useResendOtp();

  async function handleVerify(e: React.FormEvent) {
    e.preventDefault();
    setMessage(null);

    if (!otp || otp.length < 6) {
      setMessage("Enter a valid 6-digit OTP");
      return;
    }

    const res = await verifyOtp({ email, otp });
    if (res) {
      setMessage("OTP verified successfully. Redirecting to login...");
      setTimeout(() => router.replace("/login"), 900);
    }
  }

  async function resend() {
    setMessage(null);
    await resendOtp(email);
  }

  // Handle errors and messages from hooks
  useEffect(() => {
    if (error) setMessage(error);
  }, [error]);

  useEffect(() => {
    if (resendError) setMessage(resendError);
  }, [resendError]);

  useEffect(() => {
    if (resendMessage) setMessage(resendMessage);
  }, [resendMessage]);

  useEffect(() => {
    if (success) {
      setMessage("OTP verified successfully");
      setTimeout(() => router.replace("/login"), 900);
    }
  }, [success, router]);

  // Determine if message is an error
  const isError = error || resendError;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Verify OTP
        </h1>

        <form onSubmit={handleVerify} className="space-y-4">
          {/* Email Input (Read-only) */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              value={email}
              readOnly
              placeholder="Enter your email"
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 bg-gray-100 cursor-not-allowed focus:outline-none"
            />
          </div>

          {/* OTP Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              OTP
            </label>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter OTP"
              maxLength={6}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Verify Button */}
          <button
            type="submit"
            disabled={loading || !otp}
            className="w-full bg-green-700 text-white py-2 rounded-md hover:bg-green-800 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>
        </form>

        {/* Resend OTP */}
        <div className="text-center mt-4">
          <button
            type="button"
            disabled={loading || resendLoading}
            onClick={resend}
            className="hover:cursor-pointer hover:underline text-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {resendLoading ? "Sending..." : "Resend OTP"}
          </button>
        </div>

        {/* Success or Error Message */}
        {message && (
          <p
            className={`mt-4 text-center font-medium ${
              isError ? "text-red-500" : "text-green-600"
            }`}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
}
