import 'react'

declare module 'react' {
   interface CSSProperties {
      [key: `--${string}`]: string | number
   }
}

export * from './Resume'
export * from './Content'
