"use client";
import React, { useState, useRef } from "react";
import Image from "next/image";
import banner from "../app/image/banner.webp";
import { useSearchApartments } from "@/hooks/useSearchApartments";
import { Apartment } from "@/lib/types";
import Link from "next/link";

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

  return (
    <section className="relative">
      {/* Hero Banner */}
      <div className="relative h-72 sm:h-96 md:h-[520px] w-full">
        <Image
          src={banner}
          alt="Hero banner"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/20 flex flex-col justify-center text-center text-white px-4">
          <h1 className="text-3xl sm:text-5xl font-semibold">
            Discover Your Dream Home {text}
          </h1>
          <p className="mt-2 text-gray-100 text-sm sm:text-base">
            Browse freely, login when ready to book!
          </p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="-mt-12 sm:-mt-16 relative z-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="bg-white rounded-xl shadow-2xl p-3 sm:p-4 flex flex-col sm:flex-row items-stretch gap-3">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search properties, locations..."
              className="flex-1 px-4 py-3 rounded-md focus:outline-none text-gray-700 border border-gray-200"
            />
            <div className="flex gap-2 items-center">
              <button
                onClick={() => setIsFilterOpen(true)}
                className="px-3 py-2 rounded-md bg-gray-100 hover:bg-gray-200 text-gray-600 font-medium"
              >
                Filters
              </button>
              <button
                onClick={refreshSearch}
                className="px-4 py-2 font-bold bg-green-600 hover:bg-green-700 text-white rounded-xl shadow-lg"
              >
                {loading ? "Searching..." : "Search"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Modal */}
      {isFilterOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div
            ref={modalRef}
            className="bg-white w-full max-w-md sm:max-w-lg rounded-2xl p-6 shadow-2xl"
          >
            <div className="flex justify-between mb-4">
              <h2 className="text-xl font-semibold">Filter Properties</h2>
              <button onClick={() => setIsFilterOpen(false)}>✕</button>
            </div>
            <div>
              <h3 className="mb-3 text-gray-700">Price Range</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {priceRanges.map((range) => (
                  <button
                    key={range}
                    onClick={() => togglePrice(range)}
                    className={`w-full text-sm font-medium px-3 py-2 rounded-lg border transition-colors ${
                      selectedPrice === range
                        ? "bg-green-600 text-white border-green-600"
                        : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    {range}
                  </button>
                ))}
              </div>
            </div>
            <div className="mt-5 flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => setIsFilterOpen(false)}
                className="flex-1 px-4 py-3 border border-green-600 text-green-600 rounded-full"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Results */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 mt-10">
        {error && <p className="text-red-600">{error}</p>}
        {loading && <p>Loading apartments...</p>}
        {!loading && apartments.length === 0 && query && (
          <p>No apartments found for your search.</p>
        )}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
          {apartments.map((apt: Apartment) => (
            <Link 
              key={apt.id}
              href={`/apartments/${apt.id}`}
              className="block border rounded-xl p-4 shadow hover:shadow-lg transition hover:border-green-500"
            >
              <div className="relative h-40 w-full mb-3">
                <Image
                  src={apt.gallery?.[0]?.imageUrl || "/placeholder.jpg"}
                  alt={apt.title}
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
              <h3 className="font-semibold text-lg">{apt.title}</h3>
              <p className="text-sm text-gray-600">{apt.location}</p>
              <p className="mt-2 text-green-600 font-bold">
                ₦{Number(apt.price).toLocaleString()}
              </p>
              <div 
                className="w-full mt-2 bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors text-center"
              >
                Book Now
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Hero;
