import Link from "next/link";
import { Building2, FileText, LockKeyhole, ShieldCheck } from "lucide-react";

export const metadata = {
  title: "Policies",
  description:
    "Company-level policy information for Egress. Product-specific U-net policies live on the U-net website.",
};

const cards = [
  {
    icon: Building2,
    title: "Company site",
    text: "This website is the public information surface for Egress as a technology company: company context, team information, and project references.",
  },
  {
    icon: ShieldCheck,
    title: "Product policies",
    text: "U-net-specific privacy, legal, partner, and verification policies now live with the U-net product website.",
  },
  {
    icon: LockKeyhole,
    title: "Data minimization",
    text: "Egress projects are designed around collecting less data and keeping operational surfaces separated by product and purpose.",
  },
];

export default function PoliciesPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6">
      <div className="max-w-3xl">
        <p className="text-sm font-medium text-teal-200">Policies</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
          Egress company policies.
        </h1>
        <p className="mt-5 text-lg leading-8 text-muted-foreground">
          This page covers the company-level Egress website. U-net product
          policy, mobile app privacy, partner onboarding, and developer terms
          live on the dedicated U-net site.
        </p>
      </div>

      <section className="mt-12 grid gap-4 md:grid-cols-3">
        {cards.map((item) => (
          <div
            key={item.title}
            className="rounded-lg border border-white/10 bg-white/[0.03] p-6"
          >
            <item.icon className="size-6 text-teal-200" />
            <h2 className="mt-5 text-xl font-semibold">{item.title}</h2>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              {item.text}
            </p>
          </div>
        ))}
      </section>

      <section className="mt-12 rounded-lg border border-teal-300/20 bg-teal-300/10 p-6 sm:p-8">
        <FileText className="size-6 text-teal-200" />
        <h2 className="mt-5 text-2xl font-semibold">U-net policy moved</h2>
        <p className="mt-4 text-sm leading-7 text-muted-foreground">
          For U-net mobile app privacy, scoped identity, verification,
          miniapp, official account, and developer policy information, use the
          U-net policy page.
        </p>
        <Link
          href="https://unet.egress.live/privacy"
          className="mt-6 inline-flex rounded-md bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition hover:bg-primary/90"
        >
          Open U-net privacy policy
        </Link>
      </section>

      <section className="mt-12 rounded-lg border border-white/10 bg-white/[0.03] p-6 sm:p-8">
        <h2 className="text-2xl font-semibold">Contact</h2>
        <p className="mt-4 text-sm leading-7 text-muted-foreground">
          For company policy questions, contact{" "}
          <Link
            href="mailto:privacy@egress.live"
            className="text-teal-100 underline underline-offset-4"
          >
            privacy@egress.live
          </Link>
          .
        </p>
      </section>
    </div>
  );
}
