"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useVerifyOtp } from "../../hooks/useVerifyOtp";
import axios from "axios";

export default function VerifyOtpPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const email = searchParams?.get("email") || "";
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState<string | null>(null);

  const { verifyOtp, loading, error, success } = useVerifyOtp();

  async function handleVerify(e: React.FormEvent) {
    e.preventDefault();
    if (!otp || otp.length < 6) {
      setMessage("Enter a valid 6-digit OTP");
      return;
    }

    const res = await verifyOtp({ email, otp });
    if (res) {
      setMessage("OTP verified. Redirecting to login...");
      setTimeout(() => router.push("/login"), 900);
    }
  }

  async function resend() {
    setMessage(null);
    try {
      // call resend endpoint
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/resend-otp`,
        { email },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setMessage("A new OTP was sent to your email");
    } catch (err) {
      // show server message if available
      if (axios.isAxiosError(err)) {
        setMessage(err.response?.data?.message || "Failed to resend OTP");
      } else {
        setMessage("Failed to resend OTP");
      }
    }
  }

  useEffect(() => {
    if (error) setMessage(error);
  }, [error]);

  useEffect(() => {
    if (success) {
      setMessage("OTP verified. Redirecting to login...");
      setTimeout(() => router.push("/login"), 900);
    }
  }, [success, router]);

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow p-8">
        <h2 className="text-2xl font-semibold mb-4">Verify your email</h2>
        <p className="text-sm text-gray-600 mb-4">
          We sent a 6-digit code to <strong>{email}</strong>. Enter it below to
          verify your account.
        </p>
        {message && <div className="mb-4 text-sm text-gray-700">{message}</div>}
        <form onSubmit={handleVerify} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-700">OTP Code</label>
            <input
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="mt-1 w-full px-3 py-2 border rounded"
              maxLength={6}
            />
          </div>

          <div className="flex gap-2">
            <button
              disabled={loading}
              className="flex-1 bg-blue-600 text-white px-4 py-2 rounded"
            >
              {loading ? "Verifying..." : "Verify"}
            </button>
            <button
              type="button"
              disabled={loading}
              onClick={resend}
              className="px-4 py-2 border rounded"
            >
              Resend
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
