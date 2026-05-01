"use client";

import React from "react";
import { useFavorites } from "@/hooks/useFavorites";
import { useFavoriteApartment } from "@/hooks/useFavoriteApartment";
import Image from "next/image";
import Link from "next/link";
import Loader from "@/components/Loader";
import { motion } from "framer-motion";
import { Heart, MapPin, Trash2, ArrowRight } from "lucide-react";

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5
    }
  }
};

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
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex justify-center items-center h-screen"
      >
        <Loader color="border-green-600" />
      </motion.div>
    );
  }

  if (error) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 min-h-screen flex items-center justify-center"
      >
        <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-xl flex items-center gap-2">
          <span>⚠</span>
          <p className="text-center">{error}</p>
        </div>
      </motion.div>
    );
  }

  if (favorites.length === 0) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 min-h-screen flex items-center justify-center"
      >
        <div className="bg-gray-50 px-8 py-12 rounded-2xl max-w-md mx-auto text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-red-400 to-pink-400 rounded-full flex items-center justify-center mx-auto mb-4">
            <Heart className="w-8 h-8 text-white" />
          </div>
          <p className="text-gray-600 text-lg font-semibold mb-2">No favorites yet</p>
          <p className="text-gray-400 text-sm">Start adding properties you love!</p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      variants={sectionVariants}
      initial="hidden"
      animate="visible"
      className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 mt-8 sm:mt-12"
    >
      {/* Page Header */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="w-12 h-1 bg-gradient-to-r from-transparent to-green-500" />
          <Heart className="w-6 h-6 text-red-500 fill-current" />
          <div className="w-12 h-1 bg-gradient-to-l from-transparent to-green-500" />
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-4">
          My Favorites
        </h1>
        <p className="text-gray-600 text-lg">
          {favorites.length} {favorites.length === 1 ? 'property' : 'properties'} saved
        </p>
      </motion.div>

      {/* Messages */}
      {favError && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-red-700 flex items-center gap-2"
        >
          <span>⚠</span>
          {favError}
        </motion.div>
      )}
      {message && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 rounded-xl border border-green-200 bg-green-50 p-4 text-green-700 flex items-center gap-2"
        >
          <span>✓</span>
          {message}
        </motion.div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {favorites.map((apt, index) => (
          <motion.div
            key={apt.id}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: index * 0.1 }}
            className="h-full"
          >
            <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col h-full border border-gray-100 hover:-translate-y-2">
              <div className="relative w-full aspect-[16/9] overflow-hidden">
                <Image
                  src={apt.gallery[0]?.imageUrl || "/placeholder.jpg"}
                  alt={apt.title}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute top-3 right-3">
                  <div className="bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg">
                    <Heart className="w-5 h-5 text-red-500 fill-current" />
                  </div>
                </div>
              </div>

              <div className="p-5 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-gray-900 truncate mb-2">{apt.title}</h3>
                <div className="flex items-center gap-1 text-gray-500 text-sm mb-3">
                  <MapPin className="w-4 h-4 text-green-600 flex-shrink-0" />
                  <span className="truncate">{apt.location}</span>
                </div>
                <p className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-3">
                  ₦{apt.price}
                  <span className="text-gray-500 text-sm font-normal"> / {apt.paymentPlan}</span>
                </p>

                <div className="flex flex-wrap gap-2 mb-4 flex-grow">
                  {apt.features.slice(0, 3).map((f) => (
                    <span
                      key={f.id}
                      className="px-3 py-1.5 text-xs bg-green-50 text-green-700 rounded-full font-medium whitespace-nowrap"
                    >
                      {f.featureName}
                    </span>
                  ))}
                  {apt.features.length > 3 && (
                    <span className="px-3 py-1.5 text-xs bg-gray-100 text-gray-600 rounded-full font-medium">
                      +{apt.features.length - 3} more
                    </span>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="flex-1">
                    <Link
                      href={`/apartments/${apt.id}`}
                      className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white py-3 rounded-xl font-semibold transition-all duration-300 shadow-md hover:shadow-lg"
                    >
                      View Details
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </motion.div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={async () => {
                      await removeFromFavorites(apt.id);
                      await refetch();
                    }}
                    disabled={favLoading}
                    className="flex items-center justify-center gap-2 flex-1 bg-white border-2 border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 disabled:opacity-60 disabled:cursor-not-allowed py-3 rounded-xl font-semibold transition-all duration-300"
                  >
                    <Trash2 className="w-4 h-4" />
                    Remove
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
