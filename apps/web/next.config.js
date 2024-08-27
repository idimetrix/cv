const withBundleAnalyzer = require('@next/bundle-analyzer')({
   enabled: process.env.ANALYZE === 'true',
})

const moduleExports = {
   reactStrictMode: false,
   images: {
      remotePatterns: [
         {
            protocol: 'https',
            hostname: '**',
         },
      ],
   },
   transpilePackages: [
      '@cv/config',
      '@cv/dayjs',
      '@cv/lib',
      '@cv/trpc',
      '@cv/types',
   ],
   webpack: (config, { isServer }) => {
      // If client-side, don't polyfill `fs`
      if (!isServer) {
         config.resolve.fallback = {
            fs: false,
         }
      }

      return config
   },
}

module.exports = withBundleAnalyzer(moduleExports)
