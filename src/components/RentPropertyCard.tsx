"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaMapMarkerAlt, FaHeart, FaRegHeart } from "react-icons/fa";
import { useFavoriteApartment } from "@/hooks/useFavoriteApartment"; // 👈 import the hook

type RentPropertyCardProps = {
  id: string;
  image: string;
  title: string;
  location: string;
  beds: string;
  baths: string;
  parking: string;
  price: string;
  paymentPlan?: string;
};

function RentPropertyCard({
  id,
  image,
  title,
  location,
  beds,
  baths,
  parking,
  price,
  paymentPlan,
}: RentPropertyCardProps) {
  const [isFavorited, setIsFavorited] = useState(false);
  const { addToFavorites, loading, message, error } = useFavoriteApartment();

  const toggleFavorite = async () => {
    if (!isFavorited) {
      await addToFavorites(id);
    }
    setIsFavorited((prev) => !prev);
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col w-full sm:w-[90%] md:w-[80%] lg:w-[72%] mx-auto my-6">
      {/* Image */}
      <div className="relative w-full h-48 md:h-64 lg:h-72">
        <Image src={image} alt="listing image" fill className="object-cover" />

        {/* ❤️ Favorite */}
        <button
          onClick={toggleFavorite}
          disabled={loading}
          className="absolute top-2 right-2 hover:cursor-pointer bg-white/80 p-2 rounded-full hover:bg-white transition"
          aria-label="Add to favorites"
        >
          {isFavorited ? (
            <FaHeart className="text-red-500 text-lg md:text-xl" />
          ) : (
            <FaRegHeart className="text-gray-700 text-lg md:text-xl" />
          )}
        </button>
      </div>

      <Link href={`/apartments/${id}`}>
        {/* Content */}
        <div className="p-4 flex flex-col gap-2 flex-1">
          <div className="font-semibold text-lg md:text-xl text-gray-900">
            {title}
          </div>

          <div className="font-bold text-green-600 text-lg md:text-xl">
            {price} {paymentPlan && `/ ${paymentPlan}`}
          </div>

          <div className="flex items-center text-gray-500 text-sm md:text-base gap-1">
            <FaMapMarkerAlt className="text-green-600" />
            {location}
          </div>

          <div className="flex flex-wrap items-center justify-start mt-2 gap-2 md:gap-4 text-gray-700 text-sm md:text-base">
            <span className="flex items-center gap-1 bg-gray-300 p-1 rounded-sm">
              {beds}
            </span>
            <span className="flex items-center gap-1 bg-gray-300 p-1 rounded-sm">
              {baths}
            </span>
            <span className="flex items-center gap-1 bg-gray-300 p-1 rounded-sm">
              {parking}
            </span>
          </div>

          <div className="flex gap-2 mt-3">
            <button className="flex-1 bg-green-600 rounded-md hover:cursor-pointer py-2 font-bold text-white hover:bg-green-700 transition text-sm md:text-base">
              Book Now
            </button>
          </div>

          {/* Feedback messages */}
          {message && <p className="text-green-600 text-sm mt-2">{message}</p>}
          {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
        </div>
      </Link>
    </div>
  );
}

export default RentPropertyCard;
