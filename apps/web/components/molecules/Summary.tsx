import { HTMLAttributes } from 'react'
import { Resume } from '../../types'
import { cn } from '@cv/lib'
import Link from 'next/link'

interface Props extends HTMLAttributes<HTMLDivElement> {
   resume: Resume
}

export const Summary = ({ resume, className, ...rest }: Props) => {
   return (
      <div className={cn('w-full flex flex-col', className)} {...rest}>
         <Link
            href={resume.summaryLink}
            target="_blank"
            className="text-black/90 hover:underline font-bold text-lg"
         >
            {resume.summary}
         </Link>
      </div>
   )
}
