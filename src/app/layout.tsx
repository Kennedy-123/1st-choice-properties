import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavbarWrapper from "@/components/NavbarWrapper";
import Footer from "@/components/Footer";
// import LiveChatWidget from "@/components/LiveChatWidget";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "1st Choice Properties | Find Your Perfect Home",
  description:
    "Discover your dream home with 1st Choice Properties — your trusted platform for buying, selling, and renting real estate. Explore verified listings, premium properties, and expert advice to make your next move effortless.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <NavbarWrapper />
        <main className="flex-1">{children}</main>
        <Footer />
        {/* <LiveChatWidget /> */}
      </body>
    </html>
  );
}
