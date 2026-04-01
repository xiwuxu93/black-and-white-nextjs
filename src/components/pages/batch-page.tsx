'use client'

/* eslint-disable @next/next/no-img-element */

import React, { useState, useCallback, useRef, useEffect } from 'react'
import Link from 'next/link'
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
  AlertCircle,
  Zap,
  ShieldCheck,
  Cpu,
  Workflow
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header Section */}
        <div className="text-center mb-16">
          <Badge className="mb-4" variant="secondary">
            <Zap className="w-4 h-4 mr-2 text-yellow-500" />
            High-Volume Production Tool
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Batch Black and White Converter
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
            I built this for one practical task: <strong>processing large folders without uploads</strong>.
            It works well for wedding galleries, ecommerce catalogs, and social media sets where you need
            consistent black and white output across many files.
          </p>
        </div>

        <div className="space-y-12 mb-24">
            {/* Upload Area */}
            {selectedFiles.length === 0 && (
              <Card
                className="border-2 border-dashed border-gray-300 dark:border-gray-600 hover:border-primary-400 dark:hover:border-primary-500 transition-all duration-300 cursor-pointer bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm"
                onDrop={handleDrop}
                onDragOver={(e) => e.preventDefault()}
                onClick={() => fileInputRef.current?.click()}
              >
                <div className="p-16 text-center">
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleFileInput}
                    className="hidden"
                  />
                  
                  <div className="w-20 h-20 bg-primary-50 dark:bg-primary-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Upload className="w-10 h-10 text-primary-600 dark:text-primary-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                    Drop a Folder or Select Files
                  </h3>
                  <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
                    Add up to 100 images. Files are processed in browser workers so the page stays responsive.
                  </p>
                  <Button size="lg" className="rounded-full px-8 shadow-lg shadow-primary-500/20">
                    Browse Files
                  </Button>
                  <p className="text-sm text-gray-500 mt-6 flex items-center justify-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-green-600" />
                    No uploads. Files stay in your current browser session.
                  </p>
                </div>
              </Card>
            )}

            {/* Processing Controls */}
            {selectedFiles.length > 0 && (
              <Card className="p-6 bg-white dark:bg-gray-900 shadow-xl border-none">
                {isProcessing ? (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-gray-900 dark:text-white font-medium">
                        <RefreshCw className="w-5 h-5 mr-3 animate-spin text-primary-600" />
                        Processing Queue: {completedCount} / {selectedFiles.length}
                      </div>
                      <span className="text-sm font-mono text-primary-600">{Math.round(processingProgress)}%</span>
                    </div>
                    <Progress value={processingProgress} className="h-3" />
                  </div>
                ) : (
                  <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex flex-wrap items-center gap-4">
                      {completedCount > 0 && (
                        <>
                          <Button onClick={downloadAll} className="rounded-full">
                            <Download className="w-4 h-4 mr-2" />
                            Download All ({completedCount})
                          </Button>
                          <Button variant="outline" onClick={downloadAsZip} className="rounded-full border-gray-200">
                            <Archive className="w-4 h-4 mr-2" />
                            Export List
                          </Button>
                        </>
                      )}
                      <Badge variant="secondary" className="px-4 py-1">
                        Queue ready: {selectedFiles.length} files
                      </Badge>
                    </div>
                    
                    <Button variant="ghost" size="sm" onClick={clearAll} className="text-gray-400 hover:text-red-500 transition-colors">
                      <Trash2 className="w-4 h-4 mr-2" />
                      Clear Workspace
                    </Button>
                  </div>
                )}
              </Card>
            )}

            {/* Image Grid */}
            {processedImages.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                {processedImages.map((image) => (
                  <Card key={image.id} className="p-2 relative group overflow-hidden border-none bg-white dark:bg-gray-900 shadow-md">
                    <div className="space-y-3">
                      <div className="aspect-[4/5] bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden relative flex items-center justify-center">
                        {image.processedData ? (
                          <ProcessedPreviewCanvas data={image.processedData} />
                        ) : image.originalPreviewUrl ? (
                          <img
                            src={image.originalPreviewUrl}
                            alt="Original preview"
                            className="w-full h-full object-cover opacity-40 grayscale"
                          />
                        ) : null}

                        <div className="absolute inset-0 flex items-center justify-center bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity">
                           {image.processingStatus === 'completed' && (
                            <Button size="icon" variant="secondary" className="rounded-full h-10 w-10 shadow-lg" onClick={() => downloadImageFile(image)}>
                              <Download className="w-5 h-5" />
                            </Button>
                           )}
                        </div>

                        {image.processingStatus === 'processing' && (
                          <div className="absolute inset-0 bg-white/60 dark:bg-gray-900/60 flex items-center justify-center">
                            <RefreshCw className="w-6 h-6 animate-spin text-primary-600" />
                          </div>
                        )}
                        {image.processingStatus === 'error' && (
                          <div className="absolute inset-0 bg-red-50/80 flex items-center justify-center">
                            <AlertCircle className="w-6 h-6 text-red-500" />
                          </div>
                        )}
                      </div>
                      
                      <div className="px-1 flex items-center justify-between gap-2">
                        <p className="text-[10px] font-medium text-gray-500 dark:text-gray-400 truncate max-w-[80px]">
                          {image.originalFile.name}
                        </p>
                        <Badge variant="outline" className="text-[8px] h-4 py-0 px-1 font-mono uppercase">
                          {image.originalInfo.extension}
                        </Badge>
                      </div>
                      
                      {image.processingStatus === 'completed' && (
                        <div className="px-1 pb-1">
                          <Select
                            value={image.selectedFormat.value}
                            onValueChange={(value) => handleFormatChange(image.id, value)}
                          >
                            <SelectTrigger className="w-full h-6 text-[9px] px-2 bg-gray-50 dark:bg-gray-800 border-none">
                              <span>{image.selectedFormat.label}</span>
                            </SelectTrigger>
                            <SelectContent>
                              {DOWNLOAD_FORMATS.map(format => (
                                <SelectItem key={format.value} value={format.value}>
                                  {format.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            )}
        </div>

        {/* Technical & Workflow Section */}
        <div className="grid md:grid-cols-3 gap-12 mb-24">
          <div className="space-y-4">
            <div className="p-3 bg-white dark:bg-gray-900 rounded-2xl w-fit shadow-sm border border-gray-100 dark:border-gray-800">
              <Cpu className="w-6 h-6 text-primary-600" />
            </div>
            <h3 className="text-xl font-bold">Local Computing Power</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
              BWConverter uses <strong>Web Workers</strong> to process image data in background threads.
              You avoid long uploads, and your original files never leave the device.
            </p>
          </div>
          <div className="space-y-4">
            <div className="p-3 bg-white dark:bg-gray-900 rounded-2xl w-fit shadow-sm border border-gray-100 dark:border-gray-800">
              <Workflow className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-xl font-bold">Studio Workflow Integration</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
              A practical flow is to use batch mode as the first monochrome pass after culling.
              Apply one baseline preset to the whole set, then fine-tune only the keepers.
            </p>
          </div>
          <div className="space-y-4">
            <div className="p-3 bg-white dark:bg-gray-900 rounded-2xl w-fit shadow-sm border border-gray-100 dark:border-gray-800">
              <ShieldCheck className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-xl font-bold">Zero-Storage Commitment</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
              This tool does not store your photos on my server.
              Images only exist in browser memory while the tab is open.
            </p>
          </div>
        </div>

        {/* FAQ & Tips */}
        <div className="grid md:grid-cols-2 gap-16 mb-16">
          <div className="space-y-8">
            <h4 className="text-2xl font-bold">Production FAQ</h4>
            <div className="space-y-6">
              <details className="group border-b border-gray-100 dark:border-gray-800 pb-4">
                <summary className="list-none cursor-pointer font-semibold group-open:text-primary-600 transition-colors">
                  How many files can I process at once?
                </summary>
                <p className="mt-3 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  In testing, 100 to 150 images at 24MP works on recent laptops.
                  Actual limits depend on available RAM, so split into smaller runs if previews slow down.
                </p>
              </details>
              <details className="group border-b border-gray-100 dark:border-gray-800 pb-4">
                <summary className="list-none cursor-pointer font-semibold group-open:text-primary-600 transition-colors">
                  Does this tool resize my photos?
                </summary>
                <p className="mt-3 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  No. Output keeps the original width and height.
                  A 6000x4000 input exports at 6000x4000 unless you choose a different format/compression profile.
                </p>
              </details>
            </div>
          </div>
          <div className="bg-gray-900 rounded-3xl p-8 text-white">
            <h4 className="text-2xl font-bold mb-6">Solo Dev Tip</h4>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              &quot;When I process a large gallery, I batch by lighting setup first.
              Window-light photos and flash photos need different contrast baselines,
              and this split cuts rework later in delivery.&quot;
            </p>
            <div className="flex items-center gap-3">
              <img src="/authors/sivan-lee.jpg" alt="Sivan" className="w-10 h-10 rounded-full grayscale border border-gray-700" />
              <div>
                <p className="text-xs font-bold">Sivan Xu</p>
                <p className="text-[10px] text-gray-500 uppercase tracking-widest">Independent Developer</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
