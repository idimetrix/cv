import { HTMLAttributes } from 'react'
import { Resume } from '../../types'
import { cn } from '@cv/lib'
import Image from 'next/image'

interface Props extends HTMLAttributes<HTMLDivElement> {
   resume: Resume
}

export const Technologies = ({ resume, className, ...rest }: Props) => {
   return (
      <div
         className={cn('flex gap-3 items-center flex-wrap', className)}
         {...rest}
      >
         {resume.technologies.map((technology) => (
            <Image
               className="w-auto h-9 transition-all duration-300 grayscale hover:grayscale-0"
               key={technology.image}
               src={technology.image}
               alt={technology.name}
               title={technology.description || technology.name}
               width={technology.width}
               height={technology.height}
            />
         ))}
      </div>
   )
}
