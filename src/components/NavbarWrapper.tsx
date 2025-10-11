"use client";

import { usePathname } from "next/navigation";
import Header from "./Header";

export default function NavbarWrapper() {
  const pathname = usePathname();
  const hideNavbar = pathname === "/register" || pathname === "/login" || pathname === "/verify-otp";

  return !hideNavbar ? <Header /> : null;
}
