import type { Metadata } from 'next'
import Link from 'next/link'
import { ExamplesGrid } from '@/components/pages/examples-grid'
import { Breadcrumb } from '@/components/seo/breadcrumb'
import { canonicalUrl } from '@/lib/seo'
import { Card } from '@/components/ui/card'

export const metadata: Metadata = {
  title: 'Black and White Photo Examples - Professional Before & After Gallery',
  description: 'Browse black and white photo examples with before/after comparisons, style notes, and practical conversion guidance.',
  keywords: ['black and white photo examples', 'image conversion gallery', 'before after photography', 'monochrome examples', 'professional photo conversion', 'black white transformation', 'photography case studies'],
  alternates: {
    canonical: canonicalUrl('/examples')
  },
  openGraph: {
    title: 'Black and White Photo Examples - Professional Before & After Gallery',
    description: 'Browse black and white photo examples with before/after comparisons, style notes, and practical conversion guidance.',
    url: canonicalUrl('/examples')
  }
}

export default function ExamplesPage() {
  return (
    <div className="min-h-screen py-12">
      <div className="container max-w-7xl">
        <Breadcrumb items={[{ name: 'Examples' }]} />

        {/* Page title */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Professional Black and White Photography Examples
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-8">
            This gallery shows before/after conversions with notes on style choice,
            contrast strategy, and subject handling.
          </p>
        </div>

        {/* Featured Guides */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-10">
            Featured Guides & Case Studies
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Newborn Photography Playbook
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm leading-relaxed">
                Follow a home-session checklist, lighting recipes, and a one-hour editing timeline built for
                BWConverter presets. Includes downloadable sample conversions and benchmark data.
              </p>
              <Link href="/newborn-photography-guide" className="inline-flex items-center text-primary-600 dark:text-primary-400 font-medium">
                Read the complete guide
                <span className="sr-only">Newborn photography guide</span>
              </Link>
            </Card>

            <Card className="p-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Newborn Workflow: Studio vs Home
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm leading-relaxed">
                Comparison guide for studio and home sessions, including lighting setup,
                preset baseline choices, and delivery checkpoints.
              </p>
              <Link href="/newborn-photography-guide" className="inline-flex items-center text-primary-600 dark:text-primary-400 font-medium">
                Explore the guide
                <span className="sr-only">Newborn studio case study</span>
              </Link>
            </Card>
          </div>
        </section>

        {/* Photography Education Section */}
        <section className="mb-16 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Understanding Black and White Photography
          </h2>
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-600">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                🎨 Artistic Vision
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Removing color shifts attention to shape, light, texture, and timing.
                That often makes composition mistakes easier to spot and fix.
              </p>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
                <li>• Better focus on composition</li>
                <li>• Clearer separation of subject and background</li>
                <li>• Stronger emphasis on texture</li>
                <li>• Easier contrast-led storytelling</li>
              </ul>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-600">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                🔬 Technical Science
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Conversion quality depends on how color channels map to grayscale,
                and how highlights and shadows are balanced for the target scene.
              </p>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
                <li>• Channel-to-gray mapping</li>
                <li>• Global and local contrast control</li>
                <li>• Highlight and shadow management</li>
                <li>• Detail retention in textured areas</li>
              </ul>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-600">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                📸 Professional Applications
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Typical use cases include portfolio work, client galleries, editorial layouts,
                and documentary sequences where tone carries the story.
              </p>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
                <li>• Portfolio and exhibition work</li>
                <li>• Commercial photography projects</li>
                <li>• Fine art and gallery collections</li>
                <li>• Documentary and storytelling</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Style Analysis Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Professional Black and White Conversion Styles
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-900 text-white rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4">🎭 Classic Style</h3>
              <p className="text-gray-300 mb-4">
                Balanced conversion that keeps midtones stable and skin texture intact.
                A good default for portraits and event photography.
              </p>
              <div className="space-y-2 text-sm">
                <div><strong>Best for:</strong> Portraits, weddings, family photos</div>
                <div><strong>Characteristics:</strong> Balanced tones, natural contrast</div>
                <div><strong>Pro tip:</strong> Preserves skin tones and facial details</div>
              </div>
            </div>

            <div className="bg-red-900 text-white rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4">⚡ Dramatic Style</h3>
              <p className="text-gray-300 mb-4">
                Strong contrast with deep blacks and bright highlights.
                Useful for architecture, street frames, and scenes with graphic lines.
              </p>
              <div className="space-y-2 text-sm">
                <div><strong>Best for:</strong> Landscapes, architecture, street photography</div>
                <div><strong>Characteristics:</strong> High contrast, bold shadows</div>
                <div><strong>Pro tip:</strong> Enhances textures and structural details</div>
              </div>
            </div>

            <div className="bg-amber-800 text-white rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4">📽️ Vintage Style</h3>
              <p className="text-gray-300 mb-4">
                Film-style conversion with softer contrast and mild warmth.
                Often used in fashion, editorial, and memory-driven projects.
              </p>
              <div className="space-y-2 text-sm">
                <div><strong>Best for:</strong> Fashion, editorial, artistic projects</div>
                <div><strong>Characteristics:</strong> Soft contrast, film grain effect</div>
                <div><strong>Pro tip:</strong> Adds emotional warmth and nostalgia</div>
              </div>
            </div>

            <div className="bg-blue-900 text-white rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4">🌙 Film Noir Style</h3>
              <p className="text-gray-300 mb-4">
                Cinematic style with darker shadows and controlled highlights.
                Works well for urban stories and low-key scenes.
              </p>
              <div className="space-y-2 text-sm">
                <div><strong>Best for:</strong> Urban scenes, mood photography</div>
                <div><strong>Characteristics:</strong> Deep shadows, dramatic lighting</div>
                <div><strong>Pro tip:</strong> Creates mystery and emotional depth</div>
              </div>
            </div>

            <div className="bg-purple-900 text-white rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4">🕊️ Soft Style</h3>
              <p className="text-gray-300 mb-4">
                Gentle contrast and smoother gradients.
                Useful for newborn sessions and other delicate subjects.
              </p>
              <div className="space-y-2 text-sm">
                <div><strong>Best for:</strong> Newborns, delicate subjects, ethereal mood</div>
                <div><strong>Characteristics:</strong> Gentle tones, soft transitions</div>
                <div><strong>Pro tip:</strong> Maintains delicate details and textures</div>
              </div>
            </div>

            <div className="bg-gray-700 text-white rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4">⚫ High Contrast</h3>
              <p className="text-gray-300 mb-4">
                Near-binary black/white output with minimal midtone detail.
                Best for graphic compositions and abstract shapes.
              </p>
              <div className="space-y-2 text-sm">
                <div><strong>Best for:</strong> Modern art, graphic design, abstract</div>
                <div><strong>Characteristics:</strong> Maximum contrast, graphic impact</div>
                <div><strong>Pro tip:</strong> Emphasizes patterns and geometric forms</div>
              </div>
            </div>
          </div>
        </section>

        {/* Professional Techniques Section */}
        <section className="mb-16 bg-white dark:bg-gray-800 rounded-2xl p-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Professional Black and White Photography Techniques
          </h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
                🔍 Composition for Monochrome
              </h3>
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Leading Lines and Geometry</h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    In black and white photography, lines, shapes, and geometric patterns become more 
                    prominent. Use architectural elements, natural formations, and compositional rules 
                    to guide the viewer's eye through your image.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Texture and Pattern</h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Without color distractions, textures become crucial storytelling elements. 
                    Focus on surface details, fabric patterns, natural textures, and material 
                    contrasts to add visual interest and depth.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Light and Shadow Play</h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Dramatic lighting becomes even more important in monochrome photography. 
                    Use directional light, backlighting, and shadow patterns to create mood, 
                    depth, and three-dimensional form.
                  </p>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
                ⚙️ Technical Optimization
              </h3>
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Dynamic Range Management</h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Preserve detail in both highlights and shadows by understanding how different 
                    colors translate to grayscale values. Reds become darker, blues lighter, 
                    affecting final tonal balance.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Contrast Control</h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Master the relationship between micro-contrast (local detail) and macro-contrast 
                    (overall tonal separation). Adjust these independently for professional results 
                    that maintain detail while creating impact.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Tonal Mapping</h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Understand how to map specific colors to desired grayscale values. 
                    Use selective adjustments to control how skin tones, skies, and 
                    vegetation appear in your final monochrome image.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Example grid */}
        <ExamplesGrid />

        {/* Professional Tips Section */}
        <section className="mt-16 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Practical Tips for Black and White Photography
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                📷 Before You Shoot
              </h3>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li>• Think in terms of light, shadow, and contrast</li>
                <li>• Look for interesting textures and patterns</li>
                <li>• Consider how colors will translate to grayscale</li>
                <li>• Plan for dramatic lighting conditions</li>
                <li>• Focus on strong compositional elements</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                ⚡ During Conversion
              </h3>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li>• Start with the appropriate style preset</li>
                <li>• Preserve important detail areas</li>
                <li>• Balance overall contrast with local detail</li>
                <li>• Consider the emotional impact you want</li>
                <li>• Test different approaches for best results</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                🎯 Final Optimization
              </h3>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li>• Fine-tune highlights and shadows</li>
                <li>• Adjust micro-contrast for detail enhancement</li>
                <li>• Consider subtle vignetting for focus</li>
                <li>• Optimize for your intended use case</li>
                <li>• Compare multiple versions before finalizing</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
