import { certifications, profile } from "@/lib/data";
import { SectionReveal } from "./section-reveal";
import { Award } from "lucide-react";

export function About() {
  return (
    <section id="about" className="scroll-mt-20 border-t border-border">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <SectionReveal>
          <h2 className="font-mono text-sm uppercase tracking-widest text-accent">
            01 · About
          </h2>
        </SectionReveal>

        <div className="mt-6 grid gap-12 lg:grid-cols-3">
          <SectionReveal delay={0.05} className="lg:col-span-2">
            <p className="text-balance text-lg leading-relaxed text-foreground">
              {profile.summary}
            </p>
            <p className="mt-4 leading-relaxed text-muted">
              Passionate about automating infrastructure and continuously
              improving development and deployment workflows — from
              Terraform-managed environments to observability stacks that
              catch problems before they become incidents.
            </p>
          </SectionReveal>

          <SectionReveal delay={0.1}>
            <h3 className="mb-4 flex items-center gap-2 text-sm font-medium text-foreground">
              <Award className="h-4 w-4 text-accent" />
              Certifications
            </h3>
            <ul className="space-y-3">
              {certifications.map((cert) => (
                <li
                  key={cert.name}
                  className="rounded-md border border-border bg-surface px-4 py-3"
                >
                  <p className="text-sm font-medium text-foreground">
                    {cert.name}
                  </p>
                  <p className="mt-0.5 text-xs text-muted">
                    {cert.issuer} · {cert.date}
                  </p>
                </li>
              ))}
            </ul>
          </SectionReveal>
        </div>
      </div>
    </section>
  );
}
