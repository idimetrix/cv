import { Resume } from '../types'
import { Contact } from '../types/Contact'

export const WEBSITE = {
   url: process.env.NEXT_PUBLIC_URL,
   image: `${process.env.NEXT_PUBLIC_URL}/blogs.png`,
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
   nameLink: 'https://www.linkedin.com/in/dimetrix',

   initials: 'DS',
   initialsLink: 'https://www.linkedin.com/in/dimetrix',

   location: 'Miami Beach, Florida, United States',
   locationLink: 'https://maps.app.goo.gl/yjF6pFSLUpHc8j7e8',

   about: `Lead Full-Stack software engineer, specializing in design and development web applications using JS (React & Vue & Svelte & Stencil & Angular) and Node/Go/Rust`,
   aboutLink: 'https://www.linkedin.com/in/dimetrix',

   avatar:
      'https://avatars.githubusercontent.com/u/6536323?s=400&u=d69d2b12d4006d24030aa6e2e11fce02f15a86fe&v=4',
   avatarLink: 'https://www.linkedin.com/in/dimetrix',

   summary:
      'As a EXPERT FULL-STACK SOFTWARE ENGINEER, I specialize in taking products from concept to launch. I am skilled at leading teams and fostering environments where individuals can perform at their highest potential. Currently, I work mostly with Web2/Web3 applications using JS/TS (React, Next.js, Vue, Nuxt.js, Svelte, Stencil, Angular) and Node/Go/Rust/Move using monolithic, microservices, serverless architectures based on AWS, Azure and Google cloud services',
   summaryLink: 'https://www.linkedin.com/in/dimetrix',

   website: 'https://www.linkedin.com/in/dimetrix',

   contact: {
      email: 'dmitrii.selikhov@gmail.com',
      phone: '+18298032444',
      socials: undefined,
   },
}
