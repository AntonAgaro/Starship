import { configureStore } from '@reduxjs/toolkit'
import { userState } from './user/userState'
import { leaderBoardState } from './leaderboard/leaderBoardState'
import { TUserState } from './user/types'
import { LeaderBoard } from './leaderboard/types'
import { topicListState } from './forum/topicListState'
import { currentTopicState } from './forum/currentTopicState'
import { currentCommentState } from './forum/currentCommentState'
import { TCommentInfo, TTopicInfo, TTopicListInfo } from './forum/types'

export interface AppState {
  user: TUserState
  leaderboard: LeaderBoard
  topicList: TTopicListInfo
  currentTopic: TTopicInfo
  currentComment: TCommentInfo
}

export const createStore = (preloadedState?: AppState) => {
  return configureStore({
    reducer: {
      user: userState,
      leaderboard: leaderBoardState,
      topicList: topicListState,
      currentTopic: currentTopicState,
      currentComment: currentCommentState,
    },
    preloadedState,
  })
}

export type AppDispatch = ReturnType<typeof createStore>['dispatch']
export type RootState = AppState
