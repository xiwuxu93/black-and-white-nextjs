import { Metadata } from 'next'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ChevronDown, HelpCircle, CheckCircle, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { canonicalUrl } from '@/lib/seo'
import { StructuredData } from '@/components/seo/structured-data'
import { getDictionary } from '@/locales'

interface Props {
  params: { locale: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const dict = getDictionary(params.locale)
  const canonical = canonicalUrl(`/${params.locale}/faq/`)
  return {
    title: dict.faqPage.metaTitle,
    description: dict.faqPage.metaDesc,
    alternates: {
      canonical
    },
    openGraph: {
      title: dict.faqPage.metaTitle,
      description: dict.faqPage.metaDesc,
      url: canonical
    }
  }
}

export default function FAQPage({ params }: Props) {
  const dict = getDictionary(params.locale)
  const faqs = dict.faqPage.categories

  const faqStructuredData = {
    questions: faqs.flatMap((category: any) =>
      category.questions.map(({ question, answer }: any) => ({
        question,
        answer
      }))
    )
  }

  return (
    <>
      <StructuredData type="faq" data={faqStructuredData} />
        {/* Header */}
        <header className="article-header">
          <Badge className="mb-4" variant="secondary">
            <HelpCircle className="w-4 h-4 mr-2" />
            {dict.faqPage.heroBadge}
          </Badge>
          <h1>
            {dict.faqPage.heroTitle}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {dict.faqPage.heroSubtitle}
          </p>
        </header>

        {/* FAQ Categories */}
        <div>
          {faqs.map((category: any, categoryIndex: number) => (
            <section key={categoryIndex} className="article-section">
              <h2 className="flex items-center">
                <CheckCircle className="w-6 h-6 text-green-500 mr-3" />
                {category.category}
              </h2>
              
              <div className="space-y-4">
                {category.questions.map((faq: any, index: number) => (
                  <details key={index} className="group border border-gray-200 dark:border-gray-700 rounded-lg">
                    <summary className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white pr-4">
                        {faq.question}
                      </h3>
                      <ChevronDown className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform flex-shrink-0" />
                    </summary>
                    
                    <div className="px-4 pb-4 pt-2 border-t border-gray-200 dark:border-gray-700">
                      <p className="text-gray-600 dark:text-gray-400 leading-relaxed whitespace-pre-line">
                        {faq.answer}
                      </p>
                    </div>
                  </details>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* Still Have Questions */}
        <section className="article-section text-center">
          <HelpCircle className="w-12 h-12 text-blue-600 dark:text-blue-400 mx-auto mb-4" />
          <h2>
            {dict.faqPage.stillQuestionsTitle}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
            {dict.faqPage.stillQuestionsDesc}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href={`/${dict.locale || 'en'}/`}>
              <Button size="lg">
                {dict.faqPage.btnTryConverter}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Link href="/how-to-use">
              <Button variant="outline" size="lg">
                {dict.faqPage.btnReadGuide}
              </Button>
            </Link>
          </div>
        </section>

        {/* Quick Tips */}
        <section className="article-section">
          <h2 className="flex items-center">
            <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
            {dict.faqPage.quickTipsTitle}
          </h2>
          <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
            {dict.faqPage.quickTips.map((tip: string) => (
              <li key={tip}>• {tip}</li>
            ))}
          </ul>
        </section>
    </>
  )
}
