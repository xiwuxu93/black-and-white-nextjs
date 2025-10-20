'use client'

import React, { useState, useCallback, useRef } from 'react'
import { UploadArea } from '@/components/bw-converter/upload-area'
import { ParameterPanel } from '@/components/bw-converter/parameter-panel'
import { PresetSelector } from '@/components/bw-converter/preset-selector'
import { ResultDisplay } from '@/components/bw-converter/result-display'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  ImageFilter, 
  DEFAULT_PRESETS, 
  DownloadFormat, 
  DOWNLOAD_FORMATS,
  WorkerMessage, 
  WorkerResponse,
  OriginalFileInfo 
} from '@/types/image-processing'
import { Palette, Zap, Users, Shield, ChevronRight } from 'lucide-react'
import { ContentAd } from '@/components/ads/ad-placements'
import Link from 'next/link'
import { StructuredData } from '@/components/seo/structured-data'
import {
  resolveFileInfo,
  sanitizeBaseName,
  findFormatByMime,
  findFormatByExtension,
  qualityForFormat,
  normalizeExtension
} from '@/lib/image-format'

const HOME_FAQ_SCHEMA = {
  questions: [
    {
      question: 'What is a black and white image converter?',
      answer: 'A black and white image converter is a tool that transforms color photos into monochrome images. Our converter uses advanced algorithms to create professional-quality black and white images while preserving important details and contrast.'
    },
    {
      question: 'Is this black and white image converter really free?',
      answer: 'Yes! Our black and white image converter is completely free to use. There are no hidden costs, watermarks, or registration requirements. Convert as many images to black and white as you want.'
    },
    {
      question: 'What image formats can I convert to black and white?',
      answer: 'Our black and white image converter supports all common image formats including JPG, JPEG, PNG, GIF, and WebP. You can convert any of these formats to high-quality black and white images.'
    },
    {
      question: 'How is this different from simple grayscale conversion?',
      answer: 'Our black and white image converter goes beyond simple grayscale. It uses professional techniques like luminance mapping, contrast enhancement, and selective tone adjustment to create stunning black and white images with rich detail and depth.'
    }
  ]
}

export default function HomePage() {
  // State management
  const [currentImageBitmap, setCurrentImageBitmap] = useState<ImageBitmap | null>(null)
  const [processedImageData, setProcessedImageData] = useState<ImageData | null>(null)
  const [filters, setFilters] = useState<ImageFilter>(DEFAULT_PRESETS.default)
  const [selectedPreset, setSelectedPreset] = useState('default')
  const [isProcessing, setIsProcessing] = useState(false)
  const [showEditor, setShowEditor] = useState(false)
  const [originalFileInfo, setOriginalFileInfo] = useState<OriginalFileInfo | null>(null)

  // Refs
  const workerRef = useRef<Worker | null>(null)
  const debounceTimerRef = useRef<NodeJS.Timeout>()
  const originalFileInfoRef = useRef<OriginalFileInfo | null>(null)
  const pendingDownloadFormatRef = useRef<DownloadFormat | null>(null)

  // Initialize worker
  const downloadProcessedImage = useCallback(async (imageData: ImageData) => {
    const canvas = document.createElement('canvas')
    canvas.width = imageData.width
    canvas.height = imageData.height
    const ctx = canvas.getContext('2d')

    if (!ctx) {
      setIsProcessing(false)
      return
    }

    ctx.putImageData(imageData, 0, 0)
    const { downloadCanvasImage } = await import('@/lib/utils')

    const originalInfo = originalFileInfoRef.current
    const defaultFormat =
      (originalInfo && (findFormatByMime(originalInfo.mimeType) || findFormatByExtension(originalInfo.extension))) ||
      DOWNLOAD_FORMATS[0]
    const selectedFormat = pendingDownloadFormatRef.current ?? defaultFormat
    const safeBaseName = sanitizeBaseName(originalInfo?.baseName ?? 'black-and-white-image')
    const filename = `${safeBaseName}-bw.${selectedFormat.value}`
    const sameFormat =
      !!originalInfo && normalizeExtension(originalInfo.extension) === normalizeExtension(selectedFormat.value)
    const maxBytes = sameFormat ? originalInfo?.size : undefined

    try {
      await downloadCanvasImage(canvas, {
        filename,
        mimeType: selectedFormat.mimeType,
        quality: qualityForFormat(selectedFormat),
        maxBytes,
      })
    } catch (error) {
      console.error('Download failed:', error)
    } finally {
      pendingDownloadFormatRef.current = null
      setIsProcessing(false)
    }
  }, [])

  const handleWorkerMessage = useCallback((e: MessageEvent<WorkerResponse>) => {
    const { processedImageData, type } = e.data
    
    if (type === 'preview') {
      setProcessedImageData(processedImageData)
      setIsProcessing(false)
    } else if (type === 'final') {
      // Handle final processing for download
      downloadProcessedImage(processedImageData)
    }
  }, [downloadProcessedImage])

  const handleWorkerError = useCallback((error: ErrorEvent) => {
    console.error('Worker error:', error)
    setIsProcessing(false)
  }, [])

  React.useEffect(() => {
    if (typeof window !== 'undefined' && window.Worker) {
      workerRef.current = new Worker('/worker.js')
      workerRef.current.onmessage = handleWorkerMessage
      workerRef.current.onerror = handleWorkerError
    }

    return () => {
      if (workerRef.current) {
        workerRef.current.terminate()
      }
    }
  }, [handleWorkerError, handleWorkerMessage])

  const processImage = useCallback((
    bitmap: ImageBitmap, 
    currentFilters: ImageFilter, 
    type: 'preview' | 'final'
  ) => {
    if (!workerRef.current) return

    setIsProcessing(true)

    // Create canvas to get ImageData
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    if (type === 'final') {
      // Use full resolution for final download
      canvas.width = bitmap.width
      canvas.height = bitmap.height
    } else {
      // Use smaller size for preview
      const maxSize = 800
      const aspectRatio = bitmap.width / bitmap.height
      if (bitmap.width > bitmap.height) {
        canvas.width = Math.min(bitmap.width, maxSize)
        canvas.height = canvas.width / aspectRatio
      } else {
        canvas.height = Math.min(bitmap.height, maxSize)
        canvas.width = canvas.height * aspectRatio
      }
    }

    ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height)
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)

    const message: WorkerMessage = {
      imageData,
      type,
      ...currentFilters
    }

    workerRef.current.postMessage(message, [imageData.data.buffer])
  }, [])

  const handleFileSelect = useCallback(async (file: File) => {
    try {
      const bitmap = await createImageBitmap(file)
      const { info, defaultFormat } = resolveFileInfo(file)
      setOriginalFileInfo(info)
      originalFileInfoRef.current = info
      pendingDownloadFormatRef.current = defaultFormat
      setCurrentImageBitmap(bitmap)
      setShowEditor(true)
      
      // Trigger initial processing
      processImage(bitmap, filters, 'preview')
    } catch (error) {
      console.error('Failed to process file:', error)
    }
  }, [filters, processImage])

  const handleFiltersChange = useCallback((newFilters: ImageFilter) => {
    setFilters(newFilters)
    setSelectedPreset('') // Clear preset selection when manually adjusting

    if (currentImageBitmap) {
      // Debounce processing
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current)
      }
      
      debounceTimerRef.current = setTimeout(() => {
        processImage(currentImageBitmap, newFilters, 'preview')
      }, 300)
    }
  }, [currentImageBitmap, processImage])

  const handlePresetSelect = useCallback((presetName: string) => {
    const preset = DEFAULT_PRESETS[presetName]
    if (preset) {
      setFilters(preset)
      setSelectedPreset(presetName)
      
      if (currentImageBitmap) {
        processImage(currentImageBitmap, preset, 'preview')
      }
    }
  }, [currentImageBitmap, processImage])

  const handleDownload = useCallback((format: DownloadFormat) => {
    pendingDownloadFormatRef.current = format
    if (currentImageBitmap) {
      processImage(currentImageBitmap, filters, 'final')
    }
  }, [currentImageBitmap, filters, processImage])

  const handleReset = useCallback(() => {
    setCurrentImageBitmap(null)
    setProcessedImageData(null)
    setShowEditor(false)
    setFilters(DEFAULT_PRESETS.default)
    setSelectedPreset('default')
    setIsProcessing(false)
    setOriginalFileInfo(null)
    originalFileInfoRef.current = null
    pendingDownloadFormatRef.current = null
  }, [])

  const defaultDownloadFormat = React.useMemo(() => {
    if (originalFileInfo) {
      return (
        findFormatByMime(originalFileInfo.mimeType) ||
        findFormatByExtension(originalFileInfo.extension) ||
        DOWNLOAD_FORMATS[0]
      )
    }
    return DOWNLOAD_FORMATS[0]
  }, [originalFileInfo])

  return (
    <>
      <StructuredData type="faq" data={HOME_FAQ_SCHEMA} />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      {!showEditor && (
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-4xl text-center">
            <Badge className="mb-6" variant="secondary">
              ✨ Free Online Tool
            </Badge>
            
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Convert Image to{' '}
              <span className="text-primary-600 dark:text-primary-400">
                Black and White
              </span>{' '}
              Instantly
            </h1>
            
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
              Transform any color photo into stunning black and white images with our free online converter. 
              Professional results in just a few clicks - no software needed.
            </p>

            <div className="flex flex-wrap justify-center gap-2 mb-12">
              <Badge variant="secondary">Black and White Photo Maker</Badge>
              <Badge variant="secondary">Monochrome Image Converter</Badge>
              <Badge variant="secondary">Grayscale Filter Tool</Badge>
              <Badge variant="secondary">No Watermark</Badge>
            </div>

            <div className="mb-16">
              <UploadArea 
                onFileSelect={handleFileSelect}
                isProcessing={isProcessing}
                className="max-w-lg mx-auto"
              />
            </div>

            {/* Quick Feature Highlights - squaredimage.com style */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12 max-w-4xl mx-auto">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                <div className="text-2xl mb-2">🎨</div>
                <h3 className="font-semibold text-gray-900 dark:text-white text-sm mb-1">Quick Presets</h3>
                <p className="text-xs text-gray-600 dark:text-gray-400">Choose from Dramatic, Vintage, Film Noir styles</p>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                <div className="text-2xl mb-2">🔧</div>
                <h3 className="font-semibold text-gray-900 dark:text-white text-sm mb-1">Advanced Controls</h3>
                <p className="text-xs text-gray-600 dark:text-gray-400">Fine-tune contrast, brightness, and grain</p>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                <div className="text-2xl mb-2">⚡</div>
                <h3 className="font-semibold text-gray-900 dark:text-white text-sm mb-1">Instant Preview</h3>
                <p className="text-xs text-gray-600 dark:text-gray-400">See changes in real-time</p>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                <div className="text-2xl mb-2">💾</div>
                <h3 className="font-semibold text-gray-900 dark:text-white text-sm mb-1">Multiple Formats</h3>
                <p className="text-xs text-gray-600 dark:text-gray-400">Download as PNG, JPEG, or WebP</p>
              </div>
            </div>

            {/* Content Ad */}
            <ContentAd />
            
            {/* Features */}
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              <Card className="p-6 text-center">
                <Palette className="w-8 h-8 text-primary-600 mx-auto mb-4" />
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Professional Black and White Filters
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Transform your color images with 6 professional presets: Vintage, Dramatic, Film Noir, High Contrast, Soft, and Classic black and white styles
                </p>
              </Card>
              
              <Card className="p-6 text-center">
                <Zap className="w-8 h-8 text-primary-600 mx-auto mb-4" />
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Instant Black and White Conversion
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Convert your images to black and white instantly with real-time preview. See your monochrome results before downloading
                </p>
              </Card>
              
              <Card className="p-6 text-center">
                <Shield className="w-8 h-8 text-primary-600 mx-auto mb-4" />
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Secure Black and White Processing
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Your images are processed locally in your browser. No uploads required for black and white image conversion
                </p>
              </Card>
            </div>

            {/* Why Choose Our Black and White Image Converter */}
            <section className="bg-white dark:bg-gray-800 rounded-2xl p-8 mb-16">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center">
                Why Choose Our Black and White Image Converter?
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    Best Black and White Image Quality
                  </h3>
                  <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                    <li>• Advanced algorithms preserve image details when converting to black and white</li>
                    <li>• Professional-grade black and white image processing</li>
                    <li>• Support for all image formats: JPG, PNG, GIF, WebP</li>
                    <li>• High-resolution black and white image output</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    Easy Black and White Photo Creation
                  </h3>
                  <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                    <li>• One-click black and white image conversion</li>
                    <li>• No registration required for black and white photo editing</li>
                    <li>• Free black and white image converter with no watermarks</li>
                    <li>• Works on desktop, tablet, and mobile devices</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* How to Convert Images to Black and White */}
            <section className="bg-gray-50 dark:bg-gray-700 rounded-2xl p-8 mb-16">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center">
                How to Convert Your Image to Black and White
              </h2>
              <div className="grid md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="bg-primary-100 dark:bg-primary-900 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                    <span className="text-primary-600 dark:text-primary-400 font-bold">1</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Upload Image</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Click to upload or drag & drop your color photo for black and white conversion
                  </p>
                </div>
                <div className="text-center">
                  <div className="bg-primary-100 dark:bg-primary-900 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                    <span className="text-primary-600 dark:text-primary-400 font-bold">2</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Choose Style</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Select from professional black and white presets or customize manually
                  </p>
                </div>
                <div className="text-center">
                  <div className="bg-primary-100 dark:bg-primary-900 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                    <span className="text-primary-600 dark:text-primary-400 font-bold">3</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Preview Result</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    See your black and white image instantly with real-time preview
                  </p>
                </div>
                <div className="text-center">
                  <div className="bg-primary-100 dark:bg-primary-900 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                    <span className="text-primary-600 dark:text-primary-400 font-bold">4</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Download</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Download your high-quality black and white image for free
                  </p>
                </div>
              </div>
            </section>

            {/* FAQ Section */}
            <section className="bg-white dark:bg-gray-800 rounded-2xl p-8 mb-16">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
                Frequently Asked Questions About Black and White Image Conversion
              </h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    What is a black and white image converter?
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    A black and white image converter is a tool that transforms color photos into monochrome images. Our converter uses advanced algorithms to create professional-quality black and white images while preserving important details and contrast.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    Is this black and white image converter really free?
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Yes! Our black and white image converter is completely free to use. There are no hidden costs, watermarks, or registration requirements. Convert as many images to black and white as you want.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    What image formats can I convert to black and white?
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Our black and white image converter supports all common image formats including JPG, JPEG, PNG, GIF, and WebP. You can convert any of these formats to high-quality black and white images.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    How is this different from simple grayscale conversion?
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Our black and white image converter goes beyond simple grayscale. It uses professional techniques like luminance mapping, contrast enhancement, and selective tone adjustment to create stunning black and white images with rich detail and depth.
                  </p>
                </div>
              </div>
            </section>

            {/* Additional Links */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/batch">
                <Button variant="outline" size="lg">
                  <Users className="w-4 h-4 mr-2" />
                  Batch Black and White Converter
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              
              <Link href="/blog">
                <Button variant="ghost" size="lg">
                  Black and White Photography Tips
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Simple Converter Interface */}
      {showEditor && (
        <section className="py-12 px-4">
          <div className="container mx-auto max-w-5xl">
            <div className="mb-8 text-center">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Your Black and White Image
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Choose a style below or download directly
              </p>
            </div>

            {/* Image Display with Quick Actions */}
            <div className="mb-8">
              <ResultDisplay
                originalImageBitmap={currentImageBitmap}
                processedImageData={processedImageData}
                isProcessing={isProcessing}
                onDownload={handleDownload}
                onReset={handleReset}
                simplified={true}
                defaultFormat={defaultDownloadFormat}
                availableFormats={DOWNLOAD_FORMATS}
              />
            </div>

            {/* Quick Style Selection */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 text-center">
                Quick Styles (Optional)
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {Object.entries(DEFAULT_PRESETS).map(([presetName, preset]) => (
                  <button
                    key={presetName}
                    onClick={() => handlePresetSelect(presetName)}
                    disabled={isProcessing}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      selectedPreset === presetName
                        ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                        : 'border-gray-200 dark:border-gray-700 hover:border-primary-300'
                    } ${isProcessing ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                  >
                    <div className="text-sm font-medium text-gray-900 dark:text-white capitalize">
                      {presetName === 'default' ? 'Classic' : presetName.replace('-', ' ')}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Advanced Controls Toggle */}
            <div className="text-center">
              <details className="group">
                <summary className="cursor-pointer inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-primary-600 transition-colors">
                  <span className="mr-2">Advanced Controls</span>
                  <svg className="w-4 h-4 transform group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                
                <div className="mt-6 p-6 bg-gray-50 dark:bg-gray-800 rounded-xl">
                  <div className="max-w-md mx-auto">
                    <ParameterPanel
                      filters={filters}
                      onFiltersChange={handleFiltersChange}
                      disabled={isProcessing}
                      compact={true}
                    />
                  </div>
                </div>
              </details>
            </div>

            {/* Related Tools Recommendation */}
            <div className="mt-12 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
                ✨ Explore More Features
              </h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Link href="/batch" className="group">
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-600 hover:border-primary-300 dark:hover:border-primary-500 transition-colors">
                    <div className="text-2xl mb-2">📦</div>
                    <h4 className="font-semibold text-gray-900 dark:text-white text-sm mb-1 group-hover:text-primary-600 dark:group-hover:text-primary-400">
                      Batch Converter
                    </h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Convert multiple images at once</p>
                  </div>
                </Link>
                
                <Link href="/examples" className="group">
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-600 hover:border-primary-300 dark:hover:border-primary-500 transition-colors">
                    <div className="text-2xl mb-2">🖼️</div>
                    <h4 className="font-semibold text-gray-900 dark:text-white text-sm mb-1 group-hover:text-primary-600 dark:group-hover:text-primary-400">
                      Example Gallery
                    </h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400">See before and after examples</p>
                  </div>
                </Link>
                
                <Link href="/how-to-use" className="group">
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-600 hover:border-primary-300 dark:hover:border-primary-500 transition-colors">
                    <div className="text-2xl mb-2">📚</div>
                    <h4 className="font-semibold text-gray-900 dark:text-white text-sm mb-1 group-hover:text-primary-600 dark:group-hover:text-primary-400">
                      How to Use Guide
                    </h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Learn professional techniques</p>
                  </div>
                </Link>
                
                <Link href="/blog" className="group">
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-600 hover:border-primary-300 dark:hover:border-primary-500 transition-colors">
                    <div className="text-2xl mb-2">✍️</div>
                    <h4 className="font-semibold text-gray-900 dark:text-white text-sm mb-1 group-hover:text-primary-600 dark:group-hover:text-primary-400">
                      Photography Blog
                    </h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Tips and inspiration articles</p>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}
      
      {/* Friendly Links Section */}
    </div>
    </>
  )
}
