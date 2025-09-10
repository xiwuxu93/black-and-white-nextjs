import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/providers/theme-provider'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import GoogleAnalytics from '@/components/analytics/google-analytics'
import GoogleTagManager, { GTMNoScript } from '@/components/analytics/google-tag-manager'
import GoogleAdsense from '@/components/ads/google-adsense'
import { StructuredData } from '@/components/seo/structured-data'
import { NavigationStructuredData } from '@/components/seo/navigation-structured-data'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'Convert Image to Black and White - Free B&W Photo Converter',
    template: '%s | BWConverter'
  },
  description: 'Transform any color photo into stunning black and white images with our free online converter. Professional results in just a few clicks - no software needed.',
  keywords: [
    'black white image converter',
    'convert image black white', 
    'free photo converter',
    'monochrome image',
    'B&W converter online'
  ],
  authors: [{ name: 'BWConverter.com' }],
  creator: 'BWConverter.com',
  publisher: 'BWConverter.com',
  metadataBase: new URL('https://bwconverter.com'),
  category: 'Technology',
  classification: 'Image Processing Tool',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://bwconverter.com',
    title: 'Convert Image to Black and White - Free B&W Photo Converter',
    description: 'Transform any color photo into stunning black and white images with our free online converter. Professional results in just a few clicks - no software needed.',
    siteName: 'BWConverter - Black and White Image Converter',
    images: [
      {
        url: '/black-and-white-image.png',
        width: 1200,
        height: 630,
        alt: 'Black and White Image Converter - BWConverter',
        type: 'image/png'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Convert Image to Black and White - Free B&W Photo Converter',
    description: 'Transform any color photo into stunning black and white images with our free online converter. Professional results in just a few clicks - no software needed.',
    images: ['/black-and-white-image.png'],
    creator: '@bwconverter'
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'ca-pub-4855228928819714',
  },
  alternates: {
    canonical: 'https://bwconverter.com',
  },
  manifest: '/manifest.json',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '16x16 32x32', type: 'image/x-icon' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' }
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }
    ]
  },
  other: {
    'google-adsense-account': 'ca-pub-4855228928819714'
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <NavigationStructuredData />
        <StructuredData type="website" data={{}} />
        <StructuredData type="application" data={{}} />
        <StructuredData type="faq" data={{
          questions: [
            {
              question: "What is a black and white image converter?",
              answer: "A black and white image converter is a tool that transforms color photos into monochrome images. Our converter uses advanced algorithms to create professional-quality black and white images while preserving important details and contrast."
            },
            {
              question: "Is this black and white image converter really free?",
              answer: "Yes! Our black and white image converter is completely free to use. There are no hidden costs, watermarks, or registration requirements. Convert as many images to black and white as you want."
            },
            {
              question: "What image formats can I convert to black and white?",
              answer: "Our black and white image converter supports all common image formats including JPG, JPEG, PNG, GIF, and WebP. You can convert any of these formats to high-quality black and white images."
            },
            {
              question: "How is this different from simple grayscale conversion?",
              answer: "Our black and white image converter goes beyond simple grayscale. It uses professional techniques like luminance mapping, contrast enhancement, and selective tone adjustment to create stunning black and white images with rich detail and depth."
            }
          ]
        }} />
      </head>
      <body className={inter.className}>
        <GTMNoScript />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="min-h-screen bg-background text-foreground">
            <Header />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
        </ThemeProvider>
        <div style={{display:"none"}}>
          <GoogleAnalytics />
          <GoogleTagManager />
          <GoogleAdsense />
        </div>
      </body>
    </html>
  )
}