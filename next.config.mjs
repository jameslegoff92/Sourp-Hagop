import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
  },
  images: {
    domains: ["cdn.sanity.io", "via.placeholder.com"],
  },
  eslint:{ ignoreDuringBuilds:true }
};

export default withNextIntl(nextConfig);