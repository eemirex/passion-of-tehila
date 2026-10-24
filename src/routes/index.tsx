import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { Menu, X, ArrowUpRight, Phone, Mail, MapPin } from "lucide-react";
import hero from "@/assets/hero.jpg";
import { buildMailto, CONTACT_EMAIL, inquirySchema, SERVICES } from "@/lib/inquiry";

// Real project media, committed to the repo and served from public/media/.
// The video is reassembled from media-src/ chunks by scripts/build-media.sh.
const PT_LOGO_URL = "/media/pt-logo.png";
const DB_VIDEO_URL = "/media/dbahamas-court-web.mp4";
const DB_POSTER_URL = "/media/dbahamas-poster.jpg";

const TITLE = "Passion of Tehila — Planning, Contracts & Construction in Ibadan";
const DESC =
  "Passion of Tehila is an Ibadan, Nigeria business offering General Contracts, Transportation, Construction & Development, and physical planning coordination.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

const NAV = [
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#project", label: "Project" },
  { href: "#contact", label: "Contact" },
];

const SERVICE_COPY: Record<(typeof SERVICES)[number], string> = {
  "General Contracts": "Taking on contract work and coordinating the people, materials and steps needed to see it through.",
  Transportation: "Transportation services supporting the movement of goods, materials and equipment.",
  "Construction & Development": "Construction and development work, from early preparation to building on the ground.",
  "Physical Planning & Boundary Coordination":
    "Coordination of physical planning and site boundaries during development, working alongside the appropriate licensed professionals where required.",
};

function Monogram({ className = "h-11 w-11" }: { className?: string }) {
  return (
    <span className={`inline-block shrink-0 overflow-hidden rounded-full bg-ink-foreground ${className}`}>
      <img src={PT_LOGO_URL} alt="" width={384} height={376} className="h-full w-full object-contain" />
    </span>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3 md:px-10">
        <a href="#top" className="flex items-center gap-3" aria-label="Passion of Tehila, back to top">
          <Monogram />
          <span className="font-display text-lg tracking-wider">Passion of Tehila</span>
        </a>
        <nav aria-label="Primary" className="hidden items-center gap-8 md:flex">
          {NAV.map((n) => (
            <a key={n.href} href={n.href} className="text-xs font-semibold uppercase tracking-[0.2em] hover:text-gold">
              {n.label}
            </a>
          ))}
          <a href="#contact" className="btn-gold">Discuss your project</a>
        </nav>
        <button
          className="p-2 md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <nav id="mobile-menu" aria-label="Mobile" className="border-t border-border bg-background px-5 pb-6 md:hidden">
          {NAV.map((n) => (
            <a key={n.href} href={n.href} onClick={() => setOpen(false)} className="font-display block border-b border-border py-4 text-2xl">
              {n.label}
            </a>
          ))}
          <a href="#contact" onClick={() => setOpen(false)} className="btn-gold mt-6">Discuss your project</a>
        </nav>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-ink text-ink-foreground">
      <img src={hero} alt="Modern architectural building facade" width={1600} height={1008} className="absolute inset-0 h-full w-full object-cover opacity-45" />
      <div className="relative mx-auto max-w-7xl px-5 pb-20 pt-28 md:px-10 md:pb-32 md:pt-40">
        <p className="eyebrow reveal text-gold-soft">Ibadan · Oyo State · Nigeria</p>
        <h1 className="font-display reveal mt-6 max-w-5xl text-5xl font-bold sm:text-7xl lg:text-[8.5rem]">
          Planning spaces.<br />
          <span className="text-gold-soft">Building possibilities.</span>
        </h1>
        <div className="rule-gold mt-10 w-24" />
        <p className="mt-8 max-w-xl text-lg leading-relaxed text-ink-foreground/85">
          Passion of Tehila provides General Contracts, Transportation, and Construction &amp; Development services, with
          involvement in physical planning and site boundaries.
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <a href="#contact" className="btn-gold">Discuss your project <ArrowUpRight className="h-4 w-4" /></a>
          <a href="#services" className="btn-gold border-ink-foreground/40">View services</a>
        </div>
              </div>
    </section>
  );
}

function SectionHead({ num, label, title }: { num: string; label: string; title: string }) {
  return (
    <div className="mb-14">
      <div className="flex items-center gap-4">
        <span className="eyebrow">{num}</span>
        <div className="rule-gold w-12" />
        <span className="eyebrow">{label}</span>
      </div>
      <h2 className="font-display mt-6 text-5xl font-semibold md:text-7xl">{title}</h2>
    </div>
  );
}

function About() {
  return (
    <section id="about" className="mx-auto max-w-7xl px-5 py-24 md:px-10 md:py-32">
      <SectionHead num="01" label="About" title="A company built on planning." />
      <div className="grid gap-10 md:grid-cols-12">
        <p className="font-serif text-3xl italic leading-snug md:col-span-7">
          Based at Mokola, Ibadan, Passion of Tehila works across contracts, transportation, and construction &amp; development.
        </p>
        <p className="text-muted-foreground leading-relaxed md:col-span-4 md:col-start-9">
          Our project involvement includes physical planning, boundaries and development work at D’ Bahamas Court. We are
          happy to discuss how we can support your project.
        </p>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section id="services" className="bg-ink text-ink-foreground">
      <div className="mx-auto max-w-7xl px-5 py-24 md:px-10 md:py-32">
        <SectionHead num="02" label="Services" title="What we do." />
        <ol className="border-t border-gold/50">
          {SERVICES.map((s, i) => (
            <li key={s} className="grid gap-4 border-b border-gold/50 py-10 md:grid-cols-12 md:items-baseline">
              <span className="eyebrow md:col-span-1">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="font-display text-3xl font-semibold md:col-span-6 md:text-5xl">{s}</h3>
              <p className="text-ink-foreground/75 leading-relaxed md:col-span-5">{SERVICE_COPY[s]}</p>
            </li>
          ))}
        </ol>
        <p className="mt-8 text-xs text-ink-foreground/60">
          Boundary coordination does not include licensed land surveying or legal boundary certification.
        </p>
      </div>
    </section>
  );
}

function Project() {
  return (
    <section id="project" className="mx-auto max-w-7xl px-5 py-24 md:px-10 md:py-32">
      <SectionHead num="03" label="Project" title="Featured project." />
      <div className="grid gap-12 md:grid-cols-12 md:items-center">
        <figure className="md:col-span-6">
          <video
            controls
            playsInline
            preload="none"
            poster={DB_POSTER_URL}
            aria-label="Video of D’ Bahamas Court"
            className="aspect-video w-full bg-ink object-cover"
          >
            <source src={DB_VIDEO_URL} type="video/mp4" />
            <a href={DB_VIDEO_URL}>Download the D’ Bahamas Court video</a>
          </video>
          <figcaption className="mt-3 text-sm text-muted-foreground">
            Video does not play? <a href={DB_VIDEO_URL} className="underline hover:text-gold">Open the D’ Bahamas Court video</a>.
          </figcaption>
        </figure>
        <div className="md:col-span-5 md:col-start-8">
          <p className="eyebrow">Project involvement</p>
          <h3 className="font-display mt-4 text-5xl font-bold md:text-7xl">D’ Bahamas Court</h3>
          <div className="rule-gold my-8 w-full" />
          <p className="font-serif text-3xl italic leading-snug">
            Involvement in physical planning, boundaries and development.
          </p>
          <a href="#contact" className="btn-gold mt-10">Discuss a similar project</a>
        </div>
      </div>
    </section>
  );
}

type Errors = Partial<Record<"name" | "email" | "service" | "message", string>>;

function Contact() {
  const [errors, setErrors] = useState<Errors>({});
  const [opened, setOpened] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = Object.fromEntries(new FormData(e.currentTarget));
    const r = inquirySchema.safeParse(fd);
    if (!r.success) {
      const errs: Errors = {};
      for (const issue of r.error.issues) {
        const k = issue.path[0] as keyof Errors;
        errs[k] ??= issue.message;
      }
      setErrors(errs);
      setOpened(false);
      const first = Object.keys(errs)[0];
      document.getElementById(`f-${first}`)?.focus();
      return;
    }
    setErrors({});
    window.location.href = buildMailto(r.data);
    setOpened(true);
  }

  const field = "mt-2 w-full border-0 border-b border-input bg-transparent py-3 text-base focus:border-gold focus:outline-none";
  const label = "eyebrow text-muted-foreground";

  return (
    <section id="contact" className="border-t border-border bg-card">
      <div className="mx-auto grid max-w-7xl gap-16 px-5 py-24 md:grid-cols-12 md:px-10 md:py-32">
        <div className="md:col-span-5">
          <SectionHead num="04" label="Contact" title="Discuss your project." />
          <ul className="space-y-6">
            <li className="flex gap-4">
              <MapPin className="mt-1 h-5 w-5 shrink-0 text-gold" aria-hidden />
              <address className="not-italic leading-relaxed">2 Sobande Avenue, Oremeji, Mokola,<br />Ibadan, Oyo State, Nigeria</address>
            </li>
            <li className="flex gap-4">
              <Phone className="mt-1 h-5 w-5 shrink-0 text-gold" aria-hidden />
              <div className="flex flex-col">
                <a href="tel:+2348062336629" className="hover:text-gold">+234 806 233 6629</a>
                <a href="tel:+2348023256476" className="hover:text-gold">+234 802 325 6476</a>
              </div>
            </li>
            <li className="flex gap-4">
              <Mail className="mt-1 h-5 w-5 shrink-0 text-gold" aria-hidden />
              <a href={`mailto:${CONTACT_EMAIL}`} className="hover:text-gold">{CONTACT_EMAIL}</a>
            </li>
          </ul>
          <p className="mt-8 text-sm text-muted-foreground">Website listed on letterhead: www.passionoftehila.com</p>
        </div>

        <form noValidate onSubmit={onSubmit} className="md:col-span-6 md:col-start-7" aria-describedby="form-note">
          <p id="form-note" className="mb-10 border-l-2 border-gold pl-4 text-sm text-muted-foreground">
            Sending opens your own email app with a pre-filled draft to {CONTACT_EMAIL}. Nothing is sent from this
            website — please review and send the email yourself.
          </p>
          <div className="grid gap-8">
            {(["name", "email"] as const).map((k) => (
              <div key={k}>
                <label htmlFor={`f-${k}`} className={label}>{k === "name" ? "Name" : "Email"}</label>
                <input
                  id={`f-${k}`} name={k} type={k === "email" ? "email" : "text"} autoComplete={k}
                  maxLength={k === "name" ? 100 : 255}
                  aria-invalid={!!errors[k]} aria-describedby={errors[k] ? `e-${k}` : undefined} className={field}
                />
                {errors[k] && <p id={`e-${k}`} className="mt-2 text-sm text-destructive">{errors[k]}</p>}
              </div>
            ))}
            <div>
              <label htmlFor="f-service" className={label}>Service</label>
              <select id="f-service" name="service" defaultValue="" aria-invalid={!!errors.service}
                aria-describedby={errors.service ? "e-service" : undefined} className={field}>
                <option value="" disabled>Select a service</option>
                {SERVICES.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
              {errors.service && <p id="e-service" className="mt-2 text-sm text-destructive">{errors.service}</p>}
            </div>
            <div>
              <label htmlFor="f-message" className={label}>Message</label>
              <textarea id="f-message" name="message" rows={5} maxLength={2000} aria-invalid={!!errors.message}
                aria-describedby={errors.message ? "e-message" : undefined} className={field} />
              {errors.message && <p id="e-message" className="mt-2 text-sm text-destructive">{errors.message}</p>}
            </div>
            <div>
              <button type="submit" className="btn-gold bg-ink text-ink-foreground">Open email draft <ArrowUpRight className="h-4 w-4" /></button>
              <p role="status" className="mt-4 text-sm text-muted-foreground">
                {opened && "We tried to open your email app with the draft. If nothing opened, email us directly at " + CONTACT_EMAIL + "."}
              </p>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}

function Index() {
  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-background focus:p-3">Skip to content</a>
      <Header />
      <main id="main">
        <Hero />
        <About />
        <Services />
        <Project />
        <Contact />
      </main>
      <footer className="bg-ink text-ink-foreground">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-10 text-xs uppercase tracking-[0.2em] md:flex-row md:justify-between md:px-10">
          <span className="flex items-center gap-3"><Monogram className="h-9 w-9" />© {new Date().getFullYear()} Passion of Tehila</span>
        </div>
      </footer>
    </>
  );
}
