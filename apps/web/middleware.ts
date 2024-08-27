import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export const config = {
   matcher: [
      /*
       * Match all request paths except for the ones starting with:
       * - api (API routes)
       * - trpc (TRPC routes)
       * - public (public files)
       * - _next/static (static files)
       * - _next/image (image optimization files)
       * - favicon.ico (favicon file)
       */
      {
         source: '/((?!api|trpc|_next/static|_next/image|favicon.ico).*)',
         missing: [
            { type: 'header', key: 'next-router-prefetch' },
            { type: 'header', key: 'purpose', value: 'prefetch' },
         ],
      },
   ],
}

export async function middleware(request: NextRequest) {
   const nonce = crypto.randomUUID()

   const headers = new Headers(request.headers)

   headers.set('x-nonce', nonce)

   const response = NextResponse.next({
      request: {
         headers,
      },
   })

   headers.set('x-nonce', nonce)

   return response
}
