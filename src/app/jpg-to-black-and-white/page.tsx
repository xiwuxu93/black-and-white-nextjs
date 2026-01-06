import type { Metadata } from 'next'
import Link from 'next/link'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ConverterExperience } from '@/components/home/converter-experience'
import { canonicalUrl } from '@/lib/seo'
import { StructuredData } from '@/components/seo/structured-data'

export const metadata: Metadata = {
  title: 'JPG to Black and White – Free Online JPG to BW Converter',
  description:
    'Convert JPG to black and white online in seconds. Smart processing handles JPG artifacts and preserves detail. Free, private, and no signup required.',
  keywords: [
    'jpg to black and white',
    'jpg to bw',
    'convert jpg to black and white',
    'jpg black and white converter',
    'remove color from jpg'
  ],
  alternates: {
    canonical: canonicalUrl('/jpg-to-black-and-white')
  },
  openGraph: {
    title: 'JPG to Black and White – Free Online JPG to BW Converter',
    description:
      'Turn any JPG photo into a clean black and white image. Smart processing handles JPG artifacts and preserves detail.',
    url: canonicalUrl('/jpg-to-black-and-white')
  }
}

const FAQ_SCHEMA = {
  questions: [
    {
      question: 'Does converting JPG to black and white reduce quality?',
      answer: 'Not with BWConverter. We process the image data directly in your browser. While JPG is a compressed format, our engine prevents "double compression" artifacts by working with the raw pixel data before saving the new file.'
    },
    {
      question: 'Can I convert multiple JPGs at once?',
      answer: 'Yes. For bulk processing, use our Batch Converter tool linked below. It applies the same black and white settings to hundreds of JPGs simultaneously.'
    },
    {
      question: 'Does this work with iPhone HEIC photos?',
      answer: 'Yes, modern browsers automatically handle HEIC to JPG conversion when you upload. You can then save your black and white image as a widely compatible JPG.'
    },
    {
      question: 'How do I fix "muddy" grey JPGs?',
      answer: 'JPGs often lose contrast. Use the "Classic" preset and slightly increase the "Highlights" slider to separate the whites from the greys, giving your image a cleaner look.'
    }
  ]
}

function JpgToBwSections() {
  return (
    <section className="converter-marketing py-20 px-4">
      <div className="container mx-auto max-w-6xl space-y-16">
        <section className="bg-white dark:bg-gray-900 rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100 dark:border-gray-800">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            The Right Way to Convert JPG to Black and White
          </h2>
          <div className="grid md:grid-cols-3 gap-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                1. Smart Artifact Handling
              </h3>
              <p>
                JPGs use compression blocks that can look messy when filtered. Our engine smooths these transitions
                before removing colour, ensuring a cleaner grain structure than standard "saturation: 0" filters.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                2. Luminance-Based Conversion
              </h3>
              <p>
                We don&apos;t just remove colour; we map RGB channels to luminance. This means a red shirt and a blue sky
                won&apos;t turn into the same shade of grey, preserving the depth of your original photo.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                3. High-Fidelity Export
              </h3>
              <p>
                Save your result as a maximum-quality JPG (100% quality) or switch to PNG if you need to prevent any
                further compression generation loss.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-gray-50 dark:bg-gray-900/60 rounded-3xl p-8 md:p-12 border border-gray-100 dark:border-gray-800">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            Common JPG Conversion Scenarios
          </h2>
          <div className="grid md:grid-cols-3 gap-6 text-gray-600 dark:text-gray-300">
            <Card className="p-6 bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Social Media Archives
              </h3>
              <p>
                Downloaded Facebook or Instagram photos are often compressed JPGs. Our "Soft" preset helps hide compression artifacts
                while giving the image a timeless monochrome look.
              </p>
            </Card>
            <Card className="p-6 bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                E-commerce Product Shots
              </h3>
              <p>
                White-background product JPGs need pure white highlights. Use our "High Contrast" mode to ensure background
                pixels stay #FFFFFF while the product pops.
              </p>
            </Card>
            <Card className="p-6 bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Scanned Family Photos
              </h3>
              <p>
                Scans are almost always JPGs. Convert them to black and white to remove yellow aging stains (foxing)
                and restore the original contrast of the memory.
              </p>
            </Card>
          </div>
        </section>

        <section className="bg-white dark:bg-gray-900 rounded-3xl p-8 md:p-12 border border-gray-100 dark:border-gray-800">
           <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            JPG to Black and White FAQ
          </h2>
          <div className="grid gap-6 md:grid-cols-2 text-gray-600 dark:text-gray-300">
            {FAQ_SCHEMA.questions.map((faq, index) => (
              <div key={index}>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{faq.question}</h3>
                <p>{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-gray-50 dark:bg-gray-900/60 rounded-3xl p-8 md:p-12 border border-gray-100 dark:border-gray-800">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              More Than Just JPGs
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Need to handle transparent logos or bulk folders? We have specialised tools for that.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/png-to-black-and-white">
                <Button variant="outline" size="lg">
                  PNG Converter (For Logos)
                </Button>
              </Link>
              <Link href="/batch-black-and-white-converter">
                <Button variant="outline" size="lg">
                  Batch Converter
                </Button>
              </Link>
              <Link href="/examples">
                <Button variant="ghost" size="lg">
                  View Examples
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
    <>
      <StructuredData type="faq" data={FAQ_SCHEMA} />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <ConverterExperience
          heroBadgeText="JPG Optimized Tool"
          heroTitle="JPG to Black and White Converter"
          heroSubtitle="Turn JPG photos into clean black and white images. Smart processing handles compression artifacts for professional results."
          heroFeatureBadges={[
            'Artifact Smoothing',
            'No Re-Compression Loss',
            'Full-Resolution Export',
            '100% Private'
          ]}
          uploadAccept=".jpg,.jpeg,image/jpeg"
          uploadSupportText="Supports: JPG, JPEG • Optimized for photos"
          uploadAllowedExtensions={[
            'jpg',
            'jpeg'
          ]}
          uploadInvalidFileMessage="Please upload a JPG image (.jpg or .jpeg)."
        />
        <JpgToBwSections />
      </div>
    </>
  )
}
