import { Contact } from './Contact'
import { Experience } from './Experience'
import { Education } from './Education'
import { Project } from './Project'
import { Location } from './Location'
import { Skill } from './Skill'

export type Resume = {
   name: string
   nick: string
   nameLink: string

   initials?: string
   initialsLink?: string

   locations: Location[]
   languages: Record<string, string>

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

   skills: Skill[]

   projects: Project[]
}
