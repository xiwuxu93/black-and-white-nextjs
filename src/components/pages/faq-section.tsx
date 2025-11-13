"use client"

import * as React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ChevronDown, Search, HelpCircle, ThumbsUp, ThumbsDown } from "lucide-react"
import { cn } from "@/lib/utils"

interface FAQ {
  id: string
  question: string
  answer: string
  category: string
  tags: string[]
  helpful: number
  notHelpful: number
}

export function FAQSection() {
  const [searchTerm, setSearchTerm] = React.useState('')
  const [selectedCategory, setSelectedCategory] = React.useState('all')
  const [openItems, setOpenItems] = React.useState<string[]>([])

  const faqs: FAQ[] = [
    {
      id: '1',
      question: 'How do I import images into the converter?',
      answer: 'Click the upload area to choose files or drag and drop images. All processing happens locally in your browser; nothing is uploaded. Supported formats include JPG, PNG, and WebP.',
      category: 'Basics',
      tags: ['upload', 'file', 'usage'],
      helpful: 45,
      notHelpful: 2
    },
    {
      id: '2',
      question: 'Which file formats are supported?',
      answer: 'We support common image formats: PNG, JPG/JPEG, and WebP. Some examples may show GIF previews, but conversion focuses on static images. Non-image types (documents, audio, video) are not supported.',
      category: 'Technical',
      tags: ['formats', 'file types', 'support'],
      helpful: 32,
      notHelpful: 1
    },
    {
      id: '3',
      question: 'What should I do if processing fails?',
      answer: 'Check: 1) The file format is supported; 2) The image size is not exhausting browser memory; 3) Refresh the page and try again; 4) Use the latest Chrome/Edge/Firefox. Because processing is local, network issues rarely affect conversion.',
      category: 'Troubleshooting',
      tags: ['failure', 'error', 'processing'],
      helpful: 28,
      notHelpful: 3
    },
    {
      id: '4',
      question: 'How is my data kept secure?',
      answer: 'All images are processed locally in your browser and are never uploaded or stored on our servers. We do not collect or retain your images. Minimal analytics cookies may be used only with your consent (see Privacy Policy).',
      category: 'Privacy',
      tags: ['security', 'privacy', 'data protection'],
      helpful: 67,
      notHelpful: 0
    },
    {
      id: '5',
      question: 'Can I process images in bulk?',
      answer: 'Yes. Go to the Batch Black & White Converter to select multiple images for local processing at once. The number is limited by your browser performance and memory.',
      category: 'Advanced',
      tags: ['batch', 'multiple files', 'processing'],
      helpful: 23,
      notHelpful: 1
    },
    {
      id: '6',
      question: 'How do I download the results?',
      answer: 'Click Download to save the image to your device after processing. We do not create share links and do not store any files or backups on our servers.',
      category: 'Basics',
      tags: ['download', 'save', 'result'],
      helpful: 41,
      notHelpful: 1
    }
  ]

  const categories = [
    'all',
    ...Array.from(new Set(faqs.map(faq => faq.category)))
  ]

  const filteredFAQs = React.useMemo(() => {
    return faqs.filter(faq => {
      const matchesSearch = searchTerm === '' ||
        faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faq.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      
      const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory
      
      return matchesSearch && matchesCategory
    })
  }, [faqs, searchTerm, selectedCategory])

  const toggleOpen = (id: string) => {
    setOpenItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    )
  }

  return (
    <div className="space-y-8">
      {/* Search and filter */}
      <div className="space-y-4">
        {/* Search box */}
        <div className="relative max-w-md mx-auto">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search questions or keywords..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Category filter */}
        <div className="flex flex-wrap justify-center gap-2">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-colors",
                selectedCategory === category
                  ? "bg-primary-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
              )}
            >
              {category === 'all' ? 'All' : category}
            </button>
          ))}
        </div>
      </div>

      {/* FAQ list */}
      <div className="space-y-4">
        {filteredFAQs.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <HelpCircle className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                No matching questions found
              </h3>
              <p className="text-muted-foreground text-center">
                Try different keywords or choose another category
              </p>
            </CardContent>
          </Card>
        ) : (
          filteredFAQs.map((faq) => {
            const isOpen = openItems.includes(faq.id)
            
            return (
              <Card key={faq.id} className="overflow-hidden">
                <button
                  onClick={() => toggleOpen(faq.id)}
                  className="w-full text-left p-6 hover:bg-accent transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                        {faq.question}
                      </h3>
                      <div className="flex items-center space-x-2">
                        <Badge variant="secondary">{faq.category}</Badge>
                        {faq.tags.map(tag => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <ChevronDown 
                      className={cn(
                        "h-5 w-5 text-muted-foreground transition-transform",
                        isOpen && "rotate-180"
                      )}
                    />
                  </div>
                </button>
                
                {isOpen && (
                  <CardContent className="pt-0 pb-6">
                    <div className="border-t pt-4">
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                        {faq.answer}
                      </p>
                      
                      {/* Helpfulness feedback */}
                      <div className="flex items-center justify-between border-t pt-4">
                        <span className="text-sm text-muted-foreground">
                          Was this answer helpful?
                        </span>
                        <div className="flex items-center space-x-4">
                          <button className="flex items-center space-x-1 text-sm text-muted-foreground hover:text-success-600 transition-colors">
                            <ThumbsUp className="h-4 w-4" />
                            <span>{faq.helpful}</span>
                          </button>
                          <button className="flex items-center space-x-1 text-sm text-muted-foreground hover:text-error-600 transition-colors">
                            <ThumbsDown className="h-4 w-4" />
                            <span>{faq.notHelpful}</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                )}
              </Card>
            )
          })
        )}
      </div>

      {/* Contact support */}
      <Card className="bg-primary-50 dark:bg-primary-900/20 border-primary-200 dark:border-primary-800">
        <CardContent className="p-6 text-center">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            Didn’t find what you need?
          </h3>
          <p className="text-muted-foreground mb-4">
            Our support team is here to help
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
              Contact Support
            </button>
            <button className="px-6 py-2 border border-primary-600 text-primary-600 rounded-lg hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors">
              Submit a Question
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
