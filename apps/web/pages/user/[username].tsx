import {
   GetServerSidePropsContext,
   NextApiRequest,
   NextApiResponse,
} from 'next'
import { NextSeo } from 'next-seo'
import { appRouter } from '@cv/trpc/server/router/_app'
import { CV } from '../../components/organism'
import { Resume } from '../../types'
import {
   WEBSITE,
   getSeniorityLevel,
   getPrimaryIndustry,
   getDistributionScope,
   getTargetAudience,
   getAudienceCompanies,
} from '../../constants'
import { ComprehensiveJsonLd } from '../../utils/seo'
import { getUserResume } from '../../utils/users'
import { useMemo } from 'react'

interface UserPageProps {
   resume: Resume
   username: string
}

export default function UserPage({ resume, username }: UserPageProps) {
   // Pre-compute static values to avoid recalculation
   const STATIC_DATA = useMemo(
      () => ({
         primaryIndustry: getPrimaryIndustry(resume.experiences, resume.skills),
         targetAudience: getTargetAudience(resume.experiences, resume.skills),
         audienceCompanies: getAudienceCompanies(
            resume.experiences,
            resume.skills
         ),
         distributionScope: getDistributionScope(resume.locations),
         seniorityLevel: getSeniorityLevel(resume.experiences),
         topSkills: resume.skills.slice(0, 10).map((s) => s.name),
         topExperiences: resume.experiences
            .slice(0, 3)
            .map((exp) => exp.company),
         locationNames: resume.locations.map((l) => l.name),
      }),
      [resume]
   )

   // Generate comprehensive SEO with all metadata
   const seoMetadata = useMemo(
      () => ({
         title: `${resume.name} - ${resume.summary}`,
         description: `Professional portfolio of ${resume.name}${resume.locations[0] ? ` based in ${resume.locations[0].name}` : ''}. ${resume.summary}. ${STATIC_DATA.topSkills.slice(0, 5).join(', ')}.`,
         keywords: [
            resume.name,
            ...resume.keywords,
            ...STATIC_DATA.topSkills,
            ...STATIC_DATA.topExperiences,
            STATIC_DATA.primaryIndustry,
            STATIC_DATA.seniorityLevel,
            ...(resume.languages ? Object.keys(resume.languages) : []),
         ].join(', '),
         canonical: `${WEBSITE.url}/user/${username}`,
         openGraph: {
            type: 'profile',
            profile: {
               firstName: resume.firstName || resume.name.split(' ')[0],
               lastName:
                  resume.lastName || resume.name.split(' ').slice(1).join(' '),
               username: username,
               gender: resume.gender,
            },
            title: `${resume.name} - ${resume.summary}`,
            description: `Professional portfolio of ${resume.name}. ${resume.summary}.`,
            url: `${WEBSITE.url}/user/${username}`,
            images: [
               {
                  url: resume.avatar,
                  width: 1200,
                  height: 630,
                  alt: `${resume.name} - Professional CV`,
               },
            ],
         },
         twitter: {
            cardType: 'summary_large_image',
            handle: resume.contact.twitter
               ? `@${resume.contact.twitter.split('/').pop()}`
               : undefined,
         },
      }),
      [resume, username, STATIC_DATA]
   )

   // Generate JSON-LD structured data
   const JsonLdComponent = useMemo(
      () => (
         <ComprehensiveJsonLd
            resume={resume}
            website={WEBSITE}
            pageType="home"
            isHomePage={true}
         />
      ),
      [resume]
   )

   return (
      <>
         <NextSeo
            title={seoMetadata.title}
            description={seoMetadata.description}
            canonical={seoMetadata.canonical}
            openGraph={seoMetadata.openGraph}
            twitter={seoMetadata.twitter}
            additionalMetaTags={[
               {
                  name: 'keywords',
                  content: seoMetadata.keywords,
               },
               {
                  name: 'author',
                  content: resume.name,
               },
               {
                  property: 'profile:username',
                  content: username,
               },
            ]}
         />

         {JsonLdComponent}

         <main className="">
            {/* Main CV Content */}
            <CV resume={resume} />
         </main>
      </>
   )
}

export const getServerSideProps = async ({
   req,
   res,
   params,
}: GetServerSidePropsContext) => {
   const username = params?.username as string

   if (!username) {
      return {
         notFound: true,
      }
   }

   // Load user resume dynamically
   const resume = await getUserResume(username)

   if (!resume) {
      return {
         notFound: true,
      }
   }

   // Create caller for potential server-side tRPC calls
   const _caller = appRouter.createCaller({
      mongo: {} as any,
      ip: '127.0.0.1',
      md: {} as any,
      mail: {} as any,
      telegram: {} as any,
      req: req as NextApiRequest,
      res: res as NextApiResponse,
   })

   // Set cache headers for better performance
   res.setHeader(
      'Cache-Control',
      'public, s-maxage=3600, stale-while-revalidate=7200'
   )

   return {
      props: {
         resume,
         username,
      },
   }
}
