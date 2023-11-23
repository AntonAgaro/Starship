import {
  AutoIncrement,
  Column,
  DataType,
  Length,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript'
import {
  THEME_NAME_MAX_LENGTH,
  THEME_NAME_MIN_LENGTH,
  USER_LOGIN_MAX_LENGTH,
  USER_LOGIN_MIN_LENGTH,
  USER_THEME_TOKEN_LENGTH,
} from './constants'

@Table({
  timestamps: true,
  tableName: 'theme',
  initialAutoIncrement: '1',
})
class ThemeModel extends Model {
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

  @Length({ max: THEME_NAME_MAX_LENGTH, min: THEME_NAME_MIN_LENGTH })
  @Column(DataType.STRING)
  theme!: string
}

export default ThemeModel
