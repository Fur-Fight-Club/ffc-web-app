/** @type {import('next').NextConfig} */
const path = require("path");

const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  images: {
    remotePatterns: [
      {
        hostname: "i.imgur.com",
      },
      {
        hostname: "cocoparks.io",
      },
      {
        hostname: "i.ibb.co",
      },
    ],
  },
};

module.exports = nextConfig;
