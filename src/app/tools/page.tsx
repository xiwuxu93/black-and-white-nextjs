import type { Metadata } from 'next'
import { FrontendToolsHub } from '@/components/frontend-tools-hub'
import { canonicalUrl } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Professional Black and White Photography Tools & Image Converters',
  description: 'Complete collection of professional black and white photography tools. Convert, edit, and enhance your images with our advanced AI-powered converters and filters.',
  keywords: ['black and white tools', 'image converters', 'photo editing tools', 'professional photography', 'vintage filters', 'sepia converter', 'monochrome tools', 'photography utilities'],
  alternates: {
    canonical: canonicalUrl('/tools')
  },
  openGraph: {
    title: 'Professional Black and White Photography Tools & Image Converters',
    description: 'Complete collection of professional black and white photography tools. Convert, edit, and enhance your images with our advanced AI-powered converters and filters.',
    url: canonicalUrl('/tools')
  }
}

export default function ToolsPage() {
  return (
    <div className="min-h-screen py-12">
      <div className="container max-w-7xl">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Professional Black and White Photography Tools
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Comprehensive collection of professional-grade image editing tools for photographers, 
            designers, and artists. Create stunning black and white images, vintage effects, 
            and artistic filters with our advanced converters.
          </p>
        </div>

        {/* Featured Tools Overview */}
        <section className="mb-16">
          <div className="grid lg:grid-cols-3 gap-8 mb-12">
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">🎨 Image Converters</h3>
              <p className="text-gray-300 mb-4">
                Transform your color photos into stunning black and white masterpieces using our 
                professional-grade conversion algorithms that preserve detail and enhance artistic impact.
              </p>
              <ul className="text-sm text-gray-400 space-y-1">
                <li>• Black & White Converter with 6 artistic presets</li>
                <li>• Vintage Sepia Tone Generator</li>
                <li>• High-Contrast Dramatic Effects</li>
                <li>• Film Noir Style Converter</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">⚡ Advanced Filters</h3>
              <p className="text-blue-100 mb-4">
                Apply professional photography filters that photographers use in studios and darkrooms. 
                Fine-tune every aspect of your image conversion with precision controls.
              </p>
              <ul className="text-sm text-blue-200 space-y-1">
                <li>• Contrast and Brightness Adjustment</li>
                <li>• Shadow and Highlight Control</li>
                <li>• Film Grain and Texture Effects</li>
                <li>• Selective Color Preservation</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-purple-600 to-purple-700 rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">🔧 Professional Tools</h3>
              <p className="text-purple-100 mb-4">
                Batch processing, format conversion, and specialized tools for professional 
                photographers and digital artists working with large image collections.
              </p>
              <ul className="text-sm text-purple-200 space-y-1">
                <li>• Batch Image Processing</li>
                <li>• Multiple Format Support</li>
                <li>• High-Resolution Processing</li>
                <li>• Privacy-First Local Processing</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Why Choose Our Tools */}
        <section className="mb-16 bg-gray-50 dark:bg-gray-800 rounded-2xl p-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Why Professional Photographers Choose Our Tools
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🏆</span>
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Studio Quality</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Professional-grade algorithms that match expensive desktop software results
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🔒</span>
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Complete Privacy</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                All processing happens locally in your browser - your images never leave your device
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Lightning Fast</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Advanced optimization delivers professional results in seconds, not minutes
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-100 dark:bg-yellow-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💎</span>
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Always Free</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                No subscriptions, watermarks, or hidden costs - professional tools for everyone
              </p>
            </div>
          </div>
        </section>

        {/* Professional Use Cases */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Professional Photography Applications
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                📸 Portrait Photography
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Create timeless portrait photography with our specialized presets designed for skin tones, 
                facial features, and emotional expression enhancement.
              </p>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
                <li>• Professional headshots and LinkedIn profiles</li>
                <li>• Wedding and engagement photography</li>
                <li>• Family portrait sessions</li>
                <li>• Fashion and editorial photography</li>
              </ul>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                🏞️ Landscape & Architecture
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Transform landscapes and architectural photography with dramatic contrast and 
                texture enhancement that brings out structural details and natural patterns.
              </p>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
                <li>• Landscape and nature photography</li>
                <li>• Urban architecture and street photography</li>
                <li>• Real estate and interior design</li>
                <li>• Fine art and gallery exhibitions</li>
              </ul>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                🎨 Artistic & Commercial
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Perfect for commercial photography, artistic projects, and creative campaigns 
                where dramatic monochrome impact is essential for storytelling.
              </p>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
                <li>• Commercial product photography</li>
                <li>• Artistic and creative projects</li>
                <li>• Documentary and photojournalism</li>
                <li>• Social media and marketing content</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Tools Hub */}
        <FrontendToolsHub />

        {/* Professional Tips Section */}
        <section className="mt-16 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Professional Photography Tips
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                🎯 Choosing the Right Conversion Style
              </h3>
              <ul className="space-y-3 text-gray-600 dark:text-gray-400">
                <li>
                  <strong>Classic:</strong> Perfect for timeless portraits, wedding photography, 
                  and professional headshots where natural tones are essential.
                </li>
                <li>
                  <strong>Dramatic:</strong> Ideal for landscape photography, architectural shots, 
                  and artistic projects requiring high impact and contrast.
                </li>
                <li>
                  <strong>Vintage:</strong> Excellent for fashion photography, editorial work, 
                  and projects requiring a nostalgic, film-inspired aesthetic.
                </li>
                <li>
                  <strong>Film Noir:</strong> Best for urban photography, street scenes, 
                  and dramatic storytelling with deep shadows and contrast.
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                ⚡ Optimization for Best Results
              </h3>
              <ul className="space-y-3 text-gray-600 dark:text-gray-400">
                <li>
                  <strong>High Resolution:</strong> Start with the highest resolution images possible 
                  for professional print quality and detailed conversions.
                </li>
                <li>
                  <strong>Good Lighting:</strong> Well-lit original photos with clear shadows and 
                  highlights produce the most dramatic black and white results.
                </li>
                <li>
                  <strong>Strong Composition:</strong> Images with clear subjects, interesting textures, 
                  and good contrast work best for monochrome conversion.
                </li>
                <li>
                  <strong>Batch Processing:</strong> Use consistent settings across photo series 
                  for cohesive portfolio presentation and efficient workflow.
                </li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
