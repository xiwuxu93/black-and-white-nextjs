import { Metadata } from 'next'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Mail, MessageSquare, HelpCircle, Shield } from 'lucide-react'
import Link from 'next/link'
import { canonicalUrl, getPageAlternates } from '@/lib/seo'
import { getDictionary } from '@/locales'

interface Props {
  params: { locale: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const dict = getDictionary(params.locale)
  const alternates = getPageAlternates('/contact/', params.locale)
  const canonical = alternates.canonical
  return {
    title: dict.contact.metaTitle,
    description: dict.contact.metaDesc,
    alternates,
    openGraph: {
      title: dict.contact.metaTitle,
      description: dict.contact.metaDesc,
      url: canonical
    }
  }
}

const SUPPORT_EMAIL = 'support@bwconverter.com'

export default function ContactPage({ params }: Props) {
  const dict = getDictionary(params.locale)
  return (
    <>
        <header className="article-header">
          <Badge className="mb-4" variant="secondary">
            <Mail className="w-4 h-4 mr-2" />
            {dict.contact.heroBadge}
          </Badge>
          <h1>
            {dict.contact.heroTitle}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {dict.contact.heroSubtitle}
          </p>
        </header>

        <div className="grid gap-6 md:grid-cols-2">
          <section className="article-section">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center">
                <Mail className="w-5 h-5 text-primary-600 dark:text-primary-300" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                {dict.contact.emailTitle}
              </h2>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {dict.contact.emailDesc}
            </p>
            <a
              href={`mailto:${SUPPORT_EMAIL}`}
              className="inline-flex items-center text-primary-600 dark:text-primary-300 font-medium"
            >
              {SUPPORT_EMAIL}
            </a>
          </section>

          <section className="article-section">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                <HelpCircle className="w-5 h-5 text-blue-600 dark:text-blue-300" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                {dict.contact.faqTitle}
              </h2>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {dict.contact.faqDesc}
            </p>
            <Link href={`/${dict.locale || 'en'}/faq`}>
              <Button variant="outline" className="w-full">
                {dict.contact.faqButton}
              </Button>
            </Link>
          </section>
        </div>

        <section className="article-section">
          <div className="flex items-start space-x-3">
            <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
              <Shield className="w-5 h-5 text-green-600 dark:text-green-300" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {dict.contact.feedbackTitle}
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-3">
                {dict.contact.feedbackDesc1}
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                {dict.contact.feedbackDesc2}
              </p>
            </div>
          </div>
        </section>

        <section className="article-section">
          <div className="flex items-start space-x-3">
            <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
              <MessageSquare className="w-5 h-5 text-purple-600 dark:text-purple-300" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {dict.contact.includeTitle}
              </h2>
              <ul className="list-disc ml-5 space-y-1 text-gray-600 dark:text-gray-400">
                {dict.contact.includeItems.map((item: string) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>
    </>
  )
}
