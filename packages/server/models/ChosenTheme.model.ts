import {
  AutoIncrement,
  Column,
  DataType,
  ForeignKey,
  Length,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript'
import ThemeModel from './Theme.model'
import {
  USER_LOGIN_MAX_LENGTH,
  USER_LOGIN_MIN_LENGTH,
  USER_THEME_TOKEN_LENGTH,
} from './constants'

@Table({
  timestamps: true,
  tableName: 'chosen_theme',
  initialAutoIncrement: '1',
})
class ChoosenThemeModel extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  override id!: number

  @Length({ max: USER_THEME_TOKEN_LENGTH, min: USER_THEME_TOKEN_LENGTH })
  @Column(DataType.STRING)
  user_theme_token!: string

  @Length({ max: USER_LOGIN_MIN_LENGTH, min: USER_LOGIN_MAX_LENGTH })
  @Column(DataType.STRING)
  user_login: string | undefined

  @ForeignKey(() => ThemeModel)
  @Column(DataType.INTEGER)
  theme_id!: number
}

export default ChoosenThemeModel
