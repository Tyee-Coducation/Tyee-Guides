/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  serverActions: {
    allowedForwardedHosts: [
      "https://fantastic-telegram-g97g4g4gq4529vvp-3000.app.github.dev/",
    ],
    allowedOrigins: [
      "https://fantastic-telegram-g97g4g4gq4529vvp-3000.app.github.dev/",
    ],
  },
};

module.exports = nextConfig;
