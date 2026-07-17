import { Metadata } from 'next'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { FileText, CheckCircle, AlertTriangle, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { canonicalUrl } from '@/lib/seo'
import { getDictionary } from '@/locales'

interface Props {
  params: { locale: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const dict = getDictionary(params.locale)
  const canonical = canonicalUrl(`/${params.locale}/terms/`)
  return {
    title: dict.terms.metaTitle,
    description: dict.terms.metaDesc,
    alternates: {
      canonical
    },
    openGraph: {
      title: dict.terms.metaTitle,
      description: dict.terms.metaDesc,
      url: canonical
    }
  }
}

export default function TermsOfServicePage({ params }: Props) {
  const dict = getDictionary(params.locale)
  return (
    <>
        {/* Header */}
        <header className="article-header">
          <Badge className="mb-4" variant="secondary">
            <FileText className="w-4 h-4 mr-2" />
            {dict.terms.badge}
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            {dict.terms.title}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {dict.terms.subtitle}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
            {dict.terms.lastUpdated}
          </p>
        </header>

          {/* Acceptance of Terms */}
          <section className="article-section">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              {dict.terms.sec1Title}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {dict.terms.sec1P1}
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              {dict.terms.sec1P2}
            </p>
          </section>

          {/* Description of Service */}
          <section className="article-section">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              {dict.terms.sec2Title}
            </h2>
            <div className="space-y-4">
              <p className="text-gray-600 dark:text-gray-400">
                {dict.terms.sec2P1}
              </p>
              <ul className="list-disc ml-6 text-gray-600 dark:text-gray-400 space-y-2">
                {dict.terms.sec2Bullets.map((bullet: string) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
              <p className="text-gray-600 dark:text-gray-400">
                {dict.terms.sec2P2}
              </p>
            </div>
          </section>

          {/* User Responsibilities */}
          <section className="article-section">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              {dict.terms.sec3Title}
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {dict.terms.sec3Sub1}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-2">
                  {dict.terms.sec3Desc1}
                </p>
                <ul className="list-disc ml-6 text-gray-600 dark:text-gray-400 space-y-1">
                  {dict.terms.sec3Bullets1.map((bullet: string) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {dict.terms.sec3Sub2}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {dict.terms.sec3Desc2}
                </p>
                <ul className="list-disc ml-6 text-gray-600 dark:text-gray-400 space-y-1 mt-2">
                  {dict.terms.sec3Bullets2.map((bullet: string) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* Intellectual Property */}
          <section className="article-section">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              {dict.terms.sec4Title}
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {dict.terms.sec4Sub1}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {dict.terms.sec4Desc1}
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {dict.terms.sec4Sub2}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {dict.terms.sec4Desc2}
                </p>
              </div>
            </div>
          </section>

          {/* Privacy and Data */}
          <section className="article-section">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              {dict.terms.sec5Title}
            </h2>
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 mb-4">
              <div className="flex items-start">
                <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {dict.terms.sec5AlertTitle}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {dict.terms.sec5AlertDesc}
                  </p>
                </div>
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              {dict.terms.sec5Desc} <Link href="/privacy" className="text-blue-600 hover:text-blue-800 underline">{dict.common.privacy}</Link>.
            </p>
          </section>

          {/* Service Availability */}
          <section className="article-section">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              {dict.terms.sec6Title}
            </h2>
            <div className="space-y-4">
              <p className="text-gray-600 dark:text-gray-400">
                {dict.terms.sec6P1}
              </p>
              <ul className="list-disc ml-6 text-gray-600 dark:text-gray-400 space-y-1">
                {dict.terms.sec6Bullets.map((bullet: string) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
              <p className="text-gray-600 dark:text-gray-400">
                {dict.terms.sec6P2}
              </p>
            </div>
          </section>

          {/* Disclaimers */}
          <section className="article-section">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              {dict.terms.sec7Title}
            </h2>
            <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mb-4">
              <div className="flex items-start">
                <AlertTriangle className="w-5 h-5 text-yellow-500 mr-2 mt-0.5" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {dict.terms.sec7AlertTitle}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {dict.terms.sec7AlertDesc}
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <p className="text-gray-600 dark:text-gray-400">{dict.terms.sec7Desc}</p>
              <ul className="list-disc ml-6 text-gray-600 dark:text-gray-400 space-y-1">
                {dict.terms.sec7Bullets.map((bullet: string) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            </div>
          </section>

          {/* Limitation of Liability */}
          <section className="article-section">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              {dict.terms.sec8Title}
            </h2>
            <div className="space-y-4">
              <p className="text-gray-600 dark:text-gray-400">
                {dict.terms.sec8P1}
              </p>
              <ul className="list-disc ml-6 text-gray-600 dark:text-gray-400 space-y-1">
                {dict.terms.sec8Bullets.map((bullet: string) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
              <p className="text-gray-600 dark:text-gray-400">
                {dict.terms.sec8P2}
              </p>
            </div>
          </section>

          {/* Modifications */}
          <section className="article-section">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              {dict.terms.sec9Title}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {dict.terms.sec9P1}
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              {dict.terms.sec9P2}
            </p>
          </section>

          {/* Governing Law */}
          <section className="article-section">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              {dict.terms.sec10Title}
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              {dict.terms.sec10P}
            </p>
          </section>

          {/* Severability */}
          <section className="article-section">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              {dict.terms.sec11Title}
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              {dict.terms.sec11P}
            </p>
          </section>

          {/* Contact Information */}
          <section className="article-section">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              {dict.terms.sec12Title}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {dict.terms.sec12P}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="mailto:support@bwconverter.com"
                className="inline-flex items-center justify-center px-4 py-2 border border-primary-200 dark:border-primary-800 rounded-md text-primary-600 dark:text-primary-300 font-medium hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors"
              >
                support@bwconverter.com
              </a>
              <Link href="/contact">
                <Button variant="outline">
                  {dict.terms.sec12BtnContact}
                </Button>
              </Link>
              <Link href="/faq">
                <Button variant="outline">
                  {dict.terms.sec12BtnFaq}
                </Button>
              </Link>
            </div>
          </section>

        {/* Summary */}
        <section className="article-section">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            {dict.terms.summaryTitle}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            {dict.terms.summaryDesc}
          </p>
          <Link href={`/${dict.locale || 'en'}/`}>
            <Button>
              {dict.terms.summaryBtn}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </section>
    </>
  )
}
