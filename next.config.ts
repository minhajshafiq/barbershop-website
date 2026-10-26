import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // AVIF d'abord (~30 % plus léger que WebP) : l'image du hero arrive plus vite sur mobile
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
