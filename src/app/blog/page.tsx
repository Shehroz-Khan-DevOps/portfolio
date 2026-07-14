import Link from "next/link";
import type { Metadata } from "next";
import { getAllPosts } from "@/lib/posts";
import { SectionReveal } from "@/components/section-reveal";

export const metadata: Metadata = {
  title: "Blog — M. Shehroz Khan",
  description: "Notes on AWS, Terraform, and running reliable production infrastructure.",
};

export default function BlogIndexPage() {
  const posts = getAllPosts();

  return (
    <section className="mx-auto max-w-3xl px-6 py-20">
      <SectionReveal>
        <h1 className="font-mono text-sm uppercase tracking-widest text-accent">
          Blog
        </h1>
        <p className="mt-4 text-balance text-3xl font-semibold text-foreground">
          Notes from production.
        </p>
        <p className="mt-3 text-muted">
          Writing on AWS, Terraform, and keeping infrastructure reliable.
        </p>
      </SectionReveal>

      <div className="mt-12 space-y-6">
        {posts.map((post, i) => (
          <SectionReveal key={post.slug} delay={i * 0.05}>
            <Link
              href={`/blog/${post.slug}`}
              className="block rounded-lg border border-border bg-surface p-6 transition-colors hover:border-accent"
            >
              <p className="font-mono text-xs text-muted">
                {new Date(post.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </p>
              <h2 className="mt-2 text-xl font-semibold text-foreground">
                {post.title}
              </h2>
              <p className="mt-2 leading-relaxed text-muted">{post.excerpt}</p>
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
    </section>
  );
}
