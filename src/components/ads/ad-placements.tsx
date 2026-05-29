'use client'

import { useEffect, useState } from 'react'
import { AdBanner } from './google-adsense'

const AD_SLOTS = {
  header: process.env.NEXT_PUBLIC_ADSENSE_HEADER_SLOT,
  sidebar: process.env.NEXT_PUBLIC_ADSENSE_SIDEBAR_SLOT,
  content: process.env.NEXT_PUBLIC_ADSENSE_CONTENT_SLOT,
  footer: process.env.NEXT_PUBLIC_ADSENSE_FOOTER_SLOT
}

// Header banner ad
export function HeaderAd() {
  const [adLoaded, setAdLoaded] = useState(false)
  
  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        // @ts-ignore
        (window.adsbygoogle = window.adsbygoogle || []).push({})
        setAdLoaded(true)
      } catch (err) {
        console.log('AdSense error:', err)
      }
    }, 1000)
    
    return () => clearTimeout(timer)
  }, [])

  if (!AD_SLOTS.header || !adLoaded) {
    return null
  }

  return (
    <div className="w-full py-4 bg-gray-50 dark:bg-gray-800 border-b border-border">
      <div className="container mx-auto flex justify-center">
        <AdBanner 
          adSlot={AD_SLOTS.header}
          adFormat="auto"
          className="max-w-screen-md w-full"
        />
      </div>
    </div>
  )
}

// Sidebar ad
export function SidebarAd() {
  const [adLoaded, setAdLoaded] = useState(false)
  
  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        // @ts-ignore
        (window.adsbygoogle = window.adsbygoogle || []).push({})
        setAdLoaded(true)
      } catch (err) {
        console.log('AdSense error:', err)
      }
    }, 1500)
    
    return () => clearTimeout(timer)
  }, [])

  if (!AD_SLOTS.sidebar || !adLoaded) {
    return null
  }

  return (
    <div className="sticky top-20">
      <AdBanner 
        adSlot={AD_SLOTS.sidebar}
        adFormat="auto"
        responsive={false}
        className="w-full max-w-xs"
      />
    </div>
  )
}

// Content ad (in-article)
export function ContentAd() {
  const [adLoaded, setAdLoaded] = useState(false)
  
  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        // @ts-ignore
        (window.adsbygoogle = window.adsbygoogle || []).push({})
        setAdLoaded(true)
      } catch (err) {
        console.log('AdSense error:', err)
      }
    }, 2000)
    
    return () => clearTimeout(timer)
  }, [])

  if (!AD_SLOTS.content || !adLoaded) {
    return null
  }

  return (
    <div className="my-8 flex justify-center">
      <AdBanner 
        adSlot={AD_SLOTS.content}
        adFormat="auto"
        className="w-full max-w-lg"
      />
    </div>
  )
}

// Footer ad
export function FooterAd() {
  const [adLoaded, setAdLoaded] = useState(false)
  
  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        // @ts-ignore
        (window.adsbygoogle = window.adsbygoogle || []).push({})
        setAdLoaded(true)
      } catch (err) {
        console.log('AdSense error:', err)
      }
    }, 3000)
    
    return () => clearTimeout(timer)
  }, [])

  if (!AD_SLOTS.footer || !adLoaded) {
    return null
  }

  return (
    <div className="w-full py-4 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto flex justify-center">
        <AdBanner 
          adSlot={AD_SLOTS.footer}
          adFormat="auto"
          className="max-w-screen-lg w-full"
        />
      </div>
    </div>
  )
}
