import * as htmlToImage from 'html-to-image'
import { HTMLAttributes, useCallback } from 'react'
import { Resume } from '../../types'
import { cn, downloadSVG } from '@cv/lib'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImage } from '@fortawesome/pro-solid-svg-icons'
import { RESUME } from '../../constants'

interface Props extends HTMLAttributes<HTMLDivElement> {
   resume: Resume
}

export const Actions = ({ resume, className, ...rest }: Props) => {
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

   const exportHandler = useCallback(async () => {
      const cv = document.getElementById('cv')

      if (!cv) return

      // const blob = await htmlToImage.toBlob(cv)

      const svg = await htmlToImage.toSvg(cv)

      const link = document.createElement('a')
      link.download = `${RESUME.name}.svg`
      link.href = svg
      link.click()
      link.remove()

      // const svg = await htmlToImage.toSvg(cv)
      //
      // console.log(svg)
      //
      // if (svg) {
      //    const base64 = svg.replace(/^data:image\/svg\+xml;base64,/, '')
      //
      //    const content = atob(base64)
      //
      //    downloadSVG(content, RESUME.name)
      // }
   }, [])

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
               onClick={exportHandler}
               className=" transition-all bg-white uppercase duration-300 hover:bg-black hover:text-white w-[24px] h-[24px] items-center justify-center flex"
            >
               <FontAwesomeIcon icon={faImage} className="h-4 w-4" />
            </button>
         </div>
      </div>
   )
}
