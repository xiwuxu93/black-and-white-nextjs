import { ConverterExperience } from '@/components/home/converter-experience'
import {
  HOME_FAQ_SCHEMA,
  HOWTO_SCHEMA,
  MarketingSections
} from '@/components/home/marketing-sections'
import { StructuredData } from '@/components/seo/structured-data'

export default function HomePage() {
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
