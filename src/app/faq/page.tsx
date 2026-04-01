import { Metadata } from 'next'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ChevronDown, HelpCircle, CheckCircle, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { canonicalUrl } from '@/lib/seo'
import { StructuredData } from '@/components/seo/structured-data'

export const metadata: Metadata = {
  title: 'FAQ - Black and White Image Converter | Common Questions Answered',
  description: 'Get answers to frequently asked questions about our black and white image converter. Learn about supported formats, processing quality, privacy, and more.',
  keywords: ['black and white converter FAQ', 'image converter questions', 'black and white photo help'],
  alternates: {
    canonical: canonicalUrl('/faq')
  },
  openGraph: {
    title: 'FAQ - Black and White Image Converter | Common Questions Answered',
    description: 'Get answers to frequently asked questions about our black and white image converter. Learn about supported formats, processing quality, privacy, and more.',
    url: canonicalUrl('/faq')
  }
}

export default function FAQPage() {
  const faqs = [
    {
      category: "Workflow & Production",
      questions: [
        {
          question: "How do I keep preset looks consistent across projects?",
          answer: "Save your slider values (contrast, brightness, highlights, shadows, grain) with the project. Reusing the same values on similar lighting gives consistent black and white output."
        },
        {
          question: "When should I use the batch black and white converter?",
          answer: "Use `/batch-black-and-white-converter` when you need one baseline look across many photos. It is useful for galleries, catalog images, and first-pass client previews."
        },
        {
          question: "What is the recommended RAW → delivery workflow?",
          answer: "Cull and color-correct in Lightroom or Capture One first, then export high-quality JPEG/TIFF files and convert in BWConverter. Do final spot adjustments only on selected keepers."
        }
      ]
    },
    {
      category: "Technical Specifications",
      questions: [
        {
          question: "How large can my files be?",
          answer: "The hosted interface is tuned for files up to 10 MB for smoother browser performance. Very large frames may still work, but available RAM becomes the practical limit."
        },
        {
          question: "Does the converter change image dimensions?",
          answer: "No. Output keeps the original width and height. If you need smaller files, lower quality/compression at export."
        },
        {
          question: "Which formats are supported?",
          answer: "For standard conversion, BWConverter supports common image formats such as JPG, PNG, and WebP. The logo converter also supports SVG input and preserves transparency."
        }
      ]
    },
    {
      category: "Privacy & Compliance",
      questions: [
        {
          question: "Are images or analytics sent to your servers?",
          answer: "Image pixels are processed locally in your browser. Optional analytics can collect anonymous usage events like page views; details are listed on `/privacy`."
        },
        {
          question: "How do I document privacy for client audits?",
          answer: "Use `/privacy` and `/about` as policy references, then capture a browser network log during conversion to show there are no image upload requests."
        },
        {
          question: "Can I run BWConverter offline?",
          answer: "Yes. Once assets are available locally, conversion can run without sending files to external APIs."
        }
      ]
    },
    {
      category: "Troubleshooting",
      questions: [
        {
          question: "Preview rendering pauses on very large files. Why?",
          answer: "High-resolution images can exhaust browser memory. Try smaller batches, close extra tabs, or export a lighter intermediate file before conversion."
        },
        {
          question: "Downloads are larger than my client’s limit. What should I check?",
          answer: "Use JPG/WebP with lower quality settings and verify output size before delivery. PNG exports are usually larger for photo content."
        },
        {
          question: "Where can I find sample outputs for comparison?",
          answer: "Visit `/examples` to compare before/after results and inspect style choices for portraits, newborn sessions, and street scenes."
        }
      ]
    },
    {
      category: "Advanced Features",
      questions: [
        {
          question: "Can I integrate the conversion worker in my own app?",
          answer: "Yes. You can reuse worker-based processing in a custom frontend setup. This is useful if you need black and white conversion inside an internal CMS."
        },
        {
          question: "Can I define my own presets?",
          answer: "Yes. Create a preset object with your preferred slider values and store it in local storage or your own settings layer."
        },
        {
          question: "Is batch processing available via API?",
          answer: "There is no public hosted API endpoint. Batch processing is currently delivered through the web UI and browser worker architecture."
        }
      ]
    }
  ]

  const faqStructuredData = {
    questions: faqs.flatMap(category =>
      category.questions.map(({ question, answer }) => ({
        question,
        answer
      }))
    )
  }

  return (
    <>
      <StructuredData type="faq" data={faqStructuredData} />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge className="mb-4" variant="secondary">
            <HelpCircle className="w-4 h-4 mr-2" />
            FAQ
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Practical answers about workflow, file handling, privacy, and troubleshooting.
          </p>
        </div>

        {/* FAQ Categories */}
        <div className="space-y-8">
          {faqs.map((category, categoryIndex) => (
            <Card key={categoryIndex} className="p-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                <CheckCircle className="w-6 h-6 text-green-500 mr-3" />
                {category.category}
              </h2>
              
              <div className="space-y-4">
                {category.questions.map((faq, index) => (
                  <details key={index} className="group border border-gray-200 dark:border-gray-700 rounded-lg">
                    <summary className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white pr-4">
                        {faq.question}
                      </h3>
                      <ChevronDown className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform flex-shrink-0" />
                    </summary>
                    
                    <div className="px-4 pb-4 pt-2 border-t border-gray-200 dark:border-gray-700">
                      <p className="text-gray-600 dark:text-gray-400 leading-relaxed whitespace-pre-line">
                        {faq.answer}
                      </p>
                    </div>
                  </details>
                ))}
              </div>
            </Card>
          ))}
        </div>

        {/* Still Have Questions */}
        <Card className="p-8 mt-12 text-center bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-200 dark:border-blue-800">
          <HelpCircle className="w-12 h-12 text-blue-600 dark:text-blue-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Still Have Questions?
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
            If your use case is not covered here, start with the guide or contact support.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/">
              <Button size="lg">
                Try the Converter
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Link href="/how-to-use">
              <Button variant="outline" size="lg">
                Read the Guide
              </Button>
            </Link>
          </div>
        </Card>

        {/* Quick Tips */}
        <Card className="p-6 mt-8 bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
            <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
            Quick Tips for Best Results
          </h3>
          <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
            <li>• Start from a well-exposed image with clear subject separation</li>
            <li>• Apply one preset first, then tune highlights and shadows</li>
            <li>• Use batch mode for consistency, then refine select images individually</li>
            <li>• Prefer JPG/WebP for smaller delivery files; PNG for transparency</li>
            <li>• Conversion runs locally, so originals stay on your device</li>
          </ul>
        </Card>
      </div>
    </div>
    </>
  )
}
