import * as trpcNext from '@cv/trpc/server/adapters/next'
import { createContext } from '@cv/trpc/server/context'
import { appRouter } from '@cv/trpc/server/router/_app'

export default trpcNext.createNextApiHandler({
   router: appRouter,
   /**
    * @link https://trpc.io/docs/context
    */
   createContext,
   /**
    * @link https://trpc.io/docs/error-handling
    */
   onError({ error }) {
      if (error.code === 'INTERNAL_SERVER_ERROR') {
         // send to bug reporting
         console.error('Something went wrong', error)
      }
   },
   /**
    * Enable query batching
    */
   batching: {
      enabled: true,
   },
   /**
    * @link https://trpc.io/docs/caching#api-response-caching
    */
   responseMeta(options) {
      const { ctx, errors, type } = options
      if (ctx?.res && errors.length === 0 && type === 'query') {
         // cache request for 1 hour + revalidate once every second
         const SECONDS = 60 * 60
         return {
            headers: {
               'Cache-Control': `public, s-maxage=1, stale-while-revalidate=${SECONDS}`,
               'CDN-Cache-Control': `public, s-maxage=${SECONDS}`,
               'Vercel-CDN-Cache-Control': `public, s-maxage=${SECONDS}`,
            },
         }
      }
      return {}
   },
})
