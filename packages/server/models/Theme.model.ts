import {
  AutoIncrement,
  Column,
  DataType,
  Length,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript'
import { THEME_NAME_MAX_LENGTH, THEME_NAME_MIN_LENGTH } from './constants'

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

  @Length({ max: THEME_NAME_MIN_LENGTH, min: THEME_NAME_MAX_LENGTH })
  @Column(DataType.STRING)
  theme_name!: string
}

export default ThemeModel
