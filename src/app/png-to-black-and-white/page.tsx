import type { Metadata } from 'next'
import Link from 'next/link'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ConverterExperience } from '@/components/home/converter-experience'
import { canonicalUrl } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'PNG to Black and White – Free Online PNG to BW Converter',
  description:
    'Convert PNG to black and white online while keeping sharp detail. Free PNG to BW converter for logos, icons and UI graphics.',
  keywords: [
    'png to black and white',
    'convert png to black and white',
    'png black and white converter'
  ],
  alternates: {
    canonical: canonicalUrl('/png-to-black-and-white')
  },
  openGraph: {
    title: 'PNG to Black and White – Free Online PNG to BW Converter',
    description:
      'Turn logos, icons and UI graphics into crisp black and white PNGs. Free, browser-based PNG to BW converter.',
    url: canonicalUrl('/png-to-black-and-white')
  }
}

function PngToBwSections() {
  return (
    <section className="converter-marketing py-20 px-4">
      <div className="container mx-auto max-w-6xl space-y-16">
        <section className="bg-white dark:bg-gray-900 rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100 dark:border-gray-800">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            How to Convert PNG to Black and White
          </h2>
          <div className="grid md:grid-cols-3 gap-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                1. Drop in your PNG graphic
              </h3>
              <p>
                Upload logos, icons, UI elements or diagrams in PNG format. The converter reads resolution and
                transparency data so your shapes stay sharp.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                2. Preview the black and white result
              </h3>
              <p>
                Adjust contrast and brightness to find the right balance between solid blacks and clean whites. Live
                previews help you avoid muddy tones.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                3. Export a crisp PNG file
              </h3>
              <p>
                Download a black and white PNG ready for interfaces, presentations, or print. Keep your brand assets
                consistent across all channels.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-gray-50 dark:bg-gray-900/60 rounded-3xl p-8 md:p-12 border border-gray-100 dark:border-gray-800">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            Best Uses for PNG to Black and White
          </h2>
          <div className="grid md:grid-cols-3 gap-6 text-gray-600 dark:text-gray-300">
            <Card className="p-6 bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Logos and brand marks
              </h3>
              <p>
                Prepare black and white logo versions for invoices, contracts, letterheads, and dark mode interfaces
                without opening a full design suite.
              </p>
            </Card>
            <Card className="p-6 bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                UI icons and system graphics
              </h3>
              <p>
                Convert icon sets to monochrome for clean navigation bars, toolbars, and status indicators that work
                across themes.
              </p>
            </Card>
            <Card className="p-6 bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Diagrams and technical drawings
              </h3>
              <p>
                Create high-contrast charts, floor plans, and schematics that remain legible when printed or projected
                in less-than-ideal conditions.
              </p>
            </Card>
          </div>
        </section>

        <section className="bg-white dark:bg-gray-900 rounded-3xl p-8 md:p-12 border border-gray-100 dark:border-gray-800">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            Why Convert PNG Graphics to Black and White?
          </h2>
          <div className="grid md:grid-cols-2 gap-8 text-gray-600 dark:text-gray-300">
            <div className="space-y-4">
              <p>
                PNG is the go-to format for logos and interface graphics because it preserves sharp edges and, when
                used, transparency. Converting these assets to black and white simplifies layouts and keeps UI elements
                readable against busy backgrounds.
              </p>
              <p>
                A dedicated PNG to black and white workflow also helps teams build accessible themes. High-contrast
                icons and charts are easier to read for more users.
              </p>
            </div>
            <div className="space-y-4">
              <p>
                With BWConverter, you can test several black and white looks in seconds without touching your original
                files. Adjust tones, export, and plug assets directly into design systems or slide decks.
              </p>
              <p>
                Because everything runs locally in your browser, you can safely process internal diagrams, product maps,
                and confidential UI explorations.
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
              Move from single PNG graphics to full campaigns with batch processing and additional converters tailored
              for different file types.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/batch-black-and-white-converter">
                <Button variant="outline" size="lg">
                  Batch Black and White Converter
                </Button>
              </Link>
              <Link href="/jpg-to-black-and-white">
                <Button size="lg">JPG to Black and White</Button>
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

export default function PngToBlackAndWhitePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <ConverterExperience
        heroBadgeText="PNG to Black and White Tool"
        heroTitle="PNG to Black and White Converter"
        heroSubtitle="Quickly convert PNG logos, icons and UI graphics into clean black and white images without leaving your browser."
        heroFeatureBadges={[
          'Ideal for Logos and Icons',
          'High-Contrast PNG Output',
          'No Watermark or Signup',
          'Fast, Browser-Based Processing'
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
  )
}
