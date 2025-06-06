"use client";

import type React from "react";
import { Inter, JetBrains_Mono } from "next/font/google";
import Image from "next/image";
import Head from "next/head";
import { useEffect, useState } from "react";
import "./globals.css";
import { Navigation } from "@/components/navigation";
import { Button } from "@/components/ui/button";
import { Moon, Sun, ArrowUp } from "lucide-react";

const inter = Inter({ subsets: ["latin"] });
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

// Theme Provider Component
function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("theme");
    const systemPrefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    setIsDark(saved === "dark" || (!saved && systemPrefersDark));
  }, []);

  useEffect(() => {
    if (mounted) {
      document.documentElement.classList.toggle("dark", isDark);
      localStorage.setItem("theme", isDark ? "dark" : "light");
    }
  }, [isDark, mounted]);

  if (!mounted) {
    return <div>{children}</div>;
  }

  return (
    <div className={isDark ? "dark" : ""}>
      {children}
      <FloatingButtons isDark={isDark} setIsDark={setIsDark} />
    </div>
  );
}

// Floating Buttons Component
function FloatingButtons({
  isDark,
  setIsDark,
}: {
  isDark: boolean;
  setIsDark: (value: boolean) => void;
}) {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="fixed right-6 bottom-6 z-50 flex flex-col gap-3">
      {/* Theme Toggle Button */}
      <Button
        size="icon"
        onClick={() => setIsDark(!isDark)}
        className="w-12 h-12 rounded-full bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-red-300 dark:hover:border-red-500 transition-all duration-300 shadow-lg hover:shadow-xl"
      >
        {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
      </Button>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <Button
          size="icon"
          onClick={scrollToTop}
          className="w-12 h-12 rounded-full text-white transition-all duration-300 shadow-lg hover:shadow-xl animate-in slide-in-from-bottom-2"
          style={{ backgroundColor: "#9E0101" }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "rgba(158, 1, 1, 0.9)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "#9E0101";
          }}
        >
          <ArrowUp className="w-5 h-5" />
        </Button>
      )}
    </div>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <Head>
        <title>CERT-IS - Cyber Security Club</title>
        <meta
          name="description"
          content="CERT-IS 사이버보안 동아리 공식 홈페이지"
        />
        <meta name="generator" content="v0.dev" />
      </Head>
      <body
        className={`${inter.className} ${jetbrainsMono.variable} bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 antialiased transition-colors duration-300`}
      >
        <ThemeProvider>
          <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
            <Navigation />
            <main>{children}</main>
          </div>
          {/* Footer */}
          <footer className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 py-6 px-4 sm:px-6 lg:px-8 border-t border-gray-200 dark:border-gray-700 transition-colors duration-300">
            <div className="max-w-7xl mx-auto">
              <div className="flex flex-col md:flex-row justify-between items-center">
                <div className="flex items-center space-x-3 mb-4 md:mb-0">
                  <Image
                    src="/images/cert-is-logo.png"
                    alt="CERT-IS 무당벌레 마스코트"
                    width={30}
                    height={30}
                    className="rounded-full"
                  />
                  <div>
                    <h3 className="font-bold text-sm">CERT-IS</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      부경대학교 사이버 보안 동아리
                    </p>
                  </div>
                </div>
                <div className="text-center md:text-right">
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    © 2024 CERT-IS. 하나씩 버그를 잡으며 디지털 공간을
                    보호합니다.
                  </p>
                </div>
              </div>
            </div>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
