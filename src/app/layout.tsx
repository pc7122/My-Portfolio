import type { Metadata } from "next";
import { ThemeProvider } from "@/components/ThemeProvider";
import { MUIThemeProvider } from "@/components/MUIThemeProvider";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import "./globals.css";

export const metadata: Metadata = {
  title: "Prathamesh Chaudhary — AI/ML, React Native & IoT Engineer",
  description: "Portfolio of Prathamesh Chaudhary",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
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

