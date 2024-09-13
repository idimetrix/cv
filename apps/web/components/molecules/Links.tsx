import { cn } from '@cv/lib'
import { HTMLAttributes } from 'react'
import { Resume } from '../../types'
import Link from 'next/link'

interface Props extends HTMLAttributes<HTMLDivElement> {
   resume: Resume
}

export const Links = ({ resume, className, ...rest }: Props) => {
   if (!resume.contact.email && resume.contact.phone) return null

   return (
      <div className={cn('flex gap-1.5 items-center', className)} {...rest}>
         {resume.contact.email && (
            <Link
               href={`mailto:${resume.contact.email}`}
               title={resume.contact.email}
               target="_blank"
               className="flex items-center gap-1.5 hover:underline text-sm text-black/80"
            >
               <div className="h-4 w-4 bg-black/80 min-w-4 min-h-4 rounded-full text-white flex justify-center items-center text-xs" />
               {resume.contact.email}
            </Link>
         )}

         {resume.contact.phone && (
            <Link
               href={`tel:${resume.contact.phone}`}
               title={resume.contact.phone}
               target="_blank"
               className="flex items-center gap-1.5 hover:underline text-sm text-black/80"
            >
               <div className="h-4 w-4 bg-black/80 min-w-4 min-h-4 rounded-full text-white flex justify-center items-center text-xs" />
               {resume.contact.phone}
            </Link>
         )}
      </div>
   )
}
