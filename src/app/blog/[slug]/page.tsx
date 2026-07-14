import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllPostSlugs, getPostBySlug } from "@/lib/posts";
import { SectionReveal } from "@/components/section-reveal";

export function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }));
}

export default async function BlogPostPage(props: PageProps<"/blog/[slug]">) {
  const { slug } = await props.params;

  let post;
  try {
    post = getPostBySlug(slug);
  } catch {
    notFound();
  }

  const { frontmatter, content } = post;

  return (
    <article className="mx-auto max-w-3xl px-6 py-20">
      <SectionReveal>
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to blog
        </Link>

        <p className="mt-6 font-mono text-xs text-muted">
          {new Date(frontmatter.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </p>
        <h1 className="mt-2 text-balance text-3xl font-semibold text-foreground sm:text-4xl">
          {frontmatter.title}
        </h1>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {frontmatter.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-border px-2.5 py-1 text-xs text-muted"
            >
              {tag}
            </span>
          ))}
        </div>
      </SectionReveal>

      <SectionReveal delay={0.1}>
        <div className="prose prose-neutral dark:prose-invert mt-10 max-w-none prose-headings:font-semibold prose-a:text-accent prose-code:text-accent">
          <MDXRemote source={content} />
        </div>
      </SectionReveal>
    </article>
  );
}
