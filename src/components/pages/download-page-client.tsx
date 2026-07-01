'use client'

import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useConversionStore } from '@/store/conversionStore'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Download, 
  RefreshCw, 
  FileText, 
  CheckCircle2, 
  ArrowLeft, 
  FileImage, 
  BookOpen 
} from 'lucide-react'
import Link from 'next/link'

export default function DownloadPageClient() {
  const router = useRouter()
  const { data, clearConversionData } = useConversionStore()

  useEffect(() => {
    // If no conversion has occurred, redirect back to home
    if (!data) {
      router.replace('/')
    }
  }, [data, router])

  if (!data) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <div className="text-center">
          <RefreshCw className="w-8 h-8 animate-spin text-primary-600 mx-auto mb-4" />
          <p className="text-gray-500">Redirecting to homepage...</p>
        </div>
      </div>
    )
  }

  const handleConvertAnother = () => {
    clearConversionData()
    router.push('/')
  }

  // Calculate compression savings percentage
  const origSizeNum = parseFloat(data.originalSize)
  const procSizeNum = parseFloat(data.processedSize)
  const savingsPct = 
    origSizeNum > 0 && procSizeNum > 0 
      ? Math.round(((origSizeNum - procSizeNum) / origSizeNum) * 100) 
      : 0

  return (
    <div className="min-h-[85vh] bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4">
      <div className="container mx-auto max-w-5xl">
        {/* Navigation Breadcrumb */}
        <div className="mb-8">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleConvertAnother}
            className="text-gray-600 dark:text-gray-400 hover:text-gray-900"
          >
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Converter
          </Button>
        </div>

        <div className="grid lg:grid-cols-12 gap-8">
          {/* File Preview Column (Left) */}
          <div className="lg:col-span-7 space-y-6">
            <Card className="p-6 bg-white dark:bg-gray-800 border-gray-100 dark:border-gray-700 overflow-hidden flex flex-col justify-center items-center min-h-[400px]">
              <Badge className="mb-4 bg-green-500 hover:bg-green-600 text-white">
                ✓ Converted Successfully
              </Badge>
              
              {data.fileType === 'image' ? (
                <div className="w-full relative group rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 p-2">
                  <img 
                    src={data.fileUrl} 
                    alt="Grayscale preview" 
                    className="w-full max-h-[500px] object-contain mx-auto rounded-xl"
                  />
                </div>
              ) : (
                <div className="text-center p-12 bg-gray-50 dark:bg-gray-900/50 rounded-2xl border-2 border-dashed border-gray-200 dark:border-gray-800 max-w-sm w-full">
                  <FileText className="w-24 h-24 text-red-500 mx-auto mb-4 stroke-1" />
                  <p className="font-bold text-gray-700 dark:text-gray-300 truncate" title={data.filename}>
                    {data.filename}
                  </p>
                  <Badge variant="secondary" className="mt-2">
                    PDF Document
                  </Badge>
                </div>
              )}
            </Card>
          </div>

          {/* Action Column (Right) */}
          <div className="lg:col-span-5 space-y-6">
            <Card className="p-6 bg-white dark:bg-gray-800 border-gray-100 dark:border-gray-700 space-y-6">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight flex items-center">
                  <CheckCircle2 className="w-7 h-7 text-green-500 mr-2 shrink-0" /> File is Ready!
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400 break-all">
                  {data.filename}
                </p>
              </div>

              {/* Metrics */}
              <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 dark:bg-gray-900/50 rounded-2xl border border-gray-100 dark:border-gray-800">
                <div>
                  <span className="block text-xs text-gray-400 font-medium">Original Size</span>
                  <span className="text-lg font-bold text-gray-700 dark:text-gray-300">{data.originalSize} MB</span>
                </div>
                <div>
                  <span className="block text-xs text-gray-400 font-medium">New Size</span>
                  <span className="text-lg font-bold text-gray-900 dark:text-white">{data.processedSize} MB</span>
                </div>
                {savingsPct > 0 && (
                  <div className="col-span-2 pt-2 border-t border-gray-200/50 dark:border-gray-800/50 flex justify-between items-center">
                    <span className="text-xs text-green-600 dark:text-green-400 font-semibold">Tonal Compression</span>
                    <Badge variant="secondary" className="bg-green-50 dark:bg-green-950/30 text-green-700 dark:text-green-400 hover:bg-green-100">
                      Saved {savingsPct}% ink volume
                    </Badge>
                  </div>
                )}
              </div>

              {/* Primary Download CTA */}
              <div className="space-y-3">
                <a 
                  href={data.fileUrl} 
                  download={data.filename} 
                  className="block w-full"
                >
                  <Button 
                    size="lg" 
                    className="w-full rounded-full font-bold h-14 bg-green-600 hover:bg-green-700 text-white flex items-center justify-center gap-2 shadow-lg shadow-green-600/20"
                  >
                    <Download className="w-5 h-5" /> Download Grayscale File
                  </Button>
                </a>

                <Button 
                  variant="outline" 
                  size="lg"
                  onClick={handleConvertAnother}
                  className="w-full rounded-full h-12 text-sm border-gray-200 dark:border-gray-700 hover:bg-gray-50"
                >
                  <RefreshCw className="w-4 h-4 mr-2" /> Convert Another File
                </Button>
              </div>

              {/* Privacy Shield */}
              <p className="text-[10px] text-center text-gray-400">
                🔒 Private local processing: Your file remains entirely in your browser memory and is never uploaded to our servers.
              </p>
            </Card>

            {/* Internal Guides Link (Satisfies content redirection / ad booster) */}
            <Card className="p-6 bg-gradient-to-br from-blue-50/50 to-indigo-50/30 dark:from-blue-950/10 dark:to-indigo-950/5 border-blue-100/50 dark:border-blue-900/30">
              <h3 className="font-bold text-gray-900 dark:text-white text-sm mb-3 flex items-center">
                <BookOpen className="w-4 h-4 text-blue-500 mr-2" /> Pro Photography Guides
              </h3>
              <p className="text-xs text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                Want to create beautiful monochrome photos? Read our workflow guides to capture high-contrast film styles.
              </p>
              <div className="space-y-2.5">
                <Link 
                  href="/newborn-photography-guide" 
                  className="block text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center"
                >
                  📸 Newborn B&W Editing Workflow Notes
                </Link>
                <Link 
                  href="/blog" 
                  className="block text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center"
                >
                  ✍️ Explore our Monochrome Photography Blog
                </Link>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
