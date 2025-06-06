"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Menu, X, Bug } from "lucide-react";
import { useState } from "react";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Board", href: "/board" },
  { name: "Schedule", href: "/schedule" },
  { name: "Study", href: "/study" },
  { name: "Blog", href: "/blog" },
  { name: "People", href: "/people" },
  { name: "User", href: "/user" },
];

export function Navigation() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50 transition-colors duration-300">
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
                <div
                  className="absolute inset-0 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ backgroundColor: "rgba(158, 1, 1, 0.2)" }}
                ></div>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold text-gray-900 dark:text-gray-100 tracking-wider drop-shadow-lg transition-colors duration-300">
                  CERT-IS
                </span>
                <span className="text-xs text-gray-600 dark:text-gray-400 -mt-1 font-mono transition-colors duration-300">
                  Computer Emergency Response Team <br />
                  Information Security
                </span>
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
                    ? "text-gray-900 dark:text-gray-100"
                    : "text-gray-900 dark:text-gray-100"
                )}
                style={{
                  color: pathname === item.href ? "#9E0101" : "",
                  backgroundColor:
                    pathname === item.href ? "rgba(158, 1, 1, 0.05)" : "",
                  boxShadow:
                    pathname === item.href
                      ? "0 4px 6px -1px rgba(158, 1, 1, 0.1), 0 2px 4px -1px rgba(158, 1, 1, 0.06)"
                      : "",
                }}
                onMouseEnter={(e) => {
                  if (pathname !== item.href) {
                    e.currentTarget.style.color = "#9E0101";
                    e.currentTarget.style.backgroundColor =
                      "rgba(158, 1, 1, 0.05)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (pathname !== item.href) {
                    e.currentTarget.style.color = "";
                    e.currentTarget.style.backgroundColor = "";
                  }
                }}
              >
                <span className="relative z-10">{item.name}</span>
                {pathname === item.href && (
                  <div
                    className="absolute inset-0 rounded-lg"
                    style={{
                      background:
                        "linear-gradient(to right, rgba(158, 1, 1, 0.2), rgba(158, 1, 1, 0.1))",
                    }}
                  ></div>
                )}
                <div
                  className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 transition-all duration-300 group-hover:w-full"
                  style={{ backgroundColor: "#9E0101" }}
                ></div>
              </Link>
            ))}
            <div className="ml-6 pl-6 border-l border-gray-300 dark:border-gray-600">
              <Button
                variant="outline"
                size="sm"
                className="border text-white transition-all duration-300 hover:shadow-lg"
                style={{
                  borderColor: "rgba(158, 1, 1, 0.5)",
                  color: "#9E0101",
                  boxShadow: "0 4px 6px -1px rgba(158, 1, 1, 0.1)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#9E0101";
                  e.currentTarget.style.color = "white";
                  e.currentTarget.style.boxShadow =
                    "0 4px 6px -1px rgba(158, 1, 1, 0.25)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "";
                  e.currentTarget.style.color = "#9E0101";
                  e.currentTarget.style.boxShadow =
                    "0 4px 6px -1px rgba(158, 1, 1, 0.1)";
                }}
                onClick={() =>
                  window.open("https://forms.google.com", "_blank")
                }
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
              className="text-gray-900 dark:text-gray-100 transition-all duration-300"
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "#9E0101";
                e.currentTarget.style.backgroundColor = "rgba(158, 1, 1, 0.05)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "";
                e.currentTarget.style.backgroundColor = "";
              }}
            >
              {isOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden animate-slide-in">
            <div className="px-2 pt-2 pb-3 space-y-1 border-t border-gray-200 dark:border-gray-700 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm rounded-b-lg transition-colors duration-300">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "block px-4 py-3 text-base font-medium transition-all duration-300 rounded-lg",
                    pathname === item.href
                      ? "shadow-lg"
                      : "text-gray-900 dark:text-gray-100"
                  )}
                  style={{
                    color: pathname === item.href ? "#9E0101" : "",
                    backgroundColor:
                      pathname === item.href ? "rgba(158, 1, 1, 0.05)" : "",
                  }}
                  onMouseEnter={(e) => {
                    if (pathname !== item.href) {
                      e.currentTarget.style.color = "#9E0101";
                      e.currentTarget.style.backgroundColor =
                        "rgba(158, 1, 1, 0.05)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (pathname !== item.href) {
                      e.currentTarget.style.color = "";
                      e.currentTarget.style.backgroundColor = "";
                    }
                  }}
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <Button
                variant="outline"
                size="sm"
                className="w-full mt-4 border text-white transition-all duration-300"
                style={{
                  borderColor: "rgba(158, 1, 1, 0.5)",
                  color: "#9E0101",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#9E0101";
                  e.currentTarget.style.color = "white";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "";
                  e.currentTarget.style.color = "#9E0101";
                }}
                onClick={() => {
                  window.open("https://forms.google.com", "_blank");
                  setIsOpen(false);
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
  );
}
