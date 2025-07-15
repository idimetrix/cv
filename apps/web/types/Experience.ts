import { ReactNode } from 'react'
import { Content } from './Content'

export type Experience = {
   company: string
   link?: string
   badges?: string[]
   title: string
   logo: ReactNode
   start: string
   end?: string
   contents: Content[]
}
