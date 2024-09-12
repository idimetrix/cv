import { HTMLAttributes, useMemo } from 'react'
import { Resume } from '../../types'
import { cn } from '@cv/lib'

interface Props extends HTMLAttributes<HTMLDivElement> {
   resume: Resume
}

export const Skills = ({ resume, className, ...rest }: Props) => {
   const groups = useMemo(() => {
      const records: Record<
         number,
         {
            name: string
            years: number
         }[]
      > = {}

      for (const skill of resume.skills) {
         records[skill.years] = records[skill.years] || []
         records[skill.years].push(skill)
      }

      return records
   }, [resume])

   return (
      <div className={cn('flex flex-col gap-3 w-full', className)} {...rest}>
         <div className="text-2xl font-bold">Skills</div>

         <table className="border-collapse text-sm border borderborder">
            <tbody>
               {Object.keys(groups)
                  .map(Number)
                  .sort((a, b) => b - a)
                  .map((years) => (
                     <tr key={years}>
                        <td className="border w-full border-border">
                           <div className="flex gap-1.5 w-full justify-start flex-wrap">
                              {groups[years].map((skill) => (
                                 <button
                                    className="inline-flex items-center rounded-md border px-1.5 py-0 transition-colors focus:outline-none text-nowrap border-transparent bg-black/80 text-white hover:bg-black/60"
                                    key={skill.name}
                                 >
                                    {skill.name}
                                 </button>
                              ))}
                           </div>
                        </td>
                        <td className="border border-border text-nowrap whitespace-nowrap px-1.5">
                           <span className="bg-black inline-flex justify-center items-center text-white rounded-full w-6 h-6 min-w-6 min-h-6">
                              {years}
                           </span>{' '}
                           years
                        </td>
                     </tr>
                  ))}
            </tbody>
         </table>
      </div>
   )
}
