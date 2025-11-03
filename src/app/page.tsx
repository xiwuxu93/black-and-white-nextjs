import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { StructuredData } from '@/components/seo/structured-data'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ConverterExperience } from '@/components/home/converter-experience'

const HOME_FAQ_SCHEMA = {
  questions: [
    {
      question: 'How do I convert an image to black and white?',
      answer:
        'Upload your file, choose a preset, and click download. The converter analyzes color data and applies channel mixing, letting you convert image to black and white with depth, contrast, and film-style grain in under a minute.'
    },
    {
      question: 'Can I make multiple photos black and white at once?',
      answer:
        'Yes. Head to the batch black and white converter to convert multiple images to black and white simultaneously. Drop in a full folder of photos and apply the same preset across every file.'
    },
    {
      question: 'How do I turn a picture black and white online?',
      answer:
        'Use the browser-based editor, drag in your picture, adjust the sliders, and hit export. There is no download or signup required to turn image black and white online with full control.'
    },
    {
      question: "What's the best black and white converter?",
      answer:
        'The best converter gives you custom tonal control, fast previews, and private processing. BWConverter includes all of that plus presets inspired by darkroom workflows so you get professional black and white photos every time.'
    },
    {
      question: 'Is this black and white photo editor free?',
      answer:
        'Absolutely. BWConverter is a free black and white photo editor with no hidden paywalls, watermarks, or file limits. Every feature works without creating an account.'
    },
    {
      question: 'How do I make a black and white image from color?',
      answer:
        'Upload any color snapshot, select "Classic" or a more dramatic preset, then refine the highlights and shadows. The tool remaps every pixel so you can make a photo black and white while protecting detail.'
    },
    {
      question: 'Can I convert PNG or JPG to black and white?',
      answer:
        'Yes. Drop PNG, JPG, WebP, or TIFF files into the converter, and export them as black and white pictures in PNG, JPG, or WebP formats with your chosen quality level.'
    },
    {
      question: 'How do I download my black and white picture?',
      answer:
        'After previewing your image to black and white, select the file format you want and click download. The tool saves a copy locally with a file name that includes "-bw" so you can sort your edits at a glance.'
    },
    {
      question: 'Does this work for existing black and white photos?',
      answer:
        'Yes. Upload classic monochrome shots to add contrast, film grain, or tone adjustments. The black white image converter can enhance vintage negatives just as easily as it handles fresh color files.'
    },
    {
      question: 'How do I make images black and white in bulk?',
      answer:
        'Select all the files you need, open the batch tool, and start the queue. The batch workflow makes pictures black and white in bulk while keeping resolutions intact and filenames organized.'
    }
  ]
} as const

function MarketingSections() {
  return (
    <section className="converter-marketing py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-gray-600 dark:text-gray-400">
          <p className="text-xl mb-4 text-gray-600 dark:text-gray-400">
            Turn every black and white image idea into reality with our free black and white converter. In one tab you can make image black and white, generate studio-grade contrast, and keep full resolution. Whether you are retouching a portrait, preparing a black and white photo for print, or refreshing a black and white picture for social media, the tool blends ease of use with pro controls so you can make photo black and white without losing a single detail. Because everything runs in your browser, no file ever leaves your device.
          </p>
          <p className="text-base md:text-lg mb-6">
            Our black and white image converter delivers live previews, film-inspired presets, and precise sliders that guide every image to black and white perfection. This black white image converter processes files locally with WebAssembly, so photographers, designers, and marketers can move any photo to black and white instantly for mood boards, ecommerce listings, pitch decks, or editorial spreads. Switch between presets, refine the tonal curve, and export professional assets ready for clients in seconds.
          </p>
          <p className="text-base md:text-lg mb-16">
            No matter if you need a quick black and white image maker for a single portrait or a full-scale black and white image generator for campaign planning, BWConverter keeps the workflow simple. Drag a file into the canvas, experiment with rich monochrome looks, and deliver consistent results across every platform while meeting strict quality standards for print and digital media teams.
          </p>
        </div>

        <section className="bg-white dark:bg-gray-800 rounded-3xl p-8 md:p-12 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            How to Make Image Black and White in 3 Steps
          </h2>
          <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 mb-8">
            Converting color to monochrome should be quick, strategic, and repeatable. Follow this workflow any time you need to convert image to black and white for a marketing campaign, social reel, or gallery print. Each step is powered by our black and white image maker, so you can duplicate the process across hundreds of assets without second-guessing the quality.
          </p>
          <ol className="space-y-8 text-left">
            <li className="flex flex-col md:flex-row md:items-start gap-4">
              <div className="flex-shrink-0">
                <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-900 text-white text-xl font-semibold">
                  1
                </span>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  Upload your color photo or drag it into the canvas
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Drop any JPG, PNG, or WebP into the interface. The black and white converter inspects color channels and keeps the full resolution intact while the preview loads. This first step makes it effortless to turn image black and white from a phone screenshot, a DSLR capture, or art scanned from film negatives without manual resizing.
                </p>
              </div>
            </li>
            <li className="flex flex-col md:flex-row md:items-start gap-4">
              <div className="flex-shrink-0">
                <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-900 text-white text-xl font-semibold">
                  2
                </span>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  Pick the preset that matches your creative direction
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Choose a cinematic preset for dramatic portraits, a clean preset for product photography, or build a custom mix. Our black and white image generator uses channel balancing so skin tones stay smooth and skies keep detail. Adjust contrast, brightness, and grain to create a signature look you can reuse across every black and white photo in the series.
                </p>
              </div>
            </li>
            <li className="flex flex-col md:flex-row md:items-start gap-4">
              <div className="flex-shrink-0">
                <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-900 text-white text-xl font-semibold">
                  3
                </span>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  Export your finished black and white picture instantly
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  When the preview looks perfect, select PNG, JPG, or WebP, and download. The file is saved locally with a tidy "-bw" suffix so you know it came from the black and white picture converter. Share it with clients, upload it to your site, or archive it for print production knowing the tones are locked in.
                </p>
              </div>
            </li>
          </ol>
        </section>

        <section className="bg-gray-50 dark:bg-gray-900/60 rounded-3xl p-8 md:p-12 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            Free Black and White Converter Features
          </h2>
          <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 mb-10 text-center">
            Everything you need to make photos black and white is available the moment you load the page. These capabilities help solo creators and agencies maintain consistent aesthetics while meeting demanding production schedules.
          </p>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card className="p-6 h-full">
              <div className="text-2xl mb-4">🎚️</div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Channel Mixing Engine
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Our black and white image converter reads red, green, and blue values separately so you can emphasize texture, isolate highlights, and create depth. It is the same principle used in the darkroom, delivered through a simple slider interface that anyone can master.
              </p>
            </Card>
            <Card className="p-6 h-full">
              <div className="text-2xl mb-4">⚡</div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Real-Time Preview
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Preview every adjustment instantly while you convert image to black and white. The live canvas eliminates guesswork and lets you dial in tonal contrast before exporting, which saves time in revisions and approvals.
              </p>
            </Card>
            <Card className="p-6 h-full">
              <div className="text-2xl mb-4">🛡️</div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Privacy-First Workflow
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Files never leave your machine. The black white image converter runs entirely in your browser, making it safe for client deliverables, NDA projects, or personal archives that cannot be uploaded to third-party servers.
              </p>
            </Card>
            <Card className="p-6 h-full">
              <div className="text-2xl mb-4">🔁</div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Reusable Presets
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Save time by leaning on presets inspired by iconic film stocks. Whether you are chasing a matte editorial finish or a bold photojournalism look, the black and white image maker keeps favorite styles one click away.
              </p>
            </Card>
            <Card className="p-6 h-full">
              <div className="text-2xl mb-4">🖨️</div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Print-Ready Exports
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Send photo to black and white output at full resolution with controlled compression. Export assets that can run in magazines, lookbooks, product inserts, or gallery prints without extra round-tripping through other software.
              </p>
            </Card>
            <Card className="p-6 h-full">
              <div className="text-2xl mb-4">🌐</div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Works on Any Device
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Log in from a laptop, tablet, or phone and keep editing. The responsive UI ensures you can make image black and white during client calls, while traveling, or right after a photoshoot.
              </p>
            </Card>
          </div>
        </section>

        <section className="bg-white dark:bg-gray-800 rounded-3xl p-8 md:p-12 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            Convert Image to Black and White With Professional Control
          </h2>
          <div className="grid md:grid-cols-2 gap-10 text-left">
            <div className="space-y-4 text-gray-600 dark:text-gray-400">
              <p>
                Photographers rely on nuanced tonal control to guide the viewer&apos;s eye. Our controls let you lighten skin, deepen skies, and build contrast selectively so each black and white photo tells a deliberate story. Blend multiple adjustments to achieve the same flexibility you would find in Lightroom or Capture One without leaving your browser.
              </p>
              <p>
                Because the black and white picture converter honors your original file data, there is no fear of banding or crushed shadows. Preview different combinations, compare presets, and reset with one click until the image to black and white balance feels right.
              </p>
              <p>
                Need to match a brand style guide? Store favorite settings and reuse them across entire campaigns. Consistency is critical for catalogs, editorial spreads, and social storytelling, and this workflow removes the guesswork.
              </p>
              <p>
                Portrait photographers refine highlights and shadows to build dramatic storytelling. Fashion editors convert runway coverage into cohesive black and white photo sets for brand lookbooks. Fine artists prepare gallery prints without scanning back and forth between multiple tools.
              </p>
              <p>
                Illustrators and concept artists feed reference shots into the black and white image maker to explore tone, shape, and light before diving into final artwork.
              </p>
              <p>
                Content creators preparing reels or carousels can make pictures black and white to create visual breaks that keep audiences engaged.
              </p>
            </div>
            <div className="space-y-4 text-gray-600 dark:text-gray-400">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Business and Marketing Teams
              </h3>
              <p>
                Ecommerce managers produce product swatches and campaign imagery that align with seasonal palettes. Agencies deliver monochrome mockups that focus stakeholder attention on layout and messaging. Real estate marketers convert image to black and white for property brochures that emphasize structure and light.
              </p>
              <p>
                Corporate communications teams rely on the black and white converter to standardize employee portraits or leadership headshots, ensuring consistent branding across press releases and investor decks.
              </p>
              <p>
                Educators and non-profits use the tool to create high-contrast visuals for presentations, printouts, and infographics that must remain legible when photocopied.
              </p>
              <p>
                Video teams can export still frames, convert them for storyboards, and keep the palette aligned across deliverables. Marketing managers can turn image black and white for A/B testing, landing pages, or seasonal campaigns with zero technical overhead.
              </p>
              <p>
                Because exports can be set to PNG, JPG, or WebP, you always have the exact format needed for content management systems, ad platforms, or print vendors. One workflow fits all.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-white dark:bg-gray-800 rounded-3xl p-8 md:p-12 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            Black and White Image Generator Tips for Consistent Results
          </h2>
          <div className="space-y-6 text-gray-600 dark:text-gray-400">
            <p>
              Start with a high-resolution file whenever possible. The more data you feed the black and white image generator, the better it can separate tones and maintain detail. If a file is low resolution, use the clarity and grain sliders sparingly to avoid artifacts.
            </p>
            <p>
              Balance your midtones before pushing extreme contrast. A subtle S-curve can add depth to any black and white picture while keeping highlights under control. Use the split-toning options to add a hint of warmth or coolness for mood-driven campaigns.
            </p>
            <p>
              When prepping assets for print, preview the image to black and white result on both light and dark backgrounds. This ensures logos, product edges, and text overlays stay legible no matter where the final asset lives.
            </p>
            <p>
              Save multiple presets for different clients or collections. A consistent toolkit speeds up collaboration and keeps every make photo black and white task aligned with brand visual identity.
            </p>
          </div>
        </section>

        <section className="bg-gray-50 dark:bg-gray-900/60 rounded-3xl p-8 md:p-12 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            Black and White Image Maker Success Stories
          </h2>
          <div className="space-y-6 text-gray-600 dark:text-gray-400">
            <p>
              Elena, a wedding photographer in Barcelona, relies on the black and white image maker to deliver curated galleries for every couple she works with. During curation she highlights the moments with the most emotion, then uses the converter to make image black and white so reactions, glances, and movement stay front and center. By exporting multiple variations she can convert image to black and white for albums, wall art, and teaser posts while preserving all the fine lace and suit details that matter to her clients.
            </p>
            <p>
              The merchandising team at Luma &amp; Co. runs a fast-moving ecommerce catalog where every product must feel cohesive. They feed each new hero shot into the black and white converter, evaluate the tonal balance, and send photo to black and white versions for campaigns that focus on texture or silhouette. Because the workflow is private and browser-based, the team can publish monochrome imagery the same day a sample arrives, keeping marketing calendars right on schedule.
            </p>
            <p>
              A social media studio in New York manages multiple brand channels and needs a dependable black and white converter to keep posts fresh. They schedule weekly creative sprints, make photos black and white to match minimal brand boards, and export ready-to-share assets that slot perfectly into TikTok, Instagram, and Pinterest templates.
            </p>
            <p>
              Independent artists use the black and white image generator to prepare Kickstarter visuals, online portfolio updates, and limited-edition merch drops. Because they can make photo black and white without uploading to third-party servers, every release stays under wraps until launch day.
            </p>
          </div>
        </section>

        <section className="bg-white dark:bg-gray-800 rounded-3xl p-8 md:p-12 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            Frequently Asked Black and White Image Questions
          </h2>
          <div className="grid gap-6 md:grid-cols-2 text-gray-600 dark:text-gray-400">
            {HOME_FAQ_SCHEMA.questions.map(({ question, answer }) => (
              <div key={question} className="bg-gray-50 dark:bg-gray-900/60 rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {question}
                </h3>
                <p>{answer}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-gray-50 dark:bg-gray-900/60 rounded-3xl p-8 md:p-12">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Learn the Craft of Modern Black and White Image Editing
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Dive deeper into composition, lighting, and storytelling with our tutorials. Each guide shows how to move an image to black and white with purpose, build cohesive series, and present your work with confidence.
            </p>
            <div className="mt-6">
              <Link href="/blog">
                <Button size="lg" variant="outline">
                  Read Our Photography Guides
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </section>
  )
}

export default function HomePage() {
  return (
    <>
      <StructuredData type="faq" data={HOME_FAQ_SCHEMA} />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <ConverterExperience />
        <MarketingSections />
      </div>
    </>
  )
}
