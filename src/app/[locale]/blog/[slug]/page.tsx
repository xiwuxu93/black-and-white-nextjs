import { Metadata } from 'next'
import type { ReactNode } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import {
  Calendar,
  Clock,
  ArrowLeft,
  ArrowRight,
  User
} from 'lucide-react'
import { notFound } from 'next/navigation'
import { BlogInteractions } from '@/components/blog/blog-interactions'
import { BlogHeaderActions } from '@/components/blog/blog-header-actions'
import { blogPosts, blogPostList, BlogPost } from '@/data/blog-posts'
import { canonicalUrl } from '@/lib/seo'

const authorProfiles: Record<string, {
  image?: string
  role?: string
  expertise?: string
  website?: string
}> = {
  'Sivan Lee': {
    image: '/authors/sivan-lee.jpg',
    role: 'Founder & Lead Photographer',
    expertise: '18 years leading monochrome campaigns for editorial and commercial clients across Asia.',
    website: '/about'
  }
}

// Load blog posts from JSON file
const getBlogPost = (slug: string) => {
  return blogPosts[slug as keyof typeof blogPosts] || null
}

// Get all available blog post slugs for static generation
export function generateStaticParams() {
  return Object.keys(blogPosts).map((slug) => ({
    locale: 'en',
    slug
  }))
}

interface Props {
  params: { locale: string; slug: string }
}

const formatDate = (date: string) =>
  new Date(date).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })

const MarkdownImage = ({ src, alt }: { src?: string; alt?: string }) => {
  if (!src) return null
  const isExternal = src.startsWith('http')

  if (isExternal) {
    return (
      <figure className="my-8">
        <Image
          src={src}
          alt={alt || ''}
          width={1600}
          height={900}
          className="w-full h-auto rounded-xl object-cover"
        />
        {alt && (
          <figcaption className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            {alt}
          </figcaption>
        )}
      </figure>
    )
  }

  return (
    <figure className="my-8">
      <div className="relative w-full overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800 aspect-[16/9]">
        <Image
          src={src}
          alt={alt || ''}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 720px"
        />
      </div>
      {alt && (
        <figcaption className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          {alt}
        </figcaption>
      )}
    </figure>
  )
}

const MarkdownLink = ({ href, children }: { href?: string; children: ReactNode }) => {
  if (!href) return <span>{children}</span>
  const isInternal = href.startsWith('/')
  if (isInternal) {
    return (
      <Link href={href} className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 underline underline-offset-4">
        {children}
      </Link>
    )
  }
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 underline underline-offset-4"
    >
      {children}
    </a>
  )
}

const MarkdownComponents = {
  h1: (props: any) => (
    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mt-10 mb-6" {...props} />
  ),
  h2: (props: any) => (
    <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-10 mb-4" {...props} />
  ),
  h3: (props: any) => (
    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-8 mb-3" {...props} />
  ),
  // Unwrap paragraphs that contain only an image to avoid <figure> inside <p>
  p: ({ node, children, ...props }: any) => {
    const onlyChild = node?.children && node.children.length === 1 ? node.children[0] : null
    const isImageOnly = onlyChild && (onlyChild as any).tagName === 'img'
    if (isImageOnly) {
      return <>{children}</>
    }
    return (
      <p className="mb-5 text-gray-700 dark:text-gray-300 leading-relaxed" {...props}>
        {children}
      </p>
    )
  },
  ul: (props: any) => (
    <ul className="mb-5 list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2" {...props} />
  ),
  ol: (props: any) => (
    <ol className="mb-5 list-decimal pl-6 text-gray-700 dark:text-gray-300 space-y-2" {...props} />
  ),
  li: (props: any) => <li className="leading-relaxed" {...props} />,
  blockquote: (props: any) => (
    <blockquote className="border-l-4 border-primary-500 bg-primary-50/70 dark:bg-primary-900/20 dark:border-primary-400 px-5 py-3 my-6 text-gray-700 dark:text-gray-200 italic" {...props} />
  ),
  table: ({ children }: any) => (
    <div className="my-6 overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
      <table className="w-full border-collapse text-sm text-left text-gray-700 dark:text-gray-300">
        {children}
      </table>
    </div>
  ),
  thead: (props: any) => (
    <thead className="bg-gray-100 dark:bg-gray-800" {...props} />
  ),
  th: (props: any) => (
    <th className="px-4 py-3 font-semibold border-b border-gray-200 dark:border-gray-700" {...props} />
  ),
  td: (props: any) => (
    <td className="px-4 py-3 border-b border-gray-200 dark:border-gray-700 align-top" {...props} />
  ),
  a: (props: any) => <MarkdownLink {...props} />,
  img: (props: any) => <MarkdownImage {...props} />,
  hr: () => <hr className="my-10 border-gray-200 dark:border-gray-700" />,
  strong: (props: any) => <strong className="font-semibold text-gray-900 dark:text-gray-100" {...props} />,
  code: (props: any) => (
    <code className="rounded bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 text-sm" {...props} />
  ),
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getBlogPost(params.slug)
  
  if (!post) {
    return {
      title: 'Post Not Found',
      description: 'The requested blog post could not be found.'
    }
  }

  const canonical = canonicalUrl(`/${params.locale}/blog/${post.id}`)
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

  const authorProfile = authorProfiles[post.author]
  const suggestedReadings = [
    {
      title: 'Logo Conversion Guide',
      description: 'Learn how alpha handling and SVG rendering affect monochrome logo exports.',
      href: '/logo-to-black-and-white'
    },
    {
      title: 'Newborn Studio Case Study',
      description: 'Compare lighting setups and editing timelines for newborn sessions.',
      href: '/newborn-photography-guide'
    },
    {
      title: 'Advanced Workflow Checklist',
      description: 'Follow troubleshooting steps and production-ready workflows.',
      href: '/how-to-use'
    }
  ]

  return (
    <>
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
                {authorProfile?.image ? (
                  <div className="relative h-16 w-16 overflow-hidden rounded-full border border-primary-200 dark:border-primary-800">
                    <Image
                      src={authorProfile.image}
                      alt={`${post.author} portrait`}
                      fill
                      className="object-cover"
                      sizes="64px"
                    />
                  </div>
                ) : (
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary-100 text-primary-700 font-semibold text-lg">
                    {authorInitials}
                  </div>
                )}
                <div>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">{post.author}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {authorProfile?.role || post.authorTitle || 'BWConverter Contributor'}
                  </p>
                  {authorProfile?.expertise && (
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {authorProfile.expertise}
                    </p>
                  )}
                  {authorProfile?.website && (
                    <Link href={authorProfile.website} className="inline-flex items-center text-primary-600 dark:text-primary-400 text-xs font-medium mt-2">
                      View full bio
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </Link>
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

        <section className="article-section border-t-0 pt-0">
            <div className="prose prose-lg max-w-none prose-gray dark:prose-invert">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={MarkdownComponents as any}
              >
                {post.content}
              </ReactMarkdown>
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
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">References</h2>
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

            <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Continue Learning</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {suggestedReadings.map((item) => (
                  <Card key={item.title} className="p-4 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{item.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{item.description}</p>
                    <Link href={item.href} className="inline-flex items-center text-primary-600 dark:text-primary-400 text-sm font-medium">
                      Read more
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </Link>
                  </Card>
                ))}
              </div>
            </div>

            {/* Engagement */}
            <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
              <BlogInteractions 
                postId={post.id} 
              />
            </div>
          {/* Related Articles (moved from sidebar) */}
          <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Related Articles</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {postsToShow.map((related: BlogPost) => (
                <Card key={related.id} className="p-5 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 flex flex-col justify-between hover:shadow-md transition-shadow">
                  <div className="space-y-2">
                    <h4 className="font-bold text-sm text-gray-900 dark:text-white line-clamp-2">
                      {related.title}
                    </h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {related.category} • {related.readTime}
                    </p>
                  </div>
                  <Link href={`/blog/${related.id}`} className="mt-4 inline-flex items-center text-primary-600 dark:text-primary-400 text-xs font-semibold hover:underline">
                    Read article <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </Link>
                </Card>
              ))}
            </div>
          </div>
        </section>
    </>
  )
}
