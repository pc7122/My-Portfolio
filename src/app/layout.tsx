import type { Metadata } from "next";
import { ThemeProvider } from "@/components/ThemeProvider";
import { MUIThemeProvider } from "@/components/MUIThemeProvider";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Sora, Manrope, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  weight: ["300", "400", "500", "600", "700", "800"],
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  weight: ["300", "400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://prathamesh.dev"),
  title: {
    default: "Prathamesh Chaudhary — AI/ML, React Native & IoT Engineer",
    template: "%s | Prathamesh Chaudhary",
  },
  description: "Portfolio of Prathamesh Chaudhary — AI/ML, React Native & IoT Engineer building intelligent products that ship.",
  keywords: [
    "Prathamesh Chaudhary",
    "AI/ML Engineer",
    "React Native Developer",
    "IoT Engineer",
    "Software Engineer",
    "Portfolio",
    "Machine Learning",
    "Smart Vending",
  ],
  openGraph: {
    title: "Prathamesh Chaudhary — AI/ML, React Native & IoT Engineer",
    description: "Portfolio of Prathamesh Chaudhary — AI/ML, React Native & IoT Engineer building intelligent products that ship.",
    url: "https://prathamesh.dev",
    siteName: "Prathamesh Chaudhary Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Prathamesh Chaudhary — AI/ML, React Native & IoT Engineer",
    description: "Portfolio of Prathamesh Chaudhary — AI/ML, React Native & IoT Engineer building intelligent products that ship.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Prathamesh Chaudhary",
  "jobTitle": "AI/ML, React Native & IoT Engineer",
  "url": "https://prathamesh.dev",
  "sameAs": [
    "https://github.com/pc7122"
  ],
  "knowsAbout": [
    "Artificial Intelligence",
    "Machine Learning",
    "React Native",
    "Internet of Things",
    "Web Development",
    "iOS Development",
    "Android Development"
  ]
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`${sora.variable} ${manrope.variable} ${jetbrainsMono.variable}`}>
      <body className="antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <AppRouterCacheProvider>
          <ThemeProvider>
            <MUIThemeProvider>
              <TooltipProvider>
                {children}
                <Toaster />
                <Sonner />
              </TooltipProvider>
            </MUIThemeProvider>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}

