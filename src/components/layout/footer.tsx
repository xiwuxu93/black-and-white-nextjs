import Link from "next/link";
import { Heart } from "lucide-react";

export function Footer() {
  const footerLinks = {
    product: {
      title: "Product",
      links: [
        { name: "Single Converter", href: "/" },
        { name: "Batch Converter", href: "/batch" },
        { name: "Examples", href: "/examples" },
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
        {/* 主要内容区域 */}
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

        {/* 分隔线 */}
        <div className="border-t border-border pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* 版权信息 */}
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
          </div>
        </div>
      </div>
    </footer>
  );
}
