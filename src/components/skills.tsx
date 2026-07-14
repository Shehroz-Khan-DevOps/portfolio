import { skillCategories } from "@/lib/data";
import { SectionReveal } from "./section-reveal";

export function Skills() {
  return (
    <section id="skills" className="scroll-mt-20 border-t border-border bg-surface/40">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <SectionReveal>
          <h2 className="font-mono text-sm uppercase tracking-widest text-accent">
            02 · Skills &amp; Tools
          </h2>
        </SectionReveal>

        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {skillCategories.map((category, i) => (
            <SectionReveal key={category.name} delay={i * 0.04}>
              <div className="h-full rounded-lg border border-border bg-surface p-5 transition-colors hover:border-accent">
                <h3 className="font-mono text-sm font-medium text-foreground">
                  {category.name}
                </h3>
                <ul className="mt-3 flex flex-wrap gap-1.5">
                  {category.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-full border border-border bg-surface-2 px-2.5 py-1 text-xs text-muted"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
