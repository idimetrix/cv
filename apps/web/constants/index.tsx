import { Resume } from '../types'
import {
   faLinkedin,
   faGithub,
   faTelegram,
   faNpm,
} from '@fortawesome/free-brands-svg-icons'

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

   avatar:
      'https://avatars.githubusercontent.com/u/6536323?s=400&u=d69d2b12d4006d24030aa6e2e11fce02f15a86fe&v=4',
   avatarLink: 'https://www.linkedin.com/in/dimetrix',

   summary:
      'Lead Full-Stack software engineer, specializing in design and development web applications using JS (React & Vue & Svelte & Stencil & Angular) and Node/Go/Rust',
   summaryLink: 'https://www.linkedin.com/in/dimetrix',

   about: `As a EXPERT FULL-STACK SOFTWARE ENGINEER, I specialize in taking products from concept to launch. I am skilled at leading teams and fostering environments where individuals can perform at their highest potential. Currently, I work mostly with Web2/Web3 applications using JS/TS (React, Next.js, Vue, Nuxt.js, Svelte, Stencil, Angular) and Node/Go/Rust/Move using monolithic, microservices, serverless architectures based on AWS, Azure and Google cloud services`,
   aboutLink: 'https://www.linkedin.com/in/dimetrix',

   website: 'https://www.linkedin.com/in/dimetrix',

   contact: {
      email: 'dmitrii.selikhov@gmail.com',
      phone: '+18298032444',
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
      ],
   },
   experiences: [
      {
         company: 'CheapHotelsHub.com',
         link: 'https://cheaphotelshub.com',
         badges: ['Hybrid', 'Contract'],
         title: 'Chief Technology Officer',
         logo: undefined,
         start: 'Aug 2023',
         end: undefined,
         description:
            'CTO, Technical Leadership, Marketing, Digital Marketing, Online Marketing, Google Ads and Technology Management',
      },

      {
         company: 'Super Studios Inc.',
         link: 'https://www.superstudios.io',
         badges: ['Remote', 'Contract'],
         title: 'Senior Full Stack Developer',
         logo: undefined,
         start: 'Mar 2023',
         end: 'Aug 2023',
         description: `⭐ Created Vue/Nuxt.js/Pinia/JavaScript/TypeScript responsive HTML5/CSS3 website https://superstudios.io/
⭐ Created Vue/Nuxt.js/Pinia/JavaScript/TypeScript responsive HTML5/CSS3 website https://superverse.cool/
⭐ Worked on the NFT platform https://impostors.gg/
⭐ Worked on the OpenSea competitor https://gigamart.com/ - technical solutions, improvements, features.
⭐ Handled 0-1 implementations, features.`,
      },

      {
         company: 'University of Miami',
         link: 'https://miami.edu',
         badges: ['Remote', 'Contract'],
         title: 'Lead Software Engineer',
         logo: undefined,
         start: 'Aug 2022',
         end: 'Mar 2023',
         description: `Skills: JavaScript · SQL · MySQL · Jira · Test Automation · DevOps · NoSQL · Continuous Integration and Continuous Delivery (CI/CD) · Next.js · Agile Methodologies · Cypress · Microsoft Azure · React.js · MongoDB · Test-Driven Development · Material UI · TypeScript · Nest.js · Bitbucket · Unit Testing · Figma`,
      },

      {
         company: 'Tier1 Financial Solutions',
         link: 'https://www.tier1fin.com',
         badges: ['Remote', 'Contract'],
         title: 'Node.js/React.js Full Stack Tech Lead ',
         logo: undefined,
         start: 'Jan 2022',
         end: 'Aug 2022',
         description: `Skills: JavaScript · SQL · MySQL · Node.js · React Hooks · RESTful architecture · NoSQL · Storybooks · Next.js · Team Leadership · Microsoft Azure · REST APIs · Vercel · React.js · MongoDB · Leadership · TypeScript · Nest.js · React Context`,
      },

      {
         company: 'AB InBev',
         link: 'https://www.ab-inbev.com',
         badges: ['Remote', 'Contract'],
         title: 'Node.js/React.js Tech Lead Engineer',
         logo: undefined,
         start: 'Apr 2021',
         end: 'Jan 2022',
         description: `Skills: JavaScript · React Native · Node.js · CRM Integration · RESTful architecture · Next.js · Agile Methodologies · Team Leadership · CRM Databases · Microsoft Azure · Kafka Streams · React.js · Leadership · Bank Reconciliation · Apache Kafka · TypeScript · Amazon Web Services (AWS) · Scrum · RabbitMQ`,
      },

      {
         company: 'CiiRUS Vacation Rental Software',
         link: 'https://www.ciirus.com',
         badges: ['Remote', 'Contract'],
         title: 'Full Stack Engineer',
         logo: undefined,
         start: 'Jul 2020',
         end: 'Mar 2021',
         description: `Skills: JavaScript · AngularJS · Agile Methodologies · Microsoft Azure · TypeScript · CSS3`,
      },

      {
         company: 'Freelance',
         link: '',
         badges: ['Remote', 'Contract'],
         title: 'Senior Front-end Developer | Back-end Engineer, Team Leader',
         logo: undefined,
         start: 'Sep 2017',
         end: 'Jun 2020',
         description: `Skills: JavaScript · Node.js · AngularJS · Vue.js · REST APIs · React.js · TypeScript`,
      },

      {
         company: 'Cronix MicroSystems',
         link: '',
         badges: ['In-Person', 'Full-Time'],
         title: 'Chief Technology Officer',
         logo: undefined,
         start: 'Mar 2016',
         end: 'Sep 2017',
         description: `Skills: Agile Methodologies · Team Leadership · Leadership · Scrum`,
      },

      {
         company: 'Guru.com',
         link: 'https://guru.com',
         badges: ['Remote', 'Contract'],
         title: 'Senior Software Developer Team Lead',
         logo: undefined,
         start: 'Jan 2015',
         end: 'Mar 2016',
         description: `Skills: JavaScript · Node.js · Webpack · HTML5 · TypeScript · CSS3`,
      },

      {
         company: 'Scopic Software',
         link: 'https://scopicsoftware.com',
         badges: ['Remote', 'Contract'],
         title: 'Senior Web Developer',
         logo: undefined,
         start: 'Feb 2014',
         end: 'Jan 2015',
         description: `Skills: JavaScript · Node.js · HTML5 · CSS3`,
      },

      {
         company: 'Stork',
         link: '',
         badges: ['In-Person', 'Full-Time'],
         title: 'Full Stack Engineer',
         logo: undefined,
         start: 'Sep 2011',
         end: 'Jan 2014',
         description: `Skills: JavaScript · HTML5 · CSS3`,
      },

      // {
      //    company: '',
      //    link: '',
      //    badges: ['Remote', 'Contract'],
      //    title: '',
      //    logo: undefined,
      //    start: '',
      //    end: '',
      //    description: ``,
      // },
   ],

   educations: [
      {
         company: 'Oryol State Technical University (Oryol STU)',
         link: '',
         badges: [],
         title: 'Mathematician. System programmer. Computer science.',
         logo: undefined,
         start: '2012',
         end: '2014',
         description: `Master's degree in mathematician, system programmer and computer science.`,
      },

      {
         company: 'Oryol State Technical University (Oryol STU)',
         link: '',
         badges: [],
         title: 'Mathematician. System programmer. Computer science.',
         logo: undefined,
         start: '2007',
         end: '2012',
         description: `Bachelor's degree in mathematician, system programmer and computer science.`,
      },
   ],

   skills: [
      `JavaScript`,
      `TypeScript`,
      `React.js/Next.js`,
      `Vue.js/Nuxt.js`,
      `Svelte`,
      `Stencil`,
      `Angular`,
      `Node.js`,
      `HTML5`,
      `CSS3`,
      `MongoDB`,
      `MySQL`,
      `PostgreSQL`,
      `NoSQL`,
      `MongoDB`,
      `DynamoDB`,
      `Go`,
      `Rust`,
   ],

   projects: [
      {
         company: `Cheap Hotels Hub`,
         link: 'https://cheaphotelshub.com',
         badges: [
            'CTO',
            'Technical Leadership',
            'Marketing',
            'Digital Marketing',
         ],
         title: `Cheap Hotels Hub`,
         logo: undefined,
         start: undefined,
         end: undefined,
         description: `This online hotel reservation service sets the gold standard. With a seamless user interface, an extensive range of options, and impeccable customer support.`,
      },

      // {
      //    company: `Company ${index}`,
      //    link: '',
      //    badges: ['badge1', 'badge2', 'badge3'],
      //    title: `Title ${index}`,
      //    logo: undefined,
      //    start: undefined,
      //    end: undefined,
      //    description: `Description ${index}`,
      // }
   ],
}
