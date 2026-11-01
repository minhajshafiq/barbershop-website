import type { NextConfig } from "next";
import { getGalleryPhotos } from "./src/lib/gallery";

const nextConfig: NextConfig = {
  // Liste des photos figée au build : sur Cloudflare, la page est rendue à la demande, sans accès au disque
  env: { GALLERY_PHOTOS: JSON.stringify(getGalleryPhotos()) },
  // http → https : Cloudflare transmet le protocole d'origine dans l'en-tête cf-visitor
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "header", key: "cf-visitor", value: '.*"scheme":"http".*' }],
        destination: "https://theexperts-barbershop.fr/:path*",
        permanent: true,
      },
    ];
  },
  images: {
    // AVIF d'abord (~30 % plus léger que WebP) : l'image du hero arrive plus vite sur mobile
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
