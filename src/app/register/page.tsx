"use client"

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRegister } from "../../hooks/useRegister";
import { motion } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, User, UserRound } from "lucide-react";

const formVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6
    }
  }
};

const inputVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.4
    }
  }
};

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
    <div className="min-h-screen flex items-center justify-center py-12 px-4 bg-gradient-to-br from-green-50 via-white to-emerald-50 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />
      <div className="absolute bottom-20 right-20 w-72 h-72 bg-emerald-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: "1s" }} />
      
      <motion.div 
        variants={formVariants}
        initial="hidden"
        animate="visible"
        className="max-w-md w-full relative z-10"
      >
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 sm:p-10 border border-white/50">
          {/* Header */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8"
          >
            <h2 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-2">
              Create Account
            </h2>
            <p className="text-gray-600 text-sm">
              Join us to find your perfect property
            </p>
          </motion.div>

          {error && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-6 flex items-center gap-2"
            >
              <span className="text-red-500">⚠</span>
              {error}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Username Input */}
            <motion.div variants={inputVariants} initial="hidden" animate="visible" transition={{ delay: 0.1 }}>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Username
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input 
                  disabled={loading} 
                  value={username} 
                  onChange={(e)=>setUsername(e.target.value)} 
                  className="w-full pl-12 pr-4 py-3.5 bg-gray-50/50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-500 focus:ring-4 focus:ring-green-500/10 transition-all duration-300" 
                  placeholder="Enter username" 
                  type="text" 
                />
              </div>
              {errors.username && <p className="text-xs text-red-600 mt-1.5 flex items-center gap-1"><span>⚠</span>{errors.username}</p>}
            </motion.div>

            {/* Full Name Input */}
            <motion.div variants={inputVariants} initial="hidden" animate="visible" transition={{ delay: 0.15 }}>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Full Name
              </label>
              <div className="relative">
                <UserRound className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input 
                  disabled={loading} 
                  value={fullName} 
                  onChange={(e)=>setFullName(e.target.value)} 
                  className="w-full pl-12 pr-4 py-3.5 bg-gray-50/50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-500 focus:ring-4 focus:ring-green-500/10 transition-all duration-300" 
                  placeholder="Enter your full name" 
                  type="text" 
                />
              </div>
              {errors.fullName && <p className="text-xs text-red-600 mt-1.5 flex items-center gap-1"><span>⚠</span>{errors.fullName}</p>}
            </motion.div>

            {/* Email Input */}
            <motion.div variants={inputVariants} initial="hidden" animate="visible" transition={{ delay: 0.2 }}>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input 
                  disabled={loading} 
                  value={email} 
                  onChange={(e)=>setEmail(e.target.value)} 
                  className="w-full pl-12 pr-4 py-3.5 bg-gray-50/50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-500 focus:ring-4 focus:ring-green-500/10 transition-all duration-300" 
                  placeholder="Enter your email" 
                  type="email" 
                />
              </div>
              {errors.email && <p className="text-xs text-red-600 mt-1.5 flex items-center gap-1"><span>⚠</span>{errors.email}</p>}
            </motion.div>

            {/* Password Input */}
            <motion.div variants={inputVariants} initial="hidden" animate="visible" transition={{ delay: 0.25 }}>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input 
                  disabled={loading} 
                  value={password} 
                  onChange={(e)=>setPassword(e.target.value)} 
                  className="w-full pl-12 pr-12 py-3.5 bg-gray-50/50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-500 focus:ring-4 focus:ring-green-500/10 transition-all duration-300" 
                  placeholder="Enter password" 
                  type={showPassword?"text":"password"} 
                />
                <button 
                  type="button" 
                  onClick={()=>setShowPassword(s=>!s)} 
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors p-1"
                >
                  {showPassword?<EyeOff className="w-5 h-5" />:<Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.password && <p className="text-xs text-red-600 mt-1.5 flex items-center gap-1"><span>⚠</span>{errors.password}</p>}
            </motion.div>

            {/* Confirm Password Input */}
            <motion.div variants={inputVariants} initial="hidden" animate="visible" transition={{ delay: 0.3 }}>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input 
                  disabled={loading} 
                  value={confirmPassword} 
                  placeholder="Confirm your password" 
                  onChange={(e)=>setConfirmPassword(e.target.value)} 
                  className="w-full pl-12 pr-12 py-3.5 bg-gray-50/50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-500 focus:ring-4 focus:ring-green-500/10 transition-all duration-300" 
                  type={showConfirm?"text":"password"} 
                />
                <button 
                  type="button" 
                  onClick={()=>setShowConfirm(s=>!s)} 
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors p-1"
                >
                  {showConfirm?<EyeOff className="w-5 h-5" />:<Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.confirmPassword && <p className="text-xs text-red-600 mt-1.5 flex items-center gap-1"><span>⚠</span>{errors.confirmPassword}</p>}
            </motion.div>

            {/* Submit Button */}
            <motion.div variants={inputVariants} initial="hidden" animate="visible" transition={{ delay: 0.35 }}>
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={loading} 
                className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                {loading?"Creating Account...":"Create Account"}
              </motion.button>
            </motion.div>
          </form>

          {/* Login Link */}
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-8 text-center text-sm text-gray-600"
          >
            Already have an account?{' '}
            <Link href="/login" className="text-green-600 hover:text-green-700 font-semibold transition-colors">Login</Link>
          </motion.p>
        </div>
      </motion.div>
    </div>
  );
}