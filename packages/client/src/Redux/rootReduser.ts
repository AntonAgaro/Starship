import { combineReducers } from 'redux'
import { userState } from './user/userState'
import { leaderBoardState } from './leaderboard/leaderBoardState'
import Theme from './theme/Theme'

export default combineReducers({
  userState,
  leaderBoardState,
  Theme,
})
