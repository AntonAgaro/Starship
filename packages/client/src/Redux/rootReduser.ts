import { combineReducers } from 'redux'
import { userState } from './user/userState'
import { leaderBoardState } from './leaderboard/leaderBoardState'
import Theme from './theme/Theme'
import { currentCommentState } from './forum/currentCommentState'
import { currentTopicState } from './forum/currentTopicState'
import { topicListState } from './forum/topicListState'

export default combineReducers({
  userState,
  leaderBoardState,
  Theme,
  topicListState,
  currentTopicState,
  currentCommentState,
})
