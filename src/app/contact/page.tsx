import { Metadata } from 'next'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Mail, MessageSquare, HelpCircle, Shield } from 'lucide-react'
import Link from 'next/link'
import { canonicalUrl } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Contact Us - BWConverter Support',
  description: 'Get in touch with the BWConverter team. Email our support staff or explore self-service resources for fast answers about the black and white image converter.',
  alternates: {
    canonical: canonicalUrl('/contact')
  },
  openGraph: {
    title: 'Contact BWConverter Support',
    description: 'Need help with the black and white image converter? Email our support team or find quick answers in the FAQ.',
    url: canonicalUrl('/contact')
  }
}

const SUPPORT_EMAIL = 'support@bwconverter.com'

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          <Badge className="mb-4" variant="secondary">
            <Mail className="w-4 h-4 mr-2" />
            Contact BWConverter
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            We’re Here to Help
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Whether you have a support question, partnership idea, or feedback about the converter, the team typically replies within one business day.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center">
                <Mail className="w-5 h-5 text-primary-600 dark:text-primary-300" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Email Support
              </h2>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Send us a message with your question, screenshots, or feature request. We respond Monday–Friday (UTC+8).
            </p>
            <a
              href={`mailto:${SUPPORT_EMAIL}`}
              className="inline-flex items-center text-primary-600 dark:text-primary-300 font-medium"
            >
              {SUPPORT_EMAIL}
            </a>
          </Card>

          <Card className="p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                <HelpCircle className="w-5 h-5 text-blue-600 dark:text-blue-300" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Quick Answers
              </h2>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Prefer self-service? The FAQ covers supported formats, privacy details, and troubleshooting steps for the converter.
            </p>
            <Link href="/faq">
              <Button variant="outline" className="w-full">
                Browse FAQ
              </Button>
            </Link>
          </Card>
        </div>

        <Card className="p-6 mt-6">
          <div className="flex items-start space-x-3">
            <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
              <Shield className="w-5 h-5 text-green-600 dark:text-green-300" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Responsible Use and Feedback
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-3">
                BWConverter processes images entirely in your browser. If you spot accessibility issues, translation errors, or privacy concerns, please let us know so we can improve quickly.
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                Business inquiries and press requests are also welcome via the support inbox.
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6 mt-6">
          <div className="flex items-start space-x-3">
            <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
              <MessageSquare className="w-5 h-5 text-purple-600 dark:text-purple-300" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                What to Include in Your Message
              </h2>
              <ul className="list-disc ml-5 space-y-1 text-gray-600 dark:text-gray-400">
                <li>Your device and browser (for debugging rendering issues)</li>
                <li>Steps to reproduce a problem, if applicable</li>
                <li>Any relevant screenshots or sample files</li>
              </ul>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
