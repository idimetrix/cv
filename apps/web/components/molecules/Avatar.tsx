import { HTMLAttributes, memo } from 'react'
import { Resume } from '../../types'
import { cn } from '@cv/lib'
import Image from 'next/image'

interface Props extends HTMLAttributes<HTMLDivElement> {
   resume: Resume
}

// Memoized Avatar component
export const Avatar = memo<Props>(({ resume, className, ...rest }) => {
   return (
      <div className={cn('flex cursor-pointer', className)} {...rest}>
         <Image
            src={resume.avatar}
            alt={resume.name}
            width={200}
            height={200}
            className={cn(
               'aspect-square max-h-32 max-w-32 transition-all duration-300 hover:scale-105'
            )}
         />
      </div>
   )
})

Avatar.displayName = 'Avatar'
