'use client'

import React, { useState, useCallback, useRef } from 'react'
import Head from 'next/head'
import Image from 'next/image'
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
import { ChevronRight } from 'lucide-react'
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
      question: 'How do I convert an image to black and white?',
      answer:
        'Upload your file, choose a preset, and click download. The converter analyzes color data and applies channel mixing, letting you convert image to black and white with depth, contrast, and film-style grain in under a minute.'
    },
    {
      question: 'Can I make multiple photos black and white at once?',
      answer:
        'Yes. Head to the batch black and white converter to convert multiple images to black and white simultaneously. Drop in a full folder of photos and apply the same preset across every file.'
    },
    {
      question: 'How do I turn a picture black and white online?',
      answer:
        'Use the browser-based editor, drag in your picture, adjust the sliders, and hit export. There is no download or signup required to turn image black and white online with full control.'
    },
    {
      question: 'What\'s the best black and white converter?',
      answer:
        'The best converter gives you custom tonal control, fast previews, and private processing. BWConverter includes all of that plus presets inspired by darkroom workflows so you get professional black and white photos every time.'
    },
    {
      question: 'Is this black and white photo editor free?',
      answer:
        'Absolutely. BWConverter is a free black and white photo editor with no hidden paywalls, watermarks, or file limits. Every feature works without creating an account.'
    },
    {
      question: 'How do I make a black and white image from color?',
      answer:
        'Upload any color snapshot, select "Classic" or a more dramatic preset, then refine the highlights and shadows. The tool remaps every pixel so you can make a photo black and white while protecting detail.'
    },
    {
      question: 'Can I convert PNG or JPG to black and white?',
      answer:
        'Yes. Drop PNG, JPG, WebP, or TIFF files into the converter, and export them as black and white pictures in PNG, JPG, or WebP formats with your chosen quality level.'
    },
    {
      question: 'How do I download my black and white picture?',
      answer:
        'After previewing your image to black and white, select the file format you want and click download. The tool saves a copy locally with a file name that includes "-bw" so you can sort your edits at a glance.'
    },
    {
      question: 'Does this work for existing black and white photos?',
      answer:
        'Yes. Upload classic monochrome shots to add contrast, film grain, or tone adjustments. The black white image converter can enhance vintage negatives just as easily as it handles fresh color files.'
    },
    {
      question: 'How do I make images black and white in bulk?',
      answer:
        'Select all the files you need, open the batch tool, and start the queue. The batch workflow makes pictures black and white in bulk while keeping resolutions intact and filenames organized.'
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
          <div className="container mx-auto max-w-6xl">
            <div className="text-center max-w-4xl mx-auto">
              <Badge className="mb-6" variant="secondary">
                ✨ Free Black and White Converter
              </Badge>

              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
                Convert Images to Black and White Online
              </h1>

              
            </div>

            <div className="flex flex-wrap justify-center gap-2 mb-12">
              <Badge variant="secondary">Make Photos Black and White</Badge>
              <Badge variant="secondary">Instant Privacy-Friendly Processing</Badge>
              <Badge variant="secondary">Film Style Presets</Badge>
              <Badge variant="secondary">Professional Download Formats</Badge>
            </div>

            <div className="mb-16 max-w-xl mx-auto">
              <UploadArea 
                onFileSelect={handleFileSelect}
                isProcessing={isProcessing}
                className="max-w-xl"
              />
            </div>

            <p className="text-xl text-gray-600 dark:text-gray-400 mb-4">
                Turn every black and white image idea into reality with our free black and white converter. In one tab you can make image black and white, generate studio-grade contrast, and keep full resolution. Whether you are retouching a portrait, preparing a black and white photo for print, or refreshing a black and white picture for social media, the tool blends ease of use with pro controls so you can make photo black and white without losing a single detail. Because everything runs in your browser, no file ever leaves your device.
              </p>

              <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 mb-6">
                Our black and white image converter delivers live previews, film-inspired presets, and precise sliders that guide every image to black and white perfection. This black white image converter processes files locally with WebAssembly, so photographers, designers, and marketers can move any photo to black and white instantly for mood boards, ecommerce listings, pitch decks, or editorial spreads. Switch between presets, refine the tonal curve, and export professional assets ready for clients in seconds.
              </p>

              <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 mb-10">
                No matter if you need a quick black and white image maker for a single portrait or a full-scale black and white image generator for campaign planning, BWConverter keeps the workflow simple. Drag a file into the canvas, experiment with rich monochrome looks, and deliver consistent results across every platform while meeting strict quality standards for print and digital media teams.
              </p>

            <section className="bg-white dark:bg-gray-800 rounded-3xl p-8 md:p-12 mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6 text-center">
                How to Make Image Black and White in 3 Steps
              </h2>
              <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 mb-8">
                Converting color to monochrome should be quick, strategic, and repeatable. Follow this workflow any time you need to convert image to black and white for a marketing campaign, social reel, or gallery print. Each step is powered by our black and white image maker, so you can duplicate the process across hundreds of assets without second-guessing the quality.
              </p>
              <ol className="space-y-8 text-left">
                <li className="flex flex-col md:flex-row md:items-start gap-4">
                  <div className="flex-shrink-0">
                    <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-900 text-white text-xl font-semibold">1</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                      Upload your color photo or drag it into the canvas
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Drop any JPG, PNG, or WebP into the interface. The black and white converter inspects color channels and keeps the full resolution intact while the preview loads. This first step makes it effortless to turn image black and white from a phone screenshot, a DSLR capture, or art scanned from film negatives without manual resizing.
                    </p>
                  </div>
                </li>
                <li className="flex flex-col md:flex-row md:items-start gap-4">
                  <div className="flex-shrink-0">
                    <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-900 text-white text-xl font-semibold">2</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                      Pick the preset that matches your creative direction
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Choose a cinematic preset for dramatic portraits, a clean preset for product photography, or build a custom mix. Our black and white image generator uses channel balancing so skin tones stay smooth and skies keep detail. Adjust contrast, brightness, and grain to create a signature look you can reuse across every black and white photo in the series.
                    </p>
                  </div>
                </li>
                <li className="flex flex-col md:flex-row md:items-start gap-4">
                  <div className="flex-shrink-0">
                    <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-900 text-white text-xl font-semibold">3</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                      Export your finished black and white picture instantly
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      When the preview looks perfect, select PNG, JPG, or WebP, and download. The file is saved locally with a tidy "-bw" suffix so you know it came from the black and white picture converter. Share it with clients, upload it to your site, or archive it for print production knowing the tones are locked in.
                    </p>
                  </div>
                </li>
              </ol>
            </section>

            <section className="bg-gray-50 dark:bg-gray-900/60 rounded-3xl p-8 md:p-12 mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6 text-center">
                Free Black and White Converter Features
              </h2>
              <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 mb-10 text-center">
                Everything you need to make photos black and white is available the moment you load the page. These capabilities help solo creators and agencies maintain consistent aesthetics while meeting demanding production schedules.
              </p>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <Card className="p-6 h-full">
                  <div className="text-2xl mb-4">🎚️</div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    Channel Mixing Engine
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Our black and white image converter reads red, green, and blue values separately so you can emphasize texture, isolate highlights, and create depth. It is the same principle used in the darkroom, delivered through a simple slider interface that anyone can master.
                  </p>
                </Card>
                <Card className="p-6 h-full">
                  <div className="text-2xl mb-4">⚡</div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    Real-Time Preview
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Preview every adjustment instantly while you convert image to black and white. The live canvas eliminates guesswork and lets you dial in tonal contrast before exporting, which saves time in revisions and approvals.
                  </p>
                </Card>
                <Card className="p-6 h-full">
                  <div className="text-2xl mb-4">🛡️</div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    Privacy-First Workflow
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Files never leave your machine. The black white image converter runs entirely in your browser, making it safe for client deliverables, NDA projects, or personal archives that cannot be uploaded to third-party servers.
                  </p>
                </Card>
                <Card className="p-6 h-full">
                  <div className="text-2xl mb-4">🔁</div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    Reusable Presets
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Save time by leaning on presets inspired by iconic film stocks. Whether you are chasing a matte editorial finish or a bold photojournalism look, the black and white image maker keeps favorite styles one click away.
                  </p>
                </Card>
                <Card className="p-6 h-full">
                  <div className="text-2xl mb-4">🖨️</div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    Print-Ready Exports
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Send photo to black and white output at full resolution with controlled compression. Export assets that can run in magazines, lookbooks, product inserts, or gallery prints without extra round-tripping through other software.
                  </p>
                </Card>
                <Card className="p-6 h-full">
                  <div className="text-2xl mb-4">🌐</div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    Works on Any Device
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Log in from a laptop, tablet, or phone and keep editing. The responsive UI ensures you can make image black and white during client calls, while traveling, or right after a photoshoot.
                  </p>
                </Card>
              </div>
            </section>

            <section className="bg-white dark:bg-gray-800 rounded-3xl p-8 md:p-12 mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6 text-center">
                Convert Image to Black and White With Professional Control
              </h2>
              <div className="grid md:grid-cols-2 gap-10 text-left">
                <div className="space-y-4 text-gray-600 dark:text-gray-400">
                  <p>
                    Photographers rely on nuanced tonal control to guide the viewer's eye. Our controls let you lighten skin, deepen skies, and build contrast selectively so each black and white photo tells a deliberate story. Blend multiple adjustments to achieve the same flexibility you would find in Lightroom or Capture One without leaving your browser.
                  </p>
                  <p>
                    Because the black and white picture converter honors your original file data, there is no fear of banding or crushed shadows. Preview different combinations, compare presets, and reset with one click until the image to black and white balance feels right.
                  </p>
                  <p>
                    Need to match a brand style guide? Store favorite settings and reuse them across entire campaigns. Consistency is critical for catalogs, editorial spreads, and social storytelling, and this workflow removes the guesswork.
                  </p>
                </div>
                <div className="space-y-4 text-gray-600 dark:text-gray-400">
                  <p>
                    Designers often need to make photo black and white to highlight typography or layout choices. Use the fine-grain controls to soften backgrounds, clarify product edges, or create high-impact hero imagery. The tool doubles as a black and white image maker for pitch decks, packaging, and UX mockups that demand clarity.
                  </p>
                  <p>
                    Video teams can export still frames, convert them for storyboards, and keep the palette aligned across deliverables. Marketing managers can turn image black and white for A/B testing, landing pages, or seasonal campaigns with zero technical overhead.
                  </p>
                  <p>
                    Because exports can be set to PNG, JPG, or WebP, you always have the exact format needed for content management systems, ad platforms, or print vendors. One workflow fits all.
                  </p>
                </div>
              </div>
            </section>

            <section className="bg-gray-50 dark:bg-gray-900/60 rounded-3xl p-8 md:p-12 mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6 text-center">
                Make Photo Black and White for Every Project
              </h2>
              <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 mb-8 text-center">
                From weddings to webshops, the same platform adapts to every scenario. Here are proven ways creators and teams use the converter daily.
              </p>
              <div className="grid md:grid-cols-2 gap-8 text-left">
                <div className="space-y-4 text-gray-600 dark:text-gray-400">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Creative Professionals
                  </h3>
                  <p>
                    Portrait photographers refine highlights and shadows to build dramatic storytelling. Fashion editors convert runway coverage into cohesive black and white photo sets for brand lookbooks. Fine artists prepare gallery prints without scanning back and forth between multiple tools.
                  </p>
                  <p>
                    Illustrators and concept artists feed reference shots into the black and white image maker to explore tone, shape, and light before diving into final artwork.
                  </p>
                  <p>
                    Content creators preparing reels or carousels can make pictures black and white to create visual breaks that keep audiences engaged.
                  </p>
                </div>
                <div className="space-y-4 text-gray-600 dark:text-gray-400">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Business and Marketing Teams
                  </h3>
                  <p>
                    Ecommerce managers produce product swatches and campaign imagery that align with seasonal palettes. Agencies deliver monochrome mockups that focus stakeholder attention on layout and messaging. Real estate marketers convert image to black and white for property brochures that emphasize structure and light.
                  </p>
                  <p>
                    Corporate communications teams rely on the black and white converter to standardize employee portraits or leadership headshots, ensuring consistent branding across press releases and investor decks.
                  </p>
                  <p>
                    Educators and non-profits use the tool to create high-contrast visuals for presentations, printouts, and infographics that must remain legible when photocopied.
                  </p>
                </div>
              </div>
            </section>

            <section className="bg-white dark:bg-gray-800 rounded-3xl p-8 md:p-12 mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6 text-center">
                Black and White Image Generator Tips for Consistent Results
              </h2>
              <div className="space-y-6 text-gray-600 dark:text-gray-400">
                <p>
                  Start with a high-resolution file whenever possible. The more data you feed the black and white image generator, the better it can separate tones and maintain detail. If a file is low resolution, use the clarity and grain sliders sparingly to avoid artifacts.
                </p>
                <p>
                  Balance your midtones before pushing extreme contrast. A subtle S-curve can add depth to any black and white picture while keeping highlights under control. Use the split-toning options to add a hint of warmth or coolness for mood-driven campaigns.
                </p>
                <p>
                  When prepping assets for print, preview the image to black and white result on both light and dark backgrounds. This ensures logos, product edges, and text overlays stay legible no matter where the final asset lives.
                </p>
                <p>
                  Save multiple presets for different clients or collections. A consistent toolkit speeds up collaboration and keeps every make photo black and white task aligned with brand visual identity.
                </p>
              </div>
            </section>

            <section className="bg-gray-50 dark:bg-gray-900/60 rounded-3xl p-8 md:p-12 mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6 text-center">
                Black and White Image Maker Success Stories
              </h2>
              <div className="space-y-6 text-gray-600 dark:text-gray-400">
                <p>
                  Elena, a wedding photographer in Barcelona, relies on the black and white image maker to deliver curated galleries for every couple she works with. During curation she highlights the moments with the most emotion, then uses the converter to make image black and white so reactions, glances, and movement stay front and center. By exporting multiple variations she can convert image to black and white for albums, wall art, and teaser posts while preserving all the fine lace and suit details that matter to her clients.
                </p>
                <p>
                  The merchandising team at Luma &amp; Co. runs a fast-moving ecommerce catalog where every product must feel cohesive. They feed each new hero shot into the black and white converter, evaluate the tonal balance, and send photo to black and white versions for campaigns that focus on texture or silhouette. Because the workflow is private and browser-based, the team can publish monochrome imagery the same day a sample arrives, keeping marketing calendars right on schedule.
                </p>
                <p>
                  A social media studio in New York manages multiple brand channels and needs a dependable way to make pictures black and white whenever a campaign calls for a timeless, editorial feel. The crew depends on the black and white picture converter to build matching presets across TikTok, Instagram, and Pinterest collateral. With consistent exports they can launch coordinated countdowns, behind-the-scenes stories, and hero banners without waiting for a desktop suite or third-party freelancer.
                </p>
              </div>
            </section>

            <section className="bg-white dark:bg-gray-800 rounded-3xl p-8 md:p-12 mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6 text-center">
                Black and White Converter Checklist Before Export
              </h2>
              <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 mb-6 text-center">
                Before you finalize any black and white photo, run through this quick checklist to make sure the file is polished, consistent, and ready for delivery. A few extra moments here can prevent troubleshooting later.
              </p>
              <ul className="list-disc pl-6 space-y-4 text-gray-600 dark:text-gray-400">
                <li>
                  Zoom to 100 percent after you convert image to black and white and inspect skin, edges, and fabric grain. This close pass makes it easy to catch halos, noise, or artifacts before they reach your client or your storefront.
                </li>
                <li>
                  Toggle between presets and custom sliders to verify that midtones are balanced. If faces look muddy, tweak the red channel slightly; if skies feel flat, let the blue slider in the black and white converter add definition.
                </li>
                <li>
                  Check sharpness and clarity. A subtle boost often helps when you make photo black and white for print, while a slight reduction keeps web graphics from feeling too harsh on mobile screens.
                </li>
                <li>
                  Confirm file naming. Keep the automatic "-bw" suffix or add a project code so your black and white picture library stays organized and searchable years from now.
                </li>
                <li>
                  Export a test copy in each format you need. For example, save a high-quality JPG for client review, a PNG for web uploads, and a WebP for lightweight landing pages that still demand crisp image to black and white rendering.
                </li>
                <li>
                  Add alt text that mentions the black and white photo subject when you publish online. Clear descriptions improve accessibility and help search engines understand the context of your new monochrome asset.
                </li>
              </ul>
            </section>

            <section className="bg-gray-50 dark:bg-gray-900/60 rounded-3xl p-8 md:p-12 mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6 text-center">
                Why Our Black and White Picture Converter Beats Desktop Apps
              </h2>
              <div className="grid md:grid-cols-2 gap-8 text-left text-gray-600 dark:text-gray-400">
                <div className="space-y-4">
                  <p>
                    Traditional desktop editors can be powerful, but they add friction with installs, updates, and licensing. Our browser-based black and white picture converter gives you the essential controls without the overhead. Open a tab, load a file, and get to work in seconds.
                  </p>
                  <p>
                    Collaboration is simpler too. Share presets, walkthroughs, and previews with teammates without asking them to install heavy software. The interface is intuitive enough for new hires while still deep enough for seasoned retouchers.
                  </p>
                </div>
                <div className="space-y-4">
                  <p>
                    Because the converter operates locally, sensitive content stays secure. Agencies working with embargoed campaigns or legal teams protecting evidence can convert image to black and white without triggering compliance reviews or IT tickets.
                  </p>
                  <p>
                    Pair the single-image tool with the batch workflow to make images black and white in bulk. Together they replace multiple expensive plugins, helping teams stay agile and budget-friendly.
                  </p>
                </div>
              </div>
            </section>

            <section className="bg-white dark:bg-gray-800 rounded-3xl p-8 md:p-12 mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6 text-center">
                Black and White Picture Converter FAQ
              </h2>
              <div className="space-y-6 text-left">
                {HOME_FAQ_SCHEMA.questions.map(({ question, answer }) => (
                  <div key={question}>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      {question}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {answer}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            <section className="bg-gray-50 dark:bg-gray-900/60 rounded-3xl p-8 md:p-12">
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  Learn the Craft of Modern Black and White Image Editing
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Dive deeper into composition, lighting, and storytelling with our tutorials. Each guide shows how to move an image to black and white with purpose, build cohesive series, and present your work with confidence.
                </p>
                <div className="mt-6">
                  <Link href="/blog">
                    <Button size="lg" variant="outline">
                      Read Our Photography Guides
                      <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </div>
              </div>
            </section>
          </div>
        </section>
      )}      {showEditor && (
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
                <Link href="/batch-black-and-white-converter" className="group">
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
