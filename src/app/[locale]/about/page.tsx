import { Metadata } from 'next'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { canonicalUrl } from '@/lib/seo'
import {
  Camera,
  Code,
  Lock,
  Mail,
  Github,
  Terminal
} from 'lucide-react'
import Link from 'next/link'
import { getDictionary } from '@/locales'

interface Props {
  params: { locale: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const dict = getDictionary(params.locale)
  const canonical = canonicalUrl(`/${params.locale}/about/`)
  return {
    title: dict.about.metaTitle,
    description: dict.about.metaDesc,
    alternates: {
      canonical
    },
    openGraph: {
      title: dict.about.ogTitle,
      description: dict.about.ogDesc,
      url: canonical
    }
  }
}

export default function AboutPage({ params }: Props) {
  const dict = getDictionary(params.locale)
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
                {dict.about.badge}
              </Badge>
              <h1>
                {dict.about.title}
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                {dict.about.intro}
              </p>
              <p className="text-lg text-gray-500 dark:text-gray-500 mb-8 italic">
                {dict.about.quote}
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="https://github.com/xiwuxu93/black-and-white-nextjs">
                  <Button variant="default">
                    <Github className="w-4 h-4 mr-2" />
                    {dict.about.viewGithub}
                  </Button>
                </Link>
                <Link href="mailto:support@bwconverter.com">
                  <Button variant="outline">
                    <Mail className="w-4 h-4 mr-2" />
                    {dict.about.getTouch}
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
              {dict.about.missionTitle}
            </h2>
            <div className="prose prose-lg dark:prose-invert max-w-none text-gray-600 dark:text-gray-400">
              <p>
                {dict.about.missionP1}
              </p>
              <p>
                {dict.about.missionP2}
              </p>
              <ul className="list-none space-y-4 pl-0 mt-8">
                <li className="flex items-start">
                  <Code className="w-5 h-5 mr-3 mt-1 text-blue-600 flex-shrink-0" />
                  <span><strong>{dict.about.bullet1Title}</strong> {dict.about.bullet1Desc}</span>
                </li>
                <li className="flex items-start">
                  <Lock className="w-5 h-5 mr-3 mt-1 text-green-600 flex-shrink-0" />
                  <span><strong>{dict.about.bullet2Title}</strong> {dict.about.bullet2Desc}</span>
                </li>
                <li className="flex items-start">
                  <Camera className="w-5 h-5 mr-3 mt-1 text-purple-600 flex-shrink-0" />
                  <span><strong>{dict.about.bullet3Title}</strong> {dict.about.bullet3Desc}</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Success Metrics */}
        <section className="article-section">
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <Card className="p-8 border-none bg-gray-50 dark:bg-gray-900">
              <div className="text-4xl font-bold mb-2">{dict.about.metric1Value}</div>
              <p className="text-sm text-gray-500 uppercase tracking-wider">{dict.about.metric1Label}</p>
            </Card>
            <Card className="p-8 border-none bg-gray-50 dark:bg-gray-900">
              <div className="text-4xl font-bold mb-2">{dict.about.metric2Value}</div>
              <p className="text-sm text-gray-500 uppercase tracking-wider">{dict.about.metric2Label}</p>
            </Card>
            <Card className="p-8 border-none bg-gray-50 dark:bg-gray-900">
              <div className="text-4xl font-bold mb-2">{dict.about.metric3Value}</div>
              <p className="text-sm text-gray-500 uppercase tracking-wider">{dict.about.metric3Label}</p>
            </Card>
          </div>
        </section>

        {/* Connect */}
        <section className="article-section text-center">
          <h2 className="text-3xl font-bold mb-6">{dict.about.connectTitle}</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-xl mx-auto">
            {dict.about.connectDesc}
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
            <Link href={`/${dict.locale || 'en'}/`}>
              <Button size="lg" className="rounded-full px-10">
                {dict.about.backConverter}
              </Button>
            </Link>
          </div>
        </section>
    </>
  )
}
