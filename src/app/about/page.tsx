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
  Github,
  ChevronRight,
  Terminal
} from 'lucide-react'
import Link from 'next/link'

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
    <>
        
        {/* Intro Section - Removed Western Headshot */}
        <section>
          <div className="flex flex-col gap-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gray-900 text-white mb-2">
              <Terminal className="w-8 h-8" />
            </div>
            <div>
              <Badge className="mb-4" variant="outline">
                12+ Years Frontend Expert & Hobbyist Photographer
              </Badge>
              <h1>
                Hi, I&apos;m Sivan Xu.
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                I am a professional frontend developer based in China with over 12 years of experience building high-performance web systems. 
                Outside of my coding life, I am an enthusiast of monochrome photography, fascinated by the timeless storytelling of black and white tones.
              </p>
              <p className="text-lg text-gray-500 dark:text-gray-500 mb-8 italic">
                &quot;I built BWConverter to bridge the gap between technical privacy and creative freedom.&quot;
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="https://github.com/xiwuxu93/black-and-white-nextjs">
                  <Button variant="default">
                    <Github className="w-4 h-4 mr-2" />
                    View Source on GitHub
                  </Button>
                </Link>
                <Link href="mailto:support@bwconverter.com">
                  <Button variant="outline">
                    <Mail className="w-4 h-4 mr-2" />
                    Get in Touch
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* The "Why" - Technical & Creative Conflict */}
        <section className="article-section">
          <div className="border-l-4 border-gray-900 dark:border-gray-100 pl-6 md:pl-10">
            <h2 className="text-3xl font-bold mb-6">
              The Mission: Privacy + Fidelity
            </h2>
            <div className="prose prose-lg dark:prose-invert max-w-none text-gray-600 dark:text-gray-400">
              <p>
                As a developer, I believe the web should respect user data. I was tired of online tools that forced me 
                to upload my private high-resolution photos to their servers just for a simple grayscale conversion. 
                They were often slow and degraded the tonal quality of my shots.
              </p>
              <p>
                I knew I could leverage modern browser APIs like Canvas and Web Workers to do better.
                I built this tool to be:
              </p>
              <ul className="list-none space-y-4 pl-0 mt-8">
                <li className="flex items-start">
                  <Code className="w-5 h-5 mr-3 mt-1 text-blue-600 flex-shrink-0" />
                  <span><strong>Technically Practical:</strong> Powered by Canvas pixel processing and Web Workers so previews stay responsive.</span>
                </li>
                <li className="flex items-start">
                  <Lock className="w-5 h-5 mr-3 mt-1 text-green-600 flex-shrink-0" />
                  <span><strong>Truly Private:</strong> Everything stays in your browser. I literally cannot see what you process.</span>
                </li>
                <li className="flex items-start">
                  <Camera className="w-5 h-5 mr-3 mt-1 text-purple-600 flex-shrink-0" />
                  <span><strong>Photographer-Friendly:</strong> Designed with a &quot;Channel Mixer&quot; logic to give you real control over light.</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Success Metrics */}
        <section className="article-section">
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <Card className="p-8 border-none bg-gray-50 dark:bg-gray-900">
              <div className="text-4xl font-bold mb-2">12+</div>
              <p className="text-sm text-gray-500 uppercase tracking-wider">Years Frontend Expertise</p>
            </Card>
            <Card className="p-8 border-none bg-gray-50 dark:bg-gray-900">
              <div className="text-4xl font-bold mb-2">100%</div>
              <p className="text-sm text-gray-500 uppercase tracking-wider">Local Processing</p>
            </Card>
            <Card className="p-8 border-none bg-gray-50 dark:bg-gray-900">
              <div className="text-4xl font-bold mb-2">0</div>
              <p className="text-sm text-gray-500 uppercase tracking-wider">Cloud Storage</p>
            </Card>
          </div>
        </section>

        {/* Connect */}
        <section className="article-section text-center">
          <h2 className="text-3xl font-bold mb-6">Open Source & Independent</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-xl mx-auto">
            BWConverter is a side project born from my own needs. The project is open source on GitHub. 
            If you like what I&apos;m doing, feel free to contribute or give it a star.
          </p>
          <div className="flex justify-center gap-6">
            <Link href="https://github.com/xiwuxu93/black-and-white-nextjs" className="text-gray-400 hover:text-black dark:hover:text-white transition-colors">
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
    </>
  )
}
