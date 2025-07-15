import { HTMLAttributes, memo, useCallback } from 'react'
import { Resume } from '../../types'
import { cn } from '@cv/lib'
import Link from 'next/link'
import { Heading } from '../atoms'

interface Props extends HTMLAttributes<HTMLDivElement> {
   resume: Resume
}

// Memoized Experience component
export const Experience = memo<Props>(({ resume, className, ...rest }) => {
   // Generate stable keys for experiences
   const getExperienceKey = useCallback(
      (experience: Resume['experiences'][0], index: number) => {
         return `experience-${experience.company}-${index}`
      },
      []
   )

   return (
      <div className={cn('flex flex-col gap-3 w-full', className)} {...rest}>
         <Heading level={2}>Experience</Heading>

         <div className="flex w-full gap-3 flex-col">
            {resume.experiences.map((experience, index) => (
               <div
                  key={getExperienceKey(experience, index)}
                  className="flex flex-col"
               >
                  <div className="flex justify-between items-center flex-wrap">
                     <div className="flex items-center flex-wrap gap-1.5">
                        <Link
                           href={experience.link || '#'}
                           target="_blank"
                           className="text-left font-bold hover:underline"
                        >
                           {experience.company}
                        </Link>
                        <div className="flex items-center gap-1.5">
                           {experience.badges?.map((badge) => (
                              <span
                                 key={badge}
                                 className="inline-flex items-center rounded-md border px-2 py-0.5 text-sm font-bold transition-colors focus:outline-none text-nowrap border-transparent bg-black/5 text-black"
                              >
                                 {badge}
                              </span>
                           ))}
                        </div>
                     </div>
                     <div className="italic">{`${experience.start} - ${experience.end || 'Present'}`}</div>
                  </div>
                  <div className="font-semibold flex items-center gap-1.5">
                     {experience.title}
                  </div>
                  <div className="text-sm w-full text-black/70">
                     {experience.description}
                  </div>
               </div>
            ))}
         </div>
      </div>
   )
})

Experience.displayName = 'Experience'
