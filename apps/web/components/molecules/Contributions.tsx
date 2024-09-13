import { HTMLAttributes } from 'react'
import { Resume } from '../../types'
import { cn } from '@cv/lib'
import Link from 'next/link'

interface Props extends HTMLAttributes<HTMLDivElement> {
   resume: Resume
}

export const Contributions = ({ resume, className, ...rest }: Props) => {
   return (
      <div className={cn('flex flex-col gap-3 w-full', className)} {...rest}>
         <div className="text-2xl font-bold">Contributions</div>

         <div className="flex gap-x-1.5 gap-y-0 flex-wrap">123</div>
      </div>
   )
}
