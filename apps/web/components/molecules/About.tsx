import { HTMLAttributes, memo } from 'react'
import { Resume } from '../../types'
import { cn } from '@cv/lib'
import Link from 'next/link'
import { Heading } from '../atoms'

interface Props extends HTMLAttributes<HTMLDivElement> {
   resume: Resume
}

// Memoized About component
export const About = memo<Props>(({ resume, className, ...rest }) => {
   return (
      <div className={cn('flex flex-col gap-3 w-full', className)} {...rest}>
         <Heading level={2} className="">
            About
         </Heading>
         <Link href={resume.aboutLink} target="_blank">
            {resume.about}
         </Link>
      </div>
   )
})

About.displayName = 'About'
