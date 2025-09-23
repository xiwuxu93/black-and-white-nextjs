import type { Metadata } from 'next'
import BatchPage from '@/components/pages/batch-page'
import { canonicalUrl } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Batch Black and White Image Converter - Convert Multiple Photos Online',
  description: 'Convert multiple photos to black and white in one click. Our free batch converter processes images locally, keeps full resolution, and delivers professional monochrome results instantly.',
  keywords: [
    'batch black and white converter',
    'bulk image converter',
    'convert multiple photos black and white',
    'black and white batch processing'
  ],
  alternates: {
    canonical: canonicalUrl('/batch')
  },
  openGraph: {
    title: 'Batch Black and White Image Converter - Convert Multiple Photos Online',
    description: 'Convert multiple photos to black and white in one click. Our free batch converter processes images locally, keeps full resolution, and delivers professional monochrome results instantly.',
    url: canonicalUrl('/batch')
  }
}

export default function BatchPageRoute() {
  return <BatchPage />
}
