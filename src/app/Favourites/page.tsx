"use client";

import React from "react";
import { useFavorites } from "@/hooks/useFavorites";
import { useFavoriteApartment } from "@/hooks/useFavoriteApartment";
import Image from "next/image";
import Link from "next/link";
import Loader from "@/components/Loader";

export default function FavoritesPage() {
  const { favorites, loading, error, refetch } = useFavorites();
  const {
    removeFromFavorites,
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
        <p className="text-center text-red-600 mt-10">{error}</p>
      </div>
    );
  }

  if (favorites.length === 0) {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 min-h-screen flex items-center justify-center">
        <p className="text-center text-black">No favorites yet ❤️</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 mt-8 sm:mt-12">
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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {favorites.map((apt) => (
          <div
            key={apt.id}
            className="bg-white shadow rounded-xl overflow-hidden hover:shadow-lg transition flex flex-col h-full"
          >
            <div className="relative w-full aspect-[16/9]">
              <Image
                src={apt.gallery[0]?.imageUrl || "/placeholder.jpg"}
                alt={apt.title}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover"
              />
            </div>

            <div className="p-4 flex flex-col flex-1">
              <h3 className="text-lg font-semibold truncate">{apt.title}</h3>
              <p className="text-green-600 font-bold mt-1">
                ₦{apt.price} / {apt.paymentPlan}
              </p>
              <p className="text-gray-500 text-sm mt-1">{apt.location}</p>

              <div className="flex flex-wrap gap-2 mt-3">
                {apt.features.map((f) => (
                  <span
                    key={f.id}
                    className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded"
                  >
                    {f.featureName}
                  </span>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-3 mt-4">
                <Link
                  href={`/apartments/${apt.id}`}
                  className="flex-1 w-full sm:w-auto text-center bg-green-600 hover:bg-green-700 text-white py-2 rounded"
                >
                  View Details
                </Link>
                <button
                  onClick={async () => {
                    await removeFromFavorites(apt.id);
                    await refetch();
                  }}
                  disabled={favLoading}
                  className="flex-1 w-full sm:w-auto text-center bg-red-500 disabled:opacity-60 hover:cursor-pointer hover:bg-red-600 text-white py-2 rounded"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
