"use client";
import React, { useState, useRef } from "react";
import Image from "next/image";
import banner from "../app/image/banner.webp";
import { useSearchApartments } from "@/hooks/useSearchApartments";
import { Apartment } from "@/lib/types";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Search, SlidersHorizontal, X } from "lucide-react";

const priceRanges = ["Under ₦500K", "₦500K - ₦1M", "₦1M - ₦5M", "Above ₦5M"];

function Hero({ text }: { text: string }) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement | null>(null);

  const {
    query,
    setQuery,
    selectedPrice,
    setSelectedPrice,
    apartments,
    loading,
    error,
    refreshSearch, // new helper from hook
  } = useSearchApartments();

  const togglePrice = (range: string) => {
    setSelectedPrice((prev) => (prev === range ? null : range));
  };

  const heroVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2
      }
    }
  };

  const textVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };

  const searchVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: 0.4
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: i * 0.1
      }
    })
  };

  const modalVariants = {
    hidden: {
      opacity: 0,
      scale: 0.9,
      transition: {
        duration: 0.2
      }
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3
      }
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      transition: {
        duration: 0.2
      }
    }
  };

  return (
    <motion.section 
      variants={heroVariants}
      initial="hidden"
      animate="visible"
      className="relative"
    >
      {/* Hero Banner */}
      <div className="relative h-[600px] lg:h-[700px] w-full overflow-hidden">
        <motion.div
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0"
        >
          <Image
            src={banner}
            alt="Hero banner"
            fill
            className="object-cover"
            priority
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60" />
        <motion.div 
          variants={textVariants}
          className="absolute inset-0 flex flex-col justify-center text-center text-white px-4"
        >
          <motion.h1 
            variants={textVariants}
            className="text-4xl sm:text-6xl lg:text-7xl font-bold mb-4 tracking-tight"
          >
            Discover Your Dream Home
          </motion.h1>
          <motion.p 
            variants={textVariants}
            className="text-lg sm:text-xl lg:text-2xl text-gray-200 font-light max-w-2xl mx-auto"
          >
            Browse freely, login when ready to book! {text}
          </motion.p>
        </motion.div>
      </div>

      {/* Search Bar */}
      <motion.div 
        variants={searchVariants}
        className="-mt-20 sm:-mt-24 relative z-20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            whileHover={{ scale: 1.01 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl p-4 sm:p-6 flex flex-col sm:flex-row items-stretch gap-4 border border-white/20"
          >
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search properties, locations..."
                className="w-full pl-12 pr-4 py-4 rounded-xl focus:outline-none text-gray-700 bg-gray-50/50 border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all duration-300"
              />
            </div>
            <div className="flex gap-3 items-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsFilterOpen(true)}
                className="flex items-center gap-2 px-5 py-4 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold transition-colors duration-300"
              >
                <SlidersHorizontal className="w-5 h-5" />
                <span className="hidden sm:inline">Filters</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={refreshSearch}
                className="px-8 py-4 font-bold bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                {loading ? "Searching..." : "Search"}
              </motion.button>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Filter Modal */}
      <AnimatePresence>
        {isFilterOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsFilterOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          >
            <motion.div
              ref={modalRef}
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
              className="bg-white w-full max-w-md sm:max-w-lg rounded-3xl p-8 shadow-2xl border border-gray-100"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Filter Properties</h2>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsFilterOpen(false)}
                  className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </motion.button>
              </div>
              <div>
                <h3 className="mb-4 text-lg font-semibold text-gray-800">Price Range</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {priceRanges.map((range, index) => (
                    <motion.button
                      key={range}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      onClick={() => togglePrice(range)}
                      className={`w-full text-sm font-semibold px-4 py-3 rounded-xl border-2 transition-all duration-300 ${
                        selectedPrice === range
                          ? "bg-gradient-to-r from-green-600 to-emerald-600 text-white border-green-600 shadow-lg"
                          : "bg-white text-gray-700 border-gray-200 hover:border-green-300 hover:bg-green-50"
                      }`}
                    >
                      {range}
                    </motion.button>
                  ))}
                </div>
              </div>
              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setIsFilterOpen(false)}
                  className="flex-1 px-6 py-3 border-2 border-green-600 text-green-600 font-semibold rounded-full hover:bg-green-50 transition-colors"
                >
                  Close
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Results */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 mb-20"
      >
        {error && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-xl mb-6"
          >
            {error}
          </motion.div>
        )}
        {loading && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-green-600 border-t-transparent"></div>
            <p className="mt-4 text-gray-600">Loading apartments...</p>
          </motion.div>
        )}
        {!loading && apartments.length === 0 && query && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-16 bg-gray-50 rounded-2xl"
          >
            <p className="text-gray-600 text-lg">No apartments found for your search.</p>
          </motion.div>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mt-8">
          {apartments.map((apt: Apartment, index) => (
            <motion.div
              key={apt.id}
              custom={index}
              initial="hidden"
              animate="visible"
              variants={cardVariants}
              whileHover={{ y: -8 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="h-full"
            >
              <Link 
                href={`/apartments/${apt.id}`}
                className="block group h-full"
              >
                <motion.div 
                  whileHover={{ boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
                  className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-lg transition-all duration-300 h-full flex flex-col hover:-translate-y-1"
                >
                  <div className="relative h-48 sm:h-56 w-full overflow-hidden flex-shrink-0">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.5 }}
                      className="absolute inset-0"
                    >
                      <Image
                        src={apt.gallery?.[0]?.imageUrl || "/placeholder.jpg"}
                        alt={apt.title}
                        fill
                        className="object-cover"
                      />
                    </motion.div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute top-3 right-3">
                      <div className="bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-lg">
                        <span className="text-sm font-semibold text-green-600">
                          {apt.apartmentCategory?.name === "For Rent" ? apt.paymentPlan : "Sale"}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 sm:p-6 flex flex-col flex-grow">
                    <h3 className="font-bold text-lg sm:text-xl text-gray-900 mb-2 group-hover:text-green-600 transition-colors truncate">
                      {apt.title}
                    </h3>
                    <p className="text-gray-600 text-sm sm:text-base mb-3 flex items-center gap-2 truncate">
                      <span className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></span>
                      <span className="truncate">{apt.location}</span>
                    </p>
                    <p className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-4">
                      ₦{Number(apt.price).toLocaleString()}
                      <span className="text-gray-500 text-sm font-normal">
                        / {apt.apartmentCategory?.name === "For Rent" ? apt.paymentPlan : "total"}
                      </span>
                    </p>
                    
                    <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4 flex-grow">
                      {apt.features?.slice(0, 3).map((feature, idx) => (
                        <span
                          key={idx}
                          className="px-2 sm:px-3 py-1 sm:py-1.5 text-xs bg-green-50 text-green-700 rounded-full font-medium whitespace-nowrap"
                        >
                          {feature.featureName}
                        </span>
                      ))}
                      {apt.features?.length > 3 && (
                        <span className="px-2 sm:px-3 py-1 sm:py-1.5 text-xs bg-gray-100 text-gray-600 rounded-full font-medium">
                          +{apt.features.length - 3} more
                        </span>
                      )}
                    </div>
                    
                    <motion.button 
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold py-2.5 sm:py-3 px-4 sm:px-6 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2 text-sm sm:text-base mt-auto"
                    >
                      Book Now
                      <span className="text-lg">→</span>
                    </motion.button>
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.section>
  );
}

export default Hero;
