import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Blocks,
  Fingerprint,
  MessageSquareLock,
  ScanLine,
  ShieldCheck,
} from "lucide-react";

const capabilities = [
  {
    icon: Fingerprint,
    title: "Scoped identities",
    text: "Services receive a service-specific identity instead of the holder's global U-net identity.",
  },
  {
    icon: ShieldCheck,
    title: "Attestation checks",
    text: "Holders can prove claims such as age or citizenship without handing over raw documents.",
  },
  {
    icon: Blocks,
    title: "Mini programs",
    text: "Web apps can run inside U-net with bridge-controlled identity, permissions, and verification flows.",
  },
  {
    icon: MessageSquareLock,
    title: "Secure messaging",
    text: "Human chat is moving toward pairwise encrypted channels with minimal server-visible metadata.",
  },
  {
    icon: ScanLine,
    title: "QR login and verification",
    text: "Browsers and services can request U-net login or checkout-bound verification through compact QR flows.",
  },
];

export const metadata = {
  title: "U-net",
};

export default function UnetPage() {
  return (
    <div>
      <section className="border-b border-white/10">
        <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6">
          <p className="inline-flex rounded-md border border-teal-300/20 bg-teal-300/10 px-3 py-1 text-sm text-teal-100">
            Active project
          </p>
          <div className="mt-6 flex flex-col gap-6 sm:flex-row sm:items-center">
            <div className="flex size-24 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-black/30 p-3">
              <Image
                src="/logos/unet-logo.png"
                alt="U-net logo"
                width={88}
                height={88}
                className="h-full w-full object-contain"
                priority
              />
            </div>
            <h1 className="max-w-4xl text-4xl font-semibold tracking-tight sm:text-6xl">
              U-net is a privacy-first network for identity, verification, apps,
              and trusted messaging.
            </h1>
          </div>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">
            The platform is designed around scoped identities, holder-controlled
            permissions, zero-knowledge proof flows, and developer-facing SDKs
            that make privacy-preserving integrations easier to adopt.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/company"
              className="inline-flex h-11 items-center justify-center rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground transition hover:bg-primary/90"
            >
              About Egress <ArrowRight className="ml-2 size-4" />
            </Link>
            <Link
              href="/policies"
              className="inline-flex h-11 items-center justify-center rounded-md border border-white/15 px-6 text-sm font-medium transition hover:bg-white/10"
            >
              Read policies
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {capabilities.map((item) => (
            <div
              key={item.title}
              className="rounded-lg border border-white/10 bg-white/[0.03] p-6"
            >
              <item.icon className="size-6 text-teal-200" />
              <h2 className="mt-5 text-lg font-semibold">{item.title}</h2>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
