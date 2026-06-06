"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";

const footerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
    },
  },
};

function Footer() {
  const pathname = usePathname();

  // Helper function to check if a link is active
  const isActive = (path: string) => pathname === path;

  return (
    <motion.footer
      variants={footerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white pt-16 pb-8"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-12">
          {/* Brand Section */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
              1st Choice Properties
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Your trusted partner in finding the perfect property. We make real
              estate simple and accessible for everyone.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {[
                { path: "/", label: "Home" },
                { path: "/rent", label: "For Rent" },
                { path: "/sale", label: "For Sale" },
                { path: "/about", label: "About Us" },
              ].map((link) => (
                <li key={link.path}>
                  <Link
                    href={link.path}
                    onClick={() =>
                      typeof window !== "undefined" &&
                      window.scrollTo({ top: 0, behavior: "smooth" })
                    }
                    className={`text-sm transition-all duration-300 hover:text-green-400 hover:translate-x-1 inline-block ${
                      isActive(link.path)
                        ? "text-green-400 font-medium"
                        : "text-gray-400"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">
              Contact Us
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-gray-400 text-sm">
                <MapPin className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                <span>
                  Novel House, Plot 3, Block J, Otunba Jobifele Way, Alausa CDA,
                  Ikeja, Lagos, Nigeria
                </span>
              </li>
              <li className="flex items-center gap-3 text-gray-400 text-sm">
                <Phone className="w-5 h-5 text-green-400 flex-shrink-0" />
                <span>
                  <a href="tel:08080361789">08080361789</a>,{" "}
                  <a href="tel:08130992077">08130992077</a>
                </span>
              </li>
              <li className="flex items-center gap-3 text-gray-400 text-sm">
                <Mail className="w-5 h-5 text-green-400 flex-shrink-0" />
                <a href="mailto:info@1stchoiceproperties.com.ng">
                  info@1stchoiceproperties.com.ng
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-400">
              © {new Date().getFullYear()} 1st Choice Properties. All rights
              reserved.
            </p>
            <div className="flex items-center gap-6">
              <Link
                href="/chat"
                onClick={() =>
                  typeof window !== "undefined" &&
                  window.scrollTo({ top: 0, behavior: "smooth" })
                }
                className={`text-sm transition-all duration-300 hover:text-green-400 ${
                  isActive("/chat")
                    ? "text-green-400 font-medium"
                    : "text-gray-400"
                }`}
              >
                Live Chat
              </Link>
              <Link
                href="/terms"
                onClick={() =>
                  typeof window !== "undefined" &&
                  window.scrollTo({ top: 0, behavior: "smooth" })
                }
                className={`text-sm transition-all duration-300 hover:text-green-400 ${
                  isActive("/terms")
                    ? "text-green-400 font-medium"
                    : "text-gray-400"
                }`}
              >
                Terms & Conditions
              </Link>
              <Link
                href="/privacy"
                onClick={() =>
                  typeof window !== "undefined" &&
                  window.scrollTo({ top: 0, behavior: "smooth" })
                }
                className={`text-sm transition-all duration-300 hover:text-green-400 ${
                  isActive("/privacy")
                    ? "text-green-400 font-medium"
                    : "text-gray-400"
                }`}
              >
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </motion.footer>
  );
}

export default Footer;
