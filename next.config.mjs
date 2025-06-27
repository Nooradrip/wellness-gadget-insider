/** @type {import('next').NextConfig} */
const nextConfig = {
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
    turbo: true,
    serverActions: false,
    typedRoutes: false,
    // Add this to resolve routing conflicts
    legacyBundles: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'm.media-amazon.com',
        pathname: '/images/I/**',
      }
    ],
    loader: 'custom',
    loaderFile: './src/lib/imageLoader.js',
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 3600,
    unoptimized: process.env.NODE_ENV === 'development',
  },
  webpack: (config) => {
    config.resolve.alias['@/data'] = new URL('./src/data', import.meta.url).pathname;
    config.snapshot = {
      ...(config.snapshot || {}),
      managedPaths: [/^(.+?[\\/]node_modules[\\/])/],
    };
    
    // Add this to resolve file system issues
    config.resolve = {
      ...config.resolve,
      alias: {
        ...config.resolve.alias,
        fs: false,
        path: false,
      }
    };
    
    return config;
  },
  productionBrowserSourceMaps: false,
  swcMinify: true,
  compress: true,
  staticPageGenerationTimeout: 300,
  output: 'standalone',
  // Add this to prioritize API routes
  rewrites: async () => [
    {
      source: '/api/:path*',
      destination: '/api/:path*',
    }
  ]
}

export default nextConfig;