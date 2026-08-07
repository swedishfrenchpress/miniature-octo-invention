import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Keep Turbopack scoped to this app. Without an explicit root, Next.js can
  // select a parent directory when it finds another package manager lockfile.
  turbopack: {
    root: process.cwd(),
  },
};

export default nextConfig;
