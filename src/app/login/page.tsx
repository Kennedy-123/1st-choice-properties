"use client"

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useLogin } from "../../hooks/useLogin";

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
      router.push("/");
    }
  }, [success, router]);

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow p-8">
        <h2 className="text-2xl font-semibold mb-6">Sign in to your account</h2>
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-2 rounded mb-4">{error}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input disabled={loading} value={email} onChange={(e)=>setEmail(e.target.value)} className="mt-1 w-full px-3 py-2 border rounded" type="email" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <div className="relative mt-1">
              <input disabled={loading} value={password} onChange={(e)=>setPassword(e.target.value)} className="w-full px-3 py-2 border rounded pr-10" type={showPassword?"text":"password"} />
              <button type="button" onClick={()=>setShowPassword(s=>!s)} className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-gray-600">{showPassword?"Hide":"Show"}</button>
            </div>
          </div>

          <div>
            <button disabled={loading} className="w-full bg-blue-600 hover:bg-blue-800 hover:cursor-pointer text-white px-4 py-2 rounded">{loading?"Signing in...":"Sign in"}</button>
          </div>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Don&apos;t have an account?{' '}
          <Link href="/register" className="text-blue-600 hover:underline">Create one</Link>
        </p>
      </div>
    </div>
  );
}
