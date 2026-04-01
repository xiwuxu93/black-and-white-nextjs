import { Metadata } from 'next'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { canonicalUrl } from '@/lib/seo'
import {
  Heart,
  Shield,
  Zap,
  Camera,
  Code,
  Lock,
  Mail,
  Coffee,
  Github,
  ChevronRight
} from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'About Sivan Xu & The Story Behind BWConverter',
  description:
    'Meet Sivan Xu, a frontend expert with 12+ years of experience and a passion for monochrome photography. Learn why I built this privacy-first image tool.',
  keywords: [
    'Sivan Xu developer',
    'frontend expert photographer',
    'why I built bwconverter',
    'privacy-first image processing',
    'independent developer story'
  ],
  alternates: {
    canonical: canonicalUrl('/about')
  },
  openGraph: {
    title: 'Sivan Xu – A Frontend Developer’s Take on Monochrome',
    description:
      'Built by a 12-year frontend veteran and photography enthusiast. Discover why local-first image processing matters.',
    url: canonicalUrl('/about')
  }
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 py-16 md:py-24">
      <div className="container mx-auto px-4 max-w-4xl">
        
        {/* Personal Intro Section */}
        <section className="mb-20">
          <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
            <div className="w-48 h-48 md:w-64 md:h-64 relative flex-shrink-0">
              <div className="absolute inset-0 bg-gray-100 dark:bg-gray-800 rounded-2xl rotate-3"></div>
              <Image
                src="/authors/sivan-lee.jpg"
                alt="Sivan Xu - Founder of BWConverter"
                fill
                className="object-cover rounded-2xl -rotate-3 border-2 border-white dark:border-gray-900 shadow-xl"
              />
            </div>
            <div>
              <Badge className="mb-4" variant="outline">
                12+ Years Frontend Expert & Hobbyist Photographer
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                Hi, I&apos;m Sivan Xu.
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                By day, I&apos;m a professional frontend developer with over a decade of experience building complex web applications. 
                By heart, I&apos;m an enthusiast photographer who finds peace in the deep contrast of black and white imagery.
              </p>
              <p className="text-lg text-gray-500 dark:text-gray-500 mb-8 italic">
                &quot;I built BWConverter at the intersection of my two worlds: technical precision and creative expression.&quot;
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="mailto:support@bwconverter.com">
                  <Button variant="default">
                    <Mail className="w-4 h-4 mr-2" />
                    Contact Me
                  </Button>
                </Link>
                <Link href="/blog">
                  <Button variant="ghost">
                    Check My Tech & Photo Blog
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* The "Why" - Technical & Creative Conflict */}
        <section className="mb-24 space-y-12">
          <div className="border-l-4 border-gray-900 dark:border-gray-100 pl-6 md:pl-10">
            <h2 className="text-3xl font-bold mb-6">
              The Mission: Privacy + Fidelity
            </h2>
            <div className="prose prose-lg dark:prose-invert max-w-none text-gray-600 dark:text-gray-400">
              <p>
                In my 12 years of frontend work, I&apos;ve seen the web move toward constant cloud-dependency. 
                But as a photographer, I hated uploading my high-res files to unknown servers just to apply a simple monochrome filter. 
                Most tools were either slow, invasive, or produced &quot;muddy&quot; grays that lacked tonal depth.
              </p>
              <p>
                I knew I could use modern browser technology to do better. I wanted a tool that reflected my own standards:
              </p>
              <ul className="list-none space-y-4 pl-0 mt-8">
                <li className="flex items-start">
                  <Code className="w-5 h-5 mr-3 mt-1 text-blue-600 flex-shrink-0" />
                  <span><strong>Native Performance:</strong> Using WebAssembly (Rust) to handle pixel-level math at near-native speeds.</span>
                </li>
                <li className="flex items-start">
                  <Lock className="w-5 h-5 mr-3 mt-1 text-green-600 flex-shrink-0" />
                  <span><strong>Pure Privacy:</strong> No images ever leave your browser. As a developer, I designed the code so I literally cannot see your data.</span>
                </li>
                <li className="flex items-start">
                  <Camera className="w-5 h-5 mr-3 mt-1 text-purple-600 flex-shrink-0" />
                  <span><strong>Professional Tones:</strong> I implemented a &quot;Channel Mixer&quot; logic to give photographers real control over luminance, not just desaturation.</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Success Metrics */}
        <section className="mb-24">
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <Card className="p-8 border-none bg-gray-50 dark:bg-gray-900">
              <div className="text-4xl font-bold mb-2">12+</div>
              <p className="text-sm text-gray-500 uppercase tracking-wider">Years Coding Experience</p>
            </Card>
            <Card className="p-8 border-none bg-gray-50 dark:bg-gray-900">
              <div className="text-4xl font-bold mb-2">100%</div>
              <p className="text-sm text-gray-500 uppercase tracking-wider">Private & Local</p>
            </Card>
            <Card className="p-8 border-none bg-gray-50 dark:bg-gray-900">
              <div className="text-4xl font-bold mb-2">0</div>
              <p className="text-sm text-gray-500 uppercase tracking-wider">Cloud Processing</p>
            </Card>
          </div>
        </section>

        {/* Commitment */}
        <section className="mb-24">
          <h2 className="text-3xl font-bold text-center mb-12">My Developer Standards</h2>
          <div className="grid md:grid-cols-2 gap-10">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold flex items-center gap-2">
                <Zap className="w-5 h-5 text-yellow-500" />
                Performance First
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                I optimize for milliseconds. By using WebWorkers, I ensure that processing even 100 images in batch mode doesn&apos;t freeze your UI.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold flex items-center gap-2">
                <Shield className="w-5 h-5 text-blue-500" />
                No Telemetry
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                I don&apos;t use invasive tracking. The only data I care about is your user experience and the quality of the monochrome output.
              </p>
            </div>
          </div>
        </section>

        {/* Connect */}
        <section className="text-center py-16 border-t border-gray-100 dark:border-gray-800">
          <h2 className="text-3xl font-bold mb-6">Let&apos;s Build Together</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-xl mx-auto">
            BWConverter is an independent project. If you have a feature request or just want to talk tech and photography, feel free to reach out.
          </p>
          <div className="flex justify-center gap-6">
            <Link href="https://github.com" className="text-gray-400 hover:text-black dark:hover:text-white transition-colors">
              <Github className="w-8 h-8" />
            </Link>
            <Link href="mailto:support@bwconverter.com" className="text-gray-400 hover:text-blue-600 transition-colors">
              <Mail className="w-8 h-8" />
            </Link>
          </div>
          <div className="mt-12">
            <Link href="/">
              <Button size="lg" className="rounded-full px-10">
                Back to the Converter
              </Button>
            </Link>
          </div>
        </section>
      </div>
    </div>
  )
}
