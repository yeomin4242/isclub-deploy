import type React from "react"
import type { Metadata } from "next"
import { Inter, JetBrains_Mono } from "next/font/google"
import "./globals.css"
import { Navigation } from "@/components/navigation"

const inter = Inter({ subsets: ["latin"] })
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" })

export const metadata: Metadata = {
  title: "CERT-IS - Cyber Security Club",
  description: "CERT-IS 사이버보안 동아리 공식 홈페이지",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko" className="dark">
      <body className={`${inter.className} ${jetbrainsMono.variable} bg-cert-black text-cert-light antialiased`}>
        <div className="min-h-screen bg-gradient-to-br from-cert-black via-cert-darker to-cert-black">
          <Navigation />
          <main>{children}</main>
        </div>
      </body>
    </html>
  )
}
