import { LeaderBoard } from '../Redux/leaderboard/types'
import { ApiBase } from './base'

export class LeaderBoardApi extends ApiBase {
  constructor() {
    super('/leaderboard')
  }

  async getLeaderboard() {
    const data = { ratingFieldName: 'scoreStarship', cursor: 0, limit: 10 }
    const result = await this.axios.post('/all', data)
    return result.data
  }

  async leaderboard(data: {
    data: {
      scoreStarship: number
      userName: string
    }
    ratingFieldName: string
    teamName: string
  }): Promise<LeaderBoard> {
    const result = await this.axios.post('/', data)
    return result.data
  }
}

export default LeaderBoardApi
