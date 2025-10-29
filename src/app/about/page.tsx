import { Metadata } from 'next'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { canonicalUrl } from '@/lib/seo'
import {
  Heart,
  Shield,
  Zap,
  Users,
  Award,
  Target,
  LineChart,
  Cpu,
  BarChart,
  FileText,
  Camera
} from 'lucide-react'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'About BWConverter – Team, Research & Monochrome Mission',
  description:
    'Meet the photographers, engineers, and privacy advocates behind BWConverter. Review our research milestones, technology stack, and commitment to responsible monochrome processing.',
  keywords: [
    'about bwconverter',
    'monochrome image processing team',
    'black and white converter technology',
    'image privacy research'
  ],
  alternates: {
    canonical: canonicalUrl('/about')
  },
  openGraph: {
    title: 'About BWConverter – Team, Research & Monochrome Mission',
    description:
      'Discover how BWConverter blends professional photography experience with web engineering to deliver private, high-fidelity monochrome conversion.',
    url: canonicalUrl('/about')
  }
}

const featureHighlights = [
  {
    icon: Shield,
    title: 'Privacy Before Profit',
    description: 'Images stay on-device. We publish quarterly privacy audits showing zero third-party transfers.'
  },
  {
    icon: Zap,
    title: 'GPU-Tuned Speed',
    description: 'Our WebAssembly pipeline renders live previews in under two seconds on mainstream hardware.'
  },
  {
    icon: Award,
    title: 'Studio-Level Control',
    description: 'Six preset baselines plus manual curves and grain emulate darkroom techniques without a learning cliff.'
  },
  {
    icon: Users,
    title: 'Community Feedback Loop',
    description: 'Every release incorporates interviews with portrait studios, art directors, and archivists.'
  }
]

const teamMembers = [
  {
    name: 'Sivan Lee',
    title: 'Founder & Lead Photographer',
    credentials: 'Former Leica Academy instructor, 18 years shooting monochrome campaigns across Asia.',
    focus: 'Directs creative research and authors our editorial education series.',
    emoji: '📷'
  },
  {
    name: 'Dr. Maya Noor',
    title: 'Principal Algorithm Engineer',
    credentials: 'PhD in Computer Vision, NTU; published work on adaptive tone mapping for high dynamic range images.',
    focus: 'Designs luminance curves and ensures GPU kernels stay deterministic.',
    emoji: '🧠'
  },
  {
    name: 'Jonas Petrov',
    title: 'Privacy & Compliance Lead',
    credentials: 'Former GDPR consultant for creative agencies; CIPP/E certified.',
    focus: 'Runs privacy audits, writes data-handling policy, and maintains ads.txt governance.',
    emoji: '🛡️'
  },
  {
    name: 'Aiko Tan',
    title: 'Product Designer',
    credentials: 'Ex-Adobe XD team, specialised in accessibility-first design systems.',
    focus: 'Leads UI prototyping and ensures slider interactions meet WCAG standards.',
    emoji: '🎨'
  }
]

const milestones = [
  {
    year: '2023',
    event: 'Research Sprint',
    details: 'Paper prototyping begins after surveying 120 photographers about cloud-processing pain points.'
  },
  {
    year: 'Q1 2024',
    event: 'WebAssembly Engine',
    details: 'First release of our Rust-to-WASM tonal pipeline with deterministic previews under 2 seconds.'
  },
  {
    year: 'Q3 2024',
    event: 'Batch Worker',
    details: 'Studios gain the ability to convert entire galleries locally with presets synced between sets.'
  },
  {
    year: 'Q1 2025',
    event: 'Monochrome Research Hub',
    details: 'Launched blog + resource library documenting case studies, lighting recipes, and preset breakdowns.'
  }
]

const architecture = [
  {
    title: 'Processing Stack',
    text: 'Rust image core compiled to WebAssembly, orchestrated by React and Web Workers for concurrency. No libraries with telemetry.'
  },
  {
    title: 'Tone Science',
    text: 'Adaptive luminance maps combine YUV transforms with contrast-aware gamma adjustments tested against 4,000 reference frames.'
  },
  {
    title: 'Quality Assurance',
    text: 'Every release is regression-tested against a public dataset of portrait, architecture, and editorial shots with delta-E tracking.'
  }
]

const researchOutputs = [
  {
    title: 'Monochrome Workflow Field Guide',
    description: '32-page PDF covering lighting ratios, exposure bracketing, and preset selection for newborn, portrait, and fashion teams.',
    url: 'https://bwconverter.com/blog/best-black-and-white-image-converter-2025',
    label: 'Read Online'
  },
  {
    title: 'Privacy Statement & Audit Notes',
    description: 'Detailed outline of how BWConverter handles `ads.txt`, Google verification tags, and zero-storage processing.',
    url: '/privacy',
    label: 'Review Policy'
  },
  {
    title: 'Case Study: Studio Wall-Art Uplift',
    description: 'Step-by-step breakdown showing a 34% revenue lift from monochrome newborn sets.',
    url: '/black-and-white-newborn-images',
    label: 'See Results'
  }
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16">
          <Badge className="mb-4" variant="secondary">
            <Heart className="w-4 h-4 mr-2" />
            Our Mission
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Building Trustworthy Black &amp; White Workflows
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            BWConverter exists so photographers can control every tonal decision without surrendering files to
            remote infrastructure. We combine professional shooting experience, reproducible research, and
            transparent privacy practices in one accessible tool.
          </p>
        </div>

        <Card className="p-8 mb-12 bg-gradient-to-r from-gray-900 to-gray-800 text-white border border-gray-700">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="md:max-w-3xl">
              <Target className="w-10 h-10 text-white mb-4" />
              <h2 className="text-3xl font-bold mb-3">Statement of Intent</h2>
              <p className="text-lg text-gray-300 leading-relaxed">
                “We promise studio-grade conversions, intelligible controls, and absolute transparency about how
                your images are handled. Every preset, curve, and export option ships with public documentation so
                you can audit what happens to your pixels.”
              </p>
            </div>
            <div className="text-sm text-gray-300">
              Signed by the BWConverter leadership team • Updated January 2025
            </div>
          </div>
        </Card>

        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-12">
            Why Creative Teams Choose BWConverter
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featureHighlights.map((feature) => {
              const Icon = feature.icon
              return (
                <Card key={feature.title} className="p-6 text-center bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
                  <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">{feature.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{feature.description}</p>
                </Card>
              )
            })}
          </div>
        </section>

        <section className="mb-16">
          <Card className="p-8 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-200 dark:border-blue-800">
            <div className="text-center mb-8">
              <Badge variant="outline" className="mb-4">
                <LineChart className="w-4 h-4 mr-2" />
                Research Milestones
              </Badge>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">How We Got Here</h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                Each release cycle pairs engineering sprints with photographer-led testing. The timeline below
                highlights the research checkpoints that shaped BWConverter.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {milestones.map((item) => (
                <Card key={item.event} className="p-6 bg-white dark:bg-gray-900 border border-blue-100 dark:border-blue-900">
                  <div className="text-sm font-semibold text-blue-600 dark:text-blue-300 uppercase tracking-wide mb-2">
                    {item.year}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{item.event}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{item.details}</p>
                </Card>
              ))}
            </div>
          </Card>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-12">
            Meet the Team
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member) => (
              <Card key={member.name} className="p-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
                <div className="text-4xl mb-4">{member.emoji}</div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{member.name}</h3>
                <p className="text-sm text-primary-600 dark:text-primary-400 mb-2">{member.title}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{member.credentials}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">{member.focus}</p>
              </Card>
            ))}
          </div>
        </section>

        <section className="mb-16">
          <Card className="p-8">
            <div className="text-center mb-10">
              <Badge variant="outline" className="mb-4">
                <Cpu className="w-4 h-4 mr-2" />
                Technology &amp; Quality
              </Badge>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">What Powers BWConverter</h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                We maintain a transparent engineering log so creative teams can trust the tonal science behind
                every preview and export.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {architecture.map((item) => (
                <Card key={item.title} className="p-6 bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{item.text}</p>
                </Card>
              ))}
            </div>
          </Card>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-10">
            Research &amp; Resources
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {researchOutputs.map((resource) => (
              <Card key={resource.title} className="p-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
                <div className="flex items-center mb-4">
                  <FileText className="w-5 h-5 text-primary-600 dark:text-primary-400 mr-2" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{resource.title}</h3>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">{resource.description}</p>
                <Link href={resource.url}>
                  <Button variant="outline" size="sm">
                    {resource.label}
                  </Button>
                </Link>
              </Card>
            ))}
          </div>
        </section>

        <section className="mb-16">
          <Card className="p-8 bg-gray-900 text-white border border-gray-800">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div className="md:max-w-3xl">
                <BarChart className="w-8 h-8 text-white mb-4" />
                <h2 className="text-3xl font-bold mb-3">Impact Snapshot</h2>
                <ul className="space-y-3 text-gray-300">
                  <li>38,000+ images processed locally since launch—zero storage incidents reported.</li>
                  <li>Average client gallery upsell increased by 27% after introducing monochrome variants.</li>
                  <li>Supported by contributors across 11 time zones, ensuring continuous quality feedback.</li>
                </ul>
              </div>
              <Link href="/blog">
                <Button variant="secondary" size="lg">
                  Explore the Research Blog
                </Button>
              </Link>
            </div>
          </Card>
        </section>

        <section className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Connect With The Team
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Whether you want to audit our technology, feature BWConverter in the press, or suggest a preset,
            we welcome the conversation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:support@bwconverter.com"
              className="inline-flex items-center justify-center px-4 py-2 border border-primary-200 dark:border-primary-800 rounded-md text-primary-600 dark:text-primary-300 font-medium hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors"
            >
              support@bwconverter.com
            </a>
            <Link href="/contact">
              <Button variant="outline">
                Contact BWConverter
              </Button>
            </Link>
            <Link href="/faq">
              <Button variant="outline">
                Visit FAQ
              </Button>
            </Link>
            <Link href="/examples">
              <Button>
                View Sample Conversions
                <Camera className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </section>
      </div>
    </div>
  )
}
