import {
  Table,
  Column,
  DataType,
  Model,
  PrimaryKey,
  AutoIncrement,
  CreatedAt,
  Length,
  UpdatedAt,
  HasMany,
} from 'sequelize-typescript'
import { TOPIC_NAME_LENGTH_MIN, TOPIC_NAME_LENGTH_MAX } from './constants'
import CommentModel from './Comment.model'

@Table({
  timestamps: true,
  tableName: 'topics',
  initialAutoIncrement: '1',
})
class TopicModel extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  override id!: number

  @Length({ max: TOPIC_NAME_LENGTH_MAX, min: TOPIC_NAME_LENGTH_MIN })
  @Column(DataType.STRING)
  title!: string

  @Column(DataType.INTEGER)
  author_id!: number

  @CreatedAt
  @Column
  created_at!: Date

  @UpdatedAt
  @Column
  updated_at!: Date

  @UpdatedAt
  @Column
  last_comment_date_time!: Date

  @HasMany(() => CommentModel, {
    foreignKey: 'topic_id',
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  comment!: CommentModel[]
}

export default TopicModel
