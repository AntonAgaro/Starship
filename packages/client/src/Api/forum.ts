import {
  addCommentStub,
  addTopicStub,
  getTopicStub,
  removeCommentStub,
  removeTopicStub,
  topicListStub,
  updateTopicStub,
} from '../Mocks/topicListStub'
import {
  TCommentInfo,
  TCreateCommentData,
  TCreateTopicData,
  TDeleteCommentData,
  TGetCommentData,
  TGetTopicData,
  TTopicInfo,
  TTopicListInfo,
  TUpdateCommentData,
  TUpdateTopicData,
} from '../Redux/forum/types'
import { num_per_page } from '../Utils/helpers'
import { ApiBase } from './base'

export class ForumApi extends ApiBase {
  private mock_mode = true

  constructor() {
    super('/forum', true)
  }

  async getTopicList(page = 0): Promise<TTopicListInfo> {
    if (this.mock_mode) {
      return topicListStub(page)
    }

    const data = { page, limit: num_per_page }
    const result = await this.axios.post('/', data)
    return result.data
  }

  async createTopic(data: TCreateTopicData): Promise<TTopicInfo> {
    if (this.mock_mode) {
      return addTopicStub(data.title)
    }

    const result = await this.axios.post('/create', data)
    return result.data
  }

  async updateTopic(data: TUpdateTopicData): Promise<TTopicInfo | undefined> {
    if (this.mock_mode) {
      return await updateTopicStub(data.title, data.topic_id)
    }

    const result = await this.axios.post('/update', data)
    return result.data
  }

  async deleteTopic(data: { topic_id: number }) {
    if (this.mock_mode) {
      return removeTopicStub(data.topic_id)
    }

    const result = await this.axios.post('/delete', data)
    return result.data
  }

  async getTopic(data: TGetTopicData): Promise<TTopicInfo | undefined> {
    if (this.mock_mode) {
      return getTopicStub(data.page, data.topic_id, num_per_page)
    }

    const result = await this.axios.post(`/${data.topic_id}`, {
      ...data,
      limit: num_per_page,
    })
    return result.data
  }

  async getComment(data: TGetCommentData): Promise<TCommentInfo> {
    const result = await this.axios.post(`/${data.topic_id}`, data)
    return result.data
  }

  async createComment(data: TCreateCommentData): Promise<TCommentInfo> {
    console.log(data)
    if (this.mock_mode) {
      return await addCommentStub(data.text, data.author_id, data.topic_id)
    }

    const result = await this.axios.post(`/create/${data.topic_id}`, data)
    return result.data
  }

  async updateComment(data: TUpdateCommentData): Promise<TCommentInfo> {
    const result = await this.axios.post(`/update/${data.topic_id}`, data)
    return result.data
  }

  async deleteComment(data: TDeleteCommentData) {
    if (this.mock_mode) {
      await removeCommentStub(data.topic_id, data.comment_id)
      return
    }

    const result = await this.axios.post(`/delete/${data.topic_id}`, data)
    return result.data
  }
}

export default ForumApi
