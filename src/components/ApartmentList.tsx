"use client";
import Image from "next/image";
import Link from "next/link";
import { Apartment } from "@/lib/types";

interface ApartmentListProps {
  apartments: Apartment[];
  loading: boolean;
  error: string | null;
}

export default function ApartmentList({ apartments, loading, error }: ApartmentListProps) {
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8 text-red-500">
        <p>Error loading apartments: {error}</p>
      </div>
    );
  }

  if (apartments.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p>No apartments available at the moment.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 py-8 max-w-7xl mx-auto">
      {apartments.map((apartment) => (
        <Link 
          href={`/apartments/${apartment.id}`} 
          key={apartment.id}
          className="group block overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
        >
          <div className="relative h-64 w-full">
            <Image
              src={apartment.gallery?.[0]?.imageUrl || "/placeholder-apartment.jpg"}
              alt={apartment.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
              <h3 className="text-white font-semibold text-lg">{apartment.title}</h3>
              <p className="text-white text-sm">{apartment.location}</p>
            </div>
            <div className="absolute top-2 right-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded">
              {apartment.paymentPlan}
            </div>
          </div>
          <div className="p-4">
            <div className="flex justify-between items-center">
              <span className="text-xl font-bold text-gray-900">
                ₦{parseInt(apartment.price).toLocaleString()}
              </span>
              <span className="text-sm text-gray-600">
                {apartment.apartmentCategory?.name}
              </span>
            </div>
            <p className="mt-2 text-gray-600 line-clamp-2">{apartment.description}</p>
            <div className="mt-4 flex justify-between items-center">
              <button className="text-green-600 hover:text-green-800 text-sm font-medium">
                View Details
              </button>
              <div className="flex space-x-1">
                {apartment.features?.slice(0, 3).map((feature) => (
                  <span key={feature.id} className="text-xs bg-gray-100 px-2 py-1 rounded">
                    {feature.featureName}
                  </span>
                ))}
                {apartment.features?.length > 3 && (
                  <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                    +{apartment.features.length - 3} more
                  </span>
                )}
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
