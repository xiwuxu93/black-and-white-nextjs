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

export const dynamic = 'force-static'

export const metadata: Metadata = {
  title: {
    default: 'Black and White Converter | Convert Image to Black and White Online',
    template: '%s | BWConverter'
  },
  description: 'Free online black and white converter. Convert image to black and white in your browser with high-quality monochrome & grayscale presets. 100% free, private & instant.',
  keywords: [
    'black and white converter',
    'black and white image converter',
    'image to black and white',
    'convert image to black and white',
    'make image black and white',
    'convert image to pure black and white online',
    'black and white photo converter',
    'color to black and white'
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
    title: 'Black and White Converter | Convert Image to Black and White Online',
    description: 'Free online black and white converter. Convert image to black and white in your browser with high-quality monochrome & grayscale presets. 100% free, private & instant.',
    siteName: 'BWConverter - Black and White Converter',
    images: [
      {
        url: '/black-and-white-image.png',
        width: 1200,
        height: 630,
        alt: 'Black and White Converter - BWConverter',
        type: 'image/png'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Black and White Converter | Convert Image to Black and White Online',
    description: 'Free online black and white converter. Convert image to black and white in your browser with high-quality monochrome & grayscale presets. 100% free, private & instant.',
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
      'es': 'https://bwconverter.com/es/',
      'de': 'https://bwconverter.com/de/',
      'ja': 'https://bwconverter.com/ja/',
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
  },
  other: {
    'google-adsense-account': 'ca-pub-4855228928819714'
  }
}

import { getDictionary } from '@/locales'

export default function RootLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  const dict = getDictionary(locale)

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <NavigationStructuredData />
        <StructuredData type="website" data={{ locale }} />
        <StructuredData type="application" data={{ locale }} />
        
        {/* Google AdSense Site Verification Meta Tag */}
        <meta name="google-adsense-account" content="ca-pub-4855228928819714" />

        {/* Preconnect to Journey ad script server to reduce latency */}
        <link rel="preconnect" href="https://scripts.scriptwrapper.com" />
        <link rel="dns-prefetch" href="https://scripts.scriptwrapper.com" />

        {/* Load Journey ads script as early as possible without blocking HTML parsing */}
        {process.env.NODE_ENV === 'production' && (
          <script
            async
            src="https://scripts.scriptwrapper.com/tags/6be4f521-ca9d-4437-9b0c-41cf46b08702.js"
            data-noptimize="1"
            data-cfasync="false"
          />
        )}
      </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="min-h-screen bg-background text-foreground flex flex-col">
            <Header dict={dict} />
            <MainContainer>
              {children}
            </MainContainer>
            <Footer dict={dict} />
          </div>
        </ThemeProvider>
        <GoogleAnalytics />
      </body>
    </html>
  )
}

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'es' }, { locale: 'de' }, { locale: 'ja' }]
}
