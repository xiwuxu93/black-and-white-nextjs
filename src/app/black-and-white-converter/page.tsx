import { Metadata } from 'next'
import { ConverterExperience } from '@/components/home/converter-experience'
import { MarketingSections, HOWTO_SCHEMA, HOME_FAQ_SCHEMA } from '@/app/page'
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
    canonical: canonicalUrl('/black-and-white-converter')
  },
  openGraph: {
    title: 'Convert Photo to Black and White Online Free - B&W Photo Converter',
    description: 'Convert color photos to black and white in your browser with local processing and practical tonal controls.',
    url: canonicalUrl('/black-and-white-converter')
  }
}

export default function ToolSubpage() {
  return (
    <>
      <StructuredData type="howto" data={HOWTO_SCHEMA} />
      <StructuredData type="faq" data={HOME_FAQ_SCHEMA} />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <ConverterExperience 
          isLandingPage={false}
          heroTitle="Black and White Image Converter"
          heroSubtitle="I built this private tool to get professional monochrome tones without the complexity of desktop editors. No uploads, no grain loss, and 100% browser-resident processing."
          marketingContent={<MarketingSections />}
        />
      </div>
    </>
  )
}
