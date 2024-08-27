import {
   GetServerSidePropsContext,
   NextApiRequest,
   NextApiResponse,
} from 'next'
import { createContext } from '@cv/trpc/server/context'
import { appRouter } from '@cv/trpc/server/router/_app'
import { inferSSRProps } from '@cv/types/inferSSRProps'
import { CV } from '../components/organism'
import { RESUME } from '../constants'

// eslint-disable-next-line no-empty-pattern
export default function Home({}: inferSSRProps<typeof getServerSideProps>) {
   return (
      <main className="">
         <CV resume={RESUME} />
      </main>
   )
}

export const getServerSideProps = async ({
   req,
   res,
}: GetServerSidePropsContext) => {
   const ctx = await createContext({
      req: req as NextApiRequest,
      res: res as NextApiResponse,
   })

   const caller = appRouter.createCaller(ctx)

   return {
      props: {},
   }
}
