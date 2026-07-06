import type { Metadata } from 'next'
import '../globals.css'
import { ThemeProvider } from '@/components/providers/theme-provider'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { MainContainer } from '@/components/layout/main-container'
import GoogleAnalytics from '@/components/analytics/google-analytics'
import { StructuredData } from '@/components/seo/structured-data'
import { NavigationStructuredData } from '@/components/seo/navigation-structured-data'
import { canonicalUrl } from '@/lib/seo'
import Script from 'next/script'

const inter = { className: 'font-sans' }
const enableAds = process.env.NEXT_PUBLIC_ENABLE_ADS === 'true'

export const metadata: Metadata = {
  title: {
    default: 'Black and White Image Converter - Make Image Black and White Online',
    template: '%s | BWConverter'
  },
  description: 'Make an image black and white in your browser. Upload a photo, preview the result, adjust the tones, and download it without sending the file to a server.',
  keywords: [
    'black and white image converter',
    'make image black and white',
    'image to black and white',
    'convert image to black and white',
    'black and white converter'
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
    url: canonicalUrl('/en/'),
    title: 'Black and White Image Converter - Make Image Black and White Online',
    description: 'Upload a color image and turn it black and white in your browser. Preview tones, adjust contrast, and download the result.',
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
    title: 'Black and White Image Converter - Make Image Black and White Online',
    description: 'Upload a color image and turn it black and white in your browser. Preview tones, adjust contrast, and download the result.',
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
  alternates: {
    canonical: canonicalUrl('/en/'),
    languages: {
      'en': 'https://bwconverter.com/en/',
      'x-default': 'https://bwconverter.com/en/'
    }
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
  }
}

export default function RootLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  return (
    <html lang={locale} suppressHydrationWarning>
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
          <div className="min-h-screen bg-background text-foreground flex flex-col">
            <Header />
            <MainContainer>
              {children}
            </MainContainer>
            <Footer />
          </div>
        </ThemeProvider>
        {process.env.NODE_ENV === 'production' && (
          <Script
            src="https://scripts.scriptwrapper.com/tags/6be4f521-ca9d-4437-9b0c-41cf46b08702.js"
            strategy="afterInteractive"
            data-noptimize="1"
            data-cfasync="false"
          />
        )}
        <GoogleAnalytics />
      </body>
    </html>
  )
}

export function generateStaticParams() {
  return [{ locale: 'en' }]
}
