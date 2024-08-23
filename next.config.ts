import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  remotePatterns: [
    {
      protocol: "https",
      hostname: "pub-1d147630769b4f89a6c2ff57855ef026.r2.dev",
      pathname: "/**",
    },
  ],
};

export default nextConfig;
