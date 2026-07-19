import type { Metadata } from 'next'
import BatchPage from '@/components/pages/batch-page'
import { canonicalUrl, getPageAlternates } from '@/lib/seo'
import { getDictionary } from '@/locales'

interface Props {
  params: { locale: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const dict = getDictionary(params.locale)
  const alternates = getPageAlternates('/batch-black-and-white-converter/', params.locale)
  const canonical = alternates.canonical
  return {
    title: dict.batchPage.heroTitle + ' - ' + dict.batchPage.heroBadge,
    description: dict.batchPage.heroSubtitle,
    alternates,
    openGraph: {
      title: dict.batchPage.heroTitle + ' - ' + dict.batchPage.heroBadge,
      description: dict.batchPage.heroSubtitle,
      url: canonical
    }
  }
}

export default function BatchBlackAndWhiteConverterPage({ params }: Props) {
  const dict = getDictionary(params.locale)
  return <BatchPage dict={dict} />
}
