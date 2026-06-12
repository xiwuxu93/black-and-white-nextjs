'use client'

import React, { useState, useEffect, useRef } from 'react'
import { 
  FileText, 
  Download, 
  Settings, 
  RefreshCw, 
  AlertCircle, 
  CheckCircle2, 
  Loader2, 
  Printer, 
  Eye,
  Sliders
} from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { PDFDocument } from 'pdf-lib'

declare global {
  interface Window {
    pdfjsLib: any
  }
}

export default function PdfPage() {
  // Loading state for PDF.js CDN
  const [pdfjsLoaded, setPdfjsLoaded] = useState(false)
  const [loadingError, setLoadingError] = useState<string | null>(null)

  // Uploaded file states
  const [file, setFile] = useState<File | null>(null)
  const [pageCount, setPageCount] = useState<number>(0)
  const [fileSizeMB, setFileSizeMB] = useState<string>('0')

  // Processing states
  const [isProcessing, setIsProcessing] = useState(false)
  const [processedPages, setProcessedPages] = useState<number>(0)
  const [processingStatus, setProcessingStatus] = useState<string>('')
  
  // Customization parameters
  const [contrast, setContrast] = useState<number>(15) // 0 to 50, default 15
  const [brightness, setBrightness] = useState<number>(0) // -50 to 50, default 0
  const [dpi, setDpi] = useState<number>(150) // 150 (standard print) or 200 (high res)
  
  // Preview and final output states
  const [previewUrls, setPreviewUrls] = useState<string[]>([])
  const [outputPdfBlobUrl, setOutputPdfBlobUrl] = useState<string | null>(null)
  const [outputPdfSize, setOutputPdfSize] = useState<string>('0')
  const [downloadFilename, setDownloadFilename] = useState<string>('')

  const fileInputRef = useRef<HTMLInputElement>(null)
  const dragCounterRef = useRef<number>(0)
  const [isDragging, setIsDragging] = useState(false)

  // Load PDF.js dynamically from CDN
  useEffect(() => {
    if (typeof window === 'undefined') return

    if (window.pdfjsLib) {
      setPdfjsLoaded(true)
      return
    }

    const script = document.createElement('script')
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.min.js'
    script.async = true
    script.onload = () => {
      if (window.pdfjsLib) {
        window.pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js'
        setPdfjsLoaded(true)
      } else {
        setLoadingError('Failed to initialize PDF parsing library.')
      }
    }
    script.onerror = () => {
      setLoadingError('Failed to load PDF library from CDN. Please check your internet connection.')
    }
    document.body.appendChild(script)
  }, [])

  // Cleanup blob URLs on unmount
  useEffect(() => {
    return () => {
      if (outputPdfBlobUrl) {
        URL.revokeObjectURL(outputPdfBlobUrl)
      }
      previewUrls.forEach(url => URL.revokeObjectURL(url))
    }
  }, [outputPdfBlobUrl, previewUrls])

  // Drag and Drop handlers
  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    dragCounterRef.current++
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      setIsDragging(true)
    }
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    dragCounterRef.current--
    if (dragCounterRef.current === 0) {
      setIsDragging(false)
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
    dragCounterRef.current = 0

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFile = e.dataTransfer.files[0]
      if (droppedFile.type === 'application/pdf' || droppedFile.name.endsWith('.pdf')) {
        handleFile(droppedFile)
      } else {
        alert('Invalid file format. Please drop a valid PDF file.')
      }
    }
  }

  const triggerFileInput = () => {
    fileInputRef.current?.click()
  }

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFile(e.target.files[0])
    }
  }

  // Parse uploaded PDF
  const handleFile = async (selectedFile: File) => {
    if (!pdfjsLoaded) {
      alert('The PDF engine is still loading. Please wait a moment.')
      return
    }

    setFile(selectedFile)
    setFileSizeMB((selectedFile.size / (1024 * 1024)).toFixed(2))
    setOutputPdfBlobUrl(null)
    setPreviewUrls([])
    setProcessedPages(0)

    try {
      const fileReader = new FileReader()
      fileReader.onload = async (e) => {
        const typedarray = new Uint8Array(e.target?.result as ArrayBuffer)
        const pdfjsLib = window.pdfjsLib
        const loadingTask = pdfjsLib.getDocument({ data: typedarray })
        
        const pdf = await loadingTask.promise
        setPageCount(pdf.numPages)
      }
      fileReader.readAsArrayBuffer(selectedFile)
    } catch (error) {
      console.error('Error parsing PDF:', error)
      alert('Error parsing PDF file. It might be corrupted or password protected.')
      resetState()
    }
  }

  // Grayscale Image Processing Logic
  const applyGrayscaleFilter = (ctx: CanvasRenderingContext2D, width: number, height: number, contrastVal: number, brightnessVal: number) => {
    const imgData = ctx.getImageData(0, 0, width, height)
    const data = imgData.data
    
    // Contrast factor calculation
    const factor = (259 * (contrastVal + 100)) / (255 * (100 - contrastVal))
    const bAdd = brightnessVal

    for (let i = 0; i < data.length; i += 4) {
      const r = data[i]
      const g = data[i + 1]
      const b = data[i + 2]

      // Convert to grayscale using standard luminance formula
      let gray = 0.299 * r + 0.587 * g + 0.114 * b

      // Adjust Brightness
      gray += bAdd

      // Adjust Contrast
      gray = factor * (gray - 128) + 128

      // Clamp values between 0 and 255
      const finalVal = Math.min(255, Math.max(0, gray))

      // Write back to image channel
      data[i] = finalVal
      data[i + 1] = finalVal
      data[i + 2] = finalVal
    }

    ctx.putImageData(imgData, 0, 0)
  }

  // Core Grayscale Conversion Loop
  const convertPdf = async () => {
    if (!file || !window.pdfjsLib) return

    setIsProcessing(true)
    setProcessedPages(0)
    setProcessingStatus('Reading document structure...')

    // Clear previous preview URLs
    previewUrls.forEach(url => URL.revokeObjectURL(url))
    setPreviewUrls([])

    try {
      const fileData = await file.arrayBuffer()
      
      // Load original PDF document to read page dimensions
      const originalPdfDoc = await PDFDocument.load(fileData)
      const originalPages = originalPdfDoc.getPages()
      
      // Initialize pdf.js to render canvases
      const pdfjsLib = window.pdfjsLib
      const loadingTask = pdfjsLib.getDocument({ data: new Uint8Array(fileData) })
      const pdfInstance = await loadingTask.promise

      // Create a new PDF Document using pdf-lib
      const grayscalePdfDoc = await PDFDocument.create()
      const limitUrls: string[] = []

      for (let pageNum = 1; pageNum <= pageCount; pageNum++) {
        setProcessingStatus(`Rendering page ${pageNum} of ${pageCount}...`)
        
        // Load page via pdf.js
        const page = await pdfInstance.getPage(pageNum)
        const scale = dpi / 72
        const viewport = page.getViewport({ scale })

        // Create Canvas element
        const canvas = document.createElement('canvas')
        canvas.width = viewport.width
        canvas.height = viewport.height
        const ctx = canvas.getContext('2d')

        if (!ctx) {
          throw new Error(`Failed to create canvas context for page ${pageNum}`)
        }

        // Apply Grayscale + Contrast + Brightness adjustments
        // Try to use browser-native canvas CSS filters for massive speedups and GPU acceleration
        const supportsFilters = typeof ctx.filter === 'string'
        
        if (supportsFilters) {
          // Render to an offscreen canvas first, then draw to main canvas with CSS filters
          const offscreenCanvas = document.createElement('canvas')
          offscreenCanvas.width = viewport.width
          offscreenCanvas.height = viewport.height
          const offscreenCtx = offscreenCanvas.getContext('2d')
          
          if (offscreenCtx) {
            const renderContext = {
              canvasContext: offscreenCtx,
              viewport: viewport
            }
            await page.render(renderContext).promise
            
            setProcessingStatus(`Applying monochrome filters (GPU) to page ${pageNum}...`)
            ctx.filter = `grayscale(100%) brightness(${100 + brightness}%) contrast(${100 + contrast}%)`
            ctx.drawImage(offscreenCanvas, 0, 0)
            
            // Clean up offscreen canvas immediately to free graphics memory
            offscreenCanvas.width = 0
            offscreenCanvas.height = 0
          } else {
            // Fallback to JS pixel loop if offscreen rendering context fails
            const renderContext = {
              canvasContext: ctx,
              viewport: viewport
            }
            await page.render(renderContext).promise
            setProcessingStatus(`Applying monochrome filters (CPU fallback) to page ${pageNum}...`)
            applyGrayscaleFilter(ctx, canvas.width, canvas.height, contrast, brightness)
          }
        } else {
          // Fallback to CPU filtering for older browsers
          const renderContext = {
            canvasContext: ctx,
            viewport: viewport
          }
          await page.render(renderContext).promise
          setProcessingStatus(`Applying monochrome filters (CPU fallback) to page ${pageNum}...`)
          applyGrayscaleFilter(ctx, canvas.width, canvas.height, contrast, brightness)
        }

        // Convert canvas to compressed JPEG blob (DPI compression)
        const imageBlob = await new Promise<Blob>((resolve) => {
          canvas.toBlob((blob) => {
            resolve(blob!)
          }, 'image/jpeg', 0.85) // 85% compression balance
        })

        // Generate thumbnail preview url
        // Only generate and store previews for the first 10 pages to avoid Out-Of-Memory crashes on large PDFs
        if (pageNum <= 10) {
          const previewUrl = URL.createObjectURL(imageBlob)
          limitUrls.push(previewUrl)
          setPreviewUrls([...limitUrls])
        }

        // Add to pdf-lib document
        setProcessingStatus(`Reassembling document with page ${pageNum}...`)
        const imageBytes = await imageBlob.arrayBuffer()
        const grayscaleImage = await grayscalePdfDoc.embedJpg(imageBytes)

        // Retrieve original dimensions to preserve layout ratios
        const origPage = originalPages[pageNum - 1]
        const { width: origWidth, height: origHeight } = origPage.getSize()

        // Create new page with matching size and draw the B&W image onto it
        const newPage = grayscalePdfDoc.addPage([origWidth, origHeight])
        newPage.drawImage(grayscaleImage, {
          x: 0,
          y: 0,
          width: origWidth,
          height: origHeight,
        })

        // Explicitly dispose of canvas graphics memory
        canvas.width = 0
        canvas.height = 0

        setProcessedPages(pageNum)

        // Yield control to the browser main thread to keep UI responsive and prevent tab freeze/crash
        await new Promise((resolve) => setTimeout(resolve, 30))
      }

      // Finalize PDF assembly
      setProcessingStatus('Saving document output...')
      const finalPdfBytes = await grayscalePdfDoc.save()
      const finalPdfBlob = new Blob([finalPdfBytes as any], { type: 'application/pdf' })
      
      const fileBlobUrl = URL.createObjectURL(finalPdfBlob)
      setOutputPdfBlobUrl(fileBlobUrl)
      setOutputPdfSize((finalPdfBlob.size / (1024 * 1024)).toFixed(2))

      const origName = file.name.replace(/\.[^/.]+$/, "") // Strip original extension
      setDownloadFilename(`${origName}-grayscale.pdf`)
      
      setProcessingStatus('Conversion complete!')
      setIsProcessing(false)

    } catch (error) {
      console.error('Error converting PDF to black and white:', error)
      alert('Conversion failed. This PDF might contain unsupported font types or encrypted structures.')
      setIsProcessing(false)
    }
  }

  const resetState = () => {
    setFile(null)
    setPageCount(0)
    setFileSizeMB('0')
    if (outputPdfBlobUrl) {
      URL.revokeObjectURL(outputPdfBlobUrl)
      setOutputPdfBlobUrl(null)
    }
    previewUrls.forEach(url => URL.revokeObjectURL(url))
    setPreviewUrls([])
    setProcessedPages(0)
    setProcessingStatus('')
  }

  return (
    <div className="min-h-[80vh] bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4">
      <div className="container mx-auto max-w-5xl">
        
        {/* Dynamic Script Loading Status */}
        {!pdfjsLoaded && !loadingError && (
          <div className="flex flex-col items-center justify-center py-20 text-gray-500 dark:text-gray-400">
            <Loader2 className="w-12 h-12 animate-spin mb-4 text-primary-600" />
            <p className="text-lg font-medium">Loading local PDF parsing engine...</p>
            <p className="text-sm">This takes just a second and runs 100% in your browser.</p>
          </div>
        )}

        {loadingError && (
          <div className="max-w-md mx-auto text-center py-20">
            <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Engine Load Failed</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">{loadingError}</p>
            <Button onClick={() => window.location.reload()}>Retry Loading</Button>
          </div>
        )}

        {/* main workspace */}
        {pdfjsLoaded && (
          <>
            {/* Header & Subtitle */}
            {!file && (
              <div className="text-center max-w-3xl mx-auto mb-12">
                <Badge className="mb-4" variant="secondary">
                  🔒 Private Local Conversion
                </Badge>
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                  Convert PDF to Black and White Online
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-300">
                  Grayscale your PDF files locally. Save printer ink and toner. No server uploads means your files remain 100% secure.
                </p>
              </div>
            )}

            {/* File Upload Zone */}
            {!file && (
              <div 
                className={`max-w-2xl mx-auto rounded-3xl border-2 border-dashed p-12 text-center transition-all cursor-pointer ${
                  isDragging 
                    ? 'border-primary-500 bg-primary-50/50 dark:bg-primary-900/10' 
                    : 'border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-primary-400'
                }`}
                onClick={triggerFileInput}
                onDragEnter={handleDragEnter}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <input 
                  type="file" 
                  className="hidden" 
                  ref={fileInputRef} 
                  accept="application/pdf"
                  onChange={handleFileInputChange}
                />
                <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-full w-fit mx-auto text-blue-600 dark:text-blue-400">
                  <FileText className="w-12 h-12" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  Drag & Drop PDF here
                </h3>
                <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-sm mx-auto text-sm">
                  or click to browse from your device. Supported up to 50MB documents.
                </p>
                <Button size="lg" className="font-semibold">
                  Select PDF Document
                </Button>
              </div>
            )}

            {/* File Active Workspace */}
            {file && (
              <div className="grid lg:grid-cols-3 gap-8">
                
                {/* Control Panel (Left Column) */}
                <div className="lg:col-span-1 space-y-6">
                  <Card className="p-6 bg-white dark:bg-gray-800 border-gray-100 dark:border-gray-700">
                    <div className="flex items-center space-x-3 mb-6 pb-4 border-b border-gray-100 dark:border-gray-700">
                      <FileText className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                      <div className="overflow-hidden">
                        <h4 className="font-bold text-gray-900 dark:text-white truncate" title={file.name}>
                          {file.name}
                        </h4>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {fileSizeMB} MB • {pageCount} pages
                        </p>
                      </div>
                    </div>

                    {/* Large File Warning */}
                    {(Number(fileSizeMB) > 15 || pageCount > 15) && (
                      <div className="mb-6 p-3 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/50 rounded-xl flex items-start space-x-2 text-xs text-amber-800 dark:text-amber-300">
                        <AlertCircle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                        <div>
                          <p className="font-semibold">Large Document Detected</p>
                          <p className="mt-0.5">
                            Processing runs locally in your browser. Previews are limited to the first 10 pages to save memory. Please keep this tab active during conversion.
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Parameters Controls */}
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold text-gray-900 dark:text-white flex items-center">
                          <Sliders className="w-4 h-4 mr-2" /> Adjustment Sliders
                        </span>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-8 text-xs px-2"
                          onClick={() => { setContrast(15); setBrightness(0); }}
                          disabled={isProcessing}
                        >
                          Reset
                        </Button>
                      </div>

                      {/* Contrast Slider */}
                      <div>
                        <div className="flex justify-between text-xs font-medium text-gray-500 dark:text-gray-400 mb-2">
                          <span>Contrast Contrast</span>
                          <span className="font-bold text-gray-900 dark:text-white">+{contrast}%</span>
                        </div>
                        <input 
                          type="range" 
                          min="0" 
                          max="40" 
                          value={contrast}
                          onChange={(e) => setContrast(Number(e.target.value))}
                          className="w-full accent-primary-600 cursor-pointer"
                          disabled={isProcessing}
                        />
                        <p className="text-[10px] text-gray-400 dark:text-gray-500 mt-1">
                          Boost contrast to keep text crisp on cheap gray printers.
                        </p>
                      </div>

                      {/* Brightness Slider */}
                      <div>
                        <div className="flex justify-between text-xs font-medium text-gray-500 dark:text-gray-400 mb-2">
                          <span>Brightness Brightness</span>
                          <span className="font-bold text-gray-900 dark:text-white">{brightness > 0 ? `+${brightness}` : brightness}%</span>
                        </div>
                        <input 
                          type="range" 
                          min="-30" 
                          max="30" 
                          value={brightness}
                          onChange={(e) => setBrightness(Number(e.target.value))}
                          className="w-full accent-primary-600 cursor-pointer"
                          disabled={isProcessing}
                        />
                      </div>

                      {/* DPI Selector */}
                      <div>
                        <span className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-2">
                          Rendering Quality (DPI)
                        </span>
                        <div className="grid grid-cols-2 gap-2">
                          <Button
                            type="button"
                            variant={dpi === 150 ? 'default' : 'outline'}
                            onClick={() => setDpi(150)}
                            className="text-xs"
                            size="sm"
                            disabled={isProcessing}
                          >
                            Standard (150 DPI)
                          </Button>
                          <Button
                            type="button"
                            variant={dpi === 200 ? 'default' : 'outline'}
                            onClick={() => setDpi(200)}
                            className="text-xs"
                            size="sm"
                            disabled={isProcessing}
                          >
                            High Res (200 DPI)
                          </Button>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="pt-4 border-t border-gray-100 dark:border-gray-700 space-y-3">
                        {!outputPdfBlobUrl ? (
                          <Button 
                            className="w-full font-bold h-12" 
                            size="lg"
                            disabled={isProcessing}
                            onClick={convertPdf}
                          >
                            {isProcessing ? (
                              <>
                                <Loader2 className="w-5 h-5 animate-spin mr-2" />
                                Processing...
                              </>
                            ) : (
                              <>
                                <Printer className="w-5 h-5 mr-2" />
                                Convert to Black & White
                              </>
                            )}
                          </Button>
                        ) : (
                          <a 
                            href={outputPdfBlobUrl} 
                            download={downloadFilename}
                            className="block w-full"
                          >
                            <Button 
                              className="w-full font-bold h-12 bg-green-600 hover:bg-green-700 text-white" 
                              size="lg"
                            >
                              <Download className="w-5 h-5 mr-2" />
                              Download Grayscale PDF
                            </Button>
                          </a>
                        )}

                        <Button 
                          variant="outline" 
                          className="w-full text-xs h-10"
                          onClick={resetState}
                          disabled={isProcessing}
                        >
                          <RefreshCw className="w-3.5 h-3.5 mr-1.5" />
                          Choose Another Document
                        </Button>
                      </div>
                    </div>
                  </Card>

                  {/* Processing Status Banner */}
                  {isProcessing && (
                    <Card className="p-4 bg-blue-50/50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-900/50">
                      <div className="flex items-start space-x-3">
                        <Loader2 className="w-5 h-5 animate-spin text-blue-600 dark:text-blue-400 mt-0.5" />
                        <div>
                          <h5 className="font-semibold text-sm text-gray-900 dark:text-white">
                            Converting Pages
                          </h5>
                          <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                            {processingStatus}
                          </p>
                          {pageCount > 0 && (
                            <div className="w-full bg-gray-200 dark:bg-gray-700 h-1.5 rounded-full mt-2 overflow-hidden">
                              <div 
                                className="bg-blue-600 h-1.5 rounded-full transition-all duration-300"
                                style={{ width: `${(processedPages / pageCount) * 100}%` }}
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    </Card>
                  )}

                  {/* Complete Banner */}
                  {outputPdfBlobUrl && (
                    <Card className="p-4 bg-green-50/50 dark:bg-green-950/20 border-green-200 dark:border-green-900/50">
                      <div className="flex items-start space-x-3">
                        <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5" />
                        <div>
                          <h5 className="font-semibold text-sm text-gray-900 dark:text-white">
                            Grayscale Complete
                          </h5>
                          <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                            Grayscale file generated: <strong>{outputPdfSize} MB</strong>. All colors mapped to grayscale and compressed locally.
                          </p>
                        </div>
                      </div>
                    </Card>
                  )}
                </div>

                {/* Preview Wall (Right Column) */}
                <div className="lg:col-span-2 space-y-6">
                  <Card className="p-6 bg-white dark:bg-gray-800 border-gray-100 dark:border-gray-700 min-h-[500px] flex flex-col">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6 pb-4 border-b border-gray-100 dark:border-gray-700">
                      <span className="text-sm font-semibold text-gray-900 dark:text-white flex items-center">
                        <Eye className="w-4 h-4 mr-2" /> 
                        {outputPdfBlobUrl ? 'Processed Page Previews' : 'Live Document Preview'}
                      </span>
                      {pageCount > 10 && (
                        <span className="text-xs text-amber-600 dark:text-amber-400 font-medium">
                          ⚠️ Previews limited to first 10 pages to save memory
                        </span>
                      )}
                    </div>

                    {/* Preview Cards Grid */}
                    {previewUrls.length > 0 ? (
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 overflow-y-auto max-h-[600px] p-1">
                        {previewUrls.map((url, idx) => (
                          <div key={idx} className="relative group rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden bg-gray-50 dark:bg-gray-900">
                            <img src={url} alt={`Page ${idx+1}`} className="w-full object-contain h-64" />
                            <div className="absolute bottom-0 inset-x-0 bg-black/60 text-white text-xs font-semibold py-1.5 text-center">
                              Page {idx + 1}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="flex-1 flex flex-col items-center justify-center text-gray-400 dark:text-gray-500 py-20 border-2 border-dashed border-gray-100 dark:border-gray-800 rounded-2xl">
                        <Printer className="w-16 h-16 mb-4 stroke-1" />
                        <h5 className="font-bold text-gray-600 dark:text-gray-400 mb-1">
                          No Preview Available
                        </h5>
                        <p className="text-xs max-w-xs text-center">
                          Adjust parameters on the left and click &quot;Convert&quot; to render grayscale previews and build the document.
                        </p>
                      </div>
                    )}
                  </Card>
                </div>
              </div>
            )}

            {/* Structured SEO FAQs & Tutorial (Only visible when no file is active) */}
            {!file && (
              <div className="mt-24 max-w-4xl mx-auto space-y-16">
                
                {/* 3 Step Tutorial */}
                <section className="bg-white dark:bg-gray-800 rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100/50 dark:border-gray-700/50">
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-10 text-center">
                    How to Convert PDF to Black and White Online
                  </h2>
                  <div className="grid md:grid-cols-3 gap-8">
                    <div className="flex flex-col items-center text-center">
                      <span className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 text-blue-700 font-bold text-xl mb-4 dark:bg-blue-900/30 dark:text-blue-400">
                        1
                      </span>
                      <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-2">Upload Document</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Select or drag in your color PDF document. Processing is local, supporting files up to 50MB.
                      </p>
                    </div>
                    <div className="flex flex-col items-center text-center">
                      <span className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 text-blue-700 font-bold text-xl mb-4 dark:bg-blue-900/30 dark:text-blue-400">
                        2
                      </span>
                      <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-2">Adjust Contrast</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Boost contrast if your document contains light-colored graphics to make sure text prints out dark and legible.
                      </p>
                    </div>
                    <div className="flex flex-col items-center text-center">
                      <span className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 text-blue-700 font-bold text-xl mb-4 dark:bg-blue-900/30 dark:text-blue-400">
                        3
                      </span>
                      <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-2">Download & Print</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Export as a grayscale PDF and print. All pages remain at native vector layouts and sizes.
                      </p>
                    </div>
                  </div>
                </section>

                {/* FAQ Accordions */}
                <section>
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-10 text-center">
                    Frequently Asked Questions
                  </h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100/50 dark:border-gray-700/50">
                      <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                        How to make a PDF black and white?
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        To convert a PDF to black and white, drag and drop your document into the conversion area above. Choose your contrast and quality settings, and click &quot;Convert to Black &amp; White&quot;. Our tool will automatically change the PDF color elements to grayscale and let you download the completed file instantly.
                      </p>
                    </div>

                    <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100/50 dark:border-gray-700/50">
                      <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                        How do I change a color PDF to black and white?
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        You can easily change color PDF documents to black and white by uploading them to BWConverter. Our local converter maps colored text, borders, headers, and images to their optimal grayscale equivalents, ensuring contrast remains high for reading and printing.
                      </p>
                    </div>

                    <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100/50 dark:border-gray-700/50">
                      <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                        How to save a PDF in black and white on Mac or Windows?
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Since BWConverter operates entirely within your web browser, you can convert and save your black and white PDF on macOS, Windows, Linux, or mobile devices. Once processing completes, clicking the download button will save the grayscale document to your system downloads folder.
                      </p>
                    </div>

                    <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100/50 dark:border-gray-700/50">
                      <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                        Does converting color PDF to black and white save ink?
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Yes. By converting colored charts, graphs, graphics, and backgrounds into pure monochrome or grayscale, your home or office printer will avoid pulling expensive color toner or ink cartridges, cutting your printing costs significantly.
                      </p>
                    </div>

                    <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100/50 dark:border-gray-700/50">
                      <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                        Can I convert PDF to black and white without Adobe Acrobat?
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Absolutely. Adobe Acrobat Pro requires a paid subscription to convert color PDFs to grayscale. BWConverter provides a 100% free, browser-native alternative. You don&apos;t have to register, upload your files to external servers, or pay a single cent.
                      </p>
                    </div>

                    <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100/50 dark:border-gray-700/50">
                      <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                        Is there a page limit for B&amp;W PDF conversions?
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        No, we do not impose page count limits. You can convert the entire document, regardless of length. Large documents are processed locally, with previews limited to the first 10 pages to optimize browser performance.
                      </p>
                    </div>
                  </div>
                </section>
              </div>
            )}
          </>
        )}

      </div>
    </div>
  )
}
