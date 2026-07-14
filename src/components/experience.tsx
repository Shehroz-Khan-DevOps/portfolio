import { experience } from "@/lib/data";
import { SectionReveal } from "./section-reveal";

export function Experience() {
  return (
    <section id="experience" className="scroll-mt-20 border-t border-border">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <SectionReveal>
          <h2 className="font-mono text-sm uppercase tracking-widest text-accent">
            03 · Experience
          </h2>
        </SectionReveal>

        <div className="mt-10 space-y-10">
          {experience.map((job, i) => (
            <SectionReveal key={job.company} delay={i * 0.08}>
              <div className="grid gap-4 border-l-2 border-border pl-6 sm:grid-cols-[220px_1fr] sm:gap-8">
                <div>
                  <p className="text-sm font-mono text-muted">{job.period}</p>
                  <p className="mt-1 text-sm text-muted">{job.location}</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">
                    {job.role}
                  </h3>
                  <p className="text-accent">{job.company}</p>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {job.description}
                  </p>
                  <ul className="mt-4 space-y-2">
                    {job.achievements.map((item) => (
                      <li
                        key={item}
                        className="flex gap-2 text-sm leading-relaxed text-foreground/90"
                      >
                        <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {job.tech.map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-border px-2.5 py-1 text-xs text-muted"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
