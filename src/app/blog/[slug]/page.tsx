import { Metadata } from 'next'
import Link from 'next/link'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import {
  Calendar,
  Clock,
  ArrowLeft,
  User
} from 'lucide-react'
import { notFound } from 'next/navigation'
import { BlogInteractions } from '@/components/blog/blog-interactions'
import { BlogHeaderActions } from '@/components/blog/blog-header-actions'
import { blogPosts, blogPostList, BlogPost } from '@/data/blog-posts'
import { canonicalUrl } from '@/lib/seo'

// Load blog posts from JSON file
const getBlogPost = (slug: string) => {
  return blogPosts[slug as keyof typeof blogPosts] || null
}

// Get all available blog post slugs for static generation
export function generateStaticParams() {
  return Object.keys(blogPosts).map((slug) => ({
    slug
  }))
}

interface Props {
  params: { slug: string }
}

const formatDate = (date: string) =>
  new Date(date).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getBlogPost(params.slug)
  
  if (!post) {
    return {
      title: 'Post Not Found',
      description: 'The requested blog post could not be found.'
    }
  }

  const canonical = canonicalUrl(`/blog/${post.id}`)
  const lastModified = post.updatedDate ?? post.publishDate

  return {
    title: post.title,
    description: post.excerpt,
    keywords: post.tags,
    authors: [{ name: post.author }],
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: canonical,
      type: 'article',
      publishedTime: post.publishDate,
      modifiedTime: lastModified,
      authors: [post.author],
      tags: post.tags,
    },
    twitter: {
      title: post.title,
      description: post.excerpt,
    },
    alternates: {
      canonical: canonical
    }
  }
}

export default function BlogPostPage({ params }: Props) {
  const post = getBlogPost(params.slug)
  
  if (!post) {
    notFound()
  }

  const relatedPosts = blogPostList
    .filter(item => item.id !== post.id)
    .map(item => {
      const sharedTags = item.tags.filter(tag => post.tags.includes(tag)).length
      const categoryBoost = item.category === post.category ? 1 : 0
      return {
        post: item,
        score: sharedTags + categoryBoost
      }
    })
    .filter(item => item.score > 0)
    .sort((a, b) => {
      if (b.score !== a.score) {
        return b.score - a.score
      }
      return new Date(b.post.publishDate).getTime() - new Date(a.post.publishDate).getTime()
    })
    .slice(0, 3)
    .map(item => item.post)

  const fallbackRelated = blogPostList
    .filter(item => item.id !== post.id)
    .sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime())
    .slice(0, 3)

  const postsToShow = relatedPosts.length > 0 ? relatedPosts : fallbackRelated

  const authorInitials = post.author
    .split(' ')
    .map(piece => piece[0])
    .join('')
    .slice(0, 2)

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Navigation */}
        <div className="mb-8">
          <Link href="/blog">
            <Button variant="outline">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Button>
          </Link>
        </div>

        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center space-x-2 mb-4">
            <Badge variant="outline">{post.category}</Badge>
            {post.featured && (
              <Badge className="bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200">
                ⭐ Featured
              </Badge>
            )}
          </div>
          
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            {post.title}
          </h1>
          
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-6 text-gray-600 dark:text-gray-400">
              <div className="flex items-center space-x-2">
                <User className="w-4 h-4" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Calendar className="w-4 h-4" />
                <span>{formatDate(post.publishDate)}</span>
              </div>
              {post.updatedDate && (
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>Updated {formatDate(post.updatedDate)}</span>
                </div>
              )}
              <div className="flex items-center space-x-1">
                <span>{post.readTime}</span>
              </div>
            </div>
            
            <BlogHeaderActions postId={post.id} />
          </div>

          {/* Featured Image */}
          {post.heroImage && (
            <div className="relative rounded-lg overflow-hidden mb-8 shadow-lg h-64 md:h-96">
              <Image
                src={post.heroImage}
                alt={post.heroAlt || post.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 960px"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              {post.heroAlt && (
                <div className="absolute bottom-4 left-4 text-white">
                  <p className="text-sm opacity-80">{post.heroAlt}</p>
                </div>
              )}
            </div>
          )}

          {/* Key Takeaways */}
          {post.keyTakeaways && post.keyTakeaways.length > 0 && (
            <Card className="mb-10 bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Badge variant="secondary">Key Takeaways</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                  {post.keyTakeaways.map((item, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <span className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-primary-100 text-primary-700 text-sm font-semibold dark:bg-primary-900/40 dark:text-primary-200">
                        {index + 1}
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          {/* Author */}
          <Card className="mb-12 border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur">
            <CardContent className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div className="flex items-center space-x-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary-100 text-primary-700 font-semibold text-lg">
                  {authorInitials}
                </div>
                <div>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">{post.author}</p>
                  {post.authorTitle && (
                    <p className="text-sm text-gray-600 dark:text-gray-400">{post.authorTitle}</p>
                  )}
                </div>
              </div>
              {post.authorBio && (
                <p className="text-sm text-gray-600 dark:text-gray-400 md:max-w-xl">
                  {post.authorBio}
                </p>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="prose prose-lg max-w-none prose-gray dark:prose-invert">
              <article className="text-gray-700 dark:text-gray-300 leading-relaxed space-y-6">
                {(() => {
                  const lines = post.content.split('\n')
                  const elements: JSX.Element[] = []
                  let currentList: string[] = []
                  
                  const flushList = () => {
                    if (currentList.length > 0) {
                      elements.push(
                        <ul key={`list-${elements.length}`} className="mb-6 ml-6 space-y-2">
                          {currentList.map((item, idx) => (
                            <li 
                              key={idx} 
                              className="list-disc text-gray-700 dark:text-gray-300"
                              dangerouslySetInnerHTML={{ __html: item.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }}
                            />
                          ))}
                        </ul>
                      )
                      currentList = []
                    }
                  }
                  
                  lines.forEach((line, index) => {
                    const trimmedLine = line.trim()
                    
                    if (trimmedLine.startsWith('# ')) {
                      flushList()
                      elements.push(
                        <h1 key={`h1-${index}`} className="text-3xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
                          {trimmedLine.slice(2)}
                        </h1>
                      )
                    }
                    else if (trimmedLine.startsWith('## ')) {
                      flushList()
                      elements.push(
                        <h2 key={`h2-${index}`} className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
                          {trimmedLine.slice(3)}
                        </h2>
                      )
                    }
                    else if (trimmedLine.startsWith('### ')) {
                      flushList()
                      elements.push(
                        <h3 key={`h3-${index}`} className="text-xl font-medium text-gray-900 dark:text-white mt-6 mb-3">
                          {trimmedLine.slice(4)}
                        </h3>
                      )
                    }
                    else if (trimmedLine.startsWith('![')) {
                      flushList()
                      const match = trimmedLine.match(/!\[(.*?)\]\((.*?)\)/)
                      if (match) {
                        const [, alt, src] = match
                        elements.push(
                          <div key={`img-${index}`} className="my-8 overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800">
                            <div className="relative aspect-[16/9]">
                              <Image
                                src={src}
                                alt={alt || post.title}
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, 720px"
                              />
                            </div>
                            {alt && (
                              <p className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-900">
                                {alt}
                              </p>
                            )}
                          </div>
                        )
                      }
                    }
                    else if (trimmedLine.startsWith('- ')) {
                      currentList.push(trimmedLine.slice(2))
                    }
                    else if (trimmedLine === '') {
                      flushList()
                      elements.push(<div key={`space-${index}`} className="h-4"></div>)
                    }
                    else if (trimmedLine.startsWith('✅') || trimmedLine.startsWith('❌')) {
                      flushList()
                      elements.push(
                        <div key={`highlight-${index}`} className="mb-3 font-medium text-gray-800 dark:text-gray-200 bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border-l-4 border-blue-500">
                          {trimmedLine}
                        </div>
                      )
                    }
                    else if (/^\d+\./.test(trimmedLine)) {
                      flushList()
                      elements.push(
                        <p key={`numbered-${index}`} className="mb-2 font-medium text-gray-800 dark:text-gray-200">
                          {trimmedLine}
                        </p>
                      )
                    }
                    else if (trimmedLine) {
                      flushList()
                      const formattedText = trimmedLine.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                      elements.push(
                        <p 
                          key={`p-${index}`} 
                          className="mb-4 text-gray-700 dark:text-gray-300 leading-relaxed text-lg"
                          dangerouslySetInnerHTML={{ __html: formattedText }}
                        />
                      )
                    }
                  })
                  
                  flushList() // Flush any remaining list items
                  return elements
                })()}
              </article>
            </div>

            {/* Tags */}
            <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    #{tag}
                  </Badge>
                ))}
              </div>
            </div>

            {post.sources && post.sources.length > 0 && (
              <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">参考资料</h2>
                <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                  {post.sources.map((source, idx) => (
                    <li key={idx}>
                      <a
                        href={source.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline decoration-primary-500 decoration-2 underline-offset-2 hover:text-primary-600 dark:hover:text-primary-400"
                      >
                        {source.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Engagement */}
            <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
              <BlogInteractions 
                postId={post.id} 
                initialLikes={32} 
                initialComments={5} 
              />
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-8">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Related Articles</h3>
              <div className="space-y-4">
                {postsToShow.map((related: BlogPost) => (
                  <Link
                    key={related.id}
                    href={`/blog/${related.id}`}
                    className="block space-y-2 hover:bg-gray-50 dark:hover:bg-gray-800 p-2 rounded transition-colors"
                  >
                    <h4 className="font-medium text-sm text-gray-900 dark:text-white line-clamp-2">
                      {related.title}
                    </h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400 flex items-center space-x-2">
                      <span>{related.readTime}</span>
                      <span>•</span>
                      <span>{related.category}</span>
                    </p>
                  </Link>
                ))}
              </div>
              
              <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                <Link href="/">
                  <Button className="w-full">
                    Try BW Converter
                  </Button>
                </Link>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
