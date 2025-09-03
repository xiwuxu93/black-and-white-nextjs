import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Merge CSS class names and resolve Tailwind conflicts
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Format file size in human readable format
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes'
  
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

/**
 * Delay function that returns a promise
 */
export function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

/**
 * Debounce function to limit function calls
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null
  
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

/**
 * Throttle function to limit function execution frequency
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null
  let previous = 0
  
  return (...args: Parameters<T>) => {
    const now = Date.now()
    const remaining = wait - (now - previous)
    
    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout)
        timeout = null
      }
      previous = now
      func(...args)
    } else if (!timeout) {
      timeout = setTimeout(() => {
        previous = Date.now()
        timeout = null
        func(...args)
      }, remaining)
    }
  }
}

/**
 * Generate random ID string
 */
export function generateId(length: number = 8): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let result = ''
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}

/**
 * Deep clone an object
 */
export function deepClone<T>(obj: T): T {
  if (obj === null || typeof obj !== 'object') return obj
  if (obj instanceof Date) return new Date(obj.getTime()) as T
  if (obj instanceof Array) return obj.map(item => deepClone(item)) as T
  if (typeof obj === 'object') {
    const clonedObj = {} as T
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        clonedObj[key] = deepClone(obj[key])
      }
    }
    return clonedObj
  }
  return obj
}

/**
 * Check if string is a valid URL
 */
export function isValidUrl(string: string): boolean {
  try {
    new URL(string)
    return true
  } catch (_) {
    return false
  }
}

/**
 * Get file extension from filename
 */
export function getFileExtension(filename: string): string {
  return filename.slice((filename.lastIndexOf('.') - 1 >>> 0) + 2)
}

/**
 * Download file to user's device
 */
export function downloadFile(data: string | Blob, filename: string, mimeType?: string): void {
  const blob = typeof data === 'string' 
    ? new Blob([data], { type: mimeType || 'text/plain' })
    : data
    
  const url = window.URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  window.URL.revokeObjectURL(url)
}

/**
 * Download image from canvas with enhanced mobile compatibility
 */
export function downloadCanvasImage(canvas: HTMLCanvasElement, filename: string = 'image.png'): Promise<void> {
  return new Promise((resolve, reject) => {
    try {
      // Detect mobile devices
      const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent)
      const isAndroid = /Android/.test(navigator.userAgent)
      const isMobileDevice = isIOS || isAndroid || isMobile()
      
      if (isMobileDevice) {
        // For mobile devices, use enhanced mobile download
        mobileCanvasDownload(canvas, filename).then(resolve).catch(reject)
      } else {
        // For desktop, use traditional blob download
        canvas.toBlob((blob) => {
          if (blob) {
            downloadFile(blob, filename, 'image/png')
            resolve()
          } else {
            fallbackCanvasDownload(canvas, filename).then(resolve).catch(reject)
          }
        }, 'image/png', 0.95)
      }
    } catch (error) {
      console.warn('Canvas download failed, using fallback:', error)
      fallbackCanvasDownload(canvas, filename).then(resolve).catch(reject)
    }
  })
}

/**
 * Enhanced mobile download with iOS Photos app support
 */
function mobileCanvasDownload(canvas: HTMLCanvasElement, filename: string): Promise<void> {
  return new Promise((resolve, reject) => {
    try {
      const dataUrl = canvas.toDataURL('image/png')
      const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent)
      const isSafari = /Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent)
      
      if (isIOS && isSafari) {
        // iOS Safari - enhanced experience for Photos app
        showIOSImageSaveDialog(dataUrl, filename).then(resolve).catch(reject)
      } else if (isIOS) {
        // iOS other browsers (Chrome, Firefox, etc.)
        showIOSImagePreview(dataUrl, filename).then(resolve).catch(reject)
      } else {
        // Android and other mobile browsers
        showMobileImagePreview(dataUrl, filename).then(resolve).catch(reject)
      }
    } catch (error) {
      reject(error)
    }
  })
}

/**
 * Show iOS-optimized image save dialog with Photos app integration
 */
function showIOSImageSaveDialog(dataUrl: string, filename: string): Promise<void> {
  return new Promise((resolve) => {
    // Create overlay
    const overlay = document.createElement('div')
    overlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.9);
      z-index: 10000;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 20px;
    `
    
    // Create image element
    const img = document.createElement('img')
    img.src = dataUrl
    img.style.cssText = `
      max-width: 90%;
      max-height: 60%;
      border-radius: 8px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
      margin-bottom: 20px;
    `
    
    // Create instructions
    const instructions = document.createElement('div')
    instructions.style.cssText = `
      color: white;
      text-align: center;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      line-height: 1.5;
      margin-bottom: 20px;
    `
    
    instructions.innerHTML = `
      <h3 style="margin: 0 0 10px 0; font-size: 18px; font-weight: 600;">Save to Photos</h3>
      <p style="margin: 0 0 8px 0; font-size: 16px;">1. Long press the image above</p>
      <p style="margin: 0 0 8px 0; font-size: 16px;">2. Select "Save to Photos"</p>
      <p style="margin: 0; font-size: 14px; opacity: 0.8;">Image will be saved to your Photos app</p>
    `
    
    // Create close button
    const closeBtn = document.createElement('button')
    closeBtn.textContent = 'Done'
    closeBtn.style.cssText = `
      background: #007AFF;
      color: white;
      border: none;
      padding: 12px 24px;
      border-radius: 8px;
      font-size: 16px;
      font-weight: 500;
      cursor: pointer;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    `
    
    closeBtn.onclick = () => {
      document.body.removeChild(overlay)
      resolve()
    }
    
    // Assemble and show
    overlay.appendChild(img)
    overlay.appendChild(instructions)
    overlay.appendChild(closeBtn)
    document.body.appendChild(overlay)
  })
}

/**
 * Show iOS image preview for non-Safari browsers
 */
function showIOSImagePreview(dataUrl: string, filename: string): Promise<void> {
  return new Promise((resolve) => {
    const newWindow = window.open('', '_blank')
    if (newWindow) {
      newWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Save Image</title>
          <style>
            body {
              margin: 0;
              padding: 20px;
              background: #f2f2f7;
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
              text-align: center;
            }
            .container {
              max-width: 100%;
              margin: 0 auto;
            }
            img {
              max-width: 100%;
              height: auto;
              border-radius: 12px;
              box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
              margin-bottom: 20px;
            }
            .instructions {
              background: white;
              padding: 20px;
              border-radius: 12px;
              margin: 20px 0;
              box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
            }
            h3 {
              color: #1d1d1f;
              margin: 0 0 15px 0;
              font-size: 18px;
              font-weight: 600;
            }
            p {
              color: #424245;
              margin: 8px 0;
              font-size: 16px;
              line-height: 1.4;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <img src="${dataUrl}" alt="Converted Image" />
            <div class="instructions">
              <h3>Save Image</h3>
              <p>Long press the image above and select:</p>
              <p><strong>"Save to Photos"</strong> or <strong>"Download Image"</strong></p>
            </div>
          </div>
        </body>
        </html>
      `)
      newWindow.document.close()
      resolve()
    } else {
      // Popup blocked, try direct download with data URL
      try {
        const link = document.createElement('a')
        link.href = dataUrl
        link.download = filename
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        resolve()
      } catch (error) {
        console.error('Direct download failed:', error)
        resolve()
      }
    }
  })
}

/**
 * Show mobile image preview for Android and other mobile browsers
 */
function showMobileImagePreview(dataUrl: string, filename: string): Promise<void> {
  return new Promise((resolve) => {
    const newWindow = window.open('', '_blank')
    if (newWindow) {
      newWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Download Image</title>
          <style>
            body {
              margin: 0;
              padding: 20px;
              background: #f5f5f5;
              font-family: system-ui, -apple-system, sans-serif;
              text-align: center;
            }
            img {
              max-width: 100%;
              height: auto;
              border-radius: 8px;
              box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
              margin-bottom: 20px;
            }
            .instructions {
              background: white;
              padding: 16px;
              border-radius: 8px;
              margin: 16px 0;
              box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
            }
            h3 {
              margin: 0 0 12px 0;
              color: #333;
              font-size: 18px;
            }
            p {
              margin: 8px 0;
              color: #666;
              font-size: 14px;
              line-height: 1.4;
            }
            .download-btn {
              background: #4CAF50;
              color: white;
              border: none;
              padding: 12px 24px;
              border-radius: 6px;
              font-size: 16px;
              cursor: pointer;
              margin-top: 16px;
              text-decoration: none;
              display: inline-block;
            }
          </style>
        </head>
        <body>
          <img src="${dataUrl}" alt="Converted Image" />
          <div class="instructions">
            <h3>Save Image</h3>
            <p>Long press the image above and select <strong>"Download Image"</strong></p>
            <p>Or tap the button below to download directly</p>
            <a href="${dataUrl}" download="${filename}" class="download-btn">Download Image</a>
          </div>
        </body>
        </html>
      `)
      newWindow.document.close()
      resolve()
    } else {
      // Popup blocked, try direct download
      try {
        const link = document.createElement('a')
        link.href = dataUrl
        link.download = filename
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        resolve()
      } catch (error) {
        console.error('Direct download failed:', error)
        resolve()
      }
    }
  })
}

/**
 * Fallback download method for canvas
 */
function fallbackCanvasDownload(canvas: HTMLCanvasElement, filename: string): Promise<void> {
  return new Promise((resolve, reject) => {
    try {
      const dataUrl = canvas.toDataURL('image/png')
      
      // Desktop browser - use normal download
      const link = document.createElement('a')
      link.href = dataUrl
      link.download = filename
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      resolve()
    } catch (error) {
      console.error('Failed to download image:', error)
      reject(error)
    }
  })
}

/**
 * Copy text to clipboard
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(text)
      return true
    } else {
      // Fallback for older browsers
      const textArea = document.createElement('textarea')
      textArea.value = text
      textArea.style.position = 'fixed'
      textArea.style.left = '-999999px'
      textArea.style.top = '-999999px'
      document.body.appendChild(textArea)
      textArea.focus()
      textArea.select()
      const success = document.execCommand('copy')
      document.body.removeChild(textArea)
      return success
    }
  } catch (err) {
    console.error('Copy failed:', err)
    return false
  }
}

/**
 * Format number with thousand separators
 */
export function formatNumber(num: number): string {
  return num.toLocaleString()
}

/**
 * Truncate text with suffix
 */
export function truncateText(text: string, maxLength: number, suffix: string = '...'): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength - suffix.length) + suffix
}

/**
 * Check if current device is mobile
 */
export function isMobile(): boolean {
  if (typeof window === 'undefined') return false
  return window.innerWidth < 768
}

/**
 * Smooth scroll to element by ID
 */
export function scrollToElement(elementId: string, offset: number = 0): void {
  const element = document.getElementById(elementId)
  if (element) {
    const top = element.offsetTop - offset
    window.scrollTo({
      top,
      behavior: 'smooth'
    })
  }
}

/**
 * Get random color from predefined palette
 */
export function getRandomColor(): string {
  const colors = [
    '#3B82F6', '#6366F1', '#8B5CF6', '#A855F7', '#D946EF',
    '#EC4899', '#F43F5E', '#EF4444', '#F97316', '#F59E0B',
    '#EAB308', '#84CC16', '#22C55E', '#10B981', '#14B8A6',
    '#06B6D4', '#0EA5E9', '#3B82F6'
  ]
  return colors[Math.floor(Math.random() * colors.length)]
}