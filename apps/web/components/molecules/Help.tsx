import { HTMLAttributes, memo } from 'react'
import { Resume } from '../../types'
import { cn } from '@cv/lib'
import Link from 'next/link'
import { Heading, Markdown } from '../atoms'

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
         <Link href={resume.helpLink} target="_blank" rel="noopener noreferrer">
            <div className="flex w-full flex-col gap-3">
               {resume.help?.map((content, index) => (
                  <div
                     key={`${content.title}-${index}`}
                     className="flex w-full flex-col gap-1.5"
                  >
                     <h3 className="font-bold">{content.title}</h3>
                     {content.description && (
                        <div>
                           <Markdown>{content.description}</Markdown>
                        </div>
                     )}
                     <ul className="">
                        {content.items?.map((item, itemIndex) => {
                           const colonIndex = item.indexOf(':')
                           if (colonIndex > 0) {
                              const beforeColon = item.substring(0, colonIndex)
                              const afterColon = item.substring(colonIndex + 1)
                              return (
                                 <li key={itemIndex}>
                                    <strong>{beforeColon}</strong>:
                                    <Markdown>{afterColon}</Markdown>
                                 </li>
                              )
                           }
                           return (
                              <li key={itemIndex}>
                                 <Markdown>{item}</Markdown>
                              </li>
                           )
                        })}
                     </ul>
                  </div>
               ))}
            </div>
         </Link>
      </div>
   )
})

Help.displayName = 'Help'
