import { MetadataRoute } from 'next'
import { getBlogPosts } from '@/lib/blog'
import { canonicalUrl } from '@/lib/seo'

export default function sitemap(): MetadataRoute.Sitemap {
  const currentDate = new Date().toISOString()
  const locales = ['en', 'es']

  const baseRoutes = [
    { subpath: '', changeFrequency: 'daily' as const, priority: 1.0 },
    { subpath: '/batch-black-and-white-converter', changeFrequency: 'weekly' as const, priority: 0.9 },
    { subpath: '/blog', changeFrequency: 'weekly' as const, priority: 0.8 },
    { subpath: '/logo-to-black-and-white', changeFrequency: 'weekly' as const, priority: 0.85 },
    { subpath: '/convert-pdf-to-black-and-white', changeFrequency: 'weekly' as const, priority: 0.88 },
    { subpath: '/invert-image-colors', changeFrequency: 'weekly' as const, priority: 0.82 },
    { subpath: '/sepia-filter', changeFrequency: 'weekly' as const, priority: 0.86 },
    { subpath: '/how-to-use', changeFrequency: 'monthly' as const, priority: 0.7 },
    { subpath: '/about', changeFrequency: 'monthly' as const, priority: 0.7 },
    { subpath: '/faq', changeFrequency: 'monthly' as const, priority: 0.7 },
    { subpath: '/privacy', changeFrequency: 'monthly' as const, priority: 0.6 },
    { subpath: '/terms', changeFrequency: 'monthly' as const, priority: 0.6 },
    { subpath: '/examples', changeFrequency: 'weekly' as const, priority: 0.8 },
    { subpath: '/newborn-photography-guide', changeFrequency: 'weekly' as const, priority: 0.9 },
    { subpath: '/contact', changeFrequency: 'monthly' as const, priority: 0.5 }
  ]

  const staticPages = locales.flatMap((locale) =>
    baseRoutes.map((route) => ({
      url: canonicalUrl(`/${locale}${route.subpath}`),
      lastModified: currentDate,
      changeFrequency: route.changeFrequency,
      priority: route.priority
    }))
  )

  const blogPosts = getBlogPosts()
  const blogPages = locales.flatMap((locale) =>
    blogPosts.map((post) => {
      const lastModifiedSource = post.updatedDate ?? post.publishDate
      return {
        url: canonicalUrl(`/${locale}/blog/${post.id}`),
        lastModified: lastModifiedSource ? new Date(lastModifiedSource).toISOString() : currentDate,
        changeFrequency: 'monthly' as const,
        priority: 0.8
      }
    })
  )

  return [
    ...staticPages,
    ...blogPages
  ]
}
