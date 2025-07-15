import { NextPageContext } from "next";

import { httpBatchLink, loggerLink } from "@trpc/client";
import { createTRPCNext } from "@trpc/next";

import type { inferRouterInputs, inferRouterOutputs } from "../server";
import type { AppRouter } from "../server/router/_app";

function getBaseUrl() {
  // @ts-ignore
  if (typeof window !== "undefined") {
    return "";
  }

  // reference for vercel.com
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  // // reference for render.com
  if (process.env.RENDER_INTERNAL_HOSTNAME) {
    return `http://${process.env.RENDER_INTERNAL_HOSTNAME}:${process.env.PORT}`;
  }

  // assume localhost
  return `http://127.0.0.1:${process.env.PORT ?? 3000}`;
}

/**
 * Extend `NextPageContext` with meta data that can be picked up by `responseMeta()` when server-side rendering
 */
export interface SSRContext extends NextPageContext {
  /**
   * Set HTTP Status code
   * @example
   * const modules = trpc.useContext();
   * if (modules.ssrContext) {
   *   modules.ssrContext.status = 404;
   * }
   */
  status?: number;
}

/**
 * A set of strongly-typed React hooks from your `AppRouter` type signature with `createReactQueryHooks`.
 * @link https://trpc.io/docs/react#3-create-trpc-hooks
 */
export const trpc = createTRPCNext<AppRouter, SSRContext>({
  config({ ctx }) {
    /**
     * If you want to use SSR, you need to use the server's full URL
     * @link https://trpc.io/docs/ssr
     */
    return {
      queryClientConfig: {
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
          },
        },
      },
      /**
       * @link https://trpc.io/docs/links
       */
      links: [
        // Adds pretty logs to your console in development and logs errors in production
        loggerLink({
          enabled: (operation) =>
            process.env.NODE_ENV === "development" ||
            (operation.direction === "down" && operation.result instanceof Error),
        }),
        httpBatchLink({
          url: `${getBaseUrl()}/api/trpc`,
        }),
      ],
      /**
       * @link https://react-query.tanstack.com/reference/QueryClient
       */
      // queryClientConfig: { defaultOptions: { queries: { staleTime: 60 } } },
    };
  },
  /**
   * @link https://trpc.io/docs/ssr
   */
  ssr: false,
});

export type RouterInput = inferRouterInputs<AppRouter>;
export type RouterOutput = inferRouterOutputs<AppRouter>;
