import { HTMLAttributes, ElementType } from 'react'
import { cn } from '@cv/lib'

interface Props extends HTMLAttributes<HTMLDivElement> {
   level: 1 | 2 | 3 | 4 | 5 | 6
}

export const Heading = ({ level, className, children, ...rest }: Props) => {
   const Tag = `h${level}` as ElementType

   return (
      <Tag
         className={cn('text-2xl font-bold border-b-2 border-black', className)}
         {...rest}
      >
         {children}
      </Tag>
   )
}
