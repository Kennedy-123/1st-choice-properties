"use client";

import { useUserBookings } from "@/hooks/useUserBookings";
import { useUpdateBooking } from "@/hooks/useUpdateBooking";
import { useRouter } from "next/navigation";
import { Calendar, MapPin, Phone, User, Mail, Clock, RefreshCw, Trash2, Edit, Eye } from "lucide-react";
import { useState, useEffect } from "react";

export default function MyBookingsPage() {
  const { bookings, loading, error, deleting, refetch, deleteBooking } = useUserBookings();
  const { updateBooking, updating } = useUpdateBooking();
  const router = useRouter();
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [editingBooking, setEditingBooking] = useState<string | null>(null);
  const [editMessage, setEditMessage] = useState<string>("");
  const [editStatus, setEditStatus] = useState<"PENDING" | "CONFIRMED" | "CANCELLED" | "COMPLETED">("PENDING");

  const handleDelete = async (id: string) => {
    const result = await deleteBooking(id);
    if (result.success) {
      setDeleteConfirm(null);
    } else {
      alert(result.error || "Failed to delete booking");
    }
  };

  const handleUpdate = async (id: string) => {
    const result = await updateBooking(id, { 
      status: editStatus,
      message: editMessage.trim() || undefined 
    });
    if (result.success) {
      setEditingBooking(null);
      setEditMessage("");
      refetch();
    } else {
      alert(result.error || "Failed to update booking");
    }
  };

  const startEditing = (booking: typeof bookings[0]) => {
    setEditingBooking(booking.id);
    setEditStatus(booking.status as "PENDING" | "CONFIRMED" | "CANCELLED" | "COMPLETED");
    setEditMessage(booking.message || "");
  };

  const cancelEditing = () => {
    setEditingBooking(null);
    setEditMessage("");
  };

  // Close edit modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (editingBooking) {
        const target = event.target as HTMLElement;
        if (target.classList.contains('modal-backdrop')) {
          cancelEditing();
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [editingBooking]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your bookings...</p>
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
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Error Loading Bookings</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <div className="flex gap-3 justify-center">
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

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 mt-20">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">My Bookings</h1>
            <p className="text-gray-600 mt-1">
              View and manage your property booking requests
            </p>
          </div>
          <button
            onClick={() => refetch()}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all"
            title="Refresh bookings"
          >
            <RefreshCw className="w-4 h-4" />
            <span className="hidden sm:inline">Refresh</span>
          </button>
        </div>

        {/* Bookings List */}
        {bookings.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="w-10 h-10 text-gray-400" />
            </div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">No Bookings Yet</h2>
            <p className="text-gray-600 mb-6">
              You haven&apos;t made any booking requests yet. Start exploring properties!
            </p>
            <button
              onClick={() => router.push("/apartments")}
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all"
            >
              Browse Properties
            </button>
          </div>
        ) : (
          <div className="grid gap-6">
            {bookings.map((booking) => (
              <div
                key={booking.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800 mb-1">
                        {booking.bookingType.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                      </h3>
                      <p className="text-sm text-gray-500">
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
                    <span className={`px-3 py-1 text-sm font-medium rounded-full ${
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

                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div className="flex items-start gap-3">
                      <User className="w-5 h-5 text-gray-400 mt-0.5" />
                      <div>
                        <p className="text-sm text-gray-500">Name</p>
                        <p className="text-gray-800 font-medium">{booking.name}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Phone className="w-5 h-5 text-gray-400 mt-0.5" />
                      <div>
                        <p className="text-sm text-gray-500">Phone</p>
                        <p className="text-gray-800 font-medium">{booking.phone}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
                      <div>
                        <p className="text-sm text-gray-500">Address</p>
                        <p className="text-gray-800 font-medium">{booking.address}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Clock className="w-5 h-5 text-gray-400 mt-0.5" />
                      <div>
                        <p className="text-sm text-gray-500">Schedule Time</p>
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
                    <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-start gap-3">
                        <Mail className="w-5 h-5 text-gray-400 mt-0.5" />
                        <div className="flex-1">
                          <p className="text-sm text-gray-500 mb-1">Message</p>
                          <p className="text-gray-700">{booking.message}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="bg-gray-50 px-4 sm:px-6 py-4 border-t flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <p className="text-sm text-gray-600">
                    Booking ID: <span className="font-mono text-gray-800">{booking.id}</span>
                  </p>
                  <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                    <button
                      onClick={() => router.push(`/my-bookings/${booking.id}`)}
                      className="flex items-center gap-2 px-3 sm:px-4 py-2 text-green-600 hover:bg-green-50 rounded-lg transition-all"
                    >
                      <Eye className="w-4 h-4" />
                      <span className="text-sm font-medium hidden sm:inline">View Details</span>
                      <span className="text-sm font-medium sm:hidden">View</span>
                    </button>
                    
                    <button
                      onClick={() => startEditing(booking)}
                      disabled={updating === booking.id}
                      className="flex items-center gap-2 px-3 sm:px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Edit className="w-4 h-4" />
                      <span className="text-sm font-medium hidden sm:inline">Edit</span>
                    </button>
                    
                    <button
                      onClick={() => setDeleteConfirm(booking.id)}
                      disabled={deleting === booking.id}
                      className="flex items-center gap-2 px-3 sm:px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {deleting === booking.id ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-600"></div>
                          <span className="text-sm font-medium hidden sm:inline">Deleting...</span>
                        </>
                      ) : (
                        <>
                          <Trash2 className="w-4 h-4" />
                          <span className="text-sm font-medium hidden sm:inline">Delete</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Summary */}
        {bookings.length > 0 && (
          <div className="mt-8 bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600">Total Bookings</p>
                <p className="text-2xl font-bold text-gray-800">{bookings.length}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">
                  Need help? Contact our support team
                </p>
                <a
                  href="mailto:support@1stchoiceproperties.com"
                  className="text-green-600 hover:text-green-700 font-medium text-sm"
                >
                  support@1stchoiceproperties.com
                </a>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Edit Booking Modal */}
      {editingBooking && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4 modal-backdrop">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Edit className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Edit Booking</h3>
                <p className="text-sm text-gray-500">Update status and message</p>
              </div>
            </div>
            
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status
                </label>
                <select
                  value={editStatus}
                  onChange={(e) => setEditStatus(e.target.value as typeof editStatus)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="PENDING">Pending</option>
                  <option value="CONFIRMED">Confirmed</option>
                  <option value="CANCELLED">Cancelled</option>
                  <option value="COMPLETED">Completed</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message (Optional)
                </label>
                <textarea
                  value={editMessage}
                  onChange={(e) => setEditMessage(e.target.value)}
                  placeholder="Add or update your message..."
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                />
              </div>
            </div>
            
            <div className="flex gap-3 justify-end">
              <button
                onClick={cancelEditing}
                disabled={updating === editingBooking}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={() => handleUpdate(editingBooking)}
                disabled={updating === editingBooking}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:cursor-pointer hover:bg-green-700 transition-all disabled:opacity-50 flex items-center gap-2"
              >
                {updating === editingBooking ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Updating...</span>
                  </>
                ) : (
                  <>
                    <Edit className="w-4 h-4" />
                    <span>Update Booking</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <Trash2 className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Delete Booking</h3>
                <p className="text-sm text-gray-500">This action cannot be undone</p>
              </div>
            </div>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this booking? All information related to this booking will be permanently removed.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setDeleteConfirm(null)}
                disabled={deleting === deleteConfirm}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirm)}
                disabled={deleting === deleteConfirm}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all disabled:opacity-50 flex items-center gap-2"
              >
                {deleting === deleteConfirm ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Deleting...</span>
                  </>
                ) : (
                  <>
                    <Trash2 className="w-4 h-4" />
                    <span>Delete Booking</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
