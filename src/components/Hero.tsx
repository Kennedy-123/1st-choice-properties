"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import banner from "../app/image/banner.webp";

type DropdownProps = {
  label: string;
  options?: string[];
  onChange?: (value: string) => void;
  initial?: string | null;
  buttonClass?: string;
};

interface HeroProps {
  text: string;
}

function Dropdown({
  label,
  options = [],
  onChange,
  initial = null,
  buttonClass = "",
}: DropdownProps) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(initial ?? label);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleDown(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleDown);
    return () => document.removeEventListener("mousedown", handleDown);
  }, []);

  function select(v: string) {
    setValue(v);
    setOpen(false);
    onChange?.(v);
  }

  return (
    <div ref={ref} className="relative w-full sm:w-auto">
      <button
        type="button"
        onClick={() => setOpen((s) => !s)}
        className={`w-full sm:min-w-[160px] flex items-center justify-between px-4 sm:px-5 py-3 bg-[#0b63c9] text-white rounded-md border border-white/20 shadow-inner ${buttonClass}`}
      >
        <span className="truncate">{value}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 ml-3 opacity-80"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 011.08 1.04l-4.25 4.25a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {open && (
        <ul className="absolute left-0 mt-2 w-full sm:w-56 bg-white text-gray-800 rounded shadow-lg overflow-hidden z-30">
          {options.map((o) => (
            <li key={o}>
              <button
                onClick={() => select(o)}
                className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
              >
                {o}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function Hero({ text }: HeroProps) {
  const [propertyType, setPropertyType] = useState("Property Type");
  const [minPrice, setMinPrice] = useState("Min Price");
  const [maxPrice, setMaxPrice] = useState("Max Price");
  const [bedrooms, setBedrooms] = useState("Bedrooms");
  const [moreFilters, setMoreFilters] = useState("For?");

  return (
    <section className="relative">
      <div className="relative h-96 md:h-[520px] w-full z-0">
        <Image
          src={banner}
          alt="Hero banner"
          priority
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/20 flex flex-col justify-center z-10">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center text-white pt-8">
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-semibold tracking-tight">
                Find Properties {text}
              </h1>
            </div>
          </div>
        </div>
      </div>

      {/* Search card */}
      <div className="-mt-16 relative z-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="bg-white rounded-xl shadow-2xl p-4 flex flex-col sm:flex-row gap-4">
            <div className="flex items-center gap-3 text-gray-400 pl-2 flex-shrink-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-4.35-4.35"
                />
                <circle
                  cx="11"
                  cy="11"
                  r="6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                />
              </svg>
            </div>
            <input
              className="flex-1 px-4 py-3 rounded-md focus:outline-none text-gray-700"
              placeholder="Search for a City, Suburb or Web Reference"
            />
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
              <button className="px-4 py-2 border rounded-md text-sm bg-white">
                Map
              </button>
              <button className="px-8 py-3 bg-red-500 text-white rounded-xl shadow-lg">
                Search
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Filter strip */}
      <div className="bg-[#0b63c9] mt-6">
        <div className="max-w-6xl mx-auto px-6 py-6">
          <div className="flex flex-wrap gap-4 items-center">
            <Dropdown
              label="Property Type"
              options={["Any", "House", "Apartment", "Townhouse", "Land"]}
              initial={propertyType}
              onChange={(v) => setPropertyType(v)}
            />
            <Dropdown
              label="Min Price"
              options={[
                "Any",
                "R 100 000",
                "R 150 000",
                "R 200 000",
                "R 250 000",
                "R 300 000",
                "R 350 000",
                "R 400 000",
                "Custom Price",
              ]}
              initial={minPrice}
              onChange={(v) => setMinPrice(v)}
            />
            <Dropdown
              label="Max Price"
              options={[
                "Any",
                "R 500 000",
                "R 750 000",
                "R 1 000 000",
                "R 1 500 000",
                "R 2 000 000",
              ]}
              initial={maxPrice}
              onChange={(v) => setMaxPrice(v)}
            />
            <Dropdown
              label="Bedrooms"
              options={["Any", "1+", "2+", "3+", "4+", "5+"]}
              initial={bedrooms}
              onChange={(v) => setBedrooms(v)}
            />
            <Dropdown
              label="More Filters +"
              options={["Sale", "Rent"]}
              initial={moreFilters}
              onChange={(v) => setMoreFilters(v)}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
