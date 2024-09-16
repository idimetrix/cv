import { HTMLAttributes } from 'react'
import { Resume } from '../../types'
import { cn } from '@cv/lib'
import Link from 'next/link'
import { Heading } from '../atoms'

interface Props extends HTMLAttributes<HTMLDivElement> {
   resume: Resume
}

export const About = ({ resume, className, ...rest }: Props) => {
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
}
