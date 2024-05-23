import { Button, Typography } from '@mui/material'
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
  title: string
  description: string
  hideCancelButton?: boolean
  onNextClick?: () => void
  nextButtonFormId?: string
}

export const BaseStep = memo<Props>(
  ({
    children,
    title,
    description,
    hideCancelButton = false,
    nextButtonFormId,
    onNextClick,
  }) => {
    const { activeStep, previousStep } = useWizard()

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
        <div className="flex flex-col gap-4">
          <header>
            <Typography variant="h5">{title}</Typography>
            <Typography fontWeight={400}>{description}</Typography>
          </header>
          {children}

          <footer
            className={`flex w-full items-center ${!hideCancelButton ? 'justify-between' : 'justify-end'}`}
          >
            {!hideCancelButton && (
              <Button onClick={previousStep} color="secondary">
                Back
              </Button>
            )}

            <Button
              variant="contained"
              color="secondary"
              type="submit"
              form={nextButtonFormId}
              onClick={onNextClick}
            >
              Next
            </Button>
          </footer>
        </div>
      </motion.div>
    )
  },
)

BaseStep.displayName = 'BaseStep'
