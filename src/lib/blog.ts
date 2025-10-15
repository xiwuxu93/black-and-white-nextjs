import { blogPosts, blogPostList, BlogPost } from '@/data/blog-posts'

export type { BlogPost }

export function getBlogPosts(): BlogPost[] {
  return blogPostList
}

export function getBlogPost(id: string): BlogPost | null {
  return blogPosts[id] || null
}

export function getFeaturedBlogPosts(): BlogPost[] {
  return getBlogPosts().filter(post => post.featured)
}

export function getBlogPostsByCategory(category: string): BlogPost[] {
  return getBlogPosts().filter(post => post.category === category)
}

export function getBlogPostsByTag(tag: string): BlogPost[] {
  return getBlogPosts().filter(post => post.tags.includes(tag))
}

export function getLatestBlogPosts(limit: number = 5): BlogPost[] {
  return getBlogPosts()
    .sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime())
    .slice(0, limit)
}
