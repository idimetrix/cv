import { HTMLAttributes } from 'react'
import { Resume } from '../../types'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faPhone } from '@fortawesome/pro-solid-svg-icons'
import { cn } from '@cv/lib'

interface Props extends HTMLAttributes<HTMLDivElement> {
   resume: Resume
}

export const Socials = ({ resume, className, ...rest }: Props) => {
   return (
      <div className={cn('flex gap-1.5 items-center', className)} {...rest}>
         {resume.contact.email && (
            <Link
               href={`mailto:${resume.contact.email}`}
               title={resume.contact.email}
               target="_blank"
               className="border border-black transition-all duration-300 hover:scale-105 rounded size-8 items-center justify-center flex"
            >
               <span className="sr-only">{resume.contact.email}</span>
               <FontAwesomeIcon icon={faEnvelope} className="h-4 w-4" />
            </Link>
         )}
         {resume.contact.phone && (
            <Link
               href={`tel:${resume.contact.phone}`}
               title={resume.contact.phone}
               target="_blank"
               className="border border-black transition-all duration-300 hover:scale-105 rounded size-8 items-center justify-center flex"
            >
               <span className="sr-only">{resume.contact.phone}</span>
               <FontAwesomeIcon icon={faPhone} className="h-4 w-4" />
            </Link>
         )}
         {resume.contact.socials?.map((social) => (
            <Link
               key={social.name}
               title={social.name}
               href={social.url}
               target="_blank"
               className="border border-black transition-all duration-300 hover:scale-105 rounded size-8 items-center justify-center flex"
            >
               <span className="sr-only">{social.name}</span>
               <FontAwesomeIcon icon={social.icon} className="h-4 w-4" />
            </Link>
         ))}
      </div>
   )
}
