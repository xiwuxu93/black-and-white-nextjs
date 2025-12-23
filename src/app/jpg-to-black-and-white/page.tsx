import type { Metadata } from 'next'
import Link from 'next/link'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ConverterExperience } from '@/components/home/converter-experience'
import { canonicalUrl } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'JPG to Black and White – Free Online JPG to BW Converter',
  description:
    'Convert JPG to black and white online in seconds. Free JPG to BW converter with no watermark or signup. Perfect for social media, product photos and more.',
  keywords: [
    'jpg to black and white',
    'jpg to bw',
    'convert jpg to black and white',
    'jpg black and white converter'
  ],
  alternates: {
    canonical: canonicalUrl('/jpg-to-black-and-white')
  },
  openGraph: {
    title: 'JPG to Black and White – Free Online JPG to BW Converter',
    description:
      'Turn any JPG photo into a clean black and white image. Free, browser-based JPG to BW converter with no watermark.',
    url: canonicalUrl('/jpg-to-black-and-white')
  }
}

function JpgToBwSections() {
  return (
    <section className="converter-marketing py-20 px-4">
      <div className="container mx-auto max-w-6xl space-y-16">
        <section className="bg-white dark:bg-gray-900 rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100 dark:border-gray-800">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            How to Convert JPG to Black and White
          </h2>
          <div className="grid md:grid-cols-3 gap-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                1. Upload your JPG file
              </h3>
              <p>
                Drag and drop a JPG from your device or click to browse. The converter reads resolution, file size, and
                colour profile so your black and white version keeps all the original detail.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                2. Refine the black and white preview
              </h3>
              <p>
                Use presets and sliders to adjust contrast, brightness, highlights, and shadows. Preview updates
                instantly, so you can match the exact look you want before exporting.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                3. Download a clean JPG in seconds
              </h3>
              <p>
                When everything looks right, export your black and white JPG at full resolution. Filenames include a{' '}
                <code className="px-1 rounded bg-gray-100 dark:bg-gray-800 text-xs">-bw</code> suffix to keep edits
                organised.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-gray-50 dark:bg-gray-900/60 rounded-3xl p-8 md:p-12 border border-gray-100 dark:border-gray-800">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            Popular Uses for JPG to Black and White
          </h2>
          <div className="grid md:grid-cols-3 gap-6 text-gray-600 dark:text-gray-300">
            <Card className="p-6 bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Social media and content feeds
              </h3>
              <p>
                Turn colourful feeds into cleaner, more minimal grids. Black and white JPGs create natural visual
                breaks in reels, carousels, and story highlights.
              </p>
            </Card>
            <Card className="p-6 bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Product and ecommerce photos
              </h3>
              <p>
                Create consistent catalogue imagery by removing colour distractions. Highlight shape, texture, and
                packaging details across an entire product line.
              </p>
            </Card>
            <Card className="p-6 bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Portraits and lifestyle imagery
              </h3>
              <p>
                Emphasise expression and light instead of wardrobe colours. Black and white JPGs are ideal for
                portfolio pages, hero banners, and press kits.
              </p>
            </Card>
          </div>
        </section>

        <section className="bg-white dark:bg-gray-900 rounded-3xl p-8 md:p-12 border border-gray-100 dark:border-gray-800">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            Why Convert JPG Photos to Black and White?
          </h2>
          <div className="grid md:grid-cols-2 gap-8 text-gray-600 dark:text-gray-300">
            <div className="space-y-4">
              <p>
                Most JPGs are saved straight from camera or phone with strong colour and contrast baked in. Converting
                them to black and white helps you remove distractions and focus attention on composition, gesture, and
                light.
              </p>
              <p>
                For websites, portfolios, and editorial layouts, a consistent set of black and white JPGs also makes it
                easier to mix images from different shoots. Tones stay aligned even when the original colours did not.
              </p>
            </div>
            <div className="space-y-4">
              <p>
                Because BWConverter processes everything in your browser, you can safely convert client JPGs or personal
                photos without uploading them to third-party servers or cloud APIs.
              </p>
              <p>
                Use the same workflow across portraits, product shots, and behind-the-scenes images to build a clean,
                timeless look that still feels modern.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-gray-50 dark:bg-gray-900/60 rounded-3xl p-8 md:p-12 border border-gray-100 dark:border-gray-800">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Related Black and White Tools
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Need to convert more than a single JPG? Explore batch workflows and additional tools that extend the same
              black and white engine across full projects.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/batch-black-and-white-converter">
                <Button variant="outline" size="lg">
                  Batch Black and White Converter
                </Button>
              </Link>
              <Link href="/">
                <Button size="lg">General Black and White Converter</Button>
              </Link>
              <Link href="/examples">
                <Button variant="ghost" size="lg">
                  View Before / After Examples
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </section>
  )
}

export default function JpgToBlackAndWhitePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <ConverterExperience
        heroBadgeText="JPG to Black and White Tool"
        heroTitle="JPG to Black and White Converter"
        heroSubtitle="Turn any JPG photo into a clean black and white image in just a few clicks. Free, browser-based, and optimised for social, product, and portrait work."
        heroFeatureBadges={[
          'Free JPG to BW Converter',
          'No Watermark or Signup',
          'Full-Resolution JPG Downloads',
          'Works in Your Browser'
        ]}
        uploadAccept=".jpg,.jpeg,image/jpeg"
        uploadSupportText="Supports: JPG only (.jpg, .jpeg) • Max size: 10MB"
        uploadAllowedExtensions={[
          'jpg',
          'jpeg'
        ]}
        uploadInvalidFileMessage="Please upload a JPG image (.jpg or .jpeg)."
      />
      <JpgToBwSections />
    </div>
  )
}
