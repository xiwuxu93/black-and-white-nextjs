import { Metadata } from 'next'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Upload,
  Palette,
  ArrowRight,
  Workflow,
  Code2,
  ServerCog,
  Wrench,
  AlertTriangle
} from 'lucide-react'
import Link from 'next/link'
import { ContentAd } from '@/components/ads/ad-placements'
import { canonicalUrl } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'How to Use Black and White Image Converter - Complete Guide',
  description: 'Learn how to convert your images to stunning black and white photos with our comprehensive step-by-step guide. Master professional techniques and achieve perfect results.',
  keywords: ['how to convert to black and white', 'black and white photo tutorial', 'image converter guide'],
  alternates: {
    canonical: canonicalUrl('/how-to-use')
  },
  openGraph: {
    title: 'How to Use Black and White Image Converter - Complete Guide',
    description: 'Learn how to convert your images to stunning black and white photos with our comprehensive step-by-step guide. Master professional techniques and achieve perfect results.',
    url: canonicalUrl('/how-to-use')
  }
}

export default function HowToUsePage() {
  const steps = [
    {
      icon: Upload,
      title: "Upload Your Image",
      description: "Select or drag and drop your color image into the converter",
      details: [
        "Support for JPG, PNG, GIF, and WebP formats",
        "Maximum file size: 10MB", 
        "Images are processed locally in your browser",
        "Your privacy is completely protected"
      ],
      tips: [
        "Higher resolution images produce better results",
        "Well-lit photos convert better than dark images",
        "Images with good contrast work best"
      ]
    },
    {
      icon: Palette,
      title: "Choose Your Style",
      description: "Select from professional black and white presets or customize manually",
      details: [
        "Classic: Traditional balanced black and white",
        "Dramatic: High contrast with deep blacks", 
        "Vintage: Film-inspired with slight sepia tones",
        "Soft: Gentle conversion with smooth gradients",
        "High Contrast: Bold blacks and bright whites",
        "Film Noir: Cinematic dark atmosphere"
      ],
      tips: [
        "Portrait photos work well with Soft or Classic styles",
        "Landscapes benefit from Dramatic or High Contrast", 
        "Architecture looks great with Film Noir"
      ]
    }
  ]

  const proWorkflows = [
    {
      title: 'RAW → Proofing Gallery',
      description: 'Ideal for studios that cull inside Lightroom or Capture One before switching to BWConverter for monochrome mastering.',
      phases: [
        'Export 16-bit TIFFs or high-quality JPEGs from your DAM with embedded colour profiles.',
        'Drop the shortlist into BWConverter, apply a preset baseline, then tweak highlights with the manual slider.',
        'Use `/batch` to render monochrome variants and keep filenames aligned with the colour set.'
      ],
      link: { href: '/black-and-white-newborn-images', label: 'See case study timeline' }
    },
    {
      title: 'CMS Automation',
      description: 'Publish before/after sliders inside a headless CMS by reusing the existing worker and utilities.',
      phases: [
        'Embed `/worker.js` in your front-end build and cache preset selections per entry.',
        'Call `downloadCanvasImage` with `maxBytes` set to your CDN limits to auto-generate WebP previews.',
        'Store slider metadata (preset + manual tweaks) so editors can re-run conversions without guesswork.'
      ],
      link: { href: '/image-black-and-white-converter', label: 'Integration guide' }
    },
    {
      title: 'On-Set Review Kiosk',
      description: 'Great for clients reviewing captures during shoots without uploading sensitive material.',
      phases: [
        'Run the converter offline in a Chromium-based kiosk build.',
        'Create a shared preset profile per lighting setup and sync via local storage.',
        'Export JPEG previews to a shared folder; full-resolution files remain on the tethered camera workstation.'
      ],
      link: { href: '/newborn-black-and-white-images', label: 'Download preset matrix' }
    }
  ]

  const troubleshooting = [
    {
      issue: 'Large RAW exports stall during preview',
      cause: 'Browser hits memory ceiling when decoding >40MP frames.',
      fix: 'Convert to 16-bit TIFF or high-quality JPEG before upload. Monitor memory via Chrome DevTools > Performance.'
    },
    {
      issue: 'Downloads exceed client file size requirements',
      cause: 'Manual download bypassed `maxBytes` governance.',
      fix: 'Always call `downloadCanvasImage` with the `maxBytes` argument and verify output in the QA checklist.'
    },
    {
      issue: 'Preset look varies between devices',
      cause: 'Custom adjustments not persisted between sessions.',
      fix: 'Persist slider values in local storage or CMS fields, then hydrate the converter on load.'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          <Badge className="mb-4" variant="secondary">
            📖 Complete Guide
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            How to Use Our Black And White Converter
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Master the art of black and white photography with our comprehensive guide.
          </p>
        </div>

        <ContentAd />

        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Step-by-Step Tutorial  
          </h2>
          <div className="space-y-8">
            {steps.map((step, index) => {
              const Icon = step.icon
              return (
                <Card key={index} className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center">
                        <Icon className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                        {step.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">
                        {step.description}
                      </p>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-medium text-gray-900 dark:text-white mb-2">Details</h4>
                          <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                            {step.details.map((detail, idx) => (
                              <li key={idx}>• {detail}</li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900 dark:text-white mb-2">Tips</h4>
                          <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                            {step.tips.map((tip, idx) => (
                              <li key={idx}>💡 {tip}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              )
            })}
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Production-Ready Workflows
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {proWorkflows.map((flow) => (
              <Card key={flow.title} className="p-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
                <div className="flex items-center gap-3 mb-4">
                  <Workflow className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{flow.title}</h3>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{flow.description}</p>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  {flow.phases.map((item) => (
                    <li key={item} className="flex items-start">
                      <Code2 className="w-4 h-4 text-primary-600 dark:text-primary-400 mr-2 mt-1" />
                      {item}
                    </li>
                  ))}
                </ul>
                <Link href={flow.link.href} className="mt-4 inline-flex items-center text-primary-600 dark:text-primary-400 text-sm font-medium">
                  {flow.link.label}
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </Card>
            ))}
          </div>
        </section>

        <section className="mb-16">
          <Card className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-200 dark:border-blue-800">
            <div className="flex items-center gap-3 mb-4">
              <ServerCog className="w-5 h-5 text-blue-600 dark:text-blue-300" />
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                Troubleshooting Checklist
              </h2>
            </div>
            <div className="overflow-hidden rounded-xl border border-blue-200 dark:border-blue-900 bg-white dark:bg-gray-900">
              <table className="min-w-full text-sm text-gray-600 dark:text-gray-300">
                <thead className="bg-blue-50 dark:bg-blue-900/40 text-left">
                  <tr>
                    <th className="px-4 py-3 font-semibold text-gray-900 dark:text-gray-100">Issue</th>
                    <th className="px-4 py-3 font-semibold text-gray-900 dark:text-gray-100">Likely Cause</th>
                    <th className="px-4 py-3 font-semibold text-gray-900 dark:text-gray-100">Fix</th>
                  </tr>
                </thead>
                <tbody>
                  {troubleshooting.map((row, index) => (
                    <tr key={row.issue} className={index % 2 === 0 ? 'bg-white dark:bg-gray-900' : 'bg-blue-50 dark:bg-gray-900/60'}>
                      <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">{row.issue}</td>
                      <td className="px-4 py-3 flex items-start">
                        <AlertTriangle className="w-4 h-4 text-blue-500 mr-2 mt-1" />
                        {row.cause}
                      </td>
                      <td className="px-4 py-3 flex items-start">
                        <Wrench className="w-4 h-4 text-blue-500 mr-2 mt-1" />
                        {row.fix}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-blue-700 dark:text-blue-300 mt-3">
              Need more help? Share logs and screenshots via <Link href="/contact" className="underline">support@bwconverter.com</Link>—include preset values and browser details for faster debugging.
            </p>
          </Card>
        </section>

        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Ready to Create Amazing Black And White Images?
          </h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/">
              <Button size="lg">
                Start Converting Images
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Link href="/batch">
              <Button variant="outline" size="lg">
                Try Batch Converter  
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
