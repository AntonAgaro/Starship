import ThemeModel from '../models/Theme.model'
import type { stateMessage } from './types'

class Theme {
  public static async getThemeByThemeToken(
    user_theme_token: string
  ): Promise<ThemeModel | null> {
    const chosenTheme = await ThemeModel.findOne({
      where: {
        user_theme_token,
      },
    })

    if (!chosenTheme) return null

    return chosenTheme
  }

  public static async getThemeByUserLogin(
    user_login: string
  ): Promise<ThemeModel | null> {
    const chosenTheme = await ThemeModel.findOne({
      where: {
        user_login,
      },
    })

    if (!chosenTheme) return null

    return chosenTheme
  }

  public static async createThemeWithThemeToken(
    theme: string,
    user_theme_token: string
  ): Promise<ThemeModel | stateMessage> {
    const chosenTheme = await ThemeModel.create({
      theme,
      user_theme_token,
    })

    if (!chosenTheme)
      return { success: false, message: 'Unexpected error with chosen theme' }

    return chosenTheme
  }

  public static async createThemeWithUserLogin(
    theme: string,
    user_login: string
  ): Promise<ThemeModel | stateMessage> {
    const chosenTheme = await ThemeModel.create({
      theme,
      user_login,
    })

    if (!chosenTheme)
      return { success: false, message: 'Unexpected error with chosen theme' }

    return chosenTheme
  }

  public static async updateThemeWithThemeToken(
    theme: string,
    user_theme_token: string
  ): Promise<stateMessage> {
    const chosenTheme = await Theme.getThemeByThemeToken(user_theme_token)

    if (!chosenTheme)
      return { success: false, message: 'Record for this token not found' }

    chosenTheme.theme = theme

    chosenTheme.save()

    return { success: true, message: 'Record for this token Updated' }
  }

  public static async updateThemeWithUserLogin(
    theme: string,
    user_login: string
  ): Promise<stateMessage> {
    const chosenTheme = await Theme.getThemeByUserLogin(user_login)

    if (!chosenTheme)
      return { success: false, message: 'Record for this login not found' }

    chosenTheme.theme = theme

    chosenTheme.save()

    return { success: true, message: 'Record for this login updated' }
  }

  public static async removeThemeWithThemeToken(
    user_theme_token: string
  ): Promise<stateMessage> {
    const chosenTheme = await Theme.getThemeByThemeToken(user_theme_token)

    if (!chosenTheme)
      return { success: false, message: 'Record for this token not found' }

    chosenTheme.destroy()

    return { success: true, message: 'Record for this token deleted' }
  }

  public static async removeThemeWithUserLogin(
    user_login: string
  ): Promise<stateMessage> {
    const chosenTheme = await Theme.getThemeByUserLogin(user_login)

    if (!chosenTheme)
      return { success: false, message: 'Record for this login not found' }

    chosenTheme.destroy()

    return { success: true, message: 'Record for this login deleted' }
  }
}

export default Theme
