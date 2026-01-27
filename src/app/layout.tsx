import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { Navbar } from "@/components/layout/Navbar";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { GlobalBackground } from "@/components/layout/GlobalBackground";
import { CustomCursor } from "@/components/ui/CustomCursor";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

import { PERSONAL_INFO } from "@/lib/constants";

export const metadata: Metadata = {
  title: `${PERSONAL_INFO.name} | ${PERSONAL_INFO.role}`,
  description: PERSONAL_INFO.bio,
  keywords: ["Mobile App Developer", "Flutter Developer", "React Native", "Android", "iOS", "Full Stack Developer"],
  authors: [{ name: PERSONAL_INFO.name }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${jetbrainsMono.variable} cursor-none`}>
        <ThemeProvider>
          <SmoothScrollProvider>
            {/* Global Effects Layer */}
            <GlobalBackground />
            <CustomCursor />

            <Navbar />
            <main className="relative z-10">{children}</main>
          </SmoothScrollProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
