import { ConfigProvider, theme } from 'antd'
import { PropsWithChildren } from 'react'

export const withThemeProvider = ({ children }: PropsWithChildren) => {
  return (
    <ConfigProvider theme={{ algorithm: theme.darkAlgorithm }}>
      {children}
    </ConfigProvider>
  )
}

export default withThemeProvider
