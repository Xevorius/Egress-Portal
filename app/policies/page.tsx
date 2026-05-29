import { FileText, KeyRound, Scale, Shield } from "lucide-react";

export const metadata = {
  title: "Policies",
};

const policies = [
  {
    icon: Shield,
    title: "Privacy posture",
    text: "Egress products are designed to avoid central storage of private user data where scoped identities or proofs can do the job.",
  },
  {
    icon: KeyRound,
    title: "Security posture",
    text: "Sensitive actions should be bound to local device keys, explicit consent, and short-lived proofs rather than passwords alone.",
  },
  {
    icon: FileText,
    title: "Public information",
    text: "This website is intentionally limited to company, project, and policy information. Product operations belong in dedicated services.",
  },
  {
    icon: Scale,
    title: "Responsible demos",
    text: "Demo systems are clearly separated from production claims and are used to harden the architecture before broader rollout.",
  },
];

export default function PoliciesPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6">
      <div className="max-w-3xl">
        <p className="text-sm font-medium text-teal-200">Policies</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
          The public rules of the road.
        </h1>
        <p className="mt-5 text-lg leading-8 text-muted-foreground">
          These notes are an early public policy surface for Egress and U-net.
          They explain the direction of the company without pretending the demo
          stack is a finished legal or compliance program.
        </p>
      </div>

      <div className="mt-12 grid gap-4 md:grid-cols-2">
        {policies.map((item) => (
          <section
            key={item.title}
            className="rounded-lg border border-white/10 bg-white/[0.03] p-6"
          >
            <item.icon className="size-6 text-teal-200" />
            <h2 className="mt-5 text-xl font-semibold">{item.title}</h2>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              {item.text}
            </p>
          </section>
        ))}
      </div>
    </div>
  );
}
