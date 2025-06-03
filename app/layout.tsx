import type React from "react";
import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import Image from "next/image";
import "./globals.css";
import { Navigation } from "@/components/navigation";

const inter = Inter({ subsets: ["latin"] });
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "CERT-IS - Cyber Security Club",
  description: "CERT-IS 사이버보안 동아리 공식 홈페이지",
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className="dark">
      <body
        className={`${inter.className} ${jetbrainsMono.variable} bg-cert-black text-cert-light antialiased`}
      >
        <div className="min-h-screen bg-gradient-to-br from-cert-black via-cert-darker to-cert-black">
          <Navigation />
          <main>{children}</main>
        </div>
        {/* Footer */}
        <footer className="bg-black text-white py-6 px-4 sm:px-6 lg:px-8">
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
                  <p className="text-xs text-gray-400">
                    부경대학교 사이버 보안 동아리
                  </p>
                </div>
              </div>
              <div className="text-center md:text-right">
                <p className="text-xs text-gray-400">
                  © 2024 CERT-IS. 하나씩 버그를 잡으며 디지털 공간을 보호합니다.
                </p>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
