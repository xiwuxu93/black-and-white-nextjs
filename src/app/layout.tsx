import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/providers/theme-provider'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import GoogleAnalytics from '@/components/analytics/google-analytics'
import GoogleAdsense from '@/components/ads/google-adsense'
import { StructuredData } from '@/components/seo/structured-data'
import { NavigationStructuredData } from '@/components/seo/navigation-structured-data'
import { canonicalUrl } from '@/lib/seo'
import Script from 'next/script'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'Black and White Image Converter - Convert Photos Online Free | BWConverter',
    template: '%s | BWConverter'
  },
  description: 'Convert images to black and white with our free online tool. Make photos monochrome instantly with professional editing features. No upload, 100% private.',
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
    url: canonicalUrl('/'),
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
    canonical: canonicalUrl('/'),
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
      </head>
      <body className={inter.className}>
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
          <Script id="adsterra-base" src={'//pl27893664.effectivegatecpm.com/4f/dd/ad/4fddadac30a85c97963d809831ee55f5.js'} strategy="afterInteractive" />
          <Script id="adsterra-base" src={'//pl28000606.effectivegatecpm.com/1d/15/7f/1d157fe1b9b618d3fd276464b571d76a.js'} strategy="afterInteractive" />
          <GoogleAnalytics />
          <GoogleAdsense />
        </div>
      </body>
    </html>
  )
}
