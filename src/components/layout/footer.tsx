import Link from "next/link";
import { Heart } from "lucide-react";

export function Footer() {
  const footerLinks = {
    product: {
      title: "Product",
      links: [
        { name: "Single Converter", href: "/" },
        { name: "Batch Converter", href: "/batch-black-and-white-converter" },
        { name: "Examples", href: "/examples" },
        { name: "Newborn Photography Guide", href: "/newborn-photography-guide" },
        { name: "How to Use", href: "/how-to-use" },
        { name: "Blog", href: "/blog" },
      ],
    },
    support: {
      title: "Support",
      links: [
        { name: "FAQ", href: "/faq" },
        { name: "Contact", href: "/contact" },
        { name: "About Us", href: "/about" },
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

  const socialLinks: any[] = [];

  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-border">
      <div className="container py-12">
        {/* Main content area */}
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {Object.values(footerLinks).map((section) => (
            <div key={section.title} className="text-center">
              <h3 className="text-sm font-semibold text-foreground mb-4">
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors block"
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
        <div className="border-t border-border pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright */}
            <div className="flex items-center space-x-1 text-sm text-muted-foreground">
              <span>
                © 2025 Black And White Converter. All rights reserved.
              </span>
              <span>Made with</span>
              <Heart className="h-4 w-4 text-red-500" />
              <span>for image processing</span>
            </div>
            <div className="text-sm text-muted-foreground">
              <a
                href="mailto:support@bwconverter.com"
                className="hover:text-foreground transition-colors"
              >
                support@bwconverter.com
              </a>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-border text-center text-xs text-muted-foreground space-y-2">
            <p>
              BWConverter processes images locally in your browser — nothing is uploaded to our servers.
            </p>
            <p>
              Need help? Visit the <Link href="/contact" className="underline hover:text-foreground transition-colors">contact page</Link> for support response times.
            </p>
            <p>
              <button
                onClick={() => {
                  // Try to reopen the CMP (TCF v2.2) consent UI if available
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  const tcf = (window as any).__tcfapi
                  if (typeof tcf === 'function') {
                    try {
                      tcf('displayConsentUi', 2, function() {})
                    } catch {}
                  }
                }}
                className="underline hover:text-foreground transition-colors"
              >
                Cookie Preferences
              </button>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
