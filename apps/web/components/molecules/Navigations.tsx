import {
   HTMLAttributes,
   useEffect,
   useState,
   useCallback,
   useMemo,
   memo,
} from 'react'
import { cn } from '@cv/lib'
import {
   useHashNavigation,
   useActiveSection,
   SectionId,
   validateSections,
} from '../../utils/navigation'

interface Props extends HTMLAttributes<HTMLDivElement> {}

interface Section {
   id: SectionId
   title: string
   letter: string
   visible: boolean
}

// Define all available sections - exactly matching Actions component style
// Memoized to prevent recreation on each render
const sections: Section[] = [
   { id: 'header', title: 'Header', letter: 'H', visible: true },
   { id: 'about', title: 'About', letter: 'A', visible: true },
   { id: 'experience', title: 'Experience', letter: 'E', visible: true },
   { id: 'education', title: 'Education', letter: 'D', visible: true },
   { id: 'skills', title: 'Skills', letter: 'S', visible: true },
   { id: 'languages', title: 'Languages', letter: 'L', visible: true },
   { id: 'projects', title: 'Projects', letter: 'P', visible: true },
   { id: 'contributions', title: 'Contributions', letter: 'C', visible: true },
]

// Bug-free Navigations component with comprehensive error handling and React optimizations
export const Navigations = memo<Props>(({ className, ...rest }) => {
   const [isReady, setIsReady] = useState(false)
   const [hasErrors, setHasErrors] = useState(false)
   const { goToSection } = useHashNavigation()
   const activeSection = useActiveSection()

   // Memoize visible sections to prevent recalculation
   const visibleSections = useMemo(
      () => sections.filter((section) => section.visible),
      []
   )

   // Memoize readiness check function
   const checkReadiness = useCallback(() => {
      try {
         // Wait for DOM to be fully loaded
         if (typeof window === 'undefined' || !document.getElementById('cv')) {
            return false
         }

         // Validate that all required sections exist
         validateSections()
         const availableSections = sections.filter(
            (section) => document.getElementById(section.id) !== null
         )

         if (availableSections.length === 0) {
            console.warn('No navigation sections found in DOM')
            setHasErrors(true)
            return false
         }

         setIsReady(true)
         setHasErrors(false)
         return true
      } catch (error) {
         console.error('Error checking navigation readiness:', error)
         setHasErrors(true)
         return false
      }
   }, [])

   // Validate sections exist and component is ready
   useEffect(() => {
      // Initial check
      if (!checkReadiness()) {
         // Retry after a short delay if not ready
         const timer = setTimeout(checkReadiness, 100)
         return () => clearTimeout(timer)
      }
   }, [checkReadiness])

   // Memoized event handler for section clicks
   const handleSectionClick = useCallback(
      (sectionId: SectionId) => {
         try {
            // Validate section exists before attempting navigation
            const element = document.getElementById(sectionId)
            if (!element) {
               console.warn(
                  `Cannot navigate to section "${sectionId}" - element not found`
               )
               return
            }

            const success = goToSection(sectionId)
            if (!success) {
               console.error(`Failed to navigate to section "${sectionId}"`)
            }
         } catch (error) {
            console.error(
               `Error handling navigation to section "${sectionId}":`,
               error
            )
         }
      },
      [goToSection]
   )

   // Don't render if there are errors or component isn't ready
   if (hasErrors || !isReady || visibleSections.length === 0) {
      return null
   }

   return (
      <div
         className={cn(
            'fixed top-0 left-0 right-0 w-[210mm] print:hidden mx-auto',
            className
         )}
         {...rest}
      >
         <div className="absolute flex gap-[1px] flex-col text-sm font-mono right-full mr-[1px]">
            {visibleSections.map((section) => {
               try {
                  return (
                     <button
                        key={section.id}
                        onClick={() => handleSectionClick(section.id)}
                        className={cn(
                           'transition-all uppercase duration-300 w-[24px] h-[24px] items-center justify-center flex',
                           activeSection === section.id
                              ? 'bg-black text-white'
                              : 'bg-white hover:bg-black hover:text-white'
                        )}
                        title={`Navigate to ${section.title}`}
                        aria-label={`Navigate to ${section.title} section`}
                        type="button"
                     >
                        {section.letter}
                     </button>
                  )
               } catch (error) {
                  console.error(
                     `Error rendering navigation button for section "${section.id}":`,
                     error
                  )
                  return null
               }
            })}
         </div>
      </div>
   )
})

Navigations.displayName = 'Navigations'
