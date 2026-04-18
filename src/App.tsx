import { useCallback, useMemo } from 'react'
import { Navbar } from './components/layout/Navbar'
import { SiteFooter } from './components/layout/SiteFooter'
import { AboutSection } from './components/sections/AboutSection'
import { ContactSection } from './components/sections/ContactSection'
import { HeroSection } from './components/sections/HeroSection'
import { ProjectsSection } from './components/sections/ProjectsSection'
import { QualificationSection } from './components/sections/QualificationSection'
import { SkillsSection } from './components/sections/SkillsSection'
import { navSections, site } from './data/portfolio'
import { useScrollSpy } from './hooks/useScrollSpy'

function App() {
  const sectionIds = useMemo(() => navSections.map((s) => s.id), [])
  const activeId = useScrollSpy(sectionIds)

  const scrollTo = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [])

  const handleDownloadCv = useCallback(() => {
    if (site.cvUrl) {
      window.open(site.cvUrl, '_blank', 'noopener,noreferrer')
      return
    }
    scrollTo('contact')
  }, [scrollTo])

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 transition-colors duration-300">
      <Navbar items={navSections} activeId={activeId} />

      <main className="mx-auto max-w-6xl px-4 pb-16 pt-20 sm:px-6 lg:px-8">
        <HeroSection
          onViewProjects={() => scrollTo('projects')}
          onContact={() => scrollTo('contact')}
          onDownloadCv={handleDownloadCv}
        />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <QualificationSection />
        <ContactSection />
      </main>

      <SiteFooter blurb="Frontend developer focused on responsive UI, clear structure, and steady iteration." />
    </div>
  )
}

export default App
