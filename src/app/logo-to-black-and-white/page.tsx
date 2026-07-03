import type { Metadata } from 'next'
import Link from 'next/link'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ConverterExperience } from '@/components/home/converter-experience'
import { canonicalUrl } from '@/lib/seo'
import { StructuredData } from '@/components/seo/structured-data'
import { Layers, Shield, Zap, FileCode, CheckCircle, Info } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Convert Logo to Black and White - Transparent PNG & SVG Support',
  description:
    'Convert logos to black and white while preserving transparency. Supports PNG and SVG for watermarks, brand kits, and UI assets.',
  keywords: [
    'convert logo to black and white',
    'logo black and white converter',
    'svg to black and white png',
    'make logo monochrome',
    'transparent logo converter',
    'alpha channel preservation'
  ],
  alternates: {
    canonical: canonicalUrl('/logo-to-black-and-white')
  },
  openGraph: {
    title: 'Convert Logo to Black and White - Transparent PNG & SVG Support',
    description:
      'Convert logo and icon files to black and white with transparent background support for PNG and SVG.',
    url: canonicalUrl('/logo-to-black-and-white')
  }
}

const FAQ_SCHEMA = {
  questions: [
    {
      question: 'Will my logo background stay transparent?',
      answer: 'Yes. BWConverter keeps the alpha channel separate from color channels, so transparent background pixels remain transparent after conversion.'
    },
    {
      question: 'Can I upload SVG files?',
      answer: 'Yes. SVG files are rendered at high resolution before conversion, then exported as PNG to keep edges crisp.'
    },
    {
      question: 'How do I make a logo pure black for a watermark?',
      answer: 'Start with the High Contrast preset and raise contrast until non-transparent pixels collapse to near-solid black. This works well for watermark exports.'
    },
    {
      question: 'Why do other converters turn my background black?',
      answer: 'Many photo filters flatten everything into RGB output that has no transparency layer. BWConverter processes RGBA data and preserves alpha.'
    }
  ]
}

function LogoToBwSections() {
  return (
    <>
        
        {/* Deep Dive: Technical Logic */}
        <section className="converter-marketing article-section">
          <div className="max-w-3xl mb-12">
            <h2>
              How Logo Conversion Works
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Logo files need different handling than photos. The key issues are transparency,
              edge quality, and predictable black/white output.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-12 text-gray-600 dark:text-gray-400">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                  <Layers className="w-5 h-5 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Alpha Channel Preservation</h3>
              </div>
              <p>
                Standard desaturation often ignores alpha. BWConverter isolates the alpha channel
                during grayscale conversion so floating logos do not get boxed with a solid background.
              </p>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                  <FileCode className="w-5 h-5 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Vector-to-Raster Engine</h3>
              </div>
              <p>
                SVG input is rendered at 2x natural size before conversion.
                This keeps thin strokes and curved edges clean in final monochrome PNG output.
              </p>
            </div>
          </div>
        </section>

        {/* Brand Management Use Cases */}
        <section>
          <h2>
            Practical Use Cases
          </h2>
          <div className="grid md:grid-cols-3 gap-8 text-gray-600 dark:text-gray-400">
            <Card className="p-8 bg-gray-50 dark:bg-gray-900 border-none">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <CheckCircle className="w-5 h-5 mr-2 text-green-600" />
                Partner Footers
              </h3>
              <p className="text-sm leading-relaxed">
                Partner logo sections look cleaner when tones are consistent.
                Convert different brand marks to one gray level or pure black before publishing.
              </p>
            </Card>
            <Card className="p-8 bg-gray-50 dark:bg-gray-900 border-none">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <CheckCircle className="w-5 h-5 mr-2 text-green-600" />
                Dark Mode Icons
              </h3>
              <p className="text-sm leading-relaxed">
                For dark backgrounds, convert to black and white first, then invert to white.
                It is a quick way to prepare dark-mode icons from one source asset.
              </p>
            </Card>
            <Card className="p-8 bg-gray-50 dark:bg-gray-900 border-none">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <CheckCircle className="w-5 h-5 mr-2 text-green-600" />
                Photo Watermarking
              </h3>
              <p className="text-sm leading-relaxed">
                Monochrome marks are less distracting as watermarks.
                In Photoshop or Lightroom, they blend more naturally with Overlay or Multiply modes.
              </p>
            </Card>
          </div>
        </section>

        {/* Designer Tips */}
        <section className="article-section">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-white dark:bg-gray-800 rounded-full shadow-sm">
              <Info className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Designer&apos;s Tip: Mastering Contrast</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-2xl">
                If two brand colors have similar luminance, they may collapse into the same gray.
                Use <strong>Channel Mixer</strong> sliders to separate them before export.
              </p>
              <Link href="/">
                <Button variant="outline">Learn more about Channel Mixing</Button>
              </Link>
            </div>
          </div>
        </section>

        <section className="article-section">
          <h2>
            Logo Conversion FAQ
          </h2>
          <div className="grid gap-8 md:grid-cols-2 text-gray-600 dark:text-gray-400">
             {FAQ_SCHEMA.questions.map((faq, index) => (
              <div key={index} className="space-y-2">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{faq.question}</h3>
                <p className="text-sm">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="article-section text-center">
          <h2>
            Need Bulk Processing Too?
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Need to handle full-resolution photography or bulk folders?
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/batch-black-and-white-converter">
              <Button size="lg" className="px-10">
                Go to Batch Converter
              </Button>
            </Link>
            <Link href="/">
              <Button variant="outline" size="lg">
                Back to Homepage
              </Button>
            </Link>
          </div>
        </section>
    </>
  )
}

export default function LogoToBlackAndWhitePage() {
  return (
    <>
      <StructuredData type="faq" data={FAQ_SCHEMA} />
      <ConverterExperience
        heroBadgeText="Professional Design Tool"
        heroTitle="Logo to Black and White"
        heroSubtitle="I know how frustrating it is when filters ruin transparency. This tool keeps your alpha channel intact while you map brand colors to perfect grayscale."
        heroFeatureBadges={[
          'Alpha Layer Isolation',
          'Vector Anti-Aliasing',
          'No Watermarks',
          'Studio Privacy'
        ]}
        uploadAccept=".png,image/png,.svg,image/svg+xml"
        uploadSupportText="Supports: PNG, SVG (Max 10MB)"
        uploadAllowedExtensions={[
          'png',
          'svg'
        ]}
        uploadInvalidFileMessage="Please upload a PNG or SVG file."
      />
      <LogoToBwSections />
    </>
  )
}
