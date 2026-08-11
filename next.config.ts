import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/rendez-vous",
        destination: "/",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
