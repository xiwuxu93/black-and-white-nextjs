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
  WorkerMessage, 
  WorkerResponse 
} from '@/types/image-processing'
import { Palette, Zap, Users, Shield, ChevronRight } from 'lucide-react'
import { FriendlyLinks } from '@/components/layout/friendly-links'
import { ContentAd } from '@/components/ads/ad-placements'
import Link from 'next/link'

export default function HomePage() {
  // State management
  const [currentImageBitmap, setCurrentImageBitmap] = useState<ImageBitmap | null>(null)
  const [processedImageData, setProcessedImageData] = useState<ImageData | null>(null)
  const [filters, setFilters] = useState<ImageFilter>(DEFAULT_PRESETS.default)
  const [selectedPreset, setSelectedPreset] = useState('default')
  const [isProcessing, setIsProcessing] = useState(false)
  const [showEditor, setShowEditor] = useState(false)

  // Refs
  const workerRef = useRef<Worker | null>(null)
  const debounceTimerRef = useRef<NodeJS.Timeout>()

  // Initialize worker
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
  }, [])

  const handleWorkerMessage = (e: MessageEvent<WorkerResponse>) => {
    const { processedImageData, type } = e.data
    
    if (type === 'preview') {
      setProcessedImageData(processedImageData)
      setIsProcessing(false)
    } else if (type === 'final') {
      // Handle final processing for download
      downloadProcessedImage(processedImageData)
    }
  }

  const handleWorkerError = (error: ErrorEvent) => {
    console.error('Worker error:', error)
    setIsProcessing(false)
  }

  const handleFileSelect = useCallback(async (file: File) => {
    try {
      const bitmap = await createImageBitmap(file)
      setCurrentImageBitmap(bitmap)
      setShowEditor(true)
      
      // Trigger initial processing
      processImage(bitmap, filters, 'preview')
    } catch (error) {
      console.error('Failed to process file:', error)
    }
  }, [filters])

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
    if (currentImageBitmap) {
      processImage(currentImageBitmap, filters, 'final')
    }
  }, [currentImageBitmap, filters, processImage])

  const downloadProcessedImage = (imageData: ImageData) => {
    const canvas = document.createElement('canvas')
    canvas.width = imageData.width
    canvas.height = imageData.height
    const ctx = canvas.getContext('2d')
    if (ctx) {
      ctx.putImageData(imageData, 0, 0)
      const link = document.createElement('a')
      link.download = 'black-white-image.png'
      link.href = canvas.toDataURL('image/png')
      link.click()
    }
    setIsProcessing(false)
  }

  const handleReset = useCallback(() => {
    setCurrentImageBitmap(null)
    setProcessedImageData(null)
    setShowEditor(false)
    setFilters(DEFAULT_PRESETS.default)
    setSelectedPreset('default')
    setIsProcessing(false)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      {!showEditor && (
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-4xl text-center">
            <Badge className="mb-6" variant="secondary">
              ✨ Free Online Tool
            </Badge>
            
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Free{' '}
              <span className="text-primary-600 dark:text-primary-400">
                Black and White Image
              </span>{' '}
              Converter
            </h1>
            
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
              Professional black and white image converter with advanced filters, instant preview, and high-quality results - completely free.
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
          </div>
        </section>
      )}
      
      {/* Friendly Links Section */}
      {!showEditor && <FriendlyLinks />}
    </div>
  )
}