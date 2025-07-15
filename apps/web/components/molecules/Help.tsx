import { HTMLAttributes, memo } from 'react'
import { Resume } from '../../types'
import { cn } from '@cv/lib'
import Link from 'next/link'
import { Heading } from '../atoms'

interface Props extends HTMLAttributes<HTMLDivElement> {
   resume: Resume
}

// Memoized Help component
export const Help = memo<Props>(({ resume, className, ...rest }) => {
   return (
      <div className={cn('flex flex-col gap-3 w-full', className)} {...rest}>
         <Heading level={2} className="">
            3 points I can help
         </Heading>
         <Link href={resume.helpLink} target="_blank">
            {resume.help}
         </Link>
      </div>
   )
})

Help.displayName = 'Help'
