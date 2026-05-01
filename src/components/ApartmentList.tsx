"use client";
import Image from "next/image";
import Link from "next/link";
import { Apartment } from "@/lib/types";
import { motion } from "framer-motion";
import { MapPin, Home, ArrowRight } from "lucide-react";

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

interface ApartmentListProps {
  apartments: Apartment[];
  loading: boolean;
  error: string | null;
}

export default function ApartmentList({ apartments, loading, error }: ApartmentListProps) {
  if (loading) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex justify-center items-center h-64"
      >
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-green-500 border-t-transparent shadow-lg"></div>
      </motion.div>
    );
  }

  if (error) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-12"
      >
        <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-xl inline-flex items-center gap-2">
          <span>⚠</span>
          <p>Error loading apartments: {error}</p>
        </div>
      </motion.div>
    );
  }

  if (apartments.length === 0) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-16"
      >
        <div className="bg-gray-50 px-8 py-12 rounded-2xl max-w-md mx-auto">
          <Home className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 text-lg">No apartments available at the moment.</p>
          <p className="text-gray-400 text-sm mt-2">Check back later for new listings.</p>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 py-12">
      {apartments.map((apartment, index) => (
        <motion.div
          key={apartment.id}
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          transition={{ delay: index * 0.1 }}
          className="h-full"
        >
          <Link 
            href={`/apartments/${apartment.id}`} 
            className="group h-full overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 flex flex-col"
          >
            <div className="relative h-72 w-full overflow-hidden flex-shrink-0">
              <Image
                src={apartment.gallery?.[0]?.imageUrl || "/placeholder-apartment.jpg"}
                alt={apartment.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute top-4 right-4">
                <span className="bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                  {apartment.apartmentCategory?.name === "For Rent" ? apartment.paymentPlan : "Sale"}
                </span>
              </div>
              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="text-white font-bold text-xl mb-1 truncate">{apartment.title}</h3>
                <div className="flex items-center gap-1 text-white/90 text-sm">
                  <MapPin className="w-4 h-4" />
                  <span className="truncate">{apartment.location}</span>
                </div>
              </div>
            </div>
            <div className="p-5 flex flex-col flex-grow">
              <div className="flex justify-between items-start mb-3 flex-shrink-0">
                <div className="flex-1">
                  <p className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                    ₦{parseInt(apartment.price).toLocaleString()}
                  </p>
                  <span className="text-xs text-gray-500 font-medium">
                    {apartment.apartmentCategory?.name}
                  </span>
                </div>
              </div>
              <p className="text-gray-600 text-sm line-clamp-2 mb-4 leading-relaxed flex-grow">{apartment.description}</p>
              <div className="flex flex-wrap gap-2 mb-4 flex-shrink-0">
                {apartment.features?.slice(0, 3).map((feature) => (
                  <span key={feature.id} className="text-xs bg-green-50 text-green-700 px-3 py-1.5 rounded-full font-medium whitespace-nowrap">
                    {feature.featureName}
                  </span>
                ))}
                {apartment.features?.length > 3 && (
                  <span className="text-xs bg-gray-100 text-gray-600 px-3 py-1.5 rounded-full font-medium whitespace-nowrap">
                    +{apartment.features.length - 3} more
                  </span>
                )}
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-gray-100 flex-shrink-0">
                <div className="flex items-center gap-2 text-green-600 group-hover:text-green-700 transition-colors">
                  <span className="text-sm font-semibold">View Details</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
