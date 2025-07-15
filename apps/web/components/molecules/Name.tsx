import { HTMLAttributes, memo } from 'react'
import { Resume } from '../../types'
import { cn } from '@cv/lib'
import Link from 'next/link'

interface Props extends HTMLAttributes<HTMLDivElement> {
   resume: Resume
}

// Memoized Name component
export const Name = memo<Props>(({ resume, className, ...rest }) => {
   return (
      <h1 className={cn('w-full flex flex-col', className)} {...rest}>
         <Link
            href={resume.nameLink}
            target="_blank"
            className="text-2xl mb-1.5 font-bold hover:underline"
            title={`${resume.name} ${resume.nick ? `(${resume.nick})` : ''}`}
         >
            {resume.name}
         </Link>
      </h1>
   )
})

Name.displayName = 'Name'
