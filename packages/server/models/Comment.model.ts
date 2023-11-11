import {
  AutoIncrement,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Length,
  Model,
  PrimaryKey,
  Table,
  CreatedAt,
  UpdatedAt,
} from 'sequelize-typescript'
import { COMMENT_LENGTH_MIN, COMMENT_LENGTH_MAX } from './constants'
import TopicModel from './Topic.model'

@Table({
  timestamps: true,
  tableName: 'comments',
  initialAutoIncrement: '1',
})
class CommentModel extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.INTEGER)
  override id!: number

  @Column(DataType.INTEGER)
  author_id!: number

  @Length({ max: COMMENT_LENGTH_MAX, min: COMMENT_LENGTH_MIN })
  @Column(DataType.STRING)
  text!: string

  @CreatedAt
  @Column
  created_at!: Date

  @UpdatedAt
  @Column
  updated_at!: Date

  @ForeignKey(() => TopicModel)
  @Column(DataType.INTEGER)
  topic_id!: number

  @BelongsTo(() => TopicModel)
  topic!: TopicModel
}

export default CommentModel
