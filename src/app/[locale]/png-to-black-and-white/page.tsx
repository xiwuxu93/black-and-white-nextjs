import type { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ConverterExperience } from '@/components/home/converter-experience'
import { getPageAlternates } from '@/lib/seo'
import { StructuredData } from '@/components/seo/structured-data'
import { getDictionary } from '@/locales'

interface Props {
  params: { locale: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const dict = getDictionary(params.locale)
  const alternates = getPageAlternates('/png-to-black-and-white/', params.locale)
  const canonical = alternates.canonical
  return {
    title: dict.png.metaTitle,
    description: dict.png.metaDesc,
    alternates,
    openGraph: {
      title: dict.png.metaTitle,
      description: dict.png.metaDesc,
      url: canonical
    }
  }
}

function PngSections({ dict }: { dict: any }) {
  return (
    <>
      {/* 3 Key Advantages */}
      <section className="converter-marketing article-section">
        <h2>{dict.png.whyTitle}</h2>
        <div className="grid md:grid-cols-3 gap-8 text-gray-600 dark:text-gray-300">
          {dict.png.whyGrid.map((item: any, idx: number) => (
            <div key={idx} className="p-6 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-primary-600 dark:text-primary-400 font-bold">
                {idx + 1}
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                {item.title}
              </h3>
              <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 3 Step Tutorial */}
      <section className="article-section">
        <h2>{dict.png.howToTitle}</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {dict.png.howToSteps.map((step: any) => (
            <div key={step.num} className="flex flex-col items-center text-center p-6 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm">
              <span className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 text-blue-700 font-bold text-xl mb-4 dark:bg-blue-900/30 dark:text-blue-400">
                {step.num}
              </span>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-2">
                {step.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Guide Content */}
      <section className="article-section">
        <div className="max-w-3xl mx-auto text-left space-y-4 text-gray-600 dark:text-gray-300">
          <h2>{dict.png.guideTitle}</h2>
          <p className="leading-relaxed">{dict.png.guideP1}</p>
          <p className="leading-relaxed">{dict.png.guideP2}</p>
        </div>
      </section>

      {/* Open FAQ Section (High Ad Viewability & Engagement) */}
      <section className="article-section">
        <h2>{dict.png.faqTitle}</h2>
        <div className="grid gap-6 md:grid-cols-2 max-w-4xl mx-auto text-left">
          {dict.png.faqQuestions.map((faq: any, index: number) => (
            <div key={index} className="p-6 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm space-y-2">
              <h3 className="text-base md:text-lg font-bold text-gray-900 dark:text-white">
                {faq.q}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Cross Navigation */}
      <section className="article-section">
        <div className="max-w-3xl mx-auto text-center">
          <h2>{dict.png.otherToolsTitle}</h2>
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
            <Link href={`/${dict.locale || 'en'}/batch-black-and-white-converter`}>
              <Button variant="outline" size="lg">
                Batch Converter
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}

export default function PngToBlackAndWhitePage({ params }: Props) {
  const dict = getDictionary(params.locale)
  const faqSchema = {
    questions: dict.png.faqQuestions.map((faq: any) => ({
      question: faq.q,
      answer: faq.a
    }))
  }

  return (
    <>
      <StructuredData type="faq" data={faqSchema} />
      <ConverterExperience
        heroBadgeText={dict.png.heroBadge}
        heroTitle={dict.png.heroTitle}
        heroSubtitle={dict.png.heroSubtitle}
        heroFeatureBadges={[...dict.png.badges]}
        uploadAccept=".png,image/png"
        uploadSupportText={dict.png.uploadSupport}
        uploadAllowedExtensions={['png']}
        uploadInvalidFileMessage={dict.png.invalidMessage}
        mode="logo"
      />
      <PngSections dict={dict} />
    </>
  )
}
