import { Metadata } from 'next'
import { ConverterExperience } from '@/components/home/converter-experience'
import {
  HOME_FAQ_SCHEMA,
  HOWTO_SCHEMA,
  MarketingSections
} from '@/components/home/marketing-sections'
import { StructuredData } from '@/components/seo/structured-data'
import { canonicalUrl, getPageAlternates } from '@/lib/seo'
import { getDictionary } from '@/locales'

interface Props {
  params: { locale: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const alternates = getPageAlternates('/', params.locale)
  const canonical = alternates.canonical
  const dict = getDictionary(params.locale)
  return {
    title: `${dict.home.heroTitle} - Make Image Black and White Online`,
    description: dict.home.heroSubtitle,
    alternates,
    openGraph: {
      url: canonical,
      title: `${dict.home.heroTitle} - Make Image Black and White Online`,
      description: dict.home.heroSubtitle
    }
  }
}

export default function HomePage({ params }: Props) {
  const dict = getDictionary(params.locale)
  return (
    <>
      <StructuredData type="howto" data={HOWTO_SCHEMA(dict)} />
      <StructuredData type="faq" data={HOME_FAQ_SCHEMA(dict)} />
      <ConverterExperience
        isLandingPage={true}
        heroTitle={dict.home.heroTitle}
        heroSubtitle={dict.home.heroSubtitle}
        heroBadgeText={dict.common.freeBwConverter}
        heroFeatureBadges={[...dict.home.badges]}
        marketingContent={<MarketingSections dict={dict} />}
      />
    </>
  )
}
