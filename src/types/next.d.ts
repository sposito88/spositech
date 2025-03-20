import React from 'react'
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'

declare module 'next' {
  export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
    getLayout?: (page: React.ReactElement) => React.ReactNode
  }
}

declare module 'next/app' {
  export type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout
  }
} 