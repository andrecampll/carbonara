import { motion, Variants } from 'framer-motion'
import { memo, ReactNode } from 'react'
import { useWizard } from 'react-use-wizard'

const variants: Variants = {
  enter: (direction: number) => {
    return {
      x: direction > 0 ? 800 : -800,
      opacity: 0,
    }
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => {
    return {
      zIndex: 0,
      x: direction < 0 ? 800 : -800,
      opacity: 0,
    }
  },
}

type Props = {
  children: ReactNode
}

export const Step = memo<Props>(({ children }) => {
  const { activeStep } = useWizard()

  const previousStepIndex = { current: activeStep - 1 }

  return (
    <motion.div
      custom={activeStep - previousStepIndex.current}
      variants={variants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 30,
      }}
    >
      {children}
    </motion.div>
  )
})

Step.displayName = 'Step'
