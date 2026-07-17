import type { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ConverterExperience } from '@/components/home/converter-experience'
import { canonicalUrl } from '@/lib/seo'
import { StructuredData } from '@/components/seo/structured-data'
import { getDictionary } from '@/locales'

interface Props {
  params: { locale: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const dict = getDictionary(params.locale)
  const canonical = canonicalUrl(`/${params.locale}/invert-image-colors/`)
  return {
    title: dict.invert.metaTitle,
    description: dict.invert.metaDesc,
    alternates: {
      canonical
    },
    openGraph: {
      title: dict.invert.metaTitle,
      description: dict.invert.metaDesc,
      url: canonical
    }
  }
}

function InvertSections({ dict }: { dict: any }) {
  return (
    <>
        <section className="converter-marketing article-section">
          <h2>
            {dict.invert.whyTitle}
          </h2>
          <div className="grid md:grid-cols-3 gap-8 text-gray-600 dark:text-gray-300">
            {dict.invert.whyGrid.map((item: any, idx: number) => (
              <div key={idx}>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {item.title}
                </h3>
                <p>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="article-section">
          <div className="max-w-3xl mx-auto text-left">
            <h2>
              {dict.invert.scienceTitle}
            </h2>
            <div className="space-y-4 text-gray-600 dark:text-gray-300">
              <p>
                {dict.invert.scienceDesc}
              </p>
              <p className="bg-gray-100 dark:bg-gray-800 px-4 py-3 rounded-xl text-center font-mono text-sm border border-gray-200/50 dark:border-gray-700/50">
                {dict.invert.scienceFormula}
              </p>
              <ul className="list-disc pl-6 space-y-2">
                {dict.invert.scienceBullets.map((bullet: string) => (
                  <li key={bullet}><strong>{bullet.split(' becomes ')[0]}</strong> becomes <strong>{bullet.split(' becomes ')[1]}</strong></li>
                ))}
              </ul>
              <p>
                {dict.invert.scienceP3}
              </p>
            </div>
          </div>
        </section>

        <section className="article-section">
          <h2>
            {dict.invert.faqTitle}
          </h2>
          <div className="grid gap-6 md:grid-cols-2 text-gray-600 dark:text-gray-300">
             {dict.invert.faqQuestions.map((faq: any, index: number) => (
              <div key={index}>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{faq.q}</h3>
                <p>{faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="article-section">
          <div className="max-w-3xl mx-auto text-center">
            <h2>
              More Tools
            </h2>
            <div className="flex flex-wrap justify-center gap-4 mt-6">
              <Link href={`/${dict.locale || 'en'}/`}>
                <Button variant="outline" size="lg">
                  Black & White Converter
                </Button>
              </Link>
              <Link href="/logo-to-black-and-white">
                <Button variant="outline" size="lg">
                  Logo Converter
                </Button>
              </Link>
            </div>
          </div>
        </section>
    </>
  )
}

export default function InvertImageColorsPage({ params }: Props) {
  const dict = getDictionary(params.locale)
  const faqSchema = {
    questions: dict.invert.faqQuestions.map((faq: any) => ({
      question: faq.q,
      answer: faq.a
    }))
  }

  return (
    <>
      <StructuredData type="faq" data={faqSchema} />
      <ConverterExperience
        heroBadgeText={dict.invert.heroBadge}
        heroTitle={dict.invert.heroTitle}
        heroSubtitle={dict.invert.heroSubtitle}
        heroFeatureBadges={[...dict.invert.badges]}
        defaultFilters={{
          invert: true,
          grayscale: false
        }}
        mode="invert"
        hideAdvancedControls={true}
        hideBottomFeatures={true}
      />
      <InvertSections dict={dict} />
    </>
  )
}
