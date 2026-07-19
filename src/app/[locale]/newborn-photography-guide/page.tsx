import { Metadata } from 'next'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Baby } from 'lucide-react'
import Link from 'next/link'
import { Breadcrumb } from '@/components/seo/breadcrumb'
import { canonicalUrl, getPageAlternates } from '@/lib/seo'
import { NewbornGuideTabs } from '@/components/pages/newborn-guide-tabs'
import { getDictionary } from '@/locales'

interface Props {
  params: { locale: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const dict = getDictionary(params.locale)
  const alternates = getPageAlternates('/newborn-photography-guide/', params.locale)
  const canonical = alternates.canonical
  return {
    title: dict.newborn.metaTitle,
    description: dict.newborn.metaDesc,
    openGraph: {
      title: dict.newborn.metaTitle,
      description: dict.newborn.metaDesc,
      url: canonical,
      images: ['/black-and-white-image.png']
    },
    alternates
  }
}

export default function NewbornPhotographyGuidePage({ params }: Props) {
  const dict = getDictionary(params.locale)
  return (
    <>
        <Breadcrumb
          items={[
            { name: dict.newborn.continueExamples, url: '/examples' },
            { name: dict.newborn.heroTitle }
          ]}
        />

        {/* Header */}
        <header className="article-header">
          <Badge className="mb-4" variant="secondary">
            <Baby className="w-4 h-4 mr-2" />
            {dict.newborn.heroBadge}
          </Badge>
          <h1>
            {dict.newborn.heroTitle}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-8">
            {dict.newborn.heroSubtitle}
          </p>
        </header>

        <NewbornGuideTabs dict={dict} />

        {/* Cross-reference Section */}
        <section className="article-section text-center">
            <h2>
              {dict.newborn.continueTitle}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {dict.newborn.continueDesc}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/blog">
                <Button variant="outline" size="lg">
                  {dict.newborn.continueBlog}
                </Button>
              </Link>
              <Link href="/examples">
                <Button variant="outline" size="lg">
                  {dict.newborn.continueExamples}
                </Button>
              </Link>
            </div>
        </section>
    </>
  )
}
