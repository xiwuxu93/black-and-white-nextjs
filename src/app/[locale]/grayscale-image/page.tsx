import type { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { canonicalUrl, getPageAlternates } from '@/lib/seo'
import { getDictionary } from '@/locales'
import { GrayscaleConceptWidget } from '@/components/pages/grayscale-concept-widget'
import { BookOpen, Layers, Settings, ShieldAlert, ArrowLeftRight } from 'lucide-react'

interface Props {
  params: { locale: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const dict = getDictionary(params.locale)
  const alternates = getPageAlternates('/grayscale-image/', params.locale)
  const canonical = alternates.canonical
  return {
    title: dict.grayscalePage.metaTitle,
    description: dict.grayscalePage.metaDesc,
    alternates,
    openGraph: {
      title: dict.grayscalePage.metaTitle,
      description: dict.grayscalePage.metaDesc,
      url: canonical
    }
  }
}

export default function GrayscaleImageDefinitionPage({ params }: Props) {
  const dict = getDictionary(params.locale)

  return (
    <div className="container max-w-5xl py-12">
      {/* Header */}
      <header className="text-center mb-12">
        <Badge className="mb-4" variant="secondary">
          <BookOpen className="w-4 h-4 mr-2" />
          {dict.grayscalePage.heroBadge}
        </Badge>
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-6">
          {dict.grayscalePage.heroTitle}
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
          {dict.grayscalePage.heroSubtitle}
        </p>
      </header>

      {/* Concept Interactive Sandbox */}
      <GrayscaleConceptWidget />

      {/* Deep-Dive Article Sections */}
      <div className="prose prose-gray dark:prose-invert max-w-none mt-12 space-y-12">
        {/* Section 1: Definition */}
        <section className="bg-white dark:bg-gray-900 border border-gray-105 dark:border-gray-800 p-8 rounded-3xl">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <Layers className="w-6 h-6 text-primary-500" />
            {dict.grayscalePage.secDefinitionTitle}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
            {dict.grayscalePage.secDefinitionText1}
          </p>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            {dict.grayscalePage.secDefinitionText2}
          </p>
        </section>

        {/* Section 2: Math */}
        <section className="bg-white dark:bg-gray-900 border border-gray-105 dark:border-gray-800 p-8 rounded-3xl">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <Settings className="w-6 h-6 text-primary-500" />
            {dict.grayscalePage.secMathTitle}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
            {dict.grayscalePage.secMathText1}
          </p>
          <div className="bg-gray-50 dark:bg-gray-950 p-6 rounded-2xl border border-gray-100 dark:border-gray-900 font-mono text-sm space-y-3 mb-6">
            <div className="text-primary-600 dark:text-primary-400 font-bold">{dict.grayscalePage.formula709}</div>
            <div className="text-gray-600 dark:text-gray-400">{dict.grayscalePage.formula601}</div>
          </div>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            {dict.grayscalePage.secMathText3}
          </p>
        </section>

        {/* Section 3: Difference */}
        <section className="bg-white dark:bg-gray-900 border border-gray-105 dark:border-gray-800 p-8 rounded-3xl">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <ArrowLeftRight className="w-6 h-6 text-primary-500" />
            {dict.grayscalePage.secDifferenceTitle}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
            {dict.grayscalePage.secDifferenceText1}
          </p>
          
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            {dict.grayscalePage.diffList.map((item: any, idx: number) => (
              <div key={idx} className="bg-gray-50 dark:bg-gray-950 p-6 rounded-2xl border border-gray-100 dark:border-gray-900">
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{item.desc}</p>
              </div>
            ))}
          </div>

          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            {dict.grayscalePage.secDifferenceText2}
          </p>
        </section>

        {/* Section 4: Why in Tech */}
        <section className="bg-white dark:bg-gray-900 border border-gray-105 dark:border-gray-800 p-8 rounded-3xl">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <ShieldAlert className="w-6 h-6 text-primary-500" />
            {dict.grayscalePage.secWhyTitle}
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {dict.grayscalePage.secWhyList.map((item: any, idx: number) => (
              <div key={idx} className="space-y-2">
                <h3 className="font-bold text-gray-900 dark:text-white">{item.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Footer Call-to-action */}
      <footer className="text-center mt-16 pt-8 border-t border-gray-100 dark:border-gray-800">
        <Link href={`/${dict.locale || 'en'}/grayscale-image-converter`}>
          <Button size="lg" className="rounded-2xl">
            {dict.grayscale.heroTitle}
          </Button>
        </Link>
      </footer>
    </div>
  )
}
