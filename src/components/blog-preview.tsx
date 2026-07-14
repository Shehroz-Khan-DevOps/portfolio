import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getAllPosts } from "@/lib/posts";
import { SectionReveal } from "./section-reveal";

export function BlogPreview() {
  const posts = getAllPosts().slice(0, 2);

  if (posts.length === 0) return null;

  return (
    <section id="blog" className="scroll-mt-20 border-t border-border">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <SectionReveal>
          <div className="flex items-end justify-between">
            <h2 className="font-mono text-sm uppercase tracking-widest text-accent">
              05 · From the Blog
            </h2>
            <Link
              href="/blog"
              className="hidden items-center gap-1 text-sm text-muted transition-colors hover:text-foreground sm:flex"
            >
              View all posts
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </SectionReveal>

        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          {posts.map((post, i) => (
            <SectionReveal key={post.slug} delay={i * 0.06}>
              <Link
                href={`/blog/${post.slug}`}
                className="block h-full rounded-lg border border-border bg-surface p-6 transition-colors hover:border-accent"
              >
                <p className="font-mono text-xs text-muted">
                  {new Date(post.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </p>
                <h3 className="mt-2 text-lg font-semibold text-foreground">
                  {post.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {post.excerpt}
                </p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-border px-2.5 py-1 text-xs text-muted"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </Link>
            </SectionReveal>
          ))}
        </div>

        <div className="mt-8 sm:hidden">
          <Link
            href="/blog"
            className="flex items-center gap-1 text-sm text-muted hover:text-foreground"
          >
            View all posts
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
