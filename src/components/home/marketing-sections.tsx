import Link from 'next/link'
import {
  ChevronRight,
  Layers,
  Image as ImageIcon,
  Briefcase,
  FileText
} from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export const HOWTO_SCHEMA = {
  name: 'Make an image black and white online',
  description:
    'Upload a color image, preview a black and white version, adjust the tones, and download the result from your browser.',
  image: '/black-and-white-image.png',
  totalTime: 'PT1M',
  tool: ['BWConverter web app'],
  steps: [
    {
      name: 'Upload your image',
      text:
        'Drag and drop a JPG, PNG, or WebP into the upload area, or click to choose a file from your device.'
    },
    {
      name: 'Choose a preset and fine-tune',
      text:
        'Start with a simple black and white conversion, then adjust contrast, highlights, shadows, and grain if the photo needs more shape.'
    },
    {
      name: 'Download your black and white photo',
      text:
        'Download the black and white image as PNG, JPG, or WebP. Your original file is not uploaded or overwritten.'
    }
  ]
} as const

export const HOME_FAQ_SCHEMA = {
  questions: [
    {
      question: 'How do I make an image black and white?',
      answer:
        'Upload your file, wait for the preview, then download the black and white version. If the first result feels flat, adjust contrast, shadows, or highlights before exporting.'
    },
    {
      question: 'Can I convert a color image to black and white without uploading it?',
      answer:
        'Yes. BWConverter works in your browser with Canvas and Web Worker processing. The image stays on your device while you preview and export the black and white version.'
    },
    {
      question: 'Is this an image to black and white converter or a photo editor?',
      answer:
        'It is a focused image to black and white converter. You get the controls that matter for monochrome output, such as contrast, brightness, shadows, highlights, grain, and export format.'
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
        'Use the upload box, choose a file, and the page will create a black and white preview. You can keep the default look or tune the image before downloading.'
    },
    {
      question: "What's the best black and white converter?",
      answer:
        'For quick web use, a good black and white converter should be fast, private, and easy to adjust. BWConverter focuses on those basics instead of hiding the export behind a large editing suite.'
    },
    {
      question: 'Is this black and white photo editor free?',
      answer:
        'Yes. You can make images black and white for free, with no watermark and no account required.'
    }
  ]
} as const

const EDITING_NOTES = [
  {
    title: 'Portraits',
    note:
      'I usually start with a softer preset, lift midtones slightly, and avoid crushing shadows around hair and clothing. Skin often needs separation, not maximum contrast.'
  },
  {
    title: 'Architecture',
    note:
      'Hard edges and repeating forms can handle stronger contrast. I darken blue-heavy skies and keep highlights below clipping so concrete, glass, and metal still show texture.'
  },
  {
    title: 'Product Images',
    note:
      'For catalogs, consistency matters more than drama. I keep grain off, use a neutral tone curve, and export in the same format as the original when file size allows.'
  },
  {
    title: 'Scanned Artwork',
    note:
      'Old scans often need gentle cleanup first. A modest contrast boost plus slightly lifted shadows preserves paper texture without making dust and scratches dominate.'
  }
] as const

export function MarketingSections() {
  return (
    <>
      <section className="converter-marketing article-section">
        <h2>Choose the Right Tool for the Job</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

          <Link href="/convert-pdf-to-black-and-white" className="group">
            <Card className="p-6 h-full transition-shadow hover:shadow-md border-primary-100 dark:border-primary-900/50">
              <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 rounded-full w-fit text-red-600 dark:text-red-400">
                <FileText className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2 group-hover:text-primary-600 transition-colors">
                PDF Grayscale Converter
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Grayscale entire PDF documents locally. Save color printing costs and expensive toner ink.
              </p>
              <div className="mt-4 flex items-center text-sm font-medium text-primary-600">
                Convert PDF <ChevronRight className="w-4 h-4 ml-1" />
              </div>
            </Card>
          </Link>

          <Link href="/how-to-use" className="group">
            <Card className="p-6 h-full transition-shadow hover:shadow-md border-primary-100 dark:border-primary-900/50">
              <div className="mb-4 p-3 bg-green-50 dark:bg-green-900/20 rounded-full w-fit text-green-600 dark:text-green-400">
                <ImageIcon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2 group-hover:text-primary-600 transition-colors">
                JPG Workflow Guide
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Converting JPG to black and white? This guide covers artifact handling, presets, and export settings.
              </p>
              <div className="mt-4 flex items-center text-sm font-medium text-primary-600">
                Read JPG Tips <ChevronRight className="w-4 h-4 ml-1" />
              </div>
            </Card>
          </Link>
        </div>
      </section>

      <section className="article-section text-gray-600 dark:text-gray-400 text-center max-w-3xl mx-auto">
        <p className="text-xl mb-4 text-gray-800 dark:text-gray-200 font-medium">
          Make Image Black and White Without Opening a Full Editor
        </p>
        <p className="text-base md:text-lg">
          Most people do not need a full photo editor just to turn one image black and white.
          BWConverter keeps the workflow short: upload the file, check the preview, make small tone adjustments, and save the result.
        </p>
      </section>

      <section id="how-to-convert" className="article-section">
        <h2>How to Make an Image Black and White</h2>
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
                Drag in a color image from your computer or phone. JPG, PNG, and WebP files work well for most everyday conversions.
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
                  Preview the black and white image
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  The converter creates a black and white preview in the browser. If the photo looks too flat or too harsh, adjust the sliders before saving.
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
                Export as JPG, PNG, or WebP. The original color image stays untouched, and the edited file downloads as a new copy.
              </p>
            </div>
          </li>
        </ol>
      </section>

      <section className="article-section">
        <h2>Why Use This Image to Black and White Converter?</h2>
        <div className="space-y-6 max-w-2xl mx-auto">
          <div className="flex gap-5 p-6 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm">
            <div className="text-3xl p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl h-fit text-blue-600 dark:text-blue-400 flex-shrink-0">
              🎚️
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                True Monochrome Color Mixing
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                A useful black and white image keeps separation between faces, skies, clothing, and backgrounds. The controls here help you shape that tonal range instead of only removing color.
              </p>
            </div>
          </div>

          <div className="flex gap-5 p-6 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm">
            <div className="text-3xl p-3 bg-purple-50 dark:bg-purple-900/20 rounded-xl h-fit text-purple-600 dark:text-purple-400 flex-shrink-0">
              ⚡
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                Local, Zero-Upload Privacy
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                The image is processed in your browser, not on a remote server. That matters for family photos, client previews, product shots, and anything you do not want to upload.
              </p>
            </div>
          </div>

          <div className="flex gap-5 p-6 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm">
            <div className="text-3xl p-3 bg-green-50 dark:bg-green-900/20 rounded-xl h-fit text-green-600 dark:text-green-400 flex-shrink-0">
              ✨
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                Studio-Grade Tonal Presets
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                Start with a clean conversion, then use presets when you want a stronger look. Soft portraits, high-contrast street photos, and product images usually need different tones.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="article-section">
        <div className="max-w-3xl mx-auto text-center mb-10">
          <h2>Practical Monochrome Notes From Real Edits</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Black and white conversion works best when the settings match the subject.
            These are the starting points I use when testing BWConverter against real photos and design assets.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {EDITING_NOTES.map(({ title, note }) => (
            <div key={title} className="border border-gray-100 dark:border-gray-700 rounded-2xl p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                {title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">{note}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="faq" className="article-section">
        <h2>Frequently Asked Questions</h2>
        <div className="space-y-4 max-w-3xl mx-auto text-left">
          {HOME_FAQ_SCHEMA.questions.map(({ question, answer }) => (
            <details
              key={question}
              className="group border border-gray-100 dark:border-gray-700/80 rounded-2xl p-5 bg-gray-50/50 dark:bg-gray-900/20 hover:bg-gray-50 dark:hover:bg-gray-900/40 transition-all duration-200"
            >
              <summary className="list-none flex items-center justify-between cursor-pointer font-semibold text-gray-900 dark:text-white text-base md:text-lg focus:outline-none select-none">
                <span>{question}</span>
                <svg
                  className="w-5 h-5 text-gray-400 transform group-open:rotate-180 transition-transform duration-200 flex-shrink-0 ml-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </summary>
              <div className="mt-4 text-sm text-gray-600 dark:text-gray-400 leading-relaxed border-t border-gray-100 dark:border-gray-700/50 pt-4">
                <p>{answer}</p>
              </div>
            </details>
          ))}
        </div>
      </section>

      <section className="article-section">
        <div className="max-w-3xl mx-auto text-center">
          <h2>Learn Monochrome Editing</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Explore practical guides on composition, lighting, and black and white editing choices.
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
    </>
  )
}
