import { ReactNode } from 'react'

export type Project = {
   company: string
   link?: string
   image?: string
   badges?: string[]
   title: string
   logo: ReactNode
   start?: string
   end?: string
   description: string
}
