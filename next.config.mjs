/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            'utfs.io',
            'picsum.photos',
        ].map(hostname => ({
            protocol: 'https',
            hostname,
        })),
    },

    eslint: {
        // Set this to false to ignore ESLint during build
        ignoreDuringBuilds: true,
      },
      typescript: {
        // !! WARN !!
        // Dangerously allow production builds to successfully complete even if
        // your project has type errors.
        // !! WARN !!
        ignoreBuildErrors: true,
      },
};

export default nextConfig;
