import type { Metadata } from 'next'
import PdfPage from '@/components/pages/pdf-page'
import { canonicalUrl } from '@/lib/seo'
import { getDictionary } from '@/locales'

interface Props {
  params: { locale: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const dict = getDictionary(params.locale)
  const canonical = canonicalUrl(`/${params.locale}/convert-pdf-to-black-and-white/`)
  return {
    title: dict.pdf.metaTitle,
    description: dict.pdf.metaDesc,
    alternates: {
      canonical
    },
    openGraph: {
      title: dict.pdf.metaTitle,
      description: dict.pdf.metaDesc,
      url: canonical
    }
  }
}

export default function PdfToBlackAndWhitePage({ params }: Props) {
  const dict = getDictionary(params.locale)
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': dict.pdf.faqQuestions.map((faq) => ({
      '@type': 'Question',
      'name': faq.q,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': faq.a
      }
    }))
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <PdfPage dict={dict} />
    </>
  )
}
