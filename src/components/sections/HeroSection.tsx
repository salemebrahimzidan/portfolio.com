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
      className="flex min-h-screen scroll-mt-20 flex-col justify-center pt-4"
      aria-label="Home"
    >
      <div className="text-start md:text-center">
        <h1 className="mb-4 text-4xl font-bold md:text-6xl">
          Hi, I&apos;m <span className="text-primary">{site.name}</span>
        </h1>
        <p className="mb-8 text-xl text-gray-300 md:text-2xl">
          {site.title} — {site.tagline}
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <button
            type="button"
            onClick={onViewProjects}
            className="inline-block rounded-lg border-2 border-[#143D95] bg-[#143D95] px-6 py-3 font-medium text-white transition-colors hover:bg-primary-dark"
          >
            My Projects
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
      </div>
    </section>
  )
}
