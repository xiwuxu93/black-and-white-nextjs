import type { Metadata } from 'next'
import Link from 'next/link'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ConverterExperience } from '@/components/home/converter-experience'
import { canonicalUrl, getPageAlternates } from '@/lib/seo'
import { StructuredData } from '@/components/seo/structured-data'
import { Layers, FileCode, CheckCircle, Info } from 'lucide-react'
import { getDictionary } from '@/locales'

interface Props {
  params: { locale: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const dict = getDictionary(params.locale)
  const alternates = getPageAlternates('/logo-to-black-and-white/', params.locale)
  const canonical = alternates.canonical
  return {
    title: dict.logo.metaTitle,
    description: dict.logo.metaDesc,
    alternates,
    openGraph: {
      title: dict.logo.metaTitle,
      description: dict.logo.metaDesc,
      url: canonical
    }
  }
}

function LogoToBwSections({ dict }: { dict: any }) {
  return (
    <>
        {/* Deep Dive: Technical Logic */}
        <section className="converter-marketing article-section">
          <div className="max-w-3xl mb-12">
            <h2>
              {dict.logo.howTitle}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              {dict.logo.howDesc}
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-12 text-gray-600 dark:text-gray-400">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                  <Layers className="w-5 h-5 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{dict.logo.howPreservationTitle}</h3>
              </div>
              <p>
                {dict.logo.howPreservationDesc}
              </p>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                  <FileCode className="w-5 h-5 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{dict.logo.howEngineTitle}</h3>
              </div>
              <p>
                {dict.logo.howEngineDesc}
              </p>
            </div>
          </div>
        </section>

        {/* Brand Management Use Cases */}
        <section>
          <h2>
            {dict.logo.usecasesTitle}
          </h2>
          <div className="grid md:grid-cols-3 gap-8 text-gray-600 dark:text-gray-400">
            {dict.logo.usecases.map((usecase: any, idx: number) => (
              <Card key={idx} className="p-8 bg-gray-50 dark:bg-gray-900 border-none">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <CheckCircle className="w-5 h-5 mr-2 text-green-600" />
                  {usecase.title}
                </h3>
                <p className="text-sm leading-relaxed">
                  {usecase.desc}
                </p>
              </Card>
            ))}
          </div>
        </section>

        {/* Designer Tips */}
        <section className="article-section">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-white dark:bg-gray-800 rounded-full shadow-sm">
              <Info className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{dict.logo.tipTitle}</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-2xl">
                {dict.logo.tipDesc}
              </p>
              <Link href={`/${dict.locale || 'en'}/`}>
                <Button variant="outline">{dict.logo.tipBtn}</Button>
              </Link>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="article-section">
          <h2>
            {dict.logo.faqTitle}
          </h2>
          <div className="grid gap-8 md:grid-cols-2 text-gray-600 dark:text-gray-400">
             {dict.logo.faqQuestions.map((faq: any, index: number) => (
              <div key={index} className="space-y-2">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{faq.q}</h3>
                <p className="text-sm">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="article-section text-center">
          <h2>
            {dict.logo.bulkTitle}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            {dict.logo.bulkDesc}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href={`/${dict.locale || 'en'}/batch-black-and-white-converter`}>
              <Button size="lg" className="px-10">
                {dict.logo.bulkBtn}
              </Button>
            </Link>
            <Link href={`/${dict.locale || 'en'}/`}>
              <Button variant="outline" size="lg">
                {dict.logo.bulkBtnHome}
              </Button>
            </Link>
          </div>
        </section>
    </>
  )
}

export default function LogoToBlackAndWhitePage({ params }: Props) {
  const dict = getDictionary(params.locale)
  const faqSchema = {
    questions: dict.logo.faqQuestions.map((faq: any) => ({
      question: faq.q,
      answer: faq.a
    }))
  }

  return (
    <>
      <StructuredData type="faq" data={faqSchema} />
      <ConverterExperience
        heroBadgeText={dict.logo.heroBadge}
        heroTitle={dict.logo.heroTitle}
        heroSubtitle={dict.logo.heroSubtitle}
        heroFeatureBadges={[...dict.logo.badges]}
        uploadAccept=".png,image/png,.svg,image/svg+xml"
        uploadSupportText={dict.logo.uploadSupport}
        uploadAllowedExtensions={[
          'png',
          'svg'
        ]}
        uploadInvalidFileMessage={dict.logo.invalidMessage}
      />
      <LogoToBwSections dict={dict} />
    </>
  )
}
