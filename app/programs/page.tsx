import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  CircuitBoard,
  KeyRound,
  ShieldCheck,
} from "lucide-react";

export const metadata = {
  title: "Programs",
};

const programs = [
  {
    href: "/programs/official-accounts",
    icon: Building2,
    title: "Official accounts",
    label: "For companies",
    text: "Apply for a reviewed U-net presence, connect a miniapp or service, and message holders through scoped identities.",
  },
  {
    href: "/programs/attestation-type-studio",
    icon: CircuitBoard,
    title: "Attestation Type Studio",
    label: "For issuers and circuit teams",
    text: "Prepare new checks with reviewed predicate metadata, verification keys, circuit releases, and sample-proof validation.",
  },
];

const assurances = [
  "Companies never receive holder IDs, push tokens, or private keys.",
  "Sensitive account changes stay behind U-net admin review.",
  "New checks become selectable only after circuit release validation.",
];

export default function ProgramsPage() {
  return (
    <div>
      <section className="border-b border-white/10">
        <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6">
          <p className="text-sm font-medium text-teal-200">Programs</p>
          <h1 className="mt-3 max-w-4xl text-4xl font-semibold tracking-tight sm:text-5xl">
            Public entry points for companies, issuers, and U-net ecosystem
            builders.
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-muted-foreground">
            These pages explain how external organizations join U-net without
            turning the issuer gateway into the public website. Applications and
            reviewed releases start here, on Egress.
          </p>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6">
        <div className="grid gap-5 md:grid-cols-2">
          {programs.map((program) => (
            <Link
              key={program.href}
              href={program.href}
              className="group rounded-lg border border-white/10 bg-white/[0.03] p-6 transition hover:border-teal-300/30 hover:bg-white/[0.06]"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <program.icon className="size-7 text-teal-200" />
                  <p className="mt-5 text-sm text-muted-foreground">
                    {program.label}
                  </p>
                  <h2 className="mt-2 text-2xl font-semibold">
                    {program.title}
                  </h2>
                </div>
                <ArrowRight className="mt-1 size-5 text-muted-foreground transition group-hover:translate-x-1 group-hover:text-teal-200" />
              </div>
              <p className="mt-5 text-sm leading-6 text-muted-foreground">
                {program.text}
              </p>
            </Link>
          ))}
        </div>

        <div className="mt-12 rounded-lg border border-white/10 bg-white/[0.03] p-6">
          <div className="flex items-start gap-4">
            <ShieldCheck className="size-7 shrink-0 text-amber-200" />
            <div>
              <h2 className="text-xl font-semibold">Review before trust</h2>
              <p className="mt-3 max-w-3xl text-sm leading-6 text-muted-foreground">
                U-net integrations are designed to keep public discovery,
                company onboarding, and trust-sensitive activation separate.
              </p>
              <div className="mt-6 grid gap-3 md:grid-cols-3">
                {assurances.map((item) => (
                  <div
                    key={item}
                    className="rounded-md border border-white/10 bg-zinc-950/40 p-4 text-sm leading-6 text-muted-foreground"
                  >
                    <BadgeCheck className="mb-3 size-5 text-teal-200" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 flex items-center gap-3 text-sm text-muted-foreground">
          <KeyRound className="size-4 text-teal-200" />
          Provider API keys are issued only after approval and are scoped to one
          approved service or miniapp.
        </div>
      </section>
    </div>
  );
}
