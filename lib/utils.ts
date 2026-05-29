import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const navItems = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/company", label: "Company" },
  { href: "/policies", label: "Policies" },
];

export const projects = [
  {
    name: "U-net",
    href: "/projects/unet",
    logo: "/logos/unet-logo.png",
    status: "Active build",
    summary:
      "A privacy-first identity, verification, miniapp, and messaging system built around scoped identities and zero-knowledge proofs.",
    focus: ["Scoped sign-in", "Attestation checks", "Mini programs"],
  },
  {
    name: "Portal",
    href: "/projects/portal",
    logo: "/logos/portal-logo.png",
    status: "Sunset project",
    summary:
      "The remote operating environment that shaped Egress' early product thinking and is now preserved as a sunset project.",
    focus: ["Remote workspaces", "Device flexibility", "Legacy learnings"],
  },
];
