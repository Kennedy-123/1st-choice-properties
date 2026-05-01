"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaBars, FaTimes } from "react-icons/fa";
import { useLogout } from "@/hooks/useLogout";
import Loader from "./Loader";
import Image from "next/image";
import logo from "../app/image/logo.png";
import { jwtDecode } from "jwt-decode";
import { motion, AnimatePresence } from "framer-motion";

interface JwtPayload {
  id: string;
  email: string;
  username: string;
  role: string;
  iat: number;
  exp: number;
}

function Header() {
  const pathname = usePathname();

  // Helper function to check if a link is active
  const isActive = (path: string) => {
    // Special case for home page
    if (path === "/" && pathname === path) return true;
    // For other paths, check if current path starts with the link path (to handle nested routes)
    return pathname.startsWith(path) && path !== "/";
  };
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);
  const { logoutUser, loading } = useLogout();

  // Close mobile menu when pathname changes
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Handle navigation and close menu
  const handleNavigation = () => {
    setMenuOpen(false);
  };

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

  const navVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 }
  };

  const mobileMenuVariants = {
    hidden: {
      opacity: 0,
      x: "100%",
      transition: {
        type: "spring" as const,
        stiffness: 300,
        damping: 30
      }
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring" as const,
        stiffness: 300,
        damping: 30
      }
    }
  };

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="w-full bg-white/80 backdrop-blur-lg shadow-lg fixed top-0 left-0 z-50 border-b border-gray-100"
    >
      <motion.div 
        variants={navVariants}
        initial="hidden"
        animate="visible"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between"
      >
        {/* Logo */}
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link href="/" className="flex items-center gap-2">
            <div className="relative w-16 h-12">
              <Image
                src={logo}
                alt="Property24 Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
          </Link>
        </motion.div>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex gap-8 text-sm font-medium text-gray-600">
          {[
            { path: "/", label: "Home" },
            { path: "/about", label: "About" },
            ...(isLoggedIn ? [{ path: "/profile", label: "Profile" }] : []),
            { path: "/rent", label: "For Rent" },
            { path: "/sale", label: "For Sale" },
            { path: "/my-bookings", label: "Bookings" },
            { path: "/contact", label: "Contact" },
            { path: "/Favourites", label: "Favourites" },
            ...(userRole === "ADMIN" ? [{ path: "/admin", label: "Dashboard" }] : [])
          ].map((link) => (
            <motion.div key={link.path} variants={itemVariants}>
              <Link
                href={link.path}
                className={`relative px-3 py-2 rounded-lg transition-all duration-300 ${
                  isActive(link.path)
                    ? "text-green-600 bg-green-50"
                    : "hover:text-gray-900 hover:bg-gray-50"
                }`}
                onClick={handleNavigation}
              >
                {link.label}
                {isActive(link.path) && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            </motion.div>
          ))}
        </nav>

        {/* Desktop Buttons */}
        <div className="hidden lg:flex items-center gap-4">
          {!isLoggedIn ? (
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/login"
                className="px-6 py-2.5 bg-gradient-to-r from-red-500 to-rose-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:from-red-600 hover:to-rose-700"
              >
                Login
              </Link>
            </motion.div>
          ) : (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLogout}
              disabled={loading}
              className="px-6 py-2.5 min-w-[100px] bg-gradient-to-r from-red-500 to-rose-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:from-red-600 hover:to-rose-700 flex items-center justify-center"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <Loader color="border-white" />
                </span>
              ) : (
                "Logout"
              )}
            </motion.button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          className="lg:hidden text-2xl text-gray-700 p-2 rounded-lg hover:bg-gray-100 transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={menuOpen ? "close" : "menu"}
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {menuOpen ? <FaTimes /> : <FaBars />}
            </motion.div>
          </AnimatePresence>
        </motion.button>
      </motion.div>

      {/* Mobile Dropdown Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="lg:hidden bg-white/95 backdrop-blur-lg border-t border-gray-200 shadow-2xl absolute top-full left-0 right-0"
          >
            <motion.nav 
              initial="hidden"
              animate="visible"
              variants={navVariants}
              className="flex flex-col p-6 space-y-2"
            >
              {[
                { path: "/", label: "Home" },
                { path: "/about", label: "About" },
                ...(isLoggedIn ? [{ path: "/profile", label: "Profile" }] : []),
                { path: "/rent", label: "For Rent" },
                { path: "/sale", label: "For Sale" },
                { path: "/my-bookings", label: "Bookings" },
                { path: "/contact", label: "Contact" },
                { path: "/Favourites", label: "Favourites" },
                ...(userRole === "ADMIN" ? [{ path: "/admin", label: "Dashboard" }] : [])
              ].map((link) => (
                <motion.div key={link.path} variants={itemVariants}>
                  <Link
                    href={link.path}
                    className={`block px-4 py-3 rounded-lg font-medium transition-all duration-300 ${
                      isActive(link.path)
                        ? "text-green-600 bg-green-50"
                        : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                    }`}
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}

              <motion.div variants={itemVariants} className="pt-4">
                {!isLoggedIn ? (
                  <Link
                    href="/login"
                    className="block px-4 py-3 text-center bg-gradient-to-r from-red-500 to-rose-600 text-white font-semibold rounded-full"
                    onClick={() => setMenuOpen(false)}
                  >
                    Login
                  </Link>
                ) : (
                  <button
                    onClick={() => {
                      handleLogout();
                      setMenuOpen(false);
                    }}
                    disabled={loading}
                    className="w-full px-4 py-3 bg-gradient-to-r from-red-500 to-rose-600 text-white font-semibold rounded-full flex items-center justify-center"
                  >
                    {loading ? <Loader color="border-white" /> : "Logout"}
                  </button>
                )}
              </motion.div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

export default Header;
