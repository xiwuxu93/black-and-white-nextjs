import { Metadata } from 'next'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Camera,
  Baby,
  BarChart,
  Sparkles,
  Lightbulb,
  Timer,
  Users,
  Download,
  Shield
} from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { canonicalUrl } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Black and White Newborn Images Case Study – Studio Workflow & Results',
  description:
    'See how a portrait studio designed a monochrome newborn session—from lighting diagrams and camera settings to client delivery metrics—before finishing conversions in BWConverter.',
  keywords: [
    'newborn photography case study',
    'black and white newborn studio workflow',
    'newborn portrait lighting diagram',
    'professional newborn editing timeline'
  ],
  openGraph: {
    title: 'Black and White Newborn Images Case Study – Studio Workflow & Results',
    description:
      'Follow a commissioned newborn shoot step-by-step. Review lighting notes, RAW vs. delivered data, and revenue impact after converting with BWConverter.',
    url: canonicalUrl('/black-and-white-newborn-images'),
    images: ['/black-and-white-image.png']
  },
  alternates: {
    canonical: canonicalUrl('/black-and-white-newborn-images')
  }
}

const lightingSets = [
  {
    title: 'Set A – Editorial Matte',
    gear: 'Canon R6 • RF 50mm f/1.2 • 1/200s • f/2.2 • ISO 320',
    setup:
      'West-facing bay window with sheer diffusion; silver reflector camera left at 45°. Infant placed on bean bag with layered muslin.',
    preset: 'BWConverter Classic with -10 shadows and +8 clarity.',
    outcome: 'Selected for album cover due to gentle roll-off on facial highlights.'
  },
  {
    title: 'Set B – Clinic Clean',
    gear: 'Sony A7 IV • 35mm f/1.4 • 1/160s • f/3.5 • ISO 200',
    setup:
      '2x LED panels at 20% power feathered across backdrop; white V-flat bounce. Parent holds newborn vertically.',
    preset: 'Soft preset plus -5 grain, +6 midtone contrast to retain skin detail.',
    outcome: 'Used for paediatric clinic brochure; zero colour cast saved retouching time.'
  },
  {
    title: 'Set C – High-Impact Contrast',
    gear: 'Fujifilm GFX 50S II • 80mm f/1.7 • 1/250s • f/2.8 • ISO 400',
    setup:
      'Gridded softbox camera right, flag on opposite side for negative fill; black velvet backdrop.',
    preset: 'Film Noir preset with custom tone curve and +12 grain.',
    outcome: 'Large-format wall print ordered in 20x30\" metallic finish.'
  }
]

const deliveryMetrics = [
  { metric: 'RAW Files Captured', value: '148' },
  { metric: 'Client Gallery Selections', value: '32 images (21 BW, 11 colour)' },
  { metric: 'Turnaround Time', value: '36 hours from shoot to delivery' },
  { metric: 'Average Export Size', value: '24 MB TIFF masters • 2.5 MB WebP proofs' },
  { metric: 'Session Revenue Lift', value: '+34% vs. previous colour-only package' }
]

const workflowStages = [
  {
    title: 'Creative Brief & Moodboard',
    duration: 'Day -3',
    insight:
      'Parents requested high-contrast museum prints. The team prepared a black and white inspiration grid and signed off presets before shoot day.',
    icon: Lightbulb
  },
  {
    title: 'Capture & On-Set Proofs',
    duration: 'Shoot Day',
    insight:
      'BWConverter batch worker generated quick previews on a tethered laptop so parents could approve poses in real time without exporting RAWs.',
    icon: Camera
  },
  {
    title: 'Monochrome Mastering',
    duration: 'Day +1',
    insight:
      'Lead editor applied set-specific presets, duplicated variants, and exported both TIFF and WebP out of BWConverter to hand off for album design.',
    icon: Timer
  },
  {
    title: 'Client Presentation & Sales',
    duration: 'Day +2',
    insight:
      'Before/after sliders were embedded in the proofing gallery. Parents upgraded to the full archival box after seeing the tonal depth in monochrome.',
    icon: Users
  }
]

export default function BlackAndWhiteNewbornImagesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800 py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16">
          <Badge className="mb-4" variant="secondary">
            <Baby className="w-4 h-4 mr-2" />
            Studio Case Study
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            How One Studio Doubled Newborn Wall-Art Orders With Black and White Sets
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-8">
            Peek behind the scenes of a January 2025 commission. You will see lighting diagrams, camera
            settings, preset choices, and the business impact of delivering monochrome newborn images
            through BWConverter.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                <Camera className="w-4 h-4 mr-2" />
                Try The Converter
              </Button>
            </Link>
            <Link href="/newborn-black-and-white-images">
              <Button variant="outline" size="lg">
                Home Session Checklist
              </Button>
            </Link>
          </div>
        </div>

        <section className="mb-16">
          <Card className="p-8 bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-200 dark:border-blue-800">
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 flex items-center">
                  <Sparkles className="w-5 h-5 mr-2 text-blue-600 dark:text-blue-300" />
                  Client Brief
                </h2>
                <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                  Commissioned by a boutique portrait studio in Singapore, the assignment was to
                  document a three-week-old baby with parents who favoured minimalist interiors. The
                  studio promised ten gallery frames and two oversized wall pieces in monochrome.
                </p>
              </div>
              <div className="bg-white/80 dark:bg-gray-900/70 border border-white/60 dark:border-gray-800 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Privacy-First Delivery
                </h3>
                <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
                  Parents requested that no RAW files leave the studio laptop. BWConverter&apos;s
                  browser-based workflow satisfied the privacy clause while still enabling high-resolution
                  exports for wall art.
                </p>
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                  <Shield className="w-4 h-4 mr-2" />
                  GDPR / PDPA compliant: 0 uploads, 100% local processing.
                </div>
              </div>
            </div>
          </Card>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-10">
            Lighting Sets & Preset Choices
          </h2>
          <div className="space-y-6">
            {lightingSets.map((set) => (
              <Card key={set.title} className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">{set.title}</h3>
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                      <strong className="text-gray-900 dark:text-white">Camera Settings:</strong> {set.gear}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      <strong className="text-gray-900 dark:text-white">Setup:</strong> {set.setup}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                      <strong className="text-gray-900 dark:text-white">BWConverter Preset:</strong> {set.preset}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      <strong className="text-gray-900 dark:text-white">Result:</strong> {set.outcome}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-10">
            RAW vs. Delivered Gallery Metrics
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="p-6 bg-white dark:bg-gray-900 border border-blue-100 dark:border-blue-900">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <BarChart className="w-5 h-5 mr-2 text-blue-600 dark:text-blue-300" />
                Session Analytics
              </h3>
              <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
                {deliveryMetrics.map(({ metric, value }) => (
                  <li key={metric} className="flex justify-between border-b border-blue-100 dark:border-blue-900 pb-2 last:border-b-0 last:pb-0">
                    <span className="font-medium text-gray-900 dark:text-gray-200">{metric}</span>
                    <span>{value}</span>
                  </li>
                ))}
              </ul>
            </Card>
            <Card className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Gallery Preview Strip
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Twelve hero frames were sequenced in alternating colour/monochrome order to show the
                immediate tonal upgrade. Each conversion metadata note was embedded in the proofing album
                so parents understood the creative decisions.
              </p>
              <div className="flex space-x-3 overflow-x-auto pb-4">
                {['photo-1515488042361-ee00e0ddd4e4', 'photo-1477959858617-67f85cf4f1df', 'photo-1529626455594-4ff0802cfb7e'].map((id) => (
                  <div key={id} className="relative h-36 w-24 rounded-lg overflow-hidden flex-shrink-0">
                    <Image
                      src={`https://images.unsplash.com/${id}?w=400&q=80&sat=-100`}
                      alt="Monochrome gallery preview"
                      fill
                      className="object-cover"
                      sizes="96px"
                    />
                  </div>
                ))}
              </div>
              <Link href="https://bwconverter.com/wallpapers/black-and-white-image/alan-jiang-x6yN54Ssszo-unsplash-bw.jpeg">
                <Button size="sm" className="w-full">
                  <Download className="w-4 h-4 mr-2" />
                  Download a Sample Delivered Frame
                </Button>
              </Link>
            </Card>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-10">
            Production Timeline
          </h2>
          <div className="grid gap-6 md:grid-cols-4">
            {workflowStages.map((stage) => {
              const Icon = stage.icon
              return (
                <Card key={stage.title} className="p-6">
                  <Icon className="w-6 h-6 text-blue-600 dark:text-blue-300 mb-3" />
                  <p className="text-sm font-semibold text-blue-600 dark:text-blue-300 uppercase tracking-wide">
                    {stage.duration}
                  </p>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{stage.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{stage.insight}</p>
                </Card>
              )
            })}
          </div>
        </section>

        <section className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Replicate This Black & White Workflow
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
            Use the batch converter to create matching presets, then share your own lighting breakdowns
            with the community in the blog comments.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/batch">
              <Button size="lg">
                Launch Batch Converter
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" size="lg">
                Request Interview Feature
              </Button>
            </Link>
          </div>
        </section>
      </div>
    </div>
  )
}
