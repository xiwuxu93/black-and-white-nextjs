import type { Metadata } from 'next'
import Link from 'next/link'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ConverterExperience } from '@/components/home/converter-experience'
import { canonicalUrl } from '@/lib/seo'
import { StructuredData } from '@/components/seo/structured-data'

export const metadata: Metadata = {
  title: 'Black and White Photo Generator – Create Artistic Monochrome Images',
  description:
    'Generate stylish black and white art from your photos. Create high-contrast posters, moody edits, and custom monochrome styles instantly.',
  keywords: [
    'black and white photo generator',
    'black and white art generator',
    'monochrome image maker',
    'artistic photo filter',
    'high contrast photo generator'
  ],
  alternates: {
    canonical: canonicalUrl('/black-and-white-photo-generator')
  },
  openGraph: {
    title: 'Black and White Photo Generator – Create Artistic Monochrome Images',
    description:
      'Turn photos into bold black and white art. Perfect for posters, album covers, and creative projects.',
    url: canonicalUrl('/black-and-white-photo-generator')
  }
}

const FAQ_SCHEMA = {
  questions: [
    {
      question: 'How do I create a "high contrast" look?',
      answer: 'Use our "High Contrast" preset as a base, then push the Contrast slider up to 140-150%. This crushes the greys into black or white, creating a bold, graphic effect.'
    },
    {
      question: 'Can I add film grain?',
      answer: 'Yes. The Grain slider adds procedural noise that mimics 35mm film. It is great for adding texture to digital images that look "too clean".'
    },
    {
      question: 'Is this good for making posters?',
      answer: 'Absolutely. By removing color, you focus the viewer\'s eye on shapes and text. Download your result as a high-res PNG to use as a background for your poster design.'
    },
    {
      question: 'Can I generate a "Noir" style image?',
      answer: 'Yes. Select the "Film Noir" preset. It darkens the shadows and adds a slight glow to highlights, replicating the mood of 1940s cinema.'
    }
  ]
}

function PhotoGeneratorSections() {
  return (
    <section className="converter-marketing py-20 px-4">
      <div className="container mx-auto max-w-6xl space-y-16">
        <section className="bg-white dark:bg-gray-900 rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100 dark:border-gray-800">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            Generate Art from Your Photos
          </h2>
          <div className="grid md:grid-cols-3 gap-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                1. Graphic Impact
              </h3>
              <p>
                Turn standard photos into bold, graphic elements. High-contrast black and white removes distractions,
                making your subject pop off the screen.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                2. Texture & Mood
              </h3>
              <p>
                Don&apos;t just filter—generate a feeling. Add heavy grain for a gritty street look or soften the highlights
                for a dreamlike, ethereal vibe.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                3. Design-Ready Assets
              </h3>
              <p>
                Create backgrounds and hero images that sit perfectly behind text. Black and white images provide excellent
                readability for overlays in web design and print.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-gray-50 dark:bg-gray-900/60 rounded-3xl p-8 md:p-12 border border-gray-100 dark:border-gray-800">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            Styles You Can Generate
          </h2>
          <div className="grid md:grid-cols-3 gap-6 text-gray-600 dark:text-gray-300">
            <Card className="p-6 bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                The "Stencil" Look
              </h3>
              <p>
                Push contrast to the maximum to create near-binary black and white images. Perfect for t-shirt prints,
                stencils, and logo concepts.
              </p>
            </Card>
            <Card className="p-6 bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Cinematic Noir
              </h3>
              <p>
                Deep shadows and glowing highlights. Use this style to make a modern portrait look like a still from a
                classic detective movie.
              </p>
            </Card>
            <Card className="p-6 bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Matte Editorial
              </h3>
              <p>
                Lift the blacks (make them dark grey) for a modern, matte finish often seen in fashion magazines and
                indie photobooks.
              </p>
            </Card>
          </div>
        </section>

        <section className="bg-white dark:bg-gray-900 rounded-3xl p-8 md:p-12 border border-gray-100 dark:border-gray-800">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            Generator FAQ
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
              Explore Other Tools
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Need standard conversions instead of artistic ones? Try our dedicated format tools.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/black-and-white-photo-converter">
                <Button variant="outline" size="lg">
                  Standard Photo Converter
                </Button>
              </Link>
              <Link href="/jpg-to-black-and-white">
                <Button variant="outline" size="lg">
                  JPG Tool
                </Button>
              </Link>
              <Link href="/blog">
                <Button variant="ghost" size="lg">
                  Tutorials
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
    <>
      <StructuredData type="faq" data={FAQ_SCHEMA} />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <ConverterExperience
          heroBadgeText="Artistic Generator"
          heroTitle="Black and White Photo Generator"
          heroSubtitle="Generate artistic, high-contrast, or cinematic black and white images. Control every detail to create your own signature style."
          heroFeatureBadges={[
            'Create Artistic Styles',
            'High Contrast & Noir Modes',
            'Add Film Grain',
            'Instant Browser Preview'
          ]}
        />
        <PhotoGeneratorSections />
      </div>
    </>
  )
}

