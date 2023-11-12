import ChoosenThemeModel from '../models/ChosenTheme.model'
import type { TChosenTheme, stateMessage } from './types'

class ChosenTheme {
  public readonly id: number
  public readonly theme_id: number | unknown
  public readonly user_theme_token: string | unknown
  public readonly user_login: string | unknown

  constructor({
    theme_id,
    user_theme_token,
    user_login,
    id = -1,
  }: TChosenTheme) {
    this.theme_id = theme_id
    this.user_theme_token = user_theme_token
    this.user_login = user_login
    this.id = id
  }

  public async getChosenThemeByThemeToken(): Promise<ChoosenThemeModel | null> {
    const chosenTheme = await ChoosenThemeModel.findOne({
      where: {
        user_theme_token: this.user_theme_token as string,
      },
    })

    if (!chosenTheme) return null

    return chosenTheme
  }

  public async getChosenThemeByUserLogin(): Promise<ChoosenThemeModel | null> {
    const chosenTheme = await ChoosenThemeModel.findOne({
      where: {
        user_login: this.user_login as string,
      },
    })

    if (!chosenTheme) return null

    return chosenTheme
  }

  public async createChosenThemeWithThemeToken(): Promise<
    ChoosenThemeModel | stateMessage
  > {
    const chosenTheme = await ChoosenThemeModel.create({
      theme_id: this.theme_id as number,
      user_theme_token: this.user_theme_token as string,
    })

    if (!chosenTheme)
      return { success: false, message: 'Unexpected error with chosen theme' }

    return chosenTheme
  }

  public async createChosenThemeWithUserLogin(): Promise<
    ChoosenThemeModel | stateMessage
  > {
    const chosenTheme = await ChoosenThemeModel.create({
      theme_id: this.theme_id as number,
      user_login: this.user_login as string,
    })

    if (!chosenTheme)
      return { success: false, message: 'Unexpected error with chosen theme' }

    return chosenTheme
  }

  public async updateChosenThemeWithThemeToken(): Promise<stateMessage> {
    const chosenTheme = await this.getChosenThemeByThemeToken()

    if (!chosenTheme)
      return { success: false, message: 'Record for this token not found' }

    chosenTheme.theme_id = this.theme_id as number

    chosenTheme.save()

    return { success: true, message: 'Record for this token Updated' }
  }

  public async updateChosenThemeWithUserLogin(): Promise<stateMessage> {
    const chosenTheme = await this.getChosenThemeByUserLogin()

    if (!chosenTheme)
      return { success: false, message: 'Record for this login not found' }

    chosenTheme.theme_id = this.theme_id as number

    chosenTheme.save()

    return { success: true, message: 'Record for this login updated' }
  }

  public async removeChosenThemeWithThemeToken(): Promise<stateMessage> {
    const chosenTheme = await this.getChosenThemeByThemeToken()

    if (!chosenTheme)
      return { success: false, message: 'Record for this token not found' }

    chosenTheme.destroy()

    return { success: true, message: 'Record for this token deleted' }
  }

  public async removeChosenThemeWithUserLogin(): Promise<stateMessage> {
    const chosenTheme = await this.getChosenThemeByUserLogin()

    if (!chosenTheme)
      return { success: false, message: 'Record for this login not found' }

    chosenTheme.destroy()

    return { success: true, message: 'Record for this login deleted' }
  }
}

export default ChosenTheme
