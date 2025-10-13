"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FaBars, FaTimes } from "react-icons/fa";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="w-full bg-white shadow-sm fixed top-0 left-0 z-50">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="text-2xl font-bold text-[#1e7ad7]">
          property<span className="text-red-500">24</span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex gap-6 text-sm text-gray-600">
          <Link href="/rent" className="hover:text-gray-900">
            For Rent
          </Link>
          <Link href="#" className="hover:text-gray-900">
            For Sale
          </Link>
          <Link href="#" className="hover:text-gray-900">
            Favourites
          </Link>
          <Link href="#" className="hover:text-gray-900">
            Chat
          </Link>
        </nav>

        {/* Desktop Buttons */}
        <div className="hidden lg:flex items-center gap-3">
          <Link
            href="/register"
            className="px-4 py-2 border font-bold rounded text-sm hover:bg-red-600 hover:text-white transition"
          >
            Sign in
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden text-2xl text-gray-700"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200 shadow-md">
          <nav className="flex flex-col p-4 space-y-3 text-gray-700">
            <Link
              href="/rent"
              className="hover:text-gray-900"
              onClick={() => setMenuOpen(false)}
            >
              For Rent
            </Link>
            <Link
              href="#"
              className="hover:text-gray-900"
              onClick={() => setMenuOpen(false)}
            >
              For Sale
            </Link>
            <Link
              href="#"
              className="hover:text-gray-900"
              onClick={() => setMenuOpen(false)}
            >
              Favourites
            </Link>
            <Link
              href="#"
              className="hover:text-gray-900"
              onClick={() => setMenuOpen(false)}
            >
              Chat
            </Link>

            <hr className="border-gray-200" />

            <Link
              href="/register"
              className="px-4 py-2 border font-bold rounded text-sm text-center hover:bg-red-600 hover:text-white transition"
              onClick={() => setMenuOpen(false)}
            >
              Sign in
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}

export default Header;
