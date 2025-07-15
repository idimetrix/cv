import { useEffect, useState, useCallback } from 'react'

// Available sections that support hash navigation
export const AVAILABLE_SECTIONS = [
   'header',
   'about',
   'experience',
   'education',
   'skills',
   'languages',
   'projects',
   'contributions',
   'technologies',
   'characteristics',
   'help',
   'actions',
] as const

export type SectionId = (typeof AVAILABLE_SECTIONS)[number]

// Navigate to a specific section
export const navigateToSection = (
   sectionId: SectionId,
   smooth: boolean = true
): void => {
   const element = document.getElementById(sectionId)
   if (element) {
      element.scrollIntoView({
         behavior: smooth ? 'smooth' : 'auto',
         block: 'start',
      })

      // Update URL hash without triggering page reload
      if (typeof window !== 'undefined') {
         const newUrl = `${window.location.pathname}${window.location.search}#${sectionId}`
         window.history.replaceState({}, '', newUrl)
      }
   }
}

// Get section from current URL hash
export const getCurrentSectionFromHash = (): SectionId | null => {
   if (typeof window === 'undefined') return null

   const hash = window.location.hash.slice(1) // Remove '#'
   return AVAILABLE_SECTIONS.includes(hash as SectionId)
      ? (hash as SectionId)
      : null
}

// Hook for managing hash-based navigation
export const useHashNavigation = () => {
   const [currentSection, setCurrentSection] = useState<SectionId | null>(null)

   // Handle hash changes from URL
   useEffect(() => {
      const handleHashChange = () => {
         const section = getCurrentSectionFromHash()
         if (section) {
            setCurrentSection(section)
            navigateToSection(section, true)
         }
      }

      // Check initial hash
      handleHashChange()

      // Listen for hash changes
      window.addEventListener('hashchange', handleHashChange)

      return () => {
         window.removeEventListener('hashchange', handleHashChange)
      }
   }, [])

   // Navigate to section and update hash
   const goToSection = useCallback(
      (sectionId: SectionId, smooth: boolean = true) => {
         navigateToSection(sectionId, smooth)
         setCurrentSection(sectionId)
      },
      []
   )

   return {
      currentSection,
      goToSection,
      availableSections: AVAILABLE_SECTIONS,
   }
}

// Hook for tracking the active section based on scroll position
export const useActiveSection = (): SectionId | null => {
   const [activeSection, setActiveSection] = useState<SectionId | null>(null)

   useEffect(() => {
      const handleScroll = () => {
         const sectionElements = AVAILABLE_SECTIONS.map((sectionId) => {
            const element = document.getElementById(sectionId)
            return element
               ? {
                    id: sectionId as SectionId,
                    element,
                    top: element.offsetTop,
                    height: element.offsetHeight,
                 }
               : null
         })
            .filter(Boolean)
            .sort((a, b) => a!.top - b!.top)

         const scrollPosition = window.scrollY + 200 // offset for better UX
         const windowHeight = window.innerHeight

         for (let i = sectionElements.length - 1; i >= 0; i--) {
            const section = sectionElements[i]!

            // Check if section is in viewport
            const isInViewport =
               scrollPosition >= section.top &&
               scrollPosition < section.top + section.height

            if (isInViewport || scrollPosition >= section.top) {
               setActiveSection(section.id)
               break
            }
         }
      }

      // Throttle scroll events for better performance
      let ticking = false
      const throttledHandleScroll = () => {
         if (!ticking) {
            requestAnimationFrame(() => {
               handleScroll()
               ticking = false
            })
            ticking = true
         }
      }

      window.addEventListener('scroll', throttledHandleScroll)
      handleScroll() // Set initial active section

      return () => window.removeEventListener('scroll', throttledHandleScroll)
   }, [])

   return activeSection
}

// Keyboard navigation hook
export const useKeyboardNavigation = (
   onNavigate: (sectionId: SectionId) => void
) => {
   useEffect(() => {
      const handleKeyDown = (event: KeyboardEvent) => {
         // Only handle navigation when no input is focused
         if (
            document.activeElement?.tagName === 'INPUT' ||
            document.activeElement?.tagName === 'TEXTAREA'
         ) {
            return
         }

         const currentIndex = AVAILABLE_SECTIONS.findIndex((section) =>
            document.getElementById(section)?.classList.contains('active')
         )

         switch (event.key) {
            case 'ArrowDown':
            case 'j': // Vim-style navigation
               event.preventDefault()
               const nextIndex = (currentIndex + 1) % AVAILABLE_SECTIONS.length
               onNavigate(AVAILABLE_SECTIONS[nextIndex])
               break

            case 'ArrowUp':
            case 'k': // Vim-style navigation
               event.preventDefault()
               const prevIndex =
                  currentIndex > 0
                     ? currentIndex - 1
                     : AVAILABLE_SECTIONS.length - 1
               onNavigate(AVAILABLE_SECTIONS[prevIndex])
               break

            case 'Home':
               event.preventDefault()
               onNavigate('header')
               break

            case 'End':
               event.preventDefault()
               onNavigate('actions')
               break
         }
      }

      window.addEventListener('keydown', handleKeyDown)
      return () => window.removeEventListener('keydown', handleKeyDown)
   }, [onNavigate])
}

// Generate section URL with hash
export const getSectionUrl = (
   sectionId: SectionId,
   baseUrl?: string
): string => {
   if (typeof window !== 'undefined') {
      const base =
         baseUrl ||
         `${window.location.protocol}//${window.location.host}${window.location.pathname}`
      return `${base}#${sectionId}`
   }
   return `#${sectionId}`
}

// Copy section link to clipboard
export const copySectionLink = async (
   sectionId: SectionId
): Promise<boolean> => {
   try {
      const url = getSectionUrl(sectionId)
      await navigator.clipboard.writeText(url)
      return true
   } catch (error) {
      console.error('Failed to copy section link:', error)
      return false
   }
}
