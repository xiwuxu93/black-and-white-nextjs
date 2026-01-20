import type { Metadata } from 'next'
import Link from 'next/link'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ConverterExperience } from '@/components/home/converter-experience'
import { canonicalUrl } from '@/lib/seo'
import { StructuredData } from '@/components/seo/structured-data'

export const metadata: Metadata = {
  title: 'Invert Image Colors - Online Negative Photo Effect',
  description:
    'Invert colors of any image online. Turn photos into negatives or flip black and white to white and black instantly. Free and private tool.',
  keywords: [
    'invert image colors',
    'negative photo converter',
    'invert colors online',
    'photo color inverter',
    'black to white converter'
  ],
  alternates: {
    canonical: canonicalUrl('/invert-image-colors')
  },
  openGraph: {
    title: 'Invert Image Colors - Online Negative Photo Effect',
    description:
      'Turn photos into negatives or flip black and white to white and black instantly. Free and private tool.',
    url: canonicalUrl('/invert-image-colors')
  }
}

const FAQ_SCHEMA = {
  questions: [
    {
      question: 'How do I invert colors in a picture accurately?',
      answer: 'Upload your image and our tool automatically calculates the mathematical opposite of every pixel. We subtract the original RGB values from 255, ensuring a scientifically accurate negative without color shifts.'
    },
    {
      question: 'Can I turn a black logo into white for dark mode?',
      answer: 'Yes. This is a common design technique. Inverting a black logo on a white background (or transparent alpha channel) instantly creates a high-contrast white version suitable for dark websites.'
    },
    {
      question: 'Does this work for scanning film negatives?',
      answer: 'Yes. Because film negatives capture light as dark density, inverting them digitally restores the positive image. Our linear inversion preserves the dynamic range of your scan.'
    },
    {
      question: 'Is my data private?',
      answer: 'Yes. We process images using WebAssembly in your browser. Unlike server-side converters, your photos never leave your device, guaranteeing 100% privacy.'
    }
  ]
}

function InvertSections() {
  return (
    <section className="converter-marketing py-20 px-4">
      <div className="container mx-auto max-w-6xl space-y-16">
        <section className="bg-white dark:bg-gray-900 rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100 dark:border-gray-800">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            Why Invert Image Colors?
          </h2>
          <div className="grid md:grid-cols-3 gap-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                1. Create Dark Mode Assets
              </h3>
              <p>
                Have a black icon that vanishes on a dark background? Invert it to white instantly to fix your design.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                2. Digitize Film Negatives
              </h3>
              <p>
                Digitized your old film strips? Use the invert tool to flip them into positive, viewable photos with accurate tone.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                3. Accessibility & Vision
              </h3>
              <p>
                High-contrast negative modes can make text easier to read for users with specific visual impairments.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-gray-50 dark:bg-gray-900/60 rounded-3xl p-8 md:p-12 border border-gray-100 dark:border-gray-800">
          <div className="max-w-3xl mx-auto text-left">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center">
              The Science of Color Inversion
            </h2>
            <div className="space-y-4 text-gray-600 dark:text-gray-300">
              <p>
                Digital color inversion isn&apos;t magic; it&apos;s math. Every pixel in your digital image is made of Red, Green, and Blue (RGB) channels, typically ranging from 0 (no light) to 255 (full light).
              </p>
              <p>
                Our tool calculates the exact complementary color for each pixel using the formula:
                <code className="bg-gray-200 dark:bg-gray-800 px-2 py-1 rounded mx-1 text-sm font-mono">New Value = 255 - Original Value</code>
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Black (0,0,0)</strong> becomes <strong>White (255,255,255)</strong></li>
                <li><strong>Red (255,0,0)</strong> becomes <strong>Cyan (0,255,255)</strong></li>
                <li><strong>Blue (0,0,255)</strong> becomes <strong>Yellow (255,255,0)</strong></li>
              </ul>
              <p>
                This ensures a mathematically perfect negative image, preserving all the detail and dynamic range of your original file.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-white dark:bg-gray-900 rounded-3xl p-8 md:p-12 border border-gray-100 dark:border-gray-800">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            Invert Colors FAQ
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
              More Tools
            </h2>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/">
                <Button variant="outline" size="lg">
                  Black & White Converter
                </Button>
              </Link>
              <Link href="/logo-to-black-and-white">
                <Button variant="outline" size="lg">
                  Logo Converter
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </section>
  )
}

export default function InvertImageColorsPage() {
  return (
    <>
      <StructuredData type="faq" data={FAQ_SCHEMA} />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <ConverterExperience
          heroBadgeText="Free Negative Tool"
          heroTitle="Invert Image Colors Online"
          heroSubtitle="Instantly flip colors to their opposite. Turn black to white, or create negative photo effects in your browser."
          heroFeatureBadges={[
            'Invert Colors',
            'Negative Effect',
            'Black to White',
            '100% Private'
          ]}
          defaultFilters={{
            invert: true,
            grayscale: false
          }}
          mode="invert"
          hideAdvancedControls={true}
          hideBottomFeatures={true}
        />
        <InvertSections />
      </div>
    </>
  )
}
