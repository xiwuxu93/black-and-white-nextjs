/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizePackageImports: ['lucide-react']
  },
  images: {
    domains: ['localhost', 'images.unsplash.com'],
    unoptimized: false
  },
  // Enable SSR mode
  trailingSlash: true,
  skipTrailingSlashRedirect: true
}

module.exports = nextConfig