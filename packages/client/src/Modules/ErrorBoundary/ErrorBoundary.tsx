import React, { Component, ReactNode } from 'react'
import { Alert, Space } from 'antd'
import './ErrorBoundary.less'

interface ErrorBoundaryProps {
  children: ReactNode
}

interface ErrorBoundaryState {
  error: Error | null
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = {
      error: null,
    }
  }

  componentDidCatch(error: Error) {
    this.setState({ error })
  }

  render() {
    if (this.state.error) {
      return (
        <Space direction="vertical" className="error-container">
          <Alert
            message={this.state.error.message}
            description="This is an error message"
            type="error"
            showIcon
          />
        </Space>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
