/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
  },
  images: {
    domains: ["cdn.sanity.io", "via.placeholder.com"],
  },
  eslint:{ ignoreDuringBuilds:true }
};

export default nextConfig;