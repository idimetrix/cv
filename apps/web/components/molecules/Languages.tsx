import { HTMLAttributes } from 'react'
import { Resume } from '../../types'
import { cn } from '@cv/lib'

interface Props extends HTMLAttributes<HTMLDivElement> {
   resume: Resume
}

export const Languages = ({ resume, className, ...rest }: Props) => {
   return (
      <div className={cn('flex flex-col gap-3 w-full', className)} {...rest}>
         <div className="text-2xl font-bold">Languages</div>
         <div className="flex gap-1.5 flex-wrap">
            {Object.entries(resume.languages).map(([language, level]) => (
               <button
                  className="inline-flex items-center rounded-md border px-2 py-0.5 text-sm font-bold transition-colors focus:outline-none text-nowrap border-transparent bg-black/80 text-white hover:bg-black/60"
                  key={language}
                  title={`${language} - ${level}`}
               >
                  {language} -
                  <span className="bg-white rounded text-black ml-1.5 leading-none px-1.5 py-0.5">
                     {level}
                  </span>
               </button>
            ))}
         </div>
      </div>
   )
}
