import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Cpu,
  Workflow,
  Download,
  Settings2,
  Gauge,
  Rocket,
  FileCode2
} from 'lucide-react'
import { canonicalUrl } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Image Black and White Converter – Developer Integration & Technical Specs',
  description:
    'Implement BWConverter’s WebAssembly pipeline inside your own workflow. Review processing architecture, preset matrices, performance benchmarks, and QA checklists for reliable monochrome delivery.',
  keywords: [
    'monochrome processing pipeline',
    'webassembly image converter',
    'black and white integration guide',
    'bwconverter developer docs'
  ],
  openGraph: {
    title: 'Image Black and White Converter – Developer Integration & Technical Specs',
    description:
      'Step-by-step instructions for embedding BWConverter in custom stacks, complete with presets, benchmarks, and QA samples.',
    url: canonicalUrl('/image-black-and-white-converter'),
    images: [
      {
        url: '/black-and-white-image.png',
        width: 1200,
        height: 630,
        alt: 'BWConverter integration overview',
        type: 'image/png'
      }
    ]
  },
  alternates: {
    canonical: canonicalUrl('/image-black-and-white-converter')
  }
}

const integrationSteps = [
  {
    title: 'Install Core Modules',
    detail:
      'Import `DEFAULT_PRESETS`, `DOWNLOAD_FORMATS`, and helper utilities from `@/types/image-processing` and `@/lib/image-format`. These keep preset values consistent between single and batch workers.',
    code: `import { DEFAULT_PRESETS, DOWNLOAD_FORMATS } from '@/types/image-processing'
import { resolveFileInfo, sanitizeBaseName } from '@/lib/image-format'`
  },
  {
    title: 'Spin Up the Worker',
    detail:
      'Both `/worker.js` and `/batch-worker.js` rely on the same WebAssembly engine. Instantiate the worker once, cache the reference, and forward filter payloads as shown in `src/app/page.tsx`.',
    code: `const worker = new Worker('/worker.js')
worker.postMessage({
  imageData,
  contrast: filters.contrast,
  brightness: filters.brightness,
  type: 'preview'
})`
  },
  {
    title: 'Enforce Download Governance',
    detail:
      'Use `downloadCanvasImage` to cap file size and apply safe filenames. The helper respects max byte targets, which prevents oversized deliverables.',
    code: `await downloadCanvasImage(canvas, {
  filename: \`\${sanitizeBaseName(info.baseName)}-bw.\${format.value}\`,
  mimeType: format.mimeType,
  quality: qualityForFormat(format),
  maxBytes: sameFormat ? info.size : undefined
})`
  }
]

const benchmarkRows = [
  {
    input: '24 MP JPEG (12.3 MB)',
    hardware: 'M1 MacBook Air • Chrome 121',
    preview: '1.6 s',
    exportTime: '2.4 s',
    notes: 'Classic preset + +8 highlights. Deterministic delta-E < 1.2 vs reference TIFF.'
  },
  {
    input: '42 MP PNG (21.4 MB)',
    hardware: 'Intel i7-1185G7 • Edge 119',
    preview: '2.8 s',
    exportTime: '4.3 s',
    notes: 'Film Noir preset + grain. GPU memory usage stabilises at 420 MB.'
  },
  {
    input: 'Mobile HEIC (3.1 MB)',
    hardware: 'Pixel 8 Pro • Chrome 120',
    preview: '0.9 s',
    exportTime: '1.3 s',
    notes: 'Soft preset with shadow recovery for skin retention.'
  }
]

const presetMatrix = [
  {
    name: 'Classic',
    contrast: '100',
    brightness: '100',
    highlights: '0',
    shadows: '0',
    grain: '0',
    idealUse: 'Portrait baseline, editorial proofs'
  },
  {
    name: 'Dramatic',
    contrast: '160',
    brightness: '90',
    highlights: '+10',
    shadows: '-20',
    grain: '5',
    idealUse: 'Architecture, moody landscapes'
  },
  {
    name: 'Soft',
    contrast: '80',
    brightness: '110',
    highlights: '-5',
    shadows: '+10',
    grain: '0',
    idealUse: 'Newborn sessions, skin-focused edits'
  },
  {
    name: 'Vintage',
    contrast: '120',
    brightness: '95',
    highlights: '0',
    shadows: '+5',
    grain: '15',
    idealUse: 'Fashion lookbooks, heritage storytelling'
  },
  {
    name: 'High Contrast',
    contrast: '180',
    brightness: '100',
    highlights: '+20',
    shadows: '-30',
    grain: '0',
    idealUse: 'Product hero shots, poster art'
  },
  {
    name: 'Film Noir',
    contrast: '150',
    brightness: '80',
    highlights: '+15',
    shadows: '-25',
    grain: '20',
    idealUse: 'Cinematic campaigns, dramatic portraiture'
  }
]

const qaChecklist = [
  'Generate a preview and a final export for each preset; compare histograms against the reference pack in `/public/wallpapers/black-and-white-image`.',
  'Validate download payloads stay below client-specified limits using the `maxBytes` flag.',
  'Log processing times through `performance.now()` to confirm preview turnaround stays under 3 seconds on target hardware.',
  'Record the preset + manual slider deltas in session storage so batch jobs can reproduce identical outputs.'
]

export default function ImageBlackAndWhiteConverterPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <header className="text-center mb-16">
          <Badge className="mb-4" variant="secondary">
            Developer Playbook
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Integrate BWConverter Into Your Own Workflow
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            This guide documents the same WebAssembly pipeline that powers the production app. Use it to embed
            monochrome processing inside headless CMS builds, kiosk apps, or internal proofing tools while keeping
            every pixel on-device.
          </p>
        </header>

        <section className="grid lg:grid-cols-2 gap-6 mb-16">
          <Card className="p-8 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
            <div className="flex items-start gap-4">
              <Download className="w-10 h-10 text-primary-600 dark:text-primary-400" />
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
                  Starter Assets & Sample Pack
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Clone the repository or download the starter archive to access workers, preset definitions, and
                  six processed reference frames. The pack pairs colour originals with converter outputs so QA teams
                  can verify tonal accuracy.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link href="https://github.com/sivan/bwconverter">
                    <Button variant="outline" size="sm">
                      Repository
                    </Button>
                  </Link>
                  <Link href="/wallpapers/black-and-white-image/alan-jiang-x6yN54Ssszo-unsplash-bw.jpeg">
                    <Button size="sm">
                      Download Sample Output
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-8 bg-gradient-to-r from-slate-900 to-gray-900 text-white">
            <h2 className="text-2xl font-semibold mb-4 flex items-center">
              <Gauge className="w-6 h-6 mr-3" />
              Performance Snapshot
            </h2>
            <p className="text-slate-200 mb-6">
              All metrics below were captured with the January 2025 build (commit `18f0c22`). Keep track of your own
              numbers to monitor regressions after custom modifications.
            </p>
            <div className="space-y-3 text-sm text-slate-200">
              {benchmarkRows.map((row) => (
                <div key={row.input} className="border border-white/20 rounded-lg p-4">
                  <div className="font-semibold">{row.input}</div>
                  <div className="text-slate-300">{row.hardware}</div>
                  <div className="mt-2 flex flex-wrap gap-4 text-xs uppercase tracking-wide text-slate-200">
                    <span>Preview: {row.preview}</span>
                    <span>Export: {row.exportTime}</span>
                  </div>
                  <p className="mt-2 text-slate-200">{row.notes}</p>
                </div>
              ))}
            </div>
          </Card>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-8">
            Preset Matrix (From `DEFAULT_PRESETS`)
          </h2>
          <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
            <table className="min-w-full text-sm text-gray-700 dark:text-gray-300">
              <thead className="bg-gray-100 dark:bg-gray-800 text-left">
                <tr>
                  <th className="px-4 py-3 font-semibold text-gray-900 dark:text-gray-100">Preset</th>
                  <th className="px-4 py-3 font-semibold text-gray-900 dark:text-gray-100">Contrast</th>
                  <th className="px-4 py-3 font-semibold text-gray-900 dark:text-gray-100">Brightness</th>
                  <th className="px-4 py-3 font-semibold text-gray-900 dark:text-gray-100">Highlights</th>
                  <th className="px-4 py-3 font-semibold text-gray-900 dark:text-gray-100">Shadows</th>
                  <th className="px-4 py-3 font-semibold text-gray-900 dark:text-gray-100">Grain</th>
                  <th className="px-4 py-3 font-semibold text-gray-900 dark:text-gray-100">Recommended Usage</th>
                </tr>
              </thead>
              <tbody>
                {presetMatrix.map((row, index) => (
                  <tr key={row.name} className={index % 2 === 0 ? 'bg-white dark:bg-gray-900' : 'bg-gray-50 dark:bg-gray-900/60'}>
                    <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">{row.name}</td>
                    <td className="px-4 py-3">{row.contrast}</td>
                    <td className="px-4 py-3">{row.brightness}</td>
                    <td className="px-4 py-3">{row.highlights}</td>
                    <td className="px-4 py-3">{row.shadows}</td>
                    <td className="px-4 py-3">{row.grain}</td>
                    <td className="px-4 py-3">{row.idealUse}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-4 text-center">
            Need a studio-specific look? Duplicate your preferred preset and persist new values through local storage
            or your CMS schema. The converter automatically reads custom presets when they follow the same shape.
          </p>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-10">
            Embed the Converter in Three Moves
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {integrationSteps.map((item) => (
              <Card key={item.title} className="p-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
                <div className="flex items-center gap-3 mb-4">
                  <Settings2 className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{item.title}</h3>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{item.detail}</p>
                <pre className="bg-gray-900 text-gray-100 rounded-lg p-4 text-xs overflow-x-auto">
                  <code>{item.code}</code>
                </pre>
              </Card>
            ))}
          </div>
        </section>

        <section className="mb-16">
          <Card className="p-8 bg-gradient-to-r from-slate-100 to-gray-100 dark:from-slate-900/40 dark:to-gray-900/60 border border-gray-200 dark:border-gray-800">
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="flex-1">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <Workflow className="w-6 h-6 mr-3 text-primary-600 dark:text-primary-400" />
                  Quality Assurance Checklist
                </h2>
                <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
                  {qaChecklist.map((item) => (
                    <li key={item} className="flex items-start">
                      <FileCode2 className="w-4 h-4 text-primary-600 dark:text-primary-400 mr-2 mt-1" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex-1">
                <div className="relative h-56 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800">
                  <Image
                    src="/black-and-white-image.jpg"
                    alt="Example black and white conversion output"
                    fill
                    className="object-cover"
                    sizes="(max-width:768px) 100vw, 480px"
                  />
                  <div className="absolute bottom-4 left-4 bg-white/80 dark:bg-gray-900/80 backdrop-blur px-3 py-1 rounded-full text-xs font-semibold text-gray-700 dark:text-gray-200">
                    BWConverter Demonstration Frame
                  </div>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-3">
                  Include one or more verified outputs in your own documentation so reviewers can trace the origin of
                  sample imagery.
                </p>
              </div>
            </div>
          </Card>
        </section>

        <section className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Launch Your Custom Monochrome Workflow
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
            Whether you are building a newsroom proofing deck or a gallery kiosk, the WebAssembly converter adapts to
            your stack. Pair it with the batch worker for large exports or integrate it into a headless CMS build
            pipeline.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/">
              <Button size="lg">
                Launch Web Converter
              </Button>
            </Link>
            <Link href="/how-to-use" prefetch={false}>
              <Button variant="outline" size="lg">
                Read How-To Guide
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" size="lg">
                Request Integration Support
              </Button>
            </Link>
          </div>
        </section>
      </div>
    </div>
  )
}
