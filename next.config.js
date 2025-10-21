/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizePackageImports: ['lucide-react']
  },
  images: {
    domains: [
      'localhost',
      'images.unsplash.com',
      'magicbox.tools',
      'cdn.prod.website-files.com',
      'imglab.dev',
      'fwfw.app',
      'acidtools.com'
    ],
    unoptimized: false
  },
  trailingSlash: true,
  async redirects() {
    return [
      {
        source: '/:path*/index.html',
        destination: '/:path*/',
        permanent: true
      },
      {
        source: '/:path*.html',
        destination: '/:path*/',
        permanent: true
      },
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'www.bwconverter.com'
          }
        ],
        destination: 'https://bwconverter.com/:path*',
        permanent: true
      }
    ]
  }
}

module.exports = nextConfig
