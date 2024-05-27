'use client'

import { AnimatePresence } from 'framer-motion'
import { ReactNode } from 'react'
import { Wizard } from 'react-use-wizard'

type Props = {
  children: ReactNode
  startIndex?: number
}

export function Steps({ children, startIndex }: Props) {
  return (
    <Wizard
      startIndex={startIndex}
      wrapper={<AnimatePresence initial={false} mode="wait" />}
    >
      {children}
    </Wizard>
  )
}
