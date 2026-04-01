import type { Metadata } from 'next'
import BatchPage from '@/components/pages/batch-page'
import { canonicalUrl } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Batch Black and White Converter - Convert Multiple Images Online',
  description: 'Convert multiple images to black and white in one workflow. Free batch converter for photos, graphics, and client galleries.',
  keywords: [
    'batch black and white converter',
    'convert multiple images to black and white',
    'convert photos to black and white',
    'make pictures black and white'
  ],
  alternates: {
    canonical: canonicalUrl('/batch-black-and-white-converter')
  },
  openGraph: {
    title: 'Batch Black and White Converter - Convert Multiple Images Online',
    description: 'Convert multiple images to black and white in one workflow. Free batch converter for photos, graphics, and client galleries.',
    url: canonicalUrl('/batch-black-and-white-converter')
  }
}

export default function BatchBlackAndWhiteConverterPage() {
  return <BatchPage />
}
