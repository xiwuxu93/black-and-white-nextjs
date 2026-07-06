import type { Metadata } from 'next'
import DownloadPageClient from '@/components/pages/download-page-client'

export const metadata: Metadata = {
  title: 'Download Your Converted File - BWConverter',
  description: 'Download your converted black and white photo or PDF document.',
  robots: {
    index: false,
    follow: false
  }
}

export default function DownloadPage() {
  return <DownloadPageClient />
}
