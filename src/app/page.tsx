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
        heroSubtitle="I built this private tool to get professional monochrome tones without the complexity of desktop editors. No uploads, no grain loss, and 100% browser-resident processing."
        marketingContent={<MarketingSections />}
      />
    </>
  )
}
