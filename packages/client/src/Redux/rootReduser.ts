import { combineReducers } from 'redux'
import { userState } from './user/userState'
import { leaderBoardState } from './leaderboard/leaderBoardState'

export default combineReducers({
  userState,
  leaderBoardState,
})
