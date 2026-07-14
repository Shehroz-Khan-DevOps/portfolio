# M. Shehroz Khan — Portfolio

Personal portfolio site for M. Shehroz Khan, Software Systems & DevOps Engineer.

**Live site:** [portfolio-shehrozkhan.vercel.app](https://portfolio-shehrozkhan.vercel.app/)

## Features

- Animated terminal hero with a typewriter effect cycling through live-style status commands (`whoami`, `uptime`, `kubectl get pods`, `terraform plan`)
- Dynamic availability badge with rotating status messages and a live Lahore (PKT) clock
- Dark/light theme toggle with persisted preference and no flash-of-wrong-theme
- Scroll-triggered reveal animations throughout (Framer Motion)
- Experience, skills, and certifications pulled from a single content source
- Featured projects with client-side filtering by technology tag
- Blog powered by MDX (`content/blog/*.mdx`) with frontmatter-driven listing and detail pages
- Working contact form backed by a Next.js Route Handler, with optional email delivery via [Resend](https://resend.com)
- Downloadable resume (`/resume.pdf`)

## Tech Stack

- [Next.js 16](https://nextjs.org) (App Router, Turbopack)
- TypeScript
- Tailwind CSS v4
- Framer Motion
- `next-mdx-remote` + `gray-matter` for the blog
- [Resend](https://resend.com) for contact form email delivery

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view it.

### Environment variables

Copy `.env.example` to `.env.local` to enable contact form email delivery:

```bash
RESEND_API_KEY=      # from resend.com dashboard
CONTACT_TO_EMAIL=    # inbox to receive submissions
```

Without these set, the contact form still works and returns success to visitors — submissions are just logged server-side instead of emailed.

## Project Structure

```
content/blog/        MDX blog posts
src/app/              Routes (home, blog, contact API)
src/components/       UI components
src/lib/               Portfolio content (data.ts) and blog utilities (posts.ts)
```

To update the portfolio content (experience, skills, projects, certifications), edit `src/lib/data.ts` — it's the single source of truth used across the site.

## Deployment

Deployed on [Vercel](https://vercel.com). Push to `main` to trigger a new deployment.
