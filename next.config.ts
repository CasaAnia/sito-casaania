import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/come-arrivare-humanitas",
        destination: "/#come-arrivare",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
