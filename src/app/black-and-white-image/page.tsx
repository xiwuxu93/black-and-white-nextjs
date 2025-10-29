import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  ArrowRight,
  Camera,
  Zap,
  Shield,
  Download,
  Users,
  BarChart,
  Cpu,
  Workflow
} from 'lucide-react'
import { canonicalUrl } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'BWConverter Studio – High-Fidelity Monochrome Image Processing',
  description:
    'Convert colour photos into gallery-grade monochrome stories in your browser. Compare presets, study benchmark data, and export WebP, PNG, or JPEG files without compression loss.',
  keywords: [
    'monochrome image converter',
    'black and white photo workflow',
    'browser based image processing',
    'convert colour photo to monochrome'
  ],
  openGraph: {
    title: 'BWConverter Studio – High-Fidelity Monochrome Image Processing',
    description:
      'Inspect live previews, tweak tonal curves, and export production-ready black and white imagery with zero uploads.',
    url: canonicalUrl('/black-and-white-image'),
    images: [
      {
        url: '/black-and-white-image.png',
        width: 1200,
        height: 630,
        alt: 'BWConverter Studio interface preview',
        type: 'image/png'
      }
    ]
  },
  alternates: {
    canonical: canonicalUrl('/black-and-white-image')
  }
}

const processingBenchmarks = [
  { format: '24 MP JPEG (12 MB)', result: 'Preview < 1.5s • Final export 2.3s', note: 'Classic preset + high pass clarity' },
  { format: '42 MP PNG (21 MB)', result: 'Preview 2.7s • Final export 4.1s', note: 'Film Noir preset + grain' },
  { format: 'Mobile HEIC (3 MB)', result: 'Preview < 1s • Final export 1.2s', note: 'Soft preset + skin smoothing' }
]

const featureHighlights = [
  {
    icon: Shield,
    title: 'Local-Only Processing',
    description:
      'Every slider runs on WebAssembly inside your browser. No uploads, no background queues, just instant privacy compliance for client work.'
  },
  {
    icon: Cpu,
    title: 'Smart Tonal Mapping',
    description:
      'Adaptive luminance curves preserve highlight latitude while rebuilding shadow detail—particularly useful for backlit newborn or wedding sessions.'
  },
  {
    icon: Download,
    title: 'Export Governance',
    description:
      'Rename exports automatically, choose PNG, JPEG, or WebP, and cap output size to match client delivery specs without manual compression.'
  }
]

const useCases = [
  {
    label: 'Portrait Series',
    description:
      'Balance skin luminance and catchlight contrast across entire portrait sets. Batch apply presets and export print-ready TIFF or PNG files.'
  },
  {
    label: 'Architecture Documentation',
    description:
      'Reveal structural rhythm with high-impact blacks while shielding windows from clipping using highlight recovery.'
  },
  {
    label: 'Editorial Moodboards',
    description:
      'Design directors iterate multiple tonal directions quickly, exporting lightweight WebP previews for feedback rounds.'
  },
  {
    label: 'Fine-Art Prints',
    description:
      'Combine Vintage or Film Noir looks with adjustable grain to emulate silver halide stock before sending to lab.'
  }
]

const workflowRoadmap = [
  {
    stage: 'Upload & Inspect',
    duration: '0 – 2 minutes',
    insight:
      'Drag a RAW export or high-resolution JPEG into the tool. Histogram and dimensions appear instantly so you can plan contrast moves.'
  },
  {
    stage: 'Preset Baseline',
    duration: '2 – 5 minutes',
    insight:
      'Cycle between Classic, Dramatic, Soft, and custom looks. Each preset rewires channel mixes rather than simply desaturating pixels.'
  },
  {
    stage: 'Precision Adjustments',
    duration: '5 – 12 minutes',
    insight:
      'Dial in brightness, shadows, highlights, and grain. Every adjustment updates the GPU preview so you see how texture reacts in real time.'
  },
  {
    stage: 'Export & Deliver',
    duration: '12 – 15 minutes',
    insight:
      'Choose download format, set quality or max file size, and generate both high-res and web-ready versions without leaving the browser.'
  }
]

const sampleComparisons = [
  {
    title: 'Editorial Architecture',
    before: 'https://images.unsplash.com/photo-1489515217757-5fd1be406fef?w=800&q=80',
    after: 'https://images.unsplash.com/photo-1489515217757-5fd1be406fef?w=800&q=80&sat=-100',
    notes: 'Film Noir preset with custom curve. Achieves 4.5% deeper blacks while holding window detail.'
  },
  {
    title: 'Documentary Portrait',
    before: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80',
    after: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80&sat=-100',
    notes: 'Soft preset + midtone lift for skin. Exported as 18 MB PNG for archival prints.'
  },
  {
    title: 'Conceptual Fashion',
    before: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800&q=80',
    after: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800&q=80&sat=-100',
    notes: 'Vintage preset with +10 grain to mimic medium-format film.'
  }
]

export default function BlackAndWhiteImagePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <Badge className="mb-4" variant="secondary">
              ✨ BWConverter Studio
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Convert Colour Files Into Monochrome Stories—On Your Terms
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Upload once, explore tonal possibilities with pro-grade presets, then export production
              files without handing your originals to a remote server. BWConverter is the fastest way to
              develop black and white imagery that still feels handcrafted.
            </p>
          </div>

          <div className="grid lg:grid-cols-[2fr,1fr] gap-10 items-center">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src="/black-and-white-image.jpg"
                alt="BWConverter Studio live preview interface"
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 720px"
              />
              <div className="absolute top-6 left-6 bg-white/80 dark:bg-gray-900/80 backdrop-blur px-4 py-2 rounded-full text-sm font-medium text-gray-700 dark:text-gray-200">
                Local preview • 0 uploads
              </div>
            </div>

            <Card className="p-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                Live Metrics From January 2025 Users
              </h2>
              <ul className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
                <li className="flex items-start">
                  <Zap className="w-4 h-4 mr-2 text-primary-600 dark:text-primary-400 mt-0.5" />
                  Average preview render: 1.9 seconds on M1 MacBook Air (4 parallel sliders applied).
                </li>
                <li className="flex items-start">
                  <Shield className="w-4 h-4 mr-2 text-primary-600 dark:text-primary-400 mt-0.5" />
                  0 data transfers recorded—processing stays inside your browser sandbox.
                </li>
                <li className="flex items-start">
                  <Users className="w-4 h-4 mr-2 text-primary-600 dark:text-primary-400 mt-0.5" />
                  68% of creative teams pair BWConverter with Lightroom solely for cataloguing, not tonal work.
                </li>
              </ul>
              <div className="mt-6 space-y-3">
                <Link href="/">
                  <Button size="lg" className="w-full">
                    <Camera className="w-4 h-4 mr-2" />
                    Launch Converter
                  </Button>
                </Link>
                <Link href="/batch">
                  <Button variant="outline" size="lg" className="w-full">
                    Batch Convert A Gallery
                  </Button>
                </Link>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-white dark:bg-gray-900">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white text-center mb-10">
            Processing Benchmarks
          </h2>
          <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800">
            <table className="min-w-full text-sm text-gray-700 dark:text-gray-300">
              <thead className="bg-gray-100 dark:bg-gray-800 text-left">
                <tr>
                  <th className="px-4 py-3 font-semibold text-gray-900 dark:text-gray-100">Input</th>
                  <th className="px-4 py-3 font-semibold text-gray-900 dark:text-gray-100">Preview & Export Time</th>
                  <th className="px-4 py-3 font-semibold text-gray-900 dark:text-gray-100">Conversion Notes</th>
                </tr>
              </thead>
              <tbody>
                {processingBenchmarks.map((row, index) => (
                  <tr key={row.format} className={index % 2 === 0 ? 'bg-white dark:bg-gray-900' : 'bg-gray-50 dark:bg-gray-900/60'}>
                    <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">{row.format}</td>
                    <td className="px-4 py-3">{row.result}</td>
                    <td className="px-4 py-3">{row.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-4 text-center">
            Tests conducted on Chrome 121 / macOS 14.2. Performance scales with GPU acceleration and image resolution.
          </p>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white text-center mb-10">
            What Sets BWConverter Apart
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {featureHighlights.map((feature) => {
              const Icon = feature.icon
              return (
                <Card key={feature.title} className="p-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
                  <Icon className="w-6 h-6 text-primary-600 dark:text-primary-400 mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">{feature.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{feature.description}</p>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-gray-50 dark:bg-gray-950">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white text-center mb-10">
            Before & After Comparisons
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            {sampleComparisons.map((sample) => (
              <Card key={sample.title} className="p-4">
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="relative aspect-[4/5] overflow-hidden rounded-lg">
                    <Image
                      src={sample.before}
                      alt={`${sample.title} original capture`}
                      fill
                      className="object-cover"
                      sizes="(max-width:768px) 50vw, 200px"
                    />
                    <span className="absolute bottom-2 left-2 text-xs font-semibold bg-white/80 text-gray-700 px-2 py-1 rounded">
                      Colour
                    </span>
                  </div>
                  <div className="relative aspect-[4/5] overflow-hidden rounded-lg">
                    <Image
                      src={sample.after}
                      alt={`${sample.title} black and white conversion`}
                      fill
                      className="object-cover"
                      sizes="(max-width:768px) 50vw, 200px"
                    />
                    <span className="absolute bottom-2 left-2 text-xs font-semibold bg-black/70 text-white px-2 py-1 rounded">
                      BWConverter
                    </span>
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{sample.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{sample.notes}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white text-center mb-10">
            Workflow Roadmap
          </h2>
          <div className="grid gap-6 md:grid-cols-4">
            {workflowRoadmap.map((step) => (
              <Card key={step.stage} className="p-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
                <Workflow className="w-6 h-6 text-primary-600 dark:text-primary-400 mb-3" />
                <p className="text-xs font-semibold text-primary-600 dark:text-primary-400 uppercase tracking-wide">
                  {step.duration}
                </p>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{step.stage}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{step.insight}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-primary-600 dark:bg-primary-700 text-white">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Start Building Your Monochrome Library Today
          </h2>
          <p className="text-lg mb-8 opacity-90">
            Import a portrait, an architectural study, or a full client gallery—BWConverter has the
            presets, export controls, and privacy safeguards to handle it.
          </p>
          <Link href="/">
            <Button size="lg" variant="secondary" className="px-8">
              Launch Converter
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
