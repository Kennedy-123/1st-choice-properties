"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin, Heart, ArrowRight, Bed, Bath, Car } from "lucide-react";
import { useFavoriteApartment } from "@/hooks/useFavoriteApartment";

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4
    }
  }
};

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
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col w-full max-w-2xl mx-auto my-6 border border-gray-100 hover:-translate-y-1 h-full"
    >
      {/* Image */}
      <div className="relative w-full h-56 md:h-64 lg:h-72 overflow-hidden flex-shrink-0">
        <Link href={`/apartments/${id}`}>
          <Image
            src={image}
            alt="listing image"
            fill
            className="object-cover transition-transform duration-500 hover:scale-110"
          />
        </Link>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

        {/* ❤️ Favorite Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={toggleFavorite}
          disabled={loading}
          className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm p-2.5 rounded-full shadow-lg hover:bg-white transition-all duration-300"
          aria-label="Add to favorites"
        >
          <Heart 
            className={`w-5 h-5 transition-colors duration-300 ${
              isFavorited ? "text-red-500 fill-current" : "text-gray-600"
            }`} 
          />
        </motion.button>
      </div>
      
      {/* Content */}
      <div className="p-5 flex flex-col gap-3 flex-grow">
        <div className="flex justify-between items-start flex-shrink-0">
          <div className="flex-1 pr-2">
            <h3 className="font-bold text-xl md:text-2xl text-gray-900 truncate" title={title}>
              {title}
            </h3>
          </div>
        </div>

        <div className="flex items-center gap-1 text-gray-500 text-sm md:text-base flex-shrink-0">
          <MapPin className="w-4 h-4 text-green-600 flex-shrink-0" />
          <span className="truncate" title={location}>
            {location}
          </span>
        </div>

        <div className="flex items-baseline gap-2 flex-shrink-0">
          <p className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
            {price}
          </p>
          {apartmentCategory === 'For Rent' && paymentPlan && (
            <span className="text-gray-500 text-sm">/ {paymentPlan}</span>
          )}
        </div>

        {/* Amenities */}
        <div className="flex items-center justify-start gap-3 mt-2 flex-shrink-0">
          <div className="flex items-center gap-1.5 bg-green-50 text-green-700 px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap">
            <Bed className="w-4 h-4" />
            <span>{beds}</span>
          </div>
          <div className="flex items-center gap-1.5 bg-green-50 text-green-700 px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap">
            <Bath className="w-4 h-4" />
            <span>{baths}</span>
          </div>
          <div className="flex items-center gap-1.5 bg-green-50 text-green-700 px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap">
            <Car className="w-4 h-4" />
            <span>{parking}</span>
          </div>
        </div>

        <div className="flex gap-3 mt-4 pt-4 border-t border-gray-100 flex-shrink-0">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 rounded-xl py-3 font-semibold text-white transition-all duration-300 flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
          >
            Book Now
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </div>

        {/* Feedback messages */}
        {message && (
          <motion.p 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-green-600 text-sm mt-2 flex items-center gap-1 flex-shrink-0"
          >
            <span>✓</span>
            {message}
          </motion.p>
        )}
        {error && (
          <motion.p 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-red-600 text-sm mt-2 flex items-center gap-1 flex-shrink-0"
          >
            <span>⚠</span>
            {error}
          </motion.p>
        )}
      </div>
    </motion.div>
  );
}

export default RentPropertyCard;
