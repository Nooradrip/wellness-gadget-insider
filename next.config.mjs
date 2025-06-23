/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  
  experimental: {
    optimizePackageImports: [
      'react-dom',
      'framer-motion',
      'react-hot-toast',
      'next-auth',
      'next-themes',
      'remark',
      'remark-html'
    ],
    workerThreads: true,
    turbo: true
  },
  
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'm.media-amazon.com',
      }
    ],
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 3600,
  },

  webpack: (config) => {
    config.resolve.alias['@/data'] = new URL('./src/data', import.meta.url).pathname
    config.snapshot = {
      ...(config.snapshot || {}),
      managedPaths: [/^(.+?[\\/]node_modules[\\/])/],
    };
    return config
  },

  async redirects() {
    return [
      {
        source: '/blog/category/:path*',
        destination: '/blog',
        permanent: false
      }
    ]
  },
  
  productionBrowserSourceMaps: false,
  swcMinify: true,
  compress: true,
}

// Add debug output
console.log('Next.js Config Loaded:');
console.log('Image Remote Patterns:', nextConfig.images.remotePatterns);

export default nextConfig;