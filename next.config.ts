import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Ancienne URL de la page « Notre constat »
      { source: '/pourquoi-maintenant', destination: '/notre-constat', permanent: true },
    ];
  },
};

export default nextConfig;
