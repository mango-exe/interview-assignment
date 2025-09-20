import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import type { RootState } from '@/store/store'

interface ProtectedProps {
  children: React.ReactNode
  redirectTo?: string
}

const Protected: React.FC<ProtectedProps> = ({ children, redirectTo = '/login' }) => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated)

  if (!isAuthenticated) {
    return <Navigate to={redirectTo} replace />
  }

  return <>{children}</>
}

export default Protected
