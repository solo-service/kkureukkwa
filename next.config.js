const withPWA = require("next-pwa")({
  dest : "public",
  disable : process.env.NODE_ENV === 'production'
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = withPWA(nextConfig)
