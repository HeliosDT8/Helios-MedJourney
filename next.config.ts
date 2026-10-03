import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async redirects() {
    return [
      { source: "/about", destination: "/mission", permanent: true },
      { source: "/business-intelligence", destination: "/services", permanent: true },
    ];
  },
};

export default nextConfig;
