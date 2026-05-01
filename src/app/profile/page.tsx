"use client";

import { useProfile } from "@/hooks/useProfile";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  User,
  Mail,
  Shield,
  Calendar,
  CheckCircle,
  XCircle,
  LogOut
} from "lucide-react";
import { useLogout } from "@/hooks/useLogout";
import { motion } from "framer-motion";

const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5
    }
  }
};

export default function ProfilePage() {
  const { logoutUser } = useLogout();
  const { user, loading, error, refetch } = useProfile();
  const router = useRouter();

  const handleLogout = async () => {
    // Clear auth token
    await logoutUser();
  };

  if (loading) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 flex items-center justify-center"
      >
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-green-600 border-t-transparent shadow-lg mx-auto"></div>
          <p className="mt-6 text-gray-600 text-lg">Loading your profile...</p>
        </div>
      </motion.div>
    );
  }

  if (error) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 flex items-center justify-center px-4"
      >
        <div className="max-w-md w-full bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl p-8 text-center border border-white/50">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-red-600 text-3xl">⚠</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-3">
            Error Loading Profile
          </h2>
          <p className="text-gray-600 mb-8 text-lg">{error}</p>
          <div className="flex gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push("/")}
              className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all font-medium"
            >
              Go Home
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => refetch()}
              className="px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all font-medium shadow-lg hover:shadow-xl"
            >
              Try Again
            </motion.button>
          </div>
        </div>
      </motion.div>
    );
  }

  if (!user) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 flex items-center justify-center px-4"
      >
        <div className="max-w-md w-full bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl p-8 text-center border border-white/50">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <User className="w-10 h-10 text-gray-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-3">
            Profile Not Found
          </h2>
          <p className="text-gray-600 mb-8 text-lg">
            Unable to load your profile information.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.push("/")}
            className="px-8 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all font-medium shadow-lg hover:shadow-xl"
          >
            Go Home
          </motion.button>
        </div>
      </motion.div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 pt-5">
      {/* Background Decorations */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />
      <div className="absolute bottom-20 right-20 w-72 h-72 bg-emerald-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: "1s" }} />
      
      <motion.div 
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 py-12 px-4 mt-8"
      >
        <div className="max-w-5xl mx-auto">
          {/* Page Header */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-12 h-1 bg-gradient-to-r from-transparent to-green-500" />
              <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-emerald-600 rounded-full flex items-center justify-center">
                <User className="w-8 h-8 text-white" />
              </div>
              <div className="w-12 h-1 bg-gradient-to-l from-transparent to-green-500" />
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-4">
              My Profile
            </h1>
            <p className="text-gray-600 text-lg">Manage your account information</p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Profile Card */}
            <motion.div 
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="lg:col-span-2"
            >
              <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-white/50">
                {/* Profile Header */}
                <div className="bg-gradient-to-br from-green-600 to-emerald-600 p-8">
                  <div className="flex flex-col sm:flex-row items-center gap-6">
                    {/* Avatar */}
                    <motion.div 
                      whileHover={{ scale: 1.05 }}
                      className="relative"
                    >
                      {user.profileUrl ? (
                        <Image
                          src={user.profileUrl}
                          alt={user.fullName}
                          width={128}
                          height={128}
                          className="w-28 h-28 sm:w-32 sm:h-32 rounded-full border-4 border-white/50 object-cover shadow-xl"
                        />
                      ) : (
                        <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full border-4 border-white/50 bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-xl">
                          <User className="w-14 h-14 sm:w-16 sm:h-16 text-white" />
                        </div>
                      )}
                      {user.isOnline && (
                        <motion.div 
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ repeat: Infinity, duration: 2 }}
                          className="absolute bottom-2 right-2 w-6 h-6 bg-green-400 rounded-full border-3 border-white shadow-lg"
                        />
                      )}
                    </motion.div>

                    {/* User Info */}
                    <div className="flex-1 text-center sm:text-left">
                      <h2 className="text-3xl sm:text-4xl font-bold text-white mb-2">
                        {user.fullName}
                      </h2>
                      <p className="text-green-100 mb-4 text-lg">@{user.username}</p>
                      <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                        <span
                          className={`px-4 py-2 text-sm font-semibold rounded-full ${
                            user.isActive
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {user.isActive ? "Active" : "Inactive"}
                        </span>
                        <span className="px-4 py-2 text-sm font-semibold rounded-full bg-white text-green-700">
                          {user.role}
                        </span>
                        {user.isEmailVerified && (
                          <span className="px-4 py-2 text-sm font-semibold rounded-full bg-blue-100 text-blue-700 flex items-center gap-1">
                            <CheckCircle className="w-4 h-4" />
                            Verified
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Account Details */}
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-800 mb-6">Account Information</h3>

                  <div className="grid sm:grid-cols-2 gap-6">
                    {/* Email */}
                    <motion.div 
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 }}
                      className="flex items-start gap-4 p-4 bg-blue-50 rounded-2xl"
                    >
                      <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Mail className="w-6 h-6 text-blue-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-gray-500 mb-1 font-medium">Email Address</p>
                        <p className="text-gray-800 font-semibold break-all">
                          {user.email}
                        </p>
                        {user.isEmailVerified ? (
                          <div className="flex items-center gap-1 mt-2 text-green-600 text-sm font-medium">
                            <CheckCircle className="w-4 h-4" />
                            <span>Verified</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-1 mt-2 text-red-600 text-sm font-medium">
                            <XCircle className="w-4 h-4" />
                            <span>Not Verified</span>
                          </div>
                        )}
                      </div>
                    </motion.div>

                    {/* Username */}
                    <motion.div 
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                      className="flex items-start gap-4 p-4 bg-purple-50 rounded-2xl"
                    >
                      <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                        <User className="w-6 h-6 text-purple-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-gray-500 mb-1 font-medium">Username</p>
                        <p className="text-gray-800 font-semibold break-all">
                          @{user.username}
                        </p>
                      </div>
                    </motion.div>

                    {/* Role */}
                    <motion.div 
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                      className="flex items-start gap-4 p-4 bg-orange-50 rounded-2xl"
                    >
                      <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Shield className="w-6 h-6 text-orange-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-gray-500 mb-1 font-medium">Account Role</p>
                        <p className="text-gray-800 font-semibold">{user.role}</p>
                      </div>
                    </motion.div>

                    {/* Account Status */}
                    <motion.div 
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 }}
                      className={`flex items-start gap-4 p-4 rounded-2xl ${
                        user.isActive ? "bg-green-50" : "bg-red-50"
                      }`}
                    >
                      <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                          user.isActive ? "bg-green-100" : "bg-red-100"
                        }`}
                      >
                        {user.isActive ? (
                          <CheckCircle className="w-6 h-6 text-green-600" />
                        ) : (
                          <XCircle className="w-6 h-6 text-red-600" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-gray-500 mb-1 font-medium">Account Status</p>
                        <p className="text-gray-800 font-semibold">
                          {user.isActive ? "Active" : "Inactive"}
                        </p>
                      </div>
                    </motion.div>

                    {/* Last Updated */}
                    <motion.div 
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 }}
                      className="flex items-start gap-4 p-4 bg-gray-50 rounded-2xl sm:col-span-2"
                    >
                      <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Calendar className="w-6 h-6 text-gray-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-gray-500 mb-1 font-medium">Last Updated</p>
                        <p className="text-gray-800 font-semibold">
                          {new Date(user.updatedAt).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </p>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Actions Card */}
              <motion.div 
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-6 border border-white/50"
              >
                <h3 className="text-xl font-bold text-gray-800 mb-6">Quick Actions</h3>
                <div className="space-y-3">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => router.push("/my-bookings")}
                    className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all font-semibold shadow-lg hover:shadow-xl"
                  >
                    <Calendar className="w-5 h-5" />
                    <span>My Bookings</span>
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center gap-3 px-4 py-3 border-2 border-red-200 text-red-600 rounded-xl hover:bg-red-50 hover:border-red-300 transition-all font-semibold"
                  >
                    <LogOut className="w-5 h-5" />
                    <span>Logout</span>
                  </motion.button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    </main>
  );
}
