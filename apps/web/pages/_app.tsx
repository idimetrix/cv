import { cn } from '@cv/lib'
import { trpc } from '@cv/trpc/react'
import { config } from '@fortawesome/fontawesome-svg-core'
import { faSpinnerThird } from '@fortawesome/pro-duotone-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Analytics } from '@vercel/analytics/react'
import { NextPage } from 'next'
import { DefaultSeo } from 'next-seo'
import { ThemeProvider } from 'next-themes'
import type { AppContext, AppInitialProps, AppProps } from 'next/app'
import App from 'next/app'
import { useRouter } from 'next/router'
import NProgress from 'nprogress'
import { ReactElement, ReactNode, useEffect, useState } from 'react'
import Confetti from 'react-confetti'
import { Toaster } from 'react-hot-toast'
import { WEBSITE } from '../constants'
// import ContextProvider from '../contexts'
import { useConfettiStore } from '../store/confetti'
import '../styles/globals.css'
import { GlobalProvider } from '../context/store'
import { Plus_Jakarta_Sans, Source_Serif_4, Work_Sans } from 'next/font/google'

// Plus Jakarta Sans font family with 4 weights and 2 styles
const Jakarta_Sans = Plus_Jakarta_Sans({
   weight: ['400', '500', '600', '700'],
   style: ['normal', 'italic'],
   subsets: ['latin'],
   display: 'swap',
   variable: '--font-plus-jakarta-sans',
})

// Work Sans font family with 4 weights and 2 styles
const work_Sans = Work_Sans({
   weight: ['400', '500', '600', '700'],
   style: ['normal', 'italic'],
   subsets: ['latin'],
   display: 'swap',
   variable: '--font-work-sans',
})

// Source Serif Pro font family with 4 weights and 2 styles
const source_Serif_Pro = Source_Serif_4({
   weight: ['200', '300', '400', '600', '700'],
   style: ['normal', 'italic'],
   subsets: ['latin'],
   display: 'swap',
   variable: '--font-source-serif-pro',
})

config.autoAddCss = false

NProgress.configure({ showSpinner: false })

export type NextPageWithLayout = NextPage & {
   getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
   Component: NextPageWithLayout
}

const hasCursor = false
const hasToTop = false
const hasCall2Action = false

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
      <>
         <style
            dangerouslySetInnerHTML={{
               __html: `
                 :root {
                   --font-plus-jakarta-sans: ${Jakarta_Sans.style.fontFamily};
                   --font-work-sans: ${work_Sans.style.fontFamily};
                   --font-source-serif-pro: ${source_Serif_Pro.style.fontFamily};
                 }`,
            }}
         />

         <DefaultSeo
            titleTemplate={`%s | ${WEBSITE.name}`}
            title={WEBSITE.description}
         />

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
                        gravity={0.2}
                     />
                  </div>
               )}

               <ThemeProvider
                  attribute="class"
                  enableSystem={false}
                  defaultTheme="dark"
               >
                  {getLayout(<Component {...pageProps} />)}
               </ThemeProvider>

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
      </>
   )
}

MyApp.getInitialProps = async (ctx: AppContext): Promise<AppInitialProps> => {
   const nonce = ctx.ctx.req?.headers?.['x-nonce'] as string | undefined

   const initialProps = await App.getInitialProps(ctx)

   initialProps.pageProps.nonce = nonce

   return { ...initialProps }
}

export default trpc.withTRPC(MyApp)
