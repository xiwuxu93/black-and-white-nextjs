import { Metadata } from 'next'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ChevronDown, HelpCircle, CheckCircle, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { ContentAd } from '@/components/ads/ad-placements'
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
          answer: "Store the numeric slider values (contrast, brightness, shadows, highlights, grain) returned by BWConverter in your DAM or CMS. When you reopen the converter, hydrate those values before triggering the worker message—our WebAssembly pipeline is deterministic, so identical inputs produce identical results."
        },
        {
          question: "Can I automate publishing before/after sliders?",
          answer: "Yes. Bundle `/worker.js` with your front-end build, capture both the colour original and BWConverter output via `downloadCanvasImage`, and save the preset metadata alongside the assets. The integration checklist at `/image-black-and-white-converter` shows the exact pattern."
        },
        {
          question: "What is the recommended RAW → delivery workflow?",
          answer: "Cull and colour-correct in Lightroom or Capture One, export 16-bit TIFF or high-quality JPEG files, and then run them through BWConverter for monochrome mastering. Use the QA checklist on `/how-to-use` together with the newborn case study timeline to validate tone curves before delivering galleries."
        }
      ]
    },
    {
      category: "Technical Specifications",
      questions: [
        {
          question: "How large can my files be?",
          answer: "The hosted UI caps uploads at 10 MB for performance, but the engine itself handles substantially larger files when self-hosted. For 40+ MP frames, convert to a 16-bit TIFF or JPEG before upload, or embed the worker locally without the UI limit."
        },
        {
          question: "Does the converter change image dimensions?",
          answer: "No. We render to a canvas that matches the original width and height. If you need to constrain file size, pass a `maxBytes` value to `downloadCanvasImage`—this preserves resolution while adjusting compression."
        },
        {
          question: "Can I create custom presets?",
          answer: "Absolutely. Duplicate any object in `DEFAULT_PRESETS`, tweak the numbers, and persist it via local storage or your CMS schema. The converter automatically recognises presets that follow the same shape."
        }
      ]
    },
    {
      category: "Privacy & Compliance",
      questions: [
        {
          question: "Are images or analytics sent to your servers?",
          answer: "No image pixels ever leave your browser. Optional Google Analytics collects anonymous usage data (page views, load times) only—review `/privacy` for the full statement."
        },
        {
          question: "How do I document privacy for client audits?",
          answer: "Share the signed Statement of Intent on `/about`, capture a network log that shows zero upload requests during conversion, and attach the QA checklist from `/how-to-use` to demonstrate your process."
        },
        {
          question: "Can I run BWConverter offline?",
          answer: "Yes. Serve the app from a local server or bundle it with a Chromium kiosk/Electron shell. Workers and the WebAssembly engine have no external API dependencies."
        }
      ]
    },
    {
      category: "Troubleshooting",
      questions: [
        {
          question: "Preview rendering pauses on very large files. Why?",
          answer: "High-resolution frames can exhaust browser memory. Downsize the file before previewing or move final exports to the `/batch` worker, which processes one frame at a time."
        },
        {
          question: "Downloads are larger than my client’s limit. What should I check?",
          answer: "Ensure every download call includes the `maxBytes` parameter and confirm the output size in your QA log. This keeps exports within print or CMS restrictions."
        },
        {
          question: "Where can I find sample outputs for comparison?",
          answer: "Download verified before/after frames from `/samples/` or inside the newborn guide. Each sample notes the preset and settings used so you can reproduce the look."
        }
      ]
    },
    {
      category: "Advanced Features",
      questions: [
        {
          question: "How do I capture slider metadata for analytics?",
          answer: "Listen to slider change events, store the values in your analytics platform, and associate them with session IDs. This helps you learn which looks your team prefers and whether additional presets are needed."
        },
        {
          question: "Can I hook BWConverter into a CI/CD pipeline?",
          answer: "Yes. Use Node + Puppeteer to run the converter headlessly, process reference images, and compare histograms against the `/samples/` outputs during automated tests."
        },
        {
          question: "Is batch processing available via API?",
          answer: "The `/batch` route exposes the same worker used in the UI. You can instantiate it inside your own app, feed it a file list, and retrieve processed ImageData objects for downstream automation."
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
            Get instant answers to common questions about our black and white image converter. 
            Can't find what you're looking for? Feel free to reach out!
          </p>
        </div>

        {/* Content Ad */}
        <ContentAd />

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
            If you couldn't find the answer you were looking for, don't hesitate to try our converter 
            or explore our detailed guides.
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
            <li>• Use high-resolution images for the best quality conversion</li>
            <li>• Photos with good contrast and lighting convert better</li>
            <li>• Try different presets to find the perfect style for your image</li>
            <li>• Use batch processing for multiple images with consistent settings</li>
            <li>• Your images are processed locally - no privacy concerns</li>
          </ul>
        </Card>
      </div>
    </div>
    </>
  )
}
