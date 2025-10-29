"use client";

import { useBookingById } from "@/hooks/useBookingById";
import { useParams, useRouter } from "next/navigation";
import { Calendar, MapPin, Phone, User, Mail, Clock, ArrowLeft, RefreshCw } from "lucide-react";

export default function BookingDetailPage() {
  const params = useParams();
  const router = useRouter();
  const bookingId = params.id as string;
  const { booking, loading, error, refetch } = useBookingById(bookingId);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading booking details...</p>
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
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Error Loading Booking</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <div className="flex gap-3 justify-center">
            <button
              onClick={() => router.back()}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all"
            >
              Go Back
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

  if (!booking) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Calendar className="w-8 h-8 text-gray-400" />
          </div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Booking Not Found</h2>
          <p className="text-gray-600 mb-6">The booking you&apos;re looking for doesn&apos;t exist.</p>
          <button
            onClick={() => router.push("/my-bookings")}
            className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all"
          >
            View All Bookings
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 mt-20">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-white rounded-lg transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>
          <button
            onClick={() => refetch()}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-white transition-all"
            title="Refresh booking"
          >
            <RefreshCw className="w-4 h-4" />
            <span className="hidden sm:inline">Refresh</span>
          </button>
        </div>

        {/* Booking Details Card */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-green-600 to-green-700 p-4 sm:p-6 text-white">
            <div className="flex flex-col sm:flex-row items-start justify-between gap-3">
              <div className="flex-1">
                <h1 className="text-xl sm:text-2xl font-bold mb-2">
                  {booking.bookingType.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                </h1>
                <p className="text-green-100">
                  {booking.createdAt 
                    ? `Requested on ${new Date(booking.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}`
                    : `Updated on ${new Date(booking.updatedAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}`
                  }
                </p>
              </div>
              <span className={`px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium rounded-full whitespace-nowrap ${
                booking.status === "PENDING" 
                  ? "bg-yellow-100 text-yellow-700" 
                  : booking.status === "CONFIRMED"
                  ? "bg-green-100 text-green-700"
                  : booking.status === "CANCELLED"
                  ? "bg-red-100 text-red-700"
                  : booking.status === "COMPLETED"
                  ? "bg-blue-100 text-blue-700"
                  : "bg-gray-100 text-gray-700"
              }`}>
                {booking.status.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}
              </span>
            </div>
          </div>

          {/* Details Section */}
          <div className="p-4 sm:p-6">
            <h2 className="text-base sm:text-lg font-semibold text-gray-800 mb-4">Booking Information</h2>
            
            <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <User className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Full Name</p>
                  <p className="text-gray-800 font-medium">{booking.name}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Phone Number</p>
                  <p className="text-gray-800 font-medium">{booking.phone}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Address</p>
                  <p className="text-gray-800 font-medium">{booking.address}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Scheduled Time</p>
                  <p className="text-gray-800 font-medium">
                    {new Date(booking.scheduleTime).toLocaleString("en-US", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                  </p>
                </div>
              </div>
            </div>

            {booking.message && (
              <div className="mt-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-500 mb-2">Additional Message</p>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="text-gray-700 whitespace-pre-wrap">{booking.message}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer Section */}
          <div className="bg-gray-50 px-4 sm:px-6 py-4 border-t">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0 text-sm">
              <div>
                <p className="text-gray-500">Booking ID</p>
                <p className="font-mono text-gray-800 font-medium">{booking.id}</p>
              </div>
              <div className="text-right">
                <p className="text-gray-500">Last Updated</p>
                <p className="text-gray-800 font-medium">
                  {new Date(booking.updatedAt).toLocaleString("en-US", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Help Section */}
        <div className="mt-6 bg-white rounded-lg shadow-md p-6 text-center">
          <p className="text-gray-600 mb-2">Need help with your booking?</p>
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
