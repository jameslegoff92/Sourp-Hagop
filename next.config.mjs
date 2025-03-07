/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ["sequelize", "pino", "pino-pretty"],
  },
  images: {
    domains: ["cdn.sanity.io", "via.placeholder.com"],
  },
};

export default nextConfig;