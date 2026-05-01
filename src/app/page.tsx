"use client";

import Image from "next/image";
import Hero from "@/components/Hero";
import ApartmentList from "@/components/ApartmentList";
import { useApartments } from "@/hooks/useApartments";
import playStore from "./image/playstore.png";
import apple from "./image/apple.png";
import VideoSection from "@/components/VideoSection";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
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

export default function Home() {
  const { apartments, loading, error } = useApartments();

  return (
    <main className="min-h-screen bg-white text-gray-800">
      {/* Hero */}
      <Hero text="in Nigeria" />

      {/* Video Section */}
      <VideoSection />

      {/* Featured Apartments */}
      <motion.section 
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="py-20 bg-gradient-to-b from-white via-green-50/30 to-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-12 h-1 bg-gradient-to-r from-transparent to-green-500" />
              <Sparkles className="w-6 h-6 text-green-500" />
              <div className="w-12 h-1 bg-gradient-to-l from-transparent to-green-500" />
            </div>
            <h2 className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-4">
              Featured Properties
            </h2>
            <p className="max-w-2xl mx-auto text-lg text-gray-600 leading-relaxed">
              Discover your perfect home from our curated selection of premium properties
            </p>
          </motion.div>
          <ApartmentList
            apartments={apartments}
            loading={loading}
            error={error}
          />
        </div>
      </motion.section>
      {/* App promo (design only — images intentionally omitted) */}
      <section className="bg-green-900 text-white py-12 mt-10 mb-10">
        <div className="max-w-6xl mx-auto px-6 flex items-center gap-8">
          {/* <div className="flex-1 flex items-center justify-center">
            <div className="w-[420px] h-[260px] bg-[#0b1228] rounded-lg flex items-center justify-center">
              <div className="text-gray-500">Device visuals omitted</div>
            </div>
          </div> */}
          <div className="flex-1 place-items-center text-center">
            <h3 className="text-3xl font-semibold mb-4">
              1st Choice Properties on Mobile and Tablet
            </h3>
            <p className="text-gray-200 mb-6">
              Discover the best properties for sale and rent anytime, anywhere
              with the 1st Choice Properties app. Our intuitive design makes it
              easy to search, browse, and manage your favourite listings right
              from your Android or Apple device.
            </p>
            <div className="flex gap-4 items-center justify-center">
              <a
                href="https://apps.apple.com/us/app/choice-property/id6753912857?platform=iphone"
                target="_blank"
              >
                <button className="px-4 py-2 bg-black/70 border border-white/20 rounded text-white flex items-center gap-2 hover:cursor-pointer">
                  <Image
                    src={apple}
                    alt="Google Play icon"
                    className="h-5 w-5 object-contain"
                  />
                  App Store
                </button>
              </a>
              <a
                href="https://play.google.com/store/apps/details?id=com.choiceproperty.diim"
                target="_blank"
              >
                <button className="px-4 py-2 bg-black/70 border border-white/20 rounded text-white flex items-center gap-2 hover:cursor-pointer">
                  <Image
                    src={playStore}
                    alt="Google Play icon"
                    className="h-5 w-5 object-contain"
                  />
                  Google Play
                </button>
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
