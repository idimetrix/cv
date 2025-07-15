import { HTMLAttributes, memo } from 'react'
import { Resume } from '../../types'
import { cn } from '@cv/lib'
import Link from 'next/link'
import { Heading, Markdown } from '../atoms'

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
         <Link
            href={resume.aboutLink}
            target="_blank"
            rel="noopener noreferrer"
         >
            <div className="w-full flex flex-col gap-3">
               {resume.about?.map((content, index) => (
                  <div key={`${content.title}-${index}`}>
                     {content.title && <b>{content.title}:</b>}{' '}
                     {content.description && (
                        <Markdown>{content.description}</Markdown>
                     )}
                     {content.items && content.items.length > 0 && (
                        <span> {content.items.join(' • ')}</span>
                     )}
                  </div>
               ))}
            </div>
         </Link>
      </div>
   )
})

About.displayName = 'About'
