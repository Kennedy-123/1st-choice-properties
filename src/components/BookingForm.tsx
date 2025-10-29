"use client";

import React, { useState } from "react";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaCommentDots,
  FaCalendarAlt,
  FaBuilding,
} from "react-icons/fa";
import { useBooking } from "@/hooks/useBooking";

const PROPERTY_TYPE_OPTIONS = [
  { label: "maintenance", value: "MAINANCE_REQUEST" },
  { label: "General Inquiry", value: "GENERAL_INQUIRY" },
  { label: "Consultation", value: "CONSULTATION" },
  { label: "Apartment Viewing", value: "APARTMENT_VIEWING" },
];

interface BookingFormProps {
  apartmentId: string;
  apartmentTitle: string;
}

export default function BookingForm({ apartmentTitle }: BookingFormProps) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    propertyType: "",
    viewingDateTime: "",
    message: "",
  });

  const { createBooking, loading, error, success } = useBooking();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Map form fields to API expected fields
    const bookingData = {
      name: formData.fullName,
      phone: formData.phone,
      address: formData.email, // Using email as address field
      message: formData.message,
      bookingType: formData.propertyType,
      scheduleTime: formData.viewingDateTime,
    };

    const result = await createBooking(bookingData);

    // Reset form on success
    if (result) {
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        propertyType: "",
        viewingDateTime: "",
        message: "",
      });
    }
  };

  return (
    <div className="bg-gradient-to-br from-green-700 to-green-600 rounded-2xl p-6 sm:p-8 shadow-xl text-white">
      {/* Header */}
      <div className="flex items-start gap-4 mb-6">
        <div className="bg-green-800/50 p-4 rounded-2xl">
          <FaCalendarAlt className="text-3xl text-white" />
        </div>
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold mb-2">
            Book a Viewing
          </h2>
          <p className="text-green-100 text-sm sm:text-base mb-1">
            {apartmentTitle}
          </p>
          <p className="text-green-100 text-xs sm:text-sm">
            Fill the form and we&apos;ll contact you
          </p>
        </div>
      </div>

      {/* Success Message */}
      {success && (
        <div className="mb-6 bg-white/20 border border-white/30 rounded-lg p-4">
          <p className="text-white font-semibold">
            ✅ Booking request submitted successfully! We&apos;ll contact you
            soon.
          </p>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="mb-6 bg-red-500/20 border border-red-300/30 rounded-lg p-4">
          <p className="text-white font-semibold">{error}</p>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Full Name */}
        <div>
          <label className="block text-white font-semibold mb-2 text-sm sm:text-base">
            Full Name
          </label>
          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-green-200">
              <FaUser className="text-xl" />
            </div>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Enter your Full Name"
              required
              className="w-full bg-green-800/30 border-2 border-green-500/40 rounded-xl py-3 sm:py-4 pl-14 pr-4 text-white placeholder-green-200/60 focus:outline-none focus:border-green-400 transition"
            />
          </div>
        </div>

        {/* Email Address */}
        <div>
          <label className="block text-white font-semibold mb-2 text-sm sm:text-base">
            Email Address
          </label>
          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-green-200">
              <FaEnvelope className="text-xl" />
            </div>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your Email Address"
              required
              className="w-full bg-green-800/30 border-2 border-green-500/40 rounded-xl py-3 sm:py-4 pl-14 pr-4 text-white placeholder-green-200/60 focus:outline-none focus:border-green-400 transition"
            />
          </div>
        </div>

        {/* Phone Number */}
        <div>
          <label className="block text-white font-semibold mb-2 text-sm sm:text-base">
            Phone Number
          </label>
          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-green-200">
              <FaPhone className="text-xl" />
            </div>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter your Phone Number"
              required
              className="w-full bg-green-800/30 border-2 border-green-500/40 rounded-xl py-3 sm:py-4 pl-14 pr-4 text-white placeholder-green-200/60 focus:outline-none focus:border-green-400 transition"
            />
          </div>
        </div>

        {/* Property Type */}
        <div>
          <label className="block text-white font-semibold mb-2 text-sm sm:text-base">
            Property Type
          </label>
          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-green-200">
              <FaBuilding className="text-xl" />
            </div>
            <select
              name="propertyType"
              value={formData.propertyType}
              onChange={handleSelectChange}
              required
              className="w-full bg-green-800/30 border-2 border-green-500/40 rounded-xl py-3 sm:py-4 pl-14 pr-4 text-white focus:outline-none focus:border-green-400 transition appearance-none cursor-pointer"
            >
              <option value="" disabled className="bg-green-800 text-white">
                Select Property Type
              </option>
              {PROPERTY_TYPE_OPTIONS.map((option) => (
                <option
                  key={option.value}
                  value={option.value}
                  className="bg-green-800 text-white"
                >
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Viewing Date & Time */}
        <div>
          <label className="block text-white font-semibold mb-2 text-sm sm:text-base">
            Preferred Viewing Date & Time
          </label>
          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-green-200">
              <FaCalendarAlt className="text-xl" />
            </div>
            <input
              type="datetime-local"
              name="viewingDateTime"
              value={formData.viewingDateTime}
              onChange={handleChange}
              required
              className="w-full bg-green-800/30 border-2 border-green-500/40 rounded-xl py-3 sm:py-4 pl-14 pr-4 text-white focus:outline-none focus:border-green-400 transition cursor-pointer"
            />
          </div>
        </div>

        {/* Message (Optional) */}
        <div>
          <label className="block text-white font-semibold mb-2 text-sm sm:text-base">
            Message (Optional)
          </label>
          <div className="relative">
            <div className="absolute left-4 top-4 text-green-200">
              <FaCommentDots className="text-xl" />
            </div>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Enter your Message (Optional)"
              rows={4}
              className="w-full bg-green-800/30 border-2 border-green-500/40 rounded-xl py-3 sm:py-4 pl-14 pr-4 text-white placeholder-green-200/60 focus:outline-none focus:border-green-400 transition resize-none"
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-white hover:cursor-pointer hover:bg-gray-200 disabled:opacity-60 disabled:cursor-not-allowed text-green-700 font-bold py-4 rounded-xl text-base sm:text-lg transition shadow-lg hover:shadow-xl"
        >
          {loading ? "Submitting..." : "Submit Booking Request"}
        </button>
      </form>
    </div>
  );
}
