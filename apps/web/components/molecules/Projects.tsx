import { HTMLAttributes } from 'react'
import { Resume } from '../../types'
import { cn } from '@cv/lib'
import Link from 'next/link'
import Image from 'next/image'
import { Heading } from '../atoms'

interface Props extends HTMLAttributes<HTMLDivElement> {
   resume: Resume
}

export const Projects = ({ resume, className, ...rest }: Props) => {
   return (
      <div className={cn('flex flex-col gap-3 w-full', className)} {...rest}>
         <Heading level={2}>Projects</Heading>

         <div className="grid grid-cols-1 gap-3 print:grid-cols-3 print:gap-3 md:grid-cols-2 lg:grid-cols-3">
            {resume.projects.map((project) => (
               <div
                  key={`${project.title}-${project.description}`}
                  className="flex border group border-border rounded-md p-3 gap-1.5 transition-all duration-300 group hover:scale-105 flex-col"
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
                        className="font-bold leading-tight hover:underline"
                     >
                        {project.title}
                     </Link>
                  </div>
                  <div className="text-sm text-black/80 leading-tight">
                     {project.description}
                  </div>
                  <div className="flex gap-1.5 mt-1.5 flex-wrap">
                     {project.badges?.map((badge) => (
                        <button
                           className="inline-flex group-hover:bg-black/80 group-hover:text-white items-center rounded-md border px-1.5 py-0.5 text-xs focus:outline-none text-nowrap border-transparent bg-black/5 text-black"
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
