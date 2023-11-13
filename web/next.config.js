/** @type {import('next').NextConfig} */
const nextConfig = {
  appname: "{{ TWO MOONS }}",
  reactStrictMode: true,
  experimental: {
    images: {
      allowFutureImage: true,
    },
  },
};

module.exports = nextConfig;
