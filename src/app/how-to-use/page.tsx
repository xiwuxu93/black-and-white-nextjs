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
import { canonicalUrl } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'How to Use Black and White Image Converter - Complete Guide',
  description: 'Step-by-step guide for converting images to black and white with practical settings, workflow tips, and troubleshooting notes.',
  keywords: ['how to convert to black and white', 'black and white photo tutorial', 'image converter guide'],
  alternates: {
    canonical: canonicalUrl('/how-to-use')
  },
  openGraph: {
    title: 'How to Use Black and White Image Converter - Complete Guide',
    description: 'Step-by-step guide for converting images to black and white with practical settings, workflow tips, and troubleshooting notes.',
    url: canonicalUrl('/how-to-use')
  }
}

export default function HowToUsePage() {
  const steps = [
    {
      icon: Upload,
      title: "Upload Your Image",
      description: "Drag your image into the converter and wait for preview generation",
      details: [
        "Supports common formats including JPG, PNG, and WebP",
        "Recommended upload size: up to 10MB for smoother previews", 
        "Processing runs locally in your browser",
        "No account is required to convert files"
      ],
      tips: [
        "Start with a well-exposed image",
        "If preview stutters, close other heavy tabs first",
        "Keep original files for re-export with different settings"
      ]
    },
    {
      icon: Palette,
      title: "Choose Your Style",
      description: "Pick a preset, then tune sliders for your scene",
      details: [
        "Classic: balanced contrast for general use",
        "Dramatic: deeper blacks and stronger highlights", 
        "Vintage: softer contrast with film-like character",
        "Soft: gentler transitions for delicate subjects",
        "High Contrast: bold black and white separation",
        "Film Noir: low-key cinematic tonality"
      ],
      tips: [
        "Portraits often start well with Soft or Classic",
        "Architecture and street scenes usually handle higher contrast", 
        "Use channel sliders when two colors map to similar gray"
      ]
    }
  ]

  const proWorkflows = [
    {
      title: 'RAW → Proofing Gallery',
      description: 'For teams that cull in Lightroom or Capture One, then need fast monochrome previews.',
      phases: [
        'Export high-quality JPEG or TIFF files from your DAM.',
        'Apply one baseline preset in BWConverter, then adjust highlights and shadows.',
        'Use `/batch-black-and-white-converter` for full-set exports with consistent naming.'
      ],
      link: { href: '/batch-black-and-white-converter', label: 'Open batch workflow' }
    },
    {
      title: 'CMS Publishing Workflow',
      description: 'Useful when editors need repeatable before/after assets for articles or product pages.',
      phases: [
        'Define a small preset set your team agrees on.',
        'Store the chosen preset and slider values per entry.',
        'Export web-safe formats for publishing and archive original files separately.'
      ],
      link: { href: '/faq', label: 'Read implementation FAQ' }
    },
    {
      title: 'On-Set Review Kiosk',
      description: 'Useful for client preview sessions where internet access is limited or uploads are not allowed.',
      phases: [
        'Preload the app on the review machine before the shoot.',
        'Create one preset per lighting setup to keep review output consistent.',
        'Export JPG previews for fast sharing while keeping originals on the main workstation.'
      ],
      link: { href: '/privacy', label: 'Review privacy policy' }
    }
  ]

  const troubleshooting = [
    {
      issue: 'Large RAW exports stall during preview',
      cause: 'Browser hits memory ceiling when decoding >40MP frames.',
      fix: 'Export a lighter TIFF/JPEG derivative first, then convert in browser. Close unused tabs to free memory.'
    },
    {
      issue: 'Downloads exceed client file size requirements',
      cause: 'Export format or quality is set too high for delivery constraints.',
      fix: 'Switch to JPG/WebP and lower quality settings until files meet the required size range.'
    },
    {
      issue: 'Preset look varies between devices',
      cause: 'Custom adjustments not persisted between sessions.',
      fix: 'Save slider values per project and reapply the same values for each delivery pass.'
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
            A practical guide for getting consistent black and white results.
          </p>
        </div>

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
            Ready to Start?
          </h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/">
              <Button size="lg">
                Start Converting Images
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Link href="/batch-black-and-white-converter">
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
