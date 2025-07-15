import Document, {
   DocumentContext,
   DocumentInitialProps,
   Head,
   Html,
   Main,
   NextScript,
} from 'next/document'
import Script from 'next/script'
import { ServerStyleSheet } from 'styled-components'
import { WEBSITE } from '../constants'

export default function PagesDocument({
   nonce,
}: DocumentInitialProps & { nonce: string | undefined }) {
   return (
      <Html lang="en">
         <Head nonce={nonce}>
            <meta name="referrer" content="origin-when-cross-origin" />
            <meta httpEquiv="content-type" content="text/html; charset=utf-8" />
            <meta name="robots" content="index, follow" />
            <meta name="googlebot" content="index, follow" />
            <meta name="keywords" content={WEBSITE.keywords} key="keywords" />
            <meta httpEquiv="content-language" content="en-us" />
            <meta httpEquiv="content-script-type" content="text/javascript" />
            <meta httpEquiv="content-style-type" content="text/css" />
            <meta httpEquiv="window-target" content="_top" />
            <link rel="manifest" href="/manifest.json" />
            <link rel="icon" type="image/png" href="/favicon.png" />
            <link rel="shortcut icon" type="image/x-icon" href="/favicon.png" />
            <meta
               name="theme-color"
               content={WEBSITE.color}
               media="(prefers-color-scheme: dark)"
            />
            <meta name="msapplication-TileColor" content={WEBSITE.color} />
            <link rel="apple-touch-icon" href="/apple-icon-180.png" />
            <meta name="apple-mobile-web-app-capable" content="yes" />
            <link
               rel="apple-touch-startup-image"
               href="/apple-splash-2048-2732.png"
               media="(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
            />
            <link
               rel="apple-touch-startup-image"
               href="/apple-splash-2732-2048.png"
               media="(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
            />
            <link
               rel="apple-touch-startup-image"
               href="/apple-splash-1668-2388.png"
               media="(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
            />
            <link
               rel="apple-touch-startup-image"
               href="/apple-splash-2388-1668.png"
               media="(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
            />
            <link
               rel="apple-touch-startup-image"
               href="/apple-splash-1536-2048.png"
               media="(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
            />
            <link
               rel="apple-touch-startup-image"
               href="/apple-splash-2048-1536.png"
               media="(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
            />
            <link
               rel="apple-touch-startup-image"
               href="/apple-splash-1668-2224.png"
               media="(device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
            />
            <link
               rel="apple-touch-startup-image"
               href="/apple-splash-2224-1668.png"
               media="(device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
            />
            <link
               rel="apple-touch-startup-image"
               href="/apple-splash-1620-2160.png"
               media="(device-width: 810px) and (device-height: 1080px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
            />
            <link
               rel="apple-touch-startup-image"
               href="/apple-splash-2160-1620.png"
               media="(device-width: 810px) and (device-height: 1080px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
            />
            <link
               rel="apple-touch-startup-image"
               href="/apple-splash-1290-2796.png"
               media="(device-width: 430px) and (device-height: 932px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"
            />
            <link
               rel="apple-touch-startup-image"
               href="/apple-splash-2796-1290.png"
               media="(device-width: 430px) and (device-height: 932px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)"
            />
            <link
               rel="apple-touch-startup-image"
               href="/apple-splash-1179-2556.png"
               media="(device-width: 393px) and (device-height: 852px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"
            />
            <link
               rel="apple-touch-startup-image"
               href="/apple-splash-2556-1179.png"
               media="(device-width: 393px) and (device-height: 852px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)"
            />
            <link
               rel="apple-touch-startup-image"
               href="/apple-splash-1284-2778.png"
               media="(device-width: 428px) and (device-height: 926px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"
            />
            <link
               rel="apple-touch-startup-image"
               href="/apple-splash-2778-1284.png"
               media="(device-width: 428px) and (device-height: 926px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)"
            />
            <link
               rel="apple-touch-startup-image"
               href="/apple-splash-1170-2532.png"
               media="(device-width: 390px) and (device-height: 844px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"
            />
            <link
               rel="apple-touch-startup-image"
               href="/apple-splash-2532-1170.png"
               media="(device-width: 390px) and (device-height: 844px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)"
            />
            <link
               rel="apple-touch-startup-image"
               href="/apple-splash-1125-2436.png"
               media="(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"
            />
            <link
               rel="apple-touch-startup-image"
               href="/apple-splash-2436-1125.png"
               media="(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)"
            />
            <link
               rel="apple-touch-startup-image"
               href="/apple-splash-1242-2688.png"
               media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"
            />
            <link
               rel="apple-touch-startup-image"
               href="/apple-splash-2688-1242.png"
               media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)"
            />
            <link
               rel="apple-touch-startup-image"
               href="/apple-splash-828-1792.png"
               media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
            />
            <link
               rel="apple-touch-startup-image"
               href="/apple-splash-1792-828.png"
               media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
            />
            <link
               rel="apple-touch-startup-image"
               href="/apple-splash-1242-2208.png"
               media="(device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"
            />
            <link
               rel="apple-touch-startup-image"
               href="/apple-splash-2208-1242.png"
               media="(device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)"
            />
            <link
               rel="apple-touch-startup-image"
               href="/apple-splash-750-1334.png"
               media="(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
            />
            <link
               rel="apple-touch-startup-image"
               href="/apple-splash-1334-750.png"
               media="(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
            />
            <link
               rel="apple-touch-startup-image"
               href="/apple-splash-640-1136.png"
               media="(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
            />
            <link
               rel="apple-touch-startup-image"
               href="/apple-splash-1136-640.png"
               media="(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
            />
            <Script
               src="https://accounts.google.com/gsi/client"
               nonce={nonce}
               async
               defer
               strategy="afterInteractive"
            />
         </Head>
         <body>
            <Main />
            <NextScript />
         </body>
      </Html>
   )
}

PagesDocument.getInitialProps = async (
   ctx: DocumentContext
): Promise<DocumentInitialProps & { nonce: string | undefined }> => {
   const nonce =
      (ctx.req?.headers?.['x-nonce'] as string) || crypto.randomUUID()

   const sheet = new ServerStyleSheet()

   const originalRenderPage = ctx.renderPage

   try {
      ctx.renderPage = () =>
         originalRenderPage({
            enhanceApp: (App) => (props) =>
               sheet.collectStyles(<App {...props} />),
         })

      const initialProps = await Document.getInitialProps(ctx)

      return {
         ...initialProps,
         nonce,
         styles: (
            <>
               {initialProps.styles}
               {sheet.getStyleElement()}
            </>
         ),
      }
   } finally {
      sheet.seal()
   }
}
