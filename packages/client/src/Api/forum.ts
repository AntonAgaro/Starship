import {
  TCommentInfo,
  TCommentListInfo,
  TTopicInfo,
  TTopicListInfo,
} from '../Redux/forum/types'
import { ApiBase } from './base'

export class ForumApi extends ApiBase {
  constructor() {
    super('/forum')
  }

  async getTopicList(page = 0): Promise<TTopicListInfo> {
    const data = { page, limit: 10 }
    const result = await this.axios.post('/', data)
    return result.data
  }

  async createTopic(data: {
    title: string
    author_id: number
  }): Promise<TTopicInfo> {
    const result = await this.axios.post('/create', data)
    return result.data
  }

  async updateTopic(data: {
    title: string
    topic_id: number
  }): Promise<TTopicInfo> {
    const result = await this.axios.post('/update', data)
    return result.data
  }

  async deleteTopic(data: { topic_id: number }) {
    const result = await this.axios.post('/delete', data)
    return result.data
  }

  async getCommentList(page = 0, topic_id: number): Promise<TCommentListInfo> {
    const data = { page, limit: 10 }
    const result = await this.axios.post(`/${topic_id}`, data)
    return result.data
  }

  async createComment(data: {
    text: string
    author_id: number
    topic_id: number
  }): Promise<TCommentInfo> {
    const result = await this.axios.post(`/create/${data.topic_id}`, data)
    return result.data
  }

  async updateComment(data: {
    comment_id: number
    text: string
    author_id: number
    topic_id: number
  }): Promise<TCommentInfo> {
    const result = await this.axios.post(`/update/${data.topic_id}`, data)
    return result.data
  }

  async deleteComment(data: {
    comment_id: number
    author_id: number
    topic_id: number
  }) {
    const result = await this.axios.post(`/delete/${data.topic_id}`, data)
    return result.data
  }
}

export default ForumApi
