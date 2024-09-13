import { Resume } from '../types'
import {
   faLinkedin,
   faGithub,
   faTelegram,
   faNpm,
   faTwitter,
} from '@fortawesome/free-brands-svg-icons'
import { SKILLS } from './SKILLS'
import { LOCATIONS } from './LOCATIONS'
import { LANGUAGES } from './LANGUAGES'
import { EXPERIENCES } from './EXPERIENCES'
import { EDUCATIONS } from './EDUCATIONS'
import { PROJECTS } from './PROJECTS'

export const WEBSITE = {
   url: process.env.NEXT_PUBLIC_URL,
   image: `${process.env.NEXT_PUBLIC_URL}/me.jpg`,
   color: '#000',
   name: 'Print-Friendly, Free CV Maker',
   title: 'Print-Friendly, Free CV Maker',
   email: 'dmitrii.selikhov@gmail.com',
   telegram: 'https://t.me/idimetrix',
   description: 'Print-Friendly, Free CV Maker',
   keywords: [
      'react',
      'resume',
      'reactjs',
      'nextjs',
      'cv',
      'resume-creator',
      'next',
      'resume-builder',
      'cv-creator',
      'tailwind',
      'tailwindcss',
      'cv-builder',
   ].join(', '),
   about: 'Print-Friendly, Free CV Maker',
   phone: null,
}

export const RESUME: Resume = {
   name: 'Dmitrii Selikhov',
   nick: 'DI',
   nameLink: 'https://www.linkedin.com/in/dimetrix',

   initials: 'DS',
   initialsLink: 'https://www.linkedin.com/in/dimetrix',

   locations: LOCATIONS,
   languages: LANGUAGES,

   avatar: '/me.jpg',
   avatarLink: 'https://www.linkedin.com/in/dimetrix',

   summary: 'CTO, Software Architect, Technical Lead',
   summaryLink: 'https://www.linkedin.com/in/dimetrix',

   about: `As a EXPERT FULL-STACK SOFTWARE ENGINEER, I specialize in taking products from concept to launch. I am skilled at leading teams and fostering environments where individuals can perform at their highest potential. Currently, I work mostly with Web2/Web3 applications using JS/TS (React, Next.js, Vue, Nuxt.js, Svelte, Stencil, Angular) and Node/Go/Rust/Move using monolithic, microservices, serverless architectures based on AWS, Azure and Google cloud services.`,
   aboutLink: 'https://www.linkedin.com/in/dimetrix',

   website: 'https://www.linkedin.com/in/dimetrix',

   contact: {
      website: WEBSITE.url,
      call: 'https://calendly.com/dmitry-selikhov',
      email: 'dmitrii.selikhov@gmail.com',
      phone: '+1 829 957 6440',
      cv: `${WEBSITE.url}/cv.pdf`,
      resume: `${WEBSITE.url}/resume.pdf`,
      socials: [
         {
            name: 'LinkedIn',
            url: 'https://www.linkedin.com/in/dimetrix',
            icon: faLinkedin,
         },
         {
            name: 'Github',
            url: 'https://github.com/idimetrix',
            icon: faGithub,
         },
         {
            name: 'Npm',
            url: 'https://www.npmjs.com/~dimetrix',
            icon: faNpm,
         },
         {
            name: 'Telegram',
            url: 'https://t.me/idimetrix',
            icon: faTelegram,
         },
         {
            name: 'Twitter',
            url: 'https://x.com/idimetrix',
            icon: faTwitter,
         },
      ],
   },
   experiences: EXPERIENCES,

   educations: EDUCATIONS,

   skills: SKILLS,

   projects: PROJECTS,

   characteristics: [
      'self-motivated',
      'self-organized',
      'self-conscious',
      'self-control',
      'responsible',
      'honest',
      'fair',
      'hardworking',
      'energetic',
      'sociable',
      'purposeful',
      'resourcefulness',
      'cheerfulness',
      'patience',
      'principles',
      'decisive',
      'careful',
      'friendly',
      'enjoy learning and teaching',
   ],
}
