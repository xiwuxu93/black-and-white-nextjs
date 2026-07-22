"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import {
  Sun,
  Moon,
  Menu,
  X,
  ChevronDown,
  Globe,
  HelpCircle,
  Info,
  Shield,
  FileText,
  Mail,
  Image as ImageIcon,
  Layers,
  Camera
} from "lucide-react"
import { Dictionary } from "@/locales"

interface HeaderProps {
  dict: Dictionary
}

export function Header({ dict }: HeaderProps) {
  const { theme, setTheme } = useTheme()
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)
  const [mounted, setMounted] = React.useState(false)
  const pathname = usePathname()

  React.useEffect(() => {
    setMounted(true)
  }, [])

  const currentLocale = dict.locale || 'en'

  const getTargetLocaleUrl = (targetLocale: string) => {
    if (!pathname) return `/${targetLocale}/`
    const segments = pathname.split('/')
    if (segments[1] === 'en' || segments[1] === 'es' || segments[1] === 'de' || segments[1] === 'ja') {
      segments[1] = targetLocale
      return segments.join('/') || `/${targetLocale}/`
    }
    return `/${targetLocale}${pathname}`
  }

  const navigation = [
    { name: dict.common.home, href: `/${currentLocale}/` },
    { name: dict.common.batch, href: `/${currentLocale}/batch-black-and-white-converter` },
    { name: dict.common.gallery, href: `/${currentLocale}/examples` },
    { name: dict.common.howToUse, href: `/${currentLocale}/how-to-use` },
    { name: dict.common.blog, href: `/${currentLocale}/blog` },
    {
      name: dict.layout.headerMore,
      href: "#",
      children: [
        { name: dict.common.logo, href: `/${currentLocale}/logo-to-black-and-white`, icon: Layers, description: dict.layout.logoDesc },
        { name: dict.common.pdf, href: `/${currentLocale}/convert-pdf-to-black-and-white`, icon: FileText, description: dict.layout.pdfDesc },
        { name: dict.invert.heroBadge, href: `/${currentLocale}/invert-image-colors`, icon: ImageIcon, description: dict.layout.invertDesc },
        { name: dict.sepia.heroBadge, href: `/${currentLocale}/sepia-filter`, icon: ImageIcon, description: dict.layout.sepiaDesc },
        { name: dict.newborn.heroBadge, href: `/${currentLocale}/newborn-photography-guide`, icon: Camera, description: dict.layout.newbornDesc },
        { name: dict.common.faq, href: `/${currentLocale}/faq`, icon: HelpCircle, description: dict.layout.faqDesc },
        { name: dict.common.contact, href: `/${currentLocale}/contact`, icon: Mail, description: dict.layout.contactDesc },
        { name: dict.common.about, href: `/${currentLocale}/about`, icon: Info, description: dict.layout.aboutDesc },
        { name: dict.common.privacy, href: `/${currentLocale}/privacy`, icon: Shield, description: dict.layout.privacyDesc },
        { name: dict.common.terms, href: `/${currentLocale}/terms`, icon: FileText, description: dict.layout.termsDesc }
      ]
    }
  ]

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light")
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo and brand */}
        <div className="flex items-center space-x-2">
          <Link href={`/${currentLocale}/`} className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
            <Image
              src="/logo.png"
              alt="BW Converter Logo"
              width={36}
              height={36}
              className="h-9 w-9 object-contain"
            />
            <div className="flex items-baseline space-x-1">
              <span className="text-xl font-bold text-gray-900 dark:text-white">BW</span>
              <span className="text-xl font-light text-gray-600 dark:text-gray-400">Converter</span>
            </div>
          </Link>
        </div>

        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navigation.map((item) => (
            <div key={item.name} className="relative group">
              {item.children ? (
                <div className="relative">
                  <button className="flex items-center space-x-1 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                    <span>{item.name}</span>
                    <ChevronDown className="h-4 w-4" />
                  </button>
                  
                  {/* Dropdown menu */}
                  <div className="absolute top-full left-0 mt-1 w-64 py-2 bg-background border border-border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    {item.children.map((child) => {
                      const ChildIcon = child.icon
                      return (
                        <Link
                          key={child.name}
                          href={child.href}
                          className="flex items-start px-4 py-3 text-sm text-muted-foreground hover:text-foreground hover:bg-accent transition-colors group/item"
                        >
                          {ChildIcon && <ChildIcon className="w-4 h-4 mr-3 mt-0.5 text-muted-foreground group-hover/item:text-foreground" />}
                          <div>
                            <div className="font-medium">{child.name}</div>
                            {child.description && (
                              <div className="text-xs text-muted-foreground mt-0.5">{child.description}</div>
                            )}
                          </div>
                        </Link>
                      )
                    })}
                  </div>
                </div>
              ) : (
                <Link
                  href={item.href}
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  {item.name}
                </Link>
              )}
            </div>
          ))}
        </nav>

        {/* Right-side actions */}
        <div className="flex items-center space-x-3">
          {/* Language Switcher Dropdown */}
          <div className="relative group">
            <Button
              variant="outline"
              size="sm"
              className="flex items-center space-x-1.5 px-2.5 h-9 text-xs font-semibold rounded-full border-border/80 hover:bg-accent hover:text-foreground"
            >
              <Globe className="h-3.5 w-3.5 text-muted-foreground" />
              <span className="uppercase">{currentLocale}</span>
              <ChevronDown className="h-3 w-3 opacity-60" />
            </Button>
            
            <div className="absolute right-0 top-full mt-1.5 w-36 py-1 bg-background border border-border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150 z-50">
              <Link
                href={getTargetLocaleUrl('en')}
                className={`flex items-center px-3 py-2 text-xs font-medium transition-colors ${
                  currentLocale === 'en'
                    ? 'bg-accent/80 font-bold text-foreground'
                    : 'text-muted-foreground hover:bg-accent/50 hover:text-foreground'
                }`}
              >
                <span className="mr-2">🇺🇸</span> English (EN)
              </Link>
              <Link
                href={getTargetLocaleUrl('es')}
                className={`flex items-center px-3 py-2 text-xs font-medium transition-colors ${
                  currentLocale === 'es'
                    ? 'bg-accent/80 font-bold text-foreground'
                    : 'text-muted-foreground hover:bg-accent/50 hover:text-foreground'
                }`}
              >
                <span className="mr-2">🇪🇸</span> Español (ES)
              </Link>
              <Link
                href={getTargetLocaleUrl('de')}
                className={`flex items-center px-3 py-2 text-xs font-medium transition-colors ${
                  currentLocale === 'de'
                    ? 'bg-accent/80 font-bold text-foreground'
                    : 'text-muted-foreground hover:bg-accent/50 hover:text-foreground'
                }`}
              >
                <span className="mr-2">🇩🇪</span> Deutsch (DE)
              </Link>
              <Link
                href={getTargetLocaleUrl('ja')}
                className={`flex items-center px-3 py-2 text-xs font-medium transition-colors ${
                  currentLocale === 'ja'
                    ? 'bg-accent/80 font-bold text-foreground'
                    : 'text-muted-foreground hover:bg-accent/50 hover:text-foreground'
                }`}
              >
                <span className="mr-2">🇯🇵</span> 日本語 (JA)
              </Link>
            </div>
          </div>

          {/* Theme toggle */}
          {mounted && (
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              aria-label="Toggle theme"
            >
              {theme === "light" ? (
                <Moon className="h-5 w-5" />
              ) : (
                <Sun className="h-5 w-5" />
              )}
            </Button>
          )}

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-border">
          <div className="container py-4 space-y-4">
            {navigation.map((item) => (
              <div key={item.name}>
                {item.children ? (
                  <div className="space-y-2">
                    <div className="text-sm font-medium text-foreground">
                      {item.name}
                    </div>
                    <div className="ml-4 space-y-2">
                      {item.children.map((child) => {
                        const ChildIcon = child.icon
                        return (
                          <Link
                            key={child.name}
                            href={child.href}
                            className="flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors py-1"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            {ChildIcon && <ChildIcon className="w-4 h-4 mr-2" />}
                            {child.name}
                          </Link>
                        )
                      })}
                    </div>
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    className="block text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}

            {/* Mobile Language Selector */}
            <div className="pt-3 border-t border-border flex items-center justify-between">
              <span className="text-xs font-medium text-muted-foreground flex items-center">
                <Globe className="w-3.5 h-3.5 mr-1.5" /> Language / Idioma:
              </span>
              <div className="flex items-center space-x-2">
                <Link
                  href={getTargetLocaleUrl('en')}
                  className={`px-3 py-1 text-xs rounded-full border transition-colors ${
                    currentLocale === 'en'
                      ? 'bg-primary text-primary-foreground font-semibold border-primary'
                      : 'border-border text-muted-foreground hover:text-foreground'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  🇺🇸 EN
                </Link>
                <Link
                  href={getTargetLocaleUrl('es')}
                  className={`px-3 py-1 text-xs rounded-full border transition-colors ${
                    currentLocale === 'es'
                      ? 'bg-primary text-primary-foreground font-semibold border-primary'
                      : 'border-border text-muted-foreground hover:text-foreground'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  🇪🇸 ES
                </Link>
                <Link
                  href={getTargetLocaleUrl('de')}
                  className={`px-3 py-1 text-xs rounded-full border transition-colors ${
                    currentLocale === 'de'
                      ? 'bg-primary text-primary-foreground font-semibold border-primary'
                      : 'border-border text-muted-foreground hover:text-foreground'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  🇩🇪 DE
                </Link>
                <Link
                  href={getTargetLocaleUrl('ja')}
                  className={`px-3 py-1 text-xs rounded-full border transition-colors ${
                    currentLocale === 'ja'
                      ? 'bg-primary text-primary-foreground font-semibold border-primary'
                      : 'border-border text-muted-foreground hover:text-foreground'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  🇯🇵 JA
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
