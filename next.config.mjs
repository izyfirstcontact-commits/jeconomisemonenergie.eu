/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  // Compression et optimisation pour Core Web Vitals (LCP < 1.8s)
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
  // Optimisation des images pour le LCP (formats modernes AVIF/WebP)
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000,
  },
  // Réduction du JavaScript bloquant le rendu
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },
  // URL redirects for SEO and multilingual support
  async redirects() {
    return [
      { source: '/privacy', destination: '/politique-de-confidentialite', permanent: true },
      { source: '/legal', destination: '/mentions-legales', permanent: true },
      { source: '/terms', destination: '/conditions-generales', permanent: true },
      { source: '/confidentialite', destination: '/politique-de-confidentialite', permanent: true },
      { source: '/cgu', destination: '/conditions-generales', permanent: true },
    ]
  },
  // Security headers for HTTPS and data protection
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Language',
            value: 'fr-BE'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()'
          },
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://googletagmanager.com https://www.google-analytics.com https://google-analytics.com https://www.googleadservices.com https://googleads.g.doubleclick.net https://www.google.com https://www.google.be https://pagead2.googlesyndication.com https://tpc.googlesyndication.com https://analytics.tiktok.com https://*.tiktok.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https: blob:; font-src 'self' data:; connect-src 'self' https://www.google-analytics.com https://google-analytics.com https://analytics.google.com https://www.googletagmanager.com https://googletagmanager.com https://www.google.com https://www.google.be https://googleads.g.doubleclick.net https://www.googleadservices.com https://pagead2.googlesyndication.com https://formspree.io https://*.vercel-storage.com https://*.blob.vercel-storage.com https://analytics.tiktok.com https://*.tiktok.com; frame-src https://www.google.com https://www.google.be https://googleads.g.doubleclick.net https://bid.g.doubleclick.net https://td.doubleclick.net https://*.tiktok.com; frame-ancestors 'none';"
          }
        ]
      }
    ]
  }
}

export default nextConfig
