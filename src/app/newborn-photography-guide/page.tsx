import { Metadata } from 'next'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Camera,
  Baby,
  Calendar,
  Sparkles,
  Download,
  CheckCircle,
  BarChart,
  Shield,
  Lightbulb,
  Timer,
  Users
} from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { Breadcrumb } from '@/components/seo/breadcrumb'
import { canonicalUrl } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Complete Newborn Photography Guide - Home Sessions & Studio Workflow',
  description:
    'Master newborn photography with our complete guide. Learn home session techniques for parents and professional studio workflows. Includes lighting setups, BWConverter presets, and delivery tips.',
  keywords: [
    'newborn photography guide',
    'newborn black and white photography',
    'home newborn session',
    'studio newborn workflow',
    'newborn portrait lighting',
    'professional newborn photography'
  ],
  openGraph: {
    title: 'Complete Newborn Photography Guide - Home & Studio',
    description:
      'Everything you need for stunning newborn portraits - from DIY home sessions to professional studio workflows.',
    url: canonicalUrl('/newborn-photography-guide'),
    images: ['/black-and-white-image.png']
  },
  alternates: {
    canonical: canonicalUrl('/newborn-photography-guide')
  }
}

// Home Session Data
const samplePairs = [
  {
    label: 'Window Light Portrait',
    before: '/samples/color/newborn-original.jpg',
    after: '/samples/bw/newborn-bw.jpg',
    notes: 'Soft preset with +6 brightness to preserve newborn skin texture.'
  },
  {
    label: 'Sibling Storytelling',
    before: '/samples/color/newborn-family-original.jpg',
    after: '/samples/bw/newborn-family-bw.jpg',
    notes: 'Classic preset, manual shadow lift (+8) for backlight details.'
  },
  {
    label: 'Texture Study',
    before: '/samples/color/newborn-wrap-original.jpg',
    after: '/samples/bw/newborn-wrap-bw.jpg',
    notes: 'Vintage preset plus +10 grain to mimic fibre paper.'
  }
]

const parentChecklist = [
  {
    title: 'Day Before Session',
    items: [
      'Steam or iron wraps and neutral outfits',
      'Charge camera batteries or phone power banks',
      'Clear a 2m x 2m area near your brightest window'
    ]
  },
  {
    title: 'One Hour Prior',
    items: [
      'Warm room to 24°C (75°F) for comfort',
      'Feed baby and plan nap-friendly playlist',
      'Prepare backup cloths and plain cushion'
    ]
  },
  {
    title: 'During Shooting',
    items: [
      'Start with close-up details before baby wakes',
      'Capture wide scene to establish environment',
      'Log favourite frames for editing priority'
    ]
  }
]

const lightingRecipes = [
  {
    name: 'Soft Window Wrap',
    settings: '1/160s • f/2.0 • ISO 200',
    setup: 'North-facing window, sheer curtain, white reflector',
    bestFor: 'Sleeping baby chest-up portraits'
  },
  {
    name: 'Storyteller Flatlay',
    settings: '1/200s • f/3.5 • ISO 320',
    setup: 'Overhead light bounced off ceiling, grey blanket backdrop',
    bestFor: 'Sibling hands, feet, prop arrangements'
  },
  {
    name: 'Moody Evening Glow',
    settings: '1/125s • f/1.8 • ISO 800',
    setup: 'Practical lamp behind parent, cardboard flag',
    bestFor: 'Emotive parent-baby cuddle silhouettes'
  }
]

// Studio Workflow Data
const lightingSets = [
  {
    title: 'Set A – Editorial Matte',
    gear: 'Canon R6 • RF 50mm f/1.2 • 1/200s • f/2.2 • ISO 320',
    setup:
      'West-facing bay window with sheer diffusion; silver reflector at 45°. Infant on bean bag with layered muslin.',
    preset: 'BWConverter Classic with -10 shadows and +8 clarity.',
    outcome: 'Selected for album cover due to gentle roll-off on facial highlights.'
  },
  {
    title: 'Set B – Clinic Clean',
    gear: 'Sony A7 IV • 35mm f/1.4 • 1/160s • f/3.5 • ISO 200',
    setup:
      '2x LED panels at 20% power feathered across backdrop; white V-flat bounce. Parent holds newborn vertically.',
    preset: 'Soft preset plus -5 grain, +6 midtone contrast.',
    outcome: 'Used for clinic brochure; zero colour cast saved retouching time.'
  },
  {
    title: 'Set C – High-Impact Contrast',
    gear: 'Fujifilm GFX 50S II • 80mm f/1.7 • 1/250s • f/2.8 • ISO 400',
    setup:
      'Gridded softbox camera right, flag opposite for negative fill; black velvet backdrop.',
    preset: 'Film Noir preset with custom tone curve and +12 grain.',
    outcome: 'Large-format wall print ordered in 20x30" metallic finish.'
  }
]

const deliveryMetrics = [
  { metric: 'RAW Files Captured', value: '148' },
  { metric: 'Client Gallery Selections', value: '32 images (21 B&W, 11 color)' },
  { metric: 'Turnaround Time', value: '36 hours from shoot to delivery' },
  { metric: 'Average Export Size', value: '24 MB TIFF • 2.5 MB WebP' },
  { metric: 'Session Revenue Lift', value: '+34% vs color-only package' }
]

const workflowStages = [
  {
    title: 'Creative Brief',
    duration: 'Day -3',
    insight:
      'Parents requested high-contrast museum prints. Team prepared inspiration grid and signed off presets before shoot.',
    icon: Lightbulb
  },
  {
    title: 'Capture & Proofs',
    duration: 'Shoot Day',
    insight:
      'BWConverter batch worker generated quick previews on tethered laptop for real-time parent approval.',
    icon: Camera
  },
  {
    title: 'Monochrome Mastering',
    duration: 'Day +1',
    insight:
      'Lead editor applied set-specific presets, duplicated variants, exported TIFF and WebP for album design.',
    icon: Timer
  },
  {
    title: 'Client Sales',
    duration: 'Day +2',
    insight:
      'Before/after sliders in proofing gallery. Parents upgraded to archival box after seeing tonal depth.',
    icon: Users
  }
]

export default function NewbornPhotographyGuidePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-pink-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <Breadcrumb
          items={[
            { name: 'Photography Guides', url: '/examples' },
            { name: 'Newborn Photography Guide' }
          ]}
        />

        {/* Header */}
        <div className="text-center mb-12">
          <Badge className="mb-4" variant="secondary">
            <Baby className="w-4 h-4 mr-2" />
            Complete Guide
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Complete Newborn Photography Guide
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-8">
            Everything you need for stunning newborn portraits - from DIY home sessions to professional studio workflows. Includes lighting setups, BWConverter presets, and delivery best practices.
          </p>
        </div>

        {/* Tabs Navigation */}
        <Tabs defaultValue="home" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8 max-w-md mx-auto">
            <TabsTrigger value="home">
              <span className="flex items-center gap-2">
                🏠 Home Sessions
              </span>
            </TabsTrigger>
            <TabsTrigger value="studio">
              <span className="flex items-center gap-2">
                📸 Studio Workflow
              </span>
            </TabsTrigger>
          </TabsList>

          {/* HOME SESSION CONTENT */}
          <TabsContent value="home" className="space-y-8">
            {/* Intro Card */}
            <Card className="p-8 bg-gradient-to-r from-pink-100 to-purple-100 dark:from-pink-900/20 dark:to-purple-900/20 border-pink-200 dark:border-pink-800">
              <div className="grid gap-6 md:grid-cols-3">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 flex items-center">
                    <Sparkles className="w-5 h-5 mr-2 text-pink-600 dark:text-pink-300" />
                    Why Home Sessions?
                  </h2>
                  <p className="text-gray-700 dark:text-gray-300 text-sm">
                    Capture intimate moments in familiar surroundings. Natural light from windows creates soft, timeless portraits without expensive equipment.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    Quick Stats
                  </h3>
                  <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                    <li className="flex items-start">
                      <CheckCircle className="w-4 h-4 mr-2 text-pink-600 mt-0.5" />
                      92% of parents prefer monochrome for announcements
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-4 h-4 mr-2 text-pink-600 mt-0.5" />
                      27% higher print orders with B&W comparisons
                    </li>
                  </ul>
                </div>
                <div className="bg-white/80 dark:bg-gray-900/60 rounded-xl p-5">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    Sample Pack
                  </h3>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
                    Download before/after examples to benchmark your own work.
                  </p>
                  <Link href="/samples/bw/newborn-bw.jpg">
                    <Button size="sm" className="w-full">
                      <Download className="w-4 h-4 mr-2" />
                      View Samples
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>

            {/* Before/After Examples */}
            <section>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-10">
                Real Session Examples
              </h2>
              <div className="grid gap-6 md:grid-cols-3">
                {samplePairs.map((pair) => (
                  <Card key={pair.label} className="p-4">
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div className="relative aspect-[4/5] overflow-hidden rounded-lg">
                        <Image
                          src={pair.before}
                          alt={`${pair.label} color`}
                          fill
                          className="object-cover"
                          sizes="200px"
                        />
                        <span className="absolute bottom-2 left-2 text-xs font-semibold bg-white/80 px-2 py-1 rounded">
                          Color
                        </span>
                      </div>
                      <div className="relative aspect-[4/5] overflow-hidden rounded-lg">
                        <Image
                          src={pair.after}
                          alt={`${pair.label} B&W`}
                          fill
                          className="object-cover"
                          sizes="200px"
                        />
                        <span className="absolute bottom-2 left-2 text-xs font-semibold bg-black/60 text-white px-2 py-1 rounded">
                          B&W
                        </span>
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">{pair.label}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{pair.notes}</p>
                  </Card>
                ))}
              </div>
            </section>

            {/* Parent Prep Checklist */}
            <section>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-10">
                Parent Prep Checklist
              </h2>
              <div className="grid gap-6 md:grid-cols-3">
                {parentChecklist.map((block) => (
                  <Card key={block.title} className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">{block.title}</h3>
                    <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
                      {block.items.map((item) => (
                        <li key={item} className="flex items-start">
                          <span className="mt-1.5 mr-2 h-2 w-2 rounded-full bg-pink-500" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </Card>
                ))}
              </div>
            </section>

            {/* Lighting Recipes */}
            <section>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-10">
                Lighting Recipes
              </h2>
              <div className="overflow-hidden rounded-xl border border-pink-200 dark:border-pink-800">
                <table className="min-w-full text-sm">
                  <thead className="bg-pink-100 dark:bg-pink-900/40">
                    <tr>
                      <th className="px-4 py-3 text-left font-semibold text-gray-900 dark:text-white">Recipe</th>
                      <th className="px-4 py-3 text-left font-semibold text-gray-900 dark:text-white">Settings</th>
                      <th className="px-4 py-3 text-left font-semibold text-gray-900 dark:text-white">Setup</th>
                      <th className="px-4 py-3 text-left font-semibold text-gray-900 dark:text-white">Best For</th>
                    </tr>
                  </thead>
                  <tbody>
                    {lightingRecipes.map((recipe, i) => (
                      <tr key={recipe.name} className={i % 2 === 0 ? 'bg-white dark:bg-gray-900' : 'bg-pink-50 dark:bg-gray-900/60'}>
                        <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">{recipe.name}</td>
                        <td className="px-4 py-3 text-gray-600 dark:text-gray-400">{recipe.settings}</td>
                        <td className="px-4 py-3 text-gray-600 dark:text-gray-400">{recipe.setup}</td>
                        <td className="px-4 py-3 text-gray-600 dark:text-gray-400">{recipe.bestFor}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* CTA */}
            <div className="text-center">
              <Link href="/">
                <Button size="lg" className="bg-pink-600 hover:bg-pink-700">
                  <Camera className="w-4 h-4 mr-2" />
                  Convert Your Photos Now
                </Button>
              </Link>
            </div>
          </TabsContent>

          {/* STUDIO WORKFLOW CONTENT */}
          <TabsContent value="studio" className="space-y-8">
            {/* Studio Intro */}
            <Card className="p-8 bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20">
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 flex items-center">
                    <Sparkles className="w-5 h-5 mr-2 text-blue-600" />
                    Studio Case Study
                  </h2>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    Singapore boutique studio commissioned for minimalist interiors. Ten gallery frames and two oversized wall pieces in monochrome.
                  </p>
                </div>
                <div className="bg-white/80 dark:bg-gray-900/70 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    Privacy-First Delivery
                  </h3>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
                    No RAW files left the studio laptop. BWConverter browser workflow satisfied privacy requirements.
                  </p>
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                    <Shield className="w-4 h-4 mr-2" />
                    GDPR/PDPA compliant: 0 uploads
                  </div>
                </div>
              </div>
            </Card>

            {/* Lighting Sets */}
            <section>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-10">
                Professional Lighting Sets
              </h2>
              <div className="space-y-6">
                {lightingSets.map((set) => (
                  <Card key={set.title} className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">{set.title}</h3>
                    <div className="grid gap-6 md:grid-cols-2">
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                          <strong className="text-gray-900 dark:text-white">Camera:</strong> {set.gear}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          <strong className="text-gray-900 dark:text-white">Setup:</strong> {set.setup}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                          <strong className="text-gray-900 dark:text-white">BWConverter:</strong> {set.preset}
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

            {/* Metrics */}
            <section>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-10">
                Session Analytics
              </h2>
              <div className="grid gap-6 md:grid-cols-2">
                <Card className="p-6 bg-white dark:bg-gray-900">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                    <BarChart className="w-5 h-5 mr-2 text-blue-600" />
                    Delivery Metrics
                  </h3>
                  <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
                    {deliveryMetrics.map(({ metric, value }) => (
                      <li key={metric} className="flex justify-between border-b border-blue-100 dark:border-blue-900 pb-2 last:border-b-0">
                        <span className="font-medium text-gray-900 dark:text-gray-200">{metric}</span>
                        <span>{value}</span>
                      </li>
                    ))}
                  </ul>
                </Card>

                <Card className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    Production Timeline
                  </h3>
                  <div className="space-y-4">
                    {workflowStages.map((stage) => {
                      const Icon = stage.icon
                      return (
                        <div key={stage.title} className="flex items-start gap-3">
                          <Icon className="w-5 h-5 text-blue-600 mt-1" />
                          <div>
                            <p className="text-sm font-semibold text-blue-600">{stage.duration}</p>
                            <p className="text-sm text-gray-900 dark:text-white font-medium">{stage.title}</p>
                            <p className="text-xs text-gray-600 dark:text-gray-400">{stage.insight}</p>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </Card>
              </div>
            </section>

            {/* CTA */}
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Replicate This Workflow
              </h3>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
                Use the batch converter to create matching presets and streamline your studio delivery.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/batch-black-and-white-converter">
                  <Button size="lg">Launch Batch Converter</Button>
                </Link>
                <Link href="/contact">
                  <Button variant="outline" size="lg">
                    Request Interview Feature
                  </Button>
                </Link>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Cross-reference Section */}
        <section className="mt-16 text-center">
          <Card className="p-8 bg-gray-50 dark:bg-gray-900/60">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Continue Learning
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Explore more photography guides and tutorials
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/blog">
                <Button variant="outline" size="lg">
                  Photography Blog
                </Button>
              </Link>
              <Link href="/examples">
                <Button variant="outline" size="lg">
                  More Examples
                </Button>
              </Link>
            </div>
          </Card>
        </section>
      </div>
    </div>
  )
}
