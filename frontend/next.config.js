const nextConfig = {
  reactStrictMode: false,
  ignoreBuildErrors: true,
  publicRuntimeConfig: {
    // Will be available on both server and client
    API_BASE_URL: process.env.API_BASE_URL
  }
};

module.exports = nextConfig;
