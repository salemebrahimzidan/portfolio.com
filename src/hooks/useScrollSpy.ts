import { useEffect, useState } from 'react'

/**
 * Highlights the nav item for the section most visible in the viewport.
 */
export function useScrollSpy(sectionIds: readonly string[]) {
  const [activeId, setActiveId] = useState(sectionIds[0] ?? '')

  useEffect(() => {
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el))

    if (elements.length === 0) return

    const overlapArea = (e: IntersectionObserverEntry) =>
      Math.max(0, e.intersectionRect.width) * Math.max(0, e.intersectionRect.height)

    const observer = new IntersectionObserver(
      (entries) => {
        // Prefer largest visible overlap with the viewport band — not `intersectionRatio`.
        // Tall sections (e.g. Tech Stack) lose if we sort by ratio: visible strip / full section height stays tiny.
        const visible = entries
          .filter((e) => e.isIntersecting && overlapArea(e) > 0)
          .sort((a, b) => overlapArea(b) - overlapArea(a))[0]
        if (!visible?.target) return
        setActiveId((visible.target as HTMLElement).id)
      },
      { root: null, threshold: [0, 0.1, 0.25, 0.5, 0.75, 1], rootMargin: '-18% 0px -62% 0px' },
    )

    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [sectionIds])

  return activeId
}
