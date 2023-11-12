import React, { useEffect } from 'react'
import styles from './ThemeSwitcher.module.less'
import useLocalStorage from '../../Hooks/useLocalStorage'
import { Button, Tooltip } from 'antd'
import Dark from '../../assets/icons/Theme/Dark'
import Light from '../../assets/icons/Theme/Light'
import { useAppDispatch } from '../../Hooks/reduxHooks'
import actions from '../../Redux/actions'

const ThemeSwitcher = () => {
  const [themeLocal, setTheme] = useLocalStorage<string, string>(
    'light',
    'theme'
  )
  const dispatch = useAppDispatch()

  const onChangeTheme = () => {
    setTheme(themeLocal === 'light' ? 'dark' : 'light')
    const currentTheme = document.body.getAttribute('data-theme')
    dispatch(
      actions.Theme.setTheme(currentTheme === 'light' ? 'dark' : 'light')
    )
    document.body.setAttribute(
      'data-theme',
      currentTheme === 'light' ? 'dark' : 'light'
    )
  }

  useEffect(() => {
    document.body.setAttribute('data-theme', themeLocal)
  }, [])

  return (
    <Tooltip
      placement="right"
      title={
        themeLocal === 'light'
          ? 'Перейти на темную сторону'
          : 'Перейти на светлую сторону'
      }>
      <Button
        size="large"
        onClick={onChangeTheme}
        className={styles.button}
        icon={themeLocal === 'light' ? <Dark /> : <Light />}
      />
    </Tooltip>
  )
}

export default ThemeSwitcher
