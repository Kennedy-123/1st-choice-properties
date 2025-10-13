import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pictures-nigeria.jijistatic.net",
      },
    ],
  },
};

export default nextConfig;
