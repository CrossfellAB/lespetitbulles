import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: { formats: ["image/avif", "image/webp"] },
  async redirects() {
    return [
      { source: "/fredagsladan", destination: "/deli-to-go", permanent: true },
      { source: "/fredagsladan/:path*", destination: "/deli-to-go/:path*", permanent: true },
    ];
  },
};

export default nextConfig;
