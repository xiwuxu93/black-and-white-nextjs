import type { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ConverterExperience } from '@/components/home/converter-experience'
import { canonicalUrl, getPageAlternates } from '@/lib/seo'
import { StructuredData } from '@/components/seo/structured-data'
import { getDictionary } from '@/locales'

interface Props {
  params: { locale: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const dict = getDictionary(params.locale)
  const alternates = getPageAlternates('/sepia-filter/', params.locale)
  const canonical = alternates.canonical
  return {
    title: dict.sepia.metaTitle,
    description: dict.sepia.metaDesc,
    alternates,
    openGraph: {
      title: dict.sepia.metaTitle,
      description: dict.sepia.metaDesc,
      url: canonical
    }
  }
}

function SepiaSections({ dict }: { dict: any }) {
  return (
    <>
      <section className="converter-marketing article-section">
        <h2>{dict.sepia.whyTitle}</h2>
        <div className="grid md:grid-cols-3 gap-8 text-gray-600 dark:text-gray-300">
          {dict.sepia.whyGrid.map((item: any, idx: number) => (
            <div key={idx}>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {idx + 1}. {item.title}
              </h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="article-section">
        <div className="max-w-3xl mx-auto text-left">
          <h2>{dict.sepia.scienceTitle}</h2>
          <div className="space-y-4 text-gray-600 dark:text-gray-300">
            <p>{dict.sepia.scienceDesc}</p>
            <p className="bg-gray-100 dark:bg-gray-800 px-4 py-3 rounded-xl text-center font-mono text-sm border border-gray-200/50 dark:border-gray-700/50">
              {dict.sepia.scienceFormula}
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>For Red: <code>R_new = 0.393*R + 0.769*G + 0.189*B</code></li>
              <li>For Green: <code>G_new = 0.349*R + 0.686*G + 0.168*B</code></li>
              <li>For Blue: <code>B_new = 0.272*R + 0.534*G + 0.131*B</code></li>
            </ul>
          </div>
        </div>
      </section>

      <section className="article-section">
        <h2>{dict.sepia.faqTitle}</h2>
        <div className="grid gap-6 md:grid-cols-2 text-gray-600 dark:text-gray-300">
          {dict.sepia.faqQuestions.map((faq: any, index: number) => (
            <div key={index}>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{faq.q}</h3>
              <p>{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="article-section">
        <div className="max-w-3xl mx-auto text-center">
          <h2>More Conversion Tools</h2>
          <div className="flex flex-wrap justify-center gap-4 mt-6">
            <Link href={`/${dict.locale || 'en'}/`}>
              <Button variant="outline" size="lg">
                Black & White Converter
              </Button>
            </Link>
            <Link href={`/${dict.locale || 'en'}/logo-to-black-and-white`}>
              <Button variant="outline" size="lg">
                Logo Converter
              </Button>
            </Link>
            <Link href={`/${dict.locale || 'en'}/convert-pdf-to-black-and-white`}>
              <Button variant="outline" size="lg">
                PDF Converter
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}

export default function SepiaFilterPage({ params }: Props) {
  const dict = getDictionary(params.locale)
  const faqSchema = {
    questions: dict.sepia.faqQuestions.map((faq: any) => ({
      question: faq.q,
      answer: faq.a
    }))
  }

  return (
    <>
      <StructuredData type="faq" data={faqSchema} />
      <ConverterExperience
        heroBadgeText={dict.sepia.heroBadge}
        heroTitle={dict.sepia.heroTitle}
        heroSubtitle={dict.sepia.heroSubtitle}
        heroFeatureBadges={[...dict.sepia.badges]}
        defaultFilters={{
          sepia: 80,
          grayscale: true
        }}
        isLandingPage={true}
        hideAdvancedControls={false}
        hideBottomFeatures={true}
      />
      <SepiaSections dict={dict} />
    </>
  )
}
