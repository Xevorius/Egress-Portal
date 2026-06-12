import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  CircuitBoard,
  FileJson2,
  FlaskConical,
  GitBranch,
  ShieldCheck,
} from "lucide-react";

export const metadata = {
  title: "Attestation Type Studio",
};

const releaseChecks = [
  "Unique requestType, predicateId, circuitId, and vkId",
  "Required public inputs include nullifier, nonce, and predicate",
  "Verification key hash matches uploaded VK bytes",
  "Proof format and proof encoding are supported by current verifier",
  "A sample proof bundle passes before activation",
];

const lifecycle = [
  {
    icon: FileJson2,
    title: "Describe the check",
    text: "Define the request type, predicate, label, category, consent text, issuer eligibility notes, and public user-facing metadata.",
  },
  {
    icon: CircuitBoard,
    title: "Stage the circuit release",
    text: "Upload the release manifest, verification key metadata, public input order, proof shape, artifact hash, and supported backend details.",
  },
  {
    icon: FlaskConical,
    title: "Validate with a sample proof",
    text: "Activation requires a passing sample proof bundle so a new check cannot silently enter the catalog with a mismatched prover or VK.",
  },
  {
    icon: GitBranch,
    title: "Publish dynamically",
    text: "Active releases appear through the check catalog without hardcoding a new check combination in the U-net app.",
  },
];

const sampleManifest = `{
  "requestType": "student_status",
  "predicateId": "student_status",
  "manifest": {
    "circuitId": "student_status_v1",
    "vkId": "student_status_v1_vk_2026_06",
    "proofFormat": "noir-barretenberg-v1",
    "verificationKeySha256": "...",
    "publicInputOrder": ["nullifier", "nonce", "predicate"],
    "oracleHash": "poseidon2",
    "proofEncoding": "bb_binary_proof_with_public_inputs_prefix",
    "expectedProofShape": { "strippedLimbs": 500 },
    "sampleProofVerified": true
  }
}`;

export default function AttestationTypeStudioPage() {
  return (
    <div>
      <section className="border-b border-white/10">
        <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6">
          <p className="inline-flex rounded-md border border-amber-300/20 bg-amber-300/10 px-3 py-1 text-sm text-amber-100">
            Attestation Type Studio
          </p>
          <h1 className="mt-6 max-w-4xl text-4xl font-semibold tracking-tight sm:text-5xl">
            A reviewed release path for new U-net checks and ZK circuits.
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-muted-foreground">
            The studio separates product metadata from trust-sensitive circuit
            activation. A new attestation type becomes selectable only after its
            release manifest, VK, proof shape, and sample proof are reviewed.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/programs/official-accounts"
              className="inline-flex h-11 items-center justify-center rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground transition hover:bg-primary/90"
            >
              Official accounts <ArrowRight className="ml-2 size-4" />
            </Link>
            <a
              href="mailto:tim.is@live.nl?subject=U-net attestation type proposal"
              className="inline-flex h-11 items-center justify-center rounded-md border border-white/15 px-6 text-sm font-medium transition hover:bg-white/10"
            >
              Propose a check
            </a>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {lifecycle.map((item) => (
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

        <div className="mt-12 grid gap-5 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="rounded-lg border border-white/10 bg-white/[0.03] p-6">
            <ShieldCheck className="size-6 text-amber-200" />
            <h2 className="mt-5 text-xl font-semibold">Activation gates</h2>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              These checks protect the catalog from verifier/prover drift and
              stop inactive experiments from appearing in production check
              selection.
            </p>
            <div className="mt-6 grid gap-3">
              {releaseChecks.map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3 rounded-md border border-white/10 bg-zinc-950/40 p-4 text-sm leading-6 text-muted-foreground"
                >
                  <BadgeCheck className="mt-0.5 size-4 shrink-0 text-teal-200" />
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-lg border border-white/10 bg-zinc-950/70 p-6">
            <div className="flex items-center gap-3">
              <FileJson2 className="size-5 text-teal-200" />
              <h2 className="text-xl font-semibold">Release manifest shape</h2>
            </div>
            <pre className="mt-5 overflow-x-auto rounded-md border border-white/10 bg-black/50 p-4 text-xs leading-6 text-teal-50">
              <code>{sampleManifest}</code>
            </pre>
          </div>
        </div>
      </section>
    </div>
  );
}
