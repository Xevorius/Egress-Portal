import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { OfficialAccountApplicationForm } from "./OfficialAccountApplicationForm";

export const metadata = {
  title: "Apply For Official Account",
};

export default function OfficialAccountApplyPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6">
      <Link
        href="/programs/official-accounts"
        className="inline-flex items-center text-sm text-muted-foreground transition hover:text-foreground"
      >
        <ArrowLeft className="mr-2 size-4" />
        Official accounts
      </Link>
      <div className="mt-8 max-w-3xl">
        <p className="text-sm font-medium text-teal-200">Application</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
          Apply for a U-net official account.
        </h1>
        <p className="mt-5 text-lg leading-8 text-muted-foreground">
          This is the public company-facing entry point on Egress. The
          application is stored in U-net trust-plane for review, but companies
          do not need to visit the issuer gateway directly.
        </p>
      </div>
      <div className="mt-12">
        <OfficialAccountApplicationForm />
      </div>
    </div>
  );
}
