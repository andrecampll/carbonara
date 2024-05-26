'use client'

import { AnimatePresence } from 'framer-motion'
import { ReactNode } from 'react'
import { Wizard } from 'react-use-wizard'

type Props = {
  children: ReactNode
}

export function Steps({ children }: Props) {
  return (
    <Wizard wrapper={<AnimatePresence initial={false} mode="wait" />}>
      {children}
    </Wizard>
  )
}
