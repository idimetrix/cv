import {
   GetServerSidePropsContext,
   NextApiRequest,
   NextApiResponse,
} from 'next'
import { NextSeo } from 'next-seo'
import { createContext } from '@cv/trpc/server/context'
import { appRouter } from '@cv/trpc/server/router/_app'
import { inferSSRProps } from '@cv/types/inferSSRProps'
import { CV } from '../components/organism'
import { RESUME } from '../users'
import { WEBSITE } from '../constants'
import {
   createEnhancedPageSEO,
   ComprehensiveJsonLd,
} from '../utils/comprehensive-seo'

export default function Home() {
   // Enhanced SEO configuration for home page
   const enhancedSEO = createEnhancedPageSEO(RESUME, WEBSITE, {
      pageType: 'home',
      pageTitle: `${RESUME.name} - ${RESUME.summary}`,
      pageDescription: `Professional portfolio and CV of ${RESUME.name}, ${RESUME.summary}. Explore ${RESUME.experiences.length}+ years of experience in ${RESUME.skills
         .slice(0, 5)
         .map((s) => s.name)
         .join(
            ', '
         )}. Available for ${RESUME.locations.map((l) => l.name).join(', ')} and remote opportunities.`,
      pageUrl: WEBSITE.url,
      pageImage: WEBSITE.image,
      isHomePage: true,
   })

   return (
      <>
         {/* Enhanced Next SEO with comprehensive configuration */}
         <NextSeo
            {...enhancedSEO}
            openGraph={{
               ...enhancedSEO.openGraph,
               type: 'profile',
               profile: {
                  firstName: RESUME.firstName,
                  lastName: RESUME.lastName,
                  username:
                     RESUME.contact.github?.split('/').pop() || 'professional',
                  gender: 'male',
               },
               images: [
                  {
                     url: WEBSITE.image,
                     alt: `${RESUME.name} - Professional Photo`,
                     width: 1200,
                     height: 630,
                     type: 'image/jpeg',
                  },
                  {
                     url: `${WEBSITE.url}/full.png`,
                     alt: `${RESUME.name} - CV Preview`,
                     width: 1200,
                     height: 900,
                     type: 'image/png',
                  },
                  {
                     url: `${WEBSITE.url}/profile.png`,
                     alt: `${RESUME.name} - Profile Picture`,
                     width: 800,
                     height: 800,
                     type: 'image/png',
                  },
               ],
            }}
            additionalMetaTags={[
               ...(enhancedSEO.additionalMetaTags || []),
               {
                  name: 'keywords',
                  content: `${RESUME.name}, ${RESUME.summary}, ${RESUME.skills
                     .slice(0, 10)
                     .map((s) => s.name)
                     .join(
                        ', '
                     )}, ${RESUME.keywords.slice(0, 10).join(', ')}, CV, Resume, Portfolio, ${RESUME.locations.map((l) => l.name.split(',')[0]).join(', ')}`,
               },
               {
                  name: 'description',
                  content: `${RESUME.name} - ${RESUME.summary}. Professional with ${RESUME.experiences.length}+ years experience. Expert in ${RESUME.skills
                     .slice(0, 5)
                     .map((s) => s.name)
                     .join(', ')}. Contact: ${RESUME.contact.email}`,
               },
               {
                  name: 'subject',
                  content: `${RESUME.summary}, Software Development, Technology Leadership, ${RESUME.skills
                     .slice(0, 5)
                     .map((s) => s.name)
                     .join(', ')}`,
               },
               {
                  name: 'summary',
                  content: `Professional portfolio of ${RESUME.name}, showcasing expertise in ${RESUME.summary.toLowerCase()} with experience at ${RESUME.experiences
                     .slice(0, 3)
                     .map((exp) => exp.company)
                     .join(', ')}.`,
               },
               {
                  name: 'classification',
                  content: `Professional CV, Portfolio, Resume - ${RESUME.summary}`,
               },
               {
                  name: 'category',
                  content: `Technology, Software Development, ${RESUME.skills
                     .slice(0, 3)
                     .map((s) => s.name)
                     .join(', ')}`,
               },
               {
                  name: 'target',
                  content:
                     'employers, recruiters, clients, technology professionals, hiring managers',
               },
               {
                  name: 'audience',
                  content:
                     'technology companies, startups, enterprises, recruitment agencies, professional networks',
               },
               {
                  name: 'distribution',
                  content: 'global',
               },
               {
                  name: 'coverage',
                  content:
                     RESUME.locations.map((loc) => loc.name).join(', ') ||
                     'Global',
               },
               {
                  name: 'rating',
                  content: 'Senior Professional',
               },
               {
                  name: 'experience-level',
                  content: 'Senior',
               },
               {
                  name: 'industry',
                  content:
                     'Technology, Software Development, Information Technology',
               },
               {
                  name: 'job-title',
                  content: RESUME.summary,
               },
               {
                  name: 'skills',
                  content: RESUME.skills.map((s) => s.name).join(', '),
               },
               {
                  name: 'technologies',
                  content: RESUME.technologies.map((t) => t.name).join(', '),
               },
               {
                  name: 'education',
                  content: RESUME.educations
                     .map((edu) => `${edu.title} - ${edu.company}`)
                     .join('; '),
               },
               {
                  name: 'location',
                  content: RESUME.locations.map((loc) => loc.name).join('; '),
               },
               {
                  name: 'availability',
                  content:
                     'Available for full-time, contract, and consulting opportunities',
               },
               {
                  name: 'remote-work',
                  content: 'Available for remote work globally',
               },
               {
                  name: 'contact-email',
                  content: RESUME.contact.email,
               },
               {
                  name: 'linkedin-profile',
                  content: RESUME.contact.linkedin || '',
               },
               {
                  name: 'github-profile',
                  content: RESUME.contact.github || '',
               },
               {
                  name: 'professional-summary',
                  content:
                     typeof RESUME.about === 'string'
                        ? RESUME.about
                        : 'Professional software developer and technology leader',
               },
            ]}
            additionalLinkTags={[
               {
                  rel: 'canonical',
                  href: WEBSITE.url,
               },
               {
                  rel: 'alternate',
                  type: 'application/pdf',
                  href: `${WEBSITE.url}/cv.pdf`,
               },
               {
                  rel: 'alternate',
                  type: 'application/pdf',
                  href: `${WEBSITE.url}/resume.pdf`,
               },
               {
                  rel: 'me',
                  href: RESUME.contact.linkedin || '',
               },
               {
                  rel: 'me',
                  href: RESUME.contact.github || '',
               },
               {
                  rel: 'me',
                  href: RESUME.contact.twitter || '',
               },
               {
                  rel: 'author',
                  href: WEBSITE.url,
               },
               {
                  rel: 'publisher',
                  href: WEBSITE.url,
               },
            ]}
         />

         {/* Comprehensive JsonLd components - ALL available types used */}
         <ComprehensiveJsonLd
            resume={RESUME}
            website={WEBSITE}
            pageType="home"
            isHomePage={true}
         />

         <main className="">
            <CV resume={RESUME} />
         </main>
      </>
   )
}

export const getServerSideProps = async ({
   req,
   res,
}: GetServerSidePropsContext) => {
   const caller = appRouter.createCaller({
      mongo: {} as any, // Simplified context
      ip: '127.0.0.1',
      md: {} as any,
      mail: {} as any,
      telegram: {} as any,
      req: req as NextApiRequest,
      res: res as NextApiResponse,
   })

   // You can now call tRPC procedures directly on the server
   // const data = await caller.someRouter.someQuery({ input });

   return {
      props: {},
   }
}
