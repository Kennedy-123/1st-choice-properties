"use client";

import { usePathname } from "next/navigation";
import Header from "./Header";

export default function NavbarWrapper() {
  const pathname = usePathname();
  const hideNavbar =
    pathname === "/register" ||
    pathname === "/login" ||
    pathname === "/verify-otp" ||
    pathname === "/forgot-password" ||
    pathname === "/verify-password-otp" ||
    pathname === "/reset-password" ||
    pathname === "/chat";

  return !hideNavbar ? <Header /> : null;
}
