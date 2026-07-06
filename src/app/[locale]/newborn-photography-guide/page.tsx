import { Metadata } from 'next'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Baby } from 'lucide-react'
import Link from 'next/link'
import { Breadcrumb } from '@/components/seo/breadcrumb'
import { canonicalUrl } from '@/lib/seo'
import { NewbornGuideTabs } from '@/components/pages/newborn-guide-tabs'

export const metadata: Metadata = {
  title: 'Complete Newborn Photography Guide - Home Sessions & Studio Workflow',
  description:
    'Master newborn photography with our complete guide. Learn home session techniques for parents and professional studio workflows. Includes lighting setups, BWConverter presets, and delivery tips.',
  keywords: [
    'newborn photography guide',
    'newborn black and white photography',
    'home newborn session',
    'studio newborn workflow',
    'newborn portrait lighting',
    'professional newborn photography'
  ],
  openGraph: {
    title: 'Complete Newborn Photography Guide - Home & Studio',
    description:
      'Everything you need for stunning newborn portraits - from DIY home sessions to professional studio workflows.',
    url: canonicalUrl('/en/newborn-photography-guide/'),
    images: ['/black-and-white-image.png']
  },
  alternates: {
    canonical: canonicalUrl('/en/newborn-photography-guide/')
  }
}

export default function NewbornPhotographyGuidePage() {
  return (
    <>
        <Breadcrumb
          items={[
            { name: 'Photography Guides', url: '/examples' },
            { name: 'Newborn Photography Guide' }
          ]}
        />

        {/* Header */}
        <header className="article-header">
          <Badge className="mb-4" variant="secondary">
            <Baby className="w-4 h-4 mr-2" />
            Complete Guide
          </Badge>
          <h1>
            Complete Newborn Photography Guide
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-8">
            Everything you need for stunning newborn portraits - from DIY home sessions to professional studio workflows. Includes lighting setups, BWConverter presets, and delivery best practices.
          </p>
        </header>

        <NewbornGuideTabs />

        {/* Cross-reference Section */}
        <section className="article-section text-center">
            <h2>
              Continue Learning
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Explore more photography guides and tutorials
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/blog">
                <Button variant="outline" size="lg">
                  Photography Blog
                </Button>
              </Link>
              <Link href="/examples">
                <Button variant="outline" size="lg">
                  More Examples
                </Button>
              </Link>
            </div>
        </section>
    </>
  )
}
