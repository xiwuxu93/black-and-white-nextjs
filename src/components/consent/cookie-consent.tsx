"use client"

import { useEffect, useState } from 'react'
import Link from 'next/link'

const STORAGE_KEY = 'bwconverter_cookie_consent'

type ConsentValue = 'accepted' | 'declined'

export function CookieConsentBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY) as ConsentValue | null
      if (!saved) {
        setVisible(true)
      }
    } catch {
      // ignore
    }

    const open = () => setVisible(true)
    window.addEventListener('bwconverter:open-consent', open)
    return () => {
      window.removeEventListener('bwconverter:open-consent', open)
    }
  }, [])

  const saveConsent = (value: ConsentValue) => {
    try {
      localStorage.setItem(STORAGE_KEY, value)
      // Notify listeners (e.g., to load analytics/ads after consent)
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new Event('bwconverter:consent-changed'))
      }
    } catch {
      // ignore storage failures
    }
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="fixed inset-x-0 bottom-0 z-50">
      <div className="mx-auto max-w-5xl m-4 rounded-lg border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-lg">
        <div className="p-4 md:p-5">
          <p className="text-sm text-muted-foreground">
            We use minimal cookies to improve the site and show ads with Google AdSense. By clicking Accept, you agree to cookie use as described in our{' '}
            <Link href="/privacy" className="underline">Privacy Policy</Link>.
          </p>
          <div className="mt-3 flex items-center gap-2">
            <button
              onClick={() => saveConsent('accepted')}
              className="inline-flex items-center rounded-md bg-primary-600 px-3 py-2 text-xs font-medium text-white hover:bg-primary-700"
            >
              Accept
            </button>
            <button
              onClick={() => saveConsent('declined')}
              className="inline-flex items-center rounded-md border px-3 py-2 text-xs font-medium hover:bg-accent"
            >
              Decline
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
