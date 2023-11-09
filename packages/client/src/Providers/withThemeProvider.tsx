import { ConfigProvider, theme } from 'antd'
import { PropsWithChildren, useEffect } from 'react'
import useLocalStorage from '../Hooks/useLocalStorage'
import { useSelector } from 'react-redux'
import { RootState } from '../Redux/store'
import { ThemeState } from '../Redux/theme/types'
import { useAppDispatch } from '../Hooks/reduxHooks'
import actions from '../Redux/actions'

export const withThemeProvider = ({ children }: PropsWithChildren) => {
  const [themeLocal] = useLocalStorage<string, string>('light', 'theme')
  const themeState = useSelector(
    (rootState: RootState) => rootState.theme
  ) as ThemeState
  const dispatch = useAppDispatch()

  useEffect(() => {
    document.body.setAttribute('data-theme', themeLocal)
    dispatch(actions.Theme.setTheme(themeLocal))
  }, [])

  return (
    <ConfigProvider
      theme={{
        algorithm:
          themeState.theme === 'dark'
            ? theme.darkAlgorithm
            : theme.defaultAlgorithm,
      }}>
      {children}
    </ConfigProvider>
  )
}

export default withThemeProvider
