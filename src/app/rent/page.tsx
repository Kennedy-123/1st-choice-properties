"use client";
import React from "react";
import Hero from "@/components/Hero";
import RentPropertyCard from "@/components/RentPropertyCard";
import { useApartments } from "@/hooks/useApartments";

function Page() {
  const { apartments, loading, error } = useApartments();

  return (
    <div>
      <Hero text="to rent" />
      <section className="bg-gray-50 min-h-[60vh] py-8">
        <div className=" mx-auto px-4">
          {loading && (
            <div className="text-center py-8 text-gray-500">
              Loading apartments...
            </div>
          )}
          {error && (
            <div className="text-center py-8 text-red-500">{error}</div>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {apartments.map((apt, i) => (
              <RentPropertyCard
                key={i}
                image={apt.gallery[0]?.imageUrl || "/default-apartment.jpg"}
                title={apt.title}
                location={apt.location}
                beds={apt.features[1].featureName}
                baths={apt.features[0].featureName}
                parking={apt.features[2].featureName}
                price={`₦${Number(apt.price).toLocaleString()}`}
                paymentPlan={apt.paymentPlan}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Page;
