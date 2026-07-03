'use client'

import React from 'react'
import { usePathname } from 'next/navigation'

export function MainContainer({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isHomepage = pathname === '/'

  return (
    <main className="flex-1">
      <div className={`mx-auto grid gap-8 px-4 py-10 sm:px-6 lg:px-8 ${
        isHomepage
          ? 'max-w-5xl'
          : 'max-w-7xl lg:grid-cols-[minmax(0,1fr)_300px]'
      }`}>
        <article className="entry-content post-content min-w-0">
          {children}
        </article>

        {!isHomepage && (
          <aside
            id="primary-sidebar"
            className="sidebar widget-area hidden w-[300px] lg:block"
            aria-label="Sidebar"
          />
        )}
      </div>
    </main>
  )
}
