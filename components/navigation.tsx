"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Menu, X, Bug } from "lucide-react"
import { useState } from "react"

const navigation = [
  { name: "Home", href: "/" },
  { name: "Board", href: "/board" },
  { name: "Schedule", href: "/schedule" },
  { name: "Study", href: "/study" },
  { name: "Blog", href: "/blog" },
  { name: "People", href: "/people" },
  { name: "User", href: "/user" },
]

export function Navigation() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="bg-cert-black/95 backdrop-blur-md border-b border-cert-border shadow-2xl sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center group">
              <div className="relative w-10 h-10 mr-3">
                <Image
                  src="/images/cert-is-logo.png"
                  alt="CERT-IS Logo"
                  fill
                  className="object-contain group-hover:scale-110 transition-transform duration-300 drop-shadow-lg"
                />
                <div className="absolute inset-0 bg-cert-red/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold text-cert-red tracking-wider drop-shadow-lg">CERT-IS</span>
                <span className="text-xs text-cert-gray -mt-1 font-mono">Cyber Security Club</span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "px-4 py-2 text-sm font-medium transition-all duration-300 rounded-lg relative group overflow-hidden",
                  pathname === item.href
                    ? "text-cert-red bg-cert-red/10 shadow-lg shadow-cert-red/20"
                    : "text-cert-light hover:text-cert-red hover:bg-cert-red/5",
                )}
              >
                <span className="relative z-10">{item.name}</span>
                {pathname === item.href && (
                  <div className="absolute inset-0 bg-gradient-to-r from-cert-red/20 to-cert-red/10 rounded-lg"></div>
                )}
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-cert-red transition-all duration-300 group-hover:w-full"></div>
              </Link>
            ))}
            <div className="ml-6 pl-6 border-l border-cert-border">
              <Button
                variant="outline"
                size="sm"
                className="border-cert-red/50 text-cert-red hover:bg-cert-red hover:text-cert-light transition-all duration-300 hover:shadow-lg hover:shadow-cert-red/25"
                onClick={() => window.open("https://forms.google.com", "_blank")}
              >
                <Bug className="w-4 h-4 mr-2" />
                Bug Report
              </Button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              className="text-cert-light hover:text-cert-red hover:bg-cert-red/10 transition-all duration-300"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden animate-slide-in">
            <div className="px-2 pt-2 pb-3 space-y-1 border-t border-cert-border bg-cert-darker/50 backdrop-blur-sm rounded-b-lg">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "block px-4 py-3 text-base font-medium transition-all duration-300 rounded-lg",
                    pathname === item.href
                      ? "text-cert-red bg-cert-red/10 shadow-lg"
                      : "text-cert-light hover:text-cert-red hover:bg-cert-red/5",
                  )}
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <Button
                variant="outline"
                size="sm"
                className="w-full mt-4 border-cert-red/50 text-cert-red hover:bg-cert-red hover:text-cert-light transition-all duration-300"
                onClick={() => {
                  window.open("https://forms.google.com", "_blank")
                  setIsOpen(false)
                }}
              >
                <Bug className="w-4 h-4 mr-2" />
                Bug Report
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
