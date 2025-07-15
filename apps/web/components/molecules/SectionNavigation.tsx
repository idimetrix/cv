import { HTMLAttributes } from 'react'
import { cn } from '@cv/lib'
import {
   useHashNavigation,
   useActiveSection,
   SectionId,
} from '../../utils/navigation'

interface Props extends HTMLAttributes<HTMLDivElement> {}

interface Section {
   id: SectionId
   title: string
   letter: string
   visible: boolean
}

// Define all available sections - exactly matching Actions component style
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

export const SectionNavigation = ({ className, ...rest }: Props) => {
   const { goToSection } = useHashNavigation()
   const activeSection = useActiveSection()

   const visibleSections = sections.filter((section) => section.visible)

   const handleSectionClick = (sectionId: SectionId) => {
      goToSection(sectionId)
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
            {visibleSections.map((section) => (
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
               >
                  {section.letter}
               </button>
            ))}
         </div>
      </div>
   )
}
