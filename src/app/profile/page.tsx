"use client";

import { useProfile } from "@/hooks/useProfile";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  User,
  Mail,
  Shield,
  Calendar,
  RefreshCw,
  CheckCircle,
  XCircle,
  LogOut
} from "lucide-react";
import { useLogout } from "@/hooks/useLogout";

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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8 text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-red-600 text-2xl">⚠</span>
          </div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Error Loading Profile
          </h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <div className="flex gap-3 justify-center">
            <button
              onClick={() => router.push("/")}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all"
            >
              Go Home
            </button>
            <button
              onClick={() => refetch()}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="w-8 h-8 text-gray-400" />
          </div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Profile Not Found
          </h2>
          <p className="text-gray-600 mb-6">
            Unable to load your profile information.
          </p>
          <button
            onClick={() => router.push("/")}
            className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 mt-20">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
              My Profile
            </h1>
            <p className="text-gray-600 mt-1">
              Manage your account information
            </p>
          </div>
          <button
            onClick={() => refetch()}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-white transition-all"
            title="Refresh profile"
          >
            <RefreshCw className="w-4 h-4" />
            <span className="hidden sm:inline">Refresh</span>
          </button>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
          {/* Header Section with Avatar */}
          <div className="bg-gradient-to-r from-green-600 to-green-700 p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row items-center gap-6">
              {/* Avatar */}
              <div className="relative">
                {user.profileUrl ? (
                  <Image
                    src={user.profileUrl}
                    alt={user.fullName}
                    width={128}
                    height={128}
                    className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 border-white object-cover"
                  />
                ) : (
                  <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 border-white bg-white flex items-center justify-center">
                    <User className="w-12 h-12 sm:w-16 sm:h-16 text-green-600" />
                  </div>
                )}
                {user.isOnline && (
                  <div className="absolute bottom-2 right-2 w-4 h-4 bg-green-400 rounded-full border-2 border-white"></div>
                )}
              </div>

              {/* User Info */}
              <div className="flex-1 text-center sm:text-left">
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                  {user.fullName}
                </h2>
                <p className="text-green-100 mb-3">@{user.username}</p>
                <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                  <span
                    className={`px-3 py-1 text-xs font-medium rounded-full ${
                      user.isActive
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {user.isActive ? "Active" : "Inactive"}
                  </span>
                  <span className="px-3 py-1 text-xs font-medium rounded-full bg-white text-green-700">
                    {user.role}
                  </span>
                  {user.isEmailVerified && (
                    <span className="px-3 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-700 flex items-center gap-1">
                      <CheckCircle className="w-3 h-3" />
                      Verified
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Details Section */}
          <div className="p-6 sm:p-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-6">
              Account Information
            </h3>

            <div className="grid sm:grid-cols-2 gap-6">
              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-blue-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-500 mb-1">Email Address</p>
                  <p className="text-gray-800 font-medium break-all">
                    {user.email}
                  </p>
                  {user.isEmailVerified ? (
                    <div className="flex items-center gap-1 mt-1 text-green-600 text-xs">
                      <CheckCircle className="w-3 h-3" />
                      <span>Verified</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1 mt-1 text-red-600 text-xs">
                      <XCircle className="w-3 h-3" />
                      <span>Not Verified</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Username */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <User className="w-5 h-5 text-purple-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-500 mb-1">Username</p>
                  <p className="text-gray-800 font-medium break-all">
                    @{user.username}
                  </p>
                </div>
              </div>

              {/* Role */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Shield className="w-5 h-5 text-orange-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-500 mb-1">Account Role</p>
                  <p className="text-gray-800 font-medium">{user.role}</p>
                </div>
              </div>

              {/* Account Status */}
              <div className="flex items-start gap-4">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                    user.isActive ? "bg-green-100" : "bg-red-100"
                  }`}
                >
                  {user.isActive ? (
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-600" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-500 mb-1">Account Status</p>
                  <p className="text-gray-800 font-medium">
                    {user.isActive ? "Active" : "Inactive"}
                  </p>
                </div>
              </div>

              {/* Last Updated */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Calendar className="w-5 h-5 text-gray-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-500 mb-1">Last Updated</p>
                  <p className="text-gray-800 font-medium">
                    {new Date(user.updatedAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>

              {/* Account ID */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Shield className="w-5 h-5 text-indigo-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-500 mb-1">Account ID</p>
                  <p className="text-gray-800 font-mono text-xs break-all">
                    {user.id}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Actions Section */}
          <div className="bg-gray-50 px-6 sm:px-8 py-4 border-t">
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => router.push("/my-bookings")}
                className="flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all"
              >
                <Calendar className="w-4 h-4" />
                <span>My Bookings</span>
              </button>
              {/* <button
                onClick={() => alert("Edit profile feature coming soon!")}
                className="flex items-center justify-center gap-2 px-4 py-2 border border-blue-300 text-blue-600 rounded-lg hover:bg-blue-50 transition-all"
              >
                <Edit className="w-4 h-4" />
                <span>Edit Profile</span>
              </button> */}
              <button
                onClick={handleLogout}
                className="flex items-center justify-center gap-2 px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-all"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>

        {/* Additional Info Card */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Account Statistics
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <p className="text-2xl font-bold text-green-600">
                {user.isEmailVerified ? "✓" : "✗"}
              </p>
              <p className="text-sm text-gray-600 mt-1">Email Status</p>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <p className="text-2xl font-bold text-blue-600">
                {user.isActive ? "✓" : "✗"}
              </p>
              <p className="text-sm text-gray-600 mt-1">Active Status</p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <p className="text-2xl font-bold text-purple-600">{user.role}</p>
              <p className="text-sm text-gray-600 mt-1">Role</p>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <p className="text-2xl font-bold text-orange-600">
                {user.isOnline ? "●" : "○"}
              </p>
              <p className="text-sm text-gray-600 mt-1">Online Status</p>
            </div>
          </div>
        </div>

        {/* Help Section */}
        <div className="mt-6 bg-white rounded-lg shadow-md p-6 text-center">
          <p className="text-gray-600 mb-2">Need help with your account?</p>
          <a
            href="mailto:support@1stchoiceproperties.com"
            className="text-green-600 hover:text-green-700 font-medium"
          >
            support@1stchoiceproperties.com
          </a>
        </div>
      </div>
    </div>
  );
}
