"use client"
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

function Footer() {
  const pathname = usePathname();
  
  // Helper function to check if a link is active
  const isActive = (path: string) => pathname === path;

  return (
    <footer className="bg-green-700 text-white py-6">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm text-gray-200">
              © {new Date().getFullYear()} 1st Choice Properties. All rights reserved.
            </p>
          </div>
          
          <div className="flex space-x-6">
            <Link 
              href="/chat" 
              className={`text-sm hover:text-green-200 transition-colors ${
                isActive("/chat") ? "text-white font-medium" : "text-gray-300"
              }`}
            >
              Chat
            </Link>
            <Link 
              href="/terms" 
              className={`text-sm hover:text-green-200 transition-colors ${
                isActive("/terms") ? "text-white font-medium" : "text-gray-300"
              }`}
            >
              Terms & Conditions
            </Link>
          </div>
        </div>
        
        <div className="mt-4 pt-4 border-t border-green-600 text-center">
          <p className="text-xs text-gray-300">
            Your trusted partner in real estate
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
