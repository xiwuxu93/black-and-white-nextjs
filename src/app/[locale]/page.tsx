import { Metadata } from 'next'
import { ConverterExperience } from '@/components/home/converter-experience'
import {
  HOME_FAQ_SCHEMA,
  HOWTO_SCHEMA,
  MarketingSections
} from '@/components/home/marketing-sections'
import { StructuredData } from '@/components/seo/structured-data'
import { canonicalUrl } from '@/lib/seo'

interface Props {
  params: { locale: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const canonical = canonicalUrl(`/${params.locale}/`)
  return {
    alternates: {
      canonical
    },
    openGraph: {
      url: canonical
    }
  }
}

export default function EnglishHomePage() {
  return (
    <>
      <StructuredData type="howto" data={HOWTO_SCHEMA} />
      <StructuredData type="faq" data={HOME_FAQ_SCHEMA} />
      <ConverterExperience
        isLandingPage={true}
        heroTitle="Black and White Image Converter"
        heroSubtitle="Upload a color photo, turn it black and white, and download the result. The conversion runs in your browser, so the original file stays on your device."
        marketingContent={<MarketingSections />}
      />
    </>
  )
}
