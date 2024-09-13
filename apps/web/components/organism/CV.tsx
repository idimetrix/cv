import { HTMLAttributes } from 'react'
import { Resume } from '../../types'
import { cn } from '@cv/lib'
import {
   Locations,
   Avatar,
   Socials,
   Summary,
   Name,
   Actions,
   About,
   Experience,
   Education,
   Skills,
   Projects,
   Languages,
   Links,
   Characteristics,
} from '../molecules'

interface Props extends HTMLAttributes<HTMLDivElement> {
   resume: Resume
}

export const CV = ({ resume, className, ...rest }: Props) => {
   return (
      <div
         className={cn(
            'page flex relative justify-center bg-zinc-500 print:bg-none',
            className
         )}
         {...rest}
      >
         <style jsx>{`
            @page {
               size: A4;
               margin: 0;
               padding: 0;
            }

            * {
               // Force add background color to print
               -webkit-print-color-adjust: exact !important; /* Chrome, Safari 6 – 15.3, Edge */
               color-adjust: exact !important; /* Firefox 48 – 96 */
               print-color-adjust: exact !important; /* Firefox 97+, Safari 15.4+ */
            }
         `}</style>
         <div className="m-0 flex min-h-[297mm] relative w-[210mm] flex-col bg-white p-[10mm] text-base print:bg-none">
            <div className="flex w-full gap-9 flex-col">
               <div className="flex w-full flex-col-reverse gap-6 justify-between sm:flex-row">
                  <div className="flex flex-col gap-1.5">
                     <div className="flex flex-col">
                        <Name resume={resume} className="" />

                        <Summary resume={resume} className="" />
                     </div>

                     <Locations resume={resume} className="" />

                     <div className="mt-1.5 flex flex-col gap-3">
                        <Links resume={resume} />

                        <Socials resume={resume} />
                     </div>
                  </div>
                  <Avatar
                     resume={resume}
                     className="bg-aluminum sm:bg-transparent"
                  />
               </div>

               <About resume={resume} className="" />

               <Experience resume={resume} className="" />

               <Education resume={resume} className="" />

               <Skills resume={resume} className="" />

               <Languages resume={resume} className="" />

               <Projects resume={resume} className="" />

               <Characteristics resume={resume} className="" />
            </div>

            <Actions resume={resume} className="" />
         </div>
      </div>
   )
}
