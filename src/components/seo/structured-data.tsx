import { WebSite, WithContext, SoftwareApplication, HowTo, FAQPage, BlogPosting } from 'schema-dts'
import { canonicalUrl, SITE_URL } from '@/lib/seo'

interface StructuredDataProps {
  type: 'website' | 'application' | 'howto' | 'faq' | 'article'
  data: any
}

export function StructuredData({ type, data }: StructuredDataProps) {
  let structuredData: WithContext<any>

  switch (type) {
    case 'website':
      structuredData = {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'BWConverter - Free Black and White Image Converter',
        alternateName: 'Black and White Image Converter Online',
        description: 'Free black and white image converter with local browser processing, tonal presets, and instant preview.',
        url: canonicalUrl('/'),
        keywords: 'black and white image, black and white image converter, convert image to black and white, monochrome image',
        inLanguage: 'en-US',
        publisher: {
          '@type': 'Organization',
          name: 'BWConverter - Black and White Image Converter',
          url: canonicalUrl('/'),
          logo: {
            '@type': 'ImageObject',
            url: `${SITE_URL}/logo.png`
          }
        }
      } satisfies WithContext<WebSite>
      break

    case 'application':
      structuredData = {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: 'BWConverter - Free Black and White Image Converter Online',
        alternateName: 'Black and White Photo Converter',
        description: 'Free online tool to convert color images to black and white photos in the browser with local processing and instant preview.',
        url: canonicalUrl('/'),
        applicationCategory: 'MultimediaApplication',
        applicationSubCategory: 'Photo Editor',
        operatingSystem: 'Any',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
          availability: 'https://schema.org/InStock'
        },
        featureList: [
          'Convert images to black and white instantly',
          'Black and white presets for classic, dramatic, and film-style looks',
          'Editing controls for contrast, brightness, highlights, shadows, and grain',
          'Batch black and white image processing',
          'Multiple export formats for black and white images (PNG, JPEG, WebP)',
          'Real-time black and white preview',
          'No watermarks on black and white images',
          'Free black and white image conversion'
        ],
        screenshot: `${SITE_URL}/website1.png`,
        image: `${SITE_URL}/black-and-white-image.png`,
        author: {
          '@type': 'Organization',
          name: 'BWConverter - Black and White Image Converter'
        }
      } satisfies WithContext<SoftwareApplication>
      break

    case 'howto':
      structuredData = {
        '@context': 'https://schema.org',
        '@type': 'HowTo',
        name: data.name,
        description: data.description,
        image: data.image,
        totalTime: data.totalTime,
        supply: data.supply || [],
        tool: data.tool || [],
        step: data.steps.map((step: any, index: number) => ({
          '@type': 'HowToStep',
          position: index + 1,
          name: step.name,
          text: step.text,
          image: step.image
        }))
      } satisfies WithContext<HowTo>
      break

    case 'faq':
      structuredData = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: data.questions.map((item: any) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.answer
          }
        }))
      } satisfies WithContext<FAQPage>
      break

    case 'article':
      structuredData = {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: data.title,
        description: data.description,
        image: data.image,
        author: {
          '@type': 'Person',
          name: data.author
        },
        publisher: {
          '@type': 'Organization',
          name: 'BWConverter',
          logo: {
            '@type': 'ImageObject',
            url: `${SITE_URL}/logo.png`
          }
        },
        datePublished: data.publishedDate,
        dateModified: data.modifiedDate || data.publishedDate,
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': data.url
        },
        keywords: data.keywords
      } satisfies WithContext<BlogPosting>
      break

    default:
      return null
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData)
      }}
    />
  )
}
