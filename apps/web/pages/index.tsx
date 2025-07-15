import {
   GetServerSidePropsContext,
   NextApiRequest,
   NextApiResponse,
} from 'next'
import { NextSeo, BreadcrumbJsonLd, ProfilePageJsonLd } from 'next-seo'
import { createContext } from '@cv/trpc/server/context'
import { appRouter } from '@cv/trpc/server/router/_app'
import { inferSSRProps } from '@cv/types/inferSSRProps'
import { CV } from '../components/organism'
import { RESUME } from '../users'
import { structuredData, WEBSITE } from '../constants'

export default function Home() {
   return (
      <>
         <NextSeo
            title="Home"
            description="Dmitrii Selikhov's professional CV and portfolio. CTO, Software Architect, and Technical Lead with 15+ years of experience in web development, team management, and technical leadership."
            canonical={WEBSITE.url}
            openGraph={{
               title: 'Dmitrii Selikhov - CTO, Software Architect, Technical Lead',
               description:
                  'Professional CV and portfolio showcasing expertise in JavaScript/TypeScript, React, Node.js, cloud architecture, and technical leadership.',
               url: WEBSITE.url,
               type: 'profile',
               profile: {
                  firstName: 'Dmitrii',
                  lastName: 'Selikhov',
                  username: 'dimetrix',
                  gender: 'male',
               },
               images: [
                  {
                     url: `${WEBSITE.url}${WEBSITE.image}`,
                     alt: 'Dmitrii Selikhov - Professional Photo',
                     width: 1200,
                     height: 630,
                     type: 'image/jpeg',
                  },
               ],
            }}
            additionalMetaTags={[
               {
                  name: 'keywords',
                  content:
                     'Dmitrii Selikhov, CTO, Software Architect, Technical Lead, JavaScript, TypeScript, React, Node.js, CV, Resume, Portfolio',
               },
            ]}
         />

         <ProfilePageJsonLd
            type="Person"
            keywordsString="JavaScript, TypeScript, React, Node.js, Software Architecture, Technical Leadership"
            images={[`${WEBSITE.url}${WEBSITE.image}`]}
            profileUrl={WEBSITE.url}
            name="Dmitrii Selikhov"
            breadcrumb={[
               {
                  position: 1,
                  name: 'Home',
                  item: WEBSITE.url,
               },
            ]}
         />

         <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
               __html: JSON.stringify([
                  structuredData.person,
                  structuredData.website,
                  structuredData.organization,
               ]),
            }}
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
