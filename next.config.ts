import type { NextConfig } from "next";
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  // Cloudflare Images is a paid feature, so next/image serves originals
  // directly (the login backdrop is a single 216 KB JPEG).
  images: {
    unoptimized: true,
  },
};

export default nextConfig;

// Enables local Cloudflare bindings in `next dev`. No-op in builds.
initOpenNextCloudflareForDev();
