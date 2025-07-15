import { HTMLAttributes, useCallback, useMemo, useState, memo } from 'react'
import { Resume } from '../../types'
import { cn } from '@cv/lib'
import Link from 'next/link'
import Image from 'next/image'
import { Heading, MarkdownText } from '../atoms'

interface Props extends HTMLAttributes<HTMLDivElement> {
   resume: Resume
}

interface ProjectProps extends HTMLAttributes<HTMLDivElement> {
   project: Resume['projects'][0]
}

// Memoized Project component to prevent unnecessary re-renders
export const Project = memo<ProjectProps>(({ project, className, ...rest }) => {
   return (
      <div
         className={cn(
            'flex border group border-border rounded-md p-3 gap-1.5 transition-all duration-300 group hover:scale-105 flex-col',
            className
         )}
         {...rest}
      >
         <div className="w-full flex items-center gap-1.5">
            {project.image && (
               <Image
                  src={project.image}
                  alt={project.title}
                  width={24}
                  height={24}
                  className="w-6 h-6 min-w-6 min-h-6 group-hover:grayscale-0 transition-all duration-300"
               />
            )}
            <Link
               href={project.link || '#'}
               target="_blank"
               rel="noopener noreferrer"
               className="font-bold leading-tight hover:underline"
            >
               {project.title}
            </Link>
         </div>
         <div
            className="text-sm text-black/80 leading-tight line-clamp-5"
            title={project.description}
         >
            <MarkdownText>{project.description}</MarkdownText>
         </div>
         <div className="flex gap-1.5 mt-1.5 flex-wrap">
            {project.badges?.map((badge) => (
               <button
                  className="inline-flex group-hover:bg-black/80 group-hover:text-white items-center rounded-md border px-1.5 py-0.5 text-xs focus:outline-none text-nowrap border-transparent bg-black/5 text-black"
                  key={badge}
                  type="button"
                  aria-label={`Technology: ${badge}`}
                  title={`Project technology: ${badge}`}
               >
                  {badge}
               </button>
            ))}
         </div>
      </div>
   )
})

Project.displayName = 'Project'

// Memoized Projects component
export const Projects = memo<Props>(({ resume, className, ...rest }) => {
   const [more, setMore] = useState(false)

   const primaryProjects = useMemo(
      () => resume.projects.slice(0, 15),
      [resume.projects]
   )

   const secondaryProjects = useMemo(
      () => resume.projects.slice(15),
      [resume.projects]
   )

   const handleMore = useCallback(() => {
      setMore((more) => !more)
   }, [])

   // Generate stable keys for projects
   const getProjectKey = useCallback(
      (project: Resume['projects'][0], index: number) => {
         return `${project.title}-${index}` // Use index for stability if title+description might not be unique
      },
      []
   )

   return (
      <div className={cn('flex flex-col gap-3 w-full', className)} {...rest}>
         <Heading level={2}>Projects</Heading>

         {!!primaryProjects.length && (
            <div className="grid grid-cols-1 gap-3 print:grid-cols-3 print:gap-3 md:grid-cols-2 lg:grid-cols-3">
               {primaryProjects.map((project, index) => (
                  <Project
                     key={getProjectKey(project, index)}
                     project={project}
                  />
               ))}
            </div>
         )}

         {!!secondaryProjects.length && (
            <div className="w-full flex flex-col gap-3 print:hidden">
               <button
                  onClick={handleMore}
                  type="button"
                  aria-label={`Show ${more ? 'less' : 'more'} projects`}
                  aria-expanded={more}
                  className="w-full uppercase border border-border px-1.5 text-sm py-0.5 leading-tight transition-all duration-300 hover:scale-105"
               >
                  show {more ? 'less' : 'more'}
               </button>

               <div
                  className={cn(
                     'grid grid-cols-1 gap-3 print:grid-cols-3 print:gap-3 md:grid-cols-2 lg:grid-cols-3',
                     !more && 'hidden'
                  )}
               >
                  {secondaryProjects.map((project, index) => (
                     <Project
                        key={getProjectKey(
                           project,
                           primaryProjects.length + index
                        )}
                        project={project}
                     />
                  ))}
               </div>
            </div>
         )}
      </div>
   )
})

Projects.displayName = 'Projects'
