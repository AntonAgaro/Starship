import { Alert, Space } from 'antd'
import React, { useState, useEffect, ReactNode } from 'react'

interface ErrorBoundaryProps {
  children: ReactNode
}

export const ErrorBoundary = ({ children }: ErrorBoundaryProps) => {
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const handleError = (error: ErrorEvent) => {
      setError(error.error)
    }

    setError(null)

    window.addEventListener('error', handleError)

    return () => {
      window.removeEventListener('error', handleError)
    }
  }, [])

  if (error) {
    return (
      <Space direction="vertical" className="error-container">
        <Alert
          message={error.message}
          description="This is an error message"
          type="error"
          showIcon
        />
      </Space>
    )
  }

  return <>{children}</>
}
