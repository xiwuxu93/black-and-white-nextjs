import type { Metadata } from 'next'
import Link from 'next/link'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ConverterExperience } from '@/components/home/converter-experience'
import { canonicalUrl } from '@/lib/seo'
import { StructuredData } from '@/components/seo/structured-data'

export const metadata: Metadata = {
  title: 'Black and White Photo Converter – Make Any Photo Black and White Online',
  description:
    'Convert photos to black and white online for printing, framing, and albums. Free tool designed for high-quality portraits and family memories.',
  keywords: [
    'black and white photo converter',
    'make photo black and white',
    'photo to black and white',
    'make picture black and white',
    'print black and white photos'
  ],
  alternates: {
    canonical: canonicalUrl('/black-and-white-photo-converter')
  },
  openGraph: {
    title: 'Black and White Photo Converter – Make Any Photo Black and White Online',
    description:
      'Give your photos a timeless black and white look. Free online converter optimized for printing and family albums.',
    url: canonicalUrl('/black-and-white-photo-converter')
  }
}

const FAQ_SCHEMA = {
  questions: [
    {
      question: 'Is this quality good enough for printing?',
      answer: 'Yes. We process your original file at full resolution. If you upload a 20-megapixel photo, you get a 20-megapixel black and white file back, perfect for large framed prints.'
    },
    {
      question: 'Which preset is best for old family photos?',
      answer: 'We recommend the "Classic" preset. It mimics the look of traditional silver gelatin prints, adding just enough contrast to restore faded details without looking artificial.'
    },
    {
      question: 'How do I make a photo look "vintage"?',
      answer: 'Select the "Vintage" preset and slightly increase the "Grain" slider. This adds a texture that simulates film photography, making digital photos feel more nostalgic.'
    },
    {
      question: 'Can I use this for wedding photos?',
      answer: 'Absolutely. Many couples use our "Soft" preset to create a cohesive black and white album from their color wedding deliverables.'
    }
  ]
}

function PhotoConverterSections() {
  return (
    <section className="converter-marketing py-20 px-4">
      <div className="container mx-auto max-w-6xl space-y-16">
        <section className="bg-white dark:bg-gray-900 rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100 dark:border-gray-800">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            Create Timeless Memories in Black and White
          </h2>
          <div className="grid md:grid-cols-3 gap-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                1. Upload Your Memory
              </h3>
              <p>
                Take a favorite color photo—a wedding candid, a baby portrait, or a travel snapshot. Our tool is designed to handle
                high-resolution files from cameras and phones alike.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                2. Find the Emotion
              </h3>
              <p>
                Color can sometimes distract. By switching to black and white, you strip away the noise and focus on the
                expressions, the light, and the feeling of the moment.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                3. Print & Frame
              </h3>
              <p>
                Download a high-quality file that is ready for your printer or photo lab. Black and white prints look stunning
                on walls and in photo books.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-gray-50 dark:bg-gray-900/60 rounded-3xl p-8 md:p-12 border border-gray-100 dark:border-gray-800">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            Perfect for Your Most Cherished Photos
          </h2>
          <div className="grid md:grid-cols-3 gap-6 text-gray-600 dark:text-gray-300">
            <Card className="p-6 bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Wedding & Anniversary Albums
              </h3>
              <p>
                Create a classic, elegant feel for your album. Black and white photos have a romantic, timeless quality
                that color often lacks.
              </p>
            </Card>
            <Card className="p-6 bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Gallery Walls
              </h3>
              <p>
                Planning a photo wall? Mixing color photos can look chaotic. Converting them all to black and white
                unifies the collection, making different years and locations look like they belong together.
              </p>
            </Card>
            <Card className="p-6 bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Restoring Old Pictures
              </h3>
              <p>
                Did you scan an old, faded color photo? Converting it to black and white instantly removes color casts,
                stains, and uneven fading, making the image look new again.
              </p>
            </Card>
          </div>
        </section>

        <section className="bg-white dark:bg-gray-900 rounded-3xl p-8 md:p-12 border border-gray-100 dark:border-gray-800">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            Photo Conversion FAQ
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
              More Tools for Your Photos
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Have a specific format or a lot of files? We have tools for that too.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/batch-black-and-white-converter">
                <Button variant="outline" size="lg">
                  Batch Converter (For Albums)
                </Button>
              </Link>
              <Link href="/jpg-to-black-and-white">
                <Button variant="outline" size="lg">
                  JPG Tool (For Web)
                </Button>
              </Link>
              <Link href="/blog">
                <Button variant="ghost" size="lg">
                  Read Photography Tips
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
    <>
      <StructuredData type="faq" data={FAQ_SCHEMA} />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <ConverterExperience
          heroBadgeText="Photo & Print Tool"
          heroTitle="Black and White Photo Converter"
          heroSubtitle="Give any portrait, travel shot or family photo a timeless black and white look. Optimized for high-quality printing and framing."
          heroFeatureBadges={[
            'Print-Ready Quality',
            'Timeless Presets',
            'Secure & Private',
            'Perfect for Framing'
          ]}
        />
        <PhotoConverterSections />
      </div>
    </>
  )
}

