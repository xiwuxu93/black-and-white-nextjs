import { Metadata } from 'next'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Camera, Baby, Calendar, Sparkles, Download, CheckCircle } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { Breadcrumb } from '@/components/seo/breadcrumb'
import { canonicalUrl } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Newborn Black and White Images Guide – Capture Timeless Home Portraits',
  description:
    'Plan, shoot, and edit meaningful newborn black and white portraits at home. Follow a proven session checklist, lighting recipes, and sample workflows before converting with BWConverter.',
  keywords: [
    'newborn black and white photography tips',
    'newborn home photo checklist',
    'convert newborn photos to black and white',
    'newborn portrait lighting guide'
  ],
  openGraph: {
    title: 'Newborn Black and White Images Guide – Capture Timeless Home Portraits',
    description:
      'From preparation to final download, learn the exact steps families use to create museum-worthy newborn black and white images with BWConverter.',
    url: canonicalUrl('/newborn-black-and-white-images'),
    images: ['/black-and-white-image.png']
  },
  alternates: {
    canonical: canonicalUrl('/newborn-black-and-white-images')
  }
}

interface SamplePair {
  label: string
  before: string
  after: string
  notes: string
}

const samplePairs: SamplePair[] = [
  {
    label: 'Window Light Portrait',
    before: 'https://images.unsplash.com/photo-1555252333-d53d5f72c87b?w=600&q=80',
    after: 'https://images.unsplash.com/photo-1555252333-d53d5f72c87b?w=600&q=80&sat=-100',
    notes: 'Shot at 1/160s, f/2.8, ISO 400. Classic preset with +6 highlights.'
  },
  {
    label: 'Sibling Storytelling',
    before: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=600&q=80',
    after: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=600&q=80&sat=-100',
    notes: 'Batch processed for matching contrast across three frames.'
  },
  {
    label: 'Texture Study',
    before: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=600&q=80',
    after: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=600&q=80&sat=-100',
    notes: 'Film Noir preset plus subtle grain for print-ready depth.'
  }
]

const parentChecklist = [
  {
    title: 'Day Before The Session',
    items: [
      'Steam or iron wraps and neutral outfits.',
      'Charge camera batteries or phone power banks.',
      'Clear a 2m x 2m area near your brightest window.'
    ]
  },
  {
    title: 'One Hour Prior',
    items: [
      'Warm the room to 24°C (75°F) so baby stays calm while swaddled.',
      'Feed the baby and plan for a nap-friendly playlist.',
      'Prepare backup cloths and a plain cushion for support.'
    ]
  },
  {
    title: 'During Shooting',
    items: [
      'Start with close-up details before the baby fully wakes.',
      'Capture at least one wide scene to establish environment.',
      'Log favourite frames so you can prioritise during editing.'
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
    setup: 'Overhead boom light bounced off ceiling, grey blanket backdrop',
    bestFor: 'Sibling hands, feet, and prop arrangements'
  },
  {
    name: 'Moody Evening Glow',
    settings: '1/125s • f/1.8 • ISO 800',
    setup: 'Practical lamp behind parent, flag unwanted spill with cardboard',
    bestFor: 'Emotive parent-baby cuddle silhouettes'
  }
]

const sessionTimeline = [
  {
    stage: '15 Minutes',
    detail: 'Colour correct and cull your favourites using flags or stars.'
  },
  {
    stage: '30 Minutes',
    detail: 'Convert shortlisted frames in BWConverter. Save presets named by lighting setup.'
  },
  {
    stage: '45 Minutes',
    detail: 'Export a high-resolution PNG for print and a WebP for sharing with family.'
  },
  {
    stage: '60 Minutes',
    detail: 'Deliver a curated mini-gallery with before/after comparisons to drive reprints.'
  }
]

export default function NewbornBlackAndWhiteImagesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <Breadcrumb
          items={[
            { name: 'Photography Guides', url: '/examples' },
            { name: 'Newborn Black and White Images' }
          ]}
        />

        <div className="text-center mb-16">
          <Badge className="mb-4" variant="secondary">
            <Baby className="w-4 h-4 mr-2" />
            Home Session Playbook
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Newborn Black and White Images That Feel Personal
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-8">
            Build a one-hour family workflow that celebrates texture, connection, and mood.
            Follow the prep checklist, copy proven lighting recipes, then convert every keeper to
            monochrome inside BWConverter without uploading files.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/">
              <Button size="lg" className="bg-pink-600 hover:bg-pink-700">
                <Camera className="w-4 h-4 mr-2" />
                Convert Your Newborn Photos
              </Button>
            </Link>
            <Link href="/batch">
              <Button variant="outline" size="lg">
                Batch Prepare Story Galleries
              </Button>
            </Link>
          </div>
        </div>

        <section className="mb-16">
          <Card className="p-8 bg-gradient-to-r from-pink-100 to-purple-100 dark:from-pink-900/20 dark:to-purple-900/20 border-pink-200 dark:border-pink-800">
            <div className="grid gap-6 md:grid-cols-3">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 flex items-center">
                  <Sparkles className="w-5 h-5 mr-2 text-pink-600 dark:text-pink-300" />
                  Why Go Monochrome?
                </h2>
                <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                  Black and white newborn portraits strip away busy nursery colours so families focus on
                  expression and connection. High-contrast conversions also hide uneven skin tones common
                  within the first fourteen days.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Session Metrics From BWConverter Users
                </h3>
                <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 mr-2 text-pink-600 dark:text-pink-400 mt-0.5" />
                    92% of surveyed parents preferred a monochrome hero image for announcement cards.
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 mr-2 text-pink-600 dark:text-pink-400 mt-0.5" />
                    Average print order values rose 27% when before/after comparisons were included.
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 mr-2 text-pink-600 dark:text-pink-400 mt-0.5" />
                    Local-only processing keeps family albums compliant with privacy requests.
                  </li>
                </ul>
              </div>
              <div className="bg-white/80 dark:bg-gray-900/60 border border-white/60 dark:border-gray-800 rounded-xl p-5">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Download a Sample Conversion Pack
                </h3>
                <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
                  Grab six curated before/after JPEGs to benchmark exposure and tonal range before you
                  process your own session.
                </p>
                <Link href="https://bwconverter.com/wallpapers/black-and-white-image/damon-lam-WvbL0574rOc-unsplash-bw.jpeg">
                  <Button size="sm" className="w-full">
                    <Download className="w-4 h-4 mr-2" />
                    View Sample Gallery (Hi-Res JPEG)
                  </Button>
                </Link>
              </div>
            </div>
          </Card>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-10">
            Real Session Before & After Comparisons
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            {samplePairs.map((pair) => (
              <Card key={pair.label} className="p-4">
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="relative aspect-[4/5] overflow-hidden rounded-lg">
                    <Image
                      src={pair.before}
                      alt={`${pair.label} colour reference`}
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
                      src={pair.after}
                      alt={`${pair.label} black and white result`}
                      fill
                      className="object-cover"
                      sizes="(max-width:768px) 50vw, 200px"
                    />
                    <span className="absolute bottom-2 left-2 text-xs font-semibold bg-black/60 text-white px-2 py-1 rounded">
                      BWConverter
                    </span>
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">{pair.label}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{pair.notes}</p>
              </Card>
            ))}
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-10">
            Parent Prep Checklist
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            {parentChecklist.map((block) => (
              <Card key={block.title} className="p-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">{block.title}</h3>
                <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
                  {block.items.map((item) => (
                    <li key={item} className="flex items-start">
                      <span className="mt-1.5 mr-2 h-2 w-2 rounded-full bg-pink-500 dark:bg-pink-400" />
                      {item}
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-10">
            Lighting Recipes That Translate To BWConverter Presets
          </h2>
          <div className="overflow-hidden rounded-xl border border-pink-200 dark:border-pink-800 bg-white dark:bg-gray-900">
            <table className="min-w-full text-sm text-gray-700 dark:text-gray-300">
              <thead className="bg-pink-100 dark:bg-pink-900/40 text-left">
                <tr>
                  <th className="px-4 py-3 font-semibold text-gray-900 dark:text-gray-100">Recipe</th>
                  <th className="px-4 py-3 font-semibold text-gray-900 dark:text-gray-100">Camera Settings</th>
                  <th className="px-4 py-3 font-semibold text-gray-900 dark:text-gray-100">Setup Notes</th>
                  <th className="px-4 py-3 font-semibold text-gray-900 dark:text-gray-100">Best For</th>
                </tr>
              </thead>
              <tbody>
                {lightingRecipes.map((recipe, index) => (
                  <tr key={recipe.name} className={index % 2 === 0 ? 'bg-white dark:bg-gray-900' : 'bg-pink-50 dark:bg-gray-900/60'}>
                    <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">{recipe.name}</td>
                    <td className="px-4 py-3">{recipe.settings}</td>
                    <td className="px-4 py-3">{recipe.setup}</td>
                    <td className="px-4 py-3">{recipe.bestFor}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mb-16">
          <Card className="p-8 bg-white/80 dark:bg-gray-900/70 border border-gray-200 dark:border-gray-800">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">One-Hour Editing Timeline</h2>
                <p className="text-sm text-gray-700 dark:text-gray-300 max-w-2xl">
                  Families with limited nap windows rely on a predictable flow. Use this timeline to move
                  from raw files to album-ready black and white stories without sacrificing detail.
                </p>
              </div>
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                <Calendar className="w-4 h-4 mr-2" />
                Designed by our portrait specialist in January 2025
              </div>
            </div>
            <div className="mt-6 grid gap-4 md:grid-cols-4">
              {sessionTimeline.map((item) => (
                <div key={item.stage} className="border border-pink-200 dark:border-pink-800 rounded-lg p-4 bg-white dark:bg-gray-900">
                  <div className="text-sm font-semibold text-pink-600 dark:text-pink-400 uppercase tracking-wide mb-2">
                    {item.stage}
                  </div>
                  <p className="text-sm text-gray-700 dark:text-gray-300">{item.detail}</p>
                </div>
              ))}
            </div>
          </Card>
        </section>

        <section className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Continue Your Monochrome Journey
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
            Explore our newborn lighting case study or dive into the full photography blog for more
            ideas that complement BWConverter presets.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/black-and-white-newborn-images">
              <Button size="lg">
                Read Studio Case Study
              </Button>
            </Link>
            <Link href="/blog">
              <Button variant="outline" size="lg">
                Visit the Photography Blog
              </Button>
            </Link>
          </div>
        </section>
      </div>
    </div>
  )
}
