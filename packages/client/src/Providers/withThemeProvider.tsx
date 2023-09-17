import { ConfigProvider, theme } from 'antd'
import { PropsWithChildren } from 'react'

export const withThemeProvider = ({ children }: PropsWithChildren) => {
  return (
    <ConfigProvider theme={{ algorithm: theme.defaultAlgorithm }}>
      {children}
    </ConfigProvider>
  )
}

export default withThemeProvider
