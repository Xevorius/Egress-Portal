"use client";

import { FormEvent, useMemo, useState } from "react";
import { CheckCircle2, Loader2, Send, XCircle } from "lucide-react";

type SubmitState =
  | { kind: "idle" }
  | { kind: "submitting" }
  | { kind: "success"; applicationId: string }
  | { kind: "error"; message: string };

function splitList(value: FormDataEntryValue | null) {
  return String(value ?? "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function getString(form: FormData, key: string) {
  return String(form.get(key) ?? "").trim();
}

export function OfficialAccountApplicationForm() {
  const [state, setState] = useState<SubmitState>({ kind: "idle" });

  const statusHref = useMemo(() => {
    if (state.kind !== "success") return null;
    return `/api/official-account-applications/${encodeURIComponent(state.applicationId)}`;
  }, [state]);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState({ kind: "submitting" });

    const form = new FormData(event.currentTarget);
    const serviceId = getString(form, "serviceId");

    const payload = {
      legal: {
        legalName: getString(form, "legalName"),
        registrationNumber: getString(form, "registrationNumber"),
        legalAddress: getString(form, "legalAddress"),
        contactEmail: getString(form, "contactEmail"),
        website: getString(form, "website"),
        privacyPolicyUrl: getString(form, "privacyPolicyUrl"),
        termsUrl: getString(form, "termsUrl"),
      },
      profile: {
        displayName: getString(form, "displayName"),
        providerName: getString(form, "providerName"),
        logoUrl: getString(form, "logoUrl"),
        description: getString(form, "description"),
        category: getString(form, "category") || "service",
        supportUrl: getString(form, "supportUrl"),
        notificationCategories: splitList(form.get("notificationCategories")),
      },
      ...(serviceId
        ? {
            serviceProposal: {
              serviceId,
              origin: getString(form, "origin"),
              launchUrl: getString(form, "launchUrl"),
              manifestUrl: getString(form, "manifestUrl"),
            },
          }
        : {}),
    };

    try {
      const response = await fetch("/api/official-account-applications", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });
      const body = await response.json();

      if (!response.ok || !body.success) {
        setState({
          kind: "error",
          message: body.message ?? "The application could not be submitted.",
        });
        return;
      }

      setState({
        kind: "success",
        applicationId: body.application.applicationId,
      });
      event.currentTarget.reset();
    } catch (error) {
      setState({
        kind: "error",
        message: error instanceof Error ? error.message : "Network error.",
      });
    }
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-8">
      <fieldset className="rounded-lg border border-white/10 bg-white/[0.03] p-6">
        <legend className="px-2 text-sm font-medium text-teal-200">
          Legal review
        </legend>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <Field label="Legal company name" name="legalName" required />
          <Field label="Registration number" name="registrationNumber" required />
          <Field label="Contact email" name="contactEmail" type="email" required />
          <Field label="Website" name="website" type="url" required />
          <Field
            label="Privacy policy URL"
            name="privacyPolicyUrl"
            type="url"
            required
          />
          <Field label="Terms URL" name="termsUrl" type="url" required />
          <Field
            label="Legal address"
            name="legalAddress"
            required
            textarea
            className="md:col-span-2"
          />
        </div>
      </fieldset>

      <fieldset className="rounded-lg border border-white/10 bg-white/[0.03] p-6">
        <legend className="px-2 text-sm font-medium text-teal-200">
          Official account profile
        </legend>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <Field label="Display name" name="displayName" required />
          <Field label="Provider name" name="providerName" required />
          <Field label="Logo URL" name="logoUrl" type="url" />
          <Field label="Category" name="category" placeholder="service" />
          <Field label="Support URL" name="supportUrl" type="url" />
          <Field
            label="Notification categories"
            name="notificationCategories"
            placeholder="service, security, marketing"
          />
          <Field
            label="Description"
            name="description"
            textarea
            className="md:col-span-2"
          />
        </div>
      </fieldset>

      <fieldset className="rounded-lg border border-white/10 bg-white/[0.03] p-6">
        <legend className="px-2 text-sm font-medium text-amber-200">
          Optional miniapp or web service
        </legend>
        <p className="mt-4 text-sm leading-6 text-muted-foreground">
          Add this if the official account should also activate a U-net miniapp
          or web login service. The origin and manifest are reviewed before
          they become visible in U-net.
        </p>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <Field label="Service ID" name="serviceId" placeholder="example-provider" />
          <Field label="Origin" name="origin" type="url" placeholder="https://example.com" />
          <Field label="Launch URL" name="launchUrl" type="url" />
          <Field label="Manifest URL" name="manifestUrl" type="url" />
        </div>
      </fieldset>

      <div className="flex flex-col gap-4 rounded-lg border border-white/10 bg-zinc-950/40 p-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="text-sm leading-6 text-muted-foreground">
          Submitting sends this application to U-net review. Approval is not
          automatic.
        </div>
        <button
          type="submit"
          disabled={state.kind === "submitting"}
          className="inline-flex h-11 items-center justify-center rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {state.kind === "submitting" ? (
            <Loader2 className="mr-2 size-4 animate-spin" />
          ) : (
            <Send className="mr-2 size-4" />
          )}
          Submit application
        </button>
      </div>

      {state.kind === "success" && (
        <div className="rounded-lg border border-teal-300/20 bg-teal-300/10 p-5 text-sm leading-6 text-teal-50">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-teal-200" />
            <div>
              Application submitted. Keep this reference:
              <span className="ml-2 font-mono">{state.applicationId}</span>
              {statusHref ? (
                <a
                  href={statusHref}
                  className="ml-3 underline underline-offset-4"
                  target="_blank"
                  rel="noreferrer"
                >
                  View raw status
                </a>
              ) : null}
            </div>
          </div>
        </div>
      )}

      {state.kind === "error" && (
        <div className="rounded-lg border border-red-300/20 bg-red-300/10 p-5 text-sm leading-6 text-red-50">
          <div className="flex items-start gap-3">
            <XCircle className="mt-0.5 size-5 shrink-0 text-red-200" />
            <div>{state.message}</div>
          </div>
        </div>
      )}
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
  required,
  textarea,
  className = "",
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  textarea?: boolean;
  className?: string;
}) {
  const inputClass =
    "mt-2 w-full rounded-md border border-white/10 bg-zinc-950/60 px-3 py-2 text-sm outline-none transition placeholder:text-muted-foreground/60 focus:border-teal-300/50 focus:ring-2 focus:ring-teal-300/10";

  return (
    <label className={`block text-sm text-muted-foreground ${className}`}>
      {label}
      {textarea ? (
        <textarea
          name={name}
          placeholder={placeholder}
          required={required}
          rows={4}
          className={inputClass}
        />
      ) : (
        <input
          name={name}
          type={type}
          placeholder={placeholder}
          required={required}
          className={inputClass}
        />
      )}
    </label>
  );
}
