"use client";

import React from "react";
import { useParams } from "next/navigation";
import { useApartmentById } from "@/hooks/useApartmentById";
import { useFavoriteApartment } from "@/hooks/useFavoriteApartment";
import Link from "next/link";
import Loader from "@/components/Loader";
import BookingForm from "@/components/BookingForm";
import ImageSlider from "@/components/ImageSlider";

export default function ApartmentDetailPage() {
  const params = useParams();
  const id = params?.id as string;

  const { apartment, loading, error } = useApartmentById(id);
  const {
    addToFavorites,
    loading: favLoading,
    message,
    error: favError,
  } = useFavoriteApartment();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader color="border-green-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 min-h-screen flex items-center justify-center">
        <p className="text-center text-red-600">{error}</p>
      </div>
    );
  }

  if (!apartment) {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 min-h-screen flex items-center justify-center">
        <p className="text-center text-gray-600">No apartment found</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 mt-8 sm:mt-12">
      {/* Back Button */}
      <Link
        href="/rent"
        className="inline-flex items-center text-green-600 hover:text-green-700 mb-6"
      >
        <svg
          className="w-5 h-5 mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
        Back to listings
      </Link>

      {/* Success/Error Messages */}
      {favError && (
        <div className="mb-4 rounded border border-red-200 bg-red-50 p-3 text-red-700">
          {favError}
        </div>
      )}
      {message && (
        <div className="mb-4 rounded border border-green-200 bg-green-50 p-3 text-green-700">
          {message}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Gallery and Details */}
        <div className="lg:col-span-2 space-y-8">
          <ImageSlider
            images={apartment.gallery || []}
            title={apartment.title}
          />

          {/* Details Section */}
          <div className="space-y-6">
            {/* Category Badge */}
            <div>
              <span className="inline-block px-3 py-1 text-sm bg-green-100 font-bold text-green-800 rounded-full">
                {apartment.apartmentCategory.name}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
              {apartment.title}
            </h1>

            {/* Location */}
            <div className="flex items-center text-gray-600">
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <span>{apartment.location}</span>
            </div>

            {/* Price */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <p className="text-3xl font-bold text-green-600">
                ₦{Number(apartment.price).toLocaleString()}
              </p>
              <p className="text-gray-600 mt-1">
                {apartment.apartmentCategory.name !== "For Sale" &&
                  `Payment Plan: ${apartment.paymentPlan}`}
              </p>
            </div>

            {/* Features */}
            {apartment.features && apartment.features.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">
                  Features
                </h2>
                <div className="flex flex-wrap gap-2">
                  {apartment.features.map((feature) => (
                    <span
                      key={feature.id}
                      className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm"
                    >
                      {feature.featureName}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Description */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                Description
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {apartment.description}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                onClick={() => addToFavorites(apartment.id)}
                disabled={favLoading}
                className="flex-1 bg-green-600 hover:bg-green-700 hover:cursor-pointer disabled:opacity-60 text-white py-3 px-6 rounded-lg font-semibold transition"
              >
                {favLoading ? "Processing..." : "Add to Favorites ❤️"}
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Booking Form */}
        <div className="lg:col-span-1">
          <div className="lg:sticky lg:top-24">
            <BookingForm
              apartmentId={apartment.id}
              apartmentTitle={apartment.title}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
