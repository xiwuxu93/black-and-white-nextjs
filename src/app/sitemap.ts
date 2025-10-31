import { MetadataRoute } from 'next'
import { getBlogPosts } from '@/lib/blog'
import { canonicalUrl } from '@/lib/seo'

export default function sitemap(): MetadataRoute.Sitemap {
  const currentDate = new Date().toISOString()

  const staticRoutes = [
    { path: '/', changeFrequency: 'daily' as const, priority: 1.0 },
    { path: '/batch-black-and-white-converter', changeFrequency: 'weekly' as const, priority: 0.9 },
    { path: '/blog', changeFrequency: 'weekly' as const, priority: 0.8 },
    { path: '/how-to-use', changeFrequency: 'monthly' as const, priority: 0.7 },
    { path: '/about', changeFrequency: 'monthly' as const, priority: 0.7 },
    { path: '/faq', changeFrequency: 'monthly' as const, priority: 0.7 },
    { path: '/privacy', changeFrequency: 'monthly' as const, priority: 0.6 },
    { path: '/terms', changeFrequency: 'monthly' as const, priority: 0.6 },
    { path: '/examples', changeFrequency: 'monthly' as const, priority: 0.6 },
    { path: '/newborn-black-and-white-images', changeFrequency: 'weekly' as const, priority: 0.9 },
    { path: '/black-and-white-newborn-images', changeFrequency: 'weekly' as const, priority: 0.9 },
    { path: '/image-black-and-white-converter', changeFrequency: 'weekly' as const, priority: 0.9 },
    { path: '/contact', changeFrequency: 'monthly' as const, priority: 0.5 }
  ]

  const staticPages = staticRoutes.map((route) => ({
    url: canonicalUrl(route.path),
    lastModified: currentDate,
    changeFrequency: route.changeFrequency,
    priority: route.priority
  }))

  const blogPosts = getBlogPosts()
  const blogPages = blogPosts.map((post) => {
    const lastModifiedSource = post.updatedDate ?? post.publishDate
    return {
      url: canonicalUrl(`/blog/${post.id}`),
      lastModified: lastModifiedSource ? new Date(lastModifiedSource).toISOString() : currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.8
    }
  })

  return [
    ...staticPages,
    ...blogPages
  ]
}
