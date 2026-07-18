"use client";

import { useMemo, useState } from "react";
import { allProjectTags, projects } from "@/lib/data";
import { SectionReveal } from "./section-reveal";
import { GithubIcon } from "./icons";
import { DriftLensDemo } from "./driftlens-demo";
import { motion, AnimatePresence } from "framer-motion";

const PROJECT_DEMOS: Record<string, React.ComponentType> = {
  driftlens: DriftLensDemo,
};

export function Projects() {
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const filtered = useMemo(
    () =>
      activeTag
        ? projects.filter((p) => p.tags.includes(activeTag))
        : projects,
    [activeTag]
  );

  return (
    <section id="projects" className="scroll-mt-20 border-t border-border bg-surface/40">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <SectionReveal>
          <h2 className="font-mono text-sm uppercase tracking-widest text-accent">
            04 · Featured Projects
          </h2>
        </SectionReveal>

        <SectionReveal delay={0.05}>
          <div className="mt-6 flex flex-wrap gap-2">
            <button
              onClick={() => setActiveTag(null)}
              className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
                activeTag === null
                  ? "border-accent bg-accent text-accent-foreground"
                  : "border-border text-muted hover:text-foreground"
              }`}
            >
              All
            </button>
            {allProjectTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveTag(tag === activeTag ? null : tag)}
                className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
                  activeTag === tag
                    ? "border-accent bg-accent text-accent-foreground"
                    : "border-border text-muted hover:text-foreground"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </SectionReveal>

        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <motion.div
                key={project.slug}
                layout
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.25 }}
                className={`rounded-lg border border-border bg-surface p-6 transition-colors hover:border-accent ${
                  project.featured ? "sm:col-span-2" : ""
                }`}
              >
                <div
                  className={
                    PROJECT_DEMOS[project.slug]
                      ? "grid gap-6 lg:grid-cols-2 lg:items-center"
                      : ""
                  }
                >
                  <div>
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="text-lg font-semibold text-foreground">
                        {project.name}
                      </h3>
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          aria-label={`${project.name} on GitHub`}
                          className="shrink-0 text-muted transition-colors hover:text-accent"
                        >
                          <GithubIcon className="h-5 w-5" />
                        </a>
                      )}
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-muted">
                      {project.longDescription}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-border bg-surface-2 px-2.5 py-1 text-xs text-muted"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {PROJECT_DEMOS[project.slug] &&
                    (() => {
                      const Demo = PROJECT_DEMOS[project.slug];
                      return <Demo />;
                    })()}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filtered.length === 0 && (
          <p className="mt-10 text-center text-sm text-muted">
            No projects match that filter yet.
          </p>
        )}
      </div>
    </section>
  );
}
