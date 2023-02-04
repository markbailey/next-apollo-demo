/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    newNextLinkBehavior: false
  },
  images: {
    deviceSizes: [320, 425, 475, 768, 992, 1200, 1400],
    imageSizes: [360, 425, 490, 450, 400, 423, 413],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.pravatar.cc',
        port: '',
        pathname: '/**'
      }
    ]
  }
};

module.exports = nextConfig;
