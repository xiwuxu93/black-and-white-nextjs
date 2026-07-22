'use client'

import React from 'react'
import { usePathname } from 'next/navigation'

export function MainContainer({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  // Only apply ad-targeting class to blog posts, guides, and text-heavy pages.
  // Home/tools should NOT get wrapped in entry-content to prevent random ad injections in tool workspace layouts.
  const isArticlePage = 
    pathname?.includes('/blog/') || 
    pathname?.includes('/newborn-photography-guide') || 
    pathname?.includes('/how-to-use') ||
    pathname?.includes('/faq') ||
    pathname?.includes('/privacy') ||
    pathname?.includes('/terms')

  return (
    <main className="flex-1">
      <div className="mx-auto grid gap-8 px-4 py-10 sm:px-6 lg:px-8 max-w-7xl lg:grid-cols-[minmax(0,1fr)_300px]">
        <article className={isArticlePage ? "entry-content post-content min-w-0" : "min-w-0"}>
          {children}
        </article>

        <aside
          id="primary-sidebar"
          className="sidebar widget-area hidden w-[300px] lg:block"
          aria-label="Sidebar"
        >
          {/* Primary Sidebar Ad Slot - Transparent container to hold automated Journey ads */}
          <div className="w-[300px] min-h-[600px] mx-auto grow-sidebar-ad bg-gray-50/30 dark:bg-gray-800/10 rounded-2xl border border-dashed border-gray-200/50 dark:border-gray-700/30 flex items-center justify-center">
            <span className="text-[10px] text-gray-400 dark:text-gray-600 uppercase tracking-wider font-semibold">Advertisement</span>
          </div>
        </aside>
      </div>
    </main>
  )
}
