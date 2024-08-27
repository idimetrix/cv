import { Contact } from './Contact'

export type Resume = {
   name: string
   nameLink?: string

   initials?: string
   initialsLink?: string

   location: string
   locationLink?: string

   about: string
   aboutLink?: string

   avatar: string
   avatarLink?: string

   summary: string
   summaryLink?: string

   website: string

   contact: Contact
}
