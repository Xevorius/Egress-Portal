import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CircleDot } from "lucide-react";

import { projects } from "@/lib/utils";

export const metadata = {
  title: "Projects",
};

export default function ProjectsPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6">
      <div className="max-w-3xl">
        <p className="text-sm font-medium text-teal-200">Projects</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
          Current work and archived experiments.
        </h1>
        <p className="mt-5 text-lg leading-8 text-muted-foreground">
          Egress keeps the public project surface small and understandable:
          U-net is the active platform, while Portal is preserved as a sunset
          project.
        </p>
      </div>

      <div className="mt-12 grid gap-5 md:grid-cols-2">
        {projects.map((project) => (
          <Link
            key={project.name}
            href={project.href}
            className="group rounded-lg border border-white/10 bg-white/[0.03] p-6 transition hover:border-teal-300/30 hover:bg-white/[0.06]"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="flex size-16 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-black/30 p-2">
                  <Image
                    src={project.logo}
                    alt={`${project.name} logo`}
                    width={56}
                    height={56}
                    className="h-full w-full object-contain"
                  />
                </div>
                <div>
                <p className="inline-flex rounded-md border border-white/10 px-2.5 py-1 text-xs text-muted-foreground">
                  {project.status}
                </p>
                <h2 className="mt-5 text-2xl font-semibold">{project.name}</h2>
                </div>
              </div>
              <ArrowRight className="mt-2 size-5 text-muted-foreground transition group-hover:translate-x-1 group-hover:text-teal-200" />
            </div>
            <p className="mt-4 text-sm leading-6 text-muted-foreground">
              {project.summary}
            </p>
            <div className="mt-6 grid gap-2">
              {project.focus.map((item) => (
                <span
                  key={item}
                  className="inline-flex items-center gap-2 text-sm text-muted-foreground"
                >
                  <CircleDot className="size-3 text-teal-200" />
                  {item}
                </span>
              ))}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
