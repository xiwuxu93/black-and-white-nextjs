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
        source: '/ads.txt',
        destination: 'https://adstxt.journeymv.com/sites/6be4f521-ca9d-4437-9b0c-41cf46b08702/ads.txt',
        permanent: true
      },
      {
        source: '/',
        destination: '/en/',
        permanent: true
      },
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
        source: '/black-and-white-image/:path*',
        destination: '/en/',
        permanent: true
      },
      {
        source: '/convert-image-to-black-and-white/:path*',
        destination: '/en/',
        permanent: true
      },
      {
        source: '/black-and-white-converte/:path*',
        destination: '/en/black-and-white-converter/',
        permanent: true
      },
      {
        source: '/black-and-white-newborn-images/',
        destination: '/en/newborn-photography-guide/',
        permanent: true
      },
      {
        source: '/newborn-black-and-white-images/',
        destination: '/en/newborn-photography-guide/',
        permanent: true
      },
      {
        source: '/jpg-to-black-and-white/',
        destination: '/en/',
        permanent: true
      },
      {
        source: '/png-to-black-and-white/',
        destination: '/en/',
        permanent: true
      },
      {
        source: '/image-black-and-white-converter/',
        destination: '/en/',
        permanent: true
      },
      {
        source: '/black-and-white-photo-converter/',
        destination: '/en/',
        permanent: true
      },
      {
        source: '/black-and-white-photo-generator/',
        destination: '/en/',
        permanent: true
      },
      {
        source: '/tools/',
        destination: '/en/',
        permanent: true
      },
      {
        source: '/changelog/',
        destination: '/en/',
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
