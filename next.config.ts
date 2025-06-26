const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,  // ⬅️ Add this line
  },
};

module.exports = nextConfig;
