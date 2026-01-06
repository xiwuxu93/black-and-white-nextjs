import type { Metadata } from 'next'
import Link from 'next/link'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ConverterExperience } from '@/components/home/converter-experience'
import { canonicalUrl } from '@/lib/seo'
import { StructuredData } from '@/components/seo/structured-data'

export const metadata: Metadata = {
  title: 'PNG to Black and White – Free Online PNG to BW Converter',
  description:
    'Convert PNG to black and white online while preserving transparency and sharp edges. Perfect for logos, icons, and interface graphics.',
  keywords: [
    'png to black and white',
    'convert png to black and white',
    'png black and white converter',
    'logo black and white converter'
  ],
  alternates: {
    canonical: canonicalUrl('/png-to-black-and-white')
  },
  openGraph: {
    title: 'PNG to Black and White – Free Online PNG to BW Converter',
    description:
      'Turn logos, icons and UI graphics into crisp black and white PNGs. Preserves transparency for professional design work.',
    url: canonicalUrl('/png-to-black-and-white')
  }
}

const FAQ_SCHEMA = {
  questions: [
    {
      question: 'Does this converter keep the transparent background?',
      answer: 'Yes. Our PNG engine respects the alpha channel. When you convert a logo or icon, the background remains transparent, and only the visible pixels are turned to black and white.'
    },
    {
      question: 'Will my logo edges get pixelated?',
      answer: 'No. We work with the original resolution of your file. The anti-aliased edges (the soft pixels around the curves) are desaturated correctly so they blend smoothly against any background.'
    },
    {
      question: 'Can I make a logo purely black (no greys)?',
      answer: 'Yes. Use the "High Contrast" preset and crank the contrast slider to maximum. This creates a "threshold" effect, perfect for stencils, vinyl cutting, or stamp making.'
    },
    {
      question: 'Is it safe to upload confidential brand assets?',
      answer: 'Completely safe. BWConverter processes files locally in your browser. Your unreleased logos or client assets never leave your computer.'
    }
  ]
}

function PngToBwSections() {
  return (
    <section className="converter-marketing py-20 px-4">
      <div className="container mx-auto max-w-6xl space-y-16">
        <section className="bg-white dark:bg-gray-900 rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100 dark:border-gray-800">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            Professional PNG Conversion Features
          </h2>
          <div className="grid md:grid-cols-3 gap-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                1. Transparency Protection
              </h3>
              <p>
                Unlike basic photo filters that fill backgrounds with white, our tool isolates the alpha channel.
                Your floating logos and icons stay floating.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                2. Edge Crispness
              </h3>
              <p>
                PNGs are often used for sharp graphics. We avoid the "compression noise" often seen in JPG converters,
                keeping your lines and text razor-sharp.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                3. Lossless Export
              </h3>
              <p>
                When you download your result, it saves as a standard PNG-24. No data is discarded, making it safe
                for subsequent edits in Illustrator or Figma.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-gray-50 dark:bg-gray-900/60 rounded-3xl p-8 md:p-12 border border-gray-100 dark:border-gray-800">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            Design Use Cases for Black and White PNGs
          </h2>
          <div className="grid md:grid-cols-3 gap-6 text-gray-600 dark:text-gray-300">
            <Card className="p-6 bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Client Logos for Footers
              </h3>
              <p>
                Partner logos often come in mismatched colours. Convert them all to monochrome PNGs to create a
                unified, professional "Trusted By" section on your website.
              </p>
            </Card>
            <Card className="p-6 bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Dark Mode Assets
              </h3>
              <p>
                Prepare white or grey versions of your icons to pop against dark backgrounds. Use the "Invert" or brightness
                controls to adapt assets for dark mode themes.
              </p>
            </Card>
            <Card className="p-6 bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Architectural Overlays
              </h3>
              <p>
                Turn colourful trees, people, or furniture cutouts into stylish black and white silhouettes for
                architectural renders and diagrams.
              </p>
            </Card>
          </div>
        </section>

        <section className="bg-white dark:bg-gray-900 rounded-3xl p-8 md:p-12 border border-gray-100 dark:border-gray-800">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            PNG Conversion FAQ
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
              Related Tools
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Working with photos instead of graphics? Check out our photo-optimised tools.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/jpg-to-black-and-white">
                <Button variant="outline" size="lg">
                  JPG Converter (For Photos)
                </Button>
              </Link>
              <Link href="/black-and-white-photo-converter">
                <Button variant="outline" size="lg">
                  General Photo Tool
                </Button>
              </Link>
              <Link href="/examples">
                <Button variant="ghost" size="lg">
                  See Results
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </section>
  )
}

export default function PngToBlackAndWhitePage() {
  return (
    <>
      <StructuredData type="faq" data={FAQ_SCHEMA} />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <ConverterExperience
          heroBadgeText="PNG & Logo Tool"
          heroTitle="PNG to Black and White Converter"
          heroSubtitle="Quickly convert PNG logos, icons and UI graphics into clean black and white images. Preserves transparency and edge sharpness."
          heroFeatureBadges={[
            'Preserves Transparency',
            'Sharp Edges for Logos',
            'No Compression Artifacts',
            'Browser-Based Privacy'
          ]}
          uploadAccept=".png,image/png"
          uploadSupportText="Supports: PNG only (.png) • Max size: 10MB"
          uploadAllowedExtensions={[
            'png'
          ]}
          uploadInvalidFileMessage="Please upload a PNG image (.png)."
        />
        <PngToBwSections />
      </div>
    </>
  )
}
