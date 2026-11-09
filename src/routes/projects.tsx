import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

const photos = [
  { src: "site-photo-10-06-27.jpg", alt: "Wide view across a cleared site" },
  { src: "site-photo-10-06-29.jpg", alt: "Site landscape with building plots in the distance" },
  { src: "site-photo-10-06-32.jpg", alt: "Open site with earth and vegetation" },
  { src: "site-photo-10-06-32-1.jpg", alt: "Cleared ground viewed across the site" },
  { src: "site-photo-10-06-33.jpg", alt: "Site landscape with trees and nearby buildings" },
  { src: "site-photo-10-06-35.jpg", alt: "Cleared plot with trees and nearby buildings" },
  { src: "site-photo-10-06-36.jpg", alt: "Cleared site viewed from another angle" },
  { src: "site-photo-10-06-37.jpg", alt: "Site workers and a mound of aggregate" },
  { src: "site-photo-10-06-40.jpg", alt: "Site workers on cleared ground" },
  { src: "site-photo-10-06-42.jpg", alt: "Excavator working beside a water channel" },
  { src: "site-photo-10-06-50.jpg", alt: "Excavator working in an excavated channel" },
  { src: "site-photo-10-06-50-1.jpg", alt: "Earthmoving equipment at a channel" },
  { src: "site-photo-10-06-51.jpg", alt: "Excavated channel edged with stone" },
  { src: "site-photo-10-06-52.jpg", alt: "Wide view of an excavated channel" },
  { src: "site-photo-10-06-55.jpg", alt: "Water running through an excavated channel" },
  { src: "site-photo-10-06-56.jpg", alt: "Workers beside a stone-lined channel" },
  { src: "site-photo-10-07-04.jpg", alt: "Reinforcement steel in a concrete excavation" },
  { src: "site-photo-10-07-09.jpg", alt: "Workers beside a stone-lined slope" },
  { src: "site-photo-10-07-13.jpg", alt: "Workers placing material along a stone-lined slope" },
  { src: "site-photo-10-14-33.jpg", alt: "Stone aggregate spread across a site" },
];

const videoDimensions = [
  [368, 642], [368, 674], [368, 674], [368, 674], [368, 642],
  [368, 642], [256, 482], [368, 674], [368, 674], [368, 674],
] as const;

const videos = Array.from({ length: 10 }, (_, index) => ({
  src: `/media/portfolio/site-video-${String(index + 1).padStart(2, "0")}.mp4`,
  poster: `/media/portfolio/video-${String(index + 1).padStart(2, "0")}-poster.jpg`,
  label: `Project video ${String(index + 1).padStart(2, "0")}`,
  width: videoDimensions[index][0],
  height: videoDimensions[index][1],
}));

const MEDIA_BASE = "/media/portfolio/";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Project Gallery — Passion of Tehila" },
      {
        name: "description",
        content: "Photographs and videos from Passion of Tehila project sites in Nigeria.",
      },
      { property: "og:title", content: "Project Gallery — Passion of Tehila" },
      {
        property: "og:description",
        content: "Photographs and videos from Passion of Tehila project sites in Nigeria.",
      },
    ],
    links: [{ rel: "canonical", href: "/projects" }],
  }),
  component: ProjectsPage,
});

function ProjectsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-10">
          <Link to="/" className="font-display text-lg tracking-wider" aria-label="Passion of Tehila home">
            Passion of Tehila
          </Link>
          <nav aria-label="Primary" className="flex items-center gap-5 text-xs font-semibold uppercase tracking-[0.16em] md:gap-8">
            <Link to="/" className="hover:text-gold">Home</Link>
            <a href="/#services" className="hidden hover:text-gold sm:inline">Services</a>
            <span className="text-gold" aria-current="page">Gallery</span>
            <a href="/#contact" className="btn-gold hidden sm:inline-flex">Discuss your project</a>
          </nav>
        </div>
      </header>

      <main>
        <section className="bg-ink text-ink-foreground">
          <div className="mx-auto max-w-7xl px-5 py-20 md:px-10 md:py-28">
            <Link to="/" className="eyebrow inline-flex items-center gap-2 text-gold-soft hover:text-white">
              <ArrowLeft className="h-4 w-4" /> Back to home
            </Link>
            <p className="eyebrow mt-12 text-gold-soft">Passion of Tehila · Work</p>
            <h1 className="font-display mt-4 max-w-4xl text-6xl font-bold sm:text-7xl md:text-9xl">Project gallery.</h1>
            <div className="rule-gold mt-8 w-24" />
            <p className="mt-7 max-w-2xl text-lg leading-relaxed text-ink-foreground/80">
              A visual collection of site photographs and videos.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-16 md:px-10 md:py-24" aria-labelledby="photos-heading">
          <div className="mb-10 flex items-end justify-between gap-5">
            <div>
              <p className="eyebrow text-muted-foreground">01 · Photographs</p>
              <h2 id="photos-heading" className="font-display mt-3 text-4xl font-semibold md:text-6xl">On site.</h2>
            </div>
            <span className="eyebrow text-muted-foreground">{photos.length} images</span>
          </div>
          <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
            {photos.map((photo, index) => (
              <figure key={photo.src} className="mb-4 break-inside-avoid overflow-hidden bg-card">
                <a
                  href={`${MEDIA_BASE}${photo.src}`}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Open photograph ${String(index + 1).padStart(2, "0")} at full size`}
                >
                  <img
                    src={`${MEDIA_BASE}${photo.src}`}
                    alt={photo.alt}
                    loading="lazy"
                    decoding="async"
                    className="h-auto w-full transition-transform duration-500 hover:scale-[1.02]"
                  />
                </a>
              </figure>
            ))}
          </div>
        </section>

        <section className="bg-card" aria-labelledby="videos-heading">
          <div className="mx-auto max-w-7xl px-5 py-16 md:px-10 md:py-24">
            <div className="mb-10 flex items-end justify-between gap-5">
              <div>
                <p className="eyebrow text-muted-foreground">02 · Video</p>
                <h2 id="videos-heading" className="font-display mt-3 text-4xl font-semibold md:text-6xl">From the field.</h2>
              </div>
              <span className="eyebrow text-muted-foreground">{videos.length} clips</span>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {videos.map((video) => (
                <figure key={video.src} className="min-w-0 border border-border bg-background">
                  <video
                    controls
                    playsInline
                    preload="none"
                    poster={video.poster}
                    aria-label={video.label}
                    width={video.width}
                    height={video.height}
                    className="w-full bg-ink object-contain"
                  >
                    <source src={video.src} type="video/mp4" />
                    Your browser does not support embedded video.
                  </video>
                </figure>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-20 text-center md:px-10 md:py-28">
          <p className="eyebrow text-muted-foreground">Have a project in mind?</p>
          <h2 className="font-display mx-auto mt-4 max-w-3xl text-5xl font-semibold md:text-7xl">Let’s talk about what’s next.</h2>
          <a href="/#contact" className="btn-gold mt-8">Discuss your project <ArrowUpRight className="h-4 w-4" /></a>
        </section>
      </main>

      <footer className="bg-ink text-ink-foreground">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-8 text-xs uppercase tracking-[0.2em] md:flex-row md:justify-between md:px-10">
          <span>© {new Date().getFullYear()} Passion of Tehila</span>
          <Link to="/" className="hover:text-gold-soft">Back to home</Link>
        </div>
      </footer>
    </div>
  );
}
