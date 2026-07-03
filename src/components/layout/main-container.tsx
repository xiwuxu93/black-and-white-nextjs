'use client'

import React from 'react'
import { usePathname } from 'next/navigation'

export function MainContainer({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isHomepage = pathname === '/'

  if (isHomepage) {
    return (
      <main className="flex-1 container mx-auto max-w-5xl py-12 px-4">
        <article className="w-full entry-content">
          {children}
        </article>
      </main>
    )
  }

  return (
    <main className="flex-1 container mx-auto max-w-7xl py-12 px-4">
      <div className="grid grid-cols-1 lg:grid-cols-[100px_1fr_300px] gap-8">
        {/* Left Spacer */}
        <div className="hidden lg:block" />

        {/* Main Content Area */}
        <article className="w-full entry-content">
          {children}
        </article>

        {/* Sidebar Area */}
        <div id="primary-sidebar" className="sidebar widget-area w-full max-w-[300px] mx-auto lg:mx-0" />
      </div>
    </main>
  )
}
