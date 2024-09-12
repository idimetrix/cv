import { IconProp } from '@fortawesome/fontawesome-svg-core'

export type Contact = {
   email: string
   phone?: string
   cv?: string
   resume?: string
   socials?: {
      name: string
      url: string
      icon: IconProp
   }[]
}
