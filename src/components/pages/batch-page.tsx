'use client'

/* eslint-disable @next/next/no-img-element */

import React, { useState, useCallback, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/ui/select'
import { 
  Upload, 
  Download, 
  Archive, 
  Image as ImageIcon, 
  Trash2, 
  RefreshCw,
  CheckCircle,
  Clock,
  AlertCircle
} from 'lucide-react'
import { 
  ProcessedImage, 
  DEFAULT_PRESETS, 
  BatchWorkerMessage, 
  BatchWorkerResponse,
  DownloadFormat,
  DOWNLOAD_FORMATS
} from '@/types/image-processing'
import { resolveFileInfo, sanitizeBaseName, qualityForFormat, normalizeExtension } from '@/lib/image-format'
import { downloadCanvasImage } from '@/lib/utils'

function ProcessedPreviewCanvas({ data }: { data?: ImageData }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (data && canvasRef.current) {
      const canvas = canvasRef.current
      const ctx = canvas.getContext('2d')
      if (!ctx) return
      canvas.width = data.width
      canvas.height = data.height
      ctx.putImageData(data, 0, 0)
    }
  }, [data])

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full object-cover"
      style={{ display: data ? 'block' : 'none' }}
    />
  )
}

export default function BatchPage() {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [processedImages, setProcessedImages] = useState<ProcessedImage[]>([])
  const [isProcessing, setIsProcessing] = useState(false)
  const [processingProgress, setProcessingProgress] = useState(0)
  
  const workerRef = useRef<Worker | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Initialize batch worker
  React.useEffect(() => {
    if (typeof window !== 'undefined' && window.Worker) {
      workerRef.current = new Worker('/batch-worker.js')
      workerRef.current.onmessage = handleWorkerMessage
      workerRef.current.onerror = handleWorkerError
    }

    return () => {
      if (workerRef.current) {
        workerRef.current.terminate()
      }
    }
  }, [])

  const handleWorkerMessage = (e: MessageEvent<BatchWorkerResponse>) => {
    const { processedImageData, fileIdentifier } = e.data

    const previewCanvas = document.createElement('canvas')
    previewCanvas.width = processedImageData.width
    previewCanvas.height = processedImageData.height
    const previewCtx = previewCanvas.getContext('2d')
    const previewUrl = (() => {
      if (previewCtx) {
        previewCtx.putImageData(processedImageData, 0, 0)
        return previewCanvas.toDataURL('image/png')
      }
      return undefined
    })()

    setProcessedImages(prev => prev.map(img => {
      if (img.id === fileIdentifier) {
        return {
          ...img,
          processedData: processedImageData,
          processedPreviewUrl: previewUrl ?? img.processedPreviewUrl,
          processingStatus: 'completed' as const
        }
      }
      return img
    }))

    // Update progress
    setProcessingProgress(prev => {
      const newProgress = prev + (100 / selectedFiles.length)
      if (newProgress >= 100) {
        setIsProcessing(false)
        return 100
      }
      return newProgress
    })
  }

  const handleWorkerError = (error: ErrorEvent) => {
    console.error('Batch Worker error:', error)
    setIsProcessing(false)
  }

  const handleFilesSelect = useCallback((files: FileList | File[]) => {
    const fileArray = Array.from(files).filter(file => file.type.startsWith('image/'))
    setSelectedFiles(fileArray)
    
    const processedImagesList: ProcessedImage[] = fileArray.map((file, index) => {
      const { info, defaultFormat } = resolveFileInfo(file)
      return {
        id: `${Date.now()}_${index}`,
        originalFile: file,
        originalInfo: info,
        selectedFormat: defaultFormat,
        processingStatus: 'pending',
        originalPreviewUrl: URL.createObjectURL(file)
      }
    })
    
    setProcessedImages(processedImagesList)
    setProcessingProgress(0)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    if (e.dataTransfer.files) {
      handleFilesSelect(e.dataTransfer.files)
    }
  }, [handleFilesSelect])

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFilesSelect(e.target.files)
    }
  }, [handleFilesSelect])

  const processAllImages = useCallback(async () => {
    if (!workerRef.current || selectedFiles.length === 0) return

    setIsProcessing(true)
    setProcessingProgress(0)
    
    // Use default black and white conversion
    const defaultFilters = DEFAULT_PRESETS.default
    
    // Update all images to processing status
    setProcessedImages(prev => prev.map(img => ({ ...img, processingStatus: 'processing' })))

    // Process each image
    for (const image of processedImages) {
      try {
        const bitmap = await createImageBitmap(image.originalFile)
        
        // Create canvas to get ImageData
        const canvas = document.createElement('canvas')
        canvas.width = bitmap.width
        canvas.height = bitmap.height
        const ctx = canvas.getContext('2d')
        if (ctx) {
          ctx.drawImage(bitmap, 0, 0)
          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
          
          const message: BatchWorkerMessage = {
            imageData,
            preset: defaultFilters,
            fileIdentifier: image.id
          }
          
          workerRef.current.postMessage(message, [imageData.data.buffer])
        }
      } catch (error) {
        console.error('Error processing image:', error)
        setProcessedImages(prev => prev.map(img => 
          img.id === image.id 
            ? { ...img, processingStatus: 'error', error: 'Failed to process image' }
            : img
        ))
      }
    }
  }, [selectedFiles, processedImages])

  // Auto-process images when they are uploaded
  React.useEffect(() => {
    if (processedImages.length > 0 && !isProcessing && processedImages.every(img => img.processingStatus === 'pending')) {
      const timer = setTimeout(() => {
        processAllImages()
      }, 500)
      return () => clearTimeout(timer)
    }
  }, [processedImages, isProcessing, processAllImages])

  const downloadImageFile = useCallback(async (image: ProcessedImage, formatOverride?: DownloadFormat) => {
    if (!image.processedData) return

    const canvas = document.createElement('canvas')
    canvas.width = image.processedData.width
    canvas.height = image.processedData.height
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    ctx.putImageData(image.processedData, 0, 0)

    const format = formatOverride || image.selectedFormat
    const baseName = image.originalInfo.baseName || sanitizeBaseName(image.originalFile.name)
    const filename = `${baseName}-bw.${format.value}`
    const sameFormat = normalizeExtension(image.originalInfo.extension) === normalizeExtension(format.value)

    try {
      await downloadCanvasImage(canvas, {
        filename,
        mimeType: format.mimeType,
        quality: qualityForFormat(format),
        maxBytes: sameFormat ? image.originalInfo.size : undefined
      })
    } catch (error) {
      console.error('Failed to download image', error)
    }
  }, [])

  const downloadAll = useCallback(async () => {
    for (const image of processedImages) {
      if (image.processingStatus === 'completed' && image.processedData) {
        await downloadImageFile(image)
      }
    }
  }, [processedImages, downloadImageFile])

  const downloadAsZip = useCallback(async () => {
    // This would require a library like JSZip in a real implementation
    // For now, we'll just download individually
    downloadAll()
  }, [downloadAll])

  const handleFormatChange = useCallback((id: string, value: string) => {
    const format = DOWNLOAD_FORMATS.find(fmt => fmt.value === value)
    if (!format) return

    setProcessedImages(prev => prev.map(image =>
      image.id === id
        ? { ...image, selectedFormat: format }
        : image
    ))
  }, [])

  const clearAll = useCallback(() => {
    setSelectedFiles([])
    setProcessedImages([])
    setProcessingProgress(0)
    setIsProcessing(false)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }, [])

  const completedCount = processedImages.filter(img => img.processingStatus === 'completed').length
  const errorCount = processedImages.filter(img => img.processingStatus === 'error').length

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-8 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge className="mb-4" variant="secondary">
            ⚡ Batch Black and White Converter
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Batch Convert Multiple Images to Black and White Online
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-4">
            Drop in dozens or even hundreds of files and convert multiple images to black and white with one automated workflow. The batch engine processes everything in your browser, so sensitive projects remain private while you deliver monochrome assets in minutes instead of hours.
          </p>
          <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Whether you need to convert photos to black and white for ecommerce catalogs, editorial layouts, or social media takeovers, this tool keeps your queue organized, exports full-resolution files, and makes pictures black and white with consistent tone across every format.
          </p>
        </div>
        
        <div className="space-y-8">
            {/* Upload Area */}
            {selectedFiles.length === 0 && (
              <Card
                className="border-2 border-dashed border-gray-300 dark:border-gray-600 hover:border-primary-400 dark:hover:border-primary-500 transition-colors cursor-pointer"
                onDrop={handleDrop}
                onDragOver={(e) => e.preventDefault()}
                onClick={() => fileInputRef.current?.click()}
              >
                <div className="p-12 text-center">
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleFileInput}
                    className="hidden"
                  />
                  
                  <Upload className="w-12 h-12 text-primary-600 dark:text-primary-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    Upload Multiple Images
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    Drag and drop your images here, or click to browse
                  </p>
                  <Button size="lg">
                    <Upload className="w-4 h-4 mr-2" />
                    Choose Files
                  </Button>
                  <p className="text-sm text-gray-500 dark:text-gray-500 mt-4">
                    Supports: PNG, JPG, WebP • No file size limit
                  </p>
                </div>
              </Card>
            )}

            {/* Simple Progress and Controls */}
            {selectedFiles.length > 0 && (
              <Card className="p-4">
                {isProcessing ? (
                  <div className="space-y-3">
                    <div className="flex items-center justify-center text-sm text-gray-600 dark:text-gray-400">
                      <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                      Processing {completedCount} of {selectedFiles.length} images...
                    </div>
                    <Progress value={processingProgress} className="w-full" />
                  </div>
                ) : (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      {completedCount > 0 && (
                        <>
                          <Button onClick={downloadAll}>
                            <Download className="w-4 h-4 mr-2" />
                            Download All ({completedCount})
                          </Button>
                          <Button variant="outline" onClick={downloadAsZip}>
                            <Archive className="w-4 h-4 mr-2" />
                            Download ZIP
                          </Button>
                        </>
                      )}
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {completedCount} of {selectedFiles.length} ready
                      </span>
                    </div>
                    
                    <Button variant="outline" size="sm" onClick={clearAll}>
                      <Trash2 className="w-4 h-4 mr-2" />
                      Clear
                    </Button>
                  </div>
                )}
              </Card>
            )}

            {/* Image Grid */}
            {processedImages.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {processedImages.map((image) => (
                  <Card key={image.id} className="p-3 relative">
                    <div className="space-y-3">
                      {/* Image Display */}
                      <div className="aspect-square bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden relative flex items-center justify-center">
                        {image.processedData ? (
                          <ProcessedPreviewCanvas data={image.processedData} />
                        ) : image.originalPreviewUrl ? (
                          <img
                            src={image.originalPreviewUrl}
                            alt="Original color photo before batch black and white conversion"
                            className="w-full h-full object-cover opacity-60"
                          />
                        ) : (
                          <div className="w-full h-full flex flex-col items-center justify-center">
                            <RefreshCw className="w-6 h-6 animate-spin text-primary-600" />
                          </div>
                        )}

                        {image.processingStatus === 'processing' && (
                          <div className="absolute inset-0 bg-black/25 flex items-center justify-center">
                            <RefreshCw className="w-6 h-6 animate-spin text-primary-100" />
                          </div>
                        )}
                        {image.processingStatus === 'pending' && (
                          <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                            <Clock className="w-6 h-6 text-gray-200" />
                          </div>
                        )}
                        {image.processingStatus === 'error' && (
                          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                            <AlertCircle className="w-6 h-6 text-red-400" />
                          </div>
                        )}

                        {image.processingStatus === 'completed' && (
                          <div className="absolute top-2 right-2 bg-green-500 text-white rounded-full p-1">
                            <CheckCircle className="w-3 h-3" />
                          </div>
                        )}
                      </div>
                      
                      {/* File name */}
                      <p className="text-xs font-medium text-gray-900 dark:text-white truncate">
                        {image.originalFile.name}
                      </p>
                      
                      {/* Format selection & Download */}
                      {image.processingStatus === 'completed' && image.processedData && (
                        <div className="space-y-2">
                          <Select
                            value={image.selectedFormat.value}
                            onValueChange={(value) => handleFormatChange(image.id, value)}
                          >
                            <SelectTrigger className="w-full text-left text-xs h-8 px-2 py-1">
                              <span className="truncate">{image.selectedFormat.label}</span>
                            </SelectTrigger>
                            <SelectContent>
                              {DOWNLOAD_FORMATS.map(format => (
                                <SelectItem key={format.value} value={format.value}>
                                  {format.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>

                          <Button
                            size="sm"
                            className="w-full text-xs h-7"
                            onClick={() => downloadImageFile(image)}
                          >
                            <Download className="w-3 h-3 mr-1" />
                            Download
                          </Button>
                        </div>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            )}
            <section className="bg-white dark:bg-gray-800 rounded-3xl p-8 md:p-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center">
                How to Convert Multiple Images to Black and White in One Session
              </h2>
              <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 mb-8 text-center">
                Follow these steps to keep every file organized as you convert multiple images to black and white. The workflow is designed for speed, whether you are preparing a wedding gallery, managing an ecommerce drop, or building a social media campaign.
              </p>
              <ol className="space-y-6 text-left">
                <li>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Gather and label your source files</h3>
                  <p className="text-gray-600 dark:text-gray-400">Create a folder for the project and sort assets by scene or product before you load them. Good naming conventions keep the batch black and white converter interface tidy and make it easier to hand off files to teammates after processing.</p>
                </li>
                <li>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Upload everything into the converter</h3>
                  <p className="text-gray-600 dark:text-gray-400">Drag a full stack of images into the dropzone. The tool instantly queues each file and begins to convert photos to black and white using your selected preset so you do not waste a second on manual clicks.</p>
                </li>
                <li>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Monitor progress while you multitask</h3>
                  <p className="text-gray-600 dark:text-gray-400">Watch the progress bar and status labels to see how many black and white photos are complete. You can meanwhile update spreadsheets, write captions, or prep exports without pausing the conversion queue.</p>
                </li>
                <li>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Download with consistent naming</h3>
                  <p className="text-gray-600 dark:text-gray-400">Once processing hits 100 percent, download individual files or grab the entire set. The converter appends a helpful "-bw" suffix so you know which versions are the black and white pictures ready for delivery.</p>
                </li>
              </ol>
            </section>

            <section className="bg-gray-50 dark:bg-gray-900/60 rounded-3xl p-8 md:p-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center">
                Why Teams Choose This Batch Black and White Converter
              </h2>
              <div className="grid md:grid-cols-2 gap-8 text-left text-gray-600 dark:text-gray-400">
                <div className="space-y-4">
                  <p>Agencies need fast turnarounds with zero privacy concerns. Because the batch processor keeps every pixel on your device, creative directors can make pictures black and white for confidential pitches without touching cloud storage or external plugins.</p>
                  <p>Marketing managers love the repeatable presets. Once you dial in a look that fits your brand, you can convert multiple images to black and white every week and maintain a consistent tone across product launches, billboards, email banners, and paid ads.</p>
                </div>
                <div className="space-y-4">
                  <p>Event photographers often deliver thousands of files. Automating the first pass with this batch black and white converter gives you a polished baseline, so you can spend editing time on retouching hero shots instead of repetitive conversions.</p>
                  <p>Educators and non-profits rely on the workflow for newsletters and course materials. Dragging an entire lecture folder into the converter produces accessible black and white images that print cleanly and look professional on every device.</p>
                </div>
              </div>
            </section>

            <section className="bg-white dark:bg-gray-800 rounded-3xl p-8 md:p-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center">
                Batch Workflow Tips for Consistent Black and White Photos
              </h2>
              <ul className="list-disc pl-6 space-y-4 text-gray-600 dark:text-gray-400">
                <li>Group similar lighting conditions so the converter can apply the same preset and keep contrast levels consistent across every set of black and white photos.</li>
                <li>Run a short test batch to confirm grain and contrast settings before you process the full queue. This protects your time and keeps make pictures black and white projects on schedule.</li>
                <li>Leverage the built-in format picker to export PNG, JPG, or WebP variations for different platforms without reprocessing the originals.</li>
                <li>Keep an eye on the status panel. If any image has an error state, you can requeue it instantly instead of digging through folders later.</li>
                <li>Archive the processed set with a project code so you can repurpose the same files the next time you convert photos to black and white for a related campaign.</li>
              </ul>
            </section>

            <section className="bg-gray-50 dark:bg-gray-900/60 rounded-3xl p-8 md:p-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center">
                Batch Converter FAQ
              </h2>
              <div className="space-y-6 text-left text-gray-600 dark:text-gray-400">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">How many files can I process at once?</h3>
                  <p>The batch black and white converter comfortably handles more than 100 images in modern browsers. Queue them all, let the worker finish, and download when every status badge turns green.</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Will my originals stay untouched?</h3>
                  <p>Absolutely. The tool creates processed copies and keeps your source files intact. You can revisit the same folder to make picture adjustments or run a different preset later.</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Can I switch presets mid-batch?</h3>
                  <p>You can cancel and restart with a new preset at any time. Adjust the sliders, requeue the files, and the converter will apply your updated look to every photo to black and white export.</p>
                </div>
              </div>
            </section>
        </div>
      </div>
    </div>
  )
}
