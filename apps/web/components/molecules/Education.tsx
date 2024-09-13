import { HTMLAttributes } from 'react'
import { Resume } from '../../types'
import { cn } from '@cv/lib'
import Link from 'next/link'

interface Props extends HTMLAttributes<HTMLDivElement> {
   resume: Resume
}

export const Education = ({ resume, className, ...rest }: Props) => {
   return (
      <div className={cn('flex flex-col gap-3 w-full', className)} {...rest}>
         <div className="text-2xl font-bold">Education</div>

         <div className="flex w-full gap-3 flex-col">
            {resume.educations.map((education) => (
               <div
                  key={`${education.company}-${education.title}-${education.description}`}
                  className="flex flex-col"
               >
                  <div className="flex justify-between items-center">
                     <div className="flex items-center gap-1.5">
                        <Link
                           href={education.link || '#'}
                           target="_blank"
                           className="text-left font-bold hover:underline"
                        >
                           {education.company}
                        </Link>
                        <div className="flex items-center gap-1.5">
                           {education.badges?.map((badge) => (
                              <span
                                 key={badge}
                                 className="inline-flex items-center rounded-md border px-2 py-0.5 text-sm font-bold transition-colors focus:outline-none text-nowrap border-transparent bg-black/5 text-black"
                              >
                                 {badge}
                              </span>
                           ))}
                        </div>
                     </div>
                     <div className="italic">{`${education.start} - ${education.end || 'Present'}`}</div>
                  </div>
                  <div>{education.title}</div>
                  <div className="text-sm w-full text-black/70">
                     {education.description}
                  </div>
               </div>
            ))}
         </div>
      </div>
   )
}
