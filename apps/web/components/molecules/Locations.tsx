import { HTMLAttributes } from 'react'
import { Resume } from '../../types'
import { cn } from '@cv/lib'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGlobe } from '@fortawesome/pro-solid-svg-icons'

interface Props extends HTMLAttributes<HTMLDivElement> {
   resume: Resume
}

export const Locations = ({ resume, className, ...rest }: Props) => {
   return (
      <div className={cn('flex flex-col gap-0.5', className)} {...rest}>
         {resume.locations.map((location) => (
            <Link
               key={location.link}
               href={location.link}
               title={location.name}
               target="_blank"
               className="flex items-center gap-1.5 hover:underline text-sm text-black/80"
            >
               <FontAwesomeIcon icon={faGlobe} className="h-4 w-4" />
               {location.name}
            </Link>
         ))}
      </div>
   )
}
