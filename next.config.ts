import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/rendez-vous",
        destination: "/",
        permanent: true,
      },
      {
        // QR code carte de visite → formulaire de prise de rendez-vous
        source: "/demander-mon-echange-privilegie",
        destination: "/#devis",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
