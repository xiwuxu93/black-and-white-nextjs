import type { Metadata } from 'next'
import PdfPage from '@/components/pages/pdf-page'
import { canonicalUrl } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Convert PDF to Black and White Online - 100% Free Grayscale PDF',
  description: 'Easily convert color PDF to black and white online for free. Change PDF to black and white or grayscale locally in your browser. Secure, fast, and no page limits.',
  keywords: [
    'convert pdf to black and white',
    'convert color pdf to black and white',
    'change pdf to black and white',
    'how to make a pdf black and white',
    'pdf color to black and white',
    'how to convert pdf to black and white',
    'how to change pdf to black and white',
    'pdf to black and white'
  ],
  alternates: {
    canonical: canonicalUrl('/en/convert-pdf-to-black-and-white/')
  },
  openGraph: {
    title: 'Convert PDF to Black and White Online - 100% Free Grayscale PDF',
    description: 'Easily convert color PDF to black and white online for free. Change PDF to black and white or grayscale locally in your browser. Secure, fast, and no page limits.',
    url: canonicalUrl('/en/convert-pdf-to-black-and-white/')
  }
}

export default function PdfToBlackAndWhitePage() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': [
      {
        '@type': 'Question',
        'name': 'How to make a PDF black and white?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'To make a PDF black and white, upload your color document to BWConverter\'s free online tool. Adjust the contrast and brightness sliders to your preference, then click \'Convert to Black & White\'. The processing happens 100% locally in your browser, and you can download the completed document instantly.'
        }
      },
      {
        '@type': 'Question',
        'name': 'How to change a color PDF to black and white?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'You can change a color PDF to black and white by grayscaling it using BWConverter. Upload the file, select your rendering DPI (Standard 150 DPI or High Res 200 DPI), and apply monochrome filters. It maps all colors to optimized grayscales for crisp office printing.'
        }
      },
      {
        '@type': 'Question',
        'name': 'How to save a PDF in black and white on Mac or Windows?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'On Mac, Windows, or mobile devices, you can drag your document into BWConverter. Our browser-based B&W PDF converter works on any operating system without installing extra software. Once converted, click \'Download Grayscale PDF\' to save it to your device.'
        }
      },
      {
        '@type': 'Question',
        'name': 'Will converting color PDF to black and white save printer ink?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'Yes. Converting color graphics, highlights, charts, and text to pure black and white or grayscale prevents your printer from using expensive color inks and toners, saving you significant office printing costs.'
        }
      },
      {
        '@type': 'Question',
        'name': 'Can I convert PDF from color to black and white without Adobe Acrobat?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'Yes. While Adobe Acrobat Pro requires a paid subscription to convert PDF to grayscale, BWConverter offers a 100% free online alternative. You do not need to create an account or pay any fees to convert your documents.'
        }
      }
    ]
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <PdfPage />
    </>
  )
}
