import * as htmlToImage from 'html-to-image'
import { HTMLAttributes, useCallback } from 'react'
import { Resume } from '../../types'
import { cn } from '@cv/lib'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
   faFilePdf,
   faFilePng,
   faFileJpg,
   faFileSvg,
   faHome,
} from '@fortawesome/pro-solid-svg-icons'
import { RESUME } from '../../constants'

interface Props extends HTMLAttributes<HTMLDivElement> {
   resume: Resume
}

export const Actions = ({ resume, className, ...rest }: Props) => {
   const homeHandler = useCallback(() => {
      if (!resume.contact.linkedin) return

      window.open(resume.contact.linkedin, '_blank')
   }, [resume])

   const printHandler = useCallback(() => {
      window.print()
   }, [])

   const downloadHandler = useCallback(() => {
      if (resume.contact.cv || resume.contact.resume) {
         window.open(resume.contact.cv || resume.contact.resume, '_blank')
      } else {
         window.print()
      }
   }, [resume])

   const exportHandler = useCallback(
      (type: 'svg' | 'png' | 'jpg') => async () => {
         const cv = document.getElementById('cv')

         // const scale = 2

         if (!cv) return

         // cv.style.zoom = `${scale}`

         // const blob = await htmlToImage.toBlob(cv)

         let source: string | null = null

         if (type === 'svg')
            source = await htmlToImage.toSvg(cv, {
               backgroundColor: '#ffffff',
               quality: 1,
               style: {},
            })
         if (type === 'png')
            // source = canvas2scale(
            //    await htmlToImage.toCanvas(cv, {
            //       backgroundColor: '#ffffff',
            //       quality: 1,
            //       style: {},
            //    }),
            //    2
            // ).toDataURL('image/png')
            source = await htmlToImage.toPng(cv, {
               backgroundColor: '#ffffff',
               quality: 1,
               style: {},
            })
         if (type === 'jpg')
            // source = canvas2scale(
            //    await htmlToImage.toCanvas(cv, {
            //       backgroundColor: '#ffffff',
            //       quality: 1,
            //       style: {},
            //    }),
            //    2
            // ).toDataURL('image/jpeg')
            source = await htmlToImage.toJpeg(cv, {
               backgroundColor: '#ffffff',
               quality: 1,
               style: {},
            })

         if (source) {
            const link = document.createElement('a')
            link.download = `${RESUME.name}.${type}`
            link.href = source
            link.click()
            link.remove()
         }
      },
      []
   )

   return (
      <div
         className={cn(
            'fixed top-0 left-0 right-0 w-[210mm] print:hidden mx-auto',
            className
         )}
         {...rest}
      >
         <div className="absolute flex gap-[1px] flex-col text-sm font-mono left-full ml-[1px]">
            <button
               onClick={homeHandler}
               className="transition-all bg-white uppercase duration-300 hover:bg-black hover:text-white w-[24px] h-[24px] items-center justify-center flex"
            >
               <FontAwesomeIcon icon={faHome} className="h-4 w-4" />
            </button>
            <button
               onClick={printHandler}
               className="transition-all bg-white uppercase duration-300 hover:bg-black hover:text-white w-[24px] py-1.5 items-center justify-center flex"
            >
               P<br />
               r<br />
               i<br />
               n<br />t
            </button>
            <button
               onClick={downloadHandler}
               className="transition-all bg-white uppercase duration-300 hover:bg-black hover:text-white w-[24px] py-1.5 items-center justify-center flex"
            >
               D<br />
               o<br />
               w<br />
               n<br />
               l<br />
               o<br />
               a<br />d
            </button>
            <button
               onClick={exportHandler('svg')}
               className="transition-all bg-white uppercase duration-300 hover:bg-black hover:text-white w-[24px] h-[24px] items-center justify-center flex"
            >
               <FontAwesomeIcon icon={faFileSvg} className="h-4 w-4" />
            </button>
            <button
               onClick={exportHandler('png')}
               className="transition-all bg-white uppercase duration-300 hover:bg-black hover:text-white w-[24px] h-[24px] items-center justify-center flex"
            >
               <FontAwesomeIcon icon={faFilePng} className="h-4 w-4" />
            </button>
            <button
               onClick={exportHandler('jpg')}
               className="transition-all bg-white uppercase duration-300 hover:bg-black hover:text-white w-[24px] h-[24px] items-center justify-center flex"
            >
               <FontAwesomeIcon icon={faFileJpg} className="h-4 w-4" />
            </button>
         </div>
      </div>
   )
}
