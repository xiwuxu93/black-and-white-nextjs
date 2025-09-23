import { Metadata } from 'next'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Heart, Camera, Baby, Palette, Download, Sparkles } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { Breadcrumb } from '@/components/seo/breadcrumb'
import { canonicalUrl } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Newborn Black and White Images - Beautiful Baby Photography | Free Converter',
  description: 'Create stunning newborn black and white images with our free online converter. Transform your baby photos into timeless monochrome masterpieces with professional quality.',
  keywords: ['newborn black and white images', 'baby black and white photos', 'newborn photography', 'black and white baby pictures', 'monochrome baby photos'],
  openGraph: {
    title: 'Newborn Black and White Images - Beautiful Baby Photography',
    description: 'Transform your precious newborn photos into stunning black and white images with our professional-grade converter.',
    url: canonicalUrl('/newborn-black-and-white-images'),
    images: ['/black-and-white-image.png']
  },
  alternates: {
    canonical: canonicalUrl('/newborn-black-and-white-images')
  }
}

export default function NewbornBlackAndWhiteImagesPage() {
  const tips = [
    {
      icon: Camera,
      title: "Use Everyday Light",
      description: "Open curtains and switch off overhead lamps to wrap your baby in gentle window light."
    },
    {
      icon: Heart,
      title: "Capture Real Moments",
      description: "Focus on cuddles, yawns, and tiny expressions to tell an intimate family story."
    },
    {
      icon: Sparkles,
      title: "Hide Color Distractions",
      description: "Convert colorful blankets and toys to monochrome for a calm, cohesive gallery."
    },
    {
      icon: Palette,
      title: "Highlight Texture",
      description: "Black & white draws attention to tiny fingers, soft hair, and the texture of knit wraps."
    }
  ]

  const examples = [
    {
      title: "Morning Snuggles",
      description: "Photograph skin-to-skin cuddles near the bedroom window for dreamy tones."
    },
    {
      title: "Tiny Details",
      description: "Use macro mode on your phone to capture eyelashes, button noses, and toes."
    },
    {
      title: "Family Connection",
      description: "Ask siblings to hold hands with the baby for authentic storytelling portraits."
    },
    {
      title: "Lifestyle Moments",
      description: "Document everyday routines like feeding or rocking to sleep in classic monochrome."
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <Breadcrumb items={[
          { name: 'Photography', url: '/examples' },
          { name: 'Newborn Black and White Images' }
        ]} />
        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="mb-4" variant="secondary">
            <Baby className="w-4 h-4 mr-2" />
            Newborn Photography
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Newborn Black and White Images
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-8">
            Transform your precious newborn photos into timeless black and white masterpieces. 
            Create stunning monochrome baby images that capture pure emotion and innocence.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/">
              <Button size="lg" className="bg-pink-600 hover:bg-pink-700">
                <Camera className="w-4 h-4 mr-2" />
                Convert Your Baby Photos
              </Button>
            </Link>
            <Link href="/batch">
              <Button variant="outline" size="lg">
                <Download className="w-4 h-4 mr-2" />
                Batch Convert Photos
              </Button>
            </Link>
          </div>
        </div>

        {/* Why Choose Black and White for Newborns */}
        <section className="mb-16">
          <Card className="p-8 bg-gradient-to-r from-pink-100 to-purple-100 dark:from-pink-900/20 dark:to-purple-900/20 border-pink-200 dark:border-pink-800">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-8">
              Why Black and White is Perfect for Newborn Photography
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {tips.map((tip, index) => {
                const Icon = tip.icon
                return (
                  <div key={index} className="text-center">
                    <div className="w-12 h-12 bg-pink-100 dark:bg-pink-900 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-6 h-6 text-pink-600 dark:text-pink-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                      {tip.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      {tip.description}
                    </p>
                  </div>
                )
              })}
            </div>
          </Card>
        </section>

        {/* Popular Newborn Photography Styles */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-12">
            Popular Newborn Black and White Photography Styles
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {examples.map((example, index) => (
              <Card key={index} className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  {example.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {example.description}
                </p>
                <div className="grid grid-cols-2 gap-2">
                  <div className="text-center">
                    <div className="relative w-full h-24">
                      <Image
                        src="https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=400&q=80"
                        alt="Before newborn photo"
                        fill
                        className="rounded-lg object-cover"
                        sizes="(max-width: 768px) 50vw, 200px"
                      />
                    </div>
                    <span className="text-xs text-gray-500">Original</span>
                  </div>
                  <div className="text-center">
                    <div className="relative w-full h-24">
                      <Image
                        src="https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=400&q=80&sat=-100"
                        alt="Black and white newborn"
                        fill
                        className="rounded-lg object-cover"
                        sizes="(max-width: 768px) 50vw, 200px"
                      />
                    </div>
                    <span className="text-xs text-gray-500">Black & White</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Tips for Perfect Newborn B&W Photos */}
        <section className="mb-16">
          <Card className="p-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-8">
              Expert Tips for Perfect Newborn Black and White Images
            </h2>
            <div className="space-y-6">
              <div className="border-l-4 border-pink-500 pl-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  1. Schedule Around Naps
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Photograph your baby right after a feeding when they are naturally sleepy. Relaxed poses feel safer and look more authentic in black & white.
                </p>
              </div>
              
              <div className="border-l-4 border-pink-500 pl-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  2. Build a Simple Home Studio
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Lay a neutral blanket on the bed, turn off mixed lighting, and pull sheer curtains for flattering, even illumination.
                </p>
              </div>
              
              <div className="border-l-4 border-pink-500 pl-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  3. Style With Texture Layers
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Combine knitted wraps, muslin swaddles, and wicker baskets. Monochrome conversion amplifies the tactile detail of each material.
                </p>
              </div>
              
              <div className="border-l-4 border-pink-500 pl-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  4. Include Everyday Storytelling
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Photograph diaper changes, gently holding feet, or rocking to sleep. Those raw moments become artistic once converted to black & white.
                </p>
              </div>
            </div>
          </Card>
        </section>

        {/* How to Convert Guide */}
        <section className="mb-16">
          <Card className="p-8 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-200 dark:border-blue-800">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-8">
              How to Convert Your Newborn Photos to Black and White
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">1</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Upload Your Photo</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Upload your newborn photo in any format (JPG, PNG, WebP). Our converter handles all common image formats.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">2</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Choose a Style</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Select from our professional presets: Soft (perfect for newborns), Vintage, or Dramatic for artistic effects.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">3</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Download & Share</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Download your beautiful black and white newborn image and share with family or print for your baby book.
                </p>
              </div>
            </div>
          </Card>
        </section>

        {/* Call to Action */}
        <div className="text-center">
          <Card className="p-8 bg-gradient-to-r from-pink-600 to-purple-600 text-white">
            <h2 className="text-3xl font-bold mb-4">
              Transform Your Newborn Photos Today
            </h2>
            <p className="text-xl text-pink-100 mb-6 max-w-2xl mx-auto">
              Create beautiful, timeless black and white images of your precious newborn. 
              Perfect for announcements, nursery wall art, or family keepsakes.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/">
                <Button size="lg" className="bg-white text-pink-600 hover:bg-gray-100">
                  <Camera className="w-4 h-4 mr-2" />
                  Start Converting Now
                </Button>
              </Link>
              <Link href="/how-to-use">
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-pink-600">
                  Learn More
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
