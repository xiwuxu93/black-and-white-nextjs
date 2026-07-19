import { Metadata } from 'next'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Shield, CheckCircle, AlertCircle, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { canonicalUrl, getPageAlternates } from '@/lib/seo'
import { getDictionary } from '@/locales'

interface Props {
  params: { locale: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const dict = getDictionary(params.locale)
  const alternates = getPageAlternates('/privacy/', params.locale)
  const canonical = alternates.canonical
  return {
    title: dict.privacy.metaTitle,
    description: dict.privacy.metaDesc,
    alternates,
    openGraph: {
      title: dict.privacy.metaTitle,
      description: dict.privacy.metaDesc,
      url: canonical
    }
  }
}

export default function PrivacyPolicyPage({ params }: Props) {
  const dict = getDictionary(params.locale)
  return (
    <>
        {/* Header */}
        <header className="article-header">
          <Badge className="mb-4" variant="secondary">
            <Shield className="w-4 h-4 mr-2" />
            {dict.privacy.badge}
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            {dict.privacy.title}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {dict.privacy.subtitle}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
            {dict.privacy.lastUpdated}
          </p>
        </header>

        {/* Key Points */}
        <section className="article-section">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
            {dict.privacy.highlightsTitle}
          </h2>
          <ul className="space-y-2 text-gray-600 dark:text-gray-400">
            {dict.privacy.highlights.map((item: string) => (
              <li key={item}>• {item}</li>
            ))}
          </ul>
        </section>

          {/* Information We Collect */}
          <section className="article-section">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              {dict.privacy.sections.sec1Title}
            </h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {dict.privacy.sections.sec1Sub1}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-2">
                  {dict.privacy.sections.sec1Desc1}
                </p>
                <ul className="list-disc ml-6 text-gray-600 dark:text-gray-400 space-y-1">
                  {dict.privacy.sections.sec1Bullets1.map((bullet: string) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {dict.privacy.sections.sec1Sub2}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-2">
                  {dict.privacy.sections.sec1Desc2}
                </p>
                <ul className="list-disc ml-6 text-gray-600 dark:text-gray-400 space-y-1">
                  {dict.privacy.sections.sec1Bullets2.map((bullet: string) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {dict.privacy.sections.sec1Sub3}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {dict.privacy.sections.sec1Desc3}
                </p>
              </div>
            </div>
          </section>

          {/* How We Use Information */}
          <section className="article-section">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              {dict.privacy.sections.sec2Title}
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {dict.privacy.sections.sec2Sub1}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {dict.privacy.sections.sec2Desc1}
                </p>
                <ul className="list-disc ml-6 text-gray-600 dark:text-gray-400 space-y-1 mt-2">
                  {dict.privacy.sections.sec2Bullets1.map((bullet: string) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {dict.privacy.sections.sec2Sub2}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {dict.privacy.sections.sec2Desc2}
                </p>
                <ul className="list-disc ml-6 text-gray-600 dark:text-gray-400 space-y-1 mt-2">
                  {dict.privacy.sections.sec2Bullets2.map((bullet: string) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* Data Sharing */}
          <section className="article-section">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              {dict.privacy.sections.sec3Title}
            </h2>
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-4">
              <div className="flex items-start">
                <AlertCircle className="w-5 h-5 text-red-500 mr-2 mt-0.5" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {dict.privacy.sections.sec3AlertTitle}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {dict.privacy.sections.sec3AlertDesc}
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {dict.privacy.sections.sec3Sub1}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-2">
                  {dict.privacy.sections.sec3Desc1}
                </p>
                <ul className="list-disc ml-6 text-gray-600 dark:text-gray-400 space-y-1">
                  {dict.privacy.sections.sec3Bullets1.map((bullet: string) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {dict.privacy.sections.sec3Sub2}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {dict.privacy.sections.sec3Desc2}
                </p>
              </div>
            </div>
          </section>

          {/* Data Security */}
          <section className="article-section">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              {dict.privacy.sections.sec4Title}
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {dict.privacy.sections.sec4Sub1}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {dict.privacy.sections.sec4Desc1}
                </p>
                <ul className="list-disc ml-6 text-gray-600 dark:text-gray-400 space-y-1 mt-2">
                  {dict.privacy.sections.sec4Bullets1.map((bullet: string) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {dict.privacy.sections.sec4Sub2}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {dict.privacy.sections.sec4Desc2}
                </p>
                <ul className="list-disc ml-6 text-gray-600 dark:text-gray-400 space-y-1 mt-2">
                  {dict.privacy.sections.sec4Bullets2.map((bullet: string) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* Your Rights */}
          <section className="article-section">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              {dict.privacy.sections.sec5Title}
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {dict.privacy.sections.sec5Sub1}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {dict.privacy.sections.sec5Desc1}
                </p>
                <ul className="list-disc ml-6 text-gray-600 dark:text-gray-400 space-y-1 mt-2">
                  {dict.privacy.sections.sec5Bullets1.map((bullet: string) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {dict.privacy.sections.sec5Sub2}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {dict.privacy.sections.sec5Desc2}
                </p>
                <ul className="list-disc ml-6 text-gray-600 dark:text-gray-400 space-y-1 mt-2">
                  {dict.privacy.sections.sec5Bullets2.map((bullet: string) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* Advertising and Cookies (Mediavine Journey) */}
          <section className="article-section">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              {dict.privacy.sections.sec6Title}
            </h2>
            <div className="space-y-4 text-gray-600 dark:text-gray-400">
              <p>{dict.privacy.sections.sec6P1}</p>
              <p>{dict.privacy.sections.sec6P2}</p>
              <p>{dict.privacy.sections.sec6P3}</p>
              <ul className="list-disc ml-6 space-y-1">
                <li>
                  Mediavine Privacy Policy:{' '}
                  <a className="underline" href="https://www.mediavine.com/ad-partners-privacy-policy/" rel="noopener noreferrer" target="_blank">
                    https://www.mediavine.com/ad-partners-privacy-policy/
                  </a>
                </li>
                <li>
                  Network Advertising Initiative (NAI) Opt-Out:{' '}
                  <a className="underline" href="https://optout.networkadvertising.org" rel="noopener noreferrer" target="_blank">
                    https://optout.networkadvertising.org
                  </a>
                </li>
                <li>
                  Digital Advertising Alliance (DAA) Choice Page:{' '}
                  <a className="underline" href="https://optout.aboutads.info" rel="noopener noreferrer" target="_blank">
                    https://optout.aboutads.info
                  </a>
                </li>
              </ul>
            </div>
          </section>

          {/* Cookies */}
          <section className="article-section">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              {dict.privacy.sections.sec7Title}
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {dict.privacy.sections.sec7Sub1}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {dict.privacy.sections.sec7Desc1}
                </p>
                <ul className="list-disc ml-6 text-gray-600 dark:text-gray-400 space-y-1 mt-2">
                  {dict.privacy.sections.sec7Bullets1.map((bullet: string) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {dict.privacy.sections.sec7Sub2}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {dict.privacy.sections.sec7Desc2}
                </p>
              </div>
            </div>
          </section>

          {/* Children's Privacy */}
          <section className="article-section">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              {dict.privacy.sections.sec8Title}
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              {dict.privacy.sections.sec8Desc}
            </p>
          </section>

          {/* Changes to Policy */}
          <section className="article-section">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              {dict.privacy.sections.sec9Title}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {dict.privacy.sections.sec9P1}
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              {dict.privacy.sections.sec9P2}
            </p>
          </section>

          {/* Contact */}
          <section className="article-section">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              {dict.privacy.sections.sec10Title}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {dict.privacy.sections.sec10Desc}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/faq">
                <Button variant="outline">
                  Visit FAQ
                </Button>
              </Link>
              <Link href="/about">
                <Button variant="outline">
                  Contact Information
                </Button>
              </Link>
            </div>
          </section>

        {/* Summary */}
        <section className="article-section">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            {dict.privacy.summaryTitle}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            {dict.privacy.summaryDesc}
          </p>
          <Link href={`/${dict.locale || 'en'}/`}>
            <Button>
              {dict.privacy.summaryBtn}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </section>
    </>
  )
}
