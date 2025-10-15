import rawPosts from './blog-posts.json'

export interface BlogSource {
  title: string
  url: string
}

export interface BlogPost {
  id: string
  title: string
  content: string
  excerpt: string
  publishDate: string
  updatedDate?: string
  readTime: string
  category: string
  author: string
  authorTitle?: string
  authorBio?: string
  tags: string[]
  featured: boolean
  heroImage?: string
  heroAlt?: string
  keyTakeaways?: string[]
  sources?: BlogSource[]
}

export const blogPosts = rawPosts as Record<string, BlogPost>

export const blogPostList = Object.values(blogPosts)
