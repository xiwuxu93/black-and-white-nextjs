import type { Metadata } from 'next'
import PdfPage from '@/components/pages/pdf-page'
import { canonicalUrl, getPageAlternates } from '@/lib/seo'
import { getDictionary } from '@/locales'

interface Props {
  params: { locale: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const dict = getDictionary(params.locale)
  const alternates = getPageAlternates('/convert-pdf-to-black-and-white/', params.locale)
  const canonical = alternates.canonical
  return {
    title: dict.pdf.metaTitle,
    description: dict.pdf.metaDesc,
    alternates,
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
