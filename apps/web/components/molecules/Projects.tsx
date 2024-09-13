import { HTMLAttributes } from 'react'
import { Resume } from '../../types'
import { cn } from '@cv/lib'
import Link from 'next/link'

interface Props extends HTMLAttributes<HTMLDivElement> {
   resume: Resume
}

export const Projects = ({ resume, className, ...rest }: Props) => {
   return (
      <div className={cn('flex flex-col gap-3 w-full', className)} {...rest}>
         <div className="text-2xl font-bold">Projects</div>

         <div className="grid grid-cols-1 gap-3 print:grid-cols-3 print:gap-3 md:grid-cols-2 lg:grid-cols-3">
            {resume.projects.map((project) => (
               <div
                  key={`${project.title}-${project.description}`}
                  className="flex border border-border rounded-md p-3 gap-1.5 transition-all duration-300 group hover:scale-105 flex-col"
               >
                  <Link
                     href={project.link || '#'}
                     target="_blank"
                     className="font-bold leading-tight hover:underline"
                  >
                     {project.title}
                  </Link>
                  <div className="text-sm text-black/80 leading-tight">
                     {project.description}
                  </div>
                  <div className="flex gap-1.5 mt-1.5 flex-wrap">
                     {project.badges?.map((badge) => (
                        <button
                           className="inline-flex items-center rounded-md border px-1.5 py-0.5 text-xs transition-colors focus:outline-none text-nowrap border-transparent bg-black/5 text-black"
                           key={badge}
                        >
                           {badge}
                        </button>
                     ))}
                  </div>
               </div>
            ))}
         </div>
      </div>
   )
}
