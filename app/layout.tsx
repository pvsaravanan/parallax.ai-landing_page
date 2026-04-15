import type React from "react"
import type { Metadata } from "next"
import { Analytics } from "@vercel/analytics/next"
import { AppCursor } from "@/components/app-cursor"
import { ThemeProvider } from "@/components/theme-provider"
import { SmoothScroll } from "@/components/smooth-scroll"
import "./globals.css"

export const metadata: Metadata = {
  title: "Parallax.ai — Human-Preference Evaluation for LLMs",
  description:
    "Parallax.ai is a human-preference evaluation platform for large language models, built for fairness, reproducibility, and extensibility.",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="bg-background" suppressHydrationWarning>
      <head>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Comfortaa:wght@300..700&family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap');

          .montserrat-editorial {
            font-family: "Montserrat", sans-serif;
            font-optical-sizing: auto;
            font-weight: 400;
            font-style: normal;
          }

          .comfortaa-hero {
            font-family: "Comfortaa", sans-serif;
            font-optical-sizing: auto;
            font-weight: 500;
            font-style: normal;
          }
        `}</style>
      </head>
      <body
        className="font-sans antialiased overflow-x-hidden"
      >

        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <SmoothScroll>
            <AppCursor />
            {children}
          </SmoothScroll>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
