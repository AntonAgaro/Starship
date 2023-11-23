import CommentModel from '../models/Comment.model'
import TopicModel from '../models/Topic.model'
import type { stateMessage } from './types'

class Topic {
  public readonly id: number | unknown

  constructor(id: number | unknown) {
    this.id = id
  }

  async getTopic() {
    return await TopicModel.findOne({
      where: {
        id: this.id as number,
      },
    })
  }

  async createTopic(title: string, author_id: number) {
    const topic = await TopicModel.create({
      title,
      author_id,
    })

    return topic
  }

  public async updateTopic(title: string): Promise<stateMessage> {
    const topic = await this.getTopic()

    if (!topic) return { success: false, message: "Topic wasn't found" }

    topic.title = title
    await topic.save()

    return { success: true, message: 'Topic was updated' }
  }

  async getTopics() {
    return await TopicModel.findAll()
  }

  async remove(): Promise<stateMessage> {
    const topic = await this.getTopic()

    if (!topic) return { success: false, message: "Topic wasn't found" }

    await topic.destroy()
    await CommentModel.destroy({
      where: {
        topic_id: this.id as number,
      },
    })

    return { success: true, message: 'OK' }
  }
}

export default Topic
