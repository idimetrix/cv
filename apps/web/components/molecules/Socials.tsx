import { HTMLAttributes, memo } from 'react'
import { Resume } from '../../types'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faPhone, faGlobe } from '@fortawesome/pro-solid-svg-icons'
import { faCalendarDays } from '@fortawesome/pro-regular-svg-icons'
import { cn } from '@cv/lib'

interface Props extends HTMLAttributes<HTMLDivElement> {
   resume: Resume
}

// Memoized Socials component
export const Socials = memo<Props>(({ resume, className, ...rest }) => {
   return (
      <div className={cn('flex gap-1.5 items-center', className)} {...rest}>
         {resume.contact.email && (
            <Link
               href={`mailto:${resume.contact.email}`}
               title={resume.contact.email}
               target="_blank"
               rel="noopener noreferrer"
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
               rel="noopener noreferrer"
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
               rel="noopener noreferrer"
               className="border border-black transition-all duration-300 hover:scale-105 rounded size-8 items-center justify-center flex"
            >
               <span className="sr-only">{social.name}</span>
               <FontAwesomeIcon icon={social.icon} className="h-4 w-4" />
            </Link>
         ))}
         {resume.contact.website && (
            <Link
               href={resume.contact.website}
               title="Website/Portfolio/Resume/CV"
               target="_blank"
               rel="noopener noreferrer"
               className="border border-black transition-all duration-300 hover:scale-105 rounded size-8 items-center justify-center flex"
            >
               <span className="sr-only">Website/Portfolio/Resume/CV</span>
               <FontAwesomeIcon icon={faGlobe} className="h-4 w-4" />
            </Link>
         )}
         {resume.contact.call && (
            <Link
               href={resume.contact.call}
               title="Book a Call"
               target="_blank"
               rel="noopener noreferrer"
               className="border border-black transition-all duration-300 hover:scale-105 rounded size-8 items-center justify-center flex"
            >
               <span className="sr-only">Book a Call</span>
               <FontAwesomeIcon icon={faCalendarDays} className="h-4 w-4" />
            </Link>
         )}
      </div>
   )
})

Socials.displayName = 'Socials'
