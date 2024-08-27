import {
   GetServerSidePropsContext,
   NextApiRequest,
   NextApiResponse,
} from 'next'
import { createContext } from '@cv/trpc/server/context'
import { appRouter } from '@cv/trpc/server/router/_app'
import { inferSSRProps } from '@cv/types/inferSSRProps'

export default function Home({
   test,
}: inferSSRProps<typeof getServerSideProps>) {
   return <main className="container mx-auto">{test}</main>
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
      props: { test: 123 },
   }
}
