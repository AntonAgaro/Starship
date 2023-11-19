import { combineReducers } from 'redux'
import { commentEmojiState } from './emoji/commentEmojiState'
import { topicEmojiState } from './emoji/topicEmojiState'
import { currentCommentState } from './forum/currentCommentState'
import { currentTopicState } from './forum/currentTopicState'
import { topicListState } from './forum/topicListState'
import { leaderBoardState } from './leaderboard/leaderBoardState'
import Theme from './theme/Theme'
import { userState } from './user/userState'

export default combineReducers({
  userState,
  leaderBoardState,
  Theme,
  topicListState,
  topicEmojiState,
  commentEmojiState,
  currentTopicState,
  currentCommentState,
})
