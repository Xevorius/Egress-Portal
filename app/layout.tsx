import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SessionWrapper from "@/components/blocks/SessionWrapper";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Egress",
  description: "Welcome to the Egress website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/Favicon.ico" />
      </head>
      <body className={inter.className}>
        <SessionWrapper>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            storageKey="egress.theme"
            disableTransitionOnChange
          >
            <TooltipProvider
              delayDuration={10}
              skipDelayDuration={10}
              disableHoverableContent
            >
              {/* <div className="flex w-full h-full min-h-full">
                <div className="relative flex w-full h-full flex-col">
                  <div className="relative flex w-full flex-col"> */}
                    <main className="flex-auto ">{children}</main>
                  {/* </div>
                </div>
              </div> */}
            </TooltipProvider>
          </ThemeProvider>
        </SessionWrapper>
      </body>
    </html>
  );
}