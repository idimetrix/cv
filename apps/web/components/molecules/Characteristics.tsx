import { HTMLAttributes, memo } from 'react'
import { Resume } from '../../types'
import { cn } from '@cv/lib'
import { Heading } from '../atoms'

interface Props extends HTMLAttributes<HTMLDivElement> {
   resume: Resume
}

// Memoized Characteristics component
export const Characteristics = memo<Props>(({ resume, className, ...rest }) => {
   return (
      <div className={cn('flex flex-col gap-3 w-full', className)} {...rest}>
         <Heading level={2}>Characteristics</Heading>

         <div className="flex gap-x-1.5 gap-y-0 flex-wrap">
            {resume.characteristics.map((characteristic) => (
               <span
                  key={characteristic}
                  title={characteristic}
                  className="capitalize"
               >
                  {characteristic};
               </span>
            ))}
         </div>
      </div>
   )
})

Characteristics.displayName = 'Characteristics'
