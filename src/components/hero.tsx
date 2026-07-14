import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";
import { metrics, profile } from "@/lib/data";
import { SectionReveal } from "./section-reveal";
import { TerminalAnimation } from "./terminal-animation";
import { AvailabilityBadge } from "./availability-badge";

function GithubIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.09 3.29 9.4 7.86 10.93.58.1.79-.25.79-.56 0-.27-.01-1.17-.02-2.12-3.2.7-3.88-1.36-3.88-1.36-.52-1.34-1.28-1.69-1.28-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.56-.29-5.25-1.28-5.25-5.7 0-1.26.45-2.29 1.19-3.09-.12-.29-.52-1.47.11-3.06 0 0 .97-.31 3.18 1.18a11.06 11.06 0 0 1 5.79 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.77.11 3.06.74.8 1.19 1.83 1.19 3.09 0 4.43-2.69 5.41-5.26 5.7.41.36.78 1.06.78 2.15 0 1.55-.01 2.8-.01 3.18 0 .31.21.67.8.56A10.52 10.52 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
    </svg>
  );
}

function LinkedinIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.91 1.65-1.85 3.4-1.85 3.63 0 4.3 2.39 4.3 5.5v6.24ZM5.34 7.43a2.07 2.07 0 1 1 0-4.13 2.07 2.07 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.8 0 0 .78 0 1.75v20.5C0 23.22.8 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.75V1.75C24 .78 23.2 0 22.22 0Z" />
    </svg>
  );
}

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
