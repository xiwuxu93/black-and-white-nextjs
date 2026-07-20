'use client'

import { WithContext, WebSite, SiteNavigationElement } from 'schema-dts'
import { canonicalUrl } from '@/lib/seo'
import { usePathname } from 'next/navigation'

export function NavigationStructuredData() {
  const pathname = usePathname()
  const localeSegment = pathname?.split('/')[1] || 'en'
  const currentLocale = ['en', 'es', 'de'].includes(localeSegment) ? localeSegment : 'en'

  const homeUrl = canonicalUrl(`/${currentLocale}/`)
  const websiteData: WithContext<WebSite> = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'BWConverter - Free Black and White Image Converter',
    alternateName: 'Black and White Image Converter Online',
    url: homeUrl,
    description: 'Convert images to black and white online with local processing and practical tonal controls.',
    hasPart: [
      {
        '@type': 'WebPage',
        '@id': homeUrl,
        url: homeUrl,
        name: 'Black and White Image Converter',
        description: 'Convert image files to black and white in your browser.',
        isPartOf: {
          '@type': 'WebSite',
          '@id': homeUrl
        }
      },
      {
        '@type': 'WebPage',
        '@id': canonicalUrl(`/${currentLocale}/batch-black-and-white-converter`),
        url: canonicalUrl(`/${currentLocale}/batch-black-and-white-converter`),
        name: 'Batch Black and White Converter',
        description: 'Convert multiple image files in one workflow.',
        isPartOf: {
          '@type': 'WebSite',
          '@id': homeUrl
        }
      },
      {
        '@type': 'WebPage',
        '@id': canonicalUrl(`/${currentLocale}/logo-to-black-and-white`),
        url: canonicalUrl(`/${currentLocale}/logo-to-black-and-white`),
        name: 'Logo to Black and White',
        description: 'Convert PNG and SVG logo assets while preserving transparency.',
        isPartOf: {
          '@type': 'WebSite',
          '@id': homeUrl
        }
      },
      {
        '@type': 'WebPage',
        '@id': canonicalUrl(`/${currentLocale}/examples`),
        url: canonicalUrl(`/${currentLocale}/examples`),
        name: 'Black and White Examples',
        description: 'Before and after conversion examples with style notes.',
        isPartOf: {
          '@type': 'WebSite',
          '@id': homeUrl
        }
      },
      {
        '@type': 'WebPage',
        '@id': canonicalUrl(`/${currentLocale}/newborn-photography-guide`),
        url: canonicalUrl(`/${currentLocale}/newborn-photography-guide`),
        name: 'Newborn Photography Guide',
        description: 'Lighting and workflow notes for newborn black and white edits.',
        isPartOf: {
          '@type': 'WebSite',
          '@id': homeUrl
        }
      },
      {
        '@type': 'WebPage',
        '@id': canonicalUrl(`/${currentLocale}/how-to-use`),
        url: canonicalUrl(`/${currentLocale}/how-to-use`),
        name: 'How to Use',
        description: 'Step-by-step workflow and troubleshooting guidance.',
        isPartOf: {
          '@type': 'WebSite',
          '@id': homeUrl
        }
      },
      {
        '@type': 'WebPage',
        '@id': canonicalUrl(`/${currentLocale}/blog`),
        url: canonicalUrl(`/${currentLocale}/blog`),
        name: 'Photography Blog',
        description: 'Guides and practical notes for black and white editing.',
        isPartOf: {
          '@type': 'WebSite',
          '@id': homeUrl
        }
      },
      {
        '@type': 'WebPage',
        '@id': canonicalUrl(`/${currentLocale}/faq`),
        url: canonicalUrl(`/${currentLocale}/faq`),
        name: 'FAQ',
        description: 'Common questions about conversion, exports, and privacy.',
        isPartOf: {
          '@type': 'WebSite',
          '@id': homeUrl
        }
      },
      {
        '@type': 'WebPage',
        '@id': canonicalUrl(`/${currentLocale}/contact`),
        url: canonicalUrl(`/${currentLocale}/contact`),
        name: 'Contact',
        description: 'Contact BWConverter support.',
        isPartOf: {
          '@type': 'WebSite',
          '@id': homeUrl
        }
      }
    ]
  }

  const navigationData: WithContext<SiteNavigationElement> = {
    '@context': 'https://schema.org',
    '@type': 'SiteNavigationElement',
    name: 'Main Navigation',
    url: homeUrl,
    hasPart: [
      {
        '@type': 'WebPage',
        name: 'Home',
        url: homeUrl
      },
      {
        '@type': 'WebPage',
        name: 'Batch Converter',
        url: canonicalUrl(`/${currentLocale}/batch-black-and-white-converter`)
      },
      {
        '@type': 'WebPage',
        name: 'Logo Converter',
        url: canonicalUrl(`/${currentLocale}/logo-to-black-and-white`)
      },
      {
        '@type': 'WebPage',
        name: 'Examples',
        url: canonicalUrl(`/${currentLocale}/examples`)
      },
      {
        '@type': 'WebPage',
        name: 'How to Use',
        url: canonicalUrl(`/${currentLocale}/how-to-use`)
      },
      {
        '@type': 'WebPage',
        name: 'Blog',
        url: canonicalUrl(`/${currentLocale}/blog`)
      },
      {
        '@type': 'WebPage',
        name: 'FAQ',
        url: canonicalUrl(`/${currentLocale}/faq`)
      },
      {
        '@type': 'WebPage',
        name: 'Contact',
        url: canonicalUrl(`/${currentLocale}/contact`)
      }
    ]
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteData, null, 2)
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(navigationData, null, 2)
        }}
      />
    </>
  )
}
