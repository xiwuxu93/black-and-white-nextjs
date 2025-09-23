'use client'

import { WithContext, WebSite, SiteNavigationElement } from 'schema-dts'
import { canonicalUrl } from '@/lib/seo'

export function NavigationStructuredData() {
  const homeUrl = canonicalUrl('/')
  const websiteData: WithContext<WebSite> = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'BWConverter - Free Black and White Image Converter',
    alternateName: 'Black and White Image Converter Online',
    url: homeUrl,
    description: 'Convert images to black and white online for free. Professional quality black and white photo converter with multiple artistic styles.',
    // 网站主要导航结构
    hasPart: [
      {
        '@type': 'WebPage',
        '@id': homeUrl,
        url: homeUrl,
        name: 'Free Black and White Image Converter',
        description: 'Convert any image to black and white instantly with professional quality results',
        isPartOf: {
          '@type': 'WebSite',
          '@id': homeUrl
        }
      },
      {
        '@type': 'WebPage',
        '@id': canonicalUrl('/batch'),
        url: canonicalUrl('/batch'),
        name: 'Batch Black and White Image Converter',
        description: 'Convert multiple images to black and white at once - bulk processing tool',
        isPartOf: {
          '@type': 'WebSite',
          '@id': homeUrl
        }
      },
      {
        '@type': 'WebPage',
        '@id': canonicalUrl('/examples'),
        url: canonicalUrl('/examples'),
        name: 'Black and White Image Examples',
        description: 'See stunning before and after examples of black and white image conversions',
        isPartOf: {
          '@type': 'WebSite',
          '@id': homeUrl
        }
      },
      {
        '@type': 'WebPage',
        '@id': canonicalUrl('/newborn-black-and-white-images'),
        url: canonicalUrl('/newborn-black-and-white-images'),
        name: 'Newborn Black and White Images',
        description: 'Create beautiful black and white newborn photos with professional quality',
        isPartOf: {
          '@type': 'WebSite',
          '@id': homeUrl
        }
      },
      {
        '@type': 'WebPage',
        '@id': canonicalUrl('/black-and-white-newborn-images'),
        url: canonicalUrl('/black-and-white-newborn-images'),
        name: 'Black and White Newborn Images - Professional Converter',
        description: 'Transform newborn photos into elegant black and white with specialized styles',
        isPartOf: {
          '@type': 'WebSite',
          '@id': homeUrl
        }
      },
      {
        '@type': 'WebPage',
        '@id': canonicalUrl('/image-black-and-white-converter'),
        url: canonicalUrl('/image-black-and-white-converter'),
        name: 'Image Black and White Converter - Best Free Tool 2025',
        description: 'The most powerful free online image to black and white converter with professional results',
        isPartOf: {
          '@type': 'WebSite',
          '@id': homeUrl
        }
      },
      {
        '@type': 'WebPage',
        '@id': canonicalUrl('/how-to-use'),
        url: canonicalUrl('/how-to-use'),
        name: 'How to Use Black and White Image Converter',
        description: 'Step-by-step guide on how to convert images to black and white professionally',
        isPartOf: {
          '@type': 'WebSite',
          '@id': homeUrl
        }
      },
      {
        '@type': 'WebPage',
        '@id': canonicalUrl('/blog'),
        url: canonicalUrl('/blog'),
        name: 'Black and White Photography Blog',
        description: 'Tips, techniques, and inspiration for black and white photography',
        isPartOf: {
          '@type': 'WebSite',
          '@id': homeUrl
        }
      },
      {
        '@type': 'WebPage',
        '@id': canonicalUrl('/faq'),
        url: canonicalUrl('/faq'),
        name: 'Frequently Asked Questions',
        description: 'Common questions about black and white image conversion',
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
        name: 'Home - Free Black and White Converter',
        url: homeUrl
      },
      {
        '@type': 'WebPage', 
        name: 'Batch Converter',
        url: canonicalUrl('/batch')
      },
      {
        '@type': 'WebPage',
        name: 'Examples Gallery',
        url: canonicalUrl('/examples')
      },
      {
        '@type': 'WebPage',
        name: 'Newborn Photography',
        url: canonicalUrl('/newborn-black-and-white-images')
      },
      {
        '@type': 'WebPage',
        name: 'Professional Converter',
        url: canonicalUrl('/image-black-and-white-converter')
      },
      {
        '@type': 'WebPage',
        name: 'How to Use Guide',
        url: canonicalUrl('/how-to-use')
      },
      {
        '@type': 'WebPage',
        name: 'Blog & Tips',
        url: canonicalUrl('/blog')
      },
      {
        '@type': 'WebPage',
        name: 'FAQ & Support',
        url: canonicalUrl('/faq')
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
