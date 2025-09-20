import React, { useEffect, useState } from 'react'
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"
import type { RootState } from '@/store/store'
import type { Error } from '@/types/store/error-state.types'
import { useSelector, useDispatch } from 'react-redux'
import { actions as errorActions } from '../../store/slices/error-slice'

const ErrorMessage = () => {
  const dispatch = useDispatch()
  const errors = useSelector((state: RootState) => state.error.errors)
  const [currentError, setCurrentError] = useState<Error | null>(null)
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (!currentError) return

    setShow(true)

    const timer = setTimeout(() => {
      setShow(false)
      setTimeout(() => {
        if (currentError) {
          dispatch(errorActions.clearError(currentError.errorId))
        }
      }, 300)
    }, 5000)

    return () => clearTimeout(timer)
  }, [currentError, dispatch])

  useEffect(() => {
    if (errors.length > 0) {
      setCurrentError(errors[errors.length - 1])
    }
  }, [errors])

  if (!currentError) return null

  return (
    <div className="fixed top-5 right-5 z-50 w-80">
      <Alert
        variant="destructive"
        className={`transition-all duration-300 transform ${
          show ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
        } shadow-lg border border-red-400`}
      >
        <AlertTitle className="text-red-700 font-semibold">Error</AlertTitle>
        <AlertDescription className="text-red-600 mt-1">
          {currentError.errorMessage}
        </AlertDescription>
      </Alert>
    </div>
  )
}

export default ErrorMessage
