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

export default function Home() {
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
