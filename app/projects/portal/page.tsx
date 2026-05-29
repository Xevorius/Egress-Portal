import Image from "next/image";
import { MonitorSmartphone, Route, Sparkles } from "lucide-react";

export const metadata = {
  title: "Portal",
};

const notes = [
  {
    icon: MonitorSmartphone,
    title: "Remote environments",
    text: "Portal explored remote operating environments and device flexibility.",
  },
  {
    icon: Route,
    title: "Product direction",
    text: "The lessons from Portal fed into U-net's focus on access, identity, and trust boundaries.",
  },
  {
    icon: Sparkles,
    title: "Sunset status",
    text: "Portal is no longer the primary Egress product and is kept here for context.",
  },
];

export default function PortalPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6">
      <p className="inline-flex rounded-md border border-amber-300/20 bg-amber-300/10 px-3 py-1 text-sm text-amber-100">
        Sunset project
      </p>
      <div className="mt-6 grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
        <div>
          <div className="flex size-24 items-center justify-center rounded-lg border border-white/10 bg-black/30 p-3">
            <Image
              src="/logos/portal-logo.png"
              alt="Portal logo"
              width={88}
              height={88}
              className="h-full w-full object-contain"
              priority
            />
          </div>
          <h1 className="mt-6 text-4xl font-semibold tracking-tight sm:text-6xl">
            Portal is part of the Egress archive.
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Portal helped shape Egress&apos; early thinking about remote
            workspaces, operating systems, and access from any device. The
            company&apos;s current active build is U-net.
          </p>
        </div>
        <div className="grid gap-4">
          {notes.map((item) => (
            <div
              key={item.title}
              className="rounded-lg border border-white/10 bg-white/[0.03] p-6"
            >
              <item.icon className="size-6 text-amber-200" />
              <h2 className="mt-5 text-lg font-semibold">{item.title}</h2>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
