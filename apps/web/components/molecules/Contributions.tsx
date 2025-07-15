import { HTMLAttributes, memo } from 'react'
import { Resume } from '../../types'
import { cn } from '@cv/lib'
import Link from 'next/link'
import { Heading } from '../atoms'

interface Props extends HTMLAttributes<HTMLDivElement> {
   resume: Resume
}

// Memoized Contributions component
export const Contributions = memo<Props>(({ resume, className, ...rest }) => {
   return (
      <div className={cn('flex flex-col gap-3 w-full', className)} {...rest}>
         <Heading level={2}>Contributions</Heading>

         <div className="flex gap-1.5 flex-wrap">
            {resume.contributions.map((contribution) => (
               <Link
                  key={contribution.link}
                  href={contribution.link}
                  title={contribution.description || contribution.name}
                  target="_blank"
                  className="border border-black border px-1.5 text-sm py-0.5 leading-tight transition-all duration-300 hover:scale-105"
               >
                  {contribution.name}
               </Link>
            ))}
         </div>
      </div>
   )
})

Contributions.displayName = 'Contributions'
