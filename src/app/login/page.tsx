"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useLogin } from "../../hooks/useLogin";
import Loader from "@/components/Loader";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { loginUser, loading, error, success } = useLogin();
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await loginUser({ email, password });
  }

  useEffect(() => {
    if (success) {
      router.replace("/");
    }
  }, [success, router]);

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 bg-gray-50">
      <div className="max-w-md w-full bg-white rounded-lg shadow p-8">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">
          Sign in to your account
        </h2>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-2 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              disabled={loading}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter Email Address"
              type="email"
            />
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="relative mt-1">
              <input
                disabled={loading}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border rounded pr-10 focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Enter Password"
                type={showPassword ? "text" : "password"}
              />
              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-gray-600 hover:text-gray-800"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>

            {/* Forgot Password Link */}
            <div className="text-right mt-2">
              <Link
                href="/forgot-password"
                className="text-sm text-green-600 hover:underline"
              >
                Forgot Password?
              </Link>
            </div>
          </div>

          {/* Submit Button */}
          <div>
            <button
              disabled={loading}
              className="w-full bg-green-700 hover:bg-green-800 hover:cursor-pointer text-white px-4 py-2 rounded transition"
            >
              {loading ? <Loader color="border-white"/> : "Login"}
            </button>
          </div>
        </form>

        {/* Register Link */}
        <p className="mt-4 text-center text-sm text-gray-600">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="text-green-600 hover:underline">
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
}
