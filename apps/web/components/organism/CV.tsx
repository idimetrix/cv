import { HTMLAttributes } from 'react'

interface Props extends HTMLAttributes<HTMLDivElement> {}

export const CV = ({ children, ...rest }: Props) => {
   return (
      <div className="page flex justify-center bg-zinc-500 print:bg-none">
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
         <div className="m-0 flex min-h-[297mm] w-[210mm] flex-col bg-white p-[10mm] text-base print:bg-none">
            123
         </div>
      </div>
   )
}
