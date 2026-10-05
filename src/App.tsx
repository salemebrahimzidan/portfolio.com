import { useCallback, useMemo } from 'react'
import { DocumentMeta } from './components/seo/DocumentMeta'
import { Navbar } from './components/layout/Navbar'
import { SiteFooter } from './components/layout/SiteFooter'
import { AboutSection } from './components/sections/AboutSection'
import { ContactSection } from './components/forms/InquiryFormSection'
import { FinalCtaSection } from './components/sections/FinalCtaSection'
import { HeroSection } from './components/sections/HeroSection'
import { ProjectsSection } from './components/sections/ProjectsSection'
import { QualificationSection } from './components/sections/QualificationSection'
import { SkillsSection } from './components/sections/SkillsSection'
import { TrustSection } from './components/sections/TrustSection'
import { navSections } from './data/portfolio'
import { useScrollSpy } from './hooks/useScrollSpy'

const navbarOrder = ['home', 'about', 'skills', 'qualification', 'projects', 'contact'] as const

function App() {
  const navbarItems = useMemo(
    () => navbarOrder.map((id) => navSections.find((section) => section.id === id)!),
    [],
  )
  const navbarIds = useMemo(() => navbarItems.map((section) => section.id), [navbarItems])
  const activeId = useScrollSpy(navbarIds)

  const scrollTo = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [])

  return (
    <div className="min-h-screen bg-background text-foreground">
      <DocumentMeta />
      <Navbar items={navbarItems} activeId={activeId} />

      <main className="mx-auto max-w-6xl px-4 pb-20 pt-24 sm:px-6 lg:px-8">
        <HeroSection
          onViewProjects={() => scrollTo('projects')}
          onContact={() => scrollTo('contact')}
        />
        <AboutSection />
        <SkillsSection />
        <TrustSection />
        <ProjectsSection />
        <QualificationSection />
        <FinalCtaSection onContact={() => scrollTo('contact')} />
        <ContactSection />
      </main>

      <SiteFooter />
    </div>
  )
}

export default App
