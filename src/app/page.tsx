import Link from 'next/link'
import { ChevronRight, Layers, Image as ImageIcon, Briefcase } from 'lucide-react'
import { StructuredData } from '@/components/seo/structured-data'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ConverterExperience } from '@/components/home/converter-experience'

const HOWTO_SCHEMA = {
  name: 'Convert image to black and white online',
  description:
    'Turn any color photo into a black and white image in your browser. No upload, instant preview, and professional presets.',
  image: '/black-and-white-image.png',
  totalTime: 'PT1M',
  tool: ['BWConverter web app'],
  steps: [
    {
      name: 'Upload your image',
      text:
        'Drag and drop a JPG, PNG, or WebP into the upload area, or click to browse your files.'
    },
    {
      name: 'Choose a preset and fine-tune',
      text:
        'Select a starting look like Classic or Dramatic, then adjust contrast, highlights, shadows, and grain with real-time preview.'
    },
    {
      name: 'Download your black and white photo',
      text:
        'Export as PNG, JPG, or WebP at full resolution. Your edited file is saved locally with “-bw” in the name.'
    }
  ]
} as const

const HOME_FAQ_SCHEMA = {
  questions: [
    {
      question: 'How do I convert an image to black and white?',
      answer:
        'Upload your file, choose a preset, and click download. The converter analyzes color data and applies channel mixing, letting you convert image to black and white with depth, contrast, and film-style grain in under a minute.'
    },
    {
      question: 'Can I convert logos with transparent backgrounds?',
      answer:
        'Yes. Use our specialized Logo Converter (linked below) which supports PNG and SVG inputs and preserves transparency.'
    },
    {
      question: 'Can I make multiple photos black and white at once?',
      answer:
        'Yes. Head to the batch black and white converter to convert multiple images to black and white simultaneously. Drop in a full folder of photos and apply the same preset across every file.'
    },
    {
      question: 'How do I turn a picture black and white online?',
      answer:
        'Use the browser-based editor, drag in your picture, adjust the sliders, and hit export. There is no download or signup required to turn image black and white online with full control.'
    },
    {
      question: "What's the best black and white converter?",
      answer:
        'The best converter gives you custom tonal control, fast previews, and private processing. BWConverter includes all of that plus presets inspired by darkroom workflows so you get professional black and white photos every time.'
    },
    {
      question: 'Is this black and white photo editor free?',
      answer:
        'Absolutely. BWConverter is a free black and white photo editor with no hidden paywalls, watermarks, or file limits. Every feature works without creating an account.'
    }
  ]
} as const

function MarketingSections() {
  return (
    <section className="converter-marketing py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        
        {/* Specialized Tools Hub - New Addition for SEO Weight Distribution */}
        <div className="mb-20">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">
            Choose the Right Tool for Your Workflow
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Link href="/logo-to-black-and-white" className="group">
              <Card className="p-6 h-full transition-shadow hover:shadow-md border-primary-100 dark:border-primary-900/50">
                <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-full w-fit text-blue-600 dark:text-blue-400">
                  <Layers className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2 group-hover:text-primary-600 transition-colors">
                  Logo & Icon Converter
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Best for transparent PNGs and SVGs. Turns logos into pure black or white for watermarks.
                </p>
                <div className="mt-4 flex items-center text-sm font-medium text-primary-600">
                  Convert Logo <ChevronRight className="w-4 h-4 ml-1" />
                </div>
              </Card>
            </Link>

            <Link href="/batch-black-and-white-converter" className="group">
              <Card className="p-6 h-full transition-shadow hover:shadow-md border-primary-100 dark:border-primary-900/50">
                 <div className="mb-4 p-3 bg-purple-50 dark:bg-purple-900/20 rounded-full w-fit text-purple-600 dark:text-purple-400">
                  <Briefcase className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2 group-hover:text-primary-600 transition-colors">
                  Batch Converter
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Process hundreds of photos at once. Apply consistent presets to entire folders.
                </p>
                <div className="mt-4 flex items-center text-sm font-medium text-primary-600">
                  Start Batch <ChevronRight className="w-4 h-4 ml-1" />
                </div>
              </Card>
            </Link>

            <Link href="/jpg-to-black-and-white" className="group">
              <Card className="p-6 h-full transition-shadow hover:shadow-md border-primary-100 dark:border-primary-900/50">
                 <div className="mb-4 p-3 bg-green-50 dark:bg-green-900/20 rounded-full w-fit text-green-600 dark:text-green-400">
                  <ImageIcon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2 group-hover:text-primary-600 transition-colors">
                  JPG Photo Converter
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Optimized for photography. Smart artifact smoothing for compressed JPGs.
                </p>
                <div className="mt-4 flex items-center text-sm font-medium text-primary-600">
                  Convert JPG <ChevronRight className="w-4 h-4 ml-1" />
                </div>
              </Card>
            </Link>
          </div>
        </div>

        <div className="text-gray-600 dark:text-gray-400 text-center max-w-3xl mx-auto mb-16">
          <p className="text-xl mb-4 text-gray-800 dark:text-gray-200 font-medium">
            Professional Grade Monochrome Conversion in Your Browser
          </p>
          <p className="text-base md:text-lg">
            Whether you are a photographer creating dramatic portraits or a designer preparing assets for print, 
            BWConverter gives you the control of a desktop editor with the speed of a web tool.
            Privacy-first, free, and no watermark.
          </p>
        </div>

        <section id="how-to-convert" className="bg-white dark:bg-gray-800 rounded-3xl p-8 md:p-12 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            How to Make Image Black and White
          </h2>
          <ol className="space-y-8 text-left max-w-4xl mx-auto">
            <li className="flex flex-col md:flex-row md:items-start gap-4">
              <div className="flex-shrink-0">
                <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-900 text-white text-xl font-semibold">
                  1
                </span>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Upload your photo
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Drag and drop any image file. We support high-resolution processing so your print quality remains sharp.
                </p>
              </div>
            </li>
            <li className="flex flex-col md:flex-row md:items-start gap-4">
              <div className="flex-shrink-0">
                <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-900 text-white text-xl font-semibold">
                  2
                </span>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Adjust tone and contrast
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Don't settle for a flat grey image. Use the Channel Mixer to darken skies (Blue channel) or brighten skin tones (Red channel).
                </p>
              </div>
            </li>
            <li className="flex flex-col md:flex-row md:items-start gap-4">
              <div className="flex-shrink-0">
                <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-900 text-white text-xl font-semibold">
                  3
                </span>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Download instantly
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Export as JPG, PNG, or WebP. Your file is processed locally, meaning 0 wait time for uploads or downloads.
                </p>
              </div>
            </li>
          </ol>
        </section>

        <section className="bg-gray-50 dark:bg-gray-900/60 rounded-3xl p-8 md:p-12 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-10 text-center">
            Why Use Our Black and White Converter?
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card className="p-6 h-full">
              <div className="text-2xl mb-4">🎚️</div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Channel Mixing
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                True black and white photography isn't just desaturation. Control how Red, Green, and Blue colors translate to greyscale values.
              </p>
            </Card>
            <Card className="p-6 h-full">
              <div className="text-2xl mb-4">⚡</div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                100% Client-Side
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                We use WebAssembly technology. Your photos are processed by your own device's CPU/GPU, ensuring maximum speed and privacy.
              </p>
            </Card>
            <Card className="p-6 h-full">
              <div className="text-2xl mb-4">✨</div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Smart Presets
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                One-click looks including "High Contrast", "Matte", and "Classic Film" to jumpstart your editing.
              </p>
            </Card>
          </div>
        </section>

        <section id="faq" className="bg-white dark:bg-gray-800 rounded-3xl p-8 md:p-12 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            Frequently Asked Questions
          </h2>
          <div className="grid gap-6 md:grid-cols-2 text-gray-600 dark:text-gray-400">
            {HOME_FAQ_SCHEMA.questions.map(({ question, answer }) => (
              <div key={question} className="bg-gray-50 dark:bg-gray-900/60 rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {question}
                </h3>
                <p>{answer}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-gray-50 dark:bg-gray-900/60 rounded-3xl p-8 md:p-12">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Master Monochrome Photography
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Check out our guides on composition, lighting, and editing techniques.
            </p>
            <div className="mt-6">
              <Link href="/blog">
                <Button size="lg" variant="outline">
                  Read the Blog
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </section>
  )
}

export default function HomePage() {
  return (
    <>
      <StructuredData type="howto" data={HOWTO_SCHEMA} />
      <StructuredData type="faq" data={HOME_FAQ_SCHEMA} />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <ConverterExperience 
          heroTitle="Black and White Image Converter"
          heroSubtitle="Free online tool to turn photos, logos, and images into black and white. Professional features, 100% private."
        />
        <MarketingSections />
      </div>
    </>
  )
}