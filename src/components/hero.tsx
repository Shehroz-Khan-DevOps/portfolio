import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";
import { metrics, profile } from "@/lib/data";
import { SectionReveal } from "./section-reveal";
import { TerminalAnimation } from "./terminal-animation";
import { AvailabilityBadge } from "./availability-badge";
import { GithubIcon, LinkedinIcon } from "./icons";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-grid">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
      <div className="relative mx-auto max-w-6xl px-6 pb-20 pt-20 sm:pt-28">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionReveal>
              <div className="mb-6">
                <AvailabilityBadge />
              </div>
            </SectionReveal>

            <SectionReveal delay={0.05}>
              <h1 className="text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-6xl">
                {profile.name}
              </h1>
            </SectionReveal>

            <SectionReveal delay={0.1}>
              <p className="mt-3 text-xl text-muted sm:text-2xl">{profile.title}</p>
            </SectionReveal>

            <SectionReveal delay={0.15}>
              <p className="mt-6 max-w-2xl text-balance text-base leading-relaxed text-muted sm:text-lg">
                {profile.tagline} Architecting resilient infrastructure at scale — AWS,
                Terraform, and observability tooling that keeps production systems
                reliable.
              </p>
            </SectionReveal>

            <SectionReveal delay={0.2}>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link
                  href="/#projects"
                  className="inline-flex items-center gap-2 rounded-md bg-accent px-5 py-2.5 text-sm font-medium text-accent-foreground transition-transform hover:scale-[1.03]"
                >
                  View Projects
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/#contact"
                  className="inline-flex items-center gap-2 rounded-md border border-border px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-accent hover:text-accent"
                >
                  Get in Touch
                </Link>
                <div className="ml-1 flex items-center gap-3 text-muted">
                  <a
                    href={profile.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="LinkedIn"
                    className="transition-colors hover:text-accent"
                  >
                    <LinkedinIcon className="h-5 w-5" />
                  </a>
                  <a
                    href={profile.github}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="GitHub"
                    className="transition-colors hover:text-accent"
                  >
                    <GithubIcon className="h-5 w-5" />
                  </a>
                  <a
                    href={`mailto:${profile.email}`}
                    aria-label="Email"
                    className="transition-colors hover:text-accent"
                  >
                    <Mail className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </SectionReveal>
          </div>

          <SectionReveal delay={0.25}>
            <TerminalAnimation />
          </SectionReveal>
        </div>

        <SectionReveal delay={0.3}>
          <dl className="mt-14 grid grid-cols-2 gap-6 border-t border-border pt-10 sm:grid-cols-4">
            {metrics.map((m) => (
              <div key={m.label}>
                <dt className="font-mono text-2xl font-semibold text-accent sm:text-3xl">
                  {m.value}
                </dt>
                <dd className="mt-1 text-sm text-muted">{m.label}</dd>
              </div>
            ))}
          </dl>
        </SectionReveal>
      </div>
    </section>
  );
}
