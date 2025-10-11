"use client"

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRegister } from "../../hooks/useRegister";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { registerUser, loading, error, success } = useRegister();
  const router = useRouter();

  function validate() {
    const e: Record<string, string> = {};
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = "Enter a valid email";
    if (!username || username.length < 3) e.username = "Username must be at least 3 characters";
    if (!fullName || fullName.split(" ").length < 2) e.fullName = "Please enter your full name";
    if (!password || password.length < 6) e.password = "Password must be at least 6 characters";
    if (password !== confirmPassword) e.confirmPassword = "Passwords do not match";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    const res = await registerUser({ email, username, fullName, password });
    if (res) {
      // on success redirect to OTP verification page with email param
      setTimeout(() => router.push(`/verify-otp?email=${encodeURIComponent(email)}`), 600);
    }
  }

  useEffect(() => {
    // if hook-level success is true, clear form (optional)
    if (success) {
      setEmail("");
      setUsername("");
      setFullName("");
      setPassword("");
      setConfirmPassword("");
    }
  }, [success]);

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow p-8">
        <h2 className="text-2xl font-semibold mb-6">Create an account</h2>
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-2 rounded mb-4">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input disabled={loading} value={email} onChange={(e)=>setEmail(e.target.value)} className="mt-1 w-full px-3 py-2 border rounded" type="email" />
            {errors.email && <p className="text-xs text-red-600 mt-1">{errors.email}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Username</label>
            <input disabled={loading} value={username} onChange={(e)=>setUsername(e.target.value)} className="mt-1 w-full px-3 py-2 border rounded" type="text" />
            {errors.username && <p className="text-xs text-red-600 mt-1">{errors.username}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Full Name</label>
            <input disabled={loading} value={fullName} onChange={(e)=>setFullName(e.target.value)} className="mt-1 w-full px-3 py-2 border rounded" type="text" />
            {errors.fullName && <p className="text-xs text-red-600 mt-1">{errors.fullName}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <div className="relative mt-1">
              <input disabled={loading} value={password} onChange={(e)=>setPassword(e.target.value)} className="w-full px-3 py-2 border rounded pr-10" type={showPassword?"text":"password"} />
              <button type="button" onClick={()=>setShowPassword(s=>!s)} className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-gray-600">{showPassword?"Hide":"Show"}</button>
            </div>
            {errors.password && <p className="text-xs text-red-600 mt-1">{errors.password}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
            <div className="relative mt-1">
              <input disabled={loading} value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)} className="w-full px-3 py-2 border rounded pr-10" type={showConfirm?"text":"password"} />
              <button type="button" onClick={()=>setShowConfirm(s=>!s)} className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-gray-600">{showConfirm?"Hide":"Show"}</button>
            </div>
            {errors.confirmPassword && <p className="text-xs text-red-600 mt-1">{errors.confirmPassword}</p>}
          </div>

          <div>
            <button disabled={loading} className="w-full bg-blue-600 hover:bg-blue-800 hover:cursor-pointer text-white px-4 py-2 rounded">{loading?"Creating...":"Create account"}</button>
          </div>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link href="/login" className="text-blue-600 hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
}