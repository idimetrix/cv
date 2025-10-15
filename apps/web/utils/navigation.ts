import { useEffect, useState, useCallback, useRef } from 'react'

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

// Utility to safely check if we're in browser environment
const isBrowser = typeof window !== 'undefined'

// Navigate to a specific section with error handling
export const navigateToSection = (
   sectionId: SectionId,
   smooth: boolean = true
): boolean => {
   if (!isBrowser) return false

   try {
      const element = document.getElementById(sectionId)
      if (!element) {
         console.warn(`Section element with id "${sectionId}" not found`)
         return false
      }

      // Scroll to element
      element.scrollIntoView({
         behavior: smooth ? 'smooth' : 'auto',
         block: 'start',
      })

      // Update URL hash without triggering page reload
      const newUrl = `${window.location.pathname}${window.location.search}#${sectionId}`
      window.history.replaceState({}, '', newUrl)

      return true
   } catch (error) {
      console.error(`Failed to navigate to section "${sectionId}":`, error)
      return false
   }
}

// Get section from current URL hash with validation
export const getCurrentSectionFromHash = (): SectionId | null => {
   if (!isBrowser) return null

   try {
      const hash = window.location.hash.slice(1) // Remove '#'
      if (!hash) return null

      return AVAILABLE_SECTIONS.includes(hash as SectionId)
         ? (hash as SectionId)
         : null
   } catch (error) {
      console.error('Failed to get section from hash:', error)
      return null
   }
}

// Hook for managing hash-based navigation with error handling
export const useHashNavigation = () => {
   const [currentSection, setCurrentSection] = useState<SectionId | null>(null)
   const isInitialized = useRef(false)

   // Handle hash changes from URL
   useEffect(() => {
      if (!isBrowser) return

      const handleHashChange = () => {
         try {
            const section = getCurrentSectionFromHash()
            if (section) {
               setCurrentSection(section)
               // Only auto-scroll if not during initial load
               if (isInitialized.current) {
                  navigateToSection(section, true)
               }
            }
         } catch (error) {
            console.error('Error handling hash change:', error)
         }
      }

      // Check initial hash
      handleHashChange()
      isInitialized.current = true

      // Listen for hash changes
      window.addEventListener('hashchange', handleHashChange, { passive: true })

      return () => {
         window.removeEventListener('hashchange', handleHashChange)
      }
   }, [])

   // Navigate to section and update hash
   const goToSection = useCallback(
      (sectionId: SectionId, smooth: boolean = true) => {
         try {
            const success = navigateToSection(sectionId, smooth)
            if (success) {
               setCurrentSection(sectionId)
            }
            return success
         } catch (error) {
            console.error(`Failed to go to section "${sectionId}":`, error)
            return false
         }
      },
      []
   )

   return {
      currentSection,
      goToSection,
      availableSections: AVAILABLE_SECTIONS,
   }
}

// Hook for tracking the active section using Intersection Observer for better performance
export const useActiveSection = (): SectionId | null => {
   const [activeSection, setActiveSection] = useState<SectionId | null>(null)
   const observerRef = useRef<IntersectionObserver | null>(null)
   const sectionsRef = useRef<Map<string, Element>>(new Map())

   useEffect(() => {
      if (!isBrowser) return

      // Clean up previous observer
      if (observerRef.current) {
         observerRef.current.disconnect()
      }

      try {
         // Find all section elements
         const sectionElements: Element[] = []
         sectionsRef.current.clear()

         AVAILABLE_SECTIONS.forEach((sectionId) => {
            const element = document.getElementById(sectionId)
            if (element) {
               sectionElements.push(element)
               sectionsRef.current.set(sectionId, element)
            }
         })

         if (sectionElements.length === 0) {
            console.warn('No section elements found for navigation')
            return
         }

         // Create intersection observer with optimized options
         const observer = new IntersectionObserver(
            (entries) => {
               try {
                  // Find the section with the highest intersection ratio
                  let maxRatio = 0
                  let activeSectionId: SectionId | null = null

                  entries.forEach((entry) => {
                     if (
                        entry.isIntersecting &&
                        entry.intersectionRatio > maxRatio
                     ) {
                        maxRatio = entry.intersectionRatio
                        const sectionId = entry.target.id as SectionId
                        if (AVAILABLE_SECTIONS.includes(sectionId)) {
                           activeSectionId = sectionId
                        }
                     }
                  })

                  // If no section is intersecting, find the closest one based on position
                  if (!activeSectionId) {
                     const viewportCenter = window.innerHeight / 2
                     let closestDistance = Infinity

                     entries.forEach((entry) => {
                        const rect = entry.boundingClientRect
                        const elementCenter = rect.top + rect.height / 2
                        const distance = Math.abs(
                           elementCenter - viewportCenter
                        )

                        if (distance < closestDistance) {
                           closestDistance = distance
                           const sectionId = entry.target.id as SectionId
                           if (AVAILABLE_SECTIONS.includes(sectionId)) {
                              activeSectionId = sectionId
                           }
                        }
                     })
                  }

                  if (activeSectionId) {
                     setActiveSection(activeSectionId)
                  }
               } catch (error) {
                  console.error('Error in intersection observer:', error)
               }
            },
            {
               // Optimize for better performance
               root: null,
               rootMargin: '-20% 0px -20% 0px', // Only trigger when section is well into viewport
               threshold: [0, 0.1, 0.25, 0.5, 0.75, 1.0], // Multiple thresholds for accuracy
            }
         )

         // Observe all section elements
         sectionElements.forEach((element) => {
            observer.observe(element)
         })

         observerRef.current = observer

         // Set initial active section
         const initialSection = getCurrentSectionFromHash()
         if (initialSection && sectionsRef.current.has(initialSection)) {
            setActiveSection(initialSection)
         } else if (sectionElements.length > 0) {
            // Default to first section if no hash
            const firstSectionId = sectionElements[0].id as SectionId
            if (AVAILABLE_SECTIONS.includes(firstSectionId)) {
               setActiveSection(firstSectionId)
            }
         }
      } catch (error) {
         console.error('Failed to setup intersection observer:', error)

         // Fallback to scroll-based detection if IntersectionObserver fails
         const handleScroll = () => {
            try {
               const scrollPosition = window.scrollY + window.innerHeight / 2
               let closestSection: SectionId | null = null
               let closestDistance = Infinity

               AVAILABLE_SECTIONS.forEach((sectionId) => {
                  const element = document.getElementById(sectionId)
                  if (element) {
                     const rect = element.getBoundingClientRect()
                     const elementTop = window.scrollY + rect.top
                     const distance = Math.abs(elementTop - scrollPosition)

                     if (distance < closestDistance) {
                        closestDistance = distance
                        closestSection = sectionId
                     }
                  }
               })

               if (closestSection) {
                  setActiveSection(closestSection)
               }
            } catch (error) {
               console.error('Error in scroll fallback:', error)
            }
         }

         // Throttled scroll listener as fallback
         let ticking = false
         const throttledScroll = () => {
            if (!ticking) {
               requestAnimationFrame(() => {
                  handleScroll()
                  ticking = false
               })
               ticking = true
            }
         }

         window.addEventListener('scroll', throttledScroll, { passive: true })
         handleScroll() // Initial call

         return () => {
            window.removeEventListener('scroll', throttledScroll)
         }
      }

      return () => {
         if (observerRef.current) {
            observerRef.current.disconnect()
            observerRef.current = null
         }
      }
   }, [])

   return activeSection
}

// Keyboard navigation hook
export const useKeyboardNavigation = (
   onNavigate: (_sectionId: SectionId) => void
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
            case 'j': {
               // Vim-style navigation
               event.preventDefault()
               const nextIndex = (currentIndex + 1) % AVAILABLE_SECTIONS.length
               onNavigate(AVAILABLE_SECTIONS[nextIndex])
               break
            }

            case 'ArrowUp':
            case 'k': {
               // Vim-style navigation
               event.preventDefault()
               const prevIndex =
                  currentIndex > 0
                     ? currentIndex - 1
                     : AVAILABLE_SECTIONS.length - 1
               onNavigate(AVAILABLE_SECTIONS[prevIndex])
               break
            }

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

// Generate section URL with hash safely
export const getSectionUrl = (
   sectionId: SectionId,
   baseUrl?: string
): string => {
   if (!isBrowser) return `#${sectionId}`

   try {
      const base =
         baseUrl ||
         `${window.location.protocol}//${window.location.host}${window.location.pathname}`
      return `${base}#${sectionId}`
   } catch (error) {
      console.error('Failed to generate section URL:', error)
      return `#${sectionId}`
   }
}

// Copy section link to clipboard with error handling
export const copySectionLink = async (
   sectionId: SectionId
): Promise<boolean> => {
   if (!isBrowser) return false

   try {
      const url = getSectionUrl(sectionId)

      // Check if clipboard API is available
      if (navigator.clipboard && navigator.clipboard.writeText) {
         await navigator.clipboard.writeText(url)
         return true
      } else {
         // Fallback for older browsers
         const textArea = document.createElement('textarea')
         textArea.value = url
         textArea.style.position = 'fixed'
         textArea.style.opacity = '0'
         document.body.appendChild(textArea)
         textArea.select()

         const success = document.execCommand('copy')
         document.body.removeChild(textArea)
         return success
      }
   } catch (error) {
      console.error('Failed to copy section link:', error)
      return false
   }
}

// Validate that all required sections exist in the DOM
export const validateSections = (): {
   valid: boolean
   missing: SectionId[]
} => {
   if (!isBrowser) {
      return { valid: false, missing: [...AVAILABLE_SECTIONS] }
   }

   const missing: SectionId[] = []

   AVAILABLE_SECTIONS.forEach((sectionId) => {
      const element = document.getElementById(sectionId)
      if (!element) {
         missing.push(sectionId)
      }
   })

   return {
      valid: missing.length === 0,
      missing,
   }
}
