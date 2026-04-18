import { site } from '../../data/portfolio'

type HeroSectionProps = {
  onViewProjects: () => void
  onContact: () => void
  onDownloadCv: () => void
}

export function HeroSection({ onViewProjects, onContact, onDownloadCv }: HeroSectionProps) {
  return (
    <section
      id="home"
      className="flex min-h-screen scroll-mt-20 flex-col justify-center px-4 pt-6 pb-12 sm:px-6"
      aria-label="Home"
    >
      <div className="mx-auto w-full max-w-4xl text-center">
        <p className="mb-5 text-xs font-medium tracking-wide text-primary/90 sm:text-sm">
          {site.heroKicker}
        </p>
        <h1 className="mb-6 text-4xl font-bold leading-[1.08] tracking-tight text-white sm:text-5xl md:mb-7 md:text-6xl lg:text-7xl">
          Hi, I&apos;m <span className="text-primary">{site.name}</span>
        </h1>
        <p className="mx-auto mb-10 max-w-2xl text-base leading-relaxed text-gray-300 md:mb-12 md:text-lg md:leading-relaxed">
          {site.tagline}
        </p>
        <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
          <button
            type="button"
            onClick={onViewProjects}
            className="inline-block rounded-lg border-2 border-[#143D95] bg-[#143D95] px-6 py-3 font-medium text-white transition-colors hover:bg-primary-dark"
          >
            View Projects
          </button>
          <button
            type="button"
            onClick={onContact}
            className="inline-block rounded-lg border-2 border-white px-6 py-3 font-medium text-white transition-colors hover:bg-primary-dark"
          >
            Contact Me
          </button>
          {site.cvUrl ? (
            <a
              href={site.cvUrl}
              download
              className="inline-block rounded-lg border-2 border-[#143D95] bg-[#143D95] px-6 py-3 font-medium text-white transition-colors hover:bg-primary-dark"
            >
              Download CV
            </a>
          ) : (
            <button
              type="button"
              onClick={onDownloadCv}
              className="inline-block rounded-lg border-2 border-[#143D95] bg-[#143D95] px-6 py-3 font-medium text-white transition-colors hover:bg-primary-dark"
            >
              Download CV
            </button>
          )}
        </div>
        <div
          className="mx-auto mt-12 w-full max-w-xl space-y-1.5 text-center sm:mt-14"
          aria-label="Current professional role"
        >
          <p className="text-sm text-gray-400">Frontend Developer @ BITS | 2026 — Present</p>
          <p className="text-xs text-gray-500 md:text-sm md:text-gray-400">
            Building scalable React &amp; TypeScript applications
          </p>
        </div>
      </div>
    </section>
  )
}
