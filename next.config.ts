import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    // Foton som Josefin laddar upp i admin ligger i Vercel Blob.
    remotePatterns: [{ protocol: "https", hostname: "*.public.blob.vercel-storage.com", pathname: "/uploads/**" }],
  },
  async redirects() {
    return [
      { source: "/fredagsladan", destination: "/deli-to-go", permanent: true },
      { source: "/fredagsladan/:path*", destination: "/deli-to-go/:path*", permanent: true },
    ];
  },
};

export default nextConfig;
