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
  title: 'Black and White Image Converter | Convert Photo to B&W Online Free',
  description: 'Upload and convert color photos to black and white online. Free, secure, browser-resident monochrome photo processing with fine-grained tonal mixer.',
  keywords: [
    'black and white image converter',
    'convert image black and white',
    'free photo converter',
    'monochrome image',
    'B&W converter online'
  ],
  alternates: {
    canonical: canonicalUrl('/')
  },
  openGraph: {
    title: 'Convert Photo to Black and White Online Free - B&W Photo Converter',
    description: 'Convert color photos to black and white in your browser with local processing and practical tonal controls.',
    url: canonicalUrl('/')
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
        heroSubtitle="I built this private tool to get professional monochrome tones without the complexity of desktop editors. No uploads, no grain loss, and 100% browser-resident processing."
        marketingContent={<MarketingSections />}
      />
    </>
  )
}
