import type { Metadata } from "next";

import { Footer } from "@/components/blocks/footer";
import { Header } from "@/components/blocks/header";


export default function WebsiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="relative flex w-full flex-col">
        <Header />
        <main className="flex-auto ">{children}</main>
        <Footer />
      </div>
    </>
  );
}

//<div class="absolute inset-0 -z-10 h-full w-full bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)]"></div>