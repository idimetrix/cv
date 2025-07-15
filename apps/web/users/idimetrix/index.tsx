import { Resume } from '../../types'
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
import { CONTRIBUTIONS } from './CONTRIBUTIONS'
import { TECHNOLOGIES } from './TECHNOLOGIES'

export const RESUME: Resume = {
   firstName: 'Dmitrii',
   lastName: 'Selikhov',

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

   about: (
      <div className="w-full flex flex-col gap-3">
         <div>
            With a <b>Master’s degree in Mathematics and Computer Science</b>{' '}
            and over <b>15 years of professional experience (including MBA)</b>{' '}
            in both startups and enterprises, I am a technical strategic leader
            specializing in guiding products from initial concept to successful
            launch. I excel in managing teams of up to 100 members, fostering
            high-performance cultures, and driving innovation. My collaborative
            leadership style enables me to engage effectively in both technical
            and business discussions, whether internally or with clients. My
            expertise spans <b>WEB2</b> and <b>WEB3</b> sectors, leveraging
            technologies such as JavaScript/TypeScript (React.js, Next.js,
            Vue.js, Nuxt.js, Svelte, Stencil, Angular) with CSR/SSR/SSG/SPA/PWA,
            alongside back-end systems using Node.js, Nest.js, Go, Rust, and
            Move. I am experienced in monolithic, microservices, and serverless
            architectures deployed on AWS, Azure, and Google Cloud platforms.
         </div>

         <div>
            <b>Competencies:</b> Architecture • Integration Strategy • 0 - 1
            Product Development • API Design and Development • UI/UX Design and
            Development • Software Development • Global/Local People Management
            (Onshore/Offshore) • Product/Project Management • Process
            Structuration and Optimization • Executive Leadership • Continuous
            Improvements • Professional Services
         </div>

         <div>
            <b>Stacks:</b> MERN • MEAN • LAMP • JAM • MEVN • PERN • ROR • MEEN •
            ELK • WAMP • XAMPP • TALL • PWA • LEAN • FARM • SERN
         </div>
      </div>
   ),
   aboutLink: 'https://www.linkedin.com/in/dimetrix',

   // 3 points I can help
   help: (
      <div className="flex w-full flex-col gap-3">
         <div className="flex w-full flex-col gap-1.5">
            <h3 id="1-technical-strategy-and-vision">
               1. <strong>Technical Strategy and Vision</strong>
            </h3>
            <ul className="">
               <li>
                  <strong>
                     Architect and guide the overall technical direction
                  </strong>
                  : Define the technological roadmap aligned with the
                  company&apos;s goals. This includes selecting the right tech
                  stack, frameworks, and tools to future-proof the organization.
               </li>
               <li>
                  <strong>Research and innovation</strong>: Stay updated on
                  emerging technologies and trends to identify opportunities for
                  innovation and competitive advantage.
               </li>
               <li>
                  <strong>Scalability and sustainability</strong>: Ensure that
                  technical solutions are scalable and maintainable, promoting a
                  long-term vision for growth.
               </li>
            </ul>
         </div>

         <div className="flex w-full flex-col gap-1.5">
            <h3 id="2-team-leadership-and-development">
               2. <strong>Team Leadership and Development</strong>
            </h3>
            <ul className="">
               <li>
                  <strong>Build and mentor a strong team</strong>: Guide the
                  technical team by fostering a culture of learning, innovation,
                  and accountability. Provide mentorship to developers to help
                  them grow their skills and become leaders themselves.
               </li>
               <li>
                  <strong>Efficient collaboration</strong>: Establish clear
                  communication channels, set team goals, and ensure proper
                  collaboration between developers, product managers, and
                  stakeholders.
               </li>
               <li>
                  <strong>Hiring and resource management</strong>: Lead the
                  recruitment process to bring in talent that fits both
                  technically and culturally. Allocate resources to ensure
                  efficient project delivery.
               </li>
            </ul>
         </div>

         <div className="flex w-full flex-col gap-1.5">
            <h3 id="3-project-and-product-delivery">
               3. <strong>Project and Product Delivery</strong>
            </h3>
            <ul className="">
               <li>
                  <strong>Oversee project execution</strong>: Ensure timely and
                  high-quality delivery of products by monitoring development
                  cycles, managing risks, and removing blockers.
               </li>
               <li>
                  <strong>Quality assurance</strong>: Enforce best practices in
                  software development, including code reviews, testing, and
                  continuous integration and deployment (CI/CD).
               </li>
               <li>
                  <strong>Align technical efforts with business goals</strong>:
                  Balance technical debt with feature development to ensure the
                  team delivers value while maintaining codebase health.
               </li>
            </ul>
         </div>
      </div>
   ),
   helpLink: 'https://www.linkedin.com/in/dimetrix',

   website: 'https://www.linkedin.com/in/dimetrix',

   contact: {
      website: 'https://www.linkedin.com/in/dimetrix',
      call: 'https://calendly.com/dmitry-selikhov',
      email: 'dmitrii.selikhov@gmail.com',
      phone: '+1 829 957 6440',
      cv: 'https://dmitrii-selikhov.vercel.app/cv.pdf',
      resume: 'https://dmitrii-selikhov.vercel.app/resume.pdf',
      linkedin: 'https://www.linkedin.com/in/dimetrix',
      github: 'https://github.com/idimetrix',
      npm: 'https://www.npmjs.com/~dimetrix',
      telegram: 'https://t.me/dmitrii_selikhov',
      twitter: 'https://x.com/idimetrix',
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
            url: 'https://t.me/dmitrii_selikhov',
            icon: faTelegram,
         },
         {
            name: 'Twitter',
            url: 'https://x.com/idimetrix',
            icon: faTwitter,
         },
      ],
   },

   technologies: TECHNOLOGIES,

   experiences: EXPERIENCES,

   educations: EDUCATIONS,

   skills: SKILLS,

   projects: PROJECTS,

   contributions: CONTRIBUTIONS,

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

   keywords: [
      'Dmitrii Selikhov',
      'Dmitry Selikhov',
      'idimetrix',
      'CTO',
      'Software Architect',
      'Technical Lead',
      'JavaScript',
      'TypeScript',
   ],
}
