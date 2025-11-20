'use client'

import Script from 'next/script'
import { useEffect, useRef } from 'react'

const ADSENSE_ID = 'ca-pub-4855228928819714'

export default function GoogleAdsense() {
  if (process.env.NODE_ENV !== 'production') return null
  return <Script async src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_ID}`} crossOrigin="anonymous" strategy="afterInteractive" />
}

interface AdBannerProps {
  adSlot: string
  adFormat?: string
  responsive?: boolean
  className?: string
}

export function AdBanner({ 
  adSlot, 
  adFormat = 'auto', 
  responsive = true,
  className = ''
}: AdBannerProps) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (process.env.NODE_ENV !== 'production') return
    const el = ref.current
    if (!el) return

    const ensureScript = () => {
      return new Promise<void>((resolve) => {
        const id = 'adsbygoogle-js'
        if (document.getElementById(id)) return resolve()
        const s = document.createElement('script')
        s.id = id
        s.async = true
        s.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_ID}`
        s.crossOrigin = 'anonymous'
        s.onload = () => resolve()
        document.head.appendChild(s)
      })
    }

    const loadAd = async () => {
      await ensureScript()
      try {
        // @ts-ignore
        ;(window.adsbygoogle = window.adsbygoogle || []).push({})
      } catch (e) {
        // no-op
      }
    }

    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          loadAd()
          io.disconnect()
        }
      })
    })
    io.observe(el)
    return () => io.disconnect()
  }, [adSlot, adFormat, responsive])

  return (
    <div ref={ref} className={`ad-banner min-h-[100px] flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded ${className}`}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block', minWidth: '300px', minHeight: '100px', width: '100%', height: 'auto' }}
        data-ad-client={ADSENSE_ID}
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive={responsive.toString()}
      />
    </div>
  )
}
