import Link from 'next/link'
import {
  ChevronRight,
  Layers,
  Image as ImageIcon,
  Briefcase,
  FileText
} from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Dictionary } from '@/locales/en'

export const HOWTO_SCHEMA = (dict: Dictionary) => ({
  name: dict.home.howToTitle,
  description: dict.home.heroSubtitle,
  image: '/black-and-white-image.png',
  totalTime: 'PT1M',
  tool: ['BWConverter web app'],
  steps: dict.home.howToSteps.map((step) => ({
    name: step.title,
    text: step.desc
  }))
})

export const HOME_FAQ_SCHEMA = (dict: Dictionary) => ({
  questions: dict.home.faqQuestions.map((faq) => ({
    question: faq.q,
    answer: faq.a
  }))
})

interface MarketingSectionsProps {
  dict: Dictionary
}

export function MarketingSections({ dict }: MarketingSectionsProps) {
  return (
    <>
      <section className="converter-marketing article-section">
        <h2>{dict.home.toolGridTitle}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link href="/logo-to-black-and-white" className="group">
            <Card className="p-6 h-full transition-shadow hover:shadow-md border-primary-100 dark:border-primary-900/50">
              <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-full w-fit text-blue-600 dark:text-blue-400">
                <Layers className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2 group-hover:text-primary-600 transition-colors">
                {dict.home.toolLogoTitle}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                {dict.home.toolLogoDesc}
              </p>
              <div className="mt-4 flex items-center text-sm font-medium text-primary-600">
                {dict.home.toolLogoAction} <ChevronRight className="w-4 h-4 ml-1" />
              </div>
            </Card>
          </Link>

          <Link href="/batch-black-and-white-converter" className="group">
            <Card className="p-6 h-full transition-shadow hover:shadow-md border-primary-100 dark:border-primary-900/50">
              <div className="mb-4 p-3 bg-purple-50 dark:bg-purple-900/20 rounded-full w-fit text-purple-600 dark:text-purple-400">
                <Briefcase className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2 group-hover:text-primary-600 transition-colors">
                {dict.home.toolBatchTitle}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                {dict.home.toolBatchDesc}
              </p>
              <div className="mt-4 flex items-center text-sm font-medium text-primary-600">
                {dict.home.toolBatchAction} <ChevronRight className="w-4 h-4 ml-1" />
              </div>
            </Card>
          </Link>

          <Link href="/convert-pdf-to-black-and-white" className="group">
            <Card className="p-6 h-full transition-shadow hover:shadow-md border-primary-100 dark:border-primary-900/50">
              <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 rounded-full w-fit text-red-600 dark:text-red-400">
                <FileText className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2 group-hover:text-primary-600 transition-colors">
                {dict.home.toolPdfTitle}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                {dict.home.toolPdfDesc}
              </p>
              <div className="mt-4 flex items-center text-sm font-medium text-primary-600">
                {dict.home.toolPdfAction} <ChevronRight className="w-4 h-4 ml-1" />
              </div>
            </Card>
          </Link>

          <Link href="/how-to-use" className="group">
            <Card className="p-6 h-full transition-shadow hover:shadow-md border-primary-100 dark:border-primary-900/50">
              <div className="mb-4 p-3 bg-green-50 dark:bg-green-900/20 rounded-full w-fit text-green-600 dark:text-green-400">
                <ImageIcon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2 group-hover:text-primary-600 transition-colors">
                {dict.home.toolGuideTitle}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                {dict.home.toolGuideDesc}
              </p>
              <div className="mt-4 flex items-center text-sm font-medium text-primary-600">
                {dict.home.toolGuideAction} <ChevronRight className="w-4 h-4 ml-1" />
              </div>
            </Card>
          </Link>
        </div>
      </section>

      <section className="article-section text-gray-600 dark:text-gray-400 text-center max-w-3xl mx-auto">
        <p className="text-xl mb-4 text-gray-800 dark:text-gray-200 font-medium">
          {dict.home.bannerTitle}
        </p>
        <p className="text-base md:text-lg">
          {dict.home.bannerDesc}
        </p>
      </section>

      <section id="how-to-convert" className="article-section">
        <h2>{dict.home.howToTitle}</h2>
        <ol className="space-y-8 text-left max-w-4xl mx-auto">
          {dict.home.howToSteps.map((step) => (
            <li key={step.num} className="flex flex-col md:flex-row md:items-start gap-4">
              <div className="flex-shrink-0">
                <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-900 text-white text-xl font-semibold">
                  {step.num}
                </span>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {step.desc}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="article-section">
        <h2>{dict.home.whyTitle}</h2>
        <div className="space-y-6 max-w-2xl mx-auto">
          <div className="flex gap-5 p-6 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm">
            <div className="text-3xl p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl h-fit text-blue-600 dark:text-blue-400 flex-shrink-0">
              🎚️
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                {dict.home.whyReason1Title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                {dict.home.whyReason1Desc}
              </p>
            </div>
          </div>

          <div className="flex gap-5 p-6 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm">
            <div className="text-3xl p-3 bg-purple-50 dark:bg-purple-900/20 rounded-xl h-fit text-purple-600 dark:text-purple-400 flex-shrink-0">
              ⚡
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                {dict.home.whyReason2Title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                {dict.home.whyReason2Desc}
              </p>
            </div>
          </div>

          <div className="flex gap-5 p-6 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm">
            <div className="text-3xl p-3 bg-green-50 dark:bg-green-900/20 rounded-xl h-fit text-green-600 dark:text-green-400 flex-shrink-0">
              ✨
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                {dict.home.whyReason3Title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                {dict.home.whyReason3Desc}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="article-section">
        <div className="max-w-3xl mx-auto text-center mb-10">
          <h2>{dict.home.realEditsTitle}</h2>
          <p className="text-gray-600 dark:text-gray-400">
            {dict.home.realEditsDesc}
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {dict.home.realEditsNotes.map(({ title, note }) => (
            <div key={title} className="border border-gray-100 dark:border-gray-700 rounded-2xl p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                {title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">{note}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="faq" className="article-section">
        <h2>{dict.home.faqTitle}</h2>
        <div className="space-y-4 max-w-3xl mx-auto text-left">
          {dict.home.faqQuestions.map(({ q, a }) => (
            <details
              key={q}
              className="group border border-gray-100 dark:border-gray-700/80 rounded-2xl p-5 bg-gray-50/50 dark:bg-gray-900/20 hover:bg-gray-50 dark:hover:bg-gray-900/40 transition-all duration-200"
            >
              <summary className="list-none flex items-center justify-between cursor-pointer font-semibold text-gray-900 dark:text-white text-base md:text-lg focus:outline-none select-none">
                <span>{q}</span>
                <svg
                  className="w-5 h-5 text-gray-400 transform group-open:rotate-180 transition-transform duration-200 flex-shrink-0 ml-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </summary>
              <div className="mt-4 text-sm text-gray-600 dark:text-gray-400 leading-relaxed border-t border-gray-100 dark:border-gray-700/50 pt-4">
                <p>{a}</p>
              </div>
            </details>
          ))}
        </div>
      </section>

      <section className="article-section">
        <div className="max-w-3xl mx-auto text-center">
          <h2>{dict.home.blogTitle}</h2>
          <p className="text-gray-600 dark:text-gray-400">
            {dict.home.blogDesc}
          </p>
          <div className="mt-6">
            <Link href="/blog">
              <Button size="lg" variant="outline">
                {dict.common.readBlog}
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
