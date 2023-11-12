import ThemeModel from '../models/Theme.model'
import type { TTheme } from './types'

class Theme {
  public readonly id: number
  public readonly theme_name: string | unknown

  constructor({ theme_name, id = -1 }: TTheme) {
    this.theme_name = theme_name
    this.id = id
  }

  public async getAllThemes(): Promise<ThemeModel[] | null> {
    const themes = await ThemeModel.findAll()

    if (!themes) return null

    return themes
  }
}

export default Theme
