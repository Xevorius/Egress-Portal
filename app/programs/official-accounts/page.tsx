import Link from "next/link";
import {
  ArrowRight,
  Bell,
  Building2,
  CheckCircle2,
  FileCheck2,
  KeyRound,
  MessageSquareText,
  PencilLine,
} from "lucide-react";

export const metadata = {
  title: "Official Accounts",
};

const steps = [
  {
    icon: Building2,
    title: "Company application",
    text: "Submit legal company details, support URLs, policy links, official account profile fields, and an optional service or miniapp proposal.",
  },
  {
    icon: FileCheck2,
    title: "U-net review",
    text: "Egress reviews ownership, origin, manifest, requested permissions, notification categories, and profile trust signals before activation.",
  },
  {
    icon: KeyRound,
    title: "Scoped provider access",
    text: "Approved providers receive scoped API credentials. Provider sends are addressed by miniProgramId plus scopedUserId, never by holder identity.",
  },
  {
    icon: MessageSquareText,
    title: "Official account thread",
    text: "Messages are routed into the U-net chat tab as an official account thread, governed by the holder's scoped permission ledger.",
  },
];

const editable = [
  "Description",
  "Category",
  "Support URL",
  "Privacy policy URL",
  "Terms URL",
  "Notification category labels",
];

const reviewed = [
  "Display name",
  "Logo or icon",
  "Legal company identity",
  "Service origin",
  "Launch URL",
  "Miniapp permissions",
];

export default function OfficialAccountsPage() {
  return (
    <div>
      <section className="border-b border-white/10">
        <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6">
          <p className="inline-flex rounded-md border border-teal-300/20 bg-teal-300/10 px-3 py-1 text-sm text-teal-100">
            Official accounts
          </p>
          <h1 className="mt-6 max-w-4xl text-4xl font-semibold tracking-tight sm:text-5xl">
            A reviewed path for organizations to appear inside U-net.
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-muted-foreground">
            Official accounts let approved companies connect a miniapp or web
            service, receive scoped identities, and communicate through U-net
            without receiving global holder IDs or device tokens.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/programs/official-accounts/apply"
              className="inline-flex h-11 items-center justify-center rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground transition hover:bg-primary/90"
            >
              Apply for review <ArrowRight className="ml-2 size-4" />
            </Link>
            <Link
              href="/programs/attestation-type-studio"
              className="inline-flex h-11 items-center justify-center rounded-md border border-white/15 px-6 text-sm font-medium transition hover:bg-white/10"
            >
              Attestation Type Studio
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => (
            <div
              key={step.title}
              className="rounded-lg border border-white/10 bg-white/[0.03] p-6"
            >
              <step.icon className="size-6 text-teal-200" />
              <h2 className="mt-5 text-lg font-semibold">{step.title}</h2>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                {step.text}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          <div className="rounded-lg border border-white/10 bg-white/[0.03] p-6">
            <PencilLine className="size-6 text-teal-200" />
            <h2 className="mt-5 text-xl font-semibold">Safe live edits</h2>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              Approved providers can keep non-sensitive information current
              without waiting for a full review.
            </p>
            <div className="mt-6 grid gap-2 sm:grid-cols-2">
              {editable.map((item) => (
                <span
                  key={item}
                  className="inline-flex items-center gap-2 rounded-md border border-white/10 bg-zinc-950/40 px-3 py-2 text-sm text-muted-foreground"
                >
                  <CheckCircle2 className="size-4 text-teal-200" />
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-lg border border-white/10 bg-white/[0.03] p-6">
            <Bell className="size-6 text-amber-200" />
            <h2 className="mt-5 text-xl font-semibold">
              Review-gated changes
            </h2>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              Changes that affect trust, origin, ownership, or permissions are
              queued for U-net admin review before they become active.
            </p>
            <div className="mt-6 grid gap-2 sm:grid-cols-2">
              {reviewed.map((item) => (
                <span
                  key={item}
                  className="inline-flex items-center gap-2 rounded-md border border-white/10 bg-zinc-950/40 px-3 py-2 text-sm text-muted-foreground"
                >
                  <FileCheck2 className="size-4 text-amber-200" />
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
