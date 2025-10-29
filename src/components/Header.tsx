"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { FaBars, FaTimes } from "react-icons/fa";
import { useLogout } from "@/hooks/useLogout";
import Loader from "./Loader";
import Image from "next/image";
import logo from "../app/image/logo.png";
import { jwtDecode } from "jwt-decode";

interface JwtPayload {
  id: string;
  email: string;
  username: string;
  role: string;
  iat: number;
  exp: number;
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);
  const { logoutUser, loading } = useLogout();

  useEffect(() => {
    let token: string | null = null;
    try {
      token =
        typeof window !== "undefined"
          ? localStorage.getItem("accessToken")
          : null;
    } catch (error) {
      console.error("Error accessing localStorage:", error);
    }
    setIsLoggedIn(!!token);

    if (token) {
      try {
        // Decode the JWT token to get the user's role using jwt-decode
        const decoded = jwtDecode<JwtPayload>(token);
        setUserRole(decoded.role);
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, []);

  const handleLogout = async () => {
    await logoutUser();
    setIsLoggedIn(false);
  };

  return (
    <header className="w-full bg-white shadow-sm fixed top-0 left-0 z-50">
      <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="relative w-14 h-10">
            <Image
              src={logo}
              alt="Property24 Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex gap-6 text-sm text-gray-600">
          <Link href="/" className="hover:text-gray-900">
            Home
          </Link>
          <Link href="/rent" className="hover:text-gray-900">
            For Rent
          </Link>
          <Link href="/sale" className="hover:text-gray-900">
            For Sale
          </Link>
          <Link href="/Favourites" className="hover:text-gray-900">
            Favourites
          </Link>
          <Link href="/chat" className="hover:text-gray-900">
            Chat
          </Link>
          <Link href="/my-bookings" className="hover:text-gray-900">
            Bookings
          </Link>
          {isLoggedIn && (
            <Link href="/profile" className="hover:text-gray-900">
              Profile
            </Link>
          )}

          {userRole === "ADMIN" && (
            <Link href="/admin" className="hover:text-gray-900">
              Dashboard
            </Link>
          )}
        </nav>

        {/* Desktop Buttons */}
        <div className="hidden lg:flex items-center gap-3">
          {!isLoggedIn ? (
            <Link
              href="/register"
              className="px-4 py-2 border border-red-500 font-bold rounded text-sm text-white bg-red-500 hover:bg-red-600 transition"
            >
              Sign Up
            </Link>
          ) : (
            <button
              onClick={handleLogout}
              disabled={loading}
              className="px-4 py-2 min-w-[90px] font-bold rounded text-sm text-white bg-red-500 hover:bg-red-600 transition flex items-center justify-center"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <Loader color="border-white" />
                </span>
              ) : (
                "Logout"
              )}
            </button>
          )}
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
          <nav className="flex flex-col p-4 space-y-3 text-center text-gray-700">
            <Link
              href="/rent"
              className="hover:text-gray-900"
              onClick={() => setMenuOpen(false)}
            >
              For Rent
            </Link>
            <Link
              href="/sale"
              className="hover:text-gray-900"
              onClick={() => setMenuOpen(false)}
            >
              For Sale
            </Link>
            <Link
              href="/Favourites"
              className="hover:text-gray-900"
              onClick={() => setMenuOpen(false)}
            >
              Favourites
            </Link>
            <Link
              href="/chat"
              className="hover:text-gray-900"
              onClick={() => setMenuOpen(false)}
            >
              Chat
            </Link>
            <Link
              href="/my-bookings"
              className="hover:text-gray-900"
              onClick={() => setMenuOpen(false)}
            >
              Bookings
            </Link>
            {isLoggedIn && (
              <Link
                href="/profile"
                className="hover:text-gray-900"
                onClick={() => setMenuOpen(false)}
              >
                Profile
              </Link>
            )}

            {userRole === "ADMIN" && (
              <Link href="/admin" className="hover:text-gray-900">
                Dashboard
              </Link>
            )}

            <hr className="border-gray-200" />

            {!isLoggedIn ? (
              <Link
                href="/register"
                className="px-4 py-2 border font-bold rounded text-sm text-center bg-red-500 text-white hover:bg-red-600 transition"
                onClick={() => setMenuOpen(false)}
              >
                Sign Up
              </Link>
            ) : (
              <button
                onClick={() => {
                  handleLogout();
                  setMenuOpen(false);
                }}
                disabled={loading}
                className="px-4 py-2 border font-bold rounded text-sm text-center bg-red-500 text-white hover:bg-red-600 transition flex items-center justify-center min-w-[90px]"
              >
                {loading ? <Loader color="border-white" /> : "Logout"}
              </button>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}

export default Header;
