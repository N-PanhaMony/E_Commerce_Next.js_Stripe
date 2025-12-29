/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,       // keep React strict mode
  output: 'standalone',        // for Amplify or serverless deployment

  // For static images served from /public
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
