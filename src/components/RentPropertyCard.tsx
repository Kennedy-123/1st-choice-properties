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
  apartmentCategory?: string
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
  apartmentCategory
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
    <div className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col w-full max-w-2xl mx-auto my-6">
      {/* Image */}
      <div className="relative w-full h-48 md:h-64 lg:h-72">
        <Link href={`/apartments/${id}`}>
          <Image
            src={image}
            alt="listing image"
            fill
            className="object-cover"
          />
        </Link>

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
      {/* Content */}
      <div className="p-4 flex flex-col gap-2 flex-1">
        <div className="font-semibold text-lg md:text-xl text-gray-900 truncate" title={title}>
          {title}
        </div>

        <div className="font-bold text-green-600 text-lg md:text-xl">
          {price} {apartmentCategory === 'For Rent' && paymentPlan ? `/ ${paymentPlan}` : ''}
        </div>

        <div className="flex items-center text-gray-500 text-sm md:text-base gap-1 overflow-hidden">
          <FaMapMarkerAlt className="text-green-600 flex-shrink-0" />
          <span className="truncate" title={location}>
            {location}
          </span>
        </div>

        <div className="flex items-center justify-start mt-2 gap-2 text-gray-700 text-sm md:text-base overflow-hidden">
          <span className="flex-shrink-0 flex items-center gap-1 bg-gray-300 px-2 py-1 rounded-sm whitespace-nowrap overflow-hidden text-ellipsis max-w-[33%]">
            {beds}
          </span>
          <span className="flex-shrink-0 flex items-center gap-1 bg-gray-300 px-2 py-1 rounded-sm whitespace-nowrap overflow-hidden text-ellipsis max-w-[33%]">
            {baths}
          </span>
          <span className="flex-shrink-0 flex items-center gap-1 bg-gray-300 px-2 py-1 rounded-sm whitespace-nowrap overflow-hidden text-ellipsis max-w-[33%]">
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
    </div>
  );
}

export default RentPropertyCard;
