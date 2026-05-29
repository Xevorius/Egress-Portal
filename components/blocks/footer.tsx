import Link from "next/link";

import { ThemeToggle } from "@/components/blocks/theme-toggle";
import { navItems } from "@/lib/utils";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-zinc-950/40">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-10 sm:px-6 md:flex-row md:items-end md:justify-between">
        <div className="max-w-md">
          <Link href="/" className="inline-flex items-center gap-3">
            <span className="text-sm font-semibold tracking-wide">Egress</span>
          </Link>
          <p className="mt-4 text-sm leading-6 text-muted-foreground">
            Building privacy-first identity, verification, and developer tooling
            for products that need stronger trust with less personal data.
          </p>
        </div>

        <div className="flex flex-col gap-5 sm:items-end">
          <nav className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="transition hover:text-foreground"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>© {new Date().getFullYear()} Egress</span>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </footer>
  );
}
