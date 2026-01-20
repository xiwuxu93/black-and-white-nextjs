'use client'

import React, {
  useState,
  useRef,
  useCallback,
  useMemo,
  useEffect
} from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { UploadArea } from '@/components/bw-converter/upload-area'
import {
  DEFAULT_PRESETS,
  DOWNLOAD_FORMATS,
  ImageFilter,
  DownloadFormat,
  WorkerMessage,
  WorkerResponse,
  OriginalFileInfo
} from '@/types/image-processing'
import {
  resolveFileInfo,
  sanitizeBaseName,
  findFormatByMime,
  findFormatByExtension,
  qualityForFormat,
  normalizeExtension
} from '@/lib/image-format'
import { ChevronRight } from 'lucide-react'

const ResultDisplay = dynamic(
  () =>
    import('@/components/bw-converter/result-display').then(
      (mod) => mod.ResultDisplay
    ),
  {
    ssr: false,
    loading: () => (
      <div className="rounded-2xl border border-dashed border-gray-300 p-10 text-center text-gray-500 dark:border-gray-700 dark:text-gray-400">
        Preparing preview…
      </div>
    )
  }
)

const ParameterPanel = dynamic(
  () =>
    import('@/components/bw-converter/parameter-panel').then(
      (mod) => mod.ParameterPanel
    ),
  {
    ssr: false,
    loading: () => (
      <div className="h-64 rounded-2xl bg-gray-100/80 dark:bg-gray-800/60 animate-pulse" />
    )
  }
)

type TimeoutHandle = ReturnType<typeof setTimeout> | undefined

interface ConverterExperienceProps {
  /**
   * Optional badge text displayed above the main heading.
   * Defaults to “✨ Free Black and White Converter”.
   */
  heroBadgeText?: string
  /**
   * Optional main heading shown in the hero area.
   * Defaults to “Convert Images to Black and White Online”.
   */
  heroTitle?: string
  /**
   * Optional subtitle shown under the hero title.
   * If not provided, a generic privacy-focused description is used.
   */
  heroSubtitle?: string
  /**
   * Optional set of feature badges shown under the hero.
   * If omitted, a generic set of four badges is rendered.
   */
  heroFeatureBadges?: string[]
  /**
   * Optional accept attribute passed to the upload input.
   * Defaults to allowing all image types.
   */
  uploadAccept?: string
  /**
   * Optional helper text describing supported formats and limits
   * for the upload input.
   */
  uploadSupportText?: string
  /**
   * Optional list of allowed file extensions (e.g. ['jpg', 'jpeg']).
   * When provided, uploads with other extensions are rejected.
   */
  uploadAllowedExtensions?: string[]
  /**
   * Optional custom error message shown when a file does not match
   * the allowed extensions.
   */
  uploadInvalidFileMessage?: string
  /**
   * Optional default filters to apply on load.
   */
  defaultFilters?: Partial<ImageFilter>
  /**
   * Display mode. 'default' shows all B&W presets. 'invert' focuses on inversion.
   */
  mode?: 'default' | 'invert'
  hideAdvancedControls?: boolean
  hideBottomFeatures?: boolean
}

export function ConverterExperience({
  heroBadgeText,
  heroTitle,
  heroSubtitle,
  heroFeatureBadges,
  uploadAccept,
  uploadSupportText,
  uploadAllowedExtensions,
  uploadInvalidFileMessage,
  defaultFilters,
  mode = 'default',
  hideAdvancedControls = false,
  hideBottomFeatures = false
}: ConverterExperienceProps = {}) {
  const [currentImageBitmap, setCurrentImageBitmap] =
    useState<ImageBitmap | null>(null)
  const [processedImageData, setProcessedImageData] =
    useState<ImageData | null>(null)
  const [filters, setFilters] = useState<ImageFilter>({
    ...DEFAULT_PRESETS.default,
    ...defaultFilters
  })
  const [selectedPreset, setSelectedPreset] = useState(mode === 'invert' ? '' : 'default')
  const [isProcessing, setIsProcessing] = useState(false)
  const [showEditor, setShowEditor] = useState(false)
  const [originalFileInfo, setOriginalFileInfo] =
    useState<OriginalFileInfo | null>(null)

  const workerRef = useRef<Worker | null>(null)
  const debounceTimerRef = useRef<TimeoutHandle>()
  const originalFileInfoRef = useRef<OriginalFileInfo | null>(null)
  const pendingDownloadFormatRef = useRef<DownloadFormat | null>(null)

  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current)
      }
      if (workerRef.current) {
        workerRef.current.terminate()
        workerRef.current = null
      }
      const root = document.documentElement
      if (root.dataset.converterEditing) {
        delete root.dataset.converterEditing
      }
    }
  }, [])
  
  // Re-initialize filters if defaultFilters changes (rare, but correct)
  useEffect(() => {
    if (defaultFilters) {
      setFilters(prev => ({ ...prev, ...defaultFilters }))
    }
  }, [defaultFilters])

  useEffect(() => {
    const root = document.documentElement
    if (showEditor) {
      root.dataset.converterEditing = 'true'
    } else if (root.dataset.converterEditing) {
      delete root.dataset.converterEditing
    }
  }, [showEditor])

  const downloadProcessedImage = useCallback(
    async (imageData: ImageData) => {
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
        (originalInfo &&
          (findFormatByMime(originalInfo.mimeType) ||
            findFormatByExtension(originalInfo.extension))) ||
        DOWNLOAD_FORMATS[0]
      const selectedFormat =
        pendingDownloadFormatRef.current ?? defaultFormat
      const safeBaseName = sanitizeBaseName(
        originalInfo?.baseName ?? 'black-and-white-image'
      )
      const filename = `${safeBaseName}-bw.${selectedFormat.value}`
      const sameFormat =
        !!originalInfo &&
        normalizeExtension(originalInfo.extension) ===
          normalizeExtension(selectedFormat.value)
      const maxBytes = sameFormat ? originalInfo?.size : undefined

      try {
        await downloadCanvasImage(canvas, {
          filename,
          mimeType: selectedFormat.mimeType,
          quality: qualityForFormat(selectedFormat),
          maxBytes
        })
      } catch (error) {
        console.error('Download failed:', error)
      } finally {
        pendingDownloadFormatRef.current = null
        setIsProcessing(false)
      }
    },
    []
  )

  const initializeWorker = useCallback(() => {
    if (typeof window === 'undefined' || workerRef.current) {
      return workerRef.current
    }

    const worker = new Worker('/worker.js')
    worker.onmessage = (event: MessageEvent<WorkerResponse>) => {
      const { processedImageData, type } = event.data
      if (type === 'preview') {
        setProcessedImageData(processedImageData)
        setIsProcessing(false)
      } else if (type === 'final') {
        void downloadProcessedImage(processedImageData)
      }
    }
    worker.onerror = (error: ErrorEvent) => {
      console.error('Worker error:', error)
      setIsProcessing(false)
    }

    workerRef.current = worker
    return worker
  }, [downloadProcessedImage])

  const processImage = useCallback(
    (
      bitmap: ImageBitmap,
      currentFilters: ImageFilter,
      type: 'preview' | 'final'
    ) => {
      const worker = initializeWorker()
      if (!worker) {
        return
      }

      setIsProcessing(true)

      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      if (!ctx) {
        setIsProcessing(false)
        return
      }

      if (type === 'final') {
        canvas.width = bitmap.width
        canvas.height = bitmap.height
      } else {
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

      worker.postMessage(message, [imageData.data.buffer])
    },
    [initializeWorker]
  )

  const handleFileSelect = useCallback(
    async (file: File) => {
      try {
        initializeWorker()
        
        // Use HTMLImageElement as an intermediate step to handle SVGs and other formats robustly
        const img = new Image()
        const objectUrl = URL.createObjectURL(file)
        
        await new Promise((resolve, reject) => {
          img.onload = resolve
          img.onerror = reject
          img.src = objectUrl
        })

        let bitmap: ImageBitmap
        
        // Handle SVGs without natural dimensions
        if (img.naturalWidth === 0 || img.naturalHeight === 0) {
          // Default to a high resolution for vector graphics
          bitmap = await createImageBitmap(img, { 
            resizeWidth: 2048,
            resizeQuality: 'high'
          })
        } else {
          bitmap = await createImageBitmap(img)
        }

        URL.revokeObjectURL(objectUrl)

        const { info, defaultFormat } = resolveFileInfo(file)
        setOriginalFileInfo(info)
        originalFileInfoRef.current = info
        pendingDownloadFormatRef.current = defaultFormat
        setCurrentImageBitmap(bitmap)
        setShowEditor(true)

        processImage(bitmap, filters, 'preview')
      } catch (error) {
        console.error('Failed to process file:', error)
        setIsProcessing(false)
        if (originalFileInfoRef.current) {
           setOriginalFileInfo(null)
           originalFileInfoRef.current = null
        }
      }
    },
    [filters, initializeWorker, processImage]
  )

  const handleFiltersChange = useCallback(
    (newFilters: ImageFilter) => {
      setFilters(newFilters)
      setSelectedPreset('')

      if (currentImageBitmap) {
        if (debounceTimerRef.current) {
          clearTimeout(debounceTimerRef.current)
        }

        debounceTimerRef.current = setTimeout(() => {
          processImage(currentImageBitmap, newFilters, 'preview')
        }, 300)
      }
    },
    [currentImageBitmap, processImage]
  )

  const handlePresetSelect = useCallback(
    (presetName: string) => {
      const preset = DEFAULT_PRESETS[presetName]
      if (preset) {
        setFilters(preset)
        setSelectedPreset(presetName)

        if (currentImageBitmap) {
          processImage(currentImageBitmap, preset, 'preview')
        }
      }
    },
    [currentImageBitmap, processImage]
  )

  const handleDownload = useCallback(
    (format: DownloadFormat) => {
      pendingDownloadFormatRef.current = format
      if (currentImageBitmap) {
        processImage(currentImageBitmap, filters, 'final')
      }
    },
    [currentImageBitmap, filters, processImage]
  )

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

  const defaultDownloadFormat = useMemo(() => {
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
    <div className="min-h-[60vh] bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {!showEditor && (
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center max-w-4xl mx-auto">
              <Badge className="mb-6" variant="secondary">
                {heroBadgeText ?? '✨ Free Black and White Converter'}
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
                {heroTitle ?? 'Convert Images to Black and White Online'}
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                {heroSubtitle ??
                  'Upload, preview, and export professional monochrome photos in seconds. No accounts, no uploads to third-party servers—everything happens in your browser.'}
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-2 mb-12 mt-10">
              {(heroFeatureBadges ?? [
                'Make Photos Black and White',
                'Instant Privacy-Friendly Processing',
                'Film Style Presets',
                'Professional Download Formats'
              ]).map((label) => (
                <Badge key={label} variant="secondary">
                  {label}
                </Badge>
              ))}
            </div>

            <div className="mb-12 max-w-xl mx-auto">
              <UploadArea
                onFileSelect={handleFileSelect}
                isProcessing={isProcessing}
                className="max-w-xl"
                accept={uploadAccept}
                supportText={uploadSupportText}
                allowedExtensions={uploadAllowedExtensions}
                invalidFileMessage={uploadInvalidFileMessage}
              />
            </div>

            {!hideBottomFeatures && (
              <div className="text-center text-gray-500 dark:text-gray-400 text-sm">
                Need to process a whole campaign?{' '}
                <Link
                  href="/batch-black-and-white-converter"
                  className="text-primary-600 hover:underline dark:text-primary-400"
                >
                  Try the batch converter
                </Link>
              </div>
            )}
          </div>
        </section>
      )}

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

            {mode !== 'invert' && (
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 text-center">
                  Quick Styles (Optional)
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                  {Object.entries(DEFAULT_PRESETS).map(([presetName]) => (
                    <button
                      key={presetName}
                      onClick={() => handlePresetSelect(presetName)}
                      disabled={isProcessing}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        selectedPreset === presetName
                          ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                          : 'border-gray-200 dark:border-gray-700 hover:border-primary-300'
                      } ${
                        isProcessing ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
                      }`}
                    >
                      <div className="text-sm font-medium text-gray-900 dark:text-white capitalize">
                        {presetName === 'default'
                          ? 'Classic'
                          : presetName.replace('-', ' ')}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {!hideAdvancedControls && (
              <div className="text-center">
                <details className="group">
                  <summary className="cursor-pointer inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-primary-600 transition-colors">
                    <span className="mr-2">Advanced Controls</span>
                    <svg
                      className="w-4 h-4 transform group-open:rotate-180 transition-transform"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </summary>

                  <div className="mt-6">
                    <ParameterPanel
                      filters={filters}
                      onFiltersChange={handleFiltersChange}
                      disabled={isProcessing}
                      compact={true}
                      className="mx-auto max-w-md bg-white/80 dark:bg-gray-900/60 backdrop-blur"
                      showInvertToggle={mode === 'invert'}
                    />
                  </div>
                </details>
              </div>
            )}

            {!hideBottomFeatures && (
              <div className="mt-12 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 p-8 dark:from-gray-800 dark:to-gray-700">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
                  ✨ Explore More Features
                </h3>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                  <Link href="/batch-black-and-white-converter" className="group">
                    <div className="rounded-lg border border-gray-200 bg-white p-4 transition-colors hover:border-primary-300 dark:border-gray-600 dark:bg-gray-800 dark:hover:border-primary-500">
                      <div className="text-2xl mb-2">📦</div>
                      <h4 className="text-sm font-semibold text-gray-900 transition-colors group-hover:text-primary-600 dark:text-white dark:group-hover:text-primary-400">
                        Batch Converter
                      </h4>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        Convert multiple images at once
                      </p>
                    </div>
                  </Link>

                  <Link href="/examples" className="group">
                    <div className="rounded-lg border border-gray-200 bg-white p-4 transition-colors hover:border-primary-300 dark:border-gray-600 dark:bg-gray-800 dark:hover:border-primary-500">
                      <div className="text-2xl mb-2">🖼️</div>
                      <h4 className="text-sm font-semibold text-gray-900 transition-colors group-hover:text-primary-600 dark:text-white dark:group-hover:text-primary-400">
                        Example Gallery
                      </h4>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        See before and after examples
                      </p>
                    </div>
                  </Link>

                  <Link href="/how-to-use" className="group">
                    <div className="rounded-lg border border-gray-200 bg-white p-4 transition-colors hover:border-primary-300 dark:border-gray-600 dark:bg-gray-800 dark:hover:border-primary-500">
                      <div className="text-2xl mb-2">📚</div>
                      <h4 className="text-sm font-semibold text-gray-900 transition-colors group-hover:text-primary-600 dark:text-white dark:group-hover:text-primary-400">
                        How to Use Guide
                      </h4>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        Learn professional techniques
                      </p>
                    </div>
                  </Link>

                  <Link href="/blog" className="group">
                    <div className="rounded-lg border border-gray-200 bg-white p-4 transition-colors hover:border-primary-300 dark:border-gray-600 dark:bg-gray-800 dark:hover:border-primary-500">
                      <div className="text-2xl mb-2">✍️</div>
                      <h4 className="text-sm font-semibold text-gray-900 transition-colors group-hover:text-primary-600 dark:text-white dark:group-hover:text-primary-400">
                        Photography Blog
                      </h4>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        Tips and inspiration articles
                      </p>
                    </div>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </section>
      )}
    </div>
  )
}
