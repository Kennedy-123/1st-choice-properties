import React from "react";
import Link from "next/link";

function Header() {
  return (
    <header className="w-full bg-white">
      <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="text-2xl font-bold text-[#1e7ad7]">
            property<span className="text-red-500">24</span>
          </div>
          <nav className="hidden lg:flex gap-6 text-sm text-gray-600">
            <a className="border-b-0 hover:text-gray-900" href="#">
              For Rent
            </a>
            <a className="border-b-0 hover:text-gray-900" href="#">
              For Sale
            </a>
            <a className="border-b-0 hover:text-gray-900" href="#">
              Favourites
            </a>
            <a className="border-b-0 hover:text-gray-900" href="#">
              Chat
            </a>
          </nav>
        </div>
        <div className="flex items-center gap-3">
          {/* <button className="px-4 py-2 border rounded text-sm">
              List Privately
            </button> */}
          <Link href="/register" className="px-4 py-2 border font-bold hover:bg-red-600 rounded text-sm">Sign in</Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
