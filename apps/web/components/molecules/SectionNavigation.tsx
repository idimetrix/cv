import { HTMLAttributes, useState, useEffect } from 'react'
import { cn } from '@cv/lib'
import {
   useHashNavigation,
   useActiveSection,
   useKeyboardNavigation,
   copySectionLink,
   SectionId,
} from '../../utils/navigation'

interface Props extends HTMLAttributes<HTMLDivElement> {
   compact?: boolean
   position?: 'fixed' | 'static'
   side?: 'left' | 'right'
   showKeyboardShortcuts?: boolean
}

interface Section {
   id: SectionId
   title: string
   icon?: string
   visible?: boolean
   shortcut?: string
}

// Define all available sections with enhanced metadata
const sections: Section[] = [
   {
      id: 'header',
      title: 'Header',
      icon: '👤',
      visible: true,
      shortcut: 'Home',
   },
   { id: 'about', title: 'About', icon: '📝', visible: true, shortcut: 'A' },
   {
      id: 'experience',
      title: 'Experience',
      icon: '💼',
      visible: true,
      shortcut: 'E',
   },
   {
      id: 'education',
      title: 'Education',
      icon: '🎓',
      visible: true,
      shortcut: 'D',
   },
   { id: 'skills', title: 'Skills', icon: '⚡', visible: true, shortcut: 'S' },
   {
      id: 'languages',
      title: 'Languages',
      icon: '🗣️',
      visible: true,
      shortcut: 'L',
   },
   {
      id: 'projects',
      title: 'Projects',
      icon: '🚀',
      visible: true,
      shortcut: 'P',
   },
   {
      id: 'contributions',
      title: 'Contributions',
      icon: '🌟',
      visible: true,
      shortcut: 'C',
   },
   {
      id: 'technologies',
      title: 'Technologies',
      icon: '🔧',
      visible: false,
      shortcut: 'T',
   },
   {
      id: 'characteristics',
      title: 'Characteristics',
      icon: '✨',
      visible: false,
      shortcut: 'H',
   },
   { id: 'help', title: 'Help', icon: '❓', visible: false, shortcut: '?' },
   {
      id: 'actions',
      title: 'Actions',
      icon: '📋',
      visible: true,
      shortcut: 'End',
   },
]

export const SectionNavigation = ({
   compact = false,
   position = 'fixed',
   side = 'right',
   showKeyboardShortcuts = false,
   className,
   ...rest
}: Props) => {
   const [isExpanded, setIsExpanded] = useState(false)
   const [copiedSection, setCopiedSection] = useState<SectionId | null>(null)

   const { goToSection } = useHashNavigation()
   const activeSection = useActiveSection()

   // Enable keyboard navigation
   useKeyboardNavigation(goToSection)

   const visibleSections = sections.filter((section) => section.visible)

   const handleSectionClick = (sectionId: SectionId) => {
      goToSection(sectionId)
      if (compact) {
         setIsExpanded(false)
      }
   }

   const handleCopyLink = async (
      sectionId: SectionId,
      event: React.MouseEvent
   ) => {
      event.stopPropagation()
      const success = await copySectionLink(sectionId)
      if (success) {
         setCopiedSection(sectionId)
         setTimeout(() => setCopiedSection(null), 2000)
      }
   }

   if (position === 'static') {
      return (
         <nav className={cn('w-full', className)} {...rest}>
            <div className="flex flex-wrap gap-2 justify-center mb-6">
               {visibleSections.map((section) => (
                  <div key={section.id} className="relative group">
                     <button
                        onClick={() => handleSectionClick(section.id)}
                        className={cn(
                           'inline-flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 hover:scale-105',
                           'border border-gray-300 bg-white shadow-sm hover:shadow-md',
                           activeSection === section.id
                              ? 'bg-blue-50 border-blue-300 text-blue-700 ring-2 ring-blue-200'
                              : 'text-gray-700 hover:bg-gray-50'
                        )}
                        title={`Navigate to ${section.title}${showKeyboardShortcuts && section.shortcut ? ` (${section.shortcut})` : ''}`}
                     >
                        {section.icon && <span>{section.icon}</span>}
                        <span>{section.title}</span>
                     </button>

                     {/* Copy link button */}
                     <button
                        onClick={(e) => handleCopyLink(section.id, e)}
                        className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-gray-600 text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-blue-600 flex items-center justify-center"
                        title="Copy link to section"
                     >
                        {copiedSection === section.id ? '✓' : '🔗'}
                     </button>
                  </div>
               ))}
            </div>

            {showKeyboardShortcuts && (
               <div className="text-xs text-gray-500 text-center mt-2">
                  Use arrow keys (↑↓), J/K, or Home/End to navigate • Click 🔗
                  to copy section links
               </div>
            )}
         </nav>
      )
   }

   return (
      <div
         className={cn(
            'print:hidden z-50',
            position === 'fixed' && `fixed top-1/2 transform -translate-y-1/2`,
            side === 'left' ? 'left-4' : 'right-4',
            className
         )}
         {...rest}
      >
         {compact ? (
            <div className="relative">
               {/* Compact floating button */}
               <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className={cn(
                     'w-12 h-12 rounded-full bg-white shadow-lg border border-gray-200',
                     'flex items-center justify-center text-gray-600 hover:text-blue-600',
                     'transition-all duration-200 hover:shadow-xl hover:scale-110',
                     'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
                     isExpanded &&
                        'bg-blue-50 text-blue-600 ring-2 ring-blue-200'
                  )}
                  title="Navigate sections (use arrow keys or J/K)"
               >
                  <span className="text-lg">📋</span>
               </button>

               {/* Expanded menu */}
               {isExpanded && (
                  <div
                     className={cn(
                        'absolute bg-white rounded-lg shadow-xl border border-gray-200 py-2 min-w-48',
                        side === 'left' ? 'left-14' : 'right-14',
                        'bottom-0 transform'
                     )}
                  >
                     <div className="px-3 py-1 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-100">
                        Quick Jump
                     </div>
                     {visibleSections.map((section) => (
                        <div key={section.id} className="relative group">
                           <button
                              onClick={() => handleSectionClick(section.id)}
                              className={cn(
                                 'w-full text-left px-4 py-2 text-sm flex items-center gap-3',
                                 'transition-colors duration-150',
                                 activeSection === section.id
                                    ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-500'
                                    : 'text-gray-700 hover:bg-gray-50'
                              )}
                           >
                              {section.icon && (
                                 <span className="text-base">
                                    {section.icon}
                                 </span>
                              )}
                              <span className="font-medium flex-1">
                                 {section.title}
                              </span>
                              {showKeyboardShortcuts && section.shortcut && (
                                 <span className="text-xs text-gray-400 font-mono">
                                    {section.shortcut}
                                 </span>
                              )}
                           </button>

                           {/* Copy link button */}
                           <button
                              onClick={(e) => handleCopyLink(section.id, e)}
                              className="absolute right-2 top-1/2 transform -translate-y-1/2 w-5 h-5 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-blue-100 flex items-center justify-center"
                              title="Copy link"
                           >
                              {copiedSection === section.id ? '✓' : '🔗'}
                           </button>
                        </div>
                     ))}

                     {showKeyboardShortcuts && (
                        <div className="px-3 py-2 text-xs text-gray-500 border-t border-gray-100 mt-1">
                           Use ↑↓ or J/K to navigate
                        </div>
                     )}
                  </div>
               )}
            </div>
         ) : (
            /* Full navigation sidebar */
            <nav className="bg-white rounded-lg shadow-lg border border-gray-200 p-3 max-w-xs">
               <div className="space-y-1">
                  <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-2 py-1 flex items-center justify-between">
                     Quick Navigation
                     {showKeyboardShortcuts && (
                        <span className="text-xs font-normal normal-case text-gray-400">
                           ↑↓ J/K
                        </span>
                     )}
                  </div>
                  {visibleSections.map((section) => (
                     <div key={section.id} className="relative group">
                        <button
                           onClick={() => handleSectionClick(section.id)}
                           className={cn(
                              'w-full text-left px-3 py-2 text-sm rounded-md flex items-center gap-3',
                              'transition-all duration-150 hover:scale-105',
                              activeSection === section.id
                                 ? 'bg-blue-50 text-blue-700 shadow-sm border-l-2 border-blue-500'
                                 : 'text-gray-700 hover:bg-gray-50'
                           )}
                        >
                           {section.icon && (
                              <span className="text-base">{section.icon}</span>
                           )}
                           <span className="font-medium flex-1">
                              {section.title}
                           </span>
                           {showKeyboardShortcuts && section.shortcut && (
                              <span className="text-xs text-gray-400 font-mono">
                                 {section.shortcut}
                              </span>
                           )}
                        </button>

                        {/* Copy link button */}
                        <button
                           onClick={(e) => handleCopyLink(section.id, e)}
                           className="absolute right-2 top-1/2 transform -translate-y-1/2 w-6 h-6 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-blue-100 flex items-center justify-center"
                           title="Copy direct link to this section"
                        >
                           {copiedSection === section.id ? '✓' : '🔗'}
                        </button>
                     </div>
                  ))}
               </div>

               {showKeyboardShortcuts && (
                  <div className="mt-3 pt-2 border-t border-gray-200 text-xs text-gray-500 space-y-1">
                     <div>• Arrow keys (↑↓) or J/K to navigate</div>
                     <div>• Home/End for first/last section</div>
                     <div>• Click 🔗 to copy section links</div>
                  </div>
               )}
            </nav>
         )}
      </div>
   )
}
