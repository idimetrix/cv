import { ReactNode } from 'react'

export type Experience = {
   company: string
   link?: string
   badges?: string[]
   title: string
   logo: ReactNode
   start: string
   end?: string
   description: ReactNode
}
