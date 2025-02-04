import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SessionWrapper from "@/components/blocks/SessionWrapper";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import "./globals.css";
import { Header } from "../components/blocks/header";
import { Footer } from "../components/blocks/footer";

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
            defaultTheme="system"
            enableSystem
            storageKey="egress.theme"
            disableTransitionOnChange
          >
            <TooltipProvider
              delayDuration={10}
              skipDelayDuration={10}
              disableHoverableContent
            >
              <div className="flex w-full h-full min-h-full">
                <div className="relative flex w-full h-full flex-col">
                  <div className="relative flex w-full flex-col">
                    <Header />
                    <main className="flex-auto ">{children}</main>
                    <Footer />
                  </div>
                </div>
              </div>
            </TooltipProvider>
          </ThemeProvider>
        </SessionWrapper>
      </body>
    </html>
  );
}

//<div class="absolute inset-0 -z-10 h-full w-full bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)]"></div>

