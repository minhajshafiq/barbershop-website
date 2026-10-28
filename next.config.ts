import type { NextConfig } from "next";
import { getGalleryPhotos } from "./src/lib/gallery";

const nextConfig: NextConfig = {
  // Liste des photos figée au build : sur Cloudflare, la page est rendue à la demande, sans accès au disque
  env: { GALLERY_PHOTOS: JSON.stringify(getGalleryPhotos()) },
  images: {
    // AVIF d'abord (~30 % plus léger que WebP) : l'image du hero arrive plus vite sur mobile
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
