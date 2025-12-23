import type { Metadata } from 'next'
import Link from 'next/link'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ConverterExperience } from '@/components/home/converter-experience'
import { canonicalUrl } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Black and White Photo Generator – Online Black and White Image Maker',
  description:
    'Generate black and white photos online with adjustable contrast and brightness. Free black and white photo generator for artistic, high-contrast images.',
  keywords: [
    'black and white photo generator',
    'black and white generator',
    'black and white image maker'
  ],
  alternates: {
    canonical: canonicalUrl('/black-and-white-photo-generator')
  },
  openGraph: {
    title: 'Black and White Photo Generator – Online Black and White Image Maker',
    description:
      'Create stylish black and white versions of your photos with adjustable contrast and brightness. Ideal for creative projects and social media.',
    url: canonicalUrl('/black-and-white-photo-generator')
  }
}

function PhotoGeneratorSections() {
  return (
    <section className="converter-marketing py-20 px-4">
      <div className="container mx-auto max-w-6xl space-y-16">
        <section className="bg-white dark:bg-gray-900 rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100 dark:border-gray-800">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            How to Generate Black and White Photos Online
          </h2>
          <div className="grid md:grid-cols-3 gap-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                1. Upload a photo or graphic
              </h3>
              <p>
                Start with any image that needs a bolder, more graphic look—portraits, product shots, illustrations or
                social content.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                2. Explore different black and white styles
              </h3>
              <p>
                Use presets and sliders to move from soft, film-like tones to punchy high-contrast looks. See every
                adjustment in real time.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                3. Export the style that fits your project
              </h3>
              <p>
                Download your black and white image in PNG, JPG or WebP, ready for social media, portfolios, posters or
                decks.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-gray-50 dark:bg-gray-900/60 rounded-3xl p-8 md:p-12 border border-gray-100 dark:border-gray-800">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            Creative Ways to Use a Black and White Generator
          </h2>
          <div className="grid md:grid-cols-3 gap-6 text-gray-600 dark:text-gray-300">
            <Card className="p-6 bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Social media campaigns
              </h3>
              <p>
                Build a recognisable black and white look for carousels, reels and grid takeovers without learning a
                full editing suite.
              </p>
            </Card>
            <Card className="p-6 bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Portfolios and mood boards
              </h3>
              <p>
                Test different monochrome styles for client decks, pitch presentations and personal projects before
                committing to a final direction.
              </p>
            </Card>
            <Card className="p-6 bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Posters and promotional artwork
              </h3>
              <p>
                Create bold, high-contrast artwork for events, print campaigns and online launches with just a few
                slider adjustments.
              </p>
            </Card>
          </div>
        </section>

        <section className="bg-white dark:bg-gray-900 rounded-3xl p-8 md:p-12 border border-gray-100 dark:border-gray-800">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            Black and White Styles You Can Create
          </h2>
          <div className="grid md:grid-cols-2 gap-8 text-gray-600 dark:text-gray-300">
            <div className="space-y-4">
              <p>
                With BWConverter, you can generate anything from gentle, low-contrast monochrome to punchy, film noir
                inspired looks. The same engine powers both subtle edits and dramatic transformations.
              </p>
              <p>
                Use presets as a starting point, then nudge sliders for highlights, shadows and grain until the black
                and white style matches your project.
              </p>
            </div>
            <div className="space-y-4">
              <p>
                Because everything runs locally, it&apos;s fast to experiment. Generate multiple versions of the same
                image for A/B testing, client approvals or mood board variations without waiting on cloud renders.
              </p>
              <p>
                When you land on a style you love, reuse it across campaigns to keep your black and white work
                consistent over time.
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
              Move from one-off creative experiments to full production workflows by combining the generator with other
              BWConverter tools.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/batch-black-and-white-converter">
                <Button variant="outline" size="lg">
                  Batch Black and White Converter
                </Button>
              </Link>
              <Link href="/black-and-white-photo-converter">
                <Button size="lg">Black and White Photo Converter</Button>
              </Link>
              <Link href="/blog">
                <Button variant="ghost" size="lg">
                  Explore Black and White Tutorials
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </section>
  )
}

export default function BlackAndWhitePhotoGeneratorPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <ConverterExperience
        heroBadgeText="Black and White Photo Generator"
        heroTitle="Online Black and White Image Maker"
        heroSubtitle="Generate stylish black and white versions of your photos with adjustable contrast, brightness and grain for truly custom looks."
        heroFeatureBadges={[
          'Adjustable Black and White Styles',
          'Great for Creative Projects',
          'Free, Browser-Based Tool',
          'No Watermark or Signup'
        ]}
      />
      <PhotoGeneratorSections />
    </div>
  )
}

