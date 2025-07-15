import { HTMLAttributes, memo } from 'react'
import { Resume } from '../../types'
import { cn } from '@cv/lib'
import Link from 'next/link'

interface Props extends HTMLAttributes<HTMLDivElement> {
   resume: Resume
}

// Memoized Summary component
export const Summary = memo<Props>(({ resume, className, ...rest }) => {
   return (
      <div className={cn('w-full flex flex-col', className)} {...rest}>
         <Link
            href={resume.summaryLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-black/90 hover:underline font-bold text-lg"
            title={resume.summary}
         >
            {resume.summary}
         </Link>
      </div>
   )
})

Summary.displayName = 'Summary'
