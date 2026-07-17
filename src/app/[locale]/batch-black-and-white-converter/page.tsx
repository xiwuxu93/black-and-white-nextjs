import type { Metadata } from 'next'
import BatchPage from '@/components/pages/batch-page'
import { canonicalUrl } from '@/lib/seo'
import { getDictionary } from '@/locales'

interface Props {
  params: { locale: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const dict = getDictionary(params.locale)
  const canonical = canonicalUrl(`/${params.locale}/batch-black-and-white-converter/`)
  return {
    title: dict.batchPage.heroTitle + ' - ' + dict.batchPage.heroBadge,
    description: dict.batchPage.heroSubtitle,
    alternates: {
      canonical
    },
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
