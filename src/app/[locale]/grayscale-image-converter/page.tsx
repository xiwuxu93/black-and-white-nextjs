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
  const alternates = getPageAlternates('/grayscale-image-converter/', params.locale)
  const canonical = alternates.canonical
  return {
    title: dict.grayscale.metaTitle,
    description: dict.grayscale.metaDesc,
    alternates,
    openGraph: {
      title: dict.grayscale.metaTitle,
      description: dict.grayscale.metaDesc,
      url: canonical
    }
  }
}

function GrayscaleSections({ dict }: { dict: any }) {
  return (
    <>
      <section className="converter-marketing article-section">
        <h2>
          {dict.grayscale.whyTitle}
        </h2>
        <div className="grid md:grid-cols-3 gap-8 text-gray-600 dark:text-gray-300">
          {dict.grayscale.whyGrid.map((item: any, idx: number) => (
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

      <section className="article-section max-w-3xl mx-auto my-12 p-8 bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-3xl text-center">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
          {dict.grayscale.guideTitle}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
          {dict.grayscale.guideDesc}
        </p>
        <Link href={`/${dict.locale || 'en'}/grayscale-image`}>
          <Button variant="default" className="rounded-2xl px-6">
            {dict.grayscale.btnGuide}
          </Button>
        </Link>
      </section>

      <section className="article-section">
        <h2>
          {dict.grayscale.faqTitle}
        </h2>
        <div className="grid gap-6 md:grid-cols-2 text-gray-600 dark:text-gray-300">
           {dict.grayscale.faqQuestions.map((faq: any, index: number) => (
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
            {dict.grayscale.moreToolsTitle}
          </h2>
          <div className="flex flex-wrap justify-center gap-4 mt-6">
            <Link href={`/${dict.locale || 'en'}/`}>
              <Button variant="outline" size="lg">
                {dict.grayscale.btnBw}
              </Button>
            </Link>
            <Link href={`/${dict.locale || 'en'}/convert-pdf-to-black-and-white`}>
              <Button variant="outline" size="lg">
                {dict.grayscale.btnPdf}
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}

export default function GrayscaleImageConverterPage({ params }: Props) {
  const dict = getDictionary(params.locale)
  const faqSchema = {
    questions: dict.grayscale.faqQuestions.map((faq: any) => ({
      question: faq.q,
      answer: faq.a
    }))
  }

  return (
    <>
      <StructuredData type="faq" data={faqSchema} />
      <ConverterExperience
        heroBadgeText={dict.grayscale.heroBadge}
        heroTitle={dict.grayscale.heroTitle}
        heroSubtitle={dict.grayscale.heroSubtitle}
        heroFeatureBadges={[...dict.grayscale.badges]}
        defaultFilters={{
          grayscale: true,
          invert: false
        }}
        mode="grayscale"
      />
      <GrayscaleSections dict={dict} />
    </>
  )
}
