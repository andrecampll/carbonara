import './globals.css'

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import { Header } from '@/components/header'
import { ApolloWrapper } from '@/lib/apollo-wrapper'
import { FootprintProvider } from '@/hooks/use-footprint'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: {
    template: '%s | Carbonara',
    default: 'Home',
  },
  description: 'Carbonara carbon footprint calculator',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html className={inter.variable} lang="en">
      <body className={`${inter.className} bg-background antialiased`}>
        <ApolloWrapper>
          <FootprintProvider>
            <Header />

            <main className="mb-8 min-h-[84vh] px-4 md:px-12">
              <div className="m-auto max-w-5xl">{children}</div>
            </main>
            {/* <Footer /> */}
          </FootprintProvider>
        </ApolloWrapper>
      </body>
    </html>
  )
}
