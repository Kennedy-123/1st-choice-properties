"use client";
import Image from "next/image";
import banner2 from "./image/banner2.jpg";
import banner3 from "./image/banner3.webp";
import banner4 from "./image/banner4.avif";
import Hero from "@/components/Hero";

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-gray-800">
      {/* Hero */}
      <Hero />
      {/* Discover all things property */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-semibold">
            Discover all things property
          </h2>
          <div className="mt-4 inline-flex gap-6 text-sm text-gray-500">
            <button className="pb-2 text-gray-400">Renting</button>
            <button className="pb-2 text-gray-400">Selling</button>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
                <Image src="/file.svg" alt="alerts" width={40} height={40} />
              </div>
              <h3 className="text-lg font-medium text-center mt-4">
                Property Alerts
              </h3>
              <p className="text-sm text-gray-600 mt-2 text-center">
                Sign up for an account and receive property alerts when new
                properties match your search criteria.
              </p>
              <div className="mt-4 text-center">
                <button className="px-4 py-2 border rounded text-sm">
                  Sign Up Now
                </button>
              </div>
            </div>

            <div className="p-6 border-l md:border-l-0 md:border-x">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
                <Image src="/globe.svg" alt="sold" width={40} height={40} />
              </div>
              <h3 className="text-lg font-medium text-center mt-4">
                Sold Prices
              </h3>
              <p className="text-sm text-gray-600 mt-2 text-center">
                Find the value of any property in South Africa.
              </p>
              <div className="mt-4 text-center">
                <button className="px-4 py-2 border rounded text-sm">
                  View Sold Prices
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
                <Image src="/next.svg" alt="guides" width={40} height={40} />
              </div>
              <h3 className="text-lg font-medium text-center mt-4">
                Looking to buy?
              </h3>
              <p className="text-sm text-gray-600 mt-2 text-center">
                Get all the information you need when buying a property with our
                comprehensive property guides.
              </p>
              <div className="mt-4 text-center">
                <button className="px-4 py-2 border rounded text-sm">
                  View Property Guides
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Property region list + Live Trends */}
      <section className="bg-[#0b63c9] text-white py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-2">
              <h3 className="text-xl font-semibold mb-6">
                Property for Sale in Nigeria
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-sm">
                <div>
                  <h4 className="font-medium">Pretoria</h4>
                  <ul className="mt-2 space-y-1 opacity-90">
                    <li>Pretoria</li>
                    <li>Randburg</li>
                    <li>Mbopane</li>
                    <li>Vanderbijlpark</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium">Johannesburg</h4>
                  <ul className="mt-2 space-y-1 opacity-90">
                    <li>Soweto</li>
                    <li>Boksburg</li>
                    <li>Benoni</li>
                    <li>Sandton</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium">Midrand</h4>
                  <ul className="mt-2 space-y-1 opacity-90">
                    <li>Centurion</li>
                    <li>Alberton</li>
                    <li>Fochville</li>
                    <li>Edenvale</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium">Other Areas</h4>
                  <ul className="mt-2 space-y-1 opacity-90">
                    <li>Roodepoort</li>
                    <li>Germiston</li>
                    <li>Vereeniging</li>
                    <li>Randfontein</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <div className="w-full max-w-sm bg-white text-gray-800 rounded-xl p-6 shadow-lg">
                <div className="text-sm text-indigo-600 font-medium">
                  Live Trends
                </div>
                <h4 className="text-lg font-semibold mt-2">Gauteng</h4>
                <p className="text-xs text-gray-500 mt-2">
                  Average Property Price
                </p>
                <div className="mt-4 h-32 bg-gray-100 rounded flex items-center justify-center text-sm text-gray-400">
                  Chart placeholder
                </div>
                <div className="mt-4">
                  <button className="w-full px-4 py-2 border rounded text-sm">
                    Gauteng Property Trends
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* News + Advice */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="font-semibold mb-4">News</h3>
            <div className="grid gap-4">
              <div className="flex gap-4">
                <Image
                  src="/file.svg"
                  alt="news"
                  width={360}
                  height={240}
                  className="rounded"
                />
                <div>
                  <h4 className="font-medium">
                    Escape to the coast: Stunning holiday homes...
                  </h4>
                  <p className="text-sm text-gray-500 mt-2">
                    Explore a selection of stunning holiday homes and...
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <Image
                  src={banner4}
                  alt="news"
                  width={360}
                  height={240}
                  className="rounded"
                />
                <div>
                  <h4 className="font-medium">
                    Commercial leases and market insights
                  </h4>
                  <p className="text-sm text-gray-500 mt-2">
                    What every tenant and investor should know.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="font-semibold mb-4">Advice</h3>
            <div className="grid gap-4">
              <div className="flex gap-4">
                <Image
                  src={banner2}
                  alt="advice"
                  width={360}
                  height={240}
                  className="rounded"
                />
                <div>
                  <h4 className="font-medium">
                    How to handle a non-paying tenant legally
                  </h4>
                  <p className="text-sm text-gray-500 mt-2">
                    Non-paying tenants can be stressful, but landlords have...
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <Image
                  src={banner3}
                  alt="advice"
                  width={360}
                  height={240}
                  className="rounded"
                />
                <div>
                  <h4 className="font-medium">
                    Buying property with friends or family
                  </h4>
                  <p className="text-sm text-gray-500 mt-2">
                    Buying together can unlock opportunities, but it&apos;s
                    not...
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile & Tablet promo */}
      <section className="bg-[#0d1330] text-white py-12">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center gap-8">
          <div className="md:flex-1">
            <h3 className="text-2xl font-semibold">
              Property24 on Mobile and Tablet
            </h3>
            <p className="mt-3 text-gray-200">
              Get all of South Africa&apos;s leading Estate Agent properties for
              sale and on the go. Download our apps or browse on mobile.
            </p>
          </div>
          <div className="md:flex-1 flex justify-center">
            <div className="w-56 h-36 bg-white rounded-lg flex items-center justify-center text-gray-700">
              <Image src="/window.svg" alt="device" width={160} height={120} />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
