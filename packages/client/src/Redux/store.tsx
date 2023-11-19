import { configureStore } from '@reduxjs/toolkit'
import { commentEmojiState } from './emoji/commentEmojiState'
import { topicEmojiState } from './emoji/topicEmojiState'
import { EmojiState } from './emoji/types'
import { currentCommentState } from './forum/currentCommentState'
import { currentTopicState } from './forum/currentTopicState'
import { topicListState } from './forum/topicListState'
import { TCommentInfo, TTopicInfo, TTopicListInfo } from './forum/types'
import { leaderBoardState } from './leaderboard/leaderBoardState'
import { LeaderBoard } from './leaderboard/types'
import Theme from './theme/Theme'
import { ThemeState } from './theme/types'
import { TUserState } from './user/types'
import { userState } from './user/userState'

export interface AppState {
  user: TUserState
  leaderboard: LeaderBoard
  theme: ThemeState
  topicList: TTopicListInfo
  topicEmojiState: EmojiState
  commentEmojiState: EmojiState
  currentTopic: TTopicInfo
  currentComment: TCommentInfo
}

export const createStore = (preloadedState?: AppState) => {
  return configureStore({
    reducer: {
      user: userState,
      leaderboard: leaderBoardState,
      topicList: topicListState,
      topicEmojiState: topicEmojiState,
      commentEmojiState: commentEmojiState,
      currentTopic: currentTopicState,
      currentComment: currentCommentState,
      theme: Theme,
    },
    preloadedState,
  })
}

export type AppDispatch = ReturnType<typeof createStore>['dispatch']
export type RootState = AppState
