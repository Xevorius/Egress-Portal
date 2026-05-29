import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Archive,
  BadgeCheck,
  Fingerprint,
  LockKeyhole,
  Network,
  ShieldCheck,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { projects } from "@/lib/utils";

const principles = [
  {
    icon: Fingerprint,
    title: "Identity without overexposure",
    text: "U-net focuses on scoped identities, selective disclosure, and proof flows that keep personal data out of places it does not belong.",
  },
  {
    icon: ShieldCheck,
    title: "Verification as infrastructure",
    text: "Attestations, zero-knowledge checks, and developer SDKs are treated as reusable building blocks instead of one-off integrations.",
  },
  {
    icon: Network,
    title: "Open surfaces for builders",
    text: "Mini programs, web login, and public API contracts make it easier for external services to integrate U-net without rebuilding the stack.",
  },
];

export default function Home() {
  const unet = projects.find((project) => project.name === "U-net");
  const portal = projects.find((project) => project.name === "Portal");

  return (
    <div>
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(20,184,166,0.18),transparent_28%),radial-gradient(circle_at_82%_10%,rgba(251,191,36,0.12),transparent_25%)]" />
        <div className="relative mx-auto grid min-h-[calc(100vh-4rem)] w-full max-w-6xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <p className="mb-5 inline-flex rounded-md border border-teal-300/20 bg-teal-300/10 px-3 py-1 text-sm text-teal-100">
              Egress builds privacy-first network technology.
            </p>
            <h1 className="max-w-3xl text-5xl font-semibold tracking-tight text-foreground sm:text-6xl lg:text-7xl">
              Trust infrastructure for apps that should not need your whole life.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
              Egress is the company behind U-net, a system for scoped identity,
              attestation-backed verification, mini programs, secure messaging,
              and developer SDKs.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg">
                <Link href="/projects/unet">
                  Explore U-net <ArrowRight className="ml-2 size-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/projects">View all projects</Link>
              </Button>
            </div>
          </div>

          <div className="relative">
            <div className="grid gap-3 rounded-lg border border-white/10 bg-white/[0.04] p-4 shadow-2xl shadow-black/30 backdrop-blur">
              <div className="rounded-md border border-teal-300/20 bg-teal-300/10 p-5">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="flex size-16 items-center justify-center rounded-lg border border-white/10 bg-black/30 p-2">
                      <Image
                        src="/logos/unet-logo.png"
                        alt="U-net logo"
                        width={56}
                        height={56}
                        className="h-full w-full object-contain"
                        priority
                      />
                    </div>
                    <div>
                    <p className="text-sm text-teal-100">Active project</p>
                    <h2 className="mt-2 text-3xl font-semibold">{unet?.name}</h2>
                    </div>
                  </div>
                  <BadgeCheck className="size-8 text-teal-200" />
                </div>
                <p className="mt-4 text-sm leading-6 text-muted-foreground">
                  {unet?.summary}
                </p>
              </div>
              <div className="grid gap-3 sm:grid-cols-3">
                {unet?.focus.map((item) => (
                  <div
                    key={item}
                    className="rounded-md border border-white/10 bg-zinc-950/50 p-4 text-sm text-muted-foreground"
                  >
                    {item}
                  </div>
                ))}
              </div>
              <div className="rounded-md border border-amber-300/20 bg-amber-300/10 p-5">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="flex size-14 items-center justify-center rounded-lg border border-white/10 bg-black/30 p-2">
                      <Image
                        src="/logos/portal-logo.png"
                        alt="Portal logo"
                        width={48}
                        height={48}
                        className="h-full w-full object-contain"
                      />
                    </div>
                    <div>
                    <p className="text-sm text-amber-100">Sunset project</p>
                    <h2 className="mt-2 text-2xl font-semibold">{portal?.name}</h2>
                    </div>
                  </div>
                  <Archive className="size-7 text-amber-200" />
                </div>
                <p className="mt-4 text-sm leading-6 text-muted-foreground">
                  {portal?.summary}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6">
        <div className="max-w-2xl">
          <p className="text-sm font-medium text-teal-200">What Egress works on</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            Less data collected. Stronger guarantees exchanged.
          </h2>
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {principles.map((item) => (
            <div
              key={item.title}
              className="rounded-lg border border-white/10 bg-white/[0.03] p-6"
            >
              <item.icon className="size-6 text-teal-200" />
              <h3 className="mt-5 text-lg font-semibold">{item.title}</h3>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-white/10 bg-white/[0.03]">
        <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-16 sm:px-6 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <LockKeyhole className="size-8 text-amber-200" />
            <h2 className="mt-5 text-3xl font-semibold tracking-tight">
              Public information, not product theater.
            </h2>
          </div>
          <div className="grid gap-4 text-sm leading-7 text-muted-foreground sm:grid-cols-2">
            <p>
              This site is the public home for Egress, project context, policies,
              and developer-facing notes. Operational product surfaces live in
              their own apps and services.
            </p>
            <p>
              U-net is the current build. Portal remains part of the story, but
              it now belongs in the archive as a sunset project that informed the
              company&apos;s direction.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
