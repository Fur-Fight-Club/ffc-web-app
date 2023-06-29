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
    ],
  },
};

module.exports = nextConfig;
