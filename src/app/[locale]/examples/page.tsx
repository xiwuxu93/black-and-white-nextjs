import type { Metadata } from 'next'
import Link from 'next/link'
import { ExamplesGrid } from '@/components/pages/examples-grid'
import { Breadcrumb } from '@/components/seo/breadcrumb'
import { canonicalUrl, getPageAlternates } from '@/lib/seo'
import { Card } from '@/components/ui/card'
import { getDictionary } from '@/locales'

interface Props {
  params: { locale: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const dict = getDictionary(params.locale)
  const alternates = getPageAlternates('/examples/', params.locale)
  const canonical = alternates.canonical
  return {
    title: dict.examples.metaTitle,
    description: dict.examples.metaDesc,
    alternates,
    openGraph: {
      title: dict.examples.metaTitle,
      description: dict.examples.metaDesc,
      url: canonical
    }
  }
}

export default function ExamplesPage({ params }: Props) {
  const dict = getDictionary(params.locale)
  return (
    <>
        <Breadcrumb items={[{ name: dict.newborn.continueExamples }]} />

        {/* Page title */}
        <header className="article-header">
          <h1>
            {dict.examples.heroTitle}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-8">
            {dict.examples.heroSubtitle}
          </p>
        </header>

        {/* Featured Guides */}
        <section className="article-section">
          <h2>
            {dict.examples.guidesTitle}
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {dict.examples.guideNewbornTitle}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm leading-relaxed">
                {dict.examples.guideNewbornDesc}
              </p>
              <Link href="/newborn-photography-guide" className="inline-flex items-center text-primary-600 dark:text-primary-400 font-medium">
                {dict.examples.guideNewbornLink}
                <span className="sr-only">Newborn photography guide</span>
              </Link>
            </Card>

            <Card className="p-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {dict.examples.guideCompareTitle}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm leading-relaxed">
                {dict.examples.guideCompareDesc}
              </p>
              <Link href="/newborn-photography-guide" className="inline-flex items-center text-primary-600 dark:text-primary-400 font-medium">
                {dict.examples.guideCompareLink}
                <span className="sr-only">Newborn studio case study</span>
              </Link>
            </Card>
          </div>
        </section>

        {/* Photography Education Section */}
        <section className="article-section">
          <h2>
            {dict.examples.eduTitle}
          </h2>
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-600">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                {dict.examples.eduVisionTitle}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {dict.examples.eduVisionDesc}
              </p>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
                {dict.examples.eduVisionBullets.map((bullet: string) => (
                  <li key={bullet}>• {bullet}</li>
                ))}
              </ul>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-600">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                {dict.examples.eduScienceTitle}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {dict.examples.eduScienceDesc}
              </p>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
                {dict.examples.eduScienceBullets.map((bullet: string) => (
                  <li key={bullet}>• {bullet}</li>
                ))}
              </ul>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-600">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                {dict.examples.eduProTitle}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {dict.examples.eduProDesc}
              </p>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
                {dict.examples.eduProBullets.map((bullet: string) => (
                  <li key={bullet}>• {bullet}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Style Analysis Section */}
        <section className="article-section">
          <h2>
            {dict.examples.stylesTitle}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {dict.examples.stylesList.map((styleItem: any, idx: number) => {
              const bgColors = [
                'bg-gray-900',
                'bg-red-900',
                'bg-amber-800',
                'bg-blue-900',
                'bg-purple-900',
                'bg-gray-700'
              ]
              return (
                <div key={idx} className={`${bgColors[idx] || 'bg-gray-900'} text-white rounded-xl p-6`}>
                  <h3 className="text-xl font-semibold mb-4">{styleItem.title}</h3>
                  <p className="text-gray-300 mb-4">
                    {styleItem.desc}
                  </p>
                  <div className="space-y-2 text-sm">
                    <div><strong>Best for:</strong> {styleItem.bestFor}</div>
                    <div><strong>Characteristics:</strong> {styleItem.chars}</div>
                    <div><strong>Pro tip:</strong> {styleItem.tip}</div>
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        {/* Professional Techniques Section */}
        <section className="mb-16 bg-white dark:bg-gray-800 rounded-2xl p-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            {dict.examples.techTitle}
          </h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
                {dict.examples.techCompTitle}
              </h3>
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">{dict.examples.techCompLinesTitle}</h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {dict.examples.techCompLinesDesc}
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">{dict.examples.techCompTextTitle}</h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {dict.examples.techCompTextDesc}
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">{dict.examples.techCompLightTitle}</h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {dict.examples.techCompLightDesc}
                  </p>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
                {dict.examples.techOptTitle}
              </h3>
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">{dict.examples.techOptRangeTitle}</h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {dict.examples.techOptRangeDesc}
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">{dict.examples.techOptContTitle}</h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {dict.examples.techOptContDesc}
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">{dict.examples.techOptMapTitle}</h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {dict.examples.techOptMapDesc}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Example grid */}
        <ExamplesGrid dict={dict} />

        {/* Professional Tips Section */}
        <section className="article-section">
          <h2>
            {dict.examples.tipsTitle}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                {dict.examples.tipsCol1Title}
              </h3>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                {dict.examples.tipsCol1.map((tip: string) => (
                  <li key={tip}>• {tip}</li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                {dict.examples.tipsCol2Title}
              </h3>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                {dict.examples.tipsCol2.map((tip: string) => (
                  <li key={tip}>• {tip}</li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                {dict.examples.tipsCol3Title}
              </h3>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                {dict.examples.tipsCol3.map((tip: string) => (
                  <li key={tip}>• {tip}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>
    </>
  )
}
