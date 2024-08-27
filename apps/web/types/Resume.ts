import { Contact } from './Contact'
import { Experience } from './Experience'
import { Education } from './Education'
import { Project } from './Project'

export type Resume = {
   name: string
   nameLink: string

   initials?: string
   initialsLink?: string

   location: string
   locationLink: string

   about: string
   aboutLink: string

   avatar: string
   avatarLink: string

   summary: string
   summaryLink: string

   website: string

   contact: Contact

   experiences: Experience[]
   educations: Education[]

   skills: string[]

   projects: Project[]
}
