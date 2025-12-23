import type { Metadata } from 'next'
import Link from 'next/link'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ConverterExperience } from '@/components/home/converter-experience'
import { canonicalUrl } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Black and White Photo Converter – Make Any Photo Black and White Online',
  description:
    'Convert photos to black and white online in seconds. Free black and white photo converter for portraits, travel shots and old family photos.',
  keywords: [
    'black and white photo converter',
    'make photo black and white',
    'photo to black and white',
    'make picture black and white'
  ],
  alternates: {
    canonical: canonicalUrl('/black-and-white-photo-converter')
  },
  openGraph: {
    title: 'Black and White Photo Converter – Make Any Photo Black and White Online',
    description:
      'Give your photos a timeless black and white look. Free online converter for portraits, travel images and family pictures.',
    url: canonicalUrl('/black-and-white-photo-converter')
  }
}

function PhotoConverterSections() {
  return (
    <section className="converter-marketing py-20 px-4">
      <div className="container mx-auto max-w-6xl space-y-16">
        <section className="bg-white dark:bg-gray-900 rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100 dark:border-gray-800">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            How to Make a Photo Black and White Online
          </h2>
          <div className="grid md:grid-cols-3 gap-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                1. Upload your colour photo
              </h3>
              <p>
                Start with any portrait, travel shot or family photo. The converter handles phone images, camera JPGs
                and exported files from your favourite editor.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                2. Choose the mood and style
              </h3>
              <p>
                Use presets and sliders to decide whether your black and white should feel soft and gentle, neutral and
                documentary, or bold and high contrast.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                3. Download a print-ready file
              </h3>
              <p>
                Export your finished black and white photo as PNG, JPG or WebP. Keep full resolution for printing,
                albums or framed wall art.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-gray-50 dark:bg-gray-900/60 rounded-3xl p-8 md:p-12 border border-gray-100 dark:border-gray-800">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            Photo Types That Work Beautifully in Black and White
          </h2>
          <div className="grid md:grid-cols-3 gap-6 text-gray-600 dark:text-gray-300">
            <Card className="p-6 bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Portraits and headshots
              </h3>
              <p>
                Emphasise expression, gesture and light instead of wardrobe colour. Ideal for LinkedIn profiles,
                portfolio sites, and artist bios.
              </p>
            </Card>
            <Card className="p-6 bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Travel and street photography
              </h3>
              <p>
                Simplify busy scenes into strong shapes and shadows. Black and white is perfect for cityscapes,
                architecture, and documentary work.
              </p>
            </Card>
            <Card className="p-6 bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Family and legacy photos
              </h3>
              <p>
                Give everyday moments a timeless look. Convert snapshots into cohesive sets for albums, slideshow
                reveals or framed prints.
              </p>
            </Card>
          </div>
        </section>

        <section className="bg-white dark:bg-gray-900 rounded-3xl p-8 md:p-12 border border-gray-100 dark:border-gray-800">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            Why Turn Your Photos into Black and White?
          </h2>
          <div className="grid md:grid-cols-2 gap-8 text-gray-600 dark:text-gray-300">
            <div className="space-y-4">
              <p>
                Black and white photography removes colour as a variable, which makes it easier to focus on light,
                shadow and expression. That&apos;s why portrait photographers, wedding teams and documentary shooters
                all keep a monochrome workflow in their toolkit.
              </p>
              <p>
                For personal projects, a consistent black and white look helps tie together photos from different days,
                locations and cameras into a single, cohesive story.
              </p>
            </div>
            <div className="space-y-4">
              <p>
                BWConverter gives you professional-level control without the overhead of a full editing suite. Upload a
                file, refine your preview, and export a clean black and white photo that is ready for both screen and
                print.
              </p>
              <p>
                Because everything runs locally in your browser, it&apos;s safe to convert client galleries or sensitive
                family photos without uploading them to external servers.
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
              If you work with full galleries or mixed file types, pair this photo-focused converter with other tools
              powered by the same monochrome engine.
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
              <Link href="/blog">
                <Button variant="ghost" size="lg">
                  Read Black and White Guides
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </section>
  )
}

export default function BlackAndWhitePhotoConverterPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <ConverterExperience
        heroBadgeText="Photo to Black and White Tool"
        heroTitle="Black and White Photo Converter"
        heroSubtitle="Give any portrait, travel shot or family photo a timeless black and white look with professional control and zero uploads."
        heroFeatureBadges={[
          'Ideal for Portraits and Travel Photos',
          'Free, Fast and Easy to Use',
          'No Watermark or Signup',
          'Print-Ready Exports'
        ]}
      />
      <PhotoConverterSections />
    </div>
  )
}

