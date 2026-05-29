import Link from "next/link";
import {
  Bell,
  Camera,
  CircleCheck,
  Database,
  FileText,
  KeyRound,
  LockKeyhole,
  Shield,
  UserRound,
} from "lucide-react";

export const metadata = {
  title: "Privacy Policy",
  description:
    "Privacy policy for Egress and the U-net mobile application, including data handling, permissions, security, and user choices.",
};

const summary = [
  {
    icon: UserRound,
    title: "No email or password account",
    text: "U-net uses a public U-net ID, display name, and device-held cryptographic keys instead of a traditional email and password login.",
  },
  {
    icon: LockKeyhole,
    title: "Private keys stay on device",
    text: "Holder keys, chat keys, and sensitive credential material are designed to stay in secure local storage on the user's device.",
  },
  {
    icon: Database,
    title: "Minimal server records",
    text: "Egress services store public profile data, scoped identity records, attestation metadata, verification session state, and encrypted message envelopes needed to operate U-net.",
  },
  {
    icon: Shield,
    title: "No sale of personal data",
    text: "Egress does not sell personal data and does not use the U-net mobile app to serve third-party advertising.",
  },
];

const dataRows = [
  {
    label: "Public profile",
    value:
      "Public U-net ID, display name, public holder key identifiers, registration and update timestamps.",
  },
  {
    label: "Scoped identity records",
    value:
      "Service or mini-program ID, origin, scoped user ID, granted or revoked permissions, notification categories, and related timestamps.",
  },
  {
    label: "Attestations and verification",
    value:
      "Attestation request status, issuer metadata, attestation hashes, predicate/check type, revocation status, verification session references, proof submission status, and result codes.",
  },
  {
    label: "Push notifications",
    value:
      "Firebase Cloud Messaging device token, holder routing reference, mini-program notification permissions, category state, and notification send audit status.",
  },
  {
    label: "Chat and official account messages",
    value:
      "Opaque mailbox or thread identifiers, encrypted message envelopes, sender public keys where required, nonces, timestamps, and delivery state. Message bodies are designed to remain encrypted from Egress servers.",
  },
  {
    label: "Diagnostics and security logs",
    value:
      "Request metadata, error codes, timestamps, service status, and security/audit events needed to operate, debug, and protect the service.",
  },
];

const permissionRows = [
  {
    icon: Camera,
    title: "Camera",
    text: "Used to scan U-net QR codes for verification, chat contact setup, and web login. Camera access is not used for advertising.",
  },
  {
    icon: KeyRound,
    title: "Biometrics and device security",
    text: "Used locally to confirm sensitive actions such as proof submission or login approval. Egress does not receive biometric templates.",
  },
  {
    icon: Bell,
    title: "Notifications",
    text: "Used for chat, service, security, or mini-program notifications when enabled. Users can revoke notification permissions and categories in the app.",
  },
];

const rights = [
  "Review connected services, mini-programs, scoped IDs, and granted permissions in the app.",
  "Revoke mini-program notification permissions or disconnect a scoped service.",
  "Delete locally stored credentials or attestations from the device.",
  "Request help with profile, server-side records, or deletion questions by contacting Egress.",
];

export default function PoliciesPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6">
      <div className="max-w-3xl">
        <p className="text-sm font-medium text-teal-200">
          Egress and U-net Privacy Policy
        </p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
          Privacy policy for U-net.
        </h1>
        <p className="mt-5 text-lg leading-8 text-muted-foreground">
          This page explains how Egress treats user and device data in the U-net
          mobile app, U-net web login flows, mini programs, verification flows,
          and related demo services.
        </p>
        <p className="mt-4 text-sm text-muted-foreground">
          Last updated: May 29, 2026
        </p>
      </div>

      <section className="mt-12 grid gap-4 md:grid-cols-2">
        {summary.map((item) => (
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

      <section className="mt-16 rounded-lg border border-white/10 bg-white/[0.03] p-6 sm:p-8">
        <div className="flex items-start gap-4">
          <FileText className="mt-1 size-6 shrink-0 text-teal-200" />
          <div>
            <h2 className="text-2xl font-semibold">Scope</h2>
            <p className="mt-4 text-sm leading-7 text-muted-foreground">
              This policy applies to Egress and the U-net mobile application,
              including U-net identity, verification, scoped login, mini-program,
              notification, attestation, and messaging features. It also covers
              Egress-hosted demo sites that are used to test those features.
              Third-party services and mini programs may have their own privacy
              policies for data they collect outside U-net.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-semibold">Data we process</h2>
        <div className="mt-5 overflow-hidden rounded-lg border border-white/10">
          {dataRows.map((row) => (
            <div
              key={row.label}
              className="grid gap-3 border-b border-white/10 bg-white/[0.03] p-5 last:border-b-0 md:grid-cols-[0.35fr_0.65fr]"
            >
              <h3 className="text-sm font-semibold text-foreground">
                {row.label}
              </h3>
              <p className="text-sm leading-6 text-muted-foreground">
                {row.value}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-16 grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
        <div>
          <h2 className="text-2xl font-semibold">How we use data</h2>
          <p className="mt-4 text-sm leading-7 text-muted-foreground">
            Egress uses data to create and resolve U-net profiles, connect users
            to scoped services, issue and verify attestations, route encrypted
            messages, send permitted notifications, prevent replay or abuse,
            debug service reliability, and comply with platform or legal
            obligations.
          </p>
          <p className="mt-4 text-sm leading-7 text-muted-foreground">
            U-net is designed to avoid sharing a user&apos;s public U-net ID,
            device push token, private keys, raw credentials, or unnecessary
            personal details with mini programs or third-party services.
          </p>
        </div>
        <div className="grid gap-4">
          {permissionRows.map((item) => (
            <div
              key={item.title}
              className="rounded-lg border border-white/10 bg-white/[0.03] p-5"
            >
              <item.icon className="size-5 text-teal-200" />
              <h3 className="mt-4 text-lg font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-16 grid gap-6 md:grid-cols-2">
        <div className="rounded-lg border border-white/10 bg-white/[0.03] p-6">
          <h2 className="text-2xl font-semibold">Sharing and third parties</h2>
          <p className="mt-4 text-sm leading-7 text-muted-foreground">
            Egress does not sell personal data. We may use infrastructure
            providers, hosting providers, Google Play, Firebase Cloud Messaging,
            and other operational processors to run the service. Mini programs
            and external services receive only the scoped IDs, permission state,
            verification results, or assertions needed for the action the user
            approved.
          </p>
        </div>
        <div className="rounded-lg border border-white/10 bg-white/[0.03] p-6">
          <h2 className="text-2xl font-semibold">Retention</h2>
          <p className="mt-4 text-sm leading-7 text-muted-foreground">
            Local keys, credentials, and app records remain on the device until
            the user removes them, disconnects a service, clears app data, or
            uninstalls the app. Server-side records are kept for as long as they
            are needed to provide profile, attestation, verification,
            notification, security, audit, and abuse-prevention functionality.
          </p>
        </div>
      </section>

      <section className="mt-16 rounded-lg border border-white/10 bg-white/[0.03] p-6 sm:p-8">
        <div className="flex items-start gap-4">
          <CircleCheck className="mt-1 size-6 shrink-0 text-teal-200" />
          <div>
            <h2 className="text-2xl font-semibold">User choices</h2>
            <div className="mt-5 grid gap-3">
              {rights.map((right) => (
                <p
                  key={right}
                  className="text-sm leading-6 text-muted-foreground"
                >
                  {right}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mt-16 grid gap-6 md:grid-cols-2">
        <div>
          <h2 className="text-2xl font-semibold">Children</h2>
          <p className="mt-4 text-sm leading-7 text-muted-foreground">
            U-net is not directed to children under 13. Egress does not knowingly
            collect personal data from children under 13. If you believe a child
            has provided data through U-net, contact us so we can review and
            remove it where appropriate.
          </p>
        </div>
        <div>
          <h2 className="text-2xl font-semibold">Security</h2>
          <p className="mt-4 text-sm leading-7 text-muted-foreground">
            U-net uses local device key storage, biometric confirmation where
            available, scoped identifiers, encrypted transport, encrypted
            message bodies for secure chat features, replay-prevention metadata,
            and permission checks. No system is perfect, so Egress continues to
            harden the platform as features mature.
          </p>
        </div>
      </section>

      <section className="mt-16 rounded-lg border border-teal-300/20 bg-teal-300/10 p-6 sm:p-8">
        <h2 className="text-2xl font-semibold">Contact</h2>
        <p className="mt-4 text-sm leading-7 text-muted-foreground">
          For privacy questions, deletion requests, security concerns, or Play
          Store data-safety questions, contact Egress at{" "}
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
