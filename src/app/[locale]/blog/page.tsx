import { Metadata } from 'next'
import Link from 'next/link'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { canonicalUrl } from '@/lib/seo'
import { getBlogPosts } from '@/lib/blog'
import Image from 'next/image'
import { 
  Calendar, 
  Clock, 
  ArrowRight, 
  Camera, 
  Palette,
  Lightbulb,
  Users,
  BookOpen,
  Brain
} from 'lucide-react'
import { getDictionary } from '@/locales'

interface Props {
  params: { locale: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const dict = getDictionary(params.locale)
  const canonical = canonicalUrl(`/${params.locale}/blog/`)
  return {
    title: dict.blog.metaTitle,
    description: dict.blog.metaDesc,
    keywords: [
      'black and white photography',
      'monochrome photography',
      'photography tips',
      'B&W techniques',
      'photo editing',
      'photography blog',
      'image conversion tips'
    ],
    openGraph: {
      title: dict.blog.metaTitle,
      description: dict.blog.metaDesc,
      url: canonical,
    },
    alternates: {
      canonical
    }
  }
}

export default function BlogPage({ params }: Props) {
  const dict = getDictionary(params.locale)
  const blogPosts = getBlogPosts().sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime())
  const featuredPosts = blogPosts.filter(post => post.featured)

  // Calculate category counts dynamically
  const categoryCount = blogPosts.reduce((acc, post) => {
    acc[post.category] = (acc[post.category] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  const categories = [
    { name: dict.blog.allPosts, count: blogPosts.length, icon: Users },
    { name: dict.blog.categoryTools, count: categoryCount['Tools & Reviews'] || 0, icon: Palette },
    { name: dict.blog.categoryArt, count: categoryCount['Art & Techniques'] || 0, icon: Camera },
    { name: dict.blog.categoryTheory, count: categoryCount['Photography Theory'] || 0, icon: Brain },
    { name: dict.blog.categoryBasics, count: categoryCount['Photography Basics'] || 0, icon: BookOpen },
    { name: dict.blog.categoryDesign, count: categoryCount['Design Resources'] || 0, icon: Lightbulb },
  ]

  const featuredPost = featuredPosts[0]
  // Show all posts: highlight the first featured, and include the rest in the grid
  const regularPosts = blogPosts.filter(post => !post.featured || post.id !== featuredPost?.id)

  return (
    <>
        {/* Header */}
        <header className="article-header">
          <Badge className="mb-4" variant="secondary">
            {dict.blog.heroBadge}
          </Badge>
          <h1>
            {dict.blog.heroTitle}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {dict.blog.heroSubtitle}
          </p>
        </header>

        {/* Horizontal Categories Filter Bar */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((category) => {
            const Icon = category.icon
            return (
              <Button
                key={category.name}
                variant={category.name === dict.blog.allPosts ? 'default' : 'outline'}
                size="sm"
                className="rounded-full"
              >
                <Icon className="w-3.5 h-3.5 mr-1.5" />
                {category.name}
                <span className="ml-1 text-xs opacity-70">({category.count})</span>
              </Button>
            )
          })}
        </div>

        <section className="article-section border-t-0 pt-0 space-y-8">
            {/* Featured Post */}
            {featuredPost && (
              <Card className="overflow-hidden">
                <div className="md:flex md:flex-row-reverse">
                  <div className="md:w-1/2 p-8">
                    <div className="flex items-center space-x-2 mb-3">
                      <Badge className="bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200">
                        {dict.blog.featuredBadge}
                      </Badge>
                      <Badge variant="outline">{featuredPost.category}</Badge>
                    </div>
                    
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                      {featuredPost.title}
                    </h2>
                    
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                      {featuredPost.excerpt}
                    </p>
                    
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-6">
                      <div className="flex items-center mr-6">
                        <Calendar className="w-4 h-4 mr-1" />
                        {new Date(featuredPost.publishDate).toLocaleDateString()}
                      </div>
                      <div className="flex items-center mr-6">
                        <Clock className="w-4 h-4 mr-1" />
                        {featuredPost.readTime}
                      </div>
                      <div className="text-gray-600 dark:text-gray-300">
                        {dict.blog.by} {featuredPost.author}
                      </div>
                    </div>
                      
                    <Link href={`/${dict.locale || 'en'}/blog/${featuredPost.id}`}>
                      <Button size="lg">
                        {dict.blog.readArticle}
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                  </div>
                  
                  <div className="md:w-1/2 relative h-64 md:h-auto">
                    {featuredPost.heroImage ? (
                      <Image
                        src={featuredPost.heroImage}
                        alt={featuredPost.heroAlt || featuredPost.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 flex items-center justify-center">
                        <Camera className="w-24 h-24 text-gray-400 dark:text-gray-500" />
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            )}

            {/* Regular Posts Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              {regularPosts.map((post) => (
                <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative h-48">
                    {post.heroImage ? (
                      <Image
                        src={post.heroImage}
                        alt={post.heroAlt || post.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 flex items-center justify-center">
                        <Camera className="w-16 h-16 text-gray-400 dark:text-gray-500" />
                      </div>
                    )}
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center space-x-2 mb-3">
                      <Badge variant="outline">{post.category}</Badge>
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2">
                      {post.title}
                    </h3>
                    
                    <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                      {post.excerpt}
                    </p>
                    
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-4">
                      <div className="flex items-center mr-4">
                        <Calendar className="w-3 h-3 mr-1" />
                        {new Date(post.publishDate).toLocaleDateString()}
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        {post.readTime}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-600 dark:text-gray-300">
                        {dict.blog.by} {post.author}
                      </div>
                      
                      <Link href={`/${dict.locale || 'en'}/blog/${post.id}`}>
                        <Button variant="outline" size="sm">
                          {dict.blog.readMore}
                          <ArrowRight className="w-3 h-3 ml-1" />
                        </Button>
                      </Link>
                    </div>
                    
                    {/* Tags */}
                    <div className="flex flex-wrap gap-1 mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                      {post.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          #{tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Load More Button */}
            <div className="text-center pt-8">
              <Button variant="outline" size="lg">
                {dict.blog.loadMore}
              </Button>
            </div>
        </section>
    </>
  )
}
