import { cn } from '@cv/lib'
import { trpc } from '@cv/trpc/react'
import { config } from '@fortawesome/fontawesome-svg-core'
import { faSpinnerThird } from '@fortawesome/pro-duotone-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Analytics } from '@vercel/analytics/react'
import { NextPage } from 'next'
import { DefaultSeo } from 'next-seo'
import Head from 'next/head'
import type { AppContext, AppInitialProps, AppProps } from 'next/app'
import { defaultSEO } from '../constants'
import { RESUME } from '../users'
import { WEBSITE } from '../constants'
import { createDefaultSEO } from '../utils/seo'
import App from 'next/app'
import { useRouter } from 'next/router'
import NProgress from 'nprogress'
import {
   ReactElement,
   ReactNode,
   useEffect,
   useState,
   useMemo,
   useCallback,
} from 'react'
import Confetti from 'react-confetti'
import { Toaster } from 'react-hot-toast'
import { Jost } from 'next/font/google'
import { useConfettiStore } from '../store/confetti'
import { GlobalProvider } from '../context/store'

import '../styles/globals.css'

const jost = Jost({
   weight: ['400', '500', '600', '700'],
   style: 'normal',
   subsets: ['latin'],
   display: 'block',
   variable: '--font-inter',
})

config.autoAddCss = false

NProgress.configure({ showSpinner: false })

export type NextPageWithLayout = NextPage & {
   getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
   Component: NextPageWithLayout
}

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
   const [loaded, setLoaded] = useState<boolean>(false)

   const router = useRouter()

   // Use the layout defined at the page level, if available
   const getLayout = Component.getLayout ?? ((page) => page)

   const { isConfetti, setConfetti } = useConfettiStore()

   // Memoize window dimensions for confetti to avoid accessing window on every render
   const windowDimensions = useMemo(() => {
      if (typeof window !== 'undefined') {
         return {
            width: window.innerWidth,
            height: window.innerHeight,
         }
      }
      return { width: 1200, height: 800 } // fallback dimensions
   }, [])

   // Memoize default SEO configuration since RESUME and WEBSITE are static
   const defaultSEOConfig = useMemo(() => createDefaultSEO(RESUME, WEBSITE), [])

   // Memoized loading component
   const LoadingComponent = useMemo(
      () => (
         <div className="flex h-screen w-full items-center justify-center">
            <FontAwesomeIcon
               icon={faSpinnerThird}
               className="fa-spin h-8 w-8 text-black"
            />
         </div>
      ),
      []
   )

   // Memoized confetti complete handler
   const handleConfettiComplete = useCallback(() => {
      setConfetti(false)
   }, [setConfetti])

   // Memoized event handlers for router
   const handleRouteStart = useCallback(() => {
      NProgress.start()
   }, [])

   const handleRouteStop = useCallback(() => {
      NProgress.done()
   }, [])

   useEffect(() => {
      if (typeof window !== 'undefined') {
         setLoaded(true)
      }
   }, [])

   useEffect(() => {
      router.events.on('routeChangeStart', handleRouteStart)
      router.events.on('routeChangeComplete', handleRouteStop)
      router.events.on('routeChangeError', handleRouteStop)

      return () => {
         router.events.off('routeChangeStart', handleRouteStart)
         router.events.off('routeChangeComplete', handleRouteStop)
         router.events.off('routeChangeError', handleRouteStop)
      }
   }, [router.events, handleRouteStart, handleRouteStop])

   if (!loaded) {
      return LoadingComponent
   }

   return (
      <GlobalProvider>
         <Head>
            <meta
               name="viewport"
               content="width=device-width, initial-scale=1"
            />
         </Head>

         {/* Use memoized comprehensive default SEO */}
         <DefaultSeo {...defaultSEOConfig} />

         <div className={cn(jost.variable, 'font-sans')}>
            {isConfetti && (
               <Confetti
                  width={windowDimensions.width}
                  height={windowDimensions.height}
                  recycle={false}
                  numberOfPieces={300}
                  onConfettiComplete={handleConfettiComplete}
               />
            )}

            {getLayout(<Component {...pageProps} />)}

            <Toaster />
         </div>

         <Analytics />
      </GlobalProvider>
   )
}

MyApp.getInitialProps = async (ctx: AppContext): Promise<AppInitialProps> => {
   const nonce = ctx.ctx.req?.headers?.['x-nonce'] as string | undefined

   const initialProps = await App.getInitialProps(ctx)

   initialProps.pageProps.nonce = nonce

   return { ...initialProps }
}

export default trpc.withTRPC(MyApp)
