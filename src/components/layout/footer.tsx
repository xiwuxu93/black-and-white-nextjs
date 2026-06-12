import Link from "next/link";
import { Heart, Coffee } from "lucide-react";

export function Footer() {
  const footerLinks = {
    product: {
      title: "Product",
      links: [
        { name: "Single Converter", href: "/" },
        { name: "Batch Converter", href: "/batch-black-and-white-converter" },
        { name: "Logo Converter", href: "/logo-to-black-and-white" },
        { name: "PDF Converter", href: "/convert-pdf-to-black-and-white" },
        { name: "Invert Colors", href: "/invert-image-colors" },
        { name: "Examples & Gallery", href: "/examples" },
        { name: "Newborn Guide", href: "/newborn-photography-guide" },
        { name: "How to Use", href: "/how-to-use" },
        { name: "Photography Blog", href: "/blog" },
      ],
    },
    support: {
      title: "Support",
      links: [
        { name: "FAQ", href: "/faq" },
        { name: "Contact Sivan", href: "/contact" },
        { name: "About My Story", href: "/about" },
      ],
    },
    legal: {
      title: "Legal",
      links: [
        { name: "Privacy Policy", href: "/privacy" },
        { name: "Terms of Service", href: "/terms" },
      ],
    },
  };

  return (
    <footer className="bg-white dark:bg-gray-950 border-t border-gray-100 dark:border-gray-900">
      <div className="container py-16">
        {/* Main content area */}
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-1 space-y-4">
            <Link href="/" className="text-xl font-bold tracking-tighter">
              BWConverter
            </Link>
            <p className="text-sm text-gray-500 leading-relaxed">
              Built by Sivan Xu for photographers and designers who need a reliable
              black and white converter that runs locally and keeps files private.
            </p>
            <div className="pt-2">
              <Link href="/about">
                <Badge variant="outline" className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">
                  <Coffee className="w-3 h-3 mr-2" />
                  Independent Project
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
                © {new Date().getFullYear()} BWConverter. Built with
              </span>
              <Heart className="h-3 w-3 text-pink-500" />
              <span>
                by Sivan Xu in Hong Kong.
              </span>
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
              Local Processing • No Cloud Uploads • Controlled Tonal Range
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
