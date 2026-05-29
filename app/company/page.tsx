import { Eye, Handshake, LockKeyhole, Wrench } from "lucide-react";

export const metadata = {
  title: "Company",
};

const values = [
  {
    icon: LockKeyhole,
    title: "Minimize central knowledge",
    text: "Systems should collect less and still make strong decisions.",
  },
  {
    icon: Handshake,
    title: "Make consent visible",
    text: "People should understand when an app, service, or verifier gets a new permission.",
  },
  {
    icon: Wrench,
    title: "Ship developer primitives",
    text: "A privacy network works best when builders can integrate it with normal web tooling.",
  },
  {
    icon: Eye,
    title: "Treat demos as pressure tests",
    text: "The public demos are designed to reveal weak spots before the architecture is trusted at scale.",
  },
];

export default function CompanyPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6">
      <div className="max-w-3xl">
        <p className="text-sm font-medium text-teal-200">Company</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
          Egress builds technology for private, verifiable interaction.
        </h1>
        <p className="mt-5 text-lg leading-8 text-muted-foreground">
          The company is focused on U-net: a network for scoped identities,
          attestation-backed checks, mini programs, secure messages, and public
          SDKs. The work is practical, but the principle is simple: trust should
          not require unnecessary disclosure.
        </p>
      </div>

      <div className="mt-12 grid gap-4 md:grid-cols-2">
        {values.map((item) => (
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
      </div>
    </div>
  );
}
