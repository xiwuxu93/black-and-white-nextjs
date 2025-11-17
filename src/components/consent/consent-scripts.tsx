"use client"

import { useEffect, useState } from 'react'
import GoogleAnalytics from '@/components/analytics/google-analytics'
import GoogleAdsense from '@/components/ads/google-adsense'

const STORAGE_KEY = 'bwconverter_cookie_consent'

export function ConsentScripts() {
  const [consented, setConsented] = useState<boolean | null>(null)

  useEffect(() => {
    const read = () => {
      try {
        const v = localStorage.getItem(STORAGE_KEY)
        setConsented(v === 'accepted')
      } catch {
        setConsented(false)
      }
    }

    read()

    const onStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) read()
    }
    const onCustom = () => read()
    window.addEventListener('storage', onStorage)
    window.addEventListener('bwconverter:consent-changed', onCustom as EventListener)
    return () => {
      window.removeEventListener('storage', onStorage)
      window.removeEventListener('bwconverter:consent-changed', onCustom as EventListener)
    }
  }, [])

  if (!consented) return null

  return (
    <>
      <GoogleAnalytics />
      <GoogleAdsense />
    </>
  )
}

