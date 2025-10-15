import {
   GetServerSidePropsContext,
   NextApiRequest,
   NextApiResponse,
} from 'next'
import { NextSeo } from 'next-seo'
import { appRouter } from '@cv/trpc/server/router/_app'
import { CV } from '../components/organism'
import { RESUME } from '../users'
import {
   WEBSITE,
   getSeniorityLevel,
   getPrimaryIndustry,
   getDistributionScope,
   getTargetAudience,
   getAudienceCompanies,
} from '../constants'
import { createDefaultSEO, ComprehensiveJsonLd } from '../utils/seo'
import { useMemo } from 'react'

// Pre-compute static values to avoid recalculation
const STATIC_DATA = {
   primaryIndustry: getPrimaryIndustry(RESUME.experiences, RESUME.skills),
   targetAudience: getTargetAudience(RESUME.experiences, RESUME.skills),
   audienceCompanies: getAudienceCompanies(RESUME.experiences, RESUME.skills),
   distributionScope: getDistributionScope(RESUME.locations),
   seniorityLevel: getSeniorityLevel(RESUME.experiences),
   topSkills: RESUME.skills.slice(0, 10).map((s) => s.name),
   topExperiences: RESUME.experiences.slice(0, 3).map((exp) => exp.company),
   locationNames: RESUME.locations.map((l) => l.name),
   locationCities: RESUME.locations.map((loc) => loc.name),
}

export default function Home() {
   // Memoize expensive SEO configuration
   const seoConfig = useMemo(() => {
      const baseSEO = createDefaultSEO(RESUME, WEBSITE)

      return {
         ...baseSEO,
         title: `${RESUME.name} - ${RESUME.summary}`,
         description: `Professional portfolio and CV of ${RESUME.name}, ${RESUME.summary}. Explore ${RESUME.experiences.length}+ years of experience in ${STATIC_DATA.topSkills.slice(0, 5).join(', ')}. Available for ${STATIC_DATA.locationNames.join(', ')} and remote opportunities.`,
      }
   }, [])

   // Memoize OpenGraph configuration
   const openGraphConfig = useMemo(
      () => ({
         ...seoConfig.openGraph,
         type: 'profile' as const,
         profile: {
            firstName: RESUME.firstName,
            lastName: RESUME.lastName,
            username: RESUME.contact.github?.split('/').pop() || 'professional',
            ...(RESUME.gender && {
               gender: RESUME.gender,
            }),
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
      }),
      [seoConfig.openGraph]
   )

   // Memoize additional meta tags
   const additionalMetaTags = useMemo(
      () => [
         ...(seoConfig.additionalMetaTags || []),
         {
            name: 'keywords',
            content: `${RESUME.name}, ${RESUME.summary}, ${STATIC_DATA.topSkills.join(', ')}, ${RESUME.keywords.slice(0, 10).join(', ')}, CV, Resume, Portfolio, ${STATIC_DATA.locationCities.map((name) => name.split(',')[0]).join(', ')}`,
         },
         {
            name: 'description',
            content: `${RESUME.name} - ${RESUME.summary}. Professional with ${RESUME.experiences.length}+ years experience. Expert in ${STATIC_DATA.topSkills.slice(0, 5).join(', ')}. Contact: ${RESUME.contact.email}`,
         },
         {
            name: 'subject',
            content: `${RESUME.summary}, Software Development, Technology Leadership, ${STATIC_DATA.topSkills.slice(0, 5).join(', ')}`,
         },
         {
            name: 'summary',
            content: `Professional portfolio of ${RESUME.name}, showcasing expertise in ${RESUME.summary.toLowerCase()} with experience at ${STATIC_DATA.topExperiences.join(', ')}.`,
         },
         {
            name: 'classification',
            content: `Professional CV, Portfolio, Resume - ${RESUME.summary}`,
         },
         {
            name: 'category',
            content: `${STATIC_DATA.primaryIndustry}, ${STATIC_DATA.topSkills.slice(0, 3).join(', ')}`,
         },
         {
            name: 'target',
            content: STATIC_DATA.targetAudience,
         },
         {
            name: 'audience',
            content: STATIC_DATA.audienceCompanies,
         },
         {
            name: 'distribution',
            content: STATIC_DATA.distributionScope,
         },
         {
            name: 'coverage',
            content: STATIC_DATA.locationNames.join(', ') || 'Global',
         },
         {
            name: 'rating',
            content: STATIC_DATA.seniorityLevel,
         },
         {
            name: 'experience-level',
            content: STATIC_DATA.seniorityLevel.split(' ')[0], // Get just "Senior", "Mid", etc.
         },
         {
            name: 'industry',
            content: STATIC_DATA.primaryIndustry,
         },
         {
            name: 'availability',
            content: 'Available for hire, Open to opportunities, Remote work',
         },
         {
            name: 'contact-preference',
            content: `Email: ${RESUME.contact.email}${RESUME.contact.phone ? `, Phone: ${RESUME.contact.phone}` : ''}`,
         },
         {
            name: 'skills-count',
            content: `${RESUME.skills.length} technical skills`,
         },
         {
            name: 'projects-count',
            content: `${RESUME.projects.length} projects`,
         },
         {
            name: 'language-skills',
            content: Object.entries(RESUME.languages)
               .map(([lang, level]) => `${lang}: ${level}`)
               .join(', '),
         },
         {
            name: 'work-experience',
            content: `${RESUME.experiences.length} companies, ${RESUME.experiences.reduce(
               (years, exp) => {
                  const startYear = parseInt(exp.start.split(' ').pop() || '0')
                  const endYear =
                     exp.end === 'Present'
                        ? new Date().getFullYear()
                        : parseInt(exp.end?.split(' ').pop() || '0')
                  return years + (endYear - startYear)
               },
               0
            )} total years`,
         },
         {
            name: 'education-background',
            content: RESUME.educations
               .map((edu) => `${edu.title} at ${edu.company}`)
               .join(', '),
         },
         {
            name: 'specialization',
            content: STATIC_DATA.topSkills.slice(0, 5).join(', '),
         },
         {
            name: 'professional-level',
            content: STATIC_DATA.seniorityLevel,
         },
         {
            name: 'geographical-reach',
            content: STATIC_DATA.distributionScope,
         },
         {
            name: 'career-focus',
            content: RESUME.summary,
         },
      ],
      [seoConfig.additionalMetaTags]
   )

   // Memoized JSON-LD component
   const JsonLdComponent = useMemo(
      () => (
         <ComprehensiveJsonLd
            resume={RESUME}
            website={WEBSITE}
            pageType="home"
            isHomePage={true}
         />
      ),
      []
   )

   return (
      <>
         {/* Optimized Next SEO with memoized configuration */}
         <NextSeo
            {...seoConfig}
            openGraph={openGraphConfig}
            additionalMetaTags={additionalMetaTags}
            additionalLinkTags={[
               ...(seoConfig.additionalLinkTags || []),
               {
                  rel: 'author',
                  href:
                     RESUME.contact.linkedin || RESUME.contact.website || '#',
               },
               {
                  rel: 'me',
                  href: RESUME.contact.website || '#',
               },
            ]}
         />

         {/* Comprehensive JSON-LD structured data */}
         {JsonLdComponent}

         <main className="">
            {/* Main CV Content */}
            <CV resume={RESUME} />
         </main>
      </>
   )
}

export const getServerSideProps = async ({
   req,
   res,
}: GetServerSidePropsContext) => {
   // Create caller for potential server-side tRPC calls
   const _caller = appRouter.createCaller({
      mongo: {} as any, // Simplified context
      ip: '127.0.0.1',
      md: {} as any,
      mail: {} as any,
      telegram: {} as any,
      req: req as NextApiRequest,
      res: res as NextApiResponse,
   })

   // You can now call tRPC procedures directly on the server
   // const data = await _caller.someRouter.someQuery({ input });

   return {
      props: {},
   }
}
