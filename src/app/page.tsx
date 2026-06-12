import Link from 'next/link'
import { ChevronRight, Layers, Image as ImageIcon, Briefcase, FileText } from 'lucide-react'
import { StructuredData } from '@/components/seo/structured-data'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ConverterExperience } from '@/components/home/converter-experience'

const HOWTO_SCHEMA = {
  name: 'Convert image to black and white online',
  description:
    'Convert photos, logos, and graphics to black and white in your browser. No upload required.',
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
        'Upload your file, choose a preset, and click download. The converter applies channel mixing so you can convert image to black and white with controlled contrast and tonal separation.'
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
        'A solid converter should give you tonal controls, fast preview updates, and private local processing. BWConverter focuses on those three basics.'
    },
    {
      question: 'Is this black and white photo editor free?',
      answer:
        'Yes. The converter is free to use, with no watermark and no account required for standard use.'
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

function MarketingSections() {
  return (
    <section className="converter-marketing py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        
        {/* Specialized Tools Hub - New Addition for SEO Weight Distribution */}
        <div className="mb-20">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">
            Choose the Right Tool for the Job
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
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
        </div>

        <div className="text-gray-600 dark:text-gray-400 text-center max-w-3xl mx-auto mb-16">
          <p className="text-xl mb-4 text-gray-800 dark:text-gray-200 font-medium">
            Black and White Conversion That Stays Predictable
          </p>
          <p className="text-base md:text-lg">
            Built for photographers and designers who need repeatable tone control without sending files to a server.
            Upload, adjust, and export from the browser with no watermark.
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
                  Use Channel Mixer controls to push skies darker (Blue channel) or keep skin tones brighter (Red channel).
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
                  Export as JPG, PNG, or WebP. Processing stays local, so you do not wait on server upload queues.
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
                Black and white conversion is more than desaturation. Control how red, green, and blue map to gray values.
              </p>
            </Card>
            <Card className="p-6 h-full">
              <div className="text-2xl mb-4">⚡</div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                100% Client-Side
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Your images are processed on your device using browser compute, which keeps files private and responsive.
              </p>
            </Card>
            <Card className="p-6 h-full">
              <div className="text-2xl mb-4">✨</div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Smart Presets
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Start with presets like High Contrast or Classic Film, then fine-tune sliders for your scene.
              </p>
            </Card>
          </div>
        </section>

        <section className="bg-white dark:bg-gray-800 rounded-3xl p-8 md:p-12 mb-16">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Practical Monochrome Notes From Real Edits
            </h2>
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
                <p className="text-gray-600 dark:text-gray-400">
                  {note}
                </p>
              </div>
            ))}
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
              Learn Monochrome Editing
            </h2>
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
          heroSubtitle="I built this private tool to get professional monochrome tones without the complexity of desktop editors. No uploads, no grain loss, and 100% browser-resident processing."
        />
        <MarketingSections />
      </div>
    </>
  )
}
