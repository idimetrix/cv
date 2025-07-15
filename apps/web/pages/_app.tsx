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
import App from 'next/app'
import { useRouter } from 'next/router'
import NProgress from 'nprogress'
import { ReactElement, ReactNode, useEffect, useState } from 'react'
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

   const [windowSize, setWindowSize] = useState({ width: 0, height: 0 })

   useEffect(() => {
      const handleRouteStart = () => NProgress.start()
      const handleRouteDone = () => NProgress.done()
      const handleRouteError = () => NProgress.done()

      router.events.on('routeChangeStart', handleRouteStart)
      router.events.on('routeChangeComplete', handleRouteDone)
      router.events.on('routeChangeError', handleRouteError)

      return () => {
         // Make sure to remove the event handler on unmount!
         router.events.off('routeChangeStart', handleRouteStart)
         router.events.off('routeChangeComplete', handleRouteDone)
         router.events.off('routeChangeError', handleRouteError)
      }
   }, [router.events])

   // const dialogs = useDialogsStore();
   const confetti = useConfettiStore()

   useEffect(() => {
      setWindowSize({
         width: window.screen.width,
         height: window.screen.height,
      })
   }, [])

   useEffect(() => {
      const timeout = setTimeout(() => {
         setLoaded(true)
      }, 200)
      return () => clearTimeout(timeout)
   }, [])

   return (
      <main className={cn(jost.className, 'group/page min-h-screen')}>
         <Head>
            <meta
               name="viewport"
               content="width=device-width, initial-scale=1"
            />
         </Head>
         <DefaultSeo {...defaultSEO} />

         <GlobalProvider>
            {/*<ContextProvider>*/}
            {confetti.isConfetti && (
               <div className="pointer-events-none fixed bottom-0 left-0 right-0 top-0 ">
                  <Confetti
                     width={windowSize.width}
                     height={windowSize.height}
                     numberOfPieces={500}
                     onConfettiComplete={() => confetti.setConfetti(false)}
                     recycle={false}
                     gravity={0.25}
                  />
               </div>
            )}

            {getLayout(<Component {...pageProps} />)}

            <Analytics />

            <Toaster
               position="top-center"
               containerClassName=""
               containerStyle={{}}
               toastOptions={{
                  duration: 5000,
                  style: {
                     background: 'var(--color-blue-1)',
                     border: 'none',
                     boxShadow: 'none',
                     color: '#ffffff',
                     fontSize: '16px',
                     borderRadius: '4px',
                  },
                  success: {
                     style: {
                        background: 'var(--color-green-2)',
                        color: '#fff',
                     },
                     iconTheme: {
                        primary: '#fff',
                        secondary: 'var(--color-green-2)',
                     },
                  },
                  error: {
                     style: {
                        background: 'var(--color-red-1)',
                        color: '#fff',
                     },
                     iconTheme: {
                        primary: '#fff',
                        secondary: 'var(--color-red-1)',
                     },
                  },
                  loading: {
                     style: {
                        background: 'var(--color-blue-1)',
                        color: '#fff',
                     },
                     icon: (
                        <FontAwesomeIcon
                           icon={faSpinnerThird}
                           className="h-[20px] w-[20px] animate-spin text-white"
                        />
                     ),
                     iconTheme: {
                        primary: '#fff',
                        secondary: 'var(--color-blue-1)',
                     },
                  },
               }}
            />
            {/*</ContextProvider>*/}
         </GlobalProvider>
      </main>
   )
}

MyApp.getInitialProps = async (ctx: AppContext): Promise<AppInitialProps> => {
   const nonce = ctx.ctx.req?.headers?.['x-nonce'] as string | undefined

   const initialProps = await App.getInitialProps(ctx)

   initialProps.pageProps.nonce = nonce

   return { ...initialProps }
}

export default trpc.withTRPC(MyApp)
