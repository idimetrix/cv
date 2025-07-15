import { HTMLAttributes, useMemo, memo } from 'react'
import { Resume } from '../../types'
import { cn } from '@cv/lib'
import { Heading } from '../atoms'

interface Props extends HTMLAttributes<HTMLDivElement> {
   resume: Resume
}

// Memoized Skills component with optimized grouping logic
export const Skills = memo<Props>(({ resume, className, ...rest }) => {
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
   }, [resume.skills])

   return (
      <div className={cn('flex flex-col gap-3 w-full', className)} {...rest}>
         <Heading level={2}>Skills</Heading>

         <table className="border-collapse text-sm border border-border border-dotted">
            <tbody>
               {Object.keys(groups)
                  .map(Number)
                  .sort((a, b) => b - a)
                  .map((years) => (
                     <tr
                        key={years}
                        className={cn(
                           'group hover:bg-black/10 hover:scale-105 transition-all hover:border-transparent duration-300',
                           years === 0 && 'hidden'
                        )}
                     >
                        <td className="border w-full py-1.5 px-1.5 border-border group-hover:border-transparent border-dotted">
                           <div className="flex gap-1.5 w-full justify-start flex-wrap">
                              {groups[years].map((skill) => (
                                 <button
                                    className="inline-flex group-hover:bg-black group-hover:text-white items-center rounded-md border px-1.5 leading-tight py-0 transition-all duration-0 focus:outline-none text-nowrap border-transparent bg-black/5 text-black hover:opacity-80"
                                    key={skill.name}
                                    title={`${skill.name} - ${years}+ years`}
                                 >
                                    {skill.name}
                                 </button>
                              ))}
                           </div>
                        </td>
                        <td className="border py-1.5 border-border group-hover:border-transparent border-dotted text-nowrap whitespace-nowrap px-1.5">
                           <span className="group-hover:bg-black/80 group-hover:text-white border text-black border-black group-hover:bg-black transition-all duration-300 inline-flex justify-center items-center text-center rounded-full w-6 h-6 min-w-6 min-h-6">
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
})

Skills.displayName = 'Skills'
