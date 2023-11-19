import { MOCK_EMOJI } from '../Mocks/emoji'
import { Emoji } from '../Redux/emoji/types'
import { ApiBase } from './base'

export class EmojiApi extends ApiBase {
  private mock_mode = true

  constructor() {
    super('/emoji', true)
  }

  async getTopicEmojis(topicId: number): Promise<Emoji[] | null> {
    if (this.mock_mode) {
      return MOCK_EMOJI()
    }

    const result = await this.axios.post<Emoji[], Emoji[]>(`/topic/${topicId}`)
    return result
  }

  async getCommentEmojis(commentId: number): Promise<Emoji[] | null> {
    if (this.mock_mode) {
      return MOCK_EMOJI()
    }

    const result = await this.axios.post<Emoji[], Emoji[]>(
      `/comment/${commentId}`
    )
    return result
  }
}
