import Link from "next/link";
import { Heart, Coffee } from "lucide-react";
import { Dictionary } from "@/locales";

interface FooterProps {
  dict: Dictionary
}

export function Footer({ dict }: FooterProps) {
  const footerLinks = {
    product: {
      title: "Product",
      links: [
        { name: dict.common.home, href: `/${dict.locale || 'en'}/` },
        { name: dict.common.batch, href: `/${dict.locale || 'en'}/batch-black-and-white-converter` },
        { name: dict.common.logo, href: `/${dict.locale || 'en'}/logo-to-black-and-white` },
        { name: dict.common.pdf, href: `/${dict.locale || 'en'}/convert-pdf-to-black-and-white` },
        { name: dict.invert.heroBadge, href: `/${dict.locale || 'en'}/invert-image-colors` },
        { name: dict.sepia.heroBadge, href: `/${dict.locale || 'en'}/sepia-filter` },
        { name: dict.common.gallery, href: `/${dict.locale || 'en'}/examples` },
        { name: dict.newborn.heroBadge, href: `/${dict.locale || 'en'}/newborn-photography-guide` },
        { name: dict.common.howToUse, href: `/${dict.locale || 'en'}/how-to-use` },
        { name: dict.common.blog, href: `/${dict.locale || 'en'}/blog` },
      ],
    },
    support: {
      title: "Support",
      links: [
        { name: dict.common.faq, href: `/${dict.locale || 'en'}/faq` },
        { name: dict.common.contact, href: `/${dict.locale || 'en'}/contact` },
        { name: dict.common.about, href: `/${dict.locale || 'en'}/about` },
      ],
    },
    legal: {
      title: "Legal",
      links: [
        { name: dict.common.privacy, href: `/${dict.locale || 'en'}/privacy` },
        { name: dict.common.terms, href: `/${dict.locale || 'en'}/terms` },
      ],
    },
  };

  return (
    <footer className="bg-white dark:bg-gray-950 border-t border-gray-100 dark:border-gray-900">
      <div className="container py-16">
        {/* Main content area */}
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-1 space-y-4">
            <Link href={`/${dict.locale || 'en'}/`} className="text-xl font-bold tracking-tighter">
              BWConverter
            </Link>
            <p className="text-sm text-gray-500 leading-relaxed">
              {dict.layout.footerDesc}
            </p>
            <div className="pt-2">
              <Link href={`/${dict.locale || 'en'}/about`}>
                <Badge variant="outline" className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">
                  <Coffee className="w-3 h-3 mr-2" />
                  {dict.layout.footerBadge}
                </Badge>
              </Link>
            </div>
          </div>
          
          {Object.values(footerLinks).map((section) => (
            <div key={section.title} className="text-left">
              <h3 className="text-xs font-bold uppercase tracking-widest text-gray-900 dark:text-white mb-6">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-500 hover:text-primary-600 transition-colors block"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-gray-100 dark:border-gray-900 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright */}
            <div className="flex items-center space-x-1 text-xs text-gray-400">
              <span>
                {dict.layout.footerCopyright.split('{year}')[0]}{new Date().getFullYear()}{dict.layout.footerCopyright.split('{year}')[1].split('{heart}')[0]}
              </span>
              <Heart className="h-3 w-3 text-pink-500" />
              <span>
                {dict.layout.footerCopyright.split('{heart}')[1]}
              </span>
            </div>

            {/* Language Switcher Links */}
            <div className="flex items-center space-x-3 text-xs text-gray-400">
              <span className="font-semibold text-gray-500">Language:</span>
              <Link href="/en/" className={`hover:text-primary-600 transition-colors ${dict.locale === 'en' ? 'font-bold text-gray-900 dark:text-white underline' : ''}`}>
                🇺🇸 English
              </Link>
              <span>•</span>
              <Link href="/es/" className={`hover:text-primary-600 transition-colors ${dict.locale === 'es' ? 'font-bold text-gray-900 dark:text-white underline' : ''}`}>
                🇪🇸 Español
              </Link>
            </div>

            <div className="text-xs text-gray-400">
              <a
                href="mailto:support@bwconverter.com"
                className="hover:text-primary-600 transition-colors"
              >
                support@bwconverter.com
              </a>
            </div>
          </div>

          <div className="mt-8 text-center text-[10px] text-gray-400 uppercase tracking-widest space-y-2">
            <p>
              {dict.layout.footerBottom}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

function Badge({ children, className, variant }: any) {
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80 ${className}`}>
      {children}
    </span>
  )
}
