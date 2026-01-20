import type { Metadata } from 'next'
import Link from 'next/link'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ConverterExperience } from '@/components/home/converter-experience'
import { canonicalUrl } from '@/lib/seo'
import { StructuredData } from '@/components/seo/structured-data'

export const metadata: Metadata = {
  title: 'Convert Logo to Black and White - Transparent PNG & SVG Support',
  description:
    'Turn any logo or icon into black and white instantly. Supports PNG and SVG. Preserves transparent backgrounds for watermarks and professional design.',
  keywords: [
    'convert logo to black and white',
    'logo black and white converter',
    'svg to black and white png',
    'make logo monochrome',
    'transparent logo converter'
  ],
  alternates: {
    canonical: canonicalUrl('/logo-to-black-and-white')
  },
  openGraph: {
    title: 'Convert Logo to Black and White - Transparent PNG & SVG Support',
    description:
      'Turn any logo or icon into black and white instantly. Supports PNG and SVG. Preserves transparent backgrounds.',
    url: canonicalUrl('/logo-to-black-and-white')
  }
}

const FAQ_SCHEMA = {
  questions: [
    {
      question: 'Will my logo background stay transparent?',
      answer: 'Yes. Our converter is specifically built to respect the "Alpha Channel" (transparency). When you convert a logo, the colored parts turn black/white/grey, but the background remains 100% transparent.'
    },
    {
      question: 'Can I upload SVG files?',
      answer: 'Yes, we support SVG input. The tool will render your vector logo into a high-resolution black and white PNG, perfect for use in documents, websites, or social media.'
    },
    {
      question: 'How do I make a logo pure black for a watermark?',
      answer: 'Use our "High Contrast" preset. It removes greys and creates a solid black (or white) silhouette, which is ideal for watermarking photos or creating stencils.'
    },
    {
      question: 'Is it safe for unreleased brand assets?',
      answer: 'Absolutely. We use local browser processing. Your logo files are never uploaded to our servers, ensuring complete confidentiality for client work.'
    }
  ]
}

function LogoToBwSections() {
  return (
    <section className="converter-marketing py-20 px-4">
      <div className="container mx-auto max-w-6xl space-y-16">
        <section className="bg-white dark:bg-gray-900 rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100 dark:border-gray-800">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            Why Use This Tool for Logos?
          </h2>
          <div className="grid md:grid-cols-3 gap-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                1. Transparency First
              </h3>
              <p>
                Standard photo filters often ruin logos by filling the background with white. We keep your background invisible so you can layer the logo anywhere.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                2. SVG & PNG Support
              </h3>
              <p>
                Drag in your vector SVGs or raster PNGs. We handle both formats and output a universal, high-quality PNG ready for immediate use.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                3. Pure Monochrome
              </h3>
              <p>
                Need a solid single-color version? Our contrast controls allow you to flatten gradients into solid black or white shapes easily.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-gray-50 dark:bg-gray-900/60 rounded-3xl p-8 md:p-12 border border-gray-100 dark:border-gray-800">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            Common Use Cases
          </h2>
          <div className="grid md:grid-cols-3 gap-6 text-gray-600 dark:text-gray-300">
            <Card className="p-6 bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Website Footer Logos
              </h3>
              <p>
                Create a "Trusted By" or "As Seen In" section by converting partner logos to a uniform grey or black style.
              </p>
            </Card>
            <Card className="p-6 bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Watermarks
              </h3>
              <p>
                Create a subtle black or white version of your brand mark to overlay on photos without color clashing.
              </p>
            </Card>
            <Card className="p-6 bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Print Documents
              </h3>
              <p>
                Prepare logos for black-and-white receipts, invoices, or thermal printing where color is not available.
              </p>
            </Card>
          </div>
        </section>

        <section className="bg-white dark:bg-gray-900 rounded-3xl p-8 md:p-12 border border-gray-100 dark:border-gray-800">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            Logo Conversion FAQ
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
              Explore Other Converters
            </h2>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/jpg-to-black-and-white">
                <Button variant="outline" size="lg">
                  JPG Converter (For Photos)
                </Button>
              </Link>
              <Link href="/batch-black-and-white-converter">
                <Button variant="outline" size="lg">
                  Batch Converter
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </section>
  )
}

export default function LogoToBlackAndWhitePage() {
  return (
    <>
      <StructuredData type="faq" data={FAQ_SCHEMA} />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <ConverterExperience
          heroBadgeText="Logo & Icon Tool"
          heroTitle="Convert Logo to Black and White"
          heroSubtitle="Turn logos and icons into black and white instantly. Supports PNG and SVG inputs. Keeps background transparent."
          heroFeatureBadges={[
            'Preserves Transparency',
            'Supports PNG & SVG',
            'Clean Edges',
            '100% Private'
          ]}
          uploadAccept=".png,image/png,.svg,image/svg+xml"
          uploadSupportText="Supports: PNG, SVG"
          uploadAllowedExtensions={[
            'png',
            'svg'
          ]}
          uploadInvalidFileMessage="Please upload a PNG or SVG file."
        />
        <LogoToBwSections />
      </div>
    </>
  )
}
