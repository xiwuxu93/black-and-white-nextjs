'use client'

import React, { useState, useRef, useEffect, useCallback } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Upload, Download, RefreshCw, Cpu } from 'lucide-react'

type FormulaType = 'bt709' | 'bt601' | 'average'

export function GrayscaleConceptWidget() {
  const [imageSrc, setImageSrc] = useState<string | null>(null)
  const [formula, setFormula] = useState<FormulaType>('bt709')
  const [stats, setStats] = useState<{ averageBrightness: number; processTimeMs: number } | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const sourceCanvasRef = useRef<HTMLCanvasElement>(null)
  const resultCanvasRef = useRef<HTMLCanvasElement>(null)
  const imageRef = useRef<HTMLImageElement | null>(null)

  // Default demo image
  useEffect(() => {
    setImageSrc('/samples/bw/newborn-bw.jpg')
  }, [])

  const processImage = useCallback(() => {
    const img = imageRef.current
    const canvasSrc = sourceCanvasRef.current
    const canvasDst = resultCanvasRef.current
    if (!img || !canvasSrc || !canvasDst) return

    const ctxSrc = canvasSrc.getContext('2d')
    const ctxDst = canvasDst.getContext('2d')
    if (!ctxSrc || !ctxDst) return

    // Scale image down if too large for real-time sandbox preview
    const maxDimension = 600
    let width = img.naturalWidth
    let height = img.naturalHeight

    if (width > maxDimension || height > maxDimension) {
      if (width > height) {
        height = Math.round((height * maxDimension) / width)
        width = maxDimension
      } else {
        width = Math.round((width * maxDimension) / height)
        height = maxDimension
      }
    }

    canvasSrc.width = width
    canvasSrc.height = height
    canvasDst.width = width
    canvasDst.height = height

    ctxSrc.drawImage(img, 0, 0, width, height)

    const imageData = ctxSrc.getImageData(0, 0, width, height)
    const data = imageData.data
    const totalPixels = data.length / 4

    const startTime = performance.now()

    let brightnessSum = 0

    // Coefficients
    let rCoeff = 0.2126
    let gCoeff = 0.7152
    let bCoeff = 0.0722

    if (formula === 'bt601') {
      rCoeff = 0.299
      gCoeff = 0.587
      bCoeff = 0.114
    } else if (formula === 'average') {
      rCoeff = 1 / 3
      gCoeff = 1 / 3
      bCoeff = 1 / 3
    }

    for (let i = 0; i < data.length; i += 4) {
      const r = data[i]
      const g = data[i + 1]
      const b = data[i + 2]

      // Apply formula
      const gray = rCoeff * r + gCoeff * g + bCoeff * b
      brightnessSum += gray

      data[i] = gray
      data[i + 1] = gray
      data[i + 2] = gray
      // alpha channel stays untouched
    }

    const endTime = performance.now()

    ctxDst.putImageData(imageData, 0, 0)

    setStats({
      averageBrightness: Math.round(brightnessSum / totalPixels),
      processTimeMs: parseFloat((endTime - startTime).toFixed(2))
    })
  }, [formula])

  useEffect(() => {
    if (imageSrc) {
      const img = new Image()
      img.crossOrigin = 'anonymous'
      img.onload = () => {
        imageRef.current = img
        processImage()
      }
      img.src = imageSrc
    }
  }, [imageSrc, processImage])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        if (event.target?.result) {
          setImageSrc(event.target.result as string)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const handleDownload = () => {
    const canvasDst = resultCanvasRef.current
    if (!canvasDst) return
    const link = document.createElement('a')
    link.download = `grayscale-${formula}.png`
    link.href = canvasDst.toDataURL('image/png')
    link.click()
  }

  return (
    <Card className="p-6 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-xl rounded-3xl max-w-4xl mx-auto my-8">
      <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-6">
        <div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <Cpu className="w-5 h-5 text-primary-600" />
            Luminance Formula Sandbox
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Compare ITU-R BT.709 vs BT.601 vs Naive Average algorithms in real time.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {(['bt709', 'bt601', 'average'] as FormulaType[]).map((f) => (
            <Button
              key={f}
              variant={formula === f ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFormula(f)}
              className="font-mono text-xs uppercase"
            >
              {f === 'bt709' && 'BT.709 (Web)'}
              {f === 'bt601' && 'BT.601 (SDTV)'}
              {f === 'average' && 'Arithmetic Avg'}
            </Button>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6 bg-gray-50 dark:bg-gray-950 p-4 rounded-2xl border border-gray-100 dark:border-gray-900">
        <div className="flex flex-col items-center justify-center">
          <span className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">Original Color Channel</span>
          <div className="relative overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800 bg-checkered max-h-[300px] w-full flex items-center justify-center">
            <canvas ref={sourceCanvasRef} className="max-h-[300px] max-w-full object-contain" />
          </div>
        </div>

        <div className="flex flex-col items-center justify-center">
          <span className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">Calculated Gray Channel</span>
          <div className="relative overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800 bg-checkered max-h-[300px] w-full flex items-center justify-center">
            <canvas ref={resultCanvasRef} className="max-h-[300px] max-w-full object-contain" />
          </div>
        </div>
      </div>

      {stats && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 text-center border-t border-gray-100 dark:border-gray-800 pt-6">
          <div className="p-2 bg-gray-50 dark:bg-gray-850 rounded-xl">
            <div className="text-xs text-gray-500">Processing Speed</div>
            <div className="text-lg font-mono font-bold text-gray-900 dark:text-white mt-1">
              {stats.processTimeMs} ms
            </div>
          </div>
          <div className="p-2 bg-gray-50 dark:bg-gray-850 rounded-xl">
            <div className="text-xs text-gray-500">Average Brightness</div>
            <div className="text-lg font-mono font-bold text-gray-900 dark:text-white mt-1">
              {stats.averageBrightness} / 255
            </div>
          </div>
          <div className="p-2 bg-gray-50 dark:bg-gray-850 rounded-xl col-span-2 flex items-center justify-center gap-2">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              className="hidden"
            />
            <Button
              variant="outline"
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-2"
            >
              <Upload className="w-4 h-4" /> Upload Custom Image
            </Button>
            <Button onClick={handleDownload} className="flex items-center gap-2">
              <Download className="w-4 h-4" /> Export PNG
            </Button>
          </div>
        </div>
      )}
    </Card>
  )
}
