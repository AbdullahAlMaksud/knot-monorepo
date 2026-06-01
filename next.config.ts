import type { NextConfig } from "next";

const configuredBackendUrl = (
  process.env.NEXT_PUBLIC_API_URL || "https://byou-api.nexulyze.com"
).replace(/\/$/, "");
const backendApiUrl = configuredBackendUrl.endsWith("/api/v1")
  ? configuredBackendUrl.slice(0, -"/api/v1".length)
  : configuredBackendUrl;

const nextConfig: NextConfig = {
  turbopack: {
    root: process.cwd(),
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pub-d35a37326fcc484aba167f8f06d068d5.r2.dev",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/api/v1/:path*",
        destination: `${backendApiUrl}/api/v1/:path*`,
      },
    ];
  },
};
export default nextConfig;
