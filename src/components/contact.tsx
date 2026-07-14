import { Mail, MapPin, Phone } from "lucide-react";
import { profile } from "@/lib/data";
import { SectionReveal } from "./section-reveal";
import { ContactForm } from "./contact-form";

export function Contact() {
  return (
    <section id="contact" className="scroll-mt-20 border-t border-border bg-surface/40">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <SectionReveal>
          <h2 className="font-mono text-sm uppercase tracking-widest text-accent">
            06 · Contact
          </h2>
        </SectionReveal>

        <div className="mt-6 grid gap-12 lg:grid-cols-5">
          <SectionReveal delay={0.05} className="lg:col-span-2">
            <h3 className="text-balance text-2xl font-semibold text-foreground">
              Let&apos;s talk infrastructure.
            </h3>
            <p className="mt-3 leading-relaxed text-muted">
              Open to DevOps, SRE, and cloud infrastructure roles or
              consulting engagements. Reach out directly or use the form.
            </p>

            <ul className="mt-8 space-y-4">
              <li className="flex items-center gap-3 text-sm text-foreground">
                <Mail className="h-4 w-4 text-accent" />
                <a href={`mailto:${profile.email}`} className="hover:text-accent">
                  {profile.email}
                </a>
              </li>
              <li className="flex items-center gap-3 text-sm text-foreground">
                <Phone className="h-4 w-4 text-accent" />
                <a href={`tel:${profile.phone.replace(/\s/g, "")}`} className="hover:text-accent">
                  {profile.phone}
                </a>
              </li>
              <li className="flex items-center gap-3 text-sm text-foreground">
                <MapPin className="h-4 w-4 text-accent" />
                {profile.location}
              </li>
            </ul>
          </SectionReveal>

          <SectionReveal delay={0.1} className="lg:col-span-3">
            <div className="rounded-lg border border-border bg-surface p-6 sm:p-8">
              <ContactForm />
            </div>
          </SectionReveal>
        </div>
      </div>
    </section>
  );
}
