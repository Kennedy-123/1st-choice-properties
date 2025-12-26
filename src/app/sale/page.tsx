"use client";
import React from "react";
import Hero from "@/components/Hero";
import RentPropertyCard from "@/components/RentPropertyCard";
import { useApartmentsForSale } from "@/hooks/useApartmentsForSale";
import Loader from "@/components/Loader";

function Page() {
  const { apartments, loading, error } = useApartmentsForSale();

  return (
    <div>
      <Hero text="for sale" />
      <section className="bg-gray-50 min-h-[60vh] py-8">
        <div className=" mx-auto px-4">
          {loading && (
            <div className="text-center py-8 text-gray-500">
              <Loader color="border-green-600" />
            </div>
          )}
          {error && (
            <div className="text-center py-8 text-red-500">{error}</div>
          )}
          {!loading && !error && apartments.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">No properties available for sale at the moment.</p>
            </div>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {apartments.map((apt, i) => (
              <RentPropertyCard
                id={apt.id}
                key={i}
                image={apt.gallery[0]?.imageUrl || "/default-apartment.jpg"}
                title={apt.title}
                location={apt.location}
                beds={apt.features[1]?.featureName || "N/A"}
                baths={apt.features[0]?.featureName || "N/A"}
                parking={apt.features[2]?.featureName || "N/A"}
                price={`₦${Number(apt.price).toLocaleString()}`}
                paymentPlan={apt.paymentPlan}
                apartmentCategory={apt.apartmentCategory?.name || ""}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Page;
