import { Metadata } from 'next'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Upload,
  Palette,
  ArrowRight,
  Workflow,
  Code2,
  ServerCog,
  Wrench,
  AlertTriangle
} from 'lucide-react'
import Link from 'next/link'
import { canonicalUrl, getPageAlternates } from '@/lib/seo'
import { getDictionary } from '@/locales'

interface Props {
  params: { locale: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const dict = getDictionary(params.locale)
  const alternates = getPageAlternates('/how-to-use/', params.locale)
  const canonical = alternates.canonical
  return {
    title: dict.howToUse.metaTitle,
    description: dict.howToUse.metaDesc,
    alternates,
    openGraph: {
      title: dict.howToUse.metaTitle,
      description: dict.howToUse.metaDesc,
      url: canonical
    }
  }
}

export default function HowToUsePage({ params }: Props) {
  const dict = getDictionary(params.locale)
  
  const stepIcons = [Upload, Palette]
  const steps = dict.howToUse.steps.map((step: any, idx: number) => ({
    ...step,
    icon: stepIcons[idx] || stepIcons[0]
  }))

  const proWorkflows = dict.howToUse.workflows.map((flow: any, idx: number) => {
    const hrefs = [
      `/${params.locale}/batch-black-and-white-converter`,
      `/${params.locale}/faq`,
      `/${params.locale}/privacy`
    ]
    return {
      ...flow,
      link: {
        href: hrefs[idx] || `/${params.locale}/`,
        label: flow.linkLabel
      }
    }
  })

  const troubleshooting = dict.howToUse.troubleshootItems

  return (
    <>
        <header className="article-header">
          <Badge className="mb-4" variant="secondary">
            {dict.howToUse.badge}
          </Badge>
          <h1>
            {dict.howToUse.title}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {dict.howToUse.subtitle}
          </p>
        </header>

        <section className="article-section">
          <h2>
            {dict.howToUse.section1Title}
          </h2>
          <div className="space-y-8">
            {steps.map((step: any, index: number) => {
              const Icon = step.icon
              return (
                <article key={index} className="border-t border-gray-200 pt-8 dark:border-gray-800">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center">
                        <Icon className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                        {step.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">
                        {step.desc}
                      </p>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-medium text-gray-900 dark:text-white mb-2">Details</h4>
                          <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                            {step.details.map((detail: string, idx: number) => (
                              <li key={idx}>• {detail}</li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900 dark:text-white mb-2">Tips</h4>
                          <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                            {step.tips.map((tip: string, idx: number) => (
                              <li key={idx}>💡 {tip}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        </section>

        <section className="article-section">
          <h2>
            {dict.howToUse.section2Title}
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {proWorkflows.map((flow: any) => (
              <article key={flow.title} className="border-t border-gray-200 pt-6 dark:border-gray-800">
                <div className="flex items-center gap-3 mb-4">
                  <Workflow className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{flow.title}</h3>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{flow.desc}</p>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  {flow.phases.map((item: string) => (
                    <li key={item} className="flex items-start">
                      <Code2 className="w-4 h-4 text-primary-600 dark:text-primary-400 mr-2 mt-1" />
                      {item}
                    </li>
                  ))}
                </ul>
                <Link href={flow.link.href} className="mt-4 inline-flex items-center text-primary-600 dark:text-primary-400 text-sm font-medium">
                  {flow.link.label}
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </article>
            ))}
          </div>
        </section>

        <section className="article-section">
            <div className="flex items-center gap-3 mb-4">
              <ServerCog className="w-5 h-5 text-blue-600 dark:text-blue-300" />
              <h2>
                {dict.howToUse.section3Title}
              </h2>
            </div>
            <div className="overflow-hidden rounded-xl border border-blue-200 dark:border-blue-900 bg-white dark:bg-gray-900">
              <table className="min-w-full text-sm text-gray-600 dark:text-gray-300">
                <thead className="bg-blue-50 dark:bg-blue-900/40 text-left">
                  <tr>
                    {dict.howToUse.tableHeaders.map((header: string) => (
                      <th key={header} className="px-4 py-3 font-semibold text-gray-900 dark:text-gray-100">{header}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {troubleshooting.map((row: any, index: number) => (
                    <tr key={row.issue} className={index % 2 === 0 ? 'bg-white dark:bg-gray-900' : 'bg-blue-50 dark:bg-gray-900/60'}>
                      <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">{row.issue}</td>
                      <td className="px-4 py-3 flex items-start">
                        <AlertTriangle className="w-4 h-4 text-blue-500 mr-2 mt-1" />
                        {row.cause}
                      </td>
                      <td className="px-4 py-3 flex items-start">
                        <Wrench className="w-4 h-4 text-blue-500 mr-2 mt-1" />
                        {row.fix}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-blue-700 dark:text-blue-300 mt-3">
              {dict.howToUse.bottomHelp}
            </p>
        </section>

        <section className="article-section text-center">
          <h2>
            {dict.howToUse.bottomTitle}
          </h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href={`/${dict.locale || 'en'}/`}>
              <Button size="lg">
                {dict.howToUse.btnStart}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Link href={`/${dict.locale || 'en'}/batch-black-and-white-converter`}>
              <Button variant="outline" size="lg">
                {dict.howToUse.btnBatch}
              </Button>
            </Link>
          </div>
        </section>
    </>
  )
}
