'use client'

import React from 'react'

export function MainContainer({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex-1">
      <div className="mx-auto grid gap-8 px-4 py-10 sm:px-6 lg:px-8 max-w-7xl lg:grid-cols-[minmax(0,1fr)_300px]">
        <article className="entry-content post-content min-w-0">
          {children}
        </article>

        <aside
          id="primary-sidebar"
          className="sidebar widget-area hidden w-[300px] lg:block"
          aria-label="Sidebar"
        />
      </div>
    </main>
  )
}
