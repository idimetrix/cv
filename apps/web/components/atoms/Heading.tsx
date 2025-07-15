import { HTMLAttributes, ElementType, memo } from 'react'
import { cn } from '@cv/lib'

interface Props extends HTMLAttributes<HTMLDivElement> {
   level: 1 | 2 | 3 | 4 | 5 | 6
}

// Memoized Heading component to prevent unnecessary re-renders
export const Heading = memo<Props>(
   ({ level, className, children, ...rest }) => {
      const Tag = `h${level}` as ElementType

      return (
         <Tag
            className={cn(
               'text-2xl font-bold border-b-2 border-black',
               className
            )}
            {...rest}
         >
            {children}
         </Tag>
      )
   }
)

Heading.displayName = 'Heading'
