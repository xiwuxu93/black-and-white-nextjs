import { Metadata } from 'next'
import { ConverterExperience } from '@/components/home/converter-experience'
import {
  HOME_FAQ_SCHEMA,
  HOWTO_SCHEMA,
  MarketingSections
} from '@/components/home/marketing-sections'
import { StructuredData } from '@/components/seo/structured-data'
import { canonicalUrl } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Black and White Image Converter - Make Image Black and White Online',
  description: 'Make an image black and white in your browser. Upload a photo, preview the result, adjust the tones, and download it without sending the file to a server.',
  keywords: [
    'black and white image converter',
    'make image black and white',
    'image to black and white',
    'convert image to black and white',
    'black and white converter'
  ],
  alternates: {
    canonical: canonicalUrl('/en/')
  },
  openGraph: {
    title: 'Black and White Image Converter - Make Image Black and White Online',
    description: 'Upload a color image and turn it black and white in your browser. Preview tones, adjust contrast, and download the result.',
    url: canonicalUrl('/en/')
  }
}

export default function ToolSubpage() {
  return (
    <>
      <StructuredData type="howto" data={HOWTO_SCHEMA} />
      <StructuredData type="faq" data={HOME_FAQ_SCHEMA} />
      <ConverterExperience 
        isLandingPage={false}
        heroTitle="Black and White Image Converter"
        heroSubtitle="Upload a color photo, turn it black and white, and download the result. The conversion runs in your browser, so the original file stays on your device."
        marketingContent={<MarketingSections />}
      />
    </>
  )
}
